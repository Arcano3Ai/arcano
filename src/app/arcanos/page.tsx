"use client";

import React, { useState } from "react";
import { arcanaList, Arcana } from "@/data/arcana";
import { minorArcanaList, MinorArcanaCard, suitsInfo } from "@/data/minorArcana";
import { ArcanaCard } from "@/components/ArcanaCard";
import { ArcanaModal } from "@/components/ArcanaModal";
import { MinorArcanaCardView } from "@/components/MinorArcanaCardView";
import { MinorArcanaModal } from "@/components/MinorArcanaModal";
import { SectionHeader } from "@/components/SectionHeader";

export default function ArcanosIndexPage() {
  const [activeTab, setActiveTab] = useState<"mayores" | "menores">("mayores");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedElement, setSelectedElement] = useState<string>("Todos");
  const [selectedSuit, setSelectedSuit] = useState<string>("Todos");
  const [modalArcana, setModalArcana] = useState<Arcana | null>(null);
  const [modalMinor, setModalMinor] = useState<MinorArcanaCard | null>(null);

  const majorElements = ["Todos", "Fuego", "Agua", "Aire", "Tierra"];
  const suits = ["Todos", "Bastos", "Copas", "Espadas", "Oros"];

  const filteredMajors = arcanaList.filter((arcana) => {
    const matchesSearch =
      arcana.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arcana.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      arcana.archetype.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesElement =
      selectedElement === "Todos" || arcana.element === selectedElement;

    return matchesSearch && matchesElement;
  });

  const filteredMinors = minorArcanaList.filter((card) => {
    const matchesSearch =
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.suit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.rank.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSuit = selectedSuit === "Todos" || card.suit === selectedSuit;

    return matchesSearch && matchesSuit;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <SectionHeader
        subtitle="Las 78 Puertas del Tarot"
        title="La Baraja Sagrada Completa"
        description="Explora las setenta y ocho cartas tradicionales ilustradas originalmente por Pamela Colman Smith bajo la guía de Arthur Edward Waite (1909). Desde los misterios cósmicos de los Arcanos Mayores hasta las encrucijadas cotidianas de los Arcanos Menores."
        symbol="✦"
      />

      {/* Selector de Pestaña Principal: Mayores vs Menores */}
      <div className="mt-10 flex items-center justify-center gap-3 sm:gap-6">
        <button
          onClick={() => {
            setActiveTab("mayores");
            setSearchTerm("");
          }}
          className={`px-6 py-3 rounded text-xs uppercase tracking-[0.25em] font-sans transition-all duration-300 ${
            activeTab === "mayores"
              ? "bg-gradient-to-r from-gold to-gold-light text-obsidian font-medium shadow-[0_0_25px_rgba(198,160,82,0.35)] scale-105"
              : "bg-charcoal/60 text-parchment-dim hover:text-parchment border border-charcoal-border hover:border-gold/40"
          }`}
        >
          Arcanos Mayores (XXII) ✦
        </button>

        <button
          onClick={() => {
            setActiveTab("menores");
            setSearchTerm("");
          }}
          className={`px-6 py-3 rounded text-xs uppercase tracking-[0.25em] font-sans transition-all duration-300 ${
            activeTab === "menores"
              ? "bg-gradient-to-r from-gold to-gold-light text-obsidian font-medium shadow-[0_0_25px_rgba(198,160,82,0.35)] scale-105"
              : "bg-charcoal/60 text-parchment-dim hover:text-parchment border border-charcoal-border hover:border-gold/40"
          }`}
        >
          Arcanos Menores (LVI) ☾
        </button>
      </div>

      {/* Barra de Búsqueda y Filtros de Categoría */}
      <div className="my-8 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto bg-obsidian-deep/80 p-4 rounded-lg border border-charcoal-border/70 backdrop-blur-sm">
        <div className="w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              activeTab === "mayores"
                ? "Buscar arcano mayor (ej: Mago, Loco)..."
                : "Buscar arcano menor (ej: As de Copas, Reina)..."
            }
            className="w-full px-4 py-2 rounded bg-charcoal border border-charcoal-border focus:border-gold/60 focus:outline-none text-xs text-parchment font-sans"
          />
        </div>

        {/* Filtros correspondientes a la pestaña activa */}
        {activeTab === "mayores" ? (
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="text-[10px] uppercase tracking-wider text-parchment-dim font-sans mr-1">
              Elemento:
            </span>
            {majorElements.map((elem) => (
              <button
                key={elem}
                onClick={() => setSelectedElement(elem)}
                className={`px-3 py-1 rounded text-[10px] uppercase tracking-wider font-sans transition-all ${
                  selectedElement === elem
                    ? "bg-gold text-obsidian font-medium"
                    : "bg-charcoal/60 text-parchment-dim hover:text-parchment border border-charcoal-border"
                }`}
              >
                {elem}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <span className="text-[10px] uppercase tracking-wider text-parchment-dim font-sans mr-1">
              Palo:
            </span>
            {suits.map((suit) => (
              <button
                key={suit}
                onClick={() => setSelectedSuit(suit)}
                className={`px-3 py-1 rounded text-[10px] uppercase tracking-wider font-sans transition-all ${
                  selectedSuit === suit
                    ? "bg-gold text-obsidian font-medium"
                    : "bg-charcoal/60 text-parchment-dim hover:text-parchment border border-charcoal-border"
                }`}
              >
                {suit}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RENDER DE ARCANOS MAYORES */}
      {activeTab === "mayores" && (
        <>
          <div className="flex items-center justify-between text-xs text-parchment-dim font-sans mb-6 px-1">
            <span>
              Mostrando {filteredMajors.length} de {arcanaList.length} arcanos mayores
            </span>
            <span className="font-serif italic text-gold/80">
              Las 22 Llaves de la Conciencia
            </span>
          </div>

          {filteredMajors.length === 0 ? (
            <div className="text-center py-16 text-parchment-dim font-sans text-xs">
              No hemos encontrado ningún arcano mayor que coincida con tu búsqueda.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredMajors.map((arcana, idx) => (
                <ArcanaCard
                  key={arcana.slug}
                  arcana={arcana}
                  priority={idx < 4}
                  onQuickView={(a) => setModalArcana(a)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* RENDER DE ARCANOS MENORES */}
      {activeTab === "menores" && (
        <>
          <div className="flex items-center justify-between text-xs text-parchment-dim font-sans mb-6 px-1">
            <span>
              Mostrando {filteredMinors.length} de {minorArcanaList.length} arcanos menores
            </span>
            <span className="font-serif italic text-gold/80">
              Los 4 Palos Alquímicos
            </span>
          </div>

          {/* Breve descripción del palo si está filtrado */}
          {selectedSuit !== "Todos" && suitsInfo[selectedSuit as keyof typeof suitsInfo] && (
            <div className="mb-6 p-4 rounded-lg bg-gold/5 border border-gold/20 text-center max-w-2xl mx-auto">
              <span className="text-xs uppercase tracking-widest text-gold font-sans block mb-1">
                Palo de {selectedSuit} · Elemento {suitsInfo[selectedSuit as keyof typeof suitsInfo].element} {suitsInfo[selectedSuit as keyof typeof suitsInfo].symbol}
              </span>
              <p className="text-xs text-parchment-muted font-serif italic">
                &ldquo;{suitsInfo[selectedSuit as keyof typeof suitsInfo].essence}&rdquo;
              </p>
            </div>
          )}

          {filteredMinors.length === 0 ? (
            <div className="text-center py-16 text-parchment-dim font-sans text-xs">
              No hemos encontrado ningún arcano menor que coincida con tu búsqueda.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredMinors.map((card, idx) => (
                <MinorArcanaCardView
                  key={card.id}
                  card={card}
                  priority={idx < 4}
                  onSelect={(c) => setModalMinor(c)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Modales oraculares */}
      <ArcanaModal arcana={modalArcana} onClose={() => setModalArcana(null)} />
      <MinorArcanaModal card={modalMinor} onClose={() => setModalMinor(null)} />
    </div>
  );
}
