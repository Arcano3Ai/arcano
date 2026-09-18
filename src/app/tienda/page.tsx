"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  artisanManifesto,
  shopCategories,
  shopProducts,
  ShopProduct,
} from "@/data/shop";
import { getWhatsAppUrl } from "@/config/brandConfig";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");
  const [activeProduct, setActiveProduct] = useState<ShopProduct | null>(null);

  const filteredProducts =
    selectedCategory === "todos"
      ? shopProducts
      : shopProducts.filter((p) => p.categoryId === selectedCategory);

  const getProductWhatsAppMessage = (product: ShopProduct) => {
    return `Hola ARCANO, me interesa adquirir la pieza única "${product.name}" (${product.formattedPrice} ${product.shippingNote}). ¿Sigue disponible para envío?`;
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Header & Hero */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/40 bg-charcoal/60 text-gold text-xs uppercase tracking-[0.25em] mb-4">
          <span>✦</span>
          <span>Boutique Ceremonial · Piedras de Río</span>
          <span>✦</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-parchment font-light tracking-wide mb-4">
          Quemadores de Incienso & Piedras Sagradas de Río
        </h1>
        <p className="text-parchment-muted text-sm sm:text-base font-sans font-light leading-relaxed">
          Piezas únicas recolectadas en cauces fluviales, taladradas y grabadas a mano con runas y geometrías sagradas para consagrar tu altar y elevar tus rituales.
        </p>
      </div>

      {/* 2. Manifiesto Artesanal (Aviso de Unicidad) */}
      <div className="relative mb-16 rounded-lg border border-gold/30 bg-gradient-to-br from-charcoal/80 via-obsidian/90 to-charcoal/80 p-6 sm:p-8 shadow-[0_0_35px_rgba(198,160,82,0.12)] overflow-hidden">
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

      {/* 3. Filtros de Categoría */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
        {shopCategories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-sans tracking-wider transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? "bg-gold text-obsidian font-medium shadow-[0_0_15px_rgba(198,160,82,0.35)] border border-gold"
                  : "bg-charcoal/50 text-parchment-muted border border-gold/20 hover:border-gold/50 hover:text-parchment"
              }`}
            >
              <span>{cat.symbol}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Conteo de piezas */}
      <div className="flex items-center justify-between border-b border-gold/15 pb-3 mb-8 text-xs font-sans text-parchment-muted">
        <span>Mostrando {filteredProducts.length} piezas artesanales de río</span>
        <span className="text-gold/80">Envíos a todo México · Empaque Ceremonial Seguro</span>
      </div>

      {/* 4. Grid de Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
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
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Badge */}
              {product.badge && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-obsidian/85 backdrop-blur-sm border border-gold/40 text-[10px] uppercase tracking-widest text-gold font-sans font-medium">
                  {product.badge}
                </div>
              )}

              {/* Quick View Hover Prompt */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="px-4 py-1.5 rounded-full bg-obsidian/90 border border-gold/60 text-xs text-parchment font-sans tracking-wider backdrop-blur-md shadow-lg">
                  Ver Detalles ✦
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
                <span className="text-[10px] text-parchment-muted/60 font-sans">
                  Pieza Única
                </span>
              </div>

              {/* Botones de Acción */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveProduct(product)}
                  className="w-full py-2.5 px-3 rounded text-[11px] uppercase tracking-wider font-sans border border-gold/30 hover:border-gold text-parchment hover:text-gold transition-colors bg-charcoal/60"
                >
                  Uso Ritual
                </button>
                <a
                  href={getWhatsAppUrl(getProductWhatsAppMessage(product))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded text-[11px] uppercase tracking-wider font-sans font-medium text-obsidian bg-gold hover:bg-gold-light transition-all shadow-[0_0_12px_rgba(198,160,82,0.25)] flex items-center justify-center gap-1.5 text-center"
                >
                  <span>Pedir</span>
                  <span>↗</span>
                </a>
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
          Si buscas una piedra de río con una runa específica, símbolo astrológico o kit ceremonial especial para ti o para regalar, escríbenos directamente.
        </p>
        <a
          href={getWhatsAppUrl("Hola ARCANO, deseo consultar sobre una pieza o pedido especial de la boutique ceremonial.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded text-xs uppercase tracking-[0.2em] font-sans font-medium text-obsidian bg-gold hover:bg-gold-light transition-all shadow-[0_0_20px_rgba(198,160,82,0.3)]"
        >
          <span>Escribir por WhatsApp</span>
          <span>✦</span>
        </a>
      </div>

      {/* 6. Modal de Detalle de Producto */}
      {activeProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/85 backdrop-blur-md">
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg border border-gold/40 bg-charcoal p-6 sm:p-8 shadow-[0_0_50px_rgba(198,160,82,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cerrar */}
            <button
              onClick={() => setActiveProduct(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-parchment-muted hover:text-gold hover:border-gold transition-colors text-lg"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            {/* Imagen Grande */}
            <div className="relative aspect-[4/3] w-full rounded overflow-hidden bg-black/50 mb-6 border border-gold/20">
              <Image
                src={activeProduct.imageUrl}
                alt={activeProduct.name}
                fill
                className="object-cover"
              />
              {activeProduct.badge && (
                <div className="absolute top-3 left-3 px-3 py-1 rounded bg-obsidian/90 border border-gold/50 text-[10px] uppercase tracking-widest text-gold font-sans font-medium">
                  {activeProduct.badge}
                </div>
              )}
            </div>

            {/* Info */}
            <span className="text-xs uppercase tracking-[0.25em] text-gold/80 font-sans block mb-1">
              {activeProduct.categoryName}
            </span>
            <h2 className="font-serif text-2xl text-parchment font-light mb-3">
              {activeProduct.name}
            </h2>

            {/* Precio */}
            <div className="flex items-baseline gap-2 mb-6 pb-4 border-b border-gold/15">
              <span className="font-serif text-2xl text-gold font-medium">
                {activeProduct.formattedPrice}
              </span>
              <span className="text-xs text-parchment-muted font-sans uppercase tracking-wider">
                {activeProduct.shippingNote}
              </span>
            </div>

            {/* Descripción */}
            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-sans font-medium mb-2">
                Descripción de la Pieza
              </h4>
              <p className="text-xs sm:text-sm text-parchment font-sans font-light leading-relaxed">
                {activeProduct.description}
              </p>
            </div>

            {/* Uso Ritual */}
            <div className="mb-6 p-4 rounded bg-obsidian/60 border border-gold/15">
              <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-sans font-medium mb-1.5 flex items-center gap-1.5">
                <span>✦</span>
                <span>Uso Ritual & Meditación</span>
              </h4>
              <p className="text-xs text-parchment-muted font-sans font-light leading-relaxed">
                {activeProduct.ritualUse}
              </p>
            </div>

            {/* Detalles Artesanales */}
            <div className="mb-8">
              <h4 className="text-xs uppercase tracking-[0.2em] text-gold font-sans font-medium mb-2">
                Características & Cuidados
              </h4>
              <ul className="space-y-1.5">
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

            {/* CTA WhatsApp */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppUrl(getProductWhatsAppMessage(activeProduct))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-6 rounded text-xs uppercase tracking-[0.2em] font-sans font-medium text-obsidian bg-gold hover:bg-gold-light transition-all shadow-[0_0_20px_rgba(198,160,82,0.3)] flex items-center justify-center gap-2 text-center"
              >
                <span>Solicitar esta Pieza por WhatsApp</span>
                <span>↗</span>
              </a>
              <button
                onClick={() => setActiveProduct(null)}
                className="py-3 px-6 rounded text-xs uppercase tracking-[0.2em] font-sans border border-gold/30 text-parchment-muted hover:text-parchment transition-colors"
              >
                Volver al Catálogo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
