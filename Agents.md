# Project instructions

Build and ship Igor's personal website as a clean implementation of the authored concept.

## Sources of truth

Use the smallest relevant source and do not duplicate it elsewhere:

1. Igor's latest explicit instruction.
2. `docs/CONCEPT_DESIGN.md` and `storyboards/` for product vision, structure, visual language, interaction, and accessibility intent.
3. `docs/CONTEXT_ABOUT_IGOR.md` for professional facts, evidence, claim boundaries, and craft context.
4. `docs/PERSONAL_CONTEXT.md` for private tone guidance. Do not publish personal details without explicit approval.
5. `docs/ARCHITECTURE.md` for technical structure and implementation boundaries.
6. `docs/IMPLEMENTATION_PLAN.md` for rebuild sequencing.
7. `docs/PROGRESS.md` for current status, blockers, and next work.

Do not rewrite or expand the authored concept unless Igor asks. Plans and progress records should reference it rather than restating it.

## Execution

- Rebuild the presentation layer from scratch. Do not incrementally reskin the old interface.
- Preserve existing content, evidence, media, configuration, and deployment work only after verifying that each item is still useful and accurate.
- Keep the implementation simple, static-first, semantic, responsive, accessible, and progressively enhanced.
- Do not invent public facts, metrics, responsibilities, project details, personal details, or atmospheric annotations.
- Do not use em dashes in public copy.
- Preserve unrelated user changes.
- Keep `docs/IMPLEMENTATION_PLAN.md` and `docs/PROGRESS.md` synchronized with implementation work.
- Complete and verify one milestone before moving to the next. Keep the site buildable during the rebuild.
- Run relevant checks and inspect desktop and mobile states before marking a milestone complete.

## Local development

- Start the local website with `./website.sh --start`.
- Stop it with `./website.sh --stop`.
- Inspect it with `./website.sh --status` or `./website.sh --logs`.
