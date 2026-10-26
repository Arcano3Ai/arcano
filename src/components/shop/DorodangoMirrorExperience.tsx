"use client";

import React, { useState } from "react";
import Image from "next/image";

interface DorodangoPhase {
  percent: number;
  name: string;
  kanji: string;
  subtitle: string;
  description: string;
  sphereFilter: string;
  glowColor: string;
  mineralNote: string;
}

const PHASES: DorodangoPhase[] = [
  {
    percent: 0,
    name: "Núcleo de Tierra Viva",
    kanji: "核 · Kaku",
    subtitle: "Extracción y amasado con agua viva",
    description: "Tierra arcillosa seleccionada de manantial filtrada para retirar impurezas. El artesano la comprime pacientemente entre sus palmas expulsando el aire.",
    sphereFilter: "sepia(0.6) saturate(0.8) brightness(0.65) contrast(0.9)",
    glowColor: "rgba(120, 85, 50, 0.2)",
    mineralNote: "Arcilla sedimentaria rica en hierro y sílice natural",
  },
  {
    percent: 33,
    name: "Polvo Mineral Alquímico",
    kanji: "粉 · Kona",
    subtitle: "Capas microscópicas de gemas en polvo",
    description: "Espolvoreado microscópico de cuarzo citrino, lapislázuli y pirita micronizada. La cápsula mineral se absorbe por ósmosis en la superficie húmeda.",
    sphereFilter: "sepia(0.3) saturate(1.4) brightness(0.75) contrast(1.1)",
    glowColor: "rgba(200, 160, 60, 0.3)",
    mineralNote: "Micropartículas de cuarzo, meteorito y oro coloidal",
  },
  {
    percent: 66,
    name: "Bruñido con Vidrio & Ágata",
    kanji: "磨 · Migaki",
    subtitle: "Frotado circular de precisión milimétrica",
    description: "Con la boca lisa de un frasco de vidrio soplado o un canto de ágata, se fricciona la corteza durante horas. Las partículas de arcilla se aplanan creando una superficie lisa continua.",
    sphereFilter: "saturate(1.2) brightness(0.9) contrast(1.35) drop-shadow(0 0 20px rgba(229,193,88,0.25))",
    glowColor: "rgba(229, 193, 88, 0.35)",
    mineralNote: "Orientación laminar de los minerales superficiales",
  },
  {
    percent: 100,
    name: "Espejo Cósmico Reflejante",
    kanji: "光 · Hikaru",
    subtitle: "Lustre vítreo y líneas de oro Kintsugi",
    description: "Pulido final con seda cruda y aceite de camelia. La esfera adquiere un brillo hiperreflectante que devuelve el reflejo del mundo como un orbe de obsidiana y oro puro.",
    sphereFilter: "saturate(1.3) brightness(1.05) contrast(1.45) drop-shadow(0 0 35px rgba(229,193,88,0.6))",
    glowColor: "rgba(229, 193, 88, 0.55)",
    mineralNote: "Reflejo cristalino puro sin barnices ni químicos sintéticos",
  },
];

export const DorodangoMirrorExperience: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(3); // Inicia mostrando la obra terminada
  const activePhase = PHASES[activePhaseIndex];

  return (
    <section className="relative bg-gradient-to-b from-black via-[#080706] to-black py-16 px-4 sm:px-6 lg:px-8 border-b border-neutral-900 overflow-hidden">
      {/* Fondo de Bruma Zen */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/20 via-black to-black pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/40 bg-amber-950/40 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-[#E5C158] animate-ping" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-amber-300">
              ALQUIMIA ZEN · HIKARU DORODANGO (光る泥だんご)
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-light text-white tracking-wide">
            El Ritual del Bruñido Zen
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
            En la tradición japonesa, el Dorodango es la mayor lección de meditación: tomar la tierra más humilde y, mediante semanas de devoción circular, transmutarla en una joya planetaria de brillo espejo eterno.
          </p>
        </div>

        {/* Showcase Interactivo: Esfera Central y Fases */}
        <div className="bg-[#0c0a08]/90 border border-amber-500/30 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Columna Izquierda: Esfera Dorodango Monumental */}
          <div className="flex flex-col items-center justify-center relative">
            {/* Halo de luz según fase */}
            <div
              className="absolute w-72 sm:w-80 h-72 sm:h-80 rounded-full blur-3xl transition-all duration-700 pointer-events-none"
              style={{ backgroundColor: activePhase.glowColor }}
            />

            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-2 border-amber-500/40 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex items-center justify-center">
              <Image
                src="/images/shop/dorodangos/dorodango-oro-kintsugi.jpg"
                alt="Hikaru Dorodango Sagrado Alquimia"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  filter: activePhase.sphereFilter,
                  transition: "filter 0.6s ease-in-out, transform 0.6s ease-out",
                }}
                className="object-cover scale-105 hover:scale-110"
              />
              {/* Reflejo de luz cenital de estudio */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-full" />
            </div>

            {/* Distintivo de Pureza */}
            <div className="mt-5 flex items-center gap-2 px-3 py-1 bg-black/80 border border-amber-500/30 rounded-full text-[10px] font-mono uppercase tracking-widest text-amber-300">
              <span>✦</span>
              <span>100% Tierra Mineral · Cero Barnices Químicos</span>
            </div>
          </div>

          {/* Columna Derecha: Selector de Fases y Transmutación */}
          <div className="space-y-6 text-left">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#E5C158] block mb-1">
                  FASE {activePhaseIndex + 1} DE 4 · {activePhase.kanji}
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  {activePhase.percent}% Bruñido
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">
                {activePhase.name}
              </h3>
              <p className="text-xs text-amber-200/80 font-serif italic mt-0.5">
                {activePhase.subtitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {activePhase.description}
            </p>

            {/* Ficha de Mineral */}
            <div className="p-3.5 rounded-lg bg-black/60 border border-amber-900/40 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block font-semibold">
                ✦ Sustancia Alquímica Activa:
              </span>
              <p className="text-xs text-neutral-300 font-light">
                {activePhase.mineralNote}
              </p>
            </div>

            {/* Botones de las 4 Fases */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                Explora el proceso meditativo del maestro:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PHASES.map((phase, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhaseIndex(idx)}
                    className={`py-2 px-3 rounded-lg text-xs font-serif transition-all duration-300 flex flex-col items-center justify-center cursor-pointer border ${
                      activePhaseIndex === idx
                        ? "bg-gradient-to-b from-amber-900/60 to-black border-[#E5C158] text-white shadow-[0_0_15px_rgba(229,193,88,0.3)] scale-102"
                        : "bg-black/50 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                    }`}
                  >
                    <span className="text-[9px] font-mono text-amber-400 mb-0.5">{phase.kanji}</span>
                    <span className="font-medium text-[11px]">Fase {idx + 1}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Pilares Alquímicos del Dorodango */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-4 rounded-xl bg-black/40 border border-neutral-800 text-left space-y-1.5">
            <span className="text-amber-400 text-base">🧘</span>
            <h4 className="text-xs font-serif uppercase tracking-wider text-white">Anclaje Telúrico (Grounding)</h4>
            <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
              Sostener una esfera de tierra compactada en las manos restablece la conexión bioeléctrica con el núcleo magnético de la Tierra durante la meditación.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-neutral-800 text-left space-y-1.5">
            <span className="text-amber-400 text-base">🏺</span>
            <h4 className="text-xs font-serif uppercase tracking-wider text-white">Espejo de Adivinación (Scrying)</h4>
            <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
              El lustre negro profundo de las esferas de obsidiana se utiliza en prácticas herméticas como espejo sagrado para serenar el flujo de pensamientos.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-neutral-800 text-left space-y-1.5">
            <span className="text-amber-400 text-base">✨</span>
            <h4 className="text-xs font-serif uppercase tracking-wider text-white">Geometría Sagrada Esférica</h4>
            <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
              La esfera perfecta representa la totalidad del cosmos y el Arcano del Mundo: el equilibrio armónico entre los cuatro elementos primordiales.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
