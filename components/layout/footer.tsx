import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-brand-dark text-white">
      <div className="container grid gap-8 py-10 md:grid-cols-[1fr_auto] md:py-12">
        <div>
          <div className="inline-flex rounded-md bg-white p-2">
            <Image src="/assets/aktua-home-logo.png" alt="AKTUA HOME" width={126} height={49} />
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70">
            Inmobiliaria en Málaga especializada en compraventa, financiación, documentación y acompañamiento integral.
          </p>
        </div>
        <nav className="grid gap-3 text-sm font-semibold text-white/75">
          <Link href="/sobre-aktua-home" className="transition hover:text-white">Sobre AKTUA HOME</Link>
          <Link href="/politica-privacidad" className="transition hover:text-white">Política de privacidad</Link>
          <Link href="/politica-cookies" className="transition hover:text-white">Política de cookies</Link>
          <Link href="/aviso-legal" className="transition hover:text-white">Aviso legal</Link>
        </nav>
      </div>
    </footer>
  );
}
