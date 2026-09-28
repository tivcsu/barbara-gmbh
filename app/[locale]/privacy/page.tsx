import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  LegalDocument,
  type LegalSection,
} from "@/src/components/legal/LegalDocument";
import { getPageMetadata } from "@/src/lib/seo";

type PrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "privacy");
}

// Final legal content must be supplied or approved by the client/legal professional.
export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("PrivacyPage");

  const sections: LegalSection[] = [
    "controller",
    "hosting",
    "contactForm",
    "emailDelivery",
    "rateLimiting",
    "cookies",
    "retention",
    "rights",
  ].map((key) => ({
    title: t(`sections.${key}.title`),
    paragraphs: [t(`sections.${key}.body`)],
  }));

  return (
    <LegalDocument
      eyebrow={t("eyebrow")}
      title={t("title")}
      intro={t("intro")}
      noticeTitle={t("notice.title")}
      noticeBody={t("notice.body")}
      sections={sections}
    />
  );
}
