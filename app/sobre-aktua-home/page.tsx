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
      <div className="mt-4 max-w-3xl space-y-5 text-lg leading-8 text-neutral-600">
        <p>
          En {siteConfig.brandName} acompa&ntilde;amos a propietarios y compradores con una gesti&oacute;n cercana, ordenada y completa.
        </p>
        <p>
          Nuestro trabajo combina asesoramiento inmobiliario, financiaci&oacute;n, documentaci&oacute;n, fiscalidad y apoyo jur&iacute;dico para que cada operaci&oacute;n avance con claridad.
        </p>
        <p>
          Trabajamos desde M&aacute;laga con una visi&oacute;n pr&aacute;ctica: escuchar, ordenar la informaci&oacute;n y acompa&ntilde;ar cada paso hasta la firma.
        </p>
      </div>
    </section>
  );
}
