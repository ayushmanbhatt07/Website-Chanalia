# RIO PIPES & FITTINGS — Website Rebuild: Full Implementation Spec

**Version 2** — image handling now fully integrated; supersedes v1.
**For:** Cursor / Antigravity / any agentic IDE

**Companion documents (read both before starting):**
- `rio-pipes-content-extract.md` — all real copy, specs, product codes, contact details. **Every piece of text in this build comes from that file.**
- `rio-pipes-image-assets.md` — the verified image sources, with download URLs and licence notes.

**Do not invent company facts, statistics, product codes, certifications, or testimonials.**

---

## 0. Ground Rules

1. **All content comes from the extract doc.** If it isn't in there, it doesn't go on the site. The one exception is category-level descriptive copy, which the old site lacks entirely — §8.3 below gives you approved copy for that.

2. **Do not port over the broken content.** The extract's §12 audit lists 20 defects. Specifically: no Lorem Ipsum, no fake "Vapers" team members, no `0`-value stat counters, no duplicated benefit sections, no hardcoded-wrong breadcrumbs.

3. **Anything the client must still supply is a typed `null` in the content config, and the component renders nothing (not a placeholder string) when the value is null.** Never print `[PLACEHOLDER: ...]` into the DOM. A section with no data hides itself.

4. **Images are self-hosted, not hotlinked.** All imagery lives in `/public/images/`. Download the files listed in the image-assets doc into the folder structure in §4 below. **No `remotePatterns` config is needed in `next.config.js`** — nothing is fetched from a remote host at runtime.

5. **The image URLs in the extract doc (`riopipes.com/wp-content/...`) are NOT usable.** That inventory is a *shopping list of assets to request from the client*, not a source. Ignore those paths at build time.

6. **Stock imagery must never be presented as RIO's own product.** See §4.3 — this has real consequences for the product detail pages.

---

## 1. Stack

- **Next.js 15** (App Router) + **TypeScript**, strict mode
- **Tailwind CSS v4**
- **Framer Motion** — scroll reveals, tab transitions
- **lucide-react** — icons
- **next/font/google** — typography (§3)
- **react-hook-form + zod** — contact/enquiry forms
- **next/image** throughout, local files only
- Deploy target Vercel; keep host-agnostic. No CMS in v1 — content lives in typed TS config files.

---

## 2. Color System

The current site has no coherent palette. This one is built from the products themselves: PVC pipes in this category are physically cream/grey (UPVC), pale yellow-tan (CPVC), and grey-white (SWR/Agri), installed against wet earth and concrete. The palette is drawn from that world rather than from generic SaaS blue.

Define as CSS variables in `globals.css` and map into `tailwind.config.ts`.

```css
/* Foundation — warm-neutral, not blue-grey */
--rio-ink:        #16181A;  /* primary text, near-black with warmth */
--rio-slate:      #4A5054;  /* secondary text */
--rio-mute:       #7C8489;  /* tertiary / captions */
--rio-line:       #DFDCD6;  /* hairline borders */
--rio-paper:      #FAF8F5;  /* page background — warm off-white, NOT #FFF */
--rio-surface:    #FFFFFF;  /* raised cards */
--rio-sink:       #F1EDE7;  /* recessed / alternating band */

/* Brand */
--rio-blue:       #0B5E8A;  /* primary brand — deep water blue */
--rio-blue-dark:  #084768;  /* hover / pressed */
--rio-blue-tint:  #E8F1F6;  /* soft fill behind blue content */

/* Product-line accents — one per category, used consistently site-wide */
--cat-cpvc:       #C8843A;  /* warm ochre — CPVC runs hot water (93°C) */
--cat-upvc:       #0B5E8A;  /* brand blue — UPVC is the core plumbing line */
--cat-swr:        #5B6770;  /* graphite — SWR is soil/waste/rain, utilitarian */
--cat-agri:       #4C7A3F;  /* field green — agriculture/irrigation */

/* Dark section (footer, select bands) */
--rio-night:      #111517;
--rio-night-2:    #1B2124;
--rio-night-line: #2C3438;
```

### Rules for accent use
- **Each product category owns its accent and only its accent.** A CPVC page uses ochre for its eyebrow, tab underline, spec-table header rule, and icon tint. It never shows green or graphite. This is real wayfinding: a plumber landing on a deep link knows instantly which system they're in.
- Brand blue is for global chrome (nav active state, primary buttons, links) — not for category content.
- Never use more than one accent inside a single component.

### Do NOT
- No purple/indigo gradients. No glassmorphism. No neon.
- Not a dark-mode site. This is a **light**, industrial-catalogue site — correct for a B2B trade audience scanning spec tables in daylight on a phone at a site office. One dark band (footer + one CTA) provides contrast.
- No pure `#FFFFFF` page background, no pure `#000` text.

---

## 3. Typography

Three faces, each doing a distinct job. Load via `next/font/google` with CSS variables, then wire into `tailwind.config.ts` under `theme.extend.fontFamily`. **Verify with a screenshot that headings visually differ from body text before continuing** — a font declared but not applied is the most common failure in this kind of build.

```ts
import { Bricolage_Grotesque, Inter_Tight, IBM_Plex_Mono } from 'next/font/google';

const display = Bricolage_Grotesque({
  subsets: ['latin'], weight: ['600','700','800'],
  variable: '--font-display', display: 'swap',
});
const body = Inter_Tight({
  subsets: ['latin'], weight: ['400','500','600'],
  variable: '--font-body', display: 'swap',
});
const mono = IBM_Plex_Mono({
  subsets: ['latin'], weight: ['400','500','600'],
  variable: '--font-mono', display: 'swap',
});
```

**Why these:**
- **Bricolage Grotesque** — headings. Slightly condensed, engineered, a bit unusual; reads as manufactured rather than as a default UI font.
- **Inter Tight** — body. Tighter than plain Inter, sits better under a condensed display face, excellent at small sizes on cheap Android screens (a real constraint for this audience).
- **IBM Plex Mono** — **mandatory** for every product code, pipe size, mm value, pack quantity, standard number (ASTM D-2846, IS 13592), and temperature rating. This is the highest-value typographic decision on the site: this catalogue is fundamentally a table of codes and dimensions, and tabular monospace makes `UPP401143` vs `UPP401146` scannable. Enable `font-variant-numeric: tabular-nums`.

**Scale** (fluid, `clamp()`):

| Token | Size | Use |
|---|---|---|
| `display-xl` | clamp(2.75rem, 6vw, 4.5rem) | Home H1 only |
| `display-lg` | clamp(2rem, 4vw, 3rem) | Page H1 |
| `h2` | clamp(1.625rem, 3vw, 2.25rem) | Section headings |
| `h3` | 1.25rem | Card titles |
| `body-lg` | 1.125rem / 1.65 | Lead paragraphs |
| `body` | 1rem / 1.7 | Default |
| `small` | 0.875rem | Captions, table cells |
| `eyebrow` | 0.75rem, 500wt, +0.08em tracking | Section labels |

**Eyebrow treatment:** a short 24px accent-colored rule followed by the label in sentence case at the category accent color. Not ALL CAPS.

**Line length:** cap body prose at `max-w-[68ch]`.

---

## 4. Imagery

### 4.1 Setup — do this before writing components

Download every file listed in `rio-pipes-image-assets.md` §2 into this exact structure, using the exact filenames given there:

```
/public/images/
  hero/
    hero-pipes-stack.jpg
  categories/
    cat-upvc.jpg
    cat-cpvc.jpg
    cat-swr.jpg
    cat-agriculture.jpg
  applications/
    app-residential.jpg
    app-industrial.jpg
    app-hot-cold.jpg
    app-drinking-water.jpg
    app-agriculture.jpg
  facility/
    facility-production.jpg
    facility-warehouse.jpg
  texture/
    texture-pipe-ends.jpg
    texture-pipes-wall.jpg
  misc/
    pipes-field.jpg
    pipes-ground.jpg
    pipes-stacked-metal.jpg
```

All source images are on the **Unsplash License** (free commercial use, no attribution required). The assets doc gives the direct CDN URL and a full-resolution download URL for each.

### 4.2 Central config

Create `/content/images.ts` so no path is ever hardcoded in a component:

```ts
export const images = {
  hero: '/images/hero/hero-pipes-stack.jpg',
  categories: {
    upvc:        '/images/categories/cat-upvc.jpg',
    cpvc:        '/images/categories/cat-cpvc.jpg',
    swr:         '/images/categories/cat-swr.jpg',
    agriculture: '/images/categories/cat-agriculture.jpg',
  },
  applications: {
    residential:   '/images/applications/app-residential.jpg',
    industrial:    '/images/applications/app-industrial.jpg',
    hotCold:       '/images/applications/app-hot-cold.jpg',
    drinkingWater: '/images/applications/app-drinking-water.jpg',
    agriculture:   '/images/applications/app-agriculture.jpg',
  },
  facility: {
    production: '/images/facility/facility-production.jpg',
    warehouse:  '/images/facility/facility-warehouse.jpg',
  },
  texture: {
    pipeEnds:  '/images/texture/texture-pipe-ends.jpg',
    pipesWall: '/images/texture/texture-pipes-wall.jpg',
  },
} as const;

// STOCK IMAGERY — everything above is generic Unsplash-licensed stock,
// NOT RIO's own products or facility. Replace with real client photography
// when supplied. Swapping one file in /public/images/ updates the whole site.
```

### 4.3 Product detail pages — the important rule

**Do not put stock imagery on the 12 leaf product pages.**

Each leaf page is a specific SKU family with real product codes and dimensions. A stock photo of unrelated green pipes sitting beside a table of `UPP401143` codes is worse than no photo — it signals that the manufacturer has no pictures of its own goods.

In priority order:

1. **Request the real product images from the client.** Their existing WordPress media library already contains proper product renders (`CPVC-Fitting-SDR11-Reducer-Coupler.png`, `Rio-Prime-UPVC-SCH-40.png`, and the rest — full list in extract §11). This is a five-minute ask and it is the correct answer.
2. **If unavailable at build time**, render leaf pages with **no hero photo**. Use a large category-accent panel carrying the product name, the governing standard in mono type, and the size range read from the spec table. This looks deliberate and technical, not broken — and the spec table is what the buyer came for.
3. **Never** place a category stock photo on a leaf page in a way that implies it is that product.

Build `ProductHero` with an **optional** `image` prop. No image → the typographic panel. One prop change when the real photos arrive.

### 4.4 Alt text

Alt text describes the actual photograph, never the product it stands in for.

- Correct: `alt="Stacked PVC pipes seen end-on"`
- Wrong: `alt="RIO UPVC Schedule 40 pipe"` on a stock image — that is a false claim embedded in the accessibility layer.

Every stock image carries a code comment marking it as a placeholder.

---

## 5. Layout & Spacing

- Container: `max-w-[1280px]`, padding `px-5 md:px-8 lg:px-12`
- Spacing scale: 4px base — 4, 8, 12, 16, 24, 32, 48, 64, 96, 128
- Vertical section rhythm: `py-16 md:py-24 lg:py-32`
- Alternate `--rio-paper` / `--rio-sink` between sections so bands read as distinct without borders everywhere
- Border radius: `4px` small, `8px` cards, `12px` modals. **No `rounded-2xl` pill-everything.** Industrial products, squarer geometry.
- Shadows: at most two levels, both very soft (`0 1px 2px rgba(22,24,26,.06)`, `0 8px 24px rgba(22,24,26,.08)`). Prefer a `1px` border over a shadow for card definition.
- Grid: 12-col desktop / 6-col tablet / 4-col mobile

---

## 6. Motion

Framer Motion, restrained. Everything below wrapped in a `prefers-reduced-motion` check falling back to instant, no-transform.

| Where | Motion |
|---|---|
| Section entry | `whileInView`, opacity 0→1 + y 20→0, 0.5s, `ease: [0.22,1,0.36,1]`, `viewport={{ once: true, margin: '-80px' }}` |
| Grid children | Same, staggered 70ms via parent variants |
| Category cards (hover) | scale 1.015, image `scale 1.06` inside `overflow-hidden`, accent bottom-rule grows 0→100% width, 250ms |
| Spec tabs | Content cross-fade + 8px x-shift; underline slides between tabs via `layoutId` |
| Stat counters | Count up on first in-view, 1.4s ease-out. **Only render if the value is non-null** |
| Nav on scroll | Solid background + shadow after 40px, height 88→64px, 200ms |
| Accordions | Height auto-animate, 250ms |
| Buttons | Background shift only, 150ms. No bouncing. |

**Do not** animate footer links, nav items, table rows, or body paragraphs. Ambient motion everywhere is the giveaway of a generated site.

---

## 7. Component Inventory

Each a discrete, typed component under `/components`.

### Global
| Component | Notes |
|---|---|
| `SiteHeader` | Logo left, nav center, phone + "Get a Quote" right. Products opens a **mega-menu panel** (not a thin dropdown): 4 columns, one per category, each listing its leaf products. Mobile: full-screen slide-in drawer with accordion categories. Sticky, shrinks on scroll. |
| `SiteFooter` | Dark (`--rio-night`). 4 cols: brand+social / product tree / company links / contact block. Address, both phone numbers labelled distinctly, email, hours. Bottom bar: copyright. |
| `StickyContactBar` | Mobile only, fixed bottom: Call · WhatsApp · Enquire. High-value here — a contractor on site taps to call, doesn't fill forms. |
| `Container`, `Section`, `Eyebrow`, `Button`, `Reveal` | Primitives. `Reveal` wraps the standard scroll animation so it's one import everywhere. |

### Content
| Component | Notes |
|---|---|
| `HomeHero` | Split layout, NOT centered. Left 55%: eyebrow, H1, subhead, two CTAs, `StandardsBadgeRow`. Right 45%: `images.hero`, full-bleed to the right edge, subtle parallax on scroll. Background `--rio-paper` with a low-opacity tiled pipe-cross-section SVG pattern. |
| `CategoryGrid` | 4 `CategoryCard`s. |
| `CategoryCard` | Category image on an accent-tinted wash, name, one-line description, leaf-product count, accent bottom rule animating on hover. Whole card is the link. `accent` prop drives all coloring. |
| `ProductCard` | Leaf-product card: name, standard badge (`ASTM D-2846` in mono), "View specifications" affordance. **No stock image** — use a small accent-tinted geometric mark or the category image at low opacity, so it never reads as a product photo. |
| `ProductHero` | Leaf-page hero. **Optional `image` prop** — see §4.3. Without an image: large category-accent panel with product name, standard in mono, size range. |
| `SpecTable` | **The most important component on the site.** One spec table. Mono font, tabular numerals, zebra rows using `--rio-sink`, sticky header row on scroll, sticky first column on horizontal scroll. Mobile: horizontally scrollable with visible edge-fade + "swipe" hint on first render. Header rule in the category accent. `showPricing` boolean gates price columns (see §8.5). |
| `SpecTabs` | Wraps 2+ `SpecTable`s (e.g. SDR 11 / SDR 13.5). Tabs with `layoutId` sliding underline in category accent. |
| `FeatureList` | "Features & Benefits" bullets. **Not** generic checkmark cards — two-column list with a small category-accent `Check` icon and hairline dividers. |
| `StandardsBadgeRow` | `ASTM D-1785`, `IS 13592`, `ISI` etc. as mono-type bordered chips. Hero, leaf pages, product cards. Genuine trust signal the old site buried. |
| `StatCounter` | Animated count-up. Renders nothing if value is null. |
| `TestimonialSection` | **Curated.** Only reviews with body text and 4+ stars (5 of the 20 — extract §3.11). Show the honest aggregate "4.4 out of 5 · 20 Google reviews" with a link to the Google listing. Carousel on mobile, 3-up grid desktop. Home and Contact **only**. |
| `ClientLogoStrip` | Client logos, infinite marquee, greyscale → color on hover, pauses on hover and entirely under reduced-motion. **Needs the real logo files from the client** — the old ones are `client_1.png`…`client_10.png` on their server. If unavailable, hide the section. |
| `FAQAccordion` | 5 Q&As from extract §8. Single-open, animated height, `<details>`-based. |
| `EnquiryForm` | Name, company, phone, email, city, product interest (select), quantity/requirement, message. zod validation, inline errors, loading + success states. |
| `DealerEnquiryForm` | Variant with dealer fields (firm name, GST, region, current brands carried). |
| `ContactInfoBlock` | Address, both phones, email, hours, WhatsApp CTA. |
| `MapEmbed` | Lazy-loaded Google Maps iframe; static styled placeholder with "Load map" button until clicked. |
| `Breadcrumb` | **Actually functional** — real hrefs, real page names, driven by route. Fixes audit items 5 & 9. |
| `CTABand` | Full-width dark (`--rio-night`) band: heading, body, button. |

---

## 8. Page-by-Page Build Spec

### 8.1 Home (`/`)

Top to bottom:

1. **`HomeHero`** — copy from extract §3.1. Image: `images.hero`.
2. **`ClientLogoStrip`** — eyebrow "Our beloved partners". Hide if logos unavailable.
3. **`CategoryGrid`** — eyebrow "Our range", H2 "Our Premium Piping Solutions", 4 cards using `images.categories.*` and the descriptions in §8.3.
4. **About block** — split: `images.facility.production` left, content right. Eyebrow "About us", H2 and body verbatim from extract §3.3. Button → `/about`.
5. **`StatCounter` row** — **only render if the client supplies real numbers.** All four are currently `0`. Wire the component, feed `null`s, let the section hide itself. `TODO` comment naming the four labels (Clients / Projects / Hours of Support / Workers).
6. **"Built for real conditions"** — replaces the duplicated "Real-World Benefits" sections (extract §3.8). **One** section, **five** unique items, each with a lucide icon and its application image:
   - Hot & Cold Plumbing → `Thermometer` → `images.applications.hotCold`
   - Residential Use → `Home` → `images.applications.residential`
   - Industrial Use → `Factory` → `images.applications.industrial`
   - Corrosive & Chemical Fluids → `FlaskConical` → *icon only, no photo*
   - Drinking Water → `Droplets` → *icon only, no photo* (see assets doc §5 — no strong free image; icon reads better than a weak one)
   Layout: 5-across desktop, 2-across mobile, hairline dividers, no cards.
7. **"What we do"** — the four items from extract §3.7 as a 2×2 grid with numbered mono labels `01`–`04`. Copy verbatim.
8. **`CTABand`** — extract §3.9 copy, dark band, button → `/about`.
9. **`TestimonialSection`** — curated.
10. **Dealer CTA strip** — "Become a RIO dealer" → `/contact#dealer`. Justified by the Mission and FAQ #4 emphasis on the dealer network.

**Delete from the old home page:** the Lorem Ipsum trio (§3.5), the empty "Our Local Presence" section (§3.10), the duplicate benefits block.

### 8.2 About (`/about`)

1. Page header — H1 "About RIO Pipes & Fittings", breadcrumb.
2. **Company story** — extract §3.3 body, founding facts (2015, Rajkot) pulled out as a small mono fact-list beside it.
3. **MD profile** — eyebrow "Our story", H2 "Mr. Dharmesh Khoont, Managing Director", body from extract §4.2. **No portrait available** — do not substitute a stock person. Use a typographic treatment or request the real photo (the old site has `story.png`).
4. **Mission & Vision** — two panels side by side, verbatim from extract §4.4. Pull `"Power of Quality, Advantage of Value"` out as a large display-type pull-quote between them.
5. **Why Choose Us** — four items from extract §4.5, **capitalisation normalised to sentence case** (fixes audit #19). Icons: `Wrench`, `Headset`, `Handshake`, `ShieldCheck`.
6. **Manufacturing** — full-width band using `images.facility.production`, with the "advanced facility" claim from the company copy. Comment it as stock.
7. **Standards & warranty** — new section built from real data in extract §10: table of the 7 standards, two warranty periods (10yr UPVC/CPVC, 7yr SWR/Agri), service temperatures. Real, verifiable, currently scattered across the site.
8. `CTABand` → `/contact`.

**Delete entirely:** the "Our Expert Staffs" team section — 100% stock-photo placeholders with the job title "Vapers". Leave a commented-out `TeamSection` stub for when real staff data arrives.

### 8.3 Products index (`/products`)

The old page is four cards and nothing else. Build it out:

1. Page header — H1 "Our Products", intro line.
2. **Category navigator** — 4 large cards with these descriptions (write these; the old site has none):
   - **UPVC Plumbing System** — "Schedule 40 and Schedule 80 pipes and fittings to ASTM D-1785 and D-2467, for cold water distribution and general plumbing. Corrosion-proof, UV resistant, service temperature up to 60°C."
   - **CPVC Plumbing System** — "SDR 11 and SDR 13.5 pipes and fittings to ASTM D-2846 in CTS sizing, engineered for hot and cold water lines. Flame and smoke resistant, service temperature up to 93°C."
   - **SWR Plumbing System** — "Soil, waste and rainwater systems to IS 13592 and IS 14735, in both self-fit and ring-fit jointing. 100% leak-proof joints, high flow rates, UV stabilised."
   - **Agriculture Plumbing System** — "PVC irrigation pipes to IS 4985 and fittings to IS 7834, in 4 and 6 kg/cm³ pressure classes from 40 mm to 160 mm. Smooth bore for higher flow than equivalent G.I."
3. **Full product index table** — all 12 leaf products in one scannable mono table: name, category, governing standard, link. Genuinely useful for a contractor who knows the standard they need.
4. `CTABand`.

### 8.4 Category pages (`/products/[category]`)

Four routes: `upvc`, `cpvc`, `swr`, `agriculture`. Each:

1. Page header with **the category accent applied throughout the page** — H1, breadcrumb, description from §8.3. Header band uses that category's image at low opacity behind a `--rio-paper` scrim.
2. `StandardsBadgeRow` for that category's standards.
3. Grid of `ProductCard`s for that category's leaf products (2 CPVC, 2 UPVC, 5 SWR, 3 Agriculture).
4. "Where it's used" strip — 3 application contexts drawn from FAQ #2 wording in extract §8.
5. `CTABand` — "Need specifications or a quote for [category]?"

**No testimonials on these pages.**

### 8.5 Product detail (`/products/[category]/[product]`)

12 routes, one template driven by the content config:

1. Breadcrumb: Home / Products / [Category] / [Product] — all links functional.
2. **`ProductHero`** — per §4.3. Ship with no image; typographic panel with product name as H1, governing standard as mono badge, size range from the table. `FeatureList` beneath.
3. Sticky "Enquiry Now" button (mirrors the old site's CTA) opening a modal `EnquiryForm` pre-filled with the product name.
4. **`SpecTabs`** with the product's tables. Data from extract §7.
5. **Related products** — other leaf products in the same category.
6. Compact contact strip: phone + WhatsApp.

**Three flags carried from the audit:**
- The CPVC SDR 13.5 table currently duplicates SDR 11 codes exactly (audit #4). Render what's there and add `// FIXME: client to confirm — SDR 13.5 codes appear duplicated from SDR 11`.
- The 8 leaf pages in extract §7.5–7.12 need their tables pulled from the live URLs before those routes ship. Build the template and the 4 fully-specified products first; scaffold the other 8 with names, standards, and `tables: []` plus a TODO.
- The SWR pipes tables contain public INR pricing. **Ask the client before publishing prices.** `SpecTable`'s `showPricing` boolean drops those columns without touching data.

### 8.6 Contact (`/contact`)

1. Page header.
2. **Two-column:** left = `EnquiryForm`; right = `ContactInfoBlock` (address, both phones clearly labelled — resolve which is primary with the client per audit #13 — email, hours, WhatsApp).
3. `MapEmbed` — lazy, click-to-load.
4. **Dealer enquiry section** at `#dealer` — `DealerEnquiryForm`, framed with the partnership language from FAQ #4.
5. `FAQAccordion` — all 5 Q&As verbatim. **Flag the 24/7 vs Mon–Sat contradiction (audit #15)** to the client; default to the footer hours until confirmed.
6. `TestimonialSection`.

---

## 9. Content Architecture

Typed config, one file per concern, so a non-developer can update copy without touching components:

```
/content
  site.ts          // name, contact, social, hours, nav
  images.ts        // §4.2
  home.ts          // all home section copy
  about.ts         // story, MD, mission, vision, why-choose-us, standards
  categories.ts    // 4 categories: slug, name, accent, description, standards[], image
  products/
    index.ts       // barrel export, 12 products
    cpvc-pipes.ts  // { name, slug, category, standard, image?, features[], tables[] }
    ...            // one file per leaf product
  faqs.ts
  testimonials.ts  // curated subset + aggregate
```

```ts
type SpecTable = {
  label: string;              // tab label, e.g. "SDR 11 Class-1"
  caption?: string;           // e.g. "Type – A Rate Per Piece"
  columns: string[];
  rows: (string | number)[][];
  containsPricing?: boolean;  // gates display per §8.5
};

type Product = {
  name: string;
  slug: string;
  category: CategorySlug;
  standard: string;
  image?: string;             // optional — see §4.3
  features: string[];
  tables: SpecTable[];
};

type Stat = { label: string; value: number | null; suffix?: string };
// StatCounter returns null when value === null; parent hides if all null
```

---

## 10. Accessibility & Performance

- Semantic landmarks, one `h1` per page, logical heading order
- Visible focus rings (2px, `--rio-blue`, 2px offset) — never `outline: none`
- 4.5:1 minimum contrast; verify `--rio-mute` on `--rio-paper` and every accent on white
- Spec tables: real `<table>` with `<caption>`, `<th scope>`; keyboard-scrollable with `tabindex="0"` on the scroll container
- Tabs: proper `role="tablist"` / `aria-selected` / arrow-key navigation
- Mega-menu: keyboard operable, Escape closes, focus trapped while open
- Alt text per §4.4
- `next/image` everywhere, explicit sizes, `priority` on the hero only
- Target Lighthouse ≥95 across the board; LCP under 2.0s on 4G — this audience is largely on mid-range Android over mobile data
- Per-page metadata + OG tags; JSON-LD `Organization` + `Product` schema (the standards and warranty data make this genuinely rich)

---

## 11. Build Order

1. Project setup, Tailwind tokens, fonts wired — **screenshot-verify fonts render before proceeding**
2. **Download all images into `/public/images/` per §4.1; create `/content/images.ts`**
3. Primitives (`Container`, `Section`, `Button`, `Eyebrow`, `Reveal`)
4. `SiteHeader` (incl. mega-menu) + `SiteFooter` + `StickyContactBar`
5. Content config scaffolding with real data from the extract
6. `SpecTable` + `SpecTabs` — build and test against the CPVC and SWR data first; hardest components, most used
7. `ProductHero` (both states) → product detail template → the 4 fully-specified products
8. Category pages → Products index
9. Home page sections
10. About page
11. Contact page + forms
12. Accessibility pass, Lighthouse pass, responsive QA at 360 / 768 / 1024 / 1440
13. `BUILD_REPORT.md`

---

## 12. Definition of Done

- [ ] Zero Lorem Ipsum anywhere in the repo or DOM
- [ ] Zero fake people, zero stock-photo staff
- [ ] Zero `[PLACEHOLDER]` strings rendered — missing data hides its section
- [ ] All images self-hosted under `/public/images/`; no `remotePatterns` in `next.config.js`; no reference to `riopipes.com` anywhere in the codebase
- [ ] Every stock image carries a code comment marking it a placeholder
- [ ] Alt text describes the photograph, never claims it is a RIO product
- [ ] No stock photo used as a leaf product's primary image
- [ ] All breadcrumbs functional and correct per route
- [ ] No duplicated sections; benefits appear once with five unique items
- [ ] All 12 products routed; 4 with complete tables, 8 scaffolded with TODOs
- [ ] Category accent applied consistently and never mixed
- [ ] Mono type on every product code, dimension, and standard
- [ ] Spec tables usable on a 360px screen
- [ ] Testimonials curated, aggregate stated honestly
- [ ] `prefers-reduced-motion` respected throughout

---

## 13. Open Client Questions — list these in `BUILD_REPORT.md`

1. Real values for the four stat counters (Clients / Projects / Hours of Support / Workers) — currently `0` on the live site.
2. Product images for the 12 leaf pages — do they have the source files behind `CPVC-Fitting-SDR11-Reducer-Coupler.png` etc.?
3. Client logo files for the partners strip.
4. Photograph of Mr. Dharmesh Khoont for the About page.
5. CPVC SDR 13.5 spec table appears to duplicate SDR 11 product codes — which is correct?
6. Spec tables for the 8 remaining leaf products.
7. Should INR pricing be public on the SWR pages?
8. Two phone numbers in use (+91 93169 28238 vs WhatsApp +91 98250 78383) — which is primary?
9. FAQ #5 claims 24/7 support; footer says Mon–Sat 09:00–17:00 — which is accurate?
10. Real staff data if the team section should be reinstated.
