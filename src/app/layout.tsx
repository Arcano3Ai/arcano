import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";
import { brandConfig } from "@/config/brandConfig";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MysticalBackground } from "@/components/MysticalBackground";
import { StarField } from "@/components/StarField";
import { CustomCursor } from "@/components/CustomCursor";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AtmosphereAudioPlayer } from "@/components/AtmosphereAudioPlayer";
import { ArcanaAiBot } from "@/components/ArcanaAiBot";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: brandConfig.name }],
  creator: brandConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: brandConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: brandConfig.name,
    description: brandConfig.tagline,
    url: siteConfig.url,
    telephone: brandConfig.contact.phone,
    email: brandConfig.contact.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MX",
    },
  };

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-obsidian text-parchment flex flex-col relative antialiased selection:bg-gold/30 selection:text-parchment">
        {/* Atmósfera mística fija */}
        <MysticalBackground />
        <StarField />
        <CustomCursor />

        {/* Cabecera persistente */}
        <Header />

        {/* Contenido principal */}
        <main className="flex-1 relative z-10 pt-20 sm:pt-24">{children}</main>

        {/* Footer, audio ceremonial, asistente IA y botón WhatsApp flotante */}
        <Footer />
        <AtmosphereAudioPlayer />
        <ArcanaAiBot />
        <WhatsAppButton />
      </body>
    </html>
  );
}
