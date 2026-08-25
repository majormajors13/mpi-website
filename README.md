# Major Problem Industries

This repository contains the public website for
[MajorProblemIndustries.com](https://majorproblemindustries.com), the umbrella
home for projects built by Nathanyel Majors.

![Major Problem Industries — software, AI, and systems](public/social-preview.png)

## Status

The single-page homepage and its production validation are complete. It
introduces Major Problem Industries, presents the LUNA flagship teaser, outlines
current workshop directions, and includes About and Build Log sections. Hosting
configuration, domain attachment, and product source code are intentionally
outside this repository.

## Technical approach

- Astro generates a static site with no client-side application runtime.
- TypeScript uses strict mode.
- Plain, component-scoped CSS keeps the visual system close to its markup.
- ESLint and Prettier provide source-quality checks.
- Playwright and axe cover responsive, keyboard, motion, forced-color, and
  automated accessibility behavior.

The small stack is deliberate: this site does not need a UI framework, backend,
CMS, analytics SDK, or runtime state layer.

## Local development

Use Node.js 24 LTS and npm. The expected Node major is recorded in
`.node-version`.

```sh
git clone https://github.com/majormajors13/mpi-website.git
cd mpi-website
npm install
npm run dev
```

Available checks:

```sh
npm run format:check
npm run lint
npm run check
npm run build
npm run test:e2e
```

Use `npm run preview` to inspect a production build locally. The browser suite
builds the site and runs against that output using an installed Google Chrome
browser. `npm run check` performs Astro and TypeScript diagnostics; the
Playwright suite includes axe accessibility checks alongside keyboard,
responsive-layout, metadata, and production-output coverage.

## Repository map

```text
src/
  assets/logos/        Approved brand artwork processed by Astro
  components/          Shared shell components
  components/sections/ Homepage sections
  layouts/             Document metadata and global page structure
  pages/               Route entry points
  styles/              Tokens, reset, and global accessibility styles
tests/e2e/              Production-build browser checks
```

Astro writes the deployable static output to `dist/`. The intended host is
Cloudflare Pages, but deployment is not configured in this repository yet.

## Analytics

No tracking code or cookies are currently included. If analytics are enabled
after deployment, the intended approach is Cloudflare Web Analytics or an
equivalent cookieless, privacy-conscious service configured at the hosting
layer. Google Analytics and preemptive cookie banners are intentionally absent.

## Project boundaries

Keep the site small, readable, accessible, and static by default. Dependencies
and abstractions should earn their place. Do not commit secrets, private data,
generated build output, or proprietary implementation material.

The MPI and LUNA artwork in this repository is proprietary brand material. LUNA
— Luminary Unit of Nuisance Abatement — is closed-source; its product source
code is not included here.

## Rights

All rights reserved unless explicitly stated otherwise. See
[RIGHTS.md](RIGHTS.md).
