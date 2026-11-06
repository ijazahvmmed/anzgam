# Reference study & implementation decisions

All seven supplied PNGs and both screen recordings were inspected before implementation. Full-resolution screenshots were split into readable crops; recordings were sampled across their complete durations, 33.7 and 22.9 seconds at 30 fps. Study material remains in the sibling `reference-study/` folder.

## Geometry & visual hierarchy

- Yardzen desktop: edge-to-edge photography, floating pale navigation inset from the viewport, a small lower-left content panel, calm paper background and substantial separation between sections. Its mobile composition moves the hero content below the photograph and uses wide touch targets. ANZ preserves that desktop/mobile distinction.
- BACQYARD desktop: restrained two-column section composition, understated divider lines, content selectors and accordion/image pairings. Mobile places expanded images alongside the active accordion content and stacks information in a clear reading order.
- ANZ uses a 22px mobile gutter, fluid desktop gutters around 4.2vw, 65px mobile section spacing and 100–120px desktop section spacing. Image corners are 10–16px; the inset hero is 16–22px. Navigation is 64px on mobile and 76px on desktop.
- Reference package and review sections were replaced with authentic project work, commercial/residential capabilities, execution and garden care. No borrowed prices, ratings, testimonials or unverified business metrics are used.

## Type, colour & identity

Satoshi is self-hosted in three weights (400 / 500 / 700), sourced from Fontshare. Headings are tightly tracked with compact leading. Desktop section headings reach 60–64px; mobile headings are 37–39px. Type is nearly monochromatic, with a dark green drawn from the supplied ANZ identity.

The original transparent PNG logos were inspected against an opaque background. The apparently blank white artboard is the reversed white ANZ logo. All three variants are retained in the project; the supplied green mark appears in the navigation and the white lockup in the footer. No replacement logo was invented.

Primary tokens: ink `#202c25`, forest `#173e2e`, paper `#f4f5ef`, secondary surface `#e9ece2`, light green `#d4e8b8`. Small text was darkened during accessibility review.

## Motion interpretation

The recordings show steady floating navigation, ordinary vertical scrolling, direct tab changes and small accordion expansions. They do not support excessive pinning or cinematic page choreography. ANZ keeps native scrolling.

1. Portfolio filtering: a short 350ms layout transition with restrained scale and shared easing.
2. Service explorer: 100ms hover intent, a 650ms upward image wipe with tiny scale correction, and matching touch/keyboard accordion controls.
3. Intro statement: every character is visible in grey from the start. Scroll progress changes character colour directly to dark with class toggles; there is no opacity animation.

The process image swaps in 250ms, simple hover changes use CSS and desktop photography shifts only slightly with scroll. Select headings receive a brief blur-to-sharp treatment. `prefers-reduced-motion` removes transforms, wipes, blur and smooth scrolling. GSAP uses one responsive context with cleanup; React transitions use the same reduced-motion setting.

These timings are an interpretation of the supplied short recordings, rather than a claim of frame-exact source easing curves.

## Provenance

- Business, service and client information: https://anzlandscaping.in/ and https://anzlandscaping.in/services/
- Contact details: https://anzlandscaping.in/contact-us/
- Project names and locations: https://anzlandscaping.in/projects/
- Project-specific photos: each project's page, including `/projects/goodearth-malhar/`, `/projects/bhive-premium/`, `/projects/skylark-mansions/` and `/projects/iampl/`.
- Service photography, including the hero terrace and maintenance photo: existing ANZ media. Service images are not labelled as an additional completed project.
- No reference-site photography is republished. No stock or generated project photos are used.

## Validation

The site is inspected at desktop and mobile sizes with the supplied reference compositions beside it. Navigation, project filters, accordion state changes, mobile menus, detail links, submission success/error paths and absence of horizontal overflow are checked separately. The local production preview uses compression to match hosted static delivery. Lighthouse results are local lab measurements; they are not field Core Web Vitals.
