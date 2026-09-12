"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { shopCategories, shopProducts, ShopProduct } from "@/data/shop";
import { SectionHeader } from "@/components/SectionHeader";
import { getWhatsAppUrl } from "@/config/brandConfig";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");
  const [selectedProduct, setSelectedProduct] = useState<ShopProduct | null>(null);

  const filteredProducts =
    selectedCategory === "todas"
      ? shopProducts
      : shopProducts.filter((p) => p.categoryId === selectedCategory);

  const getProductWhatsAppUrl = (product: ShopProduct) => {
    const msg = `Hola ARCANO, me interesa adquirir la siguiente pieza ceremonial de la tienda:\n\n✦ Producto: ${product.name}\n✦ Precio: ${product.formattedPrice}\n✦ Categoría: ${product.categoryName}\n\n¿Tienen disponibilidad y envíos a mi ciudad?`;
    return getWhatsAppUrl(msg);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Encabezado Principal */}
      <SectionHeader
        subtitle="Boutique Esotérica & Altar Sagrado"
        title="Tienda Ceremonial ARCANO"
        description="Piezas consagradas, barajas maestras, sahumerios ancestrales y objetos rituales seleccionados y bendecidos bajo la custodia de los símbolos."
        symbol="✦"
      />

      {/* Grid de las 5 Categorías Oficiales */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 my-12">
        {shopCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`group relative rounded-xl overflow-hidden border p-3 flex flex-col items-center text-center transition-all duration-300 ${
              selectedCategory === cat.id
                ? "border-gold bg-gold/10 shadow-[0_0_20px_rgba(198,160,82,0.3)] scale-102"
                : "border-charcoal-border bg-[#0f0e16]/80 hover:border-gold/50 hover:bg-[#151320]"
            }`}
          >
            <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-3 border border-charcoal-border/60">
              <Image
                src={cat.imageUrl}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 45vw, 20vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-1.5 right-1.5 text-xs text-gold">
                {cat.symbol}
              </span>
            </div>
            <h3 className="font-serif text-xs sm:text-sm text-parchment group-hover:text-gold-light transition-colors font-medium leading-tight">
              {cat.name}
            </h3>
            <span className="text-[10px] text-parchment-dim font-sans mt-1 line-clamp-1">
              {cat.description}
            </span>
          </button>
        ))}
      </div>

      {/* Filtros por Categoría */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button
          onClick={() => setSelectedCategory("todas")}
          className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-sans transition-all ${
            selectedCategory === "todas"
              ? "bg-gold text-obsidian font-medium shadow-[0_0_15px_rgba(198,160,82,0.4)]"
              : "bg-[#14121c] text-parchment-dim hover:text-gold border border-charcoal-border"
          }`}
        >
          Todas las Piezas ({shopProducts.length})
        </button>

        {shopCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-sans transition-all ${
              selectedCategory === cat.id
                ? "bg-gold text-obsidian font-medium shadow-[0_0_15px_rgba(198,160,82,0.4)]"
                : "bg-[#14121c] text-parchment-dim hover:text-gold border border-charcoal-border"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Catálogo de Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <article
            key={product.id}
            className="group rounded-xl overflow-hidden border border-charcoal-border bg-[#0f0e16]/90 hover:border-gold/50 transition-all duration-300 flex flex-col justify-between shadow-lg"
          >
            <div>
              {/* Imagen del Producto */}
              <div className="relative aspect-square overflow-hidden border-b border-charcoal-border/70 bg-black">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Badge de Sello de Marca */}
                {product.badge && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-obsidian/90 border border-gold/50 text-[10px] uppercase tracking-widest text-gold-light font-sans font-medium backdrop-blur shadow-md">
                    ✦ {product.badge}
                  </div>
                )}

                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-obsidian-deep/95 border border-gold/40 text-gold-light font-serif text-sm font-medium shadow-md">
                  {product.formattedPrice}
                </div>
              </div>

              {/* Información */}
              <div className="p-6">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold/80 font-sans block mb-1">
                  {product.categoryName}
                </span>

                <h3 className="font-serif text-lg sm:text-xl text-parchment group-hover:text-gold transition-colors font-medium leading-snug">
                  {product.name}
                </h3>

                <p className="text-xs text-parchment-dim font-sans mt-2 line-clamp-2 leading-relaxed">
                  {product.tagline}
                </p>

                {/* Uso ceremonial */}
                <div className="mt-4 p-3 rounded bg-[#151320] border border-charcoal-border/60 text-[11px] text-parchment-muted font-sans leading-relaxed">
                  <span className="text-gold font-medium block mb-0.5">Uso ceremonial:</span>
                  {product.ritualUse}
                </div>
              </div>
            </div>

            {/* Acciones del Producto */}
            <div className="p-6 pt-0 flex items-center gap-3">
              <button
                onClick={() => setSelectedProduct(product)}
                className="flex-1 py-2.5 px-3 rounded border border-charcoal-border hover:border-gold text-xs text-parchment-muted hover:text-gold font-sans transition-colors text-center"
              >
                Ver detalles
              </button>

              <a
                href={getProductWhatsAppUrl(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian text-xs font-sans font-medium hover:shadow-[0_0_20px_rgba(198,160,82,0.4)] transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>Adquirir</span>
                <span>→</span>
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Modal de Detalle de Producto */}
      {selectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn"
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gold/50 bg-[#0d0c15] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(198,160,82,0.2)]">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full border border-charcoal-border hover:border-gold text-parchment-dim hover:text-gold flex items-center justify-center transition-colors text-lg"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <div className="relative aspect-square rounded-xl overflow-hidden border border-gold/30 bg-black">
                <Image
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>

              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans block">
                  {selectedProduct.categoryName}
                </span>

                <h3 className="font-serif text-xl sm:text-2xl text-parchment font-medium leading-tight">
                  {selectedProduct.name}
                </h3>

                <div className="text-xl font-serif text-gold-light">
                  {selectedProduct.formattedPrice}
                </div>

                <p className="text-xs text-parchment-muted font-sans leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="p-3 rounded bg-[#151320] border border-charcoal-border text-xs text-parchment font-sans">
                  <span className="text-gold font-medium block mb-1">✦ Rigor y Detalles:</span>
                  <ul className="space-y-1 text-[11px] text-parchment-dim">
                    {selectedProduct.details.map((d, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-gold">·</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <a
                    href={getProductWhatsAppUrl(selectedProduct)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded text-xs uppercase tracking-[0.2em] font-sans font-medium bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian shadow-[0_0_20px_rgba(198,160,82,0.4)] hover:shadow-[0_0_30px_rgba(198,160,82,0.6)] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Solicitar Pieza por WhatsApp</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Friso Ceremonial de Garantía de Consagración */}
      <div className="mt-20 p-8 rounded-2xl border border-charcoal-border bg-gradient-to-b from-[#14121e] to-[#0a0910] text-center max-w-3xl mx-auto space-y-3">
        <span className="text-gold text-2xl font-serif">✦</span>
        <h3 className="font-serif text-xl sm:text-2xl text-parchment font-light">
          Compromiso y Rigor de la Boutique ARCANO
        </h3>
        <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed">
          Cada artículo ritual, baraja y preparado mineral pasa por un proceso de limpieza con sahumerio de copal y salvia en nuestro santuario antes de ser empaquetado con sellos de lacre y pan de oro. No comercializamos objetos genéricos; custodiamos herramientas para el alma.
        </p>
      </div>
    </div>
  );
}
