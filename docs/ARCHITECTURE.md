# Website architecture

Last updated: 2026-08-15

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
- `/#personal`
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
        │   ├── one sticky scene: identity copy over the top, box docked in the field
        │   └── ValuesEvidence after the opening runway
        ├── PersonalNote
        │   ├── Crimson italic heading
        │   ├── gray Bright Chalk constellation of interactive notes
        │   ├── work and writing paths
        │   └── sketcher-spawned draggable doodles
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

- Averia Serif Libre (`--font-display`) for display headings and quieter project names;
- Aleo (`--font-reading`) for body copy, personal labels, controls, captions, and authored interactions;
- Crimson Text (`--font-editorial`) for non-interactive values voice text, the personal-note heading, italic regular on the premise, switching phrases, and that heading, and the `/work/` section voices;
- Bright Chalk (`--font-special`) for special elements, currently the identity summary word, the cycling values words, and the personal-note constellation.

Shared surface tokens are `--color-field` (#F8F8F8), `--color-ink`, `--color-copy`, `--color-muted`, and `--color-accent`. Homepage identity and values copy live in `src/content/homepage/`. Opening scroll timing lives in `opening-motion.ts`; elastic-edge palette sampling lives in `pigment-field.ts`; values rhythm lives in `value-voice-motion.ts`; personal-note emerge timing lives in `personal-note-motion.ts`.

The values voice changes phrase in one stationary position. Complementary opacity curves keep the outgoing and incoming phrases continuously present while opposing blur curves obscure their overlap, creating one black-ink optical morph without a blank midpoint. Evidence objects burst around that voice and travel once from the docked open box into their rest positions.

`PersonalNote` follows the values work path as its own composition. A Crimson italic heading sits in the center, with gray Bright Chalk notes around it. On first scroll into view, those notes travel once from the heading into their constellation positions. Interactive notes use the same muted dotted underline as other live text. Links keep working without JavaScript. The sketcher control stays inert until enhancement, then bursts the doodle artwork from that word into a local draggable field. Reduced motion shows the completed constellation and shows and hides those doodles in place. The boyfriend note reveals the couple photograph from `src/assets/life/` in place, without moving the constellation. Narrow screens keep the same notes and stack them one by one without bullets. Hash visits to `#personal`, keyboard focus, and no-JavaScript reading show the completed notes without the emerge.

`PortfolioHeader` is a quiet Work and contact pair centered directly after the homepage introduction copy, then repeated as a centered closing gesture at the bottom of the document. Secondary documents use its compact fixed variant. The existing Work and Connect drawings stay hidden until fine-pointer hover or keyboard focus; the Connect drawing also stays visible while its disclosure is open on a fine pointer. Touch activation must follow the control immediately, without a sticky-hover drawing swap. Each text label uses a quiet muted dotted underline at rest, then blurs away with that underline as its drawing resolves in at the same position, without spatial travel, so it cannot overlap the introduction. Contact links expand in flow and retain static `details` behavior without JavaScript. `SectionMarker` renders existing icon assets as non-interactive section indicators with the preserved hover wobble and reduced-motion fallback.

`WorkPortfolio` is a quieter document than a conventional case-study index. The page title is the only large Averia display line. Product and games chapters open with a SectionMarker and a Crimson italic voice, then the work itself. Observatory is the loud piece through media scale, not through a competing headline. Supporting products, systems, games, and experiments step down in type size. Screenshot media uses the same white polaroid frame as homepage evidence objects; dark surfaces stay inside that artwork. Diagram artifacts sit on the field without a screenshot frame. Live text uses the muted dotted underline. The document does not add in-page jump chrome. Hash anchors for product design and games remain for compatibility.

## Opening sequence

The opening is the first section of `/`, not another route.

- Source frames: `src/assets/art/Doodles-box-opening/box_frame1.png` through `box_frame7.png`. Later authored frames flatten the box and are not used.
- Frames have transparent backgrounds. Render the authored 2048-pixel PNGs losslessly; lossy resizing softens the relatively small line drawing inside each full-frame canvas.
- The opening stays on the off-white field. It does not cut field colors with the flipbook, and it does not draw a pigment or essence canvas. Essence swatches remain only for the custom elastic edges and for the identity thermal word.
- A short sticky runway maps native scroll one-to-one to the sequence. The closed first frame yields after a short early-scroll interval so the lid begins to lift within the first 20–40 pixels; frames 2–7 keep even spacing through the flipbook range, then the drawing holds on the open seventh frame. The opening is one sticky scene: identity copy occupies the upper field, and the box drawing occupies the lower field. The box translates downward as those frames play, so it falls while it opens, and the scene stays docked through the values chapters. Do not intercept wheel input, follow scroll with a velocity cap, or clamp `scrollTo` during the opening.
- Identity copy stays hidden through the early closed and lid-lift frames. It begins to appear at authored frame 7, one complete beat at a time: hello, then the title, then the summary, then Work and contact. Scroll unlocks each beat as the box falls further into its docked rest, and a short pause still keeps the next line from landing until the previous one has appeared, even if the rest of the runway is already scrolled. The fifth beat recedes that identity copy and leaves a single centered values premise in the open field above the docked box. The values heading is the values section’s own sticky voice; it takes that same line when it reaches its rest, and is not a second pin over identity.
- Values evidence sits in a burst around the sticky voice, with nearer objects closer to the docked box. On first scroll into a chapter, those objects travel once from the box origin into their rest positions. Reduced motion, no-JavaScript, and hash visits show the completed burst without the fly.
- The homepage suppresses the browser's native vertical rubber band and provides one custom elastic response at each document edge. Outward wheel or touch distance displaces the complete page on the compositor, revealing a fixed Essence-palette field in the gap. Each edge draws one low-resolution canvas of a connected ridged curtain from the shared Essence swatches: Imperial Blue at the viewport origin through Cloudy Sky, Mustard, Tiger Flame, and Cinnabar to Magenta tips. Alice Blue is omitted from these thin columns so it cannot punch a white hole through the trail. A larger blur merges the ridges into one force rather than separate slabs. Display height tracks the pull so the field lengthens and contracts with the spring, and the active field sits above the page long enough for those tips to fade into the content instead of clipping on a hard edge. While any top displacement remains, the homepage, opening, and document backing stay Imperial Blue so the join cannot flash the off-white field. The canvas is rendered only on connect and resize. The spring holds for 280 milliseconds after the last outward input and returns with damped motion. Displacement is snapped to physical device pixels. The outermost canvas pixels dissolve to the matching backing before the final spring pixels. The bottom field uses the matching off-white backing. The treatment adds no scroll height and all input and boundary listeners are passive. Only the active edge is visible, and all animation work stops after the spring settles. Because native swipe-to-refresh cannot run while overscroll is suppressed, a committed top pull that holds near the spring limit reloads the document on release. Casual bounces and bottom-edge pulls do not. Reduced motion removes the decorative displacement and restores native vertical overscroll so the platform gesture remains available.
- The unopened box has no floating identity label. `Hello, I’m Igor.` and `Product designer.` appear together as the identity emerges from the falling box. A still click or tap on the closed box, instead of scrolling, shows a tilted Bright Chalk note near the pointer. Repeated clicks cycle a looping sequence: `try scrolling`, `no, really`, `dude`, `just do it`, `don’t want to scroll?`, `okay`, then `then just hire me` with the Let’s talk links. Earlier beats fade on their own. The hire beat stays in the open field above the closed box until the next click or scroll so those links can be used, then the sequence starts again. Pointer movement, pointer cancel, or any scroll during that gesture suppresses it, so a finger pan does not flash the hint. Scrolling hides the note and resets the sequence. Earlier beats are decorative, pointer-transparent, and hidden from assistive technology. The hire links are real contact controls from the shared Let’s talk list. The note does not appear once the lid has lifted, after scrolling starts, or when the opening is bypassed. No-JavaScript and reduced motion never show it. After the handwritten hello finishes, a one-time click cue appears beside Igor to mark the photograph control. It stays decorative and pointer-transparent so the existing name control remains the target. The cue fades away gradually after a short hold, or immediately if that control is used, and does not return. Reduced motion still shows the brief hint; no-JavaScript keeps it hidden because that control is inert.
- The enhanced content layer remains inert while visually unavailable and becomes interactive once substantially revealed.
- A skip link reaches the next personal-content section.
- Reduced motion and no-JavaScript modes show the completed identity composition without requiring the sequence.
- JavaScript-enabled first paint uses CSS to show the closed box on the off-white field before the opening controller hydrates. Identity is the first paint only for no-JavaScript, reduced motion, and hash navigation.

Use a requestAnimationFrame-coalesced scroll listener or an equivalent small local controller. Avoid continuous layout reads after initialization. Recalculate geometry on resize through a bounded handler.

## Surfaces and doodles

The redesign removes the graphite field, paper-grain overlay, and `WorldField` presentation shell.

- Use a #F8F8F8 portfolio field with black ink. Dark surfaces remain local to media that genuinely needs them.
- Use no more than one controlled accent treatment at a time.
- Doodles on `/work/` remain decorative CSS background images. The homepage does not use those drawings as backgrounds, so they first appear when the personal-note sketcher control spawns them as local draggable images.
- Background images use normal scrolling and no separate state.
- Do not render decorative doodles as pointer targets or individual layout nodes.
- Spawned doodles are the only doodle pointer targets.
- Do not use parallax, route-aware placement, or independent doodle animation.
- Doodle backgrounds are hidden from assistive technology by construction. Spawned doodles remain decorative.

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
- The Observatory case study opens its narrative with the launch-film poster, which links to the product introduction and plays in place only after activation.

## Interaction boundaries

Allowed local enhancements include:

- scroll-controlled box-frame progress, fall, and identity emerge;
- custom top and bottom elastic-edge displacement;
- one-time handwritten hello frame playback as the identity becomes visible;
- a click-triggered scroll hint on the closed box;
- a one-time click cue beside Igor after that sequence completes;
- a name-triggered reveal of Igor's photograph;
- craft-value word cycling inside the values-and-evidence composition;
- the personal-note constellation, including a one-time emerge from the heading, sketcher-spawned draggable doodles, and a boyfriend photograph reveal;
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
- nested scroll surfaces;
- opening wheel interceptors, velocity followers, or `scrollTo` clamps;
- an opening pigment-field canvas or per-frame field-color cuts.

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
- Avoid decoding the full 2048-pixel box flipbook on mobile. Keep only the visible frame in the compositor and decode its immediate neighbours just ahead of the next cut.
- Keep handwritten hello frames unloaded until the identity reveal, except the completed frame needed for reduced-motion and no-JavaScript reading.
- Keep opening scroll native. Do not add a wheel interceptor, velocity follower, or `scrollTo` clamp to hold box frames.
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
