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

-- 3. TRIGGER: CREAR PERFIL AUTOMÁTICO AL REGISTRARSE EN AUTH.USERS
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'student'
  )
  ON CONFLICT (id) DO NOTHING;
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

CREATE POLICY "Los alumnos ven sus propias inscripciones" 
  ON public.enrollments FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Los alumnos pueden crear/actualizar sus inscripciones" 
  ON public.enrollments FOR ALL 
  USING (auth.uid() = user_id);

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
