"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Arcana } from "@/data/arcana";
import { ArcanaAudioPlayer } from "@/components/ArcanaAudioPlayer";
import { ArcanaImageZoom } from "@/components/ArcanaImageZoom";
import { getAssetPath } from "@/lib/utils";

interface ArcanaModalProps {
  arcana: Arcana | null;
  onClose: () => void;
}

export const ArcanaModal: React.FC<ArcanaModalProps> = ({ arcana, onClose }) => {
  if (!arcana) return null;

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

        {/* Encabezado del Arcano */}
        <div className="text-center pb-4 border-b border-charcoal-border">
          <span className="text-xs uppercase tracking-[0.25em] text-gold/80 font-sans">
            Arcano Mayor {arcana.number} · {arcana.element}
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl tracking-[0.1em] text-parchment mt-1 font-light">
            {arcana.name}
          </h3>
          <p className="text-xs text-parchment-dim font-serif italic mt-1">
            &ldquo;{arcana.quote}&rdquo;
          </p>
        </div>

        {/* Carta Original con Zoom Interactivo y Simbolismo */}
        <div className="my-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <ArcanaImageZoom
            imageUrl={arcana.imageUrl}
            name={arcana.name}
            number={arcana.number}
            glyph={arcana.glyph}
            element={arcana.element}
            priority={true}
            className="relative w-32 sm:w-36 min-w-[128px] min-h-[199px] aspect-[9/14] rounded overflow-hidden border border-gold/40 shadow-[0_8px_30px_rgba(0,0,0,0.8)] shrink-0 bg-obsidian-deep"
          />
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <span className="text-gold text-lg">{arcana.glyph}</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans font-medium">
                Arquetipo
              </span>
            </div>
            <p className="text-xs sm:text-sm text-parchment font-medium font-sans">
              {arcana.archetype}
            </p>
            <p className="text-xs text-parchment-muted font-sans font-light mt-2 leading-relaxed">
              {arcana.description}
            </p>
          </div>
        </div>

        {/* Reproductor Ceremonial de la Canción del Arcano */}
        {arcana.audioUrl && (
          <div className="mb-5">
            <ArcanaAudioPlayer
              audioUrl={arcana.audioUrl}
              audioTitle={arcana.audioTitle}
              arcanaName={arcana.name}
              slug={arcana.slug}
              variant="compact"
            />
          </div>
        )}

        {/* Luz y Sombra */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-t border-charcoal-border">
          <div className="bg-charcoal/50 p-3 rounded border border-charcoal-border/50">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans block mb-1">
              Aspectos de Luz ✧
            </span>
            <ul className="text-xs text-parchment-muted space-y-1 font-sans">
              {arcana.keywordsLight.map((kw, i) => (
                <li key={i}>• {kw}</li>
              ))}
            </ul>
          </div>

          <div className="bg-charcoal/50 p-3 rounded border border-charcoal-border/50">
            <span className="text-[10px] uppercase tracking-[0.2em] text-silver font-sans block mb-1">
              Aspectos de Sombra ☾
            </span>
            <ul className="text-xs text-parchment-muted space-y-1 font-sans">
              {arcana.keywordsShadow.map((kw, i) => (
                <li key={i}>• {kw}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pregunta de reflexión */}
        <div className="my-4 p-4 rounded bg-gold/5 border border-gold/20 text-center">
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans block mb-1">
            Pregunta de Reflexión:
          </span>
          <p className="text-xs sm:text-sm text-parchment font-serif italic">
            &ldquo;{arcana.reflectionQuestion}&rdquo;
          </p>
        </div>

        {/* Botones de acción */}
        <div className="mt-6 pt-4 border-t border-charcoal-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            href={`/arcanos/${arcana.slug}`}
            className="text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-light font-sans py-2"
          >
            Ver análisis completo del arcano →
          </Link>

          <Link
            href={`/reservar?arcano=${arcana.slug}`}
            className="w-full sm:w-auto px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-obsidian bg-gold hover:bg-gold-light transition-all rounded-sm font-medium font-sans text-center"
          >
            Reservar lectura vinculada ✦
          </Link>
        </div>
      </div>
    </div>
  );
};
