import { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";
import { arcanaList } from "@/data/arcana";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes = [
    "",
    "/academia",
    "/arcanos",
    "/carta-astral",
    "/carta-del-dia",
    "/sinastria",
    "/lecturas",
    "/tienda",
    "/tarot-del-amor",
    "/tarot-profesional",
    "/experiencia",
    "/blog",
    "/contacto",
    "/reservar",
    "/privacidad",
    "/terminos",
    "/cancelaciones",
  ].map((route) => ({
    url: `${baseUrl}${route ? `${route}/` : ""}`,
    lastModified: new Date(),
    changeFrequency: (route === "" ? "daily" : "weekly") as "daily" | "weekly",
    priority: route === "" ? 1.0 : (route === "/academia" || route === "/carta-astral" || route === "/lecturas") ? 0.9 : 0.8,
  }));

  const arcanaRoutes = arcanaList.map((arcana) => ({
    url: `${baseUrl}/arcanos/${arcana.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...arcanaRoutes, ...blogRoutes];
}
