"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

export interface VeinGemHotspot {
  id: string;
  nameEs: string;
  titleEn: string;
  shortNameEs: string;
  shortNameEn: string;
  badgeSide: "left" | "right";
  vibeEs: string;
  vibeEn: string;
  accentColor: string;
  element: "Éter" | "Fuego" | "Agua" | "Tierra" | "Aire";
  itemCount: number;
  topPercent: number;    // % vertical exacto en la imagen de la veta
  leftPercent: number;   // % horizontal exacto en la imagen de la veta
  gemImage: string;      // Imagen recortada circular de la gema
  arcanoRef?: string;    // Arcano regente asociado
  tramo?: 1 | 2;
}

/**
 * TRAMO I: FALLA SUPERIOR (20 MINERALES ANCESTRALES)
 * Imagen: /images/shop/reference_user_vein.jpg (960x2560)
 * Lados de las etiquetas estrictamente alternados para garantizar CERO solapamientos en móvil.
 */
export const VEIN_TRAMO1_GEMS: VeinGemHotspot[] = [
  {
    id: "Cuarzo Cristal",
    nameEs: "Drusa de Cuarzo Cristal",
    titleEn: "Master Quartz Cluster",
    shortNameEs: "Cuarzo Cristal",
    shortNameEn: "Clear Quartz",
    badgeSide: "left",
    vibeEs: "Amplificación Energética & Conexión Universal",
    vibeEn: "Energy Amplification & Universal Flow",
    accentColor: "#F8FAFC",
    element: "Éter",
    itemCount: 4,
    topPercent: 4.3,
    leftPercent: 45.8,
    gemImage: "/images/shop/vein_gems/01_cuarzo_cristal.png",
    arcanoRef: "Arcano XIV · La Templanza",
    tramo: 1,
  },
  {
    id: "Cuarzo Rosa",
    nameEs: "Cuarzo Rosa Sagrado",
    titleEn: "Sacred Rose Quartz",
    shortNameEs: "Cuarzo Rosa",
    shortNameEn: "Rose Quartz",
    badgeSide: "right",
    vibeEs: "Amor Incondicional, Ternura & Paz Profunda",
    vibeEn: "Unconditional Love & Inner Peace",
    accentColor: "#F472B6",
    element: "Agua",
    itemCount: 5,
    topPercent: 13.3,
    leftPercent: 64.6,
    gemImage: "/images/shop/vein_gems/02_cuarzo_rosa.png",
    arcanoRef: "Arcano III · La Emperatriz",
    tramo: 1,
  },
  {
    id: "Amatista",
    nameEs: "Geoda de Amatista Imperial",
    titleEn: "Imperial Amethyst Geode",
    shortNameEs: "Amatista",
    shortNameEn: "Amethyst",
    badgeSide: "left",
    vibeEs: "Transmutación Espiritual & Tercer Ojo",
    vibeEn: "Spiritual Transmutation & Intuition",
    accentColor: "#A855F7",
    element: "Éter",
    itemCount: 8,
    topPercent: 20.7,
    leftPercent: 51.0,
    gemImage: "/images/shop/vein_gems/03_amatista.png",
    arcanoRef: "Arcano XIV · La Templanza",
    tramo: 1,
  },
  {
    id: "Ojo de Tigre",
    nameEs: "Ojo de Tigre Solar",
    titleEn: "Imperial Tiger Eye",
    shortNameEs: "Ojo de Tigre",
    shortNameEn: "Tiger's Eye",
    badgeSide: "right",
    vibeEs: "Coraje, Foco Solar & Escudo Protector",
    vibeEn: "Courage, Solar Will & Shielding",
    accentColor: "#F59E0B",
    element: "Fuego",
    itemCount: 14,
    topPercent: 28.5,
    leftPercent: 50.0,
    gemImage: "/images/shop/vein_gems/04_ojo_tigre.png",
    arcanoRef: "Arcano VIII · La Fuerza",
    tramo: 1,
  },
  {
    id: "Obsidiana",
    nameEs: "Obsidiana Negra & Ónix",
    titleEn: "Black Obsidian & Onyx",
    shortNameEs: "Obsidiana",
    shortNameEn: "Obsidian",
    badgeSide: "left",
    vibeEs: "Enraizamiento Profundo & Espejo de Verdad",
    vibeEn: "Deep Grounding & Mirror of Truth",
    accentColor: "#71717A",
    element: "Tierra",
    itemCount: 6,
    topPercent: 35.5,
    leftPercent: 43.8,
    gemImage: "/images/shop/vein_gems/05_obsidiana.png",
    arcanoRef: "Arcano XV · El Diablo",
    tramo: 1,
  },
  {
    id: "Howlita",
    nameEs: "Howlita Blanca Turquesa",
    titleEn: "White Veined Howlite",
    shortNameEs: "Howlita",
    shortNameEn: "Howlite",
    badgeSide: "right",
    vibeEs: "Calma Mental, Sueño Sagrado & Paciencia",
    vibeEn: "Mental Stillness & Pure Patience",
    accentColor: "#E2E8F0",
    element: "Aire",
    itemCount: 2,
    topPercent: 40.6,
    leftPercent: 52.1,
    gemImage: "/images/shop/vein_gems/06_howlita.png",
    arcanoRef: "Arcano XVII · La Estrella",
    tramo: 1,
  },
  {
    id: "Jaspe Rojo",
    nameEs: "Jaspe Rojo Telúrico",
    titleEn: "Telluric Red Jasper",
    shortNameEs: "Jaspe Rojo",
    shortNameEn: "Red Jasper",
    badgeSide: "left",
    vibeEs: "Fuerza Vital, Resistencia & Kundalini",
    vibeEn: "Vital Life Force & Root Power",
    accentColor: "#DC2626",
    element: "Tierra",
    itemCount: 5,
    topPercent: 45.3,
    leftPercent: 42.7,
    gemImage: "/images/shop/vein_gems/07_jaspe_rojo.png",
    arcanoRef: "Arcano IV · El Emperador",
    tramo: 1,
  },
  {
    id: "Sodalita",
    nameEs: "Sodalita Azul Profundo",
    titleEn: "Deep Blue Sodalite",
    shortNameEs: "Sodalita",
    shortNameEn: "Sodalite",
    badgeSide: "right",
    vibeEs: "Claridad Mental, Voz Auténtica & Verdad",
    vibeEn: "Mental Clarity & Authentic Expression",
    accentColor: "#3B82F6",
    element: "Aire",
    itemCount: 4,
    topPercent: 49.2,
    leftPercent: 54.2,
    gemImage: "/images/shop/vein_gems/08_sodalita.png",
    arcanoRef: "Arcano V · El Sumo Sacerdote",
    tramo: 1,
  },
  {
    id: "Cornalina",
    nameEs: "Cornalina Ígnea Sagrada",
    titleEn: "Igneous Carnelian",
    shortNameEs: "Cornalina",
    shortNameEn: "Carnelian",
    badgeSide: "left",
    vibeEs: "Fuego Creador, Pasión & Confianza",
    vibeEn: "Creative Fire & Vital Passion",
    accentColor: "#EA580C",
    element: "Fuego",
    itemCount: 6,
    topPercent: 54.3,
    leftPercent: 47.9,
    gemImage: "/images/shop/vein_gems/09_cornalina.png",
    arcanoRef: "Arcano I · El Mago",
    tramo: 1,
  },
  {
    id: "Cuarzo Ahumado",
    nameEs: "Cuarzo Ahumado Espectral",
    titleEn: "Smoky Quartz Cluster",
    shortNameEs: "Cuarzo Ahumado",
    shortNameEn: "Smoky Quartz",
    badgeSide: "right",
    vibeEs: "Transmutación de Sombras & Escudo Terrestre",
    vibeEn: "Shadow Transmutation & Earth Anchor",
    accentColor: "#78716C",
    element: "Tierra",
    itemCount: 4,
    topPercent: 57.0,
    leftPercent: 62.5,
    gemImage: "/images/shop/vein_gems/10_cuarzo_ahumado.png",
    arcanoRef: "Arcano XIII · La Muerte",
    tramo: 1,
  },
  {
    id: "Malaquita",
    nameEs: "Malaquita Verde Botroidal",
    titleEn: "Raw Botryoidal Malachite",
    shortNameEs: "Malaquita",
    shortNameEn: "Malachite",
    badgeSide: "left",
    vibeEs: "Transformación Radical & Apertura del Corazón",
    vibeEn: "Radical Rebirth & Heart Expansion",
    accentColor: "#10B981",
    element: "Tierra",
    itemCount: 7,
    topPercent: 60.2,
    leftPercent: 41.7,
    gemImage: "/images/shop/vein_gems/11_malaquita.png",
    arcanoRef: "Arcano X · La Rueda",
    tramo: 1,
  },
  {
    id: "Lapislázuli",
    nameEs: "Lapislázuli Real con Pirita",
    titleEn: "Royal Lapis Lazuli with Pyrite",
    shortNameEs: "Lapislázuli",
    shortNameEn: "Lapis Lazuli",
    badgeSide: "right",
    vibeEs: "Soberanía de Reyes, Visión Cósmica & Verdad",
    vibeEn: "Royal Sovereignty & Celestial Vision",
    accentColor: "#2563EB",
    element: "Aire",
    itemCount: 6,
    topPercent: 64.8,
    leftPercent: 54.2,
    gemImage: "/images/shop/vein_gems/12_lapislazuli.png",
    arcanoRef: "Arcano II · La Sacerdotisa",
    tramo: 1,
  },
  {
    id: "Citrino",
    nameEs: "Drusa de Citrino Dorado",
    titleEn: "Solar Golden Citrine",
    shortNameEs: "Citrino",
    shortNameEn: "Citrine",
    badgeSide: "left",
    vibeEs: "Abundancia Solar, Magnetismo & Alegría",
    vibeEn: "Solar Abundance & Radiant Prosperity",
    accentColor: "#F59E0B",
    element: "Fuego",
    itemCount: 4,
    topPercent: 70.3,
    leftPercent: 43.8,
    gemImage: "/images/shop/vein_gems/13_citrino.png",
    arcanoRef: "Arcano XIX · El Sol",
    tramo: 1,
  },
  {
    id: "Piedra Luna",
    nameEs: "Piedra Luna Arcoíris",
    titleEn: "Rainbow Adularescent Moonstone",
    shortNameEs: "Piedra Luna",
    shortNameEn: "Moonstone",
    badgeSide: "right",
    vibeEs: "Intuición Femenina, Ciclos & Misterio",
    vibeEn: "Lunar Intuition & Mystic Harmony",
    accentColor: "#93C5FD",
    element: "Agua",
    itemCount: 3,
    topPercent: 73.4,
    leftPercent: 55.2,
    gemImage: "/images/shop/vein_gems/14_piedra_luna.png",
    arcanoRef: "Arcano XVIII · La Luna",
    tramo: 1,
  },
  {
    id: "Labradorita",
    nameEs: "Labradorita Espectral",
    titleEn: "Spectral Aurora Labradorite",
    shortNameEs: "Labradorita",
    shortNameEn: "Labradorite",
    badgeSide: "left",
    vibeEs: "Magia Interdimensional & Destello Áurico",
    vibeEn: "Interdimensional Magic & Auric Shield",
    accentColor: "#0284C7",
    element: "Éter",
    itemCount: 3,
    topPercent: 77.3,
    leftPercent: 63.5,
    gemImage: "/images/shop/vein_gems/15_labradorita.png",
    arcanoRef: "Arcano 0 · El Loco",
    tramo: 1,
  },
  {
    id: "Turquesa",
    nameEs: "Turquesa Natural en Matriz",
    titleEn: "Matrix Turquoise Nugget",
    shortNameEs: "Turquesa",
    shortNameEn: "Turquoise",
    badgeSide: "right",
    vibeEs: "Salto de Fe, Vuelo Libre & Protección",
    vibeEn: "Leap of Faith, Free Flight & Protection",
    accentColor: "#06B6D4",
    element: "Aire",
    itemCount: 2,
    topPercent: 82.0,
    leftPercent: 53.1,
    gemImage: "/images/shop/vein_gems/16_turquesa.png",
    arcanoRef: "Arcano 0 · El Loco",
    tramo: 1,
  },
  {
    id: "Pirita",
    nameEs: "Pirita Cúbica de Oro",
    titleEn: "Golden Pyrite Cubes",
    shortNameEs: "Pirita",
    shortNameEn: "Pyrite",
    badgeSide: "left",
    vibeEs: "Magnetismo de Abundancia & Alquimia",
    vibeEn: "Wealth Magnetism & Alchemical Fire",
    accentColor: "#EAB308",
    element: "Fuego",
    itemCount: 4,
    topPercent: 85.9,
    leftPercent: 45.8,
    gemImage: "/images/shop/vein_gems/17_pirita.png",
    arcanoRef: "Arcano I · El Mago",
    tramo: 1,
  },
  {
    id: "Hematita",
    nameEs: "Hematita Metálica Plateada",
    titleEn: "Specular Hematite",
    shortNameEs: "Hematita",
    shortNameEn: "Hematite",
    badgeSide: "right",
    vibeEs: "Anclaje Cuántico, Claridad & Escudo de Hierro",
    vibeEn: "Quantum Grounding & Iron Will",
    accentColor: "#94A3B8",
    element: "Tierra",
    itemCount: 8,
    topPercent: 89.1,
    leftPercent: 56.3,
    gemImage: "/images/shop/vein_gems/18_hematita.png",
    arcanoRef: "Arcano VII · El Carro",
    tramo: 1,
  },
  {
    id: "Jade",
    nameEs: "Jade Noble & Aventurina",
    titleEn: "Noble Green Jade & Aventurine",
    shortNameEs: "Jade Noble",
    shortNameEn: "Noble Jade",
    badgeSide: "left",
    vibeEs: "Salud Inquebrantable, Gracia & Buena Fortuna",
    vibeEn: "Vital Health, Serenity & Good Fortune",
    accentColor: "#10B981",
    element: "Tierra",
    itemCount: 6,
    topPercent: 93.8,
    leftPercent: 52.1,
    gemImage: "/images/shop/vein_gems/19_aventurina.png",
    arcanoRef: "Arcano XI · La Justicia",
    tramo: 1,
  },
  {
    id: "Jaspe Dálmata",
    nameEs: "Jaspe Dálmata Sagrado",
    titleEn: "Sacred Dalmatian Stone",
    shortNameEs: "Jaspe Dálmata",
    shortNameEn: "Dalmatian",
    badgeSide: "right",
    vibeEs: "Alegría Infantil, Protección Lúdica & Calma",
    vibeEn: "Playful Joy & Grounded Equanimity",
    accentColor: "#D6D3D1",
    element: "Tierra",
    itemCount: 3,
    topPercent: 97.7,
    leftPercent: 60.4,
    gemImage: "/images/shop/vein_gems/20_dalmata.png",
    arcanoRef: "Arcano XXI · El Mundo",
    tramo: 1,
  },
];

/**
 * TRAMO II: CONTINUACIÓN DE LA VETA (12 MINERALES DE ALTA VIBRACIÓN)
 * Imagen: /images/shop/reference_user_vein_part2.jpg (960x1720)
 * Lados de las etiquetas estrictamente alternados para garantizar CERO solapamientos en móvil.
 */
export const VEIN_TRAMO2_GEMS: VeinGemHotspot[] = [
  {
    id: "Turmalina",
    nameEs: "Turmalina Negra Schorl",
    titleEn: "Black Tourmaline (Schorl)",
    shortNameEs: "Turmalina Negra",
    shortNameEn: "Black Tourmaline",
    badgeSide: "right",
    vibeEs: "Escudo Áurico Puro & Transmutación",
    vibeEn: "Pure Auric Shield & Grounding",
    accentColor: "#52525B",
    element: "Tierra",
    itemCount: 6,
    topPercent: 11.0,
    leftPercent: 64.6,
    gemImage: "/images/shop/vein_gems/21_turmalina.png",
    arcanoRef: "Arcano XIII · La Muerte",
    tramo: 2,
  },
  {
    id: "Ámbar",
    nameEs: "Ámbar de Simojovel Chiapas",
    titleEn: "Chiapas Golden Amber",
    shortNameEs: "Ámbar Chiapas",
    shortNameEn: "Chiapas Amber",
    badgeSide: "left",
    vibeEs: "Luz Solar Fósil, Sanación & Calidez",
    vibeEn: "Fossil Solar Light & Warmth",
    accentColor: "#F59E0B",
    element: "Fuego",
    itemCount: 31,
    topPercent: 17.4,
    leftPercent: 52.1,
    gemImage: "/images/shop/vein_gems/22_ambar.png",
    arcanoRef: "Arcano XIX · El Sol",
    tramo: 2,
  },
  {
    id: "Fluorita",
    nameEs: "Fluorita Arcoíris Sagrada",
    titleEn: "Rainbow Fluorite",
    shortNameEs: "Fluorita",
    shortNameEn: "Fluorite",
    badgeSide: "right",
    vibeEs: "Claridad Mental, Orden & Alquimia",
    vibeEn: "Mental Clarity & Spiritual Order",
    accentColor: "#A855F7",
    element: "Aire",
    itemCount: 4,
    topPercent: 26.2,
    leftPercent: 53.1,
    gemImage: "/images/shop/vein_gems/23_fluorita.png",
    arcanoRef: "Arcano XX · El Juicio",
    tramo: 2,
  },
  {
    id: "Aguamarina",
    nameEs: "Aguamarina Berilo Puro",
    titleEn: "Pure Aquamarine Beryl",
    shortNameEs: "Aguamarina",
    shortNameEn: "Aquamarine",
    badgeSide: "left",
    vibeEs: "Serenidad de Aguas Profundas & Verdad",
    vibeEn: "Deep Water Serenity & Expression",
    accentColor: "#06B6D4",
    element: "Agua",
    itemCount: 2,
    topPercent: 36.0,
    leftPercent: 46.9,
    gemImage: "/images/shop/vein_gems/24_aguamarina.png",
    arcanoRef: "Arcano XVII · La Estrella",
    tramo: 2,
  },
  {
    id: "Rodocrosita",
    nameEs: "Rodocrosita Rosa Inca",
    titleEn: "Inca Rose Rhodochrosite",
    shortNameEs: "Rodocrosita",
    shortNameEn: "Rhodochrosite",
    badgeSide: "right",
    vibeEs: "Amor Consciente, Compasión & Ternura",
    vibeEn: "Conscious Love & Deep Heart Healer",
    accentColor: "#F43F5E",
    element: "Fuego",
    itemCount: 2,
    topPercent: 43.0,
    leftPercent: 42.7,
    gemImage: "/images/shop/vein_gems/25_rodocrosita.png",
    arcanoRef: "Arcano VI · Los Enamorados",
    tramo: 2,
  },
  {
    id: "Cuarzo Rutilado",
    nameEs: "Cuarzo Rutilado con Hilos de Oro",
    titleEn: "Golden Rutilated Quartz",
    shortNameEs: "Cuarzo Rutilado",
    shortNameEn: "Rutilated Quartz",
    badgeSide: "left",
    vibeEs: "Conexión Divina, Luz Solar & Manifestación",
    vibeEn: "Divine Antenna & Solar Will",
    accentColor: "#EAB308",
    element: "Éter",
    itemCount: 10,
    topPercent: 49.4,
    leftPercent: 55.2,
    gemImage: "/images/shop/vein_gems/26_cuarzo_rutilado.png",
    arcanoRef: "Arcano I · El Mago",
    tramo: 2,
  },
  {
    id: "Granate",
    nameEs: "Granate Almandino Sagrado",
    titleEn: "Almandine Crimson Garnet",
    shortNameEs: "Granate",
    shortNameEn: "Garnet",
    badgeSide: "right",
    vibeEs: "Fuerza Primitiva, Devoción & Vitalidad",
    vibeEn: "Primal Strength & Pure Vitality",
    accentColor: "#991B1B",
    element: "Fuego",
    itemCount: 4,
    topPercent: 56.4,
    leftPercent: 56.3,
    gemImage: "/images/shop/vein_gems/27_granate.png",
    arcanoRef: "Arcano VIII · La Fuerza",
    tramo: 2,
  },
  {
    id: "Ojo de Buey",
    nameEs: "Ojo de Buey & Ojo de Halcón",
    titleEn: "Bull's Eye & Hawk's Eye",
    shortNameEs: "Ojo de Buey",
    shortNameEn: "Bull's Eye",
    badgeSide: "left",
    vibeEs: "Visión Panorámica & Victoria Inquebrantable",
    vibeEn: "Panoramic Vision & Root Drive",
    accentColor: "#B45309",
    element: "Tierra",
    itemCount: 7,
    topPercent: 63.9,
    leftPercent: 52.1,
    gemImage: "/images/shop/vein_gems/28_ojo_buey.png",
    arcanoRef: "Arcano VII · El Carro",
    tramo: 2,
  },
  {
    id: "Selenita",
    nameEs: "Selenita Blanca Seda",
    titleEn: "Pure White Silky Selenite",
    shortNameEs: "Selenita",
    shortNameEn: "Selenite",
    badgeSide: "right",
    vibeEs: "Luz Angélica, Purificación Áurica & Paz",
    vibeEn: "Angelic Light & Auric Cleansing",
    accentColor: "#F1F5F9",
    element: "Aire",
    itemCount: 3,
    topPercent: 70.9,
    leftPercent: 52.1,
    gemImage: "/images/shop/vein_gems/29_selenita.png",
    arcanoRef: "Arcano II · La Sacerdotisa",
    tramo: 2,
  },
  {
    id: "Lava Volcánica",
    nameEs: "Lava Volcánica del Fuego Primordial",
    titleEn: "Basaltic Volcanic Lava",
    shortNameEs: "Lava Volcánica",
    shortNameEn: "Volcanic Lava",
    badgeSide: "left",
    vibeEs: "Renacimiento Ígneo, Resiliencia & Poder",
    vibeEn: "Igneous Rebirth & Raw Grounding",
    accentColor: "#78716C",
    element: "Fuego",
    itemCount: 10,
    topPercent: 75.6,
    leftPercent: 59.4,
    gemImage: "/images/shop/vein_gems/30_lava_volcanica.png",
    arcanoRef: "Arcano XVI · La Torre",
    tramo: 2,
  },
  {
    id: "Amazonita",
    nameEs: "Amazonita de Río Verde-Turquesa",
    titleEn: "Teal River Amazonite",
    shortNameEs: "Amazonita",
    shortNameEn: "Amazonite",
    badgeSide: "right",
    vibeEs: "Armonía Verdadera, Flujo & Paciencia",
    vibeEn: "Harmonic Truth & Soothing Flow",
    accentColor: "#14B8A6",
    element: "Agua",
    itemCount: 7,
    topPercent: 83.7,
    leftPercent: 52.1,
    gemImage: "/images/shop/vein_gems/31_amazonita.png",
    arcanoRef: "Arcano XVII · La Estrella",
    tramo: 2,
  },
  {
    id: "Jade Nefrita",
    nameEs: "Jade Nefrita Ancestral",
    titleEn: "Imperial Nephrite Jade",
    shortNameEs: "Jade Nefrita",
    shortNameEn: "Nephrite Jade",
    badgeSide: "left",
    vibeEs: "Sabiduría Eterna, Prosperidad & Longevidad",
    vibeEn: "Eternal Wisdom & Sacred Abundance",
    accentColor: "#15803D",
    element: "Tierra",
    itemCount: 11,
    topPercent: 93.0,
    leftPercent: 52.1,
    gemImage: "/images/shop/vein_gems/32_jade_nefrita.png",
    arcanoRef: "Arcano XI · La Justicia",
    tramo: 2,
  },
];

/** Todos los minerales combinados (32 minerales sagrados) */
export const VEIN_ALL_GEMS: VeinGemHotspot[] = [
  ...VEIN_TRAMO1_GEMS,
  ...VEIN_TRAMO2_GEMS,
];

interface EpicMineralVeinSelectorProps {
  selectedStone: string;
  onSelectStone: (stoneId: string) => void;
  language?: "es" | "en";
  t: (es: string, en: string) => string;
  filteredCount?: number;
}

export const EpicMineralVeinSelector: React.FC<EpicMineralVeinSelectorProps> = ({
  selectedStone,
  onSelectStone,
  language = "es",
  t,
  filteredCount = 0,
}) => {
  const [activeTramo, setActiveTramo] = useState<1 | 2>(1);
  const [viewMode, setViewMode] = useState<"vein" | "grid">("vein");
  const [hoveredGem, setHoveredGem] = useState<VeinGemHotspot | null>(null);
  const [toastGem, setToastGem] = useState<VeinGemHotspot | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeGems = activeTramo === 1 ? VEIN_TRAMO1_GEMS : VEIN_TRAMO2_GEMS;
  const currentVeinImage =
    activeTramo === 1
      ? "/images/shop/reference_user_vein.jpg"
      : "/images/shop/reference_user_vein_part2.jpg";

  // Limpieza del toast al desmontar
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // Scroll directo e instantáneo al catálogo
  const scrollToCatalog = () => {
    const el = document.getElementById("catalogo-top");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Selección directa con 1 toque: activa filtro, emite toast sutil y navega inmediatamente
  const handleSelect = (gem: VeinGemHotspot) => {
    onSelectStone(gem.id);
    setToastGem(gem);

    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastGem(null);
    }, 2800);

    scrollToCatalog();
  };

  return (
    <section
      id="hero-veta-mineral"
      ref={containerRef}
      className="relative w-full bg-[#070707] overflow-hidden flex flex-col items-center justify-start select-none border-b border-neutral-900"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. FONDO AMBIENTAL DE BASALTO Y AURA DORADA
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-[#070707]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[900px] rounded-full bg-[#C5A059]/10 blur-[150px] pointer-events-none" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. TOAST FLOTANTE NO INVASIVO AL TOCAR UNA GEMA (FEEDBACK TÁCTIL)
         ───────────────────────────────────────────────────────────── */}
      {toastGem && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-fadeIn max-w-sm w-[90%] sm:w-auto">
          <div className="px-4 py-2.5 rounded-full bg-black/95 border-2 border-[#C5A059] shadow-[0_4px_30px_rgba(197,160,89,0.6)] backdrop-blur-xl flex items-center justify-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059] animate-ping" />
            <span className="text-xs font-serif text-[#FFE2A4] tracking-wider uppercase font-medium">
              ✦ {language === "es" ? toastGem.shortNameEs : toastGem.shortNameEn} ·{" "}
              <strong className="text-white">{toastGem.itemCount} {t("piezas", "pieces")}</strong>
            </span>
            <span className="text-[10px] text-[#C5A059] font-sans tracking-wide">
              {t("Mostrando en tienda ↓", "Showing in shop ↓")}
            </span>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          3. ENCABEZADO PRINCIPAL & CONTROLES DE VISTA
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 pt-10 sm:pt-14 pb-2 text-center w-full">
        {/* Badge Pill Dorado */}
        <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-black/90 border border-[#C5A059]/80 shadow-[0_0_20px_rgba(197,160,89,0.35)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.3em] uppercase text-[#F3EFE6] font-medium">
            {t("VETA TELÚRICA SAGRADA · 32 MINERALES PUROS", "SACRED TELLURIC VEIN · 32 PURE MINERALS")}
          </span>
          <span className="text-xs text-[#C5A059]">✦</span>
        </div>

        {/* Título Principal */}
        <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light tracking-[0.22em] uppercase mb-3 text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
          <span className="bg-gradient-to-r from-[#DFBA73] via-[#FFE2A4] to-[#C5A059] bg-clip-text text-transparent">
            {t("LA VETA DE LOS ARCANOS", "THE VEIN OF THE ARCANA")}
          </span>
        </h1>

        {/* Subtítulo Instructivo */}
        <p className="font-serif italic text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto tracking-wide leading-relaxed drop-shadow-md">
          {t(
            "Los 32 minerales sagrados identificados directamente en cada punto. Toca cualquier piedra para ver sus piezas consagradas en el catálogo.",
            "All 32 sacred gemstones labeled directly at each point. Tap any stone to view its consecrated pieces in the catalog."
          )}
        </p>

        {/* BOTONES DE ACCIÓN: DIRECTO A LA TIENDA + CONMUTADOR DE VISTAS */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {/* Botón directo a la tienda */}
          <button
            onClick={scrollToCatalog}
            className="px-4 sm:px-5 py-2 rounded-full bg-[#C5A059] hover:bg-[#d8b368] text-black font-semibold text-xs font-sans tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(197,160,89,0.4)] hover:scale-105 cursor-pointer flex items-center gap-2"
          >
            <span>🛍️</span>
            <span>{t("Ir al Catálogo Completo ↓", "Go to Full Catalog ↓")}</span>
          </button>

          {/* Toggle de Modo de Vista: Veta Visual vs Rejilla de Gemas */}
          <div className="inline-flex p-1 rounded-full bg-black/90 border border-neutral-800 shadow-xl backdrop-blur-md">
            <button
              onClick={() => setViewMode("vein")}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-serif tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === "vein"
                  ? "bg-[#C5A059] text-black font-bold shadow-[0_0_15px_rgba(197,160,89,0.5)]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span>🌌</span>
              <span>{t("Veta Telúrica", "Telluric Vein")}</span>
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-serif tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === "grid"
                  ? "bg-[#C5A059] text-black font-bold shadow-[0_0_15px_rgba(197,160,89,0.5)]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span>✦</span>
              <span>{t("Rejilla de Gemas (32)", "Gems Grid (32)")}</span>
            </button>
          </div>

          {/* Selector de Tramo I vs Tramo II (activo solo en vista de Veta) */}
          {viewMode === "vein" && (
            <div className="inline-flex p-1 rounded-full bg-black/90 border border-neutral-800 shadow-xl backdrop-blur-md">
              <button
                onClick={() => {
                  setActiveTramo(1);
                  setHoveredGem(null);
                }}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-serif tracking-wider uppercase transition-all cursor-pointer ${
                  activeTramo === 1
                    ? "bg-[#C5A059] text-black font-bold shadow-[0_0_15px_rgba(197,160,89,0.5)]"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {t("Tramo I (20)", "Part I (20)")}
              </button>
              <button
                onClick={() => {
                  setActiveTramo(2);
                  setHoveredGem(null);
                }}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-serif tracking-wider uppercase transition-all cursor-pointer ${
                  activeTramo === 2
                    ? "bg-[#C5A059] text-black font-bold shadow-[0_0_15px_rgba(197,160,89,0.5)]"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                {t("Tramo II (12)", "Part II (12)")}
              </button>
            </div>
          )}
        </div>

        {/* Banner de Sintonización Activa */}
        {selectedStone !== "todos" && (
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2.5 px-4 py-1.5 rounded-full bg-black/95 border border-[#C5A059] shadow-[0_0_25px_rgba(197,160,89,0.5)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="text-xs text-neutral-200 font-serif">
              {t("Filtrado por:", "Filtered by:")}{" "}
              <strong className="text-[#C5A059] uppercase">{selectedStone}</strong> ·{" "}
              <span className="text-neutral-300">
                {filteredCount} {filteredCount === 1 ? t("pieza", "piece") : t("piezas", "pieces")}
              </span>
            </span>
            <button
              onClick={scrollToCatalog}
              className="px-3 py-1 rounded-full bg-[#C5A059] text-black text-[10px] font-sans font-bold tracking-wider uppercase cursor-pointer hover:bg-[#d8b368] transition-colors"
            >
              {t("Ver Piezas ↓", "View Pieces ↓")}
            </button>
            <button
              onClick={() => onSelectStone("todos")}
              className="text-[10px] tracking-wider uppercase text-neutral-400 hover:text-white cursor-pointer ml-1"
            >
              ✕ {t("Mostrar Todo", "Show All")}
            </button>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. MODO A: ESCENARIO VISUAL DE LA VETA MINERAL
             Nombres visibles por default a los lados izquierdo/derecho alternados.
             Aspect ratio exacto según el tramo:
             - Tramo 1: 960x2560 (aspect-[960/2560])
             - Tramo 2: 960x1720 (aspect-[960/1720])
         ───────────────────────────────────────────────────────────── */}
      {viewMode === "vein" && (
        <div
          className={`relative w-full max-w-[960px] my-6 mx-auto z-10 pointer-events-auto overflow-visible ${
            activeTramo === 1 ? "aspect-[960/2560]" : "aspect-[960/1720]"
          }`}
        >
          {/* IMAGEN DE FONDO DE LA VETA */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <Image
              src={currentVeinImage}
              alt={
                activeTramo === 1
                  ? "Veta Ancestral de los Arcanos sobre Roca Basáltica - Tramo I"
                  : "Veta Ancestral de los Arcanos sobre Roca Basáltica - Tramo II Profundidades"
              }
              fill
              priority
              quality={95}
              className="object-cover filter brightness-105 contrast-110"
              sizes="(max-width: 960px) 100vw, 960px"
            />

            {/* Difuminado suave perimetral */}
            <div className="absolute inset-y-0 left-0 w-8 sm:w-20 bg-gradient-to-r from-[#070707] to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 sm:w-20 bg-gradient-to-l from-[#070707] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#070707] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#070707] to-transparent pointer-events-none" />
          </div>

          {/* Indicador de Tramo II en la esquina superior */}
          {activeTramo === 2 && (
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTramo(1);
                  containerRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-3 py-1.5 rounded-full bg-black/90 border border-neutral-700 hover:border-[#C5A059] text-neutral-300 hover:text-white text-[9px] sm:text-[10px] font-serif tracking-wider uppercase transition-all cursor-pointer backdrop-blur shadow-lg flex items-center gap-1.5"
              >
                <span>↑</span>
                <span>{t("Volver a Tramo I (Superficie)", "Back to Part I (Surface)")}</span>
              </button>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────
              HOTSPOTS INTERACTIVOS CON NOMBRES POR DEFAULT (CERO SOLAPAMIENTOS)
             ───────────────────────────────────────────────────────── */}
          {activeGems.map((gem) => {
            const isSelected = selectedStone === gem.id;
            const isHovered = hoveredGem?.id === gem.id;
            const displayName = language === "es" ? gem.shortNameEs : gem.shortNameEn;

            return (
              <div
                key={`${gem.id}-${gem.topPercent}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                style={{
                  top: `${gem.topPercent}%`,
                  left: `${gem.leftPercent}%`,
                }}
              >
                {/* BOTÓN INTERACTIVO DEL MINERAL (ÁREA TÁCTIL EXTENDIDA) */}
                <button
                  type="button"
                  onClick={() => handleSelect(gem)}
                  onMouseEnter={() => setHoveredGem(gem)}
                  onMouseLeave={() => setHoveredGem(null)}
                  className="relative group cursor-pointer outline-none focus:outline-none flex items-center justify-center p-1 sm:p-2"
                  aria-label={`Seleccionar mineral ${gem.nameEs}`}
                >
                  {/* 1. Halo Radial Elemental al estar seleccionado o hovered */}
                  <div
                    className={`absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full pointer-events-none transition-all duration-300 -z-10 ${
                      isHovered || isSelected ? "opacity-100 scale-125" : "opacity-0 scale-75"
                    }`}
                    style={{
                      background: `radial-gradient(circle at center, ${gem.accentColor}DD 0%, ${gem.accentColor}44 45%, transparent 75%)`,
                      filter: "blur(12px)",
                    }}
                  />

                  {/* 2. CÍRCULO FÍSICO DEL MINERAL (SIEMPRE VISIBLE EN MÓVIL Y DESKTOP) */}
                  <div
                    className={`relative w-8 h-8 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
                      isSelected
                        ? "scale-125 ring-4 ring-[#C5A059]/60 border-2 border-[#FFE2A4] shadow-[0_0_25px_#C5A059] bg-[#C5A059]/20 z-30"
                        : isHovered
                        ? "scale-120 border-2 border-white shadow-[0_0_20px_white] z-30"
                        : "border border-[#C5A059]/60 shadow-[0_0_10px_rgba(197,160,89,0.35)] group-hover:border-[#C5A059] bg-black/60"
                    }`}
                  >
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={gem.gemImage}
                        alt={gem.nameEs}
                        fill
                        sizes="(max-width: 640px) 36px, 80px"
                        className={`object-cover transition-transform duration-300 ${
                          isHovered ? "scale-110 brightness-115 contrast-110" : "scale-100 brightness-105"
                        }`}
                      />
                    </div>

                    {/* Pulso sutil en reposo para indicar interactividad */}
                    {!isSelected && (
                      <span
                        className="absolute inset-0 rounded-full border border-white/20 animate-ping pointer-events-none opacity-20"
                        style={{ animationDuration: "3s" }}
                      />
                    )}
                  </div>

                  {/* 3. ETIQUETA EDITORIAL CON EL NOMBRE DEL MINERAL (SIEMPRE VISIBLE POR DEFECTO A LOS LADOS) */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-1.5 transition-all duration-200 z-25 ${
                      gem.badgeSide === "left"
                        ? "right-[calc(100%+6px)] sm:right-[calc(100%+10px)] flex-row-reverse"
                        : "left-[calc(100%+6px)] sm:left-[calc(100%+10px)] flex-row"
                    }`}
                  >
                    {/* Indicador brillante hacia la gema */}
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-200 flex-shrink-0 ${
                        isSelected
                          ? "bg-[#FFE2A4] scale-125 shadow-[0_0_8px_#FFE2A4]"
                          : "bg-[#C5A059] animate-pulse"
                      }`}
                    />

                    {/* Píldora con el nombre de la piedra */}
                    <span
                      className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border text-[8.5px] sm:text-[10px] font-serif tracking-wider uppercase whitespace-nowrap shadow-[0_4px_14px_rgba(0,0,0,0.95)] backdrop-blur-md transition-all duration-200 max-w-[100px] sm:max-w-none truncate sm:overflow-visible ${
                        isSelected
                          ? "bg-[#C5A059] text-black border-[#FFE2A4] font-bold shadow-[0_0_18px_rgba(197,160,89,0.95)] scale-105"
                          : isHovered
                          ? "bg-black/95 text-white border-[#C5A059] shadow-[0_0_12px_rgba(197,160,89,0.6)] scale-105"
                          : "bg-black/90 text-[#FFE2A4] border-[#C5A059]/70 group-hover:border-[#C5A059] group-hover:text-white"
                      }`}
                    >
                      {displayName}
                    </span>
                  </div>

                  {/* 4. TARJETA HOLOGRÁFICA HUD EN DESKTOP HOVER */}
                  <div
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 z-40 whitespace-nowrap ${
                      gem.badgeSide === "left"
                        ? "right-full mr-6 text-right"
                        : "left-full ml-6 text-left"
                    } ${
                      isHovered
                        ? "opacity-100 translate-x-0 scale-100"
                        : "opacity-0 scale-90 pointer-events-none"
                    }`}
                  >
                    <div className="p-3.5 px-4 rounded-2xl bg-black/95 border border-[#C5A059] shadow-[0_0_35px_rgba(0,0,0,0.95)] backdrop-blur-xl">
                      <div className={`flex items-center gap-2 mb-1 ${gem.badgeSide === "left" ? "justify-end" : "justify-start"}`}>
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: gem.accentColor }} />
                        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                          {gem.element} {gem.arcanoRef ? `· ${gem.arcanoRef}` : ""}
                        </span>
                      </div>

                      <p className="font-serif text-base font-light text-white tracking-widest uppercase font-medium">
                        {language === "es" ? gem.nameEs : gem.titleEn}
                      </p>

                      <p className="text-[11px] text-neutral-300 font-light italic mb-2 tracking-wide max-w-xs whitespace-normal">
                        {language === "es" ? gem.vibeEs : gem.vibeEn}
                      </p>

                      <div className={`flex items-center gap-2 ${gem.badgeSide === "left" ? "justify-end" : "justify-start"}`}>
                        <span className="px-2 py-0.5 rounded-full bg-[#C5A059] text-black font-sans font-bold text-[10px]">
                          {gem.itemCount} {t("piezas", "pieces")}
                        </span>
                        <span className="text-[9px] font-serif text-[#FFE2A4] tracking-widest uppercase">
                          {t("✦ Toca para ver en catálogo", "✦ Tap to view in catalog")}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}

          {/* ── BOTÓN DE CONTINUIDAD AL FONDO DEL TRAMO I ── */}
          {activeTramo === 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-full px-4 text-center">
              <button
                onClick={() => {
                  setActiveTramo(2);
                  containerRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/95 hover:bg-neutral-900 border-2 border-[#C5A059] shadow-[0_0_30px_rgba(197,160,89,0.5)] backdrop-blur text-[#C5A059] hover:text-white text-[10px] sm:text-xs font-serif tracking-widest uppercase transition-all cursor-pointer hover:scale-105"
              >
                <span className="animate-bounce">⤓</span>
                <span>{t("LA VETA CONTINÚA DESCENDIENDO · ENTRAR A TRAMO II ↓", "VEIN CONTINUES DESCENDING · ENTER PART II ↓")}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          4. MODO B: REJILLA DE GEMAS (32 MINERALES SAGRADOS)
             Ideal para navegación rápida en móvil y pantallas táctiles
         ───────────────────────────────────────────────────────────── */}
      {viewMode === "grid" && (
        <div className="relative z-20 w-full max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {VEIN_ALL_GEMS.map((gem) => {
              const isSelected = selectedStone === gem.id;
              const displayName = language === "es" ? gem.shortNameEs : gem.shortNameEn;

              return (
                <button
                  key={`grid-${gem.id}`}
                  onClick={() => handleSelect(gem)}
                  className={`p-3 rounded-2xl text-center transition-all duration-300 flex flex-col items-center justify-between group cursor-pointer border ${
                    isSelected
                      ? "bg-[#C5A059]/20 border-[#C5A059] shadow-[0_0_25px_rgba(197,160,89,0.5)] scale-105"
                      : "bg-[#0F0F0F] border-neutral-800/80 hover:border-[#C5A059]/70 hover:bg-neutral-900 hover:scale-102"
                  }`}
                >
                  {/* Imagen redonda de la gema */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-[#C5A059]/60 shadow-lg mb-2 group-hover:scale-110 transition-transform">
                    <Image
                      src={gem.gemImage}
                      alt={gem.nameEs}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>

                  {/* Nombre del mineral */}
                  <div className="w-full">
                    <span className="block font-serif text-xs font-medium text-white tracking-wider uppercase truncate group-hover:text-[#FFE2A4] transition-colors">
                      {displayName}
                    </span>
                    <span className="block text-[9px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">
                      {gem.element}
                    </span>
                  </div>

                  {/* Contador de piezas consagradas */}
                  <div className="mt-2 pt-2 border-t border-neutral-800/80 w-full flex items-center justify-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                    <span className="text-[10px] font-mono text-[#C5A059]">
                      {gem.itemCount} {t("piezas", "pcs")}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. DOCK FLOTANTE INFERIOR: EXPLORADOR RÁPIDO HORIZONTAL
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-3 sm:px-4 pb-12 sm:pb-16 overflow-hidden">
        <div className="p-3 sm:p-4 rounded-3xl bg-black/85 border border-neutral-800 shadow-[0_0_40px_rgba(0,0,0,0.9)] backdrop-blur-xl max-w-full">
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-[10px] sm:text-xs font-serif tracking-[0.25em] text-[#C5A059] uppercase">
              {activeTramo === 1
                ? t("EXPLORADOR RÁPIDO · TRAMO I (20 MINERALES)", "QUICK EXPLORER · PART I (20 MINERALS)")
                : t("EXPLORADOR RÁPIDO · TRAMO II (12 MINERALES)", "QUICK EXPLORER · PART II (12 MINERALS)")}
            </span>
            <span className="text-[9px] text-neutral-400 tracking-wider">
              {t("Desliza para explorar", "Slide to explore")} →
            </span>
          </div>

          <div className="w-full max-w-full flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#C5A059]/40">
            {activeGems.map((gem) => {
              const isSelected = selectedStone === gem.id;
              const displayName = language === "es" ? gem.shortNameEs : gem.shortNameEn;

              return (
                <button
                  key={`${gem.id}-dock`}
                  onClick={() => handleSelect(gem)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-2xl transition-all cursor-pointer flex-shrink-0 border ${
                    isSelected
                      ? "bg-[#C5A059]/20 border-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.5)]"
                      : "bg-neutral-950/80 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900"
                  }`}
                >
                  <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#C5A059]/60 flex-shrink-0">
                    <Image
                      src={gem.gemImage}
                      alt={gem.nameEs}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] sm:text-[11px] font-serif text-white whitespace-nowrap">
                      {displayName}
                    </div>
                    <div className="text-[8.5px] text-[#C5A059] font-mono">
                      {gem.itemCount} {t("piezas", "pcs")}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
