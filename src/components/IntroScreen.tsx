"use client";

import React, { useState, useEffect } from "react";
import { brandConfig } from "@/config/brandConfig";

export const IntroScreen: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    // Si ya vio la intro en esta sesión o prefiere movimiento reducido, no interrumpir
    const hasSeenIntro = sessionStorage.getItem("arcano_intro_seen");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (hasSeenIntro || prefersReducedMotion) {
      setIsDismissed(true);
      return;
    }

    setIsVisible(true);

    // Secuencia ceremonial de aparición
    const timer1 = setTimeout(() => setStep(1), 500);   // Luna y resplandor
    const timer2 = setTimeout(() => setStep(2), 1600);  // Logotipo ARCANO
    const timer3 = setTimeout(() => setStep(3), 2700);  // Descriptor y Frase
    const timer4 = setTimeout(() => handleClose(), 5800); // Cierre automático suave

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("arcano_intro_seen", "true");
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("arcano_start_ambient"));
    }
    setTimeout(() => {
      setIsDismissed(true);
    }, 900);
  };

  if (isDismissed) return null;

  return (
    <div
      role="dialog"
      aria-label="Introducción ceremonial a ARCANO"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian-deep transition-opacity duration-1000 ease-out ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Botón discreto para saltar */}
      <button
        onClick={handleClose}
        className="absolute top-8 right-8 z-20 text-xs tracking-[0.25em] uppercase text-parchment-dim hover:text-gold transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-gold/50 px-3 py-1.5 rounded"
      >
        Entrar al santuario ✦
      </button>

      {/* Luna tenue y resplandor cósmico */}
      <div
        className={`relative flex items-center justify-center transition-all duration-1000 ease-out transform ${
          step >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-parchment/30 to-gold/10 blur-xl absolute" />
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-gold/40 flex items-center justify-center shadow-[0_0_25px_rgba(198,160,82,0.25)] relative overflow-hidden bg-obsidian/60">
          <span className="text-gold text-2xl sm:text-3xl filter drop-shadow-[0_0_8px_rgba(198,160,82,0.6)]">
            ☾
          </span>
        </div>
      </div>

      {/* Logotipo ARCANO */}
      <div
        className={`mt-8 text-center transition-all duration-1000 ease-out transform ${
          step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl tracking-[0.3em] text-parchment font-light drop-shadow-md">
          {brandConfig.name}
        </h1>
        <div className="h-[1px] w-16 mx-auto mt-4 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      </div>

      {/* Descriptor y Frase mística */}
      <div
        className={`mt-4 max-w-md px-6 text-center transition-all duration-1000 ease-out transform ${
          step >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-gold/80 font-light">
          {brandConfig.descriptor}
        </p>
        <p className="mt-4 text-sm sm:text-base text-parchment-muted font-serif italic leading-relaxed">
          &ldquo;{brandConfig.tagline}&rdquo;
        </p>
      </div>

      {/* Elemento de transición final */}
      <div className="mt-8">
        <button
          onClick={handleClose}
          className="text-xs font-sans tracking-[0.2em] uppercase text-parchment/60 hover:text-gold border border-gold/30 hover:border-gold px-5 py-2 transition-all duration-500 rounded-sm bg-obsidian/40 backdrop-blur"
        >
          Trascender el umbral
        </button>
      </div>
    </div>
  );
};
