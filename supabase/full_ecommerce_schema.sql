-- ==============================================================================
-- ARCANO — ARQUITECTURA FULL E-COMMERCE & CONCILIACIÓN MERCADO PAGO
-- Motor: PostgreSQL (Supabase) | Patrón de 5 Tablas Canónicas
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABLA: ORDERS (Orden de Negocio)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  external_reference TEXT UNIQUE NOT NULL,                  -- Llave única de conciliación (ARC-2026-...)
  status TEXT NOT NULL DEFAULT 'awaiting_payment' 
    CHECK (status IN ('created', 'awaiting_payment', 'paid', 'cancelled', 'expired', 'refunded')),
  currency TEXT NOT NULL DEFAULT 'MXN',
  subtotal_amount NUMERIC(18, 2) NOT NULL,
  shipping_amount NUMERIC(18, 2) NOT NULL DEFAULT 0.00,
  discount_amount NUMERIC(18, 2) NOT NULL DEFAULT 0.00,
  total_amount NUMERIC(18, 2) NOT NULL,
  
  -- Datos del Comprador
  buyer_email TEXT NOT NULL,
  buyer_first_name TEXT NOT NULL,
  buyer_last_name TEXT,
  buyer_phone TEXT,
  
  -- Dirección de Envío Estructurada
  shipping_street_name TEXT NOT NULL,
  shipping_street_number TEXT NOT NULL,
  shipping_colonia TEXT,
  shipping_city TEXT NOT NULL,
  shipping_state TEXT NOT NULL,
  shipping_zip_code TEXT NOT NULL,
  shipping_country TEXT NOT NULL DEFAULT 'México',
  
  -- Metadatos de Personalización
  wrist_size TEXT,                                          -- Talla de muñeca seleccionada
  customer_notes TEXT,                                      -- Notas de entrega o dedicatoria
  tracking_carrier TEXT,                                    -- FedEx, DHL, etc.
  tracking_number TEXT,                                     -- Número de guía
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_external_ref ON public.orders(external_reference);
CREATE INDEX IF NOT EXISTS idx_orders_status_created ON public.orders(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_buyer_email ON public.orders(buyer_email);

-- 2. TABLA: ORDER_ITEMS (Líneas de Productos de la Orden)
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  item_id TEXT,                                             -- ID o Slug de la pieza en el catálogo
  sku TEXT,                                                 -- Código SKU o variante
  title TEXT NOT NULL,
  unit_price NUMERIC(18, 2) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  line_total NUMERIC(18, 2) NOT NULL,
  option_label TEXT,                                        -- Ej. 'Edición Sagrada', 'Talla M'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_sku ON public.order_items(sku);

-- 3. TABLA: MP_ORDERS (Espejo de Orders API en Mercado Pago)
CREATE TABLE IF NOT EXISTS public.mp_orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  mp_order_id TEXT UNIQUE NOT NULL,                         -- ID retornado por POST /v1/orders (ORD...)
  mp_status TEXT NOT NULL,                                  -- Estado devuelto por MP (opened, closed, etc.)
  mp_status_detail TEXT,
  mp_total_amount NUMERIC(18, 2) NOT NULL,
  checkout_url TEXT,
  last_synced_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_mp_orders_mp_id ON public.mp_orders(mp_order_id);
CREATE INDEX IF NOT EXISTS idx_mp_orders_order_id ON public.mp_orders(order_id);

-- 4. TABLA: MP_PAYMENTS (Pagos individuales asociados a la Order)
CREATE TABLE IF NOT EXISTS public.mp_payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  mp_payment_id TEXT UNIQUE NOT NULL,                       -- ID del pago en MP
  mp_order_id TEXT NOT NULL,                                -- FK lógico a mp_orders.mp_order_id
  amount NUMERIC(18, 2) NOT NULL,
  status TEXT NOT NULL,                                     -- approved, pending, rejected, refunded
  status_detail TEXT,                                       -- accredited, pending_waiting_transfer, etc.
  payment_method_id TEXT,                                   -- visa, master, spei, oxxo
  payment_type_id TEXT,                                     -- credit_card, debit_card, bank_transfer
  installments INTEGER,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_mp_payments_payment_id ON public.mp_payments(mp_payment_id);
CREATE INDEX IF NOT EXISTS idx_mp_payments_mp_order_id ON public.mp_payments(mp_order_id);

-- 5. TABLA: WEBHOOK_EVENTS (Auditoría & Idempotencia de 1ª Capa)
CREATE TABLE IF NOT EXISTS public.webhook_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  request_id TEXT UNIQUE NOT NULL,                          -- De x-request-id
  event_type TEXT,
  event_action TEXT,
  data_id TEXT NOT NULL,                                    -- data.id del payload de MP
  signature_valid BOOLEAN NOT NULL DEFAULT TRUE,
  received_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  raw_payload JSONB
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_webhook_events_req_id ON public.webhook_events(request_id);
CREATE INDEX IF NOT EXISTS idx_webhook_events_data_id ON public.webhook_events(data_id);

-- 6. PROCEDIMIENTO ATÓMICO: CONCILIACIÓN COMPLETA E INVENTARIO
CREATE OR REPLACE FUNCTION public.rpc_sync_order_from_webhook(
  p_external_reference TEXT,
  p_mp_order_id TEXT,
  p_mp_status TEXT,
  p_mp_status_detail TEXT DEFAULT NULL,
  p_mp_payment_id TEXT DEFAULT NULL,
  p_payment_amount NUMERIC DEFAULT NULL,
  p_payment_status TEXT DEFAULT NULL,
  p_payment_method_id TEXT DEFAULT NULL,
  p_payment_type_id TEXT DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
  v_order RECORD;
  v_item RECORD;
  v_is_paid BOOLEAN;
BEGIN
  -- 1. Localizar y bloquear la orden de negocio
  SELECT * INTO v_order
  FROM public.orders
  WHERE external_reference = p_external_reference
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Orden no encontrada');
  END IF;

  v_is_paid := (p_mp_status = 'closed' OR p_payment_status = 'approved');

  -- 2. Upsert en mp_orders
  INSERT INTO public.mp_orders (order_id, mp_order_id, mp_status, mp_status_detail, mp_total_amount, last_synced_at)
  VALUES (v_order.id, p_mp_order_id, p_mp_status, p_mp_status_detail, v_order.total_amount, NOW())
  ON CONFLICT (mp_order_id) DO UPDATE SET
    mp_status = EXCLUDED.mp_status,
    mp_status_detail = EXCLUDED.mp_status_detail,
    last_synced_at = NOW();

  -- 3. Upsert en mp_payments si vino información de pago
  IF p_mp_payment_id IS NOT NULL THEN
    INSERT INTO public.mp_payments (
      mp_payment_id, mp_order_id, amount, status, status_detail, 
      payment_method_id, payment_type_id, approved_at
    )
    VALUES (
      p_mp_payment_id, p_mp_order_id, COALESCE(p_payment_amount, v_order.total_amount),
      COALESCE(p_payment_status, 'approved'), p_mp_status_detail,
      p_payment_method_id, p_payment_type_id,
      CASE WHEN v_is_paid THEN NOW() ELSE NULL END
    )
    ON CONFLICT (mp_payment_id) DO UPDATE SET
      status = EXCLUDED.status,
      status_detail = EXCLUDED.status_detail,
      approved_at = CASE WHEN v_is_paid AND mp_payments.approved_at IS NULL THEN NOW() ELSE mp_payments.approved_at END;
  END IF;

  -- 4. Actualizar Estado de Negocio de la Orden (Idempotente)
  IF v_is_paid AND v_order.status != 'paid' THEN
    UPDATE public.orders
    SET status = 'paid', updated_at = NOW()
    WHERE id = v_order.id;

    -- Descontar inventario físico de forma atómica para cada pieza si existe el módulo
    FOR v_item IN (SELECT * FROM public.order_items WHERE order_id = v_order.id) LOOP
      IF v_item.item_id IS NOT NULL THEN
        BEGIN
          PERFORM public.rpc_confirm_sale(v_item.item_id, v_item.quantity, v_order.external_reference);
        EXCEPTION WHEN OTHERS THEN
          NULL;
        END;
      END IF;
    END LOOP;

  ELSIF p_mp_status IN ('cancelled', 'expired') AND v_order.status != 'cancelled' THEN
    UPDATE public.orders
    SET status = 'cancelled', updated_at = NOW()
    WHERE id = v_order.id;

    -- Liberar reservas de inventario
    FOR v_item IN (SELECT * FROM public.order_items WHERE order_id = v_order.id) LOOP
      IF v_item.item_id IS NOT NULL THEN
        BEGIN
          PERFORM public.rpc_release_stock(v_item.item_id, v_item.quantity, v_order.external_reference);
        EXCEPTION WHEN OTHERS THEN
          NULL;
        END;
      END IF;
    END LOOP;
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'order_id', v_order.id,
    'external_reference', v_order.external_reference,
    'business_status', (CASE WHEN v_is_paid THEN 'paid' ELSE v_order.status END),
    'mp_status', p_mp_status
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. HABILITAR SEGURIDAD ROW LEVEL SECURITY (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mp_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mp_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service Role total orders" ON public.orders;
CREATE POLICY "Service Role total orders" ON public.orders FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service Role total order_items" ON public.order_items;
CREATE POLICY "Service Role total order_items" ON public.order_items FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service Role total mp_orders" ON public.mp_orders;
CREATE POLICY "Service Role total mp_orders" ON public.mp_orders FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service Role total mp_payments" ON public.mp_payments;
CREATE POLICY "Service Role total mp_payments" ON public.mp_payments FOR ALL USING (auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service Role total webhook_events" ON public.webhook_events;
CREATE POLICY "Service Role total webhook_events" ON public.webhook_events FOR ALL USING (auth.role() = 'service_role');

