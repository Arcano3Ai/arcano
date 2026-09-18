'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BirthDataInput, SynastryReport } from '@/lib/astrology/types';
import { calculateSynastry } from '@/lib/astrology/synastry';
import SynastryForm from './SynastryForm';
import SynastryWheel from './SynastryWheel';
import SynastryReportView from './SynastryReportView';

export default function SynastryApp() {
  const [synastry, setSynastry] = useState<SynastryReport | null>(null);
  const [activeTab, setActiveTab] = useState<'wheel' | 'report' | 'new'>('wheel');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (dataA: BirthDataInput, dataB: BirthDataInput) => {
    setIsLoading(true);
    setTimeout(() => {
      const report = calculateSynastry(dataA, dataB);
      setSynastry(report);
      setActiveTab('wheel');
      setIsLoading(false);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }, 300);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!synastry) {
    return (
      <div className="w-full space-y-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-serif uppercase tracking-widest mb-4">
            <span>✦</span> Alquimia de Vínculos & Astrología Relacional
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100 mb-3">
            Calculadora de Sinastría y Compatibilidad
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Descubre la danza cósmica entre dos seres. Cruza las posiciones exactas de ambas cartas natales para develar su química, complicidad mental, retos kármicos y destino compartido.
          </p>
        </div>

        <SynastryForm onSubmit={handleSubmit} isLoading={isLoading} />

        {/* Banner de interconexión con Carta Astral */}
        <div className="max-w-4xl mx-auto p-6 rounded-3xl bg-gradient-to-r from-sky-500/10 via-[#0A0E1A] to-amber-500/10 border border-sky-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[11px] font-serif uppercase tracking-wider text-sky-300 font-semibold block">
              Cartografía Individual
            </span>
            <h4 className="font-serif font-bold text-sky-100 text-base">
              ¿Deseas calcular tu Carta Natal individual primero?
            </h4>
            <p className="text-xs text-slate-300">
              Conoce tu Tríada (Sol, Luna y Ascendente) y tus 12 casas astrológicas.
            </p>
          </div>
          <Link
            href="/carta-astral"
            className="px-5 py-2.5 rounded-xl border border-sky-400 text-sky-200 text-xs font-serif hover:bg-sky-400/10 transition-colors whitespace-nowrap"
          >
            Ir a Carta Astral →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
      {/* SECCIÓN VISIBLE EN PANTALLA (NO-PRINT) */}
      <div className="print:hidden space-y-8">
        {/* Header Banner */}
        <div className="bg-[#090D18]/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
              <span>✦ Sinastría de Almas Calculada</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              {synastry.chartA.birthData.name} & {synastry.chartB.birthData.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {synastry.crossAspects.length} aspectos cruzados detectados • Afinidad general:{' '}
              <strong className="text-amber-300">{synastry.scores.overall}%</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('new')}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-serif font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>✦</span> Calcular Otra Pareja
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-2xl border border-amber-500/50 bg-amber-500/10 text-amber-200 text-xs font-serif font-semibold hover:bg-amber-500/20 shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all flex items-center gap-2"
              title="Descargar o imprimir reporte de compatibilidad en PDF"
            >
              <span>📥</span> Descargar Dossier PDF
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-amber-500/20 pb-4">
          {[
            { id: 'wheel', label: 'Rueda Doble (Bi-Wheel)', icon: '❂' },
            { id: 'report', label: 'Informe de Compatibilidad', icon: '📜' },
            { id: 'new', label: '✦ Calcular Otra Pareja', icon: '✨' },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-serif transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-500/25 to-amber-500/10 border border-amber-400 text-amber-100 shadow-[0_0_15px_rgba(212,175,55,0.25)] font-bold'
                  : 'text-slate-400 hover:text-amber-200 hover:bg-white/[0.03] border border-transparent'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[500px]">
          {activeTab === 'wheel' && (
            <div className="bg-[#060911]/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-4 sm:p-8 shadow-2xl">
              <SynastryWheel synastry={synastry} />
            </div>
          )}

          {activeTab === 'report' && (
            <SynastryReportView synastry={synastry} />
          )}

          {activeTab === 'new' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between max-w-4xl mx-auto">
                <h3 className="font-serif font-bold text-amber-200 text-lg">Calcular Nueva Compatibilidad</h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('wheel')}
                  className="text-xs text-slate-400 hover:text-amber-300 underline font-sans"
                >
                  ← Volver a la sinastría actual
                </button>
              </div>
              <SynastryForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          )}
        </div>
      </div>

      {/* =========================================================================
          SECCIÓN EXCLUSIVA DE IMPRESIÓN Y EXPORTACIÓN A PDF (DOSSIER SINASTRÍA)
          ========================================================================= */}
      {/* =========================================================================
          SECCIÓN EXCLUSIVA DE IMPRESIÓN Y EXPORTACIÓN A PDF (DOSSIER SINASTRÍA)
          ========================================================================= */}
      <div className="hidden print:block print-dossier">
        {/* PÁGINA 1: PORTADA EDITORIAL A4 EXACTA */}
        <div className="print-cover-page border border-amber-500/40 rounded-3xl p-6 bg-[#0B0F1C] text-center">
          {/* Membrete y Título */}
          <div className="space-y-1">
            <span className="text-amber-400 text-[10px] uppercase tracking-[0.35em] font-serif block">
              ✦ ARCANO · DOSSIER DE SINASTRÍA SAGRADA ✦
            </span>
            <h1 className="text-2xl font-serif font-bold text-amber-100">
              {synastry.chartA.birthData.name} & {synastry.chartB.birthData.name}
            </h1>
            <p className="text-[11px] text-slate-300">
              {synastry.chartA.birthData.name} ({synastry.chartA.birthData.cityName}, {synastry.chartA.birthData.day}/{synastry.chartA.birthData.month}/{synastry.chartA.birthData.year}) • {synastry.chartB.birthData.name} ({synastry.chartB.birthData.cityName}, {synastry.chartB.birthData.day}/{synastry.chartB.birthData.month}/{synastry.chartB.birthData.year})
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 rounded-xl border border-amber-500/30 mt-1">
              <span className="text-xs font-serif text-amber-300 font-bold">
                Afinidad Global: {synastry.scores.overall}%
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-[10px] text-slate-300">
                {synastry.crossAspects.length} aspectos cruzados
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-[10px] text-amber-400 font-serif">
                Arcano: {synastry.relationalArcanum.name}
              </span>
            </div>
          </div>

          {/* Rueda Bi-Wheel en SVG (Escalada para caber perfecta en Portada) */}
          <div className="py-2 flex justify-center items-center">
            <SynastryWheel synastry={synastry} />
          </div>

          {/* 4 Dimensiones en Portada */}
          <div className="grid grid-cols-4 gap-2.5 pt-3 border-t border-amber-500/20 text-center">
            <div className="p-2 bg-black/40 rounded-xl border border-rose-500/20">
              <span className="text-[9px] text-rose-300 block font-serif">Pasión</span>
              <span className="text-base font-bold text-rose-400 font-mono">{synastry.scores.chemistry}%</span>
            </div>
            <div className="p-2 bg-black/40 rounded-xl border border-sky-500/20">
              <span className="text-[9px] text-sky-300 block font-serif">Diálogo</span>
              <span className="text-base font-bold text-sky-400 font-mono">{synastry.scores.communication}%</span>
            </div>
            <div className="p-2 bg-black/40 rounded-xl border border-amber-500/20">
              <span className="text-[9px] text-amber-300 block font-serif">Estabilidad</span>
              <span className="text-base font-bold text-amber-400 font-mono">{synastry.scores.stability}%</span>
            </div>
            <div className="p-2 bg-black/40 rounded-xl border border-purple-500/20">
              <span className="text-[9px] text-purple-300 block font-serif">Lazo Álmico</span>
              <span className="text-base font-bold text-purple-400 font-mono">{synastry.scores.soulConnection}%</span>
            </div>
          </div>

          {/* Pie de Portada */}
          <div className="text-center pt-2 border-t border-amber-500/10 text-[9px] text-slate-400 font-serif">
            ARCANO · Dossier Astrológico Relacional · www.arcanosolutions.com
          </div>
        </div>

        {/* PÁGINA 2: INFORME DE COMPATIBILIDAD ALQUÍMICA (SALTO DE PÁGINA) */}
        <div className="print-page-break space-y-6 pt-4">
          <div className="border border-amber-500/30 rounded-3xl p-6 bg-[#0B0F1C]">
            <SynastryReportView synastry={synastry} />
          </div>

          <div className="text-center pt-4 border-t border-amber-500/20 text-[10px] text-slate-400 font-serif">
            ARCANO · Santuario de Sabiduría y Simbolismo Arquetípico · www.arcanosolutions.com
          </div>
        </div>
      </div>
    </div>
  );
}
