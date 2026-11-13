-- ==============================================================================
-- ARCANO — ESQUEMA DE ÓRDENES & FULL E-COMMERCE (PostgreSQL / Supabase)
-- Integración con Mercado Pago Orders API & Descuento Atómico de Inventario
-- ==============================================================================

-- 1. TABLA: ORDERS (Órdenes Principales)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,                       -- Ej. ARC-2026-849201
  external_reference TEXT UNIQUE NOT NULL,                 -- Referencia enviada a Mercado Pago
  mp_order_id TEXT,                                        -- ID retornado por Mercado Pago (ORD...)
  mp_preference_id TEXT,                                   -- Preference ID si aplica
  payment_method TEXT NOT NULL DEFAULT 'mercadopago_card' 
    CHECK (payment_method IN ('mercadopago_card', 'spei_direct', 'oxxo', 'whatsapp')),
  status TEXT NOT NULL DEFAULT 'pending' 
    CHECK (status IN ('pending', 'approved', 'in_process', 'rejected', 'cancelled', 'refunded')),
  status_detail TEXT,                                      -- Ej. 'accredited', 'pending_waiting_transfer'
  
  -- Montos financieros en MXN
  currency TEXT NOT NULL DEFAULT 'MXN',
  subtotal_amount NUMERIC(10, 2) NOT NULL,
  shipping_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  discount_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  total_amount NUMERIC(10, 2) NOT NULL,
  
  -- Datos del Comprador
  buyer_email TEXT NOT NULL,
  buyer_name TEXT NOT NULL,
  buyer_phone TEXT NOT NULL,
  
  -- Dirección de Entrega en México
  shipping_street TEXT NOT NULL,
  shipping_number TEXT NOT NULL,
  shipping_colonia TEXT,
  shipping_city TEXT NOT NULL,
  shipping_state TEXT NOT NULL,
  shipping_zip_code TEXT NOT NULL,
  shipping_country TEXT NOT NULL DEFAULT 'México',
  
  -- Metadatos ceremoniales y de personalización
  wrist_size TEXT,                                         -- Talla de muñeca seleccionada
  customer_notes TEXT,                                     -- Dedicatoria o notas de entrega
  tracking_carrier TEXT,                                   -- Ej. 'FedEx', 'DHL', 'Estafeta'
  tracking_number TEXT,                                    -- Guía de rastreo
  
  -- Fechas de ciclo de vida
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ,
  shipped_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLA: ORDER_ITEMS (Líneas de Productos de la Orden)
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  item_id TEXT REFERENCES public.inventory_items(id) ON DELETE SET NULL, -- Vínculo opcional al catálogo
  title TEXT NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  total_price NUMERIC(10, 2) NOT NULL,
  option_label TEXT,                                       -- Ej. 'Edición Sagrada', 'Talla M'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROCEDIMIENTO ATÓMICO: PROCESAR CONCILIACIÓN DE ORDEN DESDE WEBHOOK
CREATE OR REPLACE FUNCTION public.rpc_process_webhook_order_payment(
  p_external_reference TEXT,
  p_mp_order_id TEXT,
  p_new_status TEXT,
  p_status_detail TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  v_order RECORD;
  v_item RECORD;
  v_sale_result JSONB;
BEGIN
  -- 1. Buscar la orden bloqueando fila para evitar concurrencia
  SELECT * INTO v_order
  FROM public.orders
  WHERE external_reference = p_external_reference OR mp_order_id = p_mp_order_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Orden no encontrada en BD');
  END IF;

  -- 2. Si ya estaba aprobada, no duplicar el descuento de inventario
  IF v_order.status = 'approved' AND p_new_status = 'approved' THEN
    RETURN jsonb_build_object('success', true, 'message', 'Orden ya conciliada previamente', 'order_id', v_order.id);
  END IF;

  -- 3. Actualizar estado de la orden
  UPDATE public.orders
  SET
    status = p_new_status,
    status_detail = COALESCE(p_status_detail, status_detail),
    mp_order_id = COALESCE(p_mp_order_id, mp_order_id),
    paid_at = CASE WHEN p_new_status = 'approved' AND paid_at IS NULL THEN NOW() ELSE paid_at END,
    cancelled_at = CASE WHEN p_new_status IN ('cancelled', 'rejected') AND cancelled_at IS NULL THEN NOW() ELSE cancelled_at END,
    updated_at = NOW()
  WHERE id = v_order.id;

  -- 4. Si el pago fue aprobado, descontar stock físico de cada item
  IF p_new_status = 'approved' THEN
    FOR v_item IN (SELECT * FROM public.order_items WHERE order_id = v_order.id) LOOP
      IF v_item.item_id IS NOT NULL THEN
        -- Descontar usando el procedimiento atómico de inventario
        PERFORM public.rpc_confirm_sale(v_item.item_id, v_item.quantity, v_order.order_number);
      END IF;
    END LOOP;
  END IF;

  -- 5. Si la orden fue cancelada, liberar reservas
  IF p_new_status IN ('cancelled', 'rejected') THEN
    FOR v_item IN (SELECT * FROM public.order_items WHERE order_id = v_order.id) LOOP
      IF v_item.item_id IS NOT NULL THEN
        PERFORM public.rpc_release_stock(v_item.item_id, v_item.quantity, v_order.order_number);
      END IF;
    END LOOP;
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'order_id', v_order.id,
    'order_number', v_order.order_number,
    'status', p_new_status
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. HABILITAR SEGURIDAD RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Políticas de Servicio / Backend (Cloud Run accede con service_role)
DROP POLICY IF EXISTS "Service Role gestión total orders" ON public.orders;
CREATE POLICY "Service Role gestión total orders"
  ON public.orders FOR ALL
  USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service Role gestión total order_items" ON public.order_items;
CREATE POLICY "Service Role gestión total order_items"
  ON public.order_items FOR ALL
  USING (auth.role() = 'service_role');

-- Índices de alto rendimiento
CREATE INDEX IF NOT EXISTS idx_orders_external_reference ON public.orders(external_reference);
CREATE INDEX IF NOT EXISTS idx_orders_mp_order_id ON public.orders(mp_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_buyer_email ON public.orders(buyer_email);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);

