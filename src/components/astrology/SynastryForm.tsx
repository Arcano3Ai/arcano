'use client';

import React, { useState } from 'react';
import { BirthDataInput } from '@/lib/astrology/types';
import { CITIES_DATABASE, CityLocation, searchCities } from '@/lib/astrology/cities';

interface SynastryFormProps {
  onSubmit: (dataA: BirthDataInput, dataB: BirthDataInput) => void;
  isLoading?: boolean;
}

export default function SynastryForm({ onSubmit, isLoading = false }: SynastryFormProps) {
  // Persona A
  const [nameA, setNameA] = useState('Primera Persona');
  const [dateA, setDateA] = useState('1992-03-15');
  const [timeA, setTimeA] = useState('10:00');
  const [citySearchA, setCitySearchA] = useState('Madrid, España');
  const [selectedCityA, setSelectedCityA] = useState<CityLocation>(CITIES_DATABASE[0]);
  const [showDropdownA, setShowDropdownA] = useState(false);

  // Persona B
  const [nameB, setNameB] = useState('Segunda Persona');
  const [dateB, setDateB] = useState('1994-08-22');
  const [timeB, setTimeB] = useState('16:30');
  const [citySearchB, setCitySearchB] = useState('Buenos Aires, Argentina');
  const [selectedCityB, setSelectedCityB] = useState<CityLocation>(CITIES_DATABASE[7]);
  const [showDropdownB, setShowDropdownB] = useState(false);

  const filteredA = searchCities(citySearchA);
  const filteredB = searchCities(citySearchB);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const [yA, mA, dA] = dateA.split('-');
    const [hA, minA] = timeA.split(':');
    const [yB, mB, dB] = dateB.split('-');
    const [hB, minB] = timeB.split(':');

    const inputA: BirthDataInput = {
      name: nameA.trim() || 'Persona A',
      year: parseInt(yA, 10),
      month: parseInt(mA, 10),
      day: parseInt(dA, 10),
      hour: parseInt(hA, 10),
      minute: parseInt(minA, 10),
      cityName: `${selectedCityA.name}, ${selectedCityA.country}`,
      latitude: selectedCityA.latitude,
      longitude: selectedCityA.longitude,
      timezoneOffsetHours: selectedCityA.defaultOffset,
      houseSystem: 'placidus',
    };

    const inputB: BirthDataInput = {
      name: nameB.trim() || 'Persona B',
      year: parseInt(yB, 10),
      month: parseInt(mB, 10),
      day: parseInt(dB, 10),
      hour: parseInt(hB, 10),
      minute: parseInt(minB, 10),
      cityName: `${selectedCityB.name}, ${selectedCityB.country}`,
      latitude: selectedCityB.latitude,
      longitude: selectedCityB.longitude,
      timezoneOffsetHours: selectedCityB.defaultOffset,
      houseSystem: 'placidus',
    };

    onSubmit(inputA, inputB);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tarjeta Persona A */}
        <div className="bg-[#090D18]/90 border border-amber-500/30 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative">
          <div className="flex items-center gap-2 mb-4 text-xs font-serif uppercase tracking-widest text-amber-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span>Datos de la Persona A</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-serif text-amber-200/90 mb-1">Nombre</label>
              <input
                type="text"
                required
                value={nameA}
                onChange={e => setNameA(e.target.value)}
                placeholder="Nombre o apelativo"
                className="w-full bg-[#050811] border border-amber-500/20 rounded-xl px-3.5 py-2 text-sm text-amber-50 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-serif text-amber-200/90 mb-1">Fecha</label>
                <input
                  type="date"
                  required
                  value={dateA}
                  onChange={e => setDateA(e.target.value)}
                  className="w-full bg-[#050811] border border-amber-500/20 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400 [color-scheme:dark]"
                />
              </div>
              <div>
                <label className="block text-xs font-serif text-amber-200/90 mb-1">Hora</label>
                <input
                  type="time"
                  required
                  value={timeA}
                  onChange={e => setTimeA(e.target.value)}
                  className="w-full bg-[#050811] border border-amber-500/20 rounded-xl px-3 py-2 text-xs text-amber-50 focus:outline-none focus:border-amber-400 [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-serif text-amber-200/90 mb-1">Ciudad Natal</label>
              <input
                type="text"
                required
                value={citySearchA}
                onChange={e => {
                  setCitySearchA(e.target.value);
                  setShowDropdownA(true);
                }}
                onFocus={() => setShowDropdownA(true)}
                className="w-full bg-[#050811] border border-amber-500/20 rounded-xl px-3.5 py-2 text-sm text-amber-50 focus:outline-none focus:border-amber-400"
              />

              {showDropdownA && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-[#0B0F1C] border border-amber-500/30 rounded-xl shadow-2xl z-50 max-h-48 overflow-y-auto">
                  {filteredA.map((city, idx) => (
                    <button
                      key={`cityA-${city.name}-${idx}`}
                      type="button"
                      onClick={() => {
                        setSelectedCityA(city);
                        setCitySearchA(`${city.name}, ${city.country}`);
                        setShowDropdownA(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-amber-500/20 flex justify-between border-b border-amber-500/5 last:border-0"
                    >
                      <span>{city.name}, <strong className="text-amber-300 font-normal">{city.country}</strong></span>
                      <span className="font-mono text-[10px] text-slate-400">UTC{city.defaultOffset >= 0 ? `+${city.defaultOffset}` : city.defaultOffset}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tarjeta Persona B */}
        <div className="bg-[#090D18]/90 border border-sky-500/30 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative">
          <div className="flex items-center gap-2 mb-4 text-xs font-serif uppercase tracking-widest text-sky-400 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            <span>Datos de la Persona B</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-serif text-sky-200/90 mb-1">Nombre</label>
              <input
                type="text"
                required
                value={nameB}
                onChange={e => setNameB(e.target.value)}
                placeholder="Nombre o apelativo"
                className="w-full bg-[#050811] border border-sky-500/20 rounded-xl px-3.5 py-2 text-sm text-sky-50 focus:outline-none focus:border-sky-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-serif text-sky-200/90 mb-1">Fecha</label>
                <input
                  type="date"
                  required
                  value={dateB}
                  onChange={e => setDateB(e.target.value)}
                  className="w-full bg-[#050811] border border-sky-500/20 rounded-xl px-3 py-2 text-xs text-sky-50 focus:outline-none focus:border-sky-400 [color-scheme:dark]"
                />
              </div>
              <div>
                <label className="block text-xs font-serif text-sky-200/90 mb-1">Hora</label>
                <input
                  type="time"
                  required
                  value={timeB}
                  onChange={e => setTimeB(e.target.value)}
                  className="w-full bg-[#050811] border border-sky-500/20 rounded-xl px-3 py-2 text-xs text-sky-50 focus:outline-none focus:border-sky-400 [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="relative">
              <label className="block text-xs font-serif text-sky-200/90 mb-1">Ciudad Natal</label>
              <input
                type="text"
                required
                value={citySearchB}
                onChange={e => {
                  setCitySearchB(e.target.value);
                  setShowDropdownB(true);
                }}
                onFocus={() => setShowDropdownB(true)}
                className="w-full bg-[#050811] border border-sky-500/20 rounded-xl px-3.5 py-2 text-sm text-sky-50 focus:outline-none focus:border-sky-400"
              />

              {showDropdownB && (
                <div className="absolute left-0 right-0 top-full mt-1 bg-[#0B0F1C] border border-sky-500/30 rounded-xl shadow-2xl z-50 max-h-48 overflow-y-auto">
                  {filteredB.map((city, idx) => (
                    <button
                      key={`cityB-${city.name}-${idx}`}
                      type="button"
                      onClick={() => {
                        setSelectedCityB(city);
                        setCitySearchB(`${city.name}, ${city.country}`);
                        setShowDropdownB(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-sky-500/20 flex justify-between border-b border-sky-500/5 last:border-0"
                    >
                      <span>{city.name}, <strong className="text-sky-300 font-normal">{city.country}</strong></span>
                      <span className="font-mono text-[10px] text-slate-400">UTC{city.defaultOffset >= 0 ? `+${city.defaultOffset}` : city.defaultOffset}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full max-w-md mx-auto py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-serif font-bold text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50"
        >
          {isLoading ? 'Calculando Compatibilidad Alquímica...' : '✦ Revelar Sinastría de Almas ✦'}
        </button>
      </div>
    </form>
  );
}
