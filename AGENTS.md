# AGENTS.md

This file orients coding agents to this repository.
Keep updates consistent with existing patterns.

Repository snapshot
- Stack: React 19 + TypeScript + Vite 6 + Tailwind CSS v4
- Package manager: npm (per README)
- Module system: ESM (package.json "type": "module")
- Styling: Tailwind utilities + custom tokens in `src/styles/index.css`
- Content source of truth: `src/data/siteData.ts`

Cursor/Copilot rules
- No Cursor rules detected (.cursorrules or .cursor/rules/)
- No Copilot rules detected (.github/copilot-instructions.md)

Install
```bash
npm install
```

Common commands
- Dev server:
```bash
npm run dev
```
- Production build (includes typecheck via tsc -b):
```bash
npm run build
```
- Preview production build:
```bash
npm run preview
```

Linting and formatting
- No lint script configured in package.json
- No ESLint/Prettier/Biome config found
- Formatting is manual; follow existing code style

Tests
- No test runner configured
- No test files found
- Single-test execution: not applicable until a test framework is added

Where to edit content
- Primary content file: `src/data/siteData.ts`
- Media assets: `public/media/`
- Logos: `src/assets/logos/`

TypeScript configuration (key constraints)
- Strict mode enabled
- noUnusedLocals/noUnusedParameters enabled
- noUncheckedSideEffectImports enabled
- JSX: react-jsx
- Path alias: `@/*` -> `src/*`

Import style
- Order: React/3rd-party first, then local modules
- Prefer `import type` for types (see `src/components/ui/Button.tsx`)
- Use relative imports within `src/` unless alias `@` improves clarity
- Keep import lists compact and sorted by origin

Component style
- Functional components only
- Use named exports for components; default export used for `App`
- Props declared as `interface` or `type` above the component
- Prefer `const` for local values and arrays
- Keep hooks at the top of the component

Tailwind and styling conventions
- Prefer Tailwind utility classes for layout and visuals
- Use tokens in `src/styles/index.css` (colors, fonts)
- Class composition uses string arrays + `.join(" ")` when needed
- Dark mode uses `.dark` class on `<html>` (see `@custom-variant dark`)
- Respect `prefers-reduced-motion` patterns already used

Naming conventions
- Components: PascalCase (e.g., `Header`, `WhatsAppFloat`)
- Hooks: `useSomething` in `src/hooks/`
- Data exports: camelCase constants in `src/data/siteData.ts`
- Files: PascalCase for components, camelCase for hooks/data

Types and data modeling
- Prefer explicit interfaces for structured data (services/products/etc.)
- Union types for constrained options (e.g., `"image" | "video"`)
- Avoid `any`; use `unknown` + narrowing when needed
- Keep data arrays typed and exported from `siteData.ts`

Error handling and safety
- Guard DOM lookups or use non-null assertion when guaranteed
- Use optional chaining for optional props/callbacks
- Cleanup side effects in `useEffect` (remove listeners, reset styles)
- Avoid side-effectful imports due to `noUncheckedSideEffectImports`

Accessibility expectations
- Preserve existing focus styles and skip links
- Buttons/links have aria labels when icon-only
- Respect keyboard navigation in overlays/drawers

Layout and structure
- Top-level sections in `src/components/sections/`
- Layout primitives in `src/components/layout/`
- Reusable UI in `src/components/ui/`
- App composition in `src/App.tsx`

Editing guidance
- Keep Spanish copy style consistent with existing text
- Prefer minimal changes in UI structure unless required
- Match existing className patterns (spacing, color tokens)
- Avoid introducing new dependencies unless necessary

Single-test guidance (if a test runner is added)
- Add an npm script for tests and document single-test execution here
- Example patterns to consider (choose one when added):
  - Vitest: `npm run test -- -t "test name"` or `npm run test -- path`
  - Jest: `npm run test -- -t "test name"` or `npm run test -- path`
  - Playwright: `npx playwright test path` or `--grep`

Agent checklist before submitting changes
- Ensure builds still run: `npm run build`
- Avoid unused imports/locals (TS strict rules)
- Verify Tailwind classes and dark-mode variants look intentional
- Confirm content edits are only in `src/data/siteData.ts` when possible
