'use client';

import React from 'react';
import { SynastryReport } from '@/lib/astrology/types';
import { ASPECT_DEFINITIONS } from '@/lib/astrology/constants';

interface SynastryReportViewProps {
  synastry: SynastryReport;
}

export default function SynastryReportView({ synastry }: SynastryReportViewProps) {
  const { chartA, chartB, scores, overview, strengths, challenges, arcanumCounsel, crossAspects } = synastry;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 1. RESUMEN GLOBAL Y SCORES */}
      <div className="bg-[#090D18]/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="text-center mb-6">
          <span className="text-xs font-serif uppercase tracking-[0.25em] text-amber-400 font-semibold">
            ✦ Compatibilidad Alquímica
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 mt-1">
            {chartA.birthData.name} & {chartB.birthData.name}
          </h2>
          <div className="mt-4 inline-flex items-baseline gap-2 bg-amber-500/10 border border-amber-500/30 px-6 py-2 rounded-2xl">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-300">{scores.overall}%</span>
            <span className="text-xs uppercase tracking-wider text-slate-300 font-serif">Afinidad Cósmica Global</span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light text-center max-w-2xl mx-auto">
          {overview}
        </p>

        {/* 4 Dimensiones Relacionales */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-amber-500/20 text-center">
          <div className="p-3 rounded-2xl bg-black/30 border border-rose-500/20">
            <span className="text-xs text-rose-300 block font-serif">Pasión & Química</span>
            <span className="text-2xl font-mono font-bold text-rose-400">{scores.chemistry}%</span>
          </div>
          <div className="p-3 rounded-2xl bg-black/30 border border-sky-500/20">
            <span className="text-xs text-sky-300 block font-serif">Diálogo & Mente</span>
            <span className="text-2xl font-mono font-bold text-sky-400">{scores.communication}%</span>
          </div>
          <div className="p-3 rounded-2xl bg-black/30 border border-amber-500/20">
            <span className="text-xs text-amber-300 block font-serif">Compromiso</span>
            <span className="text-2xl font-mono font-bold text-amber-400">{scores.stability}%</span>
          </div>
          <div className="p-3 rounded-2xl bg-black/30 border border-purple-500/20">
            <span className="text-xs text-purple-300 block font-serif">Lazo del Alma</span>
            <span className="text-2xl font-mono font-bold text-purple-400">{scores.soulConnection}%</span>
          </div>
        </div>
      </div>

      {/* 2. PUNTOS FUERTES Y RETOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fortalezas */}
        <div className="p-6 rounded-3xl bg-[#090D18]/80 border border-emerald-500/20">
          <h3 className="font-serif font-bold text-emerald-300 text-base mb-4 flex items-center gap-2">
            <span>✨</span> Puntos Fuertes del Vínculo
          </h3>
          <ul className="space-y-3 text-xs text-slate-300">
            {strengths.map((str, idx) => (
              <li key={`str-${idx}`} className="flex items-start gap-2">
                <span className="text-emerald-400 text-sm shrink-0">✦</span>
                <span className="leading-relaxed">{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Desafíos */}
        <div className="p-6 rounded-3xl bg-[#090D18]/80 border border-rose-500/20">
          <h3 className="font-serif font-bold text-rose-300 text-base mb-4 flex items-center gap-2">
            <span>⚡</span> Desafíos a Trascender
          </h3>
          <ul className="space-y-3 text-xs text-slate-300">
            {challenges.map((cha, idx) => (
              <li key={`cha-${idx}`} className="flex items-start gap-2">
                <span className="text-rose-400 text-sm shrink-0">✦</span>
                <span className="leading-relaxed">{cha}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. CONSEJO ARCANO */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#0A0E1A] to-indigo-500/10 border border-amber-500/30">
        <h4 className="font-serif font-bold text-amber-200 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
          <span>🔮</span> Sabiduría de los Arcanos para la Pareja
        </h4>
        <p className="text-xs sm:text-sm text-slate-200 font-light leading-relaxed">
          {arcanumCounsel}
        </p>
      </div>

      {/* 4. TABLA DE ASPECTOS CRUZADOS PRINCIPALES */}
      <div className="bg-[#090D18]/80 border border-amber-500/20 rounded-3xl p-6">
        <h4 className="font-serif font-bold text-amber-200 text-base mb-4 flex items-center gap-2">
          <span>☌</span> Conexiones Interplanetarias Directas (Top Aspectos)
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-amber-500/20 text-slate-400 font-serif uppercase text-[10px]">
                <th className="py-2 px-3">{chartA.birthData.name}</th>
                <th className="py-2 px-3">Aspecto</th>
                <th className="py-2 px-3">{chartB.birthData.name}</th>
                <th className="py-2 px-3 text-right">Orbe</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-500/5">
              {crossAspects.slice(0, 8).map((asp, idx) => {
                const def = ASPECT_DEFINITIONS[asp.aspectType];
                return (
                  <tr key={`cross-row-${idx}`} className="hover:bg-white/[0.02]">
                    <td className="py-2.5 px-3 font-serif font-medium text-amber-200">
                      {asp.bodyA}
                    </td>
                    <td className="py-2.5 px-3">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium"
                        style={{
                          backgroundColor: `${def.color}18`,
                          color: def.color,
                          border: `1px solid ${def.color}33`,
                        }}
                      >
                        <span>{def.symbol}</span>
                        <span>{def.name}</span>
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-serif font-medium text-sky-200">
                      {asp.bodyB}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-400">
                      {asp.orb.toFixed(2)}°
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
