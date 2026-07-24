# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Hokkaido Nepal Business Group Theme Tokens

The centralized corporate theme lives in [`src/theme.css`](./src/theme.css). It is imported globally from [`src/main.tsx`](./src/main.tsx) after `index.css` and `editorial.css`, so these custom properties are available to every page and component.

Use the CSS variables in `src/theme.css` for new page and component styling instead of hardcoding brand colors, typography, business card, section header, button, timeline, header, or footer values.

Key token groups:

- Brand colors: `--color-primary`, `--color-primary-text`, `--color-ink`, `--color-body`, `--color-secondary-text`, `--color-bg`, `--color-bg-alt`
- Typography: `--font-heading`, `--font-body`, `--font-size-body-copy`, `--font-size-section-description`, `--font-size-form-control`
- Buttons: `--button-primary-*`, `--button-secondary-*`, `--button-disabled-*`
- Section headers: `--section-eyebrow-*`, `--section-heading-*`, `--section-description-*`, `--section-divider-color`
- Business cards: `--business-card-*`
- Timeline: `--timeline-*`
- Header and footer: `--header-*`, `--footer-*`

Contrast note: `--color-primary` remains the corporate red for solid CTAs, logo mark accents, active states, and section dividers. `--color-primary-text` is a slightly deeper red for text-only uses, improving WCAG AA contrast on white backgrounds.

## Business Data Source

The single source of truth for HNBG portfolio listings is [`src/data/businesses.ts`](./src/data/businesses.ts). It exports:

- `BusinessCategory`: `Restaurant`, `Retail`, `Trading`, or `Farm & Resort`
- `Business`: schema for name, category, address, phone, email, description, location summary, image, logo, website URL, and verification status
- `businesses`: one entry per HNBG business
- `getBusinessBySlug`: helper for detail pages

Every future homepage grid, Our Businesses directory, and footer business link list should read from `businesses`. Do not hardcode business listings in page components.

The reusable card shell for those listings is [`src/components/BusinessCard.tsx`](./src/components/BusinessCard.tsx). It accepts a single `Business` object and uses the global `.business-card*` classes from `src/theme.css`.

Corporate history milestones live in [`src/data/milestones.ts`](./src/data/milestones.ts). The current entries are placeholders pending verified wording.
