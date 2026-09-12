"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MinorArcanaCard, suitsInfo } from "@/data/minorArcana";
import { getAssetPath } from "@/lib/utils";

interface Props {
  card: MinorArcanaCard | null;
  onClose: () => void;
}

export const MinorArcanaModal: React.FC<Props> = ({ card, onClose }) => {
  if (!card) return null;

  const suitMeta = suitsInfo[card.suit];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-deep/80 backdrop-blur-md animate-fadeIn"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border border-gold/40 bg-gradient-to-b from-[#161622] via-[#0d0d12] to-[#060608] p-6 sm:p-8 text-parchment shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar ventana"
          className="absolute top-4 right-4 text-parchment-dim hover:text-gold p-2 text-lg focus:outline-none"
        >
          ✕
        </button>

        {/* Encabezado */}
        <div className="text-center pb-4 border-b border-charcoal-border">
          <span className="text-xs uppercase tracking-[0.25em] text-gold/80 font-sans">
            Arcano Menor · Palo de {card.suit} · Elemento {card.suitElement}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl tracking-[0.08em] text-parchment mt-1 font-light">
            {card.name}
          </h3>
          <p className="text-xs text-parchment-dim font-serif italic mt-1">
            &ldquo;{suitMeta.essence}&rdquo;
          </p>
        </div>

        {/* Carta Original y Simbolismo */}
        <div className="my-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative w-32 sm:w-36 aspect-[9/14] rounded overflow-hidden border border-gold/40 shadow-[0_8px_30px_rgba(0,0,0,0.8)] shrink-0 bg-obsidian-deep">
            <Image
              src={getAssetPath(card.imageUrl)}
              alt={card.name}
              fill
              className="object-cover object-center filter brightness-[0.88] contrast-[1.15]"
              sizes="150px"
            />
            <div className="absolute inset-0 border border-gold/20 rounded pointer-events-none" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-gold text-lg">{suitMeta.symbol}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans font-medium">
                Palo y Elemento
              </span>
            </div>
            <p className="text-xs sm:text-sm text-parchment font-medium font-sans">
              {card.suit} ({card.suitElement})
            </p>
            <p className="text-xs text-parchment-muted font-sans font-light mt-2 leading-relaxed">
              {card.description}
            </p>
          </div>
        </div>

        {/* Luz y Sombra */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-t border-charcoal-border">
          <div className="bg-charcoal/50 p-3.5 rounded border border-charcoal-border/50">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans block mb-1 font-medium">
              Manifestación en Luz ✧
            </span>
            <ul className="text-xs text-parchment-muted space-y-1 font-sans">
              {card.keywordsLight.map((kw, i) => (
                <li key={i}>• {kw}</li>
              ))}
            </ul>
          </div>

          <div className="bg-charcoal/50 p-3.5 rounded border border-charcoal-border/50">
            <span className="text-[10px] uppercase tracking-[0.2em] text-silver font-sans block mb-1 font-medium">
              Manifestación en Sombra ☾
            </span>
            <ul className="text-xs text-parchment-muted space-y-1 font-sans">
              {card.keywordsShadow.map((kw, i) => (
                <li key={i}>• {kw}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pregunta de reflexión */}
        <div className="my-4 p-4 rounded bg-gold/5 border border-gold/20 text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans block mb-1 font-medium">
            Pregunta de Indagación:
          </span>
          <p className="text-xs sm:text-sm text-parchment font-serif italic">
            &ldquo;{card.reflectionQuestion}&rdquo;
          </p>
        </div>

        {/* Acciones */}
        <div className="mt-6 pt-4 border-t border-charcoal-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-[0.2em] text-parchment-dim hover:text-parchment font-sans py-2"
          >
            ← Volver a la galería
          </button>

          <Link
            href={`/reservar?carta=${card.id}`}
            className="w-full sm:w-auto px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-obsidian bg-gold hover:bg-gold-light transition-all rounded-sm font-medium font-sans text-center"
          >
            Consultar con Malachai ✦
          </Link>
        </div>
      </div>
    </div>
  );
};
