"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AcademyCourse } from "@/data/academy";
import { brandConfig } from "@/config/brandConfig";
import { getAssetPath, handleImageError } from "@/lib/utils";
import { getLMSCourseBySlug } from "@/lib/academy/courseRepository";

interface CourseModalProps {
  course: AcademyCourse | null;
  onClose: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"temario" | "objetivos">("temario");
  const [expandedModule, setExpandedModule] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!course) return null;

  const isWebUnlock = course.webUnlockLevel || course.isSpecialPromotionTrigger;
  const lmsCourse = getLMSCourseBySlug(course.id);

  const handleEnrollWhatsapp = () => {
    const text = encodeURIComponent(
      `Hola, El Señor de los Arcanos / ARCANO. Deseo consultar detalles para inscribirme al curso: *${course.categoryName} — ${course.romanLevel}: ${course.title}* ($799 MXN).`
    );
    window.open(`https://wa.me/${brandConfig.contact.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#0c0916] border border-gold/40 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.95)] overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera / Portada del Curso */}
        <div className="relative w-full h-44 sm:h-56 min-h-[170px] bg-black/95 flex items-center justify-center overflow-hidden shrink-0 border-b border-charcoal-border/70">
          <img
            src={getAssetPath(course.cardImage)}
            alt={course.title}
            decoding="async"
            onError={handleImageError}
            className="w-full h-full object-contain p-3 sm:p-4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0916] via-[#0c0916]/40 to-transparent pointer-events-none" />

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            aria-label="Cerrar ventana de curso"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 border border-gold/40 text-parchment-dim hover:text-gold hover:border-gold flex items-center justify-center transition-colors z-20"
          >
            ✕
          </button>

          {/* Badges superiores */}
          <div className="absolute bottom-3 left-4 sm:left-6 flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-obsidian-deep/90 border border-gold/40 text-[11px] font-sans font-medium uppercase tracking-widest text-gold-light">
              {course.categoryName}
            </span>
            <span className="px-3 py-1 rounded-full bg-obsidian-deep/90 border border-charcoal-border text-[11px] font-sans text-parchment-dim uppercase tracking-wider">
              {course.romanLevel}
            </span>
            {isWebUnlock && (
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian text-[11px] font-sans font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(198,160,82,0.6)]">
                ★ DESBLOQUEA TU WEB
              </span>
            )}
          </div>
        </div>

        {/* Contenido desplazable */}
        <div className="p-5 sm:p-8 space-y-6 overflow-y-auto flex-1">
          {/* Título & Resumen */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-sans text-gold">
              <span>{course.romanLevel}</span>
              <span>•</span>
              <span>{lmsCourse?.totalLessons || course.content.length} Lecciones en Video</span>
              <span>•</span>
              <span className="text-parchment-muted">Acceso Ilimitado de por Vida</span>
            </div>
            <h2
              id="course-modal-title"
              className="font-serif text-2xl sm:text-3xl text-parchment font-light leading-snug"
            >
              {course.title}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-parchment-dim leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Tarjeta de Precio & Inversión */}
          <div className="p-4 rounded-xl bg-[#130f21] border border-gold/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-parchment-muted font-sans font-medium">
                {course.price === 0 ? "🎁 Promoción Especial de Lanzamiento" : "Inversión por Nivel"}
              </div>
              {course.price === 0 ? (
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="line-through text-sm sm:text-base font-serif text-parchment-dim/60 font-light">
                    $799 MXN
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl text-emerald-400 font-bold tracking-wide">
                    100% GRATIS
                  </span>
                </div>
              ) : (
                <div className="font-serif text-3xl text-gold-light font-medium tracking-wide">
                  {course.formattedPrice}
                </div>
              )}
            </div>
            <div className="text-left sm:text-right text-xs text-parchment-dim font-sans space-y-0.5">
              <div className="text-gold font-medium flex items-center gap-1.5 sm:justify-end">
                <span>✦</span> Formación 100% Online & Asincrónica
              </div>
              <p className="text-parchment-muted text-[11px]">
                {course.price === 0
                  ? "Acceso completo a lecciones, manuales en PDF descargables y tutoría oficial sin costo."
                  : "Incluye manuales ceremoniales en PDF descargables y certificado al finalizar"}
              </p>
            </div>
          </div>

          {/* Pestañas: Temario Completo vs Objetivos */}
          <div className="border-b border-charcoal-border/70 flex gap-4">
            <button
              onClick={() => setActiveTab("temario")}
              className={`pb-2.5 text-xs font-serif uppercase tracking-widest font-semibold transition-all border-b-2 ${
                activeTab === "temario"
                  ? "border-gold text-gold-light"
                  : "border-transparent text-parchment-muted hover:text-parchment"
              }`}
            >
              📚 Temario Desarrollado por Módulos ({lmsCourse?.modules.length || 3})
            </button>
            <button
              onClick={() => setActiveTab("objetivos")}
              className={`pb-2.5 text-xs font-serif uppercase tracking-widest font-semibold transition-all border-b-2 ${
                activeTab === "objetivos"
                  ? "border-gold text-gold-light"
                  : "border-transparent text-parchment-muted hover:text-parchment"
              }`}
            >
              🎯 ¿Qué Aprenderás & Para Quién Es?
            </button>
          </div>

          {/* VISTA 1: TEMARIO DESARROLLADO POR MÓDULOS */}
          {activeTab === "temario" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between text-xs text-parchment-muted">
                <span>Estructura pedagógica del curso:</span>
                <span className="text-gold">Plan de estudio oficial</span>
              </div>

              <div className="space-y-3">
                {lmsCourse?.modules.map((mod, mIdx) => {
                  const isExpanded = expandedModule === mIdx;
                  return (
                    <div
                      key={mod.id}
                      className="rounded-xl border border-charcoal-border bg-obsidian-deep/80 overflow-hidden transition-all"
                    >
                      {/* Cabecera del Módulo */}
                      <button
                        type="button"
                        onClick={() => setExpandedModule(isExpanded ? -1 : mIdx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-gold/5 transition-colors"
                      >
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono text-gold uppercase tracking-widest">
                            Módulo {mod.order}
                          </span>
                          <h4 className="font-serif text-sm sm:text-base text-parchment font-medium">
                            {mod.title}
                          </h4>
                          <p className="text-[11px] text-parchment-muted line-clamp-1">
                            {mod.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-black/60 border border-charcoal-border text-parchment-dim font-mono">
                            {mod.lessons.length} clases
                          </span>
                          <span className="text-gold text-xs font-serif transition-transform">
                            {isExpanded ? "▲" : "▼"}
                          </span>
                        </div>
                      </button>

                      {/* Lista de Lecciones del Módulo */}
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 border-t border-charcoal-border/50 divide-y divide-charcoal-border/40 space-y-2">
                          {mod.lessons.map((les, lIdx) => (
                            <div
                              key={les.id}
                              className="pt-2 flex items-start justify-between gap-3 text-xs font-sans"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-parchment">
                                  <span className="text-gold text-[10px]">▶</span>
                                  <span className="font-medium text-parchment-light">
                                    Clase {lIdx + 1}: {les.title}
                                  </span>
                                  {les.isFreePreview && (
                                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 border border-emerald-500/40 text-[9px] text-emerald-300 font-sans uppercase">
                                      Clase Abierta
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-parchment-dim/80 pl-4 font-light">
                                  {les.description}
                                </p>
                              </div>
                              <div className="text-[10px] text-parchment-muted shrink-0 font-mono">
                                ~{les.durationMinutes} min
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VISTA 2: OBJETIVOS & PARA QUIÉN ES */}
          {activeTab === "objetivos" && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-3">
                <h3 className="font-serif text-sm uppercase tracking-wider text-gold-light flex items-center gap-2">
                  <span>✦</span> Competencias y aprendizajes clave
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {course.content.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-xs text-parchment-dim font-sans p-2 rounded-lg bg-black/40 border border-charcoal-border/50"
                    >
                      <span className="text-gold font-serif mt-0.5">✓</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* IDEAL PARA */}
              <div className="p-4 rounded-xl bg-obsidian-deep border border-charcoal-border space-y-1.5">
                <div className="text-[11px] uppercase tracking-widest text-gold/80 font-sans font-semibold">
                  PERFIL SUGERIDO:
                </div>
                <p className="text-xs text-parchment-dim font-sans font-light leading-relaxed">
                  {course.idealFor ||
                    "Personas que desean comenzar desde cero / profundizar / desarrollar una práctica profesional en esta disciplina."}
                </p>
              </div>
            </div>
          )}

          {/* Banner de recordatorio de desbloqueo al Nivel 5 */}
          {isWebUnlock && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-gold/20 via-gold/10 to-transparent border border-gold/50 text-xs text-parchment-dim space-y-1">
              <div className="text-gold font-serif font-medium flex items-center gap-1.5">
                <span>🎁</span> ¡HITO CUMBRE DE LA PROMOCIÓN!
              </div>
              <p className="text-parchment-dim text-xs leading-relaxed">
                Al completar este nivel (culminando los 5 niveles de tu senda formativa), desbloqueas tu <strong>página web personalizada GRATIS con dominio propio (.com)</strong> durante 1 año completo.
              </p>
            </div>
          )}
        </div>

        {/* Barra Inferior Fija de Acciones (Checkout & WhatsApp) */}
        <div className="p-4 sm:p-6 bg-[#0a0713] border-t border-charcoal-border flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="hidden sm:block">
            <div className="text-[10px] uppercase tracking-widest text-parchment-muted">
              {course.price === 0 ? "Iniciación Sin Costo" : "Inscripción Inmediata"}
            </div>
            <div className="font-serif text-lg text-gold font-medium">
              {course.price === 0 ? (
                <span className="text-emerald-400 font-bold">100% GRATIS • Promoción Activa</span>
              ) : (
                `${course.formattedPrice} • Acceso Total`
              )}
            </div>
          </div>

          <div className="w-full sm:w-auto flex items-center justify-end gap-3">
            <button
              onClick={handleEnrollWhatsapp}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-charcoal-border text-parchment-muted hover:text-parchment text-xs font-sans transition-colors flex items-center justify-center gap-1.5"
            >
              <span>💬 Dudas por WhatsApp</span>
            </button>
            <a
              href={`/academia/registro?curso=${course.id}`}
              onClick={onClose}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs uppercase tracking-[0.2em] font-sans font-bold shadow-lg transition-all flex items-center justify-center gap-2 text-center ${
                course.price === 0
                  ? "bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-obsidian shadow-[0_0_25px_rgba(16,185,129,0.5)] hover:shadow-[0_0_35px_rgba(16,185,129,0.7)] hover:scale-[1.02]"
                  : "bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian shadow-[0_0_25px_rgba(198,160,82,0.5)] hover:shadow-[0_0_35px_rgba(198,160,82,0.7)] hover:scale-[1.02]"
              }`}
            >
              <span>{course.price === 0 ? "INICIAR GRATIS AHORA" : "INSCRIBIRME AHORA"}</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
