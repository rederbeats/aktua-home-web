import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calculator, FileText, Home, KeyRound, Landmark, Languages, MapPin, MessageCircle, Scale } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { PropertyCard } from "@/components/properties/property-card";
import { PropertySearch } from "@/components/properties/property-search";
import { getPublishedProperties } from "@/lib/properties/public-properties";
import { siteConfig } from "@/lib/site-config";

const services = [
  {
    title: "Compraventa de inmuebles",
    body: "Asesoramiento en compra y venta, gestión integral de la operación y acompañamiento hasta la firma.",
    icon: Home
  },
  {
    title: "Financiación hasta el 95%",
    body: "Estudio hipotecario, gestión de financiación y asesoramiento personalizado para compradores.",
    icon: Landmark
  },
  {
    title: "Documentación y fiscalidad",
    body: "Escrituras, pagos, plusvalía, ITP, obra nueva y divisiones horizontales.",
    icon: FileText
  },
  {
    title: "Servicios jurídicos",
    body: "Herencias, testamentos, donaciones, procedimientos familiares y asesoramiento legal.",
    icon: Scale
  },
  {
    title: "Traducciones juradas",
    body: "Traducciones oficiales para trámites legales, fiscales e inmobiliarios.",
    icon: Languages
  }
];

const steps = [
  "Analizamos tu objetivo y la situación del inmueble.",
  "Revisamos financiación, documentación e impuestos.",
  "Gestionamos la operación y coordinamos los trámites necesarios.",
  "Te acompañamos hasta la firma y el cierre."
];

const serviceTones = [
  "bg-[#c81022] text-white",
  "bg-[#efefed] text-black",
  "bg-[#171719] text-white",
  "bg-[#8f0b18] text-white",
  "bg-[#3f4041] text-white"
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
            src={siteConfig.assets.heroImage}
            alt={`Viviendas modernas representativas de ${siteConfig.brandName}`}
            fill
            className="object-cover opacity-65"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.78)_43%,rgba(0,0,0,0.32)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="container relative flex min-h-[calc(100svh-72px)] flex-col items-center justify-center py-16 text-center md:py-24">
          <div className="max-w-5xl">
            <p className="origin-label inline-flex rounded-full border border-white/15 bg-white/10 px-6 py-2 text-white backdrop-blur">
              Inmobiliaria de Málaga
            </p>
            <h1 className="origin-display mt-8 text-5xl leading-[0.92] sm:text-6xl md:text-[6rem]">
              Compra, vende y firma con todo bajo control.
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-white/70 md:text-lg md:leading-8">
              Somos de Málaga y trabajamos principalmente en Málaga y provincia. Te acompañamos en compraventa y servicios inmobiliarios, y gestionamos financiación hipotecaria en toda España.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:justify-center">
              <Link href="/comprar" className="origin-primary inline-flex h-12 min-w-0 items-center justify-center gap-2 px-4 text-center text-sm font-medium transition sm:px-5 sm:text-base">
                Ver viviendas <ArrowRight size={18} />
              </Link>
              <Link href="/vender-mi-vivienda" className="inline-flex h-12 min-w-0 items-center justify-center rounded-lg border border-white px-3 text-center text-sm text-white transition hover:bg-white hover:text-black sm:px-5 sm:text-base">
                Valorar mi vivienda
              </Link>
            </div>
            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 text-center min-[520px]:grid-cols-3">
              <HeroStat value="Sin complicaciones" label="Nos ocupamos de todo" />
              <HeroStat value="Hasta 95%" label="Financiación" />
              <HeroStat value="Valoración" label="Gratuita y sin compromiso" />
            </div>
          </div>

          <aside className="origin-panel mt-10 w-full max-w-2xl rounded-2xl p-6 text-left md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white text-black">
                <MessageCircle size={22} />
              </div>
              <div>
                <h2 className="text-2xl">Hablemos de tu operación</h2>
                <p className="text-sm text-neutral-600">Te respondemos con una primera orientación.</p>
              </div>
            </div>
            <div className="mt-4">
              <LeadForm type="contact" sourcePath="/" status={lead} />
            </div>
          </aside>
        </div>
      </section>

      <section className="relative z-10 -mt-4 pb-6 md:-mt-8">
        <div className="container grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
          <TrustItem icon={<MapPin size={20} />} title="Compraventa" body="Compra, venta y seguimiento." />
          <TrustItem icon={<Home size={20} />} title="Financiación" body="Hipotecas en toda España." />
          <TrustItem icon={<KeyRound size={20} />} title="Documentación" body="Escrituras, pagos e impuestos." />
          <TrustItem icon={<Calculator size={20} />} title="Jurídico" body="Herencias, donaciones y trámites." />
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
            <h2 className="mt-2 text-3xl font-black leading-tight md:text-5xl">Servicios inmobiliarios, financieros y jurídicos en un solo lugar.</h2>
            <p className="mt-4 leading-8 text-neutral-600">
              No se trata solo de vender o comprar una vivienda. Se trata de tener controlados la financiación, los documentos, los impuestos y los trámites legales.
            </p>
            <Link href="/servicios" className="origin-primary mt-6 inline-flex h-11 items-center gap-2 px-4 font-medium transition">
              Ver servicios <ArrowRight size={17} />
            </Link>
          </div>
          <div className="grid min-w-0 gap-4 md:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className={`min-w-0 overflow-hidden rounded-2xl border border-white/10 p-6 transition duration-200 hover:-translate-y-1 md:min-h-[280px] md:p-7 ${index === services.length - 1 ? "md:col-span-2 md:min-h-0" : ""} ${serviceTones[index]}`}
                >
                  <div className="flex size-11 items-center justify-center rounded-lg border border-current/25 bg-black/10">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-8 max-w-full [overflow-wrap:anywhere] text-2xl leading-[1.05] sm:text-3xl">{service.title}</h3>
                  <p className="mt-5 max-w-xl text-sm leading-6 opacity-75">{service.body}</p>
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
          <Link href="/comprar" className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/25 px-4 text-white transition hover:bg-white hover:text-black">
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
          <div className="rounded-2xl border border-white/10 bg-[#2e2e2e] p-8 text-center text-neutral-500">
            Estamos preparando una selección de viviendas destacadas. Contacta con nosotros y te ayudamos a encontrar la opción adecuada.
          </div>
        )}
      </section>

      <section className="bg-brand-dark py-14 text-white md:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="section-kicker text-red-300">Método {siteConfig.brandName}</p>
            <h2 className="mt-2 text-3xl font-black leading-tight md:text-5xl">Orden, claridad y seguimiento hasta el final.</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {steps.map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-[#2e2e2e] p-6">
                <span className="origin-label text-white/50">0{index + 1}</span>
                <p className="mt-4 text-lg text-white/85">{step}</p>
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
    <div className="min-w-0 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
      <strong className="origin-display block [overflow-wrap:anywhere] text-xl leading-tight text-white">{value}</strong>
      <span className="origin-label mt-2 block break-words text-white/55">{label}</span>
    </div>
  );
}

function TrustItem({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <article className="flex gap-3 bg-[#1b1c1d] p-5 transition hover:bg-[#2e2e2e]">
      <div className="mt-1 text-white">{icon}</div>
      <div>
        <h2 className="text-lg">{title}</h2>
        <p className="mt-1 text-sm text-neutral-600">{body}</p>
      </div>
    </article>
  );
}
