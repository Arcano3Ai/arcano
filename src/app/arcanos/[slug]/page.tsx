import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { arcanaList, Arcana } from "@/data/arcana";
import { brandConfig } from "@/config/brandConfig";
import { ArcanaAudioPlayer } from "@/components/ArcanaAudioPlayer";
import { getAssetPath } from "@/lib/utils";

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

  return {
    title: `${arcana.name} (${arcana.number}) — Significado, Simbolismo y Guía`,
    description: `${arcana.name} en el Tarot: ${arcana.quote} Descubre su simbolismo arquetípico, aspectos de luz y sombra, amor, trabajo y crecimiento personal.`,
    openGraph: {
      title: `${arcana.name} | ${brandConfig.name}`,
      description: arcana.description,
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

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Navegación de migas de pan */}
      <nav className="text-xs uppercase tracking-[0.2em] text-parchment-dim font-sans mb-8 flex items-center gap-2">
        <Link href="/arcanos" className="hover:text-gold transition-colors">
          Los 22 Arcanos
        </Link>
        <span>/</span>
        <span className="text-gold">{arcana.name}</span>
      </nav>

      {/* Hero del Arcano */}
      <header className="text-center pb-12 border-b border-charcoal-border">
        <span className="text-xs uppercase tracking-[0.25em] text-gold/80 font-sans block mb-2">
          Arcano Mayor {arcana.number} · Elemento {arcana.element}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-parchment tracking-[0.1em] font-light">
          {arcana.name}
        </h1>

        {/* Ilustración de la Carta Original */}
        <div className="relative w-48 sm:w-56 aspect-[9/14] rounded-lg overflow-hidden border-2 border-gold/40 mx-auto my-8 shadow-[0_15px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(198,160,82,0.2)] bg-obsidian-deep">
          <Image
            src={getAssetPath(arcana.imageUrl)}
            alt={arcana.name}
            fill
            className="object-cover object-center filter brightness-[0.88] contrast-[1.18]"
            priority
            sizes="250px"
          />
          <div className="absolute inset-0 border border-gold/20 rounded-md pointer-events-none" />
          <div className="absolute top-2 right-2 bg-obsidian/85 px-2 py-0.5 rounded border border-charcoal-border">
            <span className="text-xs text-gold font-serif">{arcana.glyph}</span>
          </div>
        </div>

        <p className="font-serif italic text-lg sm:text-2xl text-parchment-muted max-w-xl mx-auto leading-relaxed">
          &ldquo;{arcana.quote}&rdquo;
        </p>
        <span className="text-xs tracking-widest uppercase text-parchment-dim font-sans block mt-3">
          Arquetipo: {arcana.archetype}
        </span>
      </header>

      {/* Reproductor Ceremonial si el arcano tiene su propia sinfonía */}
      {arcana.audioUrl && (
        <ArcanaAudioPlayer
          audioUrl={arcana.audioUrl}
          audioTitle={arcana.audioTitle}
          arcanaName={arcana.name}
          slug={arcana.slug}
          variant="detailed"
        />
      )}

      {/* Descripción y Simbolismo */}
      <div className="py-12 space-y-10">
        <div>
          <h2 className="font-serif text-xl sm:text-2xl text-parchment mb-3 font-normal flex items-center gap-2">
            <span className="text-gold text-sm">✦</span>
            Esencia y Significado
          </h2>
          <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed">
            {arcana.description}
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl sm:text-2xl text-parchment mb-3 font-normal flex items-center gap-2">
            <span className="text-gold text-sm">☾</span>
            Simbolismo Iniciático
          </h2>
          <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed">
            {arcana.symbolism}
          </p>
        </div>

        {/* Luz y Sombra */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 rounded-lg bg-charcoal/50 border border-charcoal-border">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-sans block mb-3 font-medium">
              Manifestación en Luz ✧
            </span>
            <ul className="space-y-2 text-xs text-parchment-muted font-sans">
              {arcana.keywordsLight.map((kw, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-gold text-xs">•</span>
                  <span>{kw}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-lg bg-charcoal/50 border border-charcoal-border">
            <span className="text-xs uppercase tracking-[0.2em] text-silver font-sans block mb-3 font-medium">
              Manifestación en Sombra ☾
            </span>
            <ul className="space-y-2 text-xs text-parchment-muted font-sans">
              {arcana.keywordsShadow.map((kw, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-silver text-xs">•</span>
                  <span>{kw}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Aplicaciones Prácticas: Amor, Trabajo, Crecimiento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-charcoal-border">
          <div className="p-5 rounded-lg bg-charcoal/30 border border-charcoal-border/70">
            <h3 className="font-serif text-base text-parchment font-medium mb-2">
              En el Amor
            </h3>
            <p className="text-xs text-parchment-muted font-sans font-light leading-relaxed">
              {arcana.love}
            </p>
          </div>

          <div className="p-5 rounded-lg bg-charcoal/30 border border-charcoal-border/70">
            <h3 className="font-serif text-base text-parchment font-medium mb-2">
              En el Trabajo
            </h3>
            <p className="text-xs text-parchment-muted font-sans font-light leading-relaxed">
              {arcana.work}
            </p>
          </div>

          <div className="p-5 rounded-lg bg-charcoal/30 border border-charcoal-border/70">
            <h3 className="font-serif text-base text-parchment font-medium mb-2">
              Crecimiento Personal
            </h3>
            <p className="text-xs text-parchment-muted font-sans font-light leading-relaxed">
              {arcana.personalGrowth}
            </p>
          </div>
        </div>

        {/* Pregunta de Reflexión */}
        <div className="p-8 rounded-xl bg-gold/5 border border-gold/30 text-center my-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans block mb-2 font-medium">
            Pregunta Seminal para tu Conciencia
          </span>
          <p className="font-serif text-lg sm:text-xl text-parchment italic leading-relaxed">
            &ldquo;{arcana.reflectionQuestion}&rdquo;
          </p>
        </div>

        {/* CTA a lectura vinculada */}
        <div className="p-8 rounded-xl bg-gradient-to-b from-charcoal to-obsidian border border-charcoal-border text-center space-y-4">
          <h3 className="font-serif text-2xl text-parchment font-light">
            ¿Sientes la resonancia de {arcana.name} en tu vida?
          </h3>
          <p className="text-xs sm:text-sm text-parchment-muted font-sans max-w-md mx-auto">
            Explora qué mensaje tiene esta carta en diálogo con las demás fuerzas de tu momento presente.
          </p>
          <div className="pt-2">
            <Link
              href={`/reservar?arcano=${arcana.slug}`}
              className="inline-block px-8 py-3 text-xs uppercase tracking-[0.25em] font-sans text-obsidian bg-gold hover:bg-gold-light transition-all rounded-sm font-medium shadow-[0_0_20px_rgba(198,160,82,0.3)]"
            >
              Descubre tu lectura ✦
            </Link>
          </div>
        </div>
      </div>

      {/* Navegación entre Arcanos */}
      <footer className="pt-10 border-t border-charcoal-border flex items-center justify-between text-xs uppercase tracking-[0.2em] text-parchment-dim font-sans">
        <Link
          href={`/arcanos/${prevArcana.slug}`}
          className="hover:text-gold transition-colors flex items-center gap-1"
        >
          <span>← {prevArcana.name}</span>
        </Link>
        <Link
          href="/arcanos"
          className="hover:text-parchment text-[10px] hidden sm:inline"
        >
          Compendio
        </Link>
        <Link
          href={`/arcanos/${nextArcana.slug}`}
          className="hover:text-gold transition-colors flex items-center gap-1"
        >
          <span>{nextArcana.name} →</span>
        </Link>
      </footer>
    </article>
  );
}
