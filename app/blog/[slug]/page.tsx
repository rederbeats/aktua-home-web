import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { samplePosts } from "@/lib/domain/blog";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return samplePosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = samplePosts.find((item) => item.slug === slug);
  return {
    title: post?.title ?? "Artículo",
    description: post?.excerpt ?? "Artículo inmobiliario de " + siteConfig.brandName + "."
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = samplePosts.find((item) => item.slug === slug);
  if (!post) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: siteConfig.brandName }
  };

  return (
    <article className="container max-w-3xl py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <p className="text-sm font-bold uppercase text-brand-red">{post.category}</p>
      <h1 className="mt-2 text-4xl font-black leading-tight">{post.title}</h1>
      <p className="mt-4 text-lg leading-8 text-neutral-600">{post.excerpt}</p>
      <div className="prose mt-8 max-w-none">
        <p>
          Contenido inicial del articulo. En la fase del blog se conectara a Supabase con categorias, etiquetas,
          estados de públicacion, imagen social, metadatos dinámicos y artículos relacionados.
        </p>
      </div>
    </article>
  );
}
