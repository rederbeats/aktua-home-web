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

export type BlogPostPreview = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
};

export const samplePosts: BlogPostPreview[] = [];
