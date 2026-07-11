import type { MetadataRoute } from "next";
import { samplePosts } from "@/lib/domain/blog";
import { sampleProperties } from "@/lib/domain/properties";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const staticRoutes = [
    "",
    "/comprar",
    "/vender-mi-vivienda",
    "/hipotecas",
    "/servicios",
    "/blog",
    "/sobre-aktua-home",
    "/contacto",
    "/politica-privacidad",
    "/politica-cookies",
    "/aviso-legal"
  ];

  return [
    ...staticRoutes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date() })),
    ...sampleProperties.map((property) => ({ url: `${baseUrl}/comprar/${property.slug}`, lastModified: new Date() })),
    ...samplePosts.map((post) => ({ url: `${baseUrl}/blog/${post.slug}`, lastModified: new Date(post.publishedAt) }))
  ];
}
