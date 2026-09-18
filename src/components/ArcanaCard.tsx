"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Arcana } from "@/data/arcana";
import { getAssetPath, handleImageError } from "@/lib/utils";

interface ArcanaCardProps {
  arcana: Arcana;
  onQuickView?: (arcana: Arcana) => void;
  priority?: boolean;
}

export const ArcanaCard: React.FC<ArcanaCardProps> = ({ arcana, onQuickView, priority = false }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="group relative rounded-md p-4 sm:p-5 flex flex-col justify-between transition-all duration-500 ease-out bg-gradient-to-b from-[#161620] via-[#0e0e14] to-[#070709] border border-charcoal-border hover:border-gold/50 shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_12px_35px_rgba(198,160,82,0.15)] hover:-translate-y-1.5"
      data-interactive="true"
    >
      {/* Marco ornamental interior de 1px */}
      <div className="absolute inset-2 border border-gold/15 rounded pointer-events-none group-hover:border-gold/35 transition-colors duration-300" />

      {/* Cabecera */}
      <div className="relative z-10">
        <div className="flex justify-between items-center text-xs tracking-widest text-gold/75 mb-2 font-sans">
          <span>{arcana.number}</span>
          <span className="text-sm font-serif">{arcana.glyph}</span>
        </div>

        {/* Ilustración de la carta original con tratamiento Dark Luxury */}
        <div className="my-3 relative w-full aspect-[9/14] rounded overflow-hidden border border-gold/25 bg-obsidian-deep shadow-inner group-hover:border-gold/50 transition-colors">
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-obsidian/60 to-obsidian-deep animate-pulse flex items-center justify-center pointer-events-none">
              <span className="text-2xl text-gold/20 font-serif">{arcana.glyph}</span>
            </div>
          )}
          {hasError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-obsidian-deep border border-gold/20">
              <span className="text-2xl font-serif text-gold/80 mb-1">{arcana.glyph}</span>
              <span className="text-[10px] text-gold/70 font-sans uppercase tracking-widest">{arcana.number}</span>
              <span className="text-xs text-parchment font-serif mt-1">{arcana.name}</span>
            </div>
          ) : (
            <Image
              src={getAssetPath(arcana.imageUrl)}
              alt={arcana.name}
              fill
              priority={priority}
              loading={priority ? "eager" : "lazy"}
              onLoad={() => {
                setIsLoaded(true);
                setHasError(false);
              }}
              onError={(e) => {
                handleImageError(e);
                setHasError(true);
              }}
              className={`object-cover object-center filter brightness-[0.80] contrast-[1.15] group-hover:brightness-[0.98] group-hover:scale-105 transition-all duration-700 ease-out ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 33vw, 280px"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep/85 via-transparent to-obsidian/30 pointer-events-none" />
          {arcana.audioUrl && (
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-obsidian-deep/90 border border-gold/40 px-2 py-0.5 rounded shadow-md pointer-events-none">
              <span className="text-gold text-[10px]">🎜</span>
              <span className="text-[8px] font-sans uppercase tracking-[0.15em] text-gold/90 font-medium">
                Música Sacra
              </span>
            </div>
          )}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold/90 font-sans bg-obsidian/85 px-2 py-0.5 rounded border border-charcoal-border">
              {arcana.element}
            </span>
            <span className="text-xs text-gold/90 font-serif">
              {arcana.glyph}
            </span>
          </div>
        </div>

        <h3 className="font-serif text-lg text-parchment tracking-[0.06em] text-center font-normal group-hover:text-gold transition-colors">
          {arcana.name}
        </h3>

        <p className="text-[11px] text-parchment-dim text-center font-serif italic mt-1 line-clamp-2">
          &ldquo;{arcana.quote}&rdquo;
        </p>

        {/* Palabras clave sutiles */}
        <div className="mt-3 flex flex-wrap justify-center gap-1">
          {arcana.keywordsLight.slice(0, 2).map((kw, i) => (
            <span
              key={i}
              className="text-[9px] uppercase tracking-wider text-parchment-muted/80 bg-charcoal-border/40 px-1.5 py-0.5 rounded"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Acciones */}
      <div className="relative z-10 mt-5 pt-3 border-t border-charcoal-border/70 flex items-center justify-between gap-2">
        {onQuickView && (
          <button
            type="button"
            onClick={() => onQuickView(arcana)}
            className="text-[10px] uppercase tracking-[0.18em] text-parchment-dim hover:text-gold transition-colors font-sans py-1"
          >
            Vista rápida ✧
          </button>
        )}

        <Link
          href={`/arcanos/${arcana.slug}`}
          className="text-[10px] uppercase tracking-[0.18em] text-gold hover:text-gold-light transition-colors font-sans ml-auto py-1"
        >
          Explorar arcano →
        </Link>
      </div>
    </div>
  );
};
