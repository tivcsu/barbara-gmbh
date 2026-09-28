import { absoluteUrl, getSiteUrl } from "@/src/config/site";
import { company } from "@/src/content/company";

export function StructuredData() {
  const siteUrl = getSiteUrl().toString();

  // Upgrade Organization to LocalBusiness only after client-approved address,
  // phone, registration, service area and opening hours are available.
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: company.name,
        url: siteUrl,
        logo: absoluteUrl("/images/barbara-gmbh-logo.png"),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        name: company.name,
        url: siteUrl,
        inLanguage: ["de-AT", "en"],
        publisher: { "@id": `${siteUrl}#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
