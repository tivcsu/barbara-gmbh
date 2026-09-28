"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";

import { usePathname, useRouter } from "@/src/i18n/navigation";
import type { Locale } from "@/src/i18n/routing";

const localeLabels: Record<Locale, string> = {
  de: "DE",
  en: "EN",
};

type LocaleSwitcherProps = {
  label: string;
  inverse?: boolean;
};

export function LocaleSwitcher({
  label,
  inverse = false,
}: LocaleSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) return;

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false });
    });
  }

  return (
    <div
      className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] ${
        inverse ? "text-warm-white" : "text-ink"
      }`}
      aria-label={label}
    >
      {Object.entries(localeLabels).map(([value, text], index) => {
        const nextLocale = value as Locale;
        const isActive = nextLocale === locale;

        return (
          <span key={value} className="contents">
            {index > 0 ? (
              <span aria-hidden="true" className="text-border-strong">
                /
              </span>
            ) : null}
            <button
              type="button"
              className={`cursor-pointer py-2 transition-colors duration-200 disabled:cursor-default ${
                isActive
                  ? "text-gold-light"
                  : inverse
                    ? "hover:text-gold-light"
                    : "hover:text-gold-dark"
              }`}
              aria-current={isActive ? "true" : undefined}
              disabled={isPending}
              onClick={() => switchLocale(nextLocale)}
            >
              {text}
            </button>
          </span>
        );
      })}
    </div>
  );
}
