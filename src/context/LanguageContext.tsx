"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { translations, TranslationKeys } from "@/data/translations";

export type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (keyOrEs: string, enFallback?: string) => string;
  dict: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper para navegar objetos con dot notation segura tipo "nav.home"
function getNestedTranslation(obj: any, path: string): string | undefined {
  if (!obj || typeof obj !== "object") return undefined;
  const parts = path.split(".");
  let current: any = obj;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      return undefined;
    }
  }
  return typeof current === "string" ? current : undefined;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("es");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("arcano_language") as Language | null;
    if (saved === "es" || saved === "en") {
      setLanguageState(saved);
      document.documentElement.lang = saved;
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

  const dict = useMemo(() => translations[language], [language]);

  /**
   * Función de traducción inteligente `t`:
   * 1. Soporta Dot-Notation de diccionario: `t("nav.home")` o `t("shop.addToCart")`
   * 2. Soporta formato ad-hoc: `t("Texto en español", "Text in English")`
   */
  const t = (keyOrEs: string, enFallback?: string): string => {
    // Si viene con enFallback explícito, actúa en modo ad-hoc
    if (enFallback !== undefined) {
      return language === "es" ? keyOrEs : enFallback;
    }

    // Intentar buscar en diccionario por notación de punto
    const resolved = getNestedTranslation(translations[language], keyOrEs);
    if (resolved !== undefined) {
      return resolved;
    }

    // Si no está en el idioma actual, buscar en el fallback en español
    if (language !== "es") {
      const spanishFallback = getNestedTranslation(translations.es, keyOrEs);
      if (spanishFallback !== undefined) {
        return spanishFallback;
      }
    }

    // Si era texto plano sin clave de diccionario, devolverlo tal cual
    return keyOrEs;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, dict }}>
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
      t: (keyOrEs: string, enFallback?: string) => (enFallback && keyOrEs ? keyOrEs : keyOrEs),
      dict: translations.es,
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
