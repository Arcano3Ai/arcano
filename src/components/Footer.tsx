"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brandConfig } from "@/config/brandConfig";
import { footerNavLinks } from "@/config/navigation";
import { TarotSocialIcons } from "@/components/TarotSocialIcons";
import { ArcanoLogo } from "@/components/ArcanoLogo";
import { useLanguage } from "@/context/LanguageContext";

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const { dict, t } = useLanguage();

  // Aislar landing page de conversión de invierno (cero fugas)
  if (pathname?.startsWith("/invierno")) {
    return null;
  }

  return (
    <footer className="relative bg-obsidian-deep text-parchment border-t border-charcoal-border pt-16 sm:pt-20 pb-12 overflow-hidden">
      {/* Resplandor áureo inferior tenue */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-charcoal-border/70">
          {/* Columna Marca e Identidad */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="group inline-block">
              <ArcanoLogo variant="horizontal" />
            </Link>

            <p className="font-serif italic text-sm text-parchment-muted max-w-sm leading-relaxed">
              &ldquo;{dict.footer.quote}&rdquo;
            </p>

            <div className="pt-2 text-xs text-parchment-dim font-sans space-y-1">
              <p>{brandConfig.contact.location}</p>
              <p>{brandConfig.contact.hours}</p>
              <p className="text-gold/80">{brandConfig.contact.email}</p>
            </div>

            {/* Redes sociales estilo Tarot: Instagram, Facebook, YouTube, TikTok */}
            <div className="pt-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold/80 font-sans block mb-2.5">
                {dict.footer.presence}
              </span>
              <TarotSocialIcons size="sm" />
            </div>
          </div>

          {/* Columna Explorar */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold font-sans mb-4 font-semibold">
              {dict.footer.exploreTitle}
            </p>
            <ul className="space-y-2.5">
              {footerNavLinks.explorar.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-parchment-muted hover:text-parchment transition-colors font-sans"
                  >
                    {link.key ? t(link.key) : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna Santuario */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold font-sans mb-4 font-semibold">
              {dict.footer.sanctuaryTitle}
            </p>
            <ul className="space-y-2.5">
              {footerNavLinks.santuario.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-parchment-muted hover:text-parchment transition-colors font-sans"
                  >
                    {link.key ? t(link.key) : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna Legal y Ética */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold font-sans mb-4 font-semibold">
              {dict.footer.legalTitle}
            </p>
            <ul className="space-y-2.5">
              {footerNavLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-parchment-muted hover:text-parchment transition-colors font-sans"
                  >
                    {link.key ? t(link.key) : link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Franja de Métodos de Pago Seguros y Confianza */}
        <div className="py-8 my-2 border-b border-charcoal-border/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="text-[11px] uppercase tracking-[0.2em] text-gold/90 font-semibold flex items-center gap-1.5">
              <span>🔒</span>
              <span>Métodos de Pago Seguros</span>
            </span>
            <div className="flex items-center flex-wrap justify-center gap-1.5">
              <span className="px-2 py-0.5 bg-[#009EE3]/20 border border-[#009EE3]/40 rounded text-[#009EE3] text-[10px] font-bold">
                Mercado Pago
              </span>
              <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-parchment text-[10px] font-mono">
                VISA
              </span>
              <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-parchment text-[10px] font-mono">
                Mastercard
              </span>
              <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-parchment text-[10px] font-mono">
                AMEX
              </span>
              <span className="px-2 py-0.5 bg-emerald-950/40 border border-emerald-500/30 rounded text-emerald-400 text-[10px] font-mono font-medium">
                🏛️ SPEI
              </span>
              <span className="px-2 py-0.5 bg-red-950/30 border border-red-500/30 rounded text-red-300 text-[10px] font-mono">
                🏪 OXXO
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-parchment-muted/80">
            <span className="flex items-center gap-1">
              <span>🛡️</span>
              <span>Cifrado SSL 256-bit & 3DS</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span>📦</span>
              <span>Envíos Asegurados a todo México</span>
            </span>
          </div>
        </div>

        {/* Barra de Copyright inferior */}
        <div className="pt-8 border-t border-charcoal-border/40 text-center text-xs text-parchment-dim font-sans leading-relaxed space-y-1.5">
          <p>
            © {currentYear} ARCANO • {dict.footer.copyright}
          </p>
          <p className="text-[11px] text-parchment-dim/90">
            {dict.footer.developedBy}{" "}
            <a
              href="https://agenteweb.com.mx/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-amber-300 underline underline-offset-4 font-medium transition-colors"
            >
              agenteweb.com.mx
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
