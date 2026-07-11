import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Servicios inmobiliarios de AKTUA HOME."
};

export default function ServicesPage() {
  const services = ["Compra", "Venta", "Alquiler", "Valoracion", "Gestion documental", "Marketing inmobiliario"];

  return (
    <section className="container py-10">
      <p className="text-sm font-bold uppercase text-brand-red">Servicios</p>
      <h1 className="mt-2 text-4xl font-black">Servicios inmobiliarios</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <article key={service} className="rounded-lg border border-black/10 bg-white p-5 shadow-soft">
            <h2 className="text-xl font-black">{service}</h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600">Bloque editable para desarrollar contenido SEO y comercial.</p>
          </article>
        ))}
      </div>
    </section>
  );
}
