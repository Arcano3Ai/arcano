import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogPosts, BlogPost } from "@/data/blog";
import { brandConfig } from "@/config/brandConfig";
import { getAssetPath } from "@/lib/utils";

import { siteConfig } from "@/config/siteConfig";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Artículo no encontrado" };

  const postImageUrl = post.imageUrl.startsWith("http")
    ? post.imageUrl
    : `${siteConfig.url}${post.imageUrl}`;

  return {
    title: `${post.title} | Blog de Tarot ARCANO`,
    description: post.excerpt,
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}/`,
    },
    openGraph: {
      title: `${post.title} | ${brandConfig.name}`,
      description: post.excerpt,
      type: "article",
      url: `${siteConfig.url}/blog/${post.slug}/`,
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [
        {
          url: postImageUrl,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [postImageUrl],
    },
  };
}

export default function BlogPostDetailPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) =>
    post.relatedSlugs.includes(p.slug)
  );

  const postImageUrl = post.imageUrl.startsWith("http")
    ? post.imageUrl
    : `${siteConfig.url}${post.imageUrl}`;

  const blogSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${siteConfig.url}/blog/${post.slug}/#article`,
        headline: post.title,
        description: post.excerpt,
        image: postImageUrl,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
          "@type": "Person",
          name: post.author,
        },
        publisher: {
          "@type": "Organization",
          name: brandConfig.name,
          logo: {
            "@type": "ImageObject",
            url: `${siteConfig.url}/icons/icon-512x512.png`,
          },
        },
        mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}/`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${siteConfig.url}/blog/`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: `${siteConfig.url}/blog/${post.slug}/`,
          },
        ],
      },
    ],
  };

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      {/* Navegación breadcrumb */}
      <nav className="text-xs uppercase tracking-[0.2em] text-parchment-dim font-sans mb-8 flex items-center gap-2">
        <Link href="/blog" className="hover:text-gold transition-colors">
          Revista
        </Link>
        <span>/</span>
        <span className="text-gold">{post.category}</span>
      </nav>

      <header className="space-y-4 pb-8 border-b border-charcoal-border">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold font-sans">
          <span>{post.category}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-parchment tracking-wide font-light leading-tight">
          {post.title}
        </h1>

        <div className="pt-2 flex items-center gap-3 text-xs text-parchment-dim font-sans">
          <span>Por {post.author}</span>
          <span>·</span>
          <span>{post.publishedAt}</span>
        </div>
      </header>

      {/* Imagen Principal */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden my-8 border border-charcoal-border shadow-xl">
        <Image
          src={getAssetPath(post.imageUrl)}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 768px"
        />
      </div>

      {/* Contenido del Artículo */}
      <div className="space-y-8 text-parchment-muted font-sans font-light text-sm sm:text-base leading-relaxed">
        {/* Intro */}
        <p className="font-serif italic text-lg sm:text-xl text-parchment font-light border-l-2 border-gold pl-4 py-1">
          {post.content.intro}
        </p>

        {/* Secciones */}
        {post.content.sections.map((section, idx) => (
          <div key={idx} className="space-y-3 pt-4">
            <h2 className="font-serif text-xl sm:text-2xl text-parchment font-medium tracking-wide">
              {section.heading}
            </h2>
            {section.body.map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>
        ))}

        {/* Conclusión */}
        <div className="pt-6 border-t border-charcoal-border space-y-4">
          <h3 className="font-serif text-lg sm:text-xl text-parchment font-medium">
            Integración de la Lección
          </h3>
          <p>{post.content.conclusion}</p>
        </div>

        {/* Pregunta de reflexión */}
        <div className="p-6 sm:p-8 rounded-xl bg-gold/5 border border-gold/30 text-center my-8">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-sans block mb-2 font-medium">
            Pregunta para tu Cuaderno de Reflexión
          </span>
          <p className="font-serif text-lg sm:text-xl text-parchment italic">
            &ldquo;{post.content.reflectionQuestion}&rdquo;
          </p>
        </div>
      </div>

      {/* CTA final del artículo */}
      <div className="my-12 p-8 rounded-xl bg-gradient-to-b from-charcoal to-obsidian border border-charcoal-border text-center space-y-4">
        <span className="text-gold text-xl font-serif">✦</span>
        <h3 className="font-serif text-2xl text-parchment font-light">
          ¿Deseas observar cómo operan estos símbolos en tu momento presente?
        </h3>
        <p className="text-xs sm:text-sm text-parchment-muted max-w-md mx-auto">
          Coordina una sesión ceremonial de lectura personalizada con ARCANO.
        </p>
        <div className="pt-2">
          <Link
            href="/reservar"
            className="inline-block px-8 py-3 text-xs uppercase tracking-[0.25em] font-sans text-obsidian bg-gold hover:bg-gold-light transition-all rounded-sm font-medium shadow-[0_0_20px_rgba(198,160,82,0.3)]"
          >
            Reservar lectura ✦
          </Link>
        </div>
      </div>

      {/* Artículos Relacionados */}
      {relatedPosts.length > 0 && (
        <section className="pt-12 border-t border-charcoal-border">
          <h4 className="font-serif text-xl text-parchment mb-6 font-light">
            Ensayos Relacionados
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="group p-5 rounded-lg border border-charcoal-border bg-charcoal/30 hover:border-gold/40 transition-all block"
              >
                <span className="text-[10px] uppercase tracking-wider text-gold font-sans block mb-1">
                  {rel.category}
                </span>
                <h5 className="font-serif text-base text-parchment group-hover:text-gold transition-colors font-medium">
                  {rel.title}
                </h5>
                <span className="text-xs text-parchment-dim font-sans mt-3 inline-block">
                  Leer →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
