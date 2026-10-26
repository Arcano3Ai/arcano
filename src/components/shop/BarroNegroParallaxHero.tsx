"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface AlchemicalPhase {
  percent: number;
  title: string;
  subtitle: string;
  description: string;
  filterStyle: string;
  glowColor: string;
}

const PHASES: AlchemicalPhase[] = [
  {
    percent: 0,
    title: "I. Arcilla Cruda de la Tierra",
    subtitle: "Mina de San Bartolo Coyotepec",
    description: "La arcilla es extraída de las profundidades de Coyotepec, amasada descalza y modelada sobre dos platos cóncavos de barro.",
    filterStyle: "sepia(0.85) saturate(1.8) brightness(1.15) hue-rotate(-20deg)",
    glowColor: "rgba(180, 115, 60, 0.4)",
  },
  {
    percent: 33,
    title: "II. Bruñido con Cuarzo Fluvial",
    subtitle: "El canto rodado de río",
    description: "A punto de cuero, el alfarero frota pacientemente la pieza con una piedra de cuarzo de río. La fricción sella los poros y crea un brillo sedoso natural.",
    filterStyle: "sepia(0.4) saturate(0.8) brightness(0.9) contrast(1.1)",
    glowColor: "rgba(160, 140, 120, 0.35)",
  },
  {
    percent: 66,
    title: "III. Ahumado en Horno Subterráneo",
    subtitle: "Reducción de oxígeno de dos bocas",
    description: "El horno excavado bajo tierra se sella herméticamente con estiércol y lodo. La combustión lenta sin oxígeno hace que el humo de encino penetre el corazón del barro.",
    filterStyle: "grayscale(0.8) brightness(0.65) contrast(1.3)",
    glowColor: "rgba(70, 70, 70, 0.5)",
  },
  {
    percent: 100,
    title: "IV. Negro Obsidiana Bruñido",
    subtitle: "La Gran Obra Terminada",
    description: "Al desenterrar la pieza tras enfriar bajo tierra, el carbón ha transmutado la arcilla en un negro metálico profundo que parece obsidiana sólida sin una sola gota de barniz químico.",
    filterStyle: "grayscale(1) contrast(1.35) brightness(1)",
    glowColor: "rgba(220, 220, 220, 0.3)",
  },
];

export const BarroNegroParallaxHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [manualPhase, setManualPhase] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calcular progreso del scroll relativo al contenedor del jarrón
      const totalDist = rect.height - windowHeight;
      if (totalDist <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalDist, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Progreso efectivo (manual si el usuario interactuó con los botones, o por scroll)
  const effectiveProgress = manualPhase !== null ? manualPhase : scrollProgress;

  // Interpolar estilos según progreso (de 0 a 1)
  // 0 = sepia/terracota; 0.5 = gris/bruñido; 1 = negro obsidiana profundo
  const sepiaVal = Math.max(0, 0.85 * (1 - effectiveProgress * 1.3)).toFixed(2);
  const saturateVal = Math.max(0, 1.8 * (1 - effectiveProgress)).toFixed(2);
  const contrastVal = (0.95 + effectiveProgress * 0.45).toFixed(2);
  const brightnessVal = (1.15 - effectiveProgress * 0.25).toFixed(2);

  const dynamicFilter = `sepia(${sepiaVal}) saturate(${saturateVal}) contrast(${contrastVal}) brightness(${brightnessVal})`;

  // Fase descriptiva activa
  const activePhase =
    effectiveProgress < 0.25
      ? PHASES[0]
      : effectiveProgress < 0.55
      ? PHASES[1]
      : effectiveProgress < 0.85
      ? PHASES[2]
      : PHASES[3];

  return (
    <div
      ref={containerRef}
      className="relative min-h-[170vh] sm:min-h-[190vh] bg-gradient-to-b from-black via-[#080808] to-black py-16 px-4 overflow-hidden"
    >
      {/* Fondo ceremonial místico con partículas de humo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#181512]/40 via-black to-black pointer-events-none" />

      {/* Contenido fijo / Sticky que acompaña el scroll */}
      <div className="sticky top-28 sm:top-32 max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        
        {/* Columna Izquierda: Explicación de la Alquimia de San Bartolo Coyotepec */}
        <div className="w-full lg:w-1/2 space-y-6 text-left z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-700 bg-neutral-900/80 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-300">
              EXPERIENCIA PARALLAX · LA TRANSMUTACIÓN DEL BARRO
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-light text-white tracking-tight leading-tight">
            Del color de la arcilla <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-neutral-400 to-[#C5A059]">
              al negro obsidiana vivo.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-xl">
            Desliza hacia abajo para contemplar la milenaria transmutación de San Bartolo Coyotepec, Oaxaca. El jarrón que ves ante ti no posee pintura ni esmaltes: su tono negro profundo nace de la ausencia total de oxígeno en hornos subterráneos de dos bocas y del bruñido paciente con cantos de cuarzo de río.
          </p>

          {/* Tarjeta de Fase Activa en Tiempo Real */}
          <div className="p-5 rounded-xl bg-black/80 border border-neutral-800 shadow-2xl backdrop-blur-md space-y-2.5 transition-all duration-500">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[#C5A059] tracking-widest uppercase font-semibold text-[11px]">
                {activePhase.title}
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                {Math.round(effectiveProgress * 100)}% Ahumado
              </span>
            </div>

            <p className="text-xs font-serif text-white font-medium">
              {activePhase.subtitle}
            </p>
            <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
              {activePhase.description}
            </p>

            {/* Barra de Progreso de la Metamorfosis */}
            <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
              <div
                className="h-full bg-gradient-to-r from-[#B4733C] via-[#888888] to-white transition-all duration-300 rounded-full"
                style={{ width: `${Math.round(effectiveProgress * 100)}%` }}
              />
            </div>
          </div>

          {/* Selector Manual Rápido de las 4 Fases */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block w-full mb-1">
              O toca una fase para experimentar la alquimia:
            </span>
            {PHASES.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setManualPhase(p.percent / 100)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase border transition-all cursor-pointer ${
                  activePhase.title === p.title
                    ? "bg-[#C5A059] text-black border-[#C5A059] font-bold shadow-[0_0_15px_rgba(197,160,89,0.4)]"
                    : "bg-[#111111] text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white"
                }`}
              >
                Fase {idx + 1}
              </button>
            ))}
            {manualPhase !== null && (
              <button
                onClick={() => setManualPhase(null)}
                className="text-[10px] text-neutral-400 hover:text-white underline font-mono cursor-pointer ml-1"
              >
                Resetear a Scroll
              </button>
            )}
          </div>

        </div>

        {/* Columna Derecha: El Monumental Jarrón con Metamorfosis Dinámica */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative">
          
          {/* Anillos de luz mística de fondo */}
          <div
            className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl transition-all duration-700 pointer-events-none"
            style={{ backgroundColor: activePhase.glowColor }}
          />

          {/* Contenedor del Jarrón Monumental */}
          <div className="relative w-64 sm:w-80 md:w-96 h-[520px] sm:h-[620px] rounded-2xl overflow-hidden flex items-center justify-center">
            <Image
              src="/images/shop/barro-negro/jarron-parallax-master.jpg"
              alt="Jarrón Monumental de Barro Negro de San Bartolo Coyotepec"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain transition-all duration-300 drop-shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
              style={{
                filter: dynamicFilter,
              }}
            />

            {/* Overlay sutil de brillo especular según scroll */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent pointer-events-none transition-opacity duration-300"
              style={{ opacity: effectiveProgress }}
            />
          </div>

        </div>

      </div>

      {/* Indicador de scroll inferior */}
      <div className="absolute bottom-6 inset-x-0 flex flex-col items-center justify-center text-center text-[10px] font-mono tracking-[0.25em] uppercase text-neutral-400">
        <span>↓ CONTINÚA EL SCROLL PARA EXPLORAR LAS PIEZAS MAESTRAS ↓</span>
      </div>
    </div>
  );
};
