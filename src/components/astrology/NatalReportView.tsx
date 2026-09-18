'use client';

import React from 'react';
import { NatalChartData } from '@/lib/astrology/types';
import { generateNatalReport } from '@/lib/astrology/interpretations';
import { ELEMENT_COLORS } from '@/lib/astrology/constants';

interface NatalReportViewProps {
  chart: NatalChartData;
}

export default function NatalReportView({ chart }: NatalReportViewProps) {
  const report = generateNatalReport(chart);
  const { bigThree, innerGods, karmicAxes, elementOverview, destinySummary } = report;

  const totalElementPts =
    chart.elementBalance.fuego +
    chart.elementBalance.tierra +
    chart.elementBalance.aire +
    chart.elementBalance.agua;

  const getElementPct = (val: number) => Math.round((val / totalElementPts) * 100);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 1. SÍNTESIS ESENCIAL */}
      <div className="bg-[#090D18]/90 border border-amber-500/30 rounded-2xl p-6 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
          <span>✦</span>
          <span>Esencia Cósmica</span>
        </div>
        <p className="text-base sm:text-lg font-serif text-amber-100 font-light leading-relaxed">
          {destinySummary}
        </p>
        <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-amber-500/10 font-sans">
          {elementOverview}
        </p>
      </div>

      {/* 2. LA TRÍADA PRINCIPAL (SOL, LUNA, ASCENDENTE) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sol */}
        <div className="bg-[#0B0F1C] border border-amber-500/30 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl text-amber-400 font-bold">☉</span>
              <span className="text-[10px] uppercase tracking-wider text-amber-400/80 font-mono bg-amber-500/10 px-2 py-0.5 rounded">
                Sol • Esencia
              </span>
            </div>
            <h4 className="font-serif font-bold text-base text-amber-100 mb-1">{bigThree.sun.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed mt-2">{bigThree.sun.summary}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-500/10">
            <span className="text-[10px] uppercase font-semibold text-amber-400 block mb-0.5">Clave de Integración:</span>
            <p className="text-[11px] text-slate-400 leading-normal">{bigThree.sun.counsel}</p>
          </div>
        </div>

        {/* Luna */}
        <div className="bg-[#0B0F1C] border border-indigo-500/30 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl text-indigo-300 font-bold">☽</span>
              <span className="text-[10px] uppercase tracking-wider text-indigo-300/80 font-mono bg-indigo-500/10 px-2 py-0.5 rounded">
                Luna • Emoción
              </span>
            </div>
            <h4 className="font-serif font-bold text-base text-indigo-100 mb-1">{bigThree.moon.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed mt-2">{bigThree.moon.summary}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-indigo-500/10">
            <span className="text-[10px] uppercase font-semibold text-indigo-300 block mb-0.5">Necesidad del Alma:</span>
            <p className="text-[11px] text-slate-400 leading-normal">{bigThree.moon.counsel}</p>
          </div>
        </div>

        {/* Ascendente */}
        <div className="bg-[#0B0F1C] border border-purple-500/30 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl text-purple-300 font-bold">AC</span>
              <span className="text-[10px] uppercase tracking-wider text-purple-300/80 font-mono bg-purple-500/10 px-2 py-0.5 rounded">
                Ascendente • Camino
              </span>
            </div>
            <h4 className="font-serif font-bold text-base text-purple-100 mb-1">{bigThree.ascendant.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed mt-2">{bigThree.ascendant.summary}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-purple-500/10">
            <span className="text-[10px] uppercase font-semibold text-purple-300 block mb-0.5">Misión Visible:</span>
            <p className="text-[11px] text-slate-400 leading-normal">{bigThree.ascendant.counsel}</p>
          </div>
        </div>
      </div>

      {/* 3. PLANETAS PERSONALES (MENTE, AMOR, ACCIÓN) */}
      <div className="bg-[#090D18]/80 border border-amber-500/20 rounded-2xl p-6">
        <h3 className="font-serif text-base font-bold text-amber-200 mb-4 flex items-center gap-2">
          <span className="text-amber-400">✧</span> Mente, Vínculos y Acción
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-black/30 border border-sky-500/20">
            <div className="flex items-center gap-2 text-sky-400 font-serif font-semibold text-sm mb-1">
              <span>☿</span> Mercurio (Casa {innerGods.mercury.house})
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{innerGods.mercury.communicationStyle}</p>
          </div>

          <div className="p-4 rounded-xl bg-black/30 border border-rose-500/20">
            <div className="flex items-center gap-2 text-rose-400 font-serif font-semibold text-sm mb-1">
              <span>♀</span> Venus (Casa {innerGods.venus.house})
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{innerGods.venus.loveLanguage}</p>
          </div>

          <div className="p-4 rounded-xl bg-black/30 border border-amber-600/20">
            <div className="flex items-center gap-2 text-amber-500 font-serif font-semibold text-sm mb-1">
              <span>♂</span> Marte (Casa {innerGods.mars.house})
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{innerGods.mars.drive}</p>
          </div>
        </div>
      </div>

      {/* 4. DESTINO KÁRMICO Y SANACIÓN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nodo Norte */}
        <div className="p-5 rounded-2xl bg-[#090D18]/80 border border-emerald-500/20">
          <div className="flex items-center gap-2 text-emerald-400 font-serif font-semibold text-sm mb-1">
            <span>☊</span> {karmicAxes.northNode.title} (Casa {karmicAxes.northNode.house})
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{karmicAxes.northNode.mission}</p>
        </div>

        {/* Quirón */}
        <div className="p-5 rounded-2xl bg-[#090D18]/80 border border-amber-400/20">
          <div className="flex items-center gap-2 text-amber-300 font-serif font-semibold text-sm mb-1">
            <span>⚷</span> {karmicAxes.chiron.title} (Casa {karmicAxes.chiron.house})
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{karmicAxes.chiron.medicine}</p>
        </div>
      </div>

      {/* 5. BALANCE ELEMENTAL RESUMIDO */}
      <div className="p-5 rounded-2xl bg-[#090D18]/80 border border-amber-500/20">
        <div className="flex items-center justify-between mb-3 text-xs">
          <span className="font-serif font-semibold text-amber-200">Balance de Elementos</span>
          <span className="text-slate-400">Dominante: <strong className="text-amber-300">{chart.elementBalance.dominantElement}</strong></span>
        </div>

        <div className="grid grid-cols-4 gap-3 text-center">
          {[
            { name: 'Fuego', val: chart.elementBalance.fuego, color: ELEMENT_COLORS.Fuego },
            { name: 'Tierra', val: chart.elementBalance.tierra, color: ELEMENT_COLORS.Tierra },
            { name: 'Aire', val: chart.elementBalance.aire, color: ELEMENT_COLORS.Aire },
            { name: 'Agua', val: chart.elementBalance.agua, color: ELEMENT_COLORS.Agua },
          ].map(item => {
            const pct = getElementPct(item.val);
            return (
              <div key={item.name} className="p-2.5 rounded-xl bg-black/30 border border-white/5">
                <span className="text-xs text-slate-300 font-medium block">{item.name}</span>
                <span className="text-sm font-mono font-bold" style={{ color: item.color.text }}>
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
