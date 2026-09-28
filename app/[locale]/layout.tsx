import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { Footer } from "@/src/components/layout/Footer";
import { Header } from "@/src/components/layout/Header";
import { StructuredData } from "@/src/components/seo/StructuredData";
import { getSiteUrl } from "@/src/config/site";
import { routing } from "@/src/i18n/routing";

import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  applicationName: "Barbara GmbH",
  title: "Barbara GmbH",
  icons: {
    icon: {
      url: "/images/favicon.png",
      type: "image/png",
      sizes: "1254x1254",
    },
    shortcut: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("Accessibility");

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${cormorant.variable} antialiased`}
    >
      <body>
        <StructuredData />
        <NextIntlClientProvider>
          <a className="skip-link" href="#main-content">
            {t("skipToContent")}
          </a>
          <div className="flex min-h-dvh flex-col">
            <Header />
            <main id="main-content" className="flex-1" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
