'use client';

import React from 'react';
import { HouseCusp, PlanetaryPosition } from '@/lib/astrology/types';
import { BODY_SYMBOLS, ELEMENT_COLORS, ZODIAC_SIGNS } from '@/lib/astrology/constants';

interface PlanetTableProps {
  positions: PlanetaryPosition[];
  houses: HouseCusp[];
  onSelectPlanet?: (planet: PlanetaryPosition) => void;
  selectedPlanet?: PlanetaryPosition | null;
}

export default function PlanetTable({
  positions,
  houses,
  onSelectPlanet,
  selectedPlanet,
}: PlanetTableProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Planetary Positions Table (2 cols) */}
      <div className="lg:col-span-2 bg-[#090D18]/80 backdrop-blur-md rounded-2xl border border-amber-500/20 p-5 sm:p-6 shadow-2xl">
        <h3 className="font-serif text-lg font-bold text-amber-200 mb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="text-amber-400">☉</span> Posiciones Planetarias
          </span>
          <span className="text-xs font-sans text-slate-400 font-normal">
            Clic en un cuerpo para ver sus aspectos
          </span>
        </h3>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-amber-500/20 text-slate-400 font-serif uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Cuerpo</th>
                <th className="py-2.5 px-3">Signo</th>
                <th className="py-2.5 px-3">Posición</th>
                <th className="py-2.5 px-3">Casa</th>
                <th className="py-2.5 px-3 text-right">Movimiento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-500/5">
              {positions.map(pos => {
                const isSelected = selectedPlanet?.body === pos.body;
                const signInfo = ZODIAC_SIGNS[pos.signIndex];
                const elemColor = ELEMENT_COLORS[signInfo.element];

                return (
                  <tr
                    key={`pos-row-${pos.body}`}
                    onClick={() => onSelectPlanet && onSelectPlanet(pos)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-amber-500/20 text-amber-100 font-medium'
                        : 'hover:bg-white/[0.03] text-slate-200'
                    }`}
                  >
                    <td className="py-2.5 px-3 flex items-center gap-2">
                      <span className="text-base text-amber-300 font-bold">{pos.symbol}</span>
                      <span className="font-serif">{pos.body}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: elemColor.bg,
                          color: elemColor.text,
                          border: `1px solid ${elemColor.border}44`,
                        }}
                      >
                        <span>{signInfo.symbol}</span>
                        <span>{pos.sign}</span>
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-amber-200/90">
                      {pos.degreeInSign}° {pos.minuteInSign}&apos; {pos.secondInSign}&quot;
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">
                      Casa <strong className="text-amber-300">{pos.house}</strong>
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      {pos.isRetrograde ? (
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          ℞ Retrógrado
                        </span>
                      ) : (
                        <span className="text-[11px] text-emerald-400/80">Directo</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* House Cusps Table (1 col) */}
      <div className="bg-[#090D18]/80 backdrop-blur-md rounded-2xl border border-amber-500/20 p-5 sm:p-6 shadow-2xl">
        <h3 className="font-serif text-lg font-bold text-amber-200 mb-4 flex items-center gap-2">
          <span className="text-amber-400">🏛</span> Cúspides de las Casas
        </h3>

        <div className="space-y-1.5">
          {houses.map(house => {
            const isCard =
              house.houseNumber === 1 ||
              house.houseNumber === 4 ||
              house.houseNumber === 7 ||
              house.houseNumber === 10;

            const cardLabel =
              house.houseNumber === 1
                ? ' (Ascendente)'
                : house.houseNumber === 10
                ? ' (Medio Cielo)'
                : house.houseNumber === 7
                ? ' (Descendente)'
                : house.houseNumber === 4
                ? ' (Fondo Cielo)'
                : '';

            const signInfo = ZODIAC_SIGNS.find(s => s.name === house.sign);

            return (
              <div
                key={`house-row-${house.houseNumber}`}
                className={`flex items-center justify-between p-2 rounded-xl text-xs sm:text-sm transition-colors ${
                  isCard
                    ? 'bg-amber-500/10 border border-amber-500/30 font-medium text-amber-100'
                    : 'bg-black/20 text-slate-300'
                }`}
              >
                <span className="font-serif">
                  Casa {house.houseNumber}
                  {cardLabel && <span className="text-amber-400 text-[11px]">{cardLabel}</span>}
                </span>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-amber-300">{signInfo?.symbol} {house.sign}</span>
                  <span className="text-slate-400">
                    {house.degreeInSign}° {house.minuteInSign}&apos;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
