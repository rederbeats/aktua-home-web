export const siteConfig = {
  brandName: "AKTUA HOME",
  legalName: "AKTUA HOME",
  ownerName: "Sandra Amate Navarro",
  taxId: "25686330E",
  location: "Málaga",
  country: "España",
  tagline: "Inmobiliaria",
  shortDescription: "Inmobiliaria en Málaga especializada en compraventa, financiación, documentación y acompañamiento integral.",
  seoDescription: "Portal inmobiliario y blog de AKTUA HOME.",
  publicSiteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://aktuahome.com",
  contact: {
    email: "aktuahome@gmail.com",
    phone: "+34 654 54 47 96",
    address: "Avenida de las Postas nº 35, 29014 Málaga (España)"
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
