export type ZodiacSignName =
  | 'Aries'
  | 'Tauro'
  | 'Géminis'
  | 'Cáncer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Escorpio'
  | 'Sagitario'
  | 'Capricornio'
  | 'Acuario'
  | 'Piscis';

export type Element = 'Fuego' | 'Tierra' | 'Aire' | 'Agua';
export type Modality = 'Cardinal' | 'Fijo' | 'Mutable';
export type Polarity = 'Yang' | 'Yin';

export interface ZodiacSignInfo {
  index: number; // 0 to 11
  name: ZodiacSignName;
  symbol: string;
  element: Element;
  modality: Modality;
  polarity: Polarity;
  ruler: string;
  startDegree: number;
}

export type CelestialBodyName =
  | 'Sol'
  | 'Luna'
  | 'Mercurio'
  | 'Venus'
  | 'Marte'
  | 'Júpiter'
  | 'Saturno'
  | 'Urano'
  | 'Neptuno'
  | 'Plutón'
  | 'Quirón'
  | 'Lilith'
  | 'Nodo Norte'
  | 'Nodo Sur';

export type HouseSystem = 'placidus' | 'whole-sign' | 'equal';

export type AspectType =
  | 'conjunction'
  | 'sextile'
  | 'square'
  | 'trine'
  | 'opposition'
  | 'quincunx';

export interface AspectInfo {
  type: AspectType;
  name: string;
  symbol: string;
  angle: number;
  maxOrb: number;
  nature: 'harmonic' | 'tense' | 'neutral' | 'variable';
  color: string;
}

export interface Aspect {
  body1: CelestialBodyName;
  body2: CelestialBodyName;
  aspectType: AspectType;
  angle: number;
  diff: number;
  orb: number;
  isApplying: boolean;
  nature: 'harmonic' | 'tense' | 'neutral' | 'variable';
}

export interface PlanetaryPosition {
  body: CelestialBodyName;
  symbol: string;
  longitude: number; // 0 - 360°
  latitude?: number;
  speed: number;
  isRetrograde: boolean;
  sign: ZodiacSignName;
  signIndex: number;
  degreeInSign: number;
  minuteInSign: number;
  secondInSign: number;
  house: number; // 1 to 12
}

export interface HouseCusp {
  houseNumber: number; // 1 to 12
  longitude: number;
  sign: ZodiacSignName;
  degreeInSign: number;
  minuteInSign: number;
}

export interface ChartAngles {
  ascendant: number;
  midheaven: number;
  descendant: number;
  imumCoeli: number;
  ascSign: ZodiacSignName;
  mcSign: ZodiacSignName;
  ascDegreeInSign: number;
  ascMinuteInSign: number;
  mcDegreeInSign: number;
  mcMinuteInSign: number;
}

export interface ElementBalance {
  fuego: number;
  tierra: number;
  aire: number;
  agua: number;
  dominantElement: Element;
}

export interface ModalityBalance {
  cardinal: number;
  fijo: number;
  mutable: number;
  dominantModality: Modality;
}

export interface BirthDataInput {
  name: string;
  year: number;
  month: number; // 1-12
  day: number;
  hour: number; // 0-23
  minute: number; // 0-59
  cityName: string;
  latitude: number;
  longitude: number;
  timezoneOffsetHours: number; // e.g. -5 for UTC-5, 1 for UTC+1
  houseSystem?: HouseSystem;
}

export interface NatalChartData {
  birthData: BirthDataInput;
  angles: ChartAngles;
  houses: HouseCusp[];
  positions: PlanetaryPosition[];
  aspects: Aspect[];
  elementBalance: ElementBalance;
  modalityBalance: ModalityBalance;
  calculatedAt: string;
}

export interface SynastryAspect {
  bodyA: CelestialBodyName;
  bodyB: CelestialBodyName;
  aspectType: AspectType;
  angle: number;
  diff: number;
  orb: number;
  nature: 'harmonic' | 'tense' | 'neutral' | 'variable';
  interpretation?: string;
}

export interface SynastryScores {
  overall: number; // 0 to 100
  chemistry: number; // 0 to 100 (passion / attraction)
  communication: number; // 0 to 100 (intellectual harmony)
  stability: number; // 0 to 100 (long term durability)
  soulConnection: number; // 0 to 100 (spiritual & karmic depth)
}

export interface SynastrySection {
  title: string;
  subtitle: string;
  verdict: string;
  description: string;
}

export interface SynastryCategorizedAspects {
  harmonics: SynastryAspect[];
  tensions: SynastryAspect[];
  conjunctions: SynastryAspect[];
}

export interface RelationalArcanum {
  cardNumber: number;
  name: string;
  archetype: string;
  element: string;
  message: string;
  counsel: string;
}

export interface SynastryReport {
  chartA: NatalChartData;
  chartB: NatalChartData;
  crossAspects: SynastryAspect[];
  scores: SynastryScores;
  overview: string;
  strengths: string[];
  challenges: string[];
  arcanumCounsel: string;
  sunDynamic: SynastrySection;
  moonDynamic: SynastrySection;
  eroticChemistry: SynastrySection;
  karmicDestiny: SynastrySection;
  categorizedAspects: SynastryCategorizedAspects;
  relationalArcanum: RelationalArcanum;
}

