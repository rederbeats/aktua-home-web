import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Leads admin"
};

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, type, name, email, phone, message, source_path, created_at")
    .order("created_at", { ascending: false });

  return (
    <section>
      <p className="text-sm font-bold uppercase text-brand-red">Admin</p>
      <h1 className="mt-2 text-4xl font-black">Leads</h1>
      {error ? <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error.message}</div> : null}
      <div className="mt-6 grid gap-3">
        {(leads ?? []).map((lead) => (
          <article key={lead.id} className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
            <p className="text-sm font-bold text-brand-red">{translateLeadType(lead.type)}</p>
            <h2 className="mt-1 text-xl font-black">{lead.name}</h2>
            <p className="mt-1 text-sm text-neutral-600">
              {[lead.email, lead.phone].filter(Boolean).join(" · ") || "Sin contacto"}
            </p>
            {lead.message ? <p className="mt-3 leading-7 text-neutral-700">{lead.message}</p> : null}
          </article>
        ))}
        {!leads?.length ? <div className="rounded-lg border border-black/10 bg-white p-8 text-center text-neutral-500">Todavia no hay leads.</div> : null}
      </div>
    </section>
  );
}

function translateLeadType(type: string) {
  return {
    information: "Informacion",
    viewing: "Visita",
    seller: "Vendedor",
    mortgage: "Hipoteca",
    contact: "Contacto"
  }[type] ?? type;
}
