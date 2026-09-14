"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

interface ArcanaImageZoomProps {
  imageUrl: string;
  name: string;
  number?: string;
  glyph?: string;
  element?: string;
  subtitle?: string;
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
}

export const ArcanaImageZoom: React.FC<ArcanaImageZoomProps> = ({
  imageUrl,
  name,
  number,
  glyph,
  element,
  subtitle,
  className = "relative w-48 sm:w-56 aspect-[9/14] rounded-lg overflow-hidden border-2 border-gold/40 mx-auto my-8 shadow-[0_15px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(198,160,82,0.2)] bg-obsidian-deep",
  priority = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Cerrar con Escape
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const resolvedUrl = getAssetPath(imageUrl);

  return (
    <>
      {/* Miniatura interactiva con indicador de zoom */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        aria-label={`Ampliar imagen de ${name} para ver detalles`}
        title="Toca para ampliar y ver los detalles sagrados"
        className={`${className} group cursor-zoom-in transition-all duration-300 hover:border-gold hover:shadow-[0_20px_60px_rgba(198,160,82,0.35)] select-none`}
      >
        <Image
          src={resolvedUrl}
          alt={name}
          fill
          className="object-cover object-center filter brightness-[0.92] contrast-[1.15] group-hover:scale-105 group-hover:brightness-100 transition-all duration-500 ease-out"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 640px) 250px, 320px"
        />

        {/* Marco dorado sutil interior */}
        <div className="absolute inset-0 border border-gold/20 rounded-md pointer-events-none group-hover:border-gold/50 transition-colors" />

        {/* Glifo superior si existe */}
        {glyph && (
          <div className="absolute top-2 right-2 bg-obsidian/85 px-2 py-0.5 rounded border border-charcoal-border pointer-events-none">
            <span className="text-xs text-gold font-serif">{glyph}</span>
          </div>
        )}

        {/* Insignia / Badge ceremonial flotante "Toca para ampliar" */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-obsidian/90 backdrop-blur-sm border border-gold/50 text-gold px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-sans tracking-wider uppercase flex items-center gap-1.5 shadow-lg group-hover:bg-gold group-hover:text-obsidian group-hover:border-gold transition-all duration-300 pointer-events-none whitespace-nowrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
            />
          </svg>
          <span>Toca para ampliar</span>
        </div>
      </div>

      {/* Modal / Lightbox maximizado a pantalla completa */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada de ${name}`}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[9999] bg-black/92 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 cursor-zoom-out animate-fadeIn select-none"
        >
          {/* Barra superior de control ceremonial */}
          <div className="w-full max-w-lg flex items-center justify-between px-3 py-2 mb-2 text-parchment pointer-events-auto">
            <div className="flex items-center gap-2">
              {glyph && <span className="text-gold text-lg">{glyph}</span>}
              <div className="text-left">
                <h4 className="font-serif text-sm sm:text-base text-parchment tracking-wide">
                  {name} {number ? `(${number})` : ""}
                </h4>
                {(element || subtitle) && (
                  <span className="text-[10px] sm:text-[11px] text-parchment-dim font-sans uppercase tracking-widest block">
                    {element ? `Elemento ${element}` : subtitle}
                  </span>
                )}
              </div>
            </div>

            {/* Botón cerrar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              aria-label="Cerrar vista ampliada"
              className="flex items-center gap-1.5 bg-charcoal/80 hover:bg-gold/20 text-parchment hover:text-gold border border-gold/40 hover:border-gold px-3 py-1.5 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-200"
            >
              <span>✕</span>
              <span className="hidden sm:inline text-[10px]">Cerrar</span>
            </button>
          </div>

          {/* Contenedor de la carta maximizada */}
          <div
            onClick={() => setIsOpen(false)}
            className="relative w-full max-w-[88vw] sm:max-w-md md:max-w-lg aspect-[9/14] max-h-[78vh] sm:max-h-[82vh] rounded-xl overflow-hidden border-2 border-gold/70 shadow-[0_0_60px_rgba(198,160,82,0.35),0_25px_90px_rgba(0,0,0,0.98)] bg-obsidian-deep transform transition-transform duration-300 hover:scale-[1.01]"
          >
            <Image
              src={resolvedUrl}
              alt={name}
              fill
              className="object-contain object-center filter brightness-[0.95] contrast-[1.12]"
              priority
              loading="eager"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 500px, 600px"
            />
            {/* Marco interior ornamental de doble línea dorada */}
            <div className="absolute inset-1.5 border border-gold/30 rounded-lg pointer-events-none" />
            <div className="absolute inset-3 border border-gold/15 rounded-md pointer-events-none" />
          </div>

          {/* Indicador inferior ceremonial para minimizar */}
          <div className="mt-3 text-center pointer-events-none">
            <span className="inline-flex items-center gap-1.5 bg-obsidian/90 text-parchment-dim border border-charcoal-border px-3 py-1 rounded-full text-[11px] font-sans tracking-widest uppercase">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 text-gold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              Toca la carta o cualquier parte para minimizar
            </span>
          </div>
        </div>
      )}
    </>
  );
};
