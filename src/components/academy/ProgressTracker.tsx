"use client";

import React, { useState } from "react";
import { AcademyCategoryId, academyCategories } from "@/data/academy";

interface ProgressTrackerProps {
  currentCategory: AcademyCategoryId;
  onSelectCategory?: (category: AcademyCategoryId) => void;
  onClaimWebClick: () => void;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({
  currentCategory,
  onSelectCategory,
  onClaimWebClick,
}) => {
  const [completedLevels, setCompletedLevels] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: false,
  });

  const toggleLevel = (level: number) => {
    setCompletedLevels((prev) => ({
      ...prev,
      [level]: !prev[level],
    }));
  };

  const isUnlocked =
    completedLevels[1] &&
    completedLevels[2] &&
    completedLevels[3] &&
    completedLevels[4] &&
    completedLevels[5];

  const activeCatInfo = academyCategories.find((c) => c.id === currentCategory) || academyCategories[0];

  return (
    <div className="relative rounded-2xl bg-gradient-to-b from-[#120d22] to-[#0a0813] border border-gold/40 p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
      {/* Luz ambiental sutil */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(198,160,82,0.15)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-deep/90 border border-gold/40 text-gold-light text-[11px] uppercase tracking-[0.2em] font-sans">
          <span>{activeCatInfo.glyph}</span>
          <span>SIMULADOR DE RUTA DE APRENDIZAJE: {activeCatInfo.title}</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-parchment font-light">
          Ruta hacia tu{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">
            Web Profesional
          </span>
        </h3>

        <p className="text-sm sm:text-base text-parchment-dim font-sans font-light max-w-2xl mx-auto leading-relaxed">
          &ldquo;Completa tus 5 niveles de formación para graduarte y desbloquear tu página web profesional gratis.&rdquo;
        </p>

        {/* Selector de Disciplina para el simulador */}
        {onSelectCategory && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs text-parchment-muted mr-2 font-sans">Ver disciplina:</span>
            {academyCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-sans transition-all duration-300 ${
                  currentCategory === cat.id
                    ? "bg-gold text-obsidian font-semibold shadow-[0_0_15px_rgba(198,160,82,0.5)]"
                    : "bg-obsidian-deep/80 border border-charcoal-border text-parchment-dim hover:text-parchment hover:border-gold/30"
                }`}
              >
                {cat.glyph} {cat.title}
              </button>
            ))}
          </div>
        )}

        {/* Línea de Progreso Visual: 5 Niveles + Beneficio */}
        <div className="pt-6 sm:pt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 relative">
          {/* Nivel 1 */}
          <div
            onClick={() => toggleLevel(1)}
            className={`cursor-pointer rounded-xl p-4 border transition-all duration-300 flex flex-col items-center justify-between text-center relative ${
              completedLevels[1]
                ? "bg-[#151128] border-gold/60 shadow-[0_0_15px_rgba(198,160,82,0.2)]"
                : "bg-obsidian-deep border-charcoal-border opacity-70"
            }`}
          >
            <div className="text-[10px] uppercase tracking-widest text-parchment-muted font-sans mb-1">
              PASO 1
            </div>
            <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center font-serif text-base my-1.5 bg-obsidian-deep">
              {completedLevels[1] ? <span className="text-gold font-bold">✓</span> : "1"}
            </div>
            <div className="font-serif text-xs sm:text-sm text-parchment font-medium">NIVEL 1</div>
            <div className="text-[10px] text-parchment-muted font-sans">Iniciación</div>
            <div className="mt-2 text-[9px] text-gold/80 uppercase tracking-widest font-sans font-semibold">
              {completedLevels[1] ? "LISTO ✓" : "PENDIENTE"}
            </div>
          </div>

          {/* Nivel 2 */}
          <div
            onClick={() => toggleLevel(2)}
            className={`cursor-pointer rounded-xl p-4 border transition-all duration-300 flex flex-col items-center justify-between text-center relative ${
              completedLevels[2]
                ? "bg-[#151128] border-gold/60 shadow-[0_0_15px_rgba(198,160,82,0.2)]"
                : "bg-obsidian-deep border-charcoal-border opacity-70"
            }`}
          >
            <div className="text-[10px] uppercase tracking-widest text-parchment-muted font-sans mb-1">
              PASO 2
            </div>
            <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center font-serif text-base my-1.5 bg-obsidian-deep">
              {completedLevels[2] ? <span className="text-gold font-bold">✓</span> : "2"}
            </div>
            <div className="font-serif text-xs sm:text-sm text-parchment font-medium">NIVEL 2</div>
            <div className="text-[10px] text-parchment-muted font-sans">Estructura</div>
            <div className="mt-2 text-[9px] text-gold/80 uppercase tracking-widest font-sans font-semibold">
              {completedLevels[2] ? "LISTO ✓" : "PENDIENTE"}
            </div>
          </div>

          {/* Nivel 3 */}
          <div
            onClick={() => toggleLevel(3)}
            className={`cursor-pointer rounded-xl p-4 border transition-all duration-300 flex flex-col items-center justify-between text-center relative ${
              completedLevels[3]
                ? "bg-[#151128] border-gold/60 shadow-[0_0_15px_rgba(198,160,82,0.2)]"
                : "bg-obsidian-deep border-charcoal-border opacity-70"
            }`}
          >
            <div className="text-[10px] uppercase tracking-widest text-parchment-muted font-sans mb-1">
              PASO 3
            </div>
            <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center font-serif text-base my-1.5 bg-obsidian-deep">
              {completedLevels[3] ? <span className="text-gold font-bold">✓</span> : "3"}
            </div>
            <div className="font-serif text-xs sm:text-sm text-parchment font-medium">NIVEL 3</div>
            <div className="text-[10px] text-parchment-muted font-sans">Interpretación</div>
            <div className="mt-2 text-[9px] text-gold/80 uppercase tracking-widest font-sans font-semibold">
              {completedLevels[3] ? "LISTO ✓" : "PENDIENTE"}
            </div>
          </div>

          {/* Nivel 4 */}
          <div
            onClick={() => toggleLevel(4)}
            className={`cursor-pointer rounded-xl p-4 border transition-all duration-300 flex flex-col items-center justify-between text-center relative ${
              completedLevels[4]
                ? "bg-[#151128] border-gold/60 shadow-[0_0_15px_rgba(198,160,82,0.2)]"
                : "bg-obsidian-deep border-charcoal-border opacity-70"
            }`}
          >
            <div className="text-[10px] uppercase tracking-widest text-parchment-muted font-sans mb-1">
              PASO 4
            </div>
            <div className="w-10 h-10 rounded-full border border-gold/50 flex items-center justify-center font-serif text-base my-1.5 bg-obsidian-deep">
              {completedLevels[4] ? <span className="text-gold font-bold">✓</span> : "4"}
            </div>
            <div className="font-serif text-xs sm:text-sm text-parchment font-medium">NIVEL 4</div>
            <div className="text-[10px] text-parchment-muted font-sans">Avanzado</div>
            <div className="mt-2 text-[9px] text-gold/80 uppercase tracking-widest font-sans font-semibold">
              {completedLevels[4] ? "LISTO ✓" : "PENDIENTE"}
            </div>
          </div>

          {/* Nivel 5: Llave Maestra */}
          <div
            onClick={() => toggleLevel(5)}
            className={`cursor-pointer rounded-xl p-4 border transition-all duration-300 flex flex-col items-center justify-between text-center relative ${
              completedLevels[5]
                ? "bg-[#1d163a] border-gold shadow-[0_0_20px_rgba(198,160,82,0.4)] scale-[1.03]"
                : "bg-[#151128] border-gold/50 hover:border-gold"
            }`}
          >
            <div className="text-[10px] uppercase tracking-widest text-gold font-sans mb-1 font-bold">
              ★ LLAVE MAESTRA
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center font-serif text-base my-1.5 bg-obsidian-deep shadow-[0_0_12px_rgba(198,160,82,0.4)]">
              {completedLevels[5] ? (
                <span className="text-gold-light font-bold">✓</span>
              ) : (
                <span className="text-gold">🔓</span>
              )}
            </div>
            <div className="font-serif text-xs sm:text-sm text-gold-light font-medium">NIVEL 5</div>
            <div className="text-[10px] text-parchment-muted font-sans">Maestría</div>
            <div className="mt-2 text-[9px] text-gold uppercase tracking-widest font-sans font-bold">
              {completedLevels[5] ? "DESBLOQUEADO 🔓" : "ACTIVAR"}
            </div>
          </div>

          {/* Premio: Web Profesional */}
          <div
            className={`rounded-xl p-4 border transition-all duration-500 flex flex-col items-center justify-between text-center relative ${
              isUnlocked
                ? "bg-gradient-to-b from-[#2a1e4a] to-[#160f29] border-gold shadow-[0_0_30px_rgba(198,160,82,0.6)] scale-[1.04]"
                : "bg-obsidian-deep/60 border-dashed border-charcoal-border opacity-70"
            }`}
          >
            <div className="text-[10px] uppercase tracking-widest text-gold font-sans mb-1 font-bold">
              PREMIO
            </div>
            <div className="w-10 h-10 rounded-full border border-gold/60 flex items-center justify-center text-lg my-1.5 bg-obsidian-deep">
              🎁
            </div>
            <div className="font-serif text-xs sm:text-sm text-parchment font-medium">WEB PRO</div>
            <div className="text-[10px] text-gold-light font-sans">+ Dominio 1 año</div>
            <div className="mt-2">
              {isUnlocked ? (
                <span className="px-2 py-0.5 rounded-full bg-gold text-obsidian text-[9px] uppercase font-bold tracking-wider animate-pulse">
                  ¡DESBLOQUEADA!
                </span>
              ) : (
                <span className="text-[9px] text-parchment-muted uppercase tracking-wider font-sans">
                  Completa Nivel 5
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Feedback interactivo del estado */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-xs text-parchment-muted font-sans italic">
            * Haz clic en los niveles del simulador para probar el desbloqueo al completar el Nivel 5.
          </p>
          <button
            onClick={onClaimWebClick}
            className={`px-6 py-2.5 rounded text-xs uppercase tracking-[0.2em] font-sans font-semibold transition-all duration-300 ${
              isUnlocked
                ? "bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian shadow-[0_0_25px_rgba(198,160,82,0.6)] hover:scale-105"
                : "bg-obsidian-deep border border-gold/40 text-gold-light hover:border-gold hover:bg-gold/10"
            }`}
          >
            {isUnlocked ? "RECLAMAR MI BENEFICIO" : "QUIERO DESBLOQUEAR MI WEB"}
          </button>
        </div>
      </div>
    </div>
  );
};
