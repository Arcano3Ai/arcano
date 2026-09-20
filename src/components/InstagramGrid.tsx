import React from "react";
import Image from "next/image";
import { socialFeedList } from "@/data/social";
import { brandConfig } from "@/config/brandConfig";
import { getAssetPath, handleImageError } from "@/lib/utils";

export const InstagramGrid: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-gold/80 font-sans">
          Atmósfera Visual
        </span>
        <h3 className="font-serif text-2xl sm:text-4xl text-parchment tracking-[0.1em] mt-2 font-light">
          Desde el Universo de ARCANO
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-parchment-muted font-sans font-light">
          Explora fragmentos de nuestros estudios, simbolismo cotidiano y meditaciones visuales en{" "}
          <a
            href={brandConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            {brandConfig.social.instagramHandle}
          </a>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {socialFeedList.map((item) => (
          <a
            key={item.id}
            href={item.permalink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver publicación ceremonial en Instagram: ${item.caption}`}
            className="group relative aspect-[4/5] rounded-md overflow-hidden border border-charcoal-border hover:border-gold/50 transition-all duration-500 shadow-[0_8px_25px_rgba(0,0,0,0.7)]"
          >
            {/* Imagen con fallback estilizado */}
            <div className="absolute inset-0 bg-[#161622]">
              <Image
                src={getAssetPath(item.imageUrl)}
                alt={item.caption}
                fill
                onError={handleImageError}
                className="object-cover filter brightness-[0.6] contrast-[1.25] saturate-[0.85] opacity-85 group-hover:opacity-100 group-hover:brightness-[0.75] group-hover:scale-105 transition-all duration-700 ease-out"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>

            {/* Overlay con gradiente nocturno */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-deep via-obsidian/40 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

            {/* Símbolo superior */}
            <div className="absolute top-4 right-4 text-xs text-gold/60">
              {item.symbol}
            </div>

            {/* Texto y caption */}
            <div className="absolute inset-x-0 bottom-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs text-parchment font-serif italic line-clamp-3 leading-relaxed">
                &ldquo;{item.caption}&rdquo;
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-sans">
                Ver en Instagram ↗
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
