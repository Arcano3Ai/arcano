"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Comprobar si el usuario ya dio su consentimiento
    const consent = localStorage.getItem("arcano_cookies_consent");
    if (!consent) {
      // Mostrar con un retardo suave de 1.5 segundos para no invadir de golpe
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("arcano_cookies_consent", "all");
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem("arcano_cookies_consent", "necessary");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Consentimiento de cookies"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 p-5 rounded-2xl bg-[#0d0914]/95 backdrop-blur-md border border-gold/40 shadow-[0_15px_45px_rgba(0,0,0,0.9),0_0_20px_rgba(198,160,82,0.15)] animate-fadeIn text-parchment transition-all duration-300"
    >
      {/* Detalle ceremonial superior */}
      <div className="flex items-center gap-2 mb-2.5">
        <span className="text-gold text-base">✦</span>
        <span className="font-serif text-sm text-parchment tracking-wider uppercase font-medium">
          Sabiduría y Privacidad
        </span>
      </div>

      <p className="text-xs sm:text-[13px] text-parchment-muted font-sans font-light leading-relaxed mb-4">
        Utilizamos cookies sagradas para armonizar tu navegación, recordar tu modo ritual (claro u oscuro), optimizar el oráculo y brindarte una experiencia inmersiva sin ruidos mundanos.
      </p>

      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 border-t border-charcoal-border">
        <Link
          href="/privacidad"
          className="text-[11px] text-parchment-dim hover:text-gold underline underline-offset-4 font-sans transition-colors"
        >
          Leer política
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAcceptNecessary}
            className="px-3 py-1.5 rounded-lg border border-charcoal-border hover:border-gold/50 text-parchment-dim hover:text-parchment text-[11px] font-sans transition-all"
          >
            Solo necesarias
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian text-[11px] font-sans font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(198,160,82,0.3)] hover:scale-105 transition-all"
          >
            Aceptar todo
          </button>
        </div>
      </div>
    </div>
  );
};
