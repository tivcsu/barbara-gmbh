import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  localePrefix: "always",
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/services": {
      de: "/leistungen",
      en: "/services",
    },
    "/services/maintenance-cleaning": {
      de: "/leistungen/unterhaltsreinigung",
      en: "/services/maintenance-cleaning",
    },
    "/services/office-cleaning": {
      de: "/leistungen/bueroreinigung",
      en: "/services/office-cleaning",
    },
    "/services/building-cleaning": {
      de: "/leistungen/gebaeudereinigung",
      en: "/services/building-cleaning",
    },
    "/services/window-cleaning": {
      de: "/leistungen/fensterreinigung",
      en: "/services/window-cleaning",
    },
    "/services/deep-cleaning": {
      de: "/leistungen/grundreinigung",
      en: "/services/deep-cleaning",
    },
    "/about": {
      de: "/ueber-uns",
      en: "/about",
    },
    "/contact": {
      de: "/kontakt",
      en: "/contact",
    },
    "/legal-notice": {
      de: "/impressum",
      en: "/legal-notice",
    },
    "/privacy": {
      de: "/datenschutz",
      en: "/privacy",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
