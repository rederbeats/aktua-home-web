import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "AKTUA HOME | Inmobiliaria",
    template: "%s | AKTUA HOME"
  },
  description: "Portal inmobiliario y blog de AKTUA HOME.",
  openGraph: {
    title: "AKTUA HOME",
    description: "Inmuebles, asesoramiento y servicios inmobiliarios.",
    type: "website",
    locale: "es_ES"
  },
  twitter: {
    card: "summary_large_image"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
