'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useStudent } from '@/lib/academy/studentContext';
import { getLMSCourseBySlug, getLMSLesson } from '@/lib/academy/courseRepository';
import { getLessonStudyGuide } from '@/data/academyStudyGuides';
import { brandConfig } from '@/config/brandConfig';
import { ArcanaAudioPlayer } from '@/components/ArcanaAudioPlayer';

const ARCANA_SONGS = [
  { slug: 'el-loco', name: '0. El Loco', title: 'Himno Sagrado de El Loco — El Salto al Vacío', url: '/audio/arcanos/el-loco.mp3' },
  { slug: 'el-mago', name: 'I. El Mago', title: 'Invocación de El Mago — Como es Arriba, es Abajo', url: '/audio/arcanos/el-mago.mp3' },
  { slug: 'la-sacerdotisa', name: 'II. La Sacerdotisa', title: 'Cántico de La Sacerdotisa — El Silencio del Templo', url: '/audio/arcanos/la-sacerdotisa.mp3' },
  { slug: 'la-emperatriz', name: 'III. La Emperatriz', title: 'Sinfonía de La Emperatriz — El Florecer Eterno', url: '/audio/arcanos/la-emperatriz.mp3' },
  { slug: 'el-emperador', name: 'IV. El Emperador', title: 'Marcha Soberana de El Emperador — El Orden de la Piedra', url: '/audio/arcanos/el-emperador.mp3' },
  { slug: 'el-hierofante', name: 'V. El Hierofante', title: 'Rito de El Hierofante — La Llave de los Misterios', url: '/audio/arcanos/el-hierofante.mp3' },
  { slug: 'los-enamorados', name: 'VI. Los Enamorados', title: 'Melodía de Los Enamorados — La Sagrada Elección', url: '/audio/arcanos/los-enamorados.mp3' },
  { slug: 'el-carro', name: 'VII. El Carro', title: 'Tono Victorioso de El Carro — La Conquista del Alma', url: '/audio/arcanos/el-carro.mp3' },
  { slug: 'la-fuerza', name: 'VIII. La Fuerza', title: 'Consagración de La Fuerza — La Caricia y el León', url: '/audio/arcanos/la-fuerza.mp3' },
  { slug: 'el-ermitano', name: 'IX. El Ermitaño', title: 'Vigilia de El Ermitaño — La Lámpara en la Cumbre', url: '/audio/arcanos/el-ermitano.mp3' },
  { slug: 'la-justicia', name: 'X. La Justicia', title: 'Decreto de La Justicia — La Balanza Inflexible', url: '/audio/arcanos/la-justicia.mp3' },
  { slug: 'el-colgado', name: 'XI. El Colgado', title: 'Éxtasis de El Colgado — La Visión Invertida', url: '/audio/arcanos/el-colgado.mp3' },
];

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

  const studyGuide = lessonData ? getLessonStudyGuide(lessonData.lesson.id) : undefined;
  const initialSongSlug = studyGuide?.recommendedArcanaAudio?.slug || 'el-loco';
  const [selectedSongSlug, setSelectedSongSlug] = useState<string>(initialSongSlug);

  useEffect(() => {
    if (studyGuide?.recommendedArcanaAudio?.slug) {
      setSelectedSongSlug(studyGuide.recommendedArcanaAudio.slug);
    }
  }, [studyGuide?.recommendedArcanaAudio?.slug]);

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

  const { lesson, nextLesson, prevLesson } = lessonData;
  const completed = isLessonCompleted(lesson.id);
  const courseProgress = getCourseProgress(course.id);

  // Lecciones del curso actual para navegación y consulta de completadas
  const allCourseLessons: { id: string; title: string; durationMinutes: number }[] = [];
  course.modules.forEach((m) =>
    m.lessons.forEach((l) =>
      allCourseLessons.push({ id: l.id, title: l.title, durationMinutes: l.durationMinutes })
    )
  );
  const completedLessonsInCourse = allCourseLessons.filter((l) => isLessonCompleted(l.id));

  // Filtro del temario lateral: 'all' o 'completed'
  const [sidebarFilter, setSidebarFilter] = useState<'all' | 'completed'>('all');

  // Control de canciones sagradas escuchadas y entendidas (todas obligatorias)
  const [understoodSongs, setUnderstoodSongs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('arcano_understood_songs');
      if (saved) {
        setUnderstoodSongs(JSON.parse(saved));
      }
    } catch {
      // Ignorar error de lectura local
    }
  }, []);

  const toggleSongUnderstood = (songSlug: string) => {
    const updated = understoodSongs.includes(songSlug)
      ? understoodSongs.filter((s) => s !== songSlug)
      : [...understoodSongs, songSlug];
    setUnderstoodSongs(updated);
    try {
      localStorage.setItem('arcano_understood_songs', JSON.stringify(updated));
    } catch {
      // Ignorar error de escritura local
    }
  };

  const handleGoToPrev = () => {
    if (prevLesson) {
      router.push(`/academia/cursos/${slug}/aprender?lesson=${prevLesson.id}`);
    }
  };

  const activeSong =
    ARCANA_SONGS.find((s) => s.slug === selectedSongSlug) ||
    (studyGuide?.recommendedArcanaAudio
      ? {
          slug: studyGuide.recommendedArcanaAudio.slug,
          name: studyGuide.recommendedArcanaAudio.title,
          title: studyGuide.recommendedArcanaAudio.title,
          url: studyGuide.recommendedArcanaAudio.audioUrl,
        }
      : ARCANA_SONGS[0]);

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
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          {/* 1. Barra Superior de Acciones de Lección */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#0c0917]/90 border border-gold/25 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-serif font-bold text-parchment">
                {lesson.title}
              </span>
              <span className="text-[11px] font-mono text-parchment-muted">
                (~{lesson.durationMinutes} min)
              </span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto flex-wrap">
              {/* Botón Regresar a Lección Anterior */}
              {prevLesson && (
                <button
                  type="button"
                  onClick={handleGoToPrev}
                  className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl border border-charcoal-border bg-obsidian-deep text-parchment-muted hover:text-gold hover:border-gold/40 text-xs font-serif transition-all flex items-center justify-center gap-1.5"
                  title={`Regresar a: ${prevLesson.title}`}
                >
                  <span>←</span>
                  <span className="hidden sm:inline">Lección Anterior</span>
                  <span className="sm:hidden">Anterior</span>
                </button>
              )}

              {/* Botón Marcar Completada / Ver Estado */}
              <button
                type="button"
                onClick={() => markLessonComplete(course.id, lesson.id)}
                className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-serif transition-all flex items-center justify-center gap-1.5 ${
                  completed
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'border border-gold/30 bg-gold/10 text-gold-light hover:bg-gold/20'
                }`}
              >
                <span>{completed ? '✓ Lección Completada' : 'Marcar como Completada'}</span>
              </button>

              {/* Botón Siguiente Lección */}
              {nextLesson && (
                <button
                  type="button"
                  onClick={handleCompleteAndNext}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold to-gold-light text-obsidian font-serif font-bold text-xs uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(198,160,82,0.4)] transition-all flex items-center justify-center gap-1.5"
                >
                  <span className="hidden sm:inline">Siguiente Lección →</span>
                  <span className="sm:hidden">Siguiente →</span>
                </button>
              )}
            </div>
          </div>

          {/* Banner de Consulta y Regreso a Lecciones Completadas */}
          {completedLessonsInCourse.length > 0 && (
            <div className="px-4 py-3 rounded-2xl bg-[#091515] border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-md">
              <div className="flex items-center gap-2.5 text-emerald-200">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs font-bold text-emerald-300 shrink-0">
                  ✓
                </span>
                <span>
                  Has completado <strong>{completedLessonsInCourse.length} de {allCourseLessons.length} lecciones</strong>. Puedes regresar a repasar cualquiera de ellas cuando lo desees.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSidebarOpen(true);
                  setSidebarFilter('completed');
                }}
                className="self-end sm:self-auto px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/25 text-[11px] font-serif transition-colors flex items-center gap-1 shrink-0"
              >
                <span>📜</span>
                <span>Ver lecciones completadas para regresar →</span>
              </button>
            </div>
          )}

          {/* 2. PRIORIDAD MÁXIMA: Pestañas de Estudio & Tratados Textuales */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-charcoal-border pb-2 overflow-x-auto no-scrollbar">
              {[
                { id: 'summary', label: '📖 Guía de Estudio & Texto Completo', icon: '📜' },
                { id: 'resources', label: 'Manuales & PDFs', icon: '📥' },
                { id: 'notes', label: 'Tutoría & Correo Oficial', icon: '✉️' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-2 rounded-xl text-xs font-serif whitespace-nowrap transition-all flex items-center gap-1.5 ${
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

            {/* Contenedor del Contenido de Estudio */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0816]/95 border border-gold/25 min-h-[260px] shadow-[0_0_40px_rgba(0,0,0,0.6)]">
              {/* PESTAÑA 1: GUÍA DE ESTUDIO Y TEXTO COMPLETO */}
              {activeTab === 'summary' && (
                <div className="space-y-6 text-xs sm:text-sm text-parchment-dim leading-relaxed font-light">
                  {studyGuide ? (
                    <div className="space-y-8 animate-fadeIn">
                      {/* Cabecera de la Guía */}
                      <div className="border-b border-charcoal-border/70 pb-4 space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-gold/80 gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-gold/10 border border-gold/30">
                            TRATADO OFICIAL ARCANO · NIVEL 1
                          </span>
                          <span>Tiempo de estudio: ~{studyGuide.readingTimeMinutes} min de lectura</span>
                        </div>
                        <h3 className="font-serif text-2xl sm:text-3xl text-parchment font-medium pt-1">
                          {studyGuide.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-parchment-muted italic font-serif">
                          {studyGuide.subtitle}
                        </p>
                      </div>

                      {/* Secciones de Estudio */}
                      {studyGuide.modules.map((mod, idx) => (
                        <div key={idx} className="space-y-3 pt-2">
                          <h4 className="font-serif text-base sm:text-lg text-gold-light font-semibold flex items-center gap-2">
                            <span>✦</span>
                            <span>{mod.sectionTitle}</span>
                          </h4>
                          {mod.paragraphs.map((p, pIdx) => (
                            <p key={pIdx} className="leading-relaxed text-parchment-dim text-xs sm:text-sm">
                              {p}
                            </p>
                          ))}

                          {mod.bulletPoints && (
                            <ul className="space-y-1.5 pl-4 border-l-2 border-gold/40 my-3 bg-black/30 p-3 rounded-r-xl">
                              {mod.bulletPoints.map((bp, bpIdx) => (
                                <li key={bpIdx} className="text-xs text-parchment font-sans leading-relaxed">
                                  • {bp}
                                </li>
                              ))}
                            </ul>
                          )}

                          {mod.calloutBox && (
                            <div className="p-4 sm:p-5 rounded-2xl bg-gold/10 border border-gold/40 space-y-1.5 my-4">
                              <div className="text-xs font-serif font-bold text-gold-light uppercase tracking-wider flex items-center gap-1.5">
                                <span>⚜</span> {mod.calloutBox.title}
                              </div>
                              <p className="text-xs sm:text-sm text-parchment-dim italic font-serif leading-relaxed">
                                {mod.calloutBox.text}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Glosario de Términos Clave */}
                      {studyGuide.keyTerms.length > 0 && (
                        <div className="pt-6 border-t border-charcoal-border/70 space-y-3">
                          <h4 className="font-serif text-sm uppercase tracking-widest text-gold-light font-semibold flex items-center gap-2">
                            <span>📖</span> Glosario de Términos Clave
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {studyGuide.keyTerms.map((term, tIdx) => (
                              <div
                                key={tIdx}
                                className="p-3.5 rounded-xl bg-black/50 border border-charcoal-border space-y-1"
                              >
                                <span className="font-serif text-xs font-bold text-gold block">
                                  {term.term}
                                </span>
                                <p className="text-[11px] text-parchment-muted font-sans leading-snug">
                                  {term.definition}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Ejercicio Práctico Evaluativo */}
                      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-gold/15 via-[#130f25] to-black border border-gold/40 space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">✍️</span>
                          <h4 className="font-serif text-sm uppercase tracking-widest text-gold-light font-bold">
                            {studyGuide.practicalExercise.title}
                          </h4>
                        </div>

                        <div className="space-y-2 text-xs text-parchment">
                          {studyGuide.practicalExercise.instructions.map((inst, iIdx) => (
                            <div key={iIdx} className="flex items-start gap-2">
                              <span className="text-gold font-bold font-mono text-[11px] mt-0.5">
                                {iIdx + 1}.
                              </span>
                              <span className="leading-relaxed">{inst}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-gold/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <p className="text-[11px] text-parchment-muted italic">
                            {studyGuide.practicalExercise.deliverablePrompt}
                          </p>
                          <a
                            href={`mailto:${studyGuide.officialTutorEmail || 'consultas@arcanosolutions.com'}?subject=Entrega Práctica: ${encodeURIComponent(
                              studyGuide.title
                            )}&body=Estimado Tutor de ARCANO (consultas@arcanosolutions.com):%0D%0A%0D%0ASoy el estudiante ${
                              student?.fullName || '[Tu Nombre]'
                            } y adjunto el desarrollo de mi práctica correspondiente a la lección "${encodeURIComponent(
                              studyGuide.title
                            )}":%0D%0A%0D%0A[Escribe aquí tu desarrollo o describe las cartas extraídas]:`}
                            className="px-4 py-2 rounded-xl bg-gold/20 border border-gold text-gold-light hover:bg-gold/30 text-xs font-serif font-semibold whitespace-nowrap transition-all text-center"
                          >
                            Enviar Práctica al Tutor Oficial →
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="font-serif text-lg text-gold-light">
                        {lesson.title}
                      </h3>
                      <p className="text-parchment-dim leading-relaxed">
                        {lesson.description ||
                          'En esta lección profundizamos en las leyes sagradas y correspondencias arquetípicas del sendero esotérico.'}
                      </p>
                      {lesson.summaryMarkdown && (
                        <div className="p-4 rounded-2xl bg-black/40 border border-charcoal-border whitespace-pre-line text-xs font-sans text-parchment-muted leading-relaxed">
                          {lesson.summaryMarkdown}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* PESTAÑA 2: MANUALES Y RECURSOS PDF */}
              {activeTab === 'resources' && (
                <div className="space-y-4">
                  <div className="border-b border-charcoal-border/70 pb-3">
                    <h4 className="font-serif font-bold text-gold-light text-base">
                      Materiales Ceremoniales Descargables
                    </h4>
                    <p className="text-xs text-parchment-dim mt-1">
                      Fichas de estudio imprimibles, tablas de correspondencias y manuales en PDF para tu altar de lectura.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {lesson.resources?.map((res, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-black/50 border border-charcoal-border hover:border-gold/40 transition-all flex items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5 truncate">
                          <div className="font-serif text-xs font-bold text-parchment truncate">
                            {res.name}
                          </div>
                          <div className="text-[10px] font-mono text-gold/70 uppercase tracking-wider">
                            Formato: {res.type}
                          </div>
                        </div>

                        <a
                          href={res.url}
                          onClick={(e) => {
                            e.preventDefault();
                            alert(
                              `Iniciando descarga de «${res.name}». En breve estará en tu carpeta de descargas.`
                            );
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-gold/15 border border-gold/30 text-gold-light text-xs font-serif hover:bg-gold/25 transition-all shrink-0"
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

          {/* 3. TAREA SAGRADA: SINTONIZACIÓN ACÚSTICA CON LAS CANCIONES DE LOS ARCANOS (EN EL CURSO DE TAROT) */}
          {/* 3. TAREA SAGRADA: SINTONIZACIÓN ACÚSTICA CON LAS CANCIONES DE LOS ARCANOS (EN EL CURSO DE TAROT) */}
          {(course.category === 'tarot' || studyGuide?.recommendedArcanaAudio) && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#130d26] to-[#0a0715] border-2 border-amber-500/40 shadow-[0_0_50px_rgba(198,160,82,0.15)] space-y-5">
              {/* Aviso Litúrgico Obligatorio */}
              <div className="p-4 rounded-2xl bg-amber-500/15 border-2 border-amber-500/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-600/30 border border-red-500/60 text-red-300 text-[10px] font-mono font-bold tracking-wider uppercase">
                      ✦ REQUISITO OBLIGATORIO
                    </span>
                    <span className="text-xs sm:text-sm font-serif font-bold text-amber-200">
                      Todas las canciones de los Arcanos son obligatorias
                    </span>
                  </div>
                  <p className="text-xs text-parchment leading-relaxed">
                    En la Academia ARCANO, <strong>todas las canciones sagradas son obligatorias</strong>. Se recomienda escucharlas con reverencia y total introspección para <strong>entender su significado, lírica y frecuencia vibratoria</strong> antes de dar por asimilada la lección.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] font-mono px-3 py-1.5 rounded-xl bg-black/60 border border-amber-500/30 text-amber-300 block">
                    Comprendidas: <strong>{understoodSongs.length} de {ARCANA_SONGS.length}</strong>
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gold/20 pb-4">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl sm:text-2xl text-parchment font-semibold">
                    Canción Sagrada de esta Lección
                  </h3>
                  <p className="text-xs text-parchment-dim leading-relaxed max-w-2xl">
                    Para integrar verdaderamente el Tarot, la mente no basta: la frecuencia sonora despierta la memoria celular y asienta el arquetipo en tu inconsciente. Escucha con auriculares la canción sagrada asignada a esta lección antes de barajar tus naipes.
                  </p>
                </div>

                {studyGuide?.recommendedArcanaAudio && (
                  <div className="px-3 py-1.5 rounded-xl bg-gold/10 border border-gold/30 text-[11px] font-mono text-gold-light shrink-0">
                    Asignada: {studyGuide.recommendedArcanaAudio.title.split('—')[0]}
                  </div>
                )}
              </div>

              {/* Reproductor de Audio Activo */}
              <div className="p-4 rounded-2xl bg-black/60 border border-gold/30">
                <div className="mb-3 flex items-center justify-between text-xs text-gold-light font-serif">
                  <span className="font-bold flex items-center gap-1.5">
                    <span>▶</span> {activeSong.title}
                  </span>
                  <span className="text-[10px] font-mono text-parchment-muted">
                    Audio Ceremonial ARCANO
                  </span>
                </div>
                <ArcanaAudioPlayer
                  audioUrl={activeSong.url}
                  audioTitle={activeSong.title}
                  arcanaName={activeSong.name}
                  slug={activeSong.slug}
                  variant="detailed"
                />

                {/* Botón interactivo para marcar la canción como entendida */}
                <div className="mt-4 pt-3 border-t border-charcoal-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-xs text-parchment-dim italic">
                    {studyGuide?.recommendedArcanaAudio ? (
                      <>✦ <strong>Instrucción del Maestro:</strong> {studyGuide.recommendedArcanaAudio.taskDescription}</>
                    ) : (
                      <>✦ <strong>Instrucción:</strong> Medita en el mensaje de este arcano y escribe tus revelaciones en tu bitácora.</>
                    )}
                  </p>
                  <button
                    type="button"
                    onClick={() => toggleSongUnderstood(activeSong.slug)}
                    className={`px-4 py-2 rounded-xl text-xs font-serif transition-all flex items-center justify-center gap-1.5 shrink-0 ${
                      understoodSongs.includes(activeSong.slug)
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : 'bg-gold/15 border border-gold/30 text-gold-light hover:bg-gold/25'
                    }`}
                  >
                    <span>{understoodSongs.includes(activeSong.slug) ? '✓ Himno Escuchado y Entendido' : '🎧 Marcar Himno como Escuchado y Entendido'}</span>
                  </button>
                </div>
              </div>

              {/* Selector Rápido de Otros Himnos Sagrados */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-widest font-serif text-gold/80 font-medium">
                  <span>Explorar y Entender las 12 Canciones Sagradas:</span>
                  <span className="text-slate-400 lowercase text-[10px] font-mono">(todas obligatorias)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ARCANA_SONGS.map((song) => {
                    const isSelected = song.slug === selectedSongSlug;
                    const isUnderstood = understoodSongs.includes(song.slug);
                    return (
                      <button
                        key={song.slug}
                        type="button"
                        onClick={() => setSelectedSongSlug(song.slug)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-serif transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-gold text-obsidian font-bold shadow-[0_0_15px_rgba(198,160,82,0.4)]'
                            : isUnderstood
                            ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 hover:border-emerald-400'
                            : 'bg-black/50 border border-charcoal-border text-parchment-dim hover:text-parchment hover:border-gold/30'
                        }`}
                      >
                        <span>{isUnderstood ? '✓' : '🎶'}</span>
                        <span>{song.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 4. AL FINAL: ZONA AUDIOVISUAL (EN PRODUCCIÓN CEREMONIAL) */}
          <div className="space-y-4 pt-6 border-t border-charcoal-border/80">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0f0b18] border border-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📹</span>
                  <h4 className="font-serif text-sm sm:text-base font-bold text-gold-light">
                    Aula Audiovisual (En Producción en el Templo)
                  </h4>
                </div>
                <p className="text-xs text-parchment-dim leading-relaxed">
                  <strong>Aviso al Alumno:</strong> La prioridad formativa de este nivel descansa en los <strong>tratados escritos</strong> y en la <strong>sintonización sonora</strong> desarrollados arriba. Las grabaciones audiovisuales en alta definición se encuentran en producción ceremonial y estarán disponibles como complemento visual. Puedes consultar el video de referencia a continuación:
                </p>
              </div>
            </div>

            {/* Contenedor de Video 16:9 con Estética Dark Luxury al Final */}
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black border-2 border-charcoal-border hover:border-gold/40 transition-colors shadow-[0_0_40px_rgba(0,0,0,0.85)]">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${lesson.videoId}?modestbranding=1&rel=0&iv_load_policy=3`}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
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

            {/* Pestañas de Filtro: Todas las Lecciones vs Lecciones Completadas */}
            <div className="p-2 border-b border-charcoal-border/60 bg-black/40 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSidebarFilter('all')}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-serif transition-all ${
                  sidebarFilter === 'all'
                    ? 'bg-gold/20 text-gold-light border border-gold/40 font-bold'
                    : 'text-parchment-muted hover:text-parchment'
                }`}
              >
                Todas ({allCourseLessons.length})
              </button>
              <button
                type="button"
                onClick={() => setSidebarFilter('completed')}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-serif transition-all ${
                  sidebarFilter === 'completed'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                    : 'text-parchment-muted hover:text-parchment'
                }`}
              >
                ✓ Completadas ({completedLessonsInCourse.length})
              </button>
            </div>

            <div className="p-3 space-y-4">
              {sidebarFilter === 'completed' ? (
                /* Vista de Sólo Lecciones Completadas para Regresar Fácilmente */
                <div className="space-y-2">
                  <div className="px-2 py-1 text-[11px] font-serif font-semibold text-emerald-300 uppercase tracking-wider flex items-center justify-between">
                    <span>Lecciones Completadas</span>
                    <span className="font-mono text-[10px] text-emerald-400">Haz clic para regresar</span>
                  </div>
                  {completedLessonsInCourse.length === 0 ? (
                    <div className="p-4 rounded-xl bg-black/30 border border-charcoal-border text-center text-xs text-parchment-muted">
                      Aún no has marcado ninguna lección como completada. Al terminarlas, aparecerán aquí para que puedas regresar a repasarlas en cualquier momento.
                    </div>
                  ) : (
                    completedLessonsInCourse.map((les) => {
                      const isCurrent = les.id === lesson.id;
                      return (
                        <Link
                          key={les.id}
                          href={`/academia/cursos/${slug}/aprender?lesson=${les.id}`}
                          className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between gap-2 block border ${
                            isCurrent
                              ? 'bg-gold/20 border-gold text-gold-light font-bold shadow-[0_0_15px_rgba(198,160,82,0.25)]'
                              : 'bg-[#0b1512] border-emerald-500/30 text-emerald-200 hover:border-emerald-400'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="text-emerald-400 font-bold">✓</span>
                            <span className="truncate">{les.title}</span>
                          </div>
                          <span className="text-[10px] font-serif text-gold-light shrink-0">
                            Regresar →
                          </span>
                        </Link>
                      );
                    })
                  )}
                </div>
              ) : (
                /* Vista General por Módulos */
                course.modules.map((mod) => (
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
                                : isDone
                                ? 'bg-emerald-950/20 border border-emerald-500/20 text-emerald-200 hover:border-emerald-500/40'
                                : 'hover:bg-charcoal/40 text-parchment-muted hover:text-parchment'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className={isDone ? 'text-emerald-400 font-bold' : 'text-charcoal-border'}>
                                {isDone ? '✓' : '○'}
                              </span>
                              <span className="truncate">{les.title}</span>
                            </div>
                            <span className="text-[10px] font-mono text-parchment-dim shrink-0">
                              {isDone ? 'Repasar' : `${les.durationMinutes}m`}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
