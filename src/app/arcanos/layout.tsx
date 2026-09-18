import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Los 22 Arcanos Mayores y Menores · Compendio y Simbolismo del Tarot | ARCANO",
  description:
    "Explora la enciclopedia completa del tarot en ARCANO: los 22 Arcanos Mayores y los 56 Arcanos Menores. Simbolismo arquetípico, elementos, manifestaciones de luz y sombra.",
  keywords: [
    "arcanos mayores",
    "arcanos menores",
    "significado arcanos mayores",
    "cartas del tarot",
    "simbolismo del tarot",
    "los 22 arcanos",
    "arquetipos del tarot",
  ],
  alternates: {
    canonical: `${siteConfig.url}/arcanos/`,
  },
  openGraph: {
    title: "Compendio de los 22 Arcanos Mayores y Menores | ARCANO",
    description:
      "Explora el simbolismo, arquetipos y enseñanzas de las 78 cartas del tarot.",
    url: `${siteConfig.url}/arcanos/`,
  },
};

export default function ArcanosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
