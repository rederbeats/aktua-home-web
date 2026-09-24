import type { Metadata } from "next";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { LeadForm } from "@/components/forms/lead-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta con " + siteConfig.brandName + " en Málaga. Financiación hipotecaria disponible en toda España."
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ lead?: string }> }) {
  const { lead } = await searchParams;

  return (
    <section className="container grid gap-8 py-10 lg:grid-cols-[1fr_420px]">
      <div>
        <p className="text-sm font-bold uppercase text-brand-red">Contacto</p>
        <h1 className="mt-2 text-4xl font-black">Hablemos de tu vivienda</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">
          Estamos en Málaga y trabajamos principalmente en Málaga y provincia. Para financiación hipotecaria podemos atenderte desde cualquier punto de España.
        </p>
        <div className="mt-7 grid max-w-xl gap-3">
          <a href={siteConfig.contact.phoneHref} className="flex items-center gap-3 rounded-lg border border-black/10 bg-white p-4 font-bold shadow-sm transition hover:border-brand-red">
            <Phone className="text-brand-red" size={21} />
            <span>{siteConfig.contact.phone}</span>
          </a>
          <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 rounded-lg border border-black/10 bg-white p-4 font-bold shadow-sm transition hover:border-brand-red">
            <Mail className="text-brand-red" size={21} />
            <span>{siteConfig.contact.email}</span>
          </a>
          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hola, contacto desde la web de AKTUA HOME.")}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-md bg-green-600 p-4 font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-green-700"
          >
            <MessageCircle size={20} /> Escribir por WhatsApp
          </a>
        </div>
      </div>
      <aside className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
        <LeadForm type="contact" sourcePath="/contacto" status={lead} />
      </aside>
    </section>
  );
}
