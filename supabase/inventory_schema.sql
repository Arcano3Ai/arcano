-- ==============================================================================
-- ARCANO — SISTEMA DE INVENTARIO CEREMONIAL & CATALOGO EN TIEMPO REAL
-- Esquema de Base de Datos PostgreSQL / Supabase
-- Integración Nativa con Agente de WhatsApp Business & Checkout Seguro
-- ==============================================================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLA: INVENTORY_COLLECTIONS (Colecciones Ceremoniales de Arcano)
CREATE TABLE IF NOT EXISTS public.inventory_collections (
  id TEXT PRIMARY KEY,                       -- Slug canónico (ej. 'coleccion-arcanos', 'alta-joyeria-oro')
  name TEXT NOT NULL,                        -- Nombre ceremonial (ej. 'Colección Arcanos Mayores')
  slug TEXT UNIQUE NOT NULL,                 -- Slug URL amigable
  description TEXT,                          -- Descripción para el catálogo y el agente de IA
  symbol TEXT,                               -- Glifo esotérico (ej. '♾️', '⚜️', '✨')
  target_stock INTEGER NOT NULL DEFAULT 1000,-- Cuota objetivo por colección (1,000 unidades)
  current_stock INTEGER NOT NULL DEFAULT 0,  -- Stock total actual agregado en tiempo real
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLA: INVENTORY_ITEMS (Piezas, Talismanes & Quemadores)
CREATE TABLE IF NOT EXISTS public.inventory_items (
  id TEXT PRIMARY KEY,                       -- ID canónico de producto (coincide con shop.ts)
  sku TEXT UNIQUE NOT NULL,                  -- Código de barra / SKU estructurado (ej. 'ARC-00', 'ORO-01')
  name TEXT NOT NULL,                        -- Nombre completo de la pieza
  slug TEXT NOT NULL,                        -- Slug para URL directa en la tienda
  collection_id TEXT NOT NULL REFERENCES public.inventory_collections(id) ON DELETE RESTRICT,
  price_mxn NUMERIC(10, 2) NOT NULL CHECK (price_mxn >= 0),
  stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  reserved_quantity INTEGER NOT NULL DEFAULT 0 CHECK (reserved_quantity >= 0),
  available_quantity INTEGER GENERATED ALWAYS AS (stock_quantity - reserved_quantity) STORED,
  min_stock_alert INTEGER NOT NULL DEFAULT 5 CHECK (min_stock_alert >= 0),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  tagline TEXT,                              -- Resumen de virtudes para el agente de WhatsApp
  stone_type TEXT,                           -- Minerales principales (ej. 'Labradorita & Turquesa')
  image_url TEXT,                            -- Imagen en alta resolución para enviar por WhatsApp
  metadata JSONB DEFAULT '{}'::JSONB,        -- Atributos flexibles (tamaño cuenta, medidas, etc.)
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT chk_stock_integrity CHECK (stock_quantity >= reserved_quantity)
);

-- 4. TABLA: INVENTORY_MOVEMENTS (Libro Mayor de Auditoría & Trazabilidad Inmutable)
CREATE TABLE IF NOT EXISTS public.inventory_movements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  item_id TEXT NOT NULL REFERENCES public.inventory_items(id) ON DELETE CASCADE,
  movement_type TEXT NOT NULL CHECK (
    movement_type IN (
      'initial_seed',        -- Carga inicial de catálogo (cuota de 1,000 por colección)
      'restock',             -- Reabastecimiento de piezas por maestros artesanos
      'reservation_hold',    -- Apartado temporal iniciado por WhatsApp o Carrito
      'reservation_release', -- Liberación de reserva por expiración o descarte
      'sale',                -- Venta confirmada (pago SPEI / Mercado Pago verificado)
      'audit_adjustment',    -- Ajuste físico tras auditoría de inventario
      'damaged'              -- Merma o daño mineral en taller
    )
  ),
  quantity_delta INTEGER NOT NULL CHECK (quantity_delta != 0),
  previous_stock INTEGER NOT NULL,
  new_stock INTEGER NOT NULL,
  reference_id TEXT,                         -- ID de pedido, número de WhatsApp o identificador
  notes TEXT,                                -- Detalle del movimiento
  performed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TRIGGER: MANTENER SINCRONIZADO EL STOCK TOTAL POR COLECCIÓN
CREATE OR REPLACE FUNCTION public.fn_sync_collection_stock()
RETURNS TRIGGER AS $$
DECLARE
  v_col_id TEXT;
BEGIN
  IF TG_OP = 'DELETE' THEN
    v_col_id := OLD.collection_id;
  ELSE
    v_col_id := NEW.collection_id;
  END IF;

  UPDATE public.inventory_collections
  SET 
    current_stock = COALESCE((
      SELECT SUM(stock_quantity) 
      FROM public.inventory_items 
      WHERE collection_id = v_col_id AND is_active = TRUE
    ), 0),
    updated_at = NOW()
  WHERE id = v_col_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_sync_collection_stock ON public.inventory_items;
CREATE TRIGGER trg_sync_collection_stock
  AFTER INSERT OR UPDATE OF stock_quantity, is_active, collection_id OR DELETE
  ON public.inventory_items
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_sync_collection_stock();

-- 6. TRIGGER: ACTUALIZAR TIMESTAMP UPDATED_AT
CREATE OR REPLACE FUNCTION public.fn_touch_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_touch_inventory_items ON public.inventory_items;
CREATE TRIGGER trg_touch_inventory_items
  BEFORE UPDATE ON public.inventory_items
  FOR EACH ROW
  EXECUTE FUNCTION public.fn_touch_updated_at();

-- 7. PROCEDIMIENTO ATÓMICO: RESERVA DE PIEZA (Anti-Race Condition para WhatsApp/Web)
CREATE OR REPLACE FUNCTION public.rpc_reserve_stock(
  p_item_id TEXT,
  p_quantity INTEGER DEFAULT 1,
  p_reservation_ref TEXT DEFAULT 'WHATSAPP_CONCIERGE'
)
RETURNS JSONB AS $$
DECLARE
  v_item RECORD;
  v_new_reserved INTEGER;
BEGIN
  IF p_quantity <= 0 THEN
    RETURN jsonb_build_object('success', false, 'error', 'La cantidad debe ser mayor a 0');
  END IF;

  -- Bloquear fila para escritura atómica (SELECT FOR UPDATE)
  SELECT * INTO v_item
  FROM public.inventory_items
  WHERE id = p_item_id OR sku = p_item_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Pieza no encontrada en inventario');
  END IF;

  IF (v_item.stock_quantity - v_item.reserved_quantity) < p_quantity THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Stock insuficiente para la reserva',
      'available', (v_item.stock_quantity - v_item.reserved_quantity),
      'requested', p_quantity
    );
  END IF;

  v_new_reserved := v_item.reserved_quantity + p_quantity;

  UPDATE public.inventory_items
  SET reserved_quantity = v_new_reserved
  WHERE id = v_item.id;

  -- Registrar en auditoría
  INSERT INTO public.inventory_movements (
    item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
  ) VALUES (
    v_item.id,
    'reservation_hold',
    p_quantity,
    (v_item.stock_quantity - v_item.reserved_quantity),
    (v_item.stock_quantity - v_new_reserved),
    p_reservation_ref,
    'Reserva temporal iniciada por agente de WhatsApp / carrito'
  );

  RETURN jsonb_build_object(
    'success', true,
    'item_id', v_item.id,
    'sku', v_item.sku,
    'name', v_item.name,
    'reserved_quantity', p_quantity,
    'remaining_available', (v_item.stock_quantity - v_new_reserved)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. PROCEDIMIENTO ATÓMICO: LIBERAR RESERVA
CREATE OR REPLACE FUNCTION public.rpc_release_stock(
  p_item_id TEXT,
  p_quantity INTEGER DEFAULT 1,
  p_reservation_ref TEXT DEFAULT 'CANCELLED'
)
RETURNS JSONB AS $$
DECLARE
  v_item RECORD;
  v_new_reserved INTEGER;
BEGIN
  SELECT * INTO v_item
  FROM public.inventory_items
  WHERE id = p_item_id OR sku = p_item_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Pieza no encontrada');
  END IF;

  v_new_reserved := GREATEST(0, v_item.reserved_quantity - p_quantity);

  UPDATE public.inventory_items
  SET reserved_quantity = v_new_reserved
  WHERE id = v_item.id;

  INSERT INTO public.inventory_movements (
    item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
  ) VALUES (
    v_item.id,
    'reservation_release',
    p_quantity,
    (v_item.stock_quantity - v_item.reserved_quantity),
    (v_item.stock_quantity - v_new_reserved),
    p_reservation_ref,
    'Liberación de reserva por expiración o descarte'
  );

  RETURN jsonb_build_object(
    'success', true,
    'item_id', v_item.id,
    'sku', v_item.sku,
    'released_quantity', p_quantity,
    'available', (v_item.stock_quantity - v_new_reserved)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. PROCEDIMIENTO ATÓMICO: CONFIRMAR VENTA
CREATE OR REPLACE FUNCTION public.rpc_confirm_sale(
  p_item_id TEXT,
  p_quantity INTEGER DEFAULT 1,
  p_order_ref TEXT DEFAULT 'ORDER_PAID'
)
RETURNS JSONB AS $$
DECLARE
  v_item RECORD;
  v_new_stock INTEGER;
  v_new_reserved INTEGER;
BEGIN
  SELECT * INTO v_item
  FROM public.inventory_items
  WHERE id = p_item_id OR sku = p_item_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN jsonb_build_object('success', false, 'error', 'Pieza no encontrada');
  END IF;

  IF v_item.stock_quantity < p_quantity THEN
    RETURN jsonb_build_object('success', false, 'error', 'Stock físico insuficiente para completar venta');
  END IF;

  v_new_stock := v_item.stock_quantity - p_quantity;
  v_new_reserved := GREATEST(0, v_item.reserved_quantity - p_quantity);

  UPDATE public.inventory_items
  SET 
    stock_quantity = v_new_stock,
    reserved_quantity = v_new_reserved
  WHERE id = v_item.id;

  INSERT INTO public.inventory_movements (
    item_id, movement_type, quantity_delta, previous_stock, new_stock, reference_id, notes
  ) VALUES (
    v_item.id,
    'sale',
    -p_quantity,
    v_item.stock_quantity,
    v_new_stock,
    p_order_ref,
    'Venta completada y verificada'
  );

  RETURN jsonb_build_object(
    'success', true,
    'item_id', v_item.id,
    'sku', v_item.sku,
    'sold_quantity', p_quantity,
    'new_stock_quantity', v_new_stock
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. SEGURIDAD & POLÍTICAS RLS (Row Level Security)
ALTER TABLE public.inventory_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;

-- Políticas para inventory_collections (Lectura pública)
DROP POLICY IF EXISTS "Lectura pública de colecciones" ON public.inventory_collections;
CREATE POLICY "Lectura pública de colecciones"
  ON public.inventory_collections FOR SELECT
  USING (true);

-- Políticas para inventory_items (Lectura pública para catálogo y agentes)
DROP POLICY IF EXISTS "Lectura pública de piezas de inventario" ON public.inventory_items;
CREATE POLICY "Lectura pública de piezas de inventario"
  ON public.inventory_items FOR SELECT
  USING (is_active = true);

-- Políticas para Administradores / Service Role (Escritura completa)
DROP POLICY IF EXISTS "Admin gestión total colecciones" ON public.inventory_collections;
CREATE POLICY "Admin gestión total colecciones"
  ON public.inventory_collections FOR ALL
  USING (
    auth.role() = 'service_role' OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

DROP POLICY IF EXISTS "Admin gestión total items" ON public.inventory_items;
CREATE POLICY "Admin gestión total items"
  ON public.inventory_items FOR ALL
  USING (
    auth.role() = 'service_role' OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

DROP POLICY IF EXISTS "Admin lectura de movimientos" ON public.inventory_movements;
CREATE POLICY "Admin lectura de movimientos"
  ON public.inventory_movements FOR SELECT
  USING (
    auth.role() = 'service_role' OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

DROP POLICY IF EXISTS "Admin inserción de movimientos" ON public.inventory_movements;
CREATE POLICY "Admin inserción de movimientos"
  ON public.inventory_movements FOR INSERT
  WITH CHECK (
    auth.role() = 'service_role' OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
  );

-- 11. ÍNDICES DE ALTO RENDIMIENTO (Optimizados para Agentes de WhatsApp)
CREATE INDEX IF NOT EXISTS idx_inv_items_sku ON public.inventory_items(sku);
CREATE INDEX IF NOT EXISTS idx_inv_items_collection ON public.inventory_items(collection_id);
CREATE INDEX IF NOT EXISTS idx_inv_items_available ON public.inventory_items(available_quantity);
CREATE INDEX IF NOT EXISTS idx_inv_movements_item ON public.inventory_movements(item_id);
CREATE INDEX IF NOT EXISTS idx_inv_movements_created ON public.inventory_movements(created_at DESC);
