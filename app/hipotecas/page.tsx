import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/lead-form";

export const metadata: Metadata = {
  title: "Hipotecas",
  description: "Orientacion hipotecaria para compradores de vivienda."
};

export default async function MortgagesPage({ searchParams }: { searchParams: Promise<{ lead?: string }> }) {
  const { lead } = await searchParams;

  return (
    <section className="container grid gap-8 py-10 lg:grid-cols-[1fr_380px]">
      <div>
        <p className="text-sm font-bold uppercase text-brand-red">Financiacion</p>
        <h1 className="mt-2 text-4xl font-black">Hipotecas</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">
          Espacio inicial para explicar asesoramiento financiero, simulaciones y derivacion de solicitudes.
        </p>
      </div>
      <aside className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-black">Consultar financiacion</h2>
        <div className="mt-4">
          <LeadForm type="mortgage" sourcePath="/hipotecas" status={lead} />
        </div>
      </aside>
    </section>
  );
}
