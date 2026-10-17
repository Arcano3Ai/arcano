"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export interface GeologicalVeinNode {
  id: string; // Filtro en /tienda?stone=...
  index: string; // Ej: "#1"
  nameEs: string;
  nameEn: string;
  vibeEs: string;
  vibeEn: string;
  itemCount: number;
  image: string; // /images/shop/stones/...
  accentColor: string;
  tier: 1 | 2 | 3;
  // Posición porcentual de la tarjeta en el lienzo vertical (0-100%)
  cardTop: string;
  cardLeft?: string;
  cardRight?: string;
  // Posición porcentual del punto / destello sobre el cristal en la roca
  pinTop: string;
  pinLeft?: string;
  pinRight?: string;
  pointerDirection: "right" | "left"; // Hacia dónde apunta la línea guía
}

export const VOLCANIC_VEIN_NODES: GeologicalVeinNode[] = [
  // ── TRAMO 1: SUPERIOR (IZQUIERDA A DERECHA) ──
  {
    id: "Lapislázuli",
    index: "#1",
    nameEs: "Lapislázuli Real",
    nameEn: "Lapis Lazuli",
    vibeEs: "Soberanía · Intuición",
    vibeEn: "Wisdom · Intuition",
    itemCount: 6,
    image: "/images/shop/stones/lapis_lazuli_raw.jpg",
    accentColor: "#1D4ED8",
    tier: 1,
    cardTop: "10.5%",
    cardLeft: "4%",
    pinTop: "11.2%",
    pinLeft: "19%",
    pointerDirection: "right",
  },
  {
    id: "Pirita",
    index: "#2",
    nameEs: "Pirita Dorada",
    nameEn: "Golden Pyrite",
    vibeEs: "Abundancia · Voluntad",
    vibeEn: "Abundance · Willpower",
    itemCount: 4,
    image: "/images/shop/stones/pyrite_raw.jpg",
    accentColor: "#EAB308",
    tier: 1,
    cardTop: "17%",
    cardLeft: "4%",
    pinTop: "17.6%",
    pinLeft: "21%",
    pointerDirection: "right",
  },
  {
    id: "Ojo de Tigre",
    index: "#3",
    nameEs: "Ojo de Tigre",
    nameEn: "Tiger Eye",
    vibeEs: "Coraje · Enfoque",
    vibeEn: "Focus · Courage",
    itemCount: 29,
    image: "/images/shop/stones/tiger_eye_raw.jpg",
    accentColor: "#D97706",
    tier: 1,
    cardTop: "23.5%",
    cardLeft: "4%",
    pinTop: "24.2%",
    pinLeft: "24%",
    pointerDirection: "right",
  },
  {
    id: "Cornalina",
    index: "#4",
    nameEs: "Cornalina Fuego",
    nameEn: "Carnelian",
    vibeEs: "Fuego Vital · Pasión",
    vibeEn: "Vitality · Passion",
    itemCount: 6,
    image: "/images/shop/stones/carnelian_raw.jpg",
    accentColor: "#DC2626",
    tier: 1,
    cardTop: "27.5%",
    cardLeft: "18%",
    pinTop: "26.5%",
    pinLeft: "39%",
    pointerDirection: "right",
  },
  {
    id: "Amatista",
    index: "#5",
    nameEs: "Amatista Geoda",
    nameEn: "Amethyst",
    vibeEs: "Transmutación · Calma",
    vibeEn: "Calm · Passion",
    itemCount: 8,
    image: "/images/shop/stones/amethyst_raw.jpg",
    accentColor: "#8B5CF6",
    tier: 1,
    cardTop: "11.5%",
    cardRight: "30%",
    pinTop: "29.5%",
    pinRight: "43%",
    pointerDirection: "left",
  },
  {
    id: "Turmalina",
    index: "#6",
    nameEs: "Turmalina Negra",
    nameEn: "Black Tourmaline",
    vibeEs: "Escudo Áurico Puro",
    vibeEn: "Protection · Grounding",
    itemCount: 6,
    image: "/images/shop/stones/tourmaline_raw.jpg",
    accentColor: "#71717A",
    tier: 1,
    cardTop: "19%",
    cardRight: "7%",
    pinTop: "33.5%",
    pinRight: "27%",
    pointerDirection: "left",
  },
  {
    id: "Aguamarina",
    index: "#7",
    nameEs: "Aguamarina",
    nameEn: "Aquamarine",
    vibeEs: "Serenidad · Claridad",
    vibeEn: "Clarity · Calm",
    itemCount: 2,
    image: "/images/shop/stones/aquamarine_raw.jpg",
    accentColor: "#06B6D4",
    tier: 1,
    cardTop: "27.5%",
    cardRight: "4%",
    pinTop: "36.8%",
    pinRight: "16%",
    pointerDirection: "left",
  },

  // ── TRAMO 2: PRIMER REBOTE (DERECHA A IZQUIERDA) ──
  {
    id: "Malaquita",
    index: "#8",
    nameEs: "Malaquita & Jade",
    nameEn: "Malachite",
    vibeEs: "Sanación del Corazón",
    vibeEn: "Heart Healing",
    itemCount: 8,
    image: "/images/shop/stones/malachite_raw.jpg",
    accentColor: "#059669",
    tier: 2,
    cardTop: "42.5%",
    cardRight: "5%",
    pinTop: "44.5%",
    pinRight: "25%",
    pointerDirection: "left",
  },
  {
    id: "Ojo de Buey",
    index: "#9",
    nameEs: "Granate & Ojo Buey",
    nameEn: "Garnet & Bull Eye",
    vibeEs: "Fuerza & Victoria",
    vibeEn: "Triumph & Energy",
    itemCount: 4,
    image: "/images/shop/stones/carnelian_raw.jpg",
    accentColor: "#991B1B",
    tier: 2,
    cardTop: "50%",
    cardRight: "5%",
    pinTop: "51%",
    pinRight: "48%",
    pointerDirection: "left",
  },
  {
    id: "Turquesa",
    index: "#10",
    nameEs: "Turquesa en Matriz",
    nameEn: "Natural Turquoise",
    vibeEs: "Salto de Fe & Magia",
    vibeEn: "Faith & Protection",
    itemCount: 2,
    image: "/images/shop/stones/turquoise_raw.jpg",
    accentColor: "#06B6D4",
    tier: 2,
    cardTop: "57%",
    cardRight: "5%",
    pinTop: "48%",
    pinRight: "43%",
    pointerDirection: "left",
  },
  {
    id: "Rodocrosita",
    index: "#11",
    nameEs: "Rodocrosita Rosa",
    nameEn: "Rhodochrosite",
    vibeEs: "Amor Consciente",
    vibeEn: "Conscious Love",
    itemCount: 2,
    image: "/images/shop/stones/rhodochrosite_raw.jpg",
    accentColor: "#F43F5E",
    tier: 2,
    cardTop: "49%",
    cardLeft: "4%",
    pinTop: "54%",
    pinLeft: "26%",
    pointerDirection: "right",
  },
  {
    id: "Obsidiana",
    index: "#12",
    nameEs: "Obsidiana Sagrada",
    nameEn: "Sacred Obsidian",
    vibeEs: "Protección Telúrica",
    vibeEn: "Earth Shield",
    itemCount: 12,
    image: "/images/shop/stones/obsidian_raw.jpg",
    accentColor: "#CA8A04",
    tier: 2,
    cardTop: "58.5%",
    cardLeft: "4%",
    pinTop: "59.5%",
    pinLeft: "16%",
    pointerDirection: "right",
  },

  // ── TRAMO 3: SEGUNDO REBOTE & PROFUNDIDADES (IZQUIERDA A DERECHA) ──
  {
    id: "Amatista",
    index: "#13",
    nameEs: "Fluorita & Amatista",
    nameEn: "Fluorite & Amethyst",
    vibeEs: "Lucidez & Alquimia",
    vibeEn: "Mental Clarity",
    itemCount: 8,
    image: "/images/shop/stones/amethyst_raw.jpg",
    accentColor: "#A855F7",
    tier: 3,
    cardTop: "68%",
    cardLeft: "4%",
    pinTop: "72%",
    pinLeft: "28%",
    pointerDirection: "right",
  },
  {
    id: "Piedra Luna",
    index: "#14",
    nameEs: "Cuarzo & Piedra Luna",
    nameEn: "Moonstone & Rose Quartz",
    vibeEs: "Intuición & Gracia",
    vibeEn: "Grace & Intuition",
    itemCount: 4,
    image: "/images/shop/stones/moonstone_raw.jpg",
    accentColor: "#93C5FD",
    tier: 3,
    cardTop: "66%",
    cardRight: "5%",
    pinTop: "74%",
    pinRight: "38%",
    pointerDirection: "left",
  },
  {
    id: "Labradorita",
    index: "#15",
    nameEs: "Labradorita Espectral",
    nameEn: "Labradorite",
    vibeEs: "Magia & Alquimia",
    vibeEn: "Magic & Alchemy",
    itemCount: 3,
    image: "/images/shop/stones/labradorite_raw.jpg",
    accentColor: "#0284C7",
    tier: 3,
    cardTop: "74%",
    cardRight: "5%",
    pinTop: "79%",
    pinRight: "26%",
    pointerDirection: "left",
  },
  {
    id: "Cuarzo Ahumado",
    index: "#16",
    nameEs: "Cuarzo Ahumado",
    nameEn: "Smoky Quartz",
    vibeEs: "Luz Interior Serena",
    vibeEn: "Inner Light",
    itemCount: 3,
    image: "/images/shop/stones/smoky_quartz_raw.jpg",
    accentColor: "#78716C",
    tier: 3,
    cardTop: "78%",
    cardLeft: "4%",
    pinTop: "80%",
    pinLeft: "20%",
    pointerDirection: "right",
  },
  {
    id: "Citrino",
    index: "#17",
    nameEs: "Citrino Solar",
    nameEn: "Golden Citrine",
    vibeEs: "Vitalidad & Triunfo",
    vibeEn: "Vitality & Success",
    itemCount: 2,
    image: "/images/shop/stones/citrine_raw.jpg",
    accentColor: "#F59E0B",
    tier: 3,
    cardTop: "88%",
    cardLeft: "28%",
    pinTop: "83%",
    pinLeft: "58%",
    pointerDirection: "right",
  },
  {
    id: "Pirita",
    index: "#18",
    nameEs: "Pirita Cúbica de Altar",
    nameEn: "Cubic Pyrite",
    vibeEs: "Manifestación Soberana",
    vibeEn: "Sovereign Abundance",
    itemCount: 4,
    image: "/images/shop/stones/pyrite_raw.jpg",
    accentColor: "#EAB308",
    tier: 3,
    cardTop: "88%",
    cardRight: "5%",
    pinTop: "88%",
    pinRight: "18%",
    pointerDirection: "left",
  },
];

export function VolcanicVeinGalleryMenu() {
  const { language, t } = useLanguage();
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  return (
    <section className="relative w-full bg-[#050505] text-white overflow-hidden py-12 lg:py-20 select-none">
      
      {/* ─────────────────────────────────────────────────────────────
          1. ENCABEZADO EDITORIAL DE ALTA JOYERÍA
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 text-center mb-8 lg:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/85 border border-[#C5A059]/60 backdrop-blur-md shadow-2xl mb-4">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
          <span className="text-[10px] sm:text-xs font-serif tracking-[0.3em] uppercase text-[#C5A059] font-medium">
            {t("MENÚ DE LA GALERÍA · TALISMANES DE MINERAL PURO", "GALLERY MENU · 100% PURE MINERAL TALISMANS")}
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-[0.2em] uppercase text-white mb-3 drop-shadow-2xl">
          {t("GEMAS FORJADAS EN PROFUNDIDADES VOLCÁNICAS", "GEMSTONES FORGED IN VOLCANIC DEPTHS")}
        </h2>

        <p className="font-serif italic text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto tracking-wide leading-relaxed drop-shadow-md">
          {t(
            "Desciende por la fractura de la tierra en zigzag. Sigue el curso de la veta viva de lado a lado y toca cualquier espécimen para ingresar directamente a su colección en la galería.",
            "Descend along the zigzagging fissure. Follow the living mineral vein from side to side and tap any specimen to enter its direct gallery collection."
          )}
        </p>

        {/* Acciones directas */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-sans tracking-widest uppercase">
          <Link
            href="/tienda/#catalogo-top"
            className="px-6 py-2.5 rounded-full bg-[#C5A059] hover:bg-[#d8b368] text-black font-semibold transition-all shadow-[0_0_20px_rgba(197,160,89,0.4)] hover:scale-105 cursor-pointer"
          >
            {t("✦ Explorar Catálogo Completo", "✦ Browse Full Catalog")}
          </Link>
          <a
            href="#recorrido-falla"
            className="px-5 py-2.5 rounded-full bg-black/80 hover:bg-neutral-900 border border-neutral-700 hover:border-[#C5A059] text-neutral-300 hover:text-white transition-all backdrop-blur cursor-pointer"
          >
            {t("Bajar por la Veta ↓", "Descend the Vein ↓")}
          </a>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. LIENZO GIGANTE DESKTOP: VETA CONTINUA EN ZIGZAG (9:16)
         ───────────────────────────────────────────────────────────── */}
      <div id="recorrido-falla" className="relative max-w-[1240px] mx-auto px-2 sm:px-4">
        
        {/* Contenedor con ratio vertical idéntico a la imagen maestra (9:16) */}
        <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden border border-neutral-800/80 shadow-[0_25px_80px_rgba(0,0,0,0.95)] bg-black">
          
          {/* Fondo fotográfico en alta resolución de la pared volcánica sin texto */}
          <Image
            src="/images/landing/volcanic_mine_vein_master.jpg"
            alt="Pared Volcánica y Veta de Cristales en Zigzag - ARCANO"
            fill
            priority
            sizes="(max-width: 1240px) 100vw, 1240px"
            className="object-cover object-center filter brightness-105 contrast-115"
          />

          {/* Viñeta perimetral de sombra para integrar los bordes con elegancia */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-black/80 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-black/80 to-transparent pointer-events-none" />

          {/* ─────────────────────────────────────────────────────────
              NODOS Y TARJETAS FLOTANTES SOBRE LA ROCA VOLCÁNICA
             ───────────────────────────────────────────────────────── */}
          {VOLCANIC_VEIN_NODES.map((node) => {
            const isHovered = hoveredNodeId === node.id;

            return (
              <React.Fragment key={`${node.id}-${node.index}`}>
                
                {/* 1. Pin / Destello sobre el cristal correspondiente */}
                <div
                  className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
                  style={{
                    top: node.pinTop,
                    left: node.pinLeft,
                    right: node.pinRight,
                  }}
                >
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isHovered
                        ? "w-4 h-4 shadow-[0_0_20px_#FFFFFF] scale-150 animate-ping"
                        : "w-2.5 h-2.5 shadow-[0_0_12px_#FFFFFF] opacity-80 animate-pulse"
                    }`}
                    style={{ backgroundColor: node.accentColor }}
                  />
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  />
                </div>

                {/* 2. Tarjeta flotante interactiva estilo menú de galería */}
                <Link
                  href={`/tienda?stone=${encodeURIComponent(node.id)}#catalogo-top`}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  className={`absolute z-30 flex items-center gap-2.5 sm:gap-3 p-2 sm:p-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 cursor-pointer group ${
                    isHovered
                      ? "bg-black/95 border-[#C5A059] scale-105 shadow-[0_0_25px_rgba(197,160,89,0.5)] ring-1 ring-[#C5A059]"
                      : "bg-black/80 hover:bg-black/90 border-neutral-800/90 hover:border-[#C5A059]/70 shadow-xl"
                  }`}
                  style={{
                    top: node.cardTop,
                    left: node.cardLeft,
                    right: node.cardRight,
                  }}
                >
                  {/* Badge de número / ID */}
                  <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 group-hover:text-[#C5A059] font-bold">
                    {node.index}
                  </span>

                  {/* Miniatura del mineral en bruto */}
                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-black/60 border border-neutral-700/60 flex-shrink-0 group-hover:border-[#C5A059]/80 transition-colors">
                    <Image
                      src={node.image}
                      alt={language === "es" ? node.nameEs : node.nameEn}
                      fill
                      sizes="40px"
                      className="object-cover filter contrast-110 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Textos del nodo */}
                  <div className="flex flex-col text-left">
                    <div className="flex items-center gap-1.5">
                      <span className="font-serif text-[11px] sm:text-xs font-medium tracking-[0.12em] uppercase text-white group-hover:text-[#C5A059] transition-colors leading-tight">
                        {language === "es" ? node.nameEs : node.nameEn}
                      </span>
                    </div>

                    <span className="text-[8px] sm:text-[9px] text-neutral-400 font-sans tracking-wide line-clamp-1 leading-tight mt-0.5">
                      {language === "es" ? node.vibeEs : node.vibeEn}
                    </span>

                    <span className="text-[7px] sm:text-[8px] font-mono text-[#C5A059]/90 tracking-widest uppercase mt-0.5">
                      {node.itemCount} {t("piezas · Entrar →", "pieces · Enter →")}
                    </span>
                  </div>

                  {/* Resplandor lateral indicativo */}
                  <div
                    className="w-1 h-6 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: node.accentColor }}
                  />
                </Link>

              </React.Fragment>
            );
          })}

          {/* ─────────────────────────────────────────────────────────
              INDICADORES DE REBOTE GEOLÓGICO SOBRE EL LIENZO
             ───────────────────────────────────────────────────────── */}
          
          {/* Vértice 1: Rebote Superior Derecho */}
          <div className="absolute top-[39.5%] right-[2%] z-20 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/90 border border-[#C5A059]/70 shadow-lg backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
            <span className="text-[8px] sm:text-[9px] font-serif tracking-[0.2em] uppercase text-[#C5A059]">
              {t("⚡ VÉRTICE DE REBOTE I · DESCENSO A LA IZQUIERDA ↙", "⚡ REBOUND I · TURNS LEFT ↙")}
            </span>
          </div>

          {/* Vértice 2: Rebote Medio Izquierdo */}
          <div className="absolute top-[63.5%] left-[2%] z-20 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/90 border border-[#C5A059]/70 shadow-lg backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
            <span className="text-[8px] sm:text-[9px] font-serif tracking-[0.2em] uppercase text-[#C5A059]">
              {t("⚡ VÉRTICE DE REBOTE II · PROFUNDIDADES DE LA TIERRA ↘", "⚡ REBOUND II · EARTH DEPTHS ↘")}
            </span>
          </div>

        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. BARRA INFERIOR DE ACCESO RÁPIDO A TODA LA GALERÍA
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 mt-8 sm:mt-12 text-center">
        <div className="p-6 rounded-2xl bg-neutral-950/90 border border-neutral-800 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-[10px] font-serif tracking-[0.25em] uppercase text-[#C5A059] block mb-1">
              {t("ORFEBRERÍA SAGRADA 100% MINERAL PURO", "SACRED FINE JEWELRY · 100% PURE MINERAL")}
            </span>
            <p className="font-serif text-sm sm:text-base text-neutral-200">
              {t(
                "Cada pieza se consagra en Luna Llena frente al fuego ceremonial y se confecciona a tu medida exacta.",
                "Every talisman is consecrated under the Full Moon before sacred fire and custom made to your wrist size."
              )}
            </p>
          </div>
          <Link
            href="/tienda/#catalogo-top"
            className="flex-shrink-0 px-6 py-3 rounded-full bg-[#C5A059] hover:bg-[#d8b368] text-black font-semibold text-xs tracking-widest uppercase transition-all shadow-lg hover:scale-105 cursor-pointer"
          >
            {t("Ver Toda la Boutique →", "View All Boutique →")}
          </Link>
        </div>
      </div>

    </section>
  );
}
