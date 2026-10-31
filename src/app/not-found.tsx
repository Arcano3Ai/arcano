"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
      {/* Símbolo central */}
      <div className="w-24 h-24 rounded-full border border-gold/40 flex items-center justify-center bg-charcoal/60 mb-8 shadow-[0_0_30px_rgba(198,160,82,0.2)]">
        <span className="text-gold text-4xl">✧</span>
      </div>

      <span className="text-xs uppercase tracking-[0.3em] text-gold/80 font-sans block mb-3">
        {t("Arcano Desconocido · 404", "Unknown Arcana · 404")}
      </span>

      <h1 className="font-serif text-3xl sm:text-5xl text-parchment tracking-[0.08em] font-light max-w-lg leading-tight">
        {t("Este camino no aparece en los Arcanos.", "This path does not appear in the Arcana.")}
      </h1>

      <div className="h-[1px] w-16 mx-auto bg-gold/40 my-6" />

      <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light max-w-md leading-relaxed">
        {t(
          "El sendero que buscas se ha desvanecido en la penumbra o aún no ha sido trazado en el mapa del santuario.",
          "The path you seek has faded into the twilight or has not yet been traced on the sanctuary map."
        )}
      </p>

      <div className="mt-8">
        <Link
          href="/"
          className="inline-block px-8 py-3 text-xs uppercase tracking-[0.25em] font-sans text-obsidian bg-gold hover:bg-gold-light transition-all rounded-sm font-medium shadow-[0_0_20px_rgba(198,160,82,0.35)]"
        >
          {t("Regresar al santuario ✦", "Return to sanctuary ✦")}
        </Link>
      </div>
    </div>
  );
}
