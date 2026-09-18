import { Metadata } from "next";
import { AcademySection } from "@/components/academy/AcademySection";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Academia Esotérica | Cursos de Tarot, Astrología, Numerología y Reiki | ARCANO",
  description:
    "Academia Esotérica ARCANO: Cursos de Tarot, Astrología, Numerología, Reiki y Energía. Formación paso a paso por $799 MXN por nivel. Completa los primeros 3 niveles y recibe una página web personalizada GRATIS con dominio incluido.",
  keywords: [
    "Academia esotérica",
    "Academia de Tarot",
    "Cursos de Tarot",
    "Curso de Astrología",
    "Cursos de Astrología",
    "Curso de Numerología",
    "Cursos de Numerología",
    "Curso de Reiki",
    "Reiki y Energía",
    "Cursos esotéricos",
    "Carta natal",
    "Tarot profesional",
  ],
  alternates: {
    canonical: `${siteConfig.url}/academia/`,
  },
  openGraph: {
    title: "Academia Esotérica | ARCANO — Sabiduría Ancestral & Crecimiento Profesional",
    description:
      "Explora el conocimiento ancestral en 4 grandes disciplinas: Tarot, Astrología, Numerología y Reiki. Cada curso $799 MXN. Desbloquea tu página web gratis.",
    url: `${siteConfig.url}/academia/`,
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-academia.jpg`,
        width: 1200,
        height: 630,
        alt: "Academia Esotérica ARCANO — Formación en Tarot, Astrología, Numerología y Reiki",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Academia Esotérica | ARCANO — Sabiduría Ancestral",
    description:
      "Explora el conocimiento ancestral en 4 grandes disciplinas: Tarot, Astrología, Numerología y Reiki.",
    images: [`${siteConfig.url}/og-academia.jpg`],
  },
};

export default function AcademiaPage() {
  return (
    <main className="min-h-screen bg-obsidian-deep pt-16">
      <AcademySection />
    </main>
  );
}
