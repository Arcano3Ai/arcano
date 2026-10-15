"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  artisanManifesto,
  shopCategories,
  shopProducts,
  ShopProduct,
} from "@/data/shop";
import { getWhatsAppUrl } from "@/config/brandConfig";
import { CreativeProcessGallery } from "@/components/shop/CreativeProcessGallery";
import { useCart } from "@/context/CartContext";

// Formateador exacto al estilo DATEGA®: $X,XXX.00 MXN
function formatPriceDatega(price: number): string {
  return `$${price.toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} MXN`;
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeProduct, setActiveProduct] = useState<ShopProduct | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
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
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeProduct]);

  // Filtrado reactivo de productos
  const filteredProducts = useMemo(() => {
    return shopProducts.filter((product) => {
      // Filtro de categoría
      const matchesCategory =
        selectedCategory === "todos" ||
        (selectedCategory === "doble-perforacion" &&
          (product.isDoublePerforation === true ||
            product.categoryId === "doble-perforacion")) ||
        (selectedCategory === "alta-joyeria-oro" &&
          (product.categoryId === "alta-joyeria-oro" ||
            product.goldSpecifications !== undefined ||
            product.theme === "alta-joyeria-oro")) ||
        product.categoryId === selectedCategory ||
        product.theme === selectedCategory;

      // Filtro de búsqueda rápida
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.categoryName.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleAddToCart = (product: ShopProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addItem(product);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  const getProductWhatsAppMessage = (product: ShopProduct) => {
    if (product.categoryId === "ambar-chiapas") {
      return `Hola ARCANO Concierge, deseo encargar el talismán consagrado "${product.name}" (${formatPriceDatega(product.price)} ${product.shippingNote}). ¿Sigue disponible para envío?`;
    }
    if (product.categoryId === "alta-joyeria-oro" || product.goldSpecifications) {
      return `Hola ARCANO Concierge, deseo encargar la joya ceremonial "${product.name}" (${formatPriceDatega(product.price)} ${product.shippingNote}). ¿Sigue disponible para envío prioritario?`;
    }
    if (product.categoryId === "duos") {
      return `Hola ARCANO Concierge, deseo encargar el set ceremonial "${product.name}" (${formatPriceDatega(product.price)} ${product.shippingNote}). ¿Sigue disponible para envío?`;
    }
    return `Hola ARCANO Concierge, deseo encargar la pieza de río "${product.name}" (${formatPriceDatega(product.price)} ${product.shippingNote}). ¿Sigue disponible para envío?`;
  };

  return (
    <div className="bg-[#FAF8F5] text-[#121212] min-h-screen transition-colors duration-300">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP ANNOUNCEMENT BAR (ESTILO DATEGA® BLACK BAR)
         ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#000000] text-white py-2.5 px-4 text-center border-b border-black">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-6 text-[10px] sm:text-[11px] font-sans tracking-[0.25em] uppercase font-medium">
          <span className="hidden md:inline">✦</span>
          <span>ENTREGA A DOMICILIO SIN COSTO* · TODO MÉXICO</span>
          <span className="opacity-40">|</span>
          <span className="hidden sm:inline">HASTA 12 MESES SIN INTERESES</span>
          <span className="opacity-40 hidden sm:inline">|</span>
          <span className="hidden lg:inline">CADA COMPRA LLEGA EN ESTUCHE ARCANO CON CERTIFICADO</span>
          <span className="hidden md:inline">✦</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. HEADER DE MARCA & NAVEGACIÓN DATEGA®
         ───────────────────────────────────────────────────────────── */}
      <header className="border-b border-[#E8E4DC] bg-white sticky top-0 z-30 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
          
          {/* Logo A R C A N O ® */}
          <div className="flex-shrink-0">
            <Link
              href="/tienda"
              className="font-serif tracking-[0.35em] sm:tracking-[0.45em] text-xl sm:text-2xl text-[#121212] uppercase font-light hover:opacity-80 transition-opacity"
            >
              A R C A N O <span className="text-[10px] tracking-normal font-sans align-top">®</span>
            </Link>
          </div>

          {/* Menú de Categorías Rápido Desktop */}
          <nav className="hidden xl:flex items-center gap-7 text-[11px] tracking-[0.2em] uppercase font-sans font-medium text-[#4A4A4A]">
            <button
              onClick={() => { setSelectedCategory("alta-joyeria-oro"); setSearchQuery(""); }}
              className={`hover:text-[#121212] transition-colors pb-1 border-b-2 ${
                selectedCategory === "alta-joyeria-oro" ? "border-[#121212] text-[#121212]" : "border-transparent"
              }`}
            >
              Oro 18K & Gemas
            </button>
            <button
              onClick={() => { setSelectedCategory("ambar-chiapas"); setSearchQuery(""); }}
              className={`hover:text-[#121212] transition-colors pb-1 border-b-2 ${
                selectedCategory === "ambar-chiapas" ? "border-[#121212] text-[#121212]" : "border-transparent"
              }`}
            >
              Ámbar de Chiapas
            </button>
            <button
              onClick={() => { setSelectedCategory("piedras-rio"); setSearchQuery(""); }}
              className={`hover:text-[#121212] transition-colors pb-1 border-b-2 ${
                selectedCategory === "piedras-rio" ? "border-[#121212] text-[#121212]" : "border-transparent"
              }`}
            >
              Piedras de Río
            </button>
            <button
              onClick={() => { setSelectedCategory("doble-perforacion"); setSearchQuery(""); }}
              className={`hover:text-[#121212] transition-colors pb-1 border-b-2 ${
                selectedCategory === "doble-perforacion" ? "border-[#121212] text-[#121212]" : "border-transparent"
              }`}
            >
              Doble Perforación
            </button>
            <button
              onClick={() => { setSelectedCategory("duos"); setSearchQuery(""); }}
              className={`hover:text-[#121212] transition-colors pb-1 border-b-2 ${
                selectedCategory === "duos" ? "border-[#121212] text-[#121212]" : "border-transparent"
              }`}
            >
              Dúos Alquímicos
            </button>
            <button
              onClick={() => { setSelectedCategory("talismanes"); setSearchQuery(""); }}
              className={`hover:text-[#121212] transition-colors pb-1 border-b-2 ${
                selectedCategory === "talismanes" ? "border-[#121212] text-[#121212]" : "border-transparent"
              }`}
            >
              Talismanes
            </button>
            <button
              onClick={() => { setSelectedCategory("todos"); setSearchQuery(""); }}
              className={`hover:text-[#121212] transition-colors pb-1 border-b-2 ${
                selectedCategory === "todos" ? "border-[#121212] text-[#121212]" : "border-transparent"
              }`}
            >
              Ver Todo
            </button>
          </nav>

          {/* Utilidades de Header (Región + Carrito) */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs font-sans">
            <span className="hidden sm:inline-block text-[#666666] tracking-wider text-[11px]">
              México | MXN $
            </span>

            {/* Botón Carrito Ceremonial */}
            <button
              onClick={openCart}
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-[#E8E4DC] hover:border-[#121212] bg-[#FAF8F5] hover:bg-white text-[#121212] transition-all cursor-pointer group shadow-sm"
              aria-label="Abrir carrito ceremonial"
            >
              <span className="text-base group-hover:scale-110 transition-transform">🛍️</span>
              <span className="text-xs font-medium tracking-wider">
                Bolsa ({totalCount})
              </span>
              {totalCount > 0 && (
                <span className="text-[11px] font-semibold text-[#8B6E32] hidden sm:inline">
                  · {formatPriceDatega(subtotal)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          3. HERO EDITORIAL DE ALTA JOYERÍA (ESTILO DATEGA® / MÁGICA)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-[#E8E4DC] bg-[#FAF8F5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          
          {/* Badge superior minimalista */}
          <div className="inline-block border border-[#D5CFBF] bg-white px-4 py-1.5 rounded-full mb-6 shadow-sm">
            <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.25em] text-[#555555] uppercase font-medium">
              ✦ ALTA JOYERÍA CON INTENCIÓN · EDICIÓN LIMITADA ✦
            </span>
          </div>

          {/* Gran Titular Editorial */}
          <h1 className="font-sans font-bold text-4xl sm:text-6xl md:text-7xl text-[#121212] tracking-tight uppercase mb-2">
            PIEZAS QUE SIGNIFICAN
          </h1>
          <p className="font-serif italic font-light text-4xl sm:text-6xl md:text-7xl text-[#121212] mb-6 tracking-normal">
            MUCHO MÁS
          </p>

          {/* Párrafo Editorial de Lujo */}
          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-sans text-[#555555] font-light leading-relaxed mb-10">
            Cuarzos sagrados y minerales seleccionados uno a uno por su pureza cristalina y resonancia armónica. Amuletos conscientes forjados en orfebrería fina con acabados en <strong>Oro 18K</strong> y piedras naturales de río para ser el testimonio silencioso de tu poder interior.
          </p>

          {/* Botones de Acción Editorial */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14">
            <button
              onClick={() => {
                setSelectedCategory("alta-joyeria-oro");
                document.getElementById("catalogo-grid")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-7 py-3.5 bg-[#121212] text-white text-xs font-sans tracking-[0.2em] uppercase font-medium hover:bg-[#2b2b2b] transition-colors shadow-sm cursor-pointer"
            >
              EXPLORAR JOYAS
            </button>
            <button
              onClick={() => {
                setSelectedCategory("piedras-rio");
                document.getElementById("catalogo-grid")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-7 py-3.5 bg-white border border-[#121212] text-[#121212] text-xs font-sans tracking-[0.2em] uppercase font-medium hover:bg-[#f3efe6] transition-colors shadow-sm cursor-pointer"
            >
              PIEDRAS DE RÍO
            </button>
            <button
              onClick={() => {
                setSelectedCategory("ambar-chiapas");
                document.getElementById("catalogo-grid")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-7 py-3.5 bg-amber-50 border border-amber-600/40 text-[#8B6E32] text-xs font-sans tracking-[0.2em] uppercase font-medium hover:bg-amber-100 transition-colors shadow-sm cursor-pointer"
            >
              ÁMBAR DE CHIAPAS
            </button>
            <a
              href={getWhatsAppUrl("Hola ARCANO Concierge, deseo consultar sobre una pieza personalizada de alta joyería o altar ceremonial.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 bg-white border border-[#25D366] text-[#128C7E] text-xs font-sans tracking-[0.15em] uppercase font-medium hover:bg-[#F0FAF4] transition-colors shadow-sm flex items-center gap-2"
            >
              <span>💬 WHATSAPP CONCIERGE</span>
            </a>
          </div>

          {/* Enlace sutil para visitantes móviles que buscan lecturas u oráculo */}
          <div className="mt-4 mb-2 text-center sm:hidden">
            <Link
              href="/?view=full"
              className="inline-flex items-center gap-1.5 text-[10px] font-sans tracking-[0.2em] uppercase text-[#666666] hover:text-[#121212] transition-colors py-1 border-b border-[#D5CFBF]"
            >
              <span>✦ ¿Deseas consultar el Oráculo o Lecturas? Ver Santuario</span>
              <span>→</span>
            </Link>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              4. BARRA DE 4 PILARES DE VALOR (ESTILO DATEGA® / MÁGICA)
             ───────────────────────────────────────────────────────────── */}
          <div className="max-w-4xl mx-auto bg-white border border-[#E8E4DC] p-6 sm:p-8 rounded-sm shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="border-r-0 md:border-r border-[#E8E4DC] last:border-r-0 pb-4 md:pb-0">
              <span className="block font-sans font-bold text-lg sm:text-xl text-[#121212] mb-1">
                100%
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.15em] text-[#666666] uppercase block">
                Gemas Grado AAA+
              </span>
            </div>
            <div className="border-r-0 md:border-r border-[#E8E4DC] last:border-r-0 pb-4 md:pb-0">
              <span className="block font-sans font-bold text-lg sm:text-xl text-[#121212] mb-1">
                ORO 18K
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.15em] text-[#666666] uppercase block">
                Acabados Nobles
              </span>
            </div>
            <div className="border-r-0 md:border-r border-[#E8E4DC] last:border-r-0">
              <span className="block font-sans font-bold text-lg sm:text-xl text-[#121212] mb-1">
                ÚNICAS
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.15em] text-[#666666] uppercase block">
                Piezas Consagradas
              </span>
            </div>
            <div>
              <span className="block font-sans font-bold text-lg sm:text-xl text-[#121212] mb-1">
                GRATIS*
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.15em] text-[#666666] uppercase block">
                Envío Todo México
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. SECCIÓN "¿QUÉ ESTÁS BUSCANDO?" (ESTILO DATEGA® CATEGORIES)
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-b border-[#E8E4DC]">
        <div className="mb-10 text-left">
          <h2 className="font-sans font-normal text-2xl sm:text-3xl text-[#121212] tracking-tight">
            ¿Qué estás buscando?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Card 1: Alta Joyería Oro 18K */}
          <div
            onClick={() => {
              setSelectedCategory("alta-joyeria-oro");
              document.getElementById("catalogo-grid")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative aspect-[3/4] overflow-hidden bg-white border border-[#E8E4DC] cursor-pointer shadow-sm"
          >
            <Image
              src="/images/shop/pulseras_arcanos/pulsera_01.jpeg"
              alt="Alta Joyería Sagrada en Oro 18K"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white text-left">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#dfb76c] block mb-1">
                Colección Áurea
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-light mb-2">
                Alta Joyería Oro 18K
              </h3>
              <span className="text-xs font-sans tracking-widest uppercase underline underline-offset-4 group-hover:text-[#dfb76c] transition-colors">
                Descubrir Joyas →
              </span>
            </div>
          </div>

          {/* Card 2: Piedras de Río & Altar */}
          <div
            onClick={() => {
              setSelectedCategory("piedras-rio");
              document.getElementById("catalogo-grid")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative aspect-[3/4] overflow-hidden bg-white border border-[#E8E4DC] cursor-pointer shadow-sm"
          >
            <Image
              src="/images/shop/gold_painted_river_stone_incense_holder.jpg"
              alt="Piedras de Río y Quemadores de Altar"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white text-left">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#dfb76c] block mb-1">
                Altar & Cauce Sagrado
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-light mb-2">
                Piedras de Río de Altar
              </h3>
              <span className="text-xs font-sans tracking-widest uppercase underline underline-offset-4 group-hover:text-[#dfb76c] transition-colors">
                Ver Piezas de Río →
              </span>
            </div>
          </div>

          {/* Card 3: Talismanes & Dúos */}
          <div
            onClick={() => {
              setSelectedCategory("duos");
              document.getElementById("catalogo-grid")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative aspect-[3/4] overflow-hidden bg-white border border-[#E8E4DC] cursor-pointer shadow-sm"
          >
            <Image
              src="/images/shop/cho_ku_rei_pebbles.jpg"
              alt="Dúos Alquímicos y Talismanes de Poder"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white text-left">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#dfb76c] block mb-1">
                Consagración Dual
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-light mb-2">
                Dúos & Talismanes
              </h3>
              <span className="text-xs font-sans tracking-widest uppercase underline underline-offset-4 group-hover:text-[#dfb76c] transition-colors">
                Explorar Sets →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. GALERÍA DEL PROCESO CREATIVO & MANIFIESTO
         ───────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 border-b border-[#E8E4DC]">
        <CreativeProcessGallery />
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. CATÁLOGO PRINCIPAL · GRID DE 4 COLUMNAS (DATEGA® STYLE)
         ───────────────────────────────────────────────────────────── */}
      <section id="catalogo-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Cabecera de Colección y Filtros */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#E8E4DC]">
          <div>
            <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#737373] block mb-1">
              Catálogo de Joyería & Altar
            </span>
            <h2 className="font-sans font-normal text-2xl sm:text-4xl text-[#121212] tracking-tight">
              {selectedCategory === "todos"
                ? "Colección Completa Arcano"
                : shopCategories.find((c) => c.id === selectedCategory)?.name || "Colección Seleccionada"}
            </h2>
          </div>

          {/* Buscador Rápido Minimalista */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por gema, cuarzo, oro..."
              className="w-full bg-white border border-[#D5CFBF] px-4 py-2 text-xs font-sans text-[#121212] placeholder-[#888888] focus:outline-none focus:border-[#121212] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2 text-xs text-[#888888] hover:text-[#121212]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Barra de Filtros / Pills Estilo Datega */}
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
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-sans tracking-wider uppercase transition-all duration-200 flex items-center gap-2 border ${
                    isActive
                      ? "bg-[#121212] text-white border-[#121212] font-medium"
                      : "bg-white text-[#4A4A4A] border-[#E8E4DC] hover:border-[#121212] hover:text-[#121212]"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-[#FAF8F5] text-[#888888]"
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
        <div className="flex items-center justify-between text-xs font-sans text-[#666666] mb-8 pb-3 border-b border-[#E8E4DC]">
          <span>Mostrando {filteredProducts.length} piezas exclusivas</span>
          <span className="hidden sm:inline">Todas las piezas incluyen Estuche y Certificado</span>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            GRID DE PRODUCTOS 4 COLUMNAS (DATEGA® SYSTEM)
           ───────────────────────────────────────────────────────────── */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white border border-[#E8E4DC] p-8">
            <span className="text-3xl block mb-3">🔍</span>
            <h3 className="font-sans text-lg text-[#121212] font-medium mb-1">
              No encontramos piezas con ese criterio
            </h3>
            <p className="text-xs text-[#666666] mb-6">
              Prueba cambiando la búsqueda o restableciendo el filtro de categoría.
            </p>
            <button
              onClick={() => { setSelectedCategory("todos"); setSearchQuery(""); }}
              className="px-6 py-2.5 bg-[#121212] text-white text-xs font-sans tracking-wider uppercase"
            >
              Ver Todo el Catálogo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-20">
            {filteredProducts.map((product) => {
              const isAdded = addedProductId === product.id;

              return (
                <div
                  key={product.id}
                  onClick={() => setActiveProduct(product)}
                  className="group relative flex flex-col justify-between border border-[#E8E4DC] hover:border-[#121212] transition-colors duration-300 bg-white cursor-pointer overflow-hidden shadow-sm hover:shadow-md"
                >
                  {/* Contenedor Superior: Imagen Cuadrada 1:1 Datega */}
                  <div className="relative aspect-square w-full overflow-hidden bg-white">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                        !product.inStock ? "grayscale-[30%] opacity-90" : ""
                      }`}
                    />

                    {/* Badges Estilo Datega */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
                      {product.goldSpecifications && (
                        <span className="px-2 py-0.5 bg-[#121212] text-white text-[9px] uppercase tracking-wider font-sans font-medium">
                          ORO 18K
                        </span>
                      )}
                      {product.isDoublePerforation && (
                        <span className="px-2 py-0.5 bg-[#B8860B] text-white text-[9px] uppercase tracking-wider font-sans font-medium">
                          2 ORIFICIOS
                        </span>
                      )}
                      {product.badge && !product.goldSpecifications && (
                        <span className="px-2 py-0.5 bg-white/95 text-[#121212] border border-[#E8E4DC] text-[9px] uppercase tracking-wider font-sans font-medium">
                          {product.badge}
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
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="w-full py-2 bg-white text-[#121212] text-[10px] font-sans font-medium uppercase tracking-[0.15em] text-center shadow-sm">
                        Ver Ficha de Joya ✦
                      </span>
                    </div>
                  </div>

                  {/* Contenedor Inferior de Información: Fondo Crema / Marfil Datega */}
                  <div className="bg-[#FAF8F5] p-3.5 sm:p-4 border-t border-[#EAE6DF] flex flex-col flex-1 justify-between text-left">
                    <div>
                      {/* Categoría / Subtítulo fino */}
                      <span className="text-[10px] font-sans tracking-[0.15em] uppercase text-[#737373] block mb-1">
                        {product.categoryName}
                      </span>

                      {/* Nombre del Producto */}
                      <h3 className="font-sans text-xs sm:text-sm font-normal text-[#121212] tracking-wide line-clamp-2 uppercase group-hover:text-[#B8860B] transition-colors mb-2">
                        {product.name}
                      </h3>
                    </div>

                    {/* Precio y Botón de Acción Rápida */}
                    <div className="pt-2 border-t border-[#EAE6DF]/60 flex items-center justify-between mt-auto">
                      <div>
                        <span className="font-sans text-xs sm:text-sm font-medium text-[#121212] tracking-wider block">
                          {formatPriceDatega(product.price)}
                        </span>
                      </div>

                      {/* Botón Agregar a la Bolsa o Solicitar Similar */}
                      {product.inStock ? (
                        <button
                          onClick={(e) => handleAddToCart(product, e)}
                          className={`px-3 py-1.5 text-[10px] font-sans tracking-wider uppercase transition-all flex items-center gap-1 cursor-pointer ${
                            isAdded
                              ? "bg-[#27AE60] text-white font-bold"
                              : "bg-[#121212] text-white hover:bg-[#333333]"
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
            8. BANNER DE CONTACTO CONCIERGE & PIEZAS A MEDIDA
           ───────────────────────────────────────────────────────────── */}
        <div className="border border-[#E8E4DC] bg-white p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-sm">
          <span className="text-2xl block mb-2">⚜️</span>
          <h3 className="font-sans text-xl sm:text-2xl text-[#121212] font-normal tracking-wide mb-3">
            ¿Deseas una pieza personalizada o consultar una joya vendida?
          </h3>
          <p className="text-xs sm:text-sm text-[#666666] font-sans leading-relaxed mb-6 max-w-xl mx-auto">
            Nuestros orfebres forjan piezas rituales por encargo con minerales selectos de grado AAA, acabados en Oro 18K y piedras de río naturales consagradas.
          </p>
          <a
            href={getWhatsAppUrl("Hola ARCANO Concierge, deseo solicitar una cotización para una pieza personalizada de alta joyería ceremonial.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#121212] text-white text-xs font-sans tracking-[0.2em] uppercase font-medium hover:bg-[#333333] transition-colors"
          >
            <span>CONTACTAR CONCIERGE ARCANO</span>
            <span>→</span>
          </a>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          9. MODAL DE FICHA TÉCNICA DE PRODUCTO (ESTILO EDITORIAL DATEGA®)
         ───────────────────────────────────────────────────────────── */}
      {activeProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto"
          onClick={() => setActiveProduct(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-[#E8E4DC] shadow-2xl p-6 sm:p-10 my-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cerrar */}
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8E4DC] flex items-center justify-center text-[#121212] hover:bg-[#121212] hover:text-white transition-all text-base cursor-pointer"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Columna Izquierda: Imagen Cuadrada Principal */}
              <div className="relative aspect-square w-full bg-[#FAF8F5] border border-[#E8E4DC] overflow-hidden">
                <Image
                  src={activeProduct.imageUrl}
                  alt={activeProduct.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                />

                {/* Badges en Modal */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                  {activeProduct.goldSpecifications && (
                    <span className="px-2.5 py-1 bg-[#121212] text-white text-[10px] uppercase tracking-wider font-sans font-medium">
                      ORO 18K & GEMAS AAA
                    </span>
                  )}
                  {activeProduct.isDoublePerforation && (
                    <span className="px-2.5 py-1 bg-[#B8860B] text-white text-[10px] uppercase tracking-wider font-sans font-medium">
                      DOBLE PERFORACIÓN
                    </span>
                  )}
                </div>

                {!activeProduct.inStock && (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-[#C0392B] text-white text-[10px] uppercase tracking-widest font-sans font-bold">
                    PIEZA VENDIDA
                  </div>
                )}
              </div>

              {/* Columna Derecha: Detalles de Alta Joyería */}
              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#737373] block mb-1">
                    {activeProduct.categoryName}
                  </span>
                  <h2 className="font-sans font-normal text-xl sm:text-2xl text-[#121212] tracking-wide uppercase mb-3">
                    {activeProduct.name}
                  </h2>

                  {/* Precio */}
                  <div className="mb-6 pb-4 border-b border-[#E8E4DC]">
                    <span className="font-sans text-xl sm:text-2xl font-semibold text-[#121212] tracking-wider">
                      {formatPriceDatega(activeProduct.price)}
                    </span>
                    <span className="text-xs text-[#737373] block mt-1 font-sans">
                      {activeProduct.shippingNote} · Entrega protegida a todo México
                    </span>
                  </div>

                  {/* Descripción & Tagline */}
                  <p className="text-xs sm:text-sm font-sans text-[#4A4A4A] leading-relaxed mb-4">
                    {activeProduct.description}
                  </p>

                  {/* Uso Ritual */}
                  {activeProduct.ritualUse && (
                    <div className="mb-6 p-3.5 bg-[#FAF8F5] border border-[#E8E4DC] text-xs font-sans text-[#555555]">
                      <span className="font-semibold text-[#121212] block mb-1 uppercase tracking-wider text-[10px]">
                        ✦ Propósito & Consagración:
                      </span>
                      {activeProduct.ritualUse}
                    </div>
                  )}

                  {/* Especificaciones Técnicas */}
                  {activeProduct.goldSpecifications && (
                    <div className="mb-6 space-y-2 text-xs font-sans border-t border-[#E8E4DC] pt-4">
                      <div className="flex justify-between text-[#666666]">
                        <span>Metal Noble:</span>
                        <span className="text-[#121212] font-medium">{activeProduct.goldSpecifications.metal}</span>
                      </div>
                      <div className="flex justify-between text-[#666666]">
                        <span>Gemas Minerales:</span>
                        <span className="text-[#121212] font-medium">{activeProduct.goldSpecifications.gemstones}</span>
                      </div>
                      <div className="flex justify-between text-[#666666]">
                        <span>Estuche:</span>
                        <span className="text-[#121212] font-medium">Estuche rígido negro con terciopelo</span>
                      </div>
                      <div className="flex justify-between text-[#666666]">
                        <span>Certificado:</span>
                        <span className="text-[#121212] font-medium">Pureza Mineralógica ARCANO</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Botones de Compra en Modal */}
                <div className="pt-6 border-t border-[#E8E4DC] flex flex-col gap-3">
                  {activeProduct.inStock ? (
                    <>
                      <button
                        onClick={() => {
                          addItem(activeProduct);
                          setActiveProduct(null);
                          openCart();
                        }}
                        className="w-full py-3.5 bg-[#121212] text-white text-xs font-sans tracking-[0.2em] uppercase font-medium hover:bg-[#333333] transition-colors cursor-pointer text-center"
                      >
                        AGREGAR A LA BOLSA · {formatPriceDatega(activeProduct.price)}
                      </button>
                      <a
                        href={getWhatsAppUrl(getProductWhatsAppMessage(activeProduct))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 bg-white border border-[#121212] text-[#121212] text-xs font-sans tracking-[0.15em] uppercase font-medium hover:bg-[#FAF8F5] transition-colors text-center"
                      >
                        CONSULTAR CON CONCIERGE WHATSAPP ↗
                      </a>
                    </>
                  ) : (
                    <a
                      href={getWhatsAppUrl(`Hola ARCANO Concierge, vi que la pieza única "${activeProduct.name}" está VENDIDA. ¿Tienen alguna pieza similar disponible o en consagración?`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-[#121212] text-white text-xs font-sans tracking-[0.2em] uppercase font-medium hover:bg-[#333333] transition-colors text-center"
                    >
                      SOLICITAR PIEZA SIMILAR POR ENCARGO ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
