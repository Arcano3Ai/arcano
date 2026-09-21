'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BirthDataInput, NatalChartData, PlanetaryPosition } from '@/lib/astrology/types';
import { calculateNatalChart } from '@/lib/astrology/engine';
import BirthChartForm from './BirthChartForm';
import NatalWheel from './NatalWheel';
import PlanetTable from './PlanetTable';
import AspectGrid from './AspectGrid';
import NatalReportView from './NatalReportView';
import NatalDossierUser from './NatalDossierUser';
import NatalDossierAstrologer from './NatalDossierAstrologer';

export default function NatalChartApp() {
  const [chart, setChart] = useState<NatalChartData | null>(null);
  const [activeTab, setActiveTab] = useState<'wheel' | 'report' | 'tables' | 'new'>('wheel');
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetaryPosition | null>(null);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [dossierType, setDossierType] = useState<'user' | 'astrologer'>('user');
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);

  const handleFormSubmit = (data: BirthDataInput) => {
    setIsRecalculating(true);
    setTimeout(() => {
      const result = calculateNatalChart(data);
      setChart(result);
      setSelectedPlanet(null);
      setActiveTab('wheel');
      setIsRecalculating(false);

      window.scrollTo({ top: 180, behavior: 'smooth' });
    }, 250);
  };

  const handleDownloadDossier = (type: 'user' | 'astrologer') => {
    setDossierType(type);
    setIsDossierModalOpen(false);

    // Garantizar aislamiento total de modo claro: el PDF siempre es fondo cósmico oscuro de lujo
    const html = document.documentElement;
    const body = document.body;
    const wasLight = html.classList.contains('light') || body.classList.contains('light');
    if (wasLight) {
      html.classList.remove('light');
      body.classList.remove('light');
    }

    setTimeout(() => {
      window.print();
      // Restaurar modo claro después de imprimir si estaba activo
      if (wasLight) {
        html.classList.add('light');
        body.classList.add('light');
      }
    }, 200);
  };

  // 1. ESTADO INICIAL: CREAR LA PRIMERA CARTA
  if (!chart) {
    return (
      <div className="w-full space-y-10">
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

        <BirthChartForm onSubmit={handleFormSubmit} isLoading={isRecalculating} />

        {/* Banner de interconexión con Sinastría */}
        <div className="max-w-4xl mx-auto p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#0A0E1A] to-sky-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[11px] font-serif uppercase tracking-wider text-amber-300 font-semibold block">
              Astrología Relacional
            </span>
            <h4 className="font-serif font-bold text-amber-100 text-base">
              ¿Deseas evaluar la compatibilidad con tu pareja?
            </h4>
            <p className="text-xs text-slate-300">
              Cruza dos cartas natales con nuestra Rueda Doble (Bi-Wheel) y análisis de química.
            </p>
          </div>
          <Link
            href="/sinastria/"
            className="px-5 py-2.5 rounded-xl border border-amber-400 text-amber-200 text-xs font-serif hover:bg-amber-400/10 transition-colors whitespace-nowrap"
          >
            Ir a Sinastría →
          </Link>
        </div>

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
            <span className="text-2xl text-amber-400 block mb-2">📥</span>
            <h4 className="font-serif font-bold text-sm text-amber-100 mb-1">Dossier Editorial PDF</h4>
            <p className="text-xs text-slate-400">
              Exportación imprimible en formato A4 con diseño de libro ceremonial en alta resolución.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. ESTADO PRINCIPAL: CARTA CALCULADA Y VISTA INTERACTIVA
  return (
    <div className="w-full space-y-8">
      {/* SECCIÓN VISIBLE EN PANTALLA (NO-PRINT) */}
      <div className="print:hidden space-y-8">
        {/* Cabecera de la Carta Activa */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-[#080C16] border border-amber-500/20 backdrop-blur-xl shadow-2xl">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-serif uppercase tracking-widest mb-1.5">
              <span>✦</span> Carta Natal Activa
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100">
              {chart.birthData.name}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Nacimiento: {chart.birthData.day}/{chart.birthData.month}/{chart.birthData.year} a las{' '}
              {String(chart.birthData.hour).padStart(2, '0')}:{String(chart.birthData.minute).padStart(2, '0')} hs •{' '}
              {chart.birthData.cityName}
            </p>
          </div>

          {/* Acciones principales: Calcular Otra Carta & Imprimir / Descargar */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('new')}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-serif font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>✦</span> Calcular Otra Carta
            </button>

            <button
              type="button"
              onClick={() => setIsDossierModalOpen(true)}
              className="px-5 py-2.5 rounded-2xl border border-amber-500/50 bg-amber-500/10 text-amber-200 text-xs font-serif font-semibold hover:bg-amber-500/20 shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all flex items-center gap-2"
              title="Descargar dossier en PDF (Versión Fácil o Versión Astrólogo)"
            >
              <span>📥</span> Descargar Dossier PDF
            </button>
          </div>
        </div>

        {/* Modal de Selección de Formato Dossier PDF */}
        {isDossierModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl bg-[#090D18] border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
              {/* Botón Cerrar */}
              <button
                type="button"
                onClick={() => setIsDossierModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
                title="Cerrar modal"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-amber-400 font-semibold block">
                  ✦ Dossier Oficial de Carta Astral ✦
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 mt-1">
                  Elige la Versión del Reporte
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 font-light">
                  Selecciona el formato de exportación PDF que mejor se adapte a tu lectura o archivo profesional.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* OPCIÓN 1: VERSIÓN FÁCIL / CONSULTANTE */}
                <div
                  onClick={() => handleDownloadDossier('user')}
                  className="p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 to-transparent hover:border-amber-400 hover:bg-amber-500/15 cursor-pointer transition-all flex flex-col justify-between group text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">🌟</span>
                      <span className="text-[10px] uppercase font-serif px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                        Para el Consultante
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-amber-100 group-hover:text-amber-200">
                      Versión Fácil (Para Ti)
                    </h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Interpretación clara en letra grande: Tríada de Identidad (Sol, Luna, Ascendente), Arcano de Nacimiento, tus 4 Dones Cósmicos y Misión de Vida sin tecnicismos complejos.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-4 w-full py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs font-serif font-semibold group-hover:bg-amber-500 group-hover:text-black transition-colors"
                  >
                    Descargar Versión Fácil →
                  </button>
                </div>

                {/* OPCIÓN 2: VERSIÓN ASTRÓLOGO */}
                <div
                  onClick={() => handleDownloadDossier('astrologer')}
                  className="p-5 rounded-2xl border border-purple-500/30 bg-gradient-to-b from-purple-500/10 to-transparent hover:border-purple-400 hover:bg-purple-500/15 cursor-pointer transition-all flex flex-col justify-between group text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">📜</span>
                      <span className="text-[10px] uppercase font-serif px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold">
                        Nivel Profesional
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-purple-100 group-hover:text-purple-200">
                      Versión Astrólogo (Técnica)
                    </h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Efemérides matemáticas de los 14 cuerpos al segundo de arco, tabla de las 12 casas (Placidus), matriz de aspectos con orbes exactos y balance ponderado.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-4 w-full py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-200 text-xs font-serif font-semibold group-hover:bg-purple-500 group-hover:text-black transition-colors"
                  >
                    Descargar Versión Técnica →
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center text-[11px] text-slate-400 border-t border-white/10 pt-4 font-serif">
                Ambas versiones se optimizan en fondo cósmico oscuro `#0B0F1C` de lujo para guardar o imprimir en PDF formato A4 sin orillas blancas.
              </div>
            </div>
          </div>
        )}

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
            { id: 'report', label: 'Informe Arquetípico', icon: '📜' },
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
              <div className="bg-[#060911]/80 backdrop-blur-xl border border-amber-500/20 rounded-3xl p-4 sm:p-8 shadow-2xl">
                <NatalWheel
                  chart={chart}
                  selectedPlanet={selectedPlanet}
                  onSelectPlanet={setSelectedPlanet}
                />
              </div>

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

      {/* =========================================================================
          SECCIÓN EXCLUSIVA DE IMPRESIÓN Y EXPORTACIÓN A PDF (DOSSIER EDITORIAL)
          ========================================================================= */}
      <div className="hidden print:block print-dossier">
        {dossierType === 'user' ? (
          <NatalDossierUser chart={chart} />
        ) : (
          <NatalDossierAstrologer chart={chart} />
        )}
      </div>
    </div>
  );
}