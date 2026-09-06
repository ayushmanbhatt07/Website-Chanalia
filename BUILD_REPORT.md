# Chanalia Website Redesign — Build Report

## Summary of Changes
The Chanalia Imports & Exports website has been completely overhauled from a generic light SaaS theme to a stark, dark industrial design system.
- **Theme:** Moved off the light theme. Implemented the requested deep graphite-navy background (`#10141B`) with elevated surface panels (`#171C25`), hairline borders (`#2A3140`), and off-white primary text (`#EDEFF2`).
- **Contextual Accents:** Replaced the generic blue with two contextual accents strictly isolated to their domains: Kraft-amber (`#C98A3E`) for Corrugated Boxes, and Pipe-blue (`#4A93B8`) for PVC Pipes & Fittings.
- **Typography:** Swapped defaults for a highly structural typographic system: `Archivo Expanded` for all headings, `IBM Plex Sans` for body copy, and `IBM Plex Mono` for data and specifications tables.
- **Component Refactoring:** Eradicated all rounded white cards with circular checkmarks. The "Chanalia Standard" section is now a left-bordered stacked list leveraging the new border tokens and typography hierarchy. The arrow-suffixed links ("→") were replaced with hover-underlined text. All ALL-CAPS tracked out labels have been updated to sentence case.

## Files Touched
- `src/app/layout.tsx` (Replaced Google Fonts with Archivo & IBM Plex, updated body classes)
- `src/app/globals.css` (Implemented new `@theme` tokens and typographic defaults)
- `src/lib/content.ts` (Updated `images` block with Unsplash URLs)
- `src/components/ui/ProductCategoryPanel.tsx` (Added duotone effects, removed arrow link, applied contextual border/text accents via a new `variant` prop)
- `src/components/ui/HeroVideoSection.tsx` (Flipped to dark theme `bg-base` with contrast text)
- `src/components/ui/SpecTable.tsx` (Updated to dark theme with contextual header accents, styled `[PLACEHOLDER]` text specifically in monospace)
- `src/components/ui/TrustStrip.tsx` (Dark theme updates, placeholder monospace targeting)
- `src/components/ui/StepSequence.tsx` (Removed rounded styles, implemented sharp dark theme styling)
- `src/components/ui/QuoteRequestForm.tsx` (Dark theme input styling)
- `src/app/page.tsx` (Home refactored entirely to dark theme, Why Chanalia grid replaced with stacked lists)
- `src/app/about/page.tsx` (Dark theme updates, removed ALL-CAPS labels, added background manufacturing image)
- `src/app/products/page.tsx` (Added duotone treatments to hero sections, contextual variant usage, removed ALL-CAPS)
- `src/app/global-reach/page.tsx` (Dark theme, removed ALL-CAPS, added background shipping container image)
- `src/app/contact/page.tsx` (Dark theme details and form integration)

## Image Usage
Image placeholders have been successfully swapped with the requested Unsplash assets (free commercial license) utilizing Next.js `next/image` with low-opacity and scrim overlays for dark theme contrast.
- **Corrugated Boxes (`/products` & `/`):** `https://images.unsplash.com/photo-1757837593538-b4a8654132f1` (Treated with amber duotone)
- **PVC Pipes (`/products` & `/`):** `https://images.unsplash.com/photo-1729169927271-7826d8aae360` (Treated with blue duotone)
- **Manufacturing Facility (`/about`):** `https://images.unsplash.com/photo-1701328778019-e95dedbf5346` (Used as section background)
- **Shipping Container (`/global-reach`):** `https://images.unsplash.com/photo-1750593481405-876be1140853` (Used as section background)

*Note: All stock photo usages have been explicitly commented in the code as placeholders for real Chanalia photography.*

## Placeholder Status
- **Real Images:** The visual blank/broken images have all been successfully replaced with the verified stock imagery above.
- **Textual Placeholders:** All factual data points such as `[PLACEHOLDER: real GSM specs]`, `[PLACEHOLDER: real office address]`, `[PLACEHOLDER: founding year]`, and `[PLACEHOLDER: ports used]` were **deliberately left untouched**. They are now explicitly styled using `IBM Plex Mono` in a muted text color to visually indicate that they are pending real company data, rather than appearing as an error.

## Remaining Follow-ups
- Await the real specifications, office address, certifications, founding details, export markets, and the actual manufacturing plant video from the client to populate `src/lib/content.ts`.
- The `SiteHeader` and `SiteFooter` files were not explicitly refactored in the primary instructions, but they inherit the new global CSS background (`bg-base`) and text (`text-primary`) automatically. A minor pass on them might be desired to fully align their internal borders/hovers with the new dark palette if any legacy classes exist there.

## Round 3 Updates (Motion, Fonts, Hero & Imagery)
- **Font Fixes:** Resolved the missing typography by using Archivo instead of the non-existent Archivo_Expanded export from 
ext/font/google. Correctly wired the CSS variables into the Tailwind v4 @theme block in globals.css. Added Fraunces as a stark serif contrast for pull-quotes. Replaced ont-sans with ont-body globally to ensure exact matching with the new configuration.
- **Hero Redesign:** Moved away from the generic centered layout. The hero now uses a left-aligned text layout and features an ambient, slowly rotating 3D-styled SVG line-art element representing a pipe cross-section on the right, fulfilling the 3D-effect request with zero added bundle weight and high reliability.
- **Framer Motion Integration:** Added SlideInSection.tsx scroll-reveals with staggered delays and alternating directions. Built AnimatedCounter.tsx for the home page trust strip (respecting useReducedMotion). Added cursor-tracking 3D tilt (otateX/otateY) and scale-on-hover to the ProductCategoryPanel components.
- **Images Added:** Placed photo-1701328778019-e95dedbf5346 with a duotone overlay in the About page's Manufacturing Facility section. Added photo-1759216373394-91146ca977c7 (port hero) and photo-1750593481405-876be1140853 (shipping container) to the Global Reach page.
- **Copy & Icons:** Replaced the plain numbered sequence in Global Reach with semantic Lucide React icons. Rewrote the specified hero subheads and standard section intros in content.ts and page.tsx as requested.
