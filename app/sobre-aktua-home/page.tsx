import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sobre " + siteConfig.brandName,
  description: "Conoce " + siteConfig.brandName + "."
};

export default function AboutPage() {
  return (
    <section className="container py-10">
      <p className="text-sm font-bold uppercase text-brand-red">Sobre nosotros</p>
      <h1 className="mt-2 text-4xl font-black">Sobre {siteConfig.brandName}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-neutral-600">
        En {siteConfig.brandName} acompa?amos a propietarios y compradores con una gesti?n cercana, ordenada y completa. Nuestro trabajo combina
        asesoramiento inmobiliario, financiaci?n, documentaci?n, fiscalidad y apoyo jur?dico para que cada operaci?n avance con claridad.
      </p>
    </section>
  );
}
