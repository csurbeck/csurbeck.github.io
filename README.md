# Claire Surbeck

Portfolio site for Claire Surbeck, a designer and developer. The home page is one scrolling page with hello, about, selected work, and contact. Each project opens on its own page.

Live at [clairesurbeck.com](https://clairesurbeck.com).

## Stack

- React 19 and TypeScript
- React Router
- Sass modules
- Webpack 5

The reorderable table case study includes a working demo built with [dnd-kit](https://dndkit.com/).

## Scripts

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # writes dist/
npm run lint
npm run type-check
```

Node 22 is what the deploy workflow uses.

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/work/reorderable-table` | Reorderable table |
| `/work/expedia-trips` | Expedia Trips |
| `/work/callassure` | CallAssure |

Returning from a project opens the home page on Selected work. A direct visit or reload opens on hello.

## Deploy

Pushes to `main` build and deploy to GitHub Pages (`.github/workflows/pages.yml`). The custom domain is set in `CNAME`.

GitHub Pages does not rewrite client-side routes, so the build copies `dist/index.html` to `dist/404.html`. That lets a refresh on a project URL load the app instead of a host 404.
