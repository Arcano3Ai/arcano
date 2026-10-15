"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { getWhatsAppUrl } from "@/config/brandConfig";

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const { totalCount, openCart } = useCart();

  const isTienda = pathname?.startsWith("/tienda");
  const isLecturas = pathname?.startsWith("/lecturas");
  const isSantuario = pathname === "/" || pathname?.startsWith("/arcanos");

  const whatsappConciergeUrl = getWhatsAppUrl(
    "Hola Malachai, visito la Boutique ARCANO desde el móvil y deseo asesoría personalizada sobre una pieza o lectura."
  );

  return (
    <nav
      aria-label="Navegación móvil inferior"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0a0910]/95 backdrop-blur-xl border-t border-gold/25 shadow-[0_-4px_25px_rgba(0,0,0,0.7)] px-2 py-2 safe-area-bottom"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* 1. BOUTIQUE / TIENDA */}
        <Link
          href="/tienda/"
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-300 relative ${
            isTienda ? "text-gold" : "text-parchment-muted hover:text-parchment"
          }`}
        >
          <span className="text-lg leading-none mb-1 filter drop-shadow">🛍️</span>
          <span className="text-[10px] font-sans tracking-wider uppercase font-medium">
            Boutique
          </span>
          {isTienda && (
            <span className="w-1.5 h-1.5 rounded-full bg-gold absolute -top-1 shadow-[0_0_8px_rgba(198,160,82,0.8)]" />
          )}
        </Link>

        {/* 2. LECTURAS DE TAROT */}
        <Link
          href="/lecturas/"
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-300 relative ${
            isLecturas ? "text-gold" : "text-parchment-muted hover:text-parchment"
          }`}
        >
          <span className="text-lg leading-none mb-1 filter drop-shadow">🔮</span>
          <span className="text-[10px] font-sans tracking-wider uppercase font-medium">
            Lecturas
          </span>
          {isLecturas && (
            <span className="w-1.5 h-1.5 rounded-full bg-gold absolute -top-1 shadow-[0_0_8px_rgba(198,160,82,0.8)]" />
          )}
        </Link>

        {/* 3. CARRITO CEREMONIAL PERSISTENTE */}
        <button
          onClick={openCart}
          className="flex flex-col items-center justify-center flex-1 py-1 text-parchment hover:text-gold transition-colors relative cursor-pointer group"
          aria-label={`Ver carrito ceremonial (${totalCount} artículos)`}
        >
          <div className="relative">
            <span className="text-lg leading-none mb-1 block group-hover:scale-110 transition-transform">
              🛒
            </span>
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-gradient-to-r from-amber-500 to-gold text-obsidian text-[9px] font-bold font-sans w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.7)] animate-pulse">
                {totalCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-sans tracking-wider uppercase font-medium">
            Carrito
          </span>
        </button>

        {/* 4. CONCIERGE WHATSAPP DIRECTO */}
        <a
          href={whatsappConciergeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center flex-1 py-1 text-[#25D366] hover:brightness-110 transition-all"
        >
          <span className="text-lg leading-none mb-1 filter drop-shadow">💬</span>
          <span className="text-[10px] font-sans tracking-wider uppercase font-medium">
            Concierge
          </span>
        </a>

        {/* 5. SANTUARIO COMPLETO (Desktop overview) */}
        <Link
          href="/?view=full"
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-300 relative ${
            isSantuario && pathname === "/" ? "text-gold" : "text-parchment-dim hover:text-parchment"
          }`}
        >
          <span className="text-lg leading-none mb-1 filter drop-shadow">✦</span>
          <span className="text-[10px] font-sans tracking-wider uppercase font-medium">
            Santuario
          </span>
        </Link>
      </div>
    </nav>
  );
};
