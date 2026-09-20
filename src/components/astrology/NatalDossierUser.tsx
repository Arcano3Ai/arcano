'use client';

import React from 'react';
import { NatalChartData } from '@/lib/astrology/types';
import { generateNatalReport } from '@/lib/astrology/interpretations';
import NatalWheel from './NatalWheel';

interface NatalDossierUserProps {
  chart: NatalChartData;
}

export default function NatalDossierUser({ chart }: NatalDossierUserProps) {
  const report = generateNatalReport(chart);
  const {
    bigThree,
    innerGods,
    socialMasters,
    midheaven,
    karmicAxes,
    birthArcana,
    elementOverview,
    modalityOverview,
    destinySummary,
  } = report;

  const totalElementPts =
    chart.elementBalance.fuego +
    chart.elementBalance.tierra +
    chart.elementBalance.aire +
    chart.elementBalance.agua || 1;

  const getElementPct = (val: number) => Math.round((val / totalElementPts) * 100);

  return (
    <div className="space-y-6 text-slate-100 font-sans print-dossier-inner">
      {/* =========================================================================
          PÁGINA 1: PORTADA CEREMONIAL, RUEDA SAGRADA Y TRÍADA DE IDENTIDAD
          (Tipografía grande, limpia, espaciosa y sin saturación técnica)
          ========================================================================= */}
      <div className="print-cover-page border-2 border-amber-500/40 rounded-3xl p-8 bg-[#0B0F1C] text-center flex flex-col justify-between">
        {/* Cabecera Sagrada */}
        <div className="space-y-1.5 border-b border-amber-500/20 pb-4">
          <span className="text-amber-400 text-xs uppercase tracking-[0.35em] font-serif font-semibold block">
            ✦ ARCANO · DOSSIER NATAL DEL ALMA ✦
          </span>
          <h1 className="text-3xl font-serif font-bold text-amber-100 tracking-wide">
            Mapa de Consciencia de {chart.birthData.name}
          </h1>
          <p className="text-xs text-slate-300 font-light">
            Nacimiento Sagrado: {chart.birthData.day}/{chart.birthData.month}/{chart.birthData.year} a las{' '}
            {String(chart.birthData.hour).padStart(2, '0')}:{String(chart.birthData.minute).padStart(2, '0')} hs •{' '}
            {chart.birthData.cityName}
          </p>
        </div>

        {/* Rueda Sagrada SVG Amplia */}
        <div className="py-2 flex justify-center items-center">
          <NatalWheel chart={chart} />
        </div>

        {/* Tríada de Identidad en Letra Grande y Clara */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-amber-500/25 text-left">
          <div className="p-4 bg-black/40 rounded-2xl border border-amber-500/30">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xl text-amber-400 font-bold">☉</span>
              <span className="text-[10px] font-serif uppercase tracking-widest text-amber-300 font-bold">
                Tu Esencia
              </span>
            </div>
            <span className="font-serif font-bold text-sm text-amber-100 block">
              Sol en {chart.positions.find(p => p.body === 'Sol')?.sign}
            </span>
            <p className="text-[11px] text-slate-300 leading-snug mt-1">
              {bigThree.sun.title}
            </p>
          </div>

          <div className="p-4 bg-black/40 rounded-2xl border border-indigo-500/30">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xl text-indigo-300 font-bold">☽</span>
              <span className="text-[10px] font-serif uppercase tracking-widest text-indigo-300 font-bold">
                Tus Emociones
              </span>
            </div>
            <span className="font-serif font-bold text-sm text-indigo-100 block">
              Luna en {chart.positions.find(p => p.body === 'Luna')?.sign}
            </span>
            <p className="text-[11px] text-slate-300 leading-snug mt-1">
              {bigThree.moon.title}
            </p>
          </div>

          <div className="p-4 bg-black/40 rounded-2xl border border-purple-500/30">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xl text-purple-300 font-bold">✦</span>
              <span className="text-[10px] font-serif uppercase tracking-widest text-purple-300 font-bold">
                Tu Proyección
              </span>
            </div>
            <span className="font-serif font-bold text-sm text-purple-100 block">
              Ascendente {chart.angles.ascSign}
            </span>
            <p className="text-[11px] text-slate-300 leading-snug mt-1">
              {bigThree.ascendant.title}
            </p>
          </div>
        </div>

        {/* Arcano Mayor de Nacimiento y Alquimia Elemental */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-amber-500/20 text-left">
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30 flex items-center gap-3">
            <div className="w-10 h-12 rounded-lg bg-black/60 border border-amber-400 flex flex-col items-center justify-center shrink-0">
              <span className="text-[8px] text-amber-300 font-mono">ARCANO</span>
              <span className="text-sm font-bold text-amber-100">{birthArcana.cardNumber}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-amber-400 font-serif block">
                Arcano Natal Regente
              </span>
              <span className="text-xs font-bold text-amber-100 font-serif">
                {birthArcana.name}
              </span>
              <p className="text-[10px] text-slate-300 italic truncate max-w-[240px]">
                &ldquo;{birthArcana.mantra}&rdquo;
              </p>
            </div>
          </div>

          <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/30 flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-wider text-indigo-300 font-serif block mb-1">
              Alquimia de los 4 Elementos
            </span>
            <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
              <div>
                <span className="text-amber-400 font-bold">Fuego</span> {getElementPct(chart.elementBalance.fuego)}%
              </div>
              <div>
                <span className="text-emerald-400 font-bold">Tierra</span> {getElementPct(chart.elementBalance.tierra)}%
              </div>
              <div>
                <span className="text-sky-400 font-bold">Aire</span> {getElementPct(chart.elementBalance.aire)}%
              </div>
              <div>
                <span className="text-blue-400 font-bold">Agua</span> {getElementPct(chart.elementBalance.agua)}%
              </div>
            </div>
          </div>
        </div>

        {/* Pie Editorial de Portada */}
        <div className="text-center pt-2 border-t border-amber-500/10 text-[10px] text-slate-400 font-serif">
          ARCANO · Dossier Astrológico del Alma · Versión para el Consultante · arcanosolutions.com
        </div>
      </div>

      {/* =========================================================================
          PÁGINA 2: CLAVES DE VIDA, MISIÓN DEL ALMA Y CONSEJOS PRÁCTICOS
          ========================================================================= */}
      <div className="print-page-break space-y-6 pt-6 text-left">
        {/* Síntesis del Destino */}
        <div className="border border-amber-500/30 rounded-3xl p-6 bg-[#0B0F1C]">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-serif font-bold block mb-2">
            ✦ Tu Misión Cósmica & Sendero de Vida
          </span>
          <p className="text-sm font-serif text-amber-100 leading-relaxed font-light">
            {destinySummary}
          </p>
        </div>

        {/* Las 4 Grandes Fortalezas del Consultante */}
        <div className="border border-amber-500/30 rounded-3xl p-6 bg-[#0B0F1C] print-avoid-break">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-serif font-bold block mb-4">
            ✦ Tus 4 Pilares de Poder & Dones Innatos
          </span>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-black/40 rounded-2xl border border-amber-500/20">
              <span className="text-xs font-serif font-bold text-amber-200 block mb-1">
                ☉ Fuerza de Voluntad & Identidad:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {bigThree.sun.summary}
              </p>
            </div>
            <div className="p-4 bg-black/40 rounded-2xl border border-amber-500/20">
              <span className="text-xs font-serif font-bold text-amber-200 block mb-1">
                ♀ Lenguaje del Afecto & Atracción:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {innerGods.venus.loveLanguage}
              </p>
            </div>
            <div className="p-4 bg-black/40 rounded-2xl border border-amber-500/20">
              <span className="text-xs font-serif font-bold text-amber-200 block mb-1">
                ♃ Expansión, Sabiduría & Abundancia:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {socialMasters.jupiter.blessings}
              </p>
            </div>
            <div className="p-4 bg-black/40 rounded-2xl border border-amber-500/20">
              <span className="text-xs font-serif font-bold text-amber-200 block mb-1">
                ☿ Estilo de Mente & Comunicación:
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {innerGods.mercury.communicationStyle}
              </p>
            </div>
          </div>
        </div>

        {/* Retos de Maduración & Sanación del Alma */}
        <div className="border border-indigo-500/30 rounded-3xl p-6 bg-[#0B0F1C] print-avoid-break">
          <span className="text-xs uppercase tracking-widest text-indigo-300 font-serif font-bold block mb-4">
            ✦ Retos de Maduración & Claves de Evolución
          </span>
          <div className="space-y-3">
            <div className="p-3.5 bg-black/40 rounded-xl border border-indigo-500/20">
              <span className="text-xs font-bold text-amber-300 font-serif block mb-0.5">
                ♄ La Gran Maestría (Saturno en {socialMasters.saturn.sign}):
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {socialMasters.saturn.masteryLesson}
              </p>
            </div>
            <div className="p-3.5 bg-black/40 rounded-xl border border-indigo-500/20">
              <span className="text-xs font-bold text-amber-300 font-serif block mb-0.5">
                ☊ Hacia Dónde Caminar (Nodo Norte):
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {karmicAxes.northNode.mission}
              </p>
            </div>
            <div className="p-3.5 bg-black/40 rounded-xl border border-indigo-500/20">
              <span className="text-xs font-bold text-amber-300 font-serif block mb-0.5">
                ⚷ Tu Herida Sagrada y Poder de Sanar (Quirón):
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {karmicAxes.chiron.wound}
              </p>
            </div>
          </div>
        </div>

        {/* Pie Editorial */}
        <div className="text-center pt-4 border-t border-amber-500/20 text-xs text-slate-400 font-serif">
          ARCANO · Santuario de Sabiduría Mística & Cartografía del Destino · www.arcanosolutions.com
        </div>
      </div>
    </div>
  );
}
