import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { AboutTeaser } from "@/src/components/sections/AboutTeaser";
import { Benefits } from "@/src/components/sections/Benefits";
import { ContactCTA } from "@/src/components/sections/ContactCTA";
import { Hero } from "@/src/components/sections/Hero";
import { Services } from "@/src/components/sections/Services";
import { getPageMetadata } from "@/src/lib/seo";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "home");
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Services />
      <Benefits />
      <AboutTeaser />
      <ContactCTA />
    </>
  );
}
