import type { MetadataRoute } from "next";

import {
  absoluteUrl,
  getSiteUrl,
  isIndexingEnabled,
} from "@/src/config/site";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexingEnabled()) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: getSiteUrl().origin,
  };
}
