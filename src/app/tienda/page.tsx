"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  shopCategories,
  shopProducts,
  ShopProduct,
} from "@/data/shop";
import { getWhatsAppUrl } from "@/config/brandConfig";
import { CreativeProcessGallery } from "@/components/shop/CreativeProcessGallery";
import { useCart } from "@/context/CartContext";

// Formateador exacto al estilo de Alta Joyería: $X,XXX.00 MXN
function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} MXN`;
}

// Lista de minerales emblemáticos para el filtro "Shop By Stone" estilo Aurum Brothers
const AURUM_STONES = [
  { id: "todos", name: "Todas las Gemas", symbol: "✦", color: "from-gold/40 to-amber-600/40" },
  { id: "Ámbar", name: "Ámbar de Chiapas", symbol: "🍯", color: "from-amber-400 to-yellow-600" },
  { id: "Obsidiana", name: "Obsidiana Dorada", symbol: "🌌", color: "from-zinc-900 to-yellow-950" },
  { id: "Labradorita", name: "Labradorita Espectral", symbol: "✨", color: "from-cyan-900 to-slate-700" },
  { id: "Ojo de Tigre", name: "Ojo de Tigre & Halcón", symbol: "🐯", color: "from-amber-700 to-stone-900" },
  { id: "Lapislázuli", name: "Lapislázuli Real", symbol: "🔵", color: "from-blue-900 to-indigo-950" },
  { id: "Citrino", name: "Citrino Solar", symbol: "☀️", color: "from-yellow-500 to-amber-300" },
  { id: "Hematita", name: "Hematita & Pirita", symbol: "🛡️", color: "from-zinc-600 to-stone-400" },
  { id: "Malaquita", name: "Malaquita & Jade", symbol: "🌿", color: "from-emerald-700 to-teal-900" },
  { id: "Amatista", name: "Amatista Sagrada", symbol: "💜", color: "from-purple-800 to-fuchsia-950" },
  { id: "Howlita", name: "Howlita & Cuarzo", symbol: "⚪", color: "from-stone-200 to-slate-400" },
  { id: "Jaspe", name: "Jaspe Rojo Imperial", symbol: "🔴", color: "from-red-800 to-stone-800" },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [selectedStone, setSelectedStone] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProduct, setActiveProduct] = useState<ShopProduct | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  
  // Opciones de configuración de brazalete estilo Aurum Brothers
  const [selectedWristSize, setSelectedWristSize] = useState<string>("M");
  const [modalTab, setModalTab] = useState<"detalles" | "mineral" | "ritual">("detalles");
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  const { addItem, openCart, totalCount, subtotal } = useCart();

  // Control de scroll y tecla Escape para el modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProduct(null);
      }
    };
    if (activeProduct) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setModalTab("detalles");
      setSelectedWristSize("M");
      setActiveModalImage(activeProduct.imageUrl);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeProduct]);

  // Filtrado reactivo de productos (Categoría + Piedra + Búsqueda)
  const filteredProducts = useMemo(() => {
    return shopProducts.filter((product) => {
      // 1. Filtro de Categoría
      const matchesCategory =
        selectedCategory === "todos" ||
        (selectedCategory === "doble-perforacion" &&
          (product.isDoublePerforation === true || product.categoryId === "doble-perforacion")) ||
        (selectedCategory === "alta-joyeria-oro" &&
          (product.categoryId === "alta-joyeria-oro" ||
            product.goldSpecifications !== undefined ||
            product.theme === "alta-joyeria-oro")) ||
        product.categoryId === selectedCategory ||
        product.theme === selectedCategory;

      // 2. Filtro de Piedra estilo Aurum Brothers
      let matchesStone = true;
      if (selectedStone !== "todos") {
        const queryStone = selectedStone.toLowerCase();
        const prodName = product.name.toLowerCase();
        const prodDesc = product.description.toLowerCase();
        const prodStone = (product.stoneType || "").toLowerCase();
        const prodTag = product.tagline.toLowerCase();
        matchesStone =
          prodStone.includes(queryStone) ||
          prodName.includes(queryStone) ||
          prodDesc.includes(queryStone) ||
          prodTag.includes(queryStone);
      }

      // 3. Filtro de búsqueda rápida
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.categoryName.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query) ||
        (product.stoneType && product.stoneType.toLowerCase().includes(query)) ||
        product.description.toLowerCase().includes(query);

      return matchesCategory && matchesStone && matchesSearch;
    });
  }, [selectedCategory, selectedStone, searchQuery]);

  const handleAddToCart = (
    product: ShopProduct,
    e?: React.MouseEvent,
    options?: { optionKey?: string; optionLabel?: string; price?: number },
    autoOpen: boolean = false
  ) => {
    if (e) e.stopPropagation();
    addItem(product, options);
    setAddedProductId(product.id);
    if (autoOpen) {
      setTimeout(() => openCart(), 200);
    }
    setTimeout(() => setAddedProductId(null), 1800);
  };

  const getProductWhatsAppMessage = (product: ShopProduct) => {
    const sizeNote = ` (Talla Muñeca: ${selectedWristSize})`;
    if (product.categoryId === "ambar-chiapas") {
      return `Hola ARCANO Concierge, deseo ordenar el talismán "${product.name}"${sizeNote} (${formatPrice(product.price)} ${product.shippingNote}). ¿Sigue disponible para despacho prioritario?`;
    }
    if (product.categoryId === "alta-joyeria-oro" || product.goldSpecifications) {
      return `Hola ARCANO Concierge, deseo ordenar la joya de alta orfebrería "${product.name}"${sizeNote} (${formatPrice(product.price)} ${product.shippingNote}). ¿Tienen disponibilidad inmediata?`;
    }
    if (product.categoryId === "duos") {
      return `Hola ARCANO Concierge, deseo encargar el set ceremonial "${product.name}" (${formatPrice(product.price)} ${product.shippingNote}).`;
    }
    return `Hola ARCANO Concierge, deseo ordenar la pieza ritual "${product.name}" (${formatPrice(product.price)} ${product.shippingNote}).`;
  };

  return (
    <div className="bg-[#07060B] text-[#F3EFE6] min-h-screen transition-colors duration-500 font-sans selection:bg-gold/30 selection:text-gold-light">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP LUXURY VAULT BAR (ESTILO AURUM BROTHERS / ARCANO)
         ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#000000] text-gold-light/90 py-2.5 px-4 text-center border-b border-gold/20 shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] font-sans tracking-[0.25em] uppercase font-light">
          <span className="hidden md:inline text-gold">✦</span>
          <span>LUXURY BEADED BRACELETS · GEMAS NATURALES GRADO AAA</span>
          <span className="opacity-40">|</span>
          <span className="hidden sm:inline">ORO 18K & PLATA .925</span>
          <span className="opacity-40 hidden sm:inline">|</span>
          <span className="hidden lg:inline">ENVÍO PRIORITARIO ASEGURADO A TODO MÉXICO</span>
          <span className="hidden md:inline text-gold">✦</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. HEADER DE MARCA & NAVEGACIÓN CINEMÁTICA
         ───────────────────────────────────────────────────────────── */}
      <header className="border-b border-gold/15 bg-[#09080E]/95 backdrop-blur-xl sticky top-0 z-30 shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
          
          {/* Logo A R C A N O ® */}
          <div className="flex-shrink-0">
            <Link
              href="/tienda"
              className="font-serif tracking-[0.35em] sm:tracking-[0.45em] text-xl sm:text-2xl text-parchment uppercase font-light hover:text-gold transition-colors flex items-center gap-2 group"
            >
              <span className="text-gold text-xs group-hover:rotate-45 transition-transform duration-500">✦</span>
              A R C A N O <span className="text-[10px] tracking-normal font-sans align-top text-gold/80">®</span>
            </Link>
          </div>

          {/* Menú de Categorías Rápido Desktop */}
          <nav className="hidden xl:flex items-center gap-7 text-[11px] tracking-[0.22em] uppercase font-sans font-medium text-parchment-muted">
            <button
              onClick={() => { setSelectedCategory("alta-joyeria-oro"); setSelectedStone("todos"); setSearchQuery(""); }}
              className={`hover:text-gold transition-colors pb-1 border-b-2 cursor-pointer ${
                selectedCategory === "alta-joyeria-oro" ? "border-gold text-gold" : "border-transparent"
              }`}
            >
              Oro 18K & Gemas
            </button>
            <button
              onClick={() => { setSelectedCategory("ambar-chiapas"); setSelectedStone("todos"); setSearchQuery(""); }}
              className={`hover:text-gold transition-colors pb-1 border-b-2 cursor-pointer ${
                selectedCategory === "ambar-chiapas" ? "border-gold text-gold" : "border-transparent"
              }`}
            >
              Ámbar de Chiapas
            </button>
            <button
              onClick={() => { setSelectedCategory("talismanes"); setSelectedStone("todos"); setSearchQuery(""); }}
              className={`hover:text-gold transition-colors pb-1 border-b-2 cursor-pointer ${
                selectedCategory === "talismanes" ? "border-gold text-gold" : "border-transparent"
              }`}
            >
              Brazaletes Minerales
            </button>
            <button
              onClick={() => { setSelectedCategory("duos"); setSelectedStone("todos"); setSearchQuery(""); }}
              className={`hover:text-gold transition-colors pb-1 border-b-2 cursor-pointer ${
                selectedCategory === "duos" ? "border-gold text-gold" : "border-transparent"
              }`}
            >
              Dúos & Stacks
            </button>
            <button
              onClick={() => { setSelectedCategory("piedras-rio"); setSelectedStone("todos"); setSearchQuery(""); }}
              className={`hover:text-gold transition-colors pb-1 border-b-2 cursor-pointer ${
                selectedCategory === "piedras-rio" ? "border-gold text-gold" : "border-transparent"
              }`}
            >
              Piedras de Río
            </button>
            <button
              onClick={() => { setSelectedCategory("doble-perforacion"); setSelectedStone("todos"); setSearchQuery(""); }}
              className={`hover:text-gold transition-colors pb-1 border-b-2 cursor-pointer ${
                selectedCategory === "doble-perforacion" ? "border-gold text-gold" : "border-transparent"
              }`}
            >
              Doble Perforación
            </button>
            <button
              onClick={() => { setSelectedCategory("todos"); setSelectedStone("todos"); setSearchQuery(""); }}
              className={`hover:text-gold transition-colors pb-1 border-b-2 cursor-pointer ${
                selectedCategory === "todos" && selectedStone === "todos" ? "border-gold text-gold" : "border-transparent"
              }`}
            >
              Ver Todo ({shopProducts.length})
            </button>
          </nav>

          {/* Utilidades de Header (Región + Carrito) */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs font-sans">
            <span className="hidden sm:inline-block text-parchment-dim tracking-wider text-[11px]">
              México | MXN $
            </span>

            {/* Botón Carrito Ceremonial */}
            <button
              onClick={openCart}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-gold/40 hover:border-gold bg-[#14121C] hover:bg-[#1C1827] text-parchment transition-all cursor-pointer group shadow-[0_0_15px_rgba(198,160,82,0.15)]"
              aria-label="Abrir carrito ceremonial"
            >
              <span className="text-base group-hover:scale-110 transition-transform text-gold">🛍️</span>
              <span className="text-xs font-medium tracking-wider">
                Bolsa ({totalCount})
              </span>
              {totalCount > 0 && (
                <span className="text-[11px] font-semibold text-gold hidden sm:inline">
                  · {formatPrice(subtotal)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          3. HERO EDITORIAL DE ALTA JOYERÍA (ESTILO AURUM BROTHERS)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-gold/20 bg-gradient-to-b from-[#0B0912] via-[#0E0C17] to-[#07060B]">
        {/* Atmósfera de luz áurea de fondo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-gold/10 via-amber-600/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          
          {/* Badge superior minimalista */}
          <div className="inline-block border border-gold/40 bg-obsidian-deep/80 backdrop-blur px-5 py-2 rounded-full mb-8 shadow-[0_0_20px_rgba(198,160,82,0.2)] animate-fadeIn">
            <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.3em] text-gold uppercase font-medium">
              ✦ FORGET MASS-PRODUCED · LUXURY BEADED BRACELETS · EDICIÓN MAESTRA ✦
            </span>
          </div>

          {/* Gran Titular Editorial Aurum Brothers */}
          <h1 className="font-serif font-light text-4xl sm:text-6xl md:text-7xl text-parchment tracking-[0.15em] uppercase mb-3 drop-shadow-lg">
            FORJADO POR LA TIERRA
          </h1>
          <p className="font-serif italic font-light text-3xl sm:text-5xl md:text-6xl text-gold-light mb-8 tracking-wide">
            Elevado por el Alma
          </p>

          {/* Párrafo Editorial de Lujo */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-parchment-muted font-light leading-relaxed mb-10">
            Olvídate de la joyería masiva. Cada brazalete es una composición mineral irrepetible ensamblada a mano con gemas de cantera Grado AAA seleccionadas por su peso, densidad y textura geológica, combinadas con Ámbar Fósil de Chiapas y acentos nobles forjados en <strong>Oro 18K</strong> y <strong>Plata Ley .925</strong>.
          </p>

          {/* Botones de Acción Editorial */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 mb-14">
            <button
              onClick={() => {
                setSelectedCategory("talismanes");
                setSelectedStone("todos");
                document.getElementById("catalogo-grid")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-gradient-to-r from-[#B59143] via-[#CDB067] to-[#B59143] text-obsidian text-xs font-sans tracking-[0.25em] uppercase font-bold hover:brightness-110 transition-all shadow-[0_0_25px_rgba(198,160,82,0.35)] cursor-pointer"
            >
              EXPLORAR BRAZALETES
            </button>
            <button
              onClick={() => {
                setSelectedCategory("ambar-chiapas");
                setSelectedStone("Ámbar");
                document.getElementById("catalogo-grid")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-4 bg-obsidian-deep/80 border border-gold/60 text-gold text-xs font-sans tracking-[0.25em] uppercase font-medium hover:bg-gold/10 hover:border-gold transition-all shadow-sm cursor-pointer"
            >
              ÁMBAR DE CHIAPAS
            </button>
            <a
              href={getWhatsAppUrl("Hola ARCANO Concierge, deseo asesoría personalizada sobre un brazalete de minerales o stack para mi muñeca.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 bg-[#14121C] border border-[#25D366]/60 text-[#25D366] text-xs font-sans tracking-[0.18em] uppercase font-medium hover:bg-[#25D366]/10 transition-colors shadow-sm flex items-center gap-2"
            >
              <span>💬 WHATSAPP CONCIERGE</span>
            </a>
          </div>

          {/* Enlace sutil para visitantes móviles que buscan lecturas u oráculo */}
          <div className="mt-2 text-center sm:hidden">
            <Link
              href="/?view=full"
              className="inline-flex items-center gap-2 text-[11px] font-sans tracking-[0.25em] uppercase text-gold/80 hover:text-gold transition-colors py-1.5 border-b border-gold/30"
            >
              <span>✦ ¿Deseas consultar el Oráculo o Lecturas? Ver Santuario</span>
              <span>→</span>
            </Link>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              4. BARRA DE 4 PILARES MAESTROS (THE AURUM ANATOMY)
             ───────────────────────────────────────────────────────────── */}
          <div className="max-w-4xl mx-auto bg-[#100E18]/90 border border-gold/30 p-6 sm:p-8 rounded-sm shadow-[0_4px_30px_rgba(0,0,0,0.8)] grid grid-cols-2 md:grid-cols-4 gap-6 text-center backdrop-blur-md">
            <div className="border-r-0 md:border-r border-gold/20 last:border-r-0 pb-4 md:pb-0">
              <span className="block font-serif text-xl sm:text-2xl text-gold mb-1 font-light">
                GRADO AAA+
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.2em] text-parchment-muted uppercase block">
                Gemas 100% Naturales
              </span>
            </div>
            <div className="border-r-0 md:border-r border-gold/20 last:border-r-0 pb-4 md:pb-0">
              <span className="block font-serif text-xl sm:text-2xl text-gold mb-1 font-light">
                ORO & PLATA
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.2em] text-parchment-muted uppercase block">
                Herrajes Oro 18K y .925
              </span>
            </div>
            <div className="border-r-0 md:border-r border-gold/20 last:border-r-0">
              <span className="block font-serif text-xl sm:text-2xl text-gold mb-1 font-light">
                8MM & 10MM
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.2em] text-parchment-muted uppercase block">
                Calibre & Talla a Medida
              </span>
            </div>
            <div>
              <span className="block font-serif text-xl sm:text-2xl text-gold mb-1 font-light">
                CERTIFICADO
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.2em] text-parchment-muted uppercase block">
                Envío Blindado Todo México
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. SHOP BY STONE · CAROUSEL VISUAL DE MINERALES (ESTILO AURUM)
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-b border-gold/15">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-gold block mb-1">
              CURACIÓN GEOLÓGICA & METAFÍSICA
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-parchment tracking-wide font-light">
              Shop by Stone · Elige por Mineral
            </h2>
          </div>
          <span className="text-xs font-sans text-parchment-dim tracking-wider">
            Filtra al instante entre 12 variedades minerales sagradas
          </span>
        </div>

        {/* Barra de Filtro de Gemas */}
        <div className="w-full overflow-x-auto pb-4 scrollbar-none">
          <div className="flex items-center gap-2.5 whitespace-nowrap min-w-max">
            {AURUM_STONES.map((stone) => {
              const isActive = selectedStone === stone.id;
              const count = shopProducts.filter((p) => {
                if (stone.id === "todos") return true;
                const query = stone.id.toLowerCase();
                return (
                  (p.stoneType && p.stoneType.toLowerCase().includes(query)) ||
                  p.name.toLowerCase().includes(query) ||
                  p.description.toLowerCase().includes(query) ||
                  p.tagline.toLowerCase().includes(query)
                );
              }).length;

              return (
                <button
                  key={stone.id}
                  onClick={() => {
                    setSelectedStone(stone.id);
                    document.getElementById("catalogo-grid")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`px-4 py-2.5 text-xs font-sans tracking-wider uppercase transition-all duration-300 flex items-center gap-2.5 border rounded-sm cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-gold/30 via-gold/20 to-gold/30 border-gold text-gold font-semibold shadow-[0_0_15px_rgba(198,160,82,0.3)]"
                      : "bg-[#110F19] text-parchment-muted border-gold/20 hover:border-gold/60 hover:text-parchment"
                  }`}
                >
                  <span className="text-sm">{stone.symbol}</span>
                  <span>{stone.name}</span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      isActive ? "bg-gold text-obsidian font-bold" : "bg-obsidian-deep/80 text-parchment-dim"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. GUÍA DE APILADO CEREMONIAL (THE ART OF STACKING - AURUM STYLE)
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-gold/15">
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-gold block mb-2">
            ARCANO STACKING GUIDE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-parchment tracking-wide font-light mb-4">
            El Arte del Apilado Mineral
          </h2>
          <p className="text-xs sm:text-sm font-sans text-parchment-muted leading-relaxed">
            Combina brazaletes de diferentes tonalidades y calibres para crear una presencia sofisticada que refleje tu polaridad. Diseñados para lucir con distinción individualmente o junto a un reloj de alta gama.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Stack 1: Escudo y Enraizamiento */}
          <div
            onClick={() => {
              setSelectedStone("Obsidiana");
              document.getElementById("catalogo-grid")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative aspect-[4/5] overflow-hidden bg-[#110F19] border border-gold/20 hover:border-gold/70 transition-all duration-500 cursor-pointer shadow-lg"
          >
            <Image
              src="/images/shop/pulseras_arcanos/pulsera_01.jpeg"
              alt="Stack de Protección: Obsidiana & Hematita"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.85] contrast-[1.15]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-parchment text-left">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-gold block mb-1">
                STACK #1 · ESCUDO SAGRADO
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-light mb-2 text-white">
                Obsidiana Dorada & Hematita
              </h3>
              <p className="text-xs font-sans text-parchment-dim leading-relaxed mb-3">
                Blindaje psíquico, sobriedad y enraizamiento telúrico con reloj de acero o carátula negra.
              </p>
              <span className="text-xs font-sans tracking-widest uppercase text-gold group-hover:underline underline-offset-4 flex items-center gap-1">
                Explorar Stack →
              </span>
            </div>
          </div>

          {/* Stack 2: Alquimia Solar & Éxito */}
          <div
            onClick={() => {
              setSelectedStone("Ámbar");
              document.getElementById("catalogo-grid")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative aspect-[4/5] overflow-hidden bg-[#110F19] border border-gold/20 hover:border-gold/70 transition-all duration-500 cursor-pointer shadow-lg"
          >
            <Image
              src="/images/shop/pulseras/pulsera-ambar-trebol-plata.jpg"
              alt="Stack Solar: Ámbar Chiapas & Citrino"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.85] contrast-[1.15]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-parchment text-left">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-gold block mb-1">
                STACK #2 · FUEGO & PROSPERIDAD
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-light mb-2 text-white">
                Ámbar Fósil & Citrino Solar
              </h3>
              <p className="text-xs font-sans text-parchment-dim leading-relaxed mb-3">
                Calidez prehistórica, magnetismo personal y abundancia áurea para firmas y acuerdos clave.
              </p>
              <span className="text-xs font-sans tracking-widest uppercase text-gold group-hover:underline underline-offset-4 flex items-center gap-1">
                Explorar Stack →
              </span>
            </div>
          </div>

          {/* Stack 3: Visión Mística */}
          <div
            onClick={() => {
              setSelectedStone("Labradorita");
              document.getElementById("catalogo-grid")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative aspect-[4/5] overflow-hidden bg-[#110F19] border border-gold/20 hover:border-gold/70 transition-all duration-500 cursor-pointer shadow-lg"
          >
            <Image
              src="/images/shop/pulseras_arcanos/pulsera_07.jpeg"
              alt="Stack Visión: Labradorita & Lapislázuli"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-[0.85] contrast-[1.15]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-parchment text-left">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-gold block mb-1">
                STACK #3 · VISIÓN ORACULAR
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-light mb-2 text-white">
                Labradorita & Lapislázuli Real
              </h3>
              <p className="text-xs font-sans text-parchment-dim leading-relaxed mb-3">
                Destellos espectrales de azul pavo real para agudizar la intuición oracular y el discernimiento.
              </p>
              <span className="text-xs font-sans tracking-widest uppercase text-gold group-hover:underline underline-offset-4 flex items-center gap-1">
                Explorar Stack →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. CATÁLOGO PRINCIPAL · GRID DE ALTA JOYERÍA MINERAL
         ───────────────────────────────────────────────────────────── */}
      <section id="catalogo-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        {/* Cabecera de Colección y Filtros */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-gold/20">
          <div>
            <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-gold block mb-1">
              COLECCIÓN COMPLETA ARCANO & MINERALES ({filteredProducts.length} PIEZAS)
            </span>
            <h2 className="font-serif font-light text-2xl sm:text-4xl text-parchment tracking-wide">
              {selectedStone !== "todos"
                ? `Brazaletes de ${selectedStone}`
                : selectedCategory === "todos"
                ? "Catálogo General de Alta Joyería & Altar"
                : shopCategories.find((c) => c.id === selectedCategory)?.name || "Colección Seleccionada"}
            </h2>
          </div>

          {/* Buscador Rápido de Gemas */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por gema, ámbar, oro, talla..."
              className="w-full bg-[#110F19] border border-gold/30 px-4 py-2.5 text-xs font-sans text-parchment placeholder-parchment-dim focus:outline-none focus:border-gold transition-colors rounded-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-parchment-dim hover:text-gold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Barra de Filtros de Colección */}
        <div className="w-full overflow-x-auto pb-4 mb-10 scrollbar-none">
          <div className="flex items-center gap-2 whitespace-nowrap min-w-max">
            {shopCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = shopProducts.filter((p) => {
                if (cat.id === "todos") return true;
                if (cat.id === "doble-perforacion")
                  return p.isDoublePerforation === true || p.categoryId === "doble-perforacion";
                if (cat.id === "alta-joyeria-oro")
                  return (
                    p.categoryId === "alta-joyeria-oro" ||
                    p.goldSpecifications !== undefined ||
                    p.theme === "alta-joyeria-oro"
                  );
                return p.categoryId === cat.id || p.theme === cat.id;
              }).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedStone("todos");
                  }}
                  className={`px-4 py-2 text-xs font-sans tracking-wider uppercase transition-all duration-200 flex items-center gap-2 border rounded-sm cursor-pointer ${
                    isActive
                      ? "bg-gold text-obsidian border-gold font-bold shadow-[0_0_15px_rgba(198,160,82,0.4)]"
                      : "bg-[#110F19] text-parchment-muted border-gold/20 hover:border-gold/50 hover:text-parchment"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-obsidian text-gold font-bold" : "bg-obsidian-deep text-parchment-dim"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Resumen de Conteo de Piezas */}
        <div className="flex items-center justify-between text-xs font-sans text-parchment-dim mb-8 pb-3 border-b border-gold/15">
          <span>Mostrando {filteredProducts.length} piezas exclusivas</span>
          <span className="hidden sm:inline">Todas las piezas incluyen Estuche Rígido, Paño y Certificado</span>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            GRID DE PRODUCTOS 4 COLUMNAS (ESTILO AURUM BROTHERS DUAL-HOVER)
           ───────────────────────────────────────────────────────────── */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center bg-[#100E18] border border-gold/20 p-8 rounded-sm">
            <span className="text-4xl block mb-3">🔍</span>
            <h3 className="font-serif text-xl text-parchment font-light mb-2">
              No encontramos piezas con ese criterio
            </h3>
            <p className="text-xs text-parchment-muted mb-6 max-w-md mx-auto">
              Prueba cambiando la gema mineral seleccionada o restablece los filtros del catálogo.
            </p>
            <button
              onClick={() => { setSelectedCategory("todos"); setSelectedStone("todos"); setSearchQuery(""); }}
              className="px-8 py-3 bg-gold text-obsidian text-xs font-sans tracking-widest uppercase font-bold hover:brightness-110"
            >
              Ver Todo el Catálogo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 mb-20">
            {filteredProducts.map((product) => {
              const isAdded = addedProductId === product.id;
              const isHovered = hoveredCardId === product.id;
              const hasSecondaryImg = Boolean(product.secondaryImageUrl && product.secondaryImageUrl !== product.imageUrl);

              return (
                <div
                  key={product.id}
                  onClick={() => setActiveProduct(product)}
                  onMouseEnter={() => setHoveredCardId(product.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className="group relative flex flex-col justify-between border border-gold/20 hover:border-gold/70 transition-all duration-500 bg-[#0F0E16] cursor-pointer overflow-hidden shadow-lg hover:shadow-[0_0_25px_rgba(198,160,82,0.2)] rounded-sm"
                >
                  {/* Contenedor Superior: Imagen con Efecto Dual-Hover Aurum Brothers */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0A0910]">
                    {/* Imagen Primaria */}
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className={`object-cover transition-all duration-700 ${
                        hasSecondaryImg && isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
                      } ${!product.inStock ? "grayscale-[40%] opacity-80" : ""}`}
                    />

                    {/* Imagen Secundaria (Efecto Hover de Muñeca / Detalle) */}
                    {hasSecondaryImg && (
                      <Image
                        src={product.secondaryImageUrl!}
                        alt={`${product.name} vista en muñeca`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className={`object-cover transition-all duration-700 absolute inset-0 ${
                          isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
                        }`}
                      />
                    )}

                    {/* Badges Estilo Aurum Brothers */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
                      {product.goldSpecifications && (
                        <span className="px-2 py-0.5 bg-[#D4AF37] text-obsidian text-[9px] uppercase tracking-wider font-sans font-bold shadow-sm">
                          ORO 18K
                        </span>
                      )}
                      {product.badge && !product.goldSpecifications && (
                        <span className="px-2 py-0.5 bg-obsidian-deep/90 text-gold border border-gold/40 text-[9px] uppercase tracking-wider font-sans font-medium backdrop-blur">
                          {product.badge}
                        </span>
                      )}
                      {product.beadSize && (
                        <span className="hidden sm:inline-block px-1.5 py-0.5 bg-black/80 text-parchment-muted text-[8px] uppercase tracking-widest font-sans">
                          {product.beadSize}
                        </span>
                      )}
                    </div>

                    {/* Badge de Vendido si está agotado */}
                    {!product.inStock && (
                      <div className="absolute top-2.5 right-2.5 z-10 px-2 py-0.5 bg-[#C0392B] text-white text-[9px] uppercase tracking-widest font-sans font-bold">
                        VENDIDO
                      </div>
                    )}

                    {/* Botón flotante al hacer hover en Desktop */}
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center">
                      <span className="w-full py-2 bg-gradient-to-r from-gold/90 to-amber-500/90 text-obsidian text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-center shadow-lg">
                        Ficha de Mineral ✦
                      </span>
                    </div>
                  </div>

                  {/* Contenedor Inferior de Información: Fondo Oscuro Noche Aurum */}
                  <div className="bg-[#111019] p-3.5 sm:p-4 border-t border-gold/15 flex flex-col flex-1 justify-between text-left">
                    <div>
                      {/* Categoría / Subtítulo fino */}
                      <span className="text-[9px] font-sans tracking-[0.2em] uppercase text-gold/80 block mb-1">
                        {product.stoneType || product.categoryName}
                      </span>

                      {/* Nombre del Producto */}
                      <h3 className="font-serif text-xs sm:text-sm font-light text-parchment tracking-wide line-clamp-2 uppercase group-hover:text-gold transition-colors mb-2">
                        {product.name}
                      </h3>
                    </div>

                    {/* Precio y Botón de Acción Rápida */}
                    <div className="pt-2 border-t border-gold/10 flex items-center justify-between mt-auto">
                      <div>
                        <span className="font-sans text-xs sm:text-sm font-medium text-gold-light tracking-wider block">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      {/* Botón Agregar a la Bolsa */}
                      {product.inStock ? (
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          className={`px-3 py-1.5 text-[10px] font-sans tracking-wider uppercase transition-all flex items-center gap-1 cursor-pointer rounded-sm ${
                            isAdded
                              ? "bg-[#27AE60] text-white font-bold"
                              : "bg-gold/20 border border-gold/50 text-gold hover:bg-gold hover:text-obsidian"
                          }`}
                          title="Agregar al carrito ceremonial"
                        >
                          {isAdded ? "Agregado ✓" : "+ Bolsa"}
                        </button>
                      ) : (
                        <span className="text-[10px] text-[#C0392B] font-sans uppercase tracking-wider font-medium">
                          Agotada
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            8. BANNER DE CONCIERGE & PIEZAS PERSONALIZADAS
           ───────────────────────────────────────────────────────────── */}
        <div className="border border-gold/30 bg-[#100E19] p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-2xl" />
          <span className="text-3xl block mb-3 text-gold">⚜️</span>
          <h3 className="font-serif text-2xl sm:text-3xl text-parchment font-light tracking-wide mb-3">
            Brazaletes Personalizados & Stacks a Medida
          </h3>
          <p className="text-xs sm:text-sm text-parchment-muted font-sans leading-relaxed mb-6 max-w-xl mx-auto">
            ¿Buscas una combinación mineral específica para tu fecha de nacimiento, signo zodiacal o calibre personalizado de 10mm? Nuestros artesanos elaboran composiciones sagradas a tu medida exacta.
          </p>
          <a
            href={getWhatsAppUrl("Hola ARCANO Concierge, deseo cotizar un brazalete mineral personalizado a mi medida exacta.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-gold/90 to-amber-500/90 text-obsidian text-xs font-sans tracking-[0.2em] uppercase font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(198,160,82,0.3)]"
          >
            <span>SOLICITAR ASESORÍA CONCIERGE</span>
            <span>→</span>
          </a>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. GALERÍA DEL PROCESO CREATIVO & MANIFIESTO
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gold/15">
        <CreativeProcessGallery />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          10. MODAL DE FICHA DE BRAZALETE (AURUM BROTHERS SIZING & SPECS)
         ───────────────────────────────────────────────────────────── */}
      {activeProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn"
          onClick={() => setActiveProduct(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0E0C16] border border-gold/40 shadow-[0_0_50px_rgba(0,0,0,0.9)] p-6 sm:p-10 my-auto text-left rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cerrar */}
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#161422] border border-gold/30 flex items-center justify-center text-parchment hover:text-gold hover:border-gold transition-all text-base cursor-pointer"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Columna Izquierda: Imagen y Galería de Ángulos */}
              <div>
                <div className="relative aspect-[4/5] w-full bg-[#13111F] border border-gold/25 overflow-hidden rounded-sm">
                  <Image
                    src={activeModalImage || activeProduct.imageUrl}
                    alt={activeProduct.name}
                    fill
                    className="object-cover transition-all duration-300"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />

                  {/* Badges en Modal */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    {activeProduct.goldSpecifications && (
                      <span className="px-2.5 py-1 bg-gold text-obsidian text-[10px] uppercase tracking-wider font-sans font-bold shadow-md">
                        ORO 18K & GEMAS AAA
                      </span>
                    )}
                    {activeProduct.badge && (
                      <span className="px-2.5 py-1 bg-obsidian-deep/90 text-gold border border-gold/40 text-[10px] uppercase tracking-wider font-sans font-medium">
                        {activeProduct.badge}
                      </span>
                    )}
                  </div>

                  {!activeProduct.inStock && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-[#C0392B] text-white text-[10px] uppercase tracking-widest font-sans font-bold">
                      PIEZA VENDIDA
                    </div>
                  )}
                </div>

                {/* Vistas en Miniatura si existen imágenes secundarias */}
                {activeProduct.images && activeProduct.images.length > 1 && (
                  <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1 scrollbar-none">
                    {activeProduct.images.map((img, i) => {
                      const isSelected = (activeModalImage || activeProduct.imageUrl) === img;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveModalImage(img)}
                          className={`relative w-16 h-16 flex-shrink-0 border rounded-sm overflow-hidden bg-[#13111F] cursor-pointer transition-all ${
                            isSelected
                              ? "border-gold shadow-[0_0_12px_rgba(198,160,82,0.6)] scale-105"
                              : "border-gold/30 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Columna Derecha: Selector de Talla, Pestañas y Checkout */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-gold block mb-1">
                    {activeProduct.stoneType || activeProduct.categoryName}
                  </span>
                  <h2 className="font-serif font-light text-2xl sm:text-3xl text-parchment tracking-wide uppercase mb-3">
                    {activeProduct.name}
                  </h2>

                  {/* Precio */}
                  <div className="mb-6 pb-4 border-b border-gold/20">
                    <span className="font-sans text-2xl sm:text-3xl font-semibold text-gold tracking-wider">
                      {formatPrice(activeProduct.price)}
                    </span>
                    <span className="text-xs text-parchment-dim block mt-1 font-sans">
                      {activeProduct.shippingNote} · Empaque de Colección & Envío Asegurado
                    </span>
                  </div>

                  {/* Selector de Talla de Muñeca (Aurum Sizing Guide) */}
                  <div className="mb-6 p-4 bg-[#141220] border border-gold/20 rounded-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-sans uppercase tracking-wider text-parchment font-medium">
                        Talla de Muñeca (Circunferencia):
                      </span>
                      <a
                        href={getWhatsAppUrl("Hola ARCANO, tengo dudas sobre cómo medir mi muñeca para mi brazalete.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-sans text-gold underline underline-offset-2"
                      >
                        Guía de Tallas
                      </a>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { size: "S", label: "16-17 cm" },
                        { size: "M", label: "18-19 cm" },
                        { size: "L", label: "20-21 cm" },
                        { size: "XL", label: "22 cm" },
                      ].map((t) => (
                        <button
                          key={t.size}
                          onClick={() => setSelectedWristSize(t.size)}
                          className={`py-2 px-1 text-center border rounded-sm transition-all cursor-pointer ${
                            selectedWristSize === t.size
                              ? "bg-gold text-obsidian border-gold font-bold shadow-md"
                              : "bg-[#181626] text-parchment-muted border-gold/20 hover:border-gold/50"
                          }`}
                        >
                          <span className="text-xs block font-bold">{t.size}</span>
                          <span className="text-[9px] block opacity-80">{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pestañas de Información (Detalles / Propiedades / Ritual) */}
                  <div className="flex border-b border-gold/20 mb-4 gap-4 text-xs font-sans uppercase tracking-wider">
                    <button
                      onClick={() => setModalTab("detalles")}
                      className={`pb-2 transition-colors cursor-pointer ${
                        modalTab === "detalles" ? "border-b-2 border-gold text-gold font-bold" : "text-parchment-dim hover:text-parchment"
                      }`}
                    >
                      Detalles
                    </button>
                    <button
                      onClick={() => setModalTab("mineral")}
                      className={`pb-2 transition-colors cursor-pointer ${
                        modalTab === "mineral" ? "border-b-2 border-gold text-gold font-bold" : "text-parchment-dim hover:text-parchment"
                      }`}
                    >
                      Propiedades
                    </button>
                    <button
                      onClick={() => setModalTab("ritual")}
                      className={`pb-2 transition-colors cursor-pointer ${
                        modalTab === "ritual" ? "border-b-2 border-gold text-gold font-bold" : "text-parchment-dim hover:text-parchment"
                      }`}
                    >
                      Consagración
                    </button>
                  </div>

                  {/* Contenido de Pestaña */}
                  <div className="min-h-[110px] text-xs sm:text-sm font-sans text-parchment-muted leading-relaxed mb-6">
                    {modalTab === "detalles" && (
                      <p>{activeProduct.description}</p>
                    )}
                    {modalTab === "mineral" && (
                      <div className="space-y-2">
                        <p className="text-parchment font-medium">
                          Gema: {activeProduct.stoneType || "Mineral Natural Grado AAA"}
                        </p>
                        <p>{activeProduct.tagline}</p>
                        <p className="text-[11px] text-gold/90">
                          ✦ Cada esfera presenta variaciones morfológicas naturales que certifican su autenticidad geológica.
                        </p>
                      </div>
                    )}
                    {modalTab === "ritual" && (
                      <div className="p-3 bg-[#131120] border border-gold/20 rounded-sm">
                        <span className="text-gold font-medium block mb-1">
                          ✦ Propósito Energético & Intención:
                        </span>
                        <p>{activeProduct.ritualUse || "Anclaje de intención y protección energética diaria."}</p>
                      </div>
                    )}
                  </div>

                  {/* Lista de Especificaciones */}
                  <div className="mb-6 space-y-1.5 text-xs font-sans border-t border-gold/15 pt-4">
                    {activeProduct.details.slice(0, 4).map((d, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-parchment-dim">
                        <span className="text-gold text-[10px] mt-0.5">✦</span>
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>

                  {/* Botones de Compra */}
                  <div className="space-y-3">
                    {activeProduct.inStock ? (
                      <button
                        onClick={() => {
                          const sizeCm =
                            selectedWristSize === "S"
                              ? "16-17 cm"
                              : selectedWristSize === "M"
                              ? "18-19 cm"
                              : selectedWristSize === "L"
                              ? "20-21 cm"
                              : "22 cm";
                          handleAddToCart(
                            activeProduct,
                            undefined,
                            {
                              optionKey: `talla-${selectedWristSize}`,
                              optionLabel: `Talla ${selectedWristSize} (${sizeCm})`,
                            },
                            true
                          );
                        }}
                        className={`w-full py-4 text-xs font-sans tracking-[0.25em] uppercase transition-all duration-300 font-bold shadow-lg cursor-pointer flex items-center justify-center gap-2 ${
                          addedProductId === activeProduct.id
                            ? "bg-[#27AE60] text-white"
                            : "bg-gradient-to-r from-gold/90 via-amber-400 to-gold/90 text-obsidian hover:brightness-110 shadow-[0_0_20px_rgba(198,160,82,0.4)]"
                        }`}
                      >
                        <span>{addedProductId === activeProduct.id ? "¡AÑADIDO A TU BOLSA!" : "AÑADIR A LA BOLSA"}</span>
                        <span>·</span>
                        <span>{formatPrice(activeProduct.price)}</span>
                      </button>
                    ) : (
                      <div className="w-full py-3.5 bg-zinc-800 text-zinc-400 text-xs font-sans tracking-[0.2em] uppercase text-center font-medium">
                        Pieza Agotada
                      </div>
                    )}

                    {/* WhatsApp Checkout Directo con Concierge */}
                    <a
                      href={getWhatsAppUrl(getProductWhatsAppMessage(activeProduct))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-[#14121F] border border-[#25D366]/60 text-[#25D366] text-xs font-sans tracking-[0.18em] uppercase font-medium hover:bg-[#25D366]/10 transition-colors flex items-center justify-center gap-2 rounded-sm"
                    >
                      <span>💬 COMPRAR POR WHATSAPP CONCIERGE</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
