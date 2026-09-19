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
          PÁGINA 1: PORTADA CEREMONIAL, RUEDA SAGRADA Y PILARES DEL AMOR
          (Tipografía grande, limpia, espaciosa y sin saturación)
          ========================================================================= */}
      <div className="print-cover-page border-2 border-amber-500/40 rounded-3xl p-8 bg-[#0B0F1C] text-center flex flex-col justify-between">
        {/* Cabecera Principal */}
        <div className="space-y-2 pt-2">
          <span className="text-amber-400 text-xs uppercase tracking-[0.35em] font-serif font-bold block">
            ✦ ARCANO · DOSSIER DE COMPATIBILIDAD DE PAREJA ✦
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100 tracking-wide">
            {chartA.birthData.name} & {chartB.birthData.name}
          </h1>
          <p className="text-sm text-slate-300 font-light">
            Lectura esencial del vínculo sagrado calculada a partir de sus cartas natales
          </p>

          {/* Gran Distintivo de Afinidad Cósmica */}
          <div className="inline-flex items-center gap-4 px-6 py-2 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 rounded-2xl border border-amber-500/40 mt-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <span className="text-base font-serif text-slate-200">
              Afinidad Cósmica Global:
            </span>
            <span className="text-2xl font-serif font-bold text-amber-300 font-mono">
              {scores.overall}%
            </span>
          </div>
        </div>

        {/* Rueda Sagrada Bi-Wheel */}
        <div className="py-2 flex justify-center items-center">
          <SynastryWheel synastry={synastry} />
        </div>

        {/* Los 4 Pilares Fundamentales de la Relación (Letra Grande y Clara) */}
        <div className="grid grid-cols-4 gap-3 pt-4 border-t border-amber-500/30 text-center">
          <div className="p-3 bg-black/50 rounded-2xl border border-rose-500/30">
            <span className="text-xs text-rose-300 block font-serif font-bold uppercase tracking-wider mb-1">
              Pasión & Deseo
            </span>
            <span className="text-2xl font-bold text-rose-400 font-mono">{scores.chemistry}%</span>
            <span className="text-[11px] text-slate-300 block mt-1">Atracción física</span>
          </div>
          <div className="p-3 bg-black/50 rounded-2xl border border-sky-500/30">
            <span className="text-xs text-sky-300 block font-serif font-bold uppercase tracking-wider mb-1">
              Diálogo & Mente
            </span>
            <span className="text-2xl font-bold text-sky-400 font-mono">{scores.communication}%</span>
            <span className="text-[11px] text-slate-300 block mt-1">Complicidad verbal</span>
          </div>
          <div className="p-3 bg-black/50 rounded-2xl border border-amber-500/30">
            <span className="text-xs text-amber-300 block font-serif font-bold uppercase tracking-wider mb-1">
              Estabilidad
            </span>
            <span className="text-2xl font-bold text-amber-400 font-mono">{scores.stability}%</span>
            <span className="text-[11px] text-slate-300 block mt-1">Hogar y futuro</span>
          </div>
          <div className="p-3 bg-black/50 rounded-2xl border border-purple-500/30">
            <span className="text-xs text-purple-300 block font-serif font-bold uppercase tracking-wider mb-1">
              Lazo de Almas
            </span>
            <span className="text-2xl font-bold text-purple-400 font-mono">{scores.soulConnection}%</span>
            <span className="text-[11px] text-slate-300 block mt-1">Destino compartido</span>
          </div>
        </div>

        {/* Arcano Mayor Protector del Vínculo */}
        <div className="p-4 bg-gradient-to-r from-amber-500/15 via-[#090D18] to-amber-500/15 rounded-2xl border border-amber-500/40 text-left flex items-center gap-5">
          <div className="w-16 h-20 rounded-xl border-2 border-amber-400/60 bg-black/70 flex flex-col items-center justify-center text-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            <span className="text-xs font-mono text-amber-400 font-bold">ARCANO</span>
            <span className="text-xl font-serif font-bold text-amber-200">{relationalArcanum.cardNumber}</span>
            <span className="text-[9px] uppercase tracking-tighter text-slate-200 font-serif line-clamp-1 px-1">{relationalArcanum.name}</span>
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-serif font-bold">
                ✦ Arcano Regente: {relationalArcanum.name} ({relationalArcanum.archetype})
              </span>
            </div>
            <p className="text-sm text-amber-100 font-serif italic leading-relaxed">
              &quot;{relationalArcanum.counsel}&quot;
            </p>
          </div>
        </div>

        {/* Pie de Portada */}
        <div className="text-center pt-2 border-t border-amber-500/20 text-xs text-slate-400 font-serif">
          ARCANO · Dossier de Compatibilidad y Sabiduría Relacional · www.arcanosolutions.com
        </div>
      </div>

      {/* =========================================================================
          PÁGINA 2: LAS 4 GRANDES DINÁMICAS DE LA VIDA EN PAREJA
          (Letras grandes, explicaciones humanas, comprensibles sin tecnicismos)
          ========================================================================= */}
      <div className="print-page-break space-y-6 pt-6">
        {/* Cabecera Página 2 */}
        <div className="border border-amber-500/30 rounded-3xl p-6 bg-[#0B0F1C] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-serif font-bold block mb-1">
              ✦ GUÍA CLARA DE CONVIVENCIA ✦
            </span>
            <h2 className="text-2xl font-serif font-bold text-amber-100">
              Cómo Funciona su Amor en el Día a Día
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Explicación sencilla de cómo se acoplan sus caracteres, emociones, deseos y proyectos
            </p>
          </div>
          <div className="px-4 py-2 bg-amber-500/15 border border-amber-500/30 rounded-2xl font-serif font-bold text-amber-200 text-sm whitespace-nowrap">
            {chartA.birthData.name} & {chartB.birthData.name}
          </div>
        </div>

        {/* Resumen General en Letra Amplia */}
        <div className="p-5 rounded-3xl bg-[#090D18]/95 border border-amber-500/25">
          <span className="text-xs uppercase font-serif tracking-wider text-amber-400 font-bold block mb-2">
            ✦ Resumen de su Conexión:
          </span>
          <p className="text-sm text-slate-200 leading-relaxed font-light">
            {overview}
          </p>
        </div>

        {/* Las 4 Dinámicas en Tarjetas Grandes y Espaciosas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Dinámica 1: Personalidad */}
          <div className="p-5 rounded-3xl bg-[#090D18]/90 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">☀️</span>
                <span className="text-base font-serif font-bold text-amber-300">
                  Personalidad & Metas
                </span>
              </div>
              <span className="text-xs font-serif font-semibold text-amber-300 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30">
                {sunDynamic.verdict}
              </span>
            </div>
            <h4 className="text-sm font-serif font-bold text-amber-100">
              {sunDynamic.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              {sunDynamic.description}
            </p>
          </div>

          {/* Dinámica 2: Emociones y Hogar */}
          <div className="p-5 rounded-3xl bg-[#090D18]/90 border border-indigo-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌙</span>
                <span className="text-base font-serif font-bold text-indigo-300">
                  Emociones & Cuidado Mutuo
                </span>
              </div>
              <span className="text-xs font-serif font-semibold text-indigo-300 bg-indigo-500/15 px-3 py-1 rounded-full border border-indigo-500/30">
                {moonDynamic.verdict}
              </span>
            </div>
            <h4 className="text-sm font-serif font-bold text-indigo-100">
              {moonDynamic.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              {moonDynamic.description}
            </p>
          </div>

          {/* Dinámica 3: Química y Romance */}
          <div className="p-5 rounded-3xl bg-[#090D18]/90 border border-rose-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💖</span>
                <span className="text-base font-serif font-bold text-rose-300">
                  Atracción, Química & Romance
                </span>
              </div>
              <span className="text-xs font-serif font-semibold text-rose-300 bg-rose-500/15 px-3 py-1 rounded-full border border-rose-500/30">
                {eroticChemistry.verdict}
              </span>
            </div>
            <h4 className="text-sm font-serif font-bold text-rose-100">
              {eroticChemistry.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              {eroticChemistry.description}
            </p>
          </div>

          {/* Dinámica 4: Madurez y Destino */}
          <div className="p-5 rounded-3xl bg-[#090D18]/90 border border-purple-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧭</span>
                <span className="text-base font-serif font-bold text-purple-300">
                  Crecimiento & Proyecto de Vida
                </span>
              </div>
              <span className="text-xs font-serif font-semibold text-purple-300 bg-purple-500/15 px-3 py-1 rounded-full border border-purple-500/30">
                {karmicDestiny.verdict}
              </span>
            </div>
            <h4 className="text-sm font-serif font-bold text-purple-100">
              {karmicDestiny.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
              {karmicDestiny.description}
            </p>
          </div>
        </div>

        {/* Pie Página 2 */}
        <div className="text-center pt-3 border-t border-amber-500/20 text-xs text-slate-400 font-serif">
          Página 2 · Dinámicas Cotidianas · ARCANO
        </div>
      </div>

      {/* =========================================================================
          PÁGINA 3: DONES, RETOS COTIDIANOS Y LAS 3 REGLAS DE ORO
          (Letras grandes, muy fácil de asimilar y aplicar)
          ========================================================================= */}
      <div className="print-page-break space-y-6 pt-6">
        {/* Cabecera Página 3 */}
        <div className="border border-amber-500/30 rounded-3xl p-6 bg-[#0B0F1C] text-center">
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-serif font-bold block mb-1">
            ✦ CLAVES PARA CUIDAR SU RELACIÓN ✦
          </span>
          <h2 className="text-2xl font-serif font-bold text-amber-100">
            Dones Compartidos & Consejos Prácticos de Convivencia
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl mx-auto">
            Herramientas sencillas para aprovechar lo que fluye naturalmente y transformar las fricciones en unión.
          </p>
        </div>

        {/* Dones y Retos en 2 Grandes Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Lo que fluye */}
          <div className="p-6 rounded-3xl bg-[#090D18]/95 border-2 border-emerald-500/30 space-y-4">
            <h3 className="font-serif font-bold text-emerald-300 text-lg flex items-center gap-2 border-b border-emerald-500/20 pb-2">
              <span className="text-xl">✨</span> Lo Más Fuerte y Bonito de su Unión
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
              {strengths.map((str, idx) => (
                <li key={`str-user-${idx}`} className="flex items-start gap-3">
                  <span className="text-emerald-400 text-base font-bold shrink-0">✔</span>
                  <span className="leading-relaxed">{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Oportunidades de Crecimiento */}
          <div className="p-6 rounded-3xl bg-[#090D18]/95 border-2 border-rose-500/30 space-y-4">
            <h3 className="font-serif font-bold text-rose-300 text-lg flex items-center gap-2 border-b border-rose-500/20 pb-2">
              <span className="text-xl">⚡</span> Qué Cuidar para Evitar Malentendidos
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
              {challenges.map((cha, idx) => (
                <li key={`cha-user-${idx}`} className="flex items-start gap-3">
                  <span className="text-rose-400 text-base font-bold shrink-0">✦</span>
                  <span className="leading-relaxed">{cha}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Las 3 Reglas de Oro en Cajas Grandes y Destacadas */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-500/15 via-[#090D18] to-amber-500/15 border-2 border-amber-500/40 space-y-5">
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-serif font-bold block mb-1">
              ✦ SABIDURÍA PRÁCTICA PARA LA PAREJA ✦
            </span>
            <h3 className="text-xl font-serif font-bold text-amber-100">
              Tres Reglas de Oro para un Amor Pleno y Duradero
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-black/60 rounded-2xl border border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-sm">
                <span>1.</span>
                <span>Cuando no estén de acuerdo</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-light">
                Recuerden que ningún desacuerdo vale más que su vínculo. Permítanse respirar y escuchar sin interrumpir antes de buscar soluciones juntos.
              </p>
            </div>

            <div className="p-4 bg-black/60 rounded-2xl border border-rose-500/30 space-y-2">
              <div className="flex items-center gap-2 text-rose-300 font-serif font-bold text-sm">
                <span>2.</span>
                <span>Alimentar la chispa diaria</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-light">
                La intimidad se nutre en las pequeñas cosas: un mensaje cariñoso inesperado, una mirada cómplice y agradecer los detalles diarios del otro.
              </p>
            </div>

            <div className="p-4 bg-black/60 rounded-2xl border border-sky-500/30 space-y-2">
              <div className="flex items-center gap-2 text-sky-300 font-serif font-bold text-sm">
                <span>3.</span>
                <span>Cuidar la propia individualidad</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-light">
                Para que dos personas se amen con plenitud, cada una debe tener tiempo para sus propias pasiones, amigos y momentos de silencio interior.
              </p>
            </div>
          </div>
        </div>

        {/* Mensaje de Cierre y Bendición */}
        <div className="text-center p-4 bg-black/40 rounded-2xl border border-amber-500/20">
          <p className="text-xs sm:text-sm text-amber-200/90 font-serif italic">
            &quot;El cielo propone las energías, pero son ustedes dos quienes escriben cada día el destino de su amor con empatía, paciencia y ternura.&quot;
          </p>
        </div>

        {/* Footer Final */}
        <div className="text-center pt-3 border-t border-amber-500/20 text-xs text-slate-400 font-serif">
          ARCANO · Santuario de Sabiduría y Simbolismo Arquetípico · www.arcanosolutions.com
        </div>
      </div>
    </div>
  );
}
