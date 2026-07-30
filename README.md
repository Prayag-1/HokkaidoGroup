# Hokkaido Nepal Business Group Website

Corporate website for Hokkaido Nepal Business Group, built with React, TypeScript, Vite, React Router, React Hook Form, Zod, TanStack Query, Framer Motion, Radix UI primitives, Lucide icons, and a custom token-driven CSS system.

## Commands

- `npm install` - install dependencies
- `npm run dev` - start the local Vite server
- `npm run lint` - run ESLint
- `npm exec vitest run` - run the test suite
- `npm run build` - create a production build

## Project Structure

- `src/App.tsx` - route configuration and route transition shell
- `src/pages/` - page-level route components
- `src/components/` - shared UI components, forms, header, footer, transitions
- `src/data/businesses.ts` - canonical business portfolio data
- `src/data/milestones.ts` - company milestone data
- `src/data/pressItems.ts` - verified press/news source
- `src/lib/schemas.ts` - form validation schemas
- `src/lib/site-data.ts` - Formspree endpoint wiring
- `src/theme.css` - canonical design tokens and global component styles
- `src/assets/gallery/` - real business imagery imported through Vite
- `public/favicon.svg` - brand favicon

## Design System

The canonical design system lives in `src/theme.css`. New UI should use existing CSS variables for color, spacing, type, motion, elevation, radius, and focus states. Avoid reintroducing legacy `hg-*` classes, ad hoc Tailwind utility styling in component markup, or parallel theme token blocks.

## Data Rules

Business pages and listings should read from `src/data/businesses.ts`. Do not recreate a second brand/location model. Do not invent contact details, testimonials, mission copy, or press items; use the shared pending/empty-state components until verified content exists.

## Forms

Contact and booking forms use React Hook Form, Zod schemas, TanStack Query mutations, Radix Label/Select where appropriate, and shared success/error status treatments. Do not change Formspree endpoints or validation schemas unless the backend contract changes.
