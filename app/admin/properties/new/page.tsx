import type { Metadata } from "next";
import { NewPropertyForm } from "@/components/admin/new-property-form";

export const metadata: Metadata = {
  title: "Nuevo inmueble"
};

export default async function NewPropertyPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  return (
    <section>
      <p className="text-sm font-bold uppercase text-brand-red">Admin</p>
      <h1 className="mt-2 text-4xl font-black">Nuevo inmueble</h1>
      {error ? <div className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{decodeURIComponent(error)}</div> : null}
      <NewPropertyForm />
    </section>
  );
}
