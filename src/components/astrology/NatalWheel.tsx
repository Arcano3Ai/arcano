'use client';

import React, { useState } from 'react';
import { Aspect, CelestialBodyName, NatalChartData, PlanetaryPosition } from '@/lib/astrology/types';
import { ASPECT_DEFINITIONS, BODY_SYMBOLS, ELEMENT_COLORS, ZODIAC_SIGNS } from '@/lib/astrology/constants';

interface NatalWheelProps {
  chart: NatalChartData;
  onSelectPlanet?: (planet: PlanetaryPosition | null) => void;
  selectedPlanet?: PlanetaryPosition | null;
}

const DEG2RAD = Math.PI / 180;

export default function NatalWheel({ chart, onSelectPlanet, selectedPlanet }: NatalWheelProps) {
  const [hoveredPlanet, setHoveredPlanet] = useState<PlanetaryPosition | null>(null);

  const activePlanet = selectedPlanet || hoveredPlanet;

  const size = 640;
  const cx = size / 2;
  const cy = size / 2;

  const rOuter = 295;
  const rZodiacInner = 250;
  const rHousesInner = 175;
  const rPlanetsBase = 145;
  const rAspects = 115;

  const asc = chart.angles.ascendant;

  // Transforms an ecliptic longitude to screen coordinates (Ascendant at 9 o'clock, counter-clockwise)
  const getCoordinates = (longitude: number, radius: number) => {
    // Relative angle from Ascendant
    const relAngleDeg = longitude - asc;
    // In screen coords: Ascendant is at 180° (left). Counter-clockwise means adding angle in SVG (y down)
    const screenRad = (180 - relAngleDeg) * DEG2RAD;
    const x = cx + radius * Math.cos(screenRad);
    const y = cy - radius * Math.sin(screenRad);
    return { x, y, angle: relAngleDeg };
  };

  // Anti-collision algorithm for planetary glyphs
  const sortedPlanets = [...chart.positions].sort((a, b) => a.longitude - b.longitude);
  const planetRadii = new Map<CelestialBodyName, number>();

  for (let i = 0; i < sortedPlanets.length; i++) {
    const p1 = sortedPlanets[i];
    let clusterIndex = 0;

    // Check distance to previous planets in sorted order
    for (let j = Math.max(0, i - 3); j < i; j++) {
      const p2 = sortedPlanets[j];
      let diff = Math.abs(p1.longitude - p2.longitude);
      if (diff > 180) diff = 360 - diff;
      if (diff < 7) {
        clusterIndex++;
      }
    }

    // Stagger radius: 140, 155, 125, 170
    const offsets = [0, 16, -16, 26, -26];
    const offset = offsets[clusterIndex % offsets.length];
    planetRadii.set(p1.body, rPlanetsBase + offset);
  }

  // Filter aspects if a planet is selected/hovered
  const filteredAspects = activePlanet
    ? chart.aspects.filter(a => a.body1 === activePlanet.body || a.body2 === activePlanet.body)
    : chart.aspects;

  return (
    <div className="relative w-full max-w-[640px] mx-auto flex flex-col items-center select-none">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-auto drop-shadow-[0_0_35px_rgba(212,175,55,0.18)]"
      >
        <defs>
          {/* Gradients */}
          <radialGradient id="centerGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0B0E17" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#05070C" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#121829" stopOpacity="0.8" />
          </radialGradient>

          <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5D061" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#997A15" />
          </linearGradient>

          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer cosmic border */}
        <circle cx={cx} cy={cy} r={rOuter + 8} fill="none" stroke="rgba(212, 175, 55, 0.2)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke="url(#goldRing)" strokeWidth="2.5" />
        <circle cx={cx} cy={cy} r={rZodiacInner} fill="none" stroke="rgba(212, 175, 55, 0.4)" strokeWidth="1.5" />
        <circle cx={cx} cy={cy} r={rHousesInner} fill="none" stroke="rgba(212, 175, 55, 0.3)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={rAspects} fill="url(#centerGradient)" stroke="rgba(212, 175, 55, 0.25)" strokeWidth="1.5" />

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
            <g key={sign.name} className="transition-opacity duration-300">
              {/* Sector slice path */}
              <path
                d={`M ${p1.x} ${p1.y} A ${rOuter} ${rOuter} 0 0 0 ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rZodiacInner} ${rZodiacInner} 0 0 1 ${p4.x} ${p4.y} Z`}
                fill={idx % 2 === 0 ? 'rgba(18, 24, 41, 0.6)' : 'rgba(10, 14, 25, 0.7)'}
                stroke="rgba(212, 175, 55, 0.2)"
                strokeWidth="0.8"
              />

              {/* Sign boundary line */}
              <line
                x1={p1.x}
                y1={p1.y}
                x2={p4.x}
                y2={p4.y}
                stroke="rgba(212, 175, 55, 0.35)"
                strokeWidth="1"
              />

              {/* Sign Glyph */}
              <text
                x={midOuter.x}
                y={midOuter.y + 6}
                textAnchor="middle"
                fontSize="19"
                fontWeight="bold"
                fill={elemColor.text}
                className="cursor-default select-none transition-transform hover:scale-125"
                style={{ filter: `drop-shadow(0 0 6px ${elemColor.text}44)` }}
              >
                {sign.symbol}
              </text>
            </g>
          );
        })}

        {/* House Cusps and Numbers */}
        {chart.houses.map((house, idx) => {
          const cuspCoordOuter = getCoordinates(house.longitude, rZodiacInner);
          const cuspCoordInner = getCoordinates(house.longitude, rAspects);

          // Find midpoint for house number
          const nextCusp = chart.houses[(idx + 1) % 12];
          let span = nextCusp.longitude - house.longitude;
          if (span < 0) span += 360;
          const midHouseLon = house.longitude + span / 2;
          const numCoord = getCoordinates(midHouseLon, (rHousesInner + rAspects) / 2);

          const isCardAxis = house.houseNumber === 1 || house.houseNumber === 4 || house.houseNumber === 7 || house.houseNumber === 10;

          return (
            <g key={`house-${house.houseNumber}`}>
              {/* House division line */}
              <line
                x1={cuspCoordInner.x}
                y1={cuspCoordInner.y}
                x2={cuspCoordOuter.x}
                y2={cuspCoordOuter.y}
                stroke={isCardAxis ? '#F5D061' : 'rgba(212, 175, 55, 0.25)'}
                strokeWidth={isCardAxis ? 2 : 0.8}
                strokeDasharray={isCardAxis ? 'none' : '2 2'}
              />

              {/* House number */}
              <text
                x={numCoord.x}
                y={numCoord.y + 4}
                textAnchor="middle"
                fontSize="11"
                fontFamily="Cinzel, serif"
                fill="rgba(212, 175, 55, 0.65)"
                className="select-none"
              >
                {house.houseNumber}
              </text>
            </g>
          );
        })}

        {/* Cardinal Axis Markers (AC, DC, MC, IC) */}
        {(() => {
          const acCoord = getCoordinates(chart.angles.ascendant, rOuter + 16);
          const dcCoord = getCoordinates(chart.angles.descendant, rOuter + 16);
          const mcCoord = getCoordinates(chart.angles.midheaven, rOuter + 16);
          const icCoord = getCoordinates(chart.angles.imumCoeli, rOuter + 16);

          return (
            <g className="font-serif font-bold text-[12px] tracking-wider fill-[#F5D061]">
              <text x={acCoord.x} y={acCoord.y + 4} textAnchor="middle">AC</text>
              <text x={dcCoord.x} y={dcCoord.y + 4} textAnchor="middle">DC</text>
              <text x={mcCoord.x} y={mcCoord.y + 4} textAnchor="middle">MC</text>
              <text x={icCoord.x} y={icCoord.y + 4} textAnchor="middle">IC</text>
            </g>
          );
        })()}

        {/* Aspects (Chords in the center web) */}
        <g className="transition-all duration-300">
          {filteredAspects.map((aspect, idx) => {
            const pos1 = chart.positions.find(p => p.body === aspect.body1);
            const pos2 = chart.positions.find(p => p.body === aspect.body2);
            if (!pos1 || !pos2) return null;

            const c1 = getCoordinates(pos1.longitude, rAspects - 2);
            const c2 = getCoordinates(pos2.longitude, rAspects - 2);
            const def = ASPECT_DEFINITIONS[aspect.aspectType];

            // Tighter orb = higher opacity
            const opacity = Math.max(0.25, 0.9 - (aspect.orb / def.maxOrb) * 0.65);
            const isHighlighted = activePlanet && (aspect.body1 === activePlanet.body || aspect.body2 === activePlanet.body);

            return (
              <line
                key={`aspect-${aspect.body1}-${aspect.body2}-${idx}`}
                x1={c1.x}
                y1={c1.y}
                x2={c2.x}
                y2={c2.y}
                stroke={def.color}
                strokeWidth={isHighlighted ? 2.2 : 1}
                strokeOpacity={isHighlighted ? 1 : opacity}
                strokeDasharray={aspect.aspectType === 'quincunx' ? '4 3' : 'none'}
                className="transition-all duration-300"
              />
            );
          })}
        </g>

        {/* Planetary Positions & Glyphs */}
        {chart.positions.map(pos => {
          const rPlan = planetRadii.get(pos.body) || rPlanetsBase;
          const posCoord = getCoordinates(pos.longitude, rPlan);
          const cuspGuideCoord = getCoordinates(pos.longitude, rZodiacInner);
          const innerGuideCoord = getCoordinates(pos.longitude, rAspects);

          const isHovered = activePlanet?.body === pos.body;

          return (
            <g
              key={`planet-${pos.body}`}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHoveredPlanet(pos)}
              onMouseLeave={() => setHoveredPlanet(null)}
              onClick={() => onSelectPlanet && onSelectPlanet(selectedPlanet?.body === pos.body ? null : pos)}
            >
              {/* Radial tick to cusp */}
              <line
                x1={innerGuideCoord.x}
                y1={innerGuideCoord.y}
                x2={cuspGuideCoord.x}
                y2={cuspGuideCoord.y}
                stroke={isHovered ? '#F5D061' : 'rgba(212, 175, 55, 0.2)'}
                strokeWidth={isHovered ? 1.5 : 0.6}
              />

              {/* Glowing hover circle */}
              {isHovered && (
                <circle
                  cx={posCoord.x}
                  cy={posCoord.y}
                  r="16"
                  fill="rgba(212, 175, 55, 0.2)"
                  stroke="#F5D061"
                  strokeWidth="1.5"
                  filter="url(#glow)"
                />
              )}

              {/* Planet background circle */}
              <circle
                cx={posCoord.x}
                cy={posCoord.y}
                r="11"
                fill="#0B0E17"
                stroke={isHovered ? '#F5D061' : 'rgba(212, 175, 55, 0.5)'}
                strokeWidth={isHovered ? 1.8 : 1}
              />

              {/* Planet Glyph */}
              <text
                x={posCoord.x}
                y={posCoord.y + 4.5}
                textAnchor="middle"
                fontSize="13"
                fontWeight="bold"
                fill={isHovered ? '#FFF' : '#F5D061'}
                className="select-none transition-colors"
              >
                {pos.symbol}
              </text>

              {/* Retrograde symbol indicator */}
              {pos.isRetrograde && (
                <text
                  x={posCoord.x + 9}
                  y={posCoord.y - 7}
                  fontSize="8"
                  fontWeight="bold"
                  fill="#F43F5E"
                >
                  ℞
                </text>
              )}
            </g>
          );
        })}

        {/* Center Golden Pentacle / Mystic Crest */}
        <circle cx={cx} cy={cy} r="22" fill="#060911" stroke="rgba(212, 175, 55, 0.5)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r="6" fill="#D4AF37" />
      </svg>

      {/* Interactive Tooltip Card on Hover / Selection */}
      <div className="min-h-[72px] mt-4 w-full flex items-center justify-center">
        {activePlanet ? (
          <div className="bg-[#0e1322]/90 border border-amber-500/30 rounded-xl px-5 py-3 shadow-xl backdrop-blur-md flex items-center gap-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="text-3xl text-amber-300 font-bold drop-shadow-[0_0_8px_rgba(245,208,97,0.5)]">
              {activePlanet.symbol}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-amber-100 text-base">{activePlanet.body}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                  {activePlanet.degreeInSign}° {activePlanet.minuteInSign}&apos; {activePlanet.sign}
                </span>
                {activePlanet.isRetrograde && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    Retrógrado
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Ubicado en la <strong className="text-amber-200">Casa {activePlanet.house}</strong> • {chart.aspects.filter(a => a.body1 === activePlanet.body || a.body2 === activePlanet.body).length} aspectos activos
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">
            Coloca el cursor sobre un planeta o haz clic para aislar sus aspectos y ver su coordenada exacta.
          </p>
        )}
      </div>
    </div>
  );
}
