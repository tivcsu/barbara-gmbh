import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { CompanyIntroduction } from "@/src/components/sections/CompanyIntroduction";
import { ContactCTA } from "@/src/components/sections/ContactCTA";
import { PageHero } from "@/src/components/sections/PageHero";
import { QualityPhilosophy } from "@/src/components/sections/QualityPhilosophy";
import { Values } from "@/src/components/sections/Values";
import { WorkingApproach } from "@/src/components/sections/WorkingApproach";
import { pageImages } from "@/src/content/pages";
import { getPageMetadata } from "@/src/lib/seo";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "about");
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("AboutPage.hero");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        image={pageImages.aboutHero}
        imageAlt={t("imageAlt")}
        marker="02"
      />
      <CompanyIntroduction />
      <Values />
      <QualityPhilosophy />
      <WorkingApproach />
      <ContactCTA />
    </>
  );
}
