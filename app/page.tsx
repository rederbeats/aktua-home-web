import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Calculator, Home, KeyRound, MapPin, MessageCircle, Search, ShieldCheck } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertySearch } from "@/components/properties/property-search";
import { getPublishedProperties } from "@/lib/properties/public-properties";

const services = [
  {
    title: "Compra con criterio",
    body: "Comparamos zona, precio, estado de la vivienda y margen de negociacion antes de dar el paso.",
    icon: Search
  },
  {
    title: "Venta bien preparada",
    body: "Valoracion, estrategia de salida, presentacion del inmueble y seguimiento comercial hasta la firma.",
    icon: BadgeCheck
  },
  {
    title: "Financiacion y gestiones",
    body: "Coordinamos documentacion, visitas, ofertas, hipoteca y pasos clave para que no improvises.",
    icon: ShieldCheck
  }
];

const steps = [
  "Analizamos tu objetivo y tu zona.",
  "Preparamos una estrategia clara.",
  "Publicamos, filtramos interesados y hacemos seguimiento.",
  "Te acompanamos hasta la firma."
];

export default async function HomePage({ searchParams }: { searchParams: Promise<{ lead?: string }> }) {
  const { lead } = await searchParams;
  const properties = await getPublishedProperties({ sort: "recent" });
  const featuredProperties = properties.slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-dark text-white">
        <div className="absolute inset-0">
          <Image
            src="/assets/home-hero-real-estate.png"
            alt="Viviendas modernas representativas de AKTUA HOME"
            fill
            className="object-cover opacity-65"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.78)_43%,rgba(0,0,0,0.32)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="container relative grid min-h-[calc(100svh-80px)] content-center gap-8 py-10 md:py-16 lg:grid-cols-[1fr_420px] lg:items-end">
          <div className="max-w-3xl py-8 md:py-12">
            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase text-red-100 backdrop-blur">
              AKTUA HOME inmobiliaria
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.02] sm:text-5xl md:text-7xl">
              Vende mejor. Compra con calma. Decide con datos.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/85 md:text-lg md:leading-8">
              Te acompanamos con valoracion, marketing, visitas filtradas, negociacion y documentacion para que cada paso tenga sentido.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/comprar" className="inline-flex h-12 items-center gap-2 rounded-md bg-brand-red px-5 font-black text-white shadow-[0_18px_45px_rgba(200,16,34,0.35)] transition hover:-translate-y-0.5 hover:bg-red-700">
                Ver viviendas <ArrowRight size={18} />
              </Link>
              <Link href="/vender-mi-vivienda" className="inline-flex h-12 items-center rounded-md bg-white px-5 font-black text-brand-dark shadow-xl transition hover:-translate-y-0.5">
                Valorar mi vivienda
              </Link>
            </div>
            <div className="mt-8 grid max-w-2xl grid-cols-3 gap-3 text-center text-sm md:text-left">
              <HeroStat value="+ claro" label="Precio y estrategia" />
              <HeroStat value="24/7" label="Captacion online" />
              <HeroStat value="1 a 1" label="Acompanamiento" />
            </div>
          </div>

          <aside className="rounded-lg border border-white/25 bg-white/95 p-5 text-brand-dark shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-red-50 text-brand-red">
                <MessageCircle size={22} />
              </div>
              <div>
                <h2 className="text-xl font-black">Hablemos de tu vivienda</h2>
                <p className="text-sm text-neutral-600">Te respondemos con una primera orientacion.</p>
              </div>
            </div>
            <div className="mt-4">
              <LeadForm type="contact" sourcePath="/" status={lead} />
            </div>
          </aside>
        </div>
      </section>

      <section className="relative z-10 -mt-4 pb-6 md:-mt-8">
        <div className="container grid gap-3 rounded-lg border border-black/10 bg-white p-3 shadow-[0_22px_70px_rgba(17,17,17,0.12)] md:grid-cols-4">
          <TrustItem icon={<MapPin size={20} />} title="Zona y mercado" body="Precio, demanda y competencia." />
          <TrustItem icon={<Home size={20} />} title="Presentacion cuidada" body="Fotos, ficha y argumentos de venta." />
          <TrustItem icon={<KeyRound size={20} />} title="Visitas filtradas" body="Interesados reales y seguimiento." />
          <TrustItem icon={<Calculator size={20} />} title="Operacion clara" body="Documentacion y pasos controlados." />
        </div>
      </section>

      <section className="container py-12">
        <div className="mb-5 max-w-3xl">
          <p className="section-kicker">Buscar vivienda</p>
          <h2 className="mt-2 text-3xl font-black leading-tight md:text-5xl">Encuentra una casa que encaje contigo, no solo con el presupuesto.</h2>
        </div>
        <PropertySearch />
      </section>

      <section className="border-y border-black/10 bg-white py-14 md:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="section-kicker">Servicios</p>
            <h2 className="mt-2 text-3xl font-black leading-tight md:text-5xl">Una inmobiliaria para tomar mejores decisiones.</h2>
            <p className="mt-4 leading-8 text-neutral-600">
              No se trata solo de publicar un anuncio. Se trata de preparar bien la operacion, generar confianza y acompanarte en cada paso importante.
            </p>
            <Link href="/servicios" className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-brand-dark px-4 font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-red">
              Ver servicios <ArrowRight size={17} />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="rounded-lg border border-black/10 bg-gradient-to-b from-white to-paper p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                  <div className="flex size-11 items-center justify-center rounded-md bg-red-50 text-brand-red">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-4 text-xl font-black">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{service.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container py-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-kicker">Destacados</p>
            <h2 className="mt-2 text-3xl font-black md:text-5xl">Viviendas publicadas</h2>
          </div>
          <Link href="/comprar" className="inline-flex h-11 items-center gap-2 rounded-md border border-black/15 bg-white px-4 font-bold shadow-sm transition hover:border-brand-red hover:text-brand-red">
            Ver todos <ArrowRight size={17} />
          </Link>
        </div>

        {featuredProperties.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-black/10 bg-white p-8 text-center text-neutral-500 shadow-soft">
            Cuando actives inmuebles en el panel, apareceran aqui automaticamente.
          </div>
        )}
      </section>

      <section className="bg-brand-dark py-14 text-white md:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="section-kicker text-red-300">Metodo AKTUA HOME</p>
            <h2 className="mt-2 text-3xl font-black leading-tight md:text-5xl">Orden, claridad y seguimiento hasta el final.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {steps.map((step, index) => (
              <div key={step} className="rounded-lg border border-white/15 bg-white/10 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <span className="text-sm font-black text-red-300">0{index + 1}</span>
                <p className="mt-2 text-lg font-bold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-white/15 bg-white/10 p-3 backdrop-blur">
      <strong className="block text-lg font-black text-white">{value}</strong>
      <span className="mt-1 block text-xs font-semibold text-white/70">{label}</span>
    </div>
  );
}

function TrustItem({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <article className="flex gap-3 rounded-md bg-paper p-4 transition hover:bg-red-50">
      <div className="mt-1 text-brand-red">{icon}</div>
      <div>
        <h2 className="font-black">{title}</h2>
        <p className="mt-1 text-sm text-neutral-600">{body}</p>
      </div>
    </article>
  );
}
