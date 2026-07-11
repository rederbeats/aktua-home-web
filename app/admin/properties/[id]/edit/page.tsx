import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updatePropertyAction } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Editar inmueble"
};

export default async function EditPropertyPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const supabase = await createClient();
  const { data: property } = await supabase.from("properties").select("*").eq("id", id).single();

  if (!property) notFound();

  return (
    <section>
      <Link href="/admin/properties" className="text-sm font-bold text-brand-red">
        Volver a inmuebles
      </Link>
      <p className="mt-5 text-sm font-bold uppercase text-brand-red">Admin</p>
      <h1 className="mt-2 text-4xl font-black">Editar inmueble</h1>
      {error ? <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{decodeURIComponent(error)}</div> : null}
      <form action={updatePropertyAction} className="mt-6 grid gap-5 rounded-lg border border-black/10 bg-white p-5 shadow-soft">
        <input type="hidden" name="property_id" value={property.id} />
        <div className="grid gap-4 md:grid-cols-2">
          <Field name="internal_reference" label="Referencia interna" defaultValue={property.internal_reference} required />
          <Field name="title" label="Titulo" defaultValue={property.title} required />
          <Select name="property_type" label="Tipo" defaultValue={property.property_type} options={["Piso", "Casa", "Atico", "Chalet", "Local", "Garaje"]} />
          <Select name="operation" label="Operacion" defaultValue={property.operation} options={[["sale", "Venta"], ["rent", "Alquiler"]]} />
          <Field name="price" label="Precio" type="number" defaultValue={property.price ?? ""} />
          <Select
            name="status"
            label="Estado"
            defaultValue={property.status}
            options={[
              ["available", "Disponible"],
              ["reserved", "Reservado"],
              ["sold", "Vendido"]
            ]}
          />
          <Field name="province" label="Provincia" defaultValue={property.province ?? ""} />
          <Field name="municipality" label="Municipio" defaultValue={property.municipality ?? ""} />
          <Field name="neighborhood" label="Barrio o zona" defaultValue={property.neighborhood ?? ""} />
          <Field name="public_address" label="Direccion publica o zona" defaultValue={property.public_address ?? ""} />
          <Field name="built_area" label="Superficie construida" type="number" defaultValue={property.built_area ?? ""} />
          <Field name="bedrooms" label="Habitaciones" type="number" defaultValue={property.bedrooms ?? ""} />
          <Field name="bathrooms" label="Baños" type="number" defaultValue={property.bathrooms ?? ""} />
          <Field name="tags" label="Etiquetas separadas por coma" defaultValue={(property.tags ?? []).join(", ")} />
        </div>
        <label className="grid gap-1 text-sm font-semibold text-neutral-700">
          Descripcion
          <textarea className="min-h-36 rounded-md border border-black/10 p-3" name="description" defaultValue={property.description ?? ""} />
        </label>
        <fieldset className="grid gap-3 border-0 p-0">
          <legend className="text-sm font-semibold text-neutral-700">Caracteristicas</legend>
          <div className="flex flex-wrap gap-3">
            <Checkbox name="has_elevator" label="Ascensor" checked={property.has_elevator} />
            <Checkbox name="has_terrace" label="Terraza" checked={property.has_terrace} />
            <Checkbox name="has_garage" label="Garaje" checked={property.has_garage} />
            <Checkbox name="has_storage_room" label="Trastero" checked={property.has_storage_room} />
            <Checkbox name="has_pool" label="Piscina" checked={property.has_pool} />
          </div>
        </fieldset>
        <div className="flex flex-wrap gap-5">
          <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
            <input name="is_featured" type="checkbox" value="true" defaultChecked={property.is_featured} />
            Destacado
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
            <input name="publish" type="checkbox" value="true" defaultChecked={Boolean(property.published_at)} />
            Publicar en la web
          </label>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="h-11 rounded-md bg-brand-red px-5 font-bold text-white" type="submit">
            Guardar cambios
          </button>
          <Link href={`/admin/properties/${property.id}/images`} className="inline-flex h-11 items-center rounded-md border border-black/15 px-5 font-bold">
            Gestionar fotos
          </Link>
        </div>
      </form>
    </section>
  );
}

function Checkbox({ name, label, checked = false }: { name: string; label: string; checked?: boolean }) {
  return (
    <label className="flex min-h-10 items-center gap-2 rounded-md bg-neutral-100 px-3 text-sm font-semibold text-neutral-700">
      <input name={name} type="checkbox" value="true" defaultChecked={checked} />
      {label}
    </label>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  defaultValue
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-neutral-700">
      {label}
      <input className="h-11 rounded-md border border-black/10 px-3" name={name} type={type} required={required} defaultValue={defaultValue} />
    </label>
  );
}

function Select({
  name,
  label,
  options,
  defaultValue
}: {
  name: string;
  label: string;
  options: (string | [string, string])[];
  defaultValue?: string;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-neutral-700">
      {label}
      <select className="h-11 rounded-md border border-black/10 bg-white px-3" name={name} defaultValue={defaultValue}>
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
