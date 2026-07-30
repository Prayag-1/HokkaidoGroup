# Hokkaido Group Frontend Audit for AI Planning

Generated as a planning document for future UI/content fixes. This file is intentionally literal and source-referenced so another assistant can plan without re-reading the full codebase.

## 1. Project Overview

- Project: Hokkaido Nepal Business Group corporate/portfolio website for restaurants, retail, trading, farm/resort hospitality, contact, booking, careers, and press.
- Framework: React 19 + TypeScript + Vite.
- Routing: `react-router-dom` `BrowserRouter` with routes declared in `src/App.tsx`.
- State/data:
  - Static data modules in `src/data/*`.
  - `@tanstack/react-query` wraps the app and powers contact/booking mutations.
  - Forms use `react-hook-form`, `zod`, and `@hookform/resolvers/zod`.
- Styling:
  - Global imports in `src/main.tsx`: `src/index.css`, `src/editorial.css`, then `src/theme.css`.
  - `src/index.css` is a very large generated/minified Tailwind CSS output, not hand-authored source.
  - `src/editorial.css` defines the older `hg-*` UI system and a later "Roadhouse-inspired group site refresh" override block.
  - `src/theme.css` defines corporate tokens plus newer `corporate-*` page/card styles and overrides some `hg-*` tokens.
  - Components also use Tailwind utility classes directly, especially forms and animation helpers.
- Animation:
  - `framer-motion` is used by page transitions, cursor/motif utilities, scroll progress.
  - `motion/react` is used by `ContactForm` and `BookingForm`.
- Assets:
  - Real business images live under `src/assets/gallery/*`.
  - Public placeholder SVGs live under `public/gallery/*` and are still used by legacy brand/gallery sections and the homepage hero media.
  - Unused starter assets remain in `src/assets/react.svg`, `src/assets/vite.svg`, and likely `src/assets/hero.png`.

### Route Structure

Declared in `src/App.tsx`:

- `/` -> `HomePage`
- `/about` -> `AboutPage`
- `/businesses` -> `BusinessDirectoryPage`
- `/businesses/:slug` -> `BusinessDetailPage`
- `/careers` -> `CareersPage`
- `/press` -> `PressPage`
- `/booking` -> `BookingPage`
- `/contact` -> `ContactPage`
- `/brands/:slug` -> `BrandPage`
- `*` redirects to `/`

`AppRoutes` always renders `SiteHeader`, wraps routes in `AnimatePresence`, and scrolls to hash targets or top on pathname/hash changes.

## 2. Pages & Components Inventory

### Pages

- `src/pages/HomePage.tsx`: Corporate homepage with hero, vision notice, featured businesses, values, milestone, press empty state, contact CTA, and footer.
- `src/pages/AboutPage.tsx`: Timeline page showing milestone cards and a notice that verified long-form company copy is pending.
- `src/pages/BusinessDirectoryPage.tsx`: Directory grouped by business category using `BusinessCard`.
- `src/pages/BusinessDetailPage.tsx`: Dynamic business detail page with hero/contact, about/contact panels, optional gallery, map embed or placeholder, and not-found state.
- `src/pages/BrandPage.tsx`: Legacy dynamic brand page using `brands` and `locations`, with overview panel and outlet list.
- `src/pages/BookingPage.tsx`: Booking landing page with explanation cards and `BookingForm`.
- `src/pages/ContactPage.tsx`: Contact page with direct corporate contact panel and `ContactForm`.
- `src/pages/CareersPage.tsx`: Empty-state careers page with "Coming Soon".
- `src/pages/PressPage.tsx`: Press/news page with empty state when no verified posts exist.

### Active Shared Components

- `src/components/SiteHeader.tsx`: Sticky site header with logo, desktop nav, mobile menu, and "Get in Touch" button; used globally by `App.tsx`.
- `src/components/SiteFooter.tsx`: Footer with brand summary, businesses, company links, pending corporate contact fields; imported by every page component.
- `src/components/MobileMenu.tsx`: Hamburger/sidebar menu for mobile navigation; used in `SiteHeader`.
- `src/components/BusinessCard.tsx`: Card for `Business` entries; used by homepage and directory.
- `src/components/ContactForm.tsx`: Validated contact form posting to FormSubmit endpoint; used by `ContactPage`.
- `src/components/BookingForm.tsx`: Multi-step booking form posting to brand-specific FormSubmit endpoints; used by `BookingPage`.
- `src/components/PageTransition.tsx`: Framer-motion route wrapper; used in `App.tsx`.

### Legacy Or Currently Unused UI Components

These export components but are not imported by active pages/routes in the current tree:

- `src/components/HeroSection.tsx`: Legacy full-viewport hero for "Hokkaido Group".
- `src/components/GallerySection.tsx`: Legacy image grid using `src/data/gallery.ts`.
- `src/components/FarmSection.tsx`: Legacy mission/vision/community grid with "Nepal" map shape and public SVG images.
- `src/components/LocationsSection.tsx`: Legacy "New & Notable" outlet grid.
- `src/components/OurBrandsSection.tsx`: Legacy restaurants/hotels brand grid.
- `src/components/OriginStory.tsx`: Legacy statement section with "HG" mark and category nav.
- `src/components/TestimonialsPressSection.tsx`: Legacy testimonials and press cards. Since `pressItems` is empty, its press grid would render empty.
- `src/components/PageReveal.tsx`: Generic animation wrapper, currently unused.
- `src/components/ScrollProgressBar.tsx`: Scroll progress bar, currently unused.
- `src/components/CursorFollower.tsx`: Custom cursor follower, currently unused.
- `src/components/MotifField.tsx`: Decorative animated motif field, currently unused.
- `src/components/SectionDivider.tsx`: Motif divider, currently unused.
- `src/components/motifs/*`: SVG motif components used only by unused motif/divider helpers.

## 3. Current UI Breakdown (page by page)

### Global Header/Footer

- Header layout: `SiteHeader` renders a sticky `.hg-header`; inner layout is `.hg-shell.hg-header__inner`. `editorial.css` defines it as CSS grid with `auto minmax(0, 1fr) auto` after override, desktop nav centered, mobile menu hidden until breakpoints.
- Header issues:
  - Header uses `hg-*` classes while corporate pages use `corporate-*`, so typography is mixed: logo uses Georgia from `editorial.css`, corporate pages use Inter from `theme.css`.
  - `SiteHeader.tsx` duplicates the nav link list also defined in `MobileMenu.tsx`.
  - Mobile close control displays raw text `"X"` in `src/components/MobileMenu.tsx`, not an icon.
- Footer layout: `SiteFooter` uses `.hg-footer`, `.hg-footer__main` grid of 3 columns, `.hg-footer__bottom` flex row.
- Footer issues:
  - Inline style in `src/components/SiteFooter.tsx`: `<p style={{ marginTop: '1.5rem' }}>`.
  - Placeholder contact/social text appears throughout footer:
    - `src/components/SiteFooter.tsx:32` -> `"Social links pending verification"`
    - `src/components/SiteFooter.tsx:63` -> `"Email pending verification"`
    - `src/components/SiteFooter.tsx:68` -> `"Phone pending verification"`
    - `src/components/SiteFooter.tsx:70` -> `"Address pending verification"`
    - `src/components/SiteFooter.tsx:77` -> `"Contact details pending final verification"`

### Home Page `/`

- Layout:
  - `<main className="corporate-page">`
  - Corporate hero with `.corporate-hero` and `.corporate-hero__inner`, a two-column grid: copy and media.
  - Vision section uses `.corporate-section` + `.corporate-split`.
  - Businesses section uses `.corporate-section--alt`, centered header, `.corporate-business-grid` of 6 featured cards.
  - Values section uses `.corporate-value-grid` with 4 columns on desktop.
  - Milestone section uses `.corporate-split`.
  - Press section renders either `.corporate-news-grid` or `.corporate-empty-state`.
  - CTA uses `.corporate-cta__inner`, a three-column grid: copy, contact grid, button.
  - Footer.
- Spacing/gaps:
  - `theme.css` gives `.corporate-section` `padding-block: clamp(4.5rem, 8vw, 7rem)`, often generous but consistent.
  - `.corporate-business-grid`, `.corporate-news-grid`, `.corporate-value-grid` use `gap: 1rem` and `margin-top: clamp(2rem, 5vw, 3.5rem)`.
  - `.corporate-empty-state` has `margin-top: 2rem`; on pages where the empty state is the main content, this can create odd top spacing after already large section padding.
- Placeholder text and content:
  - `src/pages/HomePage.tsx:46` aria label: `"Japanese restaurant interior photography pending client approval"`.
  - `src/pages/HomePage.tsx:48`: `"Real HNBG photography pending client confirmation before launch."`
  - `src/pages/HomePage.tsx:64`: `"Client-approved vision copy pending"`.
  - `src/pages/HomePage.tsx:66`: `"Add the client's exact mission wording here before launch. Required copy fixes are already noted: "Hokkaodo" should read "Hokkaido" and "Hongkong & Nepal" should read "Japan & Nepal"."`
  - `src/pages/HomePage.tsx:104`: `"Values pending final client confirmation"`.
  - `src/pages/HomePage.tsx:116`: `"Pending client confirmation"`.
  - `src/pages/HomePage.tsx:164`: `"Coming Soon"`.
  - `src/pages/HomePage.tsx:166-167`: `"Fewer than three verified news posts exist in the press data source, so the homepage will not duplicate placeholder articles."`
  - `src/pages/HomePage.tsx:183`: `"Corporate contact details are pending verification and must not go live as final."`
  - `src/pages/HomePage.tsx:209`: `"Social links pending verification"`.
  - Generic fallback in `src/pages/HomePage.tsx:17`: `` `${label} pending verification` ``.
- Images:
  - Hero media uses `/gallery/interior-01.svg`, a public placeholder SVG, not a real imported business image.
  - Business cards use real imported images for most featured businesses, but HOMA Nepal and Janeichi have `image: null`, so their cards are text-only.
- Typography:
  - Corporate page headings use Inter via `--font-heading`.
  - Header/footer/logo and legacy classes still use Georgia in `editorial.css`.
  - Hero h1 is `clamp(2.45rem, 5vw, 5rem)` with max-width `12ch`; can produce many short lines.
- Colors:
  - Corporate palette from `theme.css`: red `#EB1C24`, deeper red `#D71920`, black `#000000`, body `#1A1A1A`, secondary `#333333`, white `#FFFFFF`, alt background `#FAF6F0`.
  - `editorial.css` later overrides `--hg-*` to red/white: `#c61c23`, `#9f1118`, `#fff5f5`.
- Styling convention issues:
  - Page uses `corporate-*`; header/footer use `hg-*`; card uses `.business-card`.
  - The actual image note is visible in UI, making staging/incomplete content public-facing.

### About Page `/about`

- Layout:
  - `.corporate-page`, one `.corporate-section.corporate-section--first`.
  - `.corporate-shell.corporate-split.corporate-split--about` two-column grid.
  - Left column: section header, pending copy notice, CTA.
  - Right column: `.timeline.corporate-timeline` mapping `milestones`.
  - Footer.
- Spacing/gaps:
  - `.corporate-section--first` padding top is `clamp(5.5rem, 8vw, 7.5rem)`.
  - `.corporate-timeline` gap is `1.5rem`.
- Placeholder text:
  - `src/pages/AboutPage.tsx:14-15`: `"Verified long-form company copy is pending. This page keeps the timeline source visible without adding unapproved claims."`
  - Milestone data placeholders in `src/data/milestones.ts`:
    - line 13: `"Foundational Japan and Nepal business relationship milestone. Details pending verification."`
    - line 19: `"Early hospitality milestone in Hokkaido, Japan. Details pending verification."`
    - line 25: `"HNBG is founded and begins building the first ramen production facility in Nepal. Details pending verification."`
    - line 31: `"Current group portfolio milestone. Details pending verification."`
- Images: none.
- Typography: section header Inter, timeline title Inter via `theme.css`; legacy `.timeline` token colors.
- Problems:
  - This page is almost entirely a placeholder; no approved long-form story exists.

### Business Directory `/businesses`

- Layout:
  - `.corporate-page`, first corporate section, centered header.
  - `.business-directory` grid of category groups.
  - Each category group maps businesses to `.corporate-business-grid` of `BusinessCard`.
  - Footer.
- Spacing/gaps:
  - `.business-directory` uses `gap: clamp(2.5rem, 5vw, 4rem)` and same value for `margin-top`.
  - Category grids use `margin-top: 1rem`.
- Placeholder text:
  - `src/pages/BusinessDirectoryPage.tsx:14-15`: `"Portfolio listings are pulled from the shared business data source. Entries marked pending still need client verification before launch."`
  - `BusinessCard` fallback `src/components/BusinessCard.tsx:10`: `"Location pending verification"`.
- Missing images:
  - HOMA Nepal: `src/data/businesses.ts:249-250` -> `image: null`, `galleryImages: []`.
  - Janeichi Business: `src/data/businesses.ts:268-269` -> `image: null`, `galleryImages: []`.
  - Every business has `logo: null` and `websiteUrl: null`.
- Typography/colors:
  - Directory header and group headings use corporate Inter styles.
  - Cards use `theme.css` business-card tokens.
- Problems:
  - Category order is static: `Restaurant`, `Retail`, `Trading`, `Farm & Resort`; empty categories would still render if ever introduced.
  - Cards with missing images become text-only, creating visual inconsistency in a grid.

### Business Detail `/businesses/:slug`

- Layout:
  - Not-found state: corporate first section with header and back button.
  - Normal page:
    - First corporate section with `.business-detail__hero-shell`; two columns when image exists, one column with `--text-only` when missing.
    - Info section `.corporate-section--alt` with `.business-detail__info-grid`, two panels.
    - Optional gallery section `.hg-section.hg-section--soft`.
    - Location/map section `.hg-section` with `.business-detail__location-grid`.
    - Footer.
- Spacing/gaps:
  - Hero gap `clamp(2rem, 5vw, 5rem)`.
  - Info/location grids use `gap: 1rem`.
  - Gallery grid is constrained to `width: min(100%, 44rem)` with `gap: 0.375rem`, which can look narrow compared with the page shell.
  - Map `min-height: 28rem`; on mobile this is tall but stacks correctly.
- Placeholder text/fallbacks:
  - `src/pages/BusinessDetailPage.tsx:31`: `"Location pending verification"`.
  - `src/pages/BusinessDetailPage.tsx:35`: `"Detailed company information is pending verification for this business."`
  - `src/pages/BusinessDetailPage.tsx:41`: `"email@business.com"` fallback.
  - `src/pages/BusinessDetailPage.tsx:42`: `"+977 98XXXXXXXX"` fallback.
  - `src/pages/BusinessDetailPage.tsx:89`: `"Pending verification"` address fallback.
  - `src/pages/BusinessDetailPage.tsx:158`: `"Google Maps embed pending verification."`
- Missing images:
  - HOMA Nepal and Janeichi render text-only heroes and no gallery.
  - `src/assets/gallery/janeichi/Janeichi logo.png` exists but is not imported/used in `businesses.ts`, so Janeichi stays image-less.
  - `src/assets/gallery/hokkaidohouse/house2.webp` exists but is not used.
- Typography/colors:
  - Mixed: hero uses corporate `.section-header`, gallery/location uses legacy `.hg-section`, `.hg-panel`, `.hg-eyebrow`, Georgia titles.
- Problems:
  - Email/phone fallbacks become live `mailto:` and `tel:` links to fake values.
  - Google Maps iframe uses external Google embed for every `mapQuery`; no lazy error state beyond placeholder when `mapQuery` absent.
  - Two styling systems meet visibly on one page: corporate hero panels then legacy hg gallery/map sections.

### Brand Page `/brands/:slug`

- Layout:
  - Legacy `<main>` without `corporate-page`.
  - First `.hg-section` with `.hg-shell.hg-split`: brand copy and overview panel.
  - Second `.hg-section.hg-section--soft` with `.hg-list` outlets or fallback inquiry item.
  - Footer.
- Spacing/gaps:
  - `.hg-section` padding is larger than corporate pages: `clamp(5.5rem, 9vw, 10rem)`.
  - `.hg-split` gap is `clamp(2rem, 6vw, 6rem)`.
  - No `corporate-section--first`, so top spacing relies on large `.hg-section` under sticky header.
- Placeholder/data issues:
  - The `brands` model is legacy and not aligned with `businesses`.
  - Brand slugs include `ramen-house`, `izakaya`, `omakase`, `bento-house`, `catering-partnerships`; these do not match current business slugs like `hokkaido-ramen-house`, `izakaya-hokkaido`, `hokkaido-umami`.
  - Fallback outlet card says `"Group office inquiry"` and `"Available for catering, events, suppliers, and partnerships."`
- Images:
  - Uses public placeholder SVGs from `/gallery/*.svg`, not current real images.
- Problems:
  - Route is still live via `App.tsx`, but no active nav links point to it.
  - Duplicates business/brand content from older data model.
  - Potentially misleading: old brands include "Omakase" and "Hokkaido Bento House", while current `businesses.ts` uses Hokkaido Umami, Sora, Pokhara, Yakitori, HOMA, Janeichi, Dekkaido.

### Booking Page `/booking`

- Layout:
  - Legacy `.hg-section`, `.hg-shell.hg-split`.
  - Left: heading, lead, two `.hg-card` explanation cards inside `.hg-grid.hg-grid--2`.
  - Right: `BookingForm`.
  - A second `.hg-shell.hg-actions` below for Back home.
  - Footer.
- Spacing/gaps:
  - `BookingForm` has internal `mb-6`, `mt-3`, `space-y-4`, `mt-6`, `gap-3` Tailwind classes.
  - `BookingPage` puts `.hg-actions` in a separate shell after the split, which can feel detached.
- Placeholder/fallback text:
  - `BookingForm` uses fallback `Selected restaurant` at `src/components/BookingForm.tsx:171`.
  - Confirmation optional empty fields render mojibake `"â€”"` in `src/components/BookingForm.tsx` for email/requests.
  - Success summary includes mojibake `"â€”"` in `src/components/BookingForm.tsx:394`.
  - Submit loading label renders `"Sendingâ€¦"` in `src/components/BookingForm.tsx`.
- Typography/colors:
  - Legacy `.hg-title` Georgia for page title.
  - Form uses `.hg-field` plus Tailwind utilities and theme CSS variables.
- Problems:
  - ESLint currently reports a React compiler warning for `watch('brand')`: React Hook Form `watch()` cannot be memoized safely.
  - `BookingForm` only includes seven bookable restaurant brands; Dekkaido, HOMA, Janeichi are not bookable, likely intentional but should be confirmed.
  - Loading and dash characters are mojibake, indicating encoding damage in source.

### Contact Page `/contact`

- Layout:
  - `<main className="hg-contact-page">`.
  - `.hg-section`, `.hg-shell.hg-split.hg-split--contact`.
  - Left: title/lead and `.hg-panel` direct contact.
  - Right: `ContactForm`.
  - Separate `.hg-shell.hg-actions` for Back home.
  - Footer.
- Spacing/gaps:
  - `.hg-split--contact` uses uneven columns: `0.72fr` and `1.28fr`.
  - `.hg-contact-page .hg-panel` gets smaller padding than default panel.
- Placeholder text:
  - `src/pages/ContactPage.tsx:26`: `"Email pending verification"`.
  - `src/pages/ContactPage.tsx:33`: `"Phone pending verification"`.
  - `src/pages/ContactPage.tsx:36`: `"Address pending verification"`.
  - `ContactForm` select placeholder: `"Select who this is for"`.
- Typography/colors:
  - Legacy `.hg-title` Georgia; form uses `.hg-field` plus Tailwind utilities.
- Problems:
  - Corporate contact source has all fields null, so the visible direct contact panel is entirely pending.
  - Brand option `"homa"` is lowercase, inconsistent with other labels.
  - `ContactForm` success animation sets form opacity to 0 after success while also rendering success text inside the form; this may hide the success message.
  - Loading label uses mojibake `"Sendingâ€¦"`.

### Careers Page `/careers`

- Layout:
  - Corporate page with one first section, centered `.corporate-empty-state`, footer.
- Placeholder text:
  - `src/pages/CareersPage.tsx:11`: `"Coming Soon"`.
  - `src/pages/CareersPage.tsx:12`: `"Career openings and verified hiring information are pending client content."`
- Problems:
  - Entire route is placeholder content.

### Press Page `/press`

- Layout:
  - Corporate page with first section, centered header, conditional news grid/empty state, footer.
- Placeholder text:
  - `src/pages/PressPage.tsx:33`: `"Coming Soon"`.
  - `src/pages/PressPage.tsx:34`: `"No verified press or news posts are available yet."`
  - `src/data/pressItems.ts:10`: `export const pressItems: PressItem[] = []`.
- Images:
  - No press images render because press data is empty.
- Problems:
  - Entire route is empty-state content.
  - Legacy `TestimonialsPressSection` imports raw `pressItems`, but since empty it would render an empty press grid if reused.

## 4. Known Problems / Bad Patterns

- Public placeholder copy is visible across homepage, about, careers, press, contact, business detail, footer, and milestone data.
- Corporate contact data is completely null in `src/data/businesses.ts`:
  - `address: null`, `phone: null`, `email: null`, `socialLinks: []`, `verified: false`.
- Verification flags are consistently false for business entries; UI copy mentions pending verification but the `verified` value is not used to render badges or hide unverified data.
- HOMA Nepal and Janeichi Business have no images or galleries, causing text-only cards and text-only detail heroes.
- `src/assets/gallery/janeichi/Janeichi logo.png` exists but is unused.
- `src/assets/gallery/hokkaidohouse/house2.webp` exists but is unused.
- `src/assets/react.svg`, `src/assets/vite.svg`, and likely `src/assets/hero.png` are unused starter/dead assets.
- Live `/brands/:slug` route uses stale legacy data unrelated to current `businesses.ts`.
- Multiple currently unused UI components remain in `src/components`, making the active UI surface harder to understand.
- Styling is fragmented:
  - `src/index.css` generated/minified Tailwind output.
  - `src/editorial.css` old `hg-*` system plus override block.
  - `src/theme.css` newer tokens and `corporate-*` system.
  - Tailwind utility strings inside component JSX.
  - Inline style in footer.
- `src/editorial.css` defines `:root` tokens twice; second block overrides first `--hg-*` values.
- Typography is inconsistent:
  - `hg-*` titles/logo use Georgia.
  - Corporate pages use Inter via `--font-heading`.
  - `index.css` imports Google fonts including Inter Tight and Zen Kaku Gothic New, but active theme sets Inter/Noto/system.
- Accessibility issues:
  - Many decorative images use `alt=""`, which is acceptable for decoration but poor if those images carry venue/business meaning. Examples: `BusinessCard` card images, homepage/press cards, legacy brand grids.
  - `HomePage` hero media image has empty alt while the container has an aria-label stating photography pending.
  - `MobileMenu` close button text `"X"` is less descriptive visually than an icon, though aria-label exists.
  - `ContactForm` success message may be hidden by animating the whole form to opacity 0.
  - Fake fallback email/phone in `BusinessDetailPage` become actionable links.
- Encoding/mojibake:
  - `BookingForm` and `ContactForm` include `"Sendingâ€¦"` instead of `"Sending..."` or a real ellipsis.
  - `BookingForm` includes `"â€”"` instead of an em dash or plain hyphen.
- Responsive risks:
  - Header hides desktop nav at `max-width: 1100px` in override block, but also has older `max-width: 900px` behavior earlier.
  - `corporate-cta__inner` is three columns until `max-width: 980px`; long pending contact text may wrap awkwardly before that.
  - Business detail gallery is narrow (`44rem`) compared with content shell and may look under-scaled on desktop.
- UI content problems:
  - Press and careers are not content-complete.
  - Homepage hero shows an explicit pre-launch note.
  - Values and timeline explicitly say they need client confirmation.
  - README still starts with default "React + Vite" template copy.

## 5. Design System Status

### Existing Token Files

- `src/theme.css` is the intended corporate design system. README says: "Use the CSS variables in `src/theme.css` for new page and component styling instead of hardcoding brand colors..."
- `src/editorial.css` is an older/parallel design layer and still controls much of the active `hg-*` UI.
- `src/index.css` appears to be compiled Tailwind output and includes generated theme tokens/utilities. It should not be treated as source design documentation.

### `src/theme.css` Tokens

Colors:

- `--color-primary: #EB1C24`
- `--color-primary-text: #D71920`
- `--color-ink: #000000`
- `--color-body: #1A1A1A`
- `--color-secondary-text: #333333`
- `--color-bg: #FFFFFF`
- `--color-bg-alt: #FAF6F0`
- `--color-success: #2E7D32`
- `--color-sale: var(--color-primary)`
- `--color-muted: #666666`
- `--color-disabled-bg: #E6E6E6`
- `--color-disabled-text: #777777`
- `--color-border: rgba(0, 0, 0, 0.14)`
- `--color-border-strong: rgba(0, 0, 0, 0.28)`
- `--color-focus-ring: rgba(235, 28, 36, 0.32)`
- `--color-image-bg: #FFFFFF`
- `--color-overlay: rgba(0, 0, 0, 0.56)`

Typography:

- `--font-heading: Inter, "Noto Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- `--font-body: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- `--font-size-body-copy: 1rem`
- `--font-size-section-description: 1rem`
- `--font-size-form-control: 1rem`
- `--font-weight-heading: 700`
- `--font-weight-body: 400`
- `--font-weight-link: 700`

Shape:

- `--radius-button: 0.375rem`
- `--radius-tag: 999px`
- `--radius-card: 0.5rem`
- `--radius-input: 0.375rem`

Buttons:

- `--button-primary-bg`, `--button-primary-text`, `--button-primary-border`, `--button-primary-hover-bg`, `--button-primary-hover-border`
- `--button-secondary-bg`, `--button-secondary-text`, `--button-secondary-border`, `--button-secondary-hover-bg`, `--button-secondary-hover-text`
- `--button-disabled-bg`, `--button-disabled-text`, `--button-disabled-border`

Component tokens:

- Section header: `--section-eyebrow-*`, `--section-heading-color`, `--section-description-color`, `--section-divider-color`
- Business cards: `--business-card-*`, including `--business-card-image-aspect-ratio: 4 / 3`
- Header/footer: `--header-*`, `--footer-*`
- Timeline: `--timeline-*`
- Compatibility aliases: `--hg-paper`, `--hg-paper-soft`, `--hg-ink`, `--hg-muted`, `--hg-line`, `--hg-line-dark`, `--hg-red`, `--hg-dark`, `--hg-gold`

### `src/editorial.css` Tokens and Overrides

Initial `:root`:

- `--hg-paper: #f3eee5`
- `--hg-paper-soft: #faf7f1`
- `--hg-ink: #1b1713`
- `--hg-muted: #706960`
- `--hg-line: rgba(27, 23, 19, 0.14)`
- `--hg-line-dark: rgba(250, 247, 241, 0.16)`
- `--hg-red: #c43a26`
- `--hg-dark: #17130f`

Later "Roadhouse-inspired group site refresh" `:root` override:

- `--hg-paper: #ffffff`
- `--hg-paper-soft: #fff5f5`
- `--hg-ink: #171717`
- `--hg-muted: #6b1f1f`
- `--hg-line: rgba(198, 28, 35, 0.18)`
- `--hg-line-dark: rgba(255, 255, 255, 0.22)`
- `--hg-red: #c61c23`
- `--hg-dark: #9f1118`
- `--hg-gold: #c61c23`

### Breakpoints / Responsive Rules

- `theme.css`: `@media (max-width: 980px)` and `@media (max-width: 640px)`.
- `editorial.css`: `@media (max-width: 900px)`, later `@media (max-width: 1100px)`, `@media (max-width: 900px)`, and `@media (max-width: 640px)`.
- Generated `index.css` Tailwind breakpoints include `sm` at `40rem`, `md` at `48rem`, `lg` at `64rem`, `xl` at `80rem`.

### Consistency Status

- Colors are partly centralized, but hardcoded rgba/hex still appear throughout `editorial.css` and Tailwind arbitrary utilities.
- No explicit spacing scale token exists in `theme.css`; spacing is ad hoc clamps, rems, Tailwind utilities, and component-specific gaps.
- No font scale beyond a few body/form/section tokens; headings use several unrelated clamps in CSS.
- No single button system: `.hg-button` and `.corporate-button` coexist with different radius, letter spacing, sizing, and colors.

## 6. File & Folder Structure

Relevant frontend tree:

```text
src/
  App.tsx                         Route definitions, header, transitions.
  main.tsx                        Global CSS imports and React root.
  index.css                       Generated/minified Tailwind CSS output; messy as source.
  editorial.css                   Legacy hg-* UI system plus refresh overrides.
  theme.css                       Corporate tokens and corporate-* styles.
  assets/
    hero.png                      Likely unused.
    react.svg                     Unused Vite starter asset.
    vite.svg                      Unused Vite starter asset.
    gallery/
      dekkaido/*.jpg              Real Dekkaido photos; very large JPGs.
      hokkaidohouse/*.webp        Real Hokkaido House photos; house2 unused.
      izakaya/*.jpg               Real Izakaya photos; large JPGs.
      janeichi/Janeichi logo.png  Exists but not used.
      pokhara/*.jpg               Real Pokhara photos; large JPGs.
      ramenhouse/*.webp           Real Ramen House photos.
      sora/*.webp                 Real Sora photos.
      umami/*.jpg|*.webp          Real Umami photos.
      yakitori/*.webp             Real Yakitori photos.
  components/
    BookingForm.tsx               Active form; mojibake and RHF watch warning.
    BusinessCard.tsx              Active business listing card.
    ContactForm.tsx               Active contact form; success opacity issue.
    SiteHeader.tsx                Active global header.
    SiteFooter.tsx                Active global footer; inline style.
    MobileMenu.tsx                Active mobile nav.
    PageTransition.tsx            Active route animation.
    HeroSection.tsx               Legacy/unused.
    GallerySection.tsx            Legacy/unused.
    FarmSection.tsx               Legacy/unused.
    LocationsSection.tsx          Legacy/unused.
    OurBrandsSection.tsx          Legacy/unused.
    OriginStory.tsx               Legacy/unused.
    TestimonialsPressSection.tsx  Legacy/unused.
    PageReveal.tsx                Unused helper.
    ScrollProgressBar.tsx         Unused helper.
    CursorFollower.tsx            Unused helper.
    MotifField.tsx                Unused decorative helper.
    SectionDivider.tsx            Unused divider helper.
    motifs/*                      Used only by unused motif/divider helpers.
  config/
    forms.ts                      FormSubmit endpoint constants.
  data/
    businesses.ts                 Current business source of truth.
    corporateContent.ts           Null vision and draft values.
    milestones.ts                 Placeholder timeline.
    pressItems.ts                 Empty press data.
    brands.ts                     Legacy brand data, stale against businesses.
    gallery.ts                    Public SVG placeholder gallery data.
    locations.ts                  Legacy location data with null lat/lng.
    testimonials.ts               Draft testimonial data.
  lib/
    cn.ts                         Class name join helper.
    schemas.ts                    Zod schemas and bookable brands.
    site-data.ts                  Form endpoint constants/aliases.
  pages/
    HomePage.tsx
    AboutPage.tsx
    BusinessDirectoryPage.tsx
    BusinessDetailPage.tsx
    BrandPage.tsx                 Legacy route.
    BookingPage.tsx
    ContactPage.tsx
    CareersPage.tsx
    PressPage.tsx
```

Public assets:

```text
public/
  favicon.svg                     Default-looking Vite-style purple favicon, likely off-brand.
  icons.svg                       Social icon sprite.
  gallery/*.svg                   Placeholder public SVGs still used by active homepage hero and legacy components.
  press/*.svg                     Placeholder press SVGs, unused because press data is empty.
```

Messy/disorganized areas:

- Two data models compete: `businesses.ts` current and `brands.ts`/`locations.ts` legacy.
- Two global CSS systems compete: `hg-*` and `corporate-*`.
- Generated CSS is committed as `src/index.css` and imported before custom CSS.
- Assets mix real imported module assets and public string paths.
- Many unused components remain beside active components with no `legacy/` folder separation.

## 7. Dependencies Related to UI

Installed UI/frontend packages from `package.json`:

- `react`, `react-dom`: used.
- `react-router-dom`: used for all routing and links.
- `framer-motion`: used by `App.tsx`, `PageTransition`, `PageReveal`, `ScrollProgressBar`, `CursorFollower`, `MotifField`.
- `motion`: used as `motion/react` by `ContactForm` and `BookingForm`. This duplicates animation package role with `framer-motion`.
- `@tanstack/react-query`: used for contact/booking mutations and app provider.
- `react-hook-form`: used by contact/booking forms.
- `zod`: used in `src/lib/schemas.ts`.
- `@hookform/resolvers`: used for Zod resolver.
- `tailwindcss` and `@tailwindcss/vite`: Tailwind output/utilities are present, but there is no obvious `@import "tailwindcss"` source file in the inspected files; `src/index.css` appears generated/minified and committed.
- `@radix-ui/react-label`: installed, no usage found in `src`.
- `@radix-ui/react-select`: installed, no usage found in `src`; contact form uses native `<select>`.
- `@types/node`: installed as dependency, not UI-related at runtime.
- Test UI packages: `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`, `jsdom`, `vitest`; used by form tests.
- No icon package such as `lucide-react` is installed. Current icon-like marks are text letters (`D`, `M`, `G`, `I`, `HG`, `X`) or custom SVG motif components.

## 8. Summary of Gaps

Prioritized visual/content issues:

- Replace all public-facing pending/placeholder copy before launch, especially homepage hero media note, vision card, values confirmation notes, corporate contact pending fields, press/careers "Coming Soon", and milestone "Details pending verification."
- Fill corporate contact data in `hnbgCorporateContact`; currently every contact page/footer/home CTA field is pending.
- Remove fake actionable business detail fallbacks (`email@business.com`, `+977 98XXXXXXXX`) or render non-clickable pending states.
- Add/use images for HOMA Nepal and Janeichi Business; import the existing Janeichi logo or provide correct media.
- Decide whether `/brands/:slug` remains live. If not, remove or redirect it; if yes, align `brands.ts`/`locations.ts` with `businesses.ts`.
- Consolidate styling around one system. Prefer `theme.css` tokens plus either `corporate-*` or refactored `hg-*`, not both.
- Clean encoding issues in forms (`Sendingâ€¦`, `â€”`).
- Remove or isolate unused legacy components and unused assets to reduce planning confusion.
- Replace public SVG placeholders (`/gallery/*.svg`, `/press/*.svg`) with real content or remove sections using them.
- Normalize button styles (`hg-button` vs `corporate-button`) and typography (Georgia legacy vs Inter corporate).
- Fix `ContactForm` success UX so the success message is visible after submit.
- Replace inline footer margin style with a class/token.
- Review image sizes: multiple JPGs are 4-9 MB and inflate build output; optimize/compress or use responsive images.
- Update default README content and favicon branding.
