'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile, LMSEnrollment } from './types';
import { LMS_COURSES } from './courseRepository';
import {
  isSupabaseConfigured,
  registerStudent,
  loginStudent,
  logoutStudent,
  fetchStudentEnrollments,
  enrollStudentInCourse,
  persistLessonProgress,
} from '../supabase/lmsService';

interface StudentContextType {
  student: StudentProfile | null;
  enrollments: LMSEnrollment[];
  isLoading: boolean;
  completedLessons: string[];
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (
    email: string,
    password: string,
    fullName: string,
    initialCourseId?: string
  ) => Promise<{ success: boolean; error?: string }>;
  loginDemo: () => void;
  logout: () => Promise<void>;
  enrollInCourse: (courseId: string, paymentMethod?: string, reference?: string) => Promise<boolean>;
  isCourseUnlocked: (courseId: string) => boolean;
  submitPaymentProof: (courseId: string, reference: string) => Promise<boolean>;
  markLessonComplete: (courseId: string, lessonId: string) => Promise<void>;
  isLessonCompleted: (lessonId: string) => boolean;
  getCourseProgress: (courseId: string) => number;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

const LOCAL_STORAGE_STUDENT_KEY = 'arcano_lms_student';
const LOCAL_STORAGE_ENROLLMENTS_KEY = 'arcano_lms_enrollments';
const LOCAL_STORAGE_PROGRESS_KEY = 'arcano_lms_completed_lessons';

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [enrollments, setEnrollments] = useState<LMSEnrollment[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar estado inicial desde localStorage y sincronizar con Supabase si está disponible
  useEffect(() => {
    async function initSession() {
      try {
        const savedStudent = localStorage.getItem(LOCAL_STORAGE_STUDENT_KEY);
        const savedEnrollments = localStorage.getItem(LOCAL_STORAGE_ENROLLMENTS_KEY);
        const savedProgress = localStorage.getItem(LOCAL_STORAGE_PROGRESS_KEY);

        if (savedStudent) {
          const currentStudent = JSON.parse(savedStudent);
          setStudent(currentStudent);

          // Si Supabase está configurado, sincronizar inscripciones desde la nube
          if (isSupabaseConfigured() && currentStudent.id) {
            const remoteEnrollments = await fetchStudentEnrollments(currentStudent.id);
            if (remoteEnrollments.length > 0) {
              setEnrollments(remoteEnrollments);
              localStorage.setItem(LOCAL_STORAGE_ENROLLMENTS_KEY, JSON.stringify(remoteEnrollments));
              setIsLoading(false);
              return;
            }
          }
        }

        if (savedProgress) {
          setCompletedLessons(JSON.parse(savedProgress));
        }

        if (savedEnrollments) {
          const parsedEnrollments: LMSEnrollment[] = JSON.parse(savedEnrollments);
          const hydrated = parsedEnrollments.map((enr) => {
            const fullCourse = LMS_COURSES.find((c) => c.id === enr.courseId);
            return {
              ...enr,
              course: fullCourse || enr.course,
            };
          });
          setEnrollments(hydrated);
        } else if (savedStudent) {
          // Inscripción inicial de bienvenida al Tarot Nivel 1
          const tarotCourse = LMS_COURSES[0];
          if (tarotCourse) {
            const initialEnrollment: LMSEnrollment = {
              id: 'enr-initial',
              userId: JSON.parse(savedStudent).id,
              courseId: tarotCourse.id,
              course: tarotCourse,
              status: 'active',
              enrolledAt: new Date().toISOString(),
              progressPercentage: 0,
              completedLessonIds: [],
            };
            setEnrollments([initialEnrollment]);
            localStorage.setItem(LOCAL_STORAGE_ENROLLMENTS_KEY, JSON.stringify([initialEnrollment]));
          }
        }
      } catch {
        // Silencioso ante errores de parseo
      } finally {
        setIsLoading(false);
      }
    }

    initSession();
  }, []);

  const register = async (
    email: string,
    password: string,
    fullName: string,
    initialCourseId?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const res = await registerStudent(email, password, fullName, initialCourseId);
      if (!res.success) {
        setIsLoading(false);
        return { success: false, error: res.error };
      }

      const newStudent: StudentProfile = {
        id: res.user?.id || `std-${Date.now()}`,
        email,
        fullName: res.user?.fullName || fullName,
        role: 'student',
        createdAt: new Date().toISOString(),
      };

      setStudent(newStudent);
      localStorage.setItem(LOCAL_STORAGE_STUDENT_KEY, JSON.stringify(newStudent));

      // Asignar el curso inicial elegido o el curso base
      const targetCourseId = initialCourseId || LMS_COURSES[0]?.id;
      const targetCourse = LMS_COURSES.find((c) => c.id === targetCourseId);

      if (targetCourse) {
        const isFree = targetCourse.priceMxn === 0 || targetCourse.level === 1;
        const initialEnrollments: LMSEnrollment[] = [];

        if (isFree) {
          initialEnrollments.push({
            id: `enr-${Date.now()}`,
            userId: newStudent.id,
            courseId: targetCourse.id,
            course: targetCourse,
            status: 'active',
            enrolledAt: new Date().toISOString(),
            progressPercentage: 0,
            completedLessonIds: [],
          });
        } else {
          // El curso es de pago (Nivel 2 o superior): Se registra como pendiente de pago
          initialEnrollments.push({
            id: `enr-${Date.now()}`,
            userId: newStudent.id,
            courseId: targetCourse.id,
            course: targetCourse,
            status: 'pending',
            enrolledAt: new Date().toISOString(),
            progressPercentage: 0,
            completedLessonIds: [],
          });

          // Se le otorga acceso activo inmediato al Nivel 1 gratuito de su categoría para comenzar a estudiar
          const freeLevel1 =
            LMS_COURSES.find(
              (c) => c.category === targetCourse.category && (c.priceMxn === 0 || c.level === 1)
            ) || LMS_COURSES[0];

          if (freeLevel1 && freeLevel1.id !== targetCourse.id) {
            initialEnrollments.push({
              id: `enr-free-${Date.now()}`,
              userId: newStudent.id,
              courseId: freeLevel1.id,
              course: freeLevel1,
              status: 'active',
              enrolledAt: new Date().toISOString(),
              progressPercentage: 0,
              completedLessonIds: [],
            });
          }
        }

        setEnrollments(initialEnrollments);
        localStorage.setItem(LOCAL_STORAGE_ENROLLMENTS_KEY, JSON.stringify(initialEnrollments));
      }

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Error al completar el registro.' };
    }
  };

  const login = async (
    email: string,
    password?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (password && isSupabaseConfigured()) {
        const res = await loginStudent(email, password);
        if (!res.success) {
          setIsLoading(false);
          return { success: false, error: res.error };
        }

        const authenticatedStudent: StudentProfile = {
          id: res.user?.id || `std-${Date.now()}`,
          email: res.user?.email || email,
          fullName: res.user?.fullName || email.split('@')[0],
          role: 'student',
          createdAt: new Date().toISOString(),
        };

        setStudent(authenticatedStudent);
        localStorage.setItem(LOCAL_STORAGE_STUDENT_KEY, JSON.stringify(authenticatedStudent));

        const remoteEnrollments = await fetchStudentEnrollments(authenticatedStudent.id);
        if (remoteEnrollments.length > 0) {
          setEnrollments(remoteEnrollments);
          localStorage.setItem(LOCAL_STORAGE_ENROLLMENTS_KEY, JSON.stringify(remoteEnrollments));
        }

        setIsLoading(false);
        return { success: true };
      }

      // Fallback local instantáneo para desarrollo o sin contraseña
      const newStudent: StudentProfile = {
        id: `std-${Date.now()}`,
        email,
        fullName: email.split('@')[0],
        role: 'student',
        createdAt: new Date().toISOString(),
      };
      setStudent(newStudent);
      localStorage.setItem(LOCAL_STORAGE_STUDENT_KEY, JSON.stringify(newStudent));

      if (enrollments.length === 0 && LMS_COURSES.length > 0) {
        const defaultCourse = LMS_COURSES[0];
        const defaultEnrollment: LMSEnrollment = {
          id: `enr-${Date.now()}`,
          userId: newStudent.id,
          courseId: defaultCourse.id,
          course: defaultCourse,
          status: 'active',
          enrolledAt: new Date().toISOString(),
          progressPercentage: 0,
          completedLessonIds: [],
        };
        setEnrollments([defaultEnrollment]);
        localStorage.setItem(LOCAL_STORAGE_ENROLLMENTS_KEY, JSON.stringify([defaultEnrollment]));
      }

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Error al iniciar sesión.' };
    }
  };

  const loginDemo = () => {
    const demoStudent: StudentProfile = {
      id: 'demo-student-id',
      email: 'iniciado@arcanosolutions.com',
      fullName: 'Estudiante de los Arcanos',
      role: 'student',
      createdAt: new Date().toISOString(),
    };
    setStudent(demoStudent);
    localStorage.setItem(LOCAL_STORAGE_STUDENT_KEY, JSON.stringify(demoStudent));

    // En demo solo se asigna el curso gratuito de Nivel 1 (nunca Nivel 2 de pago)
    if (enrollments.length === 0) {
      const freeLevel1Courses = LMS_COURSES.filter((c) => c.level === 1 || c.priceMxn === 0).slice(0, 1).map((c) => ({
        id: `enr-${c.id}`,
        userId: demoStudent.id,
        courseId: c.id,
        course: c,
        status: 'active' as const,
        enrolledAt: new Date().toISOString(),
        progressPercentage: 15,
        completedLessonIds: [c.modules[0]?.lessons[0]?.id || ''],
      }));
      setEnrollments(freeLevel1Courses);
      localStorage.setItem(LOCAL_STORAGE_ENROLLMENTS_KEY, JSON.stringify(freeLevel1Courses));
    }
  };

  const logout = async () => {
    await logoutStudent();
    setStudent(null);
    localStorage.removeItem(LOCAL_STORAGE_STUDENT_KEY);
  };

  /**
   * Determina si un curso está desbloqueado para acceder a sus lecciones.
   * Cursos de Nivel 1 (gratis) están siempre desbloqueados.
   * Cursos de Nivel 2 o superior requieren una matrícula con status 'active'.
   */
  const isCourseUnlocked = (courseId: string): boolean => {
    const course = LMS_COURSES.find((c) => c.id === courseId);
    if (!course) return false;

    // Nivel 1 gratuito siempre accesible
    if (course.priceMxn === 0 || course.level === 1) {
      return true;
    }

    // Nivel 2 o superior requiere confirmación explícita de pago activo
    const enr = enrollments.find((e) => e.courseId === courseId);
    return Boolean(enr && enr.status === 'active');
  };

  const enrollInCourse = async (
    courseId: string,
    paymentMethod: string = 'online_registration',
    reference?: string
  ): Promise<boolean> => {
    const course = LMS_COURSES.find((c) => c.id === courseId);
    if (!course) return false;

    const isFree = course.priceMxn === 0 || course.level === 1;
    const targetStatus: 'active' | 'pending' = isFree ? 'active' : 'pending';

    const existingEnrollment = enrollments.find((e) => e.courseId === courseId);
    if (existingEnrollment) {
      // Si ya está activo o pendiente, conservar su estado
      return true;
    }

    const userId = student?.id || 'guest';

    // Persistir en Supabase si está disponible
    if (student && isSupabaseConfigured()) {
      await enrollStudentInCourse(student.id, courseId, targetStatus, paymentMethod, reference);
    }

    const newEnrollment: LMSEnrollment = {
      id: `enr-${Date.now()}`,
      userId,
      courseId,
      course,
      status: targetStatus,
      enrolledAt: new Date().toISOString(),
      progressPercentage: 0,
      completedLessonIds: [],
    };

    const updated = [...enrollments, newEnrollment];
    setEnrollments(updated);
    localStorage.setItem(LOCAL_STORAGE_ENROLLMENTS_KEY, JSON.stringify(updated));
    return true;
  };

  /**
   * Permite someter un comprobante de pago o folio para validación administrativa
   */
  const submitPaymentProof = async (courseId: string, reference: string): Promise<boolean> => {
    const course = LMS_COURSES.find((c) => c.id === courseId);
    if (!course) return false;

    const userId = student?.id || 'guest';
    const existingIdx = enrollments.findIndex((e) => e.courseId === courseId);

    let updated: LMSEnrollment[];
    if (existingIdx >= 0) {
      updated = enrollments.map((enr, idx) =>
        idx === existingIdx
          ? { ...enr, status: 'pending' as const }
          : enr
      );
    } else {
      const newEnr: LMSEnrollment = {
        id: `enr-${Date.now()}`,
        userId,
        courseId,
        course,
        status: 'pending',
        enrolledAt: new Date().toISOString(),
        progressPercentage: 0,
        completedLessonIds: [],
      };
      updated = [...enrollments, newEnr];
    }

    setEnrollments(updated);
    localStorage.setItem(LOCAL_STORAGE_ENROLLMENTS_KEY, JSON.stringify(updated));

    if (student && isSupabaseConfigured()) {
      await enrollStudentInCourse(student.id, courseId, 'pending', 'manual_proof', reference);
    }

    return true;
  };

  const markLessonComplete = async (courseId: string, lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const updatedLessons = [...completedLessons, lessonId];
      setCompletedLessons(updatedLessons);
      localStorage.setItem(LOCAL_STORAGE_PROGRESS_KEY, JSON.stringify(updatedLessons));

      // Persistir en Supabase
      if (student && isSupabaseConfigured()) {
        await persistLessonProgress(student.id, courseId, lessonId, true);
      }

      // Actualizar enrollment local
      const course = LMS_COURSES.find((c) => c.id === courseId);
      if (course) {
        const allCourseLessons: string[] = [];
        course.modules.forEach((m) => m.lessons.forEach((l) => allCourseLessons.push(l.id)));
        const completedCount = allCourseLessons.filter((id) => updatedLessons.includes(id)).length;
        const percent = Math.round((completedCount / (allCourseLessons.length || 1)) * 100);

        setEnrollments((prev) =>
          prev.map((enr) => {
            if (enr.courseId === courseId) {
              return {
                ...enr,
                progressPercentage: percent,
                completedLessonIds: [...enr.completedLessonIds, lessonId],
                completedAt: percent === 100 ? new Date().toISOString() : undefined,
                status: percent === 100 ? 'completed' : 'active',
              };
            }
            return enr;
          })
        );
      }
    }
  };

  const isLessonCompleted = (lessonId: string) => completedLessons.includes(lessonId);

  const getCourseProgress = (courseId: string) => {
    const course = LMS_COURSES.find((c) => c.id === courseId);
    if (!course) return 0;
    const allIds: string[] = [];
    course.modules.forEach((m) => m.lessons.forEach((l) => allIds.push(l.id)));
    const done = allIds.filter((id) => completedLessons.includes(id)).length;
    return Math.round((done / (allIds.length || 1)) * 100);
  };

  return (
    <StudentContext.Provider
      value={{
        student,
        enrollments,
        isLoading,
        completedLessons,
        login,
        register,
        loginDemo,
        logout,
        enrollInCourse,
        isCourseUnlocked,
        submitPaymentProof,
        markLessonComplete,
        isLessonCompleted,
        getCourseProgress,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}
