"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArcanoLogo } from "@/components/ArcanoLogo";
import { getAssetPath } from "@/lib/utils";
import { trackWhatsAppConversion } from "@/lib/analytics";

// Mensaje directo y sin fricción para el enlace wa.me
const WHATSAPP_PHONE = "528121912778";
const WHATSAPP_RAW_MESSAGE = "Hola, vi el video del Arcano de Invierno en YouTube y quiero apartar mi pulsera con la promoción del Porta Incienso Áurico. ¿Me ayudas con mi medida?";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_RAW_MESSAGE)}`;

const IMAGES = [
  {
    src: "/images/shop/invierno/pulsera-lapislazuli-producto-marmol.jpg",
    alt: "Pulsera de Lapislázuli de Invierno — Vista completa sobre mármol blanco",
    title: "Pulsera",
    icon: "💎",
  },
  {
    src: "/images/shop/invierno/pulsera-lapislazuli-en-muneca.jpg",
    alt: "Pulsera de Lapislázuli de Invierno — Puesta en muñeca con blazer",
    title: "En Muñeca",
    icon: "🖐️",
  },
  {
    src: "/images/shop/invierno/pulsera-lapislazuli-porte-traje.jpg",
    alt: "Pulsera de Lapislázuli de Invierno — Porte elegante con traje y mancuernillas",
    title: "Con Traje",
    icon: "👔",
  },
  {
    src: "/images/shop/invierno/pulsera-lapislazuli-macro-pirita.jpg",
    alt: "Pulsera de Lapislázuli de Invierno — Detalle macro de las cuentas con pirita dorada",
    title: "Macro Pirita",
    icon: "🔍",
  },
  {
    src: "/images/shop/invierno/pulsera-lapislazuli-sahumado-palosanto.jpg",
    alt: "Pulsera de Lapislázuli de Invierno — En mano con palo santo humeante",
    title: "Palo Santo",
    icon: "🔥",
  },
];

export default function InviernoLandingPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleWhatsAppClick = (source: string) => {
    trackWhatsAppConversion({
      source,
      value: 1299,
      currency: "MXN",
      item_name: "Pulsera de Lapislázuli Invierno + Porta Incienso Áurico",
    });
  };

  return (
    <div
      data-landing-invierno="true"
      className="min-h-screen bg-[#07060A] text-[#F3EFE6] font-sans selection:bg-[#D4AF37]/30 selection:text-white -mt-20 sm:-mt-24 -mb-20 md:mb-0 pb-28 md:pb-16 overflow-x-hidden relative"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. TOP BAR DE URGENCIA & PROMOCIÓN
         ───────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#120F08] via-[#2A210E] to-[#120F08] border-b border-[#D4AF37]/40 py-2.5 px-4 text-center sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-md mx-auto flex items-center justify-center gap-2 text-[10px] sm:text-xs font-serif tracking-[0.18em] uppercase text-[#FFE2A4]">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>✦ ENVÍO GRATIS A TODO MÉXICO · PORTA INCIENSO ÁURICO DE REGALO (PRIMERAS 100 PIEZAS) ✦</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CABECERA LIMPIA SIN DISTRACCIONES (CERO SALIDAS)
         ───────────────────────────────────────────────────────────── */}
      <header className="py-6 px-4 text-center border-b border-neutral-900/80 bg-black/40 backdrop-blur-sm">
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className="w-36 sm:w-44 mb-1">
            <ArcanoLogo variant="emblem" className="w-full h-auto mx-auto" />
          </div>
          <span className="text-[10px] tracking-[0.35em] uppercase text-[#D4AF37] font-mono mt-1">
            ARCANO SABIDURÍA · ALTA JOYERÍA MINERAL
          </span>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          3. HERO SECTION CRO (DISEÑADA PARA MÓVIL Y COMPRA DIRECTA)
         ───────────────────────────────────────────────────────────── */}
      <main className="max-w-xl mx-auto px-4 pt-6 sm:pt-10">
        
        {/* Badge de Contexto de YouTube */}
        <div className="text-center mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-300 text-[10px] sm:text-xs font-mono tracking-wider uppercase">
            <span className="text-red-400">▶</span> Edición Especial de YouTube Shorts
          </span>
        </div>

        {/* Título Directo, Claro y Convincente */}
        <div className="text-center space-y-2 mb-6">
          <h1 className="font-serif text-2xl sm:text-4xl text-white font-normal tracking-wide uppercase leading-tight">
            Colección de Invierno: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFE2A4] via-[#D4AF37] to-[#B8860B] font-medium">
              Pulsera de Lapislázuli Natural
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 font-serif leading-relaxed max-w-md mx-auto">
            Pieza forjada a mano con <strong className="text-white font-medium">cuentas seleccionadas de 8mm de lapislázuli auténtico</strong> e incrustaciones doradas de pirita natural. Armada a tu medida exacta para máxima resistencia y comodidad diaria.
          </p>
        </div>

        {/* Visor Central de la Pulsera (Alta Resolución) */}
        <div className="relative bg-[#0D0D12] border border-[#D4AF37]/40 rounded-2xl p-3 sm:p-4 shadow-[0_0_40px_rgba(212,175,55,0.15)] mb-6">
          
          {/* Badges Flotantes */}
          <div className="absolute top-5 left-5 z-20">
            <span className="inline-block px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md border border-[#D4AF37]/60 text-[9px] font-mono tracking-widest text-[#FFE2A4] uppercase shadow-lg">
              ✨ 100% Mineral Natural
            </span>
          </div>

          <div className="absolute top-5 right-5 z-20">
            <span className="inline-block px-3 py-1 rounded-full bg-[#25D366]/25 backdrop-blur-md border border-[#25D366]/60 text-[9px] font-mono tracking-widest text-[#25D366] uppercase font-bold shadow-lg">
              🚚 Envío Gratis
            </span>
          </div>

          {/* Imagen Principal */}
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-black border border-neutral-800">
            <Image
              src={getAssetPath(IMAGES[activeImageIndex].src)}
              alt={IMAGES[activeImageIndex].alt}
              fill
              priority
              sizes="(max-width: 640px) 100vw, 550px"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Selector de Ángulos (5 tomas reales verificadas) */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2 mt-3">
            {IMAGES.map((img, idx) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`py-2 px-1.5 sm:px-2 rounded-lg text-[10px] sm:text-[11px] font-serif transition-all border flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer ${
                  activeImageIndex === idx
                    ? "bg-[#D4AF37]/20 border-[#D4AF37] text-[#FFE2A4] shadow-[0_0_12px_rgba(212,175,55,0.3)] font-semibold"
                    : "bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                }`}
              >
                <span className="text-xs">{img.icon}</span>
                <span className="truncate">{img.title}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Tarjeta de Inversión y Oferta Directa */}
        <div className="bg-gradient-to-b from-[#14121B] to-[#0A0910] border border-[#D4AF37]/50 rounded-2xl p-5 sm:p-6 mb-8 text-center space-y-4 shadow-xl">
          
          <div className="flex items-center justify-center gap-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 line-through">
              Precio Regular: $1,990 MXN
            </span>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded-full border border-[#25D366]/30 font-semibold">
              35% OFF
            </span>
          </div>

          <div>
            <div className="text-3xl sm:text-5xl font-serif text-[#FFE2A4] font-medium tracking-tight">
              $1,299 <span className="text-xl font-light text-neutral-300">MXN</span>
            </div>
            <p className="text-[11px] text-[#25D366] font-mono uppercase tracking-wider font-semibold mt-1">
              ✦ ENVÍO GRATIS A TODO MÉXICO INCLUIDO ✦
            </p>
            <p className="text-[11px] text-[#FFE2A4] font-serif font-medium mt-1">
              🎁 Incluye de Regalo: Porta Incienso Áurico (Primeras 100 Piezas)
            </p>
          </div>

          {/* Banner de Envío Express y Recolección */}
          <div className="p-2.5 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 text-[11px] text-[#25D366] font-serif font-medium text-center">
            <span className="flex items-center gap-1.5">
              <span>🚚</span>
              <span>Envío Gratis Express a Todo México (24-48 hrs)</span>
            </span>
            <span className="hidden sm:inline text-neutral-500">•</span>
            <span className="flex items-center gap-1.5 text-[#FFE2A4]">
              <span>📍</span>
              <span>O Recolección en Persona (Agua Fría, N.L.)</span>
            </span>
          </div>

          {/* CTA Principal de la Sección */}
          <a
            id="btn-whatsapp-invierno-hero"
            data-gtm="whatsapp-conversion"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleWhatsAppClick("hero_price_card")}
            className="w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-black font-sans font-bold text-sm sm:text-base tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(37,211,102,0.5)] flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">💬</span>
            <span className="leading-tight text-left sm:text-center">
              Apartar Mi Pulsera por WhatsApp
              <span className="block text-[10px] font-normal tracking-normal text-black/80">
                Atención directa para confirmar tu medida en 1 minuto
              </span>
            </span>
          </a>

          {/* Confianza Inmediata */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800 text-[10px] text-neutral-400 font-serif">
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-[#D4AF37]">📦</span>
              <span>Envío Express Asegurado</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-[#D4AF37]">🛡️</span>
              <span>Garantía Mineral 100%</span>
            </div>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            NUEVA SECCIÓN: PROMOCIÓN ESPECIAL PORTA INCIENSO ÁURICO (PRIMERAS 100)
           ───────────────────────────────────────────────────────────── */}
        <section className="mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#181308] via-[#0E0C08] to-[#0A090D] border-2 border-[#D4AF37]/60 shadow-[0_0_35px_rgba(212,175,55,0.2)] text-left space-y-4 relative overflow-hidden">
          
          {/* Badge Destacado de Promoción */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D4AF37]/30 pb-3">
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#FFE2A4] text-[10px] sm:text-xs font-mono uppercase tracking-widest font-bold">
              🎁 PROMOCIÓN ESPECIAL DE LANZAMIENTO
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-red-950/80 border border-red-500/50 text-red-300 text-[10px] font-mono tracking-wider font-semibold">
              ⚡ SOLO PRIMERAS 100 PIEZAS
            </span>
          </div>

          <div>
            <h2 className="font-serif text-lg sm:text-2xl text-white font-medium">
              Porta Incienso Áurico de Regalo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFE2A4] via-[#D4AF37] to-[#B8860B]">
                En Cada Compra (Valor Comercial: $350 MXN Gratis)
              </span>
            </h2>
            <p className="text-xs text-neutral-300 font-serif leading-relaxed mt-1.5">
              Por lanzamiento de temporada, las primeras 100 personas que adquieran su pulsera de lapislázuli reciben <strong className="text-white">sin costo adicional</strong> esta pieza escultórica de piedra mineral pesada con acabado áureo para ambientar su hogar, oficina o espacio sagrado.
            </p>
          </div>

          {/* Fotografía de Alta Calidad del Porta Incienso Áurico */}
          <div className="relative aspect-square sm:aspect-[4/3] w-full rounded-xl overflow-hidden bg-black border border-[#D4AF37]/40 shadow-xl group">
            <Image
              src={getAssetPath("/images/shop/invierno/porta-incienso-aurico.jpg")}
              alt="Porta Incienso Áurico artesanal de piedra mineral con baño áureo - Regalo exclusivo Arcano"
              fill
              sizes="(max-width: 640px) 100vw, 550px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 rounded-lg p-2.5 flex items-center justify-between text-[11px] font-serif text-[#FFE2A4]">
              <span className="flex items-center gap-1.5">
                <span>🔥</span>
                <span>Piedra mineral pesada + Baño áureo + Orificio calibrado</span>
              </span>
              <span className="font-mono text-[#25D366] font-bold">100% GRATIS</span>
            </div>
          </div>

          {/* 3 Razones Concretas del Regalo */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs font-serif text-neutral-300">
            <div className="p-3 rounded-lg bg-black/40 border border-neutral-800 space-y-1">
              <span className="text-sm">🪨</span>
              <p className="font-medium text-white text-[11px]">Base Mineral Pesada</p>
              <p className="text-[10px] text-neutral-400">No se voltea ni se desestabiliza con la varita encendida.</p>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-neutral-800 space-y-1">
              <span className="text-sm">✨</span>
              <p className="font-medium text-white text-[11px]">Acabado Dorado Fino</p>
              <p className="text-[10px] text-neutral-400">Detalle elegante que viste cualquier mesa o buró.</p>
            </div>
            <div className="p-3 rounded-lg bg-black/40 border border-neutral-800 space-y-1">
              <span className="text-sm">⏳</span>
              <p className="font-medium text-white text-[11px]">Inventario Limitado</p>
              <p className="text-[10px] text-neutral-400">Solo 100 unidades forjadas para esta promoción.</p>
            </div>
          </div>

          {/* Mini CTA hacia WhatsApp con la promoción */}
          <a
            id="btn-whatsapp-invierno-promo"
            data-gtm="whatsapp-conversion"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleWhatsAppClick("promo_porta_incienso")}
            className="w-full py-3 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/50 text-[#25D366] font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>💬 Apartar Pulsera + Reclamar Porta Incienso Gratis</span>
            <span>→</span>
          </a>

        </section>

        {/* ─────────────────────────────────────────────────────────────
            4. LOS 3 BENEFICIOS TÉCNICOS Y REALES (CERO FANTASÍA)
           ───────────────────────────────────────────────────────────── */}
        <section className="space-y-4 mb-10">
          <div className="text-center mb-6">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#D4AF37] block mb-1">
              CALIDAD DE MATERIALES
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-white font-light tracking-wide uppercase">
              Por Qué Esta Pulsera Dura Toda la Vida
            </h2>
          </div>

          {/* Viñeta 1: Lapislázuli & Pirita Real */}
          <div className="bg-[#0C0B10] border border-neutral-800/90 rounded-xl p-4 sm:p-5 flex items-start gap-4 hover:border-[#D4AF37]/50 transition-colors">
            <div className="w-11 h-11 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0 text-xl text-[#FFE2A4]">
              💎
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-sm sm:text-base text-white font-medium">
                Lapislázuli 100% Genuino (Cuentas 8mm)
              </h3>
              <p className="text-xs text-neutral-300 font-serif leading-relaxed">
                Piedra natural auténtica extraída de veta mineral, no es plástico teñido ni resina sintética. Cada cuenta presenta su textura azul índigo con vetas doradas de pirita natural. Se siente fría y pesada en mano al instante.
              </p>
            </div>
          </div>

          {/* Viñeta 2: Elasticidad Reforzada */}
          <div className="bg-[#0C0B10] border border-neutral-800/90 rounded-xl p-4 sm:p-5 flex items-start gap-4 hover:border-[#D4AF37]/50 transition-colors">
            <div className="w-11 h-11 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0 text-xl text-[#FFE2A4]">
              🛡️
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-sm sm:text-base text-white font-medium">
                Hilo Elástico de Máxima Tenacidad
              </h3>
              <p className="text-xs text-neutral-300 font-serif leading-relaxed">
                Armada artesanalmente con elastómero reforzado multicapa con memoria perpetua. No se afloja, no pierde tensión con el uso continuo ni al lavarte las manos y resiste el roce del día a día.
              </p>
            </div>
          </div>

          {/* Viñeta 3: Hecha a la Medida Exacta */}
          <div className="bg-[#0C0B10] border border-neutral-800/90 rounded-xl p-4 sm:p-5 flex items-start gap-4 hover:border-[#D4AF37]/50 transition-colors">
            <div className="w-11 h-11 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0 text-xl text-[#FFE2A4]">
              📏
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-sm sm:text-base text-white font-medium">
                Calibrada a tu Medida Exacta de Muñeca
              </h3>
              <p className="text-xs text-neutral-300 font-serif leading-relaxed">
                No vendemos una medida genérica que te corte la circulación o se te caiga. Al hacer tu pedido por WhatsApp, te indicamos en 1 minuto cómo medir tu muñeca para ensamblar la pieza exactamente a tus centímetros.
              </p>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            GALERÍA EDITORIAL: PORTE, DISTINCIÓN Y ESTILO REAL
           ───────────────────────────────────────────────────────────── */}
        <section className="mb-10 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
              <Image
                src={getAssetPath("/images/shop/invierno/pulsera-lapislazuli-blazer-porte.jpg")}
                alt="Porte y distinción con Lapislázuli"
                fill
                sizes="(max-width: 640px) 50vw, 280px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[10px] font-serif text-[#FFE2A4] font-light">Elegancia con Traje o Casual</span>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
              <Image
                src={getAssetPath("/images/shop/invierno/pulsera-lapislazuli-editorial-2.jpg")}
                alt="Detalle de lapislázuli con pirita"
                fill
                sizes="(max-width: 640px) 50vw, 280px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                <span className="text-[10px] font-serif text-[#FFE2A4] font-light">Brillo Natural de Pirita</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            5. QUÉ RECIBIRÁS EN TU HOGAR (UNBOXING CLARO Y TRANSPARENTE)
           ───────────────────────────────────────────────────────────── */}
        <section className="bg-[#0E0D14] border border-[#D4AF37]/30 rounded-2xl p-5 sm:p-6 mb-10 text-center space-y-4">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#D4AF37] block">
            CONTENIDO DEL PAQUETE
          </span>
          <h3 className="font-serif text-lg sm:text-xl text-white font-light uppercase">
            Tu Pedido Incluye
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left pt-2">
            <div className="p-3.5 rounded-lg bg-black/50 border border-neutral-800/80 space-y-1">
              <span className="text-base">💎</span>
              <p className="text-xs font-serif text-white font-medium">Pulsera de Lapislázuli Natural</p>
              <p className="text-[10px] text-neutral-400 font-serif">Calibrada a tu medida exacta de muñeca</p>
            </div>
            <div className="p-3.5 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/40 space-y-1">
              <span className="text-base">🎁</span>
              <p className="text-xs font-serif text-[#FFE2A4] font-medium">Porta Incienso Áurico (Gratis)</p>
              <p className="text-[10px] text-neutral-300 font-serif">Regalo exclusivo en las primeras 100 compras</p>
            </div>
            <div className="sm:col-span-2 p-3 rounded-lg bg-black/50 border border-neutral-800/80 space-y-1">
              <span className="text-sm">🔮</span>
              <p className="text-xs font-serif text-white font-medium">Oráculo Personal</p>
              <p className="text-[10px] text-neutral-400 font-serif">Tarjeta ceremonial con el mensaje del arcano que acompaña tu pieza</p>
            </div>

            {/* Modalidad 1: Envío Gratis a Domicilio */}
            <div className="sm:col-span-2 p-3.5 rounded-lg bg-[#25D366]/10 border border-[#25D366]/40 flex items-start gap-3">
              <span className="text-xl flex-shrink-0">🚚</span>
              <div>
                <p className="text-xs font-serif text-[#25D366] font-semibold">Opción 1: Envío Gratis Express a Todo México</p>
                <p className="text-[10px] text-neutral-300 font-serif">Paquetería express asegurada (DHL / FedEx / Estafeta) con entrega de 24 a 48 horas y código de rastreo a tu WhatsApp.</p>
              </div>
            </div>

            {/* Modalidad 2: Recolección en Persona en Arcano Sabiduría */}
            <div className="sm:col-span-2 p-3.5 rounded-xl bg-black/70 border border-[#D4AF37]/50 space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="text-xl flex-shrink-0">📍</span>
                <div>
                  <p className="text-xs font-serif text-[#FFE2A4] font-semibold">
                    Opción 2: Recolección en Persona en Arcano Sabiduría
                  </p>
                  <p className="text-[11px] text-neutral-300 font-serif">
                    Morelos 654, Sector San Jorge, 66620 Agua Fría, N.L.
                  </p>
                  <p className="text-[10px] text-neutral-400 font-serif mt-0.5">
                    Entrega personal en mano con tu pieza lista y ajustada a tu muñeca (previa confirmación por WhatsApp).
                  </p>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="w-full rounded-lg overflow-hidden border border-neutral-800/80 shadow-inner bg-[#0C0B10]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14366.457051368692!2d-100.1367173!3d25.816296949999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662eee5ad0365d9%3A0x756c78f54dbd4e77!2sMorelos%20654%2C%20Sector%20San%20Jorge%2C%2066620%20Agua%20Fr%C3%ADa%2C%20N.L.!5e0!3m2!1ses-419!2smx!4v1794356140047!5m2!1ses-419!2smx"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Recolección en persona en Arcano Sabiduría - Morelos 654, Agua Fría, N.L."
                  className="w-full aspect-video sm:h-[220px]"
                />
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <span className="text-[10px] text-neutral-400 font-mono">Agua Fría, Apodaca / N.L.</span>
                <a
                  href="https://maps.google.com/?q=Morelos+654,+Sector+San+Jorge,+66620+Agua+Fr%C3%ADa,+N.L."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-[#D4AF37] hover:underline font-mono inline-flex items-center gap-1 font-semibold"
                >
                  Abrir en Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            6. PRUEBA SOCIAL / RESEÑAS REALES DE COMPRADORES
           ───────────────────────────────────────────────────────────── */}
        <section className="mb-10 space-y-4">
          <div className="text-center">
            <div className="text-[#D4AF37] text-sm tracking-widest mb-1">★★★★★</div>
            <p className="text-xs text-neutral-300 font-serif">
              Calificación <strong className="text-white">4.9 / 5</strong> en más de 200 piezas elaboradas
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <div className="p-4 rounded-xl bg-[#09080E] border border-neutral-800 text-xs font-serif space-y-2">
              <p className="text-neutral-200 leading-relaxed">
                &ldquo;Vi el video en YouTube y la pedí por WhatsApp. La piedra es pesada y fría, se nota de inmediato que es mineral auténtico con pirita dorada. Me llegó a San Pedro al día siguiente.&rdquo;
              </p>
              <span className="text-[10px] font-mono text-[#D4AF37] block">
                — Rodrigo M. · San Pedro Garza García
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#09080E] border border-neutral-800 text-xs font-serif space-y-2">
              <p className="text-neutral-200 leading-relaxed">
                &ldquo;El artesano me ayudó a medir mi muñeca en 2 minutos y me quedó perfecta. El porta incienso de regalo se ve increíble en mi escritorio. Totalmente recomendable.&rdquo;
              </p>
              <span className="text-[10px] font-mono text-[#D4AF37] block">
                — Claudia S. · Ciudad de México
              </span>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            7. PREGUNTAS FRECUENTES (RESPUESTAS DIRECTAS A OBJECIONES)
           ───────────────────────────────────────────────────────────── */}
        <section className="bg-black/60 border border-neutral-900 rounded-xl p-5 mb-12 space-y-3 text-xs font-serif text-neutral-300">
          <h4 className="font-serif text-sm text-white font-medium uppercase tracking-wider mb-2 text-center">
            Preguntas Frecuentes
          </h4>
          <div className="space-y-2.5">
            <div>
              <p className="text-white font-medium">¿Es piedra 100% natural?</p>
              <p className="text-neutral-400 text-[11px]">Sí. Solo trabajamos con lapislázuli auténtico con vetas de pirita mineral. No utilizamos plástico, resina ni vidrio pintado.</p>
            </div>
            <div className="pt-2 border-t border-neutral-800/70">
              <p className="text-white font-medium">¿Cómo sé la medida de mi muñeca?</p>
              <p className="text-neutral-400 text-[11px]">Al tocar el botón de WhatsApp, te mostramos en 30 segundos cómo medir tu muñeca con una tira de papel o regla para que te quede justa y cómoda.</p>
            </div>
            <div className="pt-2 border-t border-neutral-800/70">
              <p className="text-white font-medium">¿El Porta Incienso Áurico viene incluido gratis?</p>
              <p className="text-neutral-400 text-[11px]">Sí, para los primeros 100 pedidos de esta colección se envía de regalo junto con tu pulsera dentro del mismo paquete.</p>
            </div>
            <div className="pt-2 border-t border-neutral-800/70">
              <p className="text-white font-medium">¿Cuáles son las formas de pago?</p>
              <p className="text-neutral-400 text-[11px]">Transferencia SPEI a Mercado Pago o por WhatsApp Concierge directo con confirmación instantánea.</p>
            </div>
            <div className="pt-2 border-t border-neutral-800/70">
              <p className="text-white font-medium">¿Puedo recogerla en persona?</p>
              <p className="text-neutral-400 text-[11px]">Sí. Puedes recogerla directamente en Morelos 654, Sector San Jorge, Agua Fría, N.L. Coordinamos tu horario por WhatsApp para entregártela en mano.</p>
            </div>
            <div className="pt-2 border-t border-neutral-800/70">
              <p className="text-white font-medium">¿Cuánto tarda el envío a domicilio?</p>
              <p className="text-neutral-400 text-[11px]">Enviamos por paquetería express asegurada (FedEx / DHL / Estafeta) con entrega en 24 a 48 horas en cualquier parte de México.</p>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            7.5 DESCUBRIR OTRAS PIEZAS (SALIDA SECUNDARIA SEGURA / ZERO DISTRACCIÓN HERO)
           ───────────────────────────────────────────────────────────── */}
        <section className="bg-[#0B0A0F] border border-neutral-800/80 rounded-xl p-4 sm:p-5 mb-10 text-center space-y-2">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37] font-mono">
            ¿Buscas otra piedra o talismán?
          </p>
          <p className="text-xs text-neutral-400 font-serif max-w-sm mx-auto leading-relaxed">
            Explora las colecciones completas de alta joyería mineral, cuarzos y piezas de arte sagrado en nuestra boutique oficial.
          </p>
          <div className="pt-1">
            <Link
              href="/tienda/"
              className="inline-flex items-center gap-1.5 text-xs font-serif text-[#FFE2A4] hover:text-white border-b border-[#D4AF37]/50 hover:border-[#D4AF37] pb-0.5 transition-colors"
            >
              <span>Explorar Catálogo de la Tienda</span>
              <span>→</span>
            </Link>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            8. FOOTER MINIMALISTA
           ───────────────────────────────────────────────────────────── */}
        <footer className="text-center text-[10px] font-serif text-neutral-400 pb-12 space-y-2 border-t border-neutral-900 pt-6">
          <p className="tracking-widest uppercase text-neutral-300">
            ARCANO SABIDURÍA · MORELOS 654, AGUA FRÍA, N.L. · MÉXICO
          </p>
          <p className="space-x-3 text-neutral-500 text-[11px]">
            <Link href="/tienda/" className="hover:text-[#D4AF37] transition-colors underline">
              Boutique Completa
            </Link>
            <span>•</span>
            <Link href="/contacto/" className="hover:text-[#D4AF37] transition-colors underline">
              Contacto
            </Link>
          </p>
          <p>
            Colección Oficial de Invierno · Todos los derechos reservados © {new Date().getFullYear()}
          </p>
          <p className="text-[9px] text-neutral-400 font-mono">
            🔒 Compra Segura · Encriptación SSL 256-Bit · Garantía de Autenticidad Mineral
          </p>
        </footer>

      </main>

      {/* ─────────────────────────────────────────────────────────────
          9. STICKY BOTTOM CTA MASIVO (PERMANENTE EN MÓVIL)
         ───────────────────────────────────────────────────────────── */}
      <aside
        id="sticky-mobile-cta"
        className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-[#07060B]/95 backdrop-blur-xl border-t border-[#D4AF37]/50 shadow-[0_-8px_35px_rgba(0,0,0,0.95)] safe-area-bottom"
      >
        <div className="max-w-md mx-auto">
          <a
            id="btn-whatsapp-invierno-sticky"
            data-gtm="whatsapp-conversion"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleWhatsAppClick("sticky_bottom_cta")}
            className="w-full py-3.5 sm:py-4 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-black font-sans font-extrabold text-sm sm:text-base tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(37,211,102,0.6)] flex items-center justify-between gap-3 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl sm:text-3xl">💬</span>
              <div className="text-left leading-tight">
                <span className="block font-black text-xs sm:text-sm">APARTAR MI PULSERA</span>
                <span className="block text-[10px] font-bold text-black/90">
                  $1,299 MXN · ENVÍO GRATIS + REGALO PORTA INCIENSO
                </span>
              </div>
            </div>
            <div className="bg-black/15 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-widest font-bold flex items-center gap-1">
              <span>WHATSAPP</span>
              <span>→</span>
            </div>
          </a>
        </div>
      </aside>

    </div>
  );
}
