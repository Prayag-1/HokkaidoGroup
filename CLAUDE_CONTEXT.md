# Hokkaido Group Website — Complete Claude Context

## Read This First

This is the project-wide source of context for Claude. Read it before making changes. It describes what the site is, what is currently live, where canonical data lives, the intended design direction, and the constraints that must be preserved.

This file is context, not an automatic instruction to redesign the entire repository. Follow the user's current prompt, inspect the relevant files, make the smallest coherent change, and preserve unrelated work.

## Product and Audience

Hokkaido Group is a Nepal-based group of Japanese-inspired businesses. The website represents the parent group rather than a single restaurant. Its portfolio currently covers:

- Japanese restaurants and dining concepts
- Japanese retail through HOMA Nepal
- Import and trading through Janeichi Business
- Farm, resort, wellness, and onsen experiences through Hokkaido Dekkaido

The site serves several audiences:

- Guests choosing a restaurant or contacting a venue
- Travelers and hotel guests
- Corporate diners and event planners
- Retail customers
- Suppliers and prospective business partners
- People learning about the group and its brands
- Future job candidates when Careers becomes active

The product should communicate credibility, care, quality, authenticity, and the connection between Japanese hospitality and Nepalese communities.

## Brand and Experience Direction

The desired experience is premium Japanese editorial hospitality: calm, warm, image-led, precise, and restrained. It is not a generic restaurant landing page and should not become a loud or stereotypical “Japan” theme.

Use:

- generous negative space
- an editorial hierarchy
- dark ink and warm rice-paper surfaces
- restrained vermillion, moss, amber, blue, and wood accents
- thin rules and careful alignment
- real project-owned photography
- natural-material and quiet-paper textures
- subtle asymmetry
- calm, meaningful motion
- clear English hospitality language
- Japanese details only when they add genuine meaning

Avoid:

- generic purple gradients
- fake brush fonts
- anime or manga styling
- decorative kanji without explanation
- excessive torii gates, red circles, lanterns, or cherry blossoms
- dense card-on-card layouts
- glassmorphism and excessive rounded pills
- animation that competes with content
- huge marketing copy that obscures the actual businesses
- invented facts, awards, milestones, testimonials, press, vacancies, or contact details
- copied layouts, text, logos, patterns, or images from reference sites

Japanese terms can be used sparingly when appropriate, but always include English context. Useful concepts include `おもてなし` / omotenashi (hospitality and care), `季節` / kisetsu (seasonality), `手仕事` / teshi-goto (craft), `余白` / yohaku (meaningful space), and `間` / ma (pause and interval).

## Technology

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- React Hook Form
- Zod
- Radix Label and Select primitives
- Framer Motion
- Leaflet and React Leaflet
- Lucide icons
- Plain CSS with a centralized token system
- Vitest and Testing Library
- ESLint

Common commands:

```bash
npm install
npm run dev
npm run lint
npm exec vitest run
npm run build
npm run preview
```

There is no Tailwind setup. Do not introduce Tailwind utility classes or a second styling system unless the user explicitly requests a migration.

## Dependency Policy

Keep the dependency set small. Before installing anything, check whether the requirement can be handled by React, CSS, a browser API, or an already-installed package.

The current runtime dependencies are in active use:

- `react`, `react-dom`: application runtime
- `react-router-dom`: routing and links
- `framer-motion`: page transitions, reduced-motion-aware animation, and interactive motion
- `@tanstack/react-query`: form submission mutations
- `react-hook-form`, `@hookform/resolvers`, `zod`: form state and validation
- `@radix-ui/react-label`, `@radix-ui/react-select`: accessible form primitives
- `leaflet`, `react-leaflet`: the location map
- `lucide-react`: interface icons

Do not add Lenis, tsParticles, React Icons, or additional animation/icon libraries merely for decoration. Add a package only when the current user request truly requires it and the benefit justifies bundle cost. Prefer Lucide for icons and CSS/Framer Motion for restrained effects.

Type packages such as `@types/node` and `@types/leaflet` belong to development tooling even if they are currently listed under `dependencies`; moving them must be done carefully with a lockfile update and validation.

## Application Entry and Routing

- `src/main.tsx` mounts the React app in `StrictMode` and imports global CSS.
- `src/App.tsx` owns the router, shared header, route transitions, lazy page loading, Suspense fallback, scroll restoration, and the shared Query Client.

Currently active routes:

| Route | Page | Status |
| --- | --- | --- |
| `/` | `HomePage` | Active |
| `/about` | `AboutPage` | Active |
| `/businesses` | `BusinessDirectoryPage` | Active |
| `/businesses/:slug` | `BusinessDetailPage` | Active |
| `/contact` | `ContactPage` | Active |

Currently redirected routes:

| Route | Current behavior |
| --- | --- |
| `/careers` | Redirects to `/` |
| `/press` | Redirects to `/` |
| `/booking` | Redirects to `/` |
| unknown paths | Redirect to `/` |

`CareersPage.tsx`, `PressPage.tsx`, and `BookingPage.tsx` exist in source but are not currently reachable through routing. Do not describe them as live or add navigation links until their routes and content are intentionally activated.

## Current Page Responsibilities

- `HomePage.tsx`: cinematic image hero, group introduction, featured businesses, business divisions, pending updates, and a lazy-loaded location section.
- `AboutPage.tsx`: group story and vision, founder imagery, and brand overview.
- `BusinessDirectoryPage.tsx`: category-filtered directory sourced from canonical business data.
- `BusinessDetailPage.tsx`: per-business detail, gallery, contact actions, and location content resolved by slug.
- `ContactPage.tsx`: group/brand contact discovery using verified repository data and existing contact helpers.
- `CareersPage.tsx`: placeholder only; currently redirected and not public.
- `PressPage.tsx`: verified-item/empty state; currently redirected and not public.
- `BookingPage.tsx`: booking-request interface; currently redirected and not public.

## Canonical Data and Content

### Businesses

`src/data/businesses.ts` is the single source of truth for business records, categories, logos, gallery images, location fields, featured state, and verification state.

Current entries include:

- Hokkaido Ramen House
- Hokkaido House
- Hokkaido Umami
- Hokkaido Sora
- Hokkaido Izakaya
- Hokkaido Pokhara
- Hokkaido Yakitori
- Hokkaido Dekkaido
- HOMA Nepal
- Janeichi Business

Do not create a second business/location dataset inside a page or component. Reuse `businesses`, `featuredBusinesses`, `businessCategories`, and `getBusinessBySlug`.

Several records contain useful addresses, phone numbers, emails, descriptions, and map queries while their `verified` flags remain false. Preserve the current verification model. Do not silently change verification flags or expand claims without a verified source supplied by the user.

### Corporate copy

`src/data/corporateContent.ts` contains shared vision copy. Reuse it where appropriate instead of creating divergent descriptions of the group.

### Press

`src/data/pressItems.ts` is the canonical press source. It is currently empty. Only `verified` press items should be displayed.

### Forms and endpoints

- `src/lib/schemas.ts` owns Zod form schemas and bookable-brand definitions.
- `src/lib/site-data.ts` owns current per-brand booking and contact Formspree endpoint wiring.
- `src/config/forms.ts` also contains older/general Formspree configuration; inspect usages before changing or consolidating it.
- `src/lib/contactLinks.ts` builds brand WhatsApp and Gmail contact URLs.

Do not replace endpoints, change field contracts, or expose environment secrets. Placeholder Formspree IDs indicate that deployment configuration is still required.

Never invent:

- reviews or testimonials
- awards or press coverage
- business performance numbers
- employee stories or open roles
- salaries or benefits
- corporate contact details
- social links
- locations, coordinates, or milestones

Use an honest empty/pending state when verified content is missing.

## Component Architecture

Important shared components:

- `SiteHeader`: desktop navigation, current-route handling, brand identity, and mobile-menu trigger
- `MobileMenu`: responsive navigation and motion
- `SiteFooter`: company/support links and verified business/contact information
- `PageTransition`: route-level Framer Motion wrapper
- `ScrollReveal`: intersection-based reveal with reduced-motion support
- `SectionSurface`: semantic reusable ink/rice-paper section wrapper
- `BusinessCard`: shared business preview card
- `CategoryDivisionBand`: business-category navigation/summary
- `LocationSpotlight`: Leaflet map and location browsing
- `ContactForm`, `BookingForm`: validated async forms
- `SelectField`, `FormStatus`: shared form UI
- `EmptyState`, `PendingNotice`: truthful placeholders for missing/unverified content

Reuse these components where their behavior fits. Extract new components only when they have a clear responsibility or reuse value; do not fragment a simple page into decorative abstractions.

## Styling System

Global imports flow through:

```text
src/main.tsx
  -> src/index.css
  -> src/theme.css
       -> src/styles/foundation.css
       -> src/styles/navigation.css
       -> src/styles/shared.css
       -> src/styles/contact.css
       -> src/styles/pages.css
       -> src/styles/footer-responsive.css
```

`src/styles/foundation.css` is the canonical source for design tokens and global surface behavior. It defines:

- ink and rice-paper palettes
- accent colors
- surface and text aliases
- spacing scale
- typography scale
- motion duration/easing
- elevation
- radii
- button tokens
- header/footer tokens
- `data-surface="ink"` and `data-surface="rice-paper"` contexts

Current fonts are loaded in `src/index.css` from Google Fonts:

- `Noto Serif JP` for headings
- `DM Sans` for body/interface text

Do not add a parallel `tokens.css` file or duplicate `:root` theme unless an intentional design-system migration is requested. Extend existing tokens in `foundation.css` when needed.

Prefer existing `corporate-*`, `section-header*`, page-specific, and surface classes. Avoid inline styling except for dynamic values such as imported background-image URLs.

## Motion and Accessibility

- Respect `prefers-reduced-motion` for every animation.
- Reuse `useReducedMotion`, `ScrollReveal`, and `PageTransition` where appropriate.
- Motion should clarify hierarchy or state, not exist continuously as decoration.
- Keep keyboard focus visible.
- Use semantic landmarks and heading order.
- Use descriptive alt text for meaningful images and empty alt text only for genuinely decorative images.
- Do not let overlays or decorative layers capture pointer events.
- Maintain readable contrast on both ink and rice-paper surfaces.
- Test responsive behavior from a 320 px viewport upward.

## Assets and Repository Size

Project-owned assets live under:

- `src/assets/gallery/`: business and editorial photography
- `src/assets/logo/`: group and business logos
- `src/assets/patterns/`: Japanese-inspired SVG background patterns
- `public/`: public/static assets such as the favicon image

Most gallery photos are WebP and are imported through Vite. Eight unused 3840×2160 branch PNG source files (roughly 137 MB) were moved out of `src/assets/` to the ignored local-only directory `local-assets/branches-source/`. They are not imported by current source code and will not be pushed to Git. If one is needed later, convert it to an appropriately sized WebP/AVIF before placing the optimized result in `src/assets/`; do not import the 4K PNG source directly.

Generated browser profiles (`.tmp-edge-*`), root-level visual-review screenshots, build output, logs, coverage, and editor caches do not belong in Git. The `.gitignore` should keep them out. If generated files are already tracked, adding an ignore rule alone does not remove them from Git history/index; remove tracked copies in a deliberate cleanup commit.

When adding new images:

- use project-owned or explicitly licensed assets
- preserve source/license information where applicable
- resize to the maximum rendered dimensions
- prefer WebP or AVIF for photographs
- avoid shipping multi-megabyte images for card-sized placements
- provide stable width/height or aspect ratio to reduce layout shift
- lazy-load below-the-fold imagery
- do not copy assets directly from design-reference websites

## Reference Sites

Use these only for general design principles, never for copying:

- HOSHINOYA: cinematic premium hospitality and seasonal atmosphere
- Kyoto Travel: calm cultural storytelling
- ANA Japan Travel Planner: image-led regional discovery
- MUJI Japan: restraint, material feeling, and disciplined grids
- Suntory: Japanese corporate storytelling
- JAPAN HOUSE: contemporary international presentation of Japanese culture
- Japan National Tourism Organization: destination and seasonal photography
- teamLab and KAYAC: selective motion/storytelling inspiration only; this site should remain much calmer

## Git and File-Safety Rules

- Preserve user changes and inspect `git status` before editing.
- Do not use `git reset --hard`, destructive checkout, or broad cleanup commands.
- Do not commit generated browser profiles, build folders, logs, coverage, or review screenshots.
- Do not delete real brand assets solely because they are large; confirm whether they are source masters, then optimize or archive deliberately.
- Keep secrets and local environment values out of Git. Commit `.env.example` only when documenting variable names with safe placeholder values.
- Avoid unrelated formatting churn.
- Do not commit or push unless the user explicitly asks.

## Working Method

1. Read this file and the user's current request.
2. Inspect `git status`, the owning page/component, the relevant data source, and the nearest stylesheet.
3. Confirm current behavior rather than trusting old README descriptions.
4. Form a local implementation hypothesis.
5. Make the smallest coherent edit.
6. Run a focused check after the first meaningful change.
7. Run the full relevant validation suite.
8. Review the diff for accidental churn, unverified claims, and oversized/generated artifacts.
9. Report exactly what changed and what was actually validated.

## Validation Standard

For shared UI, route, dependency, or design-system work, normally run:

```bash
npm run lint
npm exec vitest run
npm run build
```

When browser access is available, also verify:

- desktop and mobile layout
- header, mobile menu, and footer
- route and hash navigation
- text wrapping and overflow
- keyboard interaction and focus
- reduced-motion behavior
- image cropping and loading
- forms and status states
- console errors and failed requests

Do not claim a browser check unless it was actually performed.

## Definition of Quality

A successful change feels intentional and specific to Hokkaido Group. It preserves the truthfulness of the data, works across screen sizes, remains accessible, avoids unnecessary dependencies and oversized assets, and looks like a credible premium hospitality group rather than a generic AI-generated Japanese theme.

## How Claude Should Respond

Be concise and practical. Lead with the result. Mention the exact files changed and the checks run. Clearly separate completed work from recommendations or remaining decisions. Never claim tests, builds, visual checks, or external verification that did not actually happen.
