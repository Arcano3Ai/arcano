'use client';

import React, { useState } from 'react';
import { SynastryReport, SynastryAspect } from '@/lib/astrology/types';
import { ASPECT_DEFINITIONS } from '@/lib/astrology/constants';

interface SynastryReportViewProps {
  synastry: SynastryReport;
}

export default function SynastryReportView({ synastry }: SynastryReportViewProps) {
  const {
    chartA,
    chartB,
    scores,
    overview,
    strengths,
    challenges,
    arcanumCounsel,
    sunDynamic,
    moonDynamic,
    eroticChemistry,
    karmicDestiny,
    categorizedAspects,
    relationalArcanum,
  } = synastry;

  const [aspectFilter, setAspectFilter] = useState<'all' | 'harmonic' | 'tense' | 'conjunction'>('all');

  const displayedAspects =
    aspectFilter === 'harmonic'
      ? categorizedAspects.harmonics
      : aspectFilter === 'tense'
      ? categorizedAspects.tensions
      : aspectFilter === 'conjunction'
      ? categorizedAspects.conjunctions
      : synastry.crossAspects.slice(0, 15);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 1. RESUMEN GLOBAL Y SCORES */}
      <div className="bg-[#090D18]/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="text-center mb-6">
          <span className="text-xs font-serif uppercase tracking-[0.25em] text-amber-400 font-semibold">
            ✦ Compatibilidad Alquímica & Sinastría de Almas
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 mt-1">
            {chartA.birthData.name} & {chartB.birthData.name}
          </h2>
          <div className="mt-4 inline-flex items-baseline gap-2 bg-amber-500/10 border border-amber-500/30 px-6 py-2.5 rounded-2xl">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-amber-300 font-mono">{scores.overall}%</span>
            <span className="text-xs uppercase tracking-wider text-slate-300 font-serif">Afinidad Cósmica Global</span>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-light text-center max-w-2xl mx-auto">
          {overview}
        </p>

        {/* 4 Dimensiones Relacionales */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-amber-500/20 text-center">
          <div className="p-3.5 rounded-2xl bg-black/40 border border-rose-500/25">
            <span className="text-xs text-rose-300 block font-serif mb-1">Pasión & Química</span>
            <span className="text-2xl font-mono font-bold text-rose-400">{scores.chemistry}%</span>
            <span className="text-[10px] text-slate-400 block mt-1">Magnetismo y Deseo</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/40 border border-sky-500/25">
            <span className="text-xs text-sky-300 block font-serif mb-1">Diálogo & Mente</span>
            <span className="text-2xl font-mono font-bold text-sky-400">{scores.communication}%</span>
            <span className="text-[10px] text-slate-400 block mt-1">Complicidad Verbal</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/25">
            <span className="text-xs text-amber-300 block font-serif mb-1">Estabilidad</span>
            <span className="text-2xl font-mono font-bold text-amber-400">{scores.stability}%</span>
            <span className="text-[10px] text-slate-400 block mt-1">Largo Plazo y Alianza</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/40 border border-purple-500/25">
            <span className="text-xs text-purple-300 block font-serif mb-1">Lazo Álmico</span>
            <span className="text-2xl font-mono font-bold text-purple-400">{scores.soulConnection}%</span>
            <span className="text-[10px] text-slate-400 block mt-1">Karma & Evolución</span>
          </div>
        </div>
      </div>

      {/* 2. ARCANO MAYOR REGENTE DEL VÍNCULO */}
      <div className="bg-gradient-to-r from-amber-500/15 via-[#0B0E1B] to-purple-900/20 border border-amber-500/40 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-2xl border-2 border-amber-400/60 bg-black/60 flex flex-col items-center justify-center text-center p-2 shadow-[0_0_20px_rgba(212,175,55,0.25)] shrink-0">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">ARCANO</span>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-200 my-1">{relationalArcanum.cardNumber}</span>
            <span className="text-[11px] font-serif font-semibold text-parchment leading-tight">{relationalArcanum.name}</span>
          </div>

          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-serif">
                Regencia Arquetípica de Pareja
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Elemento {relationalArcanum.element}
              </span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-amber-100">
              {relationalArcanum.name}: {relationalArcanum.archetype}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              {relationalArcanum.message}
            </p>
            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold block mb-0.5">
                ✦ Clave de Sabiduría para la Relación:
              </span>
              <p className="text-xs text-amber-200/90 italic font-serif leading-relaxed">
                {relationalArcanum.counsel}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DINÁMICAS DE IDENTIDAD, EMOCIÓN Y DESEO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Soles */}
        <div className="bg-[#090D18]/85 border border-amber-500/25 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl text-amber-400 font-bold">☉ ☉</span>
              <span className="text-[10px] uppercase font-mono text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                {sunDynamic.verdict}
              </span>
            </div>
            <h4 className="font-serif font-bold text-base text-amber-100 mb-1">{sunDynamic.title}</h4>
            <span className="text-[11px] text-slate-400 font-serif block mb-3">{sunDynamic.subtitle}</span>
            <p className="text-xs text-slate-300 leading-relaxed">{sunDynamic.description}</p>
          </div>
        </div>

        {/* Lunas */}
        <div className="bg-[#090D18]/85 border border-indigo-500/25 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl text-indigo-300 font-bold">☽ ☽</span>
              <span className="text-[10px] uppercase font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                {moonDynamic.verdict}
              </span>
            </div>
            <h4 className="font-serif font-bold text-base text-indigo-100 mb-1">{moonDynamic.title}</h4>
            <span className="text-[11px] text-slate-400 font-serif block mb-3">{moonDynamic.subtitle}</span>
            <p className="text-xs text-slate-300 leading-relaxed">{moonDynamic.description}</p>
          </div>
        </div>

        {/* Venus & Marte */}
        <div className="bg-[#090D18]/85 border border-rose-500/25 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl text-rose-400 font-bold">♀ ♂</span>
              <span className="text-[10px] uppercase font-mono text-rose-300 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                {eroticChemistry.verdict}
              </span>
            </div>
            <h4 className="font-serif font-bold text-base text-rose-100 mb-1">{eroticChemistry.title}</h4>
            <span className="text-[11px] text-slate-400 font-serif block mb-3">{eroticChemistry.subtitle}</span>
            <p className="text-xs text-slate-300 leading-relaxed">{eroticChemistry.description}</p>
          </div>
        </div>

        {/* Saturno & Nodos */}
        <div className="bg-[#090D18]/85 border border-purple-500/25 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl text-purple-300 font-bold">♄ ☊</span>
              <span className="text-[10px] uppercase font-mono text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                {karmicDestiny.verdict}
              </span>
            </div>
            <h4 className="font-serif font-bold text-base text-purple-100 mb-1">{karmicDestiny.title}</h4>
            <span className="text-[11px] text-slate-400 font-serif block mb-3">{karmicDestiny.subtitle}</span>
            <p className="text-xs text-slate-300 leading-relaxed">{karmicDestiny.description}</p>
          </div>
        </div>
      </div>

      {/* 4. PUNTOS FUERTES Y RETOS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fortalezas */}
        <div className="p-6 rounded-3xl bg-[#090D18]/85 border border-emerald-500/25">
          <h3 className="font-serif font-bold text-emerald-300 text-base mb-4 flex items-center gap-2">
            <span>✨</span> Dones y Fortalezas del Vínculo
          </h3>
          <ul className="space-y-3 text-xs text-slate-300">
            {strengths.map((str, idx) => (
              <li key={`str-${idx}`} className="flex items-start gap-2.5">
                <span className="text-emerald-400 text-sm shrink-0">✦</span>
                <span className="leading-relaxed">{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Desafíos */}
        <div className="p-6 rounded-3xl bg-[#090D18]/85 border border-rose-500/25">
          <h3 className="font-serif font-bold text-rose-300 text-base mb-4 flex items-center gap-2">
            <span>⚡</span> Retos de Crecimiento & Fricciones a Madurar
          </h3>
          <ul className="space-y-3 text-xs text-slate-300">
            {challenges.map((cha, idx) => (
              <li key={`cha-${idx}`} className="flex items-start gap-2.5">
                <span className="text-rose-400 text-sm shrink-0">✦</span>
                <span className="leading-relaxed">{cha}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 5. TABLA DE ASPECTOS CRUZADOS CATEGORIZADOS */}
      <div className="bg-[#090D18]/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h4 className="font-serif font-bold text-amber-200 text-lg flex items-center gap-2">
              <span>☌</span> Geometría Relacional: Conexiones Interplanetarias
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Diálogo energético directo entre los planetas de {chartA.birthData.name} y {chartB.birthData.name}
            </p>
          </div>

          {/* Filtros */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-black/50 rounded-xl border border-amber-500/20 text-xs">
            <button
              type="button"
              onClick={() => setAspectFilter('all')}
              className={`px-3 py-1 rounded-lg transition-all ${
                aspectFilter === 'all'
                  ? 'bg-amber-500/25 text-amber-200 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todos ({synastry.crossAspects.length})
            </button>
            <button
              type="button"
              onClick={() => setAspectFilter('harmonic')}
              className={`px-3 py-1 rounded-lg transition-all ${
                aspectFilter === 'harmonic'
                  ? 'bg-emerald-500/25 text-emerald-200 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Armónicos ({categorizedAspects.harmonics.length})
            </button>
            <button
              type="button"
              onClick={() => setAspectFilter('tense')}
              className={`px-3 py-1 rounded-lg transition-all ${
                aspectFilter === 'tense'
                  ? 'bg-rose-500/25 text-rose-200 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Retos ({categorizedAspects.tensions.length})
            </button>
            <button
              type="button"
              onClick={() => setAspectFilter('conjunction')}
              className={`px-3 py-1 rounded-lg transition-all ${
                aspectFilter === 'conjunction'
                  ? 'bg-amber-500/25 text-amber-200 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Conjunciones ({categorizedAspects.conjunctions.length})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-amber-500/20 text-slate-400 font-serif uppercase text-[10px]">
                <th className="py-2.5 px-3">{chartA.birthData.name}</th>
                <th className="py-2.5 px-3">Geometría</th>
                <th className="py-2.5 px-3">{chartB.birthData.name}</th>
                <th className="py-2.5 px-3">Orbe</th>
                <th className="py-2.5 px-3">Significado Alquímico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-500/10">
              {displayedAspects.map((asp, idx) => {
                const def = ASPECT_DEFINITIONS[asp.aspectType];
                return (
                  <tr key={`cross-row-${idx}`} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3 font-serif font-medium text-amber-200 whitespace-nowrap">
                      {asp.bodyA}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium"
                        style={{
                          backgroundColor: `${def.color}18`,
                          color: def.color,
                          border: `1px solid ${def.color}33`,
                        }}
                      >
                        <span className="text-sm">{def.symbol}</span>
                        <span>{def.name}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 font-serif font-medium text-sky-200 whitespace-nowrap">
                      {asp.bodyB}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-400 whitespace-nowrap">
                      {asp.orb.toFixed(2)}°
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-light text-[11px] leading-relaxed min-w-[240px]">
                      {asp.interpretation || 'Interacción directa entre dos funciones psíquicas.'}
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
