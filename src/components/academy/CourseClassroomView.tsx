'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useStudent } from '@/lib/academy/studentContext';
import { getLMSCourseBySlug, getLMSLesson } from '@/lib/academy/courseRepository';

interface CourseClassroomViewProps {
  slug: string;
}

export default function CourseClassroomView({ slug }: CourseClassroomViewProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { student, markLessonComplete, isLessonCompleted, getCourseProgress, enrollInCourse } = useStudent();

  const lessonIdFromUrl = searchParams.get('lesson');
  const course = getLMSCourseBySlug(slug);

  // Determinar lección activa
  const firstLessonId = course?.modules[0]?.lessons[0]?.id || '';
  const currentLessonId = lessonIdFromUrl || firstLessonId;

  const lessonData = getLMSLesson(slug, currentLessonId);
  const [activeTab, setActiveTab] = useState<'summary' | 'resources' | 'notes'>('summary');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Si el estudiante no está matriculado, matricularlo automáticamente para la demo
  useEffect(() => {
    if (course) {
      enrollInCourse(course.id);
    }
  }, [course, enrollInCourse]);

  if (!course || !lessonData) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-4">
        <span className="text-3xl">⚠️</span>
        <h2 className="text-xl font-serif text-amber-200">Curso o Lección no encontrada</h2>
        <Link
          href="/academia/mi-panel"
          className="px-4 py-2 bg-amber-500/20 text-amber-200 rounded-xl text-xs font-serif hover:bg-amber-500/30"
        >
          ← Volver a Mi Panel
        </Link>
      </div>
    );
  }

  const { lesson, module, prevLesson, nextLesson } = lessonData;
  const completed = isLessonCompleted(lesson.id);
  const courseProgress = getCourseProgress(course.id);

  const handleCompleteAndNext = () => {
    markLessonComplete(course.id, lesson.id);
    if (nextLesson) {
      router.push(`/academia/cursos/${slug}/aprender?lesson=${nextLesson.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070E] text-slate-100 flex flex-col">
      {/* 1. Barra de Control Superior del Aula */}
      <header className="h-16 border-b border-amber-500/20 bg-[#090D18]/90 px-4 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            href="/academia/mi-panel"
            className="p-2 rounded-xl text-slate-400 hover:text-amber-300 hover:bg-white/5 transition-colors text-xs flex items-center gap-1.5 font-serif"
            title="Volver a Mi Panel de Alumno"
          >
            <span>←</span>
            <span className="hidden sm:inline">Mi Panel</span>
          </Link>
          <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 block">
              {course.title}
            </span>
            <span className="text-xs font-serif text-slate-200 font-semibold line-clamp-1">
              {lesson.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              Progreso: <strong className="text-amber-300">{courseProgress}%</strong>
            </span>
            <div className="w-24 bg-black/60 rounded-full h-2 border border-amber-500/20 overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${courseProgress}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-200 text-xs font-serif flex items-center gap-1.5 hover:bg-amber-500/20 transition-all"
          >
            <span>📑</span>
            <span className="hidden sm:inline">{isSidebarOpen ? 'Ocultar Temario' : 'Ver Temario'}</span>
          </button>
        </div>
      </header>

      {/* 2. Cuerpo Principal del Aula Virtual */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Zona de Reproducción de Video y Contenido */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Contenedor de Video 16:9 con Estética Dark Luxury */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black border-2 border-amber-500/30 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${lesson.videoId}?modestbranding=1&rel=0&iv_load_policy=3`}
              title={lesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          {/* Barra de Acciones de Lección */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#090D18]/90 border border-amber-500/20">
            <div className="flex items-center gap-2">
              <span className="text-sm font-serif font-bold text-amber-100">
                {lesson.title}
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                ({lesson.durationMinutes} min)
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => markLessonComplete(course.id, lesson.id)}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-serif transition-all flex items-center justify-center gap-1.5 ${
                  completed
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                    : 'border border-amber-500/30 bg-amber-500/10 text-amber-200 hover:bg-amber-500/20'
                }`}
              >
                <span>{completed ? '✓ Lección Completada' : 'Marcar como Completada'}</span>
              </button>

              {nextLesson && (
                <button
                  type="button"
                  onClick={handleCompleteAndNext}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-serif font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Siguiente Lección →</span>
                </button>
              )}
            </div>
          </div>

          {/* Pestañas de Estudio Debajo del Video */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 border-b border-amber-500/20 pb-2">
              {[
                { id: 'summary', label: 'Resumen & Apuntes', icon: '📖' },
                { id: 'resources', label: 'Materiales & PDFs', icon: '📥' },
                { id: 'notes', label: 'Dudas al Instructor', icon: '💬' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-2 rounded-xl text-xs font-serif transition-all flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? 'bg-amber-500/20 border border-amber-400 text-amber-100 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Contenido de la pestaña */}
            <div className="p-6 rounded-3xl bg-[#090D18]/80 border border-amber-500/20 min-h-[160px]">
              {activeTab === 'summary' && (
                <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  <h4 className="font-serif font-bold text-amber-200 text-base">
                    Objetivo de Aprendizaje
                  </h4>
                  <p>{lesson.description}</p>
                  <p>
                    Recuerda llevar una libreta ceremonial de apuntes para anotar tus reflexiones, sincronicidades y sensaciones energéticas tras cada práctica.
                  </p>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-amber-200 text-sm">
                    Recursos Descargables de Esta Lección
                  </h4>
                  <div className="space-y-2">
                    {lesson.resources?.map((res, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-black/40 border border-amber-500/20 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-amber-400">📄</span>
                          <span className="text-slate-200 font-medium">{res.name}</span>
                        </div>
                        <a
                          href="#descargar"
                          onClick={(e) => {
                            e.preventDefault();
                            alert('El archivo PDF se descargará a tu dispositivo.');
                          }}
                          className="px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-200 text-[11px] font-serif hover:bg-amber-500/30 transition-all"
                        >
                          Descargar PDF ↓
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-amber-200 text-sm">
                    Acompañamiento Personalizado
                  </h4>
                  <p className="text-xs text-slate-300">
                    Si te surge alguna duda sobre la interpretación de este símbolo o ejercicio, puedes contactar directamente a la maestra o instructor de ARCANO:
                  </p>
                  <a
                    href={`https://wa.me/5215512345678?text=${encodeURIComponent(
                      `Hola ARCANO, soy ${student?.fullName || 'estudiante'} y tengo una consulta sobre la lección "${lesson.title}" del curso "${course.title}".`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-serif text-xs font-bold hover:brightness-110 shadow-lg transition-all"
                  >
                    <span>💬</span> Consultar por WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* 3. Menú Lateral (Sidebar) de Módulos y Lecciones */}
        {isSidebarOpen && (
          <aside className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-amber-500/20 bg-[#070A14] flex flex-col shrink-0">
            <div className="p-4 border-b border-amber-500/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold block">
                  CONTENIDO DEL CURSO
                </span>
                <span className="text-xs font-serif text-slate-300">
                  {course.totalLessons} lecciones organizadas
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {course.modules.map((mod, modIdx) => (
                <div key={mod.id} className="space-y-2">
                  <div className="px-2 py-1">
                    <span className="text-[10px] uppercase font-mono text-amber-400 block font-bold">
                      Módulo {modIdx + 1}
                    </span>
                    <h5 className="font-serif font-bold text-xs text-slate-200">
                      {mod.title}
                    </h5>
                  </div>

                  <div className="space-y-1">
                    {mod.lessons.map((les) => {
                      const isActive = les.id === lesson.id;
                      const isDone = isLessonCompleted(les.id);

                      return (
                        <Link
                          key={les.id}
                          href={`/academia/cursos/${slug}/aprender?lesson=${les.id}`}
                          className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-start gap-2.5 group ${
                            isActive
                              ? 'bg-amber-500/20 border border-amber-400 text-amber-100 shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                              : 'hover:bg-white/5 text-slate-300 border border-transparent'
                          }`}
                        >
                          <div className="pt-0.5 shrink-0">
                            {isDone ? (
                              <span className="text-emerald-400 text-xs font-bold">✓</span>
                            ) : (
                              <span className="w-3.5 h-3.5 rounded-full border border-slate-500 inline-block group-hover:border-amber-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="block font-serif line-clamp-1 leading-snug">
                              {les.title}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 block">
                              {les.durationMinutes} min
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
