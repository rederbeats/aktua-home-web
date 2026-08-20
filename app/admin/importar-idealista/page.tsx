import type { Metadata } from "next";
import Link from "next/link";
import { importIdealistaManualAction } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Importar idealista"
};

export default async function ImportIdealistaPage({
  searchParams
}: {
  searchParams: Promise<{ created?: string; updated?: string; error?: string }>;
}) {
  const params = await searchParams;
  const created = Number(params.created ?? 0);
  const updated = Number(params.updated ?? 0);

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase text-brand-red">Admin</p>
          <h1 className="mt-2 text-4xl font-black">Importar idealista</h1>
        </div>
        <Link href="/admin/properties" className="inline-flex h-11 items-center rounded-md bg-neutral-100 px-4 font-bold text-neutral-700">
          Ver inmuebles
        </Link>
      </div>

      {created || updated ? (
        <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-bold text-green-800">
          Importación completada: {created} creados y {updated} actualizados. Los inmuebles quedan ocultos hasta que los actives.
        </div>
      ) : null}

      {params.error ? <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-700">{params.error}</div> : null}

      <form action={importIdealistaManualAction} className="mt-6 grid gap-5 rounded-lg border border-black/10 bg-white p-5 shadow-soft md:p-6">
        <div>
          <label className="text-sm font-black uppercase tracking-[0.08em] text-neutral-600" htmlFor="idealista_input">
            Texto o enlaces de idealista
          </label>
          <textarea
            id="idealista_input"
            name="idealista_input"
            required
            className="mt-3 min-h-[360px] w-full rounded-md border border-black/10 p-4 text-sm leading-7"
            placeholder={`Pega aquí el texto copiado del listado de idealista o URLs de anuncios.\n\nEjemplo:\nPiso en Camino Suárez, 32, Suárez, Málaga\n240.000€ 2.667 €/m²\n3 hab. 90 m² 2ª planta exterior con ascensor\nDescripción...`}
          />
        </div>

        <div className="grid gap-3 rounded-md bg-neutral-50 p-4 text-sm leading-6 text-neutral-600 md:grid-cols-3">
          <p><strong className="text-neutral-900">1.</strong> Copia el texto visible de idealista.</p>
          <p><strong className="text-neutral-900">2.</strong> Importa como borrador oculto.</p>
          <p><strong className="text-neutral-900">3.</strong> Revisa, añade fotos y activa.</p>
        </div>

        <button className="h-12 rounded-md bg-brand-red px-5 font-black text-white shadow-[0_14px_34px_rgba(200,16,34,0.24)] transition hover:-translate-y-0.5 hover:bg-red-700" type="submit">
          Importar borradores
        </button>
      </form>
    </section>
  );
}
