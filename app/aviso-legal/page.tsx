import { siteConfig } from "@/lib/site-config";

export default function LegalNoticePage() {
  return (
    <section className="container max-w-3xl py-10">
      <h1 className="text-4xl font-black">Aviso legal</h1>
      <div className="mt-5 space-y-5 leading-8 text-neutral-600">
        <p>
          {siteConfig.brandName} ofrece servicios de intermediaci?n inmobiliaria, asesoramiento en compraventa, financiaci?n, gesti?n documental,
          servicios jur?dicos y traducciones juradas relacionados con operaciones inmobiliarias.
        </p>
        <p>
          La informaci?n publicada en esta web tiene car?cter informativo. Las caracter?sticas, precios y disponibilidad de los inmuebles pueden
          variar, por lo que se confirmar?n siempre antes de formalizar cualquier operaci?n.
        </p>
        <p>
          El contenido, im?genes, textos y elementos visuales de la web pertenecen a {siteConfig.brandName} o se utilizan con autorizaci?n. No est?
          permitida su reproducci?n o uso comercial sin consentimiento previo.
        </p>
      </div>
    </section>
  );
}
