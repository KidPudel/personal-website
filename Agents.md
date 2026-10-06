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
| Elastic-edge colors (top edge) | `src/components/homepage/opening/pigment-field.ts` |
| Footer garden: drawing style, palette, placement and rhythm, pull growth and hover motion | Drawing `src/components/homepage/closing/garden/garden-draw.ts`; palette `FooterGarden.astro`; clusters and the growth queue `garden-plan.ts`; live canvas, pull and cursor `footer-garden.ts`; how far the bottom edge lifts `src/components/homepage/edge-pull.ts` |
| Identity composition, including “Three things important to me.” | `src/components/homepage/identity/IdentityIntroduction.astro` |
| Opening scene (box and identity column together) | `src/components/homepage/opening/OpeningSequence.astro` |
| Personal note copy | `src/content/homepage/values.ts` |
| Beliefs section copy and its notes | `beliefs` in `src/content/homepage/values.ts`; section in `src/components/homepage/beliefs/Beliefs.astro` |
| Hero claim and its notes | `claim` in `src/content/homepage/identity.ts` |
| Coloured phrases with notes (hero and beliefs), page dimming | `src/components/homepage/AnnotatedText.astro`; phrase tones in `src/content/homepage/annotated.ts` |
| Personal note constellation | `src/components/homepage/personal/PersonalNote.astro` |
| Blog posts (local or linked out) | `src/content/writing/`; list in `src/components/blog/WritingList.astro`, pages in `src/pages/blog/` |
| Side Work and contact control | `src/components/homepage/PortfolioHeader.astro` |
| Contact addresses and links (header panel and page footer) | `src/config/site.ts`; footer layout in `src/components/homepage/closing/ClosingContact.astro` |
| Case study names, pitches, roles, product tags, years (homepage cards and `/case-studies/`) | `src/content/case-studies.ts` |
| Work caption (pitch, tag, year) on the homepage and `/case-studies/` | `src/components/homepage/showcase/WorkCaption.astro` |
| Case-study structure: STAR summary, functional section headings (Problem, Goal, Research, Decisions, Results), decisions, charts, contents navigation | `src/components/case-studies/`; copy lives in each page under `src/pages/case-studies/` |
| Case-study layout, grid, spreads, highlighter colours, and the large sentence | `src/styles/plates.css` |
| A framed screen with its named, in-focus changes | `src/components/case-studies/Plate.astro` |
| Each study's opening and frame paper | SuperGood `supergood/FocusCover.astro`; Observatory `observatory/EyepieceCover.astro`, `night.ts`, comparator `Blink.astro`; Instagram `instagram-saves/PileCover.astro`; Two Sticks `two-sticks/CopybookCover.astro`, `copybook.ts` |
| Case-study live moments (highlights drawing in, chart replay, gathering rows, pen circle) | `src/components/case-studies/StudyLife.astro`; states in `src/styles/plates.css` |
| Homepage work showcase layout | `src/components/homepage/showcase/ShowcaseCards.astro` |
| Case studies listing | `src/pages/case-studies/index.astro` |
| Type, ink, field, accent | `src/styles/tokens.css` |
| Link hover mark (the stop-motion marker swipe) | `.link-mark` and its frames in `src/styles/foundations.css`; timing and the faint rest mark in `src/styles/tokens.css` |
| The "joyful" hover (pigment letters that hop, wobbling circle) | `src/components/homepage/JoyfulWord.astro` |
| Russian translation of any copy | The `t('English', 'Русский')` pair next to the English text, or the `ru` entry in `src/content/homepage/`; Russian posts in `src/content/writing/ru/` |
| Language switcher and default-language redirect | `src/components/homepage/PortfolioHeader.astro`, `src/layouts/BaseDocument.astro` |

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

## Media performance

- Before changing public media, animation assets, image composition, video delivery, or loading behavior, read `docs/MEDIA_PERFORMANCE.md` completely and follow its contract.
- Every media-related change must pass `pnpm run media:check` and the normal production build.
- Verify affected routes at representative desktop and mobile viewports.
- Do not waive the contract by deleting attributes or weakening the checker. If a deliberate exception is necessary, document the reason in `docs/MEDIA_PERFORMANCE.md` and make the narrowest possible checker exception.
- Optimizing delivery must not alter verified content, crop meaningful evidence incorrectly, remove alternative text, or make essential information depend on JavaScript or motion.

## Local development

- Start the local website with `./website.sh --start`.
- Stop it with `./website.sh --stop`.
- Inspect it with `./website.sh --status` or `./website.sh --logs`.
