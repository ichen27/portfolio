# Ivan Chen
Research and development portfolio at https://ivanzhchen.com.
Next.js App Router, TypeScript, static HTML export. No database, analytics, or client-side application state.

## Development
```sh
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
npm run test:export
```

Research is app/page.tsx (also /research/); /development/, /experience/ and /about/ are dedicated pages.
components/portfolio-shell.tsx owns shared navigation and active state. Study copy, featured research, and development selections are in lib/work.ts.
The homepage also includes experience and a short personal About me section.
Research entries require a measured finding, actual figure, results table, and downloadable data.
Run scripts/prepare-research.py on the mini to regenerate numeric extracts from original experiments;
use matplotlib with scripts/render-research.py to regenerate their figures.
Generated static files are in out/. See docs/content-evidence.md for artifact provenance
and docs/deployment.md for preview and deployment instructions.

After building, `npm start` serves the static export on http://127.0.0.1:3001 (Python 3 required).

Runtime figures: scripts/prepare-runtime.py projects numeric fields from private evaluation traces; scripts/render-comparisons.py renders the published data. Handshake method comparisons are curated historical observations, not controlled causal estimates.
