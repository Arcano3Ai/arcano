"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { StoreGrandMenu } from "@/components/shop/StoreGrandMenu";
import { BarroNegroParallaxHero } from "@/components/shop/BarroNegroParallaxHero";
import { BARRO_NEGRO_PRODUCTS, ArtisanProduct } from "@/data/artisanCrafts";
import { getWhatsAppUrl } from "@/config/brandConfig";
import { CONCIERGE_ZONES, CONCIERGE_DEFAULT_ZONE } from "@/config/conciergeConfig";

function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-MX", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })} MXN`;
}

function BarroNegroContent() {
  const [activeProduct, setActiveProduct] = useState<ArtisanProduct | null>(null);
  const [selectedDeliveryZone, setSelectedDeliveryZone] = useState<string>(CONCIERGE_DEFAULT_ZONE);
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  // Manejo de tecla Escape y overflow del body
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
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [activeProduct]);

  // URL Concierge WhatsApp personalizada
  const conciergeUrl = useMemo(() => {
    if (!activeProduct) return "";
    const msg = `Hola ARCANO Concierge, deseo adquirir la pieza maestra de Barro Negro: "${activeProduct.name}" (${activeProduct.formattedPrice}) de ${activeProduct.artisanName} en ${activeProduct.community}. Mi zona de entrega en Monterrey es: ${selectedDeliveryZone}. ¿Me podrían orientar con la entrega privada?`;
    return getWhatsAppUrl(msg);
  }, [activeProduct, selectedDeliveryZone]);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#C5A059] selection:text-black pt-20 sm:pt-24">
      
      {/* ─────────────────────────────────────────────────────────────
          1. TOP BAR DISCRETO · CONCIERGE VIP MONTERREY
         ───────────────────────────────────────────────────────────── */}
      <div className="bg-[#050505] border-b border-neutral-900/90 py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-light">
          <span className="hidden sm:inline">ARCANO · ALFARERÍA ANCESTRAL OAXAQUEÑA</span>
          <span className="mx-auto sm:mx-0">
            ✦ PIEZAS ÚNICAS DE SAN BARTOLO COYOTEPEC · CONCIERGE VIP MONTERREY ✦
          </span>
          <a
            href={getWhatsAppUrl("Hola ARCANO Concierge, deseo asesoría sobre las piezas maestras de Barro Negro Oaxaqueño.")}
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
          2. MENÚ PRINCIPAL DE ÁREAS DE LA TIENDA
         ───────────────────────────────────────────────────────────── */}
      <StoreGrandMenu currentCollection="barro-negro" />

      {/* ─────────────────────────────────────────────────────────────
          3. EXPERIENCIA HERO PARALLAX: JARRÓN QUE SE VUELVE NEGRO
         ───────────────────────────────────────────────────────────── */}
      <BarroNegroParallaxHero />

      {/* Barra de Autenticidad & Pureza de San Bartolo Coyotepec */}
      <div className="bg-[#0A0A0A] border-y border-neutral-900 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-4 text-center text-xs text-neutral-300 font-serif">
          <div className="flex items-center gap-2">
            <span className="text-[#C5A059] text-xs">✦</span>
            <span className="tracking-wider">San Bartolo Coyotepec, Valles Centrales de Oaxaca</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[#C5A059] text-xs">✦</span>
            <span className="tracking-wider">Bruñido 100% Manual con Cantos de Cuarzo de Río</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#C5A059] text-xs">✦</span>
            <span className="tracking-wider">Cero Barnices Químicos · Ahumado Subterráneo Puro</span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. CATÁLOGO DE PIEZAS MAESTRAS DE BARRO NEGRO
         ───────────────────────────────────────────────────────────── */}
      <section id="catalogo-barro-negro" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        {/* Encabezado del Catálogo */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C5A059] block">
            COLECCIÓN PRIVADA DE OBRAS FIRMADAS
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-light text-white tracking-wide">
            Esculturas, Jarrones & Alhajeros de Barro Negro
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
            Cada pieza es una joya alfarera única, moldeada a mano y sometida a la alquimia del fuego ahumado. Entregadas en mano en Monterrey bajo servicio Concierge privado con certificado de autenticidad.
          </p>
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {BARRO_NEGRO_PRODUCTS.map((product) => (
            <div
              key={product.id}
              onClick={() => setActiveProduct(product)}
              className="group flex flex-col cursor-pointer select-none text-left bg-[#0A0A0A] border border-neutral-800/80 hover:border-[#C5A059]/60 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.9)] hover:-translate-y-1"
            >
              {/* Fotografía de la Pieza */}
              <div className="relative aspect-square w-full overflow-hidden bg-black">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Badge de colección */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-black/90 border border-neutral-700/80 px-2.5 py-1 rounded text-[9px] font-mono tracking-widest uppercase text-[#C5A059]">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Contenido de la Tarjeta */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                    <span>{product.community.split(",")[0]}</span>
                    <span className="text-[#C5A059]">✦ Única</span>
                  </div>
                  <h3 className="text-sm font-serif font-light text-white group-hover:text-[#C5A059] transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-light line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-900 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Inversión
                    </span>
                    <span className="text-base font-serif text-white font-medium">
                      {product.formattedPrice}
                    </span>
                  </div>
                  <span className="px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 group-hover:border-[#C5A059] text-[10px] font-mono uppercase tracking-widest text-neutral-300 group-hover:text-white transition-colors">
                    Ver Pieza ↗
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. MANIFIESTO ALQUÍMICO: LA HERENCIA DE COYOTEPEC
         ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-neutral-900 bg-gradient-to-b from-black via-[#080808] to-black py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xl text-[#C5A059]">✦</span>
          <h2 className="text-2xl sm:text-3xl font-serif font-light text-white tracking-wide">
            La Alquimia del Fuego sin Oxígeno
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
            A diferencia de la alfarería común cocida a cielo abierto, el barro negro debe su color a una técnica prehispánica perfeccionada en el siglo XX: al alcanzar los 800 °C en el horno de dos bocas, se tapan por completo las chimeneas y entradas de aire con lodo húmedo. La leña humeante, desprovista de oxígeno, satura la arcilla con partículas de carbono, tiñéndola hasta su núcleo de un negro carbón indeleble.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-400 uppercase tracking-widest">
            <span>✦ Sin químicos</span>
            <span>✦ Sin pintura</span>
            <span>✦ Bruñido con cuarzo</span>
            <span>✦ Tierra sagrada</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. MODAL CONCIERGE VIP PARA BARRO NEGRO
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
              
              {/* Fotografía de la Pieza */}
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

              {/* Especificaciones y Cierre Concierge */}
              <div className="space-y-6">
                
                <div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#C5A059] block mb-1 font-mono">
                    ALFARERÍA MAESTRA · {activeProduct.community}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-light tracking-wide text-white mb-1">
                    {activeProduct.name}
                  </h2>
                  <p className="text-xs text-neutral-400 font-serif italic mb-2">
                    Por {activeProduct.artisanName}
                  </p>
                  <p className="text-xl font-normal text-white tracking-wider">
                    {activeProduct.formattedPrice}
                  </p>
                </div>

                {/* Distintivo Concierge VIP Monterrey */}
                <div className="p-3.5 bg-neutral-900/70 border border-[#C5A059]/40 rounded-sm">
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#C5A059] text-sm mt-0.5">🏺</span>
                    <div>
                      <p className="text-xs text-[#C5A059] font-medium tracking-wide">
                        Pieza Única de Colección — Entrega Personal Concierge
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                        Transporte especializado acolchado sin costo en San Pedro Garza García, San Jerónimo, Cumbres y Linda Vista.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Selector de Zona de Entrega */}
                <div>
                  <label htmlFor="delivery-zone-select" className="block text-[11px] tracking-[0.2em] uppercase text-neutral-400 mb-2 font-medium">
                    Zona de Entrega en Monterrey:
                  </label>
                  <select
                    id="delivery-zone-select"
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

                {/* Especificaciones Técnicas */}
                <div className="space-y-2 border-t border-b border-neutral-800/80 py-4 text-xs text-neutral-300 font-light">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Dimensiones:</span>
                    <span className="text-white">{activeProduct.dimensions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Materiales:</span>
                    <span className="text-white">{activeProduct.materials}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Técnica:</span>
                    <span className="text-white text-right max-w-xs">{activeProduct.technique}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Consagración:</span>
                    <span className="text-white text-right max-w-xs">{activeProduct.consecrationDetails}</span>
                  </div>
                </div>

                {/* Historia Alquímica */}
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {activeProduct.story}
                </p>

                {/* Botón WhatsApp Concierge */}
                <a
                  href={conciergeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 bg-[#C5A059] hover:bg-[#d8b368] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-sm transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg cursor-pointer hover:shadow-[0_0_20px_rgba(197,160,89,0.4)]"
                >
                  <span>Adquirir Pieza vía WhatsApp Concierge</span>
                  <span className="text-sm">↗</span>
                </a>

                <p className="text-[10px] text-center text-neutral-400 font-mono tracking-wider">
                  Pieza frágil protegida con embalaje de alta seguridad para entrega en mano
                </p>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          7. FOOTER MINIMALISTA ARCANO
         ───────────────────────────────────────────────────────────── */}
      <footer className="border-t border-neutral-900 bg-black py-16 px-4 text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          <span className="text-xl text-[#C5A059]">✦</span>
          <p className="text-xs tracking-[0.3em] uppercase text-white font-serif">
            ARCANO · ARTESANÍA ANCESTRAL DE MÉXICO
          </p>
          <p className="text-[10px] tracking-widest text-neutral-400 uppercase max-w-lg mx-auto leading-relaxed">
            Barro Negro Oaxaqueño, Talismanes Minerales, Alebrijes de Copal y Cosmogonía Huichol. Curaduría de obras maestras para recintos ceremoniales y coleccionistas.
          </p>
          <p className="text-[9px] text-neutral-400 pt-4 font-mono">
            © {new Date().getFullYear()} ARCANO SOLUTIONS · MONTERREY, MÉXICO.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default function BarroNegroPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <BarroNegroContent />
    </Suspense>
  );
}
