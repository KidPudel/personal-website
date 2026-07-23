# Website rebuild progress

Last updated: 2026-07-23

## Status

The clean foundation, approved Home base, shared destination field architecture, Who I am, Work, Blog index, and Connect disclosure are complete. The complete current public experience has passed the milestone 6 interaction, responsive, accessibility, and performance review. The local adaptation of `Identity Cage` still awaits approved article copy.

Current milestone: **6. Interaction, responsive behavior, and accessibility complete; milestone 5 local essay copy remains**

## Milestones

| Milestone | Status |
| --- | --- |
| 0. Documentation reset | Complete |
| 1. Clean foundation | Complete |
| 2. Home | Complete |
| 3. Destination composition and Who I am | Complete |
| 4. Work | Complete |
| 5. Blog and contact completion | Blog and Connect complete; article copy pending |
| 6. Interaction, responsive behavior, and accessibility | Complete |
| 7. Release | Pending |

Milestone scope and exit conditions live only in `docs/IMPLEMENTATION_PLAN.md`.

## Active direction change

- On 2026-07-23, Igor established the persistent graphite field and hand-drawn borders, spines, paths, and annotations as the default language for destination routes.
- Paper is now exceptional rather than structural. It may appear only where Igor explicitly identifies the exact element and purpose.
- The paper invitation revealed after completing all three Who I am craft values is also an explicitly approved paper use.
- Who I am, Software, Games, and Blog now implement the hand-drawn field direction.
- Historical checks remain valid records of what was previously built, but their paper-based visual acceptance is superseded by this direction change.

## Current decisions

- `docs/CONCEPT_DESIGN.md` is the sole design and product authority.
- The old presentation code is not a visual baseline.
- `docs/ARCHITECTURE.md` is the technical baseline. No current destination route uses `LegacyPaperSurface`.
- Astro is updated to 7.1.3. TypeScript remains on the newest supported 6.x release because Astro Check does not yet support TypeScript 7.
- `BaseDocument`, `WorldField`, and `HomeReturn` remain the shared shell primitives. `WorldField` provides a responsive destination content track and a separate sticky Home track without imposing a route surface. The unused `LegacyPaperSurface` component was removed after the final route migration.
- The clean shell has no global client router, page-transition controller, global click effect, UI framework, or client-side state.
- `/work/`, `/connect/`, and `/games/` are base-aware compatibility redirects to `/#work`, `/#connect`, and `/work/games/`.
- Bright Chalk is the locally hosted reading and interface family. Cartoon Relief is the locally hosted distinctive-display family. Both ship as WOFF2 generated from the supplied TrueType sources.
- Home navigation uses ordinary links for Who I am and Blog, plus disclosure buttons for Work and Connect. Reading and keyboard order is Who I am, Work, Connect, Blog.
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
- The drawn and real portraits are both present in the static document. Their frames are now open hand-drawn outlines without paper backing or tape. The `real me` caption sits on the left edge and `drawn me` stays on the right so the stacked labels match the selector order and remain distinct; the caption belonging to the portrait underneath is darker than the active caption. Enhancement turns them into a locally owned portrait selector with synchronized `aria-pressed` and inactive-panel state. The real portrait is selected by default, and hovering the stack, focusing its controls, or switching portraits starts a fresh restrained card-shuffle motion.
- The unified three-line craft-values checklist exposes every approved word in the static document. Enhancement turns the changing word in each line into a conventional button that cycles its approved alternatives.
- The craft values form a compact three-note composition connected by hand-drawn paths to a dashed secret area. Their checkbox targets align in one readable column, while each visible box uses a distinct irregular SVG pencil contour and a curved tick that draws into place. The native inputs, 48-pixel targets, and visible keyboard focus remain valid. Completing all three reveals the explicitly approved paper invitation directly over the secret area.
- The word `experiences` in the Who I am statement runs a brief staggered color wave after page load and then returns to the headline color. It continues to react letter by letter on precise-pointer hover. Keyboard focus and touch activation expose the same restrained color play without making the headline depend on JavaScript.
- The underlined word `joyful` is a conventional button that cycles through five predefined colors without changing the sentence meaning.
- Work expands locally on Home as two linked Igor-drawn icon nodes labeled Software and Games. Drawn connector strokes branch from Work to both destinations. Wide screens use a vertical stack with a small horizontal offset; mobile uses a connected side-by-side arrangement. Each complete icon-and-name node links to its destination and uses the shared restrained wobble on hover or keyboard focus. The panel stays anchored to the Work drawing and recomposes for narrow screens. Enhancement starts it collapsed, maps its open state to `#work`, closes it on outside activation or Escape, and keeps `aria-expanded` synchronized. Without JavaScript, both links remain visible and the button accurately starts expanded.
- `/work/` redirects to `/#work`. Software and Games are ordinary nested routes drawn directly on the persistent field. Their route navigation uses hand-drawn text, a connecting line, and an active underline rather than paper.
- The content model now separates `software` and `games`, records honest `featured`, `supporting`, or `trajectory` prominence, and distinguishes complete, ongoing, unfinished, and early work.
- Each concept-approved artifact is presented directly on its Software or Games index. The separate evidence routes remain absent to keep Work simple. Featured work receives the most visual space, while Snake with Go and raylib plus C++ and OpenGL Tic-Tac-Toe remain compact trajectory artifacts.
- Software contains the complete Flutter product, Chinese Bee, and the receipt-processing investigation. The supplied food-delivery and Chinese Bee showcases appear directly with those projects, including the Chinese Bee mascot. The verified receipt result appears only on its index record.
- Games contains `Discourses by Campfire`, `Santa Foundation`, Snake with Go and raylib, and C++ with OpenGL Tic-Tac-Toe. Retained media supports the two finished games. Discourses links directly to its confirmed itch.io game page.
- The verified payment and expiration entry and unfinished card-system entry remain in the typed content collection but are not published on these indexes because the current concept names the exact public selections.
- Work project records no longer display promotional summaries, visible category headings, status badges, or hashtag rows. Real media and project names lead each composition; explicit learning notes appear in a quiet handwritten list titled `What I've learned`.
- Every Work destination is complete static HTML without a component script. Only the Home disclosure adds local behavior. Software offers both the existing résumé PDF and the matching DOCX as direct downloads. Public game links remain available directly from their index records.
- Blog uses a calm field composition with incomplete hand-drawn boundaries, generous spacing, and a concise writing list rather than a paper surface or card grid.
- The verified `Identity Cage` entry remains a draft for local publication, so the Blog index links to the existing Medium publication instead of exposing placeholder copy as a finished local article.
- `/blog/[slug]/` is a static, JavaScript-free local article presentation generated only for writing entries whose `draft` field is false. It includes base-aware Blog and Home navigation, readable long-form typography, and an optional canonical publication link.

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

## Open inputs and blockers

- Bright Chalk and Cartoon Relief files are present and integrated. Web-embedding rights still need confirmation before release.
- The local adaptation of `Identity Cage` still needs approved article copy. Until then, the Blog index links to the existing Medium publication.

## Next action

Resolve the approved local `Identity Cage` copy and confirm webfont embedding rights before milestone 7 release work.
