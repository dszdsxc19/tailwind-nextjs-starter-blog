# Repository Guidelines

## Project Structure & Module Organization
- `app/` hosts App Router entries, route layouts, and MDX-driven pages rendered through Contentlayer. Keep server components and metadata colocated with their routes.
- `components/` contains reusable UI primitives written in TypeScript/TSX; `layouts/` wraps blog and marketing surfaces. Share logic via hooks in `components` or future `lib/` modules.
- `data/` stores markdown content, author profiles, and taxonomies consumed by `contentlayer.config.ts`. Reference static assets from `public/` using relative paths.
- `css/` centralizes Tailwind entry points (`tailwind.css`, `prism.css`). Define design tokens and layer directives here instead of scattering inline styles.
- `scripts/` keeps build helpers such as `postbuild.mjs`; add future automation scripts in this directory for discoverability.

## Build, Test, and Development Commands
- `yarn install` bootstraps dependencies under Yarn 3 Plug'n'Play. Avoid `npm install` to prevent lockfile drift.
- `yarn dev` starts the Next.js development server and watches Contentlayer sources for live reload.
- `yarn build` creates the production bundle and runs the sitemap/feed generator; treat this as the mandatory regression check.
- `yarn serve` serves the already built output for local QA.
- `yarn lint` fixes ESLint issues across `app`, `components`, `layouts`, `scripts`, and legacy directories such as `pages/` if present.
- `yarn analyze` builds with `ANALYZE=true` to inspect bundle composition before shipping.

## Coding Style & Naming Conventions
- Prettier (configured in `prettier.config.js`) enforces 2-space indentation and Tailwind class sorting; run `yarn lint` or `prettier --write` before committing.
- Favor functional React components and server components where possible; prefer named exports except for Next.js `page.tsx` defaults.
- Use `PascalCase` for components/layouts (`components/Hero.tsx`), `camelCase` for utilities, and kebab-case for content files in `data/`.
- Keep Tailwind utilities within `className` strings; extend design tokens via `css/tailwind.css` instead of inline styles.

## Testing Guidelines
- No formal test harness ships with this starter. Rely on `yarn build` for compile-time coverage and manually validate critical flows (home page, post detail, RSS, sitemap) after content updates.
- If introducing automated tests, colocate `.test.tsx` files with the component under test and document any new tooling or scripts within this guide.

## Commit & Pull Request Guidelines
- Follow conventional commit prefixes (`feat:`, `fix:`, `chore:`) as reflected in git history; keep subjects under 80 characters with concise English or Chinese context in the body when needed.
- Husky + lint-staged run ESLint and Prettier on staged files; resolve issues locally before pushing to keep CI clean.
- PRs should include a summary, screenshots for UI changes, notes on Contentlayer/front matter updates, and linked issues or discussions.
- Confirm `yarn lint` and `yarn build` succeed before requesting review; attach command output when altering tooling or deployment behavior.
