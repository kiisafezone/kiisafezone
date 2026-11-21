# KII — Portfolio

The personal portfolio of KII, also known as kiisafezone.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev` — start the development server
- `npm run typecheck` — run TypeScript checks
- `npm run build` — create a production build
- `npm run start` — serve the production build

## Continuous integration

GitHub Actions runs dependency installation, TypeScript checks, and a
production build for changes under `website/` on `main` and on pull requests.

The portfolio is intentionally isolated in this directory. The repository's
root profile README and the existing `showcase/` project remain separate.
