"use client";

import React, { useEffect, useState } from "react";

const ARCANA_SYMBOLS = ["✦", "☾", "☉", "🜂", "🜄", "🜁", "🜃", "☿", "♀", "♃", "♄", "♾", "⚖", "Ψ", "🜚", "✧"];

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [symbolIndex, setSymbolIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Solo activar en dispositivos con puntero fino (mouse) y sin reduced motion
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isTouchDevice || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detectar si estamos sobre elementos interactivos
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest('[role="button"]') ||
        target.hasAttribute("data-interactive")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    // Transmutación periódica del símbolo arcano cada 3.8 segundos
    const symbolInterval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setSymbolIndex((prev) => (prev + 1) % ARCANA_SYMBOLS.length);
        setIsTransitioning(false);
      }, 350);
    }, 3800);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousemove", handleElementHover);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      clearInterval(symbolInterval);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleElementHover);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const currentSymbol = ARCANA_SYMBOLS[symbolIndex];

  return (
    <>
      {/* Símbolo arcano central flotante - sutil, pequeño y elegante */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out select-none flex items-center justify-center"
        style={{
          transform: `translate3d(${position.x - 6}px, ${position.y - 8}px, 0)`,
        }}
      >
        <span
          className={`text-gold font-serif text-[11px] transition-all duration-300 transform ${
            isTransitioning ? "opacity-0 scale-50 rotate-90" : "opacity-95 scale-100 rotate-0"
          } ${
            isHovered
              ? "text-gold-light scale-110 filter drop-shadow-[0_0_6px_rgba(223,183,108,0.95)]"
              : "filter drop-shadow-[0_0_4px_rgba(198,160,82,0.7)]"
          } ${isClicked ? "scale-125 text-amber-200" : ""}`}
        >
          {currentSymbol}
        </span>
      </div>

      {/* Halo áureo sutil */}
      <div
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-[9998] transition-all duration-300 ease-out ${
          isHovered
            ? "w-8 h-8 bg-gold/10 border-gold/60 scale-110 shadow-[0_0_12px_rgba(198,160,82,0.35)]"
            : "w-5 h-5 bg-transparent border-gold/30 opacity-40 scale-100"
        } ${isClicked ? "scale-125 border-gold bg-gold/20" : ""}`}
        style={{
          transform: `translate3d(${
            position.x - (isHovered ? 16 : 10)
          }px, ${position.y - (isHovered ? 16 : 10)}px, 0)`,
        }}
      />
    </>
  );
};
