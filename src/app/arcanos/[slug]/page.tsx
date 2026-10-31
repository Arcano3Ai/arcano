import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { arcanaList, Arcana } from "@/data/arcana";
import { brandConfig } from "@/config/brandConfig";
import { ArcanaAudioPlayer } from "@/components/ArcanaAudioPlayer";
import { ArcanaImageZoom } from "@/components/ArcanaImageZoom";
import { getAssetPath } from "@/lib/utils";
import { siteConfig } from "@/config/siteConfig";
import { ArcanaDetailContent } from "@/components/pages/ArcanaDetailContent";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return arcanaList.map((arcana) => ({
    slug: arcana.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const arcana = arcanaList.find((a) => a.slug === params.slug);
  if (!arcana) return { title: "Arcano no encontrado" };

  const arcanaImageUrl = arcana.imageUrl.startsWith("http")
    ? arcana.imageUrl
    : `${siteConfig.url}${arcana.imageUrl}`;

  return {
    title: `${arcana.name} (${arcana.number}) — Significado, Simbolismo y Guía en el Tarot | ARCANO`,
    description: `Significado de ${arcana.name} (${arcana.number}) en el Tarot: arquetipo, simbolismo sagrado, luz, sombra y guía en el amor y trabajo con ARCANO.`,
    keywords: [
      arcana.name,
      `significado de ${arcana.name.toLowerCase()}`,
      `arcano ${arcana.name.toLowerCase()}`,
      `arcano mayor ${arcana.number}`,
      `${arcana.name.toLowerCase()} tarot amor`,
      `${arcana.name.toLowerCase()} tarot trabajo`,
      "arcanos mayores significado",
    ],
    alternates: {
      canonical: `${siteConfig.url}/arcanos/${arcana.slug}/`,
    },
    openGraph: {
      type: "article",
      title: `${arcana.name} (${arcana.number}) | ${brandConfig.name}`,
      description: arcana.description,
      url: `${siteConfig.url}/arcanos/${arcana.slug}/`,
      images: [
        {
          url: arcanaImageUrl,
          alt: `${arcana.name} — Arcano Mayor del Tarot`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${arcana.name} | ${brandConfig.name}`,
      description: arcana.description,
      images: [arcanaImageUrl],
    },
  };
}

export default function ArcanaDetailPage({ params }: Props) {
  const arcana = arcanaList.find((a) => a.slug === params.slug);

  if (!arcana) {
    notFound();
  }

  // Enlaces previo y siguiente en la secuencia iniciática
  const currentIndex = arcanaList.findIndex((a) => a.slug === arcana.slug);
  const prevArcana =
    currentIndex > 0 ? arcanaList[currentIndex - 1] : arcanaList[arcanaList.length - 1];
  const nextArcana =
    currentIndex < arcanaList.length - 1 ? arcanaList[currentIndex + 1] : arcanaList[0];

  const arcanaImageUrl = arcana.imageUrl.startsWith("http")
    ? arcana.imageUrl
    : `${siteConfig.url}${arcana.imageUrl}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${siteConfig.url}/arcanos/${arcana.slug}/#article`,
        headline: `${arcana.name} (${arcana.number}) en el Tarot: Significado y Simbolismo`,
        description: arcana.description,
        image: arcanaImageUrl,
        author: {
          "@type": "Organization",
          name: brandConfig.name,
          url: siteConfig.url,
        },
        publisher: {
          "@type": "Organization",
          name: brandConfig.name,
          logo: {
            "@type": "ImageObject",
            url: `${siteConfig.url}/icons/icon-512x512.png`,
          },
        },
        mainEntityOfPage: `${siteConfig.url}/arcanos/${arcana.slug}/`,
        about: {
          "@type": "Thing",
          name: arcana.name,
          description: `Arcano Mayor número ${arcana.number} (${arcana.archetype}) asociado al elemento ${arcana.element}.`,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Arcanos",
            item: `${siteConfig.url}/arcanos/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: arcana.name,
            item: `${siteConfig.url}/arcanos/${arcana.slug}/`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ArcanaDetailContent
        arcana={arcana}
        prevArcana={prevArcana}
        nextArcana={nextArcana}
      />
    </>
  );
}
