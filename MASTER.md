# BARBARA GMBH – WEBSITE MASTER SPECIFICATION

## 1. Project overview

Build a premium, elegant bilingual website for an Austrian cleaning company called:

**Barbara GmbH**

Primary language: **German**  
Secondary language: **English**

The website should communicate:

- professionalism;
- reliability;
- premium service;
- cleanliness;
- attention to detail;
- trust;
- modern Austrian business quality.

The website must not feel like a cheap or generic cleaning-company template.

Avoid:

- bright blue cleaning-company colors;
- childish bubbles;
- obvious mop/bucket illustrations;
- excessive gradients;
- overly playful UI;
- generic SaaS styling;
- overly rounded cards;
- excessive animations.

The overall feeling should be:

**luxury service business + professional cleaning company**

Reference for company relationship and general information architecture:

**https://www.greenpork.at/**

Do not copy GreenPork visually.

Use it only as inspiration for:

- simple company navigation;
- clear information hierarchy;
- separated pages;
- Austrian business website structure;
- strong contact focus.

---

# 2. Technology

Use:

- Next.js latest stable version;
- App Router;
- TypeScript;
- Tailwind CSS;
- next/image;
- next/font;
- server components by default;
- client components only when necessary;
- next-intl for internationalization.

Preferred deployment:

- Vercel.

Do not introduce a CMS in the MVP.

Content should initially live in structured TypeScript or JSON files so it can easily be replaced with a CMS later.

---

# 3. URL structure

German should be the default and primary language.

Use:

```text
/de
/de/leistungen
/de/ueber-uns
/de/kontakt
/de/impressum
/de/datenschutz

/en
/en/services
/en/about
/en/contact
/en/legal-notice
/en/privacy
```

If service-specific pages are implemented:

```text
/de/leistungen/unterhaltsreinigung
/de/leistungen/bueroreinigung
/de/leistungen/gebaeudereinigung
/de/leistungen/fensterreinigung
/de/leistungen/grundreinigung
```

and equivalent English URLs.

Implement correct:

- hreflang;
- canonical URLs;
- localized metadata;
- localized navigation.

---

# 4. Brand personality

Barbara GmbH should feel:

- elegant;
- precise;
- timeless;
- dependable;
- premium;
- calm;
- competent.

Brand keywords:

```text
Sauberkeit
Verlässlichkeit
Qualität
Präzision
Professionalität
Vertrauen
Beständigkeit
```

Do not make the visual identity overly feminine despite the company name Barbara.

The brand should work equally well for:

- office cleaning;
- property cleaning;
- commercial cleaning;
- premium residential cleaning;
- facility-related services.

---

# 5. Visual direction

## Main palette

Use a black / gold / white luxury palette.

### Primary Black

```text
#111111
```

Use for:

- dark sections;
- footer;
- typography;
- navigation;
- premium contrast areas.

### Soft Black

```text
#1A1A1A
```

Use for elevated dark surfaces.

### Primary Gold

```text
#A67C2E
```

Main accent color.

Use for:

- CTA buttons;
- active navigation states;
- icons;
- subtle highlights;
- borders;
- decorative details.

Do not overuse gold.

Gold should represent quality, not decoration.

### Light Gold

```text
#C6A15B
```

Use sparingly for:

- hover states;
- secondary highlights;
- decorative lines.

### Warm White

```text
#F8F7F3
```

Primary page background.

Avoid pure clinical white as the only background.

### White

```text
#FFFFFF
```

Used inside:

- cards;
- form elements;
- high-contrast sections.

### Warm Gray

```text
#E9E6DF
```

Used for:

- separators;
- card backgrounds;
- borders.

### Text Gray

```text
#67645F
```

Secondary copy.

---

# 6. Color usage

Recommended visual distribution:

```text
Warm white / white: 65–70%
Black: 20–25%
Gold: 5–10%
```

Gold must never dominate a complete section.

Avoid gold gradients unless extremely subtle.

Do not use metallic effects or fake glossy gold.

---

# 7. Typography

Use two-font pairing.

## Display / editorial headings

Recommended:

**Cormorant Garamond**

Alternative:

**DM Serif Display**

Use for:

- H1;
- H2;
- selected large statements.

The heading font should communicate:

- premium service;
- elegance;
- editorial sophistication.

## UI / body font

Use:

**Manrope**

Alternative:

**Inter**

Use for:

- body text;
- navigation;
- forms;
- buttons;
- metadata;
- small labels.

---

# 8. Typography scale

Desktop:

```text
Hero H1:
64–76px
line-height: 0.98–1.05
font-weight: 500

H2:
46–56px
line-height: 1.05

H3:
28–34px

H4:
20–24px

Body Large:
18px / 30px

Body:
16px / 26px

Small:
14px / 22px

Eyebrow:
11–12px
uppercase
letter-spacing: 0.18em
font-weight: 600
```

Mobile:

```text
Hero H1:
42–48px

H2:
34–40px

H3:
24–28px

Body:
16px
```

Do not scale headings down excessively on mobile.

---

# 9. Layout system

Maximum content width:

```text
1280px
```

Standard content width:

```text
1180–1240px
```

Desktop horizontal page padding:

```text
48px
```

Tablet:

```text
32px
```

Mobile:

```text
20px
```

---

# 10. Spacing system

Use an 8px-based spacing system.

```text
4px
8px
12px
16px
24px
32px
40px
48px
64px
80px
96px
128px
```

Standard desktop section padding:

```text
96px 0
```

Large editorial section:

```text
120–140px 0
```

Mobile section spacing:

```text
64–80px 0
```

Avoid cramped sections.

Whitespace is an important part of the premium visual identity.

---

# 11. Border radius

Keep radius restrained.

```text
Buttons: 2–4px

Cards: 4–8px

Images: 4–6px

Form inputs: 3–4px
```

Avoid:

```text
20px+
fully rounded SaaS cards
pill-shaped layouts
```

Pill shapes are only acceptable for very small labels.

---

# 12. Shadows

Use very subtle shadows only.

Example:

```css
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
```

Do not make floating cards a major visual motif.

Prefer:

- whitespace;
- borders;
- photography;
- typography.

---

# 13. Logo direction

Create the frontend so the logo can easily be swapped.

Temporary brand concept:

```text
BARBARA
GMBH
```

Logo should combine:

- a refined lowercase or stylized “b”;
- subtle cleaning reference;
- sparkle / shine detail.

The cleaning reference should be abstract.

Good motifs:

- sparkle;
- polished-surface highlight;
- sweep motion;
- shine mark;
- negative-space cleaning stroke.

Avoid:

- cartoon mop;
- cleaning bucket;
- spray bottle;
- broom illustration.

Logo variants required:

```text
Primary horizontal
White version
Black version
Icon / monogram
Favicon
```

---

# 14. Photography direction

Photography is extremely important.

Use imagery showing:

- premium modern offices;
- glass surfaces;
- polished floors;
- architectural interiors;
- commercial buildings;
- professional cleaning staff;
- subtle cleaning equipment;
- elegant Austrian interiors.

Image style:

- neutral;
- architectural;
- premium;
- realistic;
- bright;
- clean;
- high-end.

Avoid:

- cheesy stock photos;
- employees smiling directly into camera;
- exaggerated cleaning poses;
- oversaturated blue cleaning imagery.

---

# 15. Header

Desktop header:

```text
[Logo]

Startseite
Leistungen ▼
Über uns
Kontakt

DE | EN

[ Angebot anfordern → ]
```

Header height:

```text
76–88px
```

Header should initially be light.

On scroll:

- subtle background;
- small blur if appropriate;
- thin bottom border.

Sticky header.

Do not use a huge floating navigation.

---

# 16. Leistungen dropdown

Desktop dropdown should contain:

```text
Alle Leistungen

Unterhaltsreinigung
Büroreinigung
Gebäudereinigung
Fensterreinigung
Grundreinigung
```

Dropdown appearance:

- white;
- thin warm-gray border;
- subtle shadow;
- 280–320px width;
- minimal hover animation;
- gold arrow/detail on hover.

Mobile:

show these items inside accordion navigation.

---

# 17. Homepage structure

Build homepage in this order.

## Section 01 – Hero

Desktop layout:

```text
50–55% content
45–50% image
```

Possible headline:

```text
Sauberkeit, auf die Sie
sich verlassen können.
```

Highlight a small part of the heading in gold if visually appropriate.

Supporting text:

```text
Professionelle Reinigungslösungen für Unternehmen,
Immobilien und private Objekte.
```

Buttons:

Primary:

```text
Angebot anfordern →
```

Secondary:

```text
Unsere Leistungen
```

Below CTA add 3–4 trust points:

```text
Zuverlässig
Flexibel
Professionell
Persönlich
```

Use minimal outline icons.

Hero should feel architectural and premium.

---

# 18. Homepage service section

Eyebrow:

```text
UNSERE LEISTUNGEN
```

Headline:

```text
Für jede Anforderung die
passende Reinigungslösung.
```

Desktop cards:

5-column layout if space permits.

Otherwise responsive grid.

Cards:

```text
image
service title
1–2 sentence description
arrow link
```

Services:

```text
Unterhaltsreinigung
Büroreinigung
Gebäudereinigung
Fensterreinigung
Grundreinigung
```

Cards should not have heavy borders or shadows.

Use image-led editorial design.

---

# 19. Why Barbara section

Use black background.

Text in warm white.

Gold icons and details.

Headline:

```text
Ihre Vorteile
auf einen Blick.
```

Four benefits:

```text
Hohe Qualität

Erfahrenes Team

Flexible Einsatzzeiten

Zuverlässiger Service
```

Each item:

```text
icon
title
short description
```

Do not overfill this section.

---

# 20. About teaser

Split layout.

Left:

large architectural/company image.

Right:

eyebrow:

```text
ÜBER UNS
```

Heading:

```text
Ein sauberes Umfeld
schafft neue Möglichkeiten.
```

Copy:

```text
Barbara GmbH steht für zuverlässige,
sorgfältige und professionelle Reinigung.

Wir betreuen unsere Kunden persönlich
und entwickeln Lösungen, die genau zum
jeweiligen Objekt und Bedarf passen.
```

CTA:

```text
Mehr über uns →
```

---

# 21. Contact CTA section

Use black or black marble-like subtle background.

Do not use decorative visual noise.

Headline:

```text
Sie suchen einen zuverlässigen
Reinigungspartner?
```

Supporting copy:

```text
Wir beraten Sie gerne und erstellen
ein individuelles, unverbindliches Angebot.
```

CTA:

```text
Jetzt unverbindlich anfragen →
```

Optional small statement:

```text
Saubere Räume.
Starker Eindruck.
```

---

# 22. Footer

Black background.

Include:

```text
Logo

Company address
Phone
Email

Navigation

Startseite
Leistungen
Über uns
Kontakt

Legal

Impressum
Datenschutz

Language selector

DE | EN
```

Optional:

```text
LinkedIn
Instagram
```

Only display social icons if actual links are provided.

---

# 23. Leistungen page

Page structure:

```text
Intro hero

Service overview

Detailed service sections

Why Barbara

CTA
```

Hero title:

```text
Professionelle Reinigung
für jeden Anspruch.
```

Services should be clearly explained without huge text blocks.

Each service section can use alternating:

```text
image / text
text / image
```

---

# 24. About page

Structure:

```text
Hero

Company introduction

Values

Quality philosophy

Team / working approach

CTA
```

Possible heading:

```text
Sauberkeit beginnt
mit Verantwortung.
```

Values:

```text
Verlässlichkeit

Qualität

Persönlicher Service

Flexibilität
```

Do not invent exact company facts.

Create placeholder copy clearly structured so the real information can later replace it.

---

# 25. Contact page

Hero:

```text
Lassen Sie uns
über Ihr Objekt sprechen.
```

Two-column layout.

Left:

```text
contact information

address
email
phone
business hours
```

Right:

contact form.

Fields:

```text
Name *
Firma

E-Mail *
Telefon

Gewünschte Leistung

Nachricht *

Datenschutz checkbox *

Anfrage senden
```

Use accessible labels.

Do not use placeholder text instead of labels.

---

# 26. Form states

Implement:

```text
default
focus
error
disabled
loading
success
```

Focus style:

gold outline/border.

Success:

```text
Vielen Dank für Ihre Anfrage.

Wir melden uns so schnell wie möglich bei Ihnen.
```

Error:

```text
Ihre Anfrage konnte leider nicht gesendet werden.
Bitte versuchen Sie es erneut.
```

---

# 27. Form backend

Implement the form securely.

Requirements:

- server-side validation;
- spam protection;
- rate limiting where appropriate;
- email sending;
- environment variables;
- no secrets exposed to the client.

Possible provider:

```text
Resend
```

Create a reusable server action/API handler.

---

# 28. Buttons

## Primary

Background:

```text
#A67C2E
```

Text:

```text
#FFFFFF
```

Hover:

```text
#8E6825
```

Style:

- rectangular;
- slight radius;
- minimum height 48px;
- arrow icon.

Example:

```text
Angebot anfordern →
```

## Secondary

Transparent / white.

Border:

```text
1px solid #A67C2E
```

Text:

black.

Hover:

slightly warm-gray background.

---

# 29. Links

Editorial inline links:

```text
Alle Leistungen ansehen →
```

Hover behavior:

- text gold;
- arrow moves 3–4px right.

Animation duration:

```text
180–220ms
```

---

# 30. Icons

Use:

```text
Lucide Icons
```

Stroke width:

```text
1.5px
```

Icons should mostly appear:

- black;
- gold;
- white on dark background.

Do not use filled colorful icons.

---

# 31. Motion system

Motion should feel elegant.

Use:

```text
150–300ms
ease-out
```

Allowed:

- subtle fade-in;
- translateY 10–20px;
- image scale from 1 to 1.02 on hover;
- arrow movement;
- navigation dropdown transitions.

Avoid:

- bouncing;
- parallax everywhere;
- spinning;
- excessive scroll animation;
- Framer Motion unless clearly necessary.

Respect:

```css
prefers-reduced-motion
```

---

# 32. Responsive design

Design mobile-first logically but maintain strong desktop editorial layouts.

Breakpoints:

```text
sm
md
lg
xl
2xl
```

Mobile:

- stacked hero;
- image below main copy;
- full-width CTA buttons where appropriate;
- hamburger menu;
- service cards become vertical/list;
- benefits 2-column or single-column;
- contact form full width.

Do not simply shrink the desktop design.

Mobile layout should be intentionally redesigned.

---

# 33. Accessibility

Minimum target:

```text
WCAG 2.1 AA
```

Requirements:

- keyboard navigation;
- visible focus;
- semantic HTML;
- proper form labels;
- alt text;
- sufficient color contrast;
- aria attributes when required;
- skip-to-content link.

Never use gold text on white if contrast is insufficient.

Use gold primarily for:

- graphical accents;
- larger text;
- buttons with sufficient contrast.

---

# 34. SEO

Implement:

- localized title;
- localized description;
- canonical URL;
- hreflang;
- OpenGraph;
- Twitter metadata;
- sitemap;
- robots.txt;
- structured data.

Add:

```text
LocalBusiness
```

schema when company details are available.

Use one H1 per page.

Use logical H2/H3 structure.

---

# 35. Image optimization

Use:

```text
next/image
```

Requirements:

- correct sizes;
- responsive srcset;
- AVIF/WebP when possible;
- lazy-loading below fold;
- priority only for hero image.

Prevent layout shifts.

---

# 36. Performance

Target Lighthouse:

```text
Performance 90+
Accessibility 95+
Best Practices 95+
SEO 95+
```

Avoid unnecessary JavaScript.

Use server components wherever possible.

Do not ship heavy libraries for trivial functionality.

---

# 37. Content architecture

Create content separately from UI components.

Example:

```text
src/content/de.ts
src/content/en.ts
```

or structured locale JSON files.

Do not hard-code German text throughout individual components.

---

# 38. Component architecture

Suggested:

```text
src/
  app/
    [locale]/
      page.tsx
      leistungen/
      ueber-uns/
      kontakt/

  components/
    layout/
      Header.tsx
      Footer.tsx
      MobileMenu.tsx
      Container.tsx

    ui/
      Button.tsx
      SectionHeading.tsx
      Eyebrow.tsx
      Icon.tsx

    sections/
      Hero.tsx
      Services.tsx
      Benefits.tsx
      AboutTeaser.tsx
      ContactCTA.tsx

    cards/
      ServiceCard.tsx
      BenefitCard.tsx

    forms/
      ContactForm.tsx

  content/

  lib/

  styles/
```

Keep components focused and reusable.

Avoid giant page components.

---

# 39. Design tokens

Create CSS variables.

Example:

```css
:root {
  --background: #f8f7f3;

  --surface: #ffffff;
  --surface-dark: #111111;

  --foreground: #111111;
  --foreground-muted: #67645f;

  --gold: #a67c2e;
  --gold-light: #c6a15b;
  --gold-dark: #8e6825;

  --border: #e9e6df;

  --container: 1240px;
}
```

Do not scatter random hex codes throughout components.

---

# 40. Contact information

Do not invent final contact information.

Use centralized placeholders such as:

```ts
const company = {
  name: "Barbara GmbH",
  phone: "+43 ...",
  email: "office@...",
  address: "...",
};
```

Mark placeholders clearly.

---

# 41. Legal pages

Create:

```text
Impressum
Datenschutz
```

Use placeholder legal content.

Do not invent legal claims.

Add a comment indicating:

```text
// Final legal content must be supplied or approved by the client/legal professional.
```

---

# 42. Cookie consent

Do not display a cookie banner if the site does not set non-essential cookies.

If Google Analytics, Meta Pixel, Maps or marketing scripts are added later:

implement a real consent system.

Do not create a fake “Accept cookies” popup that has no effect.

---

# 43. Google Maps

If Google Maps is required:

do not automatically load it before consent.

Prefer:

- static location preview;
- click-to-load map;

or consent-controlled embedding.

---

# 44. Development quality

Code must be:

- strongly typed;
- clean;
- readable;
- maintainable;
- production-ready.

Avoid:

```text
any
duplicated layout code
giant components
inline style objects
magic values
unnecessary state
```

---

# 45. Development workflow

Implement the project in phases.

## Phase 1

Create:

- Next.js project structure;
- Tailwind setup;
- design tokens;
- fonts;
- i18n;
- root layout;
- Header;
- Footer.

STOP and verify the structure.

## Phase 2

Build homepage:

- Hero;
- Services;
- Benefits;
- About teaser;
- Contact CTA.

Ensure desktop and mobile layouts.

## Phase 3

Build:

- Leistungen;
- Über uns;
- Kontakt.

## Phase 4

Build:

- contact form backend;
- success/error states;
- validation.

## Phase 5

Add:

- Impressum;
- Datenschutz;
- metadata;
- sitemap;
- robots;
- structured data.

## Phase 6

Perform:

- responsive review;
- accessibility review;
- performance review;
- visual consistency review.

---

# 46. CODEX INITIAL PROMPT

Use this prompt to start implementation:

```text
You are a senior product designer and senior frontend engineer.

Build the Barbara GmbH website according to the attached BARBARA GMBH WEBSITE MASTER SPECIFICATION.

Before implementing anything:

1. inspect the current repository;
2. understand its structure and existing dependencies;
3. do not remove existing useful functionality;
4. identify which parts can be reused;
5. create a concise implementation plan.

Then implement Phase 1 only.

The website is a premium bilingual Austrian cleaning-company website.

Primary language:
German.

Secondary language:
English.

Visual direction:
premium, elegant, black / gold / warm-white.

Do not create a generic cleaning template.

Use:
Next.js
TypeScript
Tailwind CSS
next-intl

Follow the provided design tokens, spacing system, typography and component architecture.

Build production-quality reusable components.

Do not invent company-specific facts.

Use clearly marked placeholders when information is unavailable.

After Phase 1:
run lint/type checks and fix errors before continuing.

Do not implement later phases yet.
```

---

# 47. CODEX HOMEPAGE PROMPT

After Phase 1 is complete:

```text
Continue the Barbara GmbH project.

Implement Phase 2: the complete responsive homepage.

Build:

1. Hero
2. Services section
3. Benefits section
4. About teaser
5. Contact CTA
6. final responsive layout

Follow the existing design system exactly.

Important visual rules:

- black / gold / warm-white palette;
- strong editorial typography;
- large whitespace;
- restrained border radius;
- architecture-driven imagery;
- minimal shadows;
- no generic SaaS cards;
- no cheesy cleaning-company visuals.

Hero headline:

“Sauberkeit, auf die Sie sich verlassen können.”

Supporting copy:

“Professionelle Reinigungslösungen für Unternehmen, Immobilien und private Objekte.”

Primary CTA:

“Angebot anfordern”

Secondary CTA:

“Unsere Leistungen”

Services:

Unterhaltsreinigung
Büroreinigung
Gebäudereinigung
Fensterreinigung
Grundreinigung

Benefits:

Hohe Qualität
Erfahrenes Team
Flexible Einsatzzeiten
Zuverlässiger Service

Make the page visually polished on:

375px
768px
1024px
1440px

Do not add unnecessary animation.

After implementation:

run lint
run typecheck
review responsive behavior
fix all issues.
```

---

# 48. CODEX INTERNAL PAGES PROMPT

```text
Continue the Barbara GmbH website.

Implement Phase 3.

Create the following localized pages:

German:

/de/leistungen
/de/ueber-uns
/de/kontakt

English equivalents:

/en/services
/en/about
/en/contact

Reuse the existing visual language and components.

Leistungen page:

- intro hero;
- services overview;
- alternating service sections;
- benefits;
- CTA.

Über uns:

- introduction;
- values;
- company philosophy;
- quality section;
- CTA.

Kontakt:

- contact details;
- professional contact form;
- service selection;
- GDPR checkbox;
- responsive two-column desktop layout.

Do not invent actual company history, employee count, years of operation or certifications.

Use clearly marked content placeholders wherever real company information is missing.

Ensure German is the primary experience.

Run lint and typecheck after implementation.
```

---

# 49. CODEX FORM PROMPT

```text
Implement the Barbara GmbH contact form.

Requirements:

Fields:

- name required
- company optional
- email required
- phone optional
- requested service optional
- message required
- privacy acceptance required

Use server-side validation.

Use Zod.

Create accessible field errors.

Implement:

default
loading
success
error states.

Use Resend or an equivalent lightweight email provider.

All secrets must be server-side environment variables.

Do not expose API keys.

Include basic anti-spam protection.

The UI must match the Barbara design system.

No large rounded cards.

No excessive shadows.

On successful submission display:

“Vielen Dank für Ihre Anfrage. Wir melden uns so schnell wie möglich bei Ihnen.”

Create the English equivalent as well.

Run security and validation checks after implementation.
```

---

# 50. CODEX FINAL REVIEW PROMPT

```text
Perform a full senior-level review of the Barbara GmbH website.

Do not redesign the project.

Review and fix:

1. visual consistency
2. typography
3. spacing
4. mobile layout
5. tablet layout
6. navigation
7. language switching
8. accessibility
9. SEO
10. image loading
11. Core Web Vitals risks
12. form UX
13. TypeScript quality
14. component duplication
15. unused code
16. responsive image sizing
17. metadata
18. semantic HTML

Check specifically at:

375px
430px
768px
1024px
1280px
1440px

The final website should feel like a premium Austrian service company, not a generic template.

Keep:

black
gold
warm-white
editorial typography
large whitespace
architectural imagery.

Fix all lint and type errors.

At the end provide a concise summary of:

- changes made;
- remaining placeholders;
- items requiring client input.
```

---

# 51. Client information still required

Before production launch collect:

```text
Full registered company name
Company registration number
UID/VAT number
Registered address
Phone number
Email
Contact person
Business hours
Service areas
Exact service list
Company description
Company photos
Social URLs
Legal Impressum
Datenschutzerklärung
Preferred receiving email for contact forms
```

---

# 52. Final design principle

Whenever uncertain about a design choice, follow this priority:

```text
clarity
↓
trust
↓
premium feeling
↓
simplicity
↓
decoration
```

The website should never sacrifice usability for visual effects.

The final result should feel like:

**a sophisticated Austrian property/service brand that happens to specialize in professional cleaning.**
