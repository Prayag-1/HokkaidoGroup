# Round 3 handoff

## Completed changes

- `src/data/businesses.ts`: canonical categories are Restaurant, Skin Care, Imports, and General. Dekkaido's General category is explicitly provisional. Added the client-confirmed menu phone, 9801011301, and HOMA logo dimensions. Included every available restaurant photograph in its gallery; removed logos from photographic galleries. Verification flags and existing business copy/contact records remain unchanged.
- `src/components/MobileMenu.tsx`, `GroupContact.tsx`, `src/config/nav.ts`: menu groups now come from canonical categories. The menu phone is updated, its existing Ramen House email is retained, and Dekkaido's navigation label is its name. The original menu had no street address to replace. Footer phone remains unchanged.
- `src/components/BusinessImage.tsx`: shared fixed-aspect image frames with `object-fit: cover`; logos retain their native aspect ratio inside the frame. HOMA is capped at its 248px source width. Used in the home brand strip, menu, directory, shared business cards, brand pages, and map preview.
- `src/components/OutletPhotos.tsx`, `BusinessCard.tsx`, `src/pages/BusinessDirectoryPage.tsx`, `HomePage.tsx`: additional outlet photographs in scrollable, keyboard-focusable card strips. No added image assets or dependencies.
- `src/pages/AboutPage.tsx`: gallery wall expanded from six photos to all 31 outlet photos in the canonical records, including Yakitori and Dekkaido.
- `src/pages/BusinessDetailPage.tsx`: Ramen House gallery now includes all three photos; Hokkaido House includes all four. Umami, Sora, Izakaya, Pokhara, and Yakitori already used all four available photos; no additional distinct files exist for these outlets. Restaurant galleries no longer inherit the automatic scrolling animation. HOMA and Janeichi route to their dedicated layouts.
- `src/pages/JaneichiPage.tsx`: breadcrumb, wide banner placeholder with uncropped logo, title and existing subtitle, existing profile copy, highlighted description, supporting-photo placeholder, telephone link, and Inquiry Now anchor to the shared form preselected to Janeichi. No invented quote, testimonial, or long-form paragraphs.
- `src/pages/MartPage.tsx`: shared by `/mart` and `/businesses/hokkaido-mart`; intro, hero placeholder, Kamaladi outlet card, inquiry CTA, and the existing `LocationSpotlight` component at the bottom. Official website links will open directly with `target="_blank" rel="noopener noreferrer"` when `websiteUrl` is supplied. Until then, the card links to location/contact information.
- `src/components/LocationSpotlight.tsx`: shared image treatment, a single-location layout, and disabled redundant arrows for single-location maps.
- `src/components/ContactForm.tsx`: optional initial brand selection, preserving the existing form endpoint and payload contract.
- `src/components/CategoryDivisionBand.tsx`, `src/lib/contactLinks.ts`: updated category consumers while preserving appropriate product/visit inquiries.
- `src/styles/editorial.css`: image frames, gallery strips, brand layouts, responsive styling, and single-location map sizing.
- `src/components/MobileMenu.test.tsx`, `ContactForm.test.tsx`: regressions for menu categories/contact retention and Janeichi inquiry preselection.
- `vite.config.ts`: uses `defineConfig` from `vitest/config` so the existing test configuration passes TypeScript.

Layout references, used only for structure: [Roadhouse Mart](https://www.roadhousenepal.com/mart) and [Roadhouse Franchises](https://www.roadhousenepal.com/franchises). No reference assets or copy were imported.

## Client decisions and content needed

1. Confirm Dekkaido's final category. It is visible under **General** for now. Its pre-existing description still mentions onsen/resort activities; those claims were not expanded or rewritten.
2. Provide HOMA's official website URL. The external-link behavior is ready, but no URL was guessed.
3. Confirm whether HOMA has branches beyond Kamaladi. For each additional branch, provide name, address/map link, approved short description, photograph, and direct URL if available. Only Kamaladi is currently on file.
4. Provide HOMA hero/store photography and a Kamaladi branch photo. Product photography and a higher-resolution logo would also help; the current logo is only **248 × 204** and is unsuitable as a full-width hero photograph.
5. Provide Janeichi's wide banner photo and supporting product/sourcing/distribution photo. Its only image is a **1200 × 1200 logo**, suitable for a logo frame but not a photographic banner.
6. Provide approved Janeichi long-form copy: sourcing/import process, product range, distribution coverage, and business inquiry details, where supported. Existing copy was retained; no claims were added to fill the layout.
7. Supply additional outlet photography if galleries should grow beyond the inventory below. Ramen House needs at least one more distinct photo to reach four. Hokkaido House needs a higher-resolution replacement for `house2.webp` (only **288 × 288**, visibly limited at larger sizes). Other outlets have no unused photography on file; additional photos must come from the client.

| Outlet | All photography currently available and used |
| --- | --- |
| Hokkaido Ramen House | `ramenhouse1.webp`, `ramenhouse2.webp`, `ramenhouse3.webp` (3) |
| Hokkaido House | `house0.webp`, `house1.webp`, `house2.webp`, `house3.webp` (4) |
| Hokkaido Umami | `umami1.webp`–`umami4.webp` (4) |
| Hokkaido Sora | `sora1.webp`–`sora4.webp` (4) |
| Hokkaido Izakaya | `Izakaya1.webp`, `izakaya2.webp`–`izakaya4.webp` (4) |
| Hokkaido Pokhara | `pokhara1.webp`–`pokhara4.webp` (4) |
| Hokkaido Yakitori | `yakitori1.webp`–`yakitori4.webp` (4) |
| Hokkaido Dekkaido | `dekkaido1.webp`–`dekkaido4.webp` (4) |

All listed photographs are under `src/assets/gallery/` in their existing outlet folders. The photo wall and cards reuse these files; no image was invented or attributed to another outlet.

## Validation

- ESLint, TypeScript (`tsc -b`), all 8 Vitest tests, and production build passed.
- Browser checks at **375, 768, 1280**: menu, Janeichi, HOMA detail route and `/mart`, directory, home, and about. Checked horizontal overflow, image loading, logo proportions, menu groups/phone, Escape close and focus return.
- Visually reviewed menu and both brand pages at all three widths. HOMA's Google map loaded; location anchor and Janeichi inquiry anchor were exercised. No live inquiry was submitted.
- Form delivery remains dependent on the existing `VITE_FORMSPREE_CONTACT_ID` configuration. The repository fallback is a placeholder; mocked test success does not verify delivery.
- Browser screenshots and results are in ignored `.audit/round3-*` files. No commit or push was performed.
