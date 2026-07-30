# DrawnKit

DrawnKit is a curated hand-drawn AI prompt studio for creating consistent illustrations across stories, lessons, newsletters and products.

## Product

- 20 field-tested visual recipes
- Free browser-based prompt generator
- Static SEO pages for every style
- Waffo Pancake one-time checkout integration
- Safe payment degradation when credentials are not configured
- Responsive, accessible Apple-inspired interface

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` to configure payments. Waffo credentials are server-only and must never be exposed with a `NEXT_PUBLIC_` prefix.

## Quality gates

```bash
npm run lint
npm run typecheck
npm run build
```

## Deployment

The repository is connected to Vercel. Every push to `main` runs GitHub Actions quality checks and triggers a production deployment through the Vercel Git integration.

