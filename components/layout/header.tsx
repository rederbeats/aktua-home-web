"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0f1011]/85 backdrop-blur-2xl">
      <div className="container flex min-h-[72px] items-center justify-between gap-4 py-2">
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <Image
            src={siteConfig.assets.logoHeader}
            alt={siteConfig.brandName}
            width={190}
            height={79}
            className="h-11 w-auto brightness-0 invert md:h-12"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 text-sm text-white/75 lg:flex">
          {siteConfig.navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-lg border border-transparent px-3 py-2 transition hover:border-white/20 hover:bg-white/10 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          data-no-loading
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white transition hover:bg-white hover:text-black lg:hidden"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </div>

      {isMenuOpen ? (
        <nav className="border-t border-white/10 bg-[#090a0b] px-4 pb-5 pt-2 text-base text-white/80 lg:hidden">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block border-b border-white/10 px-2 py-4 transition hover:pl-4 hover:text-white"
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
