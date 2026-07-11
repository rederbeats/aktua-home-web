import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { uploadPropertyImagesAction } from "@/app/admin/actions";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Fotos del inmueble"
};

export default async function PropertyImagesPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const { id } = await params;
  const { error, success } = await searchParams;
  const supabase = createAdminClient();

  const [{ data: property }, { data: images }] = await Promise.all([
    supabase.from("properties").select("id, title, internal_reference").eq("id", id).single(),
    supabase.from("property_images").select("id, storage_path, alt_text, sort_order, is_cover").eq("property_id", id).order("sort_order")
  ]);

  if (!property) notFound();

  const imagesWithUrls =
    images?.map((image) => {
      const { data } = supabase.storage.from("property-images").getPublicUrl(image.storage_path);
      return { ...image, publicUrl: data.publicUrl };
    }) ?? [];

  return (
    <section>
      <Link href="/admin/properties" className="text-sm font-bold text-brand-red">
        Volver a inmuebles
      </Link>
      <p className="mt-5 text-sm font-bold uppercase text-brand-red">Fotos</p>
      <h1 className="mt-2 text-4xl font-black">{property.title}</h1>
      <p className="mt-2 text-sm text-neutral-500">Referencia {property.internal_reference}</p>

      {error ? <Notice tone="error" message={decodeURIComponent(error)} /> : null}
      {success ? <Notice tone="success" message="Fotos subidas correctamente." /> : null}

      <form action={uploadPropertyImagesAction} className="mt-6 grid gap-4 rounded-lg border border-black/10 bg-white p-5 shadow-soft">
        <input type="hidden" name="property_id" value={property.id} />
        <label className="grid gap-2 text-sm font-semibold text-neutral-700">
          Subir fotos
          <input className="rounded-md border border-black/10 p-3" name="images" type="file" accept="image/*" multiple required />
        </label>
        <p className="text-sm leading-6 text-neutral-500">
          Puedes seleccionar varias imagenes a la vez. Se guardaran en Supabase Storage en el bucket `property-images`.
        </p>
        <button className="h-11 w-fit rounded-md bg-brand-red px-5 font-bold text-white" type="submit">
          Subir fotos
        </button>
      </form>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {imagesWithUrls.map((image) => (
          <article key={image.id} className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-soft">
            <div className="relative aspect-[4/3] bg-neutral-100">
              <Image src={image.publicUrl} alt={image.alt_text || property.title} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
              {image.is_cover ? <span className="absolute left-3 top-3 rounded-md bg-brand-red px-2 py-1 text-xs font-bold text-white">Portada</span> : null}
            </div>
            <div className="p-3 text-sm text-neutral-600">Orden {image.sort_order}</div>
          </article>
        ))}
      </div>

      {!imagesWithUrls.length ? <div className="mt-8 rounded-lg border border-black/10 bg-white p-8 text-center text-neutral-500">Este inmueble todavia no tiene fotos.</div> : null}
    </section>
  );
}

function Notice({ tone, message }: { tone: "error" | "success"; message: string }) {
  const styles = tone === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700";
  return <div className={`mt-5 rounded-md border p-3 text-sm font-semibold ${styles}`}>{message}</div>;
}
