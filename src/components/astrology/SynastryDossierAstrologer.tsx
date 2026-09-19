'use client';

import React from 'react';
import { SynastryReport } from '@/lib/astrology/types';
import { ASPECT_DEFINITIONS, BODY_SYMBOLS, ZODIAC_SIGNS } from '@/lib/astrology/constants';
import SynastryWheel from './SynastryWheel';

interface SynastryDossierAstrologerProps {
  synastry: SynastryReport;
}

export default function SynastryDossierAstrologer({ synastry }: SynastryDossierAstrologerProps) {
  const {
    chartA,
    chartB,
    scores,
    crossAspects,
    relationalArcanum,
    categorizedAspects,
  } = synastry;

  return (
    <div className="space-y-6 text-slate-100 font-sans text-xs">
      {/* =========================================================================
          PÁGINA 1: PORTADA TÉCNICA & PARÁMETROS ASTRONÓMICOS (A4 EXACTA)
          ========================================================================= */}
      <div className="print-cover-page border border-amber-500/40 rounded-3xl p-6 bg-[#0B0F1C] text-center">
        {/* Cabecera Técnica */}
        <div className="space-y-1">
          <span className="text-amber-400 text-[10px] uppercase tracking-[0.35em] font-serif block">
            ✦ ARCANO · DOSSIER TÉCNICO DE SINASTRÍA & INTERACCIÓN PLANETARIA ✦
          </span>
          <h1 className="text-2xl font-serif font-bold text-amber-100">
            {chartA.birthData.name} & {chartB.birthData.name}
          </h1>

          {/* Ficha Astronómica de Coordenadas */}
          <div className="grid grid-cols-2 gap-2 max-w-xl mx-auto text-[10px] text-slate-300 pt-1 font-mono">
            <div className="bg-black/40 p-2 rounded-xl border border-amber-500/20 text-left">
              <span className="text-amber-300 font-bold block font-serif">Nativo A: {chartA.birthData.name}</span>
              <span>{chartA.birthData.day}/{chartA.birthData.month}/{chartA.birthData.year} · {chartA.birthData.hour.toString().padStart(2, '0')}:{chartA.birthData.minute.toString().padStart(2, '0')}</span>
              <span className="block text-slate-400">{chartA.birthData.cityName} ({chartA.birthData.latitude.toFixed(2)}°, {chartA.birthData.longitude.toFixed(2)}°) · UTC{chartA.birthData.timezoneOffsetHours >= 0 ? `+${chartA.birthData.timezoneOffsetHours}` : chartA.birthData.timezoneOffsetHours}</span>
              <span className="text-amber-400 font-semibold">ASC: {chartA.angles.ascSign} {chartA.angles.ascDegreeInSign}°{chartA.angles.ascMinuteInSign.toString().padStart(2, '0')}&apos; · MC: {chartA.angles.mcSign} {chartA.angles.mcDegreeInSign}°</span>
            </div>
            <div className="bg-black/40 p-2 rounded-xl border border-sky-500/20 text-left">
              <span className="text-sky-300 font-bold block font-serif">Nativo B: {chartB.birthData.name}</span>
              <span>{chartB.birthData.day}/{chartB.birthData.month}/{chartB.birthData.year} · {chartB.birthData.hour.toString().padStart(2, '0')}:{chartB.birthData.minute.toString().padStart(2, '0')}</span>
              <span className="block text-slate-400">{chartB.birthData.cityName} ({chartB.birthData.latitude.toFixed(2)}°, {chartB.birthData.longitude.toFixed(2)}°) · UTC{chartB.birthData.timezoneOffsetHours >= 0 ? `+${chartB.birthData.timezoneOffsetHours}` : chartB.birthData.timezoneOffsetHours}</span>
              <span className="text-sky-400 font-semibold">ASC: {chartB.angles.ascSign} {chartB.angles.ascDegreeInSign}°{chartB.angles.ascMinuteInSign.toString().padStart(2, '0')}&apos; · MC: {chartB.angles.mcSign} {chartB.angles.mcDegreeInSign}°</span>
            </div>
          </div>
        </div>

        {/* Rueda Bi-Wheel */}
        <div className="py-2 flex justify-center items-center">
          <SynastryWheel synastry={synastry} />
        </div>

        {/* Balance Elemental & Modal Comparado */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-amber-500/20 text-[10px] font-mono">
          <div className="bg-black/30 p-2 rounded-xl border border-amber-500/15 text-left">
            <span className="text-amber-300 font-serif font-bold block mb-1">Balance Elemental:</span>
            <div className="flex justify-between text-slate-300">
              <span>Fuego: {chartA.elementBalance.fuego} / {chartB.elementBalance.fuego}</span>
              <span>Tierra: {chartA.elementBalance.tierra} / {chartB.elementBalance.tierra}</span>
              <span>Aire: {chartA.elementBalance.aire} / {chartB.elementBalance.aire}</span>
              <span>Agua: {chartA.elementBalance.agua} / {chartB.elementBalance.agua}</span>
            </div>
          </div>
          <div className="bg-black/30 p-2 rounded-xl border border-amber-500/15 text-left">
            <span className="text-amber-300 font-serif font-bold block mb-1">Balance Modalidad:</span>
            <div className="flex justify-between text-slate-300">
              <span>Card: {chartA.modalityBalance.cardinal} / {chartB.modalityBalance.cardinal}</span>
              <span>Fijo: {chartA.modalityBalance.fijo} / {chartB.modalityBalance.fijo}</span>
              <span>Mut: {chartA.modalityBalance.mutable} / {chartB.modalityBalance.mutable}</span>
            </div>
          </div>
        </div>

        {/* 4 Scores y Arcano */}
        <div className="grid grid-cols-4 gap-2 pt-2 border-t border-amber-500/15 text-center font-mono text-[9px]">
          <div className="p-1.5 bg-black/40 rounded-lg border border-rose-500/20">
            <span className="text-rose-300 block font-serif">Química: {scores.chemistry}%</span>
          </div>
          <div className="p-1.5 bg-black/40 rounded-lg border border-sky-500/20">
            <span className="text-sky-300 block font-serif">Comunicación: {scores.communication}%</span>
          </div>
          <div className="p-1.5 bg-black/40 rounded-lg border border-amber-500/20">
            <span className="text-amber-300 block font-serif">Estabilidad: {scores.stability}%</span>
          </div>
          <div className="p-1.5 bg-black/40 rounded-lg border border-purple-500/20">
            <span className="text-purple-300 block font-serif">Arcano: {relationalArcanum.cardNumber} ({relationalArcanum.name})</span>
          </div>
        </div>

        {/* Footer Portada */}
        <div className="text-center pt-2 border-t border-amber-500/10 text-[9px] text-slate-400 font-serif">
          ARCANO · Reporte Técnico de Sinastría Astrológica · www.arcanosolutions.com
        </div>
      </div>

      {/* =========================================================================
          PÁGINA 2: EFEMÉRIDES PLANETARIAS COMPARADAS Y CÚSPIDES (A vs B)
          ========================================================================= */}
      <div className="print-page-break space-y-4 pt-4">
        <div className="border border-amber-500/30 rounded-2xl p-4 bg-[#0B0F1C] flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-amber-400 font-serif block">
              ✦ TABLA DE EFEMÉRIDES COMPARADAS (NATIVO A vs NATIVO B) ✦
            </span>
            <h3 className="text-base font-serif font-bold text-amber-100">
              Posiciones Geocéntricas Tropicales al Minuto de Arco
            </h3>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Placidus · Zodíaco Tropical
          </span>
        </div>

        {/* Tabla Comparada de Posiciones */}
        <div className="border border-amber-500/20 rounded-2xl bg-[#090D18]/90 overflow-hidden">
          <table className="w-full text-left text-[10px] font-mono border-collapse">
            <thead>
              <tr className="border-b border-amber-500/20 text-slate-400 font-serif uppercase text-[9px] bg-black/50">
                <th className="py-2 px-3">Cuerpo</th>
                <th className="py-2 px-3 text-amber-300">{chartA.birthData.name} (Signo)</th>
                <th className="py-2 px-3 text-amber-300">Posición A</th>
                <th className="py-2 px-3 text-amber-300">Casa A</th>
                <th className="py-2 px-3 text-sky-300">{chartB.birthData.name} (Signo)</th>
                <th className="py-2 px-3 text-sky-300">Posición B</th>
                <th className="py-2 px-3 text-sky-300">Casa B</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-500/10">
              {chartA.positions.map((posA, idx) => {
                const posB = chartB.positions[idx];
                return (
                  <tr key={`comp-${idx}`} className="hover:bg-white/[0.02]">
                    <td className="py-2 px-3 font-serif font-semibold text-amber-200 whitespace-nowrap">
                      {BODY_SYMBOLS[posA.body]} {posA.body}
                    </td>
                    <td className="py-2 px-3 text-slate-300">
                      {posA.sign} {posA.isRetrograde ? '℞' : ''}
                    </td>
                    <td className="py-2 px-3 text-amber-300 font-bold">
                      {posA.degreeInSign}° {posA.minuteInSign.toString().padStart(2, '0')}&apos;
                    </td>
                    <td className="py-2 px-3 text-slate-400">
                      Casa {posA.house}
                    </td>
                    <td className="py-2 px-3 text-slate-300">
                      {posB ? `${posB.sign} ${posB.isRetrograde ? '℞' : ''}` : '-'}
                    </td>
                    <td className="py-2 px-3 text-sky-300 font-bold">
                      {posB ? `${posB.degreeInSign}° ${posB.minuteInSign.toString().padStart(2, '0')}'` : '-'}
                    </td>
                    <td className="py-2 px-3 text-slate-400">
                      {posB ? `Casa ${posB.house}` : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Cúspides de Casas Comparadas */}
        <div className="border border-amber-500/20 rounded-2xl bg-[#090D18]/90 p-4">
          <span className="text-[10px] uppercase font-serif tracking-wider text-amber-300 font-bold block mb-2">
            Cúspides de las 12 Casas Astrológicas:
          </span>
          <div className="grid grid-cols-2 gap-4 text-[9.5px] font-mono">
            <div>
              <span className="text-amber-400 font-serif font-semibold block mb-1">{chartA.birthData.name}:</span>
              <div className="grid grid-cols-2 gap-1 text-slate-300">
                {chartA.houses.map(h => (
                  <span key={`hA-${h.houseNumber}`}>
                    Casa {h.houseNumber}: {h.sign} {h.degreeInSign}°{h.minuteInSign}&apos;
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sky-400 font-serif font-semibold block mb-1">{chartB.birthData.name}:</span>
              <div className="grid grid-cols-2 gap-1 text-slate-300">
                {chartB.houses.map(h => (
                  <span key={`hB-${h.houseNumber}`}>
                    Casa {h.houseNumber}: {h.sign} {h.degreeInSign}°{h.minuteInSign}&apos;
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Página 2 */}
        <div className="text-center pt-2 border-t border-amber-500/10 text-[9px] text-slate-400 font-serif">
          ARCANO · Efemérides & Cartografía Técnica · www.arcanosolutions.com
        </div>
      </div>

      {/* =========================================================================
          PÁGINA 3: MATRIZ COMPLETA DE ASPECTOS CRUZADOS (CROSS-ASPECTS MATRIX)
          ========================================================================= */}
      <div className="print-page-break space-y-4 pt-4">
        <div className="border border-amber-500/30 rounded-2xl p-4 bg-[#0B0F1C] flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-amber-400 font-serif block">
              ✦ GEOMETRÍA RELACIONAL & ASPECTOS INTERPLANETARIOS ✦
            </span>
            <h3 className="text-base font-serif font-bold text-amber-100">
              Matriz de Aspectos Cruzados con Orbe Exacto
            </h3>
          </div>
          <span className="text-[10px] text-amber-300 font-mono">
            {crossAspects.length} aspectos ({categorizedAspects.harmonics.length} armónicos · {categorizedAspects.tensions.length} tensos · {categorizedAspects.conjunctions.length} conjunciones)
          </span>
        </div>

        {/* Tabla de Aspectos Cruzados */}
        <div className="border border-amber-500/20 rounded-2xl bg-[#090D18]/90 overflow-hidden">
          <table className="w-full text-left text-[9.5px] border-collapse">
            <thead>
              <tr className="border-b border-amber-500/20 text-slate-400 font-serif uppercase text-[8.5px] bg-black/50">
                <th className="py-2 px-2.5 text-amber-300">{chartA.birthData.name}</th>
                <th className="py-2 px-2.5">Aspecto</th>
                <th className="py-2 px-2.5 text-sky-300">{chartB.birthData.name}</th>
                <th className="py-2 px-2.5 font-mono">Orbe</th>
                <th className="py-2 px-2.5">Dinámica Astrológica</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-500/10">
              {crossAspects.map((asp, idx) => {
                const def = ASPECT_DEFINITIONS[asp.aspectType];
                return (
                  <tr key={`cross-${idx}`} className="hover:bg-white/[0.02]">
                    <td className="py-2 px-2.5 font-serif font-semibold text-amber-200 whitespace-nowrap">
                      {BODY_SYMBOLS[asp.bodyA]} {asp.bodyA}
                    </td>
                    <td className="py-2 px-2.5 whitespace-nowrap">
                      <span
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium"
                        style={{
                          backgroundColor: `${def.color}20`,
                          color: def.color,
                          border: `1px solid ${def.color}40`,
                        }}
                      >
                        <span>{def.symbol}</span>
                        <span>{def.name}</span>
                      </span>
                    </td>
                    <td className="py-2 px-2.5 font-serif font-semibold text-sky-200 whitespace-nowrap">
                      {BODY_SYMBOLS[asp.bodyB]} {asp.bodyB}
                    </td>
                    <td className="py-2 px-2.5 font-mono text-slate-300 whitespace-nowrap font-bold">
                      {asp.orb.toFixed(2)}°
                    </td>
                    <td className="py-2 px-2.5 text-slate-300 font-light text-[9.5px] leading-tight">
                      {asp.interpretation}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Página 3 */}
        <div className="text-center pt-3 border-t border-amber-500/20 text-[9px] text-slate-400 font-serif">
          ARCANO · Dossier Técnico de Sinastría Astrológica · Elaborado por El Señor de los Arcanos
        </div>
      </div>
    </div>
  );
}
