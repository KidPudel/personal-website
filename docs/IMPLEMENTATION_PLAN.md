# Personal Website Implementation Plan

Last updated: 2026-07-16

## Objective

Publish a useful first version of Igor's personal website that feels like a glimpse into his notebook. The site should introduce Igor as a person, show credible professional evidence, present finished games and writing, and make contact straightforward.

The first release should favor clarity, real content, accessibility, and publication speed over elaborate interaction.

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

## First-release content

### Home

- Personal opening.
- Short, concrete explanation of Igor's professional work.
- Current interests or current exploration.
- Selected professional work.
- Two selected games.
- Recent writing.
- Short personal note.
- Contact, social, and résumé links.

### My Story

- Starting programming in 2019.
- Progression through mobile, backend, systems, and game work.
- Current direction without presenting a job title as a permanent identity.
- Only explicitly approved personal details.

### Work

Initial stories:

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

### Writing

- Locally hosted `Identity Cage` article.
- Writing index prepared for future posts.
- RSS feed.

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
├── story/
├── work/
│   ├── high-load-service-performance/
│   ├── payment-service/
│   └── flutter-product-delivery/
├── games/
│   ├── discourses-by-campfire/
│   └── secret-santa-foundation/
├── writing/
│   └── identity-cage/
└── contact/
```

Final navigation labels may be playful only when paired with clear functional labels.

## Technical architecture

```text
src/
├── components/
│   ├── cards/
│   ├── handmade/
│   ├── layout/
│   ├── media/
│   └── navigation/
├── content/
│   ├── games/
│   ├── work/
│   └── writing/
├── layouts/
│   ├── BaseLayout.astro
│   ├── ProjectLayout.astro
│   └── WritingLayout.astro
├── pages/
├── styles/
│   ├── global.css
│   ├── motion.css
│   └── tokens.css
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
- Dark textured surround with warm paper-like content surfaces.
- Small original drawings and handwritten annotations.
- Original avatar or personal artwork where it strengthens the introduction.
- Taped or stitched media treatment for selected images.
- One restrained accent palette shared across the site.
- Selective pixel-art treatment for Games while preserving site-wide typography and navigation.
- No copied illustrations, borders, or exact composition from reference sites.

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

Optimize raster media, preserve intentional pixel edges, provide meaningful alternative text, include video posters, and avoid autoplay with sound.

## Implementation phases

### Phase 1: resolve publication details

- Confirm public email.
- Receive the public X profile URL or omit X.
- Choose root GitHub Pages deployment or a repository subpath.
- Confirm exact itch.io project links.

### Phase 2: project foundation

- Scaffold Astro and strict TypeScript.
- Add content collections and schemas.
- Add base layout, metadata, semantic navigation, skip link, and accessible focus states.
- Add design tokens and responsive layout primitives.
- Add initial GitHub Pages configuration.

### Phase 3: representative homepage slice

- Build the header and personal introduction.
- Use one original avatar or illustration.
- Add one anonymized professional preview.
- Add a `Discourses by Campfire` preview using real media.
- Add the first drawn-stroke interaction.
- Test mobile, keyboard, touch, and reduced-motion behavior.

Do not generalize the visual system until this slice is reviewed.

### Phase 4: content expansion

- Build all main routes.
- Add the two games and their detail pages.
- Add the professional stories.
- Adapt and host `Identity Cage` locally.
- Add the story, current exploration, contact, and résumé content.

### Phase 5: media and refinement

- Optimize images and video delivery.
- Add responsive taped or stitched media frames.
- Add the restrained Games pixel treatment.
- Add placeholders only where Igor is expected to provide future material.
- Refine typography, texture, spacing, and annotations.

### Phase 6: verification and release

- Run type and production build checks.
- Verify all routes and downloads under the GitHub Pages base path.
- Test responsive layouts.
- Test keyboard navigation, focus visibility, touch targets, and reduced motion.
- Check color contrast, headings, landmarks, labels, and alternative text.
- Check metadata, social previews, sitemap, RSS, broken links, and `404.html`.
- Review image weight, layout shift, and unnecessary JavaScript.
- Deploy through GitHub Actions and inspect the published site.

## First-release acceptance criteria

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
- Final homepage opening copy after the representative visual slice exists.
