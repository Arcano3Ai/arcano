import type { Metadata, Viewport } from "next";
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
import { PwaRegister } from "@/components/PwaRegister";
import { CookieConsentBanner } from "@/components/CookieConsentBanner";
import { ThemeProvider } from "@/context/ThemeContext";

export const viewport: Viewport = {
  themeColor: "#07060b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ARCANO",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: brandConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${brandConfig.name} — ${brandConfig.descriptor}`,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": "5442B7D227DA13976DD32A18CCE7B0B7",
    },
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="ARCANO" />
        <meta name="theme-color" content="#07060b" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-obsidian text-parchment flex flex-col relative antialiased selection:bg-gold/30 selection:text-parchment transition-colors duration-500">
        <ThemeProvider>
          {/* Atmósfera mística fija */}
          <MysticalBackground />
          <StarField />
          <CustomCursor />

          {/* Cabecera persistente */}
          <Header />

          {/* Contenido principal */}
          <main className="flex-1 relative z-10 pt-20 sm:pt-24">{children}</main>

          {/* Footer, audio ceremonial, asistente IA, botón WhatsApp flotante y PWA Register */}
          <Footer />
          <AtmosphereAudioPlayer />
          <ArcanaAiBot />
          <WhatsAppButton />
          <PwaRegister />
          <CookieConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
