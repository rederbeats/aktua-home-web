import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";

export const metadata: Metadata = {
  title: "Financiacion hipotecaria",
  description: "Estudio y gestion de financiacion hipotecaria de hasta el 95% con AKTUA HOME."
};

const points = [
  "Prestamos hipotecarios de hasta el 95% segun perfil y viabilidad.",
  "Estudio previo para saber que vivienda puedes comprar con mas seguridad.",
  "Gestion de financiacion y acompanamiento durante el proceso bancario.",
  "Asesoramiento personalizado antes de presentar una oferta o firmar arras."
];

export default async function MortgagesPage({ searchParams }: { searchParams: Promise<{ lead?: string }> }) {
  const { lead } = await searchParams;

  return (
    <section className="container grid gap-8 py-10 md:py-14 lg:grid-cols-[1fr_380px]">
      <div className="rounded-lg border border-black/10 bg-white p-6 shadow-soft md:p-8">
        <p className="section-kicker">Financiacion hipotecaria</p>
        <h1 className="mt-2 text-4xl font-black leading-tight md:text-6xl">Hipotecas de hasta el 95%</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">
          Te ayudamos a estudiar tu financiacion, preparar la documentacion y avanzar con una estrategia realista antes de comprometerte con una vivienda.
        </p>
        <ul className="mt-6 grid gap-3 text-sm font-semibold text-neutral-700">
          {points.map((point) => (
            <li key={point} className="flex gap-2">
              <BadgeCheck className="mt-0.5 shrink-0 text-brand-red" size={17} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
      <aside className="h-fit rounded-lg border border-black/10 bg-white p-5 shadow-soft lg:sticky lg:top-28">
        <h2 className="text-xl font-black">Consultar financiacion</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-600">Cuentanos tu caso y te orientamos sobre los siguientes pasos.</p>
        <div className="mt-4">
          <LeadForm type="mortgage" sourcePath="/hipotecas" status={lead} />
        </div>
      </aside>
    </section>
  );
}
