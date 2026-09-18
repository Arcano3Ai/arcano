'use client';

import React, { useState } from 'react';
import { SynastryReport, PlanetaryPosition, CelestialBodyName } from '@/lib/astrology/types';
import { ASPECT_DEFINITIONS, ELEMENT_COLORS, ZODIAC_SIGNS } from '@/lib/astrology/constants';

interface SynastryWheelProps {
  synastry: SynastryReport;
}

const DEG2RAD = Math.PI / 180;

export default function SynastryWheel({ synastry }: SynastryWheelProps) {
  const [selectedBody, setSelectedBody] = useState<{ person: 'A' | 'B'; body: CelestialBodyName } | null>(null);

  const { chartA, chartB, crossAspects } = synastry;

  const size = 640;
  const cx = size / 2;
  const cy = size / 2;

  const rOuter = 295;
  const rZodiacInner = 250;
  const rPlanetsB = 220; // Outer planet ring (Person B)
  const rHousesInner = 175;
  const rPlanetsA = 145; // Inner planet ring (Person A)
  const rAspects = 115;

  const asc = chartA.angles.ascendant;

  const getCoordinates = (longitude: number, radius: number) => {
    const relAngleDeg = longitude - asc;
    const screenRad = (180 - relAngleDeg) * DEG2RAD;
    const x = cx + radius * Math.cos(screenRad);
    const y = cy - radius * Math.sin(screenRad);
    return { x, y, angle: relAngleDeg };
  };

  // Filter aspects if a planet is selected
  const filteredAspects = selectedBody
    ? crossAspects.filter(a =>
        selectedBody.person === 'A' ? a.bodyA === selectedBody.body : a.bodyB === selectedBody.body
      )
    : crossAspects.slice(0, 20); // show top 20 most exact aspects to prevent clutter

  return (
    <div className="relative w-full max-w-[640px] mx-auto flex flex-col items-center select-none">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-auto drop-shadow-[0_0_35px_rgba(212,175,55,0.18)]"
      >
        <defs>
          <radialGradient id="synastryCenterGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0B0E17" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#05070C" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#121829" stopOpacity="0.8" />
          </radialGradient>

          <linearGradient id="synastryGoldRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D061" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#997A15" />
          </linearGradient>

          <filter id="synastryGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer cosmic circles */}
        <circle cx={cx} cy={cy} r={rOuter + 8} fill="none" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke="url(#synastryGoldRing)" strokeWidth="2.5" />
        <circle cx={cx} cy={cy} r={rZodiacInner} fill="none" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r={rHousesInner} fill="none" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={rAspects} fill="url(#synastryCenterGrad)" stroke="rgba(212, 175, 55, 0.25)" strokeWidth="1.5" />

        {/* 12 Zodiac Segments */}
        {ZODIAC_SIGNS.map((sign, idx) => {
          const startLon = sign.startDegree;
          const endLon = startLon + 30;
          const midLon = startLon + 15;

          const p1 = getCoordinates(startLon, rOuter);
          const p2 = getCoordinates(endLon, rOuter);
          const p3 = getCoordinates(endLon, rZodiacInner);
          const p4 = getCoordinates(startLon, rZodiacInner);

          const midOuter = getCoordinates(midLon, (rOuter + rZodiacInner) / 2);
          const elemColor = ELEMENT_COLORS[sign.element];

          return (
            <g key={`syn-sign-${sign.name}`}>
              <path
                d={`M ${p1.x} ${p1.y} A ${rOuter} ${rOuter} 0 0 0 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rZodiacInner} ${rZodiacInner} 0 0 1 ${p4.x} ${p4.y} Z`}
                fill={idx % 2 === 0 ? 'rgba(18, 24, 41, 0.6)' : 'rgba(10, 14, 25, 0.7)'}
                stroke="rgba(212, 175, 55, 0.2)"
                strokeWidth="0.8"
              />
              <line x1={p1.x} y1={p1.y} x2={p4.x} y2={p4.y} stroke="rgba(212, 175, 55, 0.35)" strokeWidth="1" />
              <text
                x={midOuter.x}
                y={midOuter.y + 6}
                textAnchor="middle"
                fontSize="18"
                fontWeight="bold"
                fill={elemColor.text}
                className="select-none"
              >
                {sign.symbol}
              </text>
            </g>
          );
        })}

        {/* House Lines for Person A */}
        {chartA.houses.map(house => {
          const cuspCoordOuter = getCoordinates(house.longitude, rZodiacInner);
          const cuspCoordInner = getCoordinates(house.longitude, rAspects);
          const isCardAxis = house.houseNumber === 1 || house.houseNumber === 4 || house.houseNumber === 7 || house.houseNumber === 10;

          return (
            <line
              key={`syn-house-${house.houseNumber}`}
              x1={cuspCoordInner.x}
              y1={cuspCoordInner.y}
              x2={cuspCoordOuter.x}
              y2={cuspCoordOuter.y}
              stroke={isCardAxis ? '#F5D061' : 'rgba(212, 175, 55, 0.2)'}
              strokeWidth={isCardAxis ? 2 : 0.8}
              strokeDasharray={isCardAxis ? 'none' : '2 2'}
            />
          );
        })}

        {/* Cross Aspects Chords */}
        <g>
          {filteredAspects.map((aspect, idx) => {
            const posA = chartA.positions.find(p => p.body === aspect.bodyA);
            const posB = chartB.positions.find(p => p.body === aspect.bodyB);
            if (!posA || !posB) return null;

            const cA = getCoordinates(posA.longitude, rAspects - 2);
            const cB = getCoordinates(posB.longitude, rAspects - 2);
            const def = ASPECT_DEFINITIONS[aspect.aspectType];
            const isHighlighted = selectedBody && (selectedBody.body === aspect.bodyA || selectedBody.body === aspect.bodyB);

            return (
              <line
                key={`syn-cross-aspect-${idx}`}
                x1={cA.x}
                y1={cA.y}
                x2={cB.x}
                y2={cB.y}
                stroke={def.color}
                strokeWidth={isHighlighted ? 2.5 : 1}
                strokeOpacity={isHighlighted ? 1 : 0.45}
                strokeDasharray={aspect.aspectType === 'quincunx' ? '4 3' : 'none'}
              />
            );
          })}
        </g>

        {/* Persona A Planetas (Anillo Interior - Oro #F5D061) */}
        {chartA.positions.map(pos => {
          const coord = getCoordinates(pos.longitude, rPlanetsA);
          const isSelected = selectedBody?.person === 'A' && selectedBody.body === pos.body;

          return (
            <g
              key={`posA-${pos.body}`}
              className="cursor-pointer transition-all"
              onClick={() => setSelectedBody(isSelected ? null : { person: 'A', body: pos.body })}
            >
              {isSelected && (
                <circle cx={coord.x} cy={coord.y} r="14" fill="rgba(245, 208, 97, 0.3)" filter="url(#synastryGlow)" />
              )}
              <circle cx={coord.x} cy={coord.y} r="10" fill="#0B0E17" stroke="#F5D061" strokeWidth={isSelected ? 2 : 1} />
              <text x={coord.x} y={coord.y + 4} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#F5D061">
                {pos.symbol}
              </text>
            </g>
          );
        })}

        {/* Persona B Planetas (Anillo Exterior - Celeste Eléctrico #38BDF8) */}
        {chartB.positions.map(pos => {
          const coord = getCoordinates(pos.longitude, rPlanetsB);
          const isSelected = selectedBody?.person === 'B' && selectedBody.body === pos.body;

          return (
            <g
              key={`posB-${pos.body}`}
              className="cursor-pointer transition-all"
              onClick={() => setSelectedBody(isSelected ? null : { person: 'B', body: pos.body })}
            >
              {isSelected && (
                <circle cx={coord.x} cy={coord.y} r="14" fill="rgba(56, 189, 248, 0.3)" filter="url(#synastryGlow)" />
              )}
              <circle cx={coord.x} cy={coord.y} r="10" fill="#0B0E17" stroke="#38BDF8" strokeWidth={isSelected ? 2 : 1} />
              <text x={coord.x} y={coord.y + 4} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#38BDF8">
                {pos.symbol}
              </text>
            </g>
          );
        })}

        {/* Centro del Bi-Wheel */}
        <circle cx={cx} cy={cy} r="18" fill="#060911" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r="5" fill="#D4AF37" />
      </svg>

      {/* Leyenda y Selector */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs font-serif">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#F5D061] shadow-[0_0_8px_rgba(245,208,97,0.6)]" />
          <span className="text-amber-200 font-semibold">{chartA.birthData.name} (Anillo Interior)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#38BDF8] shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
          <span className="text-sky-200 font-semibold">{chartB.birthData.name} (Anillo Exterior)</span>
        </div>
      </div>
    </div>
  );
}
