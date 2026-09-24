import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  FileCheck2,
  Handshake,
  KeyRound,
  Landmark,
  Megaphone,
  MessageCircle,
  Phone,
  Users
} from "lucide-react";
import { MetaPixelEvent } from "@/components/analytics/meta-pixel-event";
import { LeadForm } from "@/components/forms/lead-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Comercialización de obra nueva",
  description:
    "Comercialización integral de promociones de obra nueva en Málaga: estrategia, captación de compradores, financiación y acompañamiento hasta la firma."
};

const services = [
  {
    title: "Análisis y estrategia",
    body: "Estudiamos el producto, la zona, la competencia y el comprador objetivo para definir precios y un plan comercial realista.",
    icon: BarChart3
  },
  {
    title: "Lanzamiento comercial",
    body: "Preparamos el posicionamiento de la promoción, los anuncios y las acciones de captación para generar demanda cualificada.",
    icon: Megaphone
  },
  {
    title: "Venta y seguimiento",
    body: "Atendemos consultas, filtramos compradores, organizamos visitas y mantenemos un seguimiento ordenado de cada oportunidad.",
    icon: Users
  },
  {
    title: "Financiación del comprador",
    body: "Estudiamos la viabilidad hipotecaria de los interesados para reducir fricciones y avanzar con operaciones más sólidas.",
    icon: Landmark
  },
  {
    title: "Reservas y documentación",
    body: "Coordinamos reservas, contratos, documentación y los pasos necesarios hasta la escritura de compraventa.",
    icon: FileCheck2
  },
  {
    title: "Acompañamiento integral",
    body: "Centralizamos la comunicación con promotor y comprador para que ambos conozcan el estado de cada operación.",
    icon: Handshake
  }
];

const steps = [
  "Conocemos la promoción, su situación y sus objetivos de venta.",
  "Definimos posicionamiento, precios, materiales y estrategia de captación.",
  "Lanzamos la comercialización y gestionamos cada comprador potencial.",
  "Coordinamos reservas, financiación y documentación hasta la firma."
];

export default async function NewBuildPage({ searchParams }: { searchParams: Promise<{ lead?: string }> }) {
  const { lead } = await searchParams;

  return (
    <div>
      {lead === "sent" ? (
        <MetaPixelEvent eventName="Lead" parameters={{ content_name: "Obra nueva", status: "lead_sent" }} />
      ) : null}

      <section className="relative overflow-hidden bg-brand-dark text-white">
        <div className="absolute inset-0">
          <Image
            src={siteConfig.assets.heroImage}
            alt="Promoción residencial de obra nueva"
            fill
            className="object-cover object-center opacity-55"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.94)_0%,rgba(0,0,0,0.78)_52%,rgba(0,0,0,0.38)_100%)]" />
        </div>

        <div className="container relative flex min-h-[630px] items-center py-16 md:min-h-[690px] md:py-24">
          <div className="max-w-4xl">
            <p className="section-kicker text-red-300">Comercialización de obra nueva</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black leading-[1.02] sm:text-5xl md:text-7xl">
              Tu promoción necesita una estrategia de venta a su altura.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
              Desde Málaga ayudamos principalmente a promotores, constructores y propietarios de suelo de Málaga y provincia a comercializar obra nueva con una gestión cercana, compradores cualificados y seguimiento hasta la firma.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#contacto-obra-nueva"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-brand-red px-5 py-3 text-center font-black text-white shadow-[0_18px_45px_rgba(200,16,34,0.35)] transition hover:-translate-y-0.5 hover:bg-red-700"
              >
                Quiero comercializar mi promoción <ArrowRight className="shrink-0" size={18} />
              </Link>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hola, quiero información para comercializar una promoción de obra nueva.")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-green-600 px-5 py-3 text-center font-bold text-white transition hover:-translate-y-0.5 hover:bg-green-700"
              >
                <MessageCircle size={19} /> Hablar por WhatsApp
              </a>
            </div>
            <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white/80 transition hover:text-white">
              <Phone size={17} /> También puedes llamarnos al {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-6 pb-12 md:-mt-10">
        <div className="container grid gap-3 rounded-lg border border-black/10 bg-white p-3 shadow-[0_22px_70px_rgba(17,17,17,0.14)] sm:grid-cols-3">
          <TrustItem icon={<Building2 size={22} />} title="Estrategia a medida" body="Adaptada a cada promoción y mercado." />
          <TrustItem icon={<Users size={22} />} title="Demanda cualificada" body="Filtramos y acompañamos a cada comprador." />
          <TrustItem icon={<KeyRound size={22} />} title="Hasta la entrega" body="Seguimiento comercial de principio a fin." />
        </div>
      </section>

      <section className="container py-10 md:py-16">
        <div className="max-w-3xl">
          <p className="section-kicker">Servicio integral</p>
          <h2 className="mt-2 text-3xl font-black leading-tight md:text-5xl">Mucho más que publicar viviendas.</h2>
          <p className="mt-4 text-lg leading-8 text-neutral-600">
            Diseñamos y ejecutamos la comercialización completa para que tengas visibilidad sobre las ventas y una única interlocución durante todo el proceso.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="rounded-lg border border-black/10 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(17,17,17,0.14)] md:p-6">
                <div className="flex size-12 items-center justify-center rounded-md bg-red-50 text-brand-red">
                  <Icon size={25} />
                </div>
                <h3 className="mt-4 text-xl font-black">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-600">{service.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-brand-dark py-14 text-white md:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="section-kicker text-red-300">Cómo trabajamos</p>
            <h2 className="mt-2 text-3xl font-black leading-tight md:text-5xl">Un proceso comercial claro y medible.</h2>
            <p className="mt-4 max-w-xl leading-8 text-white/65">
              Cada promoción es distinta. Ajustamos el plan a la fase del proyecto, el número de viviendas y los objetivos del promotor.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {steps.map((step, index) => (
              <article key={step} className="rounded-lg border border-white/15 bg-white/10 p-5">
                <span className="text-sm font-black text-red-300">0{index + 1}</span>
                <p className="mt-2 font-bold leading-7">{step}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto-obra-nueva" className="container scroll-mt-28 py-14 md:py-20">
        <div className="grid overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_26px_80px_rgba(17,17,17,0.12)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-red-50 p-6 md:p-9">
            <p className="section-kicker">Hablemos de tu proyecto</p>
            <h2 className="mt-2 text-3xl font-black leading-tight md:text-5xl">Cuéntanos qué quieres comercializar.</h2>
            <p className="mt-4 leading-8 text-neutral-600">
              Déjanos los datos básicos de la promoción, el terreno o el proyecto. Te contactaremos para conocer la situación y plantear los siguientes pasos.
            </p>
            <ul className="mt-6 grid gap-3 text-sm font-semibold text-neutral-700">
              {["Primera valoración sin compromiso.", "Estrategia adaptada al proyecto.", "Atención directa y seguimiento continuo."].map((item) => (
                <li key={item} className="flex gap-2">
                  <BadgeCheck className="mt-0.5 shrink-0 text-brand-red" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 rounded-lg border border-brand-red/15 bg-white p-4">
              <p className="text-xs font-black uppercase text-neutral-500">Contacto directo</p>
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="mt-2 flex items-center gap-2 text-lg font-black text-brand-dark hover:text-brand-red">
                <Phone size={19} className="text-brand-red" /> {siteConfig.contact.phone}
              </a>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hola, quiero información para comercializar una promoción de obra nueva.")}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-md bg-green-600 px-4 font-bold text-white transition hover:bg-green-700"
              >
                <MessageCircle size={18} /> Contactar por WhatsApp
              </a>
            </div>
          </div>
          <div className="p-6 md:p-9">
            <h3 className="text-2xl font-black">Solicitar información</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">Indica la ubicación, número aproximado de viviendas y fase actual del proyecto.</p>
            <div className="mt-5">
              <LeadForm type="contact" sourcePath="/obra-nueva" status={lead} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TrustItem({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <article className="flex gap-3 rounded-md bg-paper p-4">
      <div className="mt-1 shrink-0 text-brand-red">{icon}</div>
      <div>
        <h2 className="font-black">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-neutral-600">{body}</p>
      </div>
    </article>
  );
}
