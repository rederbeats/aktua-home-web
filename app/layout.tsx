import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GlobalLoadingIndicator } from "@/components/ui/global-loading-indicator";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.publicSiteUrl),
  title: {
    default: siteConfig.brandName + " | " + siteConfig.tagline,
    template: "%s | " + siteConfig.brandName
  },
  description: siteConfig.seoDescription,
  openGraph: {
    title: siteConfig.brandName,
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
        <GlobalLoadingIndicator />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
