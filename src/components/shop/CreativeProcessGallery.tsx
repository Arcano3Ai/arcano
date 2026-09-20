"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { creativeProcessGallery, CreativeProcessImage } from "@/data/shop";
import { getAssetPath } from "@/lib/utils";

export const CreativeProcessGallery: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Cerrar modal
  const closeModal = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Navegación siguiente
  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % creativeProcessGallery.length;
    });
  }, []);

  // Navegación anterior
  const prevImage = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return 0;
      return (prev - 1 + creativeProcessGallery.length) % creativeProcessGallery.length;
    });
  }, []);

  // Control con teclado
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIndex, closeModal, nextImage, prevImage]);

  // Scroll horizontal en reel de miniaturas
  const scrollReel = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const activeImage: CreativeProcessImage | null =
    selectedIndex !== null ? creativeProcessGallery[selectedIndex] : null;

  return (
    <section className="relative mb-16 rounded-xl border border-gold/25 bg-gradient-to-br from-[#121218]/90 via-[#0d0d12]/95 to-[#15151e]/90 p-5 sm:p-7 shadow-[0_4px_30px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Luz decorativa sutil */}
      <div className="absolute top-0 right-1/4 w-72 h-32 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Cabecera de la sección (Discreta y elegante para no restar foco a los productos) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 border-b border-gold/15 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-gold text-xs">✦</span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-gold font-sans font-medium">
              Bitácora de Taller & Altar Fluvial
            </span>
          </div>
          <h2 className="font-serif text-lg sm:text-2xl text-parchment font-light">
            El Proceso Creativo: Del Cauce al Fuego Sagrado
          </h2>
          <p className="text-xs text-parchment-muted/80 font-sans font-light mt-1 max-w-2xl">
            11 instantes de nuestro quehacer artesanal: recolección en el río, pintura a mano con pigmentos áureos y activación nocturna junto a la fogata. Haz clic en cualquier miniatura para ampliarla.
          </p>
        </div>

        {/* Botones de control del carrete */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => scrollReel("left")}
            aria-label="Desplazar miniaturas hacia la izquierda"
            className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-gold/80 hover:text-gold hover:border-gold hover:bg-gold/10 transition-all text-sm"
          >
            ‹
          </button>
          <button
            onClick={() => scrollReel("right")}
            aria-label="Desplazar miniaturas hacia la derecha"
            className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-gold/80 hover:text-gold hover:border-gold hover:bg-gold/10 transition-all text-sm"
          >
            ›
          </button>
          <button
            onClick={() => setSelectedIndex(0)}
            className="ml-2 px-3 py-1.5 rounded-full border border-gold/40 bg-gold/10 hover:bg-gold hover:text-obsidian text-gold text-[11px] font-sans font-medium uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>Ver 11 Fotos</span>
            <span>🔍</span>
          </button>
        </div>
      </div>

      {/* Carrete horizontal de miniaturas compactas */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gold/30 scrollbar-track-transparent scroll-smooth focus:outline-none"
        tabIndex={0}
        aria-label="Carrete de fotos del proceso creativo"
      >
        {creativeProcessGallery.map((img, idx) => (
          <button
            key={img.id}
            onClick={() => setSelectedIndex(idx)}
            className="group relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden border border-gold/30 hover:border-gold transition-all duration-300 hover:scale-105 shadow-[0_2px_10px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(198,160,82,0.3)] bg-black/40 text-left focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <Image
              src={getAssetPath(img.src)}
              alt={img.title}
              fill
              sizes="(max-width: 640px) 100px, 120px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-obsidian/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

            {/* Número discreto de fotografía */}
            <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-obsidian/80 backdrop-blur-sm border border-gold/30 text-[9px] text-gold font-sans font-medium">
              {String(idx + 1).padStart(2, "0")}
            </div>

            {/* Prompt de zoom en hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-obsidian/40 backdrop-blur-[1px]">
              <span className="w-7 h-7 rounded-full bg-gold text-obsidian flex items-center justify-center text-xs shadow-md font-bold">
                🔍
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* MODAL / LIGHTBOX DE IMAGEN GRANDE */}
      {selectedIndex !== null && activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-obsidian/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeModal}
        >
          {/* Contenedor del Visor */}
          <div
            className="relative w-full max-w-4xl max-h-[95vh] flex flex-col rounded-xl border border-gold/40 bg-gradient-to-b from-[#161622] to-[#0d0d14] p-4 sm:p-6 shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barra superior: Título, contador y botón cerrar */}
            <div className="flex items-center justify-between pb-3 border-b border-gold/20 mb-3 sm:mb-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-gold/15 border border-gold/40 text-gold text-[10px] sm:text-xs font-sans font-medium tracking-widest uppercase">
                  {selectedIndex + 1} / {creativeProcessGallery.length}
                </span>
                <h3 className="font-serif text-base sm:text-xl text-parchment font-light">
                  {activeImage.title}
                </h3>
              </div>
              <button
                onClick={closeModal}
                className="w-9 h-9 rounded-full border border-gold/30 hover:border-gold hover:bg-gold/15 text-parchment hover:text-gold transition-colors flex items-center justify-center text-base"
                aria-label="Cerrar visor"
              >
                ✕
              </button>
            </div>

            {/* Imagen Principal en Alta Definición */}
            <div className="relative flex-1 w-full min-h-[260px] sm:min-h-[420px] max-h-[58vh] sm:max-h-[62vh] rounded-lg overflow-hidden bg-black/60 border border-gold/25 flex items-center justify-center">
              <Image
                src={getAssetPath(activeImage.src)}
                alt={activeImage.title}
                fill
                priority
                sizes="(max-width: 1024px) 95vw, 1000px"
                className="object-contain"
              />

              {/* Botón Navegación Anterior */}
              <button
                onClick={prevImage}
                aria-label="Fotografía anterior"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-obsidian/80 hover:bg-gold text-parchment hover:text-obsidian border border-gold/40 hover:border-gold backdrop-blur-md flex items-center justify-center text-xl sm:text-2xl transition-all shadow-lg"
              >
                ‹
              </button>

              {/* Botón Navegación Siguiente */}
              <button
                onClick={nextImage}
                aria-label="Fotografía siguiente"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-obsidian/80 hover:bg-gold text-parchment hover:text-obsidian border border-gold/40 hover:border-gold backdrop-blur-md flex items-center justify-center text-xl sm:text-2xl transition-all shadow-lg"
              >
                ›
              </button>
            </div>

            {/* Pie del Visor: Descripción & Miniaturas de Salto Directo */}
            <div className="pt-3 sm:pt-4 flex flex-col gap-3">
              <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed text-center sm:text-left">
                {activeImage.caption}
              </p>

              {/* Tira inferior de miniaturas para navegar rápido */}
              <div className="w-full overflow-x-auto py-1.5 px-2 scrollbar-none">
                <div className="flex items-center min-w-max mx-auto gap-1.5 sm:gap-2">
                {creativeProcessGallery.map((thumb, idx) => (
                  <button
                    key={thumb.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative w-11 h-11 sm:w-14 sm:h-14 rounded overflow-hidden border transition-all duration-200 flex-shrink-0 ${
                      idx === selectedIndex
                        ? "border-gold ring-2 ring-gold/50 scale-105"
                        : "border-gold/20 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={getAssetPath(thumb.src)}
                      alt={thumb.title}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </button>
                ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
