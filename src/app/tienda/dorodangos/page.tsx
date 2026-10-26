"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StoreGrandMenu } from "@/components/shop/StoreGrandMenu";
import { DorodangoMirrorExperience } from "@/components/shop/DorodangoMirrorExperience";
import { DORODANGOS_PRODUCTS, ArtisanProduct } from "@/data/artisanCrafts";
import { getWhatsAppUrl } from "@/config/brandConfig";

export default function DorodangosPage() {
  const [selectedProduct, setSelectedProduct] = useState<ArtisanProduct | null>(null);

  const getConciergeUrl = (prod: ArtisanProduct) => {
    return getWhatsAppUrl(
      `Hola ARCANO, deseo consultar sobre la pieza maestra de Dorodango: *${prod.name}* (${prod.formattedPrice}).\n\n` +
      `✦ Técnica: ${prod.technique}\n` +
      `✦ Dimensiones: ${prod.dimensions}\n` +
      `✦ Solicito asesoría privada y detalles de entrega personal Concierge.`
    );
  };

  return (
    <div className="min-h-screen bg-black text-neutral-200">
      
      {/* 1. Menú Principal de las Grandes Colecciones */}
      <StoreGrandMenu currentCollection="dorodangos" />

      {/* 2. Hero Interactivo: El Ritual del Bruñido Zen (Hikaru Dorodango) */}
      <DorodangoMirrorExperience />

      {/* 3. Catálogo de Piezas Maestras de Dorodangos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-12">
        
        {/* Encabezado del Catálogo */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#E5C158] block">
            ALTA ESCULTURA TELÚRICA · PIEZAS ÚNICAS NUMERADAS
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-light text-white tracking-wide">
            Colección de Esferas Hikaru Dorodango
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
            Cada esfera requiere de dos a tres semanas de pulido milimétrico diario. Al no utilizar esmaltes sintéticos, el lustre espejo nace de la perfecta orientación microscópica de las partículas de arcilla y polvos de gemas naturales.
          </p>
        </div>

        {/* Rejilla de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DORODANGOS_PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-xl bg-[#0c0a08]/90 border border-neutral-800/80 hover:border-[#E5C158]/70 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-xl hover:shadow-[0_0_30px_rgba(229,193,88,0.2)]"
            >
              {/* Badge Superior */}
              {product.badge && (
                <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/85 border border-[#E5C158]/50 text-[9px] font-mono tracking-widest uppercase text-[#E5C158] backdrop-blur">
                  ✦ {product.badge}
                </div>
              )}

              {/* Fotografía de la Esfera */}
              <div
                className="relative aspect-square w-full overflow-hidden bg-black cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </div>

              {/* Información y Especificaciones */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 block">
                    {product.community}
                  </span>
                  <h3 className="text-sm font-serif font-normal text-white group-hover:text-[#E5C158] transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-neutral-400 font-light line-clamp-2 leading-relaxed">
                    {product.story}
                  </p>
                </div>

                {/* Especificaciones de Peso y Diámetro */}
                <div className="pt-2 border-t border-neutral-900/80 text-[10px] font-mono text-neutral-400 space-y-0.5">
                  <div className="flex justify-between">
                    <span>Dimensiones:</span>
                    <span className="text-neutral-300">{product.dimensions.split(" · ")[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Peso ritual:</span>
                    <span className="text-neutral-300">{product.dimensions.split(" · ")[1]}</span>
                  </div>
                </div>

                {/* Precio y CTA */}
                <div className="pt-3 flex items-center justify-between border-t border-neutral-800">
                  <div>
                    <span className="text-[9px] font-mono uppercase text-neutral-400 block">Inversión</span>
                    <span className="text-sm font-serif text-white font-medium">{product.formattedPrice}</span>
                  </div>

                  <a
                    href={getConciergeUrl(product)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded bg-gradient-to-r from-amber-600 to-[#E5C158] hover:from-amber-500 hover:to-[#ffd86b] text-black text-[11px] font-sans font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-[0_0_15px_rgba(229,193,88,0.4)] flex items-center gap-1 cursor-pointer"
                  >
                    <span>Adquirir</span>
                    <span className="text-xs">↗</span>
                  </a>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Garantía de Autenticidad y Cuidados Zen */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#120f09] via-[#0a0907] to-[#120f09] border border-amber-500/20 text-center max-w-4xl mx-auto space-y-4">
          <span className="text-2xl text-[#E5C158]">✦</span>
          <h3 className="text-lg font-serif text-white tracking-wide">
            Protocolo de Resguardo y Entrega Privada
          </h3>
          <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto">
            Cada Hikaru Dorodango se entrega en caja ceremonial de madera de cedro, reposando sobre un cojín de seda salvaje y acompañado de un certificado firmado por el maestro con la fecha exacta de su última luna de bruñido. Entrega asegurada en mano en Monterrey y envíos protegidos a todo México.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-2 text-[10px] font-mono uppercase tracking-widest text-amber-300/80">
            <span>✦ COJÍN DE SEDA INCLUIDO</span>
            <span>✦ BASE DE NOGAL O CEDRO</span>
            <span>✦ CERTIFICADO DE AUTENTICIDAD</span>
          </div>
        </div>

      </section>

      {/* Modal de Inspección Detallada */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn"
          onClick={() => setSelectedProduct(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-2xl bg-[#0c0a08] border border-amber-500/40 rounded-2xl p-6 sm:p-8 text-white space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-lg p-2 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <div className="relative w-56 h-56 rounded-full overflow-hidden border-2 border-amber-500/50 shadow-2xl flex-shrink-0">
                <Image
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-3 text-left">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#E5C158] block">
                  {selectedProduct.community}
                </span>
                <h3 className="text-xl font-serif">{selectedProduct.name}</h3>
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {selectedProduct.story}
                </p>
                <div className="text-[11px] font-mono text-neutral-400 space-y-1 pt-1">
                  <p><strong className="text-amber-300">Materiales:</strong> {selectedProduct.materials}</p>
                  <p><strong className="text-amber-300">Técnica:</strong> {selectedProduct.technique}</p>
                  <p><strong className="text-amber-300">Consagración:</strong> {selectedProduct.consecrationDetails}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-lg font-serif text-[#E5C158] font-medium">
                {selectedProduct.formattedPrice}
              </span>
              <a
                href={getConciergeUrl(selectedProduct)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-6 rounded bg-[#E5C158] hover:bg-amber-400 text-black text-xs font-semibold uppercase tracking-wider transition-all shadow-lg hover:shadow-[0_0_20px_rgba(229,193,88,0.5)] cursor-pointer"
              >
                Solicitar por WhatsApp Concierge ↗
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
