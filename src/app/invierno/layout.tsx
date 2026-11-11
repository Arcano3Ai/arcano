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
        url: `${siteConfig.url}/images/shop/invierno/pulsera-lapislazuli-producto-marmol.jpg`,
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
    images: [`${siteConfig.url}/images/shop/invierno/pulsera-lapislazuli-producto-marmol.jpg`],
  },
};

export default function InviernoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* 1. Google tag (gtag.js) y función de conversión para Google Ads */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18219380453" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-18219380453');

  function gtag_report_conversion(url) {
    var redirected = false;
    var callback = function () {
      if (!redirected && typeof(url) !== 'undefined') {
        redirected = true;
        window.location.href = url;
      }
    };
    if (typeof gtag === 'function') {
      gtag('event', 'conversion', {
        'send_to': 'AW-18219380453/Ro8pCNn5tsgcEOXd1u9D',
        'value': 1299.0,
        'currency': 'MXN',
        'event_callback': callback
      });
      // Fallback de seguridad (800ms) por si el navegador bloquea el callback
      setTimeout(callback, 800);
    } else {
      window.location.href = url;
    }
    return false;
  }
          `,
        }}
      />
      {children}
    </>
  );
}
