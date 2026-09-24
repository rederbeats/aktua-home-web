import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { MetaPixelEvent } from "@/components/analytics/meta-pixel-event";
import { MortgageSimulator } from "@/components/mortgages/mortgage-simulator";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Financiación hipotecaria",
  description: "Estudio y gestión de financiación hipotecaria en toda España, de hasta el 95% según perfil y viabilidad, con " + siteConfig.brandName + "."
};

const points = [
  "Préstamos hipotecarios de hasta el 95% según perfil y viabilidad.",
  "Servicio de financiación disponible en toda España.",
  "Estudio previo para saber qué vivienda puedes comprar con más seguridad.",
  "Gestión de financiación y acompañamiento durante el proceso bancario.",
  "Asesoramiento personalizado antes de presentar una oferta o firmar arras."
];

export default async function MortgagesPage({ searchParams }: { searchParams: Promise<{ lead?: string }> }) {
  const { lead } = await searchParams;

  return (
    <>
      {lead === "sent" ? (
        <MetaPixelEvent eventName="CompleteRegistration" parameters={{ content_name: "Hipotecas", status: "lead_sent" }} />
      ) : null}

      <section className="container py-10 md:py-14">
        <div className="rounded-lg border border-black/10 bg-white p-6 shadow-soft md:p-8">
          <p className="section-kicker">Financiación hipotecaria en toda España</p>
          <h1 className="mt-2 text-4xl font-black leading-tight md:text-6xl">Hipotecas de hasta el 95%</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-neutral-600">
            Aunque nuestra inmobiliaria está en Málaga, estudiamos y gestionamos financiación hipotecaria para clientes de toda España. Te ayudamos a preparar la documentación y avanzar con una estrategia realista antes de comprometerte con una vivienda.
          </p>
          <ul className="mt-6 grid gap-3 text-sm font-semibold text-neutral-700 md:grid-cols-2">
            {points.map((point) => (
              <li key={point} className="flex gap-2">
                <BadgeCheck className="mt-0.5 shrink-0 text-brand-red" size={17} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <MortgageSimulator />

      <section id="consulta-hipoteca" className="container scroll-mt-28 pb-12 md:pb-16">
        <div className="grid gap-6 rounded-lg border border-black/10 bg-white p-5 shadow-soft md:p-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-kicker">Estudio personalizado</p>
            <h2 className="mt-2 text-3xl font-black leading-tight md:text-4xl">Consultar financiación</h2>
            <p className="mt-3 leading-7 text-neutral-600">
              Estés donde estés en España, cuéntanos tu caso y te orientamos sobre los siguientes pasos para estudiar tu hipoteca con una estrategia realista.
            </p>
          </div>
          <LeadForm type="mortgage" sourcePath="/hipotecas" status={lead} />
        </div>
      </section>
    </>
  );
}
