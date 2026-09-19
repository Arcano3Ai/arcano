'use client';

import React from 'react';
import { SynastryReport } from '@/lib/astrology/types';
import SynastryWheel from './SynastryWheel';

interface SynastryDossierUserProps {
  synastry: SynastryReport;
}

export default function SynastryDossierUser({ synastry }: SynastryDossierUserProps) {
  const {
    chartA,
    chartB,
    scores,
    overview,
    strengths,
    challenges,
    relationalArcanum,
    sunDynamic,
    moonDynamic,
    eroticChemistry,
    karmicDestiny,
  } = synastry;

  return (
    <div className="space-y-6 text-slate-100 font-sans">
      {/* =========================================================================
          PÁGINA 1: PORTADA EDITORIAL Y RUEDA SAGRADA DE LA PAREJA
          ========================================================================= */}
      <div className="print-cover-page border border-amber-500/40 rounded-3xl p-6 bg-[#0B0F1C] text-center">
        {/* Encabezado */}
        <div className="space-y-1">
          <span className="text-amber-400 text-[10px] uppercase tracking-[0.35em] font-serif block">
            ✦ ARCANO · DOSSIER DE COMPATIBILIDAD & SINASTRÍA DE PAREJA ✦
          </span>
          <h1 className="text-2xl font-serif font-bold text-amber-100">
            {chartA.birthData.name} & {chartB.birthData.name}
          </h1>
          <p className="text-[11px] text-slate-300">
            {chartA.birthData.name} ({chartA.birthData.cityName}, {chartA.birthData.day}/{chartA.birthData.month}/{chartA.birthData.year}) • {chartB.birthData.name} ({chartB.birthData.cityName}, {chartB.birthData.day}/{chartB.birthData.month}/{chartB.birthData.year})
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 rounded-xl border border-amber-500/30 mt-1">
            <span className="text-xs font-serif text-amber-300 font-bold">
              Afinidad Cósmica: {scores.overall}%
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-[10px] text-amber-400 font-serif">
              Arcano Regente: {relationalArcanum.name} ({relationalArcanum.cardNumber})
            </span>
          </div>
        </div>

        {/* Rueda Sagrada Bi-Wheel */}
        <div className="py-2 flex justify-center items-center">
          <SynastryWheel synastry={synastry} />
        </div>

        {/* 4 Dimensiones Emocionales */}
        <div className="grid grid-cols-4 gap-2.5 pt-3 border-t border-amber-500/20 text-center">
          <div className="p-2 bg-black/40 rounded-xl border border-rose-500/20">
            <span className="text-[9px] text-rose-300 block font-serif">Pasión & Química</span>
            <span className="text-base font-bold text-rose-400 font-mono">{scores.chemistry}%</span>
          </div>
          <div className="p-2 bg-black/40 rounded-xl border border-sky-500/20">
            <span className="text-[9px] text-sky-300 block font-serif">Diálogo & Mente</span>
            <span className="text-base font-bold text-sky-400 font-mono">{scores.communication}%</span>
          </div>
          <div className="p-2 bg-black/40 rounded-xl border border-amber-500/20">
            <span className="text-[9px] text-amber-300 block font-serif">Estabilidad</span>
            <span className="text-base font-bold text-amber-400 font-mono">{scores.stability}%</span>
          </div>
          <div className="p-2 bg-black/40 rounded-xl border border-purple-500/20">
            <span className="text-[9px] text-purple-300 block font-serif">Lazo Álmico</span>
            <span className="text-base font-bold text-purple-400 font-mono">{scores.soulConnection}%</span>
          </div>
        </div>

        {/* Síntesis del Arcano */}
        <div className="mt-3 p-3 bg-amber-500/10 rounded-2xl border border-amber-500/30 text-left flex items-center gap-4">
          <div className="w-12 h-14 rounded-xl border border-amber-400/50 bg-black/50 flex flex-col items-center justify-center text-center shrink-0">
            <span className="text-sm font-serif font-bold text-amber-300">{relationalArcanum.cardNumber}</span>
            <span className="text-[8px] uppercase tracking-tighter text-slate-300 font-serif line-clamp-1">{relationalArcanum.name}</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-widest text-amber-400 font-serif font-semibold block">
              ✦ Clave Sagrada para su Relación
            </span>
            <p className="text-[10.5px] text-amber-100 font-serif italic leading-snug">
              &quot;{relationalArcanum.counsel}&quot;
            </p>
          </div>
        </div>

        {/* Pie de Portada */}
        <div className="text-center pt-2 border-t border-amber-500/10 text-[9px] text-slate-400 font-serif">
          ARCANO · Guía Astrológica de Pareja · www.arcanosolutions.com
        </div>
      </div>

      {/* =========================================================================
          PÁGINA 2: GUÍA DE ARMONÍA, DINÁMICAS Y CONVIVENCIA CONSCIENTE
          ========================================================================= */}
      <div className="print-page-break space-y-5 pt-4">
        {/* Cabecera Página 2 */}
        <div className="border border-amber-500/30 rounded-2xl p-4 bg-[#0B0F1C] flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-amber-400 font-serif block">
              ✦ MANUAL DE ARMONÍA VINCULAR ✦
            </span>
            <h3 className="text-base font-serif font-bold text-amber-100">
              Cómo Fluye su Energía: Dinámicas Cotidianas de Pareja
            </h3>
          </div>
          <span className="text-xs text-amber-300 font-mono font-bold bg-amber-500/15 px-2.5 py-1 rounded-lg border border-amber-500/30">
            {chartA.birthData.name} & {chartB.birthData.name}
          </span>
        </div>

        {/* Resumen Global para Humanos */}
        <div className="p-4 rounded-2xl bg-[#090D18]/90 border border-amber-500/20 text-xs text-slate-200 leading-relaxed font-light">
          <p className="italic text-center max-w-2xl mx-auto text-amber-200/90">
            &quot;{overview}&quot;
          </p>
        </div>

        {/* Las 4 Dinámicas Explicadas con Claridad */}
        <div className="grid grid-cols-2 gap-3.5">
          {/* Soles */}
          <div className="p-3.5 rounded-2xl bg-[#090D18]/90 border border-amber-500/20">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-serif font-bold text-amber-300">☉ Personalidades & Egos</span>
              <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {sunDynamic.verdict}
              </span>
            </div>
            <h5 className="text-[11px] font-serif font-semibold text-amber-100 mb-1">{sunDynamic.title}</h5>
            <p className="text-[10px] text-slate-300 leading-relaxed font-light">{sunDynamic.description}</p>
          </div>

          {/* Lunas */}
          <div className="p-3.5 rounded-2xl bg-[#090D18]/90 border border-indigo-500/20">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-serif font-bold text-indigo-300">☽ Emociones & Cuidado</span>
              <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                {moonDynamic.verdict}
              </span>
            </div>
            <h5 className="text-[11px] font-serif font-semibold text-indigo-100 mb-1">{moonDynamic.title}</h5>
            <p className="text-[10px] text-slate-300 leading-relaxed font-light">{moonDynamic.description}</p>
          </div>

          {/* Venus & Marte */}
          <div className="p-3.5 rounded-2xl bg-[#090D18]/90 border border-rose-500/20">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-serif font-bold text-rose-300">♀ ♂ Química & Magnetismo</span>
              <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                {eroticChemistry.verdict}
              </span>
            </div>
            <h5 className="text-[11px] font-serif font-semibold text-rose-100 mb-1">{eroticChemistry.title}</h5>
            <p className="text-[10px] text-slate-300 leading-relaxed font-light">{eroticChemistry.description}</p>
          </div>

          {/* Saturno & Nodos */}
          <div className="p-3.5 rounded-2xl bg-[#090D18]/90 border border-purple-500/20">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-serif font-bold text-purple-300">♄ ☊ Propósito & Karma</span>
              <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                {karmicDestiny.verdict}
              </span>
            </div>
            <h5 className="text-[11px] font-serif font-semibold text-purple-100 mb-1">{karmicDestiny.title}</h5>
            <p className="text-[10px] text-slate-300 leading-relaxed font-light">{karmicDestiny.description}</p>
          </div>
        </div>

        {/* Dones y Retos */}
        <div className="grid grid-cols-2 gap-3.5">
          <div className="p-3.5 rounded-2xl bg-[#090D18]/90 border border-emerald-500/20">
            <h4 className="font-serif font-bold text-emerald-300 text-xs mb-2 flex items-center gap-1.5">
              <span>✨</span> Lo que Fluye Naturalmente en su Unión
            </h4>
            <ul className="space-y-1.5 text-[10px] text-slate-300">
              {strengths.slice(0, 3).map((s, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-emerald-400">✦</span>
                  <span className="leading-snug">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#090D18]/90 border border-rose-500/20">
            <h4 className="font-serif font-bold text-rose-300 text-xs mb-2 flex items-center gap-1.5">
              <span>⚡</span> Puntos a Cuidar & Oportunidades de Maduración
            </h4>
            <ul className="space-y-1.5 text-[10px] text-slate-300">
              {challenges.slice(0, 3).map((c, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-rose-400">✦</span>
                  <span className="leading-snug">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3 Consejos de Oro para la Convivencia */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#0B0F1C] to-amber-500/15 border border-amber-500/30">
          <span className="text-[9px] uppercase tracking-[0.25em] text-amber-400 font-serif font-bold block mb-2 text-center">
            ✦ 3 PILARES PARA CUIDAR SU FUEGO SAGRADO ✦
          </span>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-2 bg-black/40 rounded-xl border border-amber-500/20">
              <span className="text-[10px] font-serif font-semibold text-amber-200 block mb-0.5">1. Respetar Tiempos</span>
              <p className="text-[9px] text-slate-300 leading-tight font-light">
                Cada uno procesa sus emociones a ritmos distintos; dar espacio nutre la cercanía.
              </p>
            </div>
            <div className="p-2 bg-black/40 rounded-xl border border-amber-500/20">
              <span className="text-[10px] font-serif font-semibold text-amber-200 block mb-0.5">2. Hablar sin Culpa</span>
              <p className="text-[9px] text-slate-300 leading-tight font-light">
                Expresar necesidades desde el corazón y el sentimiento, nunca desde el reclamo.
              </p>
            </div>
            <div className="p-2 bg-black/40 rounded-xl border border-amber-500/20">
              <span className="text-[10px] font-serif font-semibold text-amber-200 block mb-0.5">3. Honrar la Libertad</span>
              <p className="text-[9px] text-slate-300 leading-tight font-light">
                Amar la individualidad del otro es el mayor amuleto para que el amor perdure.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Página 2 */}
        <div className="text-center pt-3 border-t border-amber-500/20 text-[9px] text-slate-400 font-serif">
          ARCANO · Santuario de Sabiduría y Simbolismo Arquetípico · www.arcanosolutions.com
        </div>
      </div>
    </div>
  );
}
