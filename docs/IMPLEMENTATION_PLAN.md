# Personal Website Implementation Plan

Last updated: 2026-07-16

## Objective

Complete and publish Igor's personal website so it feels like a glimpse into his notebook. The site should introduce Igor as a person, show credible professional evidence, present finished games and writing, and make contact straightforward.

The launch release should favor clarity, real content, accessibility, and publication readiness over elaborate interaction. This plan governs the complete project, not a prototype or design-only phase.

## Current delivery state

The Astro application, content collections, shared paper-and-doodles visual system, Home, Work, Connect, and Blog routes, project switchers, portrait switcher, optimized media, résumé downloads, and GitHub Pages workflow are implemented.

The project is still in active implementation. Remaining launch work includes completing the locally hosted article and planned project detail content, resolving public contact and deployment URLs, adding remaining discovery and error-page features, completing final accessibility and performance verification, and deploying and inspecting the public site.

## Confirmed decisions

- Deployment target: GitHub Pages.
- Framework: Astro with strict TypeScript.
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

- Opening headed by `A quick glimpse into Igor's personal notebook`.
- Short, concrete explanation of Igor's professional work.
- Current interests or current exploration.
- Two clearly switchable professional stories.
- Two clearly switchable selected games.
- Recent writing.
- Short personal story content where approved.
- Contact, social, and résumé links.

### Work

- A dedicated page for production software work.
- High-load service performance investigation.
- Ordering-platform ownership in a two-person team.
- Future backend stories as they are documented.

### Connect

- Dedicated LinkedIn, GitHub, itch.io, résumé, and approved email links.
- Direct wording that supports professional opportunities and compatible collaborators.

### Blog

- A dedicated writing index.
- Locally hosted `Identity Cage` article when adapted.
- Medium canonical link where appropriate.
- RSS feed.

### Professional stories

Homepage and Work-page stories:

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
- Email after approval.
- X after receiving a public profile URL.
- Downloadable PDF and DOCX résumé.

## Information architecture

```text
/
├── work/
│   ├── high-load-service-performance/  # planned detail page
│   └── ordering-platform/              # planned detail page
├── connect/
├── blog/
│   └── identity-cage/        # planned local article
├── games/                    # planned detail routes
│   ├── discourses-by-campfire/
│   └── santa-foundation/
└── 404.html                  # required launch error page
```

Primary navigation is conventional and uses `Home`, `Work`, `Connect`, and `Blog` as separate pages. Playful language may be used inside those pages without making visitors decode navigation.

## Technical architecture

```text
src/
├── assets/
│   ├── art/
│   └── games/
├── components/
│   ├── DoodleGarden.astro
│   ├── SiteFooter.astro
│   └── SiteHeader.astro
├── content/
│   ├── games/
│   ├── work/
│   └── writing/
├── layouts/BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── work.astro
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

### GitHub Pages

- Use static Astro output.
- Configure the canonical `site` URL and repository-dependent `base` path.
- Add a GitHub Actions workflow using the official Pages deployment flow.
- Ensure all internal links and assets work from the selected Pages path.
- Generate a sitemap, RSS feed, and a useful `404.html` page.
- Do not introduce server-only functionality.

## Visual direction

- Clean, readable structure beneath a handmade layer.
- A warm desk and loose-leaf paper system rather than a dark framed portfolio shell.
- Visible ruled lines, punched holes, a red notebook margin, torn edges, tape, and uneven paper scraps.
- Original code-native doodles drawn from Igor's interests in games, systems, cooking, music, curiosity, and playful energy.
- Original avatar or personal artwork where it strengthens the introduction.
- A two-state homepage portrait that switches between `drawn me` and `real me`.
- A three-part homepage collage with introduction, circular portrait cutout, and a small handwritten contents note.
- Separate full-width scrapbook rows for professional work and games instead of paired portfolio showcase cards.
- Taped, clipped, or torn-paper media treatment for selected images.
- A restrained pencil-and-paper palette built from ink, faded red, blue-green, moss, and sticky-note yellow.
- Selective pixel-art treatment for Games while preserving site-wide typography and navigation.
- No copied illustrations, borders, signature framing, card arrangements, or exact composition from reference sites.

### Signature interaction

Begin with one drawn-stroke interaction for links, buttons, and selected cards:

- works for hover and keyboard focus;
- does not carry essential meaning;
- supports touch without depending on hover;
- becomes static when reduced motion is requested;
- uses CSS or a small SVG enhancement before considering JavaScript.

Richer transitions should wait until the core site is complete.

## Asset strategy

Available source folders:

- `/Users/iggysleepy/Library/Mobile Documents/com~apple~CloudDocs/art/winter-game`
- `/Users/iggysleepy/Library/Mobile Documents/com~apple~CloudDocs/art/My-procreate`
- `/Users/iggysleepy/Library/Mobile Documents/com~apple~CloudDocs/art/christmas-game`

Copy only selected web-ready assets into the repository. Keep editable production files such as `.kra`, `.aseprite`, and `.af` outside the published site unless they are explicitly needed.

The portrait switcher uses Igor's approved `avatar_irl.png` photograph for the `real me` state and his original avatar artwork for the `drawn me` state. Keep both assets optimized, preserve meaningful alternative text, and do not generate or infer replacement likenesses.

Optimize raster media, preserve intentional pixel edges, provide meaningful alternative text, include video posters, and avoid autoplay with sound.

## Delivery phases

### Phase 1: foundation and visual system, completed

- Astro with strict TypeScript and typed content collections.
- Static rendering, shared layout, semantic navigation, skip link, and focus states.
- Original loose-leaf paper and doodles system applied across all core routes.
- GitHub Pages build and deployment workflow.
- Optimized current game and portrait media.

### Phase 2: core route implementation, completed

- Home, Work, Connect, and Blog routes.
- Two switchable production stories and two switchable games.
- Drawn and real portrait switcher.
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

- Public email approval.
- Public X profile URL.
- Root Pages URL versus `/personal-website/` project URL.
- Exact public itch.io links for both featured games.
- Final refinements to the approved notebook heading and homepage introduction.
