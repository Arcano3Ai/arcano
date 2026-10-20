-- ==============================================================================
-- ARCANO — ACADEMIA ESOTÉRICA & AULA VIRTUAL
-- Esquema de Base de Datos PostgreSQL / Supabase
-- Costo $0 USD / mes (Free Tier de Supabase)
-- ==============================================================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLA: PROFILES (Perfiles de Estudiantes & Maestros)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'tutor', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS en profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Los estudiantes pueden ver su propio perfil" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Los estudiantes pueden actualizar su propio perfil" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Inserción automática o de servicio" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- 3. TRIGGER: CREAR PERFIL E INSCRIPCIÓN AUTOMÁTICA AL REGISTRARSE EN AUTH.USERS
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_initial_course TEXT;
  v_payment_method TEXT;
BEGIN
  -- 1. Crear Perfil en public.profiles
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'student'
  )
  ON CONFLICT (id) DO NOTHING;

  -- 2. Crear Inscripción en public.enrollments de forma atómica y garantizada
  v_initial_course := COALESCE(new.raw_user_meta_data->>'initial_course_id', 'tarot-01');
  v_payment_method := COALESCE(new.raw_user_meta_data->>'payment_method', 'online_registration');

  INSERT INTO public.enrollments (user_id, course_slug, status, payment_method, progress_percentage, completed_lessons)
  VALUES (
    new.id,
    v_initial_course,
    'pending',
    v_payment_method,
    0,
    '{}'
  )
  ON CONFLICT (user_id, course_slug) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. TABLA: ENROLLMENTS (Inscripciones de Alumnos en Cursos)
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_slug TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  payment_method TEXT DEFAULT 'manual' CHECK (payment_method IN ('mercadopago', 'spei', 'whatsapp', 'gift', 'manual', 'online_registration')),
  payment_reference TEXT,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  completed_lessons TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_slug)
);

-- Habilitar RLS en enrollments
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Los alumnos ven sus propias inscripciones" ON public.enrollments;
DROP POLICY IF EXISTS "Los alumnos pueden crear/actualizar sus inscripciones" ON public.enrollments;
DROP POLICY IF EXISTS "Permitir insercion inicial de inscripciones" ON public.enrollments;
DROP POLICY IF EXISTS "Permitir actualizacion de inscripciones" ON public.enrollments;

CREATE POLICY "Los alumnos ven sus propias inscripciones" 
  ON public.enrollments FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Permitir insercion de inscripciones" 
  ON public.enrollments FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Permitir actualizacion de inscripciones" 
  ON public.enrollments FOR UPDATE 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 5. TABLA: LESSON_PROGRESS (Progreso granular de cada lección y video)
CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_slug TEXT NOT NULL,
  lesson_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT TRUE,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_slug, lesson_id)
);

ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Los alumnos gestionan su progreso de lecciones" 
  ON public.lesson_progress FOR ALL 
  USING (auth.uid() = user_id);

-- 6. TABLA: CERTIFICATES (Diplomas Sagrados y Acreditaciones)
CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_slug TEXT NOT NULL,
  certificate_code TEXT UNIQUE NOT NULL,
  issue_date TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::JSONB
);

ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Los alumnos ven sus propios diplomas" 
  ON public.certificates FOR SELECT 
  USING (auth.uid() = user_id);

-- 7. ÍNDICES DE RENDIMIENTO
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON public.enrollments(course_slug);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lookup ON public.lesson_progress(user_id, course_slug);
CREATE INDEX IF NOT EXISTS idx_certificates_user ON public.certificates(user_id);

-- ==============================================================================
-- 8. SISTEMA DE INVENTARIO CEREMONIAL & TIENDA EN TIEMPO REAL
-- ==============================================================================

-- TABLA: INVENTORY_COLLECTIONS
CREATE TABLE IF NOT EXISTS public.inventory_collections (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  symbol TEXT,
  target_stock INTEGER NOT NULL DEFAULT 1000,
  current_stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TABLA: INVENTORY_ITEMS
CREATE TABLE IF NOT EXISTS public.inventory_items (
  id TEXT PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  collection_id TEXT NOT NULL REFERENCES public.inventory_collections(id) ON DELETE RESTRICT,
  price_mxn NUMERIC(10, 2) NOT NULL CHECK (price_mxn >= 0),
  stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  reserved_quantity INTEGER NOT NULL DEFAULT 0 CHECK (reserved_quantity >= 0),
  available_quantity INTEGER GENERATED ALWAYS AS (stock_quantity - reserved_quantity) STORED,
  min_stock_alert INTEGER NOT NULL DEFAULT 5 CHECK (min_stock_alert >= 0),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  tagline TEXT,
  stone_type TEXT,
  image_url TEXT,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT chk_stock_integrity CHECK (stock_quantity >= reserved_quantity)
);

-- TABLA: INVENTORY_MOVEMENTS
CREATE TABLE IF NOT EXISTS public.inventory_movements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  item_id TEXT NOT NULL REFERENCES public.inventory_items(id) ON DELETE CASCADE,
  movement_type TEXT NOT NULL CHECK (
    movement_type IN (
      'initial_seed',
      'restock',
      'reservation_hold',
      'reservation_release',
      'sale',
      'audit_adjustment',
      'damaged'
    )
  ),
  quantity_delta INTEGER NOT NULL CHECK (quantity_delta != 0),
  previous_stock INTEGER NOT NULL,
  new_stock INTEGER NOT NULL,
  reference_id TEXT,
  notes TEXT,
  performed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TRIGGER: SINCRONIZAR STOCK POR COLECCIÓN
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

-- PROCEDIMIENTO ATÓMICO: RESERVA DE PIEZA (Anti-Race Condition para WhatsApp/Web)
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

-- PROCEDIMIENTO ATÓMICO: LIBERAR RESERVA
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

-- PROCEDIMIENTO ATÓMICO: CONFIRMAR VENTA
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

-- RLS PARA INVENTARIO
ALTER TABLE public.inventory_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_movements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Lectura pública de colecciones" ON public.inventory_collections;
CREATE POLICY "Lectura pública de colecciones"
  ON public.inventory_collections FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Lectura pública de piezas de inventario" ON public.inventory_items;
CREATE POLICY "Lectura pública de piezas de inventario"
  ON public.inventory_items FOR SELECT
  USING (is_active = true);

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

-- ÍNDICES DE RENDIMIENTO PARA INVENTARIO
CREATE INDEX IF NOT EXISTS idx_inv_items_sku ON public.inventory_items(sku);
CREATE INDEX IF NOT EXISTS idx_inv_items_collection ON public.inventory_items(collection_id);
CREATE INDEX IF NOT EXISTS idx_inv_items_available ON public.inventory_items(available_quantity);
CREATE INDEX IF NOT EXISTS idx_inv_movements_item ON public.inventory_movements(item_id);
CREATE INDEX IF NOT EXISTS idx_inv_movements_created ON public.inventory_movements(created_at DESC);

