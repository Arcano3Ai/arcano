import { MetadataRoute } from "next";
import { siteConfig } from "@/config/siteConfig";

export default function robots(): MetadataRoute.Robots {
  const disallowPaths = [
    "/academia/mi-panel/",
    "/academia/login/",
    "/academia/registro/",
    "/academia/cursos/*/aprender/",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowPaths,
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: disallowPaths,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: disallowPaths,
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
