"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (es: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("es");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("arcano_language") as Language | null;
    if (saved === "es" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("arcano_language", newLang);
      document.documentElement.lang = newLang;
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const t = (es: string, en: string) => (language === "es" ? es : en);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback gracioso para SSR o componentes fuera de provider
    return {
      language: "es",
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (es: string) => es,
    };
  }
  return context;
};

/**
 * Componente Botón Selector de Idioma (ES | EN)
 * Estilo alta joyería con acento dorado
 */
export const LanguageToggle: React.FC<{ className?: string; size?: "sm" | "md" }> = ({
  className = "",
  size = "sm",
}) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Selector de idioma / Language selector"
      className={`inline-flex items-center rounded-full border border-neutral-800 bg-[#0E0E0E]/90 backdrop-blur-md p-0.5 shadow-sm ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage("es")}
        aria-pressed={language === "es"}
        className={`rounded-full uppercase font-sans font-medium transition-all cursor-pointer ${
          size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
        } ${
          language === "es"
            ? "bg-[#C5A059] text-black font-bold shadow-md scale-105"
            : "text-neutral-400 hover:text-white"
        }`}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={`rounded-full uppercase font-sans font-medium transition-all cursor-pointer ${
          size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-3 py-1 text-xs"
        } ${
          language === "en"
            ? "bg-[#C5A059] text-black font-bold shadow-md scale-105"
            : "text-neutral-400 hover:text-white"
        }`}
      >
        EN
      </button>
    </div>
  );
};
