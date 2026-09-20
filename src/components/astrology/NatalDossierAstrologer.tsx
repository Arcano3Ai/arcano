'use client';

import React from 'react';
import { NatalChartData } from '@/lib/astrology/types';
import { BODY_SYMBOLS, ZODIAC_SIGNS } from '@/lib/astrology/constants';
import NatalWheel from './NatalWheel';

interface NatalDossierAstrologerProps {
  chart: NatalChartData;
}

export default function NatalDossierAstrologer({ chart }: NatalDossierAstrologerProps) {
  const { birthData, angles, houses, positions, aspects, elementBalance, modalityBalance } = chart;

  return (
    <div className="space-y-6 text-slate-100 font-sans text-xs print-dossier-inner">
      {/* =========================================================================
          PÁGINA 1: PORTADA TÉCNICA & PARÁMETROS ASTRONÓMICOS (A4 EXACTA)
          ========================================================================= */}
      <div className="print-cover-page border border-amber-500/40 rounded-3xl p-6 bg-[#0B0F1C] text-center flex flex-col justify-between">
        {/* Cabecera Técnica */}
        <div className="space-y-1 border-b border-amber-500/20 pb-3">
          <div className="flex items-center justify-between text-[10px] text-amber-400 uppercase tracking-widest font-mono">
            <span>EFEMÉRIDES PLANETARIAS JPL / MEEUS</span>
            <span>SISTEMA DE CASAS: PLACIDUS</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-amber-100">
            Dossier Técnico Geocéntrico: {birthData.name}
          </h1>
          <p className="text-[11px] text-slate-300 font-mono">
            Fecha Local: {String(birthData.day).padStart(2, '0')}/{String(birthData.month).padStart(2, '0')}/{birthData.year}{' '}
            {String(birthData.hour).padStart(2, '0')}:{String(birthData.minute).padStart(2, '0')} hrs •{' '}
            {birthData.cityName} (Lat: {birthData.latitude}°, Lon: {birthData.longitude}°) • Huso: UTC {birthData.timezoneOffsetHours >= 0 ? '+' + birthData.timezoneOffsetHours : birthData.timezoneOffsetHours}
          </p>
        </div>

        {/* Rueda en SVG (Escalada y nítida) */}
        <div className="py-2 flex justify-center items-center">
          <NatalWheel chart={chart} />
        </div>

        {/* Parámetros de Ángulos & Ejes Cardinales */}
        <div className="grid grid-cols-4 gap-2 pt-3 border-t border-amber-500/20 text-left font-mono text-[10px]">
          <div className="p-2.5 bg-black/40 rounded-xl border border-purple-500/30">
            <span className="text-purple-300 font-bold block">ASCENDENTE (I)</span>
            <span className="text-amber-100 font-bold text-xs block truncate">
              {angles.ascSign} {angles.ascDegreeInSign}° {String(angles.ascMinuteInSign).padStart(2, '0')}&apos;
            </span>
          </div>
          <div className="p-2.5 bg-black/40 rounded-xl border border-sky-500/30">
            <span className="text-sky-300 font-bold block">MEDIO CIELO (MC - X)</span>
            <span className="text-amber-100 font-bold text-xs block truncate">
              {angles.mcSign} {angles.mcDegreeInSign}° {String(angles.mcMinuteInSign).padStart(2, '0')}&apos;
            </span>
          </div>
          <div className="p-2.5 bg-black/40 rounded-xl border border-amber-500/30">
            <span className="text-amber-300 font-bold block">DESCENDENTE (VII)</span>
            <span className="text-amber-100 font-bold text-xs block truncate">
              {angles.descendant ? Math.floor(angles.descendant % 30) : 0}° en Cúspide
            </span>
          </div>
          <div className="p-2.5 bg-black/40 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-300 font-bold block">FONDO DE CIELO (IC - IV)</span>
            <span className="text-amber-100 font-bold text-xs block truncate">
              {angles.imumCoeli ? Math.floor(angles.imumCoeli % 30) : 0}° en Cúspide
            </span>
          </div>
        </div>

        {/* Ponderación Elemental y Modalidades */}
        <div className="grid grid-cols-2 gap-3 pt-2 text-left font-mono text-[10px]">
          <div className="p-2.5 bg-black/30 rounded-xl border border-amber-500/20">
            <span className="text-amber-400 font-bold block mb-1">BALANCE ELEMENTAL (Puntos)</span>
            <div className="grid grid-cols-4 gap-1 text-center">
              <div><span className="text-amber-400 font-bold">Fuego:</span> {elementBalance.fuego} pts</div>
              <div><span className="text-emerald-400 font-bold">Tierra:</span> {elementBalance.tierra} pts</div>
              <div><span className="text-sky-400 font-bold">Aire:</span> {elementBalance.aire} pts</div>
              <div><span className="text-blue-400 font-bold">Agua:</span> {elementBalance.agua} pts</div>
            </div>
          </div>
          <div className="p-2.5 bg-black/30 rounded-xl border border-indigo-500/20">
            <span className="text-indigo-300 font-bold block mb-1">MODALIDADES (Puntos)</span>
            <div className="grid grid-cols-3 gap-1 text-center">
              <div><span className="text-rose-400 font-bold">Cardinal:</span> {modalityBalance.cardinal}</div>
              <div><span className="text-amber-300 font-bold">Fijo:</span> {modalityBalance.fijo}</div>
              <div><span className="text-indigo-300 font-bold">Mutable:</span> {modalityBalance.mutable}</div>
            </div>
          </div>
        </div>

        {/* Pie de Portada */}
        <div className="text-center pt-2 border-t border-amber-500/10 text-[9px] text-slate-400 font-mono">
          ARCANO ASTROLOGICAL ENGINE · Reporte Certificado Nivel Astrólogo · arcanosolutions.com
        </div>
      </div>

      {/* =========================================================================
          PÁGINA 2: EFEMÉRIDES COMPLETAS, CÚSPIDES Y MATRIZ DE ASPECTOS
          ========================================================================= */}
      <div className="print-page-break space-y-4 pt-4 text-left font-sans">
        {/* Tabla Completa de Efemérides (14 Cuerpos Celestes) */}
        <div className="border border-amber-500/30 rounded-3xl p-5 bg-[#0B0F1C] print-avoid-break">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-serif font-bold block mb-3">
            ✦ Efemérides Astronómicas de los 14 Cuerpos Celestes
          </span>
          <div className="overflow-x-auto">
            <table className="w-full text-[10px] font-mono text-left">
              <thead>
                <tr className="border-b border-amber-500/20 text-amber-300">
                  <th className="py-1">Cuerpo</th>
                  <th className="py-1">Signo</th>
                  <th className="py-1">Longitud (° &apos; &quot;)</th>
                  <th className="py-1">Casa</th>
                  <th className="py-1">Velocidad</th>
                  <th className="py-1">Movimiento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {positions.map((pos) => {
                  const signData = ZODIAC_SIGNS.find((s) => s.name === pos.sign);
                  return (
                    <tr key={pos.body} className="hover:bg-white/5">
                      <td className="py-1 text-amber-100 font-bold">
                        <span className="mr-1.5 text-amber-400">{pos.symbol || BODY_SYMBOLS[pos.body]}</span>
                        {pos.body}
                      </td>
                      <td className="py-1 text-slate-200">
                        {signData?.symbol} {pos.sign}
                      </td>
                      <td className="py-1 text-slate-300">
                        {pos.degreeInSign}° {String(pos.minuteInSign).padStart(2, '0')}&apos; {String(pos.secondInSign).padStart(2, '0')}&quot;
                      </td>
                      <td className="py-1 text-amber-300 font-bold">Casa {pos.house}</td>
                      <td className="py-1 text-slate-400">{pos.speed.toFixed(3)}°/d</td>
                      <td className="py-1">
                        {pos.isRetrograde ? (
                          <span className="text-rose-400 font-bold bg-rose-500/20 px-1 rounded">R (Retrógrado)</span>
                        ) : (
                          <span className="text-emerald-400 font-semibold">D (Directo)</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabla de las 12 Cúspides de Casas */}
        <div className="border border-amber-500/30 rounded-3xl p-5 bg-[#0B0F1C] print-avoid-break">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-serif font-bold block mb-3">
            ✦ Sistema de Casas Astrológicas (Placidus)
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 font-mono text-[10px]">
            {houses.map((house) => {
              const signData = ZODIAC_SIGNS.find((s) => s.name === house.sign);
              return (
                <div key={house.houseNumber} className="p-2 bg-black/40 rounded-xl border border-amber-500/15">
                  <span className="text-amber-400 font-bold block">Casa {house.houseNumber}</span>
                  <span className="text-slate-200 block truncate">
                    {signData?.symbol} {house.sign} {house.degreeInSign}° {String(house.minuteInSign).padStart(2, '0')}&apos;
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Matriz de Aspectos Planetarios Mayores */}
        <div className="border border-amber-500/30 rounded-3xl p-5 bg-[#0B0F1C] print-avoid-break">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-serif font-bold">
              ✦ Aspectos Mayores y Orbes de Interacción ({aspects.length})
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Orbes de 0° a 8° máx</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono">
            {aspects.slice(0, 16).map((asp, idx) => (
              <div
                key={idx}
                className="p-2 bg-black/30 rounded-xl border border-white/5 flex items-center justify-between"
              >
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
                  <span className="text-slate-400 text-[9px]">orb {asp.orb.toFixed(2)}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Editorial */}
        <div className="text-center pt-3 border-t border-amber-500/20 text-[10px] text-slate-400 font-serif">
          ARCANO · Cartografía Sagrada del Cielo · Archivo Técnico Confidencial · arcanosolutions.com
        </div>
      </div>
    </div>
  );
}