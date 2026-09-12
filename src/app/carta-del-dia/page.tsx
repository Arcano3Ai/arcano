import React from "react";
import type { Metadata } from "next";
import { DailyCardModule } from "@/components/DailyCardModule";
import { SectionHeader } from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "La Carta del Día · Oráculo Diario",
  description:
    "Descubre la carta del día en ARCANO. Una invitación a la introspección personal y la contemplación lúcida de tu jornada a través de los símbolos.",
};

export default function CartaDelDiaPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
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
