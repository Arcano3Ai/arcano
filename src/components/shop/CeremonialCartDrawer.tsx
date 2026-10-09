"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export function CeremonialCartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeItem,
    updateQuantity,
    clearCart,
    totalCount,
    subtotal,
    hasFreeShipping,
    amountNeededForFreeShipping,
    freeShippingThreshold,
    getWhatsAppOrderUrl,
  } = useCart();

  // Cerrar con Escape y bloquear scroll del body cuando está abierto
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCart();
      }
    };

    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop con desenfoque ceremonial */}
      <div
        className="fixed inset-0 bg-obsidian/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer deslizante desde la derecha */}
      <div className="relative w-full max-w-md bg-charcoal border-l border-gold/40 shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_30px_rgba(198,160,82,0.2)] flex flex-col h-full z-10 animate-in slide-in-from-right duration-300">
        
        {/* 1. Header del Carrito */}
        <div className="p-5 sm:p-6 border-b border-gold/20 flex items-center justify-between bg-obsidian/60">
          <div className="flex items-center gap-2.5">
            <span className="text-xl text-gold">🛒</span>
            <div>
              <h3 className="font-serif text-lg sm:text-xl text-parchment font-light">
                Carrito Ceremonial
              </h3>
              <span className="text-[11px] text-parchment-muted font-sans uppercase tracking-widest">
                {totalCount} {totalCount === 1 ? "pieza seleccionada" : "piezas seleccionadas"}
              </span>
            </div>
          </div>

          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-full bg-obsidian/80 border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-obsidian transition-all text-sm cursor-pointer"
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        {/* 2. Barra de Progreso de Envío Gratis */}
        <div className="px-5 sm:px-6 py-3 bg-gradient-to-r from-obsidian via-charcoal to-obsidian border-b border-gold/15 text-xs font-sans">
          {hasFreeShipping ? (
            <div className="flex items-center gap-2 text-gold font-medium">
              <span>✨</span>
              <span>¡Felicidades! Tu pedido califica para <strong>Envío Express Gratis</strong> a todo México.</span>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center text-parchment-muted mb-1.5 text-[11px]">
                <span>Agrega <strong>MXN ${amountNeededForFreeShipping.toLocaleString("es-MX")}</strong> más para <strong>Envío Gratis</strong></span>
                <span className="text-gold font-medium">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-gold/20">
                <div
                  className="h-full bg-gradient-to-r from-gold/60 to-gold transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* 3. Lista de Artículos */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-parchment-muted">
              <span className="text-4xl text-gold/40 mb-3">ᛟ</span>
              <p className="font-serif text-lg text-parchment mb-2">Tu altar está vacío</p>
              <p className="text-xs font-sans leading-relaxed max-w-xs mb-6">
                Añade quemadores de río, talismanes de alta joyería o dúos sagrados para armar tu pedido ceremonial.
              </p>
              <button
                onClick={closeCart}
                className="px-5 py-2.5 rounded text-xs uppercase tracking-[0.2em] font-sans font-medium text-obsidian bg-gold hover:bg-gold-light transition-all shadow-md"
              >
                Explorar Colección
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg border border-gold/25 bg-obsidian/60 flex gap-3.5 items-start group hover:border-gold/50 transition-colors"
              >
                {/* Miniatura */}
                <div className="relative w-16 h-16 rounded overflow-hidden bg-black/50 border border-gold/30 flex-shrink-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                {/* Detalles de la pieza */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-serif text-sm text-parchment font-light leading-snug line-clamp-2">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-parchment-muted/60 hover:text-red-400 transition-colors text-xs p-1"
                      title="Eliminar del carrito"
                    >
                      ✕
                    </button>
                  </div>

                  {item.optionLabel && (
                    <span className="inline-block text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-gold/15 text-gold font-sans font-medium mt-1">
                      {item.optionLabel}
                    </span>
                  )}

                  {item.hasGoldSpecs && (
                    <span className="inline-block text-[10px] text-gold/90 font-sans mt-0.5 ml-1">
                      ⚜️ Oro 18K
                    </span>
                  )}

                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-gold/10">
                    {/* Controles de cantidad */}
                    <div className="flex items-center border border-gold/30 rounded bg-charcoal/80 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-parchment-muted hover:text-gold hover:bg-gold/10 transition-colors"
                        title="Disminuir"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-xs font-sans text-parchment font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-parchment-muted hover:text-gold hover:bg-gold/10 transition-colors"
                        title="Aumentar"
                      >
                        +
                      </button>
                    </div>

                    {/* Precio de línea */}
                    <span className="font-serif text-sm text-gold font-medium">
                      MXN ${(item.price * item.quantity).toLocaleString("es-MX")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 4. Footer con Totales y Botón de Checkout por WhatsApp */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-gold/25 bg-obsidian/90 space-y-4">
            <div className="space-y-1.5 text-xs font-sans">
              <div className="flex justify-between text-parchment-muted">
                <span>Subtotal ({totalCount} {totalCount === 1 ? "artículo" : "artículos"})</span>
                <span>MXN ${subtotal.toLocaleString("es-MX")}</span>
              </div>
              <div className="flex justify-between text-parchment-muted">
                <span>Envío</span>
                <span className={hasFreeShipping ? "text-gold font-medium" : "text-parchment-muted"}>
                  {hasFreeShipping ? "Gratis (Express)" : "Por cotizar a tu CP"}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif text-parchment pt-2 border-t border-gold/15">
                <span className="text-gold">Total Estimado</span>
                <span className="font-medium text-gold">MXN ${subtotal.toLocaleString("es-MX")}</span>
              </div>
            </div>

            {/* Botón de Enviar Pedido por WhatsApp */}
            <a
              href={getWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-sans text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 text-center group cursor-pointer"
            >
              <span className="text-base group-hover:scale-110 transition-transform">💬</span>
              <span>Completar Pedido por WhatsApp</span>
              <span>↗</span>
            </a>

            {/* Acciones Secundarias & Confianza */}
            <div className="flex items-center justify-between text-[11px] text-parchment-muted/70 font-sans pt-1">
              <button
                onClick={clearCart}
                className="hover:text-red-400 transition-colors underline cursor-pointer"
              >
                Vaciar carrito
              </button>
              <span className="flex items-center gap-1 text-[10px] text-gold/80">
                🔒 Transferencia / SPEI / OXXO
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function FloatingCartButton() {
  const { totalCount, subtotal, openCart } = useCart();

  if (totalCount === 0) return null;

  return (
    <button
      onClick={openCart}
      aria-label="Ver carrito ceremonial"
      className="fixed bottom-24 right-5 sm:right-6 z-40 px-4 py-2.5 rounded-full bg-charcoal/95 border border-gold/70 text-parchment shadow-[0_0_25px_rgba(198,160,82,0.4)] backdrop-blur-md hover:scale-105 hover:border-gold transition-all flex items-center gap-2.5 cursor-pointer group"
    >
      <span className="text-lg group-hover:scale-110 transition-transform text-gold">🛒</span>
      <div className="flex flex-col text-left">
        <span className="text-[10px] uppercase tracking-wider text-gold font-sans font-semibold">
          Carrito ({totalCount})
        </span>
        <span className="text-xs font-serif text-parchment font-light">
          ${subtotal.toLocaleString("es-MX")} MXN
        </span>
      </div>
      <span className="w-2 h-2 rounded-full bg-gold animate-ping ml-1" />
    </button>
  );
}
