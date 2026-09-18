"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MinorArcanaCard, suitsInfo } from "@/data/minorArcana";
import { getAssetPath, handleImageError } from "@/lib/utils";

interface MinorArcanaCardViewProps {
  card: MinorArcanaCard;
  onSelect?: (card: MinorArcanaCard) => void;
  priority?: boolean;
}

export const MinorArcanaCardView: React.FC<MinorArcanaCardViewProps> = ({
  card,
  onSelect,
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const suitMeta = suitsInfo[card.suit];

  return (
    <div
      onClick={() => onSelect && onSelect(card)}
      className="group relative rounded-md p-4 flex flex-col justify-between transition-all duration-500 ease-out bg-gradient-to-b from-[#14141d] via-[#0c0c12] to-[#060608] border border-charcoal-border hover:border-gold/50 shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_12px_35px_rgba(198,160,82,0.15)] hover:-translate-y-1.5 cursor-pointer select-none"
      data-interactive="true"
    >
      {/* Marco interior */}
      <div className="absolute inset-2 border border-gold/15 rounded pointer-events-none group-hover:border-gold/35 transition-colors duration-300" />

      {/* Cabecera */}
      <div className="relative z-10">
        <div className="flex justify-between items-center text-xs tracking-widest text-gold/75 mb-2 font-sans">
          <span>{card.rank}</span>
          <span className="text-sm font-serif">{suitMeta.symbol}</span>
        </div>

        {/* Ilustración de la carta clásica original */}
        <div className="my-2.5 relative w-full aspect-[9/14] rounded overflow-hidden border border-gold/25 bg-obsidian-deep shadow-inner group-hover:border-gold/50 transition-colors">
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/30 via-obsidian/60 to-obsidian-deep animate-pulse flex items-center justify-center pointer-events-none">
              <span className="text-2xl text-gold/20 font-serif">{suitMeta.symbol}</span>
            </div>
          )}
          {hasError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-obsidian-deep border border-gold/20">
              <span className="text-2xl font-serif text-gold/80 mb-1">{suitMeta.symbol}</span>
              <span className="text-[10px] text-gold/70 font-sans uppercase tracking-widest">{card.rank}</span>
              <span className="text-xs text-parchment font-serif mt-1">{card.name}</span>
            </div>
          ) : (
            <Image
              src={getAssetPath(card.imageUrl)}
              alt={card.name}
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
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold/90 font-sans bg-obsidian/85 px-2 py-0.5 rounded border border-charcoal-border">
              {card.suitElement}
            </span>
            <span className="text-[11px] text-parchment-dim font-serif">
              {card.suit}
            </span>
          </div>
        </div>

        <h3 className="font-serif text-base text-parchment tracking-[0.06em] text-center font-normal group-hover:text-gold transition-colors mt-2">
          {card.name}
        </h3>

        <p className="text-[11px] text-parchment-dim text-center font-sans font-light mt-1 line-clamp-2 leading-relaxed">
          {card.description}
        </p>

        {/* Palabras clave sutiles */}
        <div className="mt-3 flex flex-wrap justify-center gap-1">
          {card.keywordsLight.slice(0, 2).map((kw, i) => (
            <span
              key={i}
              className="text-[9px] uppercase tracking-wider text-parchment-muted/80 bg-charcoal-border/40 px-1.5 py-0.5 rounded"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Acción */}
      <div className="relative z-10 mt-4 pt-2.5 border-t border-charcoal-border/70 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-[0.18em] text-gold/80 group-hover:text-gold font-sans">
          Revelar significado ✧
        </span>
        <span className="text-gold text-xs">→</span>
      </div>
    </div>
  );
};
