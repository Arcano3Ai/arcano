import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Boutique de Alta Joyería Mineral & Talismanes Sagrados | ARCANO",
  description:
    "Colección exclusiva de talismanes y pulseras en minerales 100% puros Grado AAA de 8mm. Consagrados en Luna Llena ante fuego ceremonial. Veta Sagrada de 32 cristales y piezas hechas a mano a la medida exacta de tu muñeca.",
  alternates: {
    canonical: `${siteConfig.url}/tienda/`,
  },
  openGraph: {
    title: "Boutique Ceremonial ARCANO · Alta Joyería Mineral & Talismanes Sagrados",
    description:
      "Pulseras y talismanes forjados en minerales 100% puros de 8mm Grado AAA (Amatista, Ámbar de Chiapas, Malaquita, Pirita, Turquesa). Consagradas en Luna Llena ante fuego sagrado. Hechas a mano a tu medida.",
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
        alt: "Boutique Ceremonial ARCANO · Alta Joyería Mineral & Talismanes Sagrados de 8mm",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boutique Ceremonial ARCANO · Alta Joyería Mineral & Talismanes Sagrados",
    description:
      "Talismanes y pulseras en minerales 100% puros de 8mm Grado AAA. Consagradas en Luna Llena ante fuego sagrado. Hechas a mano a tu medida.",
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
