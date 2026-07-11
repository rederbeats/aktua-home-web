"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <div className="container flex min-h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
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

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md border border-black/10 bg-white text-brand-dark shadow-sm transition hover:border-brand-red hover:text-brand-red md:hidden"
          aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {isMenuOpen ? (
        <nav className="border-t border-black/10 bg-white px-4 pb-5 pt-2 text-base font-semibold text-neutral-800 shadow-xl md:hidden">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="block border-b border-black/5 px-2 py-4 hover:text-brand-red"
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
          <Link href="/admin" className="mt-4 block rounded-md bg-brand-dark px-4 py-3 text-center text-white" onClick={closeMenu}>
            Admin
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
