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
| Hello handwriting speed, how long it waits for the sky, the sky's opacity | `src/components/homepage/opening/opening-motion.ts` |
| Elastic-edge colors (top edge) | `src/components/homepage/opening/pigment-field.ts` |
| Footer garden: drawing style, palette, placement and rhythm, pull growth and hover motion | Drawing `src/components/homepage/closing/garden/garden-draw.ts`; palette `FooterGarden.astro`; clusters and the growth queue `garden-plan.ts`; live canvas, pull and cursor `footer-garden.ts`; how far the bottom edge lifts `src/components/homepage/edge-pull.ts` |
| Identity composition, including “Three things important to me.” | `src/components/homepage/identity/IdentityIntroduction.astro` |
| The sky behind the top of the homepage, and when the hello starts writing | `src/components/homepage/opening/OpeningSequence.astro`; fade on scroll and start in `opening-controller.ts` |
| Personal note copy | `src/content/homepage/values.ts` |
| Beliefs section copy and its notes | `beliefs` in `src/content/homepage/values.ts`; section in `src/components/homepage/beliefs/Beliefs.astro` |
| Hero claim and its notes | `claim` in `src/content/homepage/identity.ts` |
| The introduction's typeface (Splav: Averia with Cyrillic) and size | `--font-intro` and the Splav faces in `src/styles/tokens.css`; size in `IdentityIntroduction.astro`. Splav itself is built in `../fonts/splav`; after a rebuild, re-subset its Light and Bold Italic into the `-latin` and `-cyrillic` files here |
| Coloured phrases with notes (hero and beliefs), page dimming | `src/components/homepage/AnnotatedText.astro`; phrase tones in `src/content/homepage/annotated.ts` |
| Personal note constellation | `src/components/homepage/personal/PersonalNote.astro` |
| The box that opens behind “editorial and illustrative sketcher” (frame timing, the line after it) | Playback `src/components/homepage/personal/BoxOpening.astro`; the line `boxLine` in `src/content/homepage/values.ts` |
| Writing (essays and concepts, local or linked out) | `src/content/writing/`; each essay's card illustration is `cover` in its English frontmatter (files in `src/assets/writing/`), also the band under the essay's title (`src/components/blog/BlogPost.astro`, `.blog-post__cover` in `src/styles/case-study.css`); the card in `src/components/blog/EssayCard.astro`, pages in `src/pages/writing/`; old `/blog/` addresses forward through `src/pages/blog/` and `src/components/blog/OldBlogRedirect.astro` |
| The writing section on the homepage (the two newest essays, the door with the rest stacked) and how the door opens into the writing page | Section `src/components/homepage/writing/Writing.astro`; the cards travelling between the two pages in `src/layouts/BaseDocument.astro` |
| Side Work and contact control | `src/components/homepage/PortfolioHeader.astro` |
| The top bar on every page: its blur band, when it fades in on scroll, how it grows under the open contact links | `src/components/homepage/PortfolioHeader.astro` (one header for all pages, rendered by `src/layouts/BaseDocument.astro`) |
| Contact addresses and links (header panel and page footer) | `src/config/site.ts`; footer layout in `src/components/homepage/closing/ClosingContact.astro` |
| Case study names, pitches, roles, product tags, years (homepage cards and `/case-studies/`), and each study's one-sentence project note on its cover (`about`) | `src/content/case-studies.ts`; rendered by `src/components/case-studies/ProjectFacts.astro` |
| Work caption (pitch, tag, year) on the homepage and `/case-studies/` | `src/components/homepage/showcase/WorkCaption.astro` |
| Case-study structure: STAR summary, functional section headings (Problem, Goal, Research, Decisions, Results), decisions, charts, contents navigation | `src/components/case-studies/`; copy lives in each page under `src/pages/case-studies/` |
| Case-study layout (a centred reading column, figures a little wider), type sizes, spacing scale, panel tint, switching between the long read and the TL;DR, highlighter colours, and the large sentence | `src/styles/plates.css`; the decision's order in `src/components/case-studies/Decision.astro`; the Detailed / TL;DR switch in `src/components/case-studies/StarSummary.astro`; the TL;DR read itself in `src/components/case-studies/Tldr.astro`, fed by each page's `situation`, `decisions`, `result`, and `closing` |
| A screen on its study-tinted panel, what changed ringed and named by number, several screens shown one at a time (arrows, dots, swipe) | `src/components/case-studies/Plate.astro`; panels that aren't a Plate use `.panel-paper` |
| Each study's opening | SuperGood `supergood/FocusCover.astro`; Observatory `observatory/EyepieceCover.astro`, `night.ts`; Instagram `instagram-saves/PileCover.astro`; Two Sticks `two-sticks/CopybookCover.astro`, `copybook.ts` |
| Case-study live moments (highlights drawing in, chart replay, gathering rows, pen circle) | `src/components/case-studies/StudyLife.astro`; states in `src/styles/plates.css` |
| Homepage work showcase layout | `src/components/homepage/showcase/ShowcaseCards.astro` |
| Observatory work card (the 17 process rows that gather into one app row) | `src/components/homepage/showcase/ObservatoryGroupDemo.astro` |
| Instagram work card (the wall of saves, the search that pulls finds out of it) | Wall and flight `src/components/homepage/showcase/InstagramPrototype.astro`; the Saved screen and its search `SavedSearchShowcase` in `instagram-prototype/InstagramPrototypeApp.jsx` |
| SuperGood work card (one phone: History, the tap on "Добавить весь заказ", the push to the menu, the plates landing in the live cart bar) | `src/components/homepage/showcase/SupergoodLunch.astro` |
| Two Sticks work card (one phone: the chat, the handwriting Web App rising over it, 去 written stroke by stroke, the score) | `src/components/homepage/showcase/TwoSticksChat.astro` |
| Little oddities: which oddities exist, their names, product, year | `src/content/oddities.ts` |
| The little oddities section on the homepage: a row of square cards the size of the writing cards, one per found oddity, rising into place, pick up and throw | `src/components/homepage/oddities/LittleOddities.astro` |
| "Did I already send this?" oddity: its page and copy, the share sheet and its stand-in friends, the homepage card, the playable phone | Page `src/pages/oddities/already-sent/index.astro`; sheet `src/components/oddities/already-sent/ShareSheet.astro`; card `AlreadySentCard.astro`; phone `SendPlayground.astro`; avatars from `scripts/prepare-oddity-avatars.mjs` |
| When a work card counts as looked at (hover delay, keyboard focus, the scroll line on phones) and the spotlight on it | `src/components/homepage/showcase/ShowcaseCards.astro` |
| Case studies listing (the homepage work cards as a page) | `src/pages/case-studies/index.astro`; cards and their order come from `ShowcaseCards.astro` and `src/content/case-studies.ts` |
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
