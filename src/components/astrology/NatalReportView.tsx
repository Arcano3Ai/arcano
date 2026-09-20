'use client';

import React, { useState } from 'react';
import { NatalChartData } from '@/lib/astrology/types';
import { generateNatalReport } from '@/lib/astrology/interpretations';
import { ELEMENT_COLORS, BODY_SYMBOLS, ZODIAC_SIGNS } from '@/lib/astrology/constants';

interface NatalReportViewProps {
  chart: NatalChartData;
}

export default function NatalReportView({ chart }: NatalReportViewProps) {
  const [viewMode, setViewMode] = useState<'easy' | 'astrologer'>('easy');

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
    chart.elementBalance.agua || 1;

  const getElementPct = (val: number) => Math.round((val / totalElementPts) * 100);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* =========================================================================
          SELECTOR INTERACTIVO: VERSIÓN FÁCIL (USUARIO) VS VERSIÓN ASTRÓLOGO
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-[#090D18]/90 border border-amber-500/30 backdrop-blur-md shadow-xl">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold font-serif block">
            Nivel de Lectura Astrológica
          </span>
          <h3 className="font-serif font-bold text-amber-100 text-sm sm:text-base">
            {viewMode === 'easy'
              ? '🌟 Versión Fácil: Interpretación Práctica & Claves del Ser'
              : '📜 Versión Astrólogo: Efemérides Matemáticas & Parámetros Técnicos'}
          </h3>
        </div>

        <div className="inline-flex p-1 rounded-2xl bg-black/50 border border-amber-500/30 shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('easy')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-serif transition-all flex items-center gap-1.5 ${
              viewMode === 'easy'
                ? 'bg-gradient-to-r from-amber-500/30 to-amber-500/10 border border-amber-400 text-amber-100 font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                : 'text-slate-400 hover:text-amber-200'
            }`}
          >
            <span>🌟</span>
            <span>Versión Fácil (Para Ti)</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('astrologer')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-serif transition-all flex items-center gap-1.5 ${
              viewMode === 'astrologer'
                ? 'bg-gradient-to-r from-purple-500/30 to-indigo-500/10 border border-purple-400 text-purple-100 font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                : 'text-slate-400 hover:text-purple-200'
            }`}
          >
            <span>📜</span>
            <span>Versión Astrólogo</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          CONTENIDO MODO 1: VERSIÓN FÁCIL (PARA EL USUARIO / CONSULTANTE)
          ========================================================================= */}
      {viewMode === 'easy' && (
        <div className="space-y-8 animate-in fade-in duration-300">
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
                <span className="text-[10px] uppercase font-semibold text-indigo-300 block mb-0.5 font-serif">Nutrición Emocional:</span>
                <p className="text-[11px] text-slate-400 leading-normal">{bigThree.moon.counsel}</p>
              </div>
            </div>

            {/* Ascendente */}
            <div className="bg-[#0B0F1C] border border-purple-500/30 rounded-3xl p-6 flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl text-purple-300 font-bold">✦</span>
                  <span className="text-[10px] uppercase tracking-wider text-purple-300/80 font-mono bg-purple-500/10 px-2 py-0.5 rounded">
                    Ascendente • Proyección
                  </span>
                </div>
                <h4 className="font-serif font-bold text-base text-purple-100 mb-1">{bigThree.ascendant.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-2">{bigThree.ascendant.summary}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-purple-500/10">
                <span className="text-[10px] uppercase font-semibold text-purple-300 block mb-0.5 font-serif">Máscara y Destino:</span>
                <p className="text-[11px] text-slate-400 leading-normal">{bigThree.ascendant.counsel}</p>
              </div>
            </div>
          </div>

          {/* 4. PLANETAS PERSONALES (DIOSES INTERNOS) */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-amber-200 text-lg flex items-center gap-2">
              <span>❂</span> Los Dioses Internos (Mente, Amor & Voluntad)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-3xl bg-[#090D18]/85 border border-amber-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-serif text-amber-300 font-semibold">☿ Mente y Verbo</span>
                  <span className="text-[10px] font-mono text-slate-400">Casa {innerGods.mercury.house}</span>
                </div>
                <h5 className="font-serif font-bold text-sm text-amber-100 mb-2">{innerGods.mercury.title}</h5>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">{innerGods.mercury.mentalProcess}</p>
                <span className="text-[11px] text-amber-400/90 font-serif italic block border-t border-white/5 pt-2">
                  {innerGods.mercury.communicationStyle}
                </span>
              </div>

              <div className="p-5 rounded-3xl bg-[#090D18]/85 border border-rose-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-serif text-rose-300 font-semibold">♀ Afecto y Estética</span>
                  <span className="text-[10px] font-mono text-slate-400">Casa {innerGods.venus.house}</span>
                </div>
                <h5 className="font-serif font-bold text-sm text-rose-100 mb-2">{innerGods.venus.title}</h5>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">{innerGods.venus.loveLanguage}</p>
                <span className="text-[11px] text-rose-400/90 font-serif italic block border-t border-white/5 pt-2">
                  {innerGods.venus.aestheticSense}
                </span>
              </div>

              <div className="p-5 rounded-3xl bg-[#090D18]/85 border border-orange-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-serif text-orange-300 font-semibold">♂ Impulso y Acción</span>
                  <span className="text-[10px] font-mono text-slate-400">Casa {innerGods.mars.house}</span>
                </div>
                <h5 className="font-serif font-bold text-sm text-orange-100 mb-2">{innerGods.mars.title}</h5>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">{innerGods.mars.drive}</p>
                <span className="text-[11px] text-orange-400/90 font-serif italic block border-t border-white/5 pt-2">
                  {innerGods.mars.conflictResolution}
                </span>
              </div>
            </div>
          </div>

          {/* 5. MAESTROS SOCIALES & VOCACIÓN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-[#090D18]/85 border border-amber-500/25">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-serif text-amber-400 font-semibold">♃ Júpiter · Expansión Sagrada</span>
                <span className="text-[10px] font-mono text-slate-400">Casa {socialMasters.jupiter.house}</span>
              </div>
              <h5 className="font-serif font-bold text-base text-amber-100 mb-2">{socialMasters.jupiter.title}</h5>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">{socialMasters.jupiter.blessings}</p>
              <p className="text-[11px] text-amber-300 font-serif italic">{socialMasters.jupiter.expansionStyle}</p>
            </div>

            <div className="p-6 rounded-3xl bg-[#090D18]/85 border border-indigo-500/25">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-serif text-indigo-300 font-semibold">♄ Saturno · Maestría & Tiempo</span>
                <span className="text-[10px] font-mono text-slate-400">Casa {socialMasters.saturn.house}</span>
              </div>
              <h5 className="font-serif font-bold text-base text-indigo-100 mb-2">{socialMasters.saturn.title}</h5>
              <p className="text-xs text-slate-300 leading-relaxed mb-2">{socialMasters.saturn.masteryLesson}</p>
              <p className="text-[11px] text-indigo-300 font-serif italic">{socialMasters.saturn.responsibility}</p>
            </div>
          </div>

          {/* 6. EJES KÁRMICOS & SANACIÓN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-[#090D18]/85 border border-amber-500/20">
              <div className="flex items-center gap-2 text-amber-400 font-serif font-semibold text-sm mb-1">
                <span>☊</span> {karmicAxes.northNode.title} (Casa {karmicAxes.northNode.house})
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{karmicAxes.northNode.mission}</p>
            </div>

            <div className="p-5 rounded-3xl bg-[#090D18]/85 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400 font-serif font-semibold text-sm mb-1">
                <span>⚷</span> {karmicAxes.chiron.title} (Casa {karmicAxes.chiron.house})
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{karmicAxes.chiron.medicine}</p>
            </div>

            <div className="p-5 rounded-3xl bg-[#090D18]/85 border border-rose-500/25">
              <div className="flex items-center gap-2 text-rose-300 font-serif font-semibold text-sm mb-1">
                <span>⚸</span> {karmicAxes.lilith.title} (Casa {karmicAxes.lilith.house})
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{karmicAxes.lilith.wildPower}</p>
            </div>
          </div>

          {/* 7. BALANCE ELEMENTAL */}
          <div className="p-6 rounded-3xl bg-[#090D18]/85 border border-amber-500/20">
            <div className="flex items-center justify-between mb-4 text-xs">
              <span className="font-serif font-semibold text-amber-200 text-sm">Alquimia de los 4 Elementos</span>
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
      )}

      {/* =========================================================================
          CONTENIDO MODO 2: VERSIÓN ASTRÓLOGO (TÉCNICA, MATEMÁTICA Y ORBES)
          ========================================================================= */}
      {viewMode === 'astrologer' && (
        <div className="space-y-6 animate-in fade-in duration-300 font-mono text-xs">
          {/* Parámetros Astronómicos Generales */}
          <div className="p-6 rounded-3xl bg-[#090D18]/90 border border-purple-500/30">
            <span className="text-[10px] uppercase tracking-widest text-purple-300 font-bold block mb-3 font-serif">
              ✦ Parámetros Astronómicos & Geocéntricos
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
              <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                <span className="text-slate-400 block text-[10px]">CÁLCULO</span>
                <span className="text-amber-200 font-bold">JPL Planetary ephemeris</span>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                <span className="text-slate-400 block text-[10px]">SISTEMA CASAS</span>
                <span className="text-purple-200 font-bold">Placidus</span>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                <span className="text-slate-400 block text-[10px]">COORDENADAS</span>
                <span className="text-slate-200">{chart.birthData.latitude}°, {chart.birthData.longitude}°</span>
              </div>
              <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                <span className="text-slate-400 block text-[10px]">ZONA HORARIA</span>
                <span className="text-slate-200">UTC {chart.birthData.timezoneOffsetHours >= 0 ? `+${chart.birthData.timezoneOffsetHours}` : chart.birthData.timezoneOffsetHours}</span>
              </div>
            </div>
          </div>

          {/* Tabla de 14 Cuerpos Celestes */}
          <div className="p-6 rounded-3xl bg-[#090D18]/90 border border-purple-500/30">
            <span className="text-[10px] uppercase tracking-widest text-purple-300 font-bold block mb-3 font-serif">
              ✦ Efemérides Matemáticas de los 14 Cuerpos Celestes
            </span>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="border-b border-purple-500/20 text-purple-300">
                    <th className="py-2">Cuerpo</th>
                    <th className="py-2">Signo</th>
                    <th className="py-2">Longitud</th>
                    <th className="py-2">Casa</th>
                    <th className="py-2">Velocidad</th>
                    <th className="py-2">Movimiento</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {chart.positions.map((pos) => {
                    const signData = ZODIAC_SIGNS.find((s) => s.name === pos.sign);
                    return (
                      <tr key={pos.body} className="hover:bg-white/5">
                        <td className="py-2 text-amber-100 font-bold">
                          <span className="mr-2 text-amber-400">{pos.symbol || BODY_SYMBOLS[pos.body]}</span>
                          {pos.body}
                        </td>
                        <td className="py-2 text-slate-200">
                          {signData?.symbol} {pos.sign}
                        </td>
                        <td className="py-2 text-slate-300">
                          {pos.degreeInSign}° {String(pos.minuteInSign).padStart(2, '0')}&apos; {String(pos.secondInSign).padStart(2, '0')}&quot;
                        </td>
                        <td className="py-2 text-purple-300 font-bold">Casa {pos.house}</td>
                        <td className="py-2 text-slate-400">{pos.speed.toFixed(3)}°/d</td>
                        <td className="py-2">
                          {pos.isRetrograde ? (
                            <span className="text-rose-400 font-bold bg-rose-500/20 px-1.5 py-0.5 rounded">Retrógrado</span>
                          ) : (
                            <span className="text-emerald-400 font-semibold">Directo</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cúspides de Casas */}
          <div className="p-6 rounded-3xl bg-[#090D18]/90 border border-purple-500/30">
            <span className="text-[10px] uppercase tracking-widest text-purple-300 font-bold block mb-3 font-serif">
              ✦ Cúspides de las 12 Casas Astrológicas (Placidus)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
              {chart.houses.map((house) => {
                const signData = ZODIAC_SIGNS.find((s) => s.name === house.sign);
                return (
                  <div key={house.houseNumber} className="p-2.5 bg-black/40 rounded-xl border border-white/5">
                    <span className="text-purple-300 font-bold block">Casa {house.houseNumber}</span>
                    <span className="text-slate-200">
                      {signData?.symbol} {house.sign} {house.degreeInSign}° {String(house.minuteInSign).padStart(2, '0')}&apos;
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Aspectos con Orbes Exactos */}
          <div className="p-6 rounded-3xl bg-[#090D18]/90 border border-purple-500/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase tracking-widest text-purple-300 font-bold font-serif">
                ✦ Matriz de Aspectos Planetarios ({chart.aspects.length})
              </span>
              <span className="text-[10px] text-slate-400">Tolerancia de Orbe: 0° a 8°</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              {chart.aspects.map((asp, idx) => (
                <div key={idx} className="p-2.5 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-amber-300 font-bold">{asp.body1}</span>
                    <span className="text-slate-400">↔</span>
                    <span className="text-amber-300 font-bold">{asp.body2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-semibold ${
                        asp.nature === 'harmonic'
                          ? 'text-emerald-400'
                          : asp.nature === 'tense'
                          ? 'text-rose-400'
                          : 'text-sky-400'
                      }`}
                    >
                      {asp.aspectType} ({asp.angle}°)
                    </span>
                    <span className="text-slate-400 text-[10px]">orb {asp.orb.toFixed(2)}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}