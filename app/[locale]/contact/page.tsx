import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ContactPanel } from "@/src/components/sections/ContactPanel";
import { PageHero } from "@/src/components/sections/PageHero";
import { pageImages } from "@/src/content/pages";
import { getPageMetadata } from "@/src/lib/seo";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "contact");
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ContactPage.hero");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        image={pageImages.contactHero}
        imageAlt={t("imageAlt")}
        marker="03"
      />
      <ContactPanel />
    </>
  );
}
