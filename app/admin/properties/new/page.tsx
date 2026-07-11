import type { Metadata } from "next";
import { createPropertyAction } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Nuevo inmueble"
};

export default async function NewPropertyPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  return (
    <section>
      <p className="text-sm font-bold uppercase text-brand-red">Admin</p>
      <h1 className="mt-2 text-4xl font-black">Nuevo inmueble</h1>
      {error ? <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{decodeURIComponent(error)}</div> : null}
      <form action={createPropertyAction} className="mt-6 grid gap-5 rounded-lg border border-black/10 bg-white p-5 shadow-soft">
        <div className="grid gap-4 md:grid-cols-2">
          <Field name="internal_reference" label="Referencia interna" required />
          <Field name="title" label="Titulo" required />
          <Select name="property_type" label="Tipo" options={["Piso", "Casa", "Atico", "Chalet", "Local", "Garaje"]} />
          <Select name="operation" label="Operacion" options={[["sale", "Venta"], ["rent", "Alquiler"]]} />
          <Field name="price" label="Precio" type="number" />
          <Select name="status" label="Estado" options={[["available", "Disponible"], ["reserved", "Reservado"], ["sold", "Vendido"]]} />
          <Field name="province" label="Provincia" />
          <Field name="municipality" label="Municipio" />
          <Field name="neighborhood" label="Barrio o zona" />
          <Field name="public_address" label="Direccion publica o zona" />
          <Field name="built_area" label="Superficie construida" type="number" />
          <Field name="bedrooms" label="Habitaciones" type="number" />
          <Field name="bathrooms" label="Baños" type="number" />
          <Field name="tags" label="Etiquetas separadas por coma" />
        </div>
        <label className="grid gap-1 text-sm font-semibold text-neutral-700">
          Descripcion
          <textarea className="min-h-36 rounded-md border border-black/10 p-3" name="description" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-neutral-700">
          Fotos del inmueble
          <input className="rounded-md border border-black/10 p-3" name="images" type="file" accept="image/*" multiple />
          <span className="text-sm font-normal leading-6 text-neutral-500">
            Puedes seleccionar varias fotos. La primera se guardara como portada.
          </span>
        </label>
        <fieldset className="grid gap-3 border-0 p-0">
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
            <input name="is_featured" type="checkbox" value="true" />
            Destacado
          </label>
          <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
            <input name="publish" type="checkbox" value="true" defaultChecked />
            Publicar en la web
          </label>
        </div>
        <button className="h-11 w-fit rounded-md bg-brand-red px-5 font-bold text-white" type="submit">
          Guardar inmueble
        </button>
      </form>
    </section>
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

function Field({ name, label, type = "text", required = false }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-neutral-700">
      {label}
      <input className="h-11 rounded-md border border-black/10 px-3" name={name} type={type} required={required} />
    </label>
  );
}

function Select({ name, label, options }: { name: string; label: string; options: (string | [string, string])[] }) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-neutral-700">
      {label}
      <select className="h-11 rounded-md border border-black/10 bg-white px-3" name={name}>
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
