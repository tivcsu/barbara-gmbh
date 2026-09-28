import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { absoluteUrl, isIndexingEnabled } from "@/src/config/site";
import { type Locale, routing } from "@/src/i18n/routing";

export type SeoPage =
  | "home"
  | "services"
  | "about"
  | "contact"
  | "legalNotice"
  | "privacy";

export const localizedPagePaths: Record<
  SeoPage,
  Record<Locale, `/${string}`>
> = {
  home: { de: "/de", en: "/en" },
  services: { de: "/de/leistungen", en: "/en/services" },
  about: { de: "/de/ueber-uns", en: "/en/about" },
  contact: { de: "/de/kontakt", en: "/en/contact" },
  legalNotice: { de: "/de/impressum", en: "/en/legal-notice" },
  privacy: { de: "/de/datenschutz", en: "/en/privacy" },
};

export function getLocalizedAlternates(page: SeoPage) {
  return {
    "de-AT": absoluteUrl(localizedPagePaths[page].de),
    en: absoluteUrl(localizedPagePaths[page].en),
    "x-default": absoluteUrl(localizedPagePaths[page].de),
  };
}

export async function getPageMetadata(
  localeValue: string,
  page: SeoPage,
): Promise<Metadata> {
  const locale = hasLocale(routing.locales, localeValue)
    ? localeValue
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t(`pages.${page}.title`);
  const description = t(`pages.${page}.description`);
  const canonical = absoluteUrl(localizedPagePaths[page][locale]);
  const image = absoluteUrl("/images/hero-office.jpg");
  const isIndexable = isIndexingEnabled();

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: getLocalizedAlternates(page),
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: t("siteName"),
      locale: locale === "de" ? "de_AT" : "en_GB",
      alternateLocale: locale === "de" ? ["en_GB"] : ["de_AT"],
      images: [
        {
          url: image,
          width: 1774,
          height: 887,
          alt: t("imageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: isIndexable,
      follow: isIndexable,
      googleBot: {
        index: isIndexable,
        follow: isIndexable,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}
