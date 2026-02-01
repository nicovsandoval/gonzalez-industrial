# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for **Gonzalez Industrial**, an industrial workshop. Spanish-language site. Single-page app using hash-anchor navigation (no router).

**Stack:** React 19 + TypeScript 5.7 + Vite 6 + Tailwind CSS v4 + Lucide React icons

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server at localhost:5173
npm run build        # TypeScript check (tsc -b) + Vite build → dist/
npm run preview      # Preview production build locally
```

No linter, formatter, or test runner is configured.

## Architecture

**Data-driven SPA:** All editable content lives in `src/data/siteData.ts` — services, products, gallery items, contact info, hero text, etc. Section components read from this file. To change site content, edit `siteData.ts`, not individual components.

**Component organization:**
- `src/components/sections/` — Full-page sections (Hero, Services, Products, Gallery, Contact, etc.) composed in `src/App.tsx`
- `src/components/layout/` — Header (sticky nav with mobile drawer) and Footer
- `src/components/ui/` — Reusable primitives (Button, Badge, Icon, Logo, Lightbox, etc.)
- `src/hooks/` — `useTheme` (dark mode + localStorage), `useScrollSpy` (active nav section via IntersectionObserver), `useReducedMotion`

**Dark mode:** Class-based (`.dark` on `<html>`), not media-query. Configured via `@custom-variant dark` in `src/styles/index.css`. Anti-flash inline script in `index.html` applies theme before React hydrates. `useTheme` hook manages state with localStorage persistence and system preference fallback.

**Styling tokens** are defined in `src/styles/index.css`: `--color-primary` (#15401A), `--color-primary-light` (#61A75E), `--color-dark` (#1A1A1A), `--font-oswald`, `--font-body`.

**Icon system:** `src/components/ui/Icon.tsx` maps string names to lucide-react components. Icons referenced in `siteData.ts` must be whitelisted in this mapper.

**Path alias:** `@/*` maps to `src/*` (configured in tsconfig and vite.config.ts).

**Build:** Vite splits `react` + `react-dom` into a separate vendor chunk via `manualChunks`.

## Conventions

- **Functional components only**, named exports (except `App` which is default export)
- **Props:** Declared as `interface` above the component
- **Imports:** React/3rd-party first, then local modules. Use `import type` for type-only imports
- **TypeScript strict mode** with `noUnusedLocals`, `noUnusedParameters`, `noUncheckedSideEffectImports`
- **No `any`** — use `unknown` + type narrowing
- **Tailwind utilities** for all styling; no CSS modules or inline styles (except animation-related)
- **Spanish copy** — maintain consistent Spanish language style in all content
- **Accessibility:** Preserve skip links, focus styles, aria labels on icon-only buttons, keyboard navigation in overlays, and `prefers-reduced-motion` support
- **Minimal changes:** Avoid introducing new dependencies or restructuring UI unless required
- **Content edits** go in `siteData.ts`; media in `public/media/`; logos in `src/assets/logos/`

## Pre-submit Checklist

- `npm run build` succeeds (catches type errors and unused imports)
- Dark mode variants applied where needed
- New icons added to the Icon mapper if referenced from data
