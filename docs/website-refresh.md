# Hokkaido website refresh

Implemented September 21–22, 2026. Local preview: http://127.0.0.1:5173/.

## What changed

- Home follows the requested sequence: full-width Hokkaido hero, brand logos, Experiences slider, New & Notable location carousel with triangle markers, milestones, Mission/Vision/Values, guest-story placeholder, journal previews, franchise section, community quote banner, shared footer.
- `/our-brands` uses alternating image/text listings grouped as Restaurant, Retail, Trading, and Hotel & resort. Existing category query filters still work. Hotel & resort contains Hokkaido Dekkaido, the actual Farm & Resort business; no hotel brand was invented.
- `/about-us` includes the 2018 introduction, story, `/our-story` timeline, local-image social wall, and existing leadership photos and biographies.
- `/mart` represents HOMA Nepal, the existing retail business. Its Inquiry Now button opens an email addressed to the existing HOMA contact. It does not pretend a server submission succeeded.
- `/franchises` has the introduction, location area, and partnership CTA. A shared card renders direct external website links in new tabs with `rel="noopener noreferrer"`; client-confirmed records are still required.
- `/about`, `/businesses`, all ten existing business detail routes, `/contact`, and existing `/careers`, `/press`, `/booking` redirects remain intact. Existing title, viewport, favicon, and other HTML metadata are retained.
- Shared theme updates apply to retained pages and form components. Their phone, WhatsApp, email, and map links remain intact.

## Reference review

Opened Home, Our Brands, About Us, Mart, and Franchises at 1280px and 375px. Inspected desktop and mobile menu opening and the live CSS/computed typography. Reference assets were used only for inspection; no Roadhouse image, logo, brand name, or copy was added to the application.

Sources:

- https://www.roadhousenepal.com/
- https://www.roadhousenepal.com/our-brands
- https://www.roadhousenepal.com/about-us
- https://www.roadhousenepal.com/mart
- https://www.roadhousenepal.com/franchises
- https://www.roadhousenepal.com/template/web/assets/css/style.css
- https://www.roadhousenepal.com/template/web/assets/css/custom-themes.css

The live brands page currently uses compact side-by-side cards. The implementation follows the brief's explicit alternating-image/text instruction. The reference's CSS also contains tan `#AB8A62` defaults; these are intentionally excluded to meet the no-orange-accent requirement. Original red Hokkaido logos and warm colors inside photography are retained as brand assets.

## Color and typography tokens

Defined centrally in `src/styles/foundation.css`. Legacy surface and accent tokens resolve to the new palette, keeping retained components consistent.

| Token | Value | Use |
| --- | --- | --- |
| `--reference-white` | `#ffffff` | Page background, button text |
| `--reference-cream` | `#faf9f1` | Warm neutral sections, text on dark surfaces |
| `--reference-charcoal` | `#231f20` | Headings, body text, buttons, footer, mobile menu |
| `--reference-muted` | `#65676b` | Secondary text |
| `--reference-gray` | `#f1f1f1` | Cards, neutral placeholders |
| `--reference-slate` | `#3c5365` | Hover, focus and links/accent details |
| `--accent-slate-hover` | `#2e4252` | Legacy primary-button hover |
| `--accent-slate-active` | `#233442` | Legacy primary-button active state |
| `--font-heading`, `--font-body` | Montserrat, Arial, sans-serif | All typography |
| `--font-weight-heading` | 600 | Headings |
| `--font-weight-body` | 400 | Body |
| `--font-weight-link` | 500 | Links/navigation |
| `--type-body` | 1rem | 16px body |
| `--body-line-height` | 1.75 | 28px body leading |
| `--heading-line-height` | 1.25 | Section heading leading |
| `--heading-letter-spacing` | 0 | Headings |
| `--type-h1` | clamp(1.625rem, 4.7vw, 4rem) | Responsive page titles |
| `--type-h2` | clamp(1.75rem, 3.2vw, 2.5rem) | Responsive section headings |

Menu links use 24px/28px at weight 500; buttons use 14px at weight 500. Hero display type scales to 80px. Montserrat loads through the Google Fonts import in `src/index.css`, with local system fallbacks.

A project-wide source search found no remaining old orange/tan/coral accent values or orange utility classes. Semantic success green remains for form status. Black used in image scrims/shadows is not an accent.

## Menu and additional bug fixes

The old fixed menu was nested in a sticky header with `backdrop-filter`, which creates a containing block for fixed descendants. Its panel/backdrop could consequently be constrained by the header. The hamburger was also hidden by default on desktop, and scroll locking/focus trapping were missing.

The replacement uses a portal to `document.body` and a native modal dialog in the browser's top layer. It provides a scrollable panel, backdrop, close control, Escape support, close on links, explicit Tab/Shift+Tab wrapping, initial close-button focus, restored trigger focus, `aria-expanded`, a named dialog, body scroll locking, reduced-motion handling, and touch support. Menu content comes from the existing directory, with Restaurants, Hotels & resort, and Retail & imports groups.

Visual QA also found the old contact directory stayed transparent on small screens: its scroll-reveal observer required 16% of a roughly 6,700px section to be visible, exceeding the available viewport. The observer now reveals sections on entry.

Type checking exposed two existing Zod 4 compatibility issues. `src/lib/schemas.ts` now uses the supported enum `error` option and explicitly types numeric coercion input. Runtime booking validation and form tests still pass.

## Every placeholder / client content needed

- [ ] **Franchise records:** confirmed franchise brand and location names, descriptions, photographs, and exact official website URLs. `franchises` in `src/data/editorialContent.ts` is intentionally empty. The location section displays “Location announcements coming soon.” Home contains working franchise navigation and the section; real external cards appear when supplied. No guessed external destination or intermediate redirect is present.
- [ ] **Corporate phone/email:** both were empty in the source data. Menu/footer currently use the existing Ramen House phone and email, explicitly labeled “outlet contact.” Replace this fallback with confirmed group contact details in `src/data/businesses.ts`.
- [ ] **Facebook, Instagram, YouTube URLs:** source social links were empty. The shared component supports their icons, but does not display invented or dead links. Supply confirmed URLs and mark approved records as verified.
- [ ] **HOMA hero/store photo:** currently the genuine HOMA logo on a neutral panel with “Store photography coming soon.”
- [ ] **HOMA supporting product photo:** neutral “HOMA product collection / Product photography coming soon” panel.
- [ ] **Guest testimonials:** home has a clearly labeled guest-story placeholder. The old testimonial array was not published because source links/approval were absent.
- [ ] **Journal articles:** three story previews: “At the Japanese table,” “A moment of calm,” and “From Japan to Nepal.” Each uses existing Hokkaido imagery and is marked as a preview/coming soon; none links to a nonexistent article. Supply full copy, dates, authors, and article destinations.
- [ ] **CSR programme:** the community banner quotes the existing corporate vision over existing Dekkaido photography and states that programme details are coming soon. Supply approved CSR copy, photos, and destination to replace this interim content.
- [ ] **Copy review:** approve the new HOMA/partnership copy and the curated timeline. Only the existing 2018 opening date is stated as a dated milestone; no expansion dates were invented.
- [ ] **Data confirmation:** existing business records remain `verified: false`; leadership biographies and photos are retained from the source. Review names, photo assignments, roles, and addresses before publication.

The social wall is a gallery of existing Hokkaido photographs, not an embedded live social feed. The franchise hero reuses the Hokkaido House dining-room photograph and does not identify that venue as a franchise.

Existing Formspree configuration still includes fallback placeholder endpoint IDs. No live message was sent and no new backend endpoint was invented. The Mart inquiry uses the known email contact instead.

## Verification

- Production build: passed.
- TypeScript application check: passed.
- ESLint: passed.
- Vitest: six tests across four files passed, including existing booking/contact forms, menu regressions, and direct franchise link behavior.
- Rendered all requested pages, the story page, existing aliases/contact, and all ten actual business routes at 375, 768, 1280, and 1920px. No page-width overflow detected. Loaded-image checks passed.
- Menu open/close button/backdrop/Escape/navigation, focus wrapping/restoration, body scroll lock: passed at all four widths.
- Touch hamburger activation and swipe carousel: passed in browser touch emulation.
- Carousel button and keyboard navigation: passed.
- Contact directory after reveal fix: 10 cards, opacity 1, no overflow, at every requested width.
- Final console/runtime audit: 19 actual routes at 375px and 1280px, with zero console errors or runtime exceptions.

Local audit screenshots and JSON results are in `.audit/` (ignored from Git). Reference screenshots are inspection-only. Tests were run in Chromium/Edge desktop and mobile emulation, not on physical iOS/Android devices.

Commands:

```text
npm.cmd run dev -- --host 127.0.0.1
npm.cmd run lint
npx.cmd tsc --noEmit -p tsconfig.app.json
npx.cmd vitest run
npm.cmd run build
```

## Files changed across this refresh

### Pages and routing

- `src/App.tsx`
- `src/pages/HomePage.tsx`
- `src/pages/BusinessDirectoryPage.tsx`
- `src/pages/AboutPage.tsx`
- `src/pages/MartPage.tsx` (new)
- `src/pages/FranchisesPage.tsx` (new)
- `src/pages/StoryPage.tsx` (new)
- `src/pages/ContactPage.tsx` (skip-link target)
- `src/pages/BusinessDetailPage.tsx` (skip-link targets)

### Components and content

- `src/components/SiteHeader.tsx`
- `src/components/MobileMenu.tsx`
- `src/components/SiteFooter.tsx`
- `src/components/ScrollReveal.tsx`
- `src/components/GroupContact.tsx` (new)
- `src/components/PageBreadcrumb.tsx` (new)
- `src/components/ImageCarousel.tsx` (new)
- `src/components/FranchiseCard.tsx` (new)
- `src/components/MobileMenu.test.tsx` (new)
- `src/components/FranchiseCard.test.tsx` (new)
- `src/config/nav.ts`
- `src/data/editorialContent.ts` (new)
- `src/lib/schemas.ts`

### Styles and tooling

- `src/index.css`
- `src/theme.css`
- `src/styles/foundation.css`
- `src/styles/navigation.css`
- `src/styles/editorial.css` (new)
- `src/styles/shared.css`
- `src/styles/contact.css`
- `src/styles/pages.css`
- `src/styles/footer-responsive.css`
- `eslint.config.js` (excludes generated local browser/audit files)
- `.gitignore` (local browser/audit artifacts)
- `docs/website-refresh.md` (this handoff)


## Catering addition — September 22, 2026

Added `/catering`, linked in the shared menu/footer and home hero navigation. Inspired by the layout of https://www.roadhousenepal.com/catering, inspected at desktop/mobile widths. All five photographs are existing Hokkaido assets (Umami sushi, Sora chef/preparation/platter, and Hokkaido House dining room). Copy is original; off-site service areas, capacity, packages, prices, and live-cooking availability are not asserted.

The inquiry collects contact and event details, validates required fields, then prepares a reviewable email addressed to the existing Hokkaido House email. It clearly explains that the visitor must send the email in their email app. No backend or delivered-message status is simulated. Confirm a dedicated catering recipient if the team has one.

Files: `src/pages/CateringPage.tsx`, `src/styles/catering.css`, `src/App.tsx`, `src/config/nav.ts`, `src/pages/HomePage.tsx`, `src/theme.css`.

Checks: production build, TypeScript, and lint passed. Browser checks at 375/768/1280/1920px found no horizontal overflow or broken loaded images. Inquiry anchor, native required-field validation, prepared email recipient/details, and menu closing were checked. No message was sent. Screenshots/results are in `.audit/catering-*`.
