# Website architecture

Last updated: 2026-07-24

## Purpose

This document is the technical architecture for rebuilding the website.

- `docs/CONCEPT_DESIGN.md` defines what the website is and how it should feel.
- `docs/CONTEXT_ABOUT_IGOR.md` defines professional evidence and claim boundaries.
- `docs/IMPLEMENTATION_PLAN.md` defines delivery order.
- `docs/PROGRESS.md` records current implementation state.

Do not add visual direction or public copy here.

## Architectural approach

Use Astro for static generation with semantic HTML and CSS, and use focused client-side TypeScript for the interaction system. The SpatialRouteShell is a deliberate first-class client-side feature, not an optional decorative enhancement.

The unusual quality of the website comes from composition, authored assets, material behavior, and interaction. It does not require a full client-side application framework, global state store, canvas-rendered interface, or component library.

### Baseline decisions

- Keep Astro, strict TypeScript, static output, and the existing GitHub Pages deployment pipeline.
- Use Astro components for document structure and physical visual objects.
- Use content collections for typed project and writing data.
- Use component-scoped CSS for compositions and a small global CSS foundation.
- Use custom elements or local TypeScript modules for scoped interaction, including the complete SpatialRouteShell behavior.
- Use the Home URL fragment as the primary source of spatial disclosure state.
- Keep separate document routes only for independent Blog articles and compatibility redirects.
- Keep essential content and direct fragment navigation represented in HTML before JavaScript runs, while allowing JavaScript to own the intended unfolding experience.
- Do not add React, Vue, Svelte, a global store, Tailwind, or an animation library without a concrete requirement that the platform and Astro cannot meet simply.

## Addressable states and compatibility routes

The primary experience is one statically generated Home document with fragment-addressed disclosure states.

| Address | Responsibility |
| --- | --- |
| `/` | Collapsed Home |
| `/#who-i-am` | Who I am expanded |
| `/#work` | Work choices expanded |
| `/#work/software` | Software expanded from its Work child |
| `/#work/games` | Games expanded from its Work child |
| `/#connect` | Connect expanded |
| `/#blog` | Blog index expanded |
| `/blog/[slug]/` | Independent published article document |

Fragments are not sent to the server, so every fragment address receives the same Home HTML. The document contains the semantic content required by every disclosure. CSS `:target` provides direct fragment and JavaScript-free visibility; enhancement synchronizes animation, focus, scroll, and disclosure attributes with `hashchange`.

The existing `/who-i-am/`, `/work/`, `/work/software/`, `/work/games/`, `/blog/`, `/connect/`, and `/games/` documents become base-aware compatibility redirects to the corresponding Home fragments after their destination has migrated. Milestone 7 migrates only Who I am. Milestone 8 performs the remaining redirects after the complete fragment model passes review.

Home owns the canonical URL and default social metadata for all fragment states because fragments cannot select server-rendered metadata. Enhancement may update `document.title` for orientation, but it must not imply that fragments are independent documents. Published Blog articles retain their own metadata and canonical paths.

## Shared document structure

Every page uses the same outer document and field structure.

```text
BaseDocument
└── WorldField
    ├── shared background doodle layer
    └── main
        └── SpatialRouteShell
            ├── persistent HomeMap
            ├── active fragment-addressed destination disclosure
            │   └── destination-owned hand-drawn composition
            └── HomeReturn or collapse control
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

Owns the persistent viewport field, shared background doodle layer, stacking context, responsive safe areas, and the main-content slot. The same doodle set and shell-owned placements remain present in every disclosure state. It hosts the spatial route shell but does not own destination-specific content or impose a separate destination surface.

### SpatialRouteShell

Owns the relationship between the persistent Home map, the active destination disclosure, `location.hash`, and browser history. It keeps the Home clusters mounted while destination content is revealed, ensures that only one destination is expanded, and restores the correct state on direct fragment loading, Back, Forward, or Home. It is a scoped disclosure boundary rather than a router or global application store.

### Route compositions

Each destination route owns its semantic document flow and its hand-drawn spatial composition. Route styles may use:

- a stable spatial origin corresponding to its Home cluster;
- faint decorative traces of the other Home clusters on suitable wide screens;
- incomplete borders and open frames;
- vertical spines and connecting paths;
- dividers, brackets, arrows, and annotations;
- authored drawings and bounded attachments;
- responsive recomposition for narrow viewports.

Do not create one universal destination container that makes every destination look structurally identical. Extract only repeated technical behavior such as responsive safe-area alignment or a reusable authored boundary.

Spatial unfolding must not place primary content on a literal canvas, require a pannable plane, or transform the whole document into an application viewport. The destination opening may compose content in two dimensions around its Home origin, but important text and media remain in normal document flow. After the bounded opening composition, long destinations continue through ordinary vertical document scrolling. Horizontal document scrolling is not a destination navigation mode. Narrow viewports present the targeted section as a full-screen composition without desktop unfolding.

Paper is not a shell primitive. An explicitly approved paper object owns only its own material, edge, size, and content behavior. The current approved paper object is the Who I am invitation revealed after completing all three craft values. Do not infer a paper object from content type or reuse an existing paper component as a route surface.

## Component boundaries

Components should represent meaningful objects in the concept, such as a drawing, linked icon node, hand-drawn boundary, portrait, explicitly approved paper object, attached artifact, or tracing layer.

Avoid generic portfolio abstractions such as `Hero`, `Card`, `FeatureGrid`, `PrimaryButton`, or a universal section-heading component. Those abstractions encourage the conventional layout the concept rejects.

Recommended component groups:

```text
components/
├── shell/
│   ├── DocumentHead.astro
│   ├── WorldField.astro
│   ├── SpatialRouteShell.astro
│   ├── DestinationDisclosure.astro
│   └── HomeReturn.astro
├── drawing/
│   └── DrawnBoundary.astro
├── home/
│   ├── HomeMap.astro
│   ├── NavigationDrawing.astro
│   ├── WorkDisclosure.astro
│   ├── WorkChoice.astro
│   └── ConnectDisclosure.astro
├── who/
│   ├── PortraitInteraction.astro
│   └── CraftValues.astro
├── work/
│   ├── WorkChoice.astro
│   └── WorkArtifact.astro
├── blog/
│   └── WritingEntry.astro
└── interactive/
    ├── WordCycle.astro
    └── ScrollDrawing.astro
```

Names may change when the real composition exposes a better boundary. Do not create a component merely to reduce line count.

## State ownership

There is no global application store.

| State | Owner |
| --- | --- |
| Active destination disclosure | Home URL fragment plus SpatialRouteShell |
| Spatial unfolding origin | The matching persistent Home cluster |
| Software or Games choice | `#work/software` or `#work/games` |
| Work disclosure | `#work` plus local disclosure state |
| Connect disclosure | `#connect` plus local disclosure state |
| Craft-value word choice | CraftValues component |
| Portrait state | PortraitInteraction component |
| Optional animation state | The specific enhanced component |
| Reduced motion | `prefers-reduced-motion` |

Temporary interaction state does not become content state. Reloading a page must still produce a complete and understandable resting composition.

## Client-side interaction

JavaScript is expected and necessary for the finished spatial experience. Use Astro component scripts and custom elements before considering a UI framework. Astro processes component scripts with TypeScript and bundling, while custom elements provide instance-local behavior without hydrating the page as an application. See [Astro client-side scripts](https://docs.astro.build/en/guides/client-side-scripts/).

Each interactive component must follow this contract:

1. Semantic HTML and fragment links preserve content access if JavaScript is unavailable.
2. TypeScript owns the intended animation, state synchronization, focus, scroll, history response, and media activation.
3. The script attaches behavior to one component boundary.
4. The component owns setup, cleanup, and state.
5. Keyboard and touch behavior are implemented with pointer behavior.
6. Reduced motion removes travel and spectacle without removing the enhanced state change.

Do not install one global click-effect script or an unscoped controller that queries and coordinates the entire document. The SpatialRouteShell may coordinate only its Home links, destination disclosure, history, focus, and scroll restoration.

## Spatial route unfolding

Destination controls are ordinary fragment links. Their target sections live in the same Home document and behave as real disclosures:

1. the fragment identifies the selected disclosure;
2. the selected Home cluster remains mounted as its spatial origin;
3. the targeted semantic section expands into real document layout;
4. the other Home clusters recede into faint traces near the opening;
5. `hashchange`, Back, and Forward restore the matching expanded or collapsed state.

The static baseline uses generic `:target` styling so a direct fragment or JavaScript-free activation reveals its section. The scoped TypeScript SpatialRouteShell provides the intended experience by synchronizing `aria-expanded`, focus movement, scroll restoration, animation, history response, lazy media activation, and cleanup. It must not replace the document or simulate a page arrival.

All destination HTML is present in the Home document, but heavy images and video remain lazy or inactive until needed. Do not eagerly download every destination's media merely because its semantic markup is present.

No client router, History API path rewriting, route-fragment fetcher, UI framework, global application store, scroll hijacking, or pannable canvas is required.

Do not rotate wheel input, translate vertical scrolling into horizontal movement, create a horizontally overflowing document, or place long content inside a separately scrolling panel. Use normal page scrolling and let route-owned paths or spines visually connect the opening composition to the vertical content sequence.

## Motion architecture

- CSS keyframes and the Web Animations API are the default motion tools.
- Low-frame-rate behavior uses authored frames, discrete keyframes, or `steps()` timing.
- Spatial route unfolding animates an actual disclosure from collapsed to expanded layout while preserving the selected Home cluster.
- Direct fragment loads begin in the correct expanded state and do not simulate a preceding click.
- Reduced motion preserves the disclosure state change but reveals the completed layout immediately.
- Paper-specific motion is added only when Igor explicitly assigns motion to an already approved paper object.
- Route arrival may reveal or draw bounded decorative strokes, but the semantic content remains available without waiting for that motion.
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
- direct loading of every fragment state, compatibility redirect, and independent article route;
- desktop Home-to-disclosure and disclosure-to-Home hash-history behavior;
- keyboard and touch interaction checks;
- reduced-motion and JavaScript-free checks;
- desktop spatial-unfolding and mobile full-screen visual inspection;
- Back, Forward, reload, base-path, and redirect checks.

Add Playwright when the first vertical slice is stable. Use it for fragment, focus, disclosure, responsive, screenshot, history, and reduced-motion regression checks. Avoid building an extensive unit-test layer around static composition.

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
