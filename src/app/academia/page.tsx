import { Metadata } from "next";
import { AcademySection } from "@/components/academy/AcademySection";

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
  openGraph: {
    title: "Academia Esotérica | ARCANO — Sabiduría Ancestral & Crecimiento Profesional",
    description:
      "Explora el conocimiento ancestral en 4 grandes disciplinas: Tarot, Astrología, Numerología y Reiki. Cada curso $799 MXN. Desbloquea tu página web gratis.",
    images: ["/images/cards/ar19.jpg"],
  },
};

export default function AcademiaPage() {
  return (
    <main className="min-h-screen bg-obsidian-deep pt-16">
      <AcademySection />
    </main>
  );
}
