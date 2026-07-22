import type { Metadata } from "next";
import { LeadForm } from "@/components/forms/lead-form";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta con AKTUA HOME."
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ lead?: string }> }) {
  const { lead } = await searchParams;

  return (
    <section className="container grid gap-8 py-10 lg:grid-cols-[1fr_420px]">
      <div>
        <p className="text-sm font-bold uppercase text-brand-red">Contacto</p>
        <h1 className="mt-2 text-4xl font-black">Hablemos de tu vivienda</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">
          Cuéntanos qué necesitas y te responderemos con una primera orientación personalizada.
        </p>
      </div>
      <aside className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
        <LeadForm type="contact" sourcePath="/contacto" status={lead} />
      </aside>
    </section>
  );
}
