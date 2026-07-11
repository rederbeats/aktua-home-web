import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Share2, MessageCircle } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { PropertyCard } from "@/components/properties/property-card";
import { getPublishedProperties, getPublishedPropertyBySlug } from "@/lib/properties/public-properties";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const property = await getPublishedPropertyBySlug(slug);
  return {
    title: property?.title ?? "Inmueble",
    description: property ? `${property.title} en ${property.municipality}.` : "Ficha de inmueble"
  };
}

export default async function PropertyDetailPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lead?: string }>;
}) {
  const { slug } = await params;
  const { lead } = await searchParams;
  const property = await getPublishedPropertyBySlug(slug);
  if (!property) notFound();

  const related = (await getPublishedProperties()).filter((item) => item.id !== property.id).slice(0, 2);

  return (
    <section className="container grid gap-8 py-8 md:py-12 lg:grid-cols-[1fr_380px]">
      <article>
        <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-black/10 bg-neutral-100 shadow-[0_24px_70px_rgba(17,17,17,0.13)] md:aspect-[16/8]">
          <Image src={property.imageUrl} alt={property.title} fill className="object-cover" priority />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/55 to-transparent" />
          <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1 text-xs font-black text-brand-dark shadow-lg">
            {property.operation === "sale" ? "Venta" : "Alquiler"}
          </span>
        </div>
        {property.images.length > 1 ? (
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {property.images.slice(1, 5).map((image) => (
              <div key={image.id} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-black/10 bg-neutral-100 shadow-sm">
                <Image src={image.url} alt={image.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        ) : null}
        <div className="mt-7 rounded-lg border border-black/10 bg-white p-6 shadow-soft md:p-8">
          <p className="section-kicker">{property.operation === "sale" ? "Venta" : "Alquiler"}</p>
          <h1 className="mt-2 text-3xl font-black leading-tight md:text-5xl">{property.title}</h1>
          <p className="mt-3 flex items-center gap-2 text-neutral-600">
            <MapPin size={18} className="text-brand-red" />
            {property.municipality}
            {property.neighborhood ? `, ${property.neighborhood}` : ""}
          </p>
          <strong className="mt-5 block text-3xl font-black md:text-4xl">
            {property.price ? new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(property.price) : "Consultar precio"}
          </strong>
          <p className="mt-6 max-w-3xl leading-8 text-neutral-700">{property.description || "Contacta con AKTUA HOME para ampliar informacion sobre este inmueble."}</p>
          <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Fact label="Tipo" value={property.propertyType} />
            <Fact label="Habitaciones" value={property.bedrooms ? `${property.bedrooms}` : "-"} />
            <Fact label="Baños" value={property.bathrooms ? `${property.bathrooms}` : "-"} />
            <Fact label="Superficie" value={property.builtArea ? `${property.builtArea} m2` : "-"} />
            <Fact label="Ascensor" value={property.hasElevator ? "Si" : "No"} />
            <Fact label="Terraza" value={property.hasTerrace ? "Si" : "No"} />
            <Fact label="Garaje" value={property.hasGarage ? "Si" : "No"} />
            <Fact label="Trastero" value={property.hasStorageRoom ? "Si" : "No"} />
            <Fact label="Piscina" value={property.hasPool ? "Si" : "No"} />
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_PHONE || ""}`}
              className="inline-flex h-11 items-center gap-2 rounded-md bg-green-600 px-4 font-bold text-white shadow-sm transition hover:-translate-y-0.5"
            >
              <MessageCircle size={18} /> WhatsApp
            </a>
            <button className="inline-flex h-11 items-center gap-2 rounded-md border border-black/15 bg-white px-4 font-bold shadow-sm transition hover:border-brand-red hover:text-brand-red" type="button">
              <Share2 size={18} /> Compartir
            </button>
          </div>
        </div>
        {related.length ? (
          <div className="mt-12">
            <h2 className="text-2xl font-black">Inmuebles relacionados</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {related.map((item) => (
                <PropertyCard key={item.id} property={item} />
              ))}
            </div>
          </div>
        ) : null}
      </article>
      <aside className="h-fit rounded-lg border border-black/10 bg-white p-5 shadow-[0_24px_70px_rgba(17,17,17,0.12)] lg:sticky lg:top-28">
        <h2 className="text-xl font-black">Solicitar informacion</h2>
        <p className="mb-4 mt-2 text-sm text-neutral-600">Te responderemos para ampliar detalles o resolver dudas.</p>
        <LeadForm type="information" propertyId={property.id} sourcePath={`/comprar/${property.slug}`} status={lead} />
        <div className="my-6 border-t border-black/10" />
        <h2 className="text-xl font-black">Solicitar visita</h2>
        <p className="mb-4 mt-2 text-sm text-neutral-600">Indica fecha orientativa y hora preferida.</p>
        <LeadForm type="viewing" propertyId={property.id} sourcePath={`/comprar/${property.slug}`} status={lead} />
      </aside>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-black/10 bg-paper p-4">
      <dt className="text-sm font-bold text-neutral-500">{label}</dt>
      <dd className="mt-1 text-lg font-black">{value}</dd>
    </div>
  );
}
