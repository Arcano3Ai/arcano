import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Reservar Lectura de Tarot Online · Sesión Privada y Confidencial | ARCANO",
  description:
    "Agenda tu sesión personalizada de lectura de tarot en ARCANO. Orientación evolutiva y simbólica por videoconferencia o audio ceremonial con confirmación inmediata.",
  keywords: [
    "reservar lectura de tarot",
    "agendar cita tarot online",
    "consulta de tarot personalizada",
    "sesion de tarot privado",
    "tarotista online reservar",
  ],
  alternates: {
    canonical: `${siteConfig.url}/reservar/`,
  },
  openGraph: {
    title: "Reservar Lectura de Tarot | ARCANO",
    description: "Espacio ceremonial para reservar tu consulta privada de tarot.",
    url: `${siteConfig.url}/reservar/`,
  },
};

export default function ReservarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
