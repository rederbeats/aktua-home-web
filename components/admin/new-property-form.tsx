"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createPropertyInlineAction, uploadPropertyImageInlineAction } from "@/app/admin/actions";

export function NewPropertyForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const files = Array.from(imagesRef.current?.files ?? []);
    const formData = new FormData(form);
    formData.delete("images");

    setIsSaving(true);
    setError(null);
    setStatus("Creando inmueble...");

    const created = await createPropertyInlineAction(formData);

    if (!created.ok) {
      setError(created.error);
      setStatus(null);
      setIsSaving(false);
      return;
    }

    for (const [index, file] of files.entries()) {
      setStatus(`Subiendo foto ${index + 1} de ${files.length}...`);

      const imageData = new FormData();
      imageData.append("property_id", created.propertyId);
      imageData.append("images", file);

      const uploaded = await uploadPropertyImageInlineAction(imageData);

      if (!uploaded.ok) {
        setError(`El inmueble se ha creado, pero no se pudo subir "${file.name}": ${uploaded.error}`);
        setStatus(null);
        setIsSaving(false);
        router.push(`/admin/properties/${created.propertyId}/images?error=${encodeURIComponent(uploaded.error)}`);
        return;
      }
    }

    formRef.current?.reset();
    router.push(`/admin/properties/${created.propertyId}/images?success=created`);
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} data-no-loading className="mt-6 grid gap-5 rounded-lg border border-black/10 bg-white p-5 shadow-soft">
      {error ? <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</div> : null}
      {status ? <div className="rounded-md border border-red-100 bg-red-50 p-3 text-sm font-semibold text-brand-red">{status}</div> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Field name="internal_reference" label="Referencia interna" required disabled={isSaving} />
        <Field name="title" label="Titulo" required disabled={isSaving} />
        <Select name="property_type" label="Tipo" options={["Piso", "Casa", "Atico", "Chalet", "Local", "Garaje"]} disabled={isSaving} />
        <Select name="operation" label="Operacion" options={[["sale", "Venta"], ["rent", "Alquiler"]]} disabled={isSaving} />
        <Field name="price" label="Precio" type="number" disabled={isSaving} />
        <Select name="status" label="Estado" options={[["available", "Disponible"], ["reserved", "Reservado"], ["sold", "Vendido"]]} disabled={isSaving} />
        <Field name="province" label="Provincia" disabled={isSaving} />
        <Field name="municipality" label="Municipio" disabled={isSaving} />
        <Field name="neighborhood" label="Barrio o zona" disabled={isSaving} />
        <Field name="public_address" label="Direccion publica o zona" disabled={isSaving} />
        <Field name="built_area" label="Superficie construida" type="number" disabled={isSaving} />
        <Field name="bedrooms" label="Habitaciones" type="number" disabled={isSaving} />
        <Field name="bathrooms" label="Banos" type="number" disabled={isSaving} />
        <Field name="tags" label="Etiquetas separadas por coma" disabled={isSaving} />
      </div>

      <label className="grid gap-1 text-sm font-semibold text-neutral-700">
        Descripcion
        <textarea className="min-h-36 rounded-md border border-black/10 p-3" name="description" disabled={isSaving} />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-neutral-700">
        Fotos del inmueble
        <input ref={imagesRef} className="rounded-md border border-black/10 p-3" name="images" type="file" accept="image/*" multiple disabled={isSaving} />
        <span className="text-sm font-normal leading-6 text-neutral-500">
          Puedes seleccionar varias fotos. Primero se creara el inmueble y despues se subiran una a una para evitar errores por tamano.
        </span>
      </label>

      <fieldset className="grid gap-3 border-0 p-0" disabled={isSaving}>
        <legend className="text-sm font-semibold text-neutral-700">Caracteristicas</legend>
        <div className="flex flex-wrap gap-3">
          <Checkbox name="has_elevator" label="Ascensor" />
          <Checkbox name="has_terrace" label="Terraza" />
          <Checkbox name="has_garage" label="Garaje" />
          <Checkbox name="has_storage_room" label="Trastero" />
          <Checkbox name="has_pool" label="Piscina" />
        </div>
      </fieldset>

      <div className="flex flex-wrap gap-5">
        <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
          <input name="is_featured" type="checkbox" value="true" disabled={isSaving} />
          Destacado
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
          <input name="publish" type="checkbox" value="true" defaultChecked disabled={isSaving} />
          Publicar en la web
        </label>
      </div>

      <button className="h-11 w-fit rounded-md bg-brand-red px-5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={isSaving}>
        {isSaving ? "Guardando..." : "Guardar inmueble"}
      </button>
    </form>
  );
}

function Checkbox({ name, label }: { name: string; label: string }) {
  return (
    <label className="flex min-h-10 items-center gap-2 rounded-md bg-neutral-100 px-3 text-sm font-semibold text-neutral-700">
      <input name={name} type="checkbox" value="true" />
      {label}
    </label>
  );
}

function Field({ name, label, type = "text", required = false, disabled = false }: { name: string; label: string; type?: string; required?: boolean; disabled?: boolean }) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-neutral-700">
      {label}
      <input className="h-11 rounded-md border border-black/10 px-3" name={name} type={type} required={required} disabled={disabled} />
    </label>
  );
}

function Select({ name, label, options, disabled = false }: { name: string; label: string; options: (string | [string, string])[]; disabled?: boolean }) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-neutral-700">
      {label}
      <select className="h-11 rounded-md border border-black/10 bg-white px-3" name={name} disabled={disabled}>
        {options.map((option) => {
          const value = Array.isArray(option) ? option[0] : option;
          const labelText = Array.isArray(option) ? option[1] : option;
          return (
            <option key={value} value={value}>
              {labelText}
            </option>
          );
        })}
      </select>
    </label>
  );
}
