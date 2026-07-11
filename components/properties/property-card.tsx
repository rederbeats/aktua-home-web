import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, Home, MapPin, Maximize2 } from "lucide-react";
import type { PublicPropertyCard as PropertyCardType } from "@/lib/properties/public-properties";

export function PropertyCard({ property }: { property: PropertyCardType }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-black/10 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(17,17,17,0.14)]">
      <Link href={`/comprar/${property.slug}`} className="block focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2">
        <div className="relative aspect-[4/3] bg-neutral-100">
          <Image src={property.imageUrl} alt={property.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
          {property.isFeatured ? (
            <span className="absolute left-3 top-3 rounded-full bg-brand-red px-3 py-1 text-xs font-black text-white shadow-lg">
              Destacado
            </span>
          ) : null}
          <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-black text-brand-dark shadow-lg">
            {property.operation === "sale" ? "Venta" : "Alquiler"}
          </span>
        </div>
        <div className="grid gap-3 p-4 md:p-5">
          <div>
            <h2 className="line-clamp-2 text-lg font-black leading-snug transition group-hover:text-brand-red">{property.title}</h2>
            <p className="mt-2 flex items-center gap-1 text-sm text-neutral-600">
              <MapPin size={15} className="shrink-0 text-brand-red" />
              {property.municipality}
              {property.neighborhood ? `, ${property.neighborhood}` : ""}
            </p>
          </div>
          <strong className="text-2xl font-black">{property.price ? formatCurrency(property.price) : "Consultar precio"}</strong>
          <dl className="grid grid-cols-2 gap-2 text-sm text-neutral-700 sm:grid-cols-4">
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
    <div className="flex min-h-10 items-center justify-center gap-1 rounded-md bg-neutral-100 px-2 font-semibold">
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
