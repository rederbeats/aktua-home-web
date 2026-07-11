import type { Metadata } from "next";
import { createBlogPostAction } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Nueva entrada"
};

export default async function NewBlogPostPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  return (
    <section>
      <p className="text-sm font-bold uppercase text-brand-red">Admin</p>
      <h1 className="mt-2 text-4xl font-black">Nueva entrada</h1>
      {error ? <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{decodeURIComponent(error)}</div> : null}
      <form action={createBlogPostAction} className="mt-6 grid gap-5 rounded-lg border border-black/10 bg-white p-5 shadow-soft">
        <Field name="title" label="Titulo" required />
        <label className="grid gap-1 text-sm font-semibold text-neutral-700">
          Extracto
          <textarea className="min-h-24 rounded-md border border-black/10 p-3" name="excerpt" />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-neutral-700">
          Contenido
          <textarea className="min-h-64 rounded-md border border-black/10 p-3" name="content" />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-1 text-sm font-semibold text-neutral-700">
            Estado
            <select className="h-11 rounded-md border border-black/10 bg-white px-3" name="status">
              <option value="draft">Borrador</option>
              <option value="published">Publicado</option>
            </select>
          </label>
          <Field name="tags" label="Etiquetas separadas por coma" />
          <Field name="seo_title" label="Titulo SEO" />
          <Field name="seo_description" label="Descripcion SEO" />
        </div>
        <button className="h-11 w-fit rounded-md bg-brand-red px-5 font-bold text-white" type="submit">
          Guardar entrada
        </button>
      </form>
    </section>
  );
}

function Field({ name, label, required = false }: { name: string; label: string; required?: boolean }) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-neutral-700">
      {label}
      <input className="h-11 rounded-md border border-black/10 px-3" name={name} required={required} />
    </label>
  );
}
