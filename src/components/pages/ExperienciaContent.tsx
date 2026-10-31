"use client";

import React from "react";
import Link from "next/link";
import { experienceSteps } from "@/data/experienceSteps";
import { SectionHeader } from "@/components/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

export function ExperienciaContent() {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <SectionHeader
        as="h1"
        subtitle={t("Rito de Paso", "Rite of Passage")}
        title={t("Tu Experiencia en el Santuario", "Your Sanctuary Experience")}
        description={t(
          "Cada encuentro está concebido como una pausa sagrada en el ajetreo del mundo moderno. No hay prisas ni juicios: solo espacio para la verdad de tus preguntas.",
          "Every session is conceived as a sacred pause amidst modern rush. No hurries, no judgments: only space for the truth of your inquiries."
        )}
        symbol="◇"
      />

      {/* Línea temporal vertical ceremonial */}
      <div className="relative border-l border-gold/30 ml-4 sm:ml-8 my-16 space-y-12 sm:space-y-16">
        {experienceSteps.map((step) => (
          <div key={step.stepNumber} className="relative pl-8 sm:pl-12">
            {/* Nodo en la línea */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full border border-gold/60 bg-obsidian flex items-center justify-center text-gold text-xs shadow-[0_0_10px_rgba(198,160,82,0.3)]">
              {step.glyph}
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans block">
                {language === "en" ? `Step ${step.stepNumber} · ` : `Paso ${step.stepNumber} · `}
                {t(step.subtitle, step.subtitleEn || step.subtitle)}
              </span>
              <h3 className="font-serif text-2xl text-parchment font-medium tracking-wide">
                {t(step.title, step.titleEn || step.title)}
              </h3>
              <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed max-w-xl">
                {t(step.description, step.descriptionEn || step.description)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Llamada a la acción */}
      <div className="p-8 sm:p-12 rounded-xl border border-charcoal-border bg-gradient-to-b from-[#14141c] to-[#07070a] text-center space-y-4">
        <span className="text-gold text-2xl font-serif">☾</span>
        <h3 className="font-serif text-2xl sm:text-3xl text-parchment font-light">
          {t("¿Listo para iniciar tu travesía simbólica?", "Ready to embark on your symbolic journey?")}
        </h3>
        <p className="text-xs sm:text-sm text-parchment-muted font-sans max-w-md mx-auto">
          {t(
            "Elige el formato de lectura que mejor resuene con tu encrucijada actual.",
            "Choose the reading format that best resonates with your current crossroads."
          )}
        </p>
        <div className="pt-4">
          <Link
            href="/reservar/"
            className="inline-block px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-sans text-obsidian bg-gold hover:bg-gold-light transition-all rounded-sm font-medium shadow-[0_0_25px_rgba(198,160,82,0.4)]"
          >
            {t("Reservar mi momento ✦", "Reserve my session ✦")}
          </Link>
        </div>
      </div>
    </div>
  );
}
