import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import { BlogContent } from "@/components/pages/BlogContent";

export const metadata: Metadata = {
  title: "Blog de Tarot, Filosofía y Simbolismo Arquetípico | ARCANO",
  description:
    "Ensayos profundos sobre el significado del tarot, los arcanos mayores, psicología de arquetipos, tiradas prácticas y filosofía hermética.",
  keywords: [
    "blog de tarot",
    "articulos de tarot",
    "aprender tarot",
    "significado del tarot",
    "psicologia arquetipica tarot",
    "tiradas de tarot interpretacion",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/`,
  },
  openGraph: {
    title: "Crónicas de los Símbolos · Revista Editorial de Tarot | ARCANO",
    description:
      "Ensayos meditativos y guías para profundizar en el lenguaje arquetípico de los arcanos.",
    url: `${siteConfig.url}/blog/`,
  },
};

export default function BlogIndexPage() {
  return <BlogContent />;
}
