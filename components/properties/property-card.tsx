import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, Home, Maximize2 } from "lucide-react";
import type { PublicPropertyCard as PropertyCardType } from "@/lib/properties/public-properties";

export function PropertyCard({ property }: { property: PropertyCardType }) {
  return (
    <article className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link href={`/comprar/${property.slug}`} className="block focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2">
        <div className="relative aspect-[4/3] bg-neutral-100">
          <Image src={property.imageUrl} alt={property.title} fill className="object-cover" />
          {property.isFeatured ? (
            <span className="absolute left-3 top-3 rounded-md bg-brand-red px-3 py-1 text-xs font-bold text-white">
              Destacado
            </span>
          ) : null}
        </div>
        <div className="grid gap-3 p-4">
          <div>
            <p className="text-sm font-semibold text-brand-red">{property.operation === "sale" ? "Venta" : "Alquiler"}</p>
            <h2 className="mt-1 text-lg font-bold leading-snug">{property.title}</h2>
            <p className="mt-1 text-sm text-neutral-600">
              {property.municipality}
              {property.neighborhood ? `, ${property.neighborhood}` : ""}
            </p>
          </div>
          <strong className="text-2xl">{property.price ? formatCurrency(property.price) : "Consultar precio"}</strong>
          <dl className="grid grid-cols-4 gap-2 text-sm text-neutral-700">
            <Feature icon={<Home size={16} />} label={property.propertyType} />
            <Feature icon={<BedDouble size={16} />} label={property.bedrooms ? `${property.bedrooms}` : "-"} />
            <Feature icon={<Bath size={16} />} label={property.bathrooms ? `${property.bathrooms}` : "-"} />
            <Feature icon={<Maximize2 size={16} />} label={property.builtArea ? `${property.builtArea} m2` : "-"} />
          </dl>
        </div>
      </Link>
    </article>
  );
}

function Feature({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex min-h-9 items-center justify-center gap-1 rounded-md bg-neutral-100 px-2">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0
  }).format(value);
}
