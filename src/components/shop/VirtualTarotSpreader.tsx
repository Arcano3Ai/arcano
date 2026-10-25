"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { majorArcanaTalismans } from "@/data/majorArcanaTalismans";
import type { ShopProduct } from "@/data/shop";
import {
  calculateBirthArcanoNumber,
  createCustomBundleFromCards,
  buildBundleWhatsAppUrl,
  CURATED_TRIAD_BUNDLES,
  ArcanoBundle,
} from "@/data/bundles";
import {
  CONCIERGE_ZONES,
  CONCIERGE_DEFAULT_ZONE,
} from "@/config/conciergeConfig";

interface VirtualTarotSpreaderProps {
  onSelectProduct?: (product: ShopProduct) => void;
  className?: string;
}

// Oráculos sintéticos para cada posición
function getPositionAdvice(arcano: ShopProduct, position: 0 | 1 | 2): string {
  const name = arcano.name.split(" (")[0];
  if (position === 0) {
    return `La raíz de tu situación proviene de la energía de ${name}: tu base de poder construida sobre aprendizajes previos.`;
  }
  if (position === 1) {
    return `Aquí y ahora, ${name} te pide abrazar su fuerza para vencer cualquier obstáculo o indecisión.`;
  }
  return `Hacia tu futuro, ${name} anuncia la manifestación victoriosa si mantienes tu visión y tus pies en la tierra.`;
}

export const VirtualTarotSpreader: React.FC<VirtualTarotSpreaderProps> = ({
  onSelectProduct,
  className = "",
}) => {
  const [consultanteName, setConsultanteName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [isShuffling, setIsShuffling] = useState<boolean>(false);
  const [revealedCards, setRevealedCards] = useState<ShopProduct[] | null>(null);
  const [selectedZone, setSelectedZone] = useState<string>(CONCIERGE_DEFAULT_ZONE);
  const [selectedCuratedBundle, setSelectedCuratedBundle] = useState<ArcanoBundle | null>(null);

  // Arcano natal derivado de la fecha de nacimiento
  const birthArcano = useMemo(() => {
    if (!birthDate) return null;
    const num = calculateBirthArcanoNumber(birthDate);
    return majorArcanaTalismans.find((a) => Number(a.arcanoNumber) === num) || null;
  }, [birthDate]);

  // Bundle dinámico resultante de la tirada
  const customBundle = useMemo(() => {
    if (!revealedCards || revealedCards.length < 3) return null;
    return createCustomBundleFromCards(revealedCards, consultanteName.trim(), birthDate);
  }, [revealedCards, consultanteName, birthDate]);

  // Ejecución ritual de la tirada
  const handlePerformSpread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultanteName.trim()) {
      alert("Por favor ingresa tu nombre para consagrar la tirada oracular.");
      return;
    }
    if (!birthDate) {
      alert("Por favor ingresa tu fecha de nacimiento para sintonizar tu arcano natal.");
      return;
    }

    setIsShuffling(true);
    setRevealedCards(null);

    // Algoritmo pseudo-aleatorio con semilla numerológica para coherencia mística
    setTimeout(() => {
      const birthNum = calculateBirthArcanoNumber(birthDate);
      const nameHash = consultanteName.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
      
      const available = [...majorArcanaTalismans];
      
      // 1. Carta de Origen: vinculada a la vibración natal
      const idx1 = (birthNum + nameHash) % available.length;
      const card1 = available.splice(idx1, 1)[0];

      // 2. Carta de Presente: derivada del momento actual
      const nowSeed = Date.now() % available.length;
      const card2 = available.splice(nowSeed, 1)[0];

      // 3. Carta de Destino: síntesis cósmica
      const card3 = available[(birthNum * 3 + nameHash) % available.length];

      setRevealedCards([card1, card2, card3]);
      setIsShuffling(false);

      // Desplazamiento suave al resultado
      setTimeout(() => {
        document.getElementById("oraculo-resultado")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 1800);
  };

  return (
    <section
      id="tirada-virtual"
      className={`relative w-full py-16 sm:py-24 bg-gradient-to-b from-[#060606] via-[#0A0A0A] to-black border-y border-neutral-900 overflow-hidden ${className}`}
    >
      {/* Fondo ambiental místico */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[#C5A059]/10 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─────────────────────────────────────────────────────────────
            1. ENCABEZADO DEL ORÁCULO VIRTUAL
           ───────────────────────────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-black/90 border border-[#C5A059]/80 shadow-[0_0_20px_rgba(197,160,89,0.3)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.3em] uppercase text-[#F3EFE6] font-medium">
              ✦ TIRADA VIRTUAL DE 3 CARTAS · RECOMENDADOR DE BUNDLE ✦
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-light tracking-[0.2em] text-white uppercase mb-4 leading-tight">
            Descubre tu <span className="bg-gradient-to-r from-[#DFBA73] via-[#FFE2A4] to-[#C5A059] bg-clip-text text-transparent">Tríada Sagrada</span>
          </h2>

          <p className="font-serif italic text-xs sm:text-sm text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Ingresa tu nombre y fecha natal. El oráculo sintonizará tu frecuencia numerológica para revelarte los 3 Arcanos Mayores que rigen tu momento (Origen, Presente y Destino) y creará tu <strong>Bundle de 3 Talismanes con 20% de Descuento</strong>.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. FORMULARIO DE CONSULTA CEREMONIAL
           ───────────────────────────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto mb-16 bg-[#0E0E0E]/90 border border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handlePerformSpread} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Campo Nombre */}
              <div>
                <label className="block text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase text-neutral-400 mb-2 font-medium">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  value={consultanteName}
                  onChange={(e) => setConsultanteName(e.target.value)}
                  placeholder="Ej. Mauricio Garza"
                  className="w-full px-4 py-3 bg-black/90 border border-neutral-800 rounded-lg text-white text-xs sm:text-sm focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] transition-all font-serif placeholder:text-neutral-600"
                />
              </div>

              {/* Campo Fecha de Nacimiento */}
              <div>
                <label className="block text-[10px] sm:text-[11px] font-sans tracking-[0.2em] uppercase text-neutral-400 mb-2 font-medium">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-4 py-3 bg-black/90 border border-neutral-800 rounded-lg text-white text-xs sm:text-sm focus:border-[#C5A059] focus:outline-none focus:ring-1 focus:ring-[#C5A059] transition-all font-serif [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Vista previa del Arcano Natal detectado */}
            {birthArcano && (
              <div className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between text-xs animate-fadeIn">
                <span className="text-neutral-400 font-serif">
                  Tu Arcano Natal Regente:
                </span>
                <span className="text-[#C5A059] font-serif font-medium">
                  {birthArcano.name.split(" (")[0]} (Arcano {birthArcano.arcanoNumber}) ✦
                </span>
              </div>
            )}

            {/* Botón de Lanzamiento */}
            <button
              type="submit"
              disabled={isShuffling}
              className={`w-full py-4 rounded-full font-serif text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center gap-3 ${
                isShuffling
                  ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#C5A059] via-[#DFBA73] to-[#C5A059] text-black hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(197,160,89,0.5)]"
              }`}
            >
              {isShuffling ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Sintonizando y Barajando los 22 Arcanos...</span>
                </>
              ) : (
                <>
                  <span>✦</span>
                  <span>Barajar y Revelar mi Tríada Sagrada</span>
                  <span>✦</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. RESULTADO DE LA TIRADA DE 3 CARTAS
           ───────────────────────────────────────────────────────────── */}
        {revealedCards && customBundle && (
          <div id="oraculo-resultado" className="animate-fadeIn scroll-mt-24 space-y-12">
            
            {/* Banner de Consulta */}
            <div className="text-center">
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#C5A059] block mb-1">
                ORÁCULO REVELADO PARA {consultanteName.toUpperCase()}
              </span>
              <h3 className="font-serif text-xl sm:text-3xl text-white font-light tracking-wider uppercase">
                Tríada de tu Momento Presente
              </h3>
            </div>

            {/* Las 3 Cartas Reveladas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {revealedCards.map((card, idx) => {
                const posTitle = idx === 0 ? "I · Origen / Raíz" : idx === 1 ? "II · Punto de Poder" : "III · Destino / Victoria";
                const posSubtitle = idx === 0 ? "Pasado · Base Cósmica" : idx === 1 ? "Presente · Desafío Vivo" : "Futuro · Manifestación";

                return (
                  <div
                    key={card.id}
                    className="group bg-[#0D0D0D] border border-neutral-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-[#C5A059]/70 transition-all duration-300 shadow-xl"
                  >
                    <div>
                      {/* Cabecera de Posición */}
                      <div className="border-b border-neutral-900 pb-3 mb-4 text-center">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A059] block">
                          {posTitle}
                        </span>
                        <span className="text-[11px] font-serif italic text-neutral-400">
                          {posSubtitle}
                        </span>
                      </div>

                      {/* Imagen Dual: Carta del Tarot + Pulsera de Mineral */}
                      <div className="grid grid-cols-2 gap-3 mb-4 items-center">
                        {/* Carta de Tarot */}
                        <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden border border-neutral-800 shadow-md">
                          <Image
                            src={card.secondaryImageUrl || card.imageUrl}
                            alt={card.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 15vw"
                            className="object-cover"
                          />
                        </div>

                        {/* Pulsera Talismán */}
                        <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-neutral-800 bg-black shadow-md">
                          <Image
                            src={card.imageUrl}
                            alt={card.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 15vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>

                      {/* Nombre del Arcano & Piedra */}
                      <h4 className="font-serif text-sm sm:text-base font-medium text-white mb-1 tracking-wide">
                        {card.name.split(" (")[0]}
                      </h4>
                      <p className="text-[10px] text-[#C5A059] font-mono mb-3 tracking-wider">
                        {card.stoneType}
                      </p>

                      {/* Interpretación Oracular */}
                      <p className="text-xs text-neutral-300 font-serif leading-relaxed italic mb-4">
                        "{getPositionAdvice(card, idx as 0 | 1 | 2)}"
                      </p>
                    </div>

                    {/* Precio individual y enlace de detalle */}
                    <div className="pt-3 border-t border-neutral-900/80 flex items-center justify-between">
                      <span className="text-xs font-serif text-neutral-400">
                        Pieza individual: <strong className="text-white">${card.price.toLocaleString("es-MX")} MXN</strong>
                      </span>
                      {onSelectProduct && (
                        <button
                          onClick={() => onSelectProduct(card)}
                          className="text-[10px] font-sans tracking-widest uppercase text-[#C5A059] hover:text-white transition-colors cursor-pointer"
                        >
                          Ver Detalles →
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ─────────────────────────────────────────────────────────────
                4. RECOMENDACIÓN DEL BUNDLE PERSONALIZADO (20% OFF)
               ───────────────────────────────────────────────────────────── */}
            <div className="bg-gradient-to-r from-black via-[#111111] to-black border-2 border-[#C5A059] rounded-2xl p-6 sm:p-10 shadow-[0_0_40px_rgba(197,160,89,0.25)] backdrop-blur-xl">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                
                {/* Lado Izquierdo: Descripción del Bundle */}
                <div className="space-y-4 max-w-xl text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059] text-[#FFE2A4] text-[10px] font-mono tracking-widest uppercase font-semibold">
                    <span>✨ BUNDLE EXCLUSIVO DE TU TIRADA · 20% OFF APLICADO</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-white uppercase tracking-wider">
                    {customBundle.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-300 font-serif leading-relaxed">
                    Adquiere en una sola entrega ceremonial las 3 pulseras minerales de tu tirada: 
                    <strong className="text-[#C5A059]"> {customBundle.tagline}</strong>. 
                    Calibre uniforme de 8mm, consagradas a tu medida en Monterrey, N.L.
                  </p>

                  {/* Selector de Zona VIP Monterrey */}
                  <div className="pt-2">
                    <label className="block text-[10px] font-sans tracking-widest uppercase text-neutral-400 mb-2 font-medium">
                      Zona de Entrega Concierge Privada en MTY:
                    </label>
                    <select
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-xs font-serif text-white focus:border-[#C5A059] focus:outline-none cursor-pointer"
                    >
                      {CONCIERGE_ZONES.map((zone) => (
                        <option key={zone} value={zone}>
                          {zone}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Lado Derecho: Desglose de Precios & CTA WhatsApp */}
                <div className="text-center lg:text-right space-y-4 w-full lg:w-auto flex-shrink-0">
                  <div className="space-y-1">
                    <div className="text-xs text-neutral-400 font-serif line-through">
                      Precio regular (3 piezas): ${customBundle.originalPrice.toLocaleString("es-MX")} MXN
                    </div>
                    <div className="text-3xl sm:text-4xl font-serif text-[#FFE2A4] font-medium tracking-tight">
                      ${customBundle.bundlePrice.toLocaleString("es-MX")} MXN
                    </div>
                    <div className="text-[11px] font-mono text-[#25D366] font-semibold tracking-wider uppercase">
                      ✦ Ahorras ${customBundle.savings.toLocaleString("es-MX")} MXN (20% OFF) ✦
                    </div>
                  </div>

                  <a
                    href={buildBundleWhatsAppUrl(customBundle, selectedZone, consultanteName, birthDate)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-black font-sans font-bold text-xs tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:scale-105 cursor-pointer"
                  >
                    <span>💬</span>
                    <span>Ordenar mi Tríada por WhatsApp (-20%)</span>
                  </a>

                  <div className="text-[10px] text-neutral-400 font-serif">
                    Entrega VIP sin costo en San Pedro, San Jerónimo, Cumbres y Linda Vista
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            5. SECCIÓN DE TRÍADAS ARQUETÍPICAS CURADAS (BUNDLES PRECONFIGURADOS)
           ───────────────────────────────────────────────────────────── */}
        <div className="mt-20 pt-16 border-t border-neutral-900">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#C5A059] block mb-2">
              COLECCIÓN DE TRÍADAS ALQUÍMICAS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light tracking-wide uppercase">
              Bundles Sagrados Preconfigurados
            </h3>
            <p className="text-xs text-neutral-400 font-serif mt-2">
              Todas las tríadas incluyen las 3 piezas consagradas con 20% de descuento automático.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CURATED_TRIAD_BUNDLES.map((bundle) => {
              return (
                <div
                  key={bundle.id}
                  className="bg-[#0B0B0B] border border-neutral-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-[#C5A059]/60 transition-all duration-300 shadow-lg group"
                >
                  <div className="space-y-4">
                    {/* Badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono tracking-widest uppercase text-[#C5A059] bg-[#C5A059]/10 px-2.5 py-1 rounded-full border border-[#C5A059]/30">
                        {bundle.badge}
                      </span>
                      <span className="text-[10px] font-mono text-[#25D366] font-semibold">
                        20% OFF
                      </span>
                    </div>

                    {/* Título & Tagline */}
                    <div>
                      <h4 className="font-serif text-base sm:text-lg text-white font-medium group-hover:text-[#FFE2A4] transition-colors">
                        {bundle.name}
                      </h4>
                      <p className="text-[11px] text-[#C5A059] font-serif italic mt-0.5">
                        {bundle.tagline}
                      </p>
                    </div>

                    {/* Mosaico de las 3 pulseras */}
                    <div className="grid grid-cols-3 gap-2 py-1">
                      {bundle.items.map((item) => (
                        <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden border border-neutral-800 bg-black">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Descripción */}
                    <p className="text-xs text-neutral-400 font-serif leading-relaxed line-clamp-3">
                      {bundle.description}
                    </p>
                  </div>

                  {/* Precios & CTA */}
                  <div className="pt-4 border-t border-neutral-900 mt-6 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-neutral-500 font-serif line-through block">
                          ${bundle.originalPrice.toLocaleString("es-MX")} MXN
                        </span>
                        <span className="text-xl font-serif text-white font-medium">
                          ${bundle.bundlePrice.toLocaleString("es-MX")} MXN
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#C5A059]">
                        Ahorro: ${bundle.savings.toLocaleString("es-MX")}
                      </span>
                    </div>

                    <a
                      href={buildBundleWhatsAppUrl(bundle, selectedZone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-2.5 rounded-full bg-[#111111] hover:bg-[#C5A059] text-white hover:text-black font-sans font-semibold text-[11px] tracking-widest uppercase transition-all border border-neutral-800 hover:border-[#C5A059] cursor-pointer"
                    >
                      Adquirir Tríada por WhatsApp →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
