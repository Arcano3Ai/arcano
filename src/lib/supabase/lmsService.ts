import { createClient } from './client';
import { StudentProfile, LMSEnrollment, LMSCourse } from '../academy/types';
import { LMS_COURSES } from '../academy/courseRepository';

export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(
    url &&
    key &&
    !url.includes('placeholder') &&
    !key.includes('placeholder')
  );
}

export interface AuthResponse {
  success: boolean;
  error?: string;
  user?: {
    id: string;
    email: string;
    fullName?: string;
  };
}

/**
 * Registra un nuevo estudiante en Supabase Auth y crea su registro en public.profiles
 */
export async function registerStudent(
  email: string,
  password: string,
  fullName: string,
  initialCourseId?: string
): Promise<AuthResponse> {
  if (!isSupabaseConfigured()) {
    return {
      success: true,
      user: {
        id: `local-${Date.now()}`,
        email,
        fullName,
      },
    };
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data.user) {
      return { success: false, error: 'No se pudo crear la cuenta de usuario.' };
    }

    // Insertar perfil en public.profiles si no existe
    await supabase.from('profiles').upsert({
      id: data.user.id,
      email: data.user.email,
      full_name: fullName,
      role: 'student',
      updated_at: new Date().toISOString(),
    });

    // Si seleccionó un curso inicial, creamos la inscripción
    if (initialCourseId) {
      await enrollStudentInCourse(data.user.id, initialCourseId, 'pending', 'online_registration');
    }

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email || email,
        fullName,
      },
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error inesperado al registrarse.' };
  }
}

/**
 * Inicia sesión del estudiante mediante email y contraseña
 */
export async function loginStudent(
  email: string,
  password: string
): Promise<AuthResponse> {
  if (!isSupabaseConfigured()) {
    return {
      success: true,
      user: {
        id: `local-${Date.now()}`,
        email,
        fullName: email.split('@')[0],
      },
    };
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data.user) {
      return { success: false, error: 'No se encontraron datos para este usuario.' };
    }

    // Obtener perfil adicional si existe
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', data.user.id)
      .single();

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email || email,
        fullName: profile?.full_name || data.user.user_metadata?.full_name || email.split('@')[0],
      },
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'Error inesperado al iniciar sesión.' };
  }
}

/**
 * Cierra la sesión activa
 */
export async function logoutStudent(): Promise<void> {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch {
    // Silencioso
  }
}

/**
 * Obtiene las inscripciones activas de un estudiante en Supabase
 */
export async function fetchStudentEnrollments(userId: string): Promise<LMSEnrollment[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('enrollments')
      .select('*')
      .eq('user_id', userId);

    if (error || !data) return [];

    return data.map((item: any) => {
      const course = LMS_COURSES.find((c) => c.id === item.course_slug) || LMS_COURSES[0];
      return {
        id: item.id,
        userId: item.user_id,
        courseId: item.course_slug,
        course,
        status: item.status,
        enrolledAt: item.created_at,
        progressPercentage: item.progress_percentage || 0,
        completedLessonIds: item.completed_lessons || [],
      };
    });
  } catch {
    return [];
  }
}

/**
 * Inscribe a un estudiante en un curso
 */
export async function enrollStudentInCourse(
  userId: string,
  courseSlug: string,
  status: 'active' | 'pending' | 'completed' = 'active',
  paymentMethod: string = 'manual',
  paymentReference?: string
): Promise<boolean> {
  if (!isSupabaseConfigured()) return true;

  try {
    const supabase = createClient();
    const { error } = await supabase.from('enrollments').upsert(
      {
        user_id: userId,
        course_slug: courseSlug,
        status,
        payment_method: paymentMethod,
        payment_reference: paymentReference || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,course_slug' }
    );

    return !error;
  } catch {
    return false;
  }
}

/**
 * Guarda el progreso de una lección en Supabase
 */
export async function persistLessonProgress(
  userId: string,
  courseSlug: string,
  lessonId: string,
  completed: boolean
): Promise<boolean> {
  if (!isSupabaseConfigured()) return true;

  try {
    const supabase = createClient();
    const { error } = await supabase.from('lesson_progress').upsert(
      {
        user_id: userId,
        course_slug: courseSlug,
        lesson_id: lessonId,
        completed,
        completed_at: completed ? new Date().toISOString() : null,
      },
      { onConflict: 'user_id,course_slug,lesson_id' }
    );

    return !error;
  } catch {
    return false;
  }
}
