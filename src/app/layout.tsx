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
import { StudentProvider } from "@/lib/academy/studentContext";

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
  publisher: "ARCANO Solutions",
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
        alt: `${brandConfig.name} — ${brandConfig.descriptor} | Monterrey & México`,
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
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "es-MX": siteConfig.url,
      "es": siteConfig.url,
      "x-default": siteConfig.url,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": "5442B7D227DA13976DD32A18CCE7B0B7",
    },
  },
  other: {
    // Bing & Google Local Geo-targeting: Monterrey, NL & Cobertura México
    "geo.region": "MX-NLE",
    "geo.placename": "Monterrey, San Pedro Garza García, Nuevo León, México",
    "geo.position": "25.686614;-100.316113",
    "ICBM": "25.686614, -100.316113",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: `${brandConfig.name} — ${brandConfig.descriptor}`,
        alternateName: "ARCANO Tarot & Astrología Monterrey y México",
        description: siteConfig.description,
        inLanguage: "es-MX",
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteConfig.url}/arcanos?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${siteConfig.url}/#organization`,
        name: "ARCANO — Tarot, Astrología & Academia Mística",
        alternateName: brandConfig.name,
        description:
          "Santuario místico de Tarot Profesional, Carta Astral y Astrología en Monterrey, San Pedro Garza García y todo México. Academia certificada con 21 cursos, oráculo diario y lecturas privadas online.",
        url: siteConfig.url,
        logo: `${siteConfig.url}/icons/icon-512x512.png`,
        image: siteConfig.ogImage,
        telephone: brandConfig.contact.phone,
        email: brandConfig.contact.email,
        priceRange: "$$",
        currenciesAccepted: "MXN",
        paymentAccepted: "Efectivo, Tarjeta de Crédito/Débito, Mercado Pago, Stripe, Transferencia SPEI",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Calzada San Pedro / Zona Metropolitana",
          addressLocality: "Monterrey",
          addressRegion: "Nuevo León",
          postalCode: "64000",
          addressCountry: "MX",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 25.686614,
          longitude: -100.316113,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "09:00",
            closes: "21:00",
          },
        ],
        areaServed: [
          { "@type": "City", name: "Monterrey" },
          { "@type": "City", name: "San Pedro Garza García" },
          { "@type": "City", name: "San Nicolás de los Garza" },
          { "@type": "City", name: "Guadalupe" },
          { "@type": "AdministrativeArea", name: "Nuevo León" },
          { "@type": "Country", name: "México" },
          { "@type": "City", name: "Ciudad de México" },
          { "@type": "City", name: "Guadalajara" },
          { "@type": "City", name: "Puebla" },
          { "@type": "City", name: "Querétaro" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios Místicos y Formación Esotérica",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Lectura de Tarot Profesional Privada",
                description: "Sesión personalizada de orientación arquetípica y tarot evolutivo online y presencial.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Lectura de Carta Astral Natal y Tránsitos",
                description: "Estudio astrológico profundo de posiciones planetarias y tránsitos vitales.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Estudio de Sinastría de Parejas",
                description: "Análisis de compatibilidad astrológica y vínculos afectivos.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Course",
                name: "Academia ARCANO — 21 Cursos de Formación Mística",
                description: "Carrera esotérica completa en Tarot, Astrología, Numerología y Reiki con certificación.",
              },
            },
          ],
        },
        knowsAbout: [
          "Tarot Profesional Monterrey",
          "Lectura de Cartas Monterrey",
          "Carta Astral Monterrey",
          "Astrología México",
          "Arcanos Mayores",
          "Arcanos Menores",
          "Tarot Terapéutico y Evolutivo",
          "Psicología Arquetípica",
          "Simbolismo Iniciático",
          "Reiki y Sanación Energética",
          "Numerología Pitagórica",
        ],
        sameAs: [
          brandConfig.social.instagram,
          brandConfig.social.facebook,
          brandConfig.social.spotify,
        ].filter(Boolean),
      },
      {
        "@type": "EducationalOrganization",
        "@id": `${siteConfig.url}/#academy`,
        name: "Academia ARCANO — Escuela de Tarot & Astrología",
        url: `${siteConfig.url}/academia`,
        description: "Plataforma de formación esotérica estructurada con 21 cursos en 4 disciplinas ancestrales.",
        areaServed: [
          { "@type": "City", name: "Monterrey" },
          { "@type": "Country", name: "México" },
        ],
      },
    ],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className="min-h-screen bg-obsidian text-parchment flex flex-col relative antialiased selection:bg-gold/30 selection:text-parchment transition-colors duration-500">
        <ThemeProvider>
          <StudentProvider>
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
          </StudentProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
