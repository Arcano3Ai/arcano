'use client';

import React, { useState } from 'react';
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
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
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

        <button
          type="button"
          onClick={() => setActiveTab('new')}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-serif font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
        >
          <span>✦</span> Calcular Otra Pareja
        </button>
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
  );
}
