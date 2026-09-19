'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile, LMSEnrollment } from './types';
import { LMS_COURSES } from './courseRepository';

interface StudentContextType {
  student: StudentProfile | null;
  enrollments: LMSEnrollment[];
  isLoading: boolean;
  completedLessons: string[];
  login: (email: string, name?: string) => void;
  loginDemo: () => void;
  logout: () => void;
  enrollInCourse: (courseId: string) => void;
  markLessonComplete: (courseId: string, lessonId: string) => void;
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

  // Cargar estado inicial desde localStorage
  useEffect(() => {
    try {
      const savedStudent = localStorage.getItem(LOCAL_STORAGE_STUDENT_KEY);
      const savedEnrollments = localStorage.getItem(LOCAL_STORAGE_ENROLLMENTS_KEY);
      const savedProgress = localStorage.getItem(LOCAL_STORAGE_PROGRESS_KEY);

      if (savedStudent) {
        setStudent(JSON.parse(savedStudent));
      }
      if (savedProgress) {
        setCompletedLessons(JSON.parse(savedProgress));
      }
      if (savedEnrollments) {
        const parsedEnrollments: LMSEnrollment[] = JSON.parse(savedEnrollments);
        // Hidratar con el curso completo
        const hydrated = parsedEnrollments.map((enr) => {
          const fullCourse = LMS_COURSES.find((c) => c.id === enr.courseId);
          return {
            ...enr,
            course: fullCourse || enr.course,
          };
        });
        setEnrollments(hydrated);
      } else if (savedStudent) {
        // Inscripción inicial por defecto en Tarot Nivel 1 para nuevos usuarios
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
      // Ignorar errores de localStorage
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (email: string, name?: string) => {
    const newStudent: StudentProfile = {
      id: `std-${Date.now()}`,
      email,
      fullName: name || email.split('@')[0],
      role: 'student',
      createdAt: new Date().toISOString(),
    };
    setStudent(newStudent);
    localStorage.setItem(LOCAL_STORAGE_STUDENT_KEY, JSON.stringify(newStudent));

    // Si no tiene cursos, le asignamos el curso de Tarot Nivel 1 de bienvenida
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
  };

  const loginDemo = () => {
    login('iniciado@arcanosolutions.com', 'Estudiante de los Arcanos');
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem(LOCAL_STORAGE_STUDENT_KEY);
  };

  const enrollInCourse = (courseId: string) => {
    const course = LMS_COURSES.find((c) => c.id === courseId);
    if (!course) return;

    if (enrollments.some((e) => e.courseId === courseId)) return;

    const newEnrollment: LMSEnrollment = {
      id: `enr-${Date.now()}`,
      userId: student?.id || 'guest',
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
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const updatedLessons = [...completedLessons, lessonId];
      setCompletedLessons(updatedLessons);
      localStorage.setItem(LOCAL_STORAGE_PROGRESS_KEY, JSON.stringify(updatedLessons));

      // Actualizar enrollment
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
