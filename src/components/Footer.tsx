import React from "react";
import Link from "next/link";
import { brandConfig } from "@/config/brandConfig";
import { footerNavLinks } from "@/config/navigation";
import { TarotSocialIcons } from "@/components/TarotSocialIcons";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-obsidian-deep text-parchment border-t border-charcoal-border pt-16 sm:pt-20 pb-12 overflow-hidden">
      {/* Resplandor áureo inferior tenue */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-charcoal-border/70">
          {/* Columna Marca e Identidad */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl tracking-[0.25em] text-parchment font-light flex items-center gap-2">
                <span className="text-gold text-xs">✦</span>
                {brandConfig.name}
              </span>
              <span className="block text-[9px] tracking-[0.28em] uppercase text-parchment-dim mt-0.5">
                {brandConfig.descriptor}
              </span>
            </Link>

            <p className="font-serif italic text-sm text-parchment-muted max-w-sm leading-relaxed">
              &ldquo;Los símbolos no deciden tu camino. Te ayudan a mirarlo.&rdquo;
            </p>

            <div className="pt-2 text-xs text-parchment-dim font-sans space-y-1">
              <p>{brandConfig.contact.location}</p>
              <p>{brandConfig.contact.hours}</p>
              <p className="text-gold/80">{brandConfig.contact.email}</p>
            </div>

            {/* Redes sociales estilo Tarot: Instagram, Facebook, YouTube, TikTok */}
            <div className="pt-4">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gold/80 font-sans block mb-2.5">
                Presencia Sagrada ✦
              </span>
              <TarotSocialIcons size="sm" />
            </div>
          </div>

          {/* Columna Explorar */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold font-sans mb-4 font-semibold">Explorar</p>
            <ul className="space-y-2.5">
              {footerNavLinks.explorar.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-parchment-muted hover:text-parchment transition-colors font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna Santuario */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold font-sans mb-4 font-semibold">Santuario</p>
            <ul className="space-y-2.5">
              {footerNavLinks.santuario.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-parchment-muted hover:text-parchment transition-colors font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna Legal y Ética */}
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gold font-sans mb-4 font-semibold">Legal & Ética</p>
            <ul className="space-y-2.5">
              {footerNavLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-parchment-muted hover:text-parchment transition-colors font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Barra de Copyright inferior */}
        <div className="pt-8 border-t border-charcoal-border/40 text-center text-xs text-parchment-dim font-sans leading-relaxed">
          <p>
            © 2026 Desarrollado por <span className="text-gold">ARCANO SOLUTIONS</span> • Todos los derechos reservados • El conocimiento está en los símbolos. El camino, en ti.
          </p>
        </div>
      </div>
    </footer>
  );
};
