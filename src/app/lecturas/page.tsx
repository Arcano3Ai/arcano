import React from "react";
import type { Metadata } from "next";
import { servicesList } from "@/data/services";
import { ServiceCard } from "@/components/ServiceCard";
import { SectionHeader } from "@/components/SectionHeader";
import { brandConfig } from "@/config/brandConfig";
import { siteConfig } from "@/config/siteConfig";
import { LecturasContent } from "@/components/pages/LecturasContent";

export const metadata: Metadata = {
  title: "Lecturas de Tarot Online y Presencial · Consultas Personalizadas",
  description:
    "Lecturas de tarot profesionales en ARCANO. Sesión general evolutiva, tarot del amor, propósito vocacional y lectura profunda con El Señor de los Arcanos.",
  alternates: {
    canonical: `${siteConfig.url}/lecturas/`,
  },
  openGraph: {
    title: "Lecturas y Consultas de Tarot Profesional | ARCANO",
    description:
      "Sesiones ceremoniales y terapéuticas de tarot online y presencial con orientación arquetípica.",
    url: `${siteConfig.url}/lecturas/`,
  },
};

export default function LecturasPage() {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Catálogo de Lecturas de Tarot — ARCANO",
    description: "Servicios profesionales de orientación simbólica y lectura de tarot.",
    itemListElement: servicesList.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.shortDescription,
        provider: {
          "@type": "ProfessionalService",
          name: brandConfig.name,
          url: siteConfig.url,
        },
        offers: {
          "@type": "Offer",
          price: service.priceMXN.toString(),
          priceCurrency: brandConfig.pricing.currency,
          availability: "https://schema.org/InStock",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <LecturasContent />
    </>
  );
}
