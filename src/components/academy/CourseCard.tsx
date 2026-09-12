"use client";

import React from "react";
import Image from "next/image";
import { AcademyCourse } from "@/data/academy";
import { getAssetPath } from "@/lib/utils";

interface CourseCardProps {
  course: AcademyCourse;
  onSelectCourse: (course: AcademyCourse) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onSelectCourse,
}) => {
  const isWebUnlock = course.webUnlockLevel || course.isSpecialPromotionTrigger;

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-lg bg-[#0c0a14] border transition-all duration-300 hover:-translate-y-1.5 overflow-hidden ${
        isWebUnlock
          ? "border-gold shadow-[0_0_30px_rgba(198,160,82,0.2)] hover:shadow-[0_0_40px_rgba(198,160,82,0.35)]"
          : "border-charcoal-border hover:border-gold/50 shadow-[0_8px_25px_rgba(0,0,0,0.6)]"
      }`}
    >
      {/* Glow sutil en la parte superior si es desbloqueo de web */}
      {isWebUnlock && (
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold/50 via-gold-light to-gold/50 shadow-[0_0_15px_rgba(198,160,82,0.8)]" />
      )}

      {/* Cabecera / Imagen y Badges: altura física fija y garantizada para evitar colapso en WebKit/móviles */}
      <div className="relative w-full h-48 sm:h-52 min-h-[190px] overflow-hidden bg-black/90 flex items-center justify-center">
        <img
          src={getAssetPath(course.cardImage)}
          alt={`${course.romanLevel} — ${course.title}`}
          loading={course.level <= 3 ? "eager" : "lazy"}
          decoding="async"
          className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a14] via-[#0c0a14]/40 to-transparent pointer-events-none" />

        {/* Badges superiores */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          {/* Disciplina */}
          <span className="px-2.5 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-gold/30 text-[10px] font-sans font-medium uppercase tracking-widest text-gold-light">
            {course.categoryName}
          </span>

          {/* Badge de Nivel o Promoción */}
          {isWebUnlock ? (
            <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-gold/90 via-gold-light to-gold/90 text-obsidian text-[10px] font-sans font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(198,160,82,0.6)]">
              ★ DESBLOQUEA TU WEB
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full bg-obsidian/80 border border-charcoal-border text-[10px] font-sans text-parchment-dim uppercase tracking-wider">
              {course.romanLevel}
            </span>
          )}
        </div>

        {/* Glifo ceremonial flotante */}
        <div className="absolute bottom-2 right-3 text-gold/30 text-2xl font-serif select-none pointer-events-none group-hover:text-gold/60 transition-colors">
          {course.glyph}
        </div>
      </div>

      {/* Cuerpo de la tarjeta */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-sans text-gold">
            <span>{course.romanLevel}</span>
            <span className="text-parchment-muted">•</span>
            <span className="text-parchment-dim">{course.lessonsCount}</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-parchment group-hover:text-gold-light transition-colors font-normal leading-snug">
            {course.title}
          </h3>

          <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light line-clamp-3 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Temas clave (primeros 3 chips) */}
        <div className="pt-2 border-t border-charcoal-border/60">
          <p className="text-[10px] uppercase tracking-widest text-gold/70 font-sans mb-2 font-medium">
            Temas principales:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {course.content.slice(0, 3).map((item, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-obsidian-deep border border-charcoal-border text-[10px] font-sans text-parchment-dim/90 truncate max-w-[200px]"
              >
                {item}
              </span>
            ))}
            {course.content.length > 3 && (
              <span className="px-1.5 py-0.5 text-[10px] font-sans text-gold/80">
                +{course.content.length - 3} más
              </span>
            )}
          </div>
        </div>

        {/* Precio y Botón de Acción */}
        <div className="pt-4 border-t border-charcoal-border/60 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-sans uppercase tracking-widest text-parchment-muted">
              Inversión
            </div>
            <div className="font-serif text-xl sm:text-2xl text-gold-light font-medium tracking-wide">
              {course.formattedPrice}
            </div>
          </div>

          <button
            onClick={() => onSelectCourse(course)}
            className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded text-xs uppercase tracking-[0.15em] font-sans font-semibold transition-all duration-300 ${
              isWebUnlock
                ? "bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian shadow-[0_0_15px_rgba(198,160,82,0.4)] hover:shadow-[0_0_25px_rgba(198,160,82,0.6)] hover:scale-105"
                : "bg-obsidian-deep border border-gold/40 text-gold-light hover:border-gold hover:text-parchment hover:bg-gold/10"
            }`}
          >
            VER CURSO
          </button>
        </div>
      </div>
    </article>
  );
};
