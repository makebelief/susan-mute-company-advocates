# Susan Mute & Company Advocates

Production-ready static website preserving the Cecilia Mwaura & Co. Advocates UI language while applying Susan Mute & Company Advocates branding and current client content.

## Production characteristics
- Mobile-first responsive layout and compact floating phone/WhatsApp rail
- Static architecture: no public database, login surface, or server-side form handler
- Strict Cloudflare Pages security headers and CSP
- Optimized 30fps web logo animation (~0.5 MB) derived from the supplied 4K60 master
- Optimized founder portrait and local branding assets
- SEO metadata, Open Graph card, LegalService structured data, sitemap, robots.txt, web manifest
- Privacy, terms, legal notice, 404/500/503/504 pages
- Contact form opens the visitor's email client and does not store submitted data
- Google Maps only on the Contact page

## Verify and build
```bash
npm run check
npm run build
```

Deploy the generated `dist/` directory to Vercel. The project is configured through `vercel.json`.

## Cloudflare Pages deployment
This repository is ready for Cloudflare Pages Git integration.

Use these settings in Cloudflare Pages:
- Production branch: `main`
- Framework preset: `None`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/` (repository root)

The `site/_headers` file is copied into `dist/` during the build and applies the production security headers on Cloudflare Pages.

The production canonical hostname is `https://susanmute.co.ke`. Cloudflare Pages and Vercel deployment hostnames are deployment or preview surfaces and must not be treated as canonical production URLs.
