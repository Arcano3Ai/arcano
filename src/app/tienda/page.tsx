"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  shopCategories,
  shopProducts,
  ShopProduct,
} from "@/data/shop";
import { EpicMineralVeinSelector } from "@/components/shop/EpicMineralVeinSelector";
import { VirtualTarotSpreader } from "@/components/shop/VirtualTarotSpreader";
import { getWhatsAppUrl } from "@/config/brandConfig";
import {
  CONCIERGE_ZONES,
  CONCIERGE_DEFAULT_ZONE,
  buildConciergeWhatsAppUrl,
  trackConciergeLead,
} from "@/config/conciergeConfig";
import { useLanguage, LanguageToggle } from "@/context/LanguageContext";

// Formateador estilo Aurum Brothers: $X,XXX MXN
function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-MX", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })} MXN`;
}

// Bloques editoriales cinematográficos estilo Aurum Brothers ("IN FOCUS / [PRODUCT]")
interface EditorialHighlight {
  id: string;
  arcanoSlug: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  image: string;
  ratingText: string;
  buyerName: string;
  buyerLocation: string;
}

const EDITORIAL_HIGHLIGHTS: EditorialHighlight[] = [
  {
    id: "editorial-mago",
    arcanoSlug: "talisman-arcano-i-el-mago-onix-lapislazuli",
    eyebrow: "IN FOCUS / ARCANO I · EL MAGO",
    headline: "Rough by nature.",
    subheadline: "Como es arriba, es abajo. Manifestación y dominio creador de los cuatro elementos en ónix brillante y lapislázuli real.",
    ctaText: "Descubrir Arcano I",
    image: "/images/shop/pulseras/brazalete-arcano-i-el-mago-onix-lapislazuli-lifestyle.jpg",
    ratingText: "Aún más impresionante en persona. El calibre uniforme de 8mm y el peso del ónix y lapislázuli se sienten excepcionales.",
    buyerName: "Mauricio G.",
    buyerLocation: "San Pedro Garza García · Comprador verificado",
  },
  {
    id: "editorial-emperatriz",
    arcanoSlug: "talisman-arcano-iii-la-emperatriz-cuarzo-rosa-jade",
    eyebrow: "IN FOCUS / ARCANO III · LA EMPERATRIZ",
    headline: "Deep green. Quiet presence.",
    subheadline: "Abundancia telúrica y gracia creadora forjada en jade nefrita verde profundo y cuarzo rosa natural.",
    ctaText: "Descubrir Arcano III",
    image: "/images/shop/pulseras/lifestyle_wrist_jade_emperatriz.jpg",
    ratingText: "Exactamente como se muestra en las fotos. Una presencia serena y distinguida que atrae miradas de inmediato.",
    buyerName: "David S.",
    buyerLocation: "San Jerónimo, Monterrey · Comprador verificado",
  },
  {
    id: "editorial-emperador",
    arcanoSlug: "talisman-arcano-iv-el-emperador-ojo-tigre-hematita",
    eyebrow: "IN FOCUS / ARCANO IV · EL EMPERADOR",
    headline: "A softer light.",
    subheadline: "Estructura, fuego y solidez inquebrantable. Ojo de tigre dorado imperial con cuentas de hematita gris metálica.",
    ctaText: "Descubrir Arcano IV",
    image: "/images/shop/pulseras/lifestyle_wrist_tiger_eye.jpg",
    ratingText: "Presencia imponente. Luce impecable tanto con saco y camisa como en atuendo relajado de fin de semana.",
    buyerName: "Javier C.",
    buyerLocation: "Cumbres, Monterrey · Comprador verificado",
  },
  {
    id: "editorial-mundo",
    arcanoSlug: "talisman-arcano-xxi-el-mundo-7-minerales",
    eyebrow: "IN FOCUS / ARCANO XXI · EL MUNDO",
    headline: "Infinite Cosmos.",
    subheadline: "La Gran Obra Alquímica completada. La integración armónica de los siete rayos planetarios en un círculo perfecto.",
    ctaText: "Descubrir Arcano XXI",
    image: "/images/shop/aurum_hero_wrist.jpg",
    ratingText: "Calidad de alta joyería que supera cualquier expectativa. La energía y pureza de las piedras minerales son insuperables.",
    buyerName: "Alejandro P.",
    buyerLocation: "Linda Vista, Monterrey · Comprador verificado",
  },
];

// Helper para clasificar arcanos en los filtros minimalistas de categoría
function getArcanoCategory(product: ShopProduct): string[] {
  const name = (product.name + " " + product.description + " " + (product.stoneType || "") + " " + (product.categoryName || "")).toLowerCase();
  const cats = ["todos"];

  // Palos y Colección Mayor
  if (product.categoryId === "coleccion-arcanos" || product.categoryName?.includes("Mayores")) {
    cats.push("mayores");
  }
  if (name.includes("bastos")) cats.push("bastos");
  if (name.includes("copas")) cats.push("copas");
  if (name.includes("espadas")) cats.push("espadas");
  if (name.includes("oros") || name.includes("pentáculos")) cats.push("oros");

  // Gamas cromáticas de minerales (Monterrey, N.L.)
  if (name.includes("lapislázuli") || name.includes("sodalita") || name.includes("azul") || name.includes("turquesa")) {
    cats.push("azules");
  }
  if (name.includes("jade") || name.includes("aventurina") || name.includes("malaquita") || name.includes("verde")) {
    cats.push("verdes");
  }
  if (name.includes("tigre") || name.includes("citrino") || name.includes("cornalina") || name.includes("jaspe") || name.includes("sol") || name.includes("fuego") || name.includes("buey")) {
    cats.push("tierra");
  }
  if (name.includes("ónix") || name.includes("onix") || name.includes("lava") || name.includes("hematita") || name.includes("ahumado") || name.includes("negro")) {
    cats.push("oscuros");
  }
  if (name.includes("howlita") || name.includes("luna") || name.includes("cuarzo") || name.includes("amatista") || name.includes("fluorita") || name.includes("blanco") || name.includes("opalina")) {
    cats.push("claridad");
  }

  return cats;
}

// Helper para conectar los minerales de la Veta Geológica Sagrada con el catálogo de 78 Arcanos
function matchesVeinStone(selectedStone: string, product: ShopProduct): boolean {
  if (selectedStone === "todos") return true;
  const q = selectedStone.toLowerCase();
  const prodName = product.name.toLowerCase();
  const prodDesc = product.description.toLowerCase();
  const prodStone = (product.stoneType || "").toLowerCase();
  const prodTag = (product.tagline || "").toLowerCase();
  const fullText = `${prodName} ${prodDesc} ${prodStone} ${prodTag}`;

  if (q.includes("ónix") || q.includes("onix")) {
    return fullText.includes("ónix") || fullText.includes("onix") || fullText.includes("lava") || fullText.includes("obsidiana");
  }
  if (q.includes("tigre")) {
    return fullText.includes("tigre") || fullText.includes("halcón");
  }
  if (q.includes("buey")) {
    return fullText.includes("buey") || fullText.includes("granate");
  }
  if (q.includes("lapis")) {
    return fullText.includes("lapis") || fullText.includes("sodalita");
  }
  if (q.includes("obsidiana")) {
    return fullText.includes("obsidiana") || fullText.includes("ónix");
  }
  if (q.includes("jade")) {
    return fullText.includes("jade") || fullText.includes("nefrita") || fullText.includes("aventurina");
  }
  if (q.includes("amatista")) {
    return fullText.includes("amatista");
  }
  if (q.includes("citrino")) {
    return fullText.includes("citrino");
  }
  if (q.includes("cuarzo ahumado") || q.includes("ahumado")) {
    return fullText.includes("ahumado");
  }
  if (q.includes("cuarzo rosa")) {
    return fullText.includes("cuarzo rosa") || fullText.includes("rosa");
  }
  if (q.includes("cuarzo cristal") || q.includes("cristal")) {
    return fullText.includes("cuarzo cristal") || fullText.includes("cristal de roca") || fullText.includes("cuarzo blanco") || fullText.includes("drusa");
  }
  if (q.includes("fluorita")) {
    return fullText.includes("fluorita");
  }
  if (q.includes("howlita")) {
    return fullText.includes("howlita") || fullText.includes("turquesa");
  }
  if (q.includes("turquesa")) {
    return fullText.includes("turquesa") || fullText.includes("howlita azul");
  }
  if (q.includes("hematita")) {
    return fullText.includes("hematita");
  }
  if (q.includes("jaspe rojo")) {
    return fullText.includes("jaspe rojo");
  }
  if (q.includes("jaspe")) {
    return fullText.includes("jaspe");
  }
  if (q.includes("luna") || q.includes("selenita")) {
    return fullText.includes("luna") || fullText.includes("selenita") || fullText.includes("moonstone");
  }
  if (q.includes("sodalita")) {
    return fullText.includes("sodalita") || fullText.includes("lapislázuli");
  }
  if (q.includes("malaquita")) {
    return fullText.includes("malaquita") || fullText.includes("jade");
  }
  if (q.includes("pirita")) {
    return fullText.includes("pirita") || fullText.includes("rutilado");
  }
  if (q.includes("lava") || q.includes("volcánica")) {
    return fullText.includes("lava") || fullText.includes("volcánica") || fullText.includes("volcanica") || fullText.includes("ónix");
  }
  if (q.includes("ámbar") || q.includes("ambar")) {
    return fullText.includes("ámbar") || fullText.includes("ambar");
  }
  if (q.includes("cornalina")) {
    return fullText.includes("cornalina");
  }
  if (q.includes("turmalina")) {
    return fullText.includes("turmalina");
  }
  if (q.includes("labradorita")) {
    return fullText.includes("labradorita");
  }
  if (q.includes("aguamarina")) {
    return fullText.includes("aguamarina");
  }
  if (q.includes("rodocrosita")) {
    return fullText.includes("rodocrosita");
  }
  if (q.includes("granate")) {
    return fullText.includes("granate") || fullText.includes("buey");
  }
  if (q.includes("amazonita")) {
    return fullText.includes("amazonita") || fullText.includes("aventurina");
  }
  if (q.includes("aventurina")) {
    return fullText.includes("aventurina");
  }

  return fullText.includes(q);
}

function TiendaContent() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [selectedStone, setSelectedStone] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProduct, setActiveProduct] = useState<ShopProduct | null>(null);
  const [selectedDeliveryZone, setSelectedDeliveryZone] = useState<string>(CONCIERGE_DEFAULT_ZONE);
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();

  // Escuchar parámetros ?item=... reactivamente con useSearchParams (para Concierge VIP & Ads Deep Linking)
  useEffect(() => {
    const itemParam = searchParams?.get("item") || searchParams?.get("product") || searchParams?.get("id");
    if (itemParam) {
      const found = shopProducts.find(
        (p) =>
          p.slug === itemParam ||
          p.id === itemParam ||
          p.slug.includes(itemParam) ||
          p.id.includes(itemParam)
      );
      if (found) {
        setActiveProduct(found);
      }
    }
  }, [searchParams]);

  // Manejo de tecla Escape, overflow de body y URL query param al abrir/cerrar modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProduct(null);
      }
    };

    if (activeProduct) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setActiveModalImage(activeProduct.imageUrl);

      if (typeof window !== "undefined") {
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.set("item", activeProduct.slug);
        window.history.replaceState(null, "", `?${currentParams.toString()}`);
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";

      if (typeof window !== "undefined") {
        const currentParams = new URLSearchParams(window.location.search);
        if (currentParams.has("item") || currentParams.has("product") || currentParams.has("id")) {
          currentParams.delete("item");
          currentParams.delete("product");
          currentParams.delete("id");
          const qs = currentParams.toString();
          window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
        }
      }
    };
  }, [activeProduct]);

  // Filtrado de productos (Veta Mineral Sagrada + Categorías Horizontales + Búsqueda)
  const filteredProducts = useMemo(() => {
    return shopProducts.filter((product) => {
      // 1. Filtro por Veta Mineral Sagrada (EpicMineralVeinSelector)
      if (selectedStone !== "todos") {
        if (!matchesVeinStone(selectedStone, product)) {
          return false;
        }
      }

      // 2. Filtro por categoría mineral horizontal
      if (selectedCategory !== "todos") {
        const cats = getArcanoCategory(product);
        if (!cats.includes(selectedCategory)) {
          return false;
        }
      }

      // 3. Filtro de búsqueda
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesStone = (product.stoneType || "").toLowerCase().includes(q);
        const matchesArcano = (product.arcanoNumber || "").toLowerCase() === q;
        if (!matchesName && !matchesDesc && !matchesStone && !matchesArcano) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedStone, searchQuery]);

  // Generador de URL de WhatsApp Concierge para el modal activo
  const conciergeUrl = useMemo(() => {
    if (!activeProduct) return "";
    return buildConciergeWhatsAppUrl({
      product: activeProduct,
      selectedZone: selectedDeliveryZone,
    });
  }, [activeProduct, selectedDeliveryZone]);

  const handleConciergeClick = () => {
    if (activeProduct) {
      trackConciergeLead({
        product: activeProduct,
        selectedZone: selectedDeliveryZone,
      });
    }
  };

  const handleOpenProductBySlug = (slug: string) => {
    const found = shopProducts.find((p) => p.slug === slug || p.id === slug);
    if (found) {
      setActiveProduct(found);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#C5A059] selection:text-black pt-20 sm:pt-24">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP BAR DISCRETO · CONCIERGE VIP MONTERREY
         ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#050505] border-b border-neutral-900/90 py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-light">
          <span className="hidden sm:inline">ARCANO · BOUTIQUE PRIVADA MONTERREY</span>
          <span className="mx-auto sm:mx-0">
            ✦ {t("ENTREGA CONCIERGE SIN COSTO · SAN PEDRO · SAN JERÓNIMO · CUMBRES · LINDA VISTA", "VIP CONCIERGE DELIVERY · SAN PEDRO · SAN JERÓNIMO · CUMBRES · LINDA VISTA")} ✦
          </span>
          <a
            href={getWhatsAppUrl("Hola ARCANO Concierge, deseo asesoría personalizada para elegir un brazalete mineral.")}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-neutral-300 hover:text-[#C5A059] transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
            <span>Concierge Directo</span>
          </a>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. VETA TELÚRICA SAGRADA (SELECTOR GEOLÓGICO DE MINERALES)
         ───────────────────────────────────────────────────────────── */}
      <EpicMineralVeinSelector
        selectedStone={selectedStone}
        onSelectStone={(stoneId) => {
          setSelectedStone(stoneId);
          setSelectedCategory("todos");
        }}
        language={language}
        t={t}
        filteredCount={filteredProducts.length}
      />

      {/* Barra de Confianza & Pureza Mineral */}
      <div className="bg-[#0A0A0A] border-b border-neutral-900 py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-4 text-center text-xs text-neutral-300 font-serif">
          <div className="flex items-center gap-2">
            <span className="text-[#C5A059] text-xs">✦</span>
            <span className="tracking-wider">{t("Piedras 100% Puras de Calibre Uniforme (8mm)", "100% Pure Minerals · Uniform 8mm Beads")}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[#C5A059] text-xs">✦</span>
            <span className="tracking-wider">{t("Sin Metales Ni Dijes Comerciales", "Zero Metals · No Commercial Charms")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#C5A059] text-xs">✦</span>
            <span className="tracking-wider">{t("Consagrado Bajo Fuego Sagrado Ceremonial", "Consecrated under Sacred Ceremonial Fire")}</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          BANNER INVITADOR: ¿DESEAS HACER TU TIRADA VIRTUAL DE 3 CARTAS?
          (BUNDLES DE 3 TALISMANES CON 20% DE DESCUENTO)
         ───────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#0E0B05] via-[#1A150B] to-[#0E0B05] border-b border-[#C5A059]/40 py-4 px-4 text-center shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="w-3 h-3 rounded-full bg-[#C5A059] animate-ping flex-shrink-0" />
            <div>
              <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A059] block font-semibold">
                ✦ ORÁCULO DE LOS ARCANOS & RECOMENDADOR DE BUNDLES ✦
              </span>
              <span className="text-xs sm:text-sm font-serif text-white tracking-wide">
                ¿Deseas hacer tu <strong className="text-[#FFE2A4]">Tirada Virtual de 3 Cartas</strong> con tu Nombre y Fecha Natal? Revela tu Tríada y llévate tu <strong className="text-[#25D366]">Bundle Sagrado con 20% de Descuento</strong>.
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              document.getElementById("tirada-virtual")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-6 py-2.5 rounded-full bg-[#C5A059] hover:bg-[#d8b368] text-black font-sans font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(197,160,89,0.35)] hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            ✦ Iniciar Tirada Virtual ✦
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECCIÓN INTERACTIVA: TIRADOR DE 3 CARTAS & RECOMENDADOR DE BUNDLE
         ───────────────────────────────────────────────────────────── */}
      <VirtualTarotSpreader onSelectProduct={setActiveProduct} />

      {/* Ancla para scroll suave desde la Veta */}
      <div id="catalogo-top" className="scroll-mt-24" />

      {/* ─────────────────────────────────────────────────────────────
          3. BARRA DE FILTROS HORIZONTAL (ESTILO EXACTO AURUM BROTHERS)
         ───────────────────────────────────────────────────────────── */}
      <div className="border-b border-neutral-900 bg-black/95 backdrop-blur-md sticky top-16 sm:top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          
          {/* Categorías a la Izquierda */}
          <div className="flex items-center gap-6 sm:gap-8 text-[11px] sm:text-xs tracking-[0.15em] uppercase font-light whitespace-nowrap">
            <button
              onClick={() => {
                setSelectedCategory("todos");
                setSelectedStone("todos");
              }}
              className={`transition-colors cursor-pointer py-1 ${
                selectedCategory === "todos" && selectedStone === "todos"
                  ? "text-white font-medium border-b border-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {t("All", "All")} ({shopProducts.length})
            </button>

            <button
              onClick={() => {
                setSelectedCategory("azules");
                setSelectedStone("todos");
              }}
              className={`transition-colors cursor-pointer py-1 ${
                selectedCategory === "azules"
                  ? "text-white font-medium border-b border-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Blues
            </button>

            <button
              onClick={() => {
                setSelectedCategory("verdes");
                setSelectedStone("todos");
              }}
              className={`transition-colors cursor-pointer py-1 ${
                selectedCategory === "verdes"
                  ? "text-white font-medium border-b border-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Greens
            </button>

            <button
              onClick={() => {
                setSelectedCategory("tierra");
                setSelectedStone("todos");
              }}
              className={`transition-colors cursor-pointer py-1 ${
                selectedCategory === "tierra"
                  ? "text-white font-medium border-b border-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Earth & Sun
            </button>

            <button
              onClick={() => {
                setSelectedCategory("oscuros");
                setSelectedStone("todos");
              }}
              className={`transition-colors cursor-pointer py-1 ${
                selectedCategory === "oscuros"
                  ? "text-white font-medium border-b border-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Neutrals & Black
            </button>

            <button
              onClick={() => {
                setSelectedCategory("claridad");
                setSelectedStone("todos");
              }}
              className={`transition-colors cursor-pointer py-1 ${
                selectedCategory === "claridad"
                  ? "text-white font-medium border-b border-white"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Light & Moon
            </button>
          </div>

          {/* Enlace y Búsqueda a la Derecha */}
          <div className="hidden md:flex items-center gap-4 text-xs tracking-wider uppercase text-neutral-400">
            {searchQuery ? (
              <div className="flex items-center gap-2 bg-[#111111] px-3 py-1 rounded-full border border-neutral-800">
                <span className="text-[10px] text-white">{searchQuery}</span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-neutral-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ) : null}

            <button
              onClick={() => {
                document.getElementById("tirada-virtual")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[#FFE2A4] hover:text-[#C5A059] transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium"
            >
              <span>🔮 {t("Tirada 3 Cartas (-20%)", "3-Card Spread (-20%)")}</span>
            </button>

            <button
              onClick={() => {
                document.getElementById("hero-veta-mineral")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-[#C5A059] transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap text-[11px]"
            >
              <span>🌌 {t("Ver Veta Mineral", "View Mineral Vein")}</span>
              <span>↑</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. GRID PRINCIPAL CON RITMO EDITORIAL ESTILO AURUM BROTHERS
         ───────────────────────────────────────────────────────────── */}
      <main id="arcano-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Banner de Estado Activo si hay un Mineral Filtrado por la Veta */}
        {selectedStone !== "todos" && (
          <div className="mb-8 p-4 sm:p-5 bg-gradient-to-r from-black via-[#111111] to-black border border-[#C5A059] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn shadow-[0_0_30px_rgba(197,160,89,0.2)]">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <span className="w-3 h-3 rounded-full bg-[#C5A059] animate-ping" />
              <div>
                <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A059] block font-medium">
                  {t("FILTRANDO POR VETA MINERAL:", "FILTERING BY MINERAL VEIN:")}
                </span>
                <span className="text-base sm:text-lg font-light text-white tracking-wide">
                  {selectedStone} ·{" "}
                  <span className="text-neutral-300 text-xs sm:text-sm font-light">
                    {filteredProducts.length}{" "}
                    {filteredProducts.length === 1
                      ? t("pieza consagrada encontrada", "consecrated piece found")
                      : t("piezas consagradas encontradas", "consecrated pieces found")}
                  </span>
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedStone("todos");
                setSelectedCategory("todos");
              }}
              className="px-4 py-2 text-xs font-sans tracking-widest uppercase text-black font-semibold bg-[#C5A059] hover:bg-[#d8b368] rounded-full transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>✕ {t("Mostrar Todo el Catálogo", "Show All Pieces")}</span>
            </button>
          </div>
        )}

        {/* Renderizado de Productos con Bloques Editoriales In-Feed Intercalados */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-sm text-neutral-400 uppercase tracking-widest mb-4">
              {t("No encontramos arcanos con este filtro en este momento", "No arcana found matching this filter")}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("todos");
                setSelectedStone("todos");
                setSearchQuery("");
              }}
              className="text-xs tracking-widest uppercase text-[#C5A059] border-b border-[#C5A059] pb-0.5 hover:text-white hover:border-white transition-colors cursor-pointer"
            >
              {t("Ver los 78 Arcanos de la Baraja", "View all 78 Arcana")}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 sm:gap-x-8 gap-y-12 sm:gap-y-16">
            
            {/* Si está en 'todos' en categoría y piedra y sin búsqueda, aplicamos el ritmo editorial */}
            {selectedCategory === "todos" && selectedStone === "todos" && !searchQuery.trim() ? (
              <>
                {/* ── FILA 1: Arcanos 0, I, II, III (4 Productos) ── */}
                {filteredProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} onSelect={setActiveProduct} />
                ))}

                {/* ── FILA 2: EDITORIAL 1 (2 Cols Izquierda) + Arcanos IV, V (2 Productos) ── */}
                <EditorialCard
                  highlight={EDITORIAL_HIGHLIGHTS[0]}
                  onSelect={handleOpenProductBySlug}
                />
                {filteredProducts.slice(4, 6).map((product) => (
                  <ProductCard key={product.id} product={product} onSelect={setActiveProduct} />
                ))}

                {/* ── FILA 3: Arcanos VI, VII (2 Productos) + EDITORIAL 2 (2 Cols Derecha) ── */}
                {filteredProducts.slice(6, 8).map((product) => (
                  <ProductCard key={product.id} product={product} onSelect={setActiveProduct} />
                ))}
                <EditorialCard
                  highlight={EDITORIAL_HIGHLIGHTS[1]}
                  onSelect={handleOpenProductBySlug}
                />

                {/* ── FILA 4: Arcanos VIII, IX, X, XI (4 Productos) ── */}
                {filteredProducts.slice(8, 12).map((product) => (
                  <ProductCard key={product.id} product={product} onSelect={setActiveProduct} />
                ))}

                {/* ── FILA 5: EDITORIAL 3 (2 Cols Izquierda) + Arcanos XII, XIII (2 Productos) ── */}
                <EditorialCard
                  highlight={EDITORIAL_HIGHLIGHTS[2]}
                  onSelect={handleOpenProductBySlug}
                />
                {filteredProducts.slice(12, 14).map((product) => (
                  <ProductCard key={product.id} product={product} onSelect={setActiveProduct} />
                ))}

                {/* ── FILA 6: Arcanos XIV, XV (2 Productos) + EDITORIAL 4 (2 Cols Derecha) ── */}
                {filteredProducts.slice(14, 16).map((product) => (
                  <ProductCard key={product.id} product={product} onSelect={setActiveProduct} />
                ))}
                <EditorialCard
                  highlight={EDITORIAL_HIGHLIGHTS[3]}
                  onSelect={handleOpenProductBySlug}
                />

                {/* ── FILA 7: Arcanos XVI, XVII, XVIII, XIX (4 Productos) ── */}
                {filteredProducts.slice(16, 20).map((product) => (
                  <ProductCard key={product.id} product={product} onSelect={setActiveProduct} />
                ))}

                {/* ── FILA 8: Arcanos Restantes (XX, XXI y Arcanos Menores) ── */}
                {filteredProducts.slice(20).map((product) => (
                  <ProductCard key={product.id} product={product} onSelect={setActiveProduct} />
                ))}
              </>
            ) : (
              // Cuando hay filtro de categoría o búsqueda activa, mostramos los productos en grid directo
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onSelect={setActiveProduct} />
              ))
            )}

          </div>
        )}

      </main>

      {/* ─────────────────────────────────────────────────────────────
          4. MODAL CONCIERGE VIP (CIERRE DIRECTO A WHATSAPP)
         ───────────────────────────────────────────────────────────── */}
      {activeProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn"
          onClick={() => setActiveProduct(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0A0A0A] border border-neutral-800 rounded-lg shadow-2xl p-6 sm:p-10 text-white scrollbar-thin"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cerrar */}
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-neutral-400 hover:text-white text-lg p-2 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Columna Izquierda: Fotografía de la Pieza */}
              <div className="space-y-4">
                <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-black border border-neutral-900">
                  <Image
                    src={activeModalImage || activeProduct.imageUrl}
                    alt={activeProduct.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Miniaturas de galería si tiene */}
                {activeProduct.images && activeProduct.images.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto pb-1">
                    {activeProduct.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveModalImage(img)}
                        className={`relative w-16 h-16 rounded-sm overflow-hidden border cursor-pointer flex-shrink-0 transition-all ${
                          (activeModalImage || activeProduct.imageUrl) === img
                            ? "border-[#C5A059]"
                            : "border-neutral-800 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image src={img} alt={`Vista ${idx + 1}`} fill className="object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Columna Derecha: Especificaciones y Cierre Concierge */}
              <div className="space-y-6">
                
                {/* Encabezado del Arcano */}
                <div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059] block mb-1 font-mono">
                    ARCANO MAYOR {activeProduct.arcanoNumber || "✦"}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-light tracking-wide text-white mb-2">
                    {activeProduct.name}
                  </h2>
                  <p className="text-xl font-normal text-white tracking-wider">
                    {formatPrice(activeProduct.price)}
                  </p>
                </div>

                {/* Distintivo Concierge VIP Monterrey */}
                <div className="p-3.5 bg-neutral-900/70 border border-[#C5A059]/40 rounded-sm">
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#C5A059] text-sm mt-0.5">✨</span>
                    <div>
                      <p className="text-xs text-[#C5A059] font-medium tracking-wide">
                        Pieza Única Consagrada — Entrega Privada Concierge
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                        Servicio en mano sin costo en San Pedro Garza García, San Jerónimo, Cumbres y Linda Vista.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Selector de Zona de Entrega */}
                <div>
                  <label className="block text-[11px] tracking-[0.2em] uppercase text-neutral-400 mb-2 font-medium">
                    Zona de Entrega en Monterrey:
                  </label>
                  <select
                    value={selectedDeliveryZone}
                    onChange={(e) => setSelectedDeliveryZone(e.target.value)}
                    className="w-full bg-[#111111] border border-neutral-700 hover:border-[#C5A059] text-white text-xs py-2.5 px-3.5 rounded-sm focus:outline-none focus:border-[#C5A059] transition-colors cursor-pointer"
                  >
                    {CONCIERGE_ZONES.map((zone) => (
                      <option key={zone} value={zone} className="bg-black text-white">
                        {zone}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Especificaciones Técnicas Fijas */}
                <div className="space-y-2 border-t border-b border-neutral-800/80 py-4 text-xs text-neutral-300 font-light">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Pureza:</span>
                    <span className="text-white">100% Pura Piedra Mineral Grado AAA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Calibre:</span>
                    <span className="text-white">Uniforme 8 mm (22 cuentas exactas)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Ensamble:</span>
                    <span className="text-white">Elástico quirúrgico de alta tenacidad (sin metales)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Consagración:</span>
                    <span className="text-white">Luna Llena ante Fuego Sagrado de 1.5 m</span>
                  </div>
                </div>

                {/* Descripción / Historia Alquímica */}
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {activeProduct.arcanoStory || activeProduct.description}
                </p>

                {/* Botón Principal WhatsApp Concierge con Tracking */}
                <a
                  href={conciergeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleConciergeClick}
                  className="w-full py-3.5 px-6 bg-[#C5A059] hover:bg-[#d8b368] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg cursor-pointer hover:shadow-[0_0_20px_rgba(197,160,89,0.4)]"
                >
                  <span>Adquirir Pieza vía WhatsApp Concierge</span>
                  <span className="text-sm">↗</span>
                </a>

                <p className="text-[10px] text-center text-neutral-400 font-mono tracking-wider">
                  Cierre directo con Asesor Personal · Garantía y autenticidad certificada
                </p>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          5. FOOTER MINIMALISTA ARCANO
         ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-neutral-900 bg-black py-16 px-4 text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xl text-[#C5A059]">✦</span>
          <p className="text-xs tracking-[0.3em] uppercase text-white font-serif">
            ARCANO · SABIDURÍA DE LOS ARCANOS
          </p>
          <p className="text-[10px] tracking-widest text-neutral-400 uppercase max-w-lg mx-auto leading-relaxed">
            22 Talismanes forjados exclusivamente en 100% pura piedra mineral natural de calibre uniforme (8 mm). Cero metales, cero dijes, máxima pureza geológica.
          </p>
          <p className="text-[9px] text-neutral-400 pt-4 font-mono">
            © {new Date().getFullYear()} ARCANO SOLUTIONS · MONTERREY, MÉXICO.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <TiendaContent />
    </Suspense>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE: TARJETA DE PRODUCTO ESTILO AURUM BROTHERS
// ─────────────────────────────────────────────────────────────
function ProductCard({
  product,
  onSelect,
}: {
  product: ShopProduct;
  onSelect: (p: ShopProduct) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onSelect(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col cursor-pointer select-none text-left w-full focus:outline-none"
    >
      {/* Contenedor de Fotografía sobre Negro Absoluto */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#0A0A0A] mb-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-transform duration-700 ease-out ${
            isHovered ? "scale-[1.04]" : "scale-100"
          }`}
        />

        {/* Indicador de 2 puntos sutiles estilo Aurum Brothers */}
        <div className="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 opacity-40 group-hover:opacity-80 transition-opacity">
          <span className="w-1 h-1 rounded-full bg-white" />
          <span className="w-1 h-1 rounded-full bg-neutral-500" />
        </div>
      </div>

      {/* Información de la Pieza (Tipografía Aurum Brothers) */}
      <div className="space-y-1 w-full">
        {/* Fila de Título con Flecha Diagonal ↗ */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs sm:text-[13px] font-normal text-white group-hover:text-[#C5A059] transition-colors truncate">
            {product.name.replace("Arcano ", "Arcano ").split("(")[0].trim()}
          </h3>
          <span className="text-neutral-500 group-hover:text-[#C5A059] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-xs font-mono">
            ↗
          </span>
        </div>

        {/* Precio */}
        <p className="text-xs sm:text-[13px] text-neutral-300 font-light">
          {formatPrice(product.price)}
        </p>

        {/* Especificación de Calibre y Pureza */}
        <p className="text-[10px] sm:text-[11px] text-neutral-400 font-light truncate">
          8mm · Pura piedra natural sobre elástico
        </p>

        {/* Reseñas con Estrellas Doradas */}
        <div className="flex items-center gap-1 text-[10px] text-[#C5A059] pt-0.5">
          <span>★★★★★</span>
          <span className="text-neutral-400 font-mono text-[9px]">
            ({15 + ((product.name.length * 7) % 35)})
          </span>
        </div>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE: TARJETA EDITORIAL IN-FEED ("IN FOCUS") ESTILO AURUM
// ─────────────────────────────────────────────────────────────
function EditorialCard({
  highlight,
  onSelect,
}: {
  highlight: EditorialHighlight;
  onSelect: (slug: string) => void;
}) {
  return (
    <div
      onClick={() => onSelect(highlight.arcanoSlug)}
      className="col-span-1 md:col-span-2 group flex flex-col cursor-pointer select-none"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(highlight.arcanoSlug);
        }
      }}
    >
      {/* Fotografía Cinematográfica con Overlay y Texto */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black mb-3">
        <Image
          src={highlight.image}
          alt={highlight.headline}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover brightness-[0.9] group-hover:scale-[1.03] transition-transform duration-700 ease-out"
        />

        {/* Gradiente Oscuro para Legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />

        {/* Texto Sobreimpreso estilo Aurum Brothers */}
        <div className="absolute inset-0 p-5 sm:p-7 flex flex-col justify-end text-left">
          <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-neutral-300 font-medium mb-1">
            {highlight.eyebrow}
          </span>
          <h2 className="text-xl sm:text-3xl font-light text-white tracking-tight mb-2">
            {highlight.headline}
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-white/90 group-hover:text-[#C5A059] transition-colors underline underline-offset-4 decoration-neutral-500">
            <span>{highlight.ctaText}</span>
            <span className="text-xs">↗</span>
          </div>
        </div>
      </div>

      {/* Cita de Comprador Verificado Debajo */}
      <div className="space-y-1 text-left pt-1">
        <div className="text-[10px] text-[#C5A059]">★★★★★</div>
        <p className="text-xs sm:text-[13px] text-neutral-200 font-light italic leading-snug">
          "{highlight.ratingText}"
        </p>
        <p className="text-[10px] text-neutral-400 font-light">
          {highlight.buyerName} · {highlight.buyerLocation}
        </p>
      </div>
    </div>
  );
}
