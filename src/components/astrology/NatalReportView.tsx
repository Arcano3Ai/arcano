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
  const {
    bigThree,
    innerGods,
    socialMasters,
    transpersonal,
    midheaven,
    karmicAxes,
    birthArcana,
    elementOverview,
    modalityOverview,
    destinySummary,
    topAspects,
  } = report;

  const totalElementPts =
    chart.elementBalance.fuego +
    chart.elementBalance.tierra +
    chart.elementBalance.aire +
    chart.elementBalance.agua;

  const getElementPct = (val: number) => Math.round((val / totalElementPts) * 100);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 1. SÍNTESIS ESENCIAL */}
      <div className="bg-[#090D18]/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
          <span>✦</span>
          <span>Esencia Cósmica & Mapa del Ser</span>
        </div>
        <p className="text-base sm:text-lg font-serif text-amber-100 font-light leading-relaxed">
          {destinySummary}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 pt-4 border-t border-amber-500/10 text-xs text-slate-300">
          <div>
            <span className="text-amber-400 font-semibold block mb-0.5 font-serif">Alquimia Elemental:</span>
            <p className="text-slate-400">{elementOverview}</p>
          </div>
          <div>
            <span className="text-amber-400 font-semibold block mb-0.5 font-serif">Ritmo y Modalidad:</span>
            <p className="text-slate-400">{modalityOverview}</p>
          </div>
        </div>
      </div>

      {/* 2. ARCANO MAYOR DE NACIMIENTO */}
      <div className="bg-gradient-to-r from-amber-500/15 via-[#0B0E1B] to-indigo-950/25 border border-amber-500/40 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-32 sm:w-28 sm:h-36 rounded-2xl border-2 border-amber-400/60 bg-black/60 flex flex-col items-center justify-center text-center p-2 shadow-[0_0_20px_rgba(212,175,55,0.25)] shrink-0">
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">ARCANO</span>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-200 my-1">{birthArcana.cardNumber}</span>
            <span className="text-[11px] font-serif font-semibold text-parchment leading-tight">{birthArcana.name}</span>
          </div>

          <div className="space-y-2 text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-serif">
                Arcano Natal Regente
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Arquetipo del Destino
              </span>
            </div>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-amber-100">
              {birthArcana.name}: {birthArcana.archetype}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              {birthArcana.teaching}
            </p>
            <div className="pt-1">
              <span className="text-[11px] uppercase tracking-wider text-amber-400 font-semibold block mb-0.5 font-serif">
                ✦ Mantra de Alineación:
              </span>
              <p className="text-xs text-amber-200/90 italic font-serif">
                &ldquo;{birthArcana.mantra}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. LA TRÍADA FUNDAMENTAL (SOL, LUNA, ASCENDENTE) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sol */}
        <div className="bg-[#0B0F1C] border border-amber-500/30 rounded-3xl p-6 flex flex-col justify-between shadow-lg">
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
            <span className="text-[10px] uppercase font-semibold text-amber-400 block mb-0.5 font-serif">Clave de Integración:</span>
            <p className="text-[11px] text-slate-400 leading-normal">{bigThree.sun.counsel}</p>
          </div>
        </div>

        {/* Luna */}
        <div className="bg-[#0B0F1C] border border-indigo-500/30 rounded-3xl p-6 flex flex-col justify-between shadow-lg">
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
            <span className="text-[10px] uppercase font-semibold text-indigo-300 block mb-0.5 font-serif">Necesidad del Alma:</span>
            <p className="text-[11px] text-slate-400 leading-normal">{bigThree.moon.counsel}</p>
          </div>
        </div>

        {/* Ascendente */}
        <div className="bg-[#0B0F1C] border border-purple-500/30 rounded-3xl p-6 flex flex-col justify-between shadow-lg">
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
            <span className="text-[10px] uppercase font-semibold text-purple-300 block mb-0.5 font-serif">Misión Visible:</span>
            <p className="text-[11px] text-slate-400 leading-normal">{bigThree.ascendant.counsel}</p>
          </div>
        </div>
      </div>

      {/* 4. VOCACIÓN Y LEGADO PÚBLICO: EL MEDIO CIELO (MC) */}
      <div className="bg-[#090D18]/85 border border-amber-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl text-amber-400 font-bold">MC</span>
            <div>
              <h3 className="font-serif text-lg font-bold text-amber-100">
                {midheaven.title}
              </h3>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
                Cúspide de Casa X · Vocación & Trascendencia
              </span>
            </div>
          </div>
          <span className="text-xs font-mono px-3 py-1 bg-amber-500/10 rounded-full border border-amber-500/30 text-amber-300">
            Signo {midheaven.sign}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
            <span className="text-xs font-serif font-semibold text-amber-300 block mb-1">
              ✦ Llamado Vocacional:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">{midheaven.vocationalCalling}</p>
          </div>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
            <span className="text-xs font-serif font-semibold text-sky-300 block mb-1">
              ✦ Huella & Legado Público:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">{midheaven.legacy}</p>
          </div>
        </div>
      </div>

      {/* 5. LOS MAESTROS SOCIALES: JÚPITER & SATURNO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Júpiter */}
        <div className="bg-[#090D18]/85 border border-amber-500/30 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl text-amber-400 font-bold">♃</span>
              <span className="text-[10px] uppercase font-mono text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                Júpiter en Casa {socialMasters.jupiter.house}
              </span>
            </div>
            <h4 className="font-serif font-bold text-base text-amber-100 mb-1">{socialMasters.jupiter.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed mt-2">{socialMasters.jupiter.blessings}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-500/10">
            <span className="text-[10px] uppercase font-semibold text-amber-400 block mb-0.5 font-serif">Modo de Expansión:</span>
            <p className="text-[11px] text-slate-400 leading-normal">{socialMasters.jupiter.expansionStyle}</p>
          </div>
        </div>

        {/* Saturno */}
        <div className="bg-[#090D18]/85 border border-slate-600/40 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl text-slate-300 font-bold">♄</span>
              <span className="text-[10px] uppercase font-mono text-slate-300 bg-slate-500/10 px-2.5 py-1 rounded-full border border-slate-500/20">
                Saturno en Casa {socialMasters.saturn.house}
              </span>
            </div>
            <h4 className="font-serif font-bold text-base text-slate-100 mb-1">{socialMasters.saturn.title}</h4>
            <p className="text-xs text-slate-300 leading-relaxed mt-2">{socialMasters.saturn.masteryLesson}</p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-600/20">
            <span className="text-[10px] uppercase font-semibold text-slate-300 block mb-0.5 font-serif">Responsabilidad Sagrada:</span>
            <p className="text-[11px] text-slate-400 leading-normal">{socialMasters.saturn.responsibility}</p>
          </div>
        </div>
      </div>

      {/* 6. PLANETAS PERSONALES (MENTE, AMOR, ACCIÓN) */}
      <div className="bg-[#090D18]/80 border border-amber-500/20 rounded-3xl p-6 sm:p-8">
        <h3 className="font-serif text-base font-bold text-amber-200 mb-4 flex items-center gap-2">
          <span className="text-amber-400">✧</span> Mente, Vínculos y Acción (Planetas Personales)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-black/40 border border-sky-500/20">
            <div className="flex items-center gap-2 text-sky-400 font-serif font-semibold text-sm mb-1">
              <span>☿</span> Mercurio (Casa {innerGods.mercury.house})
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{innerGods.mercury.communicationStyle}</p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-rose-500/20">
            <div className="flex items-center gap-2 text-rose-400 font-serif font-semibold text-sm mb-1">
              <span>♀</span> Venus (Casa {innerGods.venus.house})
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{innerGods.venus.loveLanguage}</p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-amber-600/20">
            <div className="flex items-center gap-2 text-amber-500 font-serif font-semibold text-sm mb-1">
              <span>♂</span> Marte (Casa {innerGods.mars.house})
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{innerGods.mars.drive}</p>
          </div>
        </div>
      </div>

      {/* 7. LA TRÍADA TRANSPERSONAL (URANO, NEPTUNO, PLUTÓN) */}
      <div className="bg-[#090D18]/80 border border-amber-500/20 rounded-3xl p-6 sm:p-8">
        <h3 className="font-serif text-base font-bold text-amber-200 mb-4 flex items-center gap-2">
          <span className="text-amber-400">✧</span> Fuerzas Transpersonales & Transformación Profunda
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-black/40 border border-teal-500/20">
            <div className="flex items-center gap-2 text-teal-300 font-serif font-semibold text-sm mb-1">
              <span>♅</span> {transpersonal.uranus.title}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{transpersonal.uranus.influence}</p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-indigo-500/20">
            <div className="flex items-center gap-2 text-indigo-300 font-serif font-semibold text-sm mb-1">
              <span>♆</span> {transpersonal.neptune.title}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{transpersonal.neptune.influence}</p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-purple-600/20">
            <div className="flex items-center gap-2 text-purple-300 font-serif font-semibold text-sm mb-1">
              <span>♇</span> {transpersonal.pluto.title}
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{transpersonal.pluto.influence}</p>
          </div>
        </div>
      </div>

      {/* 8. DESTINO KÁRMICO Y SANACIÓN (NODO NORTE, QUIRÓN Y LILITH) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Nodo Norte */}
        <div className="p-5 rounded-3xl bg-[#090D18]/85 border border-emerald-500/25">
          <div className="flex items-center gap-2 text-emerald-400 font-serif font-semibold text-sm mb-1">
            <span>☊</span> {karmicAxes.northNode.title} (Casa {karmicAxes.northNode.house})
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{karmicAxes.northNode.mission}</p>
        </div>

        {/* Quirón */}
        <div className="p-5 rounded-3xl bg-[#090D18]/85 border border-amber-400/25">
          <div className="flex items-center gap-2 text-amber-300 font-serif font-semibold text-sm mb-1">
            <span>⚷</span> {karmicAxes.chiron.title} (Casa {karmicAxes.chiron.house})
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{karmicAxes.chiron.medicine}</p>
        </div>

        {/* Lilith */}
        <div className="p-5 rounded-3xl bg-[#090D18]/85 border border-rose-500/25">
          <div className="flex items-center gap-2 text-rose-300 font-serif font-semibold text-sm mb-1">
            <span>⚸</span> {karmicAxes.lilith.title} (Casa {karmicAxes.lilith.house})
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{karmicAxes.lilith.wildPower}</p>
        </div>
      </div>

      {/* 9. TOP ASPECTOS MAYORES (GEOMETRÍA SAGRADA) */}
      {topAspects.length > 0 && (
        <div className="bg-[#090D18]/85 border border-amber-500/25 rounded-3xl p-6 sm:p-8">
          <h4 className="font-serif font-bold text-amber-200 text-base mb-4 flex items-center gap-2">
            <span>☌</span> Geometría Sagrada Dominante (Aspectos Clave de la Carta)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topAspects.map((asp, idx) => (
              <div key={`aspect-box-${idx}`} className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-serif font-semibold text-xs text-amber-200">{asp.title}</span>
                  <span className="text-[10px] font-mono text-slate-400">orbe {asp.orb.toFixed(1)}°</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-light">{asp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 10. BALANCE ELEMENTAL RESUMIDO */}
      <div className="p-6 rounded-3xl bg-[#090D18]/85 border border-amber-500/20">
        <div className="flex items-center justify-between mb-4 text-xs">
          <span className="font-serif font-semibold text-amber-200 text-sm">Balance Elemental Sagrado</span>
          <span className="text-slate-400">
            Elemento Dominante: <strong className="text-amber-300 font-serif">{chart.elementBalance.dominantElement}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          {[
            { name: 'Fuego', val: chart.elementBalance.fuego, color: ELEMENT_COLORS.Fuego },
            { name: 'Tierra', val: chart.elementBalance.tierra, color: ELEMENT_COLORS.Tierra },
            { name: 'Aire', val: chart.elementBalance.aire, color: ELEMENT_COLORS.Aire },
            { name: 'Agua', val: chart.elementBalance.agua, color: ELEMENT_COLORS.Agua },
          ].map(item => {
            const pct = getElementPct(item.val);
            return (
              <div key={item.name} className="p-3 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-xs text-slate-300 font-medium block">{item.name}</span>
                <span className="text-lg font-mono font-bold" style={{ color: item.color.text }}>
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
