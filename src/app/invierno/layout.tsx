import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colección de Invierno: El Arcano que te Elige | ARCANO Sabiduría",
  description:
    "Pulsera sagrada forjada a mano con Lapislázuli Afgano de grado ceremonial y cuarzos naturales. Edición limitada de Solsticio consagrada a tu medida en Monterrey, México.",
  openGraph: {
    title: "Colección de Invierno: El Arcano que te Elige | ARCANO Sabiduría",
    description:
      "Pulsera sagrada de Lapislázuli Afgano y Pirita. $1,299 MXN con Envío Express Asegurado sin costo a todo México.",
    images: [
      {
        url: "https://arcanosolutions.com/images/shop/invierno/pulsera-lapislazuli-cuadrada-principal.jpg",
        width: 1200,
        height: 1200,
        alt: "Pulsera de Lapislázuli Colección de Invierno - Arcano Sabiduría",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Colección de Invierno: El Arcano que te Elige | ARCANO",
    description:
      "Lapislázuli Afgano ceremonial con pirita dorada. $1,299 MXN con envío gratis.",
    images: ["https://arcanosolutions.com/images/shop/invierno/pulsera-lapislazuli-cuadrada-principal.jpg"],
  },
};

export default function InviernoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

