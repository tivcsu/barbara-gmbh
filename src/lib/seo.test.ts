import { afterEach, describe, expect, it, vi } from "vitest";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import {
  absoluteUrl,
  getSiteUrl,
  isIndexingEnabled,
} from "@/src/config/site";

import { getLocalizedAlternates, localizedPagePaths } from "./seo";

describe("SEO routes", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("builds canonical alternatives for both localized legal routes", () => {
    vi.stubEnv("SITE_URL", "https://www.barbara.example");

    expect(getLocalizedAlternates("privacy")).toEqual({
      "de-AT": "https://www.barbara.example/de/datenschutz",
      en: "https://www.barbara.example/en/privacy",
      "x-default": "https://www.barbara.example/de/datenschutz",
    });
    expect(localizedPagePaths.legalNotice).toEqual({
      de: "/de/impressum",
      en: "/en/legal-notice",
    });
  });

  it("creates a localized sitemap entry for every page", () => {
    vi.stubEnv("SITE_URL", "https://www.barbara.example");

    const entries = sitemap();

    expect(entries).toHaveLength(12);
    expect(entries.map((entry) => entry.url)).toContain(
      "https://www.barbara.example/de/impressum",
    );
    expect(entries.map((entry) => entry.url)).toContain(
      "https://www.barbara.example/en/privacy",
    );
    expect(entries.every((entry) => entry.alternates?.languages)).toBe(true);
  });

  it("blocks indexing unless an explicit HTTPS production origin exists", () => {
    vi.stubEnv("SITE_URL", "");

    expect(isIndexingEnabled()).toBe(false);
    expect(robots()).toEqual({
      rules: { userAgent: "*", disallow: "/" },
    });

    vi.stubEnv("SITE_URL", "https://www.barbara.example");

    expect(isIndexingEnabled()).toBe(true);
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: "https://www.barbara.example/sitemap.xml",
      host: "https://www.barbara.example",
    });
  });

  it("uses the configured origin for absolute URLs", () => {
    vi.stubEnv("SITE_URL", "https://www.barbara.example/base/");

    expect(getSiteUrl().origin).toBe("https://www.barbara.example");
    expect(absoluteUrl("/en/contact")).toBe(
      "https://www.barbara.example/en/contact",
    );
  });
});
