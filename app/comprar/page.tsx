import type { Metadata } from "next";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertySearch } from "@/components/properties/property-search";
import { getPublishedProperties, type PropertyFilters } from "@/lib/properties/public-properties";

export const metadata: Metadata = {
  title: "Comprar vivienda",
  description: "Viviendas en venta y alquiler con asesoramiento integral de AKTUA HOME."
};

export default async function ComprarPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const filters = parseFilters(params);
  const properties = await getPublishedProperties(filters);

  return (
    <section className="container py-10 md:py-14">
      <div className="mb-7 rounded-lg border border-black/10 bg-white p-6 shadow-soft md:p-8">
        <p className="section-kicker">Portal inmobiliario</p>
        <h1 className="mt-2 text-4xl font-black leading-tight md:text-6xl">Comprar vivienda</h1>
        <p className="mt-3 max-w-2xl leading-7 text-neutral-600">
          Encuentra viviendas en venta y alquiler con el acompañamiento de AKTUA HOME durante todo el proceso.
        </p>
      </div>
      <PropertySearch filters={filters} />
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      {!properties.length ? (
        <div className="mt-8 rounded-lg border border-black/10 bg-white p-8 text-center text-neutral-500">
          No encontramos viviendas con esos filtros. Contacta con nosotros y te ayudamos a buscar la opción adecuada.
        </div>
      ) : null}
    </section>
  );
}

function parseFilters(params: Record<string, string | string[] | undefined>): PropertyFilters {
  const operation = first(params.operation);
  const sort = first(params.sort);

  return {
    zone: first(params.zone) || undefined,
    type: first(params.type) || undefined,
    operation: operation === "sale" || operation === "rent" ? operation : undefined,
    maxPrice: numberParam(params.maxPrice),
    bedrooms: numberParam(params.bedrooms),
    bathrooms: numberParam(params.bathrooms),
    feature: arrayParam(params.feature),
    sort: sort === "price_asc" || sort === "price_desc" || sort === "recent" ? sort : "recent"
  };
}

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function numberParam(value: string | string[] | undefined) {
  const raw = first(value);
  if (!raw) return undefined;
  const number = Number(raw);
  return Number.isFinite(number) ? number : undefined;
}

function arrayParam(value: string | string[] | undefined) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}
