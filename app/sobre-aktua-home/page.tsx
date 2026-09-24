import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Sobre " + siteConfig.brandName,
  description: "Conoce " + siteConfig.brandName + ", inmobiliaria de Málaga con financiación hipotecaria en toda España."
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
          Somos de M&aacute;laga y prestamos nuestros servicios inmobiliarios principalmente en M&aacute;laga y provincia. Trabajamos con una visi&oacute;n pr&aacute;ctica: escuchar, ordenar la informaci&oacute;n y acompa&ntilde;ar cada paso hasta la firma.
        </p>
        <p>
          Nuestro servicio de financiaci&oacute;n hipotecaria tiene alcance nacional, por lo que podemos estudiar y gestionar operaciones para clientes de toda Espa&ntilde;a.
        </p>
      </div>
    </section>
  );
}
