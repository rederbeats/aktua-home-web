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
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 shadow-[0_8px_30px_rgba(17,17,17,0.05)] backdrop-blur">
      <div className="container flex min-h-14 items-center justify-between gap-4 py-2">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <Image
            src="/assets/aktua-home-logo-header-transparent.png"
            alt="AKTUA HOME"
            width={154}
            height={64}
            className="h-9 w-auto md:h-11"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-black/10 bg-neutral-50 p-1 text-sm font-bold text-neutral-700 md:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-full px-3 py-2 transition hover:bg-white hover:text-brand-red hover:shadow-sm">
              {label}
            </Link>
          ))}
          <Link href="/admin" className="rounded-full bg-brand-dark px-4 py-2 text-white shadow-sm transition hover:bg-brand-red">
            Admin
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-brand-dark shadow-sm transition hover:border-brand-red hover:text-brand-red md:hidden"
          aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {isMenuOpen ? (
        <nav className="border-t border-black/10 bg-white px-4 pb-5 pt-2 text-base font-bold text-neutral-800 shadow-xl md:hidden">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="block border-b border-black/5 px-2 py-4 transition hover:pl-4 hover:text-brand-red"
              onClick={closeMenu}
            >
              {label}
            </Link>
          ))}
          <Link href="/admin" className="mt-4 block rounded-md bg-brand-dark px-4 py-3 text-center text-white shadow-soft" onClick={closeMenu}>
            Admin
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
