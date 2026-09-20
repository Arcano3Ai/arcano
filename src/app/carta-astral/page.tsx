import React from 'react';
import type { Metadata } from 'next';
import { SectionHeader } from '@/components/SectionHeader';
import { siteConfig } from '@/config/siteConfig';
import NatalChartApp from '@/components/astrology/NatalChartApp';

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 print:p-0 print:m-0 print:max-w-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(astrologySchema) }}
      />

      <div className="print:hidden">
        <SectionHeader
          as="h1"
          subtitle="Cosmología Sagrada"
          title="Carta Natal y Rueda Astral"
          description="El cielo cósmico al instante de tu primer aliento es un mapa vivo de potencialidades. Explora tus posiciones planetarias, la geometría sagrada de tus aspectos y la tríada fundamental de tu alma."
          symbol="❂"
        />
      </div>

      <NatalChartApp />
    </div>
  );
}
