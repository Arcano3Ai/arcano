import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import { PrivacidadContent } from "@/components/pages/PrivacidadContent";

export const metadata: Metadata = {
  title: "Aviso de Privacidad",
  description: "Tratamiento, custodia y confidencialidad de datos personales en ARCANO.",
  alternates: {
    canonical: `${siteConfig.url}/privacidad/`,
  },
};

export default function PrivacidadPage() {
  return <PrivacidadContent />;
}
