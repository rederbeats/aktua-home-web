import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site-config";

export default function PrivacyPage() {
  const legal = siteConfig.legal;
  const contact = siteConfig.contact;

  return (
    <section className="container max-w-4xl py-10 md:py-14">
      <p className="section-kicker">Última actualización: {legal.privacyLastUpdated}</p>
      <h1 className="mt-2 text-4xl font-black md:text-5xl">Política de privacidad</h1>

      <div className="mt-8 space-y-8 leading-8 text-neutral-700">
        <p>
          En {siteConfig.brandName} estamos comprometidos con la protección de los datos personales de nuestros clientes, propietarios,
          compradores, arrendadores, arrendatarios y usuarios de nuestra página web.
        </p>
        <p>
          La presente Política de Privacidad informa sobre el tratamiento de los datos personales de conformidad con el Reglamento (UE) 2016/679,
          General de Protección de Datos (RGPD), la Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales
          (LOPDGDD), y la Ley 34/2002, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE).
        </p>

        <LegalSection title="1. Responsable del tratamiento">
          <dl className="grid gap-3 rounded-lg border border-black/10 bg-white p-5 shadow-sm sm:grid-cols-[180px_1fr]">
            <dt className="font-black text-brand-dark">Titular</dt>
            <dd>{siteConfig.ownerName}</dd>
            <dt className="font-black text-brand-dark">NIF</dt>
            <dd>{siteConfig.taxId}</dd>
            <dt className="font-black text-brand-dark">Nombre comercial</dt>
            <dd>{siteConfig.legalName}</dd>
            <dt className="font-black text-brand-dark">Domicilio</dt>
            <dd>{contact.address}</dd>
            <dt className="font-black text-brand-dark">Correo electrónico</dt>
            <dd>{contact.email}</dd>
            <dt className="font-black text-brand-dark">Teléfono</dt>
            <dd>{contact.phone}</dd>
            <dt className="font-black text-brand-dark">Sitio web</dt>
            <dd>{siteConfig.publicSiteUrl}</dd>
          </dl>
        </LegalSection>

        <LegalSection title="2. Qué datos personales tratamos">
          <LegalList
            items={[
              "Nombre y apellidos.",
              "Documento identificativo cuando sea necesario.",
              "Dirección postal.",
              "Teléfono.",
              "Correo electrónico.",
              "Información relativa al inmueble objeto de compraventa o alquiler.",
              "Datos económicos o financieros necesarios para la gestión de operaciones inmobiliarias o intermediación hipotecaria.",
              "Información aportada mediante formularios, llamadas telefónicas, WhatsApp, correo electrónico o reuniones presenciales.",
              "Dirección IP, cookies y datos de navegación cuando visite nuestra página web."
            ]}
          />
        </LegalSection>

        <LegalSection title="3. Finalidad del tratamiento">
          <LegalList
            items={[
              "Atender consultas y solicitudes de información.",
              "Gestionar la compra, venta o alquiler de inmuebles.",
              "Organizar visitas a viviendas.",
              "Realizar valoraciones inmobiliarias.",
              "Gestionar encargos de intermediación inmobiliaria.",
              "Tramitar solicitudes de financiación e intermediación hipotecaria cuando el cliente lo solicite.",
              "Elaborar presupuestos y propuestas comerciales.",
              "Cumplir obligaciones legales, fiscales, administrativas y contables.",
              "Enviar comunicaciones comerciales sobre nuestros servicios cuando exista consentimiento o interés legítimo conforme a la legislación vigente."
            ]}
          />
        </LegalSection>

        <LegalSection title="4. Legitimación">
          <LegalList
            items={[
              "La ejecución de un contrato o la aplicación de medidas precontractuales.",
              "El consentimiento del interesado.",
              "El cumplimiento de obligaciones legales.",
              "El interés legítimo de " + siteConfig.brandName + " para mejorar la atención al cliente y la prestación de sus servicios."
            ]}
          />
        </LegalSection>

        <LegalSection title="5. Conservación de los datos">
          <LegalList
            items={[
              "Mientras exista una relación contractual o comercial.",
              "Mientras el interesado no solicite su supresión.",
              "Durante los plazos legalmente exigidos por la normativa fiscal, mercantil o administrativa.",
              "En el caso de comunicaciones comerciales, hasta que el interesado retire su consentimiento."
            ]}
          />
        </LegalSection>

        <LegalSection title="6. Destinatarios de los datos">
          <p>Sus datos podrán ser comunicados únicamente cuando resulte necesario para la prestación del servicio a:</p>
          <LegalList
            items={[
              "Notarías.",
              "Registros de la Propiedad.",
              "Entidades financieras.",
              "Tasadoras.",
              "Gestorías y asesorías.",
              "Administraciones Públicas.",
              "Juzgados y Tribunales cuando exista obligación legal.",
              "Empresas proveedoras de servicios tecnológicos que actúen como encargados del tratamiento."
            ]}
          />
          <p>En ningún caso {siteConfig.brandName} venderá, alquilará o cederá datos personales con fines comerciales.</p>
        </LegalSection>

        <LegalSection title="7. Transferencias internacionales">
          <p>Con carácter general, {siteConfig.brandName} no realiza transferencias internacionales de datos.</p>
          <p>
            No obstante, algunos proveedores tecnológicos, como servicios de correo electrónico, almacenamiento en la nube o herramientas de
            análisis, pueden tratar información fuera del Espacio Económico Europeo, aplicando las garantías previstas por el RGPD.
          </p>
        </LegalSection>

        <LegalSection title="8. Derechos de los interesados">
          <p>Puede ejercer en cualquier momento los siguientes derechos:</p>
          <LegalList
            items={[
              "Derecho de acceso.",
              "Derecho de rectificación.",
              "Derecho de supresión.",
              "Derecho de oposición.",
              "Derecho a la limitación del tratamiento.",
              "Derecho a la portabilidad de los datos.",
              "Derecho a retirar el consentimiento en cualquier momento."
            ]}
          />
          <p>Para ejercer estos derechos puede enviar una solicitud a: {contact.email}.</p>
          <p>La solicitud deberá ir acompañada de un documento que permita acreditar su identidad cuando resulte necesario.</p>
          <p>
            Asimismo, podrá presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si considera que el tratamiento
            de sus datos no se ajusta a la normativa vigente.
          </p>
        </LegalSection>

        <LegalSection title="9. Medidas de seguridad">
          <p>
            {siteConfig.brandName} adopta las medidas técnicas y organizativas necesarias para garantizar la confidencialidad, integridad y
            disponibilidad de los datos personales, evitando su alteración, pérdida, tratamiento o acceso no autorizado.
          </p>
        </LegalSection>

        <LegalSection title="10. Comunicaciones comerciales">
          <p>
            Solo enviaremos información comercial cuando exista consentimiento del interesado, o exista una relación contractual previa y las
            comunicaciones se refieran a servicios similares a los contratados, conforme a la legislación vigente.
          </p>
          <p>El usuario podrá darse de baja en cualquier momento enviando un correo electrónico a: {contact.email}.</p>
        </LegalSection>

        <LegalSection title="11. Redes sociales">
          <p>{siteConfig.brandName} dispone de perfiles en diferentes redes sociales.</p>
          <p>
            Las interacciones realizadas a través de dichas plataformas estarán sujetas tanto a esta Política de Privacidad como a las políticas de
            privacidad propias de cada red social.
          </p>
        </LegalSection>

        <LegalSection title="12. Cookies">
          <p>Nuestra página web utiliza cookies técnicas y, en su caso, cookies analíticas y de personalización.</p>
          <p>Puede obtener información detallada consultando nuestra Política de Cookies.</p>
        </LegalSection>

        <LegalSection title="13. Modificaciones de esta política">
          <p>
            {siteConfig.brandName} podrá modificar la presente Política de Privacidad cuando resulte necesario para adaptarla a cambios legislativos,
            jurisprudenciales o en la prestación de sus servicios.
          </p>
          <p>La versión publicada en la página web será siempre la vigente.</p>
        </LegalSection>
      </div>
    </section>
  );
}

function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-black text-brand-dark">{title}</h2>
      {children}
    </section>
  );
}

function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-5">
      {items.map((item) => (
        <li key={item} className="list-disc">
          {item}
        </li>
      ))}
    </ul>
  );
}
