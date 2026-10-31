"use client";

import React from "react";
import { DailyCardModule } from "@/components/DailyCardModule";
import { SectionHeader } from "@/components/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

export const CartaDelDiaContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <SectionHeader
        as="h1"
        subtitle={t("Oráculo Cotidiano", "Everyday Oracle")}
        title={t("Tu Carta para el Día de Hoy", "Your Card for Today")}
        description={t(
          "El tarot diario no busca predecir eventos con rigidez; actúa como una brújula reflexiva para recordarte en qué actitud sabia puedes habitar los retos y oportunidades de hoy.",
          "Daily tarot does not seek rigid predictions; it serves as a reflective compass reminding you what wise attitude can inhabit today's challenges and opportunities."
        )}
        symbol="☾"
      />

      <DailyCardModule />
    </div>
  );
};
