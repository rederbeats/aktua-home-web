import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BedDouble, Car, Check, Compass, Expand, Leaf, MapPin, ShieldCheck, Sun, Waves } from "lucide-react";
import { MetaPixelEvent } from "@/components/analytics/meta-pixel-event";
import { LeadForm } from "@/components/forms/lead-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Demo Residencial Alborán",
  description: "Demostración privada de una web comercial para una promoción residencial de obra nueva.",
  robots: { index: false, follow: false, nocache: true }
};

const typologies = [
  { number: "01", name: "Vivienda de 2 dormitorios", surface: "Desde 92 m²", terrace: "Terrazas desde 18 m²", price: "289.000 €", description: "Espacios abiertos y una conexión natural entre salón, cocina y terraza." },
  { number: "02", name: "Vivienda de 3 dormitorios", surface: "Desde 118 m²", terrace: "Terrazas desde 24 m²", price: "359.000 €", description: "Amplitud, almacenaje y zonas exteriores para disfrutar en familia." },
  { number: "03", name: "Áticos con solárium", surface: "Desde 142 m²", terrace: "Exteriores hasta 96 m²", price: "489.000 €", description: "Vistas abiertas, solárium privado y una forma de vivir más independiente." }
];

const qualities = [
  { icon: Sun, title: "Grandes terrazas", body: "Exteriores concebidos como una estancia más de la vivienda." },
  { icon: Waves, title: "Piscina y jardines", body: "Zonas comunes ajardinadas con piscina y área infantil." },
  { icon: Car, title: "Garaje y trastero", body: "Aparcamiento y espacio de almacenaje incluidos." },
  { icon: Leaf, title: "Eficiencia energética", body: "Aerotermia, aislamiento reforzado y menor consumo." },
  { icon: ShieldCheck, title: "Calidades seleccionadas", body: "Materiales duraderos y acabados personalizables." },
  { icon: Compass, title: "Orientación y luz", body: "Distribuciones que aprovechan la iluminación natural." }
];

export default async function ResidentialDemoPage({ searchParams }: { searchParams: Promise<{ lead?: string }> }) {
  const { lead } = await searchParams;

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden bg-[#fdfdf7] font-sans text-black">
      {lead === "sent" ? <MetaPixelEvent eventName="Lead" parameters={{ content_name: "Demo Residencial Alborán", status: "lead_sent" }} /> : null}

      <div className="border-b border-black/10 bg-[#f5f2de]">
        <div className="mx-auto flex min-h-10 w-[calc(100%_-_32px)] max-w-[1280px] items-center justify-between gap-4 py-2 text-xs text-black/55">
          <span>Demo comercial · Contenido ficticio</span>
          <span className="hidden sm:inline">Microsite de muestra para promotoras</span>
        </div>
      </div>

      <nav className="bg-[#fdfdf7]">
        <div className="mx-auto flex min-h-20 w-[calc(100%_-_32px)] max-w-[1280px] items-center justify-between gap-3 py-3">
          <Link href="#inicio" className="min-w-0 max-w-[55vw]">
            <span className="block text-base font-normal uppercase sm:text-lg">Residencial Alborán</span>
            <span className="block text-xs text-black/45">Málaga · Obra nueva</span>
          </Link>
          <div className="hidden items-center gap-8 text-sm text-black/65 lg:flex">
            <Link href="#promocion" className="transition hover:text-[#0096f7]">Promoción</Link>
            <Link href="#viviendas" className="transition hover:text-[#0096f7]">Viviendas</Link>
            <Link href="#calidades" className="transition hover:text-[#0096f7]">Calidades</Link>
            <Link href="#ubicacion" className="transition hover:text-[#0096f7]">Ubicación</Link>
          </div>
          <Link href="#informacion" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-[#0096f7] px-4 text-sm font-semibold text-white shadow-[rgba(0,0,0,0.12)_0px_0.5px_2px_0px] transition hover:bg-[#007fd1]">
            <span className="sm:hidden">Dossier</span><span className="hidden sm:inline">Solicitar dossier</span><ArrowUpRight size={16} />
          </Link>
        </div>
      </nav>

      <section id="inicio" className="relative min-h-[680px] overflow-hidden bg-black text-white md:min-h-[760px]">
        <Image src="/assets/demo-obra-nueva-exterior.png" alt="Vista exterior de Residencial Alborán" fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto flex min-h-[680px] w-[calc(100%_-_32px)] max-w-[1280px] items-end py-12 md:min-h-[760px] md:py-20">
          <div className="min-w-0 max-w-5xl">
            <p className="text-sm text-white/70">24 viviendas · Málaga · Entrega estimada 2028</p>
            <h1 className="mt-5 max-w-5xl break-words text-[2.75rem] font-light leading-[0.98] min-[380px]:text-5xl sm:text-6xl md:text-[5.75rem]">Una arquitectura abierta a la luz y al Mediterráneo.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-7 text-white/75 md:text-xl">Viviendas de 2 y 3 dormitorios con amplias terrazas, jardines y piscina, pensadas para disfrutar de Málaga con calma.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="#viviendas" className="inline-flex min-h-[52px] items-center justify-between gap-5 rounded-xl bg-[#ff4000] px-5 py-3.5 font-semibold text-white transition hover:bg-[#df3800]">Explorar viviendas <ArrowRight size={18} /></Link>
              <Link href="#informacion" className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-white/10 px-5 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-black">Recibir información</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f2de]">
        <div className="mx-auto grid w-[calc(100%_-_32px)] max-w-[1280px] grid-cols-2 gap-px bg-black/10 lg:grid-cols-4">
          <Stat value="24" label="Viviendas" /><Stat value="2 y 3" label="Dormitorios" /><Stat value="92-148 m²" label="Superficie" /><Stat value="2028" label="Entrega estimada" />
        </div>
      </section>

      <section id="promocion" className="scroll-mt-28 py-24 md:py-32">
        <div className="mx-auto w-[calc(100%_-_32px)] max-w-[1280px]">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div><p className="text-sm text-[#0096f7]">El proyecto</p><h2 className="mt-5 max-w-4xl text-5xl font-light leading-[1] sm:text-6xl md:text-[5rem]">Vivir dentro y fuera, sin elegir entre ambos.</h2></div>
            <p className="max-w-xl text-lg leading-8 text-black/60 md:text-xl">Cada distribución prioriza la amplitud, la luz y la relación con el exterior. Salones abiertos, cocinas integradas y terrazas habitables crean espacios cómodos durante todo el año.</p>
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#f5f2de] shadow-[rgba(0,0,0,0.12)_0px_0.5px_2px_0px]">
              <Image src="/assets/demo-obra-nueva-interior.png" alt="Interior luminoso de una vivienda de Residencial Alborán" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 65vw" />
            </div>
            <div className="flex flex-col justify-between rounded-[18px] bg-[#f5f2de] p-7 shadow-[rgba(0,0,0,0.12)_0px_0.5px_2px_0px] md:p-9">
              <span className="flex size-12 items-center justify-center rounded-xl bg-[#0096f7] text-white"><Sun size={22} /></span>
              <div className="mt-16">
                <p className="text-3xl font-light leading-tight">La casa continúa más allá de sus paredes.</p>
                <ul className="mt-7 grid gap-4 text-sm text-black/60">
                  {["Diseño contemporáneo y funcional", "Terrazas orientadas al paisaje", "Zonas comunes para disfrutar"].map((item) => <li key={item} className="flex items-center gap-3"><Check size={17} className="shrink-0 text-[#0096f7]" /> {item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="viviendas" className="scroll-mt-28 bg-[#f5f2de] py-24 md:py-32">
        <div className="mx-auto w-[calc(100%_-_32px)] max-w-[1280px]">
          <p className="text-sm text-[#0096f7]">Tipologías</p>
          <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 className="max-w-3xl text-5xl font-light leading-[1] sm:text-6xl md:text-[5rem]">Tu forma de vivir tiene su propio espacio.</h2>
            <p className="max-w-md text-lg leading-8 text-black/55">Tres propuestas con diferentes superficies y una misma atención al detalle.</p>
          </div>
          <div className="mt-16 grid gap-5 lg:grid-cols-3">
            {typologies.map((type) => (
              <article key={type.name} className="flex min-h-[430px] min-w-0 flex-col rounded-xl bg-[#fdfdf7] p-7 shadow-[rgba(0,0,0,0.2)_0px_2px_4px_0px] md:p-8">
                <div className="flex items-center justify-between text-sm text-black/40"><span>{type.number}</span><BedDouble size={21} /></div>
                <h3 className="mt-9 text-3xl font-light leading-tight">{type.name}</h3><p className="mt-4 leading-7 text-black/55">{type.description}</p>
                <dl className="mt-8 grid min-w-0 gap-4 border-t border-black/10 pt-6 text-sm">
                  <div className="flex min-w-0 items-center justify-between gap-4"><dt className="flex shrink-0 items-center gap-2 text-black/45"><Expand size={16} /> Superficie</dt><dd className="min-w-0 text-right">{type.surface}</dd></div>
                  <div className="flex min-w-0 items-center justify-between gap-4"><dt className="flex shrink-0 items-center gap-2 text-black/45"><Sun size={16} /> Exterior</dt><dd className="min-w-0 text-right">{type.terrace}</dd></div>
                </dl>
                <div className="mt-auto pt-9"><p className="text-xs text-black/40">Desde</p><strong className="mt-1 block text-3xl font-normal">{type.price}</strong><Link href="#informacion" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0096f7]">Consultar disponibilidad <ArrowUpRight size={16} /></Link></div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs text-black/40">Precios, superficies y disponibilidad incluidos únicamente como contenido de demostración.</p>
        </div>
      </section>

      <section id="calidades" className="scroll-mt-28 py-24 md:py-32">
        <div className="mx-auto grid w-[calc(100%_-_32px)] max-w-[1280px] gap-16 lg:grid-cols-[0.72fr_1.28fr]">
          <div><p className="text-sm text-[#0096f7]">Calidades y bienestar</p><h2 className="mt-5 text-5xl font-light leading-[1] sm:text-6xl">Todo lo esencial, bien resuelto.</h2><p className="mt-7 max-w-md text-lg leading-8 text-black/55">Características técnicas convertidas en confort, ahorro y una vida cotidiana más sencilla.</p></div>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {qualities.map((quality) => { const Icon = quality.icon; return <article key={quality.title} className="border-t border-black/15 pt-6"><Icon size={24} className="text-[#0096f7]" /><h3 className="mt-6 text-2xl font-light">{quality.title}</h3><p className="mt-3 leading-7 text-black/50">{quality.body}</p></article>; })}
          </div>
        </div>
      </section>

      <section id="ubicacion" className="scroll-mt-28 bg-black py-24 text-white md:py-32">
        <div className="mx-auto grid w-[calc(100%_-_32px)] max-w-[1280px] gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div><p className="text-sm text-[#0096f7]">Málaga</p><h2 className="mt-5 max-w-4xl text-5xl font-light leading-[1] sm:text-6xl md:text-[5rem]">Cerca de la ciudad. Cerca del mar.</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-white/55">Una ubicación de ejemplo que combina tranquilidad, servicios cotidianos y conexiones rápidas.</p><div className="mt-12 grid grid-cols-3 gap-3"><LocationTime value="8 min" label="Servicios" /><LocationTime value="15 min" label="Centro" /><LocationTime value="20 min" label="Aeropuerto" /></div></div>
          <div className="flex min-h-[360px] items-center justify-center rounded-[18px] bg-white/10 p-8 text-center"><div><span className="mx-auto flex size-16 items-center justify-center rounded-xl bg-[#ff4000]"><MapPin size={29} /></span><p className="mt-6 text-2xl font-light">Málaga, España</p><p className="mt-2 text-sm text-white/45">Ubicación ficticia para demostración</p></div></div>
        </div>
      </section>

      <section id="informacion" className="scroll-mt-28 py-24 md:py-32">
        <div className="mx-auto grid w-[calc(100%_-_32px)] max-w-[1280px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div><p className="text-sm text-[#0096f7]">Solicita información</p><h2 className="mt-5 text-5xl font-light leading-[1] sm:text-6xl md:text-[4.75rem]">Tu próxima casa empieza aquí.</h2><p className="mt-7 max-w-xl text-lg leading-8 text-black/55">Déjanos tus datos para recibir planos, memoria de calidades y disponibilidad.</p><div className="mt-12 rounded-[18px] bg-[#f5f2de] p-7"><p className="text-xs text-black/40">Comercializa</p><p className="mt-2 text-xl">{siteConfig.brandName}</p><p className="mt-2 text-sm text-black/50">{siteConfig.contact.phone}<br />{siteConfig.contact.email}</p></div></div>
          <aside className="rounded-[18px] bg-[#f5f2de] p-6 shadow-[rgba(0,0,0,0.12)_0px_0.5px_2px_0px] md:p-10"><h3 className="text-3xl font-light">Quiero recibir el dossier</h3><p className="mt-3 max-w-xl leading-7 text-black/50">Indica qué tipología te interesa y nuestro equipo comercial se pondrá en contacto contigo.</p><div className="mt-7 [&_button]:rounded-xl [&_button]:bg-[#0096f7] [&_button]:shadow-none [&_input]:rounded-xl [&_textarea]:rounded-xl"><LeadForm type="information" sourcePath="/demo/residencial-alboran" status={lead} /></div></aside>
        </div>
      </section>

      <section className="bg-[#e7e3e1] py-8"><div className="mx-auto flex w-[calc(100%_-_32px)] max-w-[1280px] flex-wrap items-center justify-between gap-4 text-sm text-black/55"><p><strong className="font-normal text-black">Residencial Alborán</strong> · Proyecto ficticio de demostración</p><Link href="/obra-nueva" className="inline-flex items-center gap-2 text-[#0096f7]">Comercialización por AKTUA HOME <ArrowUpRight size={16} /></Link></div></section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="bg-[#f5f2de] px-3 py-7 text-center md:py-9"><strong className="block text-2xl font-normal md:text-3xl">{value}</strong><span className="mt-2 block text-xs text-black/45">{label}</span></div>;
}

function LocationTime({ value, label }: { value: string; label: string }) {
  return <div className="border-t border-white/20 pt-5"><strong className="block text-xl font-normal sm:text-2xl">{value}</strong><span className="mt-1 block text-xs text-white/45 sm:text-sm">{label}</span></div>;
}
