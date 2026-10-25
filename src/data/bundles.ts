import { majorArcanaTalismans } from "./majorArcanaTalismans";
import type { ShopProduct } from "./shop";
import { getWhatsAppUrl } from "@/config/brandConfig";

export interface ArcanoBundle {
  id: string;
  name: string;
  tagline: string;
  description: string;
  items: ShopProduct[];
  originalPrice: number;
  discountPercentage: number; // 20
  bundlePrice: number;        // originalPrice * 0.80
  savings: number;            // originalPrice * 0.20
  badge: string;
  imageUrl: string;
  idealFor: string;
}

const ROMAN_MAP: Record<number, string> = {
  0: "0-el-loco",
  1: "i-el-mago",
  2: "ii-la-sacerdotisa",
  3: "iii-la-emperatriz",
  4: "iv-el-emperador",
  5: "v-el-hierofante",
  6: "vi-los-enamorados",
  7: "vii-el-carro",
  8: "viii-la-fuerza",
  9: "ix-el-ermitano",
  10: "x-la-rueda",
  11: "xi-la-justicia",
  12: "xii-el-colgado",
  13: "xiii-la-muerte",
  14: "xiv-la-templanza",
  15: "xv-el-diablo",
  16: "xvi-la-torre",
  17: "xvii-la-estrella",
  18: "xviii-la-luna",
  19: "xix-el-sol",
  20: "xx-el-juicio",
  21: "xxi-el-mundo",
};

// Helper infalible para encontrar un arcano mayor por índice 0 a 21
export function getArcanoByIndex(num: number | string): ShopProduct {
  const n = typeof num === "string" ? parseInt(num, 10) : num;
  const safeIdx = isNaN(n) ? 1 : Math.max(0, Math.min(21, n));
  const key = ROMAN_MAP[safeIdx] || "i-el-mago";
  const found = majorArcanaTalismans.find((a) => a.id.includes(`talisman-arcano-${key}`));
  if (found) return found;
  return majorArcanaTalismans[safeIdx] || majorArcanaTalismans[0];
}

// Función fábrica para crear bundles con 20% de descuento matemático
export function createBundle(
  id: string,
  name: string,
  tagline: string,
  description: string,
  arcanoNumbers: [number, number, number],
  badge: string,
  idealFor: string
): ArcanoBundle {
  const items = arcanoNumbers.map(getArcanoByIndex);
  const originalPrice = items.reduce((sum, item) => sum + item.price, 0);
  const bundlePrice = Math.round(originalPrice * 0.80);
  const savings = originalPrice - bundlePrice;

  return {
    id,
    name,
    tagline,
    description,
    items,
    originalPrice,
    discountPercentage: 20,
    bundlePrice,
    savings,
    badge,
    imageUrl: items[0].imageUrl,
    idealFor,
  };
}

// 6 Tríadas Arquetípicas Sagradas predeterminadas de 3 cartas (20% OFF)
export const CURATED_TRIAD_BUNDLES: ArcanoBundle[] = [
  createBundle(
    "bundle-triada-poder-creacion",
    "Tríada de Creación & Soberanía",
    "El Mago · La Emperatriz · El Emperador",
    "La trinidad primordial de la manifestación material: la chispa creadora (El Mago), la abundancia nutricia terrenal (La Emperatriz) y el orden y estructura soberana (El Emperador).",
    [1, 3, 4],
    "TRÍADA #1 · MANIFESTACIÓN Y PODER",
    "Emprendedores, líderes, creadores y quienes buscan materializar visiones de gran escala."
  ),
  createBundle(
    "bundle-triada-sabiduria-intuicion",
    "Tríada de Intuición & Sabiduría Interior",
    "La Sacerdotisa · El Ermitaño · La Templanza",
    "El sendero místico de la introspección sagrada: la percepción oculta del velo (La Sacerdotisa), la luz solitaria de la verdad (El Ermitaño) y la alquimia armónica del espíritu (La Templanza).",
    [2, 9, 14],
    "TRÍADA #2 · CLARIDAD Y GUÍA ESPIRITUAL",
    "Terapeutas, buscadores espirituales, astrólogos y quienes transitan momentos de introspección profunda."
  ),
  createBundle(
    "bundle-triada-fortuna-victoria",
    "Tríada de Victoria & Éxito Solar",
    "El Carro · La Rueda de la Fortuna · El Sol",
    "El dinamismo imparable del avance triunfal: el impulso victorioso que doblega la inercia (El Carro), la alineación con los ciclos de la providencia (La Rueda) y la radiación luminosa de plenitud y dicha (El Sol).",
    [7, 10, 19],
    "TRÍADA #3 · PROSPERIDAD Y EXPANSIÓN",
    "Quienes inician nuevos ciclos comerciales, proyectos audaces o buscan atraer abundancia radiante."
  ),
  createBundle(
    "bundle-triada-proteccion-transmutacion",
    "Tríada de Protección & Transmutación",
    "La Fuerza · La Muerte · El Diablo",
    "La maestría sobre las sombras y la potencia instintiva: la serenidad que doma a la bestia (La Fuerza), la poda radical de lo caduco (La Muerte) y el dominio consciente de la energía telúrica primordial (El Diablo).",
    [8, 13, 15],
    "TRÍADA #4 · CORAJE Y TRANSFORMACIÓN",
    "Procesos de duelo, desapego, purificación de adicciones, protección energética y renacimiento personal."
  ),
  createBundle(
    "bundle-triada-cosmos-gran-obra",
    "Tríada Cósmica de la Gran Obra",
    "La Estrella · La Luna · El Mundo",
    "La culminación del viaje iniciático hermético: la esperanza celestial de aguas puras (La Estrella), el descenso al misterio de los sueños y el inconsciente (La Luna) y la danza victoriosa de la totalidad cósmica (El Mundo).",
    [17, 18, 21],
    "TRÍADA #5 · ILUMINACIÓN Y TOTALIDAD",
    "Artistas, visionarios, practicantes del tarot y quienes celebran la consumación de una etapa de vida trascendental."
  ),
  createBundle(
    "bundle-triada-despertar-libre",
    "Tríada del Despertar Libre & Destino",
    "El Loco · La Justicia · El Juicio",
    "El despertar lúcido del alma consciente: el salto de fe sin condicionamientos (El Loco), el balance kármico de causa y efecto (La Justicia) y la trompeta del llamado inaplazable de tu vocación más elevada (El Juicio).",
    [0, 11, 20],
    "TRÍADA #6 · LIBERACIÓN Y DESTINO",
    "Momentos de encrucijada vital, decisiones cruciales de carrera y alineación con el propósito de vida."
  ),
];

// Cálculo de Arcano Natal según Fecha de Nacimiento (Día + Mes + Año reducido a 0-21)
export function calculateBirthArcanoNumber(dateStr: string): number {
  if (!dateStr) return 1;
  const digits = dateStr.replace(/\D/g, "").split("").map(Number);
  if (digits.length === 0) return 1;
  let sum = digits.reduce((acc, d) => acc + d, 0);
  while (sum > 21) {
    const subDigits = String(sum).split("").map(Number);
    sum = subDigits.reduce((acc, d) => acc + d, 0);
  }
  return sum; // 0 a 21
}

// Genera un bundle dinámico personalizado con las 3 cartas reveladas en la tirada virtual
export function createCustomBundleFromCards(
  cards: ShopProduct[],
  consultanteName?: string,
  birthDate?: string
): ArcanoBundle {
  const originalPrice = cards.reduce((sum, item) => sum + item.price, 0);
  const bundlePrice = Math.round(originalPrice * 0.80);
  const savings = originalPrice - bundlePrice;

  const names = cards.map((c) => c.name.split(" (")[0]).join(" · ");

  return {
    id: `custom-bundle-${Date.now()}`,
    name: `Tríada Sagrada Revelada${consultanteName ? ` para ${consultanteName}` : ""}`,
    tagline: names,
    description: `Tu tríada personal canalizada en la tirada oracular virtual${
      birthDate ? ` sintonizada con tu fecha natal (${birthDate})` : ""
    }. Los tres arcanos que rigen tu Origen, Presente y Destino en una colección única con 20% de descuento.`,
    items: cards,
    originalPrice,
    discountPercentage: 20,
    bundlePrice,
    savings,
    badge: "20% OFF · TRÍADA PERSONAL REVELADA",
    imageUrl: cards[0]?.imageUrl || "/images/shop/aurum_hero_wrist.jpg",
    idealFor: "Sintonización personalizada con tu tirada oracular y propósito del momento.",
  };
}

// Constructor de URL de WhatsApp para adquirir el bundle por Concierge VIP
export function buildBundleWhatsAppUrl(
  bundle: ArcanoBundle,
  selectedZone: string,
  consultanteName?: string,
  birthDate?: string
): string {
  const itemsText = bundle.items
    .map((item, idx) => {
      const posLabel = idx === 0 ? "Origen / Raíz" : idx === 1 ? "Presente / Desafío" : "Destino / Manifestación";
      return `  ✦ [${posLabel}]: ${item.name} (${item.stoneType})`;
    })
    .join("\n");

  const msg =
    `¡Hola ARCANO Concierge! 🔮✨\n\n` +
    `Realicé mi Tirada Oracular Virtual de 3 Cartas en la tienda${
      consultanteName ? ` para ${consultanteName}` : ""
    }${birthDate ? ` (nac. ${birthDate})` : ""}.\n\n` +
    `🏛️ Mi Tríada de Arcanos:\n${itemsText}\n\n` +
    `💎 Deseo ordenar mi Bundle Sagrado de 3 Talismanes con el 20% de descuento:\n` +
    `• Precio Regular (3 piezas): $${bundle.originalPrice.toLocaleString("es-MX")} MXN\n` +
    `• Precio Especial Tríada (20% OFF): $${bundle.bundlePrice.toLocaleString("es-MX")} MXN\n` +
    `• Ahorro de la Tríada: $${bundle.savings.toLocaleString("es-MX")} MXN\n` +
    `📍 Zona de Entrega VIP en MTY: ${selectedZone}\n\n` +
    `Por favor confírmenme para coordinar la entrega privada de mis tres piezas consagradas.`;

  return getWhatsAppUrl(msg);
}
