# Website rebuild progress

Last updated: 2026-07-22

## Status

Rebuild planning is complete. Implementation has not started.

The existing Astro site is still present, but its presentation layer is legacy and will be replaced rather than reskinned. User-authored concept work, storyboards, asset changes, and unrelated source edits remain preserved during the foundation audit.

Current milestone: **1. Clean foundation**

## Milestones

| Milestone | Status |
| --- | --- |
| 0. Documentation reset | Complete |
| 1. Clean foundation | Next |
| 2. Home | Pending |
| 3. Destination shell and Who I am | Pending |
| 4. Work | Pending |
| 5. Blog and contact completion | Pending |
| 6. Interaction, responsive behavior, and accessibility | Pending |
| 7. Release | Pending |

Milestone scope and exit conditions live only in `docs/IMPLEMENTATION_PLAN.md`.

## Current decisions

- `docs/CONCEPT_DESIGN.md` is the sole design and product authority.
- The old presentation code is not a visual baseline.
- `docs/ARCHITECTURE.md` is the technical baseline. No implementation deviation is currently recorded.
- Astro is updated to 7.1.3. TypeScript remains on the newest supported 6.x release because Astro Check does not yet support TypeScript 7.

## Open inputs and blockers

- Bright Chalk and Cartoon Relief webfont files and embedding rights are not yet present.
- Mobile composition is intentionally unresolved in the concept and requires review of a working implementation.
- Missing Igor-authored navigation artwork should use labeled development placeholders until Igor supplies or approves final drawings.
- The final public URL for `Discourses by Campfire` still needs confirmation before release.

## Next action

Inventory the existing implementation as keep, replace, or remove. Then reset the legacy presentation source and establish the minimal buildable shell for milestone 1.
