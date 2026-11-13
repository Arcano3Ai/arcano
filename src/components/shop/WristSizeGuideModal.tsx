"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface WristSizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WristSizeGuideModal({ isOpen, onClose }: WristSizeGuideModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl overflow-y-auto animate-fadeIn text-left font-sans"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] my-auto overflow-y-auto bg-[#0A0A0A] border border-[#C5A059]/50 p-5 sm:p-7 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.95)] text-white scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#161616] border border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer text-sm"
          aria-label="Cerrar guía de tallas"
        >
          ✕
        </button>

        {/* Encabezado */}
        <div className="text-center mb-5 pb-3 border-b border-neutral-800">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#C5A059] block mb-1">
            PRECISIÓN ARTESANAL · MEDIDA EXACTA
          </span>
          <h3 className="font-serif text-xl sm:text-2xl text-white font-normal uppercase">
            Guía de Medición de Muñeca
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Aprende a medir tu muñeca en 30 segundos con una regla y una tira de papel
          </p>
        </div>

        {/* Fotografía Editorial de la Medición */}
        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black border border-neutral-800 mb-5 shadow-lg">
          <Image
            src="/images/shop/guia-medir-muneca-brazalete.jpg"
            alt="Guía visual para medir la muñeca con regla y cinta métrica"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
            <span className="text-[11px] font-mono text-[#FFE2A4]">
              📐 Ajuste a la altura del hueso de la muñeca
            </span>
          </div>
        </div>

        {/* 3 Pasos Sencillos */}
        <div className="space-y-3 mb-6">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#C5A059] flex items-center gap-2">
            <span>3 PASOS SIMPLES (SIN CINTA DE COSTURA)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-[#111] border border-neutral-800 space-y-1">
              <span className="text-base font-bold text-[#C5A059]">1</span>
              <p className="font-medium text-white">Rodea tu muñeca</p>
              <p className="text-[11px] text-neutral-400 leading-snug">
                Pasa una tira de papel o hilo alrededor de tu muñeca, justo por encima del hueso.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#111] border border-neutral-800 space-y-1">
              <span className="text-base font-bold text-[#C5A059]">2</span>
              <p className="font-medium text-white">Marca el cruce</p>
              <p className="text-[11px] text-neutral-400 leading-snug">
                Con una pluma, marca el punto exacto donde la tira se une sin apretar.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#111] border border-neutral-800 space-y-1">
              <span className="text-base font-bold text-[#C5A059]">3</span>
              <p className="font-medium text-white">Mide con regla</p>
              <p className="text-[11px] text-neutral-400 leading-snug">
                Extiende la tira sobre una regla plana para ver los centímetros exactos.
              </p>
            </div>
          </div>
        </div>

        {/* Tabla Oficial de Tallas ARCANO */}
        <div className="mb-6 space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-[#C5A059]">
            TABLA DE TALLAS & CENTÍMETROS
          </h4>

          <div className="border border-neutral-800 rounded-xl overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-neutral-900/80 p-2.5 font-mono text-neutral-400 text-[10px] uppercase tracking-wider border-b border-neutral-800">
              <span>Talla</span>
              <span>Medida Muñeca</span>
              <span>Recomendación</span>
            </div>

            <div className="divide-y divide-neutral-800/60 bg-black/40">
              <div className="grid grid-cols-3 p-2.5 items-center">
                <span className="font-bold text-white">S (Small)</span>
                <span className="font-mono text-[#FFE2A4]">16 – 17 cm</span>
                <span className="text-neutral-400 text-[11px]">Muñeca delgada</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 items-center bg-[#C5A059]/10">
                <span className="font-bold text-[#FFE2A4]">M (Medium) ★</span>
                <span className="font-mono text-[#FFE2A4] font-bold">18 – 19 cm</span>
                <span className="text-emerald-400 text-[11px] font-medium">Estándar (90% de personas)</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 items-center">
                <span className="font-bold text-white">L (Large)</span>
                <span className="font-mono text-[#FFE2A4]">20 – 21 cm</span>
                <span className="text-neutral-400 text-[11px]">Muñeca ancha / complexión fuerte</span>
              </div>
              <div className="grid grid-cols-3 p-2.5 items-center">
                <span className="font-bold text-white">XL (Extra Large)</span>
                <span className="font-mono text-[#FFE2A4]">22 cm</span>
                <span className="text-neutral-400 text-[11px]">Muñeca robusta o porte holgado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tip de Ajuste */}
        <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-[11px] text-neutral-300 flex items-start gap-2.5 mb-5">
          <span className="text-base text-[#C5A059]">💡</span>
          <p className="leading-relaxed">
            <strong className="text-white">¿En duda entre dos tallas?</strong> Te sugerimos elegir la talla <strong className="text-[#FFE2A4]">M (18-19 cm)</strong>. El elastómero reforzado multicapa tiene tensión calibrada que se adapta con firmeza y comodidad al movimiento natural sin apretar ni quedar suelta.
          </p>
        </div>

        {/* Botón de Confirmación / Entendido */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#d8b368] hover:brightness-110 active:scale-98 text-black font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_20px_rgba(197,160,89,0.3)] text-center"
        >
          ✓ Entendido · Continuar con mi Compra
        </button>
      </div>
    </div>,
    document.body
  );
}

