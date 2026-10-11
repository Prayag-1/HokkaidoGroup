# Website review implementation report

The client roadmap work is implemented in code for all six rows, subject to the missing verified content noted below. The Vite app at `http://127.0.0.1:5173/` returns HTTP 200. I could not capture screenshots: the available browser control was unavailable and local headless Chrome/Edge did not launch. Since the requested `Done` status requires verification in both code and the running UI, rows remain `Partial` pending viewport/browser inspection. The requested `docs/client-website-review.md` was absent; I used `C:\Users\nepal\Downloads\dekaud\New folder\Hokkaido_Group_Website_Review_Recommendations.md`, with `CLAUDE_CONTEXT.md` taking precedence.

| Priority | Action | Status (Done / Partial / Not done) | Evidence (files, what you saw) |
|---|---|---|---|
| P1 | Simplify navigation and labels | Partial | Code: `src/config/nav.ts`, `src/components/SiteHeader.tsx`, `src/components/MobileMenu.tsx`; labels, dropdowns, CTA and existing mobile menu are present. Server responds HTTP 200; visual alignment, dropdown and mobile menu were not browser-verified. |
| P1 | Move logos and clarify brand hierarchy | Partial | `src/pages/HomePage.tsx` removes the home logo grid; `src/components/SiteFooter.tsx` has monochrome linked brand marks. Directory/business cards use photos and names. UI placement and logo appearance were not visually verified. |
| P1 | Build consistent restaurant directory and outlet pages | Partial | `src/pages/BusinessDirectoryPage.tsx` filters restaurant records, derives city/neighbourhood filters from address data, has map/directions and separates Beyond Dining. `src/pages/BusinessDetailPage.tsx` includes breadcrumb, intro, optional menu, gallery, contact/map and other locations; per-business title/description are set. Menu and opening-hour fields are intentionally empty in `src/data/businesses.ts`. Interactions/layout were not visually verified. |
| P2 | Reorder homepage and streamline copy | Partial | `src/pages/HomePage.tsx` implements requested section sequence, revised hero, shortened Our Story and hides empty news/review data. New empty sources: `src/data/homeUpdates.ts`, `src/data/guestExperiences.ts`. Rendered ordering and content were not visually verified. |
| P2 | Separate non-dining businesses | Partial | `src/pages/BusinessDirectoryPage.tsx` separates Beyond Dining. `src/pages/AboutPage.tsx` groups canonical businesses under Restaurants, Japanese Lifestyle, Imports & Distribution and Other Ventures. Rendered grouping was not visually verified. |
| P2 | Improve mobile, performance and SEO | Partial | Mobile CSS and shared tap target token in `src/styles/foundation.css`, `src/styles/navigation.css`, `src/styles/editorial.css`, `src/styles/footer-responsive.css`, `src/styles/shared.css`. Removed dot-grid background and replaced four large Express gallery sources with WebP derivatives. SEO work was explicitly excluded. 320/375/768/1280px rendering was not visually verified. |

## Remaining work

- **P1 navigation, logos, directory/outlets; P2 homepage, non-dining and mobile:** visually inspect at 320, 375, 768 and 1280px when browser screenshots are available; exercise nav dropdowns, mobile menu, filters and map. These remain Partial only because this verification could not be performed here.
- Supply verified outlet menus/menu PDFs and opening hours to populate the optional fields; sections and menu buttons remain hidden while those fields are empty.
- Supply verified news entries and review records (restaurant name, client-provided text and Google link) if those sections should appear. No review text was authored.
- SEO intentionally not implemented, per user instruction.

## Phase 1 regression and UI bug review

No screenshot could be captured, so none of the visual defects below were directly seen. The dev server and root HTTP response (200) were seen. Console errors, failed requests, image rendering, link destinations and interactive behavior could not be inspected in a browser.

### Source findings and fixes

- **Header/CTA alignment and narrow-width crowding (source-only risk):** addressed with a three-column desktop header, shared header height/gap/logo tokens, right-side desktop CTA, and compact mobile rules in `src/styles/navigation.css` and `src/styles/foundation.css`. 320px result still needs visual verification.
- **Dropdown/mobile menu behavior (source review only):** dropdown remains accessible through native disclosure; the mobile menu remains present with scrollable viewport panel and focus handling. Its appearance, clipping, focus return and off-screen controls were not visually tested. `src/components/MobileMenu.tsx`, `src/styles/navigation.css`.
- **`100vw` overflow risk:** removed dialog viewport sizing and mobile home-hero `100vw` sizing; detail hero shell uses inherited shell sizing. `src/styles/navigation.css`, `src/styles/footer-responsive.css`. No measured browser overflow result.
- **Tap targets below 44px (source finding):** normalized actionable controls including carousel and directory controls to `--tap-target-size`; fixed the carousel's 36px mobile override. `src/styles/foundation.css`, `src/styles/editorial.css`, `src/styles/shared.css`, `src/styles/navigation.css`.
- **Dot-grid background and heavy images (source finding):** removed the pattern background rules and pointed four Express gallery imports at WebP derivatives made from existing project photography. Original source photos remain. `src/styles/shared.css`, `src/data/businesses.ts`, `src/assets/gallery/Express/*.webp`.
- **Mobile menu viewport/scroll:** source retains a bounded, scrollable dialog panel; no sticky action bar was found in inspected page components. Browser coverage/obscured footer behavior could not be tested.
- **Directory cards, filters, map toggle, breadcrumbs, image overflow, broken links and console/network errors:** code reviewed and responsive rules retained; no live visual/browser verification was possible. No claim is made that network and console checks passed.

## Fix summary

| Bug | Fix | Files |
|---|---|---|
| Header columns/CTA alignment risk | Shared layout tokens and explicit desktop grid alignment | `src/styles/foundation.css`, `src/styles/navigation.css`, `src/components/SiteHeader.tsx` |
| Mobile menu width and usability risks | Removed viewport-width sizing; kept scrollable, focus-managed mobile menu and 44px controls | `src/styles/navigation.css`, `src/components/MobileMenu.tsx` |
| Mobile hero width and stale lower padding | Inherited shell width and removed space reserved for removed hero links | `src/styles/footer-responsive.css`, `src/styles/editorial.css` |
| Controls under 44px | Use shared tap target token, including mobile carousel controls | `src/styles/foundation.css`, `src/styles/shared.css`, `src/styles/editorial.css` |
| Dot-grid and oversized Express gallery source photos | Rice-paper solid surface; WebP derivatives of project photos | `src/styles/shared.css`, `src/data/businesses.ts`, `src/assets/gallery/Express/` |
