import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";

export const metadata: Metadata = {
  title: "Vender mi vivienda",
  description: "Asesoramiento de venta, gestion documental y acompanamiento integral con AKTUA HOME."
};

const points = [
  "Valoracion y estrategia de venta adaptada al inmueble.",
  "Gestion integral de la operacion y seguimiento de interesados.",
  "Preparacion de documentacion, impuestos y pasos hasta notaria.",
  "Apoyo juridico, fiscal y documental si la operacion lo requiere."
];

export default async function SellPage({ searchParams }: { searchParams: Promise<{ lead?: string }> }) {
  const { lead } = await searchParams;

  return (
    <section className="container grid gap-8 py-10 md:py-14 lg:grid-cols-[1fr_380px]">
      <div className="rounded-lg border border-black/10 bg-white p-6 shadow-soft md:p-8">
        <p className="section-kicker">Propietarios</p>
        <h1 className="mt-2 text-4xl font-black leading-tight md:text-6xl">Vender mi vivienda con una gestion completa</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">
          Te acompanamos desde la primera valoracion hasta la firma, cuidando la comercializacion, la negociacion, la documentacion y los tramites fiscales o legales necesarios.
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
        <h2 className="text-xl font-black">Solicitar valoracion</h2>
        <p className="mt-2 text-sm leading-6 text-neutral-600">Dinos donde esta tu inmueble y te damos una primera orientacion.</p>
        <div className="mt-4">
          <LeadForm type="seller" sourcePath="/vender-mi-vivienda" status={lead} />
        </div>
      </aside>
    </section>
  );
}
