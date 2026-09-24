import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Building2,
  Car,
  Check,
  Compass,
  Expand,
  Leaf,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sun,
  Waves
} from "lucide-react";
import { MetaPixelEvent } from "@/components/analytics/meta-pixel-event";
import { LeadForm } from "@/components/forms/lead-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Demo Residencial Alborán",
  description: "Demostración privada de una web comercial para una promoción residencial de obra nueva.",
  robots: {
    index: false,
    follow: false,
    nocache: true
  }
};

const typologies = [
  {
    name: "Vivienda de 2 dormitorios",
    surface: "Desde 92 m²",
    terrace: "Terrazas desde 18 m²",
    price: "Desde 289.000 €",
    description: "Espacios abiertos, luz natural y conexión directa entre salón, cocina y terraza."
  },
  {
    name: "Vivienda de 3 dormitorios",
    surface: "Desde 118 m²",
    terrace: "Terrazas desde 24 m²",
    price: "Desde 359.000 €",
    description: "Distribuciones pensadas para familias que buscan amplitud, almacenaje y zonas exteriores."
  },
  {
    name: "Áticos con solárium",
    surface: "Desde 142 m²",
    terrace: "Exteriores hasta 96 m²",
    price: "Desde 489.000 €",
    description: "Viviendas singulares con vistas abiertas, solárium privado y máxima privacidad."
  }
];

const qualities = [
  { icon: Sun, title: "Grandes terrazas", body: "Espacios exteriores concebidos como una extensión natural de la vivienda." },
  { icon: Waves, title: "Piscina y jardines", body: "Zonas comunes ajardinadas con piscina para adultos y área infantil." },
  { icon: Car, title: "Garaje y trastero", body: "Plaza de aparcamiento y trastero incluidos en todas las viviendas." },
  { icon: Leaf, title: "Eficiencia energética", body: "Aerotermia, aislamiento reforzado y soluciones para reducir el consumo." },
  { icon: ShieldCheck, title: "Calidades seleccionadas", body: "Materiales duraderos, equipamiento actual y acabados personalizables." },
  { icon: Compass, title: "Orientación y luz", body: "Distribuciones estudiadas para aprovechar la iluminación natural." }
];

export default async function ResidentialDemoPage({ searchParams }: { searchParams: Promise<{ lead?: string }> }) {
  const { lead } = await searchParams;

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden bg-white text-[#191916]">
      {lead === "sent" ? (
        <MetaPixelEvent eventName="Lead" parameters={{ content_name: "Demo Residencial Alborán", status: "lead_sent" }} />
      ) : null}

      <div className="border-b border-black/10 bg-[#f2eee7]">
        <div className="container flex min-h-11 items-center justify-between gap-4 py-2 text-[11px] font-black uppercase text-neutral-600">
          <span>Demo comercial · Contenido ficticio</span>
          <span className="hidden sm:inline">Ejemplo de microsite para promociones</span>
        </div>
      </div>

      <nav className="border-b border-black/10 bg-white">
        <div className="container flex min-h-16 min-w-0 items-center justify-between gap-2 py-3 sm:gap-5">
          <Link href="#inicio" className="min-w-0 max-w-[56vw] sm:max-w-none">
            <span className="block break-words text-sm font-black uppercase tracking-[0.08em] min-[360px]:text-base sm:text-xl sm:tracking-[0.12em]">Residencial Alborán</span>
            <span className="block text-[10px] font-bold uppercase text-neutral-500">Málaga · Obra nueva</span>
          </Link>
          <div className="hidden items-center gap-6 text-sm font-bold lg:flex">
            <Link href="#promocion" className="hover:text-brand-red">La promoción</Link>
            <Link href="#viviendas" className="hover:text-brand-red">Viviendas</Link>
            <Link href="#calidades" className="hover:text-brand-red">Calidades</Link>
            <Link href="#ubicacion" className="hover:text-brand-red">Ubicación</Link>
          </div>
          <Link href="#informacion" className="inline-flex min-h-11 max-w-[40vw] shrink-0 items-center gap-2 rounded-md bg-[#191916] px-3 text-center text-xs font-black text-white transition hover:bg-brand-red sm:max-w-none sm:px-4 sm:text-sm">
            <span className="sm:hidden">Información</span><span className="hidden sm:inline">Solicitar información</span> <ArrowRight className="hidden sm:block" size={16} />
          </Link>
        </div>
      </nav>

      <section id="inicio" className="relative min-h-[690px] overflow-hidden bg-black text-white md:min-h-[760px]">
        <Image
          src="/assets/demo-obra-nueva-exterior.png"
          alt="Vista de demostración de Residencial Alborán"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="container relative flex min-h-[690px] min-w-0 items-end py-14 md:min-h-[760px] md:py-20">
          <div className="min-w-0 max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-white/75">Un nuevo horizonte para vivir Málaga</p>
            <h1 className="mt-4 max-w-full break-words text-[2.35rem] font-black leading-[1] min-[380px]:text-[2.65rem] sm:text-6xl md:text-8xl">
              Luz, calma y espacio para vivir a tu ritmo.
            </h1>
            <p className="mt-6 max-w-2xl break-words text-lg leading-8 text-white/85 md:text-xl">
              24 viviendas de 2 y 3 dormitorios con amplias terrazas, zonas ajardinadas y piscina, en un entorno conectado con la ciudad y el Mediterráneo.
            </p>
            <div className="mt-8 grid max-w-sm gap-3 sm:flex sm:max-w-none sm:flex-wrap">
              <Link href="#viviendas" className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-white px-4 text-center font-black text-[#191916] transition hover:-translate-y-0.5 sm:w-auto sm:px-5">
                Descubrir viviendas <ArrowRight size={18} />
              </Link>
              <Link href="#informacion" className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-white/60 px-4 text-center font-black text-white transition hover:bg-white hover:text-[#191916] sm:w-auto sm:px-5">
                Solicitar dossier
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f2eee7]">
        <div className="container grid grid-cols-2 gap-px bg-black/10 lg:grid-cols-4">
          <Stat value="24" label="Viviendas" />
          <Stat value="2 y 3" label="Dormitorios" />
          <Stat value="92-148 m²" label="Superficie" />
          <Stat value="2028" label="Entrega estimada" />
        </div>
      </section>

      <section id="promocion" className="scroll-mt-28 py-16 md:py-24">
        <div className="container grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-brand-red">Residencial Alborán</p>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-6xl">Una vivienda pensada desde dentro hacia fuera.</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-600">
              Cada distribución prioriza la luz, la amplitud y la relación con el exterior. Salones abiertos, cocinas integradas y terrazas habitables crean espacios cómodos durante todo el año.
            </p>
            <ul className="mt-7 grid gap-3 text-sm font-bold text-neutral-700">
              {["Diseño contemporáneo y funcional", "Terrazas orientadas al paisaje", "Zonas comunes para disfrutar sin salir de casa"].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-red text-white"><Check size={15} /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100">
            <Image src="/assets/demo-obra-nueva-interior.png" alt="Interior de muestra de una vivienda de Residencial Alborán" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 58vw" />
          </div>
        </div>
      </section>

      <section id="viviendas" className="scroll-mt-28 border-y border-black/10 bg-[#f7f5f1] py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-brand-red">Tipologías</p>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-6xl">Elige la vivienda que encaja contigo.</h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600">Distintas formas de vivir una misma promoción, con espacios exteriores como protagonistas.</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {typologies.map((type, index) => (
              <article key={type.name} className="flex min-h-[390px] flex-col rounded-lg border border-black/10 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-black text-brand-red">0{index + 1}</span>
                  <Building2 size={23} className="text-neutral-400" />
                </div>
                <h3 className="mt-6 text-2xl font-black leading-tight">{type.name}</h3>
                <p className="mt-3 leading-7 text-neutral-600">{type.description}</p>
                <dl className="mt-6 grid min-w-0 gap-3 border-t border-black/10 pt-5 text-sm">
                  <div className="flex min-w-0 items-center justify-between gap-4"><dt className="flex shrink-0 items-center gap-2 text-neutral-500"><Expand size={16} /> Superficie</dt><dd className="min-w-0 break-words text-right font-black">{type.surface}</dd></div>
                  <div className="flex min-w-0 items-center justify-between gap-4"><dt className="flex shrink-0 items-center gap-2 text-neutral-500"><Sun size={16} /> Exterior</dt><dd className="min-w-0 break-words text-right font-black">{type.terrace}</dd></div>
                </dl>
                <div className="mt-auto pt-7">
                  <p className="text-xs font-bold uppercase text-neutral-500">Precio orientativo</p>
                  <strong className="mt-1 block text-2xl font-black">{type.price}</strong>
                  <Link href="#informacion" className="mt-5 inline-flex items-center gap-2 font-black text-brand-red">Consultar disponibilidad <ArrowRight size={17} /></Link>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs text-neutral-500">Precios, superficies y disponibilidad incluidos únicamente como contenido de demostración.</p>
        </div>
      </section>

      <section id="calidades" className="scroll-mt-28 py-16 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-brand-red">Calidades y bienestar</p>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">Todo empieza con una buena elección.</h2>
            <p className="mt-4 leading-8 text-neutral-600">Una memoria de calidades clara permite convertir características técnicas en motivos reales para elegir una vivienda.</p>
          </div>
          <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {qualities.map((quality) => {
              const Icon = quality.icon;
              return (
                <article key={quality.title} className="border-t border-black/15 pt-5">
                  <Icon size={25} className="text-brand-red" />
                  <h3 className="mt-4 text-xl font-black">{quality.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{quality.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="ubicacion" className="scroll-mt-28 bg-[#191916] py-16 text-white md:py-24">
        <div className="container grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-red-300">Málaga</p>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-6xl">Conectado con lo que importa.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
              Una ubicación de ejemplo pensada para combinar tranquilidad residencial, servicios cotidianos y conexiones rápidas con el centro de Málaga.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <LocationTime value="8 min" label="Servicios" />
              <LocationTime value="15 min" label="Centro" />
              <LocationTime value="20 min" label="Aeropuerto" />
            </div>
          </div>
          <div className="flex min-h-[360px] items-center justify-center rounded-lg border border-white/15 bg-white/5 p-8 text-center">
            <div>
              <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-brand-red text-white"><MapPin size={30} /></span>
              <p className="mt-5 text-2xl font-black">Málaga, España</p>
              <p className="mt-2 text-sm text-white/55">Ubicación ficticia para demostración</p>
            </div>
          </div>
        </div>
      </section>

      <section id="informacion" className="scroll-mt-28 py-16 md:py-24">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-brand-red">Solicita información</p>
            <h2 className="mt-3 text-4xl font-black leading-tight md:text-6xl">Encuentra tu lugar en Residencial Alborán.</h2>
            <p className="mt-5 text-lg leading-8 text-neutral-600">
              Déjanos tus datos para recibir planos, memoria de calidades y disponibilidad de las viviendas.
            </p>
            <div className="mt-7 flex items-center gap-3 text-sm font-bold text-neutral-700">
              <MessageCircle size={20} className="text-brand-red" /> Atención comercial personalizada
            </div>
            <div className="mt-8 border-t border-black/10 pt-6">
              <p className="text-xs font-black uppercase text-neutral-500">Comercializa</p>
              <p className="mt-2 text-xl font-black">{siteConfig.brandName}</p>
              <p className="mt-1 text-sm text-neutral-600">{siteConfig.contact.phone} · {siteConfig.contact.email}</p>
            </div>
          </div>
          <aside className="rounded-lg border border-black/10 bg-[#f7f5f1] p-6 shadow-soft md:p-8">
            <h3 className="text-2xl font-black">Quiero recibir el dossier</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">Indica qué tipología te interesa y nuestro equipo comercial se pondrá en contacto contigo.</p>
            <div className="mt-6">
              <LeadForm type="information" sourcePath="/demo/residencial-alboran" status={lead} />
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-black/10 bg-[#f2eee7] py-8">
        <div className="container flex flex-wrap items-center justify-between gap-4 text-sm text-neutral-600">
          <p><strong className="text-[#191916]">Residencial Alborán</strong> · Proyecto ficticio de demostración</p>
          <Link href="/obra-nueva" className="font-black text-brand-red">Comercialización de promociones por AKTUA HOME <ArrowRight className="ml-1 inline" size={16} /></Link>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-[#f2eee7] px-4 py-6 text-center md:py-8">
      <strong className="block text-2xl font-black md:text-3xl">{value}</strong>
      <span className="mt-1 block text-xs font-bold uppercase text-neutral-500">{label}</span>
    </div>
  );
}

function LocationTime({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-white/20 pt-4">
      <strong className="block text-2xl font-black">{value}</strong>
      <span className="mt-1 block text-sm text-white/55">{label}</span>
    </div>
  );
}
