import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-white">
      <div className="container grid gap-8 py-10 md:grid-cols-[1fr_auto]">
        <div>
          <strong className="text-lg">AKTUA HOME</strong>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
            Inmobiliaria preparada para publicar inmuebles, captar propietarios y crecer hacia integraciones con Idealista o CRM.
          </p>
        </div>
        <nav className="grid gap-2 text-sm text-neutral-600">
          <Link href="/sobre-aktua-home">Sobre AKTUA HOME</Link>
          <Link href="/politica-privacidad">Politica de privacidad</Link>
          <Link href="/politica-cookies">Politica de cookies</Link>
          <Link href="/aviso-legal">Aviso legal</Link>
        </nav>
      </div>
    </footer>
  );
}
