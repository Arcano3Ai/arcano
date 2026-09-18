'use client';

import React from 'react';
import { Aspect, CelestialBodyName, PlanetaryPosition } from '@/lib/astrology/types';
import { ASPECT_DEFINITIONS, BODY_SYMBOLS } from '@/lib/astrology/constants';

interface AspectGridProps {
  positions: PlanetaryPosition[];
  aspects: Aspect[];
  onSelectAspect?: (aspect: Aspect | null) => void;
}

export default function AspectGrid({ positions, aspects, onSelectAspect }: AspectGridProps) {
  // Only use the major 10 celestial bodies + Chiron + Lilith + North Node for grid
  const bodies: CelestialBodyName[] = [
    'Sol',
    'Luna',
    'Mercurio',
    'Venus',
    'Marte',
    'Júpiter',
    'Saturno',
    'Urano',
    'Neptuno',
    'Plutón',
    'Quirón',
    'Lilith',
    'Nodo Norte',
  ];

  const findAspect = (b1: CelestialBodyName, b2: CelestialBodyName): Aspect | undefined => {
    return aspects.find(
      a => (a.body1 === b1 && a.body2 === b2) || (a.body1 === b2 && a.body2 === b1)
    );
  };

  return (
    <div className="overflow-x-auto pb-4 custom-scrollbar">
      <div className="inline-block min-w-full bg-[#090D18]/80 backdrop-blur-md rounded-2xl border border-amber-500/20 p-6 shadow-2xl">
        <h3 className="font-serif text-lg font-bold text-amber-200 mb-4 flex items-center gap-2">
          <span className="text-amber-400">✦</span> Matriz Geometría de Aspectos
        </h3>

        <div className="flex flex-col">
          {/* Header Row */}
          <div className="flex">
            <div className="w-10 h-10 flex items-center justify-center font-serif text-xs text-amber-500 font-bold border-b border-r border-amber-500/20" />
            {bodies.map((body, colIdx) => (
              <div
                key={`header-${body}`}
                className="w-10 h-10 flex flex-col items-center justify-center border-b border-r border-amber-500/10 text-amber-300 font-bold text-sm bg-amber-500/5 hover:bg-amber-500/15 transition-colors"
                title={body}
              >
                <span>{BODY_SYMBOLS[body]}</span>
              </div>
            ))}
          </div>

          {/* Grid Rows (Triangular) */}
          {bodies.map((rowBody, rowIdx) => (
            <div key={`row-${rowBody}`} className="flex">
              {/* Row Label */}
              <div
                className="w-10 h-10 flex items-center justify-center font-bold text-amber-300 text-sm border-b border-r border-amber-500/10 bg-amber-500/5"
                title={rowBody}
              >
                {BODY_SYMBOLS[rowBody]}
              </div>

              {/* Cells */}
              {bodies.map((colBody, colIdx) => {
                if (colIdx > rowIdx) {
                  // Upper triangle empty
                  return (
                    <div
                      key={`empty-${rowBody}-${colBody}`}
                      className="w-10 h-10 bg-black/20 border-b border-r border-amber-500/5"
                    />
                  );
                }

                if (colIdx === rowIdx) {
                  // Diagonal (Self)
                  return (
                    <div
                      key={`self-${rowBody}`}
                      className="w-10 h-10 flex items-center justify-center bg-amber-500/10 border-b border-r border-amber-500/20 text-amber-500/40 text-[11px] font-mono"
                    >
                      —
                    </div>
                  );
                }

                // Lower triangle aspect cell
                const aspect = findAspect(rowBody, colBody);
                if (!aspect) {
                  return (
                    <div
                      key={`none-${rowBody}-${colBody}`}
                      className="w-10 h-10 border-b border-r border-amber-500/5 bg-transparent hover:bg-white/[0.02]"
                    />
                  );
                }

                const def = ASPECT_DEFINITIONS[aspect.aspectType];

                return (
                  <button
                    type="button"
                    key={`aspect-cell-${rowBody}-${colBody}`}
                    onClick={() => onSelectAspect && onSelectAspect(aspect)}
                    title={`${rowBody} ${def.name} ${colBody} (Orbe: ${aspect.orb}°)`}
                    className="w-10 h-10 flex flex-col items-center justify-center border-b border-r border-amber-500/20 transition-all hover:scale-110 hover:z-10 relative group"
                    style={{
                      backgroundColor: `${def.color}15`,
                    }}
                  >
                    <span
                      className="text-base font-bold leading-none"
                      style={{ color: def.color, filter: `drop-shadow(0 0 4px ${def.color}66)` }}
                    >
                      {def.symbol}
                    </span>
                    <span className="text-[9px] font-mono font-medium text-slate-300 leading-tight mt-0.5">
                      {aspect.orb.toFixed(1)}°
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-300 border-t border-amber-500/20 pt-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
            <span>Conjunción (0°)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
            <span>Sextil (60°)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]" />
            <span>Cuadratura (90°)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
            <span>Trígono (120°)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EC4899]" />
            <span>Oposición (180°)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7]" />
            <span>Quincuncio (150°)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
