"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { AcademyCourse } from "@/data/academy";
import { brandConfig } from "@/config/brandConfig";
import { getAssetPath } from "@/lib/utils";

interface CourseModalProps {
  course: AcademyCourse | null;
  onClose: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({
  course,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!course) return null;

  const isWebUnlock = course.webUnlockLevel || course.isSpecialPromotionTrigger;

  const handleEnrollClick = () => {
    const text = encodeURIComponent(
      `Hola Malachai / ARCANO. Deseo inscribirme en la Academia Esotérica para el curso: *${course.categoryName} — ${course.romanLevel}: ${course.title}* ($799 MXN). ¿Cuáles son los pasos para comenzar?`
    );
    window.open(`https://wa.me/${brandConfig.contact.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0e0b17] border border-gold/40 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera decorativa */}
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-black">
          <Image
            src={getAssetPath(course.cardImage)}
            alt={course.title}
            fill
            sizes="100vw"
            className="object-contain p-4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0b17] via-[#0e0b17]/50 to-transparent" />

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            aria-label="Cerrar ventana de curso"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 border border-gold/30 text-parchment-dim hover:text-gold hover:border-gold flex items-center justify-center transition-colors"
          >
            ✕
          </button>

          {/* Badges superiores */}
          <div className="absolute bottom-4 left-6 flex flex-wrap items-center gap-2">
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

        {/* Contenido del Modal */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <h2
              id="course-modal-title"
              className="font-serif text-2xl sm:text-3xl text-parchment font-light leading-snug"
            >
              {course.title}
            </h2>
            <p className="font-sans text-sm text-parchment-dim leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Precio & Promoción */}
          <div className="p-4 rounded-lg bg-[#141022] border border-gold/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-parchment-muted font-sans font-medium">
                Precio de Inscripción
              </div>
              <div className="font-serif text-3xl text-gold-light font-medium tracking-wide">
                {course.formattedPrice}
              </div>
            </div>
            <div className="text-left sm:text-right text-xs text-parchment-dim font-sans">
              <span className="text-gold font-medium">✦ Acceso de por vida</span>
              <p className="text-parchment-muted mt-0.5">Estudia a tu propio ritmo con mentoría continua</p>
            </div>
          </div>

          {/* ¿QUÉ APRENDERÁS? */}
          <div className="space-y-3">
            <h3 className="font-serif text-lg text-gold-light flex items-center gap-2">
              <span>✦</span> ¿QUÉ APRENDERÁS?
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {course.content.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-xs sm:text-sm text-parchment-dim font-sans"
                >
                  <span className="text-gold font-serif mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* IDEAL PARA */}
          <div className="p-4 rounded-lg bg-obsidian-deep border border-charcoal-border space-y-1.5">
            <div className="text-[11px] uppercase tracking-widest text-gold/80 font-sans font-semibold">
              IDEAL PARA:
            </div>
            <p className="text-xs sm:text-sm text-parchment-dim font-sans font-light leading-relaxed">
              {course.idealFor ||
                "Personas que desean comenzar desde cero / profundizar / desarrollar una práctica profesional en esta disciplina."}
            </p>
          </div>

          {/* Banner de recordatorio si desbloquea web */}
          {isWebUnlock && (
            <div className="p-4 rounded-lg bg-gradient-to-r from-gold/15 via-gold/5 to-transparent border border-gold/40 text-xs text-parchment-dim space-y-1">
              <div className="text-gold font-serif font-medium flex items-center gap-1.5">
                <span>🎁</span> ¡NIVEL CLAVE DE LA PROMOCIÓN!
              </div>
              <p className="text-parchment-muted">
                Al completar este nivel (junto a los Niveles 1 y 2), obtendrás tu <strong>página web personalizada GRATIS</strong> con dominio incluido por 1 año.
              </p>
            </div>
          )}

          {/* Acciones */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3 rounded border border-charcoal-border text-parchment-dim hover:text-parchment hover:border-gold/40 text-xs uppercase tracking-widest font-sans transition-colors"
            >
              CERRAR
            </button>
            <button
              onClick={handleEnrollClick}
              className="w-full sm:w-auto px-8 py-3 rounded bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian text-xs uppercase tracking-[0.2em] font-sans font-bold shadow-[0_0_20px_rgba(198,160,82,0.4)] hover:shadow-[0_0_30px_rgba(198,160,82,0.6)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <span>INSCRIBIRME AHORA</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
