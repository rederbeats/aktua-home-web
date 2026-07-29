export const siteConfig = {
  brandName: "AKTUA HOME",
  legalName: "AKTUA HOME",
  ownerName: "Sandra Amate Navarro",
  taxId: "25686330E",
  location: "M\u00e1laga",
  country: "Espa\u00f1a",
  tagline: "Inmobiliaria",
  shortDescription: "Inmobiliaria en M\u00e1laga especializada en compraventa, financiaci\u00f3n, documentaci\u00f3n y acompa\u00f1amiento integral.",
  seoDescription: "Portal inmobiliario y blog de AKTUA HOME.",
  publicSiteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://aktuahome.com",
  contact: {
    email: "aktuahome@gmail.com",
    phone: "+34 654 54 47 96",
    address: "Avenida de las Postas n\u00ba 35, 29014 M\u00e1laga (Espa\u00f1a)"
  },
  assets: {
    logoHeader: "/assets/aktua-home-logo-header-transparent.png",
    logoFooter: "/assets/aktua-home-logo.png",
    heroImage: "/assets/home-hero-real-estate.png"
  },
  navItems: [
    { label: "Inicio", href: "/" },
    { label: "Comprar", href: "/comprar" },
    { label: "Vender", href: "/vender-mi-vivienda" },
    { label: "Hipotecas", href: "/hipotecas" },
    { label: "Servicios", href: "/servicios" },
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "/contacto" }
  ],
  legal: {
    privacyLastUpdated: "22 de julio de 2026"
  }
} as const;

export type SiteConfig = typeof siteConfig;
