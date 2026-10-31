import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import { TerminosContent } from "@/components/pages/TerminosContent";

export const metadata: Metadata = {
  title: "Términos y Condiciones del Servicio",
  description: "Términos, alcance y naturaleza ética de las consultas de tarot en ARCANO.",
  alternates: {
    canonical: `${siteConfig.url}/terminos/`,
  },
};

export default function TerminosPage() {
  return <TerminosContent />;
}
