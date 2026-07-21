# Personal Website Progress

Last updated: 2026-07-21

This file is the living implementation record. Update it whenever a meaningful task is completed, a decision changes, a blocker appears, or the next action changes.

## Current status

Status: active full-project design discovery, current implementation built but new visual work paused pending storyboard approval

The production website is implemented across five purpose-specific routes with typed content, an interactive values homepage, a professional Work page, a dedicated pixel-art Games page, Blog, Connect, responsive interactions, optimized media, résumé downloads, and a GitHub Pages workflow. The shared notebook now has a more physical diary treatment and a reusable path for Igor-authored static doodles. The first public release targets `https://kidpudel.github.io/personal-website/` from the private source repository. Work continues through deployment, public inspection, content completion, and the remaining launch infrastructure.

A local architecture and compatibility audit is complete. The project builds cleanly against the production base path, the five routes have been checked across the current breakpoint range, and confirmed runtime and progressive-enhancement issues have been corrected. Public cross-engine and performance verification remains launch work.

A public design-quality review identified a new refinement pass. Igor subsequently clarified that the website itself should become a highly interactive portfolio piece. `docs/DESIGN_REFINEMENT_BRIEF.md` now separates approved constraints from a working `living blueprint notebook` hypothesis and requires desktop, mobile, motion, reduced-motion, and JavaScript-free storyboards before new visual implementation.

### Current information-architecture decision

The five-route implementation remains the current code state, but it is no longer the launch target.

- Home contains both Igor's portrait-led introduction and his values. Values is not a separate route or peer destination.
- “Raw” values means personally meaningful and emotionally close to Igor, even when less professionally neat. It does not mean careless, unedited, or maximally confessional.
- Primary navigation becomes Home, Work, Blog, Connect.
- Work becomes one complete index with directly linkable Software and Games modes.
- The Work inventory should include every verified artifact Igor chooses to include, organized as featured cases, supporting work, experiments or early work, and unfinished work.
- The strongest cases receive the best visual and narrative lighting, while smaller or incomplete artifacts remain discoverable with honest status.
- The current Games page's content hierarchy and real media remain useful evidence references, but its visual language is rejected. The dark CRT and generic retro-interface treatment must be replaced.

### Current visual-direction decision

These requirements are approved, while exact compositions and motion sequences remain in design discovery:

- One persistent notebook is the website and the only primary content surface. The desk is quiet environmental space, not a second content canvas.
- Work uses a blueprint-like drawing method in both modes to explain real behavior, state, system flow, mechanics, and decisions.
- Games uses minimal pixel art integrated into the same warm notebook paper. It must not use the current dark CRT, phosphor, terminal, console, arcade-menu, neon, or generic retro-portfolio language.
- Links and semantic buttons should look like clear written text with drawn states rather than boxed buttons, pills, segmented controls, CTA cards, or dashboard tabs.
- Do not invent day marks, dates, timestamps, locations, coordinates, measurements, or notebook notes for atmosphere.
- High interactivity is a core portfolio requirement. The shared physical grammar may unwrap, lift, slide, draw, rearrange, riffle, and settle paper with a deliberately stepped low-frame-rate feel.
- Selected objects may move on scroll or be draggable, but the resting layout must remain complete and equivalent content must remain available through keyboard, touch, reduced-motion, and JavaScript-free paths.
- No new visual implementation begins until Igor approves the storyboards and interaction states.

### Authoritative professional-context correction

`docs/CONTEXT_ABOUT_IGOR.md` is now the authority for professional evidence, craft values, capability levels, gaps, direction, and role fit. It supersedes earlier interpretations in current plans and public content while the historical entries below remain unchanged as a record of what was previously believed or implemented.

Current corrections:

- Do not position Igor as a mature backend, distributed-systems, data-engineering, mobile-architecture, product-design, or commercial game-development specialist.
- The current coherent umbrella is experience-driven product systems design and engineering, not a claimed past job title or permanent identity.
- The strongest performance story is receipt processing reduced from approximately 6 to 10 seconds to approximately 600 to 650 milliseconds by detecting PDFs, extracting text directly, introducing a separate Python service, adapting downstream parsing, and reducing unnecessary OCR.
- The earlier generic `9.5 seconds to 650 milliseconds` high-load Go story is superseded unless Igor re-verifies that exact measurement and interpretation.
- Ordering-platform ownership in a two-person team is not supported by the authoritative context and must be removed from current public content unless separately verified.
- Officially documented employment is approximately 11 months under the title Mobile Developer. Substantial paid backend work was unofficial or project-based. This distinction guides claim review but is not automatic permission to publish sensitive employment context.
- The professional story should preserve the real breadth of mobile product ownership, paid fintech backend work, end-to-end personal products, receipt investigation, and serious independent games while keeping capability limits explicit.
- The homepage should not publish the complete process-and-outcome framework. Its selected principles are clear purpose, a close feedback relationship with users or players, and capability or understanding that can be shared.
- The complete Flutter application and Chinese Bee are the strongest product design and engineering cases. Receipt processing remains the strongest focused investigation, not the page's leading identity.
- The Go and raylib Snake post and C++ and OpenGL Tic-Tac-Toe repository are verified smaller artifacts in Igor's longer game-making trajectory.

## Completed

- Read `Agents.md`.
- Read `docs/WEBSITE_CONTEXT.md`.
- Read `docs/PERSONAL_CONTEXT.md`.
- Reviewed the supplied handmade-style reference images.
- Reviewed the referenced visual inspiration site.
- Selected Astro, strict TypeScript, static rendering, content collections, and plain CSS as the proposed stack.
- Confirmed GitHub Pages as the deployment target.
- Confirmed the first two games:
  - `Discourses by Campfire`;
  - `Secret Santa Foundation`.
- Confirmed that `Identity Cage` may be adapted and hosted locally.
- Rendered and visually inspected both pages of `CV_Igor_Kupchinenko_EN.docx`.
- Identified initial résumé-backed professional story candidates:
  - high-load service performance optimization;
  - payment or ordering service delivery with another developer;
  - independent Flutter product delivery.
- Confirmed from the supplied résumé screenshot that the 9.5-second to 650-millisecond result belongs to a high-load service optimization. Receipt validation is listed separately as a fraud-detection pipeline.
- Identified the game telemetry and analytics project as an in-progress item only.
- Inventoried the three supplied iCloud art folders without modifying them.
- Sampled real assets for the two games and original avatar artwork.
- Created `docs/IMPLEMENTATION_PLAN.md`.
- Created this progress log.
- Received approval to publish the 9.5-second to 650-millisecond performance result.
- Scaffolded Astro 7 with strict TypeScript and pnpm.
- Added typed content collections for work, games, and writing.
- Added initial content entries for:
  - high-load service performance;
  - `Discourses by Campfire`;
  - `Santa Foundation`;
  - `Identity Cage`.
- Copied selected web-ready avatar and Campfire assets into the repository.
- Added visually verified PDF and DOCX résumé downloads.
- Built the first complete homepage implementation with:
  - conventional anchor navigation;
  - original avatar artwork;
  - a handmade notebook surface;
  - an anonymized production story;
  - a real game preview;
  - a current telemetry-project note;
  - reduced-motion support.
- Added the official Astro GitHub Pages deployment workflow.
- Completed a clean Astro type check and static production build.
- Verified a `/personal-website` GitHub Pages base-path build and prefixed asset links.
- Visually checked the homepage at desktop and 390px mobile widths.
- Confirmed no horizontal overflow at desktop or mobile widths.
- Confirmed one `h1`, one `main`, complete image alternative text, a working skip link, visible focus styling, and a clean browser console.
- Increased small navigation and text links to 44px mobile touch targets.
- Replaced the unclear `I make games and notes, too` heading with `A quick glimpse into Igor's personal notebook`.
- Replaced the anchor-only navigation with separate Home, Work, Connect, and Blog pages.
- Added a second résumé-backed production story about ordering-platform ownership in a two-person team.
- Added Santa Foundation as the second homepage game.
- Composed an original Santa Foundation preview from Igor's pixel-art layers and sleigh sprite.
- Added clearly visible previous and next controls, `1 / 2` status, and explanatory copy to both homepage stacks.
- Implemented the switchers with progressive enhancement. Both cards remain visible when JavaScript is unavailable.
- Verified that each switcher exposes exactly one active panel when enhanced.
- Verified both directions reveal the expected second items:
  - `Owning an ordering platform in a two-person team`;
  - `Santa Foundation`.
- Added Home, Work, Connect, and Blog active-navigation states.
- Added 44 by 44 pixel touch areas for all four mobile primary-navigation links.
- Rebuilt and verified all four routes with both root and `/personal-website` GitHub Pages paths.
- Confirmed zero Astro diagnostics, no browser console warnings or errors, and no horizontal overflow at 390px.
- Added a clearly visible `drawn me` and `real me` portrait switcher to the homepage.
- Verified synchronized portrait captions, one active portrait panel, and correct inactive-panel accessibility state.
- Replaced the temporary `real me` placeholder with Igor's approved `src/assets/art/avatar_irl.png` photograph.
- Added descriptive alternative text and Astro image optimization. The generated WebP is 36KB, down from the 9.5MB source.
- Verified the real-photo crop at desktop and 390px mobile widths, 45px portrait-switcher buttons, and no horizontal overflow.
- Recorded Igor's concern that the earlier dark frame, editorial hero, tilted portrait, and paired showcase cards followed the supplied reference too closely.
- Rebuilt the site around an original loose-leaf sketchbook composition:
  - warm desk background instead of the dark portfolio surround;
  - punched paper holes, ruled lines, red notebook margin, torn scraps, and sticky notes;
  - a three-part homepage collage instead of the previous two-column hero;
  - a circular portrait cutout instead of a polaroid-like card;
  - separate scrapbook rows for production stories and games instead of paired showcase cards.
- Added original code-native doodles inspired by Igor's interests in systems, games, cooking, music, campfires, and playful dog-like energy without copying any reference artwork.
- Carried the paper system through Home, Work, Blog, and Connect while retaining conventional navigation and approved content.
- Reverified project and portrait switchers, all four route active states, desktop and 390px layouts, 44px interaction targets, one `h1` and `main` per page, and zero horizontal overflow.
- Completed a clean production build with zero Astro diagnostics after the redesign.
- Updated `Agents.md` and the project trackers to require completion of the production website instead of stopping after an initial visual section.
- Reworked the primary information architecture so every route has one purpose:
  - Home presents values;
  - Work presents professional evidence;
  - Games presents game-development work;
  - Blog presents writing;
  - Connect presents contact and profile links.
- Replaced the portfolio-style homepage project switchers with a long-form values journey.
- Added the initial six-value homepage interaction with original SVG doodles, later refined into the nine-value checklist recorded below.
- Preserved the drawn and real portrait switcher as part of the personal introduction.
- Added a dedicated Games route with a dark pixel-art surface, square borders, stepped animation, real project media, and two selected games.
- Added Astro route transitions, initially with a perspective notebook page-turn treatment and a reduced-motion-safe static path.
- Changed regular prose to a hand-drawn font stack while keeping large headings distinct and notebook-like.
- Added `https://x.com/kidpudel` to Connect and the site footer.
- Verified Home, Work, Games, Blog, and Connect at 1440px and 390px widths with no horizontal overflow.
- Verified one `h1`, one `main`, correct active navigation, and expected route content across all five pages.
- Verified the value-doodle expanded state, visible explanatory note, and synchronized `aria-expanded` value.
- Verified reduced-motion behavior disables route and doodle motion in the browser environment.
- Restored the homepage heading `A quick glimpse into Igor's personal notebook.` after visual review.
- Replaced the portrait switcher's red wavy underline with a blue circular switch cue that animates on hover and focus.
- Reworked the values section from six large, abstract statements into Igor's exact nine values in a compact three-column checklist.
- Kept one original interactive doodle per value, now presented as a small checkbox-like mark with a separate click cue.
- Reduced the empty vertical space between the homepage introduction and values.
- Verified the revised desktop, 1100px, and 390px layouts with no horizontal overflow.
- Published `i.kupchinenko@gmail.com` as a direct `mailto:` card after explicit approval.
- Added a closing Games-page link to the full `kidpudel.itch.io` profile beneath the selected projects.
- Added a global mouse-click impact effect with hand-drawn radial lines, page-aware colors, no pointer interception, and reduced-motion and touch safeguards.
- Changed the reduced-motion click path from fully hidden to a stationary fading burst after browser feedback showed that the effect otherwise appeared absent.
- Replaced the distracting click burst with a small three-line pencil tick that fades in roughly a quarter second and has no central spot or ring.
- Widened the homepage headline column at desktop widths so the notebook title uses the available screen instead of forming a narrow text tower.
- Clarified that the homepage checklist describes qualities Igor wants in his work and artifacts, including `A useful capability` and `A joyful artifact`.
- Consolidated the overlapping nine-item checklist into three large outcomes: meaningful work, a more joyful world through capability, and a real standalone artifact.
- Selected `https://kidpudel.github.io/personal-website/` as the first public GitHub Pages URL while keeping the source repository private.
- Configured the Pages workflow to build all links and assets against the `/personal-website/` project path.
- Audited the Astro 7 architecture against current official Astro guidance and confirmed that static Astro, strict TypeScript, typed local content, plain CSS, and small vanilla scripts remain a good fit for this website.
- Standardized local and deployment development on Node 24 with `package.json` engine metadata and `.nvmrc`; the previously active local Node 25 runtime is not an Astro-supported odd-numbered release.
- Centralized public email and profile URLs in `src/config/site.ts` so Connect and the shared footer cannot drift independently.
- Improved homepage progressive enhancement:
  - value notes remain readable in server-rendered HTML;
  - value controls are disabled until their handlers are attached;
  - the portrait switch control is hidden until it works;
  - value cards remain fully visible when JavaScript is unavailable.
- Completed a production-base build with zero Astro diagnostics after the audit changes.
- Verified Home, Work, Games, Blog, and Connect at 360, 390, 760, 761, 1000, 1001, and 1440 pixel widths.
- Confirmed no horizontal document overflow, no broken images, one `h1`, one `main`, and the correct active navigation state on every route at the tested widths.
- Confirmed 44 by 44 pixel or larger mobile navigation targets, working portrait and value controls after enhancement, readable server-rendered fallbacks, valid résumé and favicon responses, and a clean browser console.
- Confirmed that the reduced-motion environment shortens continuous animations to effectively static states and that the Games animation selectors remain attached to their intended elements.
- Refined the mobile header and homepage after reviewing a real device-width capture:
  - reduced the mobile homepage title to a 44-to-56-pixel responsive range and allowed it to use the available content width;
  - removed the hidden-label flex gap so the résumé download glyph is exactly centered;
  - stopped reduced-motion styling from forcing every navigation underline visible, leaving only the current route underlined at rest.
- Reverified all five routes at 360, 390, 430, and 760 pixel widths after the mobile refinements. Every route has zero horizontal overflow, a centered download glyph, no broken images, and exactly one visible navigation underline matching the active route.
- Replaced the motion-heavy 520-millisecond perspective page turn after it caused discomfort with a 400-millisecond two-stage paper lift and crossfade:
  - no rotation or sideways travel;
  - approximately 12-to-14 pixels of vertical movement;
  - a restrained 0.8 percent scale change plus light and shadow variation;
  - the old page lifts away before the new page settles, avoiding prolonged double-text ghosting;
  - the same custom animation is declared through Astro's transition API for native and fallback implementations;
  - reduced-motion behavior remains an immediate static swap.
- Verified the paper transition with motion enabled across repeated Home, Games, and Connect navigation in Astro's non-native fallback path, with correct routes, no overflow, and a clean browser console.
- Added an initial reusable low-opacity SVG grain texture over Home, Work, Blog, and Connect notebook surfaces. It was later replaced by the real paper photograph described below.
- Rebuilt the homepage portrait interaction as a real two-card polaroid stack:
  - both approved portraits remain in the stack, with the inactive card visibly behind the active one;
  - swapping sends the outgoing card around the incoming card before returning it to the back of the stack;
  - fine-pointer movement tilts the stack toward the pointer by at most five degrees on each axis;
  - touch and keyboard use the same explicit swap button without depending on hover;
  - reduced motion switches cards immediately and skips pointer tilt;
  - inactive portrait content is hidden from assistive technology while the active alternative text and caption remain available.
- Visually verified the grain, both completed portrait states, the mid-swap animation, and pointer-angle tilt at 1440 pixels; reverified the stacked layout and completed swap at 390 pixels with zero horizontal overflow and a clean browser console. Confirmed the Games page has no notebook grain layer.
- Overhauled the Games interface palette to remove the previous purple shell:
  - charcoal-black and deep green surfaces;
  - phosphor green metadata and structural accents;
  - warm amber headings and controller body;
  - faded red focus, shadow, button, and border accents;
  - original game artwork remains unaltered.
- Added a static CRT treatment to the Games surface with fine scanlines, a soft edge vignette, and very low-opacity color-channel texture. It adds no flicker or rolling animation and ignores pointer input.
- Tuned the CRT layer separately for mobile so scanlines and the vignette remain subtle over screenshots and small text.
- Visually verified the redesigned Games hero and project media at 1440 and 390 pixels. Confirmed one `h1`, one `main`, correct active navigation, no broken images, no horizontal overflow, and a clean browser console.
- Replaced the synthetic crease gradients and procedural paper grain with Igor's supplied `Texturelabs_Paper_143M.jpg`.
- Converted the 336 KB source JPEG into a stripped 112 KB WebP and reused that one asset for the journal header and page surfaces.
- Moved the real texture beneath the ink layer so crumples affect the paper without reducing text or artwork clarity.
- Rebuilt Home, Work, Blog, and Connect as a physical open journal with a cover edge, layered page edge, center gutter, ruled paper, red notebook margin, and real crumpling.
- Removed the binder-hole treatment and the large synthetic diagonal and circular crease marks.
- Preserved the Games route as a separate pixel-art surface instead of applying the paper texture over game media.
- Added `src/components/PersonalDoodle.astro` as a reusable system for Igor-authored drawings:
  - each component renders one static transparent image;
  - source artwork remains unchanged, lazy-loaded, and optimized by Astro during the build;
  - no frame timer, client script, hover tilt, or touch animation is attached to page drawings;
  - `artScale` can compensate for transparent source padding without modifying the artwork.
- Removed the card, tape, border, background, shadow, and caption from the campfire presentation so the static drawing reads as literal ink on the page.
- Retained Igor's three transparent campfire studies under `src/assets/art/doodles/campfire/`, but imported only the strongest final frame beside the homepage values introduction.
- Confirmed the production build publishes one optimized 14 KB campfire WebP.
- Reduced the final campfire drawing, removed its clipping, and moved it into a pointer-transparent layer beneath the values content.
- Replaced the four reserved sketch positions with Igor's eight new transparent drawings: CD case, tangled thoughts, computer, bird, burger, camera, fish, and fishbone.
- Positioned all eight new drawings asymmetrically in the same paper-level layer, using varied scale and partial occlusion so they feel scattered through the diary rather than arranged in a gallery.
- Confirmed the eight optimized published doodles total approximately 86 KB, or approximately 100 KB together with the campfire.
- Rebalanced the doodle hierarchy after visual review by shrinking and tucking the tangled-thoughts drawing against the page edge while moving the fishbone into the open left-page space.
- Reworked the three homepage outcomes from bordered UI cards into direct journal entries, then refined them into the sticky-note checklist described below.
- Reworked the homepage onward links into irregular yellow, blue, and faded-red paper notes to supply playful color without turning the drawings into stickers.
- Briefly added a yellow highlighter shape behind the campfire, then removed it after visual feedback so the campfire remains unbacked ink on the page.
- Replaced the three value interactions with one irregular yellow sticky-note to-do checklist on the right journal page.
- Replaced the JavaScript-driven value buttons with native checkboxes that work through keyboard, pointer, and touch input without JavaScript.
- Added original irregular checkbox outlines that draw during scroll reveal and animated check marks that draw when selected.
- Added a red strike-through state and revealed handwritten `note:` sentence for every checked outcome.
- Added an all-checked completion note reading `Hey, I've been looking for you.` with a `Let's chat` link to Connect.
- Reused the existing notebook page transition for the completion link rather than forcing an automatic redirect.
- Verified unchecked and checked checklist states at 1440 pixels and on a 390-pixel mobile viewport. The mobile tap state reveals the note with zero horizontal overflow.
- Verified the scattered paper-level doodle positions, all-checked completion note, and Connect navigation at 1440 and 390 pixels with zero horizontal overflow.
- Verified all nine paper-level doodles remain pointer-transparent and discoverable across the desktop and mobile values section, with a clean browser console.
- Visually verified the revised homepage at desktop and 390-pixel mobile widths, including the campfire drawn directly on the page, open gutter, real paper texture, journal-entry spacing, and zero horizontal overflow.
- Visually verified the shared Work journal treatment at 1440 pixels with one `h1`, one `main`, and zero horizontal overflow.
- Completed clean root and `/personal-website/` production builds with zero Astro diagnostics after adding the paper and personal-doodle systems.
- Confirmed the homepage contains one campfire image with no doodle client script and zero horizontal overflow.
- Verified that the strongest final campfire frame is visible on the page as a static drawing.
- Created `docs/DESIGN_REFINEMENT_BRIEF.md` to translate the comparative design review into an actionable full-site refinement specification.
- Revised the typography and structure direction after Igor's review: Bright Chalk is the regular handwritten voice, Cartoon Relief is reserved for large distinctive elements, and accessible semantics must not force a conventional visible H1/H2/H3 layout.
- Clarified the homepage content model after Igor's review: the primary positioning is software and games, while writing remains in Blog; standards for the work itself must remain distinct from the broader effect Igor wants his contributions to have in the world; invented sentimental or quirky slogans are not acceptable public copy.
- Read `docs/CONTEXT_ABOUT_IGOR.md` completely and adopted it as the professional and craft source of truth.
- Added context-authority rules to `Agents.md`, including precedence, required reading triggers, privacy boundaries, and evidence-level safeguards.
- Aligned `docs/WEBSITE_CONTEXT.md`, `docs/PERSONAL_CONTEXT.md`, `docs/DESIGN_REFINEMENT_BRIEF.md`, and `docs/IMPLEMENTATION_PLAN.md` with the authoritative capability model and corrected receipt-processing narrative.
- Inspected the surviving Flutter, Chinese Bee API, Telegram bot, and handwriting-interface sources to anchor the primary product cases in current evidence.
- Verified the public Go and raylib X post and the C++ and OpenGL Tic-Tac-Toe repository before adding them as supporting game artifacts.
- Recorded the decision to keep Values within Home and combine the current Work and Games indexes into one Work route with Software and Games modes.
- Recorded the approved notebook-first constraints, rejection of the current Games visual system, text-like controls, blueprint method across both Work modes, prohibition on fake day and date decoration, and high-interactivity requirement.
- Paused new visual implementation and added a pre-implementation storyboard gate covering desktop, mobile, motion, reduced motion, JavaScript-free states, real artifacts, and removed decoration.
- Added the tracing-paper wrapper, kraft wrapper, and folded-page opening as concepts to compare, with tracing-paper overlays as the current leading hypothesis rather than an approved implementation.

## Confirmed public links

- LinkedIn: `https://www.linkedin.com/in/iggydev/`
- GitHub: `https://github.com/KidPudel`
- itch.io profile: `https://kidpudel.itch.io/`
- X: `https://x.com/kidpudel`
- Email: `i.kupchinenko@gmail.com`

## Pending decisions

- Confirm the exact itch.io project URL for `Discourses by Campfire`.

## Current implementation checklist

- [x] Understand repository instructions and context.
- [x] Select a technical direction.
- [x] Confirm deployment platform.
- [x] Confirm initial games and writing.
- [x] Inspect résumé and available visual material.
- [x] Write the implementation plan.
- [x] Establish a progress log.
- [x] Resolve the GitHub Pages URL and repository-dependent base path.
- [x] Scaffold the Astro application.
- [x] Create content schemas.
- [x] Build the complete core homepage experience.
- [x] Apply the original visual system across all core routes.
- [x] Separate Home, Work, Games, Blog, and Connect by purpose.
- [x] Add the interactive values journey and dedicated pixel-art Games route.
- [ ] Complete the full-site design refinement described in `docs/DESIGN_REFINEMENT_BRIEF.md`.
- [ ] Approve the notebook binding, opening reveal, within-route spread behavior, route transition, blueprint treatment, Home-values composition, and exact draggable artifacts before implementation.
- [ ] Review desktop and mobile resting compositions plus frames for unwrapping, scroll, text focus, Work-mode change, click response, drag, reduced motion, and JavaScript-free use.
- [ ] Keep the raw values composition within Home and reduce it to the most personally meaningful principles.
- [ ] Merge the current Work and Games routes into one Work index with directly linkable, progressively enhanced Software and Games modes.
- [ ] Inventory every verified included artifact and assign featured, supporting, experiment or early-work, or unfinished prominence.
- [ ] Replace current public Work copy that still contains the superseded generic high-load and two-person ordering-platform stories.
- [ ] Rebuild Work around the Flutter application, Chinese Bee, receipt investigation, and bounded fintech evidence in that order.
- [ ] Add the Snake and Tic-Tac-Toe projects as compact supporting game artifacts without displacing the two primary game cases.
- [ ] Remove the current CRT Games shell and rebuild Games as minimal pixel art integrated into warm notebook paper.
- [ ] Replace boxed or application-like controls with semantic text controls using drawn states and touch-safe hit areas.
- [ ] Implement the approved low-frame-rate unwrapping, scroll, click, draggable-object, and page behaviors as one physical system.
- [ ] Complete remaining launch content and planned detail pages.
- [ ] Adapt and host `Identity Cage` locally.
- [ ] Add game and professional detail pages.
- [x] Optimize current media and add résumé downloads.
- [x] Add GitHub Pages deployment workflow.
- [ ] Add RSS, a useful `404.html`, and complete social metadata.
- [x] Complete local accessibility, responsive, interaction, link, and base-path verification.
- [ ] Complete public cross-engine and performance verification.
- [ ] Deploy and inspect the published site.

## Current blockers

Deployment from a private repository requires GitHub Pro, Team, or Enterprise. If the current account plan does not include private-repository Pages, deployment will require either a plan upgrade or explicit approval to make the repository public. The exact Discourses by Campfire URL still requires confirmation but does not block deployment.

## Next action

Review and refine the design exploration in `docs/DESIGN_REFINEMENT_BRIEF.md`. Decide the physical notebook form, opening wrapper, route and scroll behavior, blueprint treatment, Home-values composition, and draggable artifacts from storyboards before changing visual code. After approval, correct the Work stories, merge Work and Games, implement the shared notebook interaction system, complete launch content and infrastructure, deploy, and inspect the published site.

## Notes for future work

- Preserve existing user changes in the Git working tree.
- Read `docs/CONTEXT_ABOUT_IGOR.md` before changing professional positioning, case studies, capabilities, values, role fit, or the relationship between product, mobile, backend, and game work.
- Do not publish private personal context automatically.
- Do not invent professional details or metrics.
- Keep Games on the same warm paper and shared blueprint system. Do not restore the rejected CRT or generic retro treatment.
- Implement only the interaction family approved in the storyboard, then finish publication work instead of adding unrelated effects.
- Avoid em dashes in all public website copy.
