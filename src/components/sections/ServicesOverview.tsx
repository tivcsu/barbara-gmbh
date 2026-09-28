import { ArrowDownRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/src/components/layout/Container";
import { Eyebrow } from "@/src/components/ui/Eyebrow";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { homeServices } from "@/src/content/home";
import { Link } from "@/src/i18n/navigation";

export async function ServicesOverview() {
  const t = await getTranslations("ServicesPage.overview");

  return (
    <section className="py-20 sm:py-24 lg:py-28" aria-labelledby="services-overview-heading">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <SectionHeading id="services-overview-heading" className="mt-5 max-w-[14ch]">
              {t("title")}
            </SectionHeading>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted lg:justify-self-end lg:pb-2">
            {t("intro")}
          </p>
        </div>

        <nav aria-label={t("navigationLabel")} className="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:mt-16 lg:grid-cols-5">
          {homeServices.map((service, index) => (
            <Link
              key={service.key}
              href={{ pathname: "/services", hash: service.anchor }}
              className="group flex min-h-40 flex-col justify-between border-b border-r border-border bg-white p-5 transition-colors duration-200 hover:bg-warm-gray/45"
            >
              <span className="text-[0.65rem] font-bold tracking-[0.18em] text-gold-dark">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-8 flex items-end justify-between gap-4 font-display text-xl font-semibold leading-tight text-ink">
                {t(`items.${service.key}`)}
                <ArrowDownRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-gold-dark transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  strokeWidth={1.5}
                />
              </span>
            </Link>
          ))}
        </nav>
      </Container>
    </section>
  );
}
