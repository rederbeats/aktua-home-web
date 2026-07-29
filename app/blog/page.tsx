import type { Metadata } from "next";
import Link from "next/link";
import { samplePosts } from "@/lib/domain/blog";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Blog inmobiliario",
  description: "Gu\u00edas y consejos inmobiliarios de " + siteConfig.brandName + "."
};

export default function BlogPage() {
  return (
    <section className="container py-10">
      <div className="mb-7">
        <p className="text-sm font-bold uppercase text-brand-red">Blog inmobiliario</p>
        <h1 className="mt-2 text-4xl font-black">Gu&iacute;as para comprar, vender y financiar</h1>
      </div>

      {samplePosts.length ? (
        <div className="grid gap-5 md:grid-cols-2">
          {samplePosts.map((post) => (
            <article key={post.slug} className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
              <p className="text-sm font-bold text-brand-red">{post.category}</p>
              <h2 className="mt-2 text-2xl font-black">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="mt-3 leading-7 text-neutral-600">{post.excerpt}</p>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-black/10 bg-white p-8 text-neutral-600 shadow-soft">
          Pr&oacute;ximamente publicaremos nuevas gu&iacute;as inmobiliarias.
        </div>
      )}
    </section>
  );
}
