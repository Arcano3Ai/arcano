'use client';

import React, { useState } from 'react';
import { BirthDataInput, HouseSystem } from '@/lib/astrology/types';
import { CITIES_DATABASE, CityLocation, searchCities } from '@/lib/astrology/cities';

interface BirthChartFormProps {
  onSubmit: (data: BirthDataInput) => void;
  isLoading?: boolean;
}

export default function BirthChartForm({ onSubmit, isLoading = false }: BirthChartFormProps) {
  const [name, setName] = useState('Consultante');
  const [dateStr, setDateStr] = useState('1995-07-20');
  const [timeStr, setTimeStr] = useState('14:30');
  const [citySearch, setCitySearch] = useState('Madrid, España');
  const [selectedCity, setSelectedCity] = useState<CityLocation>(CITIES_DATABASE[0]);
  const [houseSystem, setHouseSystem] = useState<HouseSystem>('placidus');
  const [showCityDropdown, setShowCityDropdown] = useState(false);

  const filteredCities = searchCities(citySearch);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const [yearStr, monthStr, dayStr] = dateStr.split('-');
    const [hourStr, minuteStr] = timeStr.split(':');

    const inputData: BirthDataInput = {
      name: name.trim() || 'Consultante',
      year: parseInt(yearStr, 10),
      month: parseInt(monthStr, 10),
      day: parseInt(dayStr, 10),
      hour: parseInt(hourStr, 10),
      minute: parseInt(minuteStr, 10),
      cityName: `${selectedCity.name}, ${selectedCity.country}`,
      latitude: selectedCity.latitude,
      longitude: selectedCity.longitude,
      timezoneOffsetHours: selectedCity.defaultOffset,
      houseSystem,
    };

    onSubmit(inputData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto bg-[#090D18]/90 border border-amber-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
    >
      {/* Subtle background crest / glow */}
      <div className="absolute -right-20 -top-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="text-center mb-6">
          <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-semibold">Oráculo Astral</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100 mt-1">Calcula tu Carta Natal</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Ingresa tus coordenadas espacio-temporales para develar tu mapa cósmico.
          </p>
        </div>

        {/* Nombre */}
        <div>
          <label className="block text-xs font-serif font-semibold text-amber-200/90 mb-1.5 tracking-wider uppercase">
            Nombre o Apodo
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Tu nombre sagrado"
            className="w-full bg-[#050811]/90 border border-amber-500/20 rounded-xl px-4 py-2.5 text-sm text-amber-50 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
          />
        </div>

        {/* Fecha y Hora en 2 columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-serif font-semibold text-amber-200/90 mb-1.5 tracking-wider uppercase">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              required
              value={dateStr}
              onChange={e => setDateStr(e.target.value)}
              className="w-full bg-[#050811]/90 border border-amber-500/20 rounded-xl px-4 py-2.5 text-sm text-amber-50 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all [color-scheme:dark]"
            />
          </div>

          <div>
            <label className="block text-xs font-serif font-semibold text-amber-200/90 mb-1.5 tracking-wider uppercase">
              Hora Exacta
            </label>
            <input
              type="time"
              required
              value={timeStr}
              onChange={e => setTimeStr(e.target.value)}
              className="w-full bg-[#050811]/90 border border-amber-500/20 rounded-xl px-4 py-2.5 text-sm text-amber-50 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all [color-scheme:dark]"
            />
            <span className="text-[10px] text-slate-400 italic block mt-1">Indispensable para calcular el Ascendente y las Casas</span>
          </div>
        </div>

        {/* Ciudad con Autocompletado */}
        <div className="relative">
          <label className="block text-xs font-serif font-semibold text-amber-200/90 mb-1.5 tracking-wider uppercase">
            Ciudad y País de Nacimiento
          </label>
          <input
            type="text"
            required
            value={citySearch}
            onChange={e => {
              setCitySearch(e.target.value);
              setShowCityDropdown(true);
            }}
            onFocus={() => setShowCityDropdown(true)}
            placeholder="Escribe tu ciudad (ej. Madrid, Buenos Aires, CDMX...)"
            className="w-full bg-[#050811]/90 border border-amber-500/20 rounded-xl px-4 py-2.5 text-sm text-amber-50 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
          />

          {showCityDropdown && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#0B0F1C] border border-amber-500/30 rounded-xl shadow-2xl z-50 max-h-56 overflow-y-auto custom-scrollbar">
              {filteredCities.length > 0 ? (
                filteredCities.map((city, idx) => (
                  <button
                    key={`${city.name}-${city.country}-${idx}`}
                    type="button"
                    onClick={() => {
                      setSelectedCity(city);
                      setCitySearch(`${city.name}, ${city.country}`);
                      setShowCityDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-slate-200 hover:bg-amber-500/20 hover:text-amber-200 transition-colors flex items-center justify-between border-b border-amber-500/5 last:border-0"
                  >
                    <span>{city.name}, <strong className="text-amber-400 font-normal">{city.country}</strong></span>
                    <span className="text-[11px] font-mono text-slate-400">UTC{city.defaultOffset >= 0 ? `+${city.defaultOffset}` : city.defaultOffset}</span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-xs text-slate-400 italic">
                  Ciudad no encontrada en el catálogo rápido. Se usarán coordenadas aproximadas.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sistema de Casas */}
        <div>
          <label className="block text-xs font-serif font-semibold text-amber-200/90 mb-1.5 tracking-wider uppercase">
            Sistema de Casas Astrológicas
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setHouseSystem('placidus')}
              className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                houseSystem === 'placidus'
                  ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-[0_0_12px_rgba(245,208,97,0.2)]'
                  : 'bg-[#050811]/50 border-amber-500/10 text-slate-400 hover:border-amber-500/30'
              }`}
            >
              Placidus (Clásico Occidental)
            </button>
            <button
              type="button"
              onClick={() => setHouseSystem('whole-sign')}
              className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                houseSystem === 'whole-sign'
                  ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-[0_0_12px_rgba(245,208,97,0.2)]'
                  : 'bg-[#050811]/50 border-amber-500/10 text-slate-400 hover:border-amber-500/30'
              }`}
            >
              Signos Enteros (Helenístico)
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F5D061] to-[#D4AF37] text-[#0B0E17] font-serif font-bold text-sm sm:text-base tracking-widest uppercase shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] hover:brightness-105 active:scale-[0.99] transition-all disabled:opacity-50"
        >
          {isLoading ? 'Calculando Cielo Sagrado...' : '✦ Desvelar Mi Carta Natal ✦'}
        </button>
      </div>
    </form>
  );
}
