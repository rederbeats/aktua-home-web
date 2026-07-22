import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  featuredImage: z.string().url().optional(),
  categoryId: z.string().uuid().optional(),
  tags: z.array(z.string()).default([]),
  authorId: z.string().uuid().optional(),
  publishedAt: z.string().datetime().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
  seoTitle: z.string().optional(),
  seoDescription: z.string().max(170).optional(),
  socialImage: z.string().url().optional()
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

export const samplePosts = [
  {
    slug: "como-preparar-vivienda-venta",
    title: "Como preparar tu vivienda antes de vender",
    excerpt: "Pequenas decisiones que ayudan a mejorar la primera impresion, ordenar la documentación y salir al mercado con criterio.",
    category: "Venta",
    publishedAt: "2026-07-10"
  },
  {
    slug: "documentos-comprar-vivienda",
    title: "Documentos clave antes de comprar una vivienda",
    excerpt: "Una guía práctica para revisar cargas, nota simple, gastos previstos y financiación antes de firmar.",
    category: "Compra",
    publishedAt: "2026-07-10"
  }
];
