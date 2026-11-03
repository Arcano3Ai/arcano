"use client";

import React, { useId } from "react";
import { brandConfig } from "@/config/brandConfig";

interface ArcanoLogoProps {
  variant?: "horizontal" | "vertical" | "emblem";
  className?: string;
  emblemClassName?: string;
  showDescriptor?: boolean;
}

/**
 * ArcanoLogo — Sello e Identidad Visual Vectorial de ARCANO.
 * Simetría matemática sobre eje central (X=120 en emblema, X=300 en wordmark).
 */
export const ArcanoLogo: React.FC<ArcanoLogoProps> = ({
  variant = "horizontal",
  className = "",
  emblemClassName = "",
  showDescriptor = true,
}) => {
  const rawId = useId().replace(/:/g, "");
  const gold3D = `arcanoGold3D_${rawId}`;
  const goldBevel = `arcanoGoldBevel_${rawId}`;
  const moonRadial = `arcanoMoonRadial_${rawId}`;
  const hammeredGold = `arcanoHammered_${rawId}`;
  const celestialGlow = `arcanoGlow_${rawId}`;

  const renderDefs = () => (
    <defs>
      <linearGradient id={gold3D} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fff6d1" />
        <stop offset="20%" stopColor="#ebd07e" />
        <stop offset="48%" stopColor="#c59638" />
        <stop offset="72%" stopColor="#f7df94" />
        <stop offset="100%" stopColor="#875c14" />
      </linearGradient>

      <linearGradient id={goldBevel} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor="#fff9e2" />
        <stop offset="32%" stopColor="#e8c670" />
        <stop offset="55%" stopColor="#b07f24" />
        <stop offset="78%" stopColor="#f3d683" />
        <stop offset="100%" stopColor="#916417" />
      </linearGradient>

      <radialGradient id={moonRadial} cx="50%" cy="34%" r="54%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="32%" stopColor="#ffeaac" />
        <stop offset="68%" stopColor="#cf9f3e" />
        <stop offset="100%" stopColor="#7a5110" />
      </radialGradient>

      <filter id={hammeredGold} x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.22"
          numOctaves="4"
          seed="14"
          result="noise"
        />
        <feDiffuseLighting
          in="noise"
          lightingColor="#ffe699"
          surfaceScale="1.4"
          result="lit"
        >
          <feDistantLight azimuth="90" elevation="58" />
        </feDiffuseLighting>
        <feComposite in="lit" in2="SourceGraphic" operator="in" result="textured" />
        <feBlend mode="multiply" in="SourceGraphic" in2="textured" />
      </filter>

      <filter id={celestialGlow} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="2.6" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );

  const renderEmblemPaths = () => (
    <g>
      <circle cx="120" cy="124" r="78" fill="#c6a052" opacity="0.07" />
      <path
        d="M 107 37 A 88 88 0 1 0 133 37"
        fill="none"
        stroke={`url(#${gold3D})`}
        strokeWidth="1.4"
        opacity="0.92"
      />
      <circle cx="32" cy="124" r="2.6" fill="#fff6d1" filter={`url(#${celestialGlow})`} />
      <circle cx="208" cy="124" r="2.6" fill="#fff6d1" filter={`url(#${celestialGlow})`} />
      <circle cx="107" cy="37" r="1.9" fill="#ebd07e" />
      <circle cx="133" cy="37" r="1.9" fill="#ebd07e" />

      <circle
        cx="120"
        cy="102"
        r="34"
        fill="none"
        stroke="#ebd07e"
        strokeWidth="0.65"
        strokeDasharray="1.5 3.5"
        opacity="0.55"
      />
      <circle cx="86" cy="102" r="0.9" fill="#fff6d1" opacity="0.8" />
      <circle cx="154" cy="102" r="0.9" fill="#fff6d1" opacity="0.8" />

      {/* Top Axis Mundi Needle (using rect so gradient renders in all SVG engines) */}
      <circle cx="120" cy="12" r="1.8" fill="#fff6d1" />
      <rect x="119.35" y="14" width="1.3" height="52" fill={`url(#${goldBevel})`} />
      <circle cx="120" cy="66" r="2.1" fill="#f7df94" />

      {/* Upward Chalice Crescent Moon */}
      <path
        d="M 64 78 A 68 68 0 1 0 176 78 A 56.5 55 0 1 1 64 78 Z"
        fill={`url(#${moonRadial})`}
        filter={`url(#${hammeredGold})`}
      />
      <path
        d="M 64 78 A 68 68 0 1 0 176 78 A 56.5 55 0 1 1 64 78 Z"
        fill="none"
        stroke={`url(#${goldBevel})`}
        strokeWidth="1.35"
      />
      {/* Specular Inner Rim Hugging Exact Cutout Curve */}
      <path
        d="M 64 78 A 56.5 55 0 1 0 176 78"
        fill="none"
        stroke="#fffdf2"
        strokeWidth="1.2"
        opacity="0.9"
        filter={`url(#${celestialGlow})`}
      />

      {/* 8-Pointed Polaris Star */}
      <g transform="translate(120, 102)" filter={`url(#${celestialGlow})`}>
        <path
          d="M 0 -14 L 2 -2 L 14 0 L 2 2 L 0 14 L -2 2 L -14 0 L -2 -2 Z"
          fill={`url(#${gold3D})`}
          transform="rotate(45)"
        />
        <path
          d="M 0 -26 L 2.8 -2.8 L 24 0 L 2.8 2.8 L 0 26 L -2.8 2.8 L -24 0 L -2.8 -2.8 Z"
          fill={`url(#${goldBevel})`}
        />
        <circle cx="0" cy="0" r="2.2" fill="#ffffff" />
      </g>

      <circle cx="120" cy="135" r="2.1" fill="#fff6d1" />
      <circle cx="120" cy="142" r="1.45" fill="#ebd07e" />
      <circle cx="120" cy="148" r="1.0" fill="#c59638" />

      {/* Bottom Axis Mundi Needle & Alchemical Diamond */}
      <rect x="119.35" y="191" width="1.3" height="28" fill={`url(#${goldBevel})`} />
      <path
        d="M 120 218 L 126.5 229 L 120 240 L 113.5 229 Z"
        fill="#07060b"
        stroke={`url(#${goldBevel})`}
        strokeWidth="1.65"
        filter={`url(#${celestialGlow})`}
      />
      <circle cx="120" cy="247" r="1.6" fill="#ebd07e" />
      <circle cx="120" cy="253" r="1.0" fill="#c59638" opacity="0.75" />
    </g>
  );

  const renderWordmarkPaths = () => (
    <g filter={`url(#${celestialGlow})`} fill={`url(#${goldBevel})`}>
      {/* 1. Initial Tall 'A' with 4-Point Star Crossbar */}
      <path d="M 122 10 L 125 10 L 151 76 L 141 76 L 122.5 26 L 101 76 L 93 76 Z" />
      <path d="M 87 76 L 106 76 L 106 78.5 L 87 78.5 Z" />
      <path d="M 135 76 L 156 76 L 156 78.5 L 135 78.5 Z" />
      <path
        d="M 122.5 36 L 125.2 48.3 L 143 51 L 125.2 53.7 L 122.5 66 L 119.8 53.7 L 102 51 L 119.8 48.3 Z"
        fill="#fff9e2"
      />

      {/* 2. 'R' */}
      <path d="M 178 26 L 186 26 L 186 76 L 178 76 Z" />
      <path d="M 173 26 L 198 26 L 198 28.5 L 173 28.5 Z" />
      <path d="M 173 76 L 192 76 L 192 78.5 L 173 78.5 Z" />
      <path d="M 186 26 C 206 26, 215 32, 215 41 C 215 50, 206 55, 186 55 L 186 51.5 C 200 51.5, 206 47.5, 206 41 C 206 34.5, 200 29.5, 186 29.5 Z" />
      <path d="M 195 53 L 203 52 L 221 76 L 225 76 L 225 78.5 L 214 78.5 Z" />

      {/* 3. 'C' */}
      <path d="M 287 37 C 282 29, 274 25, 264 25 C 248 25, 237 37, 237 52 C 237 67, 248 79, 264 79 C 275 79, 283 74, 288 67 L 285 65 C 280 71, 273 74.5, 265 74.5 C 253 74.5, 246 65, 246 52 C 246 39, 253 29.5, 265 29.5 C 273 29.5, 280 33, 284 39 Z" />
      <path d="M 280 28.5 L 287.5 25.5 L 287.5 37.5 L 284 37.5 Z" />

      {/* 4. Second 'A' */}
      <path d="M 329 25 L 332 25 L 352 76 L 343 76 L 329.5 38 L 315 76 L 308 76 Z" />
      <path d="M 317 58 L 341 58 L 342 61.5 L 316 61.5 Z" />
      <path d="M 303 76 L 320 76 L 320 78.5 L 303 78.5 Z" />
      <path d="M 338 76 L 357 76 L 357 78.5 L 338 78.5 Z" />

      {/* 5. 'N' */}
      <path d="M 378 26 L 383.5 26 L 383.5 76 L 378 76 Z" />
      <path d="M 418.5 26 L 424 26 L 424 78.5 L 418.5 78.5 Z" />
      <path d="M 378 26 L 385 26 L 421 68 L 421 78.5 L 379 31 Z" />
      <path d="M 372 26 L 387 26 L 387 28.5 L 372 28.5 Z" />
      <path d="M 372 76 L 389 76 L 389 78.5 L 372 78.5 Z" />
      <path d="M 413 26 L 429 26 L 429 28.5 L 413 28.5 Z" />

      {/* 6. 'O' */}
      <path
        fillRule="evenodd"
        d="M 478 25 C 496 25, 510 37, 510 52 C 510 67, 496 79, 478 79 C 460 79, 446 67, 446 52 C 446 37, 460 25, 478 25 Z M 478 29.2 C 465 29.2, 455.5 39, 455.5 52 C 455.5 65, 465 74.8, 478 74.8 C 491 74.8, 500.5 65, 500.5 52 C 500.5 39, 491 29.2, 478 29.2 Z"
      />
    </g>
  );

  if (variant === "emblem") {
    return (
      <svg
        viewBox="0 0 240 260"
        className={emblemClassName || className || "w-20 h-20"}
        aria-label={brandConfig.name}
        role="img"
      >
        {renderDefs()}
        {renderEmblemPaths()}
      </svg>
    );
  }

  if (variant === "vertical") {
    return (
      <svg
        viewBox="0 0 600 450"
        className={className || "w-64 h-auto"}
        aria-label={`${brandConfig.name} — ${brandConfig.descriptor}`}
        role="img"
      >
        {renderDefs()}
        <g transform="translate(180, 4)">{renderEmblemPaths()}</g>
        <g transform="translate(0, 256)">{renderWordmarkPaths()}</g>
        <text
          x="300"
          y="376"
          dx="5"
          textAnchor="middle"
          fontFamily="Cinzel, Georgia, 'Times New Roman', serif"
          fontSize="27"
          fontWeight="500"
          letterSpacing="10"
          fill={`url(#${gold3D})`}
        >
          SABIDURÍA
        </text>
        <g transform="translate(300, 400)">
          <path d="M -185 0 L -24 -0.9 L -24 0.9 Z" fill={`url(#${gold3D})`} opacity="0.85" />
          <path d="M 185 0 L 24 -0.9 L 24 0.9 Z" fill={`url(#${gold3D})`} opacity="0.85" />
          <circle cx="-15" cy="0" r="2.2" fill="#ebd07e" />
          <circle cx="15" cy="0" r="2.2" fill="#ebd07e" />
          <path
            d="M 0 -9.5 L 2.3 -2.3 L 9.5 0 L 2.3 2.3 L 0 9.5 L -2.3 2.3 L -9.5 0 L -2.3 -2.3 Z"
            fill={`url(#${goldBevel})`}
            filter={`url(#${celestialGlow})`}
          />
        </g>
        {showDescriptor && (
          <text
            x="300"
            y="432"
            dx="3.25"
            textAnchor="middle"
            fontFamily="Cinzel, Georgia, 'Times New Roman', serif"
            fontSize="13.5"
            fontWeight="400"
            letterSpacing="6.5"
            fill="#dfd3c0"
          >
            BOUTIQUE CEREMONIAL
          </text>
        )}
      </svg>
    );
  }

  // Default: Horizontal Lockup for Header & Footer
  return (
    <span className={`inline-flex items-center gap-2.5 sm:gap-3 ${className}`}>
      <svg
        viewBox="0 0 240 260"
        className={
          emblemClassName ||
          "w-10 h-10 sm:w-11 sm:h-11 shrink-0 transition-transform duration-500 group-hover:scale-105"
        }
        aria-hidden="true"
      >
        {renderDefs()}
        {renderEmblemPaths()}
      </svg>
      <span className="flex flex-col items-center">
        <svg
          viewBox="82 6 436 78"
          className="h-5 sm:h-6 w-auto"
          aria-label={brandConfig.name}
          role="img"
        >
          {renderDefs()}
          {renderWordmarkPaths()}
        </svg>
        {showDescriptor && (
          <span className="text-[9px] tracking-[0.28em] pl-[0.28em] uppercase text-parchment-dim group-hover:text-gold/90 transition-colors duration-300 leading-tight mt-0.5 text-center">
            {brandConfig.descriptor}
          </span>
        )}
      </span>
    </span>
  );
};
