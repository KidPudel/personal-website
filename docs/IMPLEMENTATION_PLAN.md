# Personal Website Implementation Plan

Last updated: 2026-07-21

## Objective

Complete and publish Igor's personal website so it feels like a glimpse into his notebook. The site should introduce Igor as a person, show credible professional evidence across product, mobile, backend, and game work, present finished games and writing, and make contact straightforward.

The launch release should combine clarity, real content, accessibility, publication readiness, and a highly authored interactive notebook. The interaction is part of the portfolio piece, but its compositions and motion grammar must be storyboarded and approved before implementation. This plan governs the complete project, not a disposable prototype or isolated effect study.

## Current delivery state

The Astro application, content collections, five-purpose route structure, shared notebook shell, interactive values homepage, professional Work page, pixel-art Games page, Blog, Connect, portrait switcher, optimized media, résumé downloads, and GitHub Pages workflow are implemented.

The shared shell now reads as a physical open journal with a visible cover edge, page gutter, ruled sheets, and Igor's supplied real crumpled-paper texture beneath the ink. A reusable `PersonalDoodle` component supports Igor-authored static drawings that render directly on the journal page rather than inside cards. The first production use is the strongest final frame of Igor's campfire drawing on the homepage.

The implementation has also completed a local architecture and compatibility audit. Node 24 is the documented development and deployment runtime, public profile links are centralized, and homepage interactions now preserve readable, non-misleading HTML when JavaScript is unavailable.

The project is still in active implementation, but new visual implementation is paused for design discovery. The target information architecture combines the current Work and Games indexes into one Work route with directly linkable Software and Games modes. Home retains Igor's values as part of the personal introduction. `docs/DESIGN_REFINEMENT_BRIEF.md` now separates approved constraints from a working `living blueprint notebook` hypothesis and requires desktop, mobile, motion, reduced-motion, and JavaScript-free storyboards before code changes.

`docs/CONTEXT_ABOUT_IGOR.md` now supplies the authoritative professional and craft context. It corrects the earlier backend-specialist framing and two public work narratives that are still present in the implementation: the performance result belongs to receipt processing that bypassed unnecessary OCR for PDFs, and ownership of an ordering platform in a two-person team is not verified. Correcting the current public Work content is required before launch.

## Confirmed decisions

- Deployment target: GitHub Pages.
- Public URL: `https://kidpudel.github.io/personal-website/`.
- Repository visibility: private. The published Pages site remains public.
- Framework: Astro with strict TypeScript.
- Runtime: Node 24 for both local development and GitHub Pages builds.
- Rendering: static HTML by default.
- Content: local Markdown or MDX backed by typed Astro content collections.
- Styling: plain CSS with custom properties and isolated component styles.
- Client-side code: vanilla TypeScript only where progressive enhancement provides clear value.
- Primary games: `Discourses by Campfire` and `Secret Santa Foundation`.
- First article: a locally hosted version of `Identity Cage`, with an optional Medium link.
- Professional material: anonymized stories based on verified résumé experience rather than public source code.
- Professional and craft source of truth: `docs/CONTEXT_ABOUT_IGOR.md`.
- Current coherent direction: experience-driven product systems design and engineering, used as an explanatory umbrella rather than a claimed job title or permanent identity.
- Plain homepage positioning: Igor builds software and makes games. The deeper direction should emerge through evidence.
- Primary navigation: Home, Work, Blog, Connect.
- Work contains directly linkable Software and Games modes. Software is the default mode; Games uses minimal pixel art integrated into the same warm notebook paper.
- The existing `/games/` URL must continue to resolve and forward visitors to `/work/#games`; Work becomes the canonical index.
- Home owns the values composition. There is no separate Values route.
- “Raw” values means the principles feel personally meaningful and emotionally close to Igor, not careless or maximally confessional.
- Work should inventory every verified artifact Igor chooses to include, using featured, supporting, experiment, early-work, and unfinished levels rather than equal prominence.
- Verified performance result: receipt processing was reduced from approximately 6 to 10 seconds to approximately 600 to 650 milliseconds by detecting PDFs, extracting text directly, and avoiding unnecessary OCR.
- The prior exact `9.5 seconds to 650 milliseconds` generic high-load claim is superseded unless Igor re-verifies that exact measurement and wording.
- The prior claim of ordering-platform ownership in a two-person team is superseded unless Igor separately verifies it.
- Selected web-ready artwork and game media may be copied into the repository for implementation.
- Personal context guides the atmosphere and voice. Private facts are not automatically public content.
- One persistent notebook is the only primary content surface. The desk remains quiet environmental space.
- Work uses truthful blueprint-like construction marks in both modes. Games does not retain the current dark CRT or generic retro-interface treatment.
- Links and semantic buttons look like clear written text, not boxed buttons, pills, dashboard tabs, or CTA cards.
- High interactivity is required: the shared physical grammar may unwrap, lift, slide, draw, rearrange, riffle, and settle paper with deliberately stepped low-frame-rate motion.
- Do not invent dates, weekdays, timestamps, locations, coordinates, measurements, or project notes for atmosphere.
- Do not implement the new visual direction until Igor approves its storyboards and interaction states.
- `docs/DESIGN_REFINEMENT_BRIEF.md` governs the next full-site visual and content-structure pass.

## Launch content

### Home

- Personal opening and portrait switcher.
- A direct primary statement that Igor builds software and makes games. Writing remains available through Blog but is not part of the primary identity statement.
- Three selected principles about what makes a product or game worth working on to Igor, not the complete internal process-and-outcome framework.
- The selected principles should feel raw and personally meaningful to Igor rather than professionally optimized.
- A clear reason behind the work: what the product is for, who it serves, and why its behavior matters.
- A close relationship with people using it: communication, feedback, iteration, mutual respect, and appreciation shape the result.
- Capability and understanding that can travel: the product gives someone a real capability or experience, and the learning produced by building it can be explained, taught, or shared.
- Checking a work standard draws its tick, strikes through the text, and reveals its approved explanatory sentence.
- Native checkbox semantics support keyboard, pointer, and touch interaction without requiring JavaScript.
- Completing the checklist may reveal the existing Connect link without adding an invented emotional slogan.
- Static personal doodles sit in a non-interactive paper-level layer beneath the readable content and use scattered, intentionally imperfect placement.
- Igor's CD case, tangled thoughts, computer, bird, burger, camera, fish, and fishbone drawings join the campfire across that paper-level layer.
- Short onward links to Work's Software and Games modes and to Blog without duplicating their content.

### Work

- One complete Work page with Software and Games modes.
- A full verified inventory organized as featured cases, supporting work, experiments or early work, and unfinished work.
- Direct links to `/work/#software` and `/work/#games`, or an equally durable alternative.
- Software as the default mode for general visits.
- Both collections present in the HTML, with an accessible progressively enhanced mode control.

#### Software mode

- Complete Flutter product ownership as the leading case, from proposing the cross-platform direction through product decisions, implementation, and production readiness.
- Chinese Bee as the second primary case, showing one learning capability across Telegram, data, search, saved vocabulary, flashcards, web handwriting interaction, and recognition scoring.
- Receipt-processing investigation and optimization through PDF detection and direct text extraction as a focused engineering case.
- Fintech gateway, provider-integration, receipt-validation, order, payment, and expiration work, bounded by what the evidence establishes.
- Courier-API investigation and pragmatic technology selection where it adds useful breadth.

### Connect

- Dedicated LinkedIn, GitHub, itch.io, X, résumé, and email links.
- Direct wording that supports professional opportunities and compatible collaborators.

### Blog

- A dedicated writing index.
- Locally hosted `Identity Cage` article when adapted.
- Medium canonical link where appropriate.
- RSS feed.

### Professional stories

Work-page stories:

1. Complete Flutter product ownership, including proposing the cross-platform direction, learning Flutter, shaping interactions and product behavior, implementing the application, and carrying it to production readiness. Use `/Users/iggysleepy/dev/mobile/SuperGoodFlutter/super_good_flutter` as the internal evidence source.
2. Chinese Bee as a coherent end-to-end learning capability built across a Telegram bot, database-backed API, multilingual search, saved vocabulary, flashcards, a Vue handwriting interface, and recognition scoring.
3. Receipt processing reduced from approximately 6 to 10 seconds to approximately 600 to 650 milliseconds by replacing unnecessary OCR for PDFs with direct text extraction and adapting downstream parsing.
4. Fintech gateway and provider-integration work, including becoming productive in an existing Go codebase, payment aggregation, communication integrations, receipt validation, fraud investigation, and onboarding two developers.
5. Early-stage fintech services involving Go, PostgreSQL, Kafka, Redis, Protobuf, gRPC, JWT middleware, webhooks, callbacks, and expiration workflows without claiming deep distributed correctness or long-term operations.

The Flutter application and Chinese Bee are the strongest complete product cases. The receipt-processing work is the strongest bounded investigation case. It must not be rewritten as generic Go optimization through goroutines, connection pooling, or SQL. The early-stage fintech work must not be described as ownership in a two-person team unless Igor verifies that exact claim.

The stories should explain constraints, responsibilities, decisions, results, and reflection. Company-sensitive implementation details must remain anonymized. Unverified metrics must not be published.

#### Games mode

1. `Discourses by Campfire`
   - Cover.
   - Selected screenshots.
   - Trailer or teaser.
   - Intended experience.
   - Mechanics, systems, technical decisions, and reflection.
   - itch.io link.

2. `Secret Santa Foundation`
   - Selected pixel-art scenes and sprites.
   - Intended experience.
   - Mechanics, production constraints, technical decisions, and reflection.
   - itch.io link.

Smaller supporting artifacts:

- Go and raylib Snake experiment shared on [X](https://x.com/kidpudel/status/1781656147990020293?s=20), where it received visible public engagement. Keep it compact and do not turn changing engagement counts into a headline metric.
- C++ and OpenGL [Tic-Tac-Toe](https://github.com/KidPudel/TicTacToe), using GLFW, GLAD, and GLM, as an early artifact in the longer game-development trajectory.

### Current exploration

- Game telemetry and analytics project.
- Clearly marked as in progress.
- No claims about features or results until they exist.

### Contact and résumé

- LinkedIn.
- GitHub.
- itch.io.
- Email at `i.kupchinenko@gmail.com`.
- X at `https://x.com/kidpudel`.
- Downloadable PDF and DOCX résumé.

## Information architecture

```text
/
├── work/
│   ├── #software                             # directly linked index mode
│   ├── #games                                # directly linked index mode
│   ├── software/
│   │   ├── flutter-product-ownership/        # planned detail page
│   │   ├── chinese-learning-product/         # planned detail page
│   │   ├── receipt-processing-optimization/  # planned detail page
│   │   └── fintech-service-flows/            # planned detail page
│   └── games/
│       ├── discourses-by-campfire/
│       └── santa-foundation/
│       # Snake and Tic-Tac-Toe remain compact supporting artifacts
├── blog/
│   └── identity-cage/        # planned local article
├── connect/
├── games/                       # compatibility redirect to /work/#games
└── 404.html                  # required launch error page
```

Primary navigation is conventional and uses `Home`, `Work`, `Blog`, and `Connect`. Work's `Software` and `Games` modes use equally plain labels inside the page. Playful language may be used inside those areas without making visitors decode navigation.

## Technical architecture

```text
src/
├── assets/
│   ├── art/
│   └── games/
├── components/
│   ├── DoodleGarden.astro
│   ├── PersonalDoodle.astro
│   ├── SiteFooter.astro
│   └── SiteHeader.astro
├── config/
│   ├── site.ts
│   └── transitions.ts
├── content/
│   ├── games/
│   ├── work/
│   └── writing/
├── layouts/BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── work/
│   │   ├── index.astro
│   │   ├── software/[slug].astro
│   │   └── games/[slug].astro
│   ├── connect.astro
│   └── blog.astro
├── styles/global.css
└── content.config.ts

public/
├── fonts/
├── resume/
└── static/
```

### Content schemas

Work, game, and writing entries should have validated frontmatter. Fields should include only information used by the site, such as:

- title;
- summary;
- publication or project status;
- dates when verified;
- featured-media references;
- external links;
- tags or capability labels;
- featured ordering;
- draft state.

### Personal doodle system

`src/components/PersonalDoodle.astro` is the shared path for Igor's own notebook drawings.

- Each doodle uses one transparent source image and remains static.
- Astro optimizes the source image to WebP at build time.
- Doodles are lazy-loaded and require no client-side script.
- Drawings do not animate, tilt, or react to hover and tap because they represent literal ink on the page.
- Doodles may be positioned in a pointer-transparent layer beneath the primary content so they feel embedded in the sheet rather than arranged as UI.
- Decorative drawings never carry required information.
- `artScale` compensates for intentional transparent space without modifying source artwork.

Future drawings such as a computer, joystick, brain, data flow, game object, or campfire should be exported as single transparent PNG files. Animation studies may remain in the art source folder, but only the selected still should be imported into the published page.

### GitHub Pages

- Use static Astro output.
- Configure the canonical `site` URL as `https://kidpudel.github.io` and the project-site `base` path as `/personal-website/`.
- Add a GitHub Actions workflow using the official Pages deployment flow.
- Ensure all internal links and assets work from the selected Pages path.
- Generate a sitemap, RSS feed, and a useful `404.html` page.
- Do not introduce server-only functionality.

## Visual direction

- One persistent soft-bound notebook is the website and the only primary content surface. A warm, quiet desk exists only around it.
- The working internal direction is a `living blueprint notebook`, subject to storyboard approval before implementation.
- Visible ruled lines, a red notebook margin, page gutter, layered page and cover edges, tape for real attached ephemera, and uneven paper scraps where the content calls for them.
- Igor-authored doodles appear as literal ink on the journal sheets, never as framed doodle cards.
- Doodles use scattered, asymmetric placement and may be partly obscured by paper notes or page edges when readability remains intact.
- Original code-native doodles drawn from Igor's interests in games, systems, cooking, music, curiosity, and playful energy.
- Igor-authored raster doodles may replace or supplement code-native marks as they become available.
- Notebook layers and selected loose artifacts may move when the action follows the approved physical grammar and the resting layout remains complete.
- Original avatar or personal artwork where it strengthens the introduction.
- A stacked two-polaroid homepage portrait that swaps between `drawn me` and `real me`, with pointer-angle tilt on fine-pointer devices.
- A focused homepage introduction followed by three notebook observations about clear purpose, close communication with users or players, and capability or understanding that can be shared.
- Software and games live together in Work rather than as homepage portfolio cards or separate identity silos.
- Taped, clipped, or torn-paper media treatment for selected images.
- The supplied real crumpled-paper photograph is a static low-opacity texture beneath notebook content, including Games where it does not interfere with real media.
- A restrained pencil-and-paper palette built from ink, faded red, blue-green, moss, and sticky-note yellow.
- Faded blueprint construction marks on tracing sheets, local graph-paper zones, or margins explain real behavior, state, decisions, and mechanics in both Work modes.
- Games uses real pixel art printed, taped, stamped, drawn, or animated on warm paper. Remove CRT scanlines, phosphor, dark shells, game-menu framing, controller motifs, neon, generic retro labels, and pixel borders around ordinary interface elements.
- Bright Chalk for regular handwritten prose and interface text, with Cartoon Relief reserved for larger distinctive elements. Pixel type is limited to authentic game media or a small project-specific label.
- Text controls communicate state through a drawn underline, circle, margin arrow, stroke, or ink change while preserving semantic elements, focus indication, and 44-pixel hit areas.
- Deliberately low-frame-rate paper motion for unwrapping, lifting, sliding, drawing, rearranging, riffling, and settling.
- Click responses may use a short pencil, ink, stamp, graphite, or pressure mark rather than a generic ripple.
- No copied illustrations, borders, signature framing, card arrangements, or exact composition from reference sites.
- No fake dates, day labels, timestamps, locations, coordinates, measurements, or notebook notes.

### Signature interaction

The leading storyboard hypothesis is a tracing-paper wrapper that partly covers the notebook and moves aside in a few stepped frames to present Igor's world. This is not approved for implementation until compared with the kraft-wrapper and folded-page alternatives in `docs/DESIGN_REFINEMENT_BRIEF.md`.

The approved interaction family will be selected from:

- unwrapping for the first encounter and rare major reveals;
- lifting or sliding for tracing sheets, evidence, and folded notes;
- drawing for link states, blueprint paths, checkbox marks, and focus indication;
- rearranging for a small number of bounded loose artifacts;
- riffling or settling for route and Work-mode changes.

Every selected interaction:

- works for hover and keyboard focus;
- does not carry essential meaning;
- supports touch without depending on hover;
- shows its final readable state when reduced motion is requested or JavaScript is unavailable;
- preserves direct navigation and browser history;
- uses transforms, opacity, CSS, or small SVG enhancement before heavier JavaScript;
- avoids scroll jacking and exact-scroll-position requirements;
- remains within safe bounds and never hides navigation or required text.

Do not lock route-transition mechanics, frame rate, drag targets, or wrapper materials until the desktop and mobile storyboards are approved.

## Local verification baseline

- Production builds must be checked with the real `/personal-website/` base path.
- Every core route must keep one `main`, one accessible page name, a correct active-navigation state, and no horizontal document overflow. The page name may use a visually hidden `h1` when a visible page title would be empty template furniture.
- Responsive checks cover 360, 390, 760, 761, 1000, 1001, and 1440 pixel widths so both sides of the current CSS breakpoints are exercised.
- Homepage value controls must work without JavaScript through native checkbox behavior; JavaScript is used only for the optional scroll reveal.
- Reduced-motion behavior must keep content visible and remove continuous or route motion.
- Public deployment still requires a final check in current Chromium, Firefox, and Safari engines because local viewport testing does not replace cross-engine testing.

## Asset strategy

Available source folders:

- `/Users/iggysleepy/Library/Mobile Documents/com~apple~CloudDocs/art/winter-game`
- `/Users/iggysleepy/Library/Mobile Documents/com~apple~CloudDocs/art/My-procreate`
- `/Users/iggysleepy/Library/Mobile Documents/com~apple~CloudDocs/art/christmas-game`

Copy only selected web-ready assets into the repository. Keep editable production files such as `.kra`, `.aseprite`, and `.af` outside the published site unless they are explicitly needed.

The portrait switcher uses Igor's approved `avatar_irl.png` photograph for the `real me` state and his original avatar artwork for the `drawn me` state. Keep both assets optimized, preserve meaningful alternative text, and do not generate or infer replacement likenesses.

Optimize raster media, preserve intentional pixel edges, provide meaningful alternative text, include video posters, and avoid autoplay with sound.

The repository retains the three approved campfire source studies from Igor's Procreate export folder under `src/assets/art/doodles/campfire/`. The homepage imports only `frame-3.png`, where the flame is strongest, and Astro publishes one optimized WebP derivative. Eight additional transparent PNG doodles supplied by Igor are imported from the same current source directory and optimized independently at build time.

The journal surface uses the user-supplied `Texturelabs_Paper_143M.jpg`, converted to a stripped 112 KB WebP at `src/assets/art/paper-crumpled.webp`. It is reused by the header and journal pages, loaded once, desaturated in presentation, and placed below the ink layer so typography and artwork stay clear.

## Delivery phases

### Phase 1: foundation and visual system, completed

- Astro with strict TypeScript and typed content collections.
- Static rendering, shared layout, semantic navigation, skip link, and focus states.
- Original loose-leaf paper and doodles system applied across all core routes.
- GitHub Pages build and deployment workflow.
- Optimized current game and portrait media.

### Phase 2: core route implementation, completed

- Home, Work, Games, Blog, and Connect routes, each with a clear purpose.
- Interactive homepage work standards plus a distinct statement about the effect Igor wants his contributions to have in the world.
- Nine static paper-level homepage doodles, including the campfire and eight additional Igor-authored sketches.
- Two production stories on Work and two game projects on Games.
- Dedicated charcoal CRT and pixel-art Games visual system.
- Notebook paper-lift route transitions.
- Drawn and real stacked-polaroid switcher with pointer tilt and touch-safe swapping.
- Responsive layouts, progressive enhancement, touch controls, and reduced-motion behavior.
- PDF and DOCX résumé downloads.

### Phase 2.5: design refinement, in progress

- Pause visual implementation until Igor approves the desktop, mobile, motion, reduced-motion, and JavaScript-free storyboards required by `docs/DESIGN_REFINEMENT_BRIEF.md`.
- Compare the tracing-paper wrap, kraft wrapper, and folded-page opening before selecting the signature reveal.
- Compare tracing overlays, local graph-paper zones, and margin schematics on one Software case and one Games case.
- Decide the notebook binding, within-route page behavior, route-transition paper action, Home-values composition, and exact draggable artifacts.
- Correct current public Work copy and content entries against `docs/CONTEXT_ABOUT_IGOR.md` before using them as visual evidence.
- Obtain web-embeddable Bright Chalk and Cartoon Relief files with confirmed licensing, then bundle optimized WOFF2 assets.
- Use Bright Chalk for paragraphs, navigation, practical labels, controls, and technical explanations.
- Reserve Cartoon Relief for larger distinctive statements, project names, questions, and major results.
- Reduce desk, paper texture, ruled-line, frame, shadow, and gutter competition.
- Distribute personal doodles across routes so no viewport is crowded.
- Replace the repeated visible H1/H2/H3 landing-page structure with composition-led artifacts, notes, photographs, diagrams, and fragments while preserving accessible page and region names.
- Make the homepage more directly about Igor and make the real portrait easier to encounter.
- Refine the raw values composition as part of Home rather than as a separate destination.
- Merge the existing Work and Games indexes into one Work page with accessible, directly linkable Software and Games modes.
- Add every verified work artifact at an appropriate featured, supporting, experiment, early-work, or unfinished level.
- Recompose Work around the complete Flutter application first, Chinese Bee second, receipt processing as the strongest focused investigation, and bounded fintech implementation as supporting breadth.
- Recompose Blog around the real essay and Connect around one direct contact section.
- Preserve only the current Games page's evidence strengths. Rebuild its rejected dark CRT interface as minimal pixel art integrated into notebook paper.
- Replace visual buttons, pills, segmented controls, CTA cards, and social cards with clear written-text treatments while preserving semantics and target size.
- Implement the approved low-frame-rate unwrapping, scroll, click, drag, and page behavior as one physical interaction system.
- Validate the direction on the real homepage, then apply it across every affected route.

### Phase 3: launch content completion, in progress

- Adapt and host `Identity Cage` locally.
- Complete selected game detail pages with real media, mechanics, technical decisions, and reflection.
- Complete selected professional detail stories with anonymized constraints, decisions, results, and reflection at the capability level supported by `docs/CONTEXT_ABOUT_IGOR.md`.
- Add approved personal story and current-exploration content where it improves visitor understanding.
- Replace unresolved contact and project URLs with confirmed public values.

### Phase 4: discovery and release infrastructure, pending

- Add RSS for writing.
- Add a useful `404.html` page.
- Complete canonical metadata and social preview assets.
- Verify internal links, downloads, sitemap, and repository-base paths.

### Phase 5: final verification and deployment, pending

- Run clean type and production build checks.
- Test all routes at desktop and mobile widths.
- Test keyboard navigation, focus visibility, touch targets, and reduced motion.
- Check color contrast, headings, landmarks, labels, and alternative text.
- Review image weight, layout shift, and unnecessary JavaScript.
- Deploy through GitHub Actions and inspect the published site.
- Fix deployment-only issues before declaring the project complete.

## Launch acceptance criteria

- Every required route is directly addressable and works without client-side JavaScript.
- The homepage introduces Igor as a person before showing dense professional information.
- Igor's raw, personally meaningful values remain part of Home.
- Work exposes directly linkable Software and Games modes and keeps both inventories accessible without JavaScript.
- Every verified included artifact is discoverable, while prominence makes the strongest capability evidence obvious.
- Work content communicates end-to-end construction, cross-boundary implementation, investigative problem solving, and real paid backend experience without inventing facts or implying mature narrow specialization.
- Game content includes real media and explains systems or design decisions.
- Game content treats independent multidisciplinary work seriously without presenting it as established commercial specialization.
- Every route and both Work modes remain visibly inside one persistent notebook.
- Games appears as pixel art integrated into paper and contains no CRT, phosphor, terminal, console, arcade-menu, neon, or generic retro shell.
- Software and Games use the same truthful blueprint annotation method without fake technical decoration.
- Controls look like written text rather than generic application buttons while remaining semantic, focused, and touch-safe.
- The approved unwrapping, scroll, click, drag, and page motions feel deliberately low-frame-rate and physically related.
- The complete resting layout is available with reduced motion and without JavaScript.
- `Identity Cage` is readable on the site.
- PDF and DOCX résumé downloads work.
- Navigation works with mouse, touch, and keyboard.
- Reduced-motion preferences are respected.
- Mobile layouts remain readable and usable.
- No private personal context is published without approval.
- No public copy uses em dashes.
- The GitHub Pages deployment succeeds from a clean checkout.

## Open decisions
- Exact public itch.io link for `Discourses by Campfire`.
- Public wording for officially documented employment versus substantial paid but unofficial or project-based work, if that distinction needs to appear on the site rather than only guide internal claim review.
