import { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";
import { arcanaList } from "@/data/arcana";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes = [
    "",
    "/lecturas",
    "/tarot-del-amor",
    "/tarot-profesional",
    "/arcanos",
    "/carta-del-dia",
    "/carta-astral",
    "/sinastria",
    "/experiencia",
    "/blog",
    "/contacto",
    "/reservar",
    "/academia",
    "/privacidad",
    "/terminos",
    "/cancelaciones",
  ].map((route) => ({
    url: `${baseUrl}${route ? `${route}/` : ""}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const arcanaRoutes = arcanaList.map((arcana) => ({
    url: `${baseUrl}/arcanos/${arcana.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...arcanaRoutes, ...blogRoutes];
}
