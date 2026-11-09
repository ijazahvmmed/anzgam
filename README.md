# ANZ Landscaping

An Astro 7 static site with React 19 islands, TypeScript, Tailwind CSS 4, GSAP / ScrollTrigger, and Motion for React. Content and project photography are drawn from ANZ's existing website; the new brand artwork is supplied by the client.

## Run

```sh
npm ci
npm run build
npm start
```

The production preview runs at `http://127.0.0.1:4321`. It uses the same built Worker as hosting and a local SQLite database at `.sites-runtime/enquiries.sqlite`. `npm run dev` provides Astro hot reload and the same functional local `/api/enquiry` endpoint. The current review is served on localhost; changes in this review have not been published to the private hosted site.

## Architecture

- `src/pages/index.astro`: static homepage composition.
- `HomeHero.astro`, `ProjectSpotlight.astro` and `Approach.astro`: the revised split hero, featured project and concise process composition. `home.css` controls their distinct desktop/mobile layouts; `identity.css` supplies the refined palette, closing enquiry and footer hierarchy.
- `src/components/`: shared navigation, footer, buttons and enquiry form.
- `src/components/islands/`: the homepage portfolio filter hydrates when visible. Services and process presentations use static Astro components.
- Portfolio filters use one grid at a time, an opacity crossfade and measured frame height; no layout scaling or order-dependent card offsets. Original project photographs remain available on detail pages alongside the enhanced lead images.
- `src/assets/retouched/`: four AI-enhanced project photographs, encoded as high-quality WebP. Local PNG masters and the exact built-in imagegen prompts are saved under `output/retouched-projects/`.
- `src/data/content.ts`: project, service and FAQ content.
- `src/styles/global.css`: tokens and responsive layouts; 700px / 900px breakpoints.
- `src/components/RevealHeading.astro`: accessible phrase masks shared by hero and section headings.
- `src/scripts/animations.ts`: a composed hero entrance, staggered heading masks, selective blur sharpening and small scroll-linked image movements. Motion initializes after fonts are ready, respects reduced motion and is reverted on page teardown / responsive changes. The hero has a timed visible fallback if JavaScript is slow or unavailable.
- `src/scripts/smooth-scroll.ts`: conditionally loaded Lenis 1.3.27 for fine-pointer devices, synchronized with the existing GSAP ticker and ScrollTrigger. Touch and reduced-motion views keep native scrolling. Anchor links preserve URLs, header offsets and keyboard focus; menus and form controls retain independent scrolling. Navigation, preference changes and bfcache restoration clean up the instance and ticker.
- `src/data/services.ts`: all 15 individual services, service-specific scope and benefits, grouped navigation, original source URLs and photography.
- `src/pages/projects/` and `src/pages/services/`: four project pages, 15 complete service pages and the services directory, all prerendered.
- `src/components/ServiceIcon.astro`: a consistent set of small inline SVG icons; no icon font or client-side icon package.
- `src/components/ClientMarquee.astro`: seamless client-logo loop with fixed introduction, hover pause. Animation stops outside the viewport or in background tabs; reduced motion and JavaScript-free views show the five logos without movement.
- `src/components/Header.astro`: animated desktop mega menu and mobile service submenu, with keyboard navigation, Escape dismissal, focus handling and reduced-motion support.
- `worker/enquiry.mjs`: same-origin submission endpoint with server validation, consent, honeypot and rate limiting.
- `drizzle/`: immutable D1 schema migration.
- `scripts/build-worker.mjs`: packages the prerendered Astro output for Sites Worker hosting. Static files are embedded server-side, not sent as an all-in-one browser payload; each file has its own URL and cache policy.

## Enquiries

`POST /api/enquiry` saves valid enquiries in the hosted D1 `DB` binding and returns a unique reference. Every submission is checked on the server. No third-party form account is required. Records include the contact details, project location, service, budget, message, consent and submission time. A daily hash of the request IP supports rate limiting; raw IP addresses are not stored.

Email / CRM notifications are **not configured**. For operational launch, arrange access to D1 records through the hosting account or connect the endpoint to your chosen CRM/mail provider. Never expose records through a public GET endpoint. No real email messages are sent by the QA tests.

Tests: `npm test`. These use real SQLite to verify persistence, bound SQL, invalid input, cross-origin rejection, the honeypot, unavailable storage, rate limiting and acceptance of every service offered in the form. Service detail pages preselect the matching enquiry option.

## Hosting & SEO

The Sites project ID and D1 binding live in `.openai/hosting.json`. The homepage and detail pages are prerendered; only the form requires server work. Local and production databases are separate. The hosting workflow applies the checked-in schema before deployment.

The initial hosted site is private. On a later public launch or custom-domain migration, update `site` in `astro.config.mjs`, `public/robots.txt`, business metadata and the privacy-policy destination as appropriate. Do not change the existing business domain or DNS as part of a preview deployment.

## Reference study

See [DESIGN.md](./DESIGN.md) for proportions, responsive choices, motion interpretation and asset provenance. Local browser screenshots and Lighthouse reports are kept in the ignored `verification/` directory.

## Visual refinement

The homepage now uses a static image rail for the four service categories and a compact plant-shaped process section. All 15 services remain in navigation, the directory and a homepage disclosure. The former service and process React islands are no longer hydrated on the homepage.

`src/styles/refinements.css` contains the green section joins, stable image expansion, and CTA perimeter/shine styles. `src/scripts/marquees.ts` uses one visibility observer for both marquees and the CTA lights, pausing them offscreen and in background tabs. Scroll-linked plant shapes share the GSAP responsive lifecycle. Reduced motion keeps shapes and cards static.
