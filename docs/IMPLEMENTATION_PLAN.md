# Website rebuild plan

Last updated: 2026-07-23

## Purpose

This file defines execution order only.

- Product and design authority: `docs/CONCEPT_DESIGN.md` and `storyboards/`.
- Public professional evidence: `docs/CONTEXT_ABOUT_IGOR.md`.
- Private tone guidance: `docs/PERSONAL_CONTEXT.md`.
- Technical structure: `docs/ARCHITECTURE.md`.
- Current state: `docs/PROGRESS.md`.

## Rebuild strategy

- Treat the current visual implementation as legacy, not as a base to reskin.
- Follow `docs/ARCHITECTURE.md` for stack, routes, component boundaries, state, styling, content, assets, and enhancement decisions.
- Replace the legacy implementation through milestone-sized changes.
- Keep direct URLs and a working production build throughout the rebuild.
- Implement the static resting composition before optional motion or enhanced interactions.
- Do not add design interpretation here. Resolve design questions against the authored concept or with Igor.

## Milestones

### 0. Documentation reset

- Remove superseded design and strategy documents.
- Establish the source-of-truth map.
- Reset planning and tracking around the new implementation.

Exit condition: no active document competes with `docs/CONCEPT_DESIGN.md` for design authority.

### 1. Clean foundation

- Inventory the current source against the rebuild boundary in `docs/ARCHITECTURE.md` and classify each item as keep, replace, or remove.
- Preserve verified content and original media outside the presentation reset.
- Replace the legacy layout, shared components, interaction utilities, and global CSS with a minimal accessible shell.
- Establish only the tokens and primitives needed by the concept.
- Keep local development startup and shutdown reproducible through the repository script.
- Keep GitHub Pages base-path handling and direct navigation working.

Exit condition: the clean shell builds successfully at `/` and `/personal-website/`, with no legacy visual system remaining.

### 2. Home

- Implement Home from `docs/CONCEPT_DESIGN.md` and the overview storyboard.
- Add the real semantic navigation and progressively enhanced disclosures.
- Establish desktop and mobile resting, focus, expanded, reduced-motion, and JavaScript-free states.

Exit condition: Home is complete enough for Igor to review as the site's resting space.

### 3. Destination composition and Who I am

- Build the shared persistent-field behavior, including the common shell-owned doodle layer, and direct-route behavior without introducing a separate destination surface.
- Establish the responsive safe areas and the smallest reusable primitives needed for open hand-drawn borders, spines, paths, and annotations.
- Implement Who I am with approved content and original assets.
- Compose Who I am directly on the field using the hand-drawn route language in `docs/CONCEPT_DESIGN.md`.
- Implement its text interaction without making essential meaning depend on JavaScript.
- Preserve the explicitly approved paper invitation that appears over the dashed secret area after all three craft values are checked.
- Do not introduce any other paper unless Igor has explicitly identified the exact special element and its purpose.

Exit condition: Home and Who I am form a complete, responsive, accessible vertical slice.

### 4. Work

- Build the Work disclosure on Home with connected Igor-drawn Software and Games icon links, a slightly offset vertical wide-screen arrangement, and their shared wobble behavior.
- Build the directly linkable Software and Games routes as hand-drawn long-form compositions on the persistent field.
- Rebuild the content model around verified artifacts and honest prominence.
- Keep both Work openings compact on wide screens. Place the Software professional-work framing and résumé downloads in its opening composition.
- Keep each `What I've learned` list sourced from explicit project learnings, not engine, jam, or status metadata.
- Prefer authentic project media over diagrammatic placeholders. Keep explicitly requested game animation bounded and provide a static reduced-motion state.
- Implement the featured and supporting work using claims from `docs/CONTEXT_ABOUT_IGOR.md`.
- Preserve compatibility for existing public URLs where useful.

Exit condition: all approved work is discoverable, factual, and usable with or without client-side enhancement.

### 5. Blog and contact completion

- Build the Blog index and local article presentation as calm hand-drawn compositions on the persistent field.
- Complete the Home Connect experience and compatibility route.
- Verify contact, social, and résumé destinations.

Exit condition: every primary destination and public link is complete.

### 6. Interaction, responsive behavior, and accessibility

- Resolve the mobile composition through real viewport testing with Igor.
- Verify keyboard, touch, focus, reduced motion, contrast, semantics, direct links, history, and no-JavaScript access.
- Optimize fonts, images, motion, and client code.

Exit condition: the complete experience works across desktop and mobile without interaction or accessibility regressions, and a section-by-section review confirms that it expresses the authored concept rather than merely satisfying the route and content requirements.

### 7. Release

- Complete metadata, social preview, sitemap, RSS, and `404.html`.
- Run clean checks and production builds.
- Deploy through GitHub Pages and inspect the public result.
- Fix deployment-only issues and record the final state.

Exit condition: the public site is complete, verified, and deployable from a clean checkout.

## Change control

- Update milestone status only in `docs/PROGRESS.md`.
- Add a new dependency only when a milestone has a concrete requirement that the existing stack cannot meet simply.
- If implementation reveals a design ambiguity, record it as a question in `docs/PROGRESS.md`; do not silently add a new design rule.
