import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import { ExperienciaContent } from "@/components/pages/ExperienciaContent";

export const metadata: Metadata = {
  title: "El Método de Tarot Simbólico · Cómo Funciona Tu Sesión | ARCANO",
  description:
    "Conoce el método ceremonial de tarot en ARCANO: un proceso en 5 pasos desde la formulación de tu pregunta hasta la integración consciente de los símbolos.",
  alternates: {
    canonical: `${siteConfig.url}/experiencia/`,
  },
  openGraph: {
    title: "Tu Experiencia en ARCANO · El Método de los 5 Pasos",
    description: "Cómo funciona una sesión ceremonial de tarot paso a paso.",
    url: `${siteConfig.url}/experiencia/`,
  },
};

export default function ExperienciaPage() {
  return <ExperienciaContent />;
}
