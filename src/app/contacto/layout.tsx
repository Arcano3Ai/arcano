import type { Metadata } from "next";
import { siteConfig } from "@/config/siteConfig";

export const metadata: Metadata = {
  title: "Contacto y Santuario · Consultas Privadas de Tarot | ARCANO",
  description:
    "Ponte en contacto con el santuario de ARCANO para agendar tu lectura de tarot personalizada, resolver inquietudes o solicitar orientación ceremonial.",
  alternates: {
    canonical: `${siteConfig.url}/contacto/`,
  },
  openGraph: {
    title: "Contacto con el Santuario | ARCANO",
    description: "Espacio de diálogo para consultas y lecturas privadas de tarot.",
    url: `${siteConfig.url}/contacto/`,
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
