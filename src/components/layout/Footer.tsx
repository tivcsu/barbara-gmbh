import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { company } from "@/src/content/company";
import { Link } from "@/src/i18n/navigation";

import { Container } from "./Container";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "./Logo";

export async function Footer() {
  const [t, nav] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Navigation"),
  ]);

  return (
    <footer className="bg-ink text-warm-white">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 border-b border-white/15 pb-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
          <div>
            <Logo inverse />
            <p className="mt-7 max-w-xs font-display text-2xl leading-tight text-warm-white/90">
              {t("claim")}
            </p>
          </div>

          <div>
            <h2 className="footer-heading">{t("contact")}</h2>
            <address className="mt-5 space-y-3 text-sm not-italic leading-6 text-warm-white/65">
              <p>{company.address.join(", ")}</p>
              <p>{company.phone}</p>
              <p>{company.email}</p>
              <p className="text-xs text-gold-light">{t("placeholderNotice")}</p>
            </address>
          </div>

          <div>
            <h2 className="footer-heading">{t("navigation")}</h2>
            <nav aria-label={t("navigation")} className="mt-5 flex flex-col items-start gap-3">
              <Link className="footer-link" href="/">
                {nav("home")}
              </Link>
              <Link className="footer-link" href="/services">
                {nav("services")}
              </Link>
              <Link className="footer-link" href="/about">
                {nav("about")}
              </Link>
              <Link className="footer-link" href="/contact">
                {nav("contact")}
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="footer-heading">{t("legal")}</h2>
            <nav aria-label={t("legal")} className="mt-5 flex flex-col items-start gap-3">
              <Link className="footer-link" href="/legal-notice">
                {t("legalNotice")}
              </Link>
              <Link className="footer-link" href="/privacy">
                {t("privacy")}
              </Link>
            </nav>
            <div className="mt-7">
              <LocaleSwitcher label={nav("language")} inverse />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 text-xs text-warm-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. {t("copyright")}
          </p>
          <Link className="group inline-flex items-center gap-2 text-warm-white/70 hover:text-gold-light" href="/contact">
            {nav("requestQuote")}
            <ArrowRight
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </Container>
    </footer>
  );
}
