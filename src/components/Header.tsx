"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brandConfig } from "@/config/brandConfig";
import { headerNavLinks } from "@/config/navigation";
import { trackEvent } from "@/lib/analytics";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalCount, openCart } = useCart();

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

            if (link.href === "/tienda/") {
              return (
                <div key={link.href} className="relative group py-1">
                  <Link
                    href="/tienda/"
                    className={`text-xs uppercase tracking-[0.18em] transition-all duration-300 flex items-center gap-1 ${
                      isActive || pathname.startsWith("/tienda")
                        ? "text-gold font-medium"
                        : "text-parchment-muted hover:text-parchment hover:translate-y-[-1px]"
                    }`}
                  >
                    <span>{link.label}</span>
                    <span className="text-[10px] opacity-60 group-hover:rotate-180 transition-transform duration-300">
                      ▾
                    </span>
                    {(isActive || pathname.startsWith("/tienda")) && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-[1px] bg-gold" />
                    )}
                  </Link>

                  {/* Dropdown de Áreas de la Tienda */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 w-72 z-50">
                    <div className="p-2.5 rounded-xl bg-obsidian-deep/98 border border-gold/40 shadow-[0_15px_40px_rgba(0,0,0,0.95)] backdrop-blur-2xl space-y-1">
                      <div className="px-3 py-1 text-[9px] font-mono tracking-[0.25em] uppercase text-gold/80 border-b border-charcoal-border/50">
                        Colecciones Ancestrales
                      </div>
                      {[
                        { label: "Talismanes & Tarot", href: "/tienda/", icon: "🔮", desc: "78 Arcanos y 32 Minerales" },
                        { label: "Barro Negro Oaxaqueño", href: "/tienda/barro-negro/", icon: "🏺", desc: "Alquimia de San Bartolo Coyotepec" },
                        { label: "Alebrijes & Nahuales", href: "/tienda/alebrijes/", icon: "🐆", desc: "Talla sagrada en copal" },
                        { label: "Arte Huichol · Wixárika", href: "/tienda/arte-huichol/", icon: "🦌", desc: "Cosmogonía de Wirikuta" },
                      ].map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all ${
                            pathname === cat.href
                              ? "bg-gold/15 text-gold border border-gold/40"
                              : "text-parchment-dim hover:text-parchment hover:bg-charcoal/60"
                          }`}
                        >
                          <span className="text-base">{cat.icon}</span>
                          <div>
                            <div className="text-xs font-serif text-white tracking-wide">{cat.label}</div>
                            <div className="text-[9px] font-sans text-neutral-400">{cat.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

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

        {/* CTA DE RESERVA, MODO CLARO/OSCURO Y HAMBURGUER MÓVIL */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Botón Solecito / Luna para Modo Claro / Oscuro */}
          <LanguageToggle />
          <ThemeToggle />

          {/* Acceso a Aula Virtual */}
          <Link
            href="/academia/mi-panel/"
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-[10px] uppercase font-serif tracking-wider hover:bg-amber-500/20 hover:border-amber-400 transition-all shadow-[0_0_10px_rgba(212,175,55,0.15)]"
          >
            <span>🗝️</span>
            <span>Aula Virtual</span>
          </Link>

          <Link
            href="/reservar/"
            onClick={handleBookingClick}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-xs font-sans uppercase tracking-[0.2em] text-parchment bg-charcoal hover:bg-gold/10 border border-gold/40 hover:border-gold transition-all duration-500 rounded-sm shadow-[0_0_15px_rgba(198,160,82,0.12)] hover:shadow-[0_0_20px_rgba(198,160,82,0.3)] hover:text-gold"
          >
            <span>Reservar lectura</span>
            <span className="text-gold text-xs">✦</span>
          </Link>

          {/* Botón Carrito Rápido Móvil */}
          <button
            onClick={openCart}
            aria-label={`Abrir carrito ceremonial (${totalCount} artículos)`}
            className="lg:hidden p-2 text-parchment hover:text-gold transition-colors relative focus:outline-none focus:ring-1 focus:ring-gold/50 rounded"
          >
            <span className="text-base">🛍️</span>
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-gold text-obsidian text-[9px] font-bold font-sans w-4 h-4 rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(212,175,55,0.8)]">
                {totalCount}
              </span>
            )}
          </button>

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
            <div className="flex items-center justify-between text-xs tracking-[0.3em] uppercase text-gold/70 pb-4 border-b border-charcoal-border">
              <span>Santuario ARCANO</span>
              <LanguageToggle />
            </div>
            {headerNavLinks.map((link) => (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  className="font-serif text-2xl tracking-[0.15em] text-parchment hover:text-gold transition-colors text-center py-2"
                >
                  {link.label}
                </Link>
                {link.href === "/tienda/" && (
                  <div className="grid grid-cols-2 gap-2 px-2 py-1 -mt-2 mb-2">
                    {[
                      { label: "Talismanes & Tarot", href: "/tienda/", icon: "🔮" },
                      { label: "Barro Negro", href: "/tienda/barro-negro/", icon: "🏺" },
                      { label: "Alebrijes & Nahuales", href: "/tienda/alebrijes/", icon: "🐆" },
                      { label: "Arte Huichol", href: "/tienda/arte-huichol/", icon: "🦌" },
                    ].map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
                          pathname === sub.href
                            ? "bg-gold/15 border-gold/40 text-gold"
                            : "bg-charcoal/40 border-charcoal-border/40 text-neutral-300"
                        }`}
                      >
                        <span className="text-sm">{sub.icon}</span>
                        <span className="text-[11px] font-serif leading-tight">{sub.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="pt-8 border-t border-charcoal-border flex flex-col items-center space-y-4">
            <div className="flex items-center justify-between w-full px-4 py-2 rounded-lg bg-charcoal/40 border border-charcoal-border/50">
              <span className="text-xs uppercase tracking-wider text-parchment-dim font-sans">
                Iluminación del Santuario
              </span>
              <ThemeToggle />
            </div>

            <Link
              href="/academia/mi-panel/"
              className="w-full text-center py-3 text-xs font-serif uppercase tracking-[0.2em] text-amber-300 bg-amber-500/15 border border-amber-500/40 hover:bg-amber-500/25 transition-all duration-300 rounded-sm font-semibold flex items-center justify-center gap-2"
            >
              <span>🗝️</span>
              <span>Mi Aula Virtual (Estudiantes)</span>
            </Link>

            <Link
              href="/reservar/"
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
