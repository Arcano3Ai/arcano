'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStudent } from '@/lib/academy/studentContext';
import { LMS_COURSES } from '@/lib/academy/courseRepository';

export default function StudentDashboardPage() {
  const router = useRouter();
  const {
    student,
    enrollments,
    completedLessons,
    isLoading,
    logout,
    enrollInCourse,
    getCourseProgress,
  } = useStudent();

  // Si no está logueado tras terminar de cargar, invitarlo a iniciar sesión
  if (!isLoading && !student) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-md p-8 rounded-3xl bg-[#090D18]/90 border border-amber-500/30 backdrop-blur-xl shadow-2xl space-y-5">
          <span className="text-4xl">🗝️</span>
          <h2 className="text-2xl font-serif font-bold text-amber-100">
            Acceso Reservado a Estudiantes
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Inicia sesión o regístrate en la Academia Esotérica ARCANO para acceder a tus lecciones y diplomas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/academia/login"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-serif font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all text-center"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/academia/registro"
              className="flex-1 py-3 rounded-xl border border-amber-500/40 text-amber-200 font-serif text-xs font-semibold hover:bg-amber-500/10 transition-all text-center"
            >
              Crear Cuenta
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Contar cuántos cursos están al 100% completados
  const completedCoursesCount = enrollments.filter((enr) => getCourseProgress(enr.courseId) === 100).length;
  const webPromotionProgress = Math.min(Math.round((completedCoursesCount / 5) * 100), 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Header Banner del Alumno */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#090D18] via-[#0D1322] to-[#090D18] border border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-serif uppercase tracking-widest">
            <span>✦</span> Alumno Consagrado de los Arcanos
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
            Bienvenido, {student?.fullName || 'Iniciado'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-light">
            Tu santuario de estudio místico. Continúa donde lo dejaste y avanza hacia tu maestría.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/academia"
            className="px-4 py-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs font-serif hover:bg-amber-500/20 transition-all"
          >
            Ver Catálogo General
          </Link>
          <button
            type="button"
            onClick={() => {
              logout();
              router.push('/academia');
            }}
            className="px-4 py-2.5 rounded-xl border border-rose-500/30 text-rose-300 text-xs font-serif hover:bg-rose-500/10 transition-all"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* 2. Métricas de Progreso y Promoción Página Web Gratis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Métrica 1: Cursos en Formación */}
        <div className="p-6 rounded-3xl bg-[#090D18]/90 border border-amber-500/25 flex items-center justify-between">
          <div>
            <span className="text-xs font-serif text-slate-400 block uppercase tracking-wider">
              Cursos Inscritos
            </span>
            <span className="text-3xl font-mono font-bold text-amber-300">
              {enrollments.length}
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">Disciplinas activas</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl">
            📜
          </div>
        </div>

        {/* Métrica 2: Lecciones Estudiadas */}
        <div className="p-6 rounded-3xl bg-[#090D18]/90 border border-sky-500/25 flex items-center justify-between">
          <div>
            <span className="text-xs font-serif text-slate-400 block uppercase tracking-wider">
              Lecciones Completadas
            </span>
            <span className="text-3xl font-mono font-bold text-sky-400">
              {completedLessons.length}
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">Conocimiento asimilado</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-2xl">
            ⭐
          </div>
        </div>

        {/* Métrica 3: Meta Página Web Gratis (5 Niveles) */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-500/15 via-[#090D18] to-purple-900/20 border border-amber-500/35 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-serif text-amber-300 font-bold uppercase tracking-wider">
              🎁 Bonificación: Web Gratis
            </span>
            <span className="text-xs font-mono text-amber-400 font-bold">
              {completedCoursesCount}/5 Niveles
            </span>
          </div>
          <div className="mt-2">
            <div className="w-full bg-black/60 rounded-full h-2 border border-amber-500/20 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${webPromotionProgress}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-300 mt-2 font-light">
              {completedCoursesCount >= 5
                ? '¡Felicidades! Has completado tus 5 niveles y desbloqueado tu Página Web con dominio propio incluido.'
                : `Completa ${5 - completedCoursesCount} nivel(es) más para reclamar tu web personalizada con dominio.`}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Mis Cursos en Curso */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
              Mis Cursos en Curso
            </h2>
            <p className="text-xs text-slate-400">
              Haz clic en cualquier curso para ingresar directamente al aula virtual.
            </p>
          </div>
        </div>

        {enrollments.length === 0 ? (
          <div className="p-8 rounded-3xl bg-[#090D18]/80 border border-amber-500/20 text-center space-y-3">
            <p className="text-sm text-slate-300">
              Aún no estás inscrito en ningún curso. Elige un curso a continuación para comenzar.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.map((enr) => {
              const progress = getCourseProgress(enr.courseId);
              const firstLessonId = enr.course.modules[0]?.lessons[0]?.id || '1';

              return (
                <div
                  key={enr.id}
                  className="bg-[#090D18]/90 border border-amber-500/30 rounded-3xl p-6 backdrop-blur-md flex flex-col justify-between hover:border-amber-400 transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        Nivel {enr.course.romanLevel}
                      </span>
                      <span className="text-xs font-serif text-slate-400">
                        {enr.course.durationHours}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                      {enr.course.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 font-light">
                      {enr.course.description}
                    </p>

                    {/* Barra de progreso */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400">Progreso del curso:</span>
                        <span className="text-amber-400 font-bold">{progress}%</span>
                      </div>
                      <div className="w-full bg-black/60 rounded-full h-2 border border-amber-500/20 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link
                      href={`/academia/cursos/${enr.course.slug}/aprender?lesson=${firstLessonId}`}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-serif font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.25)] hover:brightness-110 flex items-center justify-center gap-2 transition-all"
                    >
                      <span>▶</span>
                      <span>{progress > 0 ? 'Continuar Lección' : 'Comenzar Curso'}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Cursos Disponibles para Inscripción Inmediata */}
      <div className="space-y-4 pt-6 border-t border-amber-500/20">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
            Explora Otras Disciplinas de la Academia
          </h2>
          <p className="text-xs text-slate-400">
            Inscríbete a nuevos niveles de Tarot, Astrología, Numerología y Reiki por solo $799 MXN por nivel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LMS_COURSES.filter((c) => !enrollments.some((e) => e.courseId === c.id))
            .slice(0, 4)
            .map((course) => (
              <div
                key={course.id}
                className="bg-black/40 border border-amber-500/20 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-500/40 transition-all"
              >
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 block w-fit mb-2">
                    {course.categoryName.toUpperCase()} · NIVEL {course.romanLevel}
                  </span>
                  <h4 className="font-serif font-bold text-sm text-slate-100 mb-1">
                    {course.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {course.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-sm font-mono font-bold text-amber-300">
                    {course.formattedPrice}
                  </span>
                  <button
                    type="button"
                    onClick={() => enrollInCourse(course.id)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-200 text-xs font-serif hover:bg-amber-500/30 transition-all"
                  >
                    + Inscribirme
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
