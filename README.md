# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Hokkaido Nepal Tokens

Source of truth for the visual system lives in [`tailwind.config.ts`](./tailwind.config.ts).

- Colors
  - `ink` `#1B2A4A`
  - `paper` `#F7F5F0`
  - `vermillion` `#C0442C`
  - `matcha` `#5B7553`
  - `charcoal` `#2B2B2B`
  - `stone` `#D8D3C8`
- Typography
  - `fontFamily.display`: `Zen Kaku Gothic New` with `Inter Tight` and `Inter` fallback
  - `fontFamily.body`: `Inter`
  - `fontFamily.label`: `Inter`
- Type scale
  - `caption`, `label`, `body`, `lead`, `title`, `display`, `hero`
- Spacing
  - Extended whitespace tokens from `18` through `128` for generous `ma`
- Motif components
  - `SnowflakeMark`
  - `SakuraMark`
  - `RiceStalkMark`
  - `SectionDivider`
  - `MotifField`
- Motion
  - `PageReveal` for route/page fade-rise transitions
