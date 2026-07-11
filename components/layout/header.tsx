import Image from "next/image";
import Link from "next/link";

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
      <div className="container flex min-h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/assets/aktua-home-logo.png" alt="AKTUA HOME" width={150} height={58} priority />
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
      </div>
    </header>
  );
}
