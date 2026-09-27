import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, MapPin, Sun } from "lucide-react";
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
  { number: "01", title: "Grandes terrazas", body: "Exteriores concebidos como una estancia más de la vivienda." },
  { number: "02", title: "Piscina y jardines", body: "Zonas comunes ajardinadas con piscina y área infantil." },
  { number: "03", title: "Garaje y trastero", body: "Aparcamiento y espacio de almacenaje incluidos." },
  { number: "04", title: "Eficiencia energética", body: "Aerotermia, aislamiento reforzado y menor consumo." },
  { number: "05", title: "Calidades seleccionadas", body: "Materiales duraderos y acabados personalizables." },
  { number: "06", title: "Orientación y luz", body: "Distribuciones que aprovechan la iluminación natural." }
];

const statTones = ["bg-[#c81022]", "bg-[#2f506f]", "bg-[#d6a756] text-black", "bg-[#163638]"];

export default async function ResidentialDemoPage({ searchParams }: { searchParams: Promise<{ lead?: string }> }) {
  const { lead } = await searchParams;

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden bg-[#0f1011] font-sans text-[#f5f5f7]">
      {lead === "sent" ? <MetaPixelEvent eventName="Lead" parameters={{ content_name: "Demo Residencial Alborán", status: "lead_sent" }} /> : null}

      <div className="border-b border-white/10 bg-[#681522]">
        <div className="mx-auto flex min-h-10 w-[calc(100%_-_32px)] max-w-[1280px] items-center justify-between gap-4 py-2 font-mono text-xs uppercase text-white/70">
          <span>Demo comercial · Contenido ficticio</span>
          <span className="hidden sm:inline">Microsite de muestra para promotoras</span>
        </div>
      </div>

      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#0f1011]/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-20 w-[calc(100%_-_32px)] max-w-[1280px] items-center justify-between gap-3 py-3">
          <Link href="#inicio" className="min-w-0 max-w-[55vw]">
            <span className="block text-base font-normal uppercase sm:text-lg">Residencial Alborán</span>
            <span className="block text-xs text-white/45">Málaga · Obra nueva</span>
          </Link>
          <div className="hidden items-center gap-8 text-sm text-white/60 lg:flex">
            <Link href="#promocion" className="transition hover:text-white">Promoción</Link>
            <Link href="#viviendas" className="transition hover:text-white">Viviendas</Link>
            <Link href="#calidades" className="transition hover:text-white">Calidades</Link>
            <Link href="#ubicacion" className="transition hover:text-white">Ubicación</Link>
          </div>
          <Link href="#informacion" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-xl bg-[#c81022] px-4 text-sm font-semibold text-white shadow-[rgba(0,0,0,0.12)_0px_0.5px_2px_0px] transition hover:bg-[#9f0d1b]">
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
              <Link href="#viviendas" className="inline-flex min-h-[52px] items-center justify-between gap-5 rounded-xl bg-[#c81022] px-5 py-3.5 font-semibold text-white transition hover:bg-[#9f0d1b]">Explorar viviendas <ArrowRight size={18} /></Link>
              <Link href="#informacion" className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-white/10 px-5 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-black">Recibir información</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#090a0b] py-4">
        <div className="mx-auto grid w-[calc(100%_-_32px)] max-w-[1280px] grid-cols-2 gap-2 lg:grid-cols-4">
          {[['24', 'Viviendas'], ['2 y 3', 'Dormitorios'], ['92-148 m²', 'Superficie'], ['2028', 'Entrega estimada']].map(([value, label], index) => (
            <Stat key={label} value={value} label={label} tone={statTones[index]} />
          ))}
        </div>
      </section>

      <section id="promocion" className="scroll-mt-28 bg-[#2f506f] py-24 md:py-32">
        <div className="mx-auto w-[calc(100%_-_32px)] max-w-[1280px]">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div><p className="text-sm text-[#c81022]">El proyecto</p><h2 className="mt-5 max-w-4xl text-5xl font-light leading-[1] sm:text-6xl md:text-[5rem]">Vivir dentro y fuera, sin elegir entre ambos.</h2></div>
            <p className="max-w-xl text-lg leading-8 text-white/65 md:text-xl">Cada distribución prioriza la amplitud, la luz y la relación con el exterior. Salones abiertos, cocinas integradas y terrazas habitables crean espacios cómodos durante todo el año.</p>
          </div>
          <div className="mt-16 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#1b1c1d]">
              <Image src="/assets/demo-obra-nueva-interior.png" alt="Interior luminoso de una vivienda de Residencial Alborán" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 65vw" />
            </div>
            <div className="flex flex-col justify-between rounded-2xl bg-[#d6a756] p-7 text-black md:p-9">
              <span className="flex size-12 items-center justify-center rounded-xl bg-black text-white"><Sun size={22} /></span>
              <div className="mt-16">
                <p className="text-3xl font-light leading-tight">La casa continúa más allá de sus paredes.</p>
                <ul className="mt-7 grid gap-4 text-sm text-black/65">
                  {["Diseño contemporáneo y funcional", "Terrazas orientadas al paisaje", "Zonas comunes para disfrutar"].map((item) => <li key={item} className="flex items-center gap-3"><Check size={17} className="shrink-0 text-[#c81022]" /> {item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="viviendas" className="scroll-mt-28 bg-[#163638] py-24 md:py-32">
        <div className="mx-auto w-[calc(100%_-_32px)] max-w-[1280px]">
          <p className="text-sm text-[#c81022]">Tipologías</p>
          <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 className="max-w-3xl text-5xl font-light leading-[1] sm:text-6xl md:text-[5rem]">Tu forma de vivir tiene su propio espacio.</h2>
            <p className="max-w-md text-lg leading-8 text-white/55">Tres propuestas con diferentes superficies y una misma atención al detalle.</p>
          </div>
          <div className="mt-16 border-t border-white/20">
            {typologies.map((type) => (
              <article key={type.name} className="group grid min-w-0 gap-6 border-b border-white/20 py-9 transition md:grid-cols-[56px_1.2fr_0.75fr_0.75fr_auto] md:items-center md:py-11">
                <span className="text-sm text-[#c81022]">{type.number}</span>
                <div><h3 className="text-3xl font-light leading-tight">{type.name}</h3><p className="mt-3 max-w-lg leading-7 text-white/50">{type.description}</p></div>
                <div><p className="text-xs text-white/35">Superficie</p><p className="mt-2 text-sm">{type.surface}</p></div>
                <div><p className="text-xs text-white/35">Exterior</p><p className="mt-2 text-sm">{type.terrace}</p></div>
                <div className="flex items-end justify-between gap-5 md:block md:text-right"><div><p className="text-xs text-white/35">Desde</p><strong className="mt-2 block whitespace-nowrap text-2xl font-normal">{type.price}</strong></div><Link href="#informacion" aria-label={`Consultar ${type.name}`} className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-white/25 transition group-hover:border-[#c81022] group-hover:bg-[#c81022] group-hover:text-white md:mt-5"><ArrowUpRight size={18} /></Link></div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs text-white/40">Precios, superficies y disponibilidad incluidos únicamente como contenido de demostración.</p>
        </div>
      </section>

      <section id="calidades" className="scroll-mt-28 bg-[#0f1011] py-24 md:py-32">
        <div className="mx-auto grid w-[calc(100%_-_32px)] max-w-[1280px] gap-16 lg:grid-cols-[0.72fr_1.28fr]">
          <div><p className="text-sm text-[#e85d5d]">Calidades y bienestar</p><h2 className="mt-5 text-5xl font-light leading-[1] sm:text-6xl">Todo lo esencial, bien resuelto.</h2><p className="mt-7 max-w-md text-lg leading-8 text-white/55">Características técnicas convertidas en confort, ahorro y una vida cotidiana más sencilla.</p></div>
          <div className="border-t border-white/20">
            {qualities.map((quality) => <article key={quality.title} className="grid gap-4 border-b border-white/20 py-6 sm:grid-cols-[42px_0.75fr_1.25fr] sm:items-start"><span className="text-xs text-[#d6a756]">{quality.number}</span><h3 className="text-xl font-light">{quality.title}</h3><p className="leading-7 text-white/50">{quality.body}</p></article>)}
          </div>
        </div>
      </section>

      <section id="ubicacion" className="scroll-mt-28 bg-[#681522] py-24 text-white md:py-32">
        <div className="mx-auto grid w-[calc(100%_-_32px)] max-w-[1280px] gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div><p className="text-sm text-[#e84858]">Málaga</p><h2 className="mt-5 max-w-4xl text-5xl font-light leading-[1] sm:text-6xl md:text-[5rem]">Cerca de la ciudad. Cerca del mar.</h2><p className="mt-7 max-w-2xl text-lg leading-8 text-white/55">Una ubicación de ejemplo que combina tranquilidad, servicios cotidianos y conexiones rápidas.</p><div className="mt-12 grid grid-cols-3 gap-3"><LocationTime value="8 min" label="Servicios" /><LocationTime value="15 min" label="Centro" /><LocationTime value="20 min" label="Aeropuerto" /></div></div>
          <div className="flex min-h-[360px] items-center justify-center rounded-2xl bg-[#d6a756] p-8 text-center text-black"><div><span className="mx-auto flex size-16 items-center justify-center rounded-xl bg-black text-white"><MapPin size={29} /></span><p className="mt-6 text-2xl font-light">Málaga, España</p><p className="mt-2 text-sm text-black/55">Ubicación ficticia para demostración</p></div></div>
        </div>
      </section>

      <section id="informacion" className="scroll-mt-28 bg-[#2f506f] py-24 md:py-32">
        <div className="mx-auto grid w-[calc(100%_-_32px)] max-w-[1280px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div><p className="text-sm text-[#f0c36d]">Solicita información</p><h2 className="mt-5 text-5xl font-light leading-[1] sm:text-6xl md:text-[4.75rem]">Tu próxima casa empieza aquí.</h2><p className="mt-7 max-w-xl text-lg leading-8 text-white/55">Déjanos tus datos para recibir planos, memoria de calidades y disponibilidad.</p><div className="mt-12 rounded-2xl bg-[#163638] p-7"><p className="text-xs text-white/40">Comercializa</p><p className="mt-2 text-xl">{siteConfig.brandName}</p><p className="mt-2 text-sm text-white/50">{siteConfig.contact.phone}<br />{siteConfig.contact.email}</p></div></div>
          <aside className="rounded-2xl bg-[#171719] p-6 md:p-10"><h3 className="text-3xl font-light">Quiero recibir el dossier</h3><p className="mt-3 max-w-xl leading-7 text-white/50">Indica qué tipología te interesa y nuestro equipo comercial se pondrá en contacto contigo.</p><div className="mt-7 [&_button]:rounded-xl [&_button]:shadow-none [&_input]:rounded-xl [&_textarea]:rounded-xl"><LeadForm type="information" sourcePath="/demo/residencial-alboran" status={lead} /></div></aside>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#090a0b] py-8"><div className="mx-auto flex w-[calc(100%_-_32px)] max-w-[1280px] flex-wrap items-center justify-between gap-4 text-sm text-white/55"><p><strong className="font-normal text-white">Residencial Alborán</strong> · Proyecto ficticio de demostración</p><Link href="/obra-nueva" className="inline-flex items-center gap-2 text-[#e85d5d]">Comercialización por AKTUA HOME <ArrowUpRight size={16} /></Link></div></section>
    </div>
  );
}

function Stat({ value, label, tone }: { value: string; label: string; tone: string }) {
  return <div className={`${tone} rounded-xl px-3 py-7 text-center md:py-9`}><strong className="block text-2xl font-normal md:text-3xl">{value}</strong><span className="mt-2 block text-xs opacity-65">{label}</span></div>;
}

function LocationTime({ value, label }: { value: string; label: string }) {
  return <div className="border-t border-white/20 pt-5"><strong className="block text-xl font-normal sm:text-2xl">{value}</strong><span className="mt-1 block text-xs text-white/45 sm:text-sm">{label}</span></div>;
}
