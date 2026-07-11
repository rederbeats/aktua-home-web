export default function PrivacyPage() {
  return <LegalPage title="Politica de privacidad" />;
}

function LegalPage({ title }: { title: string }) {
  return (
    <section className="container max-w-3xl py-10">
      <h1 className="text-4xl font-black">{title}</h1>
      <p className="mt-4 leading-8 text-neutral-600">
        Texto legal pendiente de adaptar por asesor legal. La arquitectura contempla consentimiento, minimizacion de datos,
        trazabilidad de leads y configuracion de cookies.
      </p>
    </section>
  );
}
