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

// Formateador estilo Aurum Brothers: $X,XXX.00 MXN
function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} MXN`;
}

// 12 Variedades de Gemas para "Shop by Stone" estilo Aurum Brothers
const AURUM_STONES = [
  { id: "todos", name: "Todas las Gemas", symbol: "✦" },
  { id: "Ámbar", name: "Ámbar de Chiapas", symbol: "🍯" },
  { id: "Obsidiana", name: "Obsidiana Dorada", symbol: "🌌" },
  { id: "Labradorita", name: "Labradorita", symbol: "✨" },
  { id: "Ojo de Tigre", name: "Ojo de Tigre", symbol: "🐯" },
  { id: "Lapislázuli", name: "Lapislázuli", symbol: "🔵" },
  { id: "Citrino", name: "Citrino Solar", symbol: "☀️" },
  { id: "Hematita", name: "Hematita & Pirita", symbol: "🛡️" },
  { id: "Malaquita", name: "Malaquita & Jade", symbol: "🌿" },
  { id: "Amatista", name: "Amatista Sagrada", symbol: "💜" },
  { id: "Howlita", name: "Howlita & Cuarzo", symbol: "⚪" },
  { id: "Jaspe", name: "Jaspe Imperial", symbol: "🔴" },
];

// Colecciones visuales ("LATEST COLLECTIONS" estilo Aurum Brothers)
const FEATURED_COLLECTIONS = [
  {
    id: "ambar-chiapas",
    name: "Ámbar de Chiapas",
    image: "/images/shop/pulseras/pulsera-ambar-chiapas-caricias-maternales.jpg",
    stoneFilter: "Ámbar",
    catFilter: "ambar-chiapas",
  },
  {
    id: "obsidiana-dorada",
    name: "Obsidiana & Lava",
    image: "/images/shop/pulseras_arcanos/pulsera_01.jpeg",
    stoneFilter: "Obsidiana",
    catFilter: "todos",
  },
  {
    id: "oro-18k",
    name: "Oro 18K & Gemas",
    image: "https://quetzam.mx/cdn/shop/products/1_9564c0c5-cb5f-46eb-bc8a-e48219bd084d.jpg?v=1772558204&width=800",
    stoneFilter: "todos",
    catFilter: "alta-joyeria-oro",
  },
  {
    id: "ojo-de-tigre",
    name: "Ojo de Tigre & Halcón",
    image: "/images/shop/pulseras/pulsera-ojo-tigre-verde-perlas-ambar.jpg",
    stoneFilter: "Ojo de Tigre",
    catFilter: "todos",
  },
  {
    id: "labradorita",
    name: "Labradorita Espectral",
    image: "/images/shop/pulseras_arcanos/pulsera_05.jpeg",
    stoneFilter: "Labradorita",
    catFilter: "todos",
  },
  {
    id: "duos-stacks",
    name: "Dúos & Stacks",
    image: "/images/shop/pulseras_arcanos/pulsera_02.jpeg",
    stoneFilter: "todos",
    catFilter: "duos",
  },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [selectedStone, setSelectedStone] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProduct, setActiveProduct] = useState<ShopProduct | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  // Opciones de configuración de brazalete estilo Aurum Brothers
  const [selectedWristSize, setSelectedWristSize] = useState<string>("M");
  const [modalTab, setModalTab] = useState<"detalles" | "mineral" | "ritual">("detalles");
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  const { addItem, openCart, totalCount } = useCart();

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

  // Wishlist toggle
  const toggleWishlist = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
    }).sort((a, b) => {
      // Priorizar brazaletes y talismanes minerales al frente estilo Aurum Brothers
      const isBraceletA =
        a.categoryId === "talismanes" ||
        a.categoryId === "ambar-chiapas" ||
        a.categoryId === "alta-joyeria-oro" ||
        a.categoryId === "duos" ||
        a.id.startsWith("aurum-");
      const isBraceletB =
        b.categoryId === "talismanes" ||
        b.categoryId === "ambar-chiapas" ||
        b.categoryId === "alta-joyeria-oro" ||
        b.categoryId === "duos" ||
        b.id.startsWith("aurum-");

      if (isBraceletA && !isBraceletB) return -1;
      if (!isBraceletA && isBraceletB) return 1;

      // Si ambos son brazaletes, priorizar los destacados
      if (isBraceletA && isBraceletB) {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
      }
      return 0;
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
    const sizeCm =
      selectedWristSize === "S"
        ? "16-17 cm"
        : selectedWristSize === "M"
        ? "18-19 cm"
        : selectedWristSize === "L"
        ? "20-21 cm"
        : "22 cm";
    const sizeNote = ` (Talla Muñeca: ${selectedWristSize} [${sizeCm}])`;
    if (product.categoryId === "ambar-chiapas") {
      return `Hola ARCANO Concierge, deseo ordenar el brazalete "${product.name}"${sizeNote} (${formatPrice(product.price)} ${product.shippingNote}). ¿Sigue disponible para despacho prioritario?`;
    }
    if (product.categoryId === "alta-joyeria-oro" || product.goldSpecifications) {
      return `Hola ARCANO Concierge, deseo ordenar la joya de alta orfebrería "${product.name}"${sizeNote} (${formatPrice(product.price)} ${product.shippingNote}). ¿Tienen disponibilidad inmediata?`;
    }
    return `Hola ARCANO Concierge, deseo ordenar la pieza ritual "${product.name}"${sizeNote} (${formatPrice(product.price)} ${product.shippingNote}).`;
  };

  return (
    <div className="bg-[#000000] text-[#FFFFFF] min-h-screen font-sans selection:bg-[#C5A059]/30 selection:text-[#F3EFE6]">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP ANNOUNCEMENT BAR (ESTILO AURUM BROTHERS)
         ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#0D0D0D] text-neutral-300 py-2.5 px-4 text-center border-b border-neutral-900 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-light">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 sm:gap-6">
          <span>ENVÍO EXPRESS GRATIS SOBRE $1,380 MXN</span>
          <span className="opacity-30">·</span>
          <span>HECHO A MANO A LA MEDIDA DE TU MUÑECA</span>
          <span className="opacity-30 hidden sm:inline">·</span>
          <span className="hidden sm:inline">GEMAS NATURALES GRADO AAA & ÁMBAR DE CHIAPAS</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. HEADER PRINCIPAL · NAVEGACIÓN LIMPIA Y ELEGANTE
         ───────────────────────────────────────────────────────────── */}
      <header className="border-b border-neutral-900 bg-black/95 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo ARCANO estilo Aurum Brothers */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="text-xl sm:text-2xl text-[#C5A059] group-hover:scale-105 transition-transform">
                ✦
              </span>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-2xl tracking-[0.3em] font-light text-white group-hover:text-[#C5A059] transition-colors uppercase">
                  ARCANO
                </span>
                <span className="text-[8px] tracking-[0.35em] text-neutral-400 uppercase font-sans -mt-1 hidden sm:block">
                  HANDMADE FINE JEWELRY
                </span>
              </div>
            </Link>
          </div>

          {/* Navegación Central (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase font-light text-neutral-300">
            <button
              onClick={() => {
                setSelectedCategory("todos");
                setSelectedStone("todos");
                document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Novedades
            </button>
            <button
              onClick={() => {
                setSelectedCategory("talismanes");
                setSelectedStone("todos");
                document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Brazaletes
            </button>
            <button
              onClick={() => {
                setSelectedCategory("ambar-chiapas");
                setSelectedStone("Ámbar");
                document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Ámbar de Chiapas
            </button>
            <button
              onClick={() => {
                setSelectedCategory("alta-joyeria-oro");
                setSelectedStone("todos");
                document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Oro 18K
            </button>
            <button
              onClick={() => {
                setSelectedCategory("duos");
                setSelectedStone("todos");
                document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Stacks & Dúos
            </button>
            <a
              href="#the-art-of-stacking"
              className="text-[#C5A059] hover:brightness-110 transition-colors"
            >
              Stacking Guide
            </a>
          </nav>

          {/* Iconos de Acción Derecha */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* WhatsApp Concierge */}
            <a
              href={getWhatsAppUrl("Hola ARCANO Concierge, deseo asesoría personalizada para elegir un brazalete mineral.")}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-neutral-400 hover:text-[#25D366] transition-colors py-1.5 px-3 border border-neutral-800 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              <span>Concierge</span>
            </a>

            {/* Carrito / Bolsa Aurum */}
            <button
              onClick={openCart}
              className="flex items-center gap-2.5 py-2 px-3.5 sm:px-4 bg-[#111111] hover:bg-[#1a1a1a] border border-neutral-800 rounded-full text-xs font-sans tracking-widest uppercase text-white transition-all cursor-pointer"
              aria-label="Abrir Bolsa de Compra"
            >
              <svg className="w-4 h-4 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Bolsa</span>
              <span className="w-5 h-5 rounded-full bg-[#C5A059] text-black text-[10px] font-bold flex items-center justify-center">
                {totalCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          3. HERO EDITORIAL · EXACTO AL ESTILO AURUM BROTHERS
         ───────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[75vh] min-h-[560px] max-h-[780px] bg-black overflow-hidden flex items-center">
        {/* Imagen de fondo de alta fidelidad estilo Aurum Brothers */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/shop/aurum_hero_wrist.jpg"
            alt="Handcrafted Luxury Beaded Bracelets"
            fill
            priority
            className="object-cover object-center filter brightness-[0.95] contrast-[1.05]"
            sizes="100vw"
          />
          {/* Degradado lateral de viñeta oscura para texto legible sobre la izquierda */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        </div>

        {/* Contenido Editorial del Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <div className="max-w-xl text-left">
            
            {/* Reviews y Estrellas */}
            <div className="flex items-center gap-2 mb-4 text-[#C5A059] text-xs tracking-wider">
              <span className="text-sm">★★★★★</span>
              <span className="text-white text-[11px] font-medium tracking-[0.18em]">
                4.9/5.0 (2,450 RESEÑAS VERIFICADAS)
              </span>
            </div>

            {/* Título Principal Aurum Brothers */}
            <h1 className="text-4xl sm:text-6xl font-light text-white tracking-tight leading-[1.08] mb-3">
              Raw Elements. <br />
              <span className="font-normal text-white">Refined Design.</span>
            </h1>

            {/* Subtítulo */}
            <p className="text-xs sm:text-sm font-sans tracking-[0.25em] uppercase text-[#C5A059] font-medium mb-6">
              PREMIUM NATURAL STONES & SACRED GEMS
            </p>

            {/* 3 Checkmarks de Garantía */}
            <div className="space-y-2.5 mb-8 text-neutral-200 text-xs sm:text-sm font-light">
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full border border-neutral-400 flex items-center justify-center text-[10px] text-[#C5A059]">
                  ✓
                </span>
                <span>Hecho a mano a la medida exacta de tu muñeca</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full border border-neutral-400 flex items-center justify-center text-[10px] text-[#C5A059]">
                  ✓
                </span>
                <span>Gemas auténticas de cantera Grado AAA & Ámbar de Chiapas</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-4 h-4 rounded-full border border-neutral-400 flex items-center justify-center text-[10px] text-[#C5A059]">
                  ✓
                </span>
                <span>Garantía de satisfacción de 30 días & Envío prioritario asegurado</span>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 bg-[#C5A059] text-black font-semibold text-xs tracking-[0.22em] uppercase hover:bg-[#d8b368] transition-all text-center cursor-pointer shadow-lg"
              >
                Explorar Colección
              </button>
              <a
                href="#the-art-of-stacking"
                className="px-8 py-4 bg-transparent border border-neutral-600 text-white font-medium text-xs tracking-[0.22em] uppercase hover:border-[#C5A059] hover:text-[#C5A059] transition-all text-center"
              >
                Guía de Stacking
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. SECCIÓN "LATEST COLLECTIONS" (GALERÍA REDONDEADA AURUM)
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-neutral-900">
        <h2 className="text-xl sm:text-2xl font-light tracking-[0.25em] text-white text-center mb-10 uppercase">
          LATEST COLLECTIONS
        </h2>

        {/* Carousel / Grid de Colecciones */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {FEATURED_COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => {
                setSelectedCategory(col.catFilter);
                setSelectedStone(col.stoneFilter);
                document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative aspect-square bg-[#0D0D0D] rounded-xl overflow-hidden cursor-pointer border border-neutral-800/80 hover:border-[#C5A059]/60 transition-all duration-300 shadow-md"
            >
              <Image
                src={col.image}
                alt={col.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover filter brightness-[0.85] contrast-[1.1] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-2.5 text-center">
                <span className="block text-[11px] font-sans font-medium text-white tracking-wider uppercase group-hover:text-[#C5A059] transition-colors">
                  {col.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. SECCIÓN PRINCIPAL: "TOP PRODUCTS" (ESTILO FLOATING CARDS)
         ───────────────────────────────────────────────────────────── */}
      <section id="catalogo-top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        {/* Título de Sección */}
        <h2 className="text-2xl sm:text-3xl font-light tracking-[0.25em] text-white text-center mb-8 uppercase">
          TOP PRODUCTS
        </h2>

        {/* Barra de Filtros Minimalista por Mineral ("Shop by Stone") */}
        <div className="w-full overflow-x-auto pb-4 mb-8 scrollbar-none">
          <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 whitespace-nowrap min-w-max">
            {AURUM_STONES.map((stone) => {
              const isActive = selectedStone === stone.id;
              return (
                <button
                  key={stone.id}
                  onClick={() => setSelectedStone(stone.id)}
                  className={`px-4 py-2 text-xs font-sans tracking-[0.18em] uppercase transition-all duration-200 cursor-pointer rounded-full ${
                    isActive
                      ? "bg-white text-black font-semibold shadow-md"
                      : "bg-[#111111] text-neutral-400 hover:text-white hover:bg-[#1a1a1a]"
                  }`}
                >
                  <span className="mr-1.5 opacity-70">{stone.symbol}</span>
                  <span>{stone.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtro secundario: Categorías & Barra de búsqueda */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-neutral-900 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
            <button
              onClick={() => { setSelectedCategory("todos"); setSelectedStone("todos"); }}
              className={`px-3 py-1.5 tracking-wider uppercase transition-colors rounded-sm cursor-pointer ${
                selectedCategory === "todos" && selectedStone === "todos"
                  ? "text-[#C5A059] border-b border-[#C5A059] font-medium"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Todos ({shopProducts.length})
            </button>
            <button
              onClick={() => setSelectedCategory("ambar-chiapas")}
              className={`px-3 py-1.5 tracking-wider uppercase transition-colors rounded-sm cursor-pointer ${
                selectedCategory === "ambar-chiapas"
                  ? "text-[#C5A059] border-b border-[#C5A059] font-medium"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Ámbar de Chiapas
            </button>
            <button
              onClick={() => setSelectedCategory("alta-joyeria-oro")}
              className={`px-3 py-1.5 tracking-wider uppercase transition-colors rounded-sm cursor-pointer ${
                selectedCategory === "alta-joyeria-oro"
                  ? "text-[#C5A059] border-b border-[#C5A059] font-medium"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Alta Joyería Oro 18K
            </button>
            <button
              onClick={() => setSelectedCategory("talismanes")}
              className={`px-3 py-1.5 tracking-wider uppercase transition-colors rounded-sm cursor-pointer ${
                selectedCategory === "talismanes"
                  ? "text-[#C5A059] border-b border-[#C5A059] font-medium"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Brazaletes Minerales
            </button>
            <button
              onClick={() => setSelectedCategory("duos")}
              className={`px-3 py-1.5 tracking-wider uppercase transition-colors rounded-sm cursor-pointer ${
                selectedCategory === "duos"
                  ? "text-[#C5A059] border-b border-[#C5A059] font-medium"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              Dúos & Stacks
            </button>
          </div>

          {/* Campo de búsqueda minimalista */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar piedra, mineral..."
              className="w-full bg-[#0D0D0D] border border-neutral-800 px-3.5 py-1.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition-colors rounded-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1.5 text-neutral-500 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            GRID DE PRODUCTOS ESTILO AURUM BROTHERS (BORDERLESS FLOATING CARDS)
           ───────────────────────────────────────────────────────────── */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center bg-[#0A0A0A] border border-neutral-900 p-8 rounded-sm">
            <span className="text-3xl block mb-3 text-neutral-500">🔍</span>
            <h3 className="text-lg text-white font-light mb-2">
              No encontramos piezas con ese criterio
            </h3>
            <p className="text-xs text-neutral-400 mb-6 max-w-md mx-auto">
              Prueba cambiando la gema mineral seleccionada o restablece los filtros del catálogo.
            </p>
            <button
              onClick={() => { setSelectedCategory("todos"); setSelectedStone("todos"); setSearchQuery(""); }}
              className="px-6 py-2.5 bg-[#C5A059] text-black text-xs font-sans tracking-widest uppercase font-semibold hover:bg-[#d8b368]"
            >
              Ver Todo el Catálogo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-7 sm:gap-y-12">
            {filteredProducts.map((product) => {
              const isHovered = hoveredCardId === product.id;
              const isAdded = addedProductId === product.id;
              const isWishlisted = Boolean(wishlist[product.id]);
              const hasSecondaryImg = Boolean(product.secondaryImageUrl && product.secondaryImageUrl !== product.imageUrl);

              return (
                <div
                  key={product.id}
                  onClick={() => setActiveProduct(product)}
                  onMouseEnter={() => setHoveredCardId(product.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className="group flex flex-col cursor-pointer select-none"
                >
                  {/* Contenedor de Imagen de Producto: Fondo Negro de Estudio, Borde Invisible */}
                  <div className="relative aspect-square w-full overflow-hidden bg-[#0A0A0A] rounded-sm">
                    
                    {/* Imagen Primaria */}
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className={`object-cover transition-opacity duration-500 ${
                        hasSecondaryImg && isHovered ? "opacity-0" : "opacity-100"
                      } ${!product.inStock ? "grayscale-[40%] opacity-70" : ""}`}
                    />

                    {/* Imagen Secundaria (Efecto Hover de Muñeca / Detalle) */}
                    {hasSecondaryImg && (
                      <Image
                        src={product.secondaryImageUrl!}
                        alt={`${product.name} lifestyle`}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className={`object-cover transition-opacity duration-500 absolute inset-0 ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    )}

                    {/* Badges Estilo Aurum Brothers (Top-Left Outlined Pills) */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none">
                      {product.goldSpecifications && (
                        <span className="px-2 py-0.5 border border-[#C5A059] text-[#C5A059] text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-sans font-medium bg-black/60 backdrop-blur-sm">
                          ORO 18K
                        </span>
                      )}
                      {product.badge && !product.goldSpecifications && (
                        <span className="px-2 py-0.5 border border-[#C5A059]/70 text-[#C5A059] text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-sans font-medium bg-black/60 backdrop-blur-sm">
                          {product.badge.includes("8mm") ? "8MM AAA" : product.badge.toUpperCase()}
                        </span>
                      )}
                      {product.featured && (
                        <span className="px-2 py-0.5 border border-white/60 text-white text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-sans font-medium bg-black/60 backdrop-blur-sm">
                          LIMITED
                        </span>
                      )}
                    </div>

                    {/* Bookmark / Wishlist Icon (Top-Right) */}
                    <button
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-black/40 hover:bg-black/80 flex items-center justify-center transition-colors text-white"
                      aria-label="Guardar en favoritos"
                    >
                      <svg
                        className={`w-3.5 h-3.5 ${isWishlisted ? "text-[#C5A059] fill-[#C5A059]" : "text-white"}`}
                        fill={isWishlisted ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>

                    {/* Botón "+" en esquina inferior derecha estilo Aurum Brothers */}
                    {product.inStock && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product, undefined, undefined, true);
                        }}
                        className={`absolute bottom-2.5 right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-sans font-bold text-sm transition-all duration-300 rounded-sm cursor-pointer ${
                          isAdded
                            ? "bg-[#27AE60] text-white scale-110"
                            : "bg-[#C5A059] text-black hover:bg-[#d8b368] hover:scale-105"
                        }`}
                        title="Añadir a la bolsa"
                      >
                        {isAdded ? "✓" : "+"}
                      </button>
                    )}

                    {/* Badge de Vendido si está agotado */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10 pointer-events-none">
                        <span className="px-3 py-1 border border-neutral-500 text-neutral-300 text-[10px] uppercase tracking-[0.25em] font-sans font-medium bg-black/80">
                          SOLD OUT
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Información Centrada de la Pieza (Estilo Aurum Brothers) */}
                  <div className="pt-3 text-center flex flex-col items-center">
                    {/* Título en tipografía sans-serif limpia */}
                    <h3 className="text-xs sm:text-sm font-normal text-neutral-200 group-hover:text-[#C5A059] transition-colors line-clamp-1 mb-1">
                      {product.name}
                    </h3>

                    {/* Precio Centrado */}
                    <p className="text-xs sm:text-sm text-neutral-400 font-normal mb-1">
                      {formatPrice(product.price)}
                    </p>

                    {/* Reseñas con estrellas doradas Aurum */}
                    <div className="flex items-center justify-center gap-1 text-[11px] text-[#C5A059]">
                      <span>★★★★★</span>
                      <span className="text-neutral-500 text-[10px]">
                        ({12 + (product.price % 37)})
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. SECCIÓN "THE ART OF STACKING" (ESTILO AURUM BROTHERS)
         ───────────────────────────────────────────────────────────── */}
      <section id="the-art-of-stacking" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-neutral-900 text-center">
        <h2 className="text-2xl sm:text-3xl font-light tracking-[0.25em] text-white uppercase mb-3">
          THE ART OF STACKING
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          Diseñados para lucir con distinción individualmente o en capas junto a tu reloj favorito. Descubre cómo combinar texturas minerales y calibres para elevar tu presencia personal.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Stack 1 */}
          <div
            onClick={() => {
              setSelectedStone("Obsidiana");
              document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group cursor-pointer text-left"
          >
            <div className="relative aspect-[4/5] bg-[#0A0A0A] rounded-sm overflow-hidden mb-4">
              <Image
                src="/images/shop/pulseras_arcanos/pulsera_01.jpeg"
                alt="Stack Escudo Telúrico"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A059] block mb-1">
                  STACK #01 · ESCUDO SAGRADO
                </span>
                <h3 className="text-lg font-light text-white">Obsidiana & Hematita</h3>
              </div>
            </div>
            <p className="text-xs text-neutral-400 font-light leading-relaxed mb-2">
              Protección psíquica, sobriedad y enraizamiento telúrico. Ideal para portar junto a un reloj de acero o carátula negra.
            </p>
            <span className="text-xs text-[#C5A059] tracking-wider uppercase font-medium group-hover:underline">
              Explorar Stack →
            </span>
          </div>

          {/* Stack 2 */}
          <div
            onClick={() => {
              setSelectedStone("Ámbar");
              document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group cursor-pointer text-left"
          >
            <div className="relative aspect-[4/5] bg-[#0A0A0A] rounded-sm overflow-hidden mb-4">
              <Image
                src="/images/shop/pulseras/pulsera-ambar-chiapas-caricias-maternales.jpg"
                alt="Stack Ámbar Solar"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A059] block mb-1">
                  STACK #02 · ORO SOLAR
                </span>
                <h3 className="text-lg font-light text-white">Ámbar Fósil & Ojo de Tigre</h3>
              </div>
            </div>
            <p className="text-xs text-neutral-400 font-light leading-relaxed mb-2">
              Calidez prehistórica de Chiapas, magnetismo personal y abundancia. Acentos solares para proyectar liderazgo.
            </p>
            <span className="text-xs text-[#C5A059] tracking-wider uppercase font-medium group-hover:underline">
              Explorar Stack →
            </span>
          </div>

          {/* Stack 3 */}
          <div
            onClick={() => {
              setSelectedStone("Labradorita");
              document.getElementById("catalogo-top")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group cursor-pointer text-left"
          >
            <div className="relative aspect-[4/5] bg-[#0A0A0A] rounded-sm overflow-hidden mb-4">
              <Image
                src="/images/shop/pulseras_arcanos/pulsera_05.jpeg"
                alt="Stack Visión & Éter"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A059] block mb-1">
                  STACK #03 · VISIÓN & ÉTER
                </span>
                <h3 className="text-lg font-light text-white">Labradorita & Lapislázuli</h3>
              </div>
            </div>
            <p className="text-xs text-neutral-400 font-light leading-relaxed mb-2">
              Destellos espectrales de azul pavo real y pirita dorada. Conexión intuitiva y discernimiento oracular.
            </p>
            <span className="text-xs text-[#C5A059] tracking-wider uppercase font-medium group-hover:underline">
              Explorar Stack →
            </span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. PROCESO CREATIVO & MANIFIESTO ARTESANAL
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-neutral-900">
        <CreativeProcessGallery />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. FOOTER CON SELLOS DE CONFIANZA & MÉTODOS DE PAGO (AURUM)
         ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#0A0A0A] border-t border-neutral-900 text-neutral-400 text-xs py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Columna 1: Brand & Craft */}
            <div>
              <span className="font-serif text-lg tracking-[0.25em] text-white block mb-3 uppercase">
                ARCANO
              </span>
              <p className="text-neutral-400 font-light leading-relaxed mb-4">
                Joyería de alta orfebrería mineral ensamblada a mano con gemas naturales Grado AAA, ámbar fósil de Chiapas y acentos forjados en Oro 18K y Plata .925.
              </p>
              <span className="text-[11px] text-[#C5A059] tracking-wider block uppercase">
                Handmade in Mexico & The Netherlands
              </span>
            </div>

            {/* Columna 2: Soporte & Guías */}
            <div>
              <span className="text-xs font-medium tracking-[0.2em] text-white uppercase block mb-3">
                SOPORTE
              </span>
              <ul className="space-y-2 font-light">
                <li>
                  <a
                    href={getWhatsAppUrl("Hola ARCANO, tengo dudas sobre cómo medir mi muñeca para mi brazalete.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Guía de Tallas de Muñeca
                  </a>
                </li>
                <li>
                  <a
                    href={getWhatsAppUrl("Hola ARCANO Concierge, deseo información sobre envíos y garantías.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Envíos Prioritarios & Devoluciones
                  </a>
                </li>
                <li>
                  <a
                    href={getWhatsAppUrl("Hola ARCANO, deseo cotizar una pieza personalizada a mi medida.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Brazaletes a Medida (Concierge)
                  </a>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-white transition-colors">
                    Contacto Directo
                  </Link>
                </li>
              </ul>
            </div>

            {/* Columna 3: Colecciones */}
            <div>
              <span className="text-xs font-medium tracking-[0.2em] text-white uppercase block mb-3">
                COLECCIONES
              </span>
              <ul className="space-y-2 font-light">
                <li><button onClick={() => { setSelectedCategory("ambar-chiapas"); setSelectedStone("Ámbar"); }} className="hover:text-white text-left">Ámbar de Simojovel, Chiapas</button></li>
                <li><button onClick={() => { setSelectedCategory("talismanes"); setSelectedStone("Obsidiana"); }} className="hover:text-white text-left">Obsidiana Dorada Imperial</button></li>
                <li><button onClick={() => { setSelectedCategory("talismanes"); setSelectedStone("Labradorita"); }} className="hover:text-white text-left">Labradorita Espectral</button></li>
                <li><button onClick={() => { setSelectedCategory("alta-joyeria-oro"); setSelectedStone("todos"); }} className="hover:text-white text-left">Oro 18K & Gemas Sagradas</button></li>
                <li><button onClick={() => { setSelectedCategory("duos"); setSelectedStone("todos"); }} className="hover:text-white text-left">Sets de Dúos Fluviales</button></li>
              </ul>
            </div>

            {/* Columna 4: Newsletter Aurum */}
            <div>
              <span className="text-xs font-medium tracking-[0.2em] text-white uppercase block mb-3">
                STAY IN THE LOOP
              </span>
              <p className="text-neutral-400 font-light leading-relaxed mb-3">
                Nuevas piezas de edición limitada cada mes y acceso prioritario a gemas de cantera.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Tu correo electrónico..."
                  className="bg-[#141414] border border-neutral-800 px-3 py-2 text-xs text-white placeholder-neutral-500 w-full rounded-l-sm focus:outline-none"
                />
                <button
                  onClick={() => alert("¡Gracias por unirte al Círculo Exclusivo ARCANO!")}
                  className="px-4 py-2 bg-[#C5A059] text-black text-xs font-semibold uppercase tracking-wider rounded-r-sm hover:bg-[#d8b368]"
                >
                  OK
                </button>
              </div>
            </div>
          </div>

          {/* Barra Inferior con Métodos de Pago */}
          <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500 font-light">
            <span>© 2026 ARCANO · All Rights Reserved. Luxury Beaded Bracelets.</span>
            <div className="flex items-center gap-3 text-neutral-400 text-xs">
              <span>Visa</span>
              <span>·</span>
              <span>Mastercard</span>
              <span>·</span>
              <span>AMEX</span>
              <span>·</span>
              <span>Apple Pay</span>
              <span>·</span>
              <span>Mercado Pago</span>
              <span>·</span>
              <span>SPEI</span>
              <span>·</span>
              <span>OXXO</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ─────────────────────────────────────────────────────────────
          9. MODAL DE PRODUCTO (ESTILO AURUM BROTHERS SIZING & SPECS)
         ───────────────────────────────────────────────────────────── */}
      {activeProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-fadeIn"
          onClick={() => setActiveProduct(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-neutral-800 p-6 sm:p-10 my-auto text-left rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cerrar */}
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#141414] border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer text-sm"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Columna Izquierda: Imagen y Galería de Ángulos */}
              <div>
                <div className="relative aspect-square w-full bg-[#111111] overflow-hidden rounded-sm">
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
                      <span className="px-2 py-0.5 border border-[#C5A059] bg-black/70 text-[#C5A059] text-[9px] uppercase tracking-widest font-sans font-medium">
                        ORO 18K
                      </span>
                    )}
                    {activeProduct.badge && (
                      <span className="px-2 py-0.5 border border-[#C5A059]/70 bg-black/70 text-[#C5A059] text-[9px] uppercase tracking-widest font-sans font-medium">
                        {activeProduct.badge}
                      </span>
                    )}
                  </div>

                  {!activeProduct.inStock && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-[10px] uppercase tracking-widest font-sans font-medium">
                      SOLD OUT
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
                          className={`relative w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden bg-[#111111] cursor-pointer transition-all ${
                            isSelected
                              ? "border-2 border-[#C5A059] scale-105"
                              : "border border-neutral-800 opacity-60 hover:opacity-100"
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
                  <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A059] block mb-1">
                    {activeProduct.stoneType || activeProduct.categoryName}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-light text-white tracking-wide mb-2">
                    {activeProduct.name}
                  </h2>

                  {/* Reseñas y Estrellas */}
                  <div className="flex items-center gap-2 mb-4 text-[#C5A059] text-xs">
                    <span>★★★★★</span>
                    <span className="text-neutral-400 text-[11px]">4.9 (48 reseñas verificadas)</span>
                  </div>

                  {/* Precio */}
                  <div className="mb-6 pb-4 border-b border-neutral-800">
                    <span className="text-2xl sm:text-3xl font-normal text-white">
                      {formatPrice(activeProduct.price)}
                    </span>
                    <span className="text-xs text-neutral-400 block mt-1 font-light">
                      {activeProduct.shippingNote} · Empaque de Colección & Envío Asegurado
                    </span>
                  </div>

                  {/* Selector de Talla de Muñeca (Aurum Sizing Guide) */}
                  <div className="mb-6 p-4 bg-[#111111] border border-neutral-800 rounded-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-sans uppercase tracking-wider text-neutral-200 font-medium">
                        Talla de Muñeca (Circunferencia):
                      </span>
                      <a
                        href={getWhatsAppUrl("Hola ARCANO, tengo dudas sobre cómo medir mi muñeca para mi brazalete.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] font-sans text-[#C5A059] underline underline-offset-2"
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
                              ? "bg-white text-black border-white font-bold shadow-md"
                              : "bg-[#161616] text-neutral-300 border-neutral-800 hover:border-neutral-600"
                          }`}
                        >
                          <span className="text-xs block font-bold">{t.size}</span>
                          <span className="text-[9px] block opacity-80">{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pestañas de Información (Detalles / Propiedades / Ritual) */}
                  <div className="flex border-b border-neutral-800 mb-4 gap-6 text-xs font-sans uppercase tracking-wider">
                    <button
                      onClick={() => setModalTab("detalles")}
                      className={`pb-2 transition-colors cursor-pointer ${
                        modalTab === "detalles" ? "border-b-2 border-[#C5A059] text-[#C5A059] font-medium" : "text-neutral-500 hover:text-white"
                      }`}
                    >
                      Detalles
                    </button>
                    <button
                      onClick={() => setModalTab("mineral")}
                      className={`pb-2 transition-colors cursor-pointer ${
                        modalTab === "mineral" ? "border-b-2 border-[#C5A059] text-[#C5A059] font-medium" : "text-neutral-500 hover:text-white"
                      }`}
                    >
                      Propiedades
                    </button>
                    <button
                      onClick={() => setModalTab("ritual")}
                      className={`pb-2 transition-colors cursor-pointer ${
                        modalTab === "ritual" ? "border-b-2 border-[#C5A059] text-[#C5A059] font-medium" : "text-neutral-500 hover:text-white"
                      }`}
                    >
                      Consagración
                    </button>
                  </div>

                  {/* Contenido de Pestaña */}
                  <div className="min-h-[100px] text-xs font-light text-neutral-300 leading-relaxed mb-6">
                    {modalTab === "detalles" && (
                      <p>{activeProduct.description}</p>
                    )}
                    {modalTab === "mineral" && (
                      <div className="space-y-2">
                        <p className="text-white font-normal">
                          Gema: {activeProduct.stoneType || "Mineral Natural Grado AAA"}
                        </p>
                        <p>{activeProduct.tagline}</p>
                        <p className="text-[11px] text-[#C5A059]">
                          ✦ Cada esfera presenta variaciones morfológicas naturales que certifican su autenticidad geológica.
                        </p>
                      </div>
                    )}
                    {modalTab === "ritual" && (
                      <div className="p-3 bg-[#111111] border border-neutral-800 rounded-sm">
                        <span className="text-[#C5A059] font-medium block mb-1">
                          ✦ Propósito Energético:
                        </span>
                        <p>{activeProduct.ritualUse || "Anclaje de intención y protección energética diaria."}</p>
                      </div>
                    )}
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
                        className={`w-full py-4 text-xs font-sans tracking-[0.22em] uppercase transition-all duration-300 font-semibold shadow-lg cursor-pointer flex items-center justify-center gap-2 ${
                          addedProductId === activeProduct.id
                            ? "bg-[#27AE60] text-white"
                            : "bg-[#C5A059] text-black hover:bg-[#d8b368]"
                        }`}
                      >
                        <span>{addedProductId === activeProduct.id ? "¡AÑADIDO A TU BOLSA!" : "AÑADIR A LA BOLSA"}</span>
                        <span>·</span>
                        <span>{formatPrice(activeProduct.price)}</span>
                      </button>
                    ) : (
                      <div className="w-full py-3.5 bg-neutral-800 text-neutral-400 text-xs font-sans tracking-[0.2em] uppercase text-center font-medium">
                        Pieza Agotada
                      </div>
                    )}

                    {/* WhatsApp Checkout Directo con Concierge */}
                    <a
                      href={getWhatsAppUrl(getProductWhatsAppMessage(activeProduct))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-[#111111] border border-[#25D366]/40 text-[#25D366] text-xs font-sans tracking-[0.18em] uppercase font-medium hover:bg-[#25D366]/10 transition-colors flex items-center justify-center gap-2 rounded-sm"
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
