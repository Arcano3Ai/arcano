import { ZodiacSignInfo, AspectInfo, AspectType, CelestialBodyName } from './types';

export const ZODIAC_SIGNS: ZodiacSignInfo[] = [
  { index: 0, name: 'Aries', symbol: '♈', element: 'Fuego', modality: 'Cardinal', polarity: 'Yang', ruler: 'Marte', startDegree: 0 },
  { index: 1, name: 'Tauro', symbol: '♉', element: 'Tierra', modality: 'Fijo', polarity: 'Yin', ruler: 'Venus', startDegree: 30 },
  { index: 2, name: 'Géminis', symbol: '♊', element: 'Aire', modality: 'Mutable', polarity: 'Yang', ruler: 'Mercurio', startDegree: 60 },
  { index: 3, name: 'Cáncer', symbol: '♋', element: 'Agua', modality: 'Cardinal', polarity: 'Yin', ruler: 'Luna', startDegree: 90 },
  { index: 4, name: 'Leo', symbol: '♌', element: 'Fuego', modality: 'Fijo', polarity: 'Yang', ruler: 'Sol', startDegree: 120 },
  { index: 5, name: 'Virgo', symbol: '♍', element: 'Tierra', modality: 'Mutable', polarity: 'Yin', ruler: 'Mercurio', startDegree: 150 },
  { index: 6, name: 'Libra', symbol: '♎', element: 'Aire', modality: 'Cardinal', polarity: 'Yang', ruler: 'Venus', startDegree: 180 },
  { index: 7, name: 'Escorpio', symbol: '♏', element: 'Agua', modality: 'Fijo', polarity: 'Yin', ruler: 'Plutón / Marte', startDegree: 210 },
  { index: 8, name: 'Sagitario', symbol: '♐', element: 'Fuego', modality: 'Mutable', polarity: 'Yang', ruler: 'Júpiter', startDegree: 240 },
  { index: 9, name: 'Capricornio', symbol: '♑', element: 'Tierra', modality: 'Cardinal', polarity: 'Yin', ruler: 'Saturno', startDegree: 270 },
  { index: 10, name: 'Acuario', symbol: '♒', element: 'Aire', modality: 'Fijo', polarity: 'Yang', ruler: 'Urano / Saturno', startDegree: 300 },
  { index: 11, name: 'Piscis', symbol: '♓', element: 'Agua', modality: 'Mutable', polarity: 'Yin', ruler: 'Neptuno / Júpiter', startDegree: 330 },
];

export const BODY_SYMBOLS: Record<CelestialBodyName, string> = {
  'Sol': '☉',
  'Luna': '☽',
  'Mercurio': '☿',
  'Venus': '♀',
  'Marte': '♂',
  'Júpiter': '♃',
  'Saturno': '♄',
  'Urano': '♅',
  'Neptuno': '♆',
  'Plutón': '♇',
  'Quirón': '⚷',
  'Lilith': '⚸',
  'Nodo Norte': '☊',
  'Nodo Sur': '☋',
};

export const ASPECT_DEFINITIONS: Record<AspectType, AspectInfo> = {
  conjunction: {
    type: 'conjunction',
    name: 'Conjunción',
    symbol: '☌',
    angle: 0,
    maxOrb: 8.0,
    nature: 'variable',
    color: '#D4AF37', // Oro alquímico
  },
  sextile: {
    type: 'sextile',
    name: 'Sextil',
    symbol: '⚹',
    angle: 60,
    maxOrb: 6.0,
    nature: 'harmonic',
    color: '#38BDF8', // Celeste cielo
  },
  square: {
    type: 'square',
    name: 'Cuadratura',
    symbol: '□',
    angle: 90,
    maxOrb: 7.0,
    nature: 'tense',
    color: '#F43F5E', // Rubí / Tensión
  },
  trine: {
    type: 'trine',
    name: 'Trígono',
    symbol: '△',
    angle: 120,
    maxOrb: 8.0,
    nature: 'harmonic',
    color: '#10B981', // Esmeralda / Armonía
  },
  opposition: {
    type: 'opposition',
    name: 'Oposición',
    symbol: '☍',
    angle: 180,
    maxOrb: 8.0,
    nature: 'tense',
    color: '#EC4899', // Magenta místico / Polaridad
  },
  quincunx: {
    type: 'quincunx',
    name: 'Quincuncio',
    symbol: '⚻',
    angle: 150,
    maxOrb: 3.0,
    nature: 'variable',
    color: '#A855F7', // Violeta esotérico
  },
};

export const ELEMENT_COLORS = {
  Fuego: { text: '#F87171', bg: 'rgba(239, 68, 68, 0.15)', border: '#EF4444' },
  Tierra: { text: '#34D399', bg: 'rgba(16, 185, 129, 0.15)', border: '#10B981' },
  Aire: { text: '#60A5FA', bg: 'rgba(59, 130, 246, 0.15)', border: '#3B82F6' },
  Agua: { text: '#818CF8', bg: 'rgba(99, 102, 241, 0.15)', border: '#6366F1' },
};
