# Dependabot Dashboard Copilot Instructions

## Commands

Use npm (the repository includes `package-lock.json`).

```bash
npm run dev                 # Start Next.js with Turbopack
npm run build               # Production build with Turbopack
npm run lint                # ESLint (Next core-web-vitals and TypeScript rules)
npm test -- --run           # Run the complete Vitest suite once
npm test -- --run __tests__/components/organisms/dashboard.test.tsx
                             # Run one test file once
npm test -- --run -t "displays data after successful fetch"
                             # Run a single named test once
npm run test:coverage       # Generate Vitest coverage
```

`npm test` starts Vitest in watch mode; add `-- --run` for a non-interactive run. Tests are discovered only under `__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`.

## Architecture

- This is a Next.js App Router frontend. `src/app/page.tsx` renders the `Dashboard` organism, while `src/app/layout.tsx` supplies global styles, Geist fonts, metadata, and the application-wide `ThemeProvider`.
- The UI follows atomic design: reusable primitives live in `src/components/atoms`, composed display units in `molecules`, and feature-level UI in `organisms`. The `Dashboard` owns data-fetching and loading/error states, then supplies API data to the summary, pull-request list, and repository-error views.
- `src/lib/api.ts` is the client boundary for the external backend. It uses `NEXT_PUBLIC_API_BASE_URL` and calls `GET /api/prs` and `DELETE /api/cache`; the backend is not implemented in this repository. Keep the API response contract in `src/types/apiTypes.ts` synchronized with UI usage.
- Theme state is client-side only. `ThemeProvider` persists `light`, `dark`, or `system` in `localStorage`, resolves system preference via `matchMedia`, and toggles the `dark` class on the document root. Components using browser APIs, hooks, or `useTheme` must remain client components.

## Repository conventions

- Import source modules through the `@/` alias, which maps to `src/`; Vitest resolves the same alias.
- Style components with Tailwind utility classes. Dark-mode styling is class-based (`dark:`) and relies on the provider applying `.dark` to `<html>`.
- Keep API model types in `src/types/apiTypes.ts`; use `import type` when a component only needs a type.
- Component tests use Vitest with React Testing Library and `@testing-library/jest-dom`. Place tests in the mirrored `__tests__/components/<layer>/` structure. Mock external client functions with `vi.mock('@/lib/api', ...)`; components that call `useTheme` are rendered inside `ThemeProvider`.
- `vitest.setup.ts` provides the `window.matchMedia` mock required by theme-related rendering. Do not duplicate that browser-environment setup in individual tests.
