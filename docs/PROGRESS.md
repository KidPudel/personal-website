# Website rebuild progress

Last updated: 2026-07-22

## Status

The clean foundation and approved Home base are complete. Home implements the authored resting model with four visibly labeled choices in the persistent field, Igor-authored navigation drawings and supporting doodles, and a progressively enhanced Connect disclosure.

Current milestone: **3. Destination shell and Who I am**

## Milestones

| Milestone | Status |
| --- | --- |
| 0. Documentation reset | Complete |
| 1. Clean foundation | Complete |
| 2. Home | Complete |
| 3. Destination shell and Who I am | Next |
| 4. Work | Pending |
| 5. Blog and contact completion | Pending |
| 6. Interaction, responsive behavior, and accessibility | Pending |
| 7. Release | Pending |

Milestone scope and exit conditions live only in `docs/IMPLEMENTATION_PLAN.md`.

## Current decisions

- `docs/CONCEPT_DESIGN.md` is the sole design and product authority.
- The old presentation code is not a visual baseline.
- `docs/ARCHITECTURE.md` is the technical baseline. No implementation deviation is currently recorded.
- Astro is updated to 7.1.3. TypeScript remains on the newest supported 6.x release because Astro Check does not yet support TypeScript 7.
- The foundation uses `BaseDocument`, `WorldField`, `PaperSurface`, and `HomeReturn` as the only shared presentation primitives.
- The clean shell has no global client router, page-transition controller, global click effect, UI framework, or client-side state.
- `/connect/` and `/games/` remain base-aware compatibility redirects to `/#connect` and `/work/games/`.
- Bright Chalk is the locally hosted reading and interface family. Cartoon Relief is the locally hosted distinctive-display family. Both ship as WOFF2 generated from the supplied TrueType sources.
- Home navigation uses ordinary links for Who I am, Work, and Blog, plus one disclosure button for Connect. Reading and keyboard order is Who I am, Work, Connect, Blog.
- Desktop Home follows the overview storyboard's cross-shaped placement: Who I am above, Connect left, Work right, and Blog below. The visual arrangement does not change the semantic source order.
- Home uses Igor's four hand-drawn navigation icons for Who I am, Work, Connect, and Blog. Each visible label has its own loose, drawing-relative placement while remaining the accessible navigation name.
- The persistent field uses a warm graphite base with restrained paper grain, faded tonal variation, and softened imperfect edges. Home and destination margins share the same field treatment.
- Five existing Igor-authored doodles support the Home field without becoming navigation controls: bird, fish, disk, burger, and dead fish. They render at 9% opacity, rise gently to 13% on precise-pointer hover, and preserve their intrinsic proportions.
- Connect is collapsed after enhancement, expands locally, keeps `aria-expanded` synchronized, and maps its open state to `#connect`. Without JavaScript, all six links remain visible and the button accurately starts expanded.
- The mobile review draft uses a two-by-two resting index. Expanded Connect takes a full row and moves Blog below it rather than compressing the links.

## Foundation audit

| Classification | Source |
| --- | --- |
| Keep | Astro and TypeScript configuration, package and lock files, GitHub Pages workflow, local development script, strict content schemas, verified content entries, public-link configuration, résumé files, favicon, authored portraits and doodles, paper materials, game media, storyboards, and source documents. |
| Replace | Legacy route compositions, `BaseLayout`, shared header and footer, generic interaction and doodle components, the monolithic global stylesheet, and the old Games-specific presentation. |
| Remove | Global `ClientRouter`, shared paper transition configuration, global pointer impact effect, legacy notebook and desk styling, and the separate pixel-interface theme. |
| Defer | Destination compositions, the `work` to `software` content-model alignment, detail routes, interaction enhancements, and release metadata. |

## Milestone 1 verification

- `astro check` and the production build pass with zero diagnostics for both `/` and `/personal-website/` base paths.
- All eight current routes generate successfully, including the two compatibility redirects.
- Desktop inspection at 1440 by 900 confirms the persistent field, inset paper, single main landmark, and a 44 by 44 pixel Home target with no horizontal overflow.
- Mobile inspection at 390 by 844 confirms the reserved Home band, visible field margin, inset paper, and no horizontal overflow.
- The repository development script starts the site at `http://127.0.0.1:4321`.

## Milestone 2 verification

- `astro check` and the production build pass with zero diagnostics for both `/` and `/personal-website/` base paths.
- Desktop inspection at 1440 by 900 confirms the storyboard-aligned cross composition, a single main landmark, large navigation targets, visible focus treatment, and an expanded Connect panel that stays inside the viewport.
- Mobile inspection at 390 by 844 confirms a two-by-two resting composition, a readable expanded Connect row, and no horizontal overflow in either state.
- The revised art-direction pass shows all five Home doodles on desktop and mobile while keeping them outside the navigation meaning.
- The Home source order and accessibility tree preserve Who I am, Work, Connect, Blog regardless of visual placement.
- Direct loading of `/#connect` restores the expanded disclosure.
- The generated no-JavaScript document exposes all Connect links, uses `aria-expanded="true"`, and does not hide the panel.
- The global reduced-motion rule removes Home hover travel and transition duration without removing content or focus treatment.
- No browser console warnings or errors were observed during the inspected states.
- Igor accepted the Home base on 2026-07-22. Later cross-site interaction, responsive, accessibility, and performance refinement remains in milestone 6.

## Open inputs and blockers

- Bright Chalk and Cartoon Relief files are present and integrated. Web-embedding rights still need confirmation before release.
- The final public URL for `Discourses by Campfire` still needs confirmation before release.

## Next action

Begin milestone 3 by implementing the reusable destination shell and Who I am from the authored concept and approved content.
