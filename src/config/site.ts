const LOCAL_SITE_URL = "http://localhost:3000";

function parseSiteUrl(value: string | undefined) {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return null;
    }

    url.pathname = "/";
    url.search = "";
    url.hash = "";
    return url;
  } catch {
    return null;
  }
}

export function getSiteUrl() {
  const configuredUrl = parseSiteUrl(process.env.SITE_URL);

  if (configuredUrl) {
    return configuredUrl;
  }

  const netlifyUrl = parseSiteUrl(process.env.URL);

  if (netlifyUrl) {
    return netlifyUrl;
  }

  const vercelHostname = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const vercelUrl = parseSiteUrl(
    vercelHostname ? `https://${vercelHostname}` : undefined,
  );

  return vercelUrl ?? new URL(LOCAL_SITE_URL);
}

export function isIndexingEnabled() {
  const configuredUrl = parseSiteUrl(process.env.SITE_URL);
  return configuredUrl?.protocol === "https:";
}

export function absoluteUrl(pathname: string) {
  return new URL(pathname, getSiteUrl()).toString();
}
