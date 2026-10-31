import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/siteConfig';
import { SinastriaContent } from '@/components/pages/SinastriaContent';

export const metadata: Metadata = {
  title: 'Calculadora de Sinastría y Compatibilidad de Pareja Gratis · Bi-Wheel | ARCANO',
  description:
    'Calcula la sinastría y compatibilidad de pareja gratis. Rueda doble Bi-Wheel, aspectos cruzados, química, retos kármicos y la sabiduría de los arcanos.',
  keywords: [
    'sinastria de pareja',
    'calculadora de sinastria',
    'compatibilidad astral gratis',
    'carta de compatibilidad',
    'bi-wheel sinastria',
    'aspectos de sinastria',
    'química astrologica',
    'astro seek sinastria',
    'tarot y astrologia de pareja',
    'arcanos compatibilidad',
  ],
  alternates: {
    canonical: `${siteConfig.url}/sinastria/`,
  },
  openGraph: {
    title: 'Calculadora de Sinastría y Compatibilidad de Pareja | ARCANO',
    description:
      'Descubre la afinidad alquímica de dos cartas natales con la rueda doble interactiva y análisis de aspectos cruzados.',
    url: `${siteConfig.url}/sinastria/`,
  },
};

export default function SinastriaPage() {
  const synastrySchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Calculadora de Sinastría y Compatibilidad de Pareja · ARCANO',
    url: `${siteConfig.url}/sinastria/`,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Herramienta profesional de astrología relacional que calcula la rueda doble (Bi-Wheel), afinidad y aspectos cruzados entre dos personas.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(synastrySchema) }}
      />
      <SinastriaContent />
    </>
  );
}
