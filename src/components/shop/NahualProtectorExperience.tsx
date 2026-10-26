"use client";

import React, { useState } from "react";
import Image from "next/image";

interface NahualTotem {
  id: string;
  name: string;
  zapotecName: string;
  element: string;
  colorScheme: string;
  spiritualPower: string;
  recommendation: string;
  quote: string;
  image: string;
  badge: string;
}

const NAHUALS: NahualTotem[] = [
  {
    id: "jaguar-alado",
    name: "Jaguar Alado",
    zapotecName: "Bidxaa Naa",
    element: "Fuego & Inframundo",
    colorScheme: "from-[#FF4500] via-[#FFD700] to-[#8A2BE2]",
    spiritualPower: "Coraje Inquebrantable, Furia Sagrada & Victoria en la Noche",
    recommendation: "Recomendado para quienes enfrentan grandes batallas vitales, lideran proyectos o requieren un escudo de poder impenetrable.",
    quote: "«El sol nocturno que cruza las sombras sin quemarse las alas.»",
    image: "/images/shop/alebrijes/jaguar-alado-nahual.jpg",
    badge: "Tótem de Guerra & Protección",
  },
  {
    id: "buho-sabiduria",
    name: "Búho Sagrado",
    zapotecName: "Beche Xtoo",
    element: "Aire & Éter",
    colorScheme: "from-[#00E5FF] via-[#7B1FA2] to-[#FFD700]",
    spiritualPower: "Clarividencia, Revelación de Secretos & Visión Profética",
    recommendation: "Recomendado para tarotistas, terapeutas, investigadores y almas intuitivas que buscan ver más allá de las apariencias.",
    quote: "«En el silencio de la medianoche, sus ojos descubren la verdad que la luz oculta.»",
    image: "/images/shop/alebrijes/buho-sabiduria-copal.jpg",
    badge: "Tótem de Sabiduría Psíquica",
  },
];

export const NahualProtectorExperience: React.FC<{
  onSelectNahualProduct?: (slug: string) => void;
}> = ({ onSelectNahualProduct }) => {
  const [selectedId, setSelectedId] = useState<string>(NAHUALS[0].id);

  const currentNahual = NAHUALS.find((n) => n.id === selectedId) || NAHUALS[0];

  return (
    <div className="relative bg-gradient-to-b from-black via-[#0D0B12] to-black py-16 px-4 border-b border-neutral-900 overflow-hidden">
      
      {/* Resplandor místico de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[600px] rounded-full bg-gradient-to-br from-[#00E5FF]/10 via-[#FF007F]/10 to-[#FFD700]/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Encabezado del Oráculo */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/40 bg-purple-950/40 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-purple-300">
              ORÁCULO DE LOS ANIMALES SAGRADOS · TALLA DE COPAL
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-light text-white tracking-wide">
            Descubre tu Nahual Protector
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
            En la tradición de San Martín Tilcajete, cada ser humano posee un animal espiritual de poder. Selecciona la frecuencia que resuene con tu momento presente para revelar a tu guardián tallado en madera sagrada de copal.
          </p>
        </div>

        {/* Selector de Tótems */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {NAHUALS.map((nahual) => {
            const isSelected = nahual.id === selectedId;
            return (
              <button
                key={nahual.id}
                onClick={() => setSelectedId(nahual.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-serif tracking-widest uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-gradient-to-r from-purple-900 via-indigo-900 to-black border border-[#00E5FF] text-white shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-105"
                    : "bg-black/80 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600"
                }`}
              >
                <span>✦</span>
                <span className="font-medium">{nahual.name}</span>
                <span className="text-[10px] font-mono text-[#00E5FF]">({nahual.element})</span>
              </button>
            );
          })}
        </div>

        {/* Tarjeta Cinematográfica del Nahual Revelado */}
        <div className="bg-[#0A0A0A]/90 border border-purple-900/50 rounded-2xl p-6 sm:p-10 shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center animate-fadeIn">
          
          {/* Fotografía del Alebrije */}
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black border border-neutral-800 shadow-2xl">
            <Image
              src={currentNahual.image}
              alt={currentNahual.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute top-4 left-4 bg-black/80 border border-[#00E5FF]/60 px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase text-[#00E5FF]">
              {currentNahual.badge}
            </div>
          </div>

          {/* Información Sagrada */}
          <div className="space-y-5 text-left">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-purple-400 block mb-1">
                NOMBRE ZAPOTECO: {currentNahual.zapotecName} · ELEMENTO: {currentNahual.element}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">
                {currentNahual.name}
              </h3>
              <p className="text-xs sm:text-sm font-serif italic text-[#FFE2A4] mt-1">
                {currentNahual.quote}
              </p>
            </div>

            <div className="space-y-3 border-t border-b border-neutral-800/80 py-4 text-xs text-neutral-300 font-light">
              <div>
                <strong className="text-white block font-medium mb-1">Don Espiritual:</strong>
                <p className="text-neutral-400 leading-relaxed">{currentNahual.spiritualPower}</p>
              </div>
              <div>
                <strong className="text-white block font-medium mb-1">Guía para el Altar:</strong>
                <p className="text-neutral-400 leading-relaxed">{currentNahual.recommendation}</p>
              </div>
            </div>

            <button
              onClick={() => {
                document.getElementById("catalogo-alebrijes")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00E5FF] via-purple-500 to-[#FF007F] text-black font-sans font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:scale-105 cursor-pointer"
            >
              ✦ Explorar Piezas Talladas de este Nahual ✦
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
