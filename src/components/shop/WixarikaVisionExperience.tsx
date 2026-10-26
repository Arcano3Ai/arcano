"use client";

import React, { useState } from "react";
import Image from "next/image";

export const WixarikaVisionExperience: React.FC = () => {
  const [visionMode, setVisionMode] = useState<"solar" | "nocturna">("solar");

  return (
    <div className="relative bg-gradient-to-b from-black via-[#0F0B06] to-black py-16 px-4 border-b border-neutral-900 overflow-hidden">
      
      {/* Fondo dinámico según visión */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          visionMode === "nocturna" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00E5FF]/20 via-[#4A00E0]/15 to-black" />
      </div>

      <div className="max-w-6xl mx-auto space-y-10 relative z-10">
        
        {/* Encabezado */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/40 bg-amber-950/40 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-[#FF9100] animate-ping" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-amber-300">
              COSMOGONÍA WIXÁRIKA · SIERRA MADRE & WIRIKUTA
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-light text-white tracking-wide">
            La Visión Sagrada de Wirikuta
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
            Para el pueblo Wixárika, el arte no es decoración: es un puente de comunicación con los ancestros. Conmuta la frecuencia para apreciar la pieza bajo la luz del sol o en la visión nocturna ceremonial del fuego sagrado.
          </p>

          {/* Toggle de Visión Mística */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setVisionMode("solar")}
              className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 ${
                visionMode === "solar"
                  ? "bg-[#FF9100] text-black font-bold shadow-[0_0_20px_rgba(255,145,0,0.5)] scale-105"
                  : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white"
              }`}
            >
              <span>☀️</span>
              <span>Luz Solar de Tayaupá</span>
            </button>

            <button
              onClick={() => setVisionMode("nocturna")}
              className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 ${
                visionMode === "nocturna"
                  ? "bg-gradient-to-r from-[#00E5FF] to-[#8A2BE2] text-black font-bold shadow-[0_0_25px_rgba(0,229,255,0.6)] scale-105"
                  : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white"
              }`}
            >
              <span>🌌</span>
              <span>Visión Nocturna del Fuego</span>
            </button>
          </div>
        </div>

        {/* Showcase de la Obra Central: Cráneo del Venado Kauyumari */}
        <div className="bg-[#0A0A0A]/90 border border-amber-900/40 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black border border-neutral-800 shadow-2xl">
            <Image
              src="/images/shop/arte-huichol/craneo-venado-kauyumari.jpg"
              alt="Cráneo Ceremonial del Venado Azul Kauyumari"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-cover transition-all duration-700 ease-out ${
                visionMode === "nocturna"
                  ? "contrast-150 brightness-110 hue-rotate-15 drop-shadow-[0_0_30px_rgba(0,229,255,0.5)]"
                  : "scale-100"
              }`}
            />
            <div className="absolute top-4 left-4 bg-black/85 border border-amber-500/50 px-3 py-1 rounded text-[10px] font-mono tracking-widest uppercase text-amber-300">
              {visionMode === "solar" ? "Luz Directa · Micro-Chaquira" : "Luminiscencia Sagrada"}
            </div>
          </div>

          <div className="space-y-5 text-left">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#FF9100] block mb-1">
                KAUYUMARI · EL HERMANO MAYOR DEL DESIERTO
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-wide">
                Cráneo Sagrado con Cornamenta Natural
              </h3>
              <p className="text-xs sm:text-sm font-serif italic text-neutral-300 mt-1">
                «El venado que se convirtió en peyote para alimentar el alma de los hombres.»
              </p>
            </div>

            <div className="space-y-3 border-t border-b border-neutral-800/80 py-4 text-xs text-neutral-300 font-light">
              <div className="flex items-start gap-2">
                <span className="text-[#FF9100]">✦</span>
                <p><strong className="text-white">Tayaupá (El Sol):</strong> En el centro de la frente, irradiando los 12 rayos de luz que fecundan la tierra.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF9100]">✦</span>
                <p><strong className="text-white">Híkuri (La Flor de Peyote):</strong> En las sienes, símbolo de sabiduría trascendental y visión clarividente.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#FF9100]">✦</span>
                <p><strong className="text-white">Tatewari (El Abuelo Fuego):</strong> Los tonos rojizos y dorados representan la primera deidad del universo Wixárika.</p>
              </div>
            </div>

            <button
              onClick={() => {
                document.getElementById("catalogo-huichol")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#FF9100] via-[#FFA726] to-[#FFD54F] text-black font-sans font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(255,145,0,0.4)] hover:scale-105 cursor-pointer"
            >
              ✦ Explorar Obras Wixárikas en Catálogo ✦
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
