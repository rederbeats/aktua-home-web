import type { Metadata } from "next";
import Script from "next/script";
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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '3317425701790757');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=3317425701790757&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <GlobalLoadingIndicator />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
