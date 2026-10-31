import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";
import { CancelacionesContent } from "@/components/pages/CancelacionesContent";

export const metadata: Metadata = {
  title: "Política de Cancelación y Reprogramación",
  description: "Políticas de aviso previo, cambios de horario y reembolsos en ARCANO.",
  alternates: {
    canonical: `${siteConfig.url}/cancelaciones/`,
  },
};

export default function CancelacionesPage() {
  return <CancelacionesContent />;
}
