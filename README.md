# Ivan Chen
Minimal personal portfolio at https://ivanzhchen.com.
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

The homepage is app/page.tsx. Case-study copy is lib/work.ts.
Generated static files are in out/. See docs/content-evidence.md for artifact provenance
and docs/deployment.md for preview and deployment instructions.

After building, `npm start` serves the static export on http://127.0.0.1:3001 (Python 3 required).
