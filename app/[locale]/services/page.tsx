import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Benefits } from "@/src/components/sections/Benefits";
import { ContactCTA } from "@/src/components/sections/ContactCTA";
import { PageHero } from "@/src/components/sections/PageHero";
import { ServiceDetails } from "@/src/components/sections/ServiceDetails";
import { ServicesOverview } from "@/src/components/sections/ServicesOverview";
import { pageImages } from "@/src/content/pages";
import { getPageMetadata } from "@/src/lib/seo";

type ServicesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ServicesPageProps): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "services");
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesPage.hero");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        image={pageImages.servicesHero}
        imageAlt={t("imageAlt")}
        marker="01"
      />
      <ServicesOverview />
      <ServiceDetails />
      <Benefits />
      <ContactCTA />
    </>
  );
}
