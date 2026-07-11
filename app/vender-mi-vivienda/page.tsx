import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/lead-form";

export const metadata: Metadata = {
  title: "Vender mi vivienda",
  description: "Solicita una valoracion y plan de venta con AKTUA HOME."
};

export default async function SellPage({ searchParams }: { searchParams: Promise<{ lead?: string }> }) {
  const { lead } = await searchParams;

  return (
    <section className="container grid gap-8 py-10 lg:grid-cols-[1fr_380px]">
      <div>
        <p className="text-sm font-bold uppercase text-brand-red">Propietarios</p>
        <h1 className="mt-2 text-4xl font-black">Vender mi vivienda</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">
          Pagina preparada para captacion de propietarios, valoraciones, documentacion y estrategia comercial.
        </p>
      </div>
      <aside className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
        <h2 className="text-xl font-black">Solicitar valoracion</h2>
        <div className="mt-4">
          <LeadForm type="seller" sourcePath="/vender-mi-vivienda" status={lead} />
        </div>
      </aside>
    </section>
  );
}
