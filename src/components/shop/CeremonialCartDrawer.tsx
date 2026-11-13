"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { CeremonialCheckoutModal } from "./CeremonialCheckoutModal";
import { PaymentMethodsBadges } from "./PaymentMethodsBadges";

export function CeremonialCartDrawer() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { dict } = useLanguage();
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

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!isCartOpen || !mounted) return null;

  const validThreshold = freeShippingThreshold > 0 ? freeShippingThreshold : 1480;
  const safeSubtotal = Number(subtotal) || 0;
  const safeAmountNeeded = Math.max(0, Number(amountNeededForFreeShipping) || (validThreshold - safeSubtotal));
  const freeShippingProgress = Math.min(100, Math.max(0, (safeSubtotal / validThreshold) * 100));

  const cartDict = dict?.cart || {
    title: "Carrito Ceremonial",
    selectedPieces_one: "pieza seleccionada",
    selectedPieces_other: "piezas seleccionadas",
    emptyTitle: "Tu Carrito está Vacío",
    emptySubtitle: "Aún no has agregado talismanes o piezas consagradas.",
    exploreBoutique: "Explorar la Boutique",
    freeShippingSuccess: "¡Felicidades! Tu pedido califica para Envío Express Gratis a todo México.",
    freeShippingProgressPrefix: "Agrega",
    freeShippingProgressSuffix: "más para Envío Gratis",
    subtotal: "Subtotal",
    freeShippingBadge: "Envío Express Gratis",
    freeShippingNote: "Calculado al finalizar",
    proceedToCheckout: "Proceder al Pago",
    orderViaWhatsApp: "Ordenar por WhatsApp",
    secureCheckoutNote: "Pago 100% seguro con Mercado Pago, Stripe o SPEI",
    clearCart: "Vaciar Carrito",
    closeCart: "Cerrar carrito",
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex justify-end">
      {/* Backdrop con desenfoque ceremonial */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer deslizante desde la derecha */}
      <div className="relative w-full max-w-md bg-[#0F0D15] border-l border-[#C5A059]/40 shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_30px_rgba(197,160,89,0.2)] flex flex-col h-full z-10 animate-in slide-in-from-right duration-300 text-white">
        
        {/* 1. Header del Carrito */}
        <div className="p-5 sm:p-6 border-b border-[#C5A059]/20 flex items-center justify-between bg-black/60">
          <div className="flex items-center gap-2.5">
            <span className="text-xl text-[#C5A059]">🛒</span>
            <div>
              <h3 className="font-serif text-lg sm:text-xl text-[#F5F2EB] font-light">
                {cartDict.title}
              </h3>
              <span className="text-[11px] text-neutral-400 font-sans uppercase tracking-widest">
                {totalCount} {totalCount === 1 ? cartDict.selectedPieces_one : cartDict.selectedPieces_other}
              </span>
            </div>
          </div>

          <button
            onClick={closeCart}
            className="w-9 h-9 rounded-full bg-black/80 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-all text-sm cursor-pointer"
            aria-label={cartDict.closeCart}
          >
            ✕
          </button>
        </div>

        {/* 2. Barra de Progreso de Envío Gratis */}
        <div className="px-5 sm:px-6 py-3 bg-gradient-to-r from-black via-[#14121A] to-black border-b border-[#C5A059]/15 text-xs font-sans">
          {hasFreeShipping ? (
            <div className="flex items-center gap-2 text-[#C5A059] font-medium">
              <span>✨</span>
              <span>{cartDict.freeShippingSuccess}</span>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center text-neutral-400 mb-1.5 text-[11px]">
                <span>
                  {cartDict.freeShippingProgressPrefix}{" "}
                  <strong className="text-white">MXN ${safeAmountNeeded.toLocaleString("es-MX")}</strong>{" "}
                  {cartDict.freeShippingProgressSuffix}
                </span>
                <span className="text-[#C5A059] font-medium">{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-[#C5A059]/20">
                <div
                  className="h-full bg-gradient-to-r from-[#C5A059]/60 to-[#C5A059] transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* 3. Lista de Artículos */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400">
              <span className="text-4xl text-[#C5A059]/40 mb-3">ᛟ</span>
              <p className="font-serif text-lg text-white mb-2">{cartDict.emptyTitle}</p>
              <p className="text-xs font-sans leading-relaxed max-w-xs mb-6">
                {cartDict.emptySubtitle}
              </p>
              <button
                onClick={closeCart}
                className="px-5 py-2.5 rounded text-xs uppercase tracking-[0.2em] font-sans font-medium text-black bg-[#C5A059] hover:bg-[#d8b368] transition-all shadow-md cursor-pointer"
              >
                {cartDict.exploreBoutique}
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg border border-[#C5A059]/25 bg-black/60 flex gap-3.5 items-start group hover:border-[#C5A059]/50 transition-colors"
              >
                {/* Miniatura */}
                <div className="relative w-16 h-16 rounded overflow-hidden bg-black/50 border border-[#C5A059]/30 flex-shrink-0">
                  <Image
                    src={item.imageUrl || "/images/shop/pulseras/brazalete-arcano-i-el-mago-amatista-obsidiana.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                {/* Detalles de la pieza */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="font-serif text-sm text-[#F5F2EB] font-light leading-snug line-clamp-2">
                      {item.name}
                    </h4>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-neutral-500 hover:text-red-400 transition-colors text-xs p-1 cursor-pointer"
                      title="Eliminar del carrito"
                    >
                      ✕
                    </button>
                  </div>

                  {item.optionLabel && (
                    <span className="inline-block text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#C5A059]/15 text-[#C5A059] font-sans font-medium mt-1">
                      {item.optionLabel}
                    </span>
                  )}

                  {item.hasGoldSpecs && (
                    <span className="inline-block text-[10px] text-[#C5A059]/90 font-sans mt-0.5 ml-1">
                      ⚜️ Oro 18K
                    </span>
                  )}

                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#C5A059]/10">
                    {/* Controles de cantidad */}
                    <div className="flex items-center border border-[#C5A059]/30 rounded bg-neutral-900 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-neutral-400 hover:text-[#C5A059] hover:bg-[#C5A059]/10 transition-colors cursor-pointer"
                        title="Disminuir"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-xs font-sans text-white font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-neutral-400 hover:text-[#C5A059] hover:bg-[#C5A059]/10 transition-colors cursor-pointer"
                        title="Aumentar"
                      >
                        +
                      </button>
                    </div>

                    {/* Precio de línea */}
                    <span className="font-serif text-sm text-[#C5A059] font-medium">
                      MXN ${((Number(item.price) || 0) * (Number(item.quantity) || 1)).toLocaleString("es-MX")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 4. Footer con Totales y Botón de Checkout por WhatsApp */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-[#C5A059]/25 bg-black/90 space-y-4">
            <div className="space-y-1.5 text-xs font-sans">
              <div className="flex justify-between text-neutral-400">
                <span>{cartDict.subtotal} ({totalCount} {totalCount === 1 ? cartDict.selectedPieces_one : cartDict.selectedPieces_other})</span>
                <span>MXN ${safeSubtotal.toLocaleString("es-MX")}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>{hasFreeShipping ? cartDict.freeShippingBadge : "Envío"}</span>
                <span className={hasFreeShipping ? "text-[#C5A059] font-medium" : "text-neutral-400"}>
                  {hasFreeShipping ? "Gratis (Express)" : cartDict.freeShippingNote}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif text-white pt-2 border-t border-[#C5A059]/15">
                <span className="text-[#C5A059]">Total</span>
                <span className="font-medium text-[#C5A059]">MXN ${safeSubtotal.toLocaleString("es-MX")}</span>
              </div>
            </div>

            {/* Botón Principal: Checkout Multicanal Seguro */}
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="w-full py-3.5 px-4 rounded-lg bg-gradient-to-r from-[#C5A059] via-[#d8b368] to-[#C5A059] text-black font-sans text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-[0_0_25px_rgba(197,160,89,0.4)] hover:shadow-[0_0_35px_rgba(197,160,89,0.6)] hover:scale-[1.01] flex items-center justify-center gap-2 text-center group cursor-pointer"
            >
              <span className="text-base group-hover:scale-110 transition-transform">🔒</span>
              <span>{cartDict.proceedToCheckout}</span>
              <span>→</span>
            </button>

            {/* Micro-badges de Métodos Oficiales con Logos */}
            <div className="p-2.5 rounded-lg bg-black/70 border border-[#C5A059]/20 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-neutral-300 font-mono">
                <span className="text-[#C5A059] font-semibold uppercase tracking-wider">Métodos Aceptados:</span>
                <span className="text-emerald-400 font-bold">🔒 100% CIFRADO 3DS</span>
              </div>
              <div className="pt-1">
                <PaymentMethodsBadges />
              </div>
            </div>

            {/* Botón Secundario de Asistencia WhatsApp */}
            <a
              href={getWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-lg border border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-900/40 text-emerald-400 font-sans text-[11px] uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 text-center group cursor-pointer"
            >
              <span className="text-sm group-hover:scale-110 transition-transform">💬</span>
              <span>{cartDict.orderViaWhatsApp}</span>
              <span>↗</span>
            </a>

            {/* Acciones Secundarias & Confianza */}
            <div className="flex items-center justify-between text-[11px] text-neutral-500 font-sans pt-1">
              <button
                onClick={clearCart}
                className="hover:text-red-400 transition-colors underline cursor-pointer"
              >
                {cartDict.clearCart}
              </button>
              <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                <span>🛡️</span>
                <span>{cartDict.secureCheckoutNote}</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Modal Ceremonial de Checkout Multicanal */}
      <CeremonialCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>,
    document.body
  );
}

export function FloatingCartButton() {
  const pathname = usePathname();
  const { totalCount, subtotal, openCart, isCartOpen } = useCart();

  if (pathname?.startsWith("/invierno") || totalCount === 0 || isCartOpen) return null;

  return (
    <button
      onClick={openCart}
      aria-label="Ver carrito ceremonial"
      style={{
        position: "fixed",
        bottom: "max(9.5rem, calc(env(safe-area-inset-bottom, 0px) + 9.5rem))",
        right: "max(1.25rem, calc(env(safe-area-inset-right, 0px) + 1.25rem))",
        top: "auto",
      }}
      className="z-40 px-4 py-2.5 rounded-full bg-[#14121d]/95 border border-gold/70 text-parchment shadow-[0_0_25px_rgba(198,160,82,0.45)] backdrop-blur-md hover:scale-105 hover:border-gold transition-all hidden md:flex items-center gap-2.5 cursor-pointer group"
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
