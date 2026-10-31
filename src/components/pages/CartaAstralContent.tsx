"use client";

import React from "react";
import { SectionHeader } from "@/components/SectionHeader";
import NatalChartApp from "@/components/astrology/NatalChartApp";
import { useLanguage } from "@/context/LanguageContext";

export function CartaAstralContent() {
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 print:p-0 print:m-0 print:max-w-none">
      <div className="print:hidden">
        <SectionHeader
          as="h1"
          subtitle={t("Cosmología Sagrada", "Sacred Cosmology")}
          title={t("Carta Natal y Rueda Astral", "Natal Chart & Astral Wheel")}
          description={t(
            "El cielo cósmico al instante de tu primer aliento es un mapa vivo de potencialidades. Explora tus posiciones planetarias, la geometría sagrada de tus aspectos y la tríada fundamental de tu alma.",
            "The cosmic sky at the instant of your first breath is a living map of potentialities. Explore your planetary positions, the sacred geometry of your aspects, and the fundamental triad of your soul."
          )}
          symbol="❂"
        />
      </div>

      <NatalChartApp />
    </div>
  );
}
