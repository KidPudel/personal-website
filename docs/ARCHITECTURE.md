# Website architecture

Last updated: 2026-07-22

## Purpose

This document is the technical architecture for rebuilding the website.

- `docs/CONCEPT_DESIGN.md` defines what the website is and how it should feel.
- `docs/CONTEXT_ABOUT_IGOR.md` defines professional evidence and claim boundaries.
- `docs/IMPLEMENTATION_PLAN.md` defines delivery order.
- `docs/PROGRESS.md` records current implementation state.

Do not add visual direction or public copy here.

## Architectural approach

Use Astro as a statically generated multi-page website with standard HTML and CSS. Add small, isolated TypeScript enhancements only where interaction requires them.

The unusual quality of the website comes from composition, authored assets, material behavior, and interaction. It does not require a full client-side application framework, global state store, canvas-rendered interface, or component library.

### Baseline decisions

- Keep Astro, strict TypeScript, static output, and the existing GitHub Pages deployment pipeline.
- Use Astro components for document structure and physical visual objects.
- Use content collections for typed project and writing data.
- Use component-scoped CSS for compositions and a small global CSS foundation.
- Use custom elements or local TypeScript modules for isolated interaction.
- Use real routes as the primary source of navigation state.
- Keep essential content and navigation complete before JavaScript runs.
- Do not add React, Vue, Svelte, a global store, Tailwind, or an animation library without a concrete requirement that the platform and Astro cannot meet simply.

## Routing

Routes are statically generated and directly addressable.

| Route | Responsibility |
| --- | --- |
| `/` | Home and the Connect disclosure |
| `/who-i-am/` | Personal introduction and craft values |
| `/work/` | Work choice |
| `/work/software/` | Software work index |
| `/work/software/[slug]/` | Software detail |
| `/work/games/` | Games work index |
| `/work/games/[slug]/` | Game detail |
| `/blog/` | Writing index |
| `/blog/[slug]/` | Local article |
| `/connect/` | Compatibility redirect to `/#connect` |
| `/games/` | Compatibility redirect to `/work/games/` |

Nested Work routes are preferred to hidden tab state or hash-only modes because they provide durable URLs, browser history, static generation, and JavaScript-free access.

## Shared document structure

Every page uses the same outer document and field structure.

```text
BaseDocument
└── WorldField
    ├── HomeReturn, on destination routes
    └── route content
        └── PaperSurface, when the route uses paper
```

### BaseDocument

Owns only document-level concerns:

- metadata and canonical URL;
- font loading;
- favicon and social metadata hooks;
- skip link;
- global styles;
- optional navigation enhancement.

### WorldField

Owns the persistent viewport field, stacking context, field margins, and the main-content slot. It must not own route-specific content.

### PaperSurface

Owns reusable paper behavior:

- width and responsive bounds;
- long-page behavior;
- material variant;
- texture and edge treatment;
- content slot.

Route components decide the composition inside the surface.

## Component boundaries

Components should represent meaningful objects in the concept, such as a drawing, paper surface, portrait, folded choice, attached artifact, or tracing layer.

Avoid generic portfolio abstractions such as `Hero`, `Card`, `FeatureGrid`, `PrimaryButton`, or a universal section-heading component. Those abstractions encourage the conventional layout the concept rejects.

Recommended component groups:

```text
components/
├── shell/
│   ├── DocumentHead.astro
│   ├── WorldField.astro
│   ├── PaperSurface.astro
│   └── HomeReturn.astro
├── home/
│   ├── HomeMap.astro
│   ├── NavigationDrawing.astro
│   └── ConnectDisclosure.astro
├── who/
│   ├── PortraitInteraction.astro
│   └── CraftValues.astro
├── work/
│   ├── WorkChoice.astro
│   ├── WorkArtifact.astro
│   └── ProjectEvidence.astro
├── blog/
│   └── WritingEntry.astro
└── interactive/
    ├── WordCycle.astro
    ├── PaperArrival.astro
    └── ScrollDrawing.astro
```

Names may change when the real composition exposes a better boundary. Do not create a component merely to reduce line count.

## State ownership

There is no global application store.

| State | Owner |
| --- | --- |
| Current destination | URL path |
| Software or Games choice | Nested Work route |
| Connect disclosure | `#connect` plus local disclosure state |
| Craft-value word choice | CraftValues component |
| Portrait state | PortraitInteraction component |
| Optional animation state | The specific enhanced component |
| Reduced motion | `prefers-reduced-motion` |

Temporary interaction state does not become content state. Reloading a page must still produce a complete and understandable resting composition.

## Client-side enhancement

Use Astro component scripts and custom elements before considering a UI framework. Astro processes component scripts with TypeScript and bundling, while custom elements provide instance-local behavior without hydrating the page as an application. See [Astro client-side scripts](https://docs.astro.build/en/guides/client-side-scripts/).

Each enhancement must follow this contract:

1. Semantic HTML exposes the content or navigation without JavaScript.
2. The script attaches behavior to one component boundary.
3. The component owns setup, cleanup, and state.
4. Keyboard and touch behavior are implemented with pointer behavior.
5. Reduced motion removes travel and spectacle without removing access.

Do not install one global click-effect script or one controller that queries and coordinates the entire document.

## Navigation and transition escalation

Start with ordinary multi-page navigation. The repeated field and page shell provide continuity without requiring client-side routing.

Use this escalation order only when reviewed interaction requires more:

1. ordinary navigation;
2. browser-native cross-document View Transitions as progressive enhancement;
3. Astro `ClientRouter` only if a required transition needs lifecycle control or element persistence that native navigation cannot supply.

Astro documents both native multi-page transitions and `ClientRouter`, including the router's script reinitialization and state considerations. See [Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/).

The legacy global `ClientRouter` is not part of the clean baseline.

## Motion architecture

- CSS keyframes and the Web Animations API are the default motion tools.
- Low-frame-rate behavior uses authored frames, discrete keyframes, or `steps()` timing.
- Optional paper-arrival animation finishes on the real DOM page surface.
- Primary content never lives only in canvas, video, or an animation overlay.
- Scroll effects observe specific components and alter only decorative or supplementary layers.
- No draggable system is implemented until the concept identifies a useful draggable object.

Do not add GSAP, Lottie, smooth-scroll libraries, or a general animation engine preemptively.

## Styling

Use plain CSS in two levels.

### Global foundation

```text
styles/
├── reset.css
├── tokens.css
├── foundations.css
└── motion.css
```

Global styles contain reset rules, licensed font declarations, shared tokens, document defaults, focus treatment, and reduced-motion rules.

### Component styling

Page compositions and physical objects use Astro scoped styles. Scoped styles isolate unusual compositions and reduce accidental cross-route coupling. See [Astro styling](https://docs.astro.build/en/guides/styling/).

Use CSS custom properties for intentional variants. Do not build a generic theme engine.

Important text remains in normal document flow. Absolute positioning is reserved for supplementary drawings, attachments, and bounded composition layers.

## Content

Use Astro content collections with schema validation for software, games, and writing. See [Astro Content Loader API](https://docs.astro.build/en/reference/content-loader-reference/).

```text
content/
├── software/
├── games/
└── writing/
```

Content entries store facts and editorial metadata, for example:

- title;
- summary;
- status;
- prominence;
- capabilities;
- result when verified;
- media references;
- external URL.

Do not store composition instructions such as rotation, tape position, or doodle choice in content frontmatter. Route and presentation components own art direction.

## Assets

```text
assets/
├── drawings/
├── materials/
├── portraits/
├── software/
├── games/
└── fonts/
```

- Keep original authored files separate from derived web assets when practical.
- Import local visual content from `src/assets` and render it through Astro image tooling when optimization is appropriate.
- Preserve transparency and exact pixels for drawings or game media when conversion would damage them.
- Fonts must be locally hosted WOFF2 files with confirmed embedding rights.
- Decorative images use empty alternative text; evidentiary images receive meaningful alternative text or adjacent descriptions.

## Verification

The implementation baseline is:

- `astro check`;
- production builds for root and GitHub Pages base paths;
- direct loading of every route;
- keyboard and touch interaction checks;
- reduced-motion and JavaScript-free checks;
- desktop and mobile visual inspection;
- browser history and redirect checks.

Add Playwright when the first vertical slice is stable. Use it for route, focus, disclosure, responsive, screenshot, and reduced-motion regression checks. Avoid building an extensive unit-test layer around static composition.

## Rebuild boundary

Provisionally retain:

- Astro and TypeScript configuration;
- GitHub Pages workflow;
- verified content and public-link configuration;
- résumé files;
- original portraits, doodles, textures, and project media;
- sitemap and image integrations.

Replace:

- legacy layouts and route compositions;
- legacy shared header and footer;
- legacy global visual CSS;
- global click effects;
- paper-transition utilities;
- global `ClientRouter` use;
- the old Games presentation.

The milestone 1 audit makes the final keep, replace, or remove decision for each file.
