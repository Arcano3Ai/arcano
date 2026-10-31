import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/config/siteConfig";
import { TarotProfesionalContent } from "@/components/pages/TarotProfesionalContent";

export const metadata: Metadata = {
  title: "Tarot Profesional y Vocacional · Claridad para tu Carrera y Propósito | ARCANO",
  description:
    "Claridad estratégica y arquetípica para decisiones de carrera, proyectos, liderazgo, encrucijadas laborales y desbloqueo de tu propósito vocacional.",
  keywords: [
    "tarot profesional",
    "tarot trabajo",
    "tarot carrera profesional",
    "tarot vocacional",
    "tarot proyectos",
    "tirada de tarot laboral",
    "orientacion profesional tarot",
  ],
  alternates: {
    canonical: `${siteConfig.url}/tarot-profesional/`,
  },
  openGraph: {
    title: "Tarot Profesional y Vocacional | ARCANO",
    description: "Orientación simbólica y estratégica para proyectos y carrera.",
    url: `${siteConfig.url}/tarot-profesional/`,
  },
};

export default function TarotProfesionalPage() {
  return <TarotProfesionalContent />;
}
