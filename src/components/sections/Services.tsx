import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { ServiceCard } from "@/src/components/cards/ServiceCard";
import { Container } from "@/src/components/layout/Container";
import { Eyebrow } from "@/src/components/ui/Eyebrow";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { homeServices } from "@/src/content/home";
import { Link } from "@/src/i18n/navigation";

export async function Services() {
  const t = await getTranslations("Home.services");

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28" aria-labelledby="services-heading">
      <Container>
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <SectionHeading id="services-heading" className="mt-5 max-w-[17ch]">
              {t("title")}
            </SectionHeading>
          </div>
          <Link href="/services" className="editorial-link self-start lg:mb-2">
            {t("viewAll")}
            <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="mt-12 grid gap-x-5 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {homeServices.map((service, index) => (
            <ServiceCard
              key={service.key}
              service={service}
              index={index}
              title={t(`items.${service.key}.title`)}
              description={t(`items.${service.key}.description`)}
              imageAlt={t(`items.${service.key}.imageAlt`)}
              linkLabel={t("learnMore")}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
