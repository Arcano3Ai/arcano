"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { sacredAudio } from "@/lib/sacredAudio";

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  const handleToggle = () => {
    try {
      sacredAudio.playChime(isLight ? 432 : 528, 0.4, 0.04);
    } catch {
      // Audio opcional
    }
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      type="button"
      aria-label={isLight ? "Cambiar a Modo Noche Mística (Oscuro)" : "Cambiar a Modo Luz Sagrada (Claro)"}
      title={isLight ? "Modo Noche Mística" : "Modo Luz Sagrada"}
      className={`relative inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border transition-all duration-300 group focus:outline-none focus:ring-1 focus:ring-gold/60 ${
        isLight
          ? "bg-amber-50/90 border-amber-600/40 text-amber-700 hover:border-amber-600 shadow-[0_0_12px_rgba(217,119,6,0.25)] hover:scale-105"
          : "bg-obsidian-light border-gold/40 text-gold hover:border-gold shadow-[0_0_12px_rgba(198,160,82,0.2)] hover:scale-105"
      } ${className}`}
    >
      {/* Halo místico en hover */}
      <span
        className={`absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none ${
          isLight
            ? "bg-amber-400/10 opacity-0 group-hover:opacity-100"
            : "bg-gold/15 opacity-0 group-hover:opacity-100"
        }`}
      />

      {isLight ? (
        /* Icono de Luna Mística (para volver al modo oscuro) */
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-800 transition-transform duration-500 group-hover:-rotate-12"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        /* Icono de Solecito Sagrado (para encender el modo claro) */
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-gold-light transition-transform duration-500 group-hover:rotate-45 drop-shadow-[0_0_6px_rgba(255,215,0,0.6)]"
        >
          <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.2" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      )}
    </button>
  );
};
