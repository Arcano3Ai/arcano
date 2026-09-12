"use client";

import React from "react";
import { brandConfig } from "@/config/brandConfig";

interface Props {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const TarotSocialIcons: React.FC<Props> = ({ className = "", size = "md" }) => {
  const sizeClasses = {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-13 h-13",
  }[size];

  const iconScale = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }[size];

  const socialItems = [
    {
      name: "Instagram",
      handle: brandConfig.social.instagramHandle,
      url: brandConfig.social.instagram,
      sublabel: "Oráculo Visual",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconScale}
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      handle: "@arcanotarot",
      url: brandConfig.social.facebook || "https://facebook.com/arcanotarot",
      sublabel: "Círculo Sagrado",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={iconScale}
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      handle: "@arcanotarot",
      url: brandConfig.social.youtube,
      sublabel: "Visiones & Rituales",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={iconScale}
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: "TikTok",
      handle: brandConfig.social.tiktok.replace("https://tiktok.com/", ""),
      url: brandConfig.social.tiktok,
      sublabel: "Destellos de Luz",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={iconScale}
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3.14 15.7a6.34 6.34 0 0 0 10.82 4.47V12.9a8.27 8.27 0 0 0 5.63 2.24V11.7a4.84 4.84 0 0 1-3.45-1.57 4.82 4.82 0 0 1-1.18-3.44h4.63V6.69z" />
        </svg>
      ),
    },
  ];

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {socialItems.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${item.name} de ARCANO (${item.handle})`}
          title={`${item.name} (${item.handle}) — ${item.sublabel}`}
          className={`group relative ${sizeClasses} rounded-lg flex items-center justify-center transition-all duration-300 ease-out bg-[#0e0e14]/90 border border-charcoal-border hover:border-gold hover:-translate-y-1 hover:bg-[#1a1722] hover:shadow-[0_0_24px_rgba(230,195,100,0.6)] active:scale-95 select-none`}
        >
          {/* Marco interior sutil */}
          <div className="absolute inset-0.5 border border-white/5 rounded-md pointer-events-none group-hover:border-gold/40 transition-colors duration-300" />

          {/* El puro ícono oficial: neutro en reposo, dorado luminoso con resplandor intenso al pasar el mouse */}
          <div className="relative z-10 text-parchment-muted/70 group-hover:text-gold-light group-hover:scale-115 transition-all duration-300 filter group-hover:drop-shadow-[0_0_10px_rgba(255,215,0,0.85)]">
            {item.icon}
          </div>

          {/* Destello radiante áureo al hover */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-gold/0 via-gold/10 to-gold-light/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </a>
      ))}
    </div>
  );
};
