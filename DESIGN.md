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

The recordings show steady floating navigation, ordinary vertical scrolling, direct tab changes and small accordion expansions. They do not support excessive pinning or cinematic page choreography. ANZ keeps ordinary vertical scrolling, with the requested Lenis smoothing on fine-pointer devices.

1. Portfolio filtering: a 180ms sequential crossfade with an independently measured 320ms frame-height transition. Cards use a balanced two-column grid and matching image ratios. Photographs never inherit layout scale transforms; exiting grids become inert immediately. Rapid selections resolve to the latest category.
2. Service explorer: 100ms hover intent, a 650ms upward image wipe with tiny scale correction, and matching touch/keyboard accordion controls.
3. Intro statement: every character is visible in grey from the start. Scroll progress changes character colour directly to dark with class toggles; there is no opacity animation.

The process image swaps in 250ms, simple hover changes use CSS and desktop photography shifts only slightly with scroll. Select headings receive a brief blur-to-sharp treatment. `prefers-reduced-motion` removes transforms, wipes, blur and smooth scrolling. GSAP uses one responsive context with cleanup; React transitions use the same reduced-motion setting.

The localhost refinement adds a composed 1.1s hero entrance, line masks staggered by 105ms, and a smaller 2px blur treatment on selected supporting headings. Native FAQ disclosures and React service/process accordions now expand smoothly. No opacity fading is used for scroll-highlighted characters. Service navigation uses a 280ms desktop panel entrance and a 420ms mobile submenu expansion, with small icon and arrow movements on hover and press.

All 15 individual service pages have been researched from the original ANZ site. Each contains its own overview, three scope groups, benefits, FAQs, related services and a service-aware enquiry form. The directory and both navigation menus link to local detail pages. Repeated claims and unfinished placeholders from the original pages were not carried into the new site.

These timings are an interpretation of the supplied short recordings, rather than a claim of frame-exact source easing curves.

## Provenance

- Business, service and client information: https://anzlandscaping.in/ and https://anzlandscaping.in/services/
- Contact details: https://anzlandscaping.in/contact-us/
- Project names and locations: https://anzlandscaping.in/projects/
- Project-specific photos: each project's page, including `/projects/goodearth-malhar/`, `/projects/bhive-premium/`, `/projects/skylark-mansions/` and `/projects/iampl/`.
- Service photography, including the hero terrace and maintenance photo: existing ANZ media. Service images are not labelled as an additional completed project.
- No reference-site photography is republished. No stock photography or invented projects are used. The homepage hero and four lead project photos use restrained retouching of the original ANZ photographs, as described below.

## Validation

The site is inspected at desktop and mobile sizes with the supplied reference compositions beside it. Navigation, project filters, accordion state changes, mobile menus, detail links, submission success/error paths and absence of horizontal overflow are checked separately. The local production preview uses compression to match hosted static delivery. Lighthouse results are local lab measurements; they are not field Core Web Vitals.

The latest local refinement uses Satoshi 500 for main headings and project titles, keeping body copy at 400. Four lead project photographs were enhanced using the built-in imagegen tool for clarity, exposure and restrained architectural perspective. Original photographs remain in the source and on project detail pages. The marquee has no pause button, as requested; hover and reduced-motion handling remain.

Requested smooth scrolling: Lenis 1.3.27 runs only for fine-pointer devices without reduced motion. Gamlaa uses Lenis with 0.06 lerp / 0.8 wheel multiplier; ANZ uses a slightly more responsive 0.075 / 0.9, and shorter parallax scrubs to avoid compounding scroll lag. One GSAP ticker drives both systems. Anchor travel is 1.05s with an ease-out, and remains interruptible. Touch scrolling stays native.

The homepage hero now uses a separately retouched version of the original Terrace-Garden photograph, restoring texture and clarity with restrained architectural correction. The original image remains unchanged for the service photography. Responsive AVIF/WebP variants are generated at quality 86, with eager loading and high fetch priority.


## November 6 motion and copy refinement

The 230528 recording was studied in 24 sampled frames plus full-size key frames before implementation. Its restrained shape movement, outlined leaf strip and expanding photographic cards inform the latest changes. The type remains Satoshi and all business content remains ANZ content.

The homepage now uses concise copy, four image-led service links, an expandable index of all 15 services, and a static three-step approach. Repetitive process copy and the extra photographic banner were removed. Service detail pages keep their factual scope and enquiry form without repeating a generic process section. Prose uses ordinary sentences instead of decorative dash constructions.

The services chapter is forest green with an inverse curved upper join and a large rounded lower corner. Garden care uses a related pale green with an opposing join. Native SVG seed, leaf and sprout marks rotate and grow slightly with GSAP ScrollTrigger. A lightweight outlined leaf marquee moves continuously; it and the CTA perimeter light pause outside the viewport. The thin button light and brief shine use CSS, with no additional hydrated components.

Service cards expand across their row over 750ms. Project pairs expand independently and keep a fixed photograph height, avoiding layout scaling and vertical jumps. Touch layouts show a stable two-column service grid and a one-column project list. Reduced motion removes the decorative movement, shine and expansion.

The homepage now hydrates only the project filter React island. Service cards and the approach section render as static Astro components. The desktop and 390px layouts, reduced motion, filters, service disclosure and local form success were checked. Astro checks, production build and all five enquiry tests pass.


## Elastic photo comparison

The 232928 reference is a one-second, 30-frame clip with a thin divider, a compact white handle and restrained movement. All 30 frames were inspected. The new comparison sits within the project chapter and uses a matching pair of existing ANZ photographs: the original GoodEarth Malhar image and its enhanced version. These are explicitly labelled as photography versions, not a construction transformation. The user approved this pair for now.

A reusable static Astro component accepts image assets, labels and an instance ID. Two responsive lazy-loaded Astro images share a normalized SVG clipping curve and divider path. The handle tracks the pointer directly. A damped spring makes the seam ends trail the gesture, with a maximum bend of 85px on desktop or 9% of the image width. The curve follows the vertical drag point and settles straight when movement stops. The image itself stays still.

Pointer capture supports dragging outside the image. Touch uses pan-y and distinguishes horizontal dragging from vertical page scrolling. Keyboard arrows, Shift, PageUp/PageDown and Home/End adjust the accessible slider. Reduced motion uses an immediate straight divider. The animation loop stops when settled, hidden or outside the viewport. Resize and navigation cleanup release pointer capture and remove listeners and observers. No extra React hydration or dependencies are added.

Browser checks covered desktop and 390px layouts, dragging in both directions, settling, full keyboard endpoints and reduced motion. The IAB does not support dispatchTouchEvent, so genuine touch gestures were not executed there; direction routing is covered by a focused unit test. Spring convergence at 30/60/120Hz, direction reversals, suspended frames and shared curve geometry also have unit coverage.


## Reflective CTA treatment

The supplied button references show a rounded rectangular face, a crisp top rim, a shaded lower lip and an exterior glow. The CTA label and navbar button now use a 12px corner radius, a reflective surface, asymmetric inset highlights and a three-pixel lower edge. The separate circular arrows retain the ANZ button geometry and receive the same optical layers. Forest, cream and ANZ lime variants share one implementation in buttons.css.

The glow is allowed outside the button. A diffuse SVG halo follows a sharper moving rim segment over 7.5 seconds; a separate low-opacity aura breathes gently. A clipped inner layer carries the surface reflection, keeping the text sharp and the shine within the face. Hover and keyboard focus strengthen the glow, lift the face by one pixel and sweep a reflection across it. Pressing seats the face down.

The existing visibility observer pauses the halo, aura and reflection offscreen and in hidden tabs. Reduced motion leaves static highlights and removes movement. Disabled submission controls suppress the decorative animation. The treatment adds no JavaScript dependency or hydration. Desktop and 390px screenshots, keyboard focus, hover, reduced motion and intact CTA destinations were checked. Astro checks and the production build pass.


Selection controls now share the CTA optical finish at a lower intensity. The project filter keeps its pill geometry, with a recessed pale tray, raised forest selection, thin reflected rim and a soft static outer glow. A single sheen plays on selection, hover or keyboard focus; it does not run continuously. Inactive choices remain visually quieter. The service-category links and draggable comparison handle use the related pale treatment. Static image labels remain unchanged. Filter semantics, destinations and keyboard focus are preserved. Reduced motion removes the sheen and press displacement. Desktop and 390px filter selection, rapid changes, focus and reduced motion were checked; Astro checks and the production build pass.


## Smooth selection and navigation

The filter's green surface now travels between choices as one shared Motion layout element. Its critically damped spring uses stiffness 420, damping 38 and mass 0.85, with no animated scaling on project photographs. Labels remain above the moving surface. A fast 120ms exit and softer 280ms entrance coordinate the filtered results, while their measured height settles over 420ms. Rapid selections resolve to the final category. The island starts hydration 600px before entering the viewport so the first interaction is ready sooner.

The navbar uses one GSAP-driven reflective hover surface that moves between links in 420ms. Keyboard focus uses the same highlight. Icons shift slightly, and submenu rows receive a soft reflected background and directional arrow movement. Desktop panels open over 380ms and close over 220ms; mobile service disclosures expand over 480ms. Reversing a panel transition starts from its current state.

Header animation cleanup includes responsive changes, reduced-motion changes, navigation, pagehide and bfcache restoration. Reduced motion aligns both selection and navigation highlights immediately. Validation covered rapid filtering, a single settled marker, correct photo counts and stable row heights, keyboard opening and Escape, menu focus, desktop hover, mobile submenu reversals, service navigation and absence of horizontal overflow.

## November 7 identity revision

The client rejected the earlier Vercel draft as too close to the original ANZ site. This revision changes the homepage composition: a split typographic hero, a large GoodEarth Malhar feature with an offset detail crop, concise introduction, photographic services, portfolio and comparison, a split three-step process, garden care, FAQ and a curved enquiry closing. Mobile places the hero photograph first and recomposes the featured project rather than shrinking the desktop arrangement.

The palette now has specific roles: warm paper #f6f3e9, stone #ebe8dc for photography, forest #163f35 for services, mist #dae5d9 for garden care, pollen #e7edc6 for the enquiry closing and canopy #0e3028 for the footer. Satoshi remains the single family, with 500-weight main headings and a clearer scale. Copy stays brief and factual.

Gamlaa's outlined leaf rhythm and curved section joins inform the motion language. The new ribbons use native SVG: an alternating geometric leaf line in services and an ANZ logo-derived blade at the footer. These are locally authored vectors, not downloaded Gamlaa assets. Existing ScrollTrigger shape movement, card expansion, Lenis scrolling, reflective controls and the elastic photo comparison remain. No additional dependencies or hydrated islands were introduced.

The footer has a contact-first hierarchy, separate Explore and What we do navigation, a real visit address, a large supplied ANZ mark and the simple Design / Build / Care statement. The previous Grow concept is absent. The enhanced ANZ hero and project photographs are reused; the smaller GoodEarth photograph is a deliberate detail crop of the same image, not a second documented project view.

Validation: no horizontal overflow at 390, 701, 768, 1024, 1440 and 1920 pixels. Desktop and mobile screenshots cover the hero, featured project, enquiry and footer. Browser checks cover filtering, comparison keyboard controls, the 15-link services menu, a successful local enquiry and reduced-motion removal of ribbon and shape movement. Astro reports zero diagnostics, the production build prerenders 22 pages, and all nine existing tests pass. Lighthouse was not rerun for this revision. The review remains on localhost; nothing was deployed.

## November 9 visual cleanup

The supplied Vibe Check identified repeated stylistic conventions. Section descriptors, footer headings and service menu groups now use sentence case and normal letter spacing. Decorative section and card numbering, the status dots, text-arrow ornaments and separate CTA arrow buttons have been removed. Navigation retains meaningful SVG category icons; the two directional controls for the featured section and return to top retain their SVG arrows. Reflective button surfaces, the portfolio selection animation, image interactions, leaf ribbons and scroll motion remain.

The warm cream base is replaced by a cool neutral #f9fbfa with #e8eeea behind the photographs. The garden care and closing enquiry use related greens #d9e8de and #dcebd5. Satoshi remains the single locally hosted family because it was explicitly requested in the brief; hero tracking is less compressed, and its size adjusts for 320–390px screens.

The footer's Design / Build / Care slogan is replaced with factual location and service information. Homepage and service-page FAQ accordions are replaced by a shared static ProjectPreparation component: short guidance on project details or site review and estimates. This reduces repeated questions and keeps the useful information visible without interaction. All 15 service pages retain their actual service content and scope.

Desktop and mobile screenshots are saved under verification/cleanup-*.jpg. Checks include label casing and spacing, absence of ornamental markers and arrow text, desktop/mobile service navigation, project filter selection, service-page text widths and responsive layout. These are direct implementation checks, not a claim about a score from the third-party Vibe Check tool. This revision is local and has not been deployed to Vercel.
