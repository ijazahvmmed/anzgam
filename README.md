# ANZ Landscaping

An Astro 7 static site with React 19 islands, TypeScript, Tailwind CSS 4, GSAP / ScrollTrigger, and Motion for React. Content and project photography are drawn from ANZ's existing website; the new brand artwork is supplied by the client.

## Run

```sh
npm ci
npm run build
npm start
```

The production preview runs at `http://127.0.0.1:4321`. It uses the same built Worker as hosting and a local SQLite database at `.sites-runtime/enquiries.sqlite`. `npm run dev` provides Astro hot reload for frontend work; use the production preview to test `/api/enquiry`.

## Architecture

- `src/pages/index.astro`: static homepage composition.
- `src/components/`: shared navigation, footer, buttons and enquiry form.
- `src/components/islands/`: portfolio filter, service explorer and process accordion. Each hydrates only when visible.
- `src/data/content.ts`: project, service and FAQ content.
- `src/styles/global.css`: tokens and responsive layouts; 700px / 900px breakpoints.
- `src/scripts/animations.ts`: GSAP setup deferred until scrolling or keyboard interaction. All effects respect reduced motion and are reverted on page teardown / responsive changes.
- `src/pages/projects/` and `src/pages/services/`: eight statically generated detail pages.
- `worker/enquiry.mjs`: same-origin submission endpoint with server validation, consent, honeypot and rate limiting.
- `drizzle/`: immutable D1 schema migration.
- `scripts/build-worker.mjs`: packages the prerendered Astro output for Sites Worker hosting. Static files are embedded server-side, not sent as an all-in-one browser payload; each file has its own URL and cache policy.

## Enquiries

`POST /api/enquiry` saves valid enquiries in the hosted D1 `DB` binding and returns a unique reference. Every submission is checked on the server. No third-party form account is required. Records include the contact details, project location, service, budget, message, consent and submission time. A daily hash of the request IP supports rate limiting; raw IP addresses are not stored.

Email / CRM notifications are **not configured**. For operational launch, arrange access to D1 records through the hosting account or connect the endpoint to your chosen CRM/mail provider. Never expose records through a public GET endpoint. No real email messages are sent by the QA tests.

Tests: `npm test`. These use real SQLite to verify persistence, bound SQL, invalid input, cross-origin rejection, the honeypot, unavailable storage and rate limiting.

## Hosting & SEO

The Sites project ID and D1 binding live in `.openai/hosting.json`. The homepage and detail pages are prerendered; only the form requires server work. Local and production databases are separate. The hosting workflow applies the checked-in schema before deployment.

The initial hosted site is private. On a later public launch or custom-domain migration, update `site` in `astro.config.mjs`, `public/robots.txt`, business metadata and the privacy-policy destination as appropriate. Do not change the existing business domain or DNS as part of a preview deployment.

## Reference study

See [DESIGN.md](./DESIGN.md) for proportions, responsive choices, motion interpretation and asset provenance. Local browser screenshots and Lighthouse reports are kept in the ignored `verification/` directory.
