# Project instructions

Build and ship Igor's personal website as a clean implementation of the authored concept.

## Sources of truth

Use the smallest relevant source and do not duplicate it elsewhere:

1. Igor's latest explicit instruction.
2. `docs/CONCEPT_DESIGN.md` for product vision, structure, visual language, interaction, and accessibility intent.
5. `docs/ARCHITECTURE.md` for technical structure and implementation boundaries.
7. `docs/PROGRESS.md` for current status, blockers, and next work.

Do not rewrite or expand the authored concept unless Igor asks. Plans and progress records should reference it rather than restating it.

## Where to change things

| Intent | File |
| --- | --- |
| Homepage identity copy | `src/content/homepage/identity.ts` |
| Values copy or which evidence belongs to a value | `src/content/homepage/values.ts` |
| Opening colors or scroll timing | `src/components/homepage/opening/opening-motion.ts` |
| Pigment-field look | `src/components/homepage/opening/pigment-field.ts` |
| Identity composition | `src/components/homepage/identity/IdentityIntroduction.astro` |
| Values rhythm | `src/components/homepage/values/value-voice-motion.ts` and `ValuesEvidence.astro` |
| An evidence object's layout | `src/components/homepage/values/EvidenceObject.astro` |
| Writing document | `src/pages/blog/index.astro` and `src/components/homepage/WritingPreview.astro` |
| Side Work and contact control | `src/components/homepage/PortfolioHeader.astro` |
| Work document | `src/components/homepage/WorkPortfolio.astro` |
| Type, ink, field, accent | `src/styles/tokens.css` |

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
