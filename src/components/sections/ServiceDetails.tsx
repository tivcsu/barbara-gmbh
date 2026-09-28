import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Container } from "@/src/components/layout/Container";
import { homeServices } from "@/src/content/home";
import { Link } from "@/src/i18n/navigation";

export async function ServiceDetails() {
  const [t, home] = await Promise.all([
    getTranslations("ServicesPage.details"),
    getTranslations("Home.services"),
  ]);

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32" aria-label={t("sectionLabel")}>
      <Container className="space-y-20 lg:space-y-32">
        {homeServices.map((service, index) => {
          const reverse = index % 2 === 1;

          return (
            <article
              key={service.key}
              id={service.anchor}
              className="grid scroll-mt-28 gap-10 lg:grid-cols-2 lg:items-center lg:gap-20"
            >
              <div className={`relative min-h-[26rem] overflow-hidden bg-warm-gray sm:min-h-[34rem] ${reverse ? "lg:order-2" : ""}`}>
                <Image
                  src={service.image}
                  alt={home(`items.${service.key}.imageAlt`)}
                  fill
                  placeholder="blur"
                  className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                  sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, 100vw"
                />
              </div>

              <div className={reverse ? "lg:order-1" : ""}>
                <p className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-gold-dark">
                  {String(index + 1).padStart(2, "0")} / {t("serviceLabel")}
                </p>
                <h2 className="mt-5 hyphens-auto font-display text-[2.5rem] font-medium leading-[1.02] tracking-[-0.025em] text-ink sm:text-5xl">
                  {t(`items.${service.key}.title`)}
                </h2>
                <p className="mt-6 max-w-xl text-base leading-7 text-muted">
                  {t(`items.${service.key}.description`)}
                </p>
                <ul className="mt-7 space-y-3 border-t border-border pt-6">
                  {["bulletOne", "bulletTwo", "bulletThree"].map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-sm leading-6 text-ink">
                      <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-gold-dark" strokeWidth={1.5} />
                      {t(`items.${service.key}.${bullet}`)}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="editorial-link mt-8">
                  {t("cta")}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </div>
            </article>
          );
        })}
      </Container>
    </section>
  );
}
