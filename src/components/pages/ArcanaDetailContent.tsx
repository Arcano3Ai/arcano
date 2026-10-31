"use client";

import React from "react";
import Link from "next/link";
import { Arcana } from "@/data/arcana";
import { ArcanaAudioPlayer } from "@/components/ArcanaAudioPlayer";
import { ArcanaImageZoom } from "@/components/ArcanaImageZoom";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  arcana: Arcana;
  prevArcana: Arcana;
  nextArcana: Arcana;
}

export const ArcanaDetailContent: React.FC<Props> = ({
  arcana,
  prevArcana,
  nextArcana,
}) => {
  const { t } = useLanguage();

  const elementLabel = t(
    arcana.element,
    arcana.element === "Fuego"
      ? "Fire"
      : arcana.element === "Agua"
      ? "Water"
      : arcana.element === "Aire"
      ? "Air"
      : arcana.element === "Tierra"
      ? "Earth"
      : "Aether"
  );

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Navegación de migas de pan */}
      <nav className="text-xs uppercase tracking-[0.2em] text-parchment-dim font-sans mb-8 flex items-center gap-2">
        <Link href="/arcanos/" className="hover:text-gold transition-colors">
          {t("Los 22 Arcanos", "The 22 Arcana")}
        </Link>
        <span>/</span>
        <span className="text-gold">{arcana.name}</span>
      </nav>

      {/* Hero del Arcano */}
      <header className="text-center pb-12 border-b border-charcoal-border">
        <span className="text-xs uppercase tracking-[0.25em] text-gold/80 font-sans block mb-2">
          {t("Arcano Mayor", "Major Arcana")} {arcana.number} · {t("Elemento", "Element")} {elementLabel}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-parchment tracking-[0.1em] font-light">
          {arcana.name}
        </h1>

        {/* Ilustración de la Carta con Zoom Interactivo */}
        <ArcanaImageZoom
          imageUrl={arcana.imageUrl}
          name={arcana.name}
          number={arcana.number}
          glyph={arcana.glyph}
          element={elementLabel}
          priority
        />

        <p className="font-serif italic text-lg sm:text-2xl text-parchment-muted max-w-xl mx-auto leading-relaxed">
          &ldquo;{arcana.quote}&rdquo;
        </p>
        <span className="text-xs tracking-widest uppercase text-parchment-dim font-sans block mt-3">
          {t("Arquetipo:", "Archetype:")} {arcana.archetype}
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
            {t("Esencia y Significado", "Essence & Meaning")}
          </h2>
          <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed">
            {arcana.description}
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl sm:text-2xl text-parchment mb-3 font-normal flex items-center gap-2">
            <span className="text-gold text-sm">☾</span>
            {t("Simbolismo Iniciático", "Initiatic Symbolism")}
          </h2>
          <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed">
            {arcana.symbolism}
          </p>
        </div>

        {/* Luz y Sombra */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-6 rounded-lg bg-charcoal/50 border border-charcoal-border">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-sans block mb-3 font-medium">
              {t("Manifestación en Luz ✧", "Manifestation in Light ✧")}
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
              {t("Manifestación en Sombra ☾", "Manifestation in Shadow ☾")}
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
              {t("En el Amor", "In Love")}
            </h3>
            <p className="text-xs text-parchment-muted font-sans font-light leading-relaxed">
              {arcana.love}
            </p>
          </div>

          <div className="p-5 rounded-lg bg-charcoal/30 border border-charcoal-border/70">
            <h3 className="font-serif text-base text-parchment font-medium mb-2">
              {t("En el Trabajo", "In Work & Career")}
            </h3>
            <p className="text-xs text-parchment-muted font-sans font-light leading-relaxed">
              {arcana.work}
            </p>
          </div>

          <div className="p-5 rounded-lg bg-charcoal/30 border border-charcoal-border/70">
            <h3 className="font-serif text-base text-parchment font-medium mb-2">
              {t("Crecimiento Personal", "Personal Growth")}
            </h3>
            <p className="text-xs text-parchment-muted font-sans font-light leading-relaxed">
              {arcana.personalGrowth}
            </p>
          </div>
        </div>

        {/* Pregunta de Reflexión */}
        <div className="p-8 rounded-xl bg-gold/5 border border-gold/30 text-center my-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans block mb-2 font-medium">
            {t("Pregunta Seminal para tu Conciencia", "Seminal Question for Your Consciousness")}
          </span>
          <p className="font-serif text-lg sm:text-xl text-parchment italic leading-relaxed">
            &ldquo;{arcana.reflectionQuestion}&rdquo;
          </p>
        </div>

        {/* CTA a lectura vinculada */}
        <div className="p-8 rounded-xl bg-gradient-to-b from-charcoal to-obsidian border border-charcoal-border text-center space-y-4">
          <h3 className="font-serif text-2xl text-parchment font-light">
            {t("¿Sientes la resonancia de", "Do you feel the resonance of")} {arcana.name} {t("en tu vida?", "in your life?")}
          </h3>
          <p className="text-xs sm:text-sm text-parchment-muted font-sans max-w-md mx-auto">
            {t(
              "Explora qué mensaje tiene esta carta en diálogo con las demás fuerzas de tu momento presente.",
              "Explore what message this card holds in conversation with the other forces of your present moment."
            )}
          </p>
          <div className="pt-2">
            <Link
              href={`/reservar?arcano=${arcana.slug}`}
              className="inline-block px-8 py-3 text-xs uppercase tracking-[0.25em] font-sans text-obsidian bg-gold hover:bg-gold-light transition-all rounded-sm font-medium shadow-[0_0_20px_rgba(198,160,82,0.3)]"
            >
              {t("Descubre tu lectura ✦", "Discover your reading ✦")}
            </Link>
          </div>
        </div>
      </div>

      {/* Navegación entre Arcanos */}
      <footer className="pt-10 border-t border-charcoal-border flex items-center justify-between text-xs uppercase tracking-[0.2em] text-parchment-dim font-sans">
        <Link
          href={`/arcanos/${prevArcana.slug}/`}
          className="hover:text-gold transition-colors flex items-center gap-1"
        >
          <span>← {prevArcana.name}</span>
        </Link>
        <Link
          href="/arcanos/"
          className="hover:text-parchment text-[10px] hidden sm:inline"
        >
          {t("Compendio", "Compendium")}
        </Link>
        <Link
          href={`/arcanos/${nextArcana.slug}/`}
          className="hover:text-gold transition-colors flex items-center gap-1"
        >
          <span>{nextArcana.name} →</span>
        </Link>
      </footer>
    </article>
  );
};
