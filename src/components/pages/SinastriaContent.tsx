"use client";

import React from "react";
import { SectionHeader } from "@/components/SectionHeader";
import SynastryApp from "@/components/astrology/SynastryApp";
import { useLanguage } from "@/context/LanguageContext";

export function SinastriaContent() {
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 print:p-0 print:m-0 print:max-w-none">
      <div className="print:hidden">
        <SectionHeader
          as="h1"
          subtitle={t("Alquimia Relacional", "Relational Alchemy")}
          title={t("Sinastría y Compatibilidad de Almas", "Synastry & Soul Compatibility")}
          description={t(
            "Cuando dos universos se encuentran, sus estrellas trazan un diálogo único de atracción, complicidad y evolución compartida. Explora los aspectos cruzados de su vínculo cósmico.",
            "When two universes meet, their stars trace a unique dialogue of attraction, complicity, and shared evolution. Explore the cross-aspects of your cosmic bond."
          )}
          symbol="⚭"
        />
      </div>

      <SynastryApp />
    </div>
  );
}
