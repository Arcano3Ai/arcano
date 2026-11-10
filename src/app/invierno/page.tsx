"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArcanoLogo } from "@/components/ArcanoLogo";
import { getAssetPath } from "@/lib/utils";

// Mensaje exacto solicitado para el enlace wa.me
const WHATSAPP_PHONE = "528121912778";
const WHATSAPP_RAW_MESSAGE = "Hola, vi el video del Arcano de Invierno en YouTube y quiero apartar el mío. ¿Me ayudas?";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_RAW_MESSAGE)}`;

const IMAGES = [
  {
    src: "/images/shop/pulseras/brazalete-arcano-i-el-mago-onix-lapislazuli.jpg",
    alt: "Pulsera de Lapislázuli de Invierno — Detalle mineral y pirita",
    title: "Detalle Mineral",
  },
  {
    src: "/images/shop/pulseras/brazalete-arcano-i-el-mago-onix-lapislazuli-lifestyle.jpg",
    alt: "Pulsera de Lapislázuli de Invierno — Vista en muñeca de alta gama",
    title: "Vista en Muñeca",
  },
];

export default function InviernoLandingPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div
      data-landing-invierno="true"
      className="min-h-screen bg-[#07060A] text-[#F3EFE6] font-sans selection:bg-[#D4AF37]/30 selection:text-white -mt-20 sm:-mt-24 -mb-20 md:mb-0 pb-28 md:pb-16 overflow-x-hidden relative"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. TOP BAR DE URGENCIA & CONTEXTO YOUTUBE
         ───────────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#120F08] via-[#2A210E] to-[#120F08] border-b border-[#D4AF37]/30 py-2.5 px-4 text-center sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-md mx-auto flex items-center justify-center gap-2 text-[11px] sm:text-xs font-serif tracking-[0.2em] uppercase text-[#FFE2A4]">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>✦ EDICIÓN DE SOLSTICIO · SÓLO 11 PIEZAS DISPONIBLES ✦</span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CABECERA LIMPIA SIN SALIDAS (CERO DISTRACCIONES)
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
          3. HERO SECTION MAGNETICA (PENSADA 100% PARA MÓVIL)
         ───────────────────────────────────────────────────────────── */}
      <main className="max-w-xl mx-auto px-4 pt-6 sm:pt-10">
        
        {/* Badge de Contexto de YouTube */}
        <div className="text-center mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-300 text-[10px] sm:text-xs font-mono tracking-wider uppercase">
            <span className="text-red-400">▶</span> Especial de YouTube Shorts
          </span>
        </div>

        {/* Título de Alto Impacto */}
        <div className="text-center space-y-2 mb-6">
          <h1 className="font-serif text-2xl sm:text-4xl text-white font-normal tracking-wide uppercase leading-tight">
            Colección de Invierno: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFE2A4] via-[#D4AF37] to-[#B8860B] font-medium">
              El Arcano que te Elige
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 font-serif leading-relaxed max-w-md mx-auto">
            Pulsera sagrada forjada con <strong className="text-white font-medium">Lapislázuli Afgano de grado ceremonial</strong> e inclusiones naturales de pirita dorada. Un talismán vivo de claridad, intuición y soberanía personal.
          </p>
        </div>

        {/* Visor Central de la Pulsera (Alta Calidad) */}
        <div className="relative bg-[#0D0D12] border border-[#D4AF37]/40 rounded-2xl p-3 sm:p-4 shadow-[0_0_40px_rgba(212,175,55,0.15)] mb-6">
          
          {/* Badge Flotante de Autenticidad */}
          <div className="absolute top-5 left-5 z-20">
            <span className="inline-block px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md border border-[#D4AF37]/60 text-[9px] font-mono tracking-widest text-[#FFE2A4] uppercase shadow-lg">
              ✨ Mineral 100% Natural
            </span>
          </div>

          <div className="absolute top-5 right-5 z-20">
            <span className="inline-block px-2.5 py-1 rounded-full bg-[#25D366]/20 backdrop-blur-md border border-[#25D366]/50 text-[9px] font-mono tracking-widest text-[#25D366] uppercase font-bold shadow-lg">
              Envío Gratis
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

          {/* Selector de Ángulos (2 tomas limpias) */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            {IMAGES.map((img, idx) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`py-2 px-3 rounded-lg text-[11px] font-serif transition-all border flex items-center justify-center gap-1.5 cursor-pointer ${
                  activeImageIndex === idx
                    ? "bg-[#D4AF37]/15 border-[#D4AF37] text-[#FFE2A4] shadow-[0_0_12px_rgba(212,175,55,0.25)]"
                    : "bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700"
                }`}
              >
                <span>{idx === 0 ? "🔍" : "🖐️"}</span>
                <span>{img.title}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Tarjeta de Inversión / Oferta de Temporada */}
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
            <p className="text-[11px] text-[#D4AF37] font-serif italic mt-1">
              ✦ Incluye Consagración Personalizada + Caja de Resguardo + Envío Asegurado ✦
            </p>
          </div>

          {/* CTA Principal de la Sección */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-black font-sans font-bold text-sm sm:text-base tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(37,211,102,0.5)] flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">💬</span>
            <span className="leading-tight text-left sm:text-center">
              Apartar Mi Arcano por WhatsApp
              <span className="block text-[10px] font-normal tracking-normal text-black/80">
                Respuesta directa con el Maestro Artesano
              </span>
            </span>
          </a>

          {/* Confianza Rápida */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800 text-[10px] text-neutral-400 font-serif">
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-[#D4AF37]">📦</span>
              <span>Envío Gratis a Todo México</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-[#D4AF37]">🛡️</span>
              <span>Garantía Mineral 100%</span>
            </div>
          </div>

        </div>

        {/* ─────────────────────────────────────────────────────────────
            4. LOS 3 BENEFICIOS MÍSTICOS DIRECTOS (ALTA JOYERÍA)
           ───────────────────────────────────────────────────────────── */}
        <section className="space-y-4 mb-10">
          <div className="text-center mb-6">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#D4AF37] block mb-1">
              MAGIA NATURAL & MAESTRÍA
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-white font-light tracking-wide uppercase">
              Por Qué Esta Pieza es Única
            </h2>
          </div>

          {/* Viñeta 1: Lapislázuli & Pirita */}
          <div className="bg-[#0C0B10] border border-neutral-800/90 rounded-xl p-4 sm:p-5 flex items-start gap-4 hover:border-[#D4AF37]/50 transition-colors">
            <div className="w-11 h-11 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0 text-xl text-[#FFE2A4]">
              🌌
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-sm sm:text-base text-white font-medium">
                Lapislázuli Genuino con Pirita Dorada
              </h3>
              <p className="text-xs text-neutral-300 font-serif leading-relaxed">
                El mineral de la realeza y la alquimia antigua. Cuentas naturales calibradas de 8mm que activan la intuición superior, despejan la niebla mental y protegen tu campo áurico de energías discordantes.
              </p>
            </div>
          </div>

          {/* Viñeta 2: Alta Joyería & Tenacidad */}
          <div className="bg-[#0C0B10] border border-neutral-800/90 rounded-xl p-4 sm:p-5 flex items-start gap-4 hover:border-[#D4AF37]/50 transition-colors">
            <div className="w-11 h-11 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0 text-xl text-[#FFE2A4]">
              ⚔️
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-sm sm:text-base text-white font-medium">
                Liga de Alta Tenacidad & Tapa-Nudo Protector
              </h3>
              <p className="text-xs text-neutral-300 font-serif leading-relaxed">
                Armada sobre polímero elastómero alemán reforzado con memoria perpetua. El nudo central queda sellado bajo un cilindro protector de acero bañado en oro ritual para una durabilidad indestructible.
              </p>
            </div>
          </div>

          {/* Viñeta 3: Consagración Ritual Personalizada */}
          <div className="bg-[#0C0B10] border border-neutral-800/90 rounded-xl p-4 sm:p-5 flex items-start gap-4 hover:border-[#D4AF37]/50 transition-colors">
            <div className="w-11 h-11 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0 text-xl text-[#FFE2A4]">
              🕯️
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-sm sm:text-base text-white font-medium">
                Consagración Ritual con tu Nombre y Fecha
              </h3>
              <p className="text-xs text-neutral-300 font-serif leading-relaxed">
                No es un accesorio industrial inerte: antes de ser empacada, la pulsera pasa por un sahumado ceremonial con copal de Oaxaca y es sintonizada con tu energía en nuestro santuario de Monterrey.
              </p>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            5. QUÉ RECIBIRÁS EN TU HOGAR (UNBOXING CEREMONIAL)
           ───────────────────────────────────────────────────────────── */}
        <section className="bg-[#0E0D14] border border-[#D4AF37]/30 rounded-2xl p-5 sm:p-6 mb-10 text-center space-y-4">
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#D4AF37] block">
            EXPERIENCIA COMPLETA
          </span>
          <h3 className="font-serif text-lg sm:text-xl text-white font-light uppercase">
            Tu Paquete Ceremonial Incluye
          </h3>

          <div className="grid grid-cols-2 gap-3 text-left pt-2">
            <div className="p-3 rounded-lg bg-black/50 border border-neutral-800/80 space-y-1">
              <span className="text-sm">💎</span>
              <p className="text-xs font-serif text-white font-medium">Pulsera de Lapislázuli</p>
              <p className="text-[10px] text-neutral-400 font-serif">Calibrada exacta a tu muñeca</p>
            </div>
            <div className="p-3 rounded-lg bg-black/50 border border-neutral-800/80 space-y-1">
              <span className="text-sm">📜</span>
              <p className="text-xs font-serif text-white font-medium">Certificado Foliado</p>
              <p className="text-[10px] text-neutral-400 font-serif">Garantía mineral firmada</p>
            </div>
            <div className="p-3 rounded-lg bg-black/50 border border-neutral-800/80 space-y-1">
              <span className="text-sm">🌑</span>
              <p className="text-xs font-serif text-white font-medium">Bolsa de Terciopelo</p>
              <p className="text-[10px] text-neutral-400 font-serif">Resguardo sagrado con sello áureo</p>
            </div>
            <div className="p-3 rounded-lg bg-black/50 border border-neutral-800/80 space-y-1">
              <span className="text-sm">🔮</span>
              <p className="text-xs font-serif text-white font-medium">Oráculo Personal</p>
              <p className="text-[10px] text-neutral-400 font-serif">Mensaje del Arcano que te eligió</p>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            6. PRUEBA SOCIAL / TESTIMONIOS REALES
           ───────────────────────────────────────────────────────────── */}
        <section className="mb-10 space-y-4">
          <div className="text-center">
            <div className="text-[#D4AF37] text-sm tracking-widest mb-1">★★★★★</div>
            <p className="text-xs text-neutral-300 font-serif">
              Calificación <strong className="text-white">4.9 / 5</strong> en más de 200 piezas consagradas
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <div className="p-4 rounded-xl bg-[#09080E] border border-neutral-800 text-xs font-serif space-y-2">
              <p className="text-neutral-200 italic leading-relaxed">
                &ldquo;Vi el video en YouTube y la pedí con dudas... cuando llegó a mi casa en San Pedro me quedé sin palabras. El brillo de la pirita dorada en el lapislázuli azul es idéntico al video. Se siente la fuerza del mineral.&rdquo;
              </p>
              <span className="text-[10px] font-mono text-[#D4AF37] block">
                — Rodrigo M. · San Pedro Garza García
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#09080E] border border-neutral-800 text-xs font-serif space-y-2">
              <p className="text-neutral-200 italic leading-relaxed">
                &ldquo;La atención por WhatsApp es impecable, el artesano me ayudó con mi medida y el envío a CDMX tardó día y medio. El empaque y la consagración valen cada centavo.&rdquo;
              </p>
              <span className="text-[10px] font-mono text-[#D4AF37] block">
                — Claudia S. · Ciudad de México
              </span>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            7. PREGUNTAS FRECUENTES RÁPIDAS (DERRIBA OBJECIONES)
           ───────────────────────────────────────────────────────────── */}
        <section className="bg-black/60 border border-neutral-900 rounded-xl p-5 mb-12 space-y-3 text-xs font-serif text-neutral-300">
          <h4 className="font-serif text-sm text-white font-medium uppercase tracking-wider mb-2 text-center">
            Dudas Frecuentes
          </h4>
          <div className="space-y-2">
            <div>
              <p className="text-white font-medium">¿Cómo elijo la medida de mi muñeca?</p>
              <p className="text-neutral-400 text-[11px]">Al hacer clic en WhatsApp, nuestro artesano te orienta en 1 minuto para que la pulsera quede a tu medida perfecta.</p>
            </div>
            <div className="pt-2 border-t border-neutral-800/70">
              <p className="text-white font-medium">¿Cómo se realiza el pago?</p>
              <p className="text-neutral-400 text-[11px]">Aceptamos Transferencia SPEI a Mercado Pago o por WhatsApp Concierge directo con confirmación inmediata.</p>
            </div>
            <div className="pt-2 border-t border-neutral-800/70">
              <p className="text-white font-medium">¿Cuánto tarda el envío?</p>
              <p className="text-neutral-400 text-[11px]">Enviamos por paquetería express asegurada (FedEx / DHL / Estafeta) con entrega en 24 a 48 horas en cualquier código postal de México.</p>
            </div>
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            8. FOOTER MINIMALISTA (COMPLIANCE Y SEGURIDAD)
           ───────────────────────────────────────────────────────────── */}
        <footer className="text-center text-[10px] font-serif text-neutral-400 pb-12 space-y-2 border-t border-neutral-900 pt-6">
          <p className="tracking-widest uppercase text-neutral-300">
            ARCANO SABIDURÍA · MONTERREY, MÉXICO
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
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 sm:py-4 px-5 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-98 text-black font-sans font-extrabold text-sm sm:text-base tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(37,211,102,0.6)] flex items-center justify-between gap-3 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="text-2xl sm:text-3xl">💬</span>
              <div className="text-left leading-tight">
                <span className="block font-black text-xs sm:text-sm">APARTAR MI ARCANO</span>
                <span className="block text-[10px] font-medium text-black/85">
                  $1,299 MXN · Envío Express Gratis
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

