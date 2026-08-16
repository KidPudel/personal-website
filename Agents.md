# Project instructions

Build and ship Igor's personal website as a clean implementation of the authored concept.

## Sources of truth

Use the smallest relevant source and do not duplicate it elsewhere:

1. Igor's latest explicit instruction or sketch.
2. `docs/CONCEPT_DESIGN.md` for the stable product vision, visual character, and accessibility intent.
3. `docs/ARCHITECTURE.md` for technical structure and implementation boundaries.
4. `docs/PROGRESS.md` for current status, blockers, and next work.

Visual compositions and interaction choreography are working hypotheses. Igor may replace them through prompts or sketches without preserving their implementation details. Plans and progress records should reference the stable concept rather than restating it.

## Where to change things

| Intent | File |
| --- | --- |
| Homepage identity copy | `src/content/homepage/identity.ts` |
| Values copy or which evidence belongs to a value | `src/content/homepage/values.ts` |
| Opening scroll timing or closed-box click phrases | `src/components/homepage/opening/opening-motion.ts` |
| Elastic-edge colors | `src/components/homepage/opening/pigment-field.ts` |
| Identity composition, including “Three things important to me.” | `src/components/homepage/identity/IdentityIntroduction.astro` |
| Opening scene (box and identity column together) | `src/components/homepage/opening/OpeningSequence.astro` |
| Personal note copy | `src/content/homepage/values.ts` |
| Personal note constellation | `src/components/homepage/personal/PersonalNote.astro` |
| Values phrase morph and evidence burst | `src/components/homepage/values/value-voice-motion.ts`, `ValueVoice.astro`, and `ValuesEvidence.astro` |
| An evidence object's layout | `src/components/homepage/values/EvidenceObject.astro` |
| Writing document | `src/pages/blog/index.astro` and `src/components/homepage/WritingPreview.astro` |
| Side Work and contact control | `src/components/homepage/PortfolioHeader.astro` |
| Work document | `src/components/homepage/WorkPortfolio.astro` |
| Type, ink, field, accent | `src/styles/tokens.css` |

## Execution

- Recompose or replace presentation freely when Igor changes the visual direction. Do not preserve an interaction solely because it already exists.
- Preserve verified content, evidence, media, configuration, and deployment work unless the new direction makes an item obsolete.
- Keep the implementation simple, static-first, semantic, responsive, accessible, and progressively enhanced.
- Do not invent public facts, metrics, responsibilities, project details, personal details, or atmospheric annotations.
- Do not use em dashes in public copy.
- Preserve unrelated user changes.
- Update `docs/IMPLEMENTATION_PLAN.md` and `docs/PROGRESS.md` at stable milestone boundaries, not after every visual experiment.
- Complete and verify one milestone before moving to the next. Keep the site buildable during the rebuild.
- Run relevant checks and inspect desktop and mobile states before marking a milestone complete.

## Local development

- Start the local website with `./website.sh --start`.
- Stop it with `./website.sh --stop`.
- Inspect it with `./website.sh --status` or `./website.sh --logs`.
