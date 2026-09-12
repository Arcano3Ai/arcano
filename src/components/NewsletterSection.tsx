"use client";

import React, { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      trackEvent({ name: "newsletter_signup", params: { location: "home_footer_module" } });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden border-t border-b border-charcoal-border bg-gradient-to-b from-[#09090d] via-[#0e0e14] to-[#07070a]">
      {/* Sello de fondo tenue */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-gold/10 pointer-events-none blur-[1px]" />

      <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-[1px] w-6 bg-gold/40" />
          <span className="text-gold text-xs">✦</span>
          <span className="h-[1px] w-6 bg-gold/40" />
        </div>

        <span className="text-xs uppercase tracking-[0.25em] text-gold/80 font-sans">
          El Círculo de la Luna
        </span>

        <h3 className="font-serif text-2xl sm:text-4xl text-parchment tracking-[0.1em] mt-2 font-light">
          Recibe una carta para tu camino
        </h3>

        <p className="mt-3 text-xs sm:text-sm text-parchment-muted font-sans font-light max-w-lg mx-auto leading-relaxed">
          Cada plenilunio compartimos reflexiones arquetípicas, tiradas estacionales y meditaciones simbólicas. Sin excesos ni promociones invasivas.
        </p>

        {status === "success" ? (
          <div className="mt-8 p-4 rounded bg-gold/10 border border-gold/30 text-parchment font-sans text-xs animate-fadeIn">
            ✦ Tu presencia ha sido integrada al Círculo. En el próximo ciclo lunar recibirás tu primera epístola ceremonial.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu.correo@ejemplo.com"
              className="flex-1 px-4 py-3 rounded bg-charcoal border border-charcoal-border focus:border-gold/60 focus:outline-none text-xs text-parchment font-sans"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="py-3 px-6 text-xs uppercase tracking-[0.2em] font-sans text-obsidian bg-gold hover:bg-gold-light transition-all rounded-sm font-medium shadow-[0_0_15px_rgba(198,160,82,0.3)] shrink-0 disabled:opacity-50"
            >
              {status === "loading" ? "Conectando..." : "Entrar al círculo ✦"}
            </button>
          </form>
        )}

        <p className="mt-4 text-[10px] text-parchment-dim font-sans">
          Respetamos tu serenidad. Puedes retirar tu suscripción en cualquier instante con un solo clic.
        </p>
      </div>
    </section>
  );
};
