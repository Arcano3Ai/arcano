import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/SectionHeader";

import { siteConfig } from "@/config/siteConfig";
import { TarotDelAmorContent } from "@/components/pages/TarotDelAmorContent";

export const metadata: Metadata = {
  title: "Tarot del Amor y Pareja · Lectura Simbólica de Vínculos y Relaciones",
  description:
    "Explora los arquetipos de tus vínculos con el Tarot del Amor. Comprensión profunda de relaciones, comunicación, cierres y nuevos encuentros conscientes.",
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
  return <TarotDelAmorContent />;
}
