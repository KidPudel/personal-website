# Website rebuild plan

Last updated: 2026-07-22

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

### 3. Destination shell and Who I am

- Build the reusable destination-page shell and direct-route behavior.
- Implement Who I am with approved content and original assets.
- Implement its text interaction without making essential meaning depend on JavaScript.
- Evaluate the optional paper-arrival motion only after the static page is approved.

Exit condition: Home and Who I am form a complete, responsive, accessible vertical slice.

### 4. Work

- Build the Work disclosure on Home and its directly linkable Software and Games states.
- Rebuild the content model around verified artifacts and honest prominence.
- Implement the featured and supporting work using claims from `docs/CONTEXT_ABOUT_IGOR.md`.
- Preserve compatibility for existing public URLs where useful.

Exit condition: all approved work is discoverable, factual, and usable with or without client-side enhancement.

### 5. Blog and contact completion

- Build the Blog index and local article presentation.
- Complete the Home Connect experience and compatibility route.
- Verify contact, social, and résumé destinations.

Exit condition: every primary destination and public link is complete.

### 6. Interaction, responsive behavior, and accessibility

- Add only the interaction behaviors approved by the concept and the reviewed working pages.
- Audit the complete site against the `Intended feeling`, `Art direction and visual language and interaction design`, `Typography`, `Composition`, `Interaction rules`, `Responsive and accessible behavior` sections of `docs/CONCEPT_DESIGN.md`.
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
