# Major Problem Industries

This repository contains the website for [MajorProblemIndustries.com](https://majorproblemindustries.com), the umbrella home for projects built by Nathanyel Majors.

## Status

Foundation work is in progress. The current page is intentionally temporary; the public-facing design and content will arrive in later implementations.

## Stack

- Astro with static output
- TypeScript in strict mode
- Plain CSS
- ESLint and Prettier
- npm

The site is designed to deploy as static output on Cloudflare Pages. It has no UI framework, backend, CMS, analytics, or unnecessary client-side runtime.

## Local development

Use Node.js 24 LTS and npm. The expected Node major is recorded in `.node-version`.

```sh
npm install
npm run dev
```

Useful checks:

```sh
npm run format:check
npm run lint
npm run check
npm run build
```

Preview the production build locally with `npm run preview`.

## Repository philosophy

Keep the site small, readable, accessible, and static by default. Dependencies and abstractions should earn their place. This repository is intended to become publicly viewable, so it must not contain secrets, private data, or proprietary implementation material.

LUNA — Luminary Unit of Nuisance Abatement — is proprietary and closed-source. Its source code is not included in this website repository.

## Rights

All rights reserved unless explicitly stated otherwise. See [RIGHTS.md](RIGHTS.md).
