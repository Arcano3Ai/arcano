"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";

export interface VeinGemHotspot {
  id: string;
  nameEs: string;
  titleEn: string;
  vibeEs: string;
  vibeEn: string;
  accentColor: string;
  element: "Éter" | "Fuego" | "Agua" | "Tierra" | "Aire";
  itemCount: number;
  topPercent: number;    // % vertical exacto en la imagen de la veta (960x2560)
  leftPercent: number;   // % horizontal exacto en la imagen de la veta
  gemImage: string;      // Imagen recortada circular de la gema
  arcanoRef?: string;    // Arcano regente asociado
}

export const VEIN_ALL_GEMS: VeinGemHotspot[] = [
  {
    id: "Cuarzo Cristal",
    nameEs: "Drusa de Cuarzo Cristal",
    titleEn: "Master Quartz Cluster",
    vibeEs: "Amplificación Energética & Conexión Universal",
    vibeEn: "Energy Amplification & Universal Flow",
    accentColor: "#F8FAFC",
    element: "Éter",
    itemCount: 4,
    topPercent: 4.3,
    leftPercent: 45.8,
    gemImage: "/images/shop/vein_gems/01_cuarzo_cristal.png",
    arcanoRef: "Arcano XIV · La Templanza",
  },
  {
    id: "Cuarzo Rosa",
    nameEs: "Cuarzo Rosa Sagrado",
    titleEn: "Sacred Rose Quartz",
    vibeEs: "Amor Incondicional, Ternura & Paz Profunda",
    vibeEn: "Unconditional Love & Inner Peace",
    accentColor: "#F472B6",
    element: "Agua",
    itemCount: 5,
    topPercent: 13.3,
    leftPercent: 64.6,
    gemImage: "/images/shop/vein_gems/02_cuarzo_rosa.png",
    arcanoRef: "Arcano III · La Emperatriz",
  },
  {
    id: "Amatista",
    nameEs: "Geoda de Amatista Imperial",
    titleEn: "Imperial Amethyst Geode",
    vibeEs: "Transmutación Espiritual & Tercer Ojo",
    vibeEn: "Spiritual Transmutation & Intuition",
    accentColor: "#A855F7",
    element: "Éter",
    itemCount: 8,
    topPercent: 20.7,
    leftPercent: 51.0,
    gemImage: "/images/shop/vein_gems/03_amatista.png",
    arcanoRef: "Arcano XIV · La Templanza",
  },
  {
    id: "Ojo de Tigre",
    nameEs: "Ojo de Tigre Solar",
    titleEn: "Imperial Tiger Eye",
    vibeEs: "Coraje, Foco Solar & Escudo Protector",
    vibeEn: "Courage, Solar Will & Shielding",
    accentColor: "#F59E0B",
    element: "Fuego",
    itemCount: 14,
    topPercent: 28.5,
    leftPercent: 50.0,
    gemImage: "/images/shop/vein_gems/04_ojo_tigre.png",
    arcanoRef: "Arcano VIII · La Fuerza",
  },
  {
    id: "Obsidiana",
    nameEs: "Obsidiana Negra & Ónix",
    titleEn: "Black Obsidian & Onyx",
    vibeEs: "Enraizamiento Profundo & Espejo de Verdad",
    vibeEn: "Deep Grounding & Mirror of Truth",
    accentColor: "#71717A",
    element: "Tierra",
    itemCount: 6,
    topPercent: 35.5,
    leftPercent: 43.8,
    gemImage: "/images/shop/vein_gems/05_obsidiana.png",
    arcanoRef: "Arcano XV · El Diablo",
  },
  {
    id: "Howlita",
    nameEs: "Howlita Blanca Turquesa",
    titleEn: "White Veined Howlite",
    vibeEs: "Calma Mental, Sueño Sagrado & Paciencia",
    vibeEn: "Mental Stillness & Pure Patience",
    accentColor: "#E2E8F0",
    element: "Aire",
    itemCount: 2,
    topPercent: 40.6,
    leftPercent: 52.1,
    gemImage: "/images/shop/vein_gems/06_howlita.png",
    arcanoRef: "Arcano XVII · La Estrella",
  },
  {
    id: "Jaspe Rojo",
    nameEs: "Jaspe Rojo Telúrico",
    titleEn: "Telluric Red Jasper",
    vibeEs: "Fuerza Vital, Resistencia & Kundalini",
    vibeEn: "Vital Life Force & Root Power",
    accentColor: "#DC2626",
    element: "Tierra",
    itemCount: 5,
    topPercent: 45.3,
    leftPercent: 42.7,
    gemImage: "/images/shop/vein_gems/07_jaspe_rojo.png",
    arcanoRef: "Arcano IV · El Emperador",
  },
  {
    id: "Sodalita",
    nameEs: "Sodalita Azul Profundo",
    titleEn: "Deep Blue Sodalite",
    vibeEs: "Claridad Mental, Voz Auténtica & Verdad",
    vibeEn: "Mental Clarity & Authentic Expression",
    accentColor: "#3B82F6",
    element: "Aire",
    itemCount: 4,
    topPercent: 49.2,
    leftPercent: 54.2,
    gemImage: "/images/shop/vein_gems/08_sodalita.png",
    arcanoRef: "Arcano V · El Sumo Sacerdote",
  },
  {
    id: "Cornalina",
    nameEs: "Cornalina Ígnea Sagrada",
    titleEn: "Igneous Carnelian",
    vibeEs: "Fuego Creador, Pasión & Confianza",
    vibeEn: "Creative Fire & Vital Passion",
    accentColor: "#EA580C",
    element: "Fuego",
    itemCount: 6,
    topPercent: 54.3,
    leftPercent: 47.9,
    gemImage: "/images/shop/vein_gems/09_cornalina.png",
    arcanoRef: "Arcano I · El Mago",
  },
  {
    id: "Cuarzo Ahumado",
    nameEs: "Cuarzo Ahumado Espectral",
    titleEn: "Smoky Quartz Cluster",
    vibeEs: "Transmutación de Sombras & Escudo Terrestre",
    vibeEn: "Shadow Transmutation & Earth Anchor",
    accentColor: "#78716C",
    element: "Tierra",
    itemCount: 4,
    topPercent: 57.0,
    leftPercent: 62.5,
    gemImage: "/images/shop/vein_gems/10_cuarzo_ahumado.png",
    arcanoRef: "Arcano XIII · La Muerte",
  },
  {
    id: "Malaquita",
    nameEs: "Malaquita Verde Botroidal",
    titleEn: "Raw Botryoidal Malachite",
    vibeEs: "Transformación Radical & Apertura del Corazón",
    vibeEn: "Radical Rebirth & Heart Expansion",
    accentColor: "#10B981",
    element: "Tierra",
    itemCount: 7,
    topPercent: 60.2,
    leftPercent: 41.7,
    gemImage: "/images/shop/vein_gems/11_malaquita.png",
    arcanoRef: "Arcano X · La Rueda",
  },
  {
    id: "Lapislázuli",
    nameEs: "Lapislázuli Real con Pirita",
    titleEn: "Royal Lapis Lazuli with Pyrite",
    vibeEs: "Soberanía de Reyes, Visión Cósmica & Verdad",
    vibeEn: "Royal Sovereignty & Celestial Vision",
    accentColor: "#2563EB",
    element: "Aire",
    itemCount: 6,
    topPercent: 64.8,
    leftPercent: 54.2,
    gemImage: "/images/shop/vein_gems/12_lapislazuli.png",
    arcanoRef: "Arcano II · La Sacerdotisa",
  },
  {
    id: "Citrino",
    nameEs: "Drusa de Citrino Dorado",
    titleEn: "Solar Golden Citrine",
    vibeEs: "Abundancia Solar, Magnetismo & Alegría",
    vibeEn: "Solar Abundance & Radiant Prosperity",
    accentColor: "#F59E0B",
    element: "Fuego",
    itemCount: 4,
    topPercent: 70.3,
    leftPercent: 43.8,
    gemImage: "/images/shop/vein_gems/13_citrino.png",
    arcanoRef: "Arcano XIX · El Sol",
  },
  {
    id: "Piedra Luna",
    nameEs: "Piedra Luna Arcoíris",
    titleEn: "Rainbow Adularescent Moonstone",
    vibeEs: "Intuición Femenina, Ciclos & Misterio",
    vibeEn: "Lunar Intuition & Mystic Harmony",
    accentColor: "#93C5FD",
    element: "Agua",
    itemCount: 3,
    topPercent: 73.4,
    leftPercent: 55.2,
    gemImage: "/images/shop/vein_gems/14_piedra_luna.png",
    arcanoRef: "Arcano XVIII · La Luna",
  },
  {
    id: "Labradorita",
    nameEs: "Labradorita Espectral",
    titleEn: "Spectral Aurora Labradorite",
    vibeEs: "Magia Interdimensional & Destello Áurico",
    vibeEn: "Interdimensional Magic & Auric Shield",
    accentColor: "#0284C7",
    element: "Éter",
    itemCount: 3,
    topPercent: 77.3,
    leftPercent: 63.5,
    gemImage: "/images/shop/vein_gems/15_labradorita.png",
    arcanoRef: "Arcano 0 · El Loco",
  },
  {
    id: "Turquesa",
    nameEs: "Turquesa Natural en Matriz",
    titleEn: "Matrix Turquoise Nugget",
    vibeEs: "Salto de Fe, Vuelo Libre & Protección",
    vibeEn: "Leap of Faith, Free Flight & Protection",
    accentColor: "#06B6D4",
    element: "Aire",
    itemCount: 2,
    topPercent: 82.0,
    leftPercent: 53.1,
    gemImage: "/images/shop/vein_gems/16_turquesa.png",
    arcanoRef: "Arcano 0 · El Loco",
  },
  {
    id: "Pirita",
    nameEs: "Pirita Cúbica de Oro",
    titleEn: "Golden Pyrite Cubes",
    vibeEs: "Magnetismo de Abundancia & Alquimia",
    vibeEn: "Wealth Magnetism & Alchemical Fire",
    accentColor: "#EAB308",
    element: "Fuego",
    itemCount: 4,
    topPercent: 85.9,
    leftPercent: 45.8,
    gemImage: "/images/shop/vein_gems/17_pirita.png",
    arcanoRef: "Arcano I · El Mago",
  },
  {
    id: "Hematita",
    nameEs: "Hematita Metálica Plateada",
    titleEn: "Specular Hematite",
    vibeEs: "Anclaje Cuántico, Claridad & Escudo de Hierro",
    vibeEn: "Quantum Grounding & Iron Will",
    accentColor: "#94A3B8",
    element: "Tierra",
    itemCount: 8,
    topPercent: 89.1,
    leftPercent: 56.3,
    gemImage: "/images/shop/vein_gems/18_hematita.png",
    arcanoRef: "Arcano VII · El Carro",
  },
  {
    id: "Jade",
    nameEs: "Jade Noble & Aventurina",
    titleEn: "Noble Green Jade & Aventurine",
    vibeEs: "Salud Inquebrantable, Gracia & Buena Fortuna",
    vibeEn: "Vital Health, Serenity & Good Fortune",
    accentColor: "#10B981",
    element: "Tierra",
    itemCount: 6,
    topPercent: 93.8,
    leftPercent: 52.1,
    gemImage: "/images/shop/vein_gems/19_aventurina.png",
    arcanoRef: "Arcano XI · La Justicia",
  },
  {
    id: "Jaspe Dálmata",
    nameEs: "Jaspe Dálmata Sagrado",
    titleEn: "Sacred Dalmatian Stone",
    vibeEs: "Alegría Infantil, Protección Lúdica & Calma",
    vibeEn: "Playful Joy & Grounded Equanimity",
    accentColor: "#D6D3D1",
    element: "Tierra",
    itemCount: 3,
    topPercent: 97.7,
    leftPercent: 60.4,
    gemImage: "/images/shop/vein_gems/20_dalmata.png",
    arcanoRef: "Arcano XXI · El Mundo",
  },
];

interface EpicMineralVeinSelectorProps {
  selectedStone: string;
  onSelectStone: (stoneId: string) => void;
  language: "es" | "en";
  t: (es: string, en: string) => string;
  filteredCount?: number;
}

export const EpicMineralVeinSelector: React.FC<EpicMineralVeinSelectorProps> = ({
  selectedStone,
  onSelectStone,
  language,
  t,
  filteredCount = 0,
}) => {
  const [hoveredGem, setHoveredGem] = useState<VeinGemHotspot | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSelect = (stoneId: string) => {
    const next = selectedStone === stoneId ? "todos" : stoneId;
    onSelectStone(next);
    document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero-veta-mineral"
      ref={containerRef}
      className="relative w-full bg-[#070707] overflow-hidden flex flex-col items-center justify-start select-none border-b border-neutral-900"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. FONDO AMBIENTAL DE TODA LA PANTALLA (100% NÍTIDO, CERO OPACIDAD)
          La pantalla completa se viste con la atmósfera de basalto y oro.
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 bg-[#070707]">
        {/* Resplandor áureo central difuso */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[900px] rounded-full bg-[#C5A059]/10 blur-[150px] pointer-events-none animate-pulse" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. ENCABEZADO CELESTIAL FLOTANTE
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 pt-12 sm:pt-16 pb-4 text-center">
        {/* Badge Pill Dorado */}
        <div className="inline-flex items-center gap-2.5 mb-4 px-5 py-2 rounded-full bg-black/90 border border-[#C5A059]/80 shadow-[0_0_25px_rgba(197,160,89,0.35)] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
          <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.35em] uppercase text-[#F3EFE6] font-medium">
            {t("VETA TELÚRICA SAGRADA · 20 MINERALES ANCESTRALES", "SACRED TELLURIC VEIN · 20 ANCESTRAL MINERALS")}
          </span>
          <span className="text-xs text-[#C5A059]">✦</span>
        </div>

        {/* Título Principal en Oro Alquímico */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.25em] uppercase mb-4 text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
          <span className="bg-gradient-to-r from-[#DFBA73] via-[#FFE2A4] to-[#C5A059] bg-clip-text text-transparent">
            {t("LA VETA DE LOS ARCANOS", "THE VEIN OF THE ARCANA")}
          </span>
        </h1>

        {/* Subtítulo Instructivo */}
        <p className="font-serif italic text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto tracking-wide leading-relaxed drop-shadow-lg">
          {t(
            "Desciende a través de la falla de basalto y el cordón de oro y plata. Pasa el cursor sobre cada mineral para expandirlo en 3D y toca la gema para sintonizar el catálogo sagrado.",
            "Descend through the basalt rift and the tri-color gold cord. Hover over any mineral to expand it in 3D and tap the gemstone to tune the sacred catalog."
          )}
        </p>

        {/* Banner de Sintonización Activa */}
        {selectedStone !== "todos" && (
          <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 px-6 py-2 rounded-full bg-black/95 border-2 border-[#C5A059] shadow-[0_0_35px_rgba(197,160,89,0.6)] backdrop-blur-md animate-fadeIn">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="text-xs text-neutral-200 font-serif tracking-wider">
              {t("Mineral Consagrado:", "Active Gemstone:")}{" "}
              <strong className="text-[#C5A059] font-medium uppercase">{selectedStone}</strong> ·{" "}
              <span className="text-neutral-300">
                {filteredCount} {filteredCount === 1 ? t("pieza en boutique", "piece in boutique") : t("piezas en boutique", "pieces in boutique")}
              </span>
            </span>
            <button
              onClick={() => document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" })}
              className="px-4 py-1 rounded-full bg-[#C5A059] hover:bg-[#d8b368] text-black text-[10px] font-sans font-bold tracking-widest uppercase transition-colors cursor-pointer shadow-lg"
            >
              {t("Ver Catálogo Filtrado ↓", "View Filtered Pieces ↓")}
            </button>
            <button
              onClick={() => onSelectStone("todos")}
              className="ml-1 text-[10px] tracking-widest uppercase text-neutral-400 hover:text-white transition-colors cursor-pointer font-sans"
            >
              ✕ {t("Mostrar Todo", "Show All")}
            </button>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. ESCENARIO CENTRAL DE LA VETA (100% BLOQUEADO PIXEL A PIXEL)
          La imagen y los hotspots viven en el mismo contenedor exacto.
          Los bordes se difuminan con el fondo negro de la pantalla sin cortes.
         ───────────────────────────────────────────────────────────── */}
      <div className="relative w-full max-w-[960px] aspect-[960/2560] my-6 mx-auto z-10 pointer-events-auto overflow-x-clip">
        
        {/* IMAGEN DE FONDO DE LA VETA: 100% NÍTIDA, SIN OPACIDAD */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <Image
            src="/images/shop/reference_user_vein.jpg"
            alt="Veta Ancestral de los Arcanos sobre Roca Basáltica"
            fill
            priority
            quality={100}
            className="object-cover filter brightness-105 contrast-110"
            sizes="(max-width: 960px) 100vw, 960px"
          />

          {/* Difuminado suave en los bordes para fundir imperceptiblemente con el fondo de la pantalla */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-[#070707] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-[#070707] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#070707] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070707] to-transparent pointer-events-none" />
        </div>

        {/* ─────────────────────────────────────────────────────────────
            HOTSPOTS INTERACTIVOS: EXACTAMENTE SOBRE CADA GEMA
           ───────────────────────────────────────────────────────────── */}
        {VEIN_ALL_GEMS.map((gem) => {
          const isSelected = selectedStone === gem.id;
          const isHovered = hoveredGem?.id === gem.id;

          return (
            <div
              key={gem.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              style={{
                top: `${gem.topPercent}%`,
                left: `${gem.leftPercent}%`,
              }}
              onMouseEnter={() => setHoveredGem(gem)}
              onMouseLeave={() => setHoveredGem(null)}
            >
              {/* BOTÓN INTERACTIVO DE LA GEMA */}
              <button
                onClick={() => handleSelect(gem.id)}
                className="relative group cursor-pointer outline-none focus:outline-none flex items-center justify-center p-2"
                aria-label={`Sintonizar mineral ${gem.nameEs}`}
              >
                {/* 1. Halo Radial Elemental (Brillo que brota de la roca al expandirse) */}
                <div
                  className={`absolute w-36 h-36 rounded-full pointer-events-none transition-all duration-500 -z-10 ${
                    isHovered || isSelected ? "opacity-100 scale-140" : "opacity-0 scale-75"
                  }`}
                  style={{
                    background: `radial-gradient(circle at center, ${gem.accentColor}EE 0%, ${gem.accentColor}55 45%, transparent 75%)`,
                    filter: "blur(14px)",
                  }}
                />

                {/* 2. Pulso de Destello Sutil en reposo (Indica que la gema está viva) */}
                {!isHovered && !isSelected && (
                  <div
                    className="absolute w-8 h-8 rounded-full border border-white/20 animate-ping pointer-events-none"
                    style={{ animationDuration: "3.5s" }}
                  />
                )}

                {/* 3. EL MINERAL QUE SE EXPANDE EN 3D ("SE HAGA, SE EXPANDA") */}
                <div
                  className={`relative w-20 h-20 sm:w-28 sm:h-28 rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
                    isHovered
                      ? "scale-175 opacity-100 z-30 drop-shadow-[0_0_35px_rgba(255,255,255,0.9)] rotate-3"
                      : isSelected
                      ? "scale-140 opacity-100 z-25 drop-shadow-[0_0_30px_#C5A059]"
                      : "scale-100 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {/* Bezel de Oro Alquímico de Alta Joyería */}
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-300 pointer-events-none ${
                      isSelected
                        ? "border-2 border-[#C5A059] shadow-[0_0_25px_#C5A059] bg-black/40 ring-4 ring-[#C5A059]/30"
                        : isHovered
                        ? "border-2 border-white shadow-[0_0_30px_white] bg-black/30 ring-4 ring-[#C5A059]/60"
                        : "border border-transparent"
                    }`}
                  />

                  {/* Imagen recortada circular de la gema auténtica */}
                  <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                    <Image
                      src={gem.gemImage}
                      alt={gem.nameEs}
                      fill
                      sizes="140px"
                      className={`object-cover transition-transform duration-300 ${
                        isHovered ? "scale-110 brightness-125 contrast-115" : "scale-100 brightness-105"
                      }`}
                    />
                    
                    {/* Shimmer Glint áureo diagonal al pasar el cursor */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* 4. TARJETA HOLOGRÁFICA HUD (INFORMACIÓN DEL MINERAL EXPANDIDO) */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 z-40 max-w-[280px] sm:max-w-none whitespace-normal sm:whitespace-nowrap ${
                    gem.leftPercent > 50
                      ? "right-full mr-3 sm:mr-6 text-right"
                      : "left-full ml-3 sm:ml-6 text-left"
                  } ${
                    isHovered
                      ? "opacity-100 translate-x-0 scale-100 block"
                      : "opacity-0 pointer-events-none scale-90 hidden"
                  }`}
                >
                  <div className="p-3 sm:p-4 sm:px-5 rounded-2xl bg-black/95 border border-[#C5A059] shadow-[0_0_40px_rgba(0,0,0,0.95)] backdrop-blur-xl">
                    {/* Elemento & Arcano */}
                    <div className={`flex items-center gap-2 mb-1.5 ${gem.leftPercent > 50 ? "justify-end" : "justify-start"}`}>
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: gem.accentColor }} />
                      <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                        {gem.element} · {gem.arcanoRef}
                      </span>
                    </div>

                    {/* Nombre Sagrado */}
                    <h3 className="font-serif text-base sm:text-lg font-light text-white tracking-widest uppercase drop-shadow-md">
                      {language === "es" ? gem.nameEs : gem.titleEn}
                    </h3>

                    {/* Virtud Esotérica */}
                    <p className="text-[11px] text-neutral-300 font-light italic mb-3 tracking-wide">
                      {language === "es" ? gem.vibeEs : gem.vibeEn}
                    </p>

                    {/* Botón de Sintonizar en Boutique */}
                    <div className={`flex items-center gap-2.5 ${gem.leftPercent > 50 ? "justify-end" : "justify-start"}`}>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#C5A059] text-black font-sans font-bold text-[10px] shadow-sm">
                        {gem.itemCount} {t("piezas", "pieces")}
                      </span>
                      <span className="text-[9px] font-serif text-[#FFE2A4] tracking-widest uppercase font-medium">
                        {t("✦ Tocar para Sintonizar ↓", "✦ Tap to Tune ↓")}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. DOCK FLOTANTE INFERIOR: CINTA DE LOS 20 MINERALES
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-3 sm:px-4 pb-12 sm:pb-16 overflow-hidden">
        <div className="p-3 sm:p-4 rounded-3xl bg-black/85 border border-neutral-800 shadow-[0_0_50px_rgba(0,0,0,0.95)] backdrop-blur-xl overflow-hidden max-w-full">
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-[10px] sm:text-xs font-serif tracking-[0.25em] text-[#C5A059] uppercase">
              {t("EXPLORADOR RÁPIDO · 20 MINERALES DE LA VETA", "QUICK EXPLORER · 20 VEIN MINERALS")}
            </span>
            <span className="text-[9px] text-neutral-400 tracking-wider">
              {t("Desliza horizontalmente para explorar", "Slide horizontally to explore")} →
            </span>
          </div>

          <div className="w-full max-w-full flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[#C5A059]/40">
            {VEIN_ALL_GEMS.map((gem) => {
              const isSelected = selectedStone === gem.id;
              return (
                <button
                  key={gem.id}
                  onClick={() => handleSelect(gem.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-2xl transition-all cursor-pointer flex-shrink-0 border ${
                    isSelected
                      ? "bg-[#C5A059]/20 border-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.5)]"
                      : "bg-neutral-950/80 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900"
                  }`}
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-neutral-700">
                    <Image
                      src={gem.gemImage}
                      alt={gem.nameEs}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-serif text-white whitespace-nowrap">
                      {language === "es" ? gem.nameEs.replace("Drusa de ", "").replace("Geoda de ", "") : gem.titleEn}
                    </div>
                    <div className="text-[9px] text-[#C5A059] font-mono">
                      {gem.itemCount} {t("piezas", "pieces")}
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
