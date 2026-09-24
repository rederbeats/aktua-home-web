export const siteConfig = {
  brandName: "AKTUA HOME",
  legalName: "AKTUA HOME",
  ownerName: "Sandra Amate Navarro",
  taxId: "25686330E",
  location: "M\u00e1laga",
  country: "Espa\u00f1a",
  tagline: "Inmobiliaria",
  shortDescription: "Inmobiliaria de M\u00e1laga. Trabajamos principalmente en M\u00e1laga y ofrecemos financiaci\u00f3n hipotecaria en toda Espa\u00f1a.",
  seoDescription: "Inmobiliaria en M\u00e1laga especializada en compraventa, obra nueva y financiaci\u00f3n hipotecaria en toda Espa\u00f1a.",
  publicSiteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://aktuahome.com",
  contact: {
    email: "aktuahome@gmail.com",
    phone: "+34 644 952 873",
    phoneHref: "tel:+34644952873",
    whatsapp: "34644952873",
    address: "Avenida de las Postas n\u00ba 35, 29014 M\u00e1laga (Espa\u00f1a)"
  },
  assets: {
    logoHeader: "/assets/aktua-home-logo-2026.png",
    logoFooter: "/assets/aktua-home-logo-2026.png",
    heroImage: "/assets/home-hero-real-estate.png"
  },
  navItems: [
    { label: "Inicio", href: "/" },
    { label: "Comprar", href: "/comprar" },
    { label: "Vender", href: "/vender-mi-vivienda" },
    { label: "Obra nueva", href: "/obra-nueva" },
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
