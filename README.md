# Barbara GmbH website

Premium bilingual website for Barbara GmbH, built with Next.js, TypeScript,
Tailwind CSS and `next-intl`.

The implementation follows [`MASTER.md`](./MASTER.md). Phases 1–5 contain the
design foundation, locale routing, shared layout, complete responsive homepage,
the Services, About and Contact pages, secure contact-form handling, localized
legal templates and the SEO foundation.

## Development

```bash
npm install
npm run typecheck
npm test
npm run dev
```

Open `http://localhost:3000`. The root URL redirects to the primary German
locale at `/de`; English is available at `/en`.

## Checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Contact form configuration

Copy `.env.example` to `.env.local` and provide:

- the canonical production origin in `SITE_URL`;
- a Resend API key, a sender on a verified domain, and the business recipient;
- an Upstash Redis REST URL and token;
- a unique random rate-limit hashing secret of at least 32 characters.

The form stores no application records. Valid enquiries are delivered to the
configured inbox; Upstash receives only HMAC-hashed rate-limit identifiers.
Never prefix these variables with `NEXT_PUBLIC_` or commit `.env.local`.

## Netlify deployment

Import the repository as a Next.js project and let Netlify configure its
OpenNext adapter automatically. Add the seven variables from `.env.example`
to production. Leave `SITE_URL` unset in deploy previews so their metadata and
`robots.txt` remain `noindex`; previews should also use a non-production
recipient until delivery has been approved.

No Netlify-specific runtime APIs are used. A later move to Vercel Pro consists
of importing the same repository, copying the environment variables, testing a
preview deployment, and switching DNS.

Do not enable production form collection until the Phase 5 privacy-policy draft
has been approved and completed with the applicable legal basis, retention
periods, controller contact details, and provider-contract information.

Company contact details in `src/content/company.ts` are explicit placeholders
and must be replaced with client-approved information before launch.

## SEO and legal launch checklist

Localized metadata, canonical and hreflang links, Open Graph and Twitter cards,
`sitemap.xml`, `robots.txt`, and organization/website JSON-LD are implemented.
Production indexing is enabled only when `SITE_URL` is a valid HTTPS origin.

The Impressum and privacy policy are explicitly marked drafts. Replace every
bracketed placeholder and obtain client or legal approval before launch. A
`LocalBusiness` schema is intentionally deferred until the registered address,
phone, service area, opening hours and company identifiers are approved. No
cookie banner is shown because the current site loads no non-essential cookies,
analytics, marketing scripts or embedded maps.
