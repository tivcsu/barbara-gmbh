import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { ContactForm } from "@/src/components/forms/ContactForm";
import { Container } from "@/src/components/layout/Container";
import { company } from "@/src/content/company";

export async function ContactPanel() {
  const t = await getTranslations("ContactPage.details");
  const details = [
    { key: "address", icon: MapPin, value: company.address.join(", ") },
    { key: "email", icon: Mail, value: company.email },
    { key: "phone", icon: Phone, value: company.phone },
    { key: "hours", icon: Clock3, value: company.businessHours },
  ] as const;

  return (
    <section className="bg-warm-white py-20 sm:py-24 lg:py-28" aria-label={t("sectionLabel")}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.2em] text-gold-dark">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 max-w-[12ch] font-display text-[2.5rem] font-medium leading-[1.02] tracking-[-0.025em] text-ink sm:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-muted">{t("intro")}</p>

            <address className="mt-10 divide-y divide-border border-y border-border not-italic">
              {details.map(({ key, icon: Icon, value }) => (
                <div key={key} className="grid grid-cols-[2rem_1fr] gap-4 py-5">
                  <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 text-gold-dark" strokeWidth={1.5} />
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-muted">
                      {t(`items.${key}`)}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-ink">{value}</p>
                  </div>
                </div>
              ))}
            </address>
            <p className="mt-5 text-xs leading-5 text-gold-dark">{t("placeholderNotice")}</p>
          </div>

          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
