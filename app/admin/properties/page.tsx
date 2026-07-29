import type { Metadata } from "next";
import Link from "next/link";
import { deletePropertyAction, movePropertyOrderAction, togglePropertyPublicationAction } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Inmuebles admin"
};

type WebOrder = {
  position: number;
  isFirst: boolean;
  isLast: boolean;
};

type PropertyRow = {
  id: string;
  internal_reference: string | null;
  title: string;
  operation: "sale" | "rent";
  price: number | string | null;
  municipality: string | null;
  status: string;
  published_at: string | null;
  is_featured: boolean;
  created_at: string;
};

export default async function AdminPropertiesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("properties")
    .select("id, internal_reference, title, operation, price, municipality, status, published_at, is_featured, created_at")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  const properties = (data ?? []) as PropertyRow[];
  const webProperties = properties.filter((property) => property.published_at && ["available", "reserved"].includes(property.status));
  const webOrder = new Map(
    webProperties.map((property, index) => [
      property.id,
      {
        position: index + 1,
        isFirst: index === 0,
        isLast: index === webProperties.length - 1
      }
    ])
  );

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase text-brand-red">Admin</p>
          <h1 className="mt-2 text-4xl font-black">Inmuebles</h1>
        </div>
        <Link href="/admin/properties/new" className="inline-flex h-11 items-center rounded-md bg-brand-red px-4 font-bold text-white">
          Nuevo inmueble
        </Link>
      </div>

      {error ? <ErrorBox message={error.message} /> : null}

      <div className="mt-6 grid gap-3 md:hidden">
        {properties.map((property) => {
          const order = webOrder.get(property.id);

          return (
            <article key={property.id} className="rounded-lg border border-black/10 bg-white p-4 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase text-brand-red">{property.internal_reference || "Sin referencia"}</p>
                  <h2 className="mt-1 break-words text-xl font-black leading-tight">{property.title}</h2>
                  <p className="mt-2 text-sm text-neutral-600">
                    {property.operation === "sale" ? "Venta" : "Alquiler"} · {property.price ? formatCurrency(Number(property.price)) : "Sin precio"}
                  </p>
                </div>
                <span className="shrink-0 rounded-md bg-neutral-100 px-2 py-1 text-xs font-black text-neutral-700">
                  {property.published_at ? "Publicado" : "Oculto"}
                </span>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <Info label="Estado" value={translateStatus(property.status)} />
                <Info label="Orden web" value={order ? String(order.position) : "No visible"} />
              </dl>

              <div className="mt-4">
                <OrderControls propertyId={property.id} order={order} />
              </div>

              <ActionControls property={property} />
            </article>
          );
        })}
        {!properties.length ? <EmptyState /> : null}
      </div>

      <div className="mt-6 hidden overflow-x-auto rounded-lg border border-black/10 bg-white shadow-soft md:block">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-neutral-100 text-neutral-600">
            <tr>
              <th className="px-4 py-3">Orden web</th>
              <th className="px-4 py-3">Referencia</th>
              <th className="px-4 py-3">T&iacute;tulo</th>
              <th className="px-4 py-3">Operaci&oacute;n</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Publicado</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => {
              const order = webOrder.get(property.id);

              return (
                <tr key={property.id} className="border-t border-black/10">
                  <td className="px-4 py-3 align-top">
                    <OrderControls propertyId={property.id} order={order} />
                  </td>
                  <td className="px-4 py-3 font-semibold align-top">{property.internal_reference}</td>
                  <td className="px-4 py-3 align-top">{property.title}</td>
                  <td className="px-4 py-3 align-top">{property.operation === "sale" ? "Venta" : "Alquiler"}</td>
                  <td className="px-4 py-3 align-top">{property.price ? formatCurrency(Number(property.price)) : "-"}</td>
                  <td className="px-4 py-3 align-top">{translateStatus(property.status)}</td>
                  <td className="px-4 py-3 align-top">{property.published_at ? "S\u00ed" : "No"}</td>
                  <td className="px-4 py-3 align-top">
                    <ActionControls property={property} />
                  </td>
                </tr>
              );
            })}
            {!properties.length ? (
              <tr>
                <td className="px-4 py-8 text-center text-neutral-500" colSpan={8}>
                  Todav&iacute;a no hay inmuebles.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-neutral-50 p-3">
      <dt className="text-xs font-bold uppercase text-neutral-500">{label}</dt>
      <dd className="mt-1 font-black text-neutral-900">{value}</dd>
    </div>
  );
}

function OrderControls({ propertyId, order }: { propertyId: string; order?: WebOrder }) {
  if (!order) return <span className="text-xs font-semibold text-neutral-400">No visible</span>;

  return (
    <div className="grid grid-cols-[auto_1fr_1fr] items-center gap-2 md:flex md:flex-wrap">
      <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-md bg-brand-dark px-2 font-black text-white">
        {order.position}
      </span>
      <form action={movePropertyOrderAction}>
        <input type="hidden" name="property_id" value={propertyId} />
        <input type="hidden" name="direction" value="up" />
        <button className="h-10 w-full rounded-md bg-neutral-100 px-3 font-bold text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40" type="submit" disabled={order.isFirst}>
          Subir
        </button>
      </form>
      <form action={movePropertyOrderAction}>
        <input type="hidden" name="property_id" value={propertyId} />
        <input type="hidden" name="direction" value="down" />
        <button className="h-10 w-full rounded-md bg-neutral-100 px-3 font-bold text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40" type="submit" disabled={order.isLast}>
          Bajar
        </button>
      </form>
    </div>
  );
}

function ActionControls({ property }: { property: PropertyRow }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2 md:mt-0 md:flex md:flex-wrap md:items-center">
      <Link className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-100 px-3 font-bold text-neutral-700" href={`/admin/properties/${property.id}/edit`}>
        Editar
      </Link>
      <Link className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-100 px-3 font-bold text-brand-red" href={`/admin/properties/${property.id}/images`}>
        Fotos
      </Link>
      <form action={togglePropertyPublicationAction}>
        <input type="hidden" name="property_id" value={property.id} />
        <input type="hidden" name="next_state" value={property.published_at ? "unpublish" : "publish"} />
        <button className="h-10 w-full rounded-md bg-neutral-100 px-3 font-bold text-neutral-700" type="submit">
          {property.published_at ? "Desactivar" : "Activar"}
        </button>
      </form>
      <form action={deletePropertyAction}>
        <input type="hidden" name="property_id" value={property.id} />
        <button className="h-10 w-full rounded-md bg-red-50 px-3 font-bold text-red-700" type="submit">
          Eliminar
        </button>
      </form>
    </div>
  );
}

function EmptyState() {
  return <div className="rounded-lg border border-black/10 bg-white p-8 text-center text-neutral-500 shadow-soft">Todav&iacute;a no hay inmuebles.</div>;
}

function ErrorBox({ message }: { message: string }) {
  return <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{message}</div>;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}

function translateStatus(status: string) {
  return {
    available: "Disponible",
    reserved: "Reservado",
    sold: "Vendido"
  }[status] ?? status;
}
