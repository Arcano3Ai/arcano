'use client';

import React, { useState } from 'react';
import { BirthDataInput, NatalChartData, PlanetaryPosition } from '@/lib/astrology/types';
import { calculateNatalChart } from '@/lib/astrology/engine';
import BirthChartForm from './BirthChartForm';
import NatalWheel from './NatalWheel';
import PlanetTable from './PlanetTable';
import AspectGrid from './AspectGrid';
import NatalReportView from './NatalReportView';

export default function NatalChartApp() {
  // Starts with null so the user creates their first chart directly
  const [chart, setChart] = useState<NatalChartData | null>(null);
  const [activeTab, setActiveTab] = useState<'wheel' | 'report' | 'tables' | 'new'>('wheel');
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetaryPosition | null>(null);
  const [isRecalculating, setIsRecalculating] = useState(false);

  const handleFormSubmit = (data: BirthDataInput) => {
    setIsRecalculating(true);
    setTimeout(() => {
      const result = calculateNatalChart(data);
      setChart(result);
      setSelectedPlanet(null);
      setActiveTab('wheel');
      setIsRecalculating(false);

      // Scroll smoothly to top of chart on mobile/desktop
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }, 250);
  };

  const handlePrint = () => {
    window.print();
  };

  // 1. ESTADO INICIAL: CREAR LA PRIMERA CARTA
  if (!chart) {
    return (
      <div className="w-full space-y-10">
        {/* Hero explicativo de bienvenida */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-serif uppercase tracking-widest mb-4">
            <span>✦</span> Cálculo Astronómico de Efemérides (JPL)
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-amber-100 mb-3">
            Traza el Mapa de tu Alma
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Ingresa tu fecha, hora exacta y ciudad natal. Nuestro motor astronómico calculará al segundo de arco la posición de tus 14 cuerpos celestes, tus 12 casas y la geometría sagrada de tus aspectos.
          </p>
        </div>

        {/* Formulario de primera creación */}
        <BirthChartForm onSubmit={handleFormSubmit} isLoading={isRecalculating} />

        {/* Pilares de la consulta */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-6 border-t border-amber-500/10 text-center">
          <div className="p-4 rounded-2xl bg-[#090D18]/50 border border-amber-500/10">
            <span className="text-2xl text-amber-400 block mb-2">❂</span>
            <h4 className="font-serif font-bold text-sm text-amber-100 mb-1">Rueda Vectorial SVG</h4>
            <p className="text-xs text-slate-400">
              Visualización interactiva con anti-colisión de planetas, orbes y grados precisos.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#090D18]/50 border border-amber-500/10">
            <span className="text-2xl text-amber-400 block mb-2">📜</span>
            <h4 className="font-serif font-bold text-sm text-amber-100 mb-1">Informe Arquetípico</h4>
            <p className="text-xs text-slate-400">
              Lectura profunda de la Tríada, planetas personales, Nodos kármicos y Quirón.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-[#090D18]/50 border border-amber-500/10">
            <span className="text-2xl text-amber-400 block mb-2">☌</span>
            <h4 className="font-serif font-bold text-sm text-amber-100 mb-1">Matriz de Aspectos</h4>
            <p className="text-xs text-slate-400">
              Grilla triangular idéntica al estándar profesional de Astro-Seek con orbes en tiempo real.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. ESTADO POST-CÁLCULO: CARTA GENERADA CON OPCIÓN DE CREAR OTRA
  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
      {/* Header Info Banner */}
      <div className="bg-[#090D18]/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
            <span>✦ Carta Natal Calculada</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 font-mono">
              {chart.birthData.day}/{chart.birthData.month}/{chart.birthData.year}{' '}
              {String(chart.birthData.hour).padStart(2, '0')}:{String(chart.birthData.minute).padStart(2, '0')}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
            {chart.birthData.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Lugar: <strong className="text-amber-300 font-normal">{chart.birthData.cityName}</strong> • Casas:{' '}
            <span className="capitalize">{chart.birthData.houseSystem}</span> •{' '}
            {chart.aspects.length} aspectos celestes activos
          </p>
        </div>

        {/* Acciones principales: Calcular Otra Carta & Imprimir */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Botón principal para calcular otra carta */}
          <button
            type="button"
            onClick={() => setActiveTab('new')}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-serif font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>✦</span> Calcular Otra Carta
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-2xl border border-amber-500/40 text-amber-300 text-xs font-serif hover:bg-amber-500/10 transition-colors flex items-center gap-2"
          >
            <span>🖨</span> Imprimir / Guardar
          </button>
        </div>
      </div>

      {/* Tríada Rápida en Banner */}
      <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto">
        <div className="bg-black/40 border border-amber-500/20 px-3 py-2 rounded-2xl text-center">
          <span className="text-[10px] text-amber-400 uppercase tracking-wider block">Sol</span>
          <span className="font-serif text-amber-100 font-bold text-sm">
            {chart.positions.find(p => p.body === 'Sol')?.sign}
          </span>
        </div>
        <div className="bg-black/40 border border-indigo-500/20 px-3 py-2 rounded-2xl text-center">
          <span className="text-[10px] text-indigo-300 uppercase tracking-wider block">Luna</span>
          <span className="font-serif text-indigo-100 font-bold text-sm">
            {chart.positions.find(p => p.body === 'Luna')?.sign}
          </span>
        </div>
        <div className="bg-black/40 border border-purple-500/20 px-3 py-2 rounded-2xl text-center">
          <span className="text-[10px] text-purple-300 uppercase tracking-wider block">Ascendente</span>
          <span className="font-serif text-purple-100 font-bold text-sm">
            {chart.angles.ascSign}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 border-b border-amber-500/20 pb-4">
        {[
          { id: 'wheel', label: 'Rueda Astral & Aspectos', icon: '❂' },
          { id: 'report', label: 'Informe Arquetípico Completo', icon: '📜' },
          { id: 'tables', label: 'Posiciones y Casas', icon: '☿' },
          { id: 'new', label: '✦ Calcular Otra Carta', icon: '✨' },
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 sm:px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-serif transition-all flex items-center gap-2 ${
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

      {/* Main Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'wheel' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            {/* Interactive SVG Wheel */}
            <div className="bg-[#060911]/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-4 sm:p-8 shadow-2xl">
              <NatalWheel
                chart={chart}
                selectedPlanet={selectedPlanet}
                onSelectPlanet={setSelectedPlanet}
              />
            </div>

            {/* Aspect Grid below Wheel */}
            <AspectGrid
              positions={chart.positions}
              aspects={chart.aspects}
            />
          </div>
        )}

        {activeTab === 'report' && (
          <div className="animate-in fade-in duration-300">
            <NatalReportView chart={chart} />
          </div>
        )}

        {activeTab === 'tables' && (
          <div className="animate-in fade-in duration-300">
            <PlanetTable
              positions={chart.positions}
              houses={chart.houses}
              selectedPlanet={selectedPlanet}
              onSelectPlanet={p => {
                setSelectedPlanet(p);
                setActiveTab('wheel');
              }}
            />
          </div>
        )}

        {activeTab === 'new' && (
          <div className="animate-in fade-in duration-300 space-y-6">
            <div className="flex items-center justify-between max-w-xl mx-auto">
              <h3 className="font-serif font-bold text-amber-200 text-lg">Calcular Nueva Carta Astral</h3>
              <button
                type="button"
                onClick={() => setActiveTab('wheel')}
                className="text-xs text-slate-400 hover:text-amber-300 underline font-sans"
              >
                ← Volver a la carta actual
              </button>
            </div>
            <BirthChartForm onSubmit={handleFormSubmit} isLoading={isRecalculating} />
          </div>
        )}
      </div>
    </div>
  );
}
