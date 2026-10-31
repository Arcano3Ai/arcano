import React from 'react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/siteConfig';
import { CartaAstralContent } from '@/components/pages/CartaAstralContent';

export const metadata: Metadata = {
  title: 'Calculadora de Carta Natal y Rueda Astral Gratis · Precisión Efemérides | ARCANO',
  description:
    'Calcula tu carta astral y natal gratis con precisión de efemérides. Rueda zodiacal interactiva, signos, casas, aspectos y sabiduría de los arcanos.',
  keywords: [
    'carta natal gratis',
    'carta astral',
    'rueda zodiacal interactiva',
    'calculadora carta natal',
    'astrología profesional',
    'ascendente y signo solar',
    'signo lunar',
    'aspectos astrologicos',
    'casas astrologicas placidus',
    'astro seek en español',
    'sabiduria de los arcanos',
  ],
  alternates: {
    canonical: `${siteConfig.url}/carta-astral/`,
  },
  openGraph: {
    title: 'Calculadora de Carta Natal y Rueda Astral Gratis | ARCANO',
    description:
      'Descubre la posición exacta de los planetas, tus casas y aspectos con la rueda zodiacal interactiva de Arcano.',
    url: `${siteConfig.url}/carta-astral/`,
  },
};

export default function CartaAstralPage() {
  const astrologySchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Calculadora de Carta Natal y Rueda Astral · ARCANO',
    url: `${siteConfig.url}/carta-astral/`,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Herramienta profesional de cálculo astronómico y astrológico que genera tu rueda natal interactiva, aspectos, casas y lectura arquetípica.',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(astrologySchema) }}
      />
      <CartaAstralContent />
    </>
  );
}
