"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadPropertyImageInlineAction } from "@/app/admin/actions";

export function PropertyImageUploadForm({ propertyId }: { propertyId: string }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState({ uploaded: 0, total: 0 });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const files = Array.from(inputRef.current?.files ?? []);

    if (!files.length) {
      setError("Selecciona al menos una imagen.");
      return;
    }

    setIsUploading(true);
    setError(null);
    setMessage(null);
    setProgress({ uploaded: 0, total: files.length });

    for (const [index, file] of files.entries()) {
      const formData = new FormData();
      formData.append("property_id", propertyId);
      formData.append("images", file);

      const result = await uploadPropertyImageInlineAction(formData);

      if (!result.ok) {
        setError(`No se pudo subir "${file.name}": ${result.error}`);
        setIsUploading(false);
        router.refresh();
        return;
      }

      setProgress({ uploaded: index + 1, total: files.length });
    }

    setIsUploading(false);
    setMessage(files.length === 1 ? "Foto subida correctamente." : "Fotos subidas correctamente.");
    formRef.current?.reset();
    router.refresh();
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} data-no-loading className="mt-6 grid gap-4 rounded-lg border border-black/10 bg-white p-5 shadow-soft">
      <label className="grid gap-2 text-sm font-semibold text-neutral-700">
        Subir fotos
        <input ref={inputRef} className="rounded-md border border-black/10 p-3" name="images" type="file" accept="image/*" multiple required disabled={isUploading} />
      </label>
      <p className="text-sm leading-6 text-neutral-500">
        Puedes seleccionar varias imagenes a la vez. La web las subira una a una para evitar errores por tamano en Vercel.
      </p>

      {isUploading ? (
        <div className="rounded-md border border-red-100 bg-red-50 p-3 text-sm font-semibold text-brand-red">
          Subiendo {progress.uploaded} de {progress.total} fotos...
        </div>
      ) : null}
      {message ? <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm font-semibold text-green-700">{message}</div> : null}
      {error ? <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div> : null}

      <button className="h-11 w-fit rounded-md bg-brand-red px-5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={isUploading}>
        {isUploading ? "Subiendo..." : "Subir fotos"}
      </button>
    </form>
  );
}
