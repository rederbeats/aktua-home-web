import type { Metadata } from "next";
import { BadgeCheck, FileText, Home, Landmark, Languages, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Compraventa, financiacion hipotecaria, gestion documental, servicios juridicos y traducciones juradas de AKTUA HOME."
};

const services = [
  {
    title: "Compraventa de inmuebles",
    intro: "Asesoramiento en compra y venta con gestion integral de la operacion.",
    icon: Home,
    points: ["Asesoramiento en compra y venta.", "Gestion integral de operaciones.", "Acompanamiento durante todo el proceso."]
  },
  {
    title: "Financiacion hipotecaria",
    intro: "Estudiamos tu caso y buscamos una financiacion adaptada a tu perfil.",
    icon: Landmark,
    points: ["Prestamos hipotecarios de hasta el 95%.", "Estudio y gestion de financiacion.", "Asesoramiento personalizado."]
  },
  {
    title: "Gestion documental y fiscal",
    intro: "Te ayudamos con los tramites que rodean una compraventa o una regularizacion inmobiliaria.",
    icon: FileText,
    points: ["Escrituras y pagos.", "Plusvalia e Impuesto sobre Transmisiones Patrimoniales (ITP).", "Declaracion de obra nueva y divisiones horizontales."]
  },
  {
    title: "Servicios juridicos",
    intro: "Coordinacion y asesoramiento legal para operaciones familiares, patrimoniales e inmobiliarias.",
    icon: Scale,
    points: ["Asesoramiento legal.", "Declaracion de herederos, testamentos y adjudicacion de herencias.", "Donaciones y procedimientos familiares."]
  },
  {
    title: "Traducciones juradas",
    intro: "Traducciones oficiales para tramites legales, fiscales e inmobiliarios.",
    icon: Languages,
    points: ["Traducciones oficiales.", "Documentacion para compraventas y tramites legales.", "Soporte para clientes nacionales e internacionales."]
  }
];

export default function ServicesPage() {
  return (
    <section className="container py-10 md:py-14">
      <div className="rounded-lg border border-black/10 bg-white p-6 shadow-soft md:p-8">
        <p className="section-kicker">Servicios</p>
        <h1 className="mt-2 text-4xl font-black leading-tight md:text-6xl">Soluciones completas para tu operacion inmobiliaria</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-neutral-600">
          En AKTUA HOME no nos limitamos a ensenar viviendas. Te acompanamos en la compraventa, la financiacion, la documentacion, los impuestos y los tramites legales que pueden aparecer antes, durante y despues de la firma.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <article key={service.title} className="rounded-lg border border-black/10 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(17,17,17,0.14)] md:p-6">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-red-50 text-brand-red">
                  <Icon size={25} />
                </div>
                <div>
                  <h2 className="text-2xl font-black leading-tight">{service.title}</h2>
                  <p className="mt-2 leading-7 text-neutral-600">{service.intro}</p>
                </div>
              </div>
              <ul className="mt-5 grid gap-3 text-sm font-semibold text-neutral-700">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <BadgeCheck className="mt-0.5 shrink-0 text-brand-red" size={17} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
