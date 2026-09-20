import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Boutique Ceremonial · Quemadores de Incienso & Piedras de Río | ARCANO",
  description:
    "Colección exclusiva de soportes de incienso y piedras de río grabadas a mano. Doble perforación, símbolos Reiki, runas y piezas sagradas para tu altar.",
  alternates: {
    canonical: `${siteConfig.url}/tienda/`,
  },
  openGraph: {
    title: "Boutique Ceremonial · Quemadores de Incienso & Piedras de Río | ARCANO",
    description:
      "Piezas únicas de río taladradas a mano, quemadores de doble perforación, runas sagradas y símbolos Reiki en oro alquímico para tu altar.",
    url: `${siteConfig.url}/tienda/`,
    type: "website",
    locale: "es_MX",
    siteName: "ARCANO",
    images: [
      {
        url: `${siteConfig.url}/og-tienda.jpg`,
        width: 1200,
        height: 630,
        alt: "Boutique Ceremonial ARCANO · Quemadores de Incienso y Piedras Sagradas de Río",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boutique Ceremonial · Quemadores de Incienso & Piedras de Río | ARCANO",
    description:
      "Piezas únicas de río taladradas a mano, quemadores de doble perforación y símbolos sagrados.",
    images: [`${siteConfig.url}/og-tienda.jpg`],
  },
};

export default function TiendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
