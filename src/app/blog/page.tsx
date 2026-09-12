import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blog";
import { SectionHeader } from "@/components/SectionHeader";
import { getAssetPath } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Revista Editorial & Ensayos Simbólicos",
  description:
    "Artículos sobre tarot, psicología de los arquetipos, simbolismo sagrado y el arte de la introspección personal.",
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <SectionHeader
        subtitle="Publicaciones y Ensayos"
        title="Crónicas de los Símbolos"
        description="Textos meditativos para profundizar en la historia, la filosofía hermética y las lecciones psicológicas que custodian los 22 símbolos mayores."
        symbol="☾"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="group rounded-lg overflow-hidden border border-charcoal-border bg-charcoal/40 hover:border-gold/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={getAssetPath(post.imageUrl)}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 px-2 py-1 bg-obsidian/80 backdrop-blur rounded text-[10px] uppercase tracking-widest text-gold font-sans">
                  {post.category}
                </div>
              </div>

              <div className="p-6">
                <span className="text-[10px] uppercase tracking-wider text-parchment-dim font-sans block mb-2">
                  {post.publishedAt} · {post.readTime}
                </span>
                <h3 className="font-serif text-xl text-parchment group-hover:text-gold transition-colors font-medium leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-parchment-muted font-sans font-light mt-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={`/blog/${post.slug}`}
                className="text-xs uppercase tracking-[0.18em] text-gold hover:text-gold-light font-sans inline-flex items-center gap-1"
              >
                <span>Leer ensayo</span>
                <span>→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
