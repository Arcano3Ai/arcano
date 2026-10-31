"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export const TarotDelAmorContent: React.FC = () => {
  const { t } = useLanguage();

  const loveSections = [
    {
      title: t("Relaciones en Curso", "Ongoing Relationships"),
      description: t(
        "Comprensión de la dinámica actual, la energía que comparten y qué acuerdos tácitos necesitan actualizarse para que el vínculo respire sin asfixia.",
        "Understanding current dynamics, shared energy, and which unspoken agreements need updating so the relationship can breathe without suffocation."
      ),
      symbol: "☾",
    },
    {
      title: t("Sentimientos y Emociones Ocultas", "Hidden Feelings & Emotions"),
      description: t(
        "Observar las corrientes afectivas que no siempre se verbalizan: miedos al abandono, lealtades invisibles y necesidades de validación íntima.",
        "Observing emotional currents that are rarely verbalized: fear of abandonment, unseen loyalties, and intimate validation needs."
      ),
      symbol: "✧",
    },
    {
      title: t("Comunicación y Desencuentros", "Communication & Misunderstandings"),
      description: t(
        "Identificar por qué ciertas conversaciones caen en círculos viciosos y qué arquetipo puede desbloquear la escucha compasiva y recíproca.",
        "Identifying why certain conversations cycle in vicious loops and which archetype can unlock compassionate and mutual listening."
      ),
      symbol: "✦",
    },
    {
      title: t("Apertura a Nuevos Vínculos", "Opening to New Bonds"),
      description: t(
        "Para quienes buscan el amor: qué heridas pasadas aún cierran el paso a la entrega y cómo cultivar una disponibilidad anímica auténtica.",
        "For those seeking love: which past wounds still bar the door to surrender, and how to cultivate authentic emotional availability."
      ),
      symbol: "◇",
    },
    {
      title: t("Decisiones Cruciales de Pareja", "Crucial Relationship Decisions"),
      description: t(
        "Convivencia, compromisos mayores o cambios de rumbo. Análisis objetivo del terreno antes de tomar una determinación de vida compartida.",
        "Cohabitation, deeper commitments, or turning points. Objective analysis of the ground before making life-altering partnership decisions."
      ),
      symbol: "🜄",
    },
    {
      title: t("Cierres de Ciclo y Duelo Afectivo", "Cycle Closures & Emotional Healing"),
      description: t(
        "Aprender a despedir con gratitud lo que ya concluyó, recuperando tu propia soberanía emocional sin rencor ni estancamiento.",
        "Learning to say farewell with gratitude to what has completed, reclaiming your emotional sovereignty without resentment or stagnation."
      ),
      symbol: "🜁",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Hero */}
      <div className="text-center space-y-4 mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-gold/80 font-sans">
          {t("El Espejo del Corazón", "The Mirror of the Heart")}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-parchment tracking-[0.1em] font-light">
          {t("Tarot del Amor", "Love Tarot")}
        </h1>
        <p className="font-serif italic text-lg sm:text-2xl text-parchment-muted max-w-xl mx-auto">
          &ldquo;{t("Explora los símbolos detrás de tus vínculos.", "Explore the symbols behind your relationships.")}&rdquo;
        </p>
        <p className="text-xs sm:text-sm text-parchment-dim font-sans max-w-2xl mx-auto font-light leading-relaxed pt-2">
          {t(
            "El amor no es un enigma que deba adivinarse con angustia; es un territorio sagrado que invita a mirarse con verdad, despojándose de máscaras y comprendiendo qué proyectamos en el otro.",
            "Love is not an enigma to be anxiously guessed; it is a sacred territory inviting us to behold ourselves truthfully, shedding masks and understanding what we project onto the other."
          )}
        </p>

        <div className="pt-6">
          <Link
            href="/reservar/?servicio=amor-y-relaciones"
            className="inline-block px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-sans text-obsidian bg-gold hover:bg-gold-light transition-all rounded-sm font-medium shadow-[0_0_20px_rgba(198,160,82,0.35)]"
          >
            {t("Reservar lectura de amor ✦", "Book love reading ✦")}
          </Link>
        </div>
      </div>

      {/* Áreas de Exploración */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loveSections.map((sec, idx) => (
          <div
            key={idx}
            className="rounded-lg p-6 bg-charcoal/50 border border-charcoal-border flex flex-col justify-between"
          >
            <div>
              <span className="text-gold text-base block mb-3 font-serif">
                {sec.symbol}
              </span>
              <h3 className="font-serif text-xl text-parchment font-medium">
                {sec.title}
              </h3>
              <p className="text-xs text-parchment-muted font-sans font-light mt-3 leading-relaxed">
                {sec.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Puente con Sinastría Astrológica */}
      <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-gold/30 bg-gradient-to-r from-amber-500/10 via-[#0C101D] to-sky-500/10 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-gold font-serif block mb-1">
            {t("Astrología de Pareja", "Relationship Astrology")}
          </span>
          <h4 className="font-serif text-lg text-parchment font-medium">
            {t(
              "Calculadora de Sinastría & Compatibilidad Bi-Wheel",
              "Synastry Calculator & Bi-Wheel Compatibility"
            )}
          </h4>
          <p className="text-xs text-parchment-muted mt-1 leading-relaxed">
            {t(
              "Cruza la carta natal de ambas personas y analiza la química, el diálogo y el lazo del alma con precisión matemática.",
              "Cross the birth charts of two souls and analyze chemistry, communication, and karmic bonds with mathematical precision."
            )}
          </p>
        </div>
        <Link
          href="/sinastria/"
          className="px-5 py-2.5 rounded-xl bg-gold/15 border border-gold text-gold text-xs font-serif hover:bg-gold/25 transition-colors whitespace-nowrap"
        >
          {t("Calcular Sinastría →", "Calculate Synastry →")}
        </Link>
      </div>

      {/* Sección Reflexión */}
      <div className="mt-12 p-8 sm:p-10 rounded-xl border border-charcoal-border bg-gradient-to-b from-[#180f15] to-[#08080a] text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans">
          {t("Meditación Vinculante", "Bonding Meditation")}
        </span>
        <h3 className="font-serif text-xl sm:text-2xl text-parchment font-light">
          &ldquo;{t(
            "Nadie puede encontrarte más allá del punto en el que tú mismo te has abandonado.",
            "No one can meet you deeper than the depth to which you have known yourself."
          )}&rdquo;
        </h3>
        <p className="text-xs text-parchment-muted font-sans font-light max-w-lg mx-auto leading-relaxed">
          {t(
            "Toda lectura de amor en ARCANO comienza reconociendo tu propio valor inherente. No buscamos someter voluntades ajenas ni asegurar regresos forzados; cultivamos la dignidad y la capacidad de amar desde la libertad.",
            "Every love reading at ARCANO begins by acknowledging your inherent worth. We never seek to bend external wills or promise forced reunions; we cultivate dignity and the capacity to love in sacred freedom."
          )}
        </p>
        <div className="pt-4">
          <Link
            href="/reservar/?servicio=amor-y-relaciones"
            className="text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-light border-b border-gold/40 pb-0.5 font-sans"
          >
            {t("Solicitar lectura especializada →", "Request specialized reading →")}
          </Link>
        </div>
      </div>
    </div>
  );
};
