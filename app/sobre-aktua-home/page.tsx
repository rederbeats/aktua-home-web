import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre AKTUA HOME",
  description: "Conoce AKTUA HOME."
};

export default function AboutPage() {
  return (
    <section className="container py-10">
      <p className="text-sm font-bold uppercase text-brand-red">Sobre nosotros</p>
      <h1 className="mt-2 text-4xl font-black">Sobre AKTUA HOME</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-neutral-600">
        Pagina corporativa inicial para completar con historia, equipo, valores, zona de actuacion y propuesta de valor.
      </p>
    </section>
  );
}
