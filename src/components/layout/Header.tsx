import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/src/i18n/navigation";

import {
  CloseMenuOnNavigate,
  ResetScrollAfterMenuNavigation,
} from "./CloseMenuOnNavigate";
import { Container } from "./Container";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "./Logo";

const serviceLinks = [
  { label: "allServices" },
  { label: "maintenanceCleaning", anchor: "maintenance-cleaning" },
  { label: "officeCleaning", anchor: "office-cleaning" },
  { label: "buildingCleaning", anchor: "building-cleaning" },
  { label: "windowCleaning", anchor: "window-cleaning" },
  { label: "deepCleaning", anchor: "deep-cleaning" },
] as const;

export async function Header() {
  const t = await getTranslations("Navigation");

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-warm-white/95 backdrop-blur-md">
      <ResetScrollAfterMenuNavigation />
      <CloseMenuOnNavigate className="contents">
        <Container className="flex min-h-header items-center justify-between gap-4 sm:gap-8">
          <Logo />

          <nav aria-label={t("primaryNavigation")} className="hidden items-center gap-8 xl:flex">
          <Link className="nav-link" href="/" scroll={false}>
            {t("home")}
          </Link>

          <details className="nav-dropdown group relative">
            <summary className="nav-link flex cursor-pointer list-none items-center gap-1.5 py-7">
              {t("services")}
              <ChevronDown
                aria-hidden="true"
                className="h-3.5 w-3.5 transition-transform duration-200 group-open:rotate-180"
                strokeWidth={1.5}
              />
            </summary>
            <div className="absolute left-1/2 top-[calc(100%-0.25rem)] w-[19rem] -translate-x-1/2 border border-border bg-white p-3 shadow-subtle">
              {serviceLinks.map(({ label, ...serviceLink }, index) => (
                <Link
                  key={label}
                  href={
                    "anchor" in serviceLink
                      ? { pathname: "/services", hash: serviceLink.anchor }
                      : "/services"
                  }
                  scroll={"anchor" in serviceLink}
                  className={`group/link flex items-center justify-between gap-4 px-4 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:bg-warm-gray/55 hover:text-gold-dark ${
                    index === 0 ? "mb-2 border-b border-border pb-4" : ""
                  }`}
                >
                  {t(label)}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-gold transition-transform duration-200 group-hover/link:translate-x-1"
                    strokeWidth={1.5}
                  />
                </Link>
              ))}
            </div>
          </details>

          <Link className="nav-link" href="/about" scroll={false}>
            {t("about")}
          </Link>
          <Link className="nav-link" href="/contact" scroll={false}>
            {t("contact")}
          </Link>
        </nav>

        <div className="hidden items-center gap-6 xl:flex">
          <LocaleSwitcher label={t("language")} />
          <Link className="button-primary" href="/contact" scroll={false}>
            {t("requestQuote")}
            <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>

        <details className="mobile-menu relative xl:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center border border-border bg-white text-ink">
            <span className="sr-only">{t("openMenu")}</span>
            <Menu aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
          </summary>
          <div className="fixed inset-x-0 top-header max-h-[calc(100dvh-var(--header-height))] overflow-y-auto border-b border-border bg-warm-white shadow-subtle">
            <Container className="py-6">
              <nav aria-label={t("primaryNavigation")} className="flex flex-col">
                <Link className="mobile-nav-link" href="/" scroll={false}>
                  {t("home")}
                </Link>
                <details className="border-b border-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-semibold uppercase tracking-[0.08em] text-ink">
                    {t("services")}
                    <ChevronDown aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                  </summary>
                  <div className="mb-3 border-l border-gold/60 pl-4">
                    {serviceLinks.map(({ label, ...serviceLink }) => (
                      <Link
                        key={label}
                        href={
                          "anchor" in serviceLink
                            ? { pathname: "/services", hash: serviceLink.anchor }
                            : "/services"
                        }
                        scroll={"anchor" in serviceLink}
                        className="block py-2.5 text-sm text-muted transition-colors hover:text-gold-dark"
                      >
                        {t(label)}
                      </Link>
                    ))}
                  </div>
                </details>
                <Link className="mobile-nav-link" href="/about" scroll={false}>
                  {t("about")}
                </Link>
                <Link className="mobile-nav-link" href="/contact" scroll={false}>
                  {t("contact")}
                </Link>
              </nav>
              <div className="mt-6 flex flex-col gap-5">
                <LocaleSwitcher label={t("language")} />
                <Link className="button-primary w-full" href="/contact" scroll={false}>
                  {t("requestQuote")}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </div>
            </Container>
          </div>
        </details>
        </Container>
      </CloseMenuOnNavigate>
    </header>
  );
}
