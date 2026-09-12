import React from "react";
import type { Metadata } from "next";
import { servicesList } from "@/data/services";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeader } from "@/components/SectionHeader";
import { brandConfig } from "@/config/brandConfig";

export const metadata: Metadata = {
  title: "Lecturas y Consultas de Tarot",
  description:
    "Catálogo ceremonial de lecturas de tarot en ARCANO. Lectura general, vínculos afectivos, propósito vocacional y lectura profunda.",
};

export default function LecturasPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <SectionHeader
        subtitle="Catálogo Ceremonial"
        title="Nuestras Lecturas"
        description="Cada sesión es un espacio de quietud donde los símbolos de los arcanos se despliegan para iluminar tus encrucijadas presentes con respeto y confidencialidad."
        symbol="✦"
      />

      {/* Grid de servicios en forma de cartas de tarot */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12">
        {servicesList.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>

      {/* Nota ética al pie del catálogo */}
      <div className="mt-16 p-6 rounded-xl border border-charcoal-border bg-charcoal/40 text-center max-w-3xl mx-auto">
        <span className="text-gold text-sm block mb-2">☾</span>
        <h4 className="font-serif text-lg text-parchment font-light">
          Compromiso Ético del Santuario
        </h4>
        <p className="text-xs text-parchment-muted font-sans font-light mt-2 leading-relaxed">
          Nuestras lecturas se rigen por la deontología de la orientación simbólica. No realizamos adivinación fatalista, diagnósticos médicos ni promesas garantizadas sobre voluntades ajenas. Toda consulta es estrictamente confidencial.
        </p>
      </div>
    </div>
  );
}
