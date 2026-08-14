# Website architecture

Last updated: 2026-08-14

## Purpose

This document defines the technical structure for the hiring-first redesign.

- Product and visual authority: `docs/CONCEPT_DESIGN.md`.
- Delivery order: `docs/IMPLEMENTATION_PLAN.md`.
- Current status and evidence boundaries: `docs/PROGRESS.md`.

Do not add public claims here.

## Approach

Use Astro static generation, semantic HTML, component-scoped CSS, and small local TypeScript enhancements. The personal experience is one continuous root document; the complete portfolio is a dedicated `/work/` document; writing is a dedicated `/blog/` document. Product evidence and reading order exist before JavaScript runs.

The redesign does not use a client application framework, global state, a canvas-rendered interface, an animation library, a persistent world shell, or fragment-owned disclosure state.

## Routes

| Address | Responsibility |
| --- | --- |
| `/` | Continuous personal homepage with the box opening, identity, values, and persistent contact disclosure |
| `/work/` | Complete work presentation with product design, systems, games, experiments, and unfinished work |
| `/case-studies/observatory/` | Independent Observatory editorial case study |
| `/blog/` | Independent writing document |
| `/blog/[slug]/` | Independent approved article document |
| Existing legacy paths | Static compatibility redirects to the closest root or work anchor |

The redesign removes `/secret-box/`. It remains in the repository only until the verified root opening replaces it, then the obsolete page and component are deleted.

Root anchors are:

- `/#values`
- `/#contact`

Work anchors are:

- `/work/#product-design`
- `/work/#games`

## Root document structure

```text
BaseDocument
└── Homepage
    ├── PortfolioHeader
    └── main
        ├── OpeningSequence
        │   ├── scroll-controlled box frames
        │   └── circular reveal containing IdentityIntroduction
        ├── ValuesEvidence
        │   ├── three sticky interactive value chapters
        │   ├── concrete project-aspect evidence on both sides
        │   ├── Observatory case-study path
        │   ├── replaceable screenshot placeholders
        │   ├── concise personal list with a path to writing
        │   └── complete-work path
        └── centered closing Work and contact pair

PortfolioHeader
├── centered introduction Work link and ContactDisclosure
├── centered closing Work link and addressable ContactDisclosure
└── compact fixed variant for secondary documents

BaseDocument
└── WorkPortfolio
    ├── WorkIntroduction
    ├── ProductDesign
    │   ├── ObservatoryFeature
    │   ├── ProductEvidence
    │   └── SystemsEvidence
    ├── Games
    │   ├── FinishedGamesWithMotion
    │   └── EarlierAndUnfinishedExperiments
    └── WorkContact

BaseDocument
└── WritingPreview
    └── Identity Cage with its Medium path
```

The DOM order is also the reading order. CSS may create asymmetrical compositions but must not change semantic order.

## Document foundation

`BaseDocument` owns:

- language and viewport metadata;
- title, description, canonical URL, and social metadata;
- favicon and font loading;
- the skip link;
- shared reset and focus behavior.

The root and work pages own their #F8F8F8 and black-ink surface styles. The Observatory document retains its independent editorial typography and layout.

The composition presentation uses local type roles without changing Observatory:

- Averia Serif Libre (`--font-display`) for display headings;
- Aleo (`--font-reading`) for body copy, personal labels, controls, captions, and authored interactions;
- Crimson Text (`--font-editorial`) for non-interactive values voice text, italic regular on the premise and switching phrases;
- Bright Chalk (`--font-special`) for special elements, currently the identity summary word and the cycling values words.

Shared surface tokens are `--color-field` (#F8F8F8), `--color-ink`, `--color-copy`, `--color-muted`, and `--color-accent`. Homepage identity and values copy live in `src/content/homepage/`. Opening scroll timing lives in `opening-motion.ts`; pigment drawing lives in `pigment-field.ts`; values rhythm lives in `value-voice-motion.ts`.

The values voice changes phrase in one stationary position. Complementary opacity curves keep the outgoing and incoming phrases continuously present while opposing blur curves obscure their overlap, creating one black-ink optical morph without a blank midpoint.

`PortfolioHeader` is a quiet Work and contact pair centered directly after the homepage introduction copy, then repeated as a centered closing gesture at the bottom of the document. Secondary documents use its compact fixed variant. The existing Work and Connect drawings stay hidden until hover or keyboard focus; the Connect drawing also stays visible while its disclosure is open. Each text label uses a quiet muted dotted underline at rest, then blurs away with that underline as its drawing resolves in at the same position, without spatial travel, so it cannot overlap the introduction. Contact links expand in flow and retain static `details` behavior without JavaScript. `SectionMarker` renders existing icon assets as non-interactive section indicators with the preserved hover wobble and reduced-motion fallback.

## Opening sequence

The opening is the first section of `/`, not another route.

- Source frames: `src/assets/art/Doodles-box-opening/box_frame1.png` through `box_frame11.png`.
- Frames have transparent backgrounds and may be inverted or recolored. Render the authored 2048-pixel PNGs losslessly; lossy resizing softens the relatively small line drawing inside each full-frame canvas.
- The opening controller maps each frame to one saturated field color. Colors cut with the flipbook frame rather than running as a separate ambient animation or interpolating through muddy intermediate tones. The closed first frame yields after a short early-scroll interval so the lid begins to lift within the first 20–40 pixels; the remaining frames keep even spacing through the flipbook range.
- A four-viewport sticky section has three authored scroll spans. The first two scrollable viewports open the box and expand the pigment through a velocity-bounded visual follower. The third maps native scroll directly to the pigment dissolve and identity reveal, without a speed cap. The values premise then shares the revealed identity field instead of waiting behind another full viewport. Slow early input stays close to native progress, while strong wheel and trackpad input catches up at a capped rate so intermediate box frames remain visible.
- The stable implementation uses all eleven authored frames and begins the final pigment handoff during the later opening frames. A deliberately low-resolution canvas field grows from the open box, using a connected polar field with a quieter center and asymmetric directional reaches that become fluid tendrils and fan-like rays as it expands. A restrained multi-scale domain warp bends those reaches into broad folds, soft eddies, and uneven channels without obscuring the outward burst. Color follows one continuous layered progression using the approved swatches: Imperial Blue, Cloudy Sky, Alice Blue, Mustard, Tiger Flame, Cinnabar, and a thin terminal Magenta accent. It does not repeat color around angular wedges or include a purple field wash. During emergence the canvas sits behind the box drawing, while a broad light response and restrained chromatic shadow make the field and ink react to it. The canvas moves in front only after it becomes the page transition. It briefly grows beyond full coverage, then clears into the off-white homepage through a short, low-opacity echo made from warped fragments of the same radial field. The canvas is decorative, pointer-transparent, and redraws only with scroll, resize, or state changes.
- Forward wheel and trackpad distance is reapplied synchronously during the early box-and-pigment phase so the controller owns the gesture from its first event and can reliably stop at the phase boundary. Slow input retains its one-to-one distance, while strong momentum is consumed only after reaching the final box frame and near-maximum pigment spread. The boundary is then permanently released for that forward traversal. From there, the dissolve and identity reveal track physical scroll directly so an unfinished colored field cannot lag behind and leave with the sticky section. Reverse input must move back into the bounded range before rearming it; an opposite-signed momentum event alone must not release the boundary. The non-passive wheel listener exists only while that bounded phase can still intercept input, then hands normal scrolling back to the document. Anchor navigation and reduced-motion presentation bypass it. Do not introduce forced smooth scrolling or mandatory snapping.
- The homepage suppresses the browser's native vertical rubber band and provides one custom elastic response at each document edge. Outward wheel or touch distance displaces the complete page on the compositor, revealing a fixed Essence-palette field in the gap. Each edge draws one low-resolution canvas of a connected ridged curtain from the shared Essence swatches: Imperial Blue at the viewport origin through Cloudy Sky, Mustard, Tiger Flame, and Cinnabar to Magenta tips. Alice Blue is omitted from these thin columns so it cannot punch a white hole through the trail. A larger blur merges the ridges into one force rather than separate slabs. Display height tracks the pull so the field lengthens and contracts with the spring, and the active field sits above the page long enough for those tips to fade into the content instead of clipping on a hard edge. While any top displacement remains, the homepage, opening, and document backing stay Imperial Blue so the join cannot flash the off-white field. The canvas is rendered only on connect and resize. The spring holds for 280 milliseconds after the last outward input and returns with damped motion. Displacement is snapped to physical device pixels. The outermost canvas pixels dissolve to the matching backing before the final spring pixels. The bottom field uses the matching off-white backing. The treatment adds no scroll height and all input and boundary listeners are passive. Only the active edge is visible, and all animation work stops after the spring settles. Because native swipe-to-refresh cannot run while overscroll is suppressed, a committed top pull that holds near the spring limit reloads the document on release. Casual bounces and bottom-edge pulls do not. Reduced motion removes the decorative displacement and restores native vertical overscroll so the platform gesture remains available.
- Fast scrolling may move the native target ahead, but the rendered opening catches up quickly rather than completing in one paint.
- The unopened box has no floating identity label. `Hello, I’m Igor.` and `Product designer.` appear together in the resting hero as the pigment field reveals it.
- The enhanced content layer remains inert while visually unavailable and becomes interactive once substantially revealed.
- A skip link reaches the next personal-content section.
- Reduced motion and no-JavaScript modes show the completed identity composition without requiring the sequence.

Use a requestAnimationFrame-coalesced scroll listener or an equivalent small local controller. Avoid continuous layout reads after initialization. Recalculate geometry on resize through a bounded handler.

## Surfaces and doodles

The redesign removes the graphite field, paper-grain overlay, and `WorldField` presentation shell.

- Use a #F8F8F8 portfolio field with black ink. Dark surfaces remain local to media that genuinely needs them.
- Use no more than one controlled accent treatment at a time.
- Doodles are decorative CSS background images on the root or individual sections.
- Background images use normal scrolling and no separate state.
- Do not render decorative doodles as pointer targets or individual layout nodes.
- Do not use parallax, route-aware placement, or independent doodle animation.
- Doodle backgrounds are hidden from assistive technology by construction.

## Content and evidence

Typed content collections remain the source for verified software, games, and writing records. Homepage identity and values composition copy live in `src/content/homepage/` and may point at those records. Page components may curate and reframe existing fields but must not introduce unsupported claims.

Homepage project records distinguish:

- selected product work;
- supporting product work;
- play and experiments.

Observatory receives a dedicated authored record because it has the strongest current product-design evidence and an independent case study. Other records remain concise until stronger evidence supports a deeper narrative.

## Media

- Use Astro image optimization for project and portrait media.
- Preserve the box frames as their original lossless 2048-pixel PNGs. Their combined transfer size is under 1MB, and the full source resolution is needed for sharp line art on high-density screens.
- Lazy-load media below the first viewport.
- Do not autoplay heavy video on initial load.
- Use static posters for reduced motion.
- Keep independent case-study media local to that document.

## Interaction boundaries

Allowed local enhancements include:

- scroll-controlled box-frame and pigment-field progress;
- custom top and bottom elastic-edge displacement;
- one-time handwritten hello frame playback as the identity becomes visible;
- a name-triggered reveal of Igor's photograph;
- craft-value word cycling inside the values-and-evidence composition;
- the side-mounted contact disclosure;
- restrained media activation;

Each enhancement must be scoped to its component, preserve static meaning, and remove listeners when disconnected.

Do not reintroduce:

- `SpatialRouteShell`;
- `HomeMap` as the root interface;
- fragment-driven disclosure state;
- long connector calculations;
- route-aware doodles;
- global pointer effects;
- a client router;
- nested scroll surfaces.

## Compatibility

Legacy routes should use small static redirects to the closest new root anchor:

- `/who-i-am/` to `/#values`
- `/work/software/` to `/work/#product-design`
- `/work/games/` and `/games/` to `/work/#games`
- `/connect/` to `/#contact`

Preserve base-path behavior for both `/` and `/personal-website/` builds.

## Accessibility

- One `main` and one page-level `h1` on the root page.
- Logical headings and landmarks for every section.
- Visible keyboard focus on every interactive target.
- Minimum 44 by 44 pixel touch targets where practical.
- Meaningful images have useful alternative text; decorative images remain CSS backgrounds or empty-alt assets.
- Essential meaning does not depend on handwriting, color, motion, hover, or JavaScript.
- Reduced motion removes scroll scrubbing, looping media, and decorative travel.
- The clipped homepage layer cannot receive focus while visually hidden.
- Anchor navigation respects a sticky-header offset if a header is used.

## Performance

- Keep the root static-first and dependency-free beyond Astro.
- Preload only the reading font and first necessary opening asset.
- Generate responsive portrait and project images.
- Avoid decoding eight full 2048 by 2048 box frames on mobile.
- Use CSS for surfaces, masks, and simple transitions.
- Keep scroll work to class, attribute, frame, and custom-property updates.
- Keep elastic-edge fields hidden at rest, with no more than one softly blurred, low-resolution ray field active at a time. Do not redraw the field during spring frames.
- Test mobile page stability with all below-fold media inactive.

## Verification

Every implementation milestone verifies:

- `astro check`;
- production build at root base path;
- production build at `/personal-website/` base path;
- semantic and no-JavaScript reading order;
- keyboard and touch behavior;
- reduced motion;
- 1440 by 900, 1280 by 720, 390 by 844, and 320 by 800;
- no horizontal overflow;
- no clipped résumé, email, or selected-work action;
- browser console without relevant warnings or errors.

## Removal sequence

The old root presentation, `WorldField`, `HomeReturn`, graphite/grain tokens, and the previous homepage landing-page components have been removed. Preserve content files, project media, portraits, résumé files, deployment configuration, and independently useful interaction components. The Observatory case study remains an independent editorial document.
