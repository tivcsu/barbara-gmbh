import {
  ArrowDownRight,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Handshake,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Container } from "@/src/components/layout/Container";
import { homeImages } from "@/src/content/home";
import { Link } from "@/src/i18n/navigation";

const trustPoints = [
  ["reliable", CheckCircle2],
  ["flexible", CalendarClock],
  ["professional", Sparkles],
  ["personal", Handshake],
] as const;

export async function Hero() {
  const t = await getTranslations("Home.hero");

  return (
    <section className="overflow-hidden" aria-labelledby="home-heading">
      <Container>
        <div className="grid lg:min-h-[42rem] lg:grid-cols-[1.05fr_0.95fr] xl:min-h-[46rem]">
          <div className="flex flex-col justify-center py-16 sm:py-20 lg:py-24 lg:pr-14 xl:pr-20">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-gold-dark">
              {t("eyebrow")}
            </p>
            <h1
              id="home-heading"
              className="mt-6 max-w-[12ch] font-display text-[3rem] font-medium leading-[0.98] tracking-[-0.035em] text-ink sm:text-[4rem] lg:text-[4.75rem]"
            >
              {t("titleBefore")} <span className="text-gold-dark">{t("titleAccent")}</span>{" "}
              {t("titleAfter")}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              {t("description")}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/contact" className="button-primary sm:min-w-52">
                {t("primaryCta")}
                <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
              </Link>
              <Link href="/services" className="button-secondary sm:min-w-48">
                {t("secondaryCta")}
                <ArrowDownRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>

            <ul className="mt-11 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-border pt-6 sm:grid-cols-4">
              {trustPoints.map(([key, Icon]) => (
                <li key={key} className="flex items-center gap-2 text-xs font-semibold text-ink">
                  <Icon aria-hidden="true" className="h-4 w-4 text-gold-dark" strokeWidth={1.5} />
                  {t(`trust.${key}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative min-h-[28rem] overflow-hidden bg-warm-gray lg:min-h-full">
            <Image
              src={homeImages.hero}
              alt={t("imageAlt")}
              fill
              preload
              placeholder="blur"
              quality={90}
              className="object-cover object-center"
              sizes="(min-width: 1280px) 590px, (min-width: 1024px) 48vw, 100vw"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-warm-white/70 to-transparent lg:inset-y-0 lg:left-0 lg:right-auto lg:h-auto lg:w-16 lg:bg-gradient-to-r"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-5 pt-24 text-white sm:p-7">
              <p className="max-w-[18rem] text-xs font-semibold uppercase leading-5 tracking-[0.15em]">
                {t("imageCaption")}
              </p>
              <span aria-hidden="true" className="h-12 w-px bg-gold-light" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
