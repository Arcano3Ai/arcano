"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export const TarotProfesionalContent: React.FC = () => {
  const { t } = useLanguage();

  const workSections = [
    {
      title: t("Toma de Decisiones Estratégicas", "Strategic Decision Making"),
      description: t(
        "Cuando existen dos o más caminos laborales abiertos: evaluamos qué exige cada opción de tu energía, qué riesgos invisibles conllevan y cuál te acerca a tu integridad.",
        "When two or more career paths lie open: we evaluate what each demands of your energy, what hidden risks they carry, and which brings you closer to your integrity."
      ),
      symbol: "◇",
    },
    {
      title: t("Gestación de Nuevos Proyectos", "Gestation of New Projects"),
      description: t(
        "Emprendimientos, obras artísticas o empresas colectivas. Mapeo de viabilidad anímica, momentos propicios para el lanzamiento y recursos clave.",
        "Ventures, artistic works, or collaborative endeavors. Soulful feasibility mapping, favorable timing for launch, and key resources."
      ),
      symbol: "☉",
    },
    {
      title: t("Transiciones y Cambios de Rumbo", "Transitions & Career Pivots"),
      description: t(
        "Desarmar la ansiedad ante la reinvención profesional. Cómo capitalizar la experiencia pasada sin quedar atrapado en viejas identidades agotadas.",
        "Dismantling anxiety around professional reinvention. How to capitalize on past experience without remaining trapped in exhausted identities."
      ),
      symbol: "🜂",
    },
    {
      title: t("Alineación con el Propósito", "Alignment with Purpose"),
      description: t(
        "Distinguir entre lo que te genera estatus vacío y aquello que enciende tu vocación genuina y aporta valor real a tu comunidad.",
        "Distinguishing between empty status and what truly ignites your genuine calling while adding lasting value to your community."
      ),
      symbol: "✦",
    },
    {
      title: t("Identificación de Oportunidades", "Identifying Opportunities"),
      description: t(
        "Detectar corrientes favorables en tu entorno profesional y aprender a posicionarte con prudencia y firmeza antes de actuar.",
        "Detecting favorable currents in your professional landscape and learning to position yourself with prudence and resolve before acting."
      ),
      symbol: "✧",
    },
    {
      title: t("Desbloqueo de Creatividad y Síndrome del Impostor", "Unlocking Creativity & Impostor Syndrome"),
      description: t(
        "Mirar de frente los miedos a la exposición pública, la exigencia desmedida y el auto-boicot para liberar tus talentos con templanza.",
        "Facing the fears of public exposure, perfectionism, and self-sabotage to liberate your talents with poise and temperance."
      ),
      symbol: "🜁",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Hero */}
      <div className="text-center space-y-4 mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-gold/80 font-sans">
          {t("Estrategia y Propósito", "Strategy & Purpose")}
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-parchment tracking-[0.1em] font-light">
          {t("Tarot Profesional", "Professional Tarot")}
        </h1>
        <p className="font-serif italic text-lg sm:text-2xl text-parchment-muted max-w-xl mx-auto">
          &ldquo;{t("Claridad simbólica para tus decisiones más trascendentes.", "Symbolic clarity for your most consequential decisions.")}&rdquo;
        </p>
        <p className="text-xs sm:text-sm text-parchment-dim font-sans max-w-2xl mx-auto font-light leading-relaxed pt-2">
          {t(
            "Una sesión concebida para líderes, emprendedores y creadores en momentos de encrucijada. No prometemos ascensos mágicos ni ganancias automáticas; aportamos visión panorámica y orden interno.",
            "A session conceived for leaders, entrepreneurs, and creators at moments of crossroads. We do not promise magical promotions or automatic gains; we offer panoramic vision and inner order."
          )}
        </p>

        <div className="pt-6">
          <Link
            href="/reservar/?servicio=trabajo-y-proposito"
            className="inline-block px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-sans text-obsidian bg-gold hover:bg-gold-light transition-all rounded-sm font-medium shadow-[0_0_20px_rgba(198,160,82,0.35)]"
          >
            {t("Reservar lectura profesional ✦", "Book professional reading ✦")}
          </Link>
        </div>
      </div>

      {/* Grid de Ejes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workSections.map((sec, idx) => (
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

      {/* Nota Ética y Estratégica */}
      <div className="mt-16 p-8 sm:p-10 rounded-xl border border-charcoal-border bg-gradient-to-b from-[#0f141a] to-[#08080a] text-center max-w-3xl mx-auto space-y-4">
        <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-sans">
          {t("Postura Deontológica", "Ethical Standard")}
        </span>
        <h3 className="font-serif text-xl sm:text-2xl text-parchment font-light">
          &ldquo;{t(
            "La suerte en los negocios no es más que la preparación lúcida encontrándose con la oportunidad propicia.",
            "Luck in endeavors is nothing more than lucid preparation meeting propitious opportunity."
          )}&rdquo;
        </h3>
        <p className="text-xs text-parchment-muted font-sans font-light max-w-lg mx-auto leading-relaxed">
          {t(
            "Nuestra lectura no sustituye el plan financiero ni la asesoría legal o contable. Funciona como un catalizador de claridad mental para que tomes el mando de tus decisiones con serenidad y valentía.",
            "Our reading does not replace financial plans, legal, or accounting advice. It functions as a catalyst for mental clarity so that you take command of your decisions with serenity and courage."
          )}
        </p>
        <div className="pt-4">
          <Link
            href="/reservar/?servicio=trabajo-y-proposito"
            className="text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-light border-b border-gold/40 pb-0.5 font-sans"
          >
            {t("Agendar sesión de enfoque profesional →", "Schedule professional focus session →")}
          </Link>
        </div>
      </div>
    </div>
  );
};
