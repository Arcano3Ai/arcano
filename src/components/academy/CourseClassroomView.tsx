'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useStudent } from '@/lib/academy/studentContext';
import { getLMSCourseBySlug, getLMSLesson } from '@/lib/academy/courseRepository';
import { getLessonStudyGuide } from '@/data/academyStudyGuides';
import { brandConfig } from '@/config/brandConfig';

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

  // Si el estudiante no está matriculado, matricularlo automáticamente para la sesión
  useEffect(() => {
    if (course) {
      enrollInCourse(course.id);
    }
  }, [course, enrollInCourse]);

  if (!course || !lessonData) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center space-y-4">
        <span className="text-3xl">⚠️</span>
        <h2 className="text-xl font-serif text-gold-light">Curso o Lección no encontrada</h2>
        <Link
          href="/academia/mi-panel"
          className="px-4 py-2 bg-gold/20 text-gold-light rounded-xl text-xs font-serif hover:bg-gold/30"
        >
          ← Volver a Mi Panel de Avance
        </Link>
      </div>
    );
  }

  const { lesson, nextLesson } = lessonData;
  const completed = isLessonCompleted(lesson.id);
  const courseProgress = getCourseProgress(course.id);
  const studyGuide = getLessonStudyGuide(lesson.id);

  const handleCompleteAndNext = () => {
    markLessonComplete(course.id, lesson.id);
    if (nextLesson) {
      router.push(`/academia/cursos/${slug}/aprender?lesson=${nextLesson.id}`);
    } else {
      router.push('/academia/mi-panel');
    }
  };

  return (
    <div className="min-h-screen bg-[#07050d] text-parchment flex flex-col">
      {/* 1. Barra Superior del Aula */}
      <header className="h-16 border-b border-charcoal-border bg-[#0a0714]/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/academia/mi-panel"
            className="text-xs text-parchment-muted hover:text-gold flex items-center gap-1.5 transition-colors"
          >
            <span>←</span>
            <span className="hidden sm:inline">Mi Panel de Avance</span>
          </Link>
          <span className="text-charcoal-border">|</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-serif font-bold text-gold-light truncate max-w-[200px] sm:max-w-md">
              {course.title}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold/10 border border-gold/30 text-gold font-mono uppercase tracking-wider">
              {course.romanLevel}
            </span>
          </div>
        </div>

        {/* Progreso del curso y botón de temario */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <div className="w-32 h-2 rounded-full bg-black/60 border border-charcoal-border overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold via-gold-light to-gold transition-all duration-500"
                style={{ width: `${courseProgress}%` }}
              />
            </div>
            <span className="text-[11px] font-mono text-gold-light font-bold">
              {courseProgress}%
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl bg-obsidian-deep border border-charcoal-border text-parchment-dim hover:text-gold hover:border-gold/40 text-xs font-serif flex items-center gap-1.5 transition-all"
          >
            <span>📚</span>
            <span className="hidden sm:inline">
              {isSidebarOpen ? 'Ocultar Temario' : 'Ver Temario'}
            </span>
          </button>
        </div>
      </header>

      {/* 2. Cuerpo Principal del Aula Virtual */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Zona de Reproducción de Video y Contenido de Estudio */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Contenedor de Video 16:9 con Estética Dark Luxury */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black border-2 border-gold/30 shadow-[0_0_50px_rgba(0,0,0,0.85)]">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${lesson.videoId}?modestbranding=1&rel=0&iv_load_policy=3`}
              title={lesson.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          {/* Barra de Acciones de Lección */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0c0917]/90 border border-gold/25">
            <div className="flex items-center gap-2">
              <span className="text-sm font-serif font-bold text-parchment">
                {lesson.title}
              </span>
              <span className="text-[11px] font-mono text-parchment-muted">
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
                    : 'border border-gold/30 bg-gold/10 text-gold-light hover:bg-gold/20'
                }`}
              >
                <span>{completed ? '✓ Lección Completada' : 'Marcar como Completada'}</span>
              </button>

              {nextLesson && (
                <button
                  type="button"
                  onClick={handleCompleteAndNext}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold to-gold-light text-obsidian font-serif font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(198,160,82,0.4)] transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Siguiente Lección →</span>
                </button>
              )}
            </div>
          </div>

          {/* Pestañas de Estudio Debajo del Video */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 border-b border-charcoal-border pb-2">
              {[
                { id: 'summary', label: '📖 Guía de Estudio & Texto Completo', icon: '📜' },
                { id: 'resources', label: 'Manuales & PDFs', icon: '📥' },
                { id: 'notes', label: 'Tutoría & Correo Oficial', icon: '✉️' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-2 rounded-xl text-xs font-serif transition-all flex items-center gap-1.5 ${
                    activeTab === tab.id
                      ? 'bg-gold/20 border border-gold text-gold-light font-bold shadow-[0_0_15px_rgba(198,160,82,0.2)]'
                      : 'text-parchment-muted hover:text-parchment'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Contenido de la pestaña */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0816]/95 border border-gold/25 min-h-[220px]">
              {/* PESTAÑA 1: GUÍA DE ESTUDIO Y TEXTO COMPLETO */}
              {activeTab === 'summary' && (
                <div className="space-y-6 text-xs sm:text-sm text-parchment-dim leading-relaxed font-light">
                  {studyGuide ? (
                    <div className="space-y-8 animate-fadeIn">
                      {/* Cabecera de la Guía */}
                      <div className="border-b border-charcoal-border/70 pb-4 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono text-gold/80">
                          <span>GUÍA DE ESTUDIO OFICIAL ARCANO</span>
                          <span>Tiempo estimado: {studyGuide.readingTimeMinutes} min de lectura</span>
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl text-parchment font-medium">
                          {studyGuide.title}
                        </h3>
                        <p className="text-xs text-parchment-muted italic">
                          {studyGuide.subtitle}
                        </p>
                      </div>

                      {/* Secciones de Estudio */}
                      {studyGuide.modules.map((mod, idx) => (
                        <div key={idx} className="space-y-3">
                          <h4 className="font-serif text-base text-gold-light font-semibold">
                            {mod.sectionTitle}
                          </h4>
                          {mod.paragraphs.map((p, pIdx) => (
                            <p key={pIdx} className="leading-relaxed">
                              {p}
                            </p>
                          ))}

                          {mod.bulletPoints && (
                            <ul className="space-y-1.5 pl-4 border-l border-gold/30 my-3">
                              {mod.bulletPoints.map((bp, bpIdx) => (
                                <li key={bpIdx} className="text-xs text-parchment font-sans">
                                  • {bp}
                                </li>
                              ))}
                            </ul>
                          )}

                          {mod.calloutBox && (
                            <div className="p-4 rounded-2xl bg-gold/10 border border-gold/40 space-y-1 my-4">
                              <div className="text-xs font-serif font-bold text-gold-light uppercase tracking-wider flex items-center gap-1.5">
                                <span>✦</span> {mod.calloutBox.title}
                              </div>
                              <p className="text-xs text-parchment-dim italic font-serif">
                                {mod.calloutBox.text}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Glosario de Términos Clave */}
                      {studyGuide.keyTerms.length > 0 && (
                        <div className="pt-4 border-t border-charcoal-border/70 space-y-3">
                          <h4 className="font-serif text-sm uppercase tracking-widest text-gold-light font-semibold">
                            Glosario de Términos Clave
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {studyGuide.keyTerms.map((term, tIdx) => (
                              <div
                                key={tIdx}
                                className="p-3 rounded-xl bg-black/50 border border-charcoal-border space-y-1"
                              >
                                <span className="font-serif text-xs font-bold text-gold block">
                                  {term.term}
                                </span>
                                <span className="text-[11px] text-parchment-dim block leading-snug">
                                  {term.definition}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Ejercicio Práctico y Entrega al Correo Oficial */}
                      {studyGuide.practicalExercise && (
                        <div className="p-5 rounded-2xl bg-gradient-to-r from-gold/15 via-gold/5 to-transparent border border-gold/50 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-serif text-sm font-bold text-gold-light uppercase tracking-wider flex items-center gap-1.5">
                              <span>✍️</span> {studyGuide.practicalExercise.title}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-black/60 text-gold-light font-mono">
                              Práctica Obligatoria
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            {studyGuide.practicalExercise.instructions.map((ins, iIdx) => (
                              <div key={iIdx} className="flex items-start gap-2 text-xs">
                                <span className="text-gold font-serif">{iIdx + 1}.</span>
                                <span>{ins}</span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-2 border-t border-gold/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <p className="text-[11px] text-parchment-muted">
                              {studyGuide.practicalExercise.deliverablePrompt}
                            </p>
                            <a
                              href={`mailto:consultas@arcanosolutions.com?subject=Práctica de Tarot Nivel 1 — Lección: ${encodeURIComponent(
                                lesson.title
                              )}&body=Hola Maestro de ARCANO, adjunto mi reflexión y práctica para la lección "${encodeURIComponent(
                                lesson.title
                              )}" de Tarot desde Cero.`}
                              className="px-4 py-2 rounded-xl bg-gold/20 border border-gold/50 text-gold-light text-xs font-serif font-bold hover:bg-gold/30 transition-all shrink-0"
                            >
                              ✉️ Enviar a consultas@arcanosolutions.com
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Fallback para cursos que usan summaryMarkdown */
                    <div className="space-y-4">
                      <h4 className="font-serif font-bold text-gold-light text-base">
                        Objetivos y Notas de la Lección
                      </h4>
                      <div className="whitespace-pre-line leading-relaxed font-sans text-xs sm:text-sm">
                        {lesson.summaryMarkdown || lesson.description}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* PESTAÑA 2: RECURSOS DESCARGABLES */}
              {activeTab === 'resources' && (
                <div className="space-y-4">
                  <h4 className="font-serif font-bold text-gold-light text-sm">
                    Recursos y Manuales de Esta Lección
                  </h4>
                  <div className="space-y-2">
                    {lesson.resources?.map((res, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-black/50 border border-charcoal-border hover:border-gold/40 flex items-center justify-between text-xs transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-gold text-lg">📄</span>
                          <div>
                            <span className="text-parchment font-medium block">{res.name}</span>
                            <span className="text-[10px] text-parchment-muted">
                              Formato PDF • Listo para imprimir o leer en tablet
                            </span>
                          </div>
                        </div>
                        <a
                          href="#descargar"
                          onClick={(e) => {
                            e.preventDefault();
                            alert(
                              `Iniciando descarga de «${res.name}». En breve estará en tu carpeta de descargas.`
                            );
                          }}
                          className="px-3 py-1.5 rounded-lg bg-gold/15 border border-gold/30 text-gold-light text-[11px] font-serif hover:bg-gold/25 transition-all"
                        >
                          Descargar PDF ↓
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PESTAÑA 3: TUTORÍA Y CORREO OFICIAL */}
              {activeTab === 'notes' && (
                <div className="space-y-5">
                  <div className="border-b border-charcoal-border/70 pb-3">
                    <h4 className="font-serif font-bold text-gold-light text-base">
                      Tutoría Académica y Consultas Oficiales
                    </h4>
                    <p className="text-xs text-parchment-dim mt-1">
                      En ARCANO cada estudiante cuenta con acompañamiento directo para resolver dudas teóricas, revisar tiradas o validar prácticas.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Canal de Correo Oficial */}
                    <div className="p-4 rounded-2xl bg-black/60 border border-gold/30 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">✉️</span>
                        <span className="font-serif text-sm font-bold text-gold-light">
                          Correo Académico Oficial
                        </span>
                      </div>
                      <p className="text-xs text-parchment-dim">
                        Envía tus tiradas, dudas de interpretación y tareas para revisión personalizada:
                      </p>
                      <div className="p-2.5 rounded-xl bg-obsidian-deep border border-charcoal-border font-mono text-xs text-gold">
                        consultas@arcanosolutions.com
                      </div>
                      <a
                        href={`mailto:consultas@arcanosolutions.com?subject=Consulta Alumno — ${encodeURIComponent(
                          course.title
                        )} (${encodeURIComponent(lesson.title)})&body=Hola Maestro de ARCANO, soy ${student?.fullName || 'estudiante'} y tengo una consulta sobre la clase "${encodeURIComponent(
                          lesson.title
                        )}":`}
                        className="w-full py-2.5 rounded-xl bg-gold/20 border border-gold/40 text-gold-light font-serif text-xs font-semibold hover:bg-gold/30 transition-all flex items-center justify-center gap-2"
                      >
                        Redactar Correo al Tutor →
                      </a>
                    </div>

                    {/* Canal de WhatsApp */}
                    <div className="p-4 rounded-2xl bg-black/60 border border-charcoal-border space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">💬</span>
                        <span className="font-serif text-sm font-bold text-emerald-400">
                          WhatsApp de Soporte Directo
                        </span>
                      </div>
                      <p className="text-xs text-parchment-dim">
                        Atención en vivo para dudas técnicas de acceso o consultas breves:
                      </p>
                      <div className="p-2.5 rounded-xl bg-obsidian-deep border border-charcoal-border font-mono text-xs text-emerald-300">
                        +52 (81) 2191-2778
                      </div>
                      <a
                        href={`https://wa.me/${brandConfig.contact.whatsappNumber}?text=${encodeURIComponent(
                          `Hola ARCANO, soy ${student?.fullName || 'estudiante'} y tengo una consulta sobre la lección "${lesson.title}" del curso "${course.title}".`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 font-serif text-xs font-semibold hover:bg-emerald-600/30 transition-all flex items-center justify-center gap-2"
                      >
                        Abrir WhatsApp del Santuario →
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* 3. Panel Lateral con Temario de Clases (Drawer) */}
        {isSidebarOpen && (
          <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-charcoal-border bg-[#090611] overflow-y-auto shrink-0 flex flex-col max-h-[50vh] lg:max-h-none">
            <div className="p-4 border-b border-charcoal-border flex items-center justify-between sticky top-0 bg-[#090611] z-10">
              <span className="text-xs font-serif font-bold text-gold uppercase tracking-wider">
                Plan de Estudios
              </span>
              <span className="text-[11px] font-mono text-parchment-muted">
                {course.totalLessons} lecciones
              </span>
            </div>

            <div className="p-3 space-y-4">
              {course.modules.map((mod) => (
                <div key={mod.id} className="space-y-1">
                  <div className="px-2 py-1 text-[11px] font-serif font-semibold text-gold-light uppercase tracking-wider">
                    {mod.title}
                  </div>
                  <div className="space-y-1">
                    {mod.lessons.map((les) => {
                      const isCurrent = les.id === lesson.id;
                      const isDone = isLessonCompleted(les.id);
                      return (
                        <Link
                          key={les.id}
                          href={`/academia/cursos/${slug}/aprender?lesson=${les.id}`}
                          className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between gap-2 block ${
                            isCurrent
                              ? 'bg-gold/20 border border-gold text-gold-light font-bold shadow-[0_0_15px_rgba(198,160,82,0.25)]'
                              : 'hover:bg-charcoal/40 text-parchment-muted hover:text-parchment'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className={isDone ? 'text-emerald-400' : 'text-charcoal-border'}>
                              {isDone ? '✓' : '○'}
                            </span>
                            <span className="truncate">{les.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-parchment-dim shrink-0">
                            {les.durationMinutes}m
                          </span>
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
