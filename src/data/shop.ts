import { majorArcanaTalismans } from "./majorArcanaTalismans";
import { minorArcanaTalismans } from './minorArcanaTalismans';
export interface ShopCategory {
  id: string;
  slug: string;
  name: string;
  description: string;
  symbol: string;
}

export interface GoldSpecification {
  metal: string;
  gemstones: string;
  clasp?: string;
  packaging?: string;
  certificate?: string;
}

export interface BeadMatrixSpecification {
  archetype: string;
  mainBody: string;      // 19 cuentas - 8 mm
  lateralBeads: string;  // 2 cuentas - 8 mm
  centerPiece: string;   // 1 cuenta - 10 mm
  totalBeads: number;    // 22 cuentas
}

export interface ShopProduct {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  categoryName: string;
  theme?: "doble-perforacion" | "reiki" | "runas" | "geometria" | "angelical" | "altar" | "talismanes" | "duos" | "alta-joyeria-oro" | "ambar-chiapas" | "coleccion-arcanos";
  isDoublePerforation?: boolean;
  price: number;
  formattedPrice: string;
  shippingNote: string;
  tagline: string;
  description: string;
  ritualUse: string;
  details: string[];
  inStock: boolean;
  badge?: string;
  imageUrl: string;
  secondaryImageUrl?: string;
  images?: string[];
  stoneType?: string;
  beadSize?: string;
  featured?: boolean;
  duoPairId?: string;
  duoPairName?: string;
  duoPairPrice?: number;
  braceletPairId?: string;
  goldSpecifications?: GoldSpecification;
  arcanoNumber?: string;
  intentionWords?: string[];
  arcanoStory?: string;
  beadMatrix?: BeadMatrixSpecification;
}

export interface CreativeProcessImage {
  id: string;
  src: string;
  title: string;
  caption: string;
}

export const creativeProcessGallery: CreativeProcessImage[] = [
  {
    id: "proceso-1",
    src: "/images/shop/proceso/proceso-creativo-1.jpeg",
    title: "Creación en Plena Naturaleza",
    caption: "Trazado a mano y pinceladas áureas sobre piedras de río recolectadas en cauce natural.",
  },
  {
    id: "proceso-2",
    src: "/images/shop/proceso/proceso-creativo-2.jpeg",
    title: "Detalle de Símbolos Sagrados",
    caption: "Pintado minucioso de runas, geometrías y sellos de luz bajo la luz del sol.",
  },
  {
    id: "proceso-3",
    src: "/images/shop/proceso/proceso-creativo-3.jpeg",
    title: "Encuentro Creativo en Comunidad",
    caption: "Compartiendo la devoción del arte manual y la intención ceremonial en grupo.",
  },
  {
    id: "proceso-4",
    src: "/images/shop/proceso/proceso-creativo-4.jpeg",
    title: "Concentración y Precisión",
    caption: "Cada curva y pigmento se asienta sobre la morfología mineral única de cada piedra.",
  },
  {
    id: "proceso-5",
    src: "/images/shop/proceso/proceso-creativo-5.jpeg",
    title: "Taller al Aire Libre",
    caption: "Inspiración directa conectando con los elementos: tierra, agua y aire libre.",
  },
  {
    id: "proceso-6",
    src: "/images/shop/proceso/proceso-creativo-6.jpeg",
    title: "Selección y Pigmentos Dorados",
    caption: "Aplicación de tonos oro y sellado protector para preservar la obra en el altar.",
  },
  {
    id: "proceso-7",
    src: "/images/shop/proceso/proceso-creativo-7.jpeg",
    title: "Compañerismo & Propósito",
    caption: "El trabajo artesanal como vía de meditación activa y presencia plena.",
  },
  {
    id: "proceso-8",
    src: "/images/shop/proceso/proceso-creativo-8.jpeg",
    title: "Texturas y Formas Fluviales",
    caption: "Respetando los cantos rodados originales pulidos durante décadas por la corriente.",
  },
  {
    id: "proceso-9",
    src: "/images/shop/proceso/proceso-creativo-9.jpeg",
    title: "El Alma de Cada Pieza",
    caption: "Manos artesanas que transmiten calidez y reverencia en cada trazo ceremonial.",
  },
  {
    id: "proceso-10",
    src: "/images/shop/proceso/proceso-creativo-10.jpeg",
    title: "Consagración al Fuego",
    caption: "Sesión nocturna de pintura y activación junto a las brasas de la fogata sagrada.",
  },
  {
    id: "proceso-11",
    src: "/images/shop/proceso/proceso-creativo-11.jpeg",
    title: "Alquimia Ceremonial",
    caption: "El fuego como cuarto elemento que sella la energía viva de cada piedra de río.",
  },
];

export const artisanManifesto = {
  eyebrow: "Colección Viva de Piezas Únicas de Río",
  title: "Cada proceso es diferente, cada colección es diferente, cada piedra es única",
  description:
    "Nuestras piezas provienen de cauces naturales de río moldeados por el agua durante siglos. Ninguna piedra es idéntica a otra: cada una es recolectada a mano, taladrada y pintada a mano con pigmentos áureos bajo momentos ceremoniales propicios. La forma, textura, peso y vetas de la pieza que llegue a tus manos serán irrepetibles, guardando una impronta sagrada y personal para tu altar.",
  highlights: [
    {
      title: "Piedras Naturales de Río",
      text: "Extraídas respetando el cauce, pulidas de manera orgánica por la corriente fluvial.",
    },
    {
      title: "Taladrado Simple & Doble Perforación",
      text: "Orificios individuales o duales para sahumerio simultáneo y mezclas aromáticas.",
    },
    {
      title: "Consagración Individual",
      text: "Cada pieza se entrega purificada con humo de resinas sagradas antes de su envío.",
    },
  ],
};

export const shopCategories: ShopCategory[] = [
  {
    id: "todos",
    slug: "todos",
    name: "Baraja Completa (78)",
    description: "La Gran Obra Hermética: los 78 Arcanos consagrados en pura piedra mineral natural.",
    symbol: "✦",
  },
  {
    id: "mayores",
    slug: "mayores",
    name: "Arcanos Mayores (22)",
    description: "Los 22 Arquetipos del Destino y el gran viaje del alma.",
    symbol: "👑",
  },
  {
    id: "bastos",
    slug: "bastos",
    name: "Bastos · Fuego (14)",
    description: "Voluntad, pasión, impulso creador y temple guerrero en Lava, Ojo de Tigre y Cornalina.",
    symbol: "🔥",
  },
  {
    id: "copas",
    slug: "copas",
    name: "Copas · Agua (14)",
    description: "Amor incondicional, intuición, sanación y mística en Cuarzo Rosa, Amatista y Opalina.",
    symbol: "💧",
  },
  {
    id: "espadas",
    slug: "espadas",
    name: "Espadas · Aire (14)",
    description: "Claridad mental, verdad, discernimiento y estrategia en Sodalita, Howlita y Hematita.",
    symbol: "⚔️",
  },
  {
    id: "oros",
    slug: "oros",
    name: "Oros · Tierra (14)",
    description: "Abundancia material, prosperidad, riqueza y estabilidad en Aventurina, Jaspe y Pirita.",
    symbol: "🪙",
  },
  {
    id: "azules",
    slug: "azules",
    name: "Azules & Intuición",
    description: "Talismanes de visión profunda forjados con Lapislázuli Real, Sodalita y Cuarzo Azul.",
    symbol: "🌊",
  },
  {
    id: "verdes",
    slug: "verdes",
    name: "Verdes & Abundancia",
    description: "Frecuencias telúricas de Jade Nefrita, Aventurina Verde y Malaquita.",
    symbol: "🌿",
  },
  {
    id: "tierra",
    slug: "tierra",
    name: "Dorados & Fuego",
    description: "Fuego solar y magnetismo con Ojo de Tigre, Citrino, Cornalina y Jaspe Rojo.",
    symbol: "☀️",
  },
  {
    id: "oscuros",
    slug: "oscuros",
    name: "Oscuros & Protección",
    description: "Escudos protectores en Ónix Negro, Lava Volcánica, Hematita Metálica y Cuarzo Ahumado.",
    symbol: "🛡️",
  },
  {
    id: "claridad",
    slug: "claridad",
    name: "Blancos & Claridad",
    description: "Canalización de luz pura con Howlita Blanca, Piedra Luna, Cuarzo Cristal y Amatista.",
    symbol: "✨",
  },
];

export const shopProducts: ShopProduct[] = [
  // ==========================================
  // LA GRAN OBRA HERMÉTICA · BARAJA COMPLETA DE 78 ARCANOS
  // 100% Pura Piedra Mineral Grado AAA · Calibre Uniforme 8mm
  // ==========================================
  ...majorArcanaTalismans,
  ...minorArcanaTalismans,
];
