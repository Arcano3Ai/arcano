import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";

import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Tarot del Amor y Pareja · Lectura Simbólica de Vínculos y Relaciones",
  description:
    "Explora los arquetipos detrás de tus vínculos afectivos con el Tarot del Amor. Comprensión profunda de relaciones, comunicación, cierres de ciclo y nuevos encuentros conscientes.",
  keywords: [
    "tarot del amor",
    "lectura tarot del amor",
    "tarot parejas",
    "tirada del amor",
    "relaciones y tarot",
    "tarot sentimientos ocultos",
    "tarot vinculos afectivos",
  ],
  alternates: {
    canonical: `${siteConfig.url}/tarot-del-amor/`,
  },
  openGraph: {
    title: "Tarot del Amor y Pareja | ARCANO",
    description: "Lectura ceremonial y terapéutica de vínculos afectivos.",
    url: `${siteConfig.url}/tarot-del-amor/`,
  },
};

export default function TarotDelAmorPage() {
  const loveSections = [
    {
      title: "Relaciones en Curso",
      description:
        "Comprensión de la dinámica actual, la energía que comparten y qué acuerdos tácitos necesitan actualizarse para que el vínculo respire sin asfixia.",
      symbol: "☾",
    },
    {
      title: "Sentimientos y Emociones Ocultas",
      description:
        "Observar las corrientes afectivas que no siempre se verbalizan: miedos al abandono, lealtades invisibles y necesidades de validación íntima.",
      symbol: "✧",
    },
    {
      title: "Comunicación y Desencuentros",
      description:
        "Identificar por qué ciertas conversaciones caen en círculos viciosos y qué arquetipo puede desbloquear la escucha compasiva y recíproca.",
      symbol: "✦",
    },
    {
      title: "Apertura a Nuevos Vínculos",
      description:
        "Para quienes buscan el amor: qué heridas pasadas aún cierran el paso a la entrega y cómo cultivar una disponibilidad anímica auténtica.",
      symbol: "◇",
    },
    {
      title: "Decisiones Cruciales de Pareja",
      description:
        "Convivencia, compromisos mayores o cambios de rumbo. Análisis objetivo del terreno antes de tomar una determinación de vida compartida.",
      symbol: "🜄",
    },
    {
      title: "Cierres de Ciclo y Duelo Afectivo",
      description:
        "Aprender a despedir con gratitud lo que ya concluyó, recuperando tu propia soberanía emocional sin rencor ni estancamiento.",
      symbol: "🜁",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Hero */}
      <div className="text-center space-y-4 mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-gold/80 font-sans">
          El Espejo del Corazón
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-parchment tracking-[0.1em] font-light">
          Tarot del Amor
        </h1>
        <p className="font-serif italic text-lg sm:text-2xl text-parchment-muted max-w-xl mx-auto">
          &ldquo;Explora los símbolos detrás de tus vínculos.&rdquo;
        </p>
        <p className="text-xs sm:text-sm text-parchment-dim font-sans max-w-2xl mx-auto font-light leading-relaxed pt-2">
          El amor no es un enigma que deba adivinarse con angustia; es un territorio sagrado que invita a mirarse con verdad, despojándose de máscaras y comprendiendo qué proyectamos en el otro.
        </p>

        <div className="pt-6">
          <Link
            href="/reservar?servicio=amor-y-relaciones"
            className="inline-block px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-sans text-obsidian bg-gold hover:bg-gold-light transition-all rounded-sm font-medium shadow-[0_0_20px_rgba(198,160,82,0.35)]"
          >
            Reservar lectura de amor ✦
          </Link>
        </div>
      </div>

      {/* Áreas de Exploración */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loveSections.map((sec, idx) => (
          <div
            key={idx}
            className="rounded-lg p-6 bg-charcoal/50 border border-charcoal-border flex flex-col justify-between"
          >
            <div>
              <span className="text-gold text-base block mb-3 font-serif">
                {sec.symbol}
              </span>
              <h3 className="font-serif text-xl text-parchment font-medium">
                {sec.title}
              </h3>
              <p className="text-xs text-parchment-muted font-sans font-light mt-3 leading-relaxed">
                {sec.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Sección Reflexión */}
      <div className="mt-16 p-8 sm:p-10 rounded-xl border border-charcoal-border bg-gradient-to-b from-[#180f15] to-[#08080a] text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans">
          Meditación Vinculante
        </span>
        <h3 className="font-serif text-xl sm:text-2xl text-parchment font-light">
          &ldquo;Nadie puede encontrarte más allá del punto en el que tú mismo te has abandonado.&rdquo;
        </h3>
        <p className="text-xs text-parchment-muted font-sans font-light max-w-lg mx-auto leading-relaxed">
          Toda lectura de amor en ARCANO comienza reconociendo tu propio valor inherente. No buscamos someter voluntades ajenas ni asegurar regresos forzados; cultivamos la dignidad y la capacidad de amar desde la libertad.
        </p>
        <div className="pt-4">
          <Link
            href="/reservar?servicio=amor-y-relaciones"
            className="text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-light border-b border-gold/40 pb-0.5 font-sans"
          >
            Solicitar lectura especializada →
          </Link>
        </div>
      </div>
    </div>
  );
}
