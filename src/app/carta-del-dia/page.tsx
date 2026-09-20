import React from "react";
import type { Metadata } from "next";
import { DailyCardModule } from "@/components/DailyCardModule";
import { SectionHeader } from "@/components/SectionHeader";

import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Carta del Día · Tarot Diario y Oráculo de Hoy Gratis | ARCANO",
  description:
    "Descubre tu carta del día de tarot. Una tirada interactiva diaria para revelar la energía arquetípica de tu jornada con la sabiduría de los arcanos.",
  keywords: [
    "carta del dia",
    "carta del tarot de hoy",
    "tarot diario",
    "oraculo del dia",
    "tirada de tarot diaria gratis",
    "arcanos mayores carta del dia",
  ],
  alternates: {
    canonical: `${siteConfig.url}/carta-del-dia/`,
  },
  openGraph: {
    title: "La Carta del Día · Oráculo Diario de Tarot | ARCANO",
    description:
      "Tira una carta del tarot hoy y contempla los símbolos de tu jornada presente.",
    url: `${siteConfig.url}/carta-del-dia/`,
  },
};

export default function CartaDelDiaPage() {
  const oracleSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Carta del Día · Oráculo Diario de Tarot",
    url: `${siteConfig.url}/carta-del-dia/`,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Herramienta interactiva de introspección que revela una carta de tarot diaria para orientación y reflexión personal.",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(oracleSchema) }}
      />
      <SectionHeader
        subtitle="Oráculo Cotidiano"
        title="Tu Carta para el Día de Hoy"
        description="El tarot diario no busca predecir eventos con rigidez; actúa como una brújula reflexiva para recordarte en qué actitud sabia puedes habitar los retos y oportunidades de hoy."
        symbol="☾"
      />

      <DailyCardModule />
    </div>
  );
}
