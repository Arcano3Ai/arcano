"use client";

import React from "react";
import { servicesList } from "@/data/services";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeader } from "@/components/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";

export const LecturasContent: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <SectionHeader
        as="h1"
        subtitle={t("Catálogo Ceremonial", "Ceremonial Catalog")}
        title={t("Nuestras Lecturas de Tarot", "Our Tarot Readings")}
        description={t(
          "Cada sesión es un espacio de quietud donde los símbolos de los arcanos se despliegan para iluminar tus encrucijadas presentes con respeto y confidencialidad.",
          "Every session is a space of stillness where the arcana symbols unfold to illuminate your present crossroads with respect and confidentiality."
        )}
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
          {t("Compromiso Ético del Santuario", "Sanctuary Ethical Commitment")}
        </h4>
        <p className="text-xs text-parchment-muted font-sans font-light mt-2 leading-relaxed">
          {t(
            "Nuestras lecturas se rigen por la deontología de la orientación simbólica. No realizamos adivinación fatalista, diagnósticos médicos ni promesas garantizadas sobre voluntades ajenas. Toda consulta es estrictamente confidencial.",
            "Our readings abide by the ethics of symbolic guidance. We do not practice fatalistic fortune-telling, medical diagnoses, or guaranteed promises over external wills. Every consultation is strictly confidential."
          )}
        </p>
      </div>
    </div>
  );
};
