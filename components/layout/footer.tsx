import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-brand-dark text-white">
      <div className="container grid gap-8 py-10 md:grid-cols-[1fr_auto] md:py-12">
        <div>
          <div className="inline-flex rounded-md bg-white p-2">
            <Image src={siteConfig.assets.logoFooter} alt={siteConfig.brandName} width={126} height={49} />
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70">{siteConfig.shortDescription}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/20 px-3 text-sm font-bold text-white transition hover:border-white/50"
            >
              <Phone size={16} /> {siteConfig.contact.phone}
            </a>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent("Hola, contacto desde la web de AKTUA HOME.")}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-2 rounded-md bg-green-600 px-3 text-sm font-bold text-white transition hover:bg-green-700"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
          <p className="mt-5 text-xs font-semibold text-white/45">
            Web y tecnolog&iacute;a desarrolladas por{" "}
            <a
              href="https://valencialabs.pages.dev/"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 underline decoration-white/25 underline-offset-4 transition hover:text-white"
            >
              Valencia Labs
            </a>
            .
          </p>
        </div>
        <nav className="grid gap-3 text-sm font-semibold text-white/75">
          <Link href="/sobre-aktua-home" className="transition hover:text-white">Sobre {siteConfig.brandName}</Link>
          <Link href="/obra-nueva" className="transition hover:text-white">Obra nueva</Link>
          <Link href="/politica-privacidad" className="transition hover:text-white">Pol&iacute;tica de privacidad</Link>
          <Link href="/politica-cookies" className="transition hover:text-white">Pol&iacute;tica de cookies</Link>
          <Link href="/aviso-legal" className="transition hover:text-white">Aviso legal</Link>
        </nav>
      </div>
    </footer>
  );
}
