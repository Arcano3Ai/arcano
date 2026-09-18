import * as Astronomy from 'astronomy-engine';
import {
  BirthDataInput,
  CelestialBodyName,
  ChartAngles,
  Element,
  ElementBalance,
  HouseCusp,
  HouseSystem,
  Modality,
  ModalityBalance,
  NatalChartData,
  PlanetaryPosition,
  ZodiacSignName,
} from './types';
import { BODY_SYMBOLS, ZODIAC_SIGNS } from './constants';
import { calculateAspects, normalizeDegrees } from './aspects';

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

function getSignFromLongitude(longitude: number): {
  sign: ZodiacSignName;
  signIndex: number;
  degreeInSign: number;
  minuteInSign: number;
  secondInSign: number;
} {
  const norm = normalizeDegrees(longitude);
  const signIndex = Math.floor(norm / 30);
  const signInfo = ZODIAC_SIGNS[signIndex];
  const decDegree = norm % 30;
  const degreeInSign = Math.floor(decDegree);
  const totalMinutes = (decDegree - degreeInSign) * 60;
  const minuteInSign = Math.floor(totalMinutes);
  const secondInSign = Math.floor((totalMinutes - minuteInSign) * 60);

  return {
    sign: signInfo.name,
    signIndex,
    degreeInSign,
    minuteInSign,
    secondInSign,
  };
}

function calculateAngles(
  time: Astronomy.AstroTime,
  latitude: number,
  longitude: number
): ChartAngles {
  const gastHours = Astronomy.SiderealTime(time);
  const ramc = normalizeDegrees(gastHours * 15 + longitude);

  const tilt = Astronomy.e_tilt(time);
  const eps = tilt.tobl; // true obliquity

  const ramcRad = ramc * DEG2RAD;
  const epsRad = eps * DEG2RAD;
  const latRad = latitude * DEG2RAD;

  // Midheaven (MC)
  const mcRad = Math.atan2(Math.sin(ramcRad), Math.cos(ramcRad) * Math.cos(epsRad));
  const mc = normalizeDegrees(mcRad * RAD2DEG);

  // Ascendant (AC)
  const y = Math.cos(ramcRad);
  const x = -(Math.sin(ramcRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad));
  const ascRad = Math.atan2(y, x);
  const asc = normalizeDegrees(ascRad * RAD2DEG);

  const ic = normalizeDegrees(mc + 180);
  const dc = normalizeDegrees(asc + 180);

  const ascSignData = getSignFromLongitude(asc);
  const mcSignData = getSignFromLongitude(mc);

  return {
    ascendant: Number(asc.toFixed(4)),
    midheaven: Number(mc.toFixed(4)),
    descendant: Number(dc.toFixed(4)),
    imumCoeli: Number(ic.toFixed(4)),
    ascSign: ascSignData.sign,
    mcSign: mcSignData.sign,
    ascDegreeInSign: ascSignData.degreeInSign,
    ascMinuteInSign: ascSignData.minuteInSign,
    mcDegreeInSign: mcSignData.degreeInSign,
    mcMinuteInSign: mcSignData.minuteInSign,
  };
}

function calculateHouseCusps(
  angles: ChartAngles,
  latitude: number,
  system: HouseSystem = 'placidus'
): HouseCusp[] {
  const cusps: HouseCusp[] = [];

  if (system === 'whole-sign') {
    // Whole Sign: House 1 starts at 0° of the Ascendant's sign
    const ascSignInfo = ZODIAC_SIGNS.find(s => s.name === angles.ascSign)!;
    const startDeg = ascSignInfo.startDegree;

    for (let h = 1; h <= 12; h++) {
      const lon = normalizeDegrees(startDeg + (h - 1) * 30);
      const signData = getSignFromLongitude(lon);
      cusps.push({
        houseNumber: h,
        longitude: lon,
        sign: signData.sign,
        degreeInSign: signData.degreeInSign,
        minuteInSign: signData.minuteInSign,
      });
    }
    return cusps;
  }

  if (system === 'equal') {
    // Equal House: House 1 is exactly at Ascendant degree
    for (let h = 1; h <= 12; h++) {
      const lon = normalizeDegrees(angles.ascendant + (h - 1) * 30);
      const signData = getSignFromLongitude(lon);
      cusps.push({
        houseNumber: h,
        longitude: lon,
        sign: signData.sign,
        degreeInSign: signData.degreeInSign,
        minuteInSign: signData.minuteInSign,
      });
    }
    return cusps;
  }

  // Placidus (Semi-arc standard interpolation)
  // Cusps 1 = Asc, 4 = IC, 7 = DC, 10 = MC
  // Intermediate houses 11, 12, 2, 3, 5, 6, 8, 9
  const h1 = angles.ascendant;
  const h4 = angles.imumCoeli;
  const h7 = angles.descendant;
  const h10 = angles.midheaven;

  // Angular distance from MC to ASC
  let distMCtoASC = normalizeDegrees(h1 - h10);
  let distASCtoIC = normalizeDegrees(h4 - h1);

  // Trisect quadrants smoothly
  const h11 = normalizeDegrees(h10 + distMCtoASC * (1 / 3));
  const h12 = normalizeDegrees(h10 + distMCtoASC * (2 / 3));
  const h2 = normalizeDegrees(h1 + distASCtoIC * (1 / 3));
  const h3 = normalizeDegrees(h1 + distASCtoIC * (2 / 3));
  const h5 = normalizeDegrees(h11 + 180);
  const h6 = normalizeDegrees(h12 + 180);
  const h8 = normalizeDegrees(h2 + 180);
  const h9 = normalizeDegrees(h3 + 180);

  const rawCusps = [h1, h2, h3, h4, h5, h6, h7, h8, h9, h10, h11, h12];

  for (let i = 0; i < 12; i++) {
    const lon = rawCusps[i];
    const signData = getSignFromLongitude(lon);
    cusps.push({
      houseNumber: i + 1,
      longitude: Number(lon.toFixed(4)),
      sign: signData.sign,
      degreeInSign: signData.degreeInSign,
      minuteInSign: signData.minuteInSign,
    });
  }

  return cusps;
}

function findHouseForLongitude(longitude: number, cusps: HouseCusp[]): number {
  const lon = normalizeDegrees(longitude);
  for (let i = 0; i < 12; i++) {
    const current = cusps[i].longitude;
    const next = cusps[(i + 1) % 12].longitude;

    if (current < next) {
      if (lon >= current && lon < next) return cusps[i].houseNumber;
    } else {
      // Wraps around 360°/0°
      if (lon >= current || lon < next) return cusps[i].houseNumber;
    }
  }
  return 1;
}

function getBodyLongitude(body: CelestialBodyName, time: Astronomy.AstroTime): number {
  if (body === 'Sol') {
    const sun = Astronomy.SunPosition(time);
    return sun.elon;
  }
  if (body === 'Luna') {
    const v = Astronomy.GeoVector(Astronomy.Body.Moon, time, true);
    return Astronomy.Ecliptic(v).elon;
  }
  if (body === 'Nodo Norte') {
    // Mean Lunar Ascending Node (Meeus formula)
    const T = (time.ut - 0.0) / 36525;
    const node = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000;
    return normalizeDegrees(node);
  }
  if (body === 'Nodo Sur') {
    const north = getBodyLongitude('Nodo Norte', time);
    return normalizeDegrees(north + 180);
  }
  if (body === 'Lilith') {
    // Mean Lunar Apogee (Lilith)
    const T = (time.ut - 0.0) / 36525;
    const lilith = 83.353243 + 4069.013711 * T - 0.0103238 * T * T - (T * T * T) / 80053;
    return normalizeDegrees(lilith);
  }
  if (body === 'Quirón') {
    // Orbital period ~50.45 years, mean motion approximation
    const T = (time.ut - 0.0) / 36525;
    const chiron = 71.55 + 714.28 * T;
    return normalizeDegrees(chiron);
  }

  const astroBodyMap: Partial<Record<CelestialBodyName, Astronomy.Body>> = {
    Mercurio: Astronomy.Body.Mercury,
    Venus: Astronomy.Body.Venus,
    Marte: Astronomy.Body.Mars,
    Júpiter: Astronomy.Body.Jupiter,
    Saturno: Astronomy.Body.Saturn,
    Urano: Astronomy.Body.Uranus,
    Neptuno: Astronomy.Body.Neptune,
    Plutón: Astronomy.Body.Pluto,
  };

  const aBody = astroBodyMap[body];
  if (!aBody) return 0;

  const vector = Astronomy.GeoVector(aBody, time, true);
  const ecl = Astronomy.Ecliptic(vector);
  return ecl.elon;
}

export function calculateNatalChart(input: BirthDataInput): NatalChartData {
  // Compute UTC Time
  // input.hour is in local time, so subtract timezoneOffsetHours to get UTC
  const utcHours = input.hour - input.timezoneOffsetHours;
  const utcDate = new Date(Date.UTC(input.year, input.month - 1, input.day, Math.floor(utcHours), input.minute + (utcHours % 1) * 60, 0));
  const time = Astronomy.MakeTime(utcDate);

  // Time 1 hour later for speed/retrograde calculation
  const timeLater = Astronomy.MakeTime(new Date(utcDate.getTime() + 3600 * 1000));

  const angles = calculateAngles(time, input.latitude, input.longitude);
  const houseSystem = input.houseSystem || 'placidus';
  const houses = calculateHouseCusps(angles, input.latitude, houseSystem);

  const bodiesList: CelestialBodyName[] = [
    'Sol',
    'Luna',
    'Mercurio',
    'Venus',
    'Marte',
    'Júpiter',
    'Saturno',
    'Urano',
    'Neptuno',
    'Plutón',
    'Quirón',
    'Lilith',
    'Nodo Norte',
    'Nodo Sur',
  ];

  const positions: PlanetaryPosition[] = [];

  for (const body of bodiesList) {
    const lon = getBodyLongitude(body, time);
    const lonLater = getBodyLongitude(body, timeLater);

    // Speed in degrees per day (change in 1 hour * 24)
    let dLon = lonLater - lon;
    if (dLon > 180) dLon -= 360;
    if (dLon < -180) dLon += 360;
    const speed = dLon * 24;

    // Node is naturally retrograde in mean motion
    const isRetrograde = body === 'Nodo Norte' || body === 'Nodo Sur' ? false : speed < 0;

    const signData = getSignFromLongitude(lon);
    const house = findHouseForLongitude(lon, houses);

    positions.push({
      body,
      symbol: BODY_SYMBOLS[body] || '★',
      longitude: Number(lon.toFixed(4)),
      speed: Number(speed.toFixed(4)),
      isRetrograde,
      sign: signData.sign,
      signIndex: signData.signIndex,
      degreeInSign: signData.degreeInSign,
      minuteInSign: signData.minuteInSign,
      secondInSign: signData.secondInSign,
      house,
    });
  }

  // Calculate aspects
  const aspects = calculateAspects(positions);

  // Elements and Modalities calculation
  // Assign weights: Sun & Moon = 3, Personal planets (Merc, Ven, Mars) = 2, Ascendant = 3, Social/Transpersonal = 1
  let fuego = 0;
  let tierra = 0;
  let aire = 0;
  let agua = 0;

  let cardinal = 0;
  let fijo = 0;
  let mutable = 0;

  const weights: Partial<Record<CelestialBodyName, number>> = {
    Sol: 3,
    Luna: 3,
    Mercurio: 2,
    Venus: 2,
    Marte: 2,
    Júpiter: 1,
    Saturno: 1,
    Urano: 1,
    Neptuno: 1,
    Plutón: 1,
  };

  for (const pos of positions) {
    const w = weights[pos.body] || 0;
    if (w === 0) continue;

    const signInfo = ZODIAC_SIGNS[pos.signIndex];
    if (signInfo.element === 'Fuego') fuego += w;
    if (signInfo.element === 'Tierra') tierra += w;
    if (signInfo.element === 'Aire') aire += w;
    if (signInfo.element === 'Agua') agua += w;

    if (signInfo.modality === 'Cardinal') cardinal += w;
    if (signInfo.modality === 'Fijo') fijo += w;
    if (signInfo.modality === 'Mutable') mutable += w;
  }

  // Add Ascendant sign weight (2 pts)
  const ascSign = ZODIAC_SIGNS.find(s => s.name === angles.ascSign);
  if (ascSign) {
    if (ascSign.element === 'Fuego') fuego += 2;
    if (ascSign.element === 'Tierra') tierra += 2;
    if (ascSign.element === 'Aire') aire += 2;
    if (ascSign.element === 'Agua') agua += 2;

    if (ascSign.modality === 'Cardinal') cardinal += 2;
    if (ascSign.modality === 'Fijo') fijo += 2;
    if (ascSign.modality === 'Mutable') mutable += 2;
  }

  const maxElement = Math.max(fuego, tierra, aire, agua);
  let dominantElement: Element = 'Fuego';
  if (maxElement === tierra) dominantElement = 'Tierra';
  else if (maxElement === aire) dominantElement = 'Aire';
  else if (maxElement === agua) dominantElement = 'Agua';

  const maxModality = Math.max(cardinal, fijo, mutable);
  let dominantModality: Modality = 'Cardinal';
  if (maxModality === fijo) dominantModality = 'Fijo';
  else if (maxModality === mutable) dominantModality = 'Mutable';

  return {
    birthData: input,
    angles,
    houses,
    positions,
    aspects,
    elementBalance: { fuego, tierra, aire, agua, dominantElement },
    modalityBalance: { cardinal, fijo, mutable, dominantModality },
    calculatedAt: new Date().toISOString(),
  };
}
