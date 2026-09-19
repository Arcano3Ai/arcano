# 🏛️ Guía de Configuración del Backend: Supabase ($0 USD/mes)

Esta guía detalla cómo habilitar el backend de **Autenticación, Alumnos, Inscripciones y Progreso de Lecciones** de la Academia Esotérica ARCANO en el plan gratuito de Supabase.

---

## 1. Crear Proyecto Gratuito en Supabase
1. Ingresa a [https://supabase.com](https://supabase.com) e inicia sesión con tu cuenta de GitHub o correo.
2. Haz clic en **New project** (Nuevo proyecto).
3. Asigna los siguientes datos:
   - **Name**: `arcano-lms`
   - **Database Password**: Genera una contraseña segura y guárdala.
   - **Region**: Selecciona `us-east-1` (North Virginia) o la más cercana a México / tu audiencia.
   - **Pricing Plan**: `Free Tier` ($0 USD / mes).

---

## 2. Ejecutar el Script de Base de Datos
1. En el panel izquierdo de Supabase, haz clic en **SQL Editor** (icono `>_`).
2. Haz clic en **New query** (Nueva consulta).
3. Abre el archivo de este repositorio: [`supabase/schema.sql`](file:///c:/Users/sergi/MisArchivosLocales/ARCANO%20%E2%80%94%20Sabidur%C3%ADa%20de%20los%20Arcanos/supabase/schema.sql).
4. Copia todo su contenido, pégalo en el editor de Supabase y haz clic en **Run** (Ejecutar).
5. Se crearán automáticamente:
   - Tabla `profiles` (perfiles vinculados a `auth.users`).
   - Trigger `on_auth_user_created` para creación automática de perfil al registrarse.
   - Tabla `enrollments` (cursos inscritos por alumno).
   - Tabla `lesson_progress` (checklist de lecciones y videos vistos).
   - Tabla `certificates` (diplomas sagrados).
   - Políticas RLS (Row Level Security) para proteger la privacidad de cada estudiante.

---

## 3. Configurar las Variables de Entorno en ARCANO
1. En Supabase, ve a **Project Settings** (icono de engranaje) -> **API**.
2. Copia:
   - **Project URL**
   - **Project API Keys** -> `anon` / `public`
3. En tu proyecto o en tu panel de despliegue (GitHub Secrets o archivo `.env.local`), añade:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
   ```

---

## 4. ¿Qué pasa si aún no he creado la cuenta de Supabase?
El sistema cuenta con un **Modo Híbrido Resiliente**:
- Si no detecta las claves de Supabase, la plataforma utiliza `localStorage` con sesión instantánea y modo demo sin romper nunca la experiencia del usuario.
- En cuanto añadas las variables de entorno, comenzará a sincronizar automáticamente con la base de datos PostgreSQL en la nube.
