import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Container } from "@/src/components/layout/Container";
import { Link } from "@/src/i18n/navigation";

export async function ContactCTA() {
  const t = await getTranslations("Home.contact");

  return (
    <section className="contact-cta relative overflow-hidden bg-surface-dark py-20 text-warm-white sm:py-24 lg:py-28" aria-labelledby="contact-cta-heading">
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-gold-light">
              {t("eyebrow")}
            </p>
            <h2
              id="contact-cta-heading"
              className="mt-5 max-w-[17ch] font-display text-[2.6rem] font-medium leading-[1.02] tracking-[-0.025em] sm:text-5xl lg:text-[3.8rem]"
            >
              {t("title")}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-warm-white/65">
              {t("description")}
            </p>
          </div>

          <Link href="/contact" className="button-primary self-start lg:mb-1 lg:min-w-72">
            {t("cta")}
            <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="mt-14 flex items-center gap-5 border-t border-white/15 pt-6 sm:mt-20">
          <span aria-hidden="true" className="h-px w-12 bg-gold-light" />
          <p className="font-display text-xl italic text-warm-white/75 sm:text-2xl">
            {t("statement")}
          </p>
        </div>
      </Container>
    </section>
  );
}
