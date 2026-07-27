import type { Metadata } from "next";
import Link from "next/link";
import { deletePropertyAction, movePropertyOrderAction, togglePropertyPublicationAction } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Inmuebles admin"
};

export default async function AdminPropertiesPage() {
  const supabase = await createClient();
  const { data: properties, error } = await supabase
    .from("properties")
    .select("id, internal_reference, title, operation, price, municipality, status, published_at, is_featured, created_at")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  const webProperties = (properties ?? []).filter((property) => property.published_at && ["available", "reserved"].includes(property.status));
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

      <div className="mt-6 overflow-hidden rounded-lg border border-black/10 bg-white shadow-soft">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-neutral-100 text-neutral-600">
            <tr>
              <th className="px-4 py-3">Orden web</th>
              <th className="px-4 py-3">Referencia</th>
              <th className="px-4 py-3">Título</th>
              <th className="px-4 py-3">Operación</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Publicado</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {(properties ?? []).map((property) => {
              const order = webOrder.get(property.id);

              return (
                <tr key={property.id} className="border-t border-black/10">
                  <td className="px-4 py-3 align-top">
                    {order ? (
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-md bg-brand-dark px-2 font-black text-white">
                          {order.position}
                        </span>
                        <form action={movePropertyOrderAction}>
                          <input type="hidden" name="property_id" value={property.id} />
                          <input type="hidden" name="direction" value="up" />
                          <button
                            className="rounded-md bg-neutral-100 px-3 py-2 font-bold text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
                            type="submit"
                            disabled={order.isFirst}
                          >
                            Subir
                          </button>
                        </form>
                        <form action={movePropertyOrderAction}>
                          <input type="hidden" name="property_id" value={property.id} />
                          <input type="hidden" name="direction" value="down" />
                          <button
                            className="rounded-md bg-neutral-100 px-3 py-2 font-bold text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
                            type="submit"
                            disabled={order.isLast}
                          >
                            Bajar
                          </button>
                        </form>
                      </div>
                    ) : (
                      <span className="text-xs font-semibold text-neutral-400">No visible</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold align-top">{property.internal_reference}</td>
                  <td className="px-4 py-3 align-top">{property.title}</td>
                  <td className="px-4 py-3 align-top">{property.operation === "sale" ? "Venta" : "Alquiler"}</td>
                  <td className="px-4 py-3 align-top">{property.price ? formatCurrency(property.price) : "-"}</td>
                  <td className="px-4 py-3 align-top">{translateStatus(property.status)}</td>
                  <td className="px-4 py-3 align-top">{property.published_at ? "Sí" : "No"}</td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-wrap items-center gap-2">
                      <Link className="rounded-md bg-neutral-100 px-3 py-2 font-bold text-neutral-700" href={`/admin/properties/${property.id}/edit`}>
                        Editar
                      </Link>
                      <Link className="rounded-md bg-neutral-100 px-3 py-2 font-bold text-brand-red" href={`/admin/properties/${property.id}/images`}>
                        Gestionar
                      </Link>
                      <form action={togglePropertyPublicationAction}>
                        <input type="hidden" name="property_id" value={property.id} />
                        <input type="hidden" name="next_state" value={property.published_at ? "unpublish" : "publish"} />
                        <button className="rounded-md bg-neutral-100 px-3 py-2 font-bold text-neutral-700" type="submit">
                          {property.published_at ? "Desactivar" : "Activar"}
                        </button>
                      </form>
                      <form action={deletePropertyAction}>
                        <input type="hidden" name="property_id" value={property.id} />
                        <button className="rounded-md bg-red-50 px-3 py-2 font-bold text-red-700" type="submit">
                          Eliminar
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
            {!properties?.length ? (
              <tr>
                <td className="px-4 py-8 text-center text-neutral-500" colSpan={8}>
                  Todavía no hay inmuebles.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
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
