import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { blogPosts, BlogPost } from "@/data/blog";
import { brandConfig } from "@/config/brandConfig";
import { getAssetPath } from "@/lib/utils";
import { siteConfig } from "@/config/siteConfig";
import { BlogPostDetailContent } from "@/components/pages/BlogPostDetailContent";

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BlogPostDetailContent post={post} relatedPosts={relatedPosts} />
    </>
  );
}
