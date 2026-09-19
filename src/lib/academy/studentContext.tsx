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
        const newEnrollment: LMSEnrollment = {
          id: `enr-${Date.now()}`,
          userId: newStudent.id,
          courseId: targetCourse.id,
          course: targetCourse,
          status: 'active',
          enrolledAt: new Date().toISOString(),
          progressPercentage: 0,
          completedLessonIds: [],
        };
        const updated = [newEnrollment];
        setEnrollments(updated);
        localStorage.setItem(LOCAL_STORAGE_ENROLLMENTS_KEY, JSON.stringify(updated));
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

    // Si no tiene cursos, le asignamos los dos primeros de Tarot
    if (enrollments.length === 0) {
      const initialCourses = LMS_COURSES.slice(0, 2).map((c) => ({
        id: `enr-${c.id}`,
        userId: demoStudent.id,
        courseId: c.id,
        course: c,
        status: 'active' as const,
        enrolledAt: new Date().toISOString(),
        progressPercentage: 25,
        completedLessonIds: [c.modules[0]?.lessons[0]?.id || ''],
      }));
      setEnrollments(initialCourses);
      localStorage.setItem(LOCAL_STORAGE_ENROLLMENTS_KEY, JSON.stringify(initialCourses));
    }
  };

  const logout = async () => {
    await logoutStudent();
    setStudent(null);
    localStorage.removeItem(LOCAL_STORAGE_STUDENT_KEY);
  };

  const enrollInCourse = async (
    courseId: string,
    paymentMethod: string = 'online_registration',
    reference?: string
  ): Promise<boolean> => {
    const course = LMS_COURSES.find((c) => c.id === courseId);
    if (!course) return false;

    if (enrollments.some((e) => e.courseId === courseId)) return true;

    const userId = student?.id || 'guest';

    // Persistir en Supabase
    if (student && isSupabaseConfigured()) {
      await enrollStudentInCourse(student.id, courseId, 'active', paymentMethod, reference);
    }

    const newEnrollment: LMSEnrollment = {
      id: `enr-${Date.now()}`,
      userId,
      courseId,
      course,
      status: 'active',
      enrolledAt: new Date().toISOString(),
      progressPercentage: 0,
      completedLessonIds: [],
    };

    const updated = [...enrollments, newEnrollment];
    setEnrollments(updated);
    localStorage.setItem(LOCAL_STORAGE_ENROLLMENTS_KEY, JSON.stringify(updated));
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
