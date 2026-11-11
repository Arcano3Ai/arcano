import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Colección de Invierno: Pulsera de Lapislázuli Natural | ARCANO Sabiduría",
  description:
    "Pulsera artesanal forjada con cuentas seleccionadas de lapislázuli natural de 8mm y pirita dorada. $1,299 MXN con Envío Gratis a Todo México y Porta Incienso Áurico de regalo (primeras 100 piezas).",
  alternates: {
    canonical: `${siteConfig.url}/invierno/`,
  },
  openGraph: {
    title: "Colección de Invierno: Pulsera de Lapislázuli Natural | ARCANO Sabiduría",
    description:
      "Pulsera artesanal de lapislázuli 100% natural de 8mm y pirita. $1,299 MXN con Envío Gratis y Porta Incienso Áurico de regalo.",
    url: `${siteConfig.url}/invierno/`,
    siteName: "ARCANO Sabiduría",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/images/shop/invierno/pulsera-lapislazuli-cuadrada-principal.jpg`,
        width: 1200,
        height: 1200,
        alt: "Pulsera de Lapislázuli Colección de Invierno - ARCANO Sabiduría",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Colección de Invierno: Pulsera de Lapislázuli Natural | ARCANO",
    description:
      "Lapislázuli mineral 8mm con pirita dorada. $1,299 MXN con Envío Gratis y Porta Incienso Áurico de regalo.",
    images: [`${siteConfig.url}/images/shop/invierno/pulsera-lapislazuli-cuadrada-principal.jpg`],
  },
};

export default function InviernoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
