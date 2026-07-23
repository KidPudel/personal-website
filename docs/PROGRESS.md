# Website rebuild progress

Last updated: 2026-07-23

## Status

The clean foundation, approved Home base, reusable destination shell, and Who I am vertical slice are complete. The Work entry, Software and Games indexes, and their static project records are implemented and verified. Milestone 4 remains active until Igor reviews it.

Current milestone: **4. Work, ready for review**

## Milestones

| Milestone | Status |
| --- | --- |
| 0. Documentation reset | Complete |
| 1. Clean foundation | Complete |
| 2. Home | Complete |
| 3. Destination shell and Who I am | Complete |
| 4. Work | Ready for review |
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
- `/work/`, `/connect/`, and `/games/` are base-aware compatibility redirects to `/#work`, `/#connect`, and `/work/games/`.
- Bright Chalk is the locally hosted reading and interface family. Cartoon Relief is the locally hosted distinctive-display family. Both ship as WOFF2 generated from the supplied TrueType sources.
- Home navigation uses ordinary links for Who I am and Blog, plus disclosure buttons for Work and Connect. Reading and keyboard order is Who I am, Work, Connect, Blog.
- Desktop Home follows the overview storyboard's cross-shaped placement: Who I am above, Connect left, Work right, and Blog below. The visual arrangement does not change the semantic source order.
- Home uses Igor's four hand-drawn navigation icons for Who I am, Work, Connect, and Blog. Each visible label has its own loose, drawing-relative placement while remaining the accessible navigation name.
- Hovering or keyboard-focusing any primary drawn navigation control, including the destination Home icon, now plays a restrained stepped wobble around that drawing's individual resting angle. Its shared duration token controls the four Home choices and destination Home icon together, while the shared reduced-motion rule limits the effect to one near-instant frame.
- The persistent field uses a warm graphite base with restrained paper grain, faded tonal variation, and softened imperfect edges. Home and destination margins share the same field treatment.
- Five existing Igor-authored doodles now belong to the shared field rather than Home alone: bird, fish, disk, burger, and dead fish. They preserve their intrinsic proportions and fixed field coordinates. On Home they render at 9% opacity and rise gently to 13% on precise-pointer hover. On desktop destinations the paper naturally covers the same layer, uncovered fragments render at 5.5% and remain non-interactive, and the top-left disk stays hidden to keep the Home control clear. The destination layer is hidden below the desktop shell breakpoint so the narrow Home band remains uncluttered.
- Connect is collapsed after enhancement, expands locally, keeps `aria-expanded` synchronized, and maps its open state to `#connect`. Without JavaScript, all six links remain visible and the button accurately starts expanded.
- The mobile review draft uses a two-by-two resting index. Expanded Connect takes a full row and moves Blog below it rather than compressing the links.
- Destination routes now use a shared three-column field composition on desktop, with the paper in the center and the Home control fixed in the exposed left rail so it remains available while a destination scrolls. Mobile recomposes this into a reserved Home band above the paper.
- The destination Home control uses Igor's latest `Doodles_home.png` drawing as its visible form while retaining the semantic link and accessible name `Home`. Its transparent canvas is cropped in layout so the drawing fills the control without stretching or blurring, and the fixed control is anchored to the paper edge across desktop widths.
- `PaperSurface` has an explicit notebook variant that combines the warm paper token with the retained crumpled-paper material and restrained grain. A shared irregular polygon edge and separate drop shadow keep destination sheets visibly imperfect without changing their content layout. Who I am uses the compact surface option so its unwrapped sheet follows the content rather than filling a page-like height.
- Who I am uses public first-person copy grounded in `docs/CONTEXT_ABOUT_IGOR.md`. It introduces Igor through experience-driven product and gameplay systems work without adding private context or stronger specialization claims.
- The drawn and real portraits are both present in the static document. Enhancement turns them into a locally owned two-card portrait selector with synchronized `aria-pressed` and inactive-panel state. The real portrait is selected by default, and hovering the stack, focusing its controls, or switching portraits starts a fresh restrained card-shuffle motion.
- The unified three-line craft-values checklist exposes every approved word in the static document. Enhancement turns the changing word in each line into a conventional button that cycles its approved alternatives.
- The craft values form a compact three-note composition without form-like horizontal rules. Their checkbox targets align in one readable column, while each visible box uses a distinct irregular SVG pencil contour and a curved tick that draws into place. The native inputs, 48-pixel targets, and visible keyboard focus remain intact. Checking an item draws one loose strikethrough without layering a second browser decoration over it. Completing all three lets the final check settle while a separate invitation sheet slides from beneath the main paper, then scrolls only as far as needed to `I'd love to chat with you.` and the same canonical Connect options used on Home.
- The word `experiences` in the Who I am statement runs a brief staggered color wave after page load and then returns to the headline color. It continues to react letter by letter on precise-pointer hover. Keyboard focus and touch activation expose the same restrained color play without making the headline depend on JavaScript.
- The underlined word `joyful` is a conventional button that cycles through five predefined colors without changing the sentence meaning.
- Work expands locally on Home as two folded-paper links for Software and Games. Enhancement starts it collapsed, maps its open state to `#work`, closes it on outside activation or Escape, and keeps `aria-expanded` synchronized. Without JavaScript, both links remain visible and the button accurately starts expanded.
- `/work/` now redirects to `/#work`. Software and Games remain ordinary nested routes on a warm graph-paper material, and their small paper navigation returns directly to the open Home disclosure.
- The content model now separates `software` and `games`, records honest `featured`, `supporting`, or `trajectory` prominence, and distinguishes complete, ongoing, unfinished, and early work.
- Each approved artifact is presented directly on its Software or Games index. The separate evidence routes have been removed to keep Work simple. Featured work receives the most visual space, the unfinished card-system study is visibly unfinished, and Snake with Go and raylib plus C++ and OpenGL Tic-Tac-Toe remain compact trajectory artifacts.
- Software leads with the complete Flutter product, Chinese Bee, and the receipt-processing investigation. The supplied food-delivery and Chinese Bee showcases now appear directly with those projects, including the Chinese Bee mascot. The payment and expiration work appears as supporting systems work. The verified receipt result appears only on its index record.
- Games leads with `Discourses by Campfire` and `Santa Foundation`, using retained project media. The generic itch.io profile is not presented as the Discourses project URL while its final public destination remains unconfirmed.
- Every Work destination is complete static HTML without a component script. Only the Home disclosure adds local behavior. Software offers both the existing résumé PDF and the matching DOCX as direct downloads. Public game links remain available directly from their index records.

## Foundation audit

| Classification | Source |
| --- | --- |
| Keep | Astro and TypeScript configuration, package and lock files, GitHub Pages workflow, local development script, strict content schemas, verified content entries, public-link configuration, résumé files, favicon, authored portraits and doodles, paper materials, game media, storyboards, and source documents. |
| Replace | Legacy route compositions, `BaseLayout`, shared header and footer, generic interaction and doodle components, the monolithic global stylesheet, and the old Games-specific presentation. |
| Remove | Global `ClientRouter`, shared paper transition configuration, global pointer impact effect, legacy notebook and desk styling, and the separate pixel-interface theme. |
| Defer | Remaining interaction enhancements and release metadata. |

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

## Milestone 3 implementation verification

- `astro check` and the production build pass with zero diagnostics for both `/` and `/personal-website/` base paths.
- All eight current routes continue to generate, and the production Who I am document uses base-aware fonts, images, styles, favicon, canonical URL, and Home link.
- Desktop inspection at 1440 by 900 confirms the centered long-page paper, exposed field rails, reachable sticky Home control, portrait composition, values composition, and no horizontal overflow.
- Mobile inspection at 390 by 844 confirms the reserved Home band, single-column introduction, contained portrait stack, readable values checklist, and no overlap or horizontal overflow.
- The inspected page has one `main`, one `h1`, a Home target at least 44 pixels high, no broken images, and no browser console warnings or errors.
- Pointer activation switches portrait state and cycles craft-value words while keeping `aria-pressed`, `aria-hidden`, and control labels synchronized.
- The generated no-JavaScript document exposes both portraits and every approved word option. Portrait controls remain hidden and word controls remain disabled until their behavior is attached.
- The global reduced-motion rule removes the portrait transition duration without removing either portrait or any value content.
- Igor accepted the destination shell and Who I am vertical slice on 2026-07-22. The optional paper-arrival motion is omitted for now and should not be added unless requested later.

## Milestone 4 implementation verification

- `astro check` and the production build pass with zero diagnostics for both `/` and `/personal-website/` base paths.
- Eight pages generate successfully, including the `/work/` compatibility redirect, two Work indexes, and the base-aware `/games/` compatibility redirect. Individual Software and Games evidence routes are intentionally absent.
- The generated Home document exposes both folded Work links with `aria-expanded="true"` before enhancement. The generated Work destinations use base-aware internal links and contain no client-side scripts, so every artifact, mode, résumé format, and public artifact link remains reachable without JavaScript.
- Desktop inspection at 1440 by 900 confirms the Home Work disclosure, folded choices, exposed destination rails, graph-paper indexes, honest prominence hierarchy, contained project media, and no horizontal overflow.
- Mobile inspection at 390 by 844 confirms the recomposed Work disclosure, readable folded choices, single-column artifact records, full-width game media, contained headings, and no horizontal overflow.
- Inspected routes have one `main`, one `h1`, a Home target 90 by 66 pixels, direct mode links with synchronized `aria-current`, and no browser console warnings or errors.
- Work opens from its button and direct `/#work` loading. Outside pointer activation closes it and removes the hash; Escape closes it, removes the hash, and restores focus to Work. Opening Work and Connect closes the other disclosure.
- Keyboard inspection confirms a visible three-pixel focus outline with a ten-pixel offset on the folded Software choice. The shared reduced-motion rule shortens all Work transitions without removing content.
- Public source copy contains no em dashes. The unconfirmed generic Discourses profile URL is omitted, while unfinished and early artifacts remain explicitly labeled.

## Open inputs and blockers

- Bright Chalk and Cartoon Relief files are present and integrated. Web-embedding rights still need confirmation before release.
- The final public URL for `Discourses by Campfire` still needs confirmation before release.

## Next action

Review milestone 4 on desktop and mobile with Igor. Keep milestone 5 pending until the Work composition and public artifact selection are accepted.
