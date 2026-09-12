import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { experienceSteps } from "@/data/experienceSteps";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Tu Experiencia en ARCANO · El Método de los 5 Pasos",
  description:
    "Conoce cómo funciona una lectura ceremonial en ARCANO: desde la elección consciente hasta la integración reflexiva en tu vida diaria.",
};

export default function ExperienciaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <SectionHeader
        subtitle="Rito de Paso"
        title="Tu Experiencia en el Santuario"
        description="Cada encuentro está concebido como una pausa sagrada en el ajetreo del mundo moderno. No hay prisas ni juicios: solo espacio para la verdad de tus preguntas."
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
                Paso {step.stepNumber} · {step.subtitle}
              </span>
              <h3 className="font-serif text-2xl text-parchment font-medium tracking-wide">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed max-w-xl">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Llamada a la acción */}
      <div className="p-8 sm:p-12 rounded-xl border border-charcoal-border bg-gradient-to-b from-[#14141c] to-[#07070a] text-center space-y-4">
        <span className="text-gold text-2xl font-serif">☾</span>
        <h3 className="font-serif text-2xl sm:text-3xl text-parchment font-light">
          ¿Listo para iniciar tu travesía simbólica?
        </h3>
        <p className="text-xs sm:text-sm text-parchment-muted font-sans max-w-md mx-auto">
          Elige el formato de lectura que mejor resuene con tu encrucijada actual.
        </p>
        <div className="pt-4">
          <Link
            href="/reservar"
            className="inline-block px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-sans text-obsidian bg-gold hover:bg-gold-light transition-all rounded-sm font-medium shadow-[0_0_25px_rgba(198,160,82,0.4)]"
          >
            Reservar mi momento ✦
          </Link>
        </div>
      </div>
    </div>
  );
}
