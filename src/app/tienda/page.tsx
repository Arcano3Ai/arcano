"use client";

import React, { useState, useEffect } from "react";
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

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [activeProduct, setActiveProduct] = useState<ShopProduct | null>(null);
  const { addItem, openCart, totalCount, subtotal } = useCart();

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

  const filteredProducts = shopProducts.filter((product) => {
    if (selectedCategory === "todos") return true;
    if (selectedCategory === "doble-perforacion") {
      return product.isDoublePerforation === true || product.categoryId === "doble-perforacion";
    }
    if (selectedCategory === "alta-joyeria-oro") {
      return product.categoryId === "alta-joyeria-oro" || product.goldSpecifications !== undefined || product.theme === "alta-joyeria-oro";
    }
    return (
      product.categoryId === selectedCategory ||
      product.theme === selectedCategory
    );
  });

  const getProductWhatsAppMessage = (product: ShopProduct) => {
    if (product.categoryId === "alta-joyeria-oro" || product.goldSpecifications) {
      return `Hola ARCANO, deseo encargar la joya ceremonial "${product.name}" (${product.formattedPrice} ${product.shippingNote}). ¿Sigue disponible para envío?`;
    }
    if (product.categoryId === "duos") {
      return `Hola ARCANO, deseo encargar el set ceremonial "${product.name}" (${product.formattedPrice} ${product.shippingNote}). ¿Sigue disponible para envío?`;
    }
    return `Hola ARCANO, deseo encargar la pieza "${product.name}" (${product.formattedPrice} ${product.shippingNote}). ¿Sigue disponible para envío?`;
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Header & Hero */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-charcoal/60 text-gold text-xs uppercase tracking-[0.25em] mb-4">
          <span>✦</span>
          <span>Boutique Ceremonial & Alta Joyería</span>
          <span>✦</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-parchment font-light tracking-wide mb-4">
          Quemadores de Río & Alta Joyería Sagrada
        </h1>
        <p className="text-parchment-muted text-sm sm:text-base font-sans font-light leading-relaxed mb-8">
          Quemadores de piedra de río recolectados en cauces naturales para tu altar, y piezas de alta joyería ceremonial con herrajes bañados en Oro 18K y gemas minerales de Grado AAA.
        </p>

        {/* Banner Visual Ceremonial */}
        <div className="relative aspect-[16/9] w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-gold/40 shadow-[0_0_40px_rgba(198,160,82,0.2)] mb-8 group">
          <Image
            src="/images/shop/banner-tienda-arcanos.jpg"
            alt="Boutique Ceremonial ARCANO · Piedras de Río, Quemadores e Inciensos"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-2 text-left">
            <div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium block mb-1">
                Altar Místico · Colección Viva
              </span>
              <h3 className="font-serif text-base sm:text-xl text-parchment font-light">
                Piedras de Río & Alta Joyería en Oro 18K
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-obsidian/85 border border-gold/40 text-[11px] font-sans text-parchment-muted backdrop-blur-md">
                ⚜️ Herrajes Oro 18K
              </span>
              <span className="px-3 py-1 rounded-full bg-obsidian/85 border border-gold/40 text-[11px] font-sans text-parchment-muted backdrop-blur-md">
                💎 Gemas Grado AAA
              </span>
            </div>
          </div>
        </div>

        {/* Barra de Garantía de Alta Joyería y Metales Nobles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="p-3 rounded-lg border border-gold/30 bg-charcoal/70 backdrop-blur-sm text-center flex flex-col items-center justify-center gap-1 shadow-sm">
            <span className="text-gold text-lg">⚜️</span>
            <span className="text-xs font-serif text-parchment tracking-wide">Herrajes en Oro 18K</span>
            <span className="text-[10px] text-parchment-muted/80 font-sans">Acabado áureo de alta micra</span>
          </div>
          <div className="p-3 rounded-lg border border-gold/30 bg-charcoal/70 backdrop-blur-sm text-center flex flex-col items-center justify-center gap-1 shadow-sm">
            <span className="text-gold text-lg">💎</span>
            <span className="text-xs font-serif text-parchment tracking-wide">Gemas Grado AAA</span>
            <span className="text-[10px] text-parchment-muted/80 font-sans">Minerales puros sin tintes</span>
          </div>
          <div className="p-3 rounded-lg border border-gold/30 bg-charcoal/70 backdrop-blur-sm text-center flex flex-col items-center justify-center gap-1 shadow-sm">
            <span className="text-gold text-lg">📜</span>
            <span className="text-xs font-serif text-parchment tracking-wide">Certificado de Pureza</span>
            <span className="text-[10px] text-parchment-muted/80 font-sans">Autenticidad mineralógica</span>
          </div>
          <div className="p-3 rounded-lg border border-gold/30 bg-charcoal/70 backdrop-blur-sm text-center flex flex-col items-center justify-center gap-1 shadow-sm">
            <span className="text-gold text-lg">🎁</span>
            <span className="text-xs font-serif text-parchment tracking-wide">Estuche de Colección</span>
            <span className="text-[10px] text-parchment-muted/80 font-sans">Caja rígida con terciopelo y lacre</span>
          </div>
        </div>
      </div>

      {/* 2. Manifiesto Artesanal (Aviso de Unicidad) */}
      <div className="relative mb-14 rounded-lg border border-gold/30 bg-gradient-to-br from-charcoal/80 via-obsidian/90 to-charcoal/80 p-6 sm:p-8 shadow-[0_0_35px_rgba(198,160,82,0.12)] overflow-hidden">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-gold text-xl">ᛟ</span>
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium">
              {artisanManifesto.eyebrow}
            </span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl text-parchment font-light mb-3">
            «{artisanManifesto.title}»
          </h2>
          <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed mb-6 max-w-4xl">
            {artisanManifesto.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gold/15">
            {artisanManifesto.highlights.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <span className="text-xs font-serif text-gold font-normal tracking-wide">
                  ✦ {item.title}
                </span>
                <span className="text-[11px] sm:text-xs text-parchment-muted/80 font-sans font-light leading-snug">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2.1 Miniaturas y Visor del Proceso Creativo */}
      <CreativeProcessGallery />

      {/* 3. Filtros de Colección y Tema */}
      <div className="w-full overflow-x-auto pb-4 pt-1 mb-10 scrollbar-none touch-pan-x">
        <div className="flex items-center gap-2 sm:gap-3 whitespace-nowrap min-w-max px-2 sm:justify-center sm:flex-wrap">
          {shopCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = shopProducts.filter((p) => {
              if (cat.id === "todos") return true;
              if (cat.id === "doble-perforacion") return p.isDoublePerforation === true || p.categoryId === "doble-perforacion";
              if (cat.id === "alta-joyeria-oro") return p.categoryId === "alta-joyeria-oro" || p.goldSpecifications !== undefined || p.theme === "alta-joyeria-oro";
              return p.categoryId === cat.id || p.theme === cat.id;
            }).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                data-category={cat.id}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-sans tracking-wider transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? "bg-gold text-obsidian font-medium shadow-[0_0_15px_rgba(198,160,82,0.35)] border border-gold"
                    : "bg-charcoal/50 text-parchment-muted border border-gold/20 hover:border-gold/50 hover:text-parchment"
                }`}
              >
                <span>{cat.symbol}</span>
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-obsidian/30 text-obsidian font-bold" : "bg-gold/10 text-gold"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Banner Exclusivo: Alta Joyería & Oro 18K */}
      {selectedCategory === "alta-joyeria-oro" && (
        <div className="mb-10 rounded-xl border border-gold/50 bg-gradient-to-r from-obsidian via-charcoal/90 to-obsidian p-6 sm:p-8 text-center shadow-[0_0_40px_rgba(198,160,82,0.2)] relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold/40 bg-gold/10 text-gold text-[10px] uppercase tracking-[0.25em] mb-3">
            <span>⚜️</span>
            <span>Edición Magna · Oro 18K & Gemas Grado AAA</span>
            <span>⚜️</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-parchment font-light mb-3">
            Alta Joyería Sagrada & Talismanes de Poder
          </h2>
          <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light max-w-3xl mx-auto leading-relaxed">
            Piezas consagradas donde la fuerza milenaria de los minerales auténticos se funde con herrajes, broches y cuentas facetadas en baño de Oro 18K antialérgico de alta durabilidad. Cada joya se entrega en estuche rígido negro obsidiana con bolsa de terciopelo y Certificado de Pureza Mineralógica.
          </p>
        </div>
      )}

      {/* Conteo de piezas, Carrito Ceremonial y nota de envío */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gold/15 pb-3 mb-8 text-xs font-sans text-parchment-muted gap-3">
        <div className="flex items-center gap-3">
          <span>Mostrando {filteredProducts.length} piezas exclusivas</span>
          {totalCount > 0 && (
            <button
              onClick={openCart}
              className="px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-sans font-medium hover:bg-gold hover:text-obsidian transition-all flex items-center gap-1.5 cursor-pointer shadow-sm group"
            >
              <span className="group-hover:scale-110 transition-transform">🛒</span>
              <span>Carrito ({totalCount})</span>
              <span className="text-[11px] opacity-80">· ${subtotal.toLocaleString("es-MX")}</span>
            </button>
          )}
        </div>
        <span className="text-gold/90 font-medium">Envíos a todo México · Empaque Ceremonial Seguro · Piezas Únicas</span>
      </div>

      {/* 4. Grid de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            data-category={product.categoryId}
            className="group relative flex flex-col rounded-md border border-gold/20 bg-charcoal/40 hover:border-gold/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(198,160,82,0.15)] overflow-hidden"
          >
            {/* Contenedor de Imagen */}
            <div
              onClick={() => setActiveProduct(product)}
              className="relative aspect-[4/3] w-full overflow-hidden bg-black/40 cursor-pointer"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                  !product.inStock ? "contrast-90 brightness-95" : ""
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Letrero Rojo de VENDIDO */}
              {!product.inStock && (
                <div className="absolute top-3 right-3 z-20 px-3 py-1 rounded bg-red-600/95 border border-red-400/80 text-white text-[11px] sm:text-xs font-sans font-extrabold tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(239,68,68,0.75)] flex items-center gap-1.5 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>VENDIDO</span>
                </div>
              )}

              {/* Badges superiores izquierdos */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
                {product.goldSpecifications && (
                  <span className="px-2.5 py-0.5 rounded bg-gradient-to-r from-gold/95 via-gold-light to-gold text-obsidian text-[10px] uppercase tracking-wider font-sans font-bold shadow-md flex items-center gap-1">
                    <span>⚜️</span>
                    <span>Oro 18K & Gemas AAA</span>
                  </span>
                )}
                {product.isDoublePerforation && (
                  <span className="px-2.5 py-0.5 rounded bg-gold/90 text-obsidian text-[10px] uppercase tracking-wider font-sans font-bold shadow-md">
                    ⚡ Doble Perforación
                  </span>
                )}
                {product.badge && !product.goldSpecifications && (
                  <span className="px-2.5 py-0.5 rounded bg-obsidian/85 backdrop-blur-sm border border-gold/40 text-[10px] uppercase tracking-widest text-gold font-sans font-medium">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Quick View Hover Prompt */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                <span className={`px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg text-xs font-sans tracking-wider ${
                  !product.inStock
                    ? "bg-obsidian/95 border border-red-500/80 text-red-200 font-medium"
                    : "bg-obsidian/90 border border-gold/60 text-parchment"
                }`}>
                  {!product.inStock ? "Pieza Vendida · Ver Ficha ✦" : "Ver Detalles ✦"}
                </span>
              </div>
            </div>

            {/* Contenido de la Tarjeta */}
            <div className="flex flex-col flex-1 p-5">
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold/80 font-sans mb-1">
                {product.categoryName}
              </span>
              <h3
                onClick={() => setActiveProduct(product)}
                className="font-serif text-lg text-parchment font-light hover:text-gold transition-colors cursor-pointer mb-2 line-clamp-2"
              >
                {product.name}
              </h3>
              <p className="text-xs text-parchment-muted font-sans font-light line-clamp-2 leading-relaxed mb-4 flex-1">
                {product.tagline}
              </p>

              {/* Precio y Envíos */}
              <div className="pt-3 border-t border-gold/10 mb-4 flex items-baseline justify-between">
                <div>
                  <span className="font-serif text-xl text-gold font-medium tracking-wide">
                    {product.formattedPrice}
                  </span>
                  <span className="text-[10px] text-parchment-muted/80 font-sans ml-1.5 uppercase tracking-wider">
                    {product.shippingNote}
                  </span>
                </div>
                {!product.inStock ? (
                  <span className="text-[10px] text-red-400 font-sans font-semibold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    Consagrada
                  </span>
                ) : (
                  <span className="text-[10px] text-parchment-muted/60 font-sans">
                    {product.isDoublePerforation ? "2 Orificios" : "Pieza Única"}
                  </span>
                )}
              </div>

              {/* Botones de Acción */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveProduct(product)}
                  className="w-full py-2.5 px-3 rounded text-[11px] uppercase tracking-wider font-sans border border-gold/30 hover:border-gold text-parchment hover:text-gold transition-colors bg-charcoal/60 cursor-pointer"
                >
                  Detalles
                </button>
                {!product.inStock ? (
                  <a
                    href={getWhatsAppUrl(`Hola ARCANO, vi que la pieza única "${product.name}" está VENDIDA. ¿Tienen alguna pieza similar disponible o en consagración?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded text-[10px] sm:text-[11px] uppercase tracking-wider font-sans font-medium text-parchment-muted bg-charcoal/80 hover:bg-charcoal hover:text-gold border border-gold/30 hover:border-gold/60 transition-all flex items-center justify-center gap-1 text-center"
                  >
                    <span>Similar</span>
                    <span>↗</span>
                  </a>
                ) : (
                  <button
                    onClick={() => addItem(product)}
                    className="w-full py-2.5 px-3 rounded text-[11px] uppercase tracking-wider font-sans font-medium text-obsidian bg-gold hover:bg-gold-light transition-all shadow-[0_0_12px_rgba(198,160,82,0.25)] flex items-center justify-center gap-1.5 text-center cursor-pointer group"
                    title="Agregar al carrito ceremonial"
                  >
                    <span>+ Carrito</span>
                    <span className="group-hover:scale-110 transition-transform">🛒</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Banner de Confianza y Atención */}
      <div className="rounded-lg border border-gold/20 bg-charcoal/30 p-8 text-center max-w-2xl mx-auto mb-16">
        <span className="text-gold text-2xl block mb-2">⚖</span>
        <h3 className="font-serif text-xl text-parchment font-light mb-2">
          ¿Deseas una pieza personalizada o consultar existencias?
        </h3>
        <p className="text-xs text-parchment-muted font-sans font-light leading-relaxed mb-6">
          Si buscas una piedra de río con doble perforación, un símbolo Reiki específico, o un kit ceremonial a medida para ti o para obsequiar, escríbenos directamente.
        </p>
        <a
          href={getWhatsAppUrl("Hola ARCANO, deseo consultar sobre una pieza de río o pedido especial de la boutique ceremonial.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded text-xs uppercase tracking-[0.2em] font-sans font-medium text-obsidian bg-gold hover:bg-gold-light transition-all shadow-[0_0_20px_rgba(198,160,82,0.3)]"
        >
          <span>Escribir por WhatsApp</span>
          <span>✦</span>
        </a>
      </div>

      {/* 6. Modal de Detalle de Producto (Diseño Apaisado de 2 Columnas · Ergonómico y Proporcionado) */}
      {activeProduct && (
        <div
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 md:p-8 pt-20 sm:pt-20 md:pt-24 pb-8 bg-obsidian/90 backdrop-blur-md overflow-y-auto"
          onClick={() => setActiveProduct(null)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[82vh] md:max-h-[80vh] overflow-y-auto rounded-2xl border border-gold/50 bg-charcoal p-5 sm:p-7 md:p-8 shadow-[0_15px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(198,160,82,0.25)] my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cerrar (X Amplia, Destacada y Ergonómica) */}
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-obsidian/95 border-2 border-gold/70 flex items-center justify-center text-gold hover:bg-gold hover:text-obsidian hover:scale-110 shadow-[0_4px_25px_rgba(0,0,0,0.85)] transition-all text-xl font-bold cursor-pointer group"
              aria-label="Cerrar ventana"
              title="Cerrar ficha (Esc)"
            >
              <span className="leading-none select-none group-hover:rotate-90 transition-transform duration-200">✕</span>
            </button>

            {/* Layout en 2 Columnas para Pantallas Medianas y Grandes */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
              
              {/* Columna Izquierda: Imagen y Ficha de Consagración (5 de 12 columnas) */}
              <div className="md:col-span-5 flex flex-col gap-4">
                {/* Imagen Grande */}
                <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-black/60 border border-gold/30 shadow-md">
                  <Image
                    src={activeProduct.imageUrl}
                    alt={activeProduct.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 450px"
                  />
                  {/* Letrero Rojo de VENDIDO en Modal */}
                  {!activeProduct.inStock && (
                    <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded bg-red-600/95 border border-red-400 text-[11px] uppercase tracking-widest text-white font-sans font-extrabold shadow-[0_0_20px_rgba(239,68,68,0.75)] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      <span>VENDIDO</span>
                    </div>
                  )}

                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    {activeProduct.goldSpecifications && (
                      <span className="px-3 py-1 rounded bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian text-[10px] uppercase tracking-wider font-sans font-bold shadow-md flex items-center gap-1">
                        <span>⚜️</span>
                        <span>Oro 18K & Gemas AAA</span>
                      </span>
                    )}
                    {activeProduct.isDoublePerforation && (
                      <span className="px-3 py-1 rounded bg-gold text-obsidian text-[10px] uppercase tracking-wider font-sans font-bold shadow-md">
                        ⚡ Doble Perforación
                      </span>
                    )}
                    {activeProduct.badge && !activeProduct.goldSpecifications && (
                      <span className="px-3 py-1 rounded bg-obsidian/90 border border-gold/50 text-[10px] uppercase tracking-widest text-gold font-sans font-medium">
                        {activeProduct.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Ficha Ritual de Elaboración Artesanal Homologada */}
                <div className="p-4 rounded-lg bg-obsidian/70 border border-gold/20 text-xs text-parchment-muted font-sans font-light leading-relaxed">
                  <div className="flex items-center gap-2 mb-1.5 text-gold font-serif">
                    <span>✦</span>
                    <span className="text-xs uppercase tracking-widest font-sans font-semibold text-gold">
                      {activeProduct.goldSpecifications ? "Alta Joyería & Metales Nobles" : activeProduct.categoryId === "talismanes" ? "Consagración de la Pulsera" : activeProduct.categoryId === "duos" ? "Elaboración del Kit Ceremonial" : "Origen Mineral Fluvial"}
                    </span>
                  </div>
                  <p>
                    {activeProduct.goldSpecifications
                      ? "Diseño consagrado con herrajes bañados en Oro 18K antialérgico y gemas naturales Grado AAA seleccionadas por su pureza geológica. Resguardado en estuche de alta gama con certificado de autenticidad."
                      : activeProduct.categoryId === "talismanes"
                      ? "Montada a mano con minerales seleccionados y cordón de alta resistencia. Purificada con humo de resinas sagradas antes de su entrega para preservar la vibración limpia de cada gema."
                      : activeProduct.categoryId === "duos"
                      ? "Cada canto rodado fue recolectado en cauces naturales de río, perforado y pintado a mano, y consagrado junto al fuego sagrado bajo la luna llena. El kit incluye Palo Santo sustentable e incienso de alta pureza."
                      : "Pieza única de río recolectada a mano, perforada artesanalmente y consagrada ritualmente junto al fuego sagrado y la luna llena. Cada veta y textura es irrepetible."}
                  </p>
                </div>
              </div>

              {/* Columna Derecha: Título, Precios, Opciones y Ritual (7 de 12 columnas) */}
              <div className="md:col-span-7 flex flex-col">
                {/* Aviso de Pieza Vendida en Modal */}
                {!activeProduct.inStock && (
                  <div className="mb-4 p-3.5 rounded bg-red-950/40 border border-red-500/40 flex items-start gap-3 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                    <span className="text-red-400 text-lg leading-none">⚡</span>
                    <div className="text-xs text-red-200 font-sans font-light leading-relaxed">
                      <strong className="font-semibold text-white block mb-0.5">Pieza Única Vendida</strong>
                      Esta piedra sagrada de río ya fue consagrada y entregada a su custodio. Si deseas encargar una pieza con un grabado o símbolo semejante, contáctanos directamente.
                    </div>
                  </div>
                )}

                {/* Encabezado */}
                <span className="text-xs uppercase tracking-[0.25em] text-gold/80 font-sans block mb-1">
                  {activeProduct.categoryName}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-parchment font-light mb-2 pr-14 sm:pr-16">
                  {activeProduct.name}
                </h2>

                {/* Precio Principal */}
                <div className="flex items-baseline gap-2 mb-4 pb-3 border-b border-gold/15">
                  <span className="font-serif text-2xl sm:text-3xl text-gold font-medium">
                    {activeProduct.formattedPrice}
                  </span>
                  <span className="text-xs text-parchment-muted font-sans uppercase tracking-wider">
                    {activeProduct.shippingNote}
                  </span>
                  {!activeProduct.inStock && (
                    <span className="ml-auto text-xs text-red-400 font-sans font-bold uppercase tracking-wider">
                      ● No Disponible
                    </span>
                  )}
                </div>

                {/* Especificaciones de Oro 18K & Gemas Grado AAA */}
                {activeProduct.goldSpecifications && (
                  <div className="mb-5 p-4 rounded-xl bg-gradient-to-br from-obsidian via-charcoal to-obsidian border border-gold/45 shadow-[0_0_25px_rgba(198,160,82,0.18)]">
                    <div className="flex items-center gap-2 mb-3 text-gold">
                      <span className="text-base">⚜️</span>
                      <h4 className="text-xs uppercase tracking-[0.2em] font-sans font-bold">
                        Especificaciones de Alta Joyería & Metales Nobles
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-sans">
                      <div className="flex flex-col gap-0.5 p-2 rounded bg-black/40 border border-gold/15">
                        <span className="text-[10px] uppercase text-gold font-medium tracking-wider">Metal & Herrajes</span>
                        <span className="text-parchment font-light leading-snug">{activeProduct.goldSpecifications.metal}</span>
                      </div>
                      <div className="flex flex-col gap-0.5 p-2 rounded bg-black/40 border border-gold/15">
                        <span className="text-[10px] uppercase text-gold font-medium tracking-wider">Calidad Gemológica</span>
                        <span className="text-parchment font-light leading-snug">{activeProduct.goldSpecifications.gemstones}</span>
                      </div>
                      {activeProduct.goldSpecifications.clasp && (
                        <div className="flex flex-col gap-0.5 p-2 rounded bg-black/40 border border-gold/15">
                          <span className="text-[10px] uppercase text-gold font-medium tracking-wider">Montaje & Estructura</span>
                          <span className="text-parchment font-light leading-snug">{activeProduct.goldSpecifications.clasp}</span>
                        </div>
                      )}
                      {activeProduct.goldSpecifications.packaging && (
                        <div className="flex flex-col gap-0.5 p-2 rounded bg-black/40 border border-gold/15">
                          <span className="text-[10px] uppercase text-gold font-medium tracking-wider">Presentación de Lujo</span>
                          <span className="text-parchment font-light leading-snug">{activeProduct.goldSpecifications.packaging}</span>
                        </div>
                      )}
                    </div>
                    {activeProduct.goldSpecifications.certificate && (
                      <div className="mt-3 pt-2.5 border-t border-gold/20 flex items-center gap-2 text-[11px] text-gold/90 font-sans">
                        <span>📜</span>
                        <span className="font-light">{activeProduct.goldSpecifications.certificate}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Selector Ritual de Opciones (Solo Pulsera vs Dúo Alquímico) */}
                {activeProduct.categoryId === "talismanes" && (
                  <div className="mb-5 p-4 rounded-lg bg-gradient-to-br from-obsidian via-charcoal/90 to-obsidian border border-gold/40 shadow-[0_0_20px_rgba(198,160,82,0.15)]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-gold text-sm">✨</span>
                      <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-sans font-semibold">
                        ¿Deseas Solo la Pulsera o el Dúo Alquímico de Altar?
                      </h4>
                    </div>
                    <p className="text-xs text-parchment-muted font-sans font-light leading-relaxed mb-3">
                      Por la noche, reposa tu pulsera en su Canto Rodado Fluvial Sahumador consagrado al fuego y la luna mientras el Palo Santo y el incienso limpian y reactivan el mineral.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          addItem(activeProduct, {
                            optionKey: "pulsera",
                            optionLabel: "Solo Pulsera",
                            price: activeProduct.price,
                          });
                        }}
                        className="py-2.5 px-3 rounded text-center text-[11px] font-sans border border-gold/40 text-parchment hover:border-gold hover:text-gold transition-colors flex flex-col justify-center cursor-pointer group"
                      >
                        <span className="font-semibold group-hover:text-gold flex items-center justify-center gap-1">
                          <span>+ Carrito: Solo Pulsera</span>
                          <span>🛒</span>
                        </span>
                        <span className="text-gold/90 text-xs">{activeProduct.formattedPrice} + Envío</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const duoPair = shopProducts.find((p) => p.id === activeProduct.duoPairId);
                          if (duoPair) {
                            addItem(duoPair, {
                              optionKey: "duo-kit",
                              optionLabel: "Kit Dúo Alquímico de Altar",
                              price: duoPair.price,
                            });
                          } else {
                            addItem(activeProduct, {
                              optionKey: "duo-kit",
                              optionLabel: "Kit Dúo Alquímico de Altar",
                              price: activeProduct.duoPairPrice || 1480,
                            });
                          }
                        }}
                        className="py-2.5 px-3 rounded text-center text-[11px] font-sans bg-gold text-obsidian font-semibold hover:bg-gold-light transition-all shadow-[0_0_12px_rgba(198,160,82,0.3)] flex flex-col justify-center cursor-pointer"
                      >
                        <span className="flex items-center justify-center gap-1">
                          <span>✦ Kit Dúo Alquímico de Altar</span>
                          <span>🛒</span>
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider">
                          MXN ${activeProduct.duoPairPrice || 1480} · Envío Gratis
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {activeProduct.categoryId === "duos" && (
                  <div className="mb-5 p-4 rounded-lg bg-gradient-to-br from-obsidian via-charcoal/90 to-obsidian border border-gold/40 shadow-[0_0_20px_rgba(198,160,82,0.15)]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-gold text-sm">✦</span>
                      <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-sans font-semibold">
                        Consagración del Altar Fluvial & Purificación Ritual
                      </h4>
                    </div>
                    <blockquote className="text-xs italic text-parchment/90 font-serif border-l-2 border-gold/50 pl-3 my-2 leading-relaxed">
                      «Esta pieza no fue moldeada en serie. Nació en las aguas vivas de un cauce fluvial, fue perforada a mano y consagrada junto al fuego sagrado bajo la Luna Llena. Cada noche, regresa tu talismán a su Altar Fluvial para que el mineral descanse, se purifique con el humo sagrado y despierte renovado junto contigo al amanecer.»
                    </blockquote>
                    <div className="flex flex-col sm:flex-row items-center justify-between pt-2.5 border-t border-gold/15 gap-2 text-[11px] font-sans">
                      <span className="text-parchment-muted">
                        ¿Prefieres adquirir únicamente el talismán de muñeca?
                      </span>
                      {activeProduct.braceletPairId && (
                        <button
                          onClick={() => {
                            const bracelet = shopProducts.find(p => p.id === activeProduct.braceletPairId);
                            if (bracelet) setActiveProduct(bracelet);
                          }}
                          className="text-gold hover:underline font-medium"
                        >
                          Ver solo la pulsera individual ↗
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Descripción */}
                <div className="mb-4">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-sans font-medium mb-1.5">
                    Descripción de la Pieza
                  </h4>
                  <p className="text-xs sm:text-sm text-parchment font-sans font-light leading-relaxed">
                    {activeProduct.description}
                  </p>
                </div>

                {/* Uso Ritual */}
                <div className="mb-4 p-3.5 rounded bg-obsidian/60 border border-gold/15">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-sans font-medium mb-1 flex items-center gap-1.5">
                    <span>✦</span>
                    <span>Uso Ritual & Meditación</span>
                  </h4>
                  <p className="text-xs text-parchment-muted font-sans font-light leading-relaxed">
                    {activeProduct.ritualUse}
                  </p>
                </div>

                {/* Detalles Artesanales */}
                <div className="mb-6">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-sans font-medium mb-1.5">
                    Características & Cuidados
                  </h4>
                  <ul className="space-y-1">
                    {activeProduct.details.map((detail, i) => (
                      <li
                        key={i}
                        className="text-xs text-parchment-muted font-sans font-light flex items-start gap-2"
                      >
                        <span className="text-gold text-[10px] mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botones de Acción */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gold/15">
                  {!activeProduct.inStock ? (
                    <a
                      href={getWhatsAppUrl(`Hola ARCANO, me fascinó la pieza única "${activeProduct.name}" que está VENDIDA. ¿Podrían consagrar o preparar una similar para mí?`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-6 rounded text-xs uppercase tracking-[0.2em] font-sans font-medium text-obsidian bg-gold hover:bg-gold-light transition-all shadow-[0_0_20px_rgba(198,160,82,0.3)] flex items-center justify-center gap-2 text-center"
                    >
                      <span>Encargar Pieza Similar por WhatsApp</span>
                      <span>↗</span>
                    </a>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          addItem(activeProduct);
                          setActiveProduct(null);
                        }}
                        className="flex-1 py-3 px-6 rounded text-xs uppercase tracking-[0.2em] font-sans font-semibold text-obsidian bg-gold hover:bg-gold-light transition-all shadow-[0_0_20px_rgba(198,160,82,0.35)] flex items-center justify-center gap-2 text-center cursor-pointer"
                      >
                        <span>+ Agregar al Carrito Ceremonial</span>
                        <span>🛒</span>
                      </button>
                      <a
                        href={getWhatsAppUrl(getProductWhatsAppMessage(activeProduct))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3 px-4 rounded text-xs uppercase tracking-[0.15em] font-sans border border-gold/40 text-parchment hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-1.5 text-center"
                        title="Pedir únicamente esta pieza de forma individual"
                      >
                        <span>Pedir Directo</span>
                        <span>↗</span>
                      </a>
                    </>
                  )}
                  <button
                    onClick={() => setActiveProduct(null)}
                    className="py-3 px-5 rounded text-xs uppercase tracking-[0.2em] font-sans border border-gold/30 text-parchment-muted hover:text-parchment hover:border-gold transition-colors cursor-pointer"
                  >
                    Cerrar Ficha
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
