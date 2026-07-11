import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Blog admin"
};

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("id, title, slug, status, published_at, created_at")
    .order("created_at", { ascending: false });

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase text-brand-red">Admin</p>
          <h1 className="mt-2 text-4xl font-black">Blog</h1>
        </div>
        <Link href="/admin/blog/new" className="inline-flex h-11 items-center rounded-md bg-brand-red px-4 font-bold text-white">
          Nueva entrada
        </Link>
      </div>

      {error ? <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error.message}</div> : null}

      <div className="mt-6 grid gap-3">
        {(posts ?? []).map((post) => (
          <article key={post.id} className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
            <p className="text-sm font-bold text-brand-red">{post.status === "published" ? "Publicado" : "Borrador"}</p>
            <h2 className="mt-1 text-xl font-black">{post.title}</h2>
            <p className="mt-1 text-sm text-neutral-500">/{post.slug}</p>
          </article>
        ))}
        {!posts?.length ? <div className="rounded-lg border border-black/10 bg-white p-8 text-center text-neutral-500">Todavia no hay entradas.</div> : null}
      </div>
    </section>
  );
}
