'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BirthDataInput, SynastryReport } from '@/lib/astrology/types';
import { calculateSynastry } from '@/lib/astrology/synastry';
import SynastryForm from './SynastryForm';
import SynastryWheel from './SynastryWheel';
import SynastryReportView from './SynastryReportView';
import SynastryDossierUser from './SynastryDossierUser';
import SynastryDossierAstrologer from './SynastryDossierAstrologer';

export default function SynastryApp() {
  const [synastry, setSynastry] = useState<SynastryReport | null>(null);
  const [activeTab, setActiveTab] = useState<'wheel' | 'report' | 'new'>('wheel');
  const [isLoading, setIsLoading] = useState(false);
  const [dossierType, setDossierType] = useState<'user' | 'astrologer'>('user');
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);

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

  const handleDownloadDossier = (type: 'user' | 'astrologer') => {
    setDossierType(type);
    setIsDossierModalOpen(false);
    setTimeout(() => {
      window.print();
    }, 150);
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
            href="/carta-astral/"
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
              onClick={() => setIsDossierModalOpen(true)}
              className="px-5 py-2.5 rounded-2xl border border-amber-500/50 bg-amber-500/10 text-amber-200 text-xs font-serif font-semibold hover:bg-amber-500/20 shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all flex items-center gap-2 cursor-pointer"
              title="Descargar dossier de compatibilidad en PDF (Versión Pareja o Versión Astrólogo)"
            >
              <span>📥</span> Descargar Dossier PDF
            </button>
          </div>
        </div>

        {/* Modal Selector de Versión de Dossier */}
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
                  ✦ Dossier Oficial de Sinastría ✦
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 mt-1">
                  Elige la Versión del Reporte
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 font-light">
                  Selecciona el formato que mejor se adapte a tus necesidades de lectura o consulta.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* OPCIÓN 1: VERSIÓN PAREJA / USUARIO */}
                <div
                  onClick={() => handleDownloadDossier('user')}
                  className="p-5 rounded-2xl border border-rose-500/30 bg-gradient-to-b from-rose-500/10 to-transparent hover:border-rose-400 hover:bg-rose-500/15 cursor-pointer transition-all flex flex-col justify-between group text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">❤️</span>
                      <span className="text-[10px] uppercase font-serif px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold">
                        Recomendado para parejas
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-rose-100 group-hover:text-rose-300 transition-colors">
                      Versión para la Pareja (Letra Grande & Fácil de Leer)
                    </h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Diseñada con <strong>tipografía grande y lenguaje sencillo</strong> para que cualquier persona la comprenda sin tecnicismos. Explica cómo fluye su amor, el apoyo emocional mutuo y claves prácticas para convivir en armonía.
                    </p>
                    <ul className="text-[11px] text-slate-400 space-y-1 mt-3">
                      <li>✓ Letras grandes, claras y descansadas para la vista</li>
                      <li>✓ Explicación sencilla de emociones, carácter y química</li>
                      <li>✓ Rueda sagrada y porcentajes de afinidad</li>
                      <li>✓ 3 Reglas de oro para la felicidad en pareja</li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 text-white font-serif font-bold text-xs uppercase tracking-wider group-hover:brightness-110 shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all"
                  >
                    Descargar Versión Pareja (Letra Grande)
                  </button>
                </div>

                {/* OPCIÓN 2: VERSIÓN ASTRÓLOGO / PROFESIONAL */}
                <div
                  onClick={() => handleDownloadDossier('astrologer')}
                  className="p-5 rounded-2xl border border-sky-500/30 bg-gradient-to-b from-sky-500/10 to-transparent hover:border-sky-400 hover:bg-sky-500/15 cursor-pointer transition-all flex flex-col justify-between group text-left"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">🪐</span>
                      <span className="text-[10px] uppercase font-serif px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold">
                        Técnico & Exhaustivo
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-sky-100 group-hover:text-sky-300 transition-colors">
                      Versión para el Astrólogo
                    </h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Diseñado para astrólogos y consultas profesionales. Coordenadas natales exactas, efemérides completas grado/minuto, orbes matemáticos y matriz de aspectos.
                    </p>
                    <ul className="text-[11px] text-slate-400 space-y-1 mt-3">
                      <li>✓ Coordenadas geográficas y UTC</li>
                      <li>✓ Efemérides de los 13 cuerpos celestes</li>
                      <li>✓ Cúspides comparadas de las 12 casas</li>
                      <li>✓ Matriz integral con orbes y geometría</li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-sky-700 text-white font-serif font-bold text-xs uppercase tracking-wider group-hover:brightness-110 shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all"
                  >
                    Descargar Versión Astrólogo
                  </button>
                </div>
              </div>

              <p className="text-center text-[11px] text-slate-400 mt-5 font-light">
                Ambas versiones se optimizan en formato A4 listo para imprimir o guardar como archivo PDF.
              </p>
            </div>
          </div>
        )}

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
          Renderiza de forma precisa la versión seleccionada por el usuario
          ========================================================================= */}
      <div className="hidden print:block print-dossier">
        {dossierType === 'user' ? (
          <SynastryDossierUser synastry={synastry} />
        ) : (
          <SynastryDossierAstrologer synastry={synastry} />
        )}
      </div>
    </div>
  );
}
