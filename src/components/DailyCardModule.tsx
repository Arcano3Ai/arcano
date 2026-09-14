"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { arcanaList, Arcana } from "@/data/arcana";
import { trackEvent } from "@/lib/analytics";
import { sacredAudio } from "@/lib/sacredAudio";
import { ArcanaAudioPlayer } from "@/components/ArcanaAudioPlayer";
import { getAssetPath } from "@/lib/utils";

export const DailyCardModule: React.FC = () => {
  const [revealed, setRevealed] = useState<boolean>(false);
  const [dailyArcana, setDailyArcana] = useState<Arcana>(arcanaList[0]);
  const [todayDateString, setTodayDateString] = useState<string>("");

  useEffect(() => {
    const today = new Date();
    const dateKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    setTodayDateString(
      today.toLocaleDateString("es-MX", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );

    const savedDate = localStorage.getItem("arcano_daily_card_date");
    const savedSlug = localStorage.getItem("arcano_daily_card_slug");

    if (savedDate === dateKey && savedSlug) {
      const found = arcanaList.find((a) => a.slug === savedSlug);
      if (found) {
        setDailyArcana(found);
        setRevealed(true);
        if (typeof window !== "undefined") {
          const preloadImg = new window.Image();
          preloadImg.src = getAssetPath(found.imageUrl);
        }
        return;
      }
    }

    const pseudoSeed =
      today.getFullYear() * 10000 +
      (today.getMonth() + 1) * 100 +
      today.getDate();
    const index = pseudoSeed % arcanaList.length;
    const selected = arcanaList[index];
    setDailyArcana(selected);
    if (typeof window !== "undefined") {
      const preloadImg = new window.Image();
      preloadImg.src = getAssetPath(selected.imageUrl);
    }
  }, []);

  const handleReveal = () => {
    sacredAudio.playCardFlip();
    const today = new Date();
    const dateKey = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    localStorage.setItem("arcano_daily_card_date", dateKey);
    localStorage.setItem("arcano_daily_card_slug", dailyArcana.slug);
    setRevealed(true);

    trackEvent({
      name: "daily_card_reveal",
      params: {
        cardSlug: dailyArcana.slug,
        cardName: dailyArcana.name,
      },
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4">
      <div className="relative rounded-xl p-6 sm:p-10 border border-charcoal-border bg-gradient-to-b from-[#121218]/90 via-[#0d0d12]/95 to-[#060608] shadow-[0_15px_40px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Adorno perimetral místico */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-gold/80 font-sans">
            Oráculo Cotidiano · {todayDateString}
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl text-parchment tracking-[0.1em] mt-2 font-light">
            La Carta del Día
          </h3>
          <p className="text-xs sm:text-sm text-parchment-muted max-w-xl mx-auto mt-2 font-sans font-light">
            Un arquetipo para observar tu jornada desde una perspectiva lúcida. Esta carta es una invitación a la reflexión, no una profecía fija.
          </p>
        </div>

        {/* Contenedor de la Carta con Flip 3D */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12 mt-6">
          {/* Carta 3D */}
          <div className="perspective-1000 w-56 sm:w-64 h-[360px] sm:h-[390px] shrink-0">
            <div
              className={`relative w-full h-full transition-transform duration-1000 ease-out transform-style-3d ${
                revealed ? "rotate-y-180" : ""
              }`}
            >
              {/* REVERSO DE LA CARTA (Boca abajo) */}
              <div className="absolute inset-0 w-full h-full rounded-lg border-2 border-gold/40 bg-gradient-to-br from-[#161622] via-[#0b0b10] to-[#040406] backface-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col items-center justify-between p-6 overflow-hidden">
                {/* Geometría Sagrada en el reverso */}
                <div className="absolute inset-3 border border-gold/20 rounded pointer-events-none" />
                <div className="w-full flex justify-between text-gold/40 text-xs">
                  <span>✦</span>
                  <span>☾</span>
                  <span>✦</span>
                </div>

                <div className="flex flex-col items-center justify-center my-auto text-center">
                  <div className="w-20 h-20 rounded-full border border-gold/30 flex items-center justify-center bg-obsidian/60 mb-4 shadow-[0_0_15px_rgba(198,160,82,0.15)]">
                    <span className="text-gold text-3xl animate-pulse-subtle">
                      ✧
                    </span>
                  </div>
                  <span className="font-serif text-xs uppercase tracking-[0.25em] text-parchment-muted">
                    ARCANO
                  </span>
                  <span className="text-[10px] tracking-[0.2em] text-gold/60 mt-1 uppercase">
                    Sabiduría Oculta
                  </span>
                </div>

                <div className="w-full flex justify-between text-gold/40 text-xs">
                  <span>✦</span>
                  <span>☾</span>
                  <span>✦</span>
                </div>
              </div>

              {/* ANVERSO DE LA CARTA (Revelada con Ilustración Clásica Original) */}
              <div className="absolute inset-0 w-full h-full rounded-lg border-2 border-gold/70 bg-gradient-to-b from-[#1c1a14] via-[#101014] to-[#060608] backface-hidden rotate-y-180 shadow-[0_15px_40px_rgba(198,160,82,0.3)] flex flex-col justify-between p-3 text-center overflow-hidden">
                <div className="absolute inset-1.5 border border-gold/30 rounded pointer-events-none z-10" />

                {/* Número y Glifo */}
                <div className="flex justify-between items-center text-xs tracking-widest text-gold/90 px-2 pt-1 font-sans z-10">
                  <span>{dailyArcana.number}</span>
                  <span className="text-sm font-serif">{dailyArcana.glyph}</span>
                </div>

                {/* Ilustración de la Carta Original */}
                <div className="relative my-1 w-full flex-1 rounded overflow-hidden border border-gold/30 bg-obsidian-deep">
                  <Image
                    src={getAssetPath(dailyArcana.imageUrl)}
                    alt={dailyArcana.name}
                    fill
                    priority
                    loading="eager"
                    className="object-cover object-center filter brightness-[0.88] contrast-[1.15]"
                    sizes="250px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep/85 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="z-10 pb-1">
                  <h4 className="font-serif text-sm sm:text-base text-parchment tracking-[0.08em] font-medium leading-tight">
                    {dailyArcana.name}
                  </h4>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gold/70 block mt-0.5">
                    {dailyArcana.element} · {dailyArcana.archetype.split("/")[0].trim()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de Revelación y Mensaje */}
          <div className="flex-1 text-center md:text-left">
            {!revealed ? (
              <div className="space-y-5 py-4">
                <p className="text-sm text-parchment/80 font-sans font-light leading-relaxed">
                  Tómate unos segundos. Haz una respiración profunda, suelta la tensión en tus hombros y pulsa para descubrir el símbolo que acompaña tu día.
                </p>
                <button
                  onClick={handleReveal}
                  className="px-8 py-3.5 text-xs font-sans uppercase tracking-[0.25em] text-obsidian bg-gold hover:bg-gold-light transition-all duration-300 rounded-sm font-medium shadow-[0_0_25px_rgba(198,160,82,0.35)] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  Revelar mi carta ✦
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-fadeIn">
                <div className="inline-block px-3 py-1 bg-gold/10 border border-gold/30 rounded text-[11px] uppercase tracking-[0.2em] text-gold font-sans">
                  {dailyArcana.name} · Arcano {dailyArcana.number}
                </div>

                <p className="text-xs sm:text-sm text-parchment-muted font-sans font-light leading-relaxed">
                  {dailyArcana.description}
                </p>

                {/* Pregunta para reflexionar */}
                <div className="p-4 rounded border-l-2 border-gold bg-charcoal/60">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-gold font-sans font-medium mb-1">
                    Pregunta para reflexionar hoy:
                  </span>
                  <p className="text-xs sm:text-sm text-parchment font-serif italic">
                    &ldquo;{dailyArcana.reflectionQuestion}&rdquo;
                  </p>
                </div>

                {/* Sintonía del Arcano si cuenta con audio consagrado */}
                {dailyArcana.audioUrl && (
                  <div className="pt-2">
                    <ArcanaAudioPlayer
                      audioUrl={dailyArcana.audioUrl}
                      audioTitle={dailyArcana.audioTitle}
                      arcanaName={dailyArcana.name}
                      slug={dailyArcana.slug}
                      variant="compact"
                    />
                  </div>
                )}

                <div className="pt-3 flex flex-col sm:flex-row items-center gap-4">
                  <span className="text-xs text-parchment-dim font-sans">
                    ¿Deseas profundizar en esta energía?
                  </span>
                  <Link
                    href="/reservar"
                    className="text-xs uppercase tracking-[0.18em] text-gold hover:text-gold-light border-b border-gold/40 hover:border-gold pb-0.5 transition-colors font-sans"
                  >
                    Quiero una lectura personal →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
