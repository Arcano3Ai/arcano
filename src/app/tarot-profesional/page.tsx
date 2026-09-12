import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tarot Profesional, Vocación y Propósito",
  description:
    "Claridad estratégica y simbólica para decisiones de carrera, proyectos, encrucijadas laborales y desbloqueo del propósito sin falsas promesas.",
};

export default function TarotProfesionalPage() {
  const workSections = [
    {
      title: "Toma de Decisiones Estratégicas",
      description:
        "Cuando existen dos o más caminos laborales abiertos: evaluamos qué exige cada opción de tu energía, qué riesgos invisibles conllevan y cuál te acerca a tu integridad.",
      symbol: "◇",
    },
    {
      title: "Gestación de Nuevos Proyectos",
      description:
        "Emprendimientos, obras artísticas o empresas colectivas. Mapeo de viabilidad anímica, momentos propicios para el lanzamiento y recursos clave.",
      symbol: "☉",
    },
    {
      title: "Transiciones y Cambios de Rumbo",
      description:
        "Desarmar la ansiedad ante la reinvención profesional. Cómo capitalizar la experiencia pasada sin quedar atrapado en viejas identidades agotadas.",
      symbol: "🜂",
    },
    {
      title: "Alineación con el Propósito",
      description:
        "Distinguir entre lo que te genera estatus vacío y aquello que enciende tu vocación genuina y aporta valor real a tu comunidad.",
      symbol: "✦",
    },
    {
      title: "Identificación de Oportunidades",
      description:
        "Detectar corrientes favorables en tu entorno profesional y aprender a posicionarte con prudencia y firmeza antes de actuar.",
      symbol: "✧",
    },
    {
      title: "Desbloqueo de Creatividad y Síndrome del Impostor",
      description:
        "Mirar de frente los miedos a la exposición pública, la exigencia desmedida y el auto-boicot para liberar tus talentos con templanza.",
      symbol: "🜁",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Hero */}
      <div className="text-center space-y-4 mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-gold/80 font-sans">
          Estrategia y Propósito
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-parchment tracking-[0.1em] font-light">
          Tarot Profesional
        </h1>
        <p className="font-serif italic text-lg sm:text-2xl text-parchment-muted max-w-xl mx-auto">
          &ldquo;Claridad simbólica para tus decisiones más trascendentes.&rdquo;
        </p>
        <p className="text-xs sm:text-sm text-parchment-dim font-sans max-w-2xl mx-auto font-light leading-relaxed pt-2">
          Una sesión concebida para líderes, emprendedores y creadores en momentos de encrucijada. No prometemos ascensos mágicos ni ganancias automáticas; aportamos visión panorámica y orden interno.
        </p>

        <div className="pt-6">
          <Link
            href="/reservar?servicio=trabajo-y-proposito"
            className="inline-block px-8 py-3.5 text-xs uppercase tracking-[0.25em] font-sans text-obsidian bg-gold hover:bg-gold-light transition-all rounded-sm font-medium shadow-[0_0_20px_rgba(198,160,82,0.35)]"
          >
            Reservar lectura profesional ✦
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
          Postura Deontológica
        </span>
        <h3 className="font-serif text-xl sm:text-2xl text-parchment font-light">
          &ldquo;La suerte en los negocios no es más que la preparación lúcida encontrándose con la oportunidad propicia.&rdquo;
        </h3>
        <p className="text-xs text-parchment-muted font-sans font-light max-w-lg mx-auto leading-relaxed">
          Nuestra lectura no sustituye el plan financiero ni la asesoría legal o contable. Funciona como un catalizador de claridad mental para que tomes el mando de tus decisiones con serenidad y valentía.
        </p>
        <div className="pt-4">
          <Link
            href="/reservar?servicio=trabajo-y-proposito"
            className="text-xs uppercase tracking-[0.2em] text-gold hover:text-gold-light border-b border-gold/40 pb-0.5 font-sans"
          >
            Agendar sesión de enfoque profesional →
          </Link>
        </div>
      </div>
    </div>
  );
}
