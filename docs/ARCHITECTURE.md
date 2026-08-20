# Website architecture

Last updated: 2026-08-19

## Purpose

This document defines durable technical boundaries. Product and visual authority lives in `docs/CONCEPT_DESIGN.md`; current work lives in `docs/IMPLEMENTATION_PLAN.md` and `docs/PROGRESS.md`.

Visual choreography, exact composition, timing, typography assignments, and animation techniques are not architecture. They may change through Igor's prompts and sketches.

## Approach

Use Astro static generation, semantic HTML, component-scoped CSS, and small local TypeScript enhancements. Product evidence and reading order must exist before JavaScript runs.

Do not introduce a client application framework, global application state, a client router, nested scroll surfaces, or canvas-rendered essential content. Prefer native document flow and browser scrolling.

## Routes

| Address | Responsibility |
| --- | --- |
| `/` | Personal homepage and current authored opening experience |
| `/work/` | Complete work presentation |
| `/case-studies/observatory/` | Observatory editorial case study |
| `/case-studies/supergood/` | SuperGood editorial case study |
| `/case-studies/two-sticks/` | Two Sticks editorial case study |
| `/case-studies/chinese-bee/` | Legacy route with Two Sticks as its canonical URL |
| `/blog/` | Writing index |
| `/blog/[slug]/` | Approved article document |
| Existing legacy paths | Static redirects to the closest current document or anchor |

Preserve base-path behavior for both `/` and `/personal-website/` builds.

## Document boundaries

`BaseDocument` owns metadata, canonical and social metadata, fonts, the skip link, reset styles, and shared focus behavior.

The homepage owns its presentation and local enhancements. `/work/`, `/blog/`, and the case studies remain independent readable documents. A homepage experiment must not require those documents to share its motion or state.

The DOM order is the reading order. CSS may create asymmetrical or overlapping compositions, but visual placement must not make essential meaning depend on that placement.

## Content and evidence

Typed content collections are the source for verified software, games, and writing records. Homepage identity and values copy live in `src/content/homepage/`. Components may curate and reframe those records but must not invent claims, metrics, responsibilities, or personal facts.

Preserve content, project media, portraits, résumé files, deployment configuration, and independent case-study material across visual rebuilds unless Igor explicitly replaces them.

## Interaction boundaries

Enhancements must:

- be local to the component that owns them;
- preserve static meaning and usable links without JavaScript;
- use native scrolling rather than intercepting wheel or touch input;
- remove listeners and observers when disconnected;
- avoid competing owners for the same position, scroll state, or visibility state;
- use compositor properties for scroll-linked motion and avoid layout animation;
- stop work when settled or outside the relevant viewport;
- provide a reduced-motion result that preserves comprehension.

Avoid manually restoring scroll position unless native browser restoration is proven insufficient for a specific route. Decorative interaction may be removed when its implementation cost or fragility outweighs its contribution to the current visual direction.

## Media

- Use Astro image optimization for project and portrait media.
- Keep lossless authored line art lossless.
- Lazy-load media below the first viewport.
- Do not autoplay heavy video on initial load.
- Use static posters for reduced motion.
- Keep independent case-study media local to that document.

## Accessibility

- One `main` and one page-level `h1` on the root page.
- Logical headings and landmarks.
- Visible keyboard focus on every interactive target.
- Minimum 44 by 44 pixel touch targets where practical.
- Useful alternative text for meaningful images and empty alternatives for decorative images.
- Essential meaning must not depend on handwriting, color, motion, hover, or JavaScript.
- Visually unavailable content must not remain interactive or be announced as the current state.
- Responsive compositions must keep portfolio evidence at a readable size.

## Performance

- Keep the root static-first and dependency-free beyond Astro.
- Preload only the first necessary font and opening asset.
- Generate responsive portrait and project images.
- Decode only the active flipbook frame and a small neighbouring window.
- Keep scroll work requestAnimationFrame-coalesced and free of repeated layout writes.
- Test with below-fold media inactive and with coarse-pointer input.

## Verification

At stable milestones verify:

- `astro check`;
- production builds at `/` and `/personal-website/` base paths;
- semantic and no-JavaScript reading order;
- keyboard, touch, and reduced-motion behavior;
- representative desktop and mobile viewports;
- no horizontal overflow or clipped essential actions;
- browser console without relevant warnings or errors.
