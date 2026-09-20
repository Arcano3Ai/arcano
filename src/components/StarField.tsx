"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  targetAlpha: number;
  speed: number;
  driftX: number;
  driftY: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface FloatingArcanaGlyph {
  x: number;
  y: number;
  symbol: string;
  alpha: number;
  maxAlpha: number;
  scale: number;
  life: number;
  maxLife: number;
  driftY: number;
}

const CELESTIAL_GLYPHS = ["🜁", "🜂", "🜄", "🜃", "☉", "☾", "♃", "♄", "♈", "♏", "☿", "♁", "✦", "⚚", "♾", "◇"];

export const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respetar la preferencia de reducción de movimiento del usuario
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isBot =
      typeof navigator !== "undefined" &&
      (Boolean(navigator.webdriver) ||
        /bot|googlebot|crawler|spider|robot|crawling|lighthouse|headlesschrome/i.test(
          navigator.userAgent
        ));

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Ajuste de densidad: ligero en móviles y desactivado en bots
    const isMobile = width < 768;
    const starCount = isMobile
      ? Math.min(Math.floor((width * height) / 24000), 30)
      : Math.min(Math.floor((width * height) / 14000), 75);

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];
    let floatingGlyphs: FloatingArcanaGlyph[] = [];
    let nextShootingStarTime = Date.now() + Math.random() * 3000 + 2000;
    let nextGlyphTime = Date.now() + Math.random() * 2000 + 1000;

    const colors = [
      "rgba(244, 239, 230, ", // Marfil
      "rgba(198, 160, 82, ",  // Oro sutil
      "rgba(142, 151, 164, ", // Plata
    ];

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.1 + 0.3,
          alpha: Math.random() * 0.5 + 0.1,
          targetAlpha: Math.random() * 0.7 + 0.15,
          speed: Math.random() * 0.008 + 0.002,
          driftX: (Math.random() - 0.5) * 0.08,
          driftY: (Math.random() - 0.5) * 0.08,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const spawnShootingStar = () => {
      const angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.2; // ~45 grados
      shootingStars.push({
        x: Math.random() * (width * 0.8),
        y: Math.random() * (height * 0.4),
        length: Math.random() * 80 + 70,
        speed: Math.random() * 7 + 8,
        angle: angle,
        alpha: 1,
        life: 0,
        maxLife: Math.random() * 35 + 30,
      });
      // Próxima estrella fugaz entre 5 y 11 segundos
      nextShootingStarTime = Date.now() + Math.random() * 6000 + 5000;
    };

    const spawnFloatingGlyph = () => {
      floatingGlyphs.push({
        x: Math.random() * (width - 100) + 50,
        y: Math.random() * (height - 100) + 50,
        symbol: CELESTIAL_GLYPHS[Math.floor(Math.random() * CELESTIAL_GLYPHS.length)],
        alpha: 0,
        maxAlpha: Math.random() * 0.25 + 0.15, // translúcido y solemne
        scale: Math.random() * 0.4 + 0.8,
        life: 0,
        maxLife: Math.random() * 140 + 120, // ~4-5 segundos de manifestación
        driftY: (Math.random() - 0.5) * 0.15,
      });
      // Próximo glifo cósmico entre 3.5 y 7 segundos
      nextGlyphTime = Date.now() + Math.random() * 3500 + 3500;
    };

    initStars();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render de estrellas fijas
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (!prefersReducedMotion) {
          // Parpadeo suave y lento
          if (Math.abs(star.alpha - star.targetAlpha) < 0.01) {
            star.targetAlpha = Math.random() * 0.7 + 0.15;
          } else {
            star.alpha += (star.targetAlpha - star.alpha) * star.speed;
          }

          // Deriva cósmica infinitesimal
          star.x += star.driftX;
          star.y += star.driftY;

          // Reubicar suavemente al cruzar los bordes
          if (star.x < 0) star.x = width;
          if (star.x > width) star.x = 0;
          if (star.y < 0) star.y = height;
          if (star.y > height) star.y = 0;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${star.alpha})`;
        ctx.shadowBlur = star.radius > 0.9 ? 3 : 0;
        ctx.shadowColor = "rgba(198, 160, 82, 0.4)";
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        // Render de Glifos Arcanos Cósmicos
        if (Date.now() > nextGlyphTime && floatingGlyphs.length < 4) {
          spawnFloatingGlyph();
        }

        for (let k = floatingGlyphs.length - 1; k >= 0; k--) {
          const g = floatingGlyphs[k];
          g.life++;
          g.y += g.driftY;

          // Curva de entrada suave, meseta y fade-out
          const progress = g.life / g.maxLife;
          if (progress < 0.25) {
            g.alpha = (progress / 0.25) * g.maxAlpha;
          } else if (progress > 0.75) {
            g.alpha = ((1 - progress) / 0.25) * g.maxAlpha;
          } else {
            g.alpha = g.maxAlpha;
          }

          ctx.save();
          ctx.font = `${Math.round(18 * g.scale)}px "Cinzel", "Cinzel Decorative", serif`;
          ctx.fillStyle = `rgba(223, 183, 108, ${g.alpha})`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(198, 160, 82, ${g.alpha * 0.8})`;
          ctx.fillText(g.symbol, g.x, g.y);
          ctx.restore();

          if (g.life >= g.maxLife) {
            floatingGlyphs.splice(k, 1);
          }
        }

        // Render de Estrellas Fugaces ocasionales
        if (Date.now() > nextShootingStarTime) {
          spawnShootingStar();
        }

        for (let j = shootingStars.length - 1; j >= 0; j--) {
          const s = shootingStars[j];
          s.life++;
          s.x += Math.cos(s.angle) * s.speed;
          s.y += Math.sin(s.angle) * s.speed;
          s.alpha = Math.max(0, 1 - (s.life / s.maxLife));

          const tailX = s.x - Math.cos(s.angle) * s.length;
          const tailY = s.y - Math.sin(s.angle) * s.length;

          const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
          gradient.addColorStop(0, `rgba(255, 245, 220, ${s.alpha * 0.9})`);
          gradient.addColorStop(0.3, `rgba(223, 183, 108, ${s.alpha * 0.6})`);
          gradient.addColorStop(1, "rgba(198, 160, 82, 0)");

          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.shadowBlur = 6;
          ctx.shadowColor = "rgba(223, 183, 108, 0.8)";
          ctx.stroke();

          // Cabeza luminosa
          ctx.beginPath();
          ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
          ctx.fill();

          if (s.life >= s.maxLife || s.x > width || s.y > height) {
            shootingStars.splice(j, 1);
          }
        }
      }

      if (!isBot && !prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
      if (isBot || prefersReducedMotion) {
        render();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] opacity-80"
    />
  );
};
