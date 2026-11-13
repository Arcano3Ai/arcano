import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Boutique de Alta Joyería Mineral & Talismanes | ARCANO",
  description:
    "Colección exclusiva de talismanes y pulseras en minerales 100% puros Grado AAA de 8mm. Veta Mineral de 32 cristales naturales seleccionados y piezas hechas a mano a la medida exacta de tu muñeca en Monterrey, México.",
  alternates: {
    canonical: `${siteConfig.url}/tienda/`,
  },
  openGraph: {
    title: "Boutique ARCANO · Alta Joyería Mineral & Talismanes",
    description:
      "Pulseras y talismanes forjados en minerales 100% puros de 8mm Grado AAA (Amatista, Ámbar de Chiapas, Malaquita, Lapislázuli, Ojo de Tigre). Hechas a mano a tu medida exacta.",
    url: `${siteConfig.url}/tienda/`,
    type: "website",
    locale: "es_MX",
    siteName: "ARCANO",
    images: [
      {
        url: `${siteConfig.url}/og-tienda.jpg`,
        secureUrl: `${siteConfig.url}/og-tienda.jpg`,
        width: 1200,
        height: 630,
        alt: "Boutique ARCANO · Alta Joyería Mineral de 8mm",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boutique ARCANO · Alta Joyería Mineral & Talismanes",
    description:
      "Talismanes y pulseras en minerales 100% puros de 8mm Grado AAA. Hechas a mano a tu medida exacta en Monterrey, México.",
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
