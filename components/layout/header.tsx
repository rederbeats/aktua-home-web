import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

const navItems = [
  ["Inicio", "/"],
  ["Comprar", "/comprar"],
  ["Vender", "/vender-mi-vivienda"],
  ["Hipotecas", "/hipotecas"],
  ["Servicios", "/servicios"],
  ["Blog", "/blog"],
  ["Contacto", "/contacto"]
];

export function Header() {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="container flex min-h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/assets/aktua-home-logo.png" alt="AKTUA HOME" width={132} height={51} priority />
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-neutral-700 md:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-brand-red">
              {label}
            </Link>
          ))}
          <Link href="/admin" className="rounded-md bg-brand-dark px-4 py-2 text-white">
            Admin
          </Link>
        </nav>
        <details className="group relative md:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-md border border-black/10 bg-white text-brand-dark shadow-sm transition hover:border-brand-red hover:text-brand-red [&::-webkit-details-marker]:hidden">
            <Menu className="h-6 w-6" aria-hidden="true" />
            <span className="sr-only">Abrir menú</span>
          </summary>
          <nav className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-md border border-black/10 bg-white py-2 text-sm font-semibold text-neutral-800 shadow-xl">
            {navItems.map(([label, href]) => (
              <Link key={href} href={href} className="block px-4 py-3 hover:bg-neutral-50 hover:text-brand-red">
                {label}
              </Link>
            ))}
            <div className="px-3 py-2">
              <Link href="/admin" className="block rounded-md bg-brand-dark px-4 py-3 text-center text-white">
                Admin
              </Link>
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
