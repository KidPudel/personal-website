# Website rebuild progress

Last updated: 2026-08-11

## Status

The latest structural correction is implemented. The root page is now a focused personal document: box opening, identity reveal, three craft values, and writing. Contact lives in the persistent side disclosure rather than a repeated footer. The former oversized work and play stream has moved to a dedicated `/work/` page.

The homepage still begins with the scroll-controlled box-opening sequence using the transparent frames in `src/assets/art/Doodles-box-opening/`. The portal reveals `Hello, I’m Igor.`, the existing portrait shuffle, colorful word interactions, a restrained type scale, and direct work and résumé paths. There is no separate `/secret-box/` route.

`/work/` now leads with Observatory, then presents the food product, Chinese Bee, receipt investigation, and payment-flow work. Finished games retain their authored presentation: Discourses uses its gameplay video, Santa uses its layered animated scene, and Snake keeps native video playback. Tic-Tac-Toe and the unfinished card-system study appear as real smaller artifacts rather than archive rows.

Current milestone: **Structural correction complete. Next: visual critique and refinement with Igor**

The latest rhythm pass uses Averia Serif Libre for headings and Bright Chalk for explanatory copy, labels, and interactions. Capriola and Cartoon Relief are not part of the homepage or work-page hierarchy. The full-width navigation bar is removed. A side-mounted control now exposes Work and an expandable contact list, appears with the opened box, and uses Igor's Connect drawing. The separate About section and its invented heading are removed, so the three craft values follow the introduction directly. Existing hand-drawn destination icons mark Writing, Contact, Work, Product design, and Games without gating those sections.

## Hiring-first redesign milestones

The first static implementation proved the content order but exposed a visual risk: repeated cards and editorial landing-page patterns feel too much like a generic portfolio template. They are scaffolding only and must be replaced with artifact-specific compositions before the visual milestone is accepted.

The latest visual iteration removes the formal full-name eyebrow in favor of `Hello, I’m Igor.`, restores the original shuffled real/drawn portrait interaction, and keeps the authored colorful `experiences` and `joyful` word interactions. The compact archive is removed. Project breadth now lives on `/work/`, where each artifact receives appropriate media and prominence.

The identity headline now uses a smaller scale and a wider measure. At the desktop review viewport it reads as a broader statement with fewer line breaks rather than an oversized poster block.

The homepage now follows one centered content spine. The values section rises into the outgoing hero on wide screens to remove the approximately 400-pixel empty handoff, the redundant floating values cue is removed, and decorative doodles are confined to the side gutters. The redundant final contact block is removed because the persistent side disclosure already provides the complete contact path. The rejected overlapping-sphere background has been removed. The current opening experiment ties four saturated field colors directly to the eight box frames and cuts between them without interpolation, keeping the effect controlled by the visitor's scroll and the authored drawing.

| Milestone | Status |
| --- | --- |
| 0. Reconcile documentation and evidence | Complete on 2026-08-11 |
| 1. Static continuous homepage foundation | Complete on 2026-08-11 |
| 2. Scroll-controlled box opening and identity reveal | Complete first pass on 2026-08-11 |
| 3. Dedicated work presentation | Complete structural pass on 2026-08-11 |
| 4. Personal, play, writing, and contact sections | Complete first pass on 2026-08-11 |
| 5. Observatory hiring-evidence pass | Complete on 2026-08-11 |
| 6. Visual restraint and motion pass | Complete first pass on 2026-08-11; visual refinement explicitly deferred to the next iteration |
| 7. Responsive, accessibility, performance, and release | Complete on 2026-08-11 |

Milestone scope and exit conditions live only in `docs/IMPLEMENTATION_PLAN.md`.

## First-pass release verification

- The continuous homepage includes the box opening, identity, three craft values, and writing in one semantic document. It links directly to the separate complete work document and keeps contact available through the addressable side disclosure.
- The unopened box has no floating name-and-role overlay. The real/drawn portrait shuffle and the colorful `experiences` and `joyful` interactions remain in the revealed hero. The authored changing craft values, check-off interaction, and local contact invitation follow the introduction without a separate About section.
- `/work/` is a real portfolio route. `/work/software/` forwards to `/work/#product-design`; `/work/games/` and `/games/` forward to `/work/#games`. Personal compatibility paths still reach their valid homepage anchors.
- The opening uses normal page scroll, exposes a keyboard-reachable skip action, removes revealed content and navigation from interaction until visible, and bypasses the animation for reduced-motion preferences. Essential homepage content remains in the static HTML.
- Desktop inspection at 998 by 943 found one main landmark and one h1 on both documents, no broken images, no horizontal overflow, live game media, and no server warnings or errors. The updated side control is hidden while the box is closed, enters with the reveal, stays inside the viewport on both homepage and work page, and expands all six contact links.
- Responsive inspection used browser viewports at 390 by 844 and 320 by 800. The upright box, revealed hero, work introduction, project media, résumé path, and navigation remain contained without horizontal clipping.
- The current color-flipbook opening was rechecked at 1280 by 720 and 390 by 844 after a clean development-server restart. The lossless box frames paint correctly, the saturated frame colors cut without muddy interpolation, and the opening remains horizontally contained.
- The typography and spacing pass was inspected at 998 by 943 and 390 by 844. Averia Serif Libre headings, Bright Chalk copy and labels, the side navigation control, and the cropped section-marker drawings remain legible and contained.
- The portrait shuffle and changing craft-value word remain operable. The Discourses video autoplays muted when visible, Santa's sleigh and snow animations run, and both embedded videos expose native controls.
- Box frames use the original lossless 2048-pixel PNGs. The previous 1200-pixel lossy WebP conversion left only about 296 pixels across the visible box drawing and was visibly soft on high-density screens; the eight authored PNGs total about 756KB. Non-opening media stays responsive and lazy where it is not immediately needed.
- The obsolete spatial Home, disclosure shell, and legacy work-composition components were removed after the replacement passed verification. The independent article shell and reusable authored interactions remain.
- The production check and build pass with zero errors, warnings, or hints for both `/` and `/personal-website/` base paths. Sitemap generation and a static `404.html` are included.

## Hiring evidence audit

- Observatory is the leading case. It has a working macOS release, five exploratory interviews, authored product direction and interaction work, original identity and motion, and transparent AI-directed implementation.
- Observatory's former `Validation` section is now accurately labeled `Iteration`; it explicitly distinguishes task analysis and design critique from a formal usability study. Homepage and case-study share metadata now include verified project imagery.
- The food-ordering product is strong end-to-end professional evidence, but it remains anonymized and does not yet have an approved standalone evidence set. It stays supporting work for the first redesign pass.
- Chinese Bee demonstrates a coherent product across chat, saved vocabulary, practice, handwriting, recognition, API, and embedded web UI. The repository does not currently support stronger research, adoption, or outcome claims.
- The receipt-processing investigation has a verified performance result from approximately 6 to 10 seconds to approximately 600 to 650 milliseconds. It is valuable supporting evidence for technical product judgment.
- Santa Foundation contains an honest feedback-to-change loop. Discourses by Campfire is a finished authored game experience. Both belong in supporting play and experiments.
- The files named `docs/CONTEXT_ABOUT_IGOR.md` and `docs/PERSONAL_CONTEXT.md` are absent. No implementation may infer the missing facts.
- Availability, location, working arrangement, additional collaborators, business metrics, and a second full case study remain evidence gaps until Igor verifies them.

## Completed previous rebuild milestones

| Milestone | Status |
| --- | --- |
| 0. Documentation reset | Complete |
| 1. Clean foundation | Complete |
| 2. Home | Complete |
| 3. Destination composition and Who I am | Complete |
| 4. Work | Complete |
| 5. Blog and contact completion | Blog and Connect complete; article copy pending |
| 6. Interaction, responsive behavior, and accessibility | Complete |
| 7. Who I am fragment-unfolding prototype | Complete; approved by Igor on 2026-07-24 |
| 8. Complete fragment-addressed spatial field | Complete; approved by Igor on 2026-07-24 |
| 9. secret box page | Complete; approved by Igor on 2026-07-24 |
| 10. Release | Pending |

## Active hiring-first direction

- Goal number one is to help Igor get hired as a product designer.
- The separate `/secret-box/` route is removed in the redesign.
- `/` begins with the box opening in the same continuous document as the homepage.
- Ordinary scroll progress advances the new transparent frames in `src/assets/art/Doodles-box-opening/`.
- A black circular portal expands from inside the box and reveals the homepage content beneath it.
- The transparent frames may be inverted or recolored for the final surfaces.
- The opening reveals Igor's name, `Product designer`, an approved positioning statement, and immediate selected-work access.
- The empty four-direction Home is removed.
- `/` becomes one continuous, vertically scrolling homepage.
- The homepage order is identity, craft values, and writing, with work and contact persistently available in the side control.
- Observatory leads product work and remains a separate editorial case study for depth.
- Work must be visible in or at the edge of the first viewport.
- Product design is primary. Games and technical experiments are supporting evidence.
- Remove central hubs, diagram-like spokes, long decorative connectors, repeated route labels, and excess background doodles.
- Remove the graphite field, persistent grain, and complex shared-world presentation.
- Use clean black-and-warm-white surfaces with at most one controlled accent at a time.
- Use personal doodles only as simple CSS background images that scroll normally with the document, without parallax, interaction, or route state.
- Preserve authentic drawings, portrait interaction, craft values, purposeful imperfections, and the approved paper invitation.
- Use proximity, hierarchy, alignment, and negative space for relationships. The visual principle is handmade minimalism.
- Correct Observatory's validation and outcome language before treating it as final hiring evidence.
- Historical verification below describes the implemented baseline, not the newly approved presentation target.

## Superseded direction record

- On 2026-07-24, Igor approved the completed Who I am unfolding prototype as the model for milestone 8.
- On 2026-07-24, Igor approved the completed Software, Games, and Blog milestone 8 unfoldings.
- On 2026-07-24, Igor approved spatial route unfolding for Who I am, Software, Games, and Blog on suitable wide screens.
- The unfolding must behave like the existing Connect and Work disclosures. It is actual expanded layout state within the persistent Home field, not a visual transition between separate page compositions.
- The intended states use fragments of the Home document rather than separate destination paths: `/#who-i-am`, `/#work`, `/#work/software`, `/#work/games`, `/#connect`, and `/#blog`.
- Direct fragment loads reveal the corresponding disclosure. In-session activation changes the hash without replacing the Home document, and Back or Forward restores the previous expanded or collapsed state.
- Milestone 7 tests only `/#who-i-am`. Milestone 8 applies the validated model to Software, Games, and the Blog index.
- The spatial entrance may use two-dimensional movement, but the long-form reading axis remains vertical. Horizontal document scrolling is not part of the direction.
- Hand-drawn paths, spines, and loose alternating placements should connect each bounded opening composition to its downward content sequence.
- While a destination is open, the other Home clusters recede into faint spatial traces rather than remaining as a complete competing navigation composition.
- Those faint traces belong near the opening composition and should recede as the visitor scrolls deeper.
- Mobile and other narrow viewports present the targeted fragment section as a full-screen composition.
- The milestone 6 implementation remains the verified content baseline. Milestones 7 and 8 now own the accepted fragment-addressed presentation and interaction model.
- On 2026-07-23, Igor established the persistent graphite field and hand-drawn borders, spines, paths, and annotations as the default language for destination routes.
- Paper is now exceptional rather than structural. It may appear only where Igor explicitly identifies the exact element and purpose.
- The paper invitation revealed after completing all three Who I am craft values is also an explicitly approved paper use.
- Who I am, Software, Games, and Blog now implement the hand-drawn field direction.
- Historical checks remain valid records of what was previously built, but their paper-based visual acceptance is superseded by this direction change.

## Implemented baseline before the hiring-first redesign

- `docs/CONCEPT_DESIGN.md` is the sole design and product authority.
- The old presentation code is not a visual baseline.
- `docs/ARCHITECTURE.md` is the technical baseline. No current destination route uses `LegacyPaperSurface`.
- Astro is updated to 7.1.3. TypeScript remains on the newest supported 6.x release because Astro Check does not yet support TypeScript 7.
- `BaseDocument`, `WorldField`, and `HomeReturn` remain the shared shell primitives. `WorldField` provides a responsive destination content track and a separate sticky Home track without imposing a route surface. The unused `LegacyPaperSurface` component was removed after the final route migration.
- The clean shell has no global client router, page-transition controller, global click effect, UI framework, or client-side state.
- JavaScript is a first-class requirement for the intended spatial interaction. The TypeScript SpatialRouteShell owns unfolding motion, fragment-state synchronization, accessibility state, focus, scroll restoration, history response, and lazy media activation.
- Semantic destination sections and generic `:target` visibility provide direct-link and no-JavaScript resilience; they are not the intended finished interaction by themselves.
- A cross-document View Transition alone does not satisfy the direction because it replaces one route presentation with another instead of expanding destination content inside the persistent field.
- Destination openings may unfold in two dimensions, but long content will keep ordinary vertical page scrolling without horizontal overflow or nested scrolling panels.
- Who I am is the approved destination disclosure inside Home. Software, Games, and Blog now use the same fragment shell while their ground-up milestone 8 presentations remain under review.
- `/who-i-am/`, `/work/`, `/work/software/`, `/work/games/`, `/games/`, `/blog/`, and `/connect/` are base-aware compatibility redirects to their matching Home fragments.
- Bright Chalk is the locally hosted reading and interface family. Cartoon Relief is the locally hosted distinctive-display family. Both ship as WOFF2 generated from the supplied TrueType sources.
- Home navigation uses fragment links for Who I am and Blog, plus disclosure buttons for Work and Connect. Reading and keyboard order is Who I am, Work, Connect, Blog.
- Desktop Home follows the overview storyboard's cross-shaped placement: Who I am above, Connect left, Work right, and Blog below. The visual arrangement does not change the semantic source order.
- Home uses Igor's four hand-drawn navigation icons for Who I am, Work, Connect, and Blog. Each visible label has its own loose, drawing-relative placement while remaining the accessible navigation name.
- Hovering or keyboard-focusing any primary drawn navigation control, including the destination Home icon, now plays a restrained stepped wobble around that drawing's individual resting angle. Its shared duration token controls the four Home choices and destination Home icon together, while the shared reduced-motion rule limits the effect to one near-instant frame.
- The persistent field uses a warm graphite base with restrained grain, faded tonal variation, and softened imperfect edges. It is the route surface itself on Home and every destination.
- Nine existing Igor-authored doodles now form one shell-owned background layer shared by Home and every destination route. Their placements are unified in `WorldField`, with lower destination opacity so they remain behind the route composition. Who I am no longer duplicates bird, camera, or robot drawings locally.
- Connect is collapsed after enhancement and opens a vertical six-link list above its Home drawing, with a short hand-drawn line connecting the list to the cluster. Each destination uses a different existing chalk accent on hover and keyboard focus. The disclosure keeps `aria-expanded` synchronized, maps its open state to `#connect`, closes on outside activation or Escape, and restores focus after Escape. Without JavaScript, all six links remain visible and the button accurately starts expanded.
- The mobile review draft uses a two-by-two resting index. Expanded Connect takes a full row, wraps the links horizontally above its drawing, and moves Blog below it rather than compressing the links.
- Destination routes use the persistent field directly, with route-owned hand-drawn borders, spines, paths, annotations, and responsive safe areas. Who I am, Software, Games, and Blog now use this language.
- The destination Home control uses Igor's latest `Doodles_home.png` drawing while retaining the semantic link and accessible name `Home`. It now occupies the shared sticky edge track on desktop and the reserved field band above content on mobile, independent of any paper edge.
- The obsolete legacy destination paper surface has been removed.
- Who I am uses public first-person copy grounded in `docs/CONTEXT_ABOUT_IGOR.md`. It introduces Igor through experience-driven product and gameplay systems work without adding private context or stronger specialization claims.
- The drawn and real portraits are both present in the static document. Their frames are now open hand-drawn outlines without paper backing or tape. The `real me` caption sits on the left edge and `drawn me` stays on the right; the caption belonging to the portrait underneath is darker than the active caption. Enhancement makes the image stack itself the portrait switch, with a changing accessible action label and synchronized inactive-panel state instead of a redundant text-control row. The real portrait is selected by default, and hovering, focusing, or activating the stack starts a fresh restrained card-shuffle motion.
- The unified three-line craft-values checklist exposes every approved word in the static document. Enhancement turns the changing word in each line into a conventional button that cycles its approved alternatives.
- The craft values form a compact three-note composition connected by hand-drawn paths to a dashed secret area. Their checkbox targets align in one readable column, while each visible box uses a distinct irregular SVG pencil contour and a curved tick that draws into place. The native inputs, 48-pixel targets, and visible keyboard focus remain valid. Completing all three reveals the explicitly approved paper invitation directly over the secret area.
- The word `experiences` in the Who I am statement runs a brief staggered color wave after page load and then returns to the headline color. It continues to react letter by letter on precise-pointer hover. Keyboard focus and touch activation expose the same restrained color play without making the headline depend on JavaScript.
- The underlined word `joyful` is a conventional button that cycles through five predefined colors without changing the sentence meaning.
- Work expands locally on Home as two linked Igor-drawn icon nodes labeled Software and Games. Drawn connector strokes branch from Work to both destinations. Wide screens use a vertical stack with a small horizontal offset; mobile uses a connected side-by-side arrangement. Each complete icon-and-name node links to its destination and uses the shared restrained wobble on hover or keyboard focus. The panel stays anchored to the Work drawing and recomposes for narrow screens. Enhancement starts it collapsed, maps its open state to `#work`, closes it on outside activation or Escape, and keeps `aria-expanded` synchronized. Without JavaScript, both links remain visible and the button accurately starts expanded.
- `/work/` redirects to `/#work`. Software and Games unfold from the Work child drawings at `/#work/software` and `/#work/games`. Their route navigation uses hand-drawn text, a connecting line, and an active underline rather than paper.
- The content model now separates `software` and `games`, records honest `featured`, `supporting`, or `trajectory` prominence, and distinguishes complete, ongoing, unfinished, and early work.
- Each concept-approved artifact is presented directly on its Software or Games index. The separate evidence routes remain absent to keep Work simple. Featured work receives the most visual space, while Snake with Go and raylib plus C++ and OpenGL Tic-Tac-Toe remain compact trajectory artifacts.
- Software contains the complete Flutter product, Chinese Bee, and the receipt-processing investigation. The supplied food-delivery and Chinese Bee showcases appear directly with those projects, including the Chinese Bee mascot. The verified receipt result appears only on its index record.
- Games contains `Discourses by Campfire`, `Santa Foundation`, Snake with Go and raylib, and C++ with OpenGL Tic-Tac-Toe. Retained media supports the two finished games. Discourses links directly to its confirmed itch.io game page.
- The verified payment and expiration entry and unfinished card-system entry remain in the typed content collection but are not published on these indexes because the current concept names the exact public selections.
- Work project records no longer display promotional summaries, visible category headings, status badges, or hashtag rows. Real media and project names lead each composition; explicit learning notes appear in a quiet handwritten list titled `Learned along an artifact`.
- Every Work destination remains complete static HTML inside Home and is coordinated only by the scoped SpatialRouteShell. Software offers the interactive-product résumé as PDF and DOCX downloads. Games offers the game-development résumé in both formats. Public game links remain available directly from their index records.
- Blog unfolds at `/#blog` as a calm field composition with incomplete hand-drawn boundaries, generous spacing, and a concise writing list rather than a paper surface or card grid.
- The verified `Identity Cage` entry remains a draft for local publication, so the Blog index links to the existing Medium publication instead of exposing placeholder copy as a finished local article.
- `/blog/[slug]/` is a static, JavaScript-free local article presentation generated only for writing entries whose `draft` field is false. It includes base-aware Blog and Home navigation, readable long-form typography, and an optional canonical publication link.

## Foundation audit

| Classification | Source |
| --- | --- |
| Keep | Astro and TypeScript configuration, package and lock files, GitHub Pages workflow, local development script, strict content schemas, verified content entries, public-link configuration, résumé files, favicon, authored portraits and doodles, paper materials, game media, storyboards, and source documents. |
| Replace | Legacy route compositions, `BaseLayout`, shared header and footer, generic interaction and doodle components, the monolithic global stylesheet, and the old Games-specific presentation. |
| Remove | Global `ClientRouter`, shared paper transition configuration, global pointer impact effect, legacy notebook and desk styling, and the separate pixel-interface theme. |
| Defer | Full fragment-field migration and release metadata until the Who I am prototype is accepted. |

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

## Milestone 3 hand-drawn rework verification

- `astro check` and production builds pass with zero diagnostics for both `/` and `/personal-website/` base paths.
- `WorldField` now owns the persistent field, the nine-doodle shared background layer, responsive content track, and Home track. Paper styling moved out of the global foundation and remains locally owned by `LegacyPaperSurface` under material components until the remaining routes are migrated.
- Who I am no longer imports or renders `PaperSurface` or its own duplicate doodle layer. Its open field composition follows `reduce_paper_storyboard.png` with incomplete side borders, shared shell doodles, outlined portraits, connecting paths, and the dashed secret area.
- Desktop and mobile inspection confirms all nine shell doodles remain present on Home and Who I am, with restrained destination opacity, no route-owned duplicates, and no horizontal overflow.
- Desktop inspection at 1440 by 900 confirms the 90 by 66 pixel sticky Home control, hand-drawn composition, readable introduction and values, and no horizontal overflow.
- Mobile inspection at 390 by 844 confirms the reserved Home band, single-column composition, readable portrait and checklist states, visible side boundaries, and no horizontal overflow.
- One short fixed-aspect hand-drawn arrow sits between the middle checkbox and the dashed secret area, pointing left without distorting on wider screens. Completing all three values reveals the explicitly approved uneven, visibly textured paper invitation inside that area while preserving visible space between the paper and dashed boundary on desktop and mobile.
- The inspected Who I am route has one `main`, one `h1`, no route-level paper surface, no broken images, and no browser console warnings or errors.
- A desktop Software inspection confirms that isolating legacy paper styles in `LegacyPaperSurface` did not break the still-unmigrated Work route.

## Initial milestone 4 implementation verification

- `astro check` and the production build pass with zero diagnostics for both `/` and `/personal-website/` base paths.
- Eight pages generate successfully, including the `/work/` compatibility redirect, two Work indexes, and the base-aware `/games/` compatibility redirect. Individual Software and Games evidence routes are intentionally absent.
- The generated Home document exposes both folded Work links with `aria-expanded="true"` before enhancement. The generated Work destinations use base-aware internal links and contain no client-side scripts, so every artifact, mode, résumé format, and public artifact link remains reachable without JavaScript.
- Desktop inspection at 1440 by 900 confirms the Home Work disclosure, folded choices, exposed destination rails, graph-paper indexes, honest prominence hierarchy, contained project media, and no horizontal overflow.
- Mobile inspection at 390 by 844 confirms the recomposed Work disclosure, readable folded choices, single-column artifact records, full-width game media, contained headings, and no horizontal overflow.
- The folded choices now clear the Work label and surrounding Home drawings at 1440, 1094, and 792 pixel widths, remain side by side at 550 and 390 pixels, and stack without clipping at the 320-pixel minimum width.
- Inspected routes have one `main`, one `h1`, a Home target 90 by 66 pixels, direct mode links with synchronized `aria-current`, and no browser console warnings or errors.
- Work opens from its button and direct `/#work` loading. Outside pointer activation closes it and removes the hash; Escape closes it, removes the hash, and restores focus to Work. Opening Work and Connect closes the other disclosure.
- Keyboard inspection confirms a visible three-pixel focus outline with a ten-pixel offset on the folded Software choice. The shared reduced-motion rule shortens all Work transitions without removing content.
- Public source copy contains no em dashes. Discourses uses its confirmed direct itch.io URL, while unfinished and early artifacts remain explicitly labeled.

## Milestone 4 hand-drawn rework verification

- `astro check`, the production build, and `git diff --check` pass. All eight routes continue to generate.
- Software and Games no longer import or render a legacy paper surface. Their navigation and every project record sit directly on the persistent field without a paper background.
- The long routes use open side boundaries, recurring spines, attached project frames, drawn connector marks, and distinct blue or coral route accents. Software and Games share the Work content behavior without becoming identical route surfaces.
- Software publishes the three artifacts named in the concept. Games publishes the four artifacts named there. The additional verified source entries remain preserved but unpublished.
- Desktop inspection at 1440 by 900 confirms readable opening compositions, exposed shared doodles, contained project media, a 90 by 66 pixel sticky Home control, and no horizontal overflow.
- Mobile inspection at 390 by 844 confirms the reserved Home band, single-column project flow, readable route switcher and headings, intact media, and no horizontal overflow. The Software route also remains contained at the 320-pixel minimum width.
- Both inspected indexes have one `main`, one `h1`, semantic section and project headings, synchronized `aria-current`, complete images, and static access to all published links and résumé downloads.
- Public Work source copy contains no em dashes. The confirmed Discourses destination appears as a direct project link.

## Milestone 4 loose-composition refinement

- The selected Flutter summary and every equivalent project summary were removed from the rendered Work indexes while their verified source records remain intact.
- Visible portfolio group labels, enclosing project frames, repeated completion labels, and hashtag styling were removed.
- Software capability notes and explicit Games learning notes appear as one concise `What I've learned` list beside each project.
- Games no longer treats engine, jam, status metadata, or end-to-end ownership as learning. Discourses records player experience, technical game design, environment aesthetics and dialogue, FL Studio music, Blender 3D art, behaviour modeling, and system structuring. Santa Foundation records interaction design, game-jam development, player experience, technical game design, and behaviour modeling. The user-confirmed early experiment notes record game development using raylib for Snake and graphics programming for Tic-Tac-Toe.
- Desktop inspection at 1440 by 900 and the comment viewport at 860 by 943 confirms each list remains secondary to its project title and media.
- Mobile inspection at 390 by 844 places the list beneath the project title. The 320-pixel minimum remains free of horizontal overflow.

## Home Work icon-link refinement

- The Work disclosure uses the supplied Software and Games drawings as the only two destination nodes. The whole icon-and-name pair is a semantic route link.
- Two imperfect drawn connector strokes visibly branch from the Work node. At desktop and tablet widths the destinations form a vertical stack with a slight horizontal offset; at mobile widths they recompose into a connected side-by-side pair.
- The Games drawing was reduced within its node so its full contour remains visible rather than touching or clipping the crop.
- Desktop inspection at 1440 by 900, tablet inspection at 792 by 900, mobile inspection at 390 by 844, and the 320-pixel minimum confirm complete icons, readable names, and no horizontal overflow.
- Activating Software reaches `/work/software/`; activating Games reaches `/work/games/`. Both retain the shared drawn-icon wobble for hover and keyboard focus.

## Games media refinement

- Discourses uses an optimized animated derivative of the supplied teaser GIF, with its prior winter still selected when reduced motion is requested. It does not reuse Santa Foundation snow.
- Santa Foundation now crops its two-frame sleigh sheet to one visible elf, places it left of center, animates those authored frames with a pronounced vertical flight range, and distributes eighteen varied instances of the original snowflake sprite across the scene. The sleigh animation stops and the snowfall is hidden under reduced motion.
- Snake uses the video from Igor's linked X post with local poster artwork and native playback controls.
- Tic-Tac-Toe replaces the drawn placeholder with the real screenshot published in its repository README.
- Inspection at 1007 by 943 confirms the snow is distributed throughout the Santa scene and the sleigh travels substantially farther vertically. At 390 by 844, the Snake and Tic-Tac-Toe learning notes remain contained without horizontal overflow.
- Earlier experiments use one full-width route sequence instead of two narrow desktop columns. At 1440 by 900, 601 by 943, and 390 by 844, project media and titles remain contained without horizontal overflow.

## Software opening refinement

- The wide-screen opening uses a shorter composition instead of a tall vertically centered title area.
- `My professional work and what I have learned from it.` appears beneath the Software title.
- The résumé PDF and DOCX downloads now share the opening composition with the title on desktop and stack beneath it at narrower widths.
- Desktop inspection at 1440 by 900 brings the first artifact into the opening viewport with no horizontal overflow. Mobile inspection at 390 by 844 and the 320-pixel minimum confirms the framing copy and both résumé links remain contained and readable.
- Games uses an additionally compact wide-screen intro so its title and first artifact sit higher without changing the established mobile composition.

## Home shared-doodle refinement

- The shared scribble doodle sits farther right at desktop and tablet widths so its lower edge no longer overlaps the `Who I am` navigation drawing.
- Empty areas of the Home navigation grid pass pointer input through to the shared doodles, while all four navigation controls retain their complete interactive targets.
- The existing mobile placement remains unchanged.

## Home disclosure load-state refinement

- Work and Connect now render their panels hidden for JavaScript-enabled visits, preventing their expanded layouts from flashing before the disclosure components initialize.
- A pre-paint document marker scopes the existing expanded fallback to JavaScript-free visits, where all Work and Connect destinations remain statically accessible and the buttons retain their accurate expanded state.

## Milestone 5 Blog implementation verification

- `astro check` and the production build pass with zero diagnostics for both `/` and `/personal-website/` base paths.
- The Blog index is complete static HTML without a component script and does not use `LegacyPaperSurface`.
- Desktop inspection at 1440 by 900 confirms the persistent field, calm hand-drawn boundary, readable writing hierarchy, 90 by 66 pixel Home control, and no horizontal overflow.
- Mobile inspection at 390 by 844 confirms the reserved Home band, contained writing entry, readable link and summary, and no horizontal overflow.
- The inspected Blog index has one `main`, one `h1`, one semantic writing-list article, no broken images, and no browser console warnings or errors.
- A temporary local render of `Identity Cage` verified the article presentation at desktop and mobile sizes before its content entry was restored to draft state. The route has one `main`, one `h1`, one `article`, a 44-pixel-high Blog return link, contained reading width, and no horizontal overflow.
- The current production build intentionally remains at eight generated pages because no writing entry is approved for local publication yet.

## Milestone 5 Connect implementation verification

- `astro check` and production builds pass with zero diagnostics for both `/` and `/personal-website/` base paths.
- Desktop inspection at 1440 by 900 confirms the vertical link list opens above the Connect drawing, clears the other three Home choices, and introduces no horizontal or vertical overflow.
- Mobile inspection at 390 by 844 confirms the full-row disclosure wraps all six links horizontally above the Connect drawing, moves Blog below it, and introduces no horizontal or vertical overflow.
- The generated Home document exposes all six links in the approved order with `aria-expanded="true"` before enhancement, including the base-aware résumé destination.
- Direct loading of `/#connect`, toggle activation, outside activation, and Escape keep the hash, expanded state, panel visibility, and focus behavior synchronized.
- The six Connect links each receive a distinct chalk accent on hover and keyboard focus while retaining the shared visible focus outline.

## Milestone 6 verification

- A section-by-section review of Home, Who I am, Software, Games, and Blog confirms that each current public composition still expresses the authored persistent-field and hand-drawn route language.
- Desktop inspection at 1440 by 900, mobile inspection at 390 by 844, and minimum-width inspection at 320 by 800 confirm readable recomposition, reserved Home areas, intact media, and no horizontal overflow.
- Switching directly between open Work and Connect disclosures now succeeds with one mouse or touch activation. Outside activation, Escape focus restoration, direct `#work` and `#connect` loading, compatibility redirects, ordinary route history, and synchronized expanded states pass.
- Hover-only wobble is limited to precise pointers. Keyboard focus retains the same response and visible three-pixel focus outline, while touch activation no longer risks a persistent hover animation.
- Every visible interactive target is at least 44 by 44 CSS pixels, including short inline word controls, single-character contact links, and the links in the revealed Who I am invitation.
- Each reviewed route has one `main`, one `h1`, a skip link, semantic navigation and section structure, hidden decorative drawings, descriptive evidence-image alternatives, readable text contrast, and no browser console warnings or errors.
- The generated JavaScript-free documents expose both Home disclosures and their destinations, both portraits, every craft-word option, every published project and link, and accurate expanded fallback states. Software, Games, and Blog remain static without component scripts.
- Reduced-motion handling removes travel and repeated animation, makes completion scrolling immediate, substitutes the static Discourses scene, stops the Santa sleigh, and hides its snowfall without removing content.
- Locally hosted WOFF2 fonts, the single reading-font preload, responsive Astro image derivatives, the optimized Discourses animation, native lazy loading, bounded video preload, and route-local enhancement keep the current client and media work proportionate.
- `astro check`, root and `/personal-website/` production builds, generated-document checks, public-copy checks, and `git diff --check` pass.

## Milestone 7 verification

- `/#who-i-am` now reveals the complete Who I am content inside the Home document. The authored Home map remains mounted, the selected cluster stays as the literal wide-screen hinge, and the other clusters recede as faint traces confined to the opening composition.
- The wide-screen opening is a new constellation rather than a retained destination-page frame: the portrait sits upper-left, the introduction upper-right, the craft notes continue below the origin, and the secret area completes the lower-left branch. There is no enclosing route border, old hero split, horizontal document scrolling, or nested scrolling surface.
- Every enhanced connector path is calculated from the selected Who drawing's rendered center to its current content target, so all four branches stay attached to the origin across responsive layout changes.
- Activation stages the connector strokes, introduction, craft notes, portrait stack, and secret area individually. Direct fragment loads use the same staged entrance after typography and layout stabilize, and reduced-motion rules preserve all content while removing spatial travel.
- The separate Home drawing is removed from this disclosure. The selected Who cluster remains reachable as a 96 by 96 pixel control on narrow screens and collapses the disclosure with one activation on both direct loads and in-session openings.
- Desktop inspection at 1440 by 900 and the 1084 by 943 browser-pane width confirms readable separation around the selected origin and no horizontal overflow.
- Mobile at 390 by 844 and the 320-pixel minimum width presents Who I am as a full-screen vertical composition with the selected Who control in its reserved top band, readable content, functional portrait and craft-value controls, and no horizontal overflow.
- Activation, direct `/#who-i-am` loading, reload, Back, Forward, selected-cluster collapse, and Escape keep the fragment, disclosure visibility, document title, `aria-expanded`, Home-map availability, scroll position, and focus synchronized without replacing the Home document.
- The enhanced disclosure's visible state follows its synchronized `hidden` attribute rather than relying on `:target` to react to `pushState`; `:target` remains the direct-fragment and JavaScript-free fallback.
- Direct cold loads now wait for font readiness or a 350-millisecond fallback plus two layout frames before calculating connector geometry and starting the entrance. The selected Who drawing receives a distinct 900-millisecond stepped wobble on first load and reload. The shell removes its temporary entrance state after 950 milliseconds so it cannot override the drawing's normal hover and keyboard-focus wobble. A scoped resize observer keeps all four path starts attached to its rendered center as typography or layout settles.
- The generated static Home document contains the complete semantic Who I am section with a synchronized `hidden` baseline, and the production stylesheet exposes it through `:target` before enhancement. The old `/who-i-am/` document is now a base-aware, `noindex` compatibility redirect to `/#who-i-am`.
- Both portrait images remain in the static document with descriptive alternatives and `loading="lazy"`. Completing all three craft values still reveals the approved paper invitation, and the active disclosure no longer allows shared decorative doodles to intercept its controls.
- The portrait stack itself switches between real and drawn views by pointer or keyboard activation. The redundant selector row below the cards is removed while the in-frame captions remain.
- Visible Who I am interaction targets are at least 44 by 44 CSS pixels. Root and `/personal-website/` production builds, `astro check`, generated-fragment checks, compatibility redirect checks, public-copy checks, and `git diff --check` pass.

## Milestone 8 verification

- `/#work/software`, `/#work/games`, and `/#blog` now contain the complete Software, Games, and Blog compositions inside the Home document alongside the approved Who I am disclosure.
- Software and Games unfold from their selected Work child drawings. Blog unfolds from its Home drawing. Each selected origin remains mounted and reachable as the collapse control while the other clusters recede into faint traces confined to the opening composition.
- The previous `WorkInventory`, `WorkArtifact`, `WorkModeNav`, and `WritingEntry` presentation structures were removed. Software, Games, and Blog now own new opening constellations, paths, placements, and unfolding sequences built around their content.
- Software and Games reveal authentic project media as the visitor reaches it, retain the verified learning notes and links, and arrange later project artifacts in paired rows on wider screens. They return to one continuous column at 64rem and below. The redundant Software artifact-navigation list was removed, and the first Software artifact now participates in the opening constellation like the first Games artifact.
- Connector paths are calculated from each selected drawing's rendered center to the destination opening, so the path remains attached across wide-screen layout changes. Activation stages the origin, path, opening pieces, and media while direct fragment loads show the settled opening state.
- The one scoped SpatialRouteShell now coordinates all four full destination disclosures. Only one is visible at a time, document titles and expanded states follow the fragment, entry focus moves to the active heading, and Back, Forward, selected-origin activation, and Escape restore the correct destination or collapsed state.
- Work and Connect retain their local disclosure behavior. Returning from a Work destination restores `#work`, its two child choices, and focus to the selected child without replacing the Home document.
- Mobile at 390 by 844 presents Software, Games, and Blog as full-screen vertical compositions with a 96 by 96 pixel selected-origin control in the reserved top band. The 320-pixel minimum width remains readable without horizontal overflow.
- Desktop inspection at 1440 by 900 and 1084 by 943 confirms readable opening constellations and two-artifact rows. At 320 by 800, every destination and its active origin remain contained and reachable without horizontal overflow.
- Direct Software and Games loads explicitly synchronize the Work child panel with the active destination. Hit testing and selected-origin activation confirm that the origin sits above the unfolding field and collapses the route instead of being intercepted by opening content.
- Ordinary clicks elsewhere in an active Software or Games fragment no longer close the Work child panel or make the selected origin disappear. The spatial shell retains ownership of that state until the visitor activates the origin, presses Escape, follows history, or opens another destination.
- Work images use native lazy loading. The Snake video begins with no preload, activates metadata only while Games is open, pauses and returns to no preload when another destination becomes active.
- The static Home document contains all four semantic destination sections. Their synchronized `hidden` baseline exposes only the targeted section through `:target` without JavaScript while preserving every project, article link, media alternative, résumé link, and destination heading.
- `/work/software/`, `/work/games/`, `/games/`, and `/blog/` are base-aware, `noindex` compatibility redirects to their matching Home fragments. Published Blog articles remain independent routes.
- Root and `/personal-website/` production builds, `astro check`, public-copy checks, direct-fragment and selected-origin checks, minimum-width checks, and `git diff --check` pass. Igor approved milestone 8 on 2026-07-24.

## Milestone 9 verification

- `/secret-box/` is a separate, directly addressable entry document. `/` remains the dependable Home URL, and the Secret box links to Home without JavaScript.
- The page reuses the Home field color, grain, tonal variation, and softened edges while omitting every shared background doodle.
- The supplied nine authored frames are eagerly available in one centered, keyboard-accessible link. Activation advances the sequence at 3 FPS, holds the final frame, closes a circular iris, and then navigates to Home.
- A subdued Bright Chalk warning below the box's right edge says `Do not open`, tilts left, and underlines `not`.
- Activating the box keeps `not` visible but replaces its underline with a strikethrough during the opening sequence.
- The lower-right reflection `Curiosity killed the cat, but satisfaction brought it back.` remains absent until the visitor chooses to open the Secret box, then appears during the authored frame sequence.
- On precise pointers, hovering the box applies a restrained stepped shake to the drawing only. Leaving hover stops it, and activation disables it before the authored opening sequence begins.
- The warning remains visually attached below the box but sits outside the semantic Home link, so only the box area activates the sequence.
- Repeated activation is suppressed while the sequence is playing. The interaction announces its state to assistive technology, retains a semantic Home fallback, and skips the stepped sequence when reduced motion is requested.
- Desktop inspection at 1440 by 900 and mobile inspection at 390 by 844 confirm a centered box, complete authored drawing, no doodles, no horizontal overflow, and all nine frames loaded.
- Browser interaction inspection confirms an intermediate frame appears during playback, the ninth frame is active when the iris begins, and navigation completes at `/`.
- The generated document has one `main`, one `h1`, a named link, a skip link, and base-aware Home and asset URLs. Root and `/personal-website/` production builds, `astro check`, public-copy checks, and `git diff --check` pass.
- Igor approved the completed milestone 9 Secret box on 2026-07-24.
- A mobile follow-up keeps `/secret-box/` locked to the visible dynamic viewport, scales the box for unusually short screens, keeps the revealed cat reflection visible, and prevents hard edge scrolling from exposing an untextured root surface.

## Who I am copy refinement

- The craft-values heading now reads `3 things important to me`.
- The introduction now describes bringing a desire to life as something joyful to interact with.

## Software project-heading refinement

- The Flutter and Chinese Bee records now lead with the concrete experience each artifact brought to users rather than a construction-oriented phrase or product name alone.
- On wide screens, Chinese Bee now forms one horizontal row with its image on the left and its title and learning notes on the right. The receipt-processing project continues below in the opposite direction, with its details on the left and image on the right. Narrow screens retain the media-first single-column flow.

## Observatory Software showcase

- Observatory now leads the existing `/#work/software` journey. It does not create another top-level destination or change the Home navigation model.
- The public record uses the released project repository, authored launch-film artwork, and Igor's public project descriptions as its evidence boundary. It states the product's application-level monitoring, controlled tests, saved comparisons, local storage, product direction, design, artwork, launch-film work, and AI-directed implementation without inventing metrics or responsibilities.
- The opening links directly to the launch film, project and source, and current release. A quieter follow-on line preserves the supplied Instagram, X, Product Design, Motion Design, and LinkedIn posts.
- The authored telescope icon and launch-film composition are stored with the site and optimized through the existing Astro image pipeline. No new dependency, route, or client-side media behavior was added.
- The launch-film prompt sits in the media's upper-left corner, clear of the overlapping telescope icon at desktop and mobile widths.
- The Flutter, Chinese Bee, and receipt-processing artifacts remain intact below Observatory and are renumbered along an extended hand-drawn trail.
- Browser inspection at 1440 by 900, 1084 by 943, 390 by 844, and 320 by 800 confirms readable placement, 44-pixel link targets, intact selected-origin behavior, and no horizontal overflow. The production build and `git diff --check` pass without diagnostics.

## Résumé rewrite

- Software and Games résumé PDF links now open in the browser's PDF viewer, where visitors can preview or download them. DOCX links remain direct downloads.
- Two two-page Word résumés now target interactive product design and engineering, and game design and gameplay systems development.
- Both lead with designing experiences and behavior, then building the systems that make those designs real. The interactive-product version now presents product work first and moves fintech systems work to additional professional experience.
- PizzaSushiWok is positioned as `Mobile Product Designer & Developer`, with concrete evidence covering the product consolidation proposal, ordering journey, interaction behavior, production delivery, and supporting system decisions.
- A short-term `Mobile Game Designer & Prototype Developer` engagement was added for November 2022 through January 2023. It covers rapid Android game prototyping in Unity and Jetpack Compose, plus ownership of player experience, interaction flow, feedback, presentation, and scope decisions.
- The broader evidence includes product shaping, interaction and mechanic design, end-to-end implementation, investigation, feedback-driven iteration, multidisciplinary creation, teaching, and mentoring.
- The two fintech roles use the accurate title `Developer`, describe startup autonomy and decision-making, and no longer imply officially held backend-engineering positions.
- Both use the verified capability and evidence boundaries in `docs/CONTEXT_ABOUT_IGOR.md`. Unsupported specialization claims and unverified metrics from the previous résumé were removed.
- Both use a single-column, table-free, graphic-free structure with semantic headings, real list numbering, visible contact links, and privacy-scrubbed metadata.
- Final render inspection, text extraction, and accessibility audits pass for both files.
- The site’s existing generic résumé PDF and DOCX now contain the interactive-product version, preserving the established download URLs used by Connect and Software. Games now presents dedicated game-development PDF and DOCX downloads in its opening composition.
- The production build passes. The Games download object was inspected at 1440 by 900, 390 by 844, and the 320-pixel minimum with no horizontal overflow, readable placement, and 44-pixel minimum download targets.
- Observatory now leads the interactive-product résumé's Relevant Product Experience. Its record covers the working macOS product, product and behavior specifications, information architecture, UX/UI, original telescope artwork, visual identity, AI-directed application development, and the 2:11 launch film without implying that Igor personally wrote the application code.
- The professional summary and capability lines now include the verified product-direction, information-architecture, visual-identity, motion-direction, and specification-led AI-development evidence. Chinese Bee moves intact to a labeled page-two continuation so the résumé remains two pages.
- The generic site DOCX and PDF and the named interactive-product DOCX are synchronized. The game-development résumé remains unchanged. Final DOCX rendering, two-page PDF inspection, link and list verification, accessibility audit, privacy check, and production-download checks pass.
- The interactive-product résumé now leads with `Product & Interaction Design | Interactive Product Development` instead of `Product Design Engineer`. Its summary explicitly frames prototypes, motion, code, and AI-directed development as tools used to realize authored experiences, not as claims of framework specialization. The synchronized DOCX and PDF retain their clean two-page render.

## Global overscroll surface

- The document canvas uses the same shared field texture tokens as every `WorldField`, with an equivalent softened composite over the field color.
- Browsers can ignore image texture when painting the native elastic-scroll gap. Vertical overscroll bounce is therefore disabled on the root document and body across every route, while ordinary vertical page scrolling remains unchanged.
- The Secret box retains its no-scroll viewport behavior while consuming the global surface rather than carrying a duplicate background recipe.

## Mobile browser stability refinement

- The intermittent mobile failure is consistent with page-process pressure rather than a normal JavaScript exception: the deployed fragment states and compatibility redirects completed without console errors, while the Games disclosure retained a 77-frame, 960 by 540 animated WebP alongside other destination media in the persistent Home document.
- Discourses now uses a 960 by 540 H.264 video derivative with native controls, inline muted looping, a fast-start header, and the existing winter still as both poster and reduced-motion content. This preserves the authored animation while avoiding the animated image's large multi-frame decode footprint.
- `SpatialRouteShell` now keeps video URLs out of enhanced markup until their destination is active, removes sources and resets media elements when the destination closes, then restores only the next active destination's sources. JavaScript-free visits retain direct video links, and reduced-motion visits do not initialize the looping Discourses video.
- Fragment `:target` rules now apply only before `SpatialRouteShell` enhances. The enhanced `hidden` and destination attributes remain authoritative, so a browser that retains stale `:target` state after `history.replaceState` cannot leave the old disclosure or its mobile origin icon visible after the hash is removed.
- Mobile verification must cover direct Games reloads, repeated Games to Who I am and Software switching, Back and Forward, and pinch-zoom without a page-process reload before this refinement is considered complete.

## Craft-value checkbox rendering refinement

- The unchecked checkbox SVGs exposed the final diagonal segment of their hidden tick paths in browser rendering, making every box look partly checked or broken.
- Unchecked ticks are now explicitly transparent in addition to using the draw offset, while checked ticks restore opacity and draw along the same irregular authored paths. The three distinct hand-drawn outlines, 48-pixel controls, checked settle motion, keyboard focus, and reduced-motion behavior remain unchanged.
- The checked state no longer draws a long strike-through across each sentence. The complete hand-drawn tick is now the sole completion mark, with only a restrained text fade, so it does not collide with the lettering or the changing word's coral underline.

## Browser-tab icon

- Every route now uses the replacement authored `Drawn_me.png` artwork as its PNG favicon. The same replacement artwork appears as the drawn portrait in Home’s Who I am disclosure.
- The replacement portrait was inspected in Home’s active drawn state at 1440 by 900 and 390 by 844. It stays contained in the existing portrait frame with no horizontal overflow, and the production build completes without diagnostics.

## Observatory editorial case study

- Added `/case-studies/observatory/` as a separate static Astro document and
  linked it from Observatory's existing Software artifact without changing the
  Home destination model.
- Built a seven-chapter editorial argument for product-design reviewers covering
  the catalyst, five-person exploratory research, product principles, early
  sketches and flows, validation, the working product, and explicit ownership
  boundaries.
- Used all 24 authored case-study images from `src/assets/case_study_images`.
  The page now relies on a serif-led, white and off-white composition with a
  narrow reading measure, generous pauses, and freely positioned visual
  evidence instead of simulated dashboards or decorative interface elements.
- Recreated the authored validation-board rhythm with equally sized
  before-and-after wireframes, concise observations, loose alignment, and simple
  directional annotations. The document is semantic and requires no
  case-specific client-side JavaScript.
- Desktop and 390 by 844 browser inspection confirmed the opening, validation
  board, consistent image stages, lazy image loading, and horizontal
  containment. The mobile document matched its 390-pixel viewport with no
  horizontal overflow.
- `astro check`, the root production build, the `/personal-website/` GitHub
  Pages build, and static generation of the case-study route passed without
  diagnostics.
- Rebuilt the case study after all 22 authored source images were replaced with
  higher-resolution versions. Astro generated new optimized assets from those
  sources, and the root static build completed without diagnostics.
- Reworked the repeated centered chapter template into offset editorial passages
  with shorter transitions, smaller evidence stages, and denser continuity
  between chapters. The validation comparisons retain the authored paired
  layout while using less vertical separation.
- Added a fixed seven-part section index that follows the active chapter. The
  prototype and outcome now use two progressively enhanced sticky image
  sequences, so the visual changes as the reader reaches each decision. The
  semantic image order remains available without JavaScript, and reduced-motion
  visitors receive the complete static sequence.
- Verified the revised page at 1054 by 943 and 390 by 844. The section index,
  desktop and phone scroll transitions, active image changes, image containment,
  and horizontal bounds all behaved as intended. The browser console remained
  clear, `astro check` passed without diagnostics, and the production build
  generated the static case-study route successfully.
- Removed the opening final-product screenshot because it repeated the outcome
  before the argument had established why that interface mattered. The project
  facts now hand directly into the catalyst, while the shipped Now view remains
  inside the outcome sequence where it has narrative context.
- Expanded Research from a short summary into a complete account of the five
  exploratory interviews: the learning goals, contextual interview structure,
  limitations of the sample, two working personas, representative statements,
  design implications, and the synthesis that led into product direction. The
  new material stays narrow and editorial rather than turning the research into
  a dashboard or a collection of persona cards.
- Removed the column-grid treatment from the expanded Research chapter. Its
  aims, interview prompts, persona narratives, quotations, and implications now
  move through one continuous typographic flow with loose indentation and
  asymmetric offsets instead of aligned cells.
- Reframed the two working personas as a single vertical research sequence. On
  wide screens, each portrait, persona name, and representative statement
  remains sticky while situation, needs, friction, and the design response move
  beside it; the next persona then replaces that context. Phones use ordinary
  document flow.
- Verified the persona opening, mid-scroll state, handoff, and phone document
  flow at 1313 by 943 and 390 by 844. Both layouts remain within the viewport,
  the browser console is clear, `astro check` passes, and production builds pass
  for the root and `/personal-website/` base paths.
- Replaced the case study's alternating percentage offsets with one centered
  720-pixel reading column for chapter labels, titles, prose, research details,
  and image headings. Personas, principles, sketches, sticky image stories,
  prototype flows, and validation comparisons use a centered wider composition
  with responsive index clearance. Reduced the oversized gap between Direction
  and its sketches.
- Embedded Crimson Text Regular, Italic, SemiBold, and Bold locally for body
  copy, quotations, reading text, and in-prose emphasis. Averia Serif Libre Bold
  remains limited to the hero, chapter titles, persona names, principles,
  validation title, and sticky-story headings. The phone hero uses a smaller
  setting so `Observatory` remains contained. Browser inspection at 1054 by 943
  and 390 by 844 confirmed the correct reading and display faces, contained
  layout, and no horizontal overflow. Root and `/personal-website/` production
  builds pass without diagnostics.
- Verified the centered system at 1313 by 943 and 390 by 844. Every desktop
  reading column is centered at x=656.5 and clears the full index by 154.5
  pixels; wide compositions are centered on the same axis and clear it without
  overlap. Phone content returns to the 14-pixel inset, and both viewports have
  no horizontal overflow.
- Removed the later left-edge override from the narrow reading blocks. Prose,
  quotations, findings, audience notes, research details, synthesis, and image
  introductions now share the document's centered axis while retaining
  left-aligned text for long-form readability.
- Normalized narrative copy to one shared Crimson Text reading size and line
  height across the case study. Persona stories and observations no longer drop
  to 17 pixels, and validation explanations no longer switch to 14-pixel system
  sans text. Metadata, captions, and navigation labels retain their
  smaller sans-serif treatment.
- Removed the off-white presentation backgrounds behind the transparent early
  sketches and prototype sticky-story images. Both evidence types now sit
  directly on the white document surface while retaining their authored image
  content and layout.
- Refreshed the two working-persona portraits from the authored files in
  `src/assets/case_study_images/sketches` and assigned versioned asset names so
  Astro's image proxy and the browser cannot reuse the previous optimized
  portraits. Both transparent 2048-pixel square sources load through the
  existing semantic image markup, remain fully visible in their 300-pixel
  desktop and phone frames, and keep accurate alternative text.
- Embedded Capriola Regular locally and replaced the system sans-serif across
  the Observatory case study. The side section indicator, top navigation,
  chapter and research labels, metadata, captions, and sticky-story markers now
  share Capriola while Crimson Text remains the reading face and Averia Serif
  Libre remains the display face.
- Removed forced uppercase from the Capriola UI layer and reduced its tracking.
  Navigation, section indicators, metadata, captions, and editorial labels now
  preserve the capitalization authored in the page copy.
- Replaced the browser-blue text selection within the Observatory case study
  with a high-contrast black highlight and white selected text.
- Replaced the saturated blue editorial accent with a deep forest green and
  renamed the page token from `--blue` to `--accent`. The chapter labels,
  research markers, sticky-story steps, active section index, link hover, and
  keyboard focus treatment now share the quieter color. Browser inspection at
  1054 by 943 and 390 by 844 confirmed the accent, clear console, and no
  horizontal overflow. Root and `/personal-website/` production builds pass
  without diagnostics.
- Removed the remaining green accent from the Observatory case study. The
  shared accent token now resolves to the page's black ink color, so labels,
  research markers, sticky-story steps, navigation state, link hover, and
  keyboard focus cues use a monochrome treatment.
- Added a one-time load animation to the Observatory hero title using Igor's
  authored `ditchered_observatory_bg.png` texture. The texture flashes through
  the letters in sequence before the word returns to solid black; the semantic
  heading remains a single accessible label and reduced-motion visitors receive
  the static black title.
- Expanded each animated letter's invisible texture paint box beyond the font's
  line box. Averia's ascenders and the `y` descender now retain the dither reveal
  instead of falling back to black where the glyph overshoots its CSS box.
- Replaced both working-persona placeholders with Igor's authored square
  sketches. The drawings retain their transparent backgrounds and complete
  composition at desktop and phone sizes, and include descriptive alternative
  text. Browser inspection at 1313 by 943 and 390 by 844 confirmed transparent
  containers, complete image loading, and no horizontal overflow. `astro check`
  and production builds pass for the root and `/personal-website/` base paths.

## Open inputs and blockers

- Bright Chalk and Cartoon Relief files are present and integrated. Web-embedding rights still need confirmation before release.
- The local adaptation of `Identity Cage` still needs approved article copy. Until then, the Blog index links to the existing Medium publication.

## Next action

Review the Observatory case-study scroll pacing with Igor, then resolve the
approved local `Identity Cage` copy and webfont embedding-rights confirmation
before the remaining milestone 10 release work.
