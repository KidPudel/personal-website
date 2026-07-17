# Personal Website Implementation Plan

Last updated: 2026-07-17

## Objective

Complete and publish Igor's personal website so it feels like a glimpse into his notebook. The site should introduce Igor as a person, show credible professional evidence, present finished games and writing, and make contact straightforward.

The launch release should favor clarity, real content, accessibility, and publication readiness over elaborate interaction. This plan governs the complete project, not a prototype or design-only phase.

## Current delivery state

The Astro application, content collections, five-purpose route structure, shared notebook shell, interactive values homepage, professional Work page, pixel-art Games page, Blog, Connect, portrait switcher, optimized media, résumé downloads, and GitHub Pages workflow are implemented.

The shared shell now reads as a physical open journal with a visible cover edge, page gutter, ruled sheets, and Igor's supplied real crumpled-paper texture beneath the ink. A reusable `PersonalDoodle` component supports Igor-authored static drawings that render directly on the journal page rather than inside cards. The first production use is the strongest final frame of Igor's campfire drawing on the homepage.

The implementation has also completed a local architecture and compatibility audit. Node 24 is the documented development and deployment runtime, public profile links are centralized, and homepage interactions now preserve readable, non-misleading HTML when JavaScript is unavailable.

The project is still in active implementation. Remaining launch work includes completing the locally hosted article and planned project detail content, resolving public contact and deployment URLs, adding remaining discovery and error-page features, completing final accessibility and performance verification, and deploying and inspecting the public site.

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
- Approved public performance result: a high-load service was reduced from 9.5 seconds to 650 milliseconds.
- Selected web-ready artwork and game media may be copied into the repository for implementation.
- Personal context guides the atmosphere and voice. Private facts are not automatically public content.

## Launch content

### Home

- Personal opening and portrait switcher.
- Three large, directly worded outcomes for Igor's work.
- One large irregular sticky note containing the three outcomes as a handwritten to-do checklist.
- One original hand-drawn checkbox per outcome.
- Checking an outcome draws its tick, strikes through the outcome text, and reveals the existing explanatory sentence as a handwritten note.
- Native checkbox semantics support keyboard, pointer, and touch interaction without requiring JavaScript.
- Checking all three outcomes reveals a small handwritten invitation linking to Connect through the shared notebook page transition.
- Static personal doodles sit in a non-interactive paper-level layer beneath the readable content and use scattered, intentionally imperfect placement.
- Igor's CD case, tangled thoughts, computer, bird, burger, camera, fish, and fishbone drawings join the campfire across that paper-level layer.
- Short onward links to Work, Games, and Blog without duplicating their content.

### Work

- A dedicated page for production software work.
- High-load service performance investigation.
- Ordering-platform ownership in a two-person team.
- Future backend stories as they are documented.

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

1. High-load service performance investigation and optimization.
2. Building a payment or ordering service with another developer.
3. Independent Flutter product delivery as a smaller work note.

Receipt validation is a separate résumé-backed system involving fraud detection and may become another smaller work note. Do not describe the high-load service result as a receipt-validator result unless Igor confirms that they were the same system.

The stories should explain constraints, responsibilities, decisions, results, and reflection. Company-sensitive implementation details must remain anonymized. Unverified metrics must not be published.

### Games

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
│   ├── high-load-service-performance/  # planned detail page
│   └── ordering-platform/              # planned detail page
├── games/                    # planned detail routes
│   ├── discourses-by-campfire/
│   └── santa-foundation/
├── blog/
│   └── identity-cage/        # planned local article
├── connect/
└── 404.html                  # required launch error page
```

Primary navigation is conventional and uses `Home`, `Work`, `Games`, `Blog`, and `Connect` as separate pages. Each route has one clear purpose. Playful language may be used inside those pages without making visitors decode navigation.

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
│   ├── work.astro
│   ├── games.astro
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

- Clean, readable structure beneath a handmade layer.
- A warm desk and open-journal system rather than a dark framed portfolio shell.
- Visible ruled lines, a red notebook margin, page gutter, layered page and cover edges, tape for real attached ephemera, and uneven paper scraps where the content calls for them.
- Igor-authored doodles appear as literal ink on the journal sheets, never as framed doodle cards.
- Doodles use scattered, asymmetric placement and may be partly obscured by paper notes or page edges when readability remains intact.
- Original code-native doodles drawn from Igor's interests in games, systems, cooking, music, curiosity, and playful energy.
- Igor-authored raster doodles may replace or supplement code-native marks as they become available.
- Page drawings remain static. Motion is reserved for purposeful controls and transitions.
- Original avatar or personal artwork where it strengthens the introduction.
- A stacked two-polaroid homepage portrait that swaps between `drawn me` and `real me`, with pointer-angle tilt on fine-pointer devices.
- A focused homepage introduction followed by three large interactive outcome cards.
- Professional work and games live on their own dedicated routes rather than as homepage portfolio cards.
- Taped, clipped, or torn-paper media treatment for selected images.
- The supplied real crumpled-paper photograph is a static low-opacity texture beneath the page content and is excluded from the Games visual system.
- A restrained pencil-and-paper palette built from ink, faded red, blue-green, moss, and sticky-note yellow.
- A charcoal-and-phosphor pixel-art treatment for Games, using warm amber and faded red accents, static subtle CRT scanlines, and a soft vignette while preserving site-wide navigation.
- Hand-drawn regular prose with a distinct notebook-editorial heading face.
- A clear but comfortable route-level paper lift and crossfade, without 3D rotation or lateral movement.
- A minimal three-stroke pencil tick at mouse-click coordinates, disabled for touch and reduced to a stationary fade when reduced motion is requested.
- No copied illustrations, borders, signature framing, card arrangements, or exact composition from reference sites.

### Signature interaction

Begin with one drawn-stroke interaction for links, buttons, and selected cards:

- works for hover and keyboard focus;
- does not carry essential meaning;
- supports touch without depending on hover;
- becomes static when reduced motion is requested;
- uses CSS or a small SVG enhancement before considering JavaScript.

Route transitions use Astro's transition contract with the native View Transitions API when available and Astro's animated fallback elsewhere. The notebook moves vertically by less than one rem during a 400-millisecond two-stage exchange, with a restrained scale, light, and shadow shift and almost no overlap between readable page content. The transition is disabled when reduced motion is requested.

## Local verification baseline

- Production builds must be checked with the real `/personal-website/` base path.
- Every core route must keep one `main`, one `h1`, a correct active-navigation state, and no horizontal document overflow.
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
- Three interactive homepage outcomes presented as one handwritten sticky-note checklist.
- Nine static paper-level homepage doodles, including the campfire and eight additional Igor-authored sketches.
- Two production stories on Work and two game projects on Games.
- Dedicated charcoal CRT and pixel-art Games visual system.
- Notebook paper-lift route transitions.
- Drawn and real stacked-polaroid switcher with pointer tilt and touch-safe swapping.
- Responsive layouts, progressive enhancement, touch controls, and reduced-motion behavior.
- PDF and DOCX résumé downloads.

### Phase 3: launch content completion, in progress

- Adapt and host `Identity Cage` locally.
- Complete selected game detail pages with real media, mechanics, technical decisions, and reflection.
- Complete selected professional detail stories with anonymized constraints, decisions, results, and reflection.
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
- Work content communicates production backend depth without inventing facts.
- Game content includes real media and explains systems or design decisions.
- `Identity Cage` is readable on the site.
- PDF and DOCX résumé downloads work.
- Navigation works with mouse, touch, and keyboard.
- Reduced-motion preferences are respected.
- Mobile layouts remain readable and usable.
- No private personal context is published without approval.
- No public copy uses em dashes.
- The GitHub Pages deployment succeeds from a clean checkout.

## Open decisions
- Root Pages URL versus `/personal-website/` project URL.
- Exact public itch.io link for `Discourses by Campfire`.
