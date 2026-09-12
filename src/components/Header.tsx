"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brandConfig } from "@/config/brandConfig";
import { headerNavLinks } from "@/config/navigation";
import { trackEvent } from "@/lib/analytics";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleBookingClick = () => {
    trackEvent({ name: "click_booking", params: { source: "header_cta" } });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-obsidian-deep/85 backdrop-blur-md border-b border-charcoal-border/70 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/"
          className="group flex flex-col items-start focus:outline-none focus:ring-1 focus:ring-gold/50 rounded"
        >
          <span className="font-serif text-xl sm:text-2xl tracking-[0.25em] text-parchment group-hover:text-gold transition-colors duration-300 font-light flex items-center gap-2">
            <span className="text-gold text-xs opacity-75">✦</span>
            {brandConfig.name}
          </span>
          <span className="text-[9px] tracking-[0.28em] uppercase text-parchment-dim group-hover:text-parchment-muted transition-colors duration-300">
            {brandConfig.descriptor}
          </span>
        </Link>

        {/* NAVEGACIÓN DESKTOP */}
        <nav className="hidden lg:flex items-center space-x-7" aria-label="Principal">
          {headerNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-[0.18em] transition-all duration-300 relative py-1 ${
                  isActive
                    ? "text-gold font-medium"
                    : "text-parchment-muted hover:text-parchment hover:translate-y-[-1px]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[1px] bg-gold" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA DE RESERVA Y HAMBURGUER MÓVIL */}
        <div className="flex items-center space-x-4">
          <Link
            href="/reservar"
            onClick={handleBookingClick}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-xs font-sans uppercase tracking-[0.2em] text-parchment bg-charcoal hover:bg-gold/10 border border-gold/40 hover:border-gold transition-all duration-500 rounded-sm shadow-[0_0_15px_rgba(198,160,82,0.12)] hover:shadow-[0_0_20px_rgba(198,160,82,0.3)] hover:text-gold"
          >
            <span>Reservar lectura</span>
            <span className="text-gold text-xs">✦</span>
          </Link>

          {/* Botón Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Abrir menú de navegación"
            className="lg:hidden p-2 text-parchment hover:text-gold transition-colors focus:outline-none focus:ring-1 focus:ring-gold/50 rounded"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span
                className={`h-[1.5px] bg-parchment transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2 bg-gold" : "w-6"
                }`}
              />
              <span
                className={`h-[1.5px] bg-parchment transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "w-4 self-end"
                }`}
              />
              <span
                className={`h-[1.5px] bg-parchment transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2 bg-gold" : "w-6"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL FULLSCREEN */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 top-[60px] z-50 bg-obsidian-deep/98 backdrop-blur-2xl flex flex-col justify-between px-6 py-10 lg:hidden overflow-y-auto animate-fadeIn"
        >
          <div className="flex flex-col space-y-6 pt-4">
            <div className="text-center text-xs tracking-[0.3em] uppercase text-gold/70 pb-4 border-b border-charcoal-border">
              Navegación del Santuario
            </div>
            {headerNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-serif text-2xl tracking-[0.15em] text-parchment hover:text-gold transition-colors text-center py-2"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-8 border-t border-charcoal-border flex flex-col items-center space-y-4">
            <Link
              href="/reservar"
              onClick={handleBookingClick}
              className="w-full text-center py-3.5 text-xs font-sans uppercase tracking-[0.2em] text-obsidian bg-gold hover:bg-gold-light transition-all duration-300 rounded-sm font-medium shadow-[0_0_20px_rgba(198,160,82,0.4)]"
            >
              Reservar lectura ✦
            </Link>
            <p className="text-[11px] text-parchment-dim font-serif italic text-center">
              &ldquo;{brandConfig.philosophicalQuote}&rdquo;
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
