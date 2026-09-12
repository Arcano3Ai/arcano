"use client";

import React, { useState } from "react";
import Image from "next/image";
import { arcanaList, Arcana } from "@/data/arcana";
import { sacredAudio } from "@/lib/sacredAudio";
import { getWhatsAppUrl } from "@/config/brandConfig";
import { getAssetPath } from "@/lib/utils";

interface OracleSlot {
  position: "Pasado" | "Presente" | "Futuro";
  title: string;
  subtitle: string;
  arcana: Arcana | null;
  isFlipped: boolean;
}

export const OracleReadingModule: React.FC = () => {
  const [isShuffling, setIsShuffling] = useState(false);
  const [consultantName, setConsultantName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [question, setQuestion] = useState("");
  const [isConsagrated, setIsConsagrated] = useState(false);

  const [slots, setSlots] = useState<OracleSlot[]>([
    {
      position: "Pasado",
      title: "La Raíz Oculta",
      subtitle: "Lo que sembraste y la causa profunda",
      arcana: null,
      isFlipped: false,
    },
    {
      position: "Presente",
      title: "El Espejo Sagrado",
      subtitle: "La energía y la prueba en este instante",
      arcana: null,
      isFlipped: false,
    },
    {
      position: "Futuro",
      title: "La Puerta del Porvenir",
      subtitle: "Hacia dónde se orienta tu destino",
      arcana: null,
      isFlipped: false,
    },
  ]);

  const [hasStarted, setHasStarted] = useState(false);

  const quickQuestions = [
    "¿Qué energía rige mi encrucijada actual?",
    "¿Qué verdad de mi sombra necesito integrar?",
    "¿Hacia dónde fluye mi camino si sigo mi intuición?",
    "¿Cómo desbloquear mi vocación y propósito?",
  ];

  const shuffleDeck = () => {
    setIsShuffling(true);
    setIsConsagrated(true);
    sacredAudio.playChime(432, 2.0, 0.08);

    setTimeout(() => {
      // Tomar 3 cartas aleatorias distintas
      const shuffled = [...arcanaList].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);

      setSlots([
        {
          position: "Pasado",
          title: "La Raíz Oculta",
          subtitle: "Lo que sembraste y la causa profunda",
          arcana: selected[0],
          isFlipped: false,
        },
        {
          position: "Presente",
          title: "El Espejo Sagrado",
          subtitle: "La energía y la prueba en este instante",
          arcana: selected[1],
          isFlipped: false,
        },
        {
          position: "Futuro",
          title: "La Puerta del Porvenir",
          subtitle: "Hacia dónde se orienta tu destino",
          arcana: selected[2],
          isFlipped: false,
        },
      ]);

      setIsShuffling(false);
      setHasStarted(true);
    }, 1100);
  };

  const flipCard = (index: number) => {
    if (slots[index].isFlipped || !slots[index].arcana) return;

    sacredAudio.playCardFlip();

    setSlots((prev) =>
      prev.map((slot, i) =>
        i === index ? { ...slot, isFlipped: true } : slot
      )
    );
  };

  const allFlipped = slots.every((s) => s.isFlipped && s.arcana);

  // Mensaje estructurado para WhatsApp con la consagración personalizada del consultante
  const consultationMessage = allFlipped
    ? `Hola Malachai, realicé la Tirada de las 3 Revelaciones en ARCANO.\n\n✦ Nombre: ${consultantName || "Buscador Silencioso"}${birthDate ? `\n✦ Fecha de nacimiento: ${birthDate}` : ""}\n✦ Inquietud o pregunta: "${question || "Mi momento presente"}"\n\nCartas reveladas:\n1. Pasado (${slots[0].title}): ${slots[0].arcana?.name} (${slots[0].arcana?.number})\n2. Presente (${slots[1].title}): ${slots[1].arcana?.name} (${slots[1].arcana?.number})\n3. Futuro (${slots[2].title}): ${slots[2].arcana?.name} (${slots[2].arcana?.number})\n\nDeseo agendar una consulta personalizada contigo para profundizar en el tejido de estos símbolos.`
    : `Hola Malachai, deseo realizar una lectura ceremonial de tarot contigo.`;

  const waLink = getWhatsAppUrl(consultationMessage);

  return (
    <div id="oraculo" className="w-full max-w-5xl mx-auto my-14 px-4">
      <div className="relative rounded-2xl p-6 sm:p-10 border border-gold/30 bg-gradient-to-b from-[#151520]/95 via-[#0b0b10]/95 to-[#040407] shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(198,160,82,0.1)] overflow-hidden">
        {/* Detalle geométrico superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[1px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

        {/* Encabezado ceremonial */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 mb-3">
            <span className="text-gold text-xs">✦</span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans font-medium">
              Oráculo Ritual en Vivo
            </span>
            <span className="text-gold text-xs">✦</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-4xl text-parchment tracking-[0.08em] font-light">
            La Tirada de las Tres Revelaciones
          </h3>

          <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light mt-2 leading-relaxed">
            Consagra tu consulta con tu nombre, fecha y la pregunta que desees descifrar. Baraja el mazo sagrado y toca cada carta para desvelar la verdad de tu momento presente.
          </p>
        </div>

        {/* Formulario de Consagración Ritual */}
        <div className="max-w-xl mx-auto mb-8 p-5 rounded-xl bg-[#0f0e18]/80 border border-charcoal-border shadow-inner">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-charcoal-border/50">
            <span className="text-gold text-xs">🜂</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-gold font-sans font-medium">
              Consagración de la Consulta
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-parchment-dim font-sans mb-1">
                Tu Nombre o Apelativo
              </label>
              <input
                type="text"
                value={consultantName}
                onChange={(e) => setConsultantName(e.target.value)}
                placeholder="Ej. Elena, Santiago..."
                className="w-full bg-[#161424] border border-charcoal-border rounded px-3 py-2 text-xs text-parchment placeholder-parchment-dim/50 focus:outline-none focus:border-gold transition-colors font-sans"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-parchment-dim font-sans mb-1 flex items-center justify-between">
                <span>Fecha de Nacimiento</span>
                {birthDate && (
                  <span className="text-[9px] text-gold font-sans capitalize">
                    ✦ {birthDate}
                  </span>
                )}
              </label>

              {/* Selector ceremonial de Día, Mes y Año: infalible en móviles */}
              <div className="grid grid-cols-3 gap-1.5">
                {/* Día */}
                <select
                  value={birthDate ? parseInt(birthDate.split("-")[2] || "0", 10) : ""}
                  onChange={(e) => {
                    const dayVal = e.target.value ? e.target.value.padStart(2, "0") : "";
                    const parts = (birthDate || "--").split("-");
                    const y = parts[0] || "1995";
                    const m = parts[1] || "01";
                    if (dayVal) {
                      setBirthDate(`${y}-${m}-${dayVal}`);
                    }
                  }}
                  className="bg-[#161424] border border-charcoal-border rounded px-2 py-2 text-xs text-parchment focus:outline-none focus:border-gold transition-colors font-sans"
                >
                  <option value="" disabled>Día</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d} className="bg-[#161424] text-parchment">
                      {d}
                    </option>
                  ))}
                </select>

                {/* Mes */}
                <select
                  value={birthDate ? parseInt(birthDate.split("-")[1] || "0", 10) : ""}
                  onChange={(e) => {
                    const monthVal = e.target.value ? e.target.value.padStart(2, "0") : "";
                    const parts = (birthDate || "--").split("-");
                    const y = parts[0] || "1995";
                    const d = parts[2] || "15";
                    if (monthVal) {
                      setBirthDate(`${y}-${monthVal}-${d}`);
                    }
                  }}
                  className="bg-[#161424] border border-charcoal-border rounded px-2 py-2 text-xs text-parchment focus:outline-none focus:border-gold transition-colors font-sans"
                >
                  <option value="" disabled>Mes</option>
                  {[
                    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
                    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
                  ].map((mName, i) => (
                    <option key={i + 1} value={i + 1} className="bg-[#161424] text-parchment">
                      {mName}
                    </option>
                  ))}
                </select>

                {/* Año */}
                <select
                  value={birthDate ? parseInt(birthDate.split("-")[0] || "0", 10) : ""}
                  onChange={(e) => {
                    const yearVal = e.target.value;
                    const parts = (birthDate || "--").split("-");
                    const m = parts[1] || "01";
                    const d = parts[2] || "15";
                    if (yearVal) {
                      setBirthDate(`${yearVal}-${m}-${d}`);
                    }
                  }}
                  className="bg-[#161424] border border-charcoal-border rounded px-2 py-2 text-xs text-parchment focus:outline-none focus:border-gold transition-colors font-sans"
                >
                  <option value="" disabled>Año</option>
                  {Array.from({ length: 85 }, (_, i) => 2014 - i).map((y) => (
                    <option key={y} value={y} className="bg-[#161424] text-parchment">
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-[10px] uppercase tracking-wider text-parchment-dim font-sans mb-1">
              Tu Pregunta, Inquietud o Dilema Interior
            </label>
            <textarea
              rows={2}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Escribe aquí tu duda, encrucijada o aquello sobre lo que buscas luz..."
              className="w-full bg-[#161424] border border-charcoal-border rounded px-3 py-2 text-xs text-parchment placeholder-parchment-dim/50 focus:outline-none focus:border-gold transition-colors font-sans resize-none"
            />
          </div>

          {/* Sugerencias de preguntas */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="text-[9px] uppercase tracking-wider text-parchment-dim/70 self-center mr-1">
              Sugerencias:
            </span>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setQuestion(q)}
                className="text-[9.5px] px-2 py-0.5 rounded bg-charcoal/60 hover:bg-gold/15 text-parchment-muted hover:text-gold-light border border-charcoal-border/80 transition-colors font-sans"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Botón de Barajar y Consagrar */}
          <div className="mt-5 flex justify-center">
            <button
              onClick={shuffleDeck}
              disabled={isShuffling}
              className={`w-full sm:w-auto px-8 py-3.5 rounded text-xs uppercase tracking-[0.25em] font-sans font-medium transition-all duration-500 flex items-center justify-center gap-3 ${
                isShuffling
                  ? "bg-charcoal text-parchment-dim border border-charcoal-border cursor-wait"
                  : "bg-gradient-to-r from-gold via-gold-light to-gold text-obsidian shadow-[0_0_25px_rgba(198,160,82,0.4)] hover:shadow-[0_0_35px_rgba(198,160,82,0.6)] hover:scale-105 active:scale-95"
              }`}
            >
              <span>{isShuffling ? "✧" : "🜂"}</span>
              <span>
                {isShuffling
                  ? "Consagrando y Barajando el Mazo..."
                  : hasStarted
                  ? "Volver a Barajar con esta Intención"
                  : "Consagrar y Barajar el Mazo Sagrado"}
              </span>
              <span>{isShuffling ? "✧" : "🜂"}</span>
            </button>
          </div>
        </div>

        {/* Ficha de Intención de la Tirada Activa */}
        {hasStarted && (
          <div className="max-w-lg mx-auto mb-6 p-3 rounded-lg bg-gold/5 border border-gold/30 text-center animate-fadeIn">
            <div className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans font-medium">
              ✦ Tirada consagrada para: {consultantName || "Buscador Silencioso"}
              {birthDate && ` · Nacimiento: ${birthDate}`} ✦
            </div>
            {question && (
              <p className="font-serif italic text-xs text-parchment mt-1">
                &ldquo;{question}&rdquo;
              </p>
            )}
          </div>
        )}

        {/* Mesa Ceremonial de Cartas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 my-6">
          {slots.map((slot, index) => (
            <div
              key={slot.position}
              className="flex flex-col items-center text-center"
            >
              {/* Etiqueta de Posición */}
              <div className="mb-3">
                <span className="text-[11px] uppercase tracking-[0.2em] text-gold font-sans font-medium block">
                  {slot.position} · {slot.title}
                </span>
                <span className="text-[10px] text-parchment-dim font-sans font-light">
                  {slot.subtitle}
                </span>
              </div>

              {/* Carta 3D Flip */}
              <div
                onClick={() => hasStarted && flipCard(index)}
                className={`perspective-1000 w-56 sm:w-64 h-88 sm:h-96 cursor-pointer select-none transition-transform duration-300 ${
                  !slot.isFlipped && hasStarted ? "hover:scale-105 hover:-translate-y-1" : ""
                }`}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-1000 ease-out transform-style-3d ${
                    slot.isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* REVERSO DE LA CARTA */}
                  <div className="absolute inset-0 w-full h-full rounded-lg border-2 border-gold/40 bg-gradient-to-br from-[#161622] via-[#0d0d14] to-[#040407] backface-hidden shadow-[0_12px_35px_rgba(0,0,0,0.8)] flex flex-col items-center justify-between p-5 overflow-hidden group">
                    <div className="absolute inset-2 border border-gold/20 rounded pointer-events-none group-hover:border-gold/40 transition-colors" />

                    <div className="w-full flex justify-between text-gold/50 text-xs">
                      <span>✦</span>
                      <span>☾</span>
                      <span>✦</span>
                    </div>

                    <div className="flex flex-col items-center my-auto">
                      <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center bg-obsidian/70 mb-3 shadow-[0_0_15px_rgba(198,160,82,0.15)]">
                        <span className="text-gold text-2xl animate-pulse-subtle">
                          {index === 0 ? "🜁" : index === 1 ? "🜂" : "🜄"}
                        </span>
                      </div>
                      <span className="font-serif text-[11px] uppercase tracking-[0.25em] text-parchment">
                        ARCANO
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-gold/70 mt-1">
                        {hasStarted ? "Toca para revelar" : "Espera el barajado"}
                      </span>
                    </div>

                    <div className="w-full flex justify-between text-gold/50 text-xs">
                      <span>✦</span>
                      <span>☾</span>
                      <span>✦</span>
                    </div>
                  </div>

                  {/* ANVERSO DE LA CARTA (REVELADA COMPLETA) */}
                  {slot.arcana && (
                    <div className="absolute inset-0 w-full h-full rounded-lg border-2 border-gold/75 bg-gradient-to-b from-[#1a1710] via-[#0f0e13] to-[#060608] backface-hidden rotate-y-180 shadow-[0_15px_40px_rgba(198,160,82,0.25)] flex flex-col justify-between p-2 text-center overflow-hidden">
                      <div className="absolute inset-1 border border-gold/30 rounded pointer-events-none z-10" />

                      {/* Header sutil de la carta */}
                      <div className="flex justify-between items-center text-xs tracking-widest text-gold/90 px-2 pt-0.5 font-sans z-10">
                        <span className="font-serif text-[11px]">{slot.arcana.number}</span>
                        <span className="text-xs font-serif">{slot.arcana.glyph}</span>
                      </div>

                      {/* Imagen original clásica COMPLETA */}
                      <div className="relative my-1 w-full flex-1 rounded overflow-hidden border border-gold/20 bg-obsidian-deep/60 flex items-center justify-center">
                        <Image
                          src={getAssetPath(slot.arcana.imageUrl)}
                          alt={slot.arcana.name}
                          fill
                          className="object-contain object-center filter brightness-[0.95] contrast-[1.10]"
                          sizes="(max-width: 640px) 240px, 280px"
                          priority
                        />
                      </div>

                      <div className="z-10 pb-1">
                        <h4 className="font-serif text-sm text-parchment tracking-[0.06em] font-medium leading-tight">
                          {slot.arcana.name}
                        </h4>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-gold/80 block mt-0.5">
                          {slot.arcana.element}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Mensaje oracular revelado */}
              {slot.isFlipped && slot.arcana && (
                <div className="mt-4 p-3 rounded bg-obsidian/80 border border-charcoal-border max-w-[240px] text-center animate-fadeIn">
                  <p className="text-[11px] text-parchment font-serif italic leading-relaxed">
                    &ldquo;{slot.arcana.quote}&rdquo;
                  </p>
                  <div className="mt-2 flex flex-wrap justify-center gap-1">
                    {slot.arcana.keywordsLight.slice(0, 2).map((k, i) => (
                      <span
                        key={i}
                        className="text-[8px] uppercase tracking-wider text-gold/90 bg-gold/10 px-1.5 py-0.5 rounded border border-gold/20"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA tras completar la tirada con mensaje personalizado */}
        {allFlipped && (
          <div className="mt-10 pt-8 border-t border-charcoal-border text-center max-w-xl mx-auto animate-fadeIn">
            <span className="text-xs uppercase tracking-[0.25em] text-gold font-sans block mb-2 font-medium">
              Lectura Consagrada ✦
            </span>
            <h4 className="font-serif text-xl sm:text-2xl text-parchment tracking-wide">
              ¿Deseas descifrar el hilo invisible entre estas tres cartas?
            </h4>
            <p className="text-xs text-parchment-muted font-sans font-light mt-2 leading-relaxed">
              Las cartas han señalado las corrientes para tu pregunta. En una sesión personal con Malachai exploramos a fondo el matiz exacto de tu encrucijada y los pasos a seguir.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded text-xs uppercase tracking-[0.25em] text-obsidian bg-gradient-to-r from-gold via-gold-light to-gold hover:shadow-[0_0_30px_rgba(198,160,82,0.5)] transition-all font-medium font-sans flex items-center justify-center gap-2"
              >
                <span>Consultar esta tirada con Malachai</span>
                <span>→</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
