import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUp, Star } from "lucide-react";
import { movePropertyImageAction, setPropertyImageCoverAction } from "@/app/admin/actions";
import { PropertyImageUploadForm } from "@/components/admin/property-image-upload-form";
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
      {success ? <Notice tone="success" message={successMessage(success)} /> : null}

      <PropertyImageUploadForm propertyId={property.id} />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {imagesWithUrls.map((image, index) => (
          <article key={image.id} className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-soft">
            <div className="relative aspect-[4/3] bg-neutral-100">
              <Image src={image.publicUrl} alt={image.alt_text || property.title} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
              {image.is_cover ? <span className="absolute left-3 top-3 rounded-md bg-brand-red px-2 py-1 text-xs font-bold text-white">Portada</span> : null}
            </div>
            <div className="grid gap-3 p-3 text-sm text-neutral-600">
              <div className="flex items-center justify-between gap-3">
                <span className="font-bold text-neutral-800">Orden {index + 1}</span>
                <span className="text-xs text-neutral-400">{image.alt_text || "Foto"}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <ImageMoveButton propertyId={property.id} imageId={image.id} direction="up" disabled={index === 0} label="Subir" />
                <ImageMoveButton propertyId={property.id} imageId={image.id} direction="down" disabled={index === imagesWithUrls.length - 1} label="Bajar" />
              </div>
              {!image.is_cover ? (
                <form action={setPropertyImageCoverAction}>
                  <input type="hidden" name="property_id" value={property.id} />
                  <input type="hidden" name="image_id" value={image.id} />
                  <button type="submit" className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-black/10 bg-white px-3 font-bold text-brand-red hover:border-brand-red">
                    <Star size={16} /> Usar como portada
                  </button>
                </form>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      {!imagesWithUrls.length ? <div className="mt-8 rounded-lg border border-black/10 bg-white p-8 text-center text-neutral-500">Este inmueble todavia no tiene fotos.</div> : null}
    </section>
  );
}

function ImageMoveButton({ propertyId, imageId, direction, disabled, label }: { propertyId: string; imageId: string; direction: "up" | "down"; disabled: boolean; label: string }) {
  const Icon = direction === "up" ? ArrowUp : ArrowDown;

  return (
    <form action={movePropertyImageAction}>
      <input type="hidden" name="property_id" value={propertyId} />
      <input type="hidden" name="image_id" value={imageId} />
      <input type="hidden" name="direction" value={direction} />
      <button type="submit" disabled={disabled} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-neutral-100 px-3 font-bold text-neutral-700 hover:text-brand-red disabled:cursor-not-allowed disabled:opacity-40">
        <Icon size={16} /> {label}
      </button>
    </form>
  );
}

function Notice({ tone, message }: { tone: "error" | "success"; message: string }) {
  const styles = tone === "error" ? "border-red-200 bg-red-50 text-red-700" : "border-green-200 bg-green-50 text-green-700";
  return <div className={`mt-5 rounded-md border p-3 text-sm font-semibold ${styles}`}>{message}</div>;
}

function successMessage(success: string) {
  return {
    created: "Fotos subidas correctamente.",
    uploaded: "Fotos subidas correctamente.",
    ordered: "Orden de fotos actualizado.",
    cover: "Foto de portada actualizada."
  }[success] ?? "Cambios guardados correctamente.";
}
