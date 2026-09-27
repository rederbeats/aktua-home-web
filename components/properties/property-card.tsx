import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, Home, MapPin, Maximize2 } from "lucide-react";
import type { PublicPropertyCard as PropertyCardType } from "@/lib/properties/public-properties";

export function PropertyCard({ property }: { property: PropertyCardType }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 border-t-[#c81022] border-t-2 bg-[#263039] transition duration-200 hover:bg-[#30404b]">
      <Link href={`/comprar/${property.slug}`} className="block focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black">
        <div className="relative aspect-[4/3] bg-neutral-100">
          <Image src={property.imageUrl} alt={property.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
          {property.isFeatured ? (
            <span className="origin-label absolute left-3 top-3 rounded-full bg-[#d6a756] px-3 py-1 text-black">
              Destacado
            </span>
          ) : null}
          <span className="origin-label absolute bottom-3 left-3 rounded-full bg-white px-3 py-1 text-black">
            {property.operation === "sale" ? "Venta" : "Alquiler"}
          </span>
        </div>
        <div className="grid gap-3 p-4 md:p-5">
          <div>
            <h2 className="line-clamp-2 text-2xl leading-tight text-[#f5f5f7]">{property.title}</h2>
            <p className="mt-2 flex items-center gap-1 text-sm text-neutral-600">
              <MapPin size={15} className="shrink-0 text-white" />
              {property.municipality}
              {property.neighborhood ? `, ${property.neighborhood}` : ""}
            </p>
          </div>
          <strong className="font-mono text-xl font-medium text-white">{property.price ? formatCurrency(property.price) : "Consultar precio"}</strong>
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
    <div className="flex min-h-10 items-center justify-center gap-1 rounded-lg border border-white/10 bg-black/25 px-2 font-normal">
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
