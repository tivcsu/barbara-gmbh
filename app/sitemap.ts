import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/src/config/site";
import {
  getLocalizedAlternates,
  localizedPagePaths,
  type SeoPage,
} from "@/src/lib/seo";

const sitemapPages: Array<{
  page: SeoPage;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { page: "home", changeFrequency: "weekly", priority: 1 },
  { page: "services", changeFrequency: "monthly", priority: 0.9 },
  { page: "about", changeFrequency: "monthly", priority: 0.7 },
  { page: "contact", changeFrequency: "monthly", priority: 0.8 },
  { page: "legalNotice", changeFrequency: "yearly", priority: 0.3 },
  { page: "privacy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapPages.flatMap(({ page, changeFrequency, priority }) =>
    (["de", "en"] as const).map((locale) => ({
      url: absoluteUrl(localizedPagePaths[page][locale]),
      changeFrequency,
      priority,
      alternates: { languages: getLocalizedAlternates(page) },
    })),
  );
}
