import { Container } from "@/src/components/layout/Container";
import { Eyebrow } from "@/src/components/ui/Eyebrow";

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  intro: string;
  noticeTitle: string;
  noticeBody: string;
  sections: LegalSection[];
};

export function LegalDocument({
  eyebrow,
  title,
  intro,
  noticeTitle,
  noticeBody,
  sections,
}: LegalDocumentProps) {
  return (
    <article>
      <header className="bg-ink text-warm-white">
        <Container className="py-16 sm:py-20 lg:py-24">
          <Eyebrow inverse>{eyebrow}</Eyebrow>
          <h1 className="mt-7 max-w-[16ch] font-display text-[3rem] font-medium leading-[0.98] tracking-[-0.035em] sm:text-[4rem] lg:text-[4.6rem]">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-warm-white/70 sm:text-lg sm:leading-8">
            {intro}
          </p>
        </Container>
      </header>

      <Container className="py-14 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-16">
          <aside className="self-start border-l-2 border-gold-dark bg-white px-6 py-6 shadow-subtle lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
            <p className="text-xs font-bold uppercase tracking-[0.17em] text-gold-dark">
              {noticeTitle}
            </p>
            <p className="mt-3 text-sm leading-6 text-muted">{noticeBody}</p>
          </aside>

          <div className="max-w-3xl divide-y divide-border bg-white px-6 shadow-subtle sm:px-10">
            {sections.map((section) => (
              <section className="py-9 sm:py-11" key={section.title}>
                <h2 className="font-display text-3xl font-medium leading-tight tracking-[-0.02em] text-ink sm:text-[2.25rem]">
                  {section.title}
                </h2>
                <div className="mt-5 space-y-4 text-[0.9375rem] leading-7 text-muted sm:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p className="whitespace-pre-line" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </article>
  );
}
