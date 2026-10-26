"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GRAND_COLLECTIONS } from "@/data/artisanCrafts";

interface StoreGrandMenuProps {
  currentCollection?: "talismanes" | "barro-negro" | "alebrijes" | "arte-huichol";
}

export const StoreGrandMenu: React.FC<StoreGrandMenuProps> = ({ currentCollection }) => {
  const pathname = usePathname();

  // Detect active if not explicitly provided
  const activeId =
    currentCollection ||
    (pathname.includes("/barro-negro")
      ? "barro-negro"
      : pathname.includes("/alebrijes")
      ? "alebrijes"
      : pathname.includes("/arte-huichol")
      ? "arte-huichol"
      : "talismanes");

  return (
    <nav
      aria-label="Colecciones de Arte Ancestral y Alquimia"
      className="w-full bg-[#050505] border-b border-neutral-900 sticky top-16 sm:top-20 z-30 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Encabezado sutil de la galería */}
        <div className="pt-2.5 pb-1 flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-mono">
          <span className="hidden sm:inline">✦ GALERÍA DE ARTE SAGRADO & ALQUIMIA ✦</span>
          <span className="text-[#C5A059] mx-auto sm:mx-0">
            SELECCIONA UNA DISCIPLINA ARTESANAL ANCESTRAL
          </span>
          <span className="hidden md:inline text-neutral-400">ENVIOS CONCIERGE VIP</span>
        </div>

        {/* 4 Tabs Principales de Colecciones */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 py-2.5">
          {GRAND_COLLECTIONS.map((col) => {
            const isActive = activeId === col.id;

            return (
              <Link
                key={col.id}
                href={col.href}
                className={`group relative flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-lg border transition-all duration-300 text-left select-none ${
                  isActive
                    ? "bg-gradient-to-br from-[#161411] via-[#0E0C09] to-[#080808] border-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.25)]"
                    : "bg-[#0A0A0A]/80 border-neutral-800/80 hover:border-neutral-600 hover:bg-[#121212]"
                }`}
              >
                {/* Indicador de estado activo superior */}
                {isActive && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#C5A059] rounded-full shadow-[0_0_8px_#C5A059]" />
                )}

                {/* Icono con resplandor */}
                <div
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center text-lg sm:text-xl flex-shrink-0 transition-transform duration-300 ${
                    isActive
                      ? "bg-black/90 border border-[#C5A059]/60 scale-105"
                      : "bg-[#111111] border border-neutral-800 group-hover:scale-105"
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 15px ${col.accentColor}33` : "none",
                  }}
                >
                  <span>{col.symbol}</span>
                </div>

                {/* Textos */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[8px] sm:text-[9px] font-mono tracking-widest uppercase truncate ${
                        isActive ? "text-[#C5A059] font-semibold" : "text-neutral-400"
                      }`}
                    >
                      {col.badge}
                    </span>
                  </div>
                  <h3
                    className={`text-xs sm:text-[13px] font-serif tracking-wide truncate ${
                      isActive ? "text-white font-medium" : "text-neutral-300 group-hover:text-white"
                    }`}
                  >
                    {col.name}
                  </h3>
                  <p className="text-[10px] text-neutral-400 font-sans truncate hidden sm:block">
                    {col.subtitle}
                  </p>
                </div>

                {/* Flecha indicadora */}
                <span
                  className={`text-xs transition-transform duration-300 hidden lg:inline ${
                    isActive
                      ? "text-[#C5A059] translate-x-0"
                      : "text-neutral-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                  }`}
                >
                  →
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </nav>
  );
};
