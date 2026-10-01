# Progress

Last updated: 2026-10-01

## Case studies: one typeface, shorter, steadier rhythm

- One typeface: Instrument Sans for everything in the four case studies, set apart by size and weight only. Instrument Serif and the display face are gone from them; the key sentence of a section is larger regular-weight sans. The Observatory wordmark keeps its own face and texture animation, as a logo. The case-studies listing keeps its serif title, which matches the homepage's section titles.
- Length: aimed at a four-to-five-minute read (about 800 to 1,200 words of prose), with the summary readable in under a minute, since hiring managers skim for one to three minutes on a first pass. SuperGood went from about 1,540 to 1,320 words, Observatory 1,340 to 1,290, Instagram 1,670 to 1,500 (1,220 outside its two research tables), Two Sticks stays at about 1,020. Cuts are repeats, not content: Task leads that restated the facts, "what reviews praised" (now one sentence in Result), SuperGood's closing note and step chart (its 8 → 3 steps now sit in Decision 1's effect), Observatory's usage list (one sentence), Instagram's "what I'd measure" list (it repeated the success metrics) and the descriptions under its priority list.
- Rhythm: the long text-only run between Situation and the first decision is broken up. Research methods (SuperGood) and secondary findings (Instagram) are a number-led strip styled like the summary metrics; very short lists (three complaints, Goal, Success metrics, Constraints, job stories, student feedback) sit in one row; other short lists use two columns on wide screens. Phone shots are 260 px wide instead of 300, sketches sit four in a row, and section and decision spacing is tighter. At 1440 px SuperGood is about 7,900 px tall (was 9,500 before this round of work), Observatory 10,700 (11,900), Instagram 11,200 (12,800), Two Sticks 8,200 (9,400).
- Russian: "домашка" is now "домашняя работа"; "в сторах", "куча", "ставить" and "прыгать между приложениями" are replaced with plain wording.
- Verified at 1440 and 390 px in English and Russian; Astro diagnostics, the media contract, and both production builds pass.

## Case studies: one reading line, Igor's voice

- Layout: every case study now shares the homepage's left edge (the page gutter, in line with the header's Home). Text keeps a 42rem measure from that edge; screenshots and charts may run to 1040 px. The old two edges (a 780 px text column and 1080 px breakouts) made the eye jump back and forth, so `.breakout` is gone.
- Type follows the homepage: the page title in the display face (Averia, as on "Product designer." and the Observatory wordmark), section titles and the one key sentence per section in Instrument Serif, everything else in Instrument Sans. No new fonts. The black S/T/A/R badges are gone; sections are named in a small grey label.
- Text is no longer boxed. The STAR summary is a ruled list, and `MetricGrid` is merged into it: Result shows the page's three headline numbers (two on Instagram, words on Two Sticks), each with its source, and the honest note about the numbers is said once there. Research methods, findings, goals, success metrics, and job stories are plain lists with a bold first line. Only charts and before/after visuals keep a surface.
- Decisions read as short paragraphs with bold lead-ins (Problem, What I did, Why, Alternative considered) and one effect line, instead of a label grid with a boxed effect.
- The side rail marks only the sections (Summary, Situation, Task, Action, Result, Reflection or Next), and from 1400 px it shows their names. A jump lands on the section's label.
- Copy is rewritten in Igor's voice in both languages: contractions, plain sentence headings instead of three-beat slogans, no repeated caveats, and frameworks named directly (Jobs to be Done, job stories, contextual inquiry, comparative usability testing, SEQ, CustDev, CJM, Gestalt common region, information architecture, guardrail metric, impact and effort matrix). Russian is adapted, not translated, and rephrased so it never needs a dash.
- Repeats cut: each headline number appears in the summary, the decision it belongs to, and its chart, instead of four to six times. Instagram's 6 of 9 chart and nine-person table are one block, its notebook spreads are a small strip, and its priority list and hypothesis are no longer black cards. Two Sticks' "0 apps to install" and "3 → 1 tools" are design facts, so they moved to the facts list; its footer links now carry the link mark.
- Corrections: SuperGood's dish-card result is labelled as the same comparative usability test, not an A/B test, matching the facts recorded on 2026-09-29. The Russian Observatory pitch is «Мониторинг системы» in quotes on both the case study and the cards.
- Verified at 1920, 1440, 1024, and 390 px in English and Russian with no horizontal overflow; the English listing is pixel-identical and the Russian one differs only in the Observatory pitch. Astro diagnostics, the media contract, and both production builds pass.

## Links: a marker swipe instead of an underline

- No link shows a line at rest. On hover or keyboard focus a marker swipe, in the lavender of the pen circle around "joyful", is drawn behind the words in three hand-drawn frames at 82 ms (the hello animation's rate), each frame redrawn as in stop-motion; it goes at once when the cursor leaves, so quick sweeps stay calm. With reduced motion it appears whole. Igor chose it from a prototype of five treatments (a clean 1 px line, a pen stroke drawn smoothly, a stop-motion pen stroke, an emerging stroke, and this highlighter); the stop-motion pen stroke was the close second.
- One rule, `.link-mark` in `src/styles/foundations.css`, with the frames as SVG data in its `link-mark-draw` keyframes; tokens `--link-mark-draw` and `--link-mark-rest` in `src/styles/tokens.css`. It goes on the inline element holding a link's text (the link itself when inline), so it follows the text across line breaks; links laid out as boxes wrap their text in a span. It paints inside the text's own box, so no layout changes: element positions match the previous version at 1440 and 390 px on every checked route.
- A link is in ink; where it sits in grey text, that color sets it apart. The personal note's closing sentence is grey with its three words in ink (3.7:1 against the grey, which clears 4.5:1 on the field), like the work captions; the open word keeps its swipe. The blog chart's source link is ink in its grey caption. The language to switch to is grey and turns ink on hover.
- Faint swipe at rest (24% instead of 34%) only where nothing else can mark a link: work and side-project captions on touch screens, and links in running ink text in case studies and blog posts (none yet).
- "joyful" has its own hover instead of the swipe, chosen from a prototype of three (letters that hop, hearts from the portrait, both): its letters, ink at rest, take the pigments of the "products" word and the page edge one by one (deep blue, sky, mustard, flame, cinnabar, magenta; the near-white one is left out) and hop in turn, frame by frame at 82 ms, while the pen circle wobbles like the header icons. The letters are hidden from assistive tech and the word is given once as hidden text, so the link still reads "joyful". With reduced motion only the colors change. At rest it looks exactly as before in both languages.
- "Get in touch" and "Home" keep their drawn icon on hover instead. Tried and dropped along the way: the dotted underline, a line that faded and rose into place, a 1 px line drawn in from the side (it read as machine-made next to the frame-by-frame drawings, and jumped to the far end on quick passes), and a faint line under the personal note's words.
- Verified: frames of the draw in slowed playback, hover and focus on every link kind, touch captions, reduced motion, both languages; Astro diagnostics, the media contract, and the production build pass.

## Desktop introduction spacing

- The introduction now starts a fixed 2rem below the header's row (`--navigation-top`, now a shared token) instead of 18vh down. The gap from the header links to the handwriting is 49 px at every desktop size; it used to range from 25 px (1280×720) to 69 px (1728×1000).
- The gap from the introduction to "my work" is 104 to 121 px instead of 150 to 169 px. The later section gaps (about 170 to 190 px) stay as they are: they sit between full-width cards, while this one sits under narrow text and joined the empty sky beside it. It stays over twice the introduction's own largest gap (50 px), so "my work" still reads as a new section. At 1728×1000 about 211 px of the work cards show in the first screen (was 143 px); at 1440×900, 138 px (was 74 px).
- Screens up to 48rem tall: the title now sits 38 px above the statements, which are 25 px apart (it was 28 px, too close to read as separate). The statements keep the taller screens' line length in characters, so "code." no longer sits alone on the last line.
- Phones and tablets (up to 52rem) are pixel-identical at 320 to 832 px in English and Russian. The opening still lands on the handwriting; inner pages' header offset is unchanged. Astro diagnostics, the media contract, and the production build pass.

## Contact at the end of the page, with Telegram

- The homepage contact is now the page's footer (`<footer>`, outside `main`) and sits at the bottom: the personal note's pause stays above it, and only 2.5 to 3.5rem remain below instead of 8 to 12rem. On narrow screens it ends just above the fixed balloon, which hangs in the corner beneath it.
- Telegram (@iggy_sleepy) joins the contact links, after Email, in the header panel and the closing row (`src/config/site.ts`).
- Phones: the closing links sit in two rows of three columns, and the header panel breaks its seven links four and three, right-aligned, so no link is left alone on a line. While the panel is open the header band stays solid to just below the links, so text underneath no longer shows through them.
- A richer version (visible heading, dotted rule, email and Telegram both in the display face, a copy button) was tried and dropped at Igor's request as too busy.
- Verified at 1440, 1024, 390, 375 and 320 px in English and Russian with no horizontal overflow; Astro diagnostics, the media contract, and the production build pass.

## Header blur on desktop

- The header band never blurred in Chrome, Brave, or Firefox: the source listed `backdrop-filter` before `-webkit-backdrop-filter`, and Lightning CSS kept only the prefixed one, which those browsers ignore. The header now declares only `backdrop-filter`; the build's browser targets need no prefix. Only Safari had been blurring.
- The band now reads as blur rather than a white wash: the tint drops from 64%/36% to 28%/12% of the field, the light blur goes from 5 to 8 px, and the heavy blur from 16 to 24 px, reaching further down (solid to 45%, gone by 90%). Compared at 1440 px over the side projects and a case study.
- Both languages in the switch are in ink; the one to switch to keeps the dotted link underline, like every other link. Bold for the current language was considered and left out: it would make the least important control the heaviest word in the header.

## Sky beneath the content

- The opening sky now sits just above the homepage's field and beneath its content (`z-index: -1` inside `.homepage`'s stacking context) instead of over everything, so it tints the page background but no longer the cards, screenshots, or text. The opening greeting keeps its own layer above the sky, and the document is hidden until the reveal, so the opening itself is unchanged. Verified at 1440 px with the kept sky after the reveal.

## iPhone status bar and toolbar

- The header is back to its original version at Igor's request (2026-09-30), so Safari 26 fills the status bar with its default solid color, sampled from the header (WebKit `LocalFrameView::fixedContainerEdges`: a visible fixed element spanning at least 90% of the width at the top of the viewport). Tried and rejected on his iPhone: hiding the header box so Safari shows the page behind the clock (it works, but the header's blur band then ends in a hard line under the clock) and fading the band in over its first 2rem (worse overall). Safari draws no fixed element beneath the status bar, so the band itself cannot continue there; a test page with six differently built fixed columns confirmed it.
- On iOS (`@supports (-webkit-touch-callout: none)`), `--browser-bleed-bottom` in `tokens.css` extends the opening sky beneath the toolbar, where Safari does draw it, so the sky no longer ends in a white band above the toolbar (checked on the iPhone). Elsewhere it is 0, so the sky's framing is unchanged there.
- Where Safari leaves the strip above the top of the page unfilled, it paints one flat color taken from the theme-color tag. On the homepage `html`'s background follows the sky (`--color-sky-edge` at the sky's current opacity, set by the opening controller within 120 px of the top) and, during a top pull, the rainbow (`--color-pull-edge`, set by the elastic edge); `src/lib/page-top-color.ts` copies it into the tag on iOS only. The top pull's backing starts in that blue so the rainbow meets the strip without a pale line. Body keeps the field, so the page itself is unchanged, and further down the tag returns to the field.
- The earlier iPhone-only theme-color and background syncing from the "transparent top" commit is reverted.
- Verified in Chromium: pages are pixel-identical to before this work at 1440 and 390 px (homepage top and scrolled, a case study, the Russian homepage). Astro diagnostics, the media contract, and the production build pass.

## Homepage clarity pass

- Work cards now have a caption under each panel in Instrument Sans at one size, set apart only by color: the pitch in ink on the left as the case-study link (dotted underline, no icon), and the kind of product and year in grey on the right ("Food delivery app · 2024", "Social app concept · 2026", "Language learning · 2024", "Developer tool · 2026"). The tags live in `src/content/case-studies.ts` beside the pitch; "Developer tool" for Observatory reflects how colleagues use it, and "macOS utility" is the stricter alternative. When the two don't fit side by side, on narrow panels and phones, the grey line drops under the pitch. The project name is in the link text for screen readers; the role stays on the case-studies listing only. The glass button and the old pill over the artwork are gone: the panel is for trying the product, the caption opens its case study. The grid uses subgrid so captions in one row start together and the panels above them end together; SuperGood and Observatory keep the diagonal.
- Side projects keep their playable panels and gain a one-line caption (`SideProjectCaption.astro`) in the same style: the name in ink as the link and, in grey, where it opens (itch.io, GitHub, X). "X experiment" is now "Switch experiment", matching the Russian name. On one-column layouts the Snake panel is 16:10 (its recording's own shape) and Tic-Tac-Toe is 4:3, instead of square.
- The header spans the full width with a progressive blur: a light tinted layer through the band and a heavier one near the top, so content fades evenly under the controls instead of under a patch. Over the homepage sky it appears only after the introduction or while the contact links are open. The band lets clicks through; only the controls take them. Inner pages use the same band.
- The personal note no longer reserves space for closed panels on wide screens; opening one moves the contact block down. Its bottom padding now matches the pause between the other sections (about 180 px at 1440 px, up from 130 px).
- `/case-studies/` now matches the homepage: the same frame width (aligned with the header), the Instrument Serif section title ("case studies"), the homepage panel radius and shadow, and the same caption. `WorkCaption.astro` is that one caption for both pages; the whole listing card opens its case study. The role now lives only on each case study page.
- The inactive language in the header switch uses the full muted grey (about 4.9:1) instead of 80% opacity (about 3.4:1). Superseded 2026-09-30: both languages are in ink, the one to switch to marked by the link underline.
- Hero: the `h1` is now "Hello, I'm Igor. Product designer."; the statements are paragraphs. The repeated game-design sentence is removed from the hero in both languages (the About section keeps it). The "joyful" circle is centered on the word's stroke and slightly flatter, so it no longer crosses the line above.
- Verified at 1440, 1024, and 375 px in English and Russian with no horizontal overflow, the personal panels open and closed, and a case-study page's header. Astro diagnostics, the media contract, and both production builds pass.

## Resume master: results first, decisions with reasons

- The resume in `scripts/build-resumes.py` is now the master that tailored versions tweak. Bullets lead with the result, then what Igor did and why. Projects are ordered by real use (Observatory, Two Sticks, then the Instagram concept), and each carries the decisions and reasons from its case study.
- 22bytes moved into design experience as Game Designer: nested core loops and unlock chains across 7 small games, strategy shaped through constraints, and Igor's playtest numbers (2 to 5 minute sessions, day-1 retention 27-30%, day-7 4-10%, 2 of 7 greenlit).
- Header: "Junior" level, research kept, Telegram added, city only. The Russian version drops LinkedIn, which is blocked in Russia. The internship target goes into cover letters and hh.ru settings, not the master. No photo in the PDFs; the photo belongs on hh.ru and the portfolio.
- One typeface (Arial) throughout. Entries never split across pages; both PDFs run about 1.2 pages, with all design work on page 1.
- Synced with the revised case studies (2026-09-30): SuperGood cites about 150 reviews, contextual inquiry with 10 people ordering at work, price and sold-out notices on reorder, and Igor's own design system with light and dark themes. Observatory's interviews are customer-development interviews run to test the problem. Instagram now has 9 interviews, a journey map, and the 6, 7 and 5 of 9 findings. Skills name job stories (JTBD) and customer journey maps, which the case studies now evidence.

## Resume revision: STAR results and sourced metrics

- Both resumes follow Olesya's and Masha Chubina's advice: every entry reads as context, action, result. SuperGood now leads its summary and its entry with Igor's confirmed results: reordering took 5 s instead of 60 s, success rose from 2 to 10 of 10, ease from 3 to 6 of 7 (comparative usability test, 10 colleagues), and the store rating rose from 3.1 to 3.7. It also states the "business bridge": Igor was the sole designer and engineer and worked directly with the business.
- Observatory adds its real use (three developer colleagues, two months) and the 17 rows to 1 grouping. Instagram adds the 6-of-8 finding that set search first. Two Sticks is added as the education-domain project. The research skills name the methods actually used; "A/B test" and unconfirmed claims (the review split, the pinned category bar) are left out.
- The Russian resume now links to the `/ru/` portfolio and case studies. Other experience and education are one line each, so both PDFs stay on one page with eight working links.
- Rebuilt with `scripts/build-resumes.py`, which now writes the published file names and accepts an output folder for previews, then rendered with `soffice --headless --convert-to pdf`.

## SuperGood leads the work

- `src/content/case-studies.ts` now ranks the studies: SuperGood, Observatory, Instagram Saves, Two Sticks. The case-studies listing shows that order. Case-study footers already chain in the same order.
- The homepage bento keeps its diagonal of two wide cards, swapped at Igor's request: SuperGood opens at top left and Observatory closes at bottom right, with Instagram and Two Sticks in the portrait slots. A `position` field in `ShowcaseCards.astro` keeps document and keyboard order in visual reading order (SuperGood, Instagram, Two Sticks, Observatory), which is also the phone order.
- Verified the bento at 1440 px, the listing at 1280 px, and the phone order at 375 px with no overflow.

## Case studies rebuilt around STAR and metrics

- All four case studies now share one structure: a STAR summary (Situation, Task, Action, Result), a row of headline metrics, then Situation, Task, Action, Result, and a closing Reflection or Next section. Action holds the research and numbered decisions. Each decision states the problem, what Igor did, why, the option he rejected, and the effect, beside its visual.
- Shared blocks live in `src/components/case-studies/`: `StudySection`, `StarSummary`, `MetricGrid`, `Decision`, `BarCompare`, `DotStat`, `StepCompare`, and `Shot`. `.breakout` in `src/styles/case-study.css` widens a block to 1080 px while text keeps the 780 px column. Instagram now uses the shared editorial styles and keeps its films and zoomable wireframes.
- Every number on the page names its source: measured, estimated, or counted from the designs. The facts come from Igor (2026-09-29):
  - SuperGood: in an internal test, repeating a usual order went from about 60 s to about 5 s, and 2 of 10 to 10 of 10 rebuilt it correctly (10 colleagues outside the app team, confirmed by Igor). In the same test, the ease rating (Single Ease Question, 1 to 7) went from 3 to 6. The public store rating rose from 3.1 to 3.7 after the release. The team read the new reviews: food complaints continued, and the praise was for the app. He built it alone in 11 months. The borrowed Flutter-versus-native estimate was removed at Igor's request, and the colleague test is called a comparative usability test, not an A/B test. The ≈70/30 split of review complaints is an approximation of Igor's "most were about food for the price". The pinned category bar is inferred from the menu screen and Igor's note that categories used to shift.
  - Observatory: three colleagues have used it for about two months, mostly Tests, to compare versions of an app and apps of one kind (Ghostty, kitty, Alacritty). Brave Browser at 17 processes is measured. The 60 s versus 3 s reading time is an estimate.
  - Instagram: 6 of 8 interviewees named finding a saved post as their main problem, which now drives the priority order. The 90 s versus 10 s search time is an estimate. "2 taps and a name → 1 tap" is counted from the designs.
  - Two Sticks: a few students used it. They liked having everything in one place and missed pronunciation practice.
- Closing sections: SuperGood owns the stakeholder lesson (Igor argued with opinions, not evidence). Observatory proposes category grouping. Two Sticks proposes a voice-message pronunciation drill. Instagram proposes a five-person task test on real libraries. Only SuperGood shows an ease rating; the other case studies collected none.
- Unchanged: Observatory's wordmark animation and launch film.
- Verified: Astro diagnostics, the media contract, and both production builds pass, with one high-priority image per route. English and Russian show no horizontal overflow at 1280 px and 375 px.

## Case studies listing and localized 404

- Added `/case-studies/` and `/ru/case-studies/`: a two-column grid (one column on phones) of the four case studies, each with its homepage card texture, a product screen, name, pitch, year, and role. The whole card is the link. Names, pitches, roles, and years now live in `src/content/case-studies.ts`, shared with the homepage cards. Every case study footer links to the listing; the listing has no footer because the header's Home is always in reach.
- The 404 page shows one language per visit instead of both: Russian for `/ru/` addresses, otherwise the saved choice, otherwise the system language, and English without JavaScript. The script also translates the shared header for Russian visitors.

## One underline for interactive text

- Every link and interactive word now shares one dotted underline defined by the `--link-line-*` tokens in `src/styles/tokens.css`: 1.5 px dots in ink at 45%, offset 0.3 em, full ink on hover and focus. It replaces about seven slightly different dotted styles on the homepage (including “joyful”, which used a dotted border) and the default solid underlines in case studies, blog, and 404. The internal selected-work prototype page is unchanged.
- The personal-note words keep a solid underline while their panel is open.

## Personal note: closing sentence

- Replaced the bulleted fact list (portrait, doodles, blog behind “+” accordions) with one closing sentence in both languages. It sits on its own row below both columns as an aside after the story. Igor approved trimming the right column (about 165 to 105 words) so the “before” and “after” columns end close together. Its three dotted words open the portrait, the doodles, or the writing list beneath it, one at a time; the open word gets a solid underline.
- Without JavaScript every panel is visible and each word links to its panel. Closed panels are hidden from focus and screen readers; reduced motion keeps only the fade.
- Verified at 1280 px and 375 px in English and Russian with no horizontal overflow.

## Russian version and language switcher

- Every page now exists in English at its current address and in Russian under `/ru/`: homepage, blog index and posts, and all four case studies. The header's `en / ру` switcher links to the same page in the other language; each language is named in its own script.
- English pages send a first-time visitor to the Russian page when Russian comes before English in the browser's language list. A choice made with the switcher is remembered in `localStorage` and overrides the system language. Russian pages never redirect, so shared `/ru/` links and search crawlers stay put. A language redirect still counts as a fresh arrival, so the opening plays.
- Copy is translated in place: `t('English', 'Русский')` pairs in each component and case-study page, locale-keyed objects in `src/content/homepage/`, and Russian posts in `src/content/writing/ru/` under the English file name. Untranslated posts fall back to the English text on the Russian address.
- The Latin fonts have no Cyrillic, so Cyrillic-only companions are loaded by `unicode-range` (English pages never fetch them): Golos Text for reading, Alegreya Bold for display, Oranienbaum for the Instrument Serif headings, Caveat for handwriting. Igor chose Alegreya and Oranienbaum from a side-by-side comparison, replacing Kurale and Playfair Display. Caveat and Oranienbaum are size-adjusted to match; «радостнее» uses a horizontally stretched circle with the English circle's height.
- Kept in English on purpose: the interactive Instagram mock (a replica of Instagram's English UI, marked `lang="en"`), the handwritten “Hello, I’m Igor.” image, product screen names in Observatory, and the internal selected-work prototype page. The Two Sticks bot demo was already Russian. The Russian copy uses informal «ты»; this is an editorial choice for Igor to confirm.
- Verified: Astro diagnostics, the media contract, and root and `/personal-website/` builds pass; hreflang and canonical links are correct under both bases; the redirect logic was tested against eight language and saved-choice combinations; desktop and 375 px views have no horizontal overflow.

## Local blog

- “I have a blog” now expands on the homepage like its sibling items and lists the posts. Local posts open at `/blog/<slug>/`; Identity Cage still links to Medium. `/blog/` lists the same posts on its own page. This replaces the Medium-only link from the earlier external blog simplification.
- Posts live in the `writing` content collection (`src/content/writing/`). An `externalUrl` makes a post link out instead of getting a local page.
- Published “Turn off one sound. Keep the rest.” with the sound-filtering film. The film keeps its audio because the sound is the subject, so it uses native controls, `preload="none"`, and a poster, with no autoplay. `scripts/prepare-blog-media.mjs` rebuilds the 720p and 1080p derivatives (1.7 MB and 2.7 MB, from 7.9 MB) and the poster; the source recording is unchanged.
- Restyled Igor's snoring-frequency chart to match the article: no rules or eyebrow label, a statement title instead of a competing h2, “Every night” in the accent and the other answers in grey, values at the bar tips, bars scaled to the whole group. Figures checked against the AASM PDF (411/285/159/7 of 865). The film now closes the post, after the safety section it also demonstrates.
- Verified at 1024 px and 375 px: correct source per viewport, poster loads, video decodes, no horizontal overflow or console errors. Astro diagnostics, the media contract, and root and `/personal-website/` builds pass. The post title reuses the film’s closing line and the date is 25 September 2026; both are placeholders for Igor to confirm.

## Homepage motion polish

- The opening greeting now holds for 300 ms after the handwriting completes, then moves into the page over 800 ms on a softer curve. The page is usable roughly 0.4 s sooner.
- The "products" shimmer now starts 500 ms after the page finishes revealing, on a timer rather than depending on the reveal animation finishing.
- The opening plays on a fresh arrival or reload. Arriving from another page of the site (Home link, back/forward) skips it, keeping the sky. Any scroll, tap, click, or key during the opening skips to the settled page with a 240 ms fade. Previously the deployed site replayed the full opening on both the Home link and back navigation whenever the browser did not restore the page from its back/forward cache.
- The opening sky is sized to the large viewport (`100lvh`), so on iPhone Safari it continues beneath the bottom toolbar instead of ending in a hard edge.
- Removed the orphaned hidden portrait button and click cue from the greeting, and the unused `values/` components. The values copy in `src/content/homepage/values.ts` is kept.
- Verified timings and the settled page at 375 × 812 without console errors. Astro diagnostics, the media contract, and root and `/personal-website/` builds pass. The iPhone toolbar fix still needs checking on a real device.

## Completed milestone: website media and implementation audit

- Checked all current routes at mobile and desktop widths. Images have intrinsic dimensions, no broken first-view sources were found, and inspected routes had no horizontal overflow. The responsive opening video selected its mobile and desktop source correctly.
- Replaced the Discourses preview's 77-frame, 1.6 MB animated WebP poster with a 21 KB static first frame matching the video. The authored animation remains in source; `scripts/prepare-side-project-media.mjs` reproduces the derivative.
- Removed the unused audio track from the muted Snake preview without re-encoding its video, reducing it from 1.7 MB to 1.0 MB. The original remains in source, and both homepage and prototype media use the silent derivative.
- Removed side-project preview videos from the global `load()` preloader. A direct visit to `#side-projects` now starts visible previews on first entry and pauses them offscreen. Shortened image/video preload lookahead to reduce speculative work.
- Added the deferred Instagram prototype's dependencies to Vite prebundling after a stale optimize-dependency response blocked hydration in the local dev server. Verified the card hydrates and its save sheet opens.
- The media contract, Astro diagnostics, and production builds for both `/` and `/personal-website/` pass.

## Resume revision: code and AI signals

- Rewrote both resumes so the summary states the thesis directly: a product designer who researches, designs, and ships, prototypes in code, and directs AI coding agents. Named the actual media that were previously implicit: React and Remotion for the Instagram Saves prototype, SwiftUI built through Claude Code and Codex for Observatory, and the Astro/React portfolio site as Igor's own build.
- Added a SuperGood bullet for the Material Design based theme and custom themed components (category-synced scrolling menu with animations). Restructured Skills into Design, Code, and Portfolio lines; dropped Vue; added Material Design, Godot, raylib and OpenGL. Page margins are 11 mm and Heading 1 spacing is tighter to keep one page. Marked Observatory as released on GitHub and aimed at developers and power users, matching its README. English stays at B2 by Igor's decision.
- Both PDFs remain one page with eight links each and no em dashes. Rebuilt with `scripts/build-resumes.py` and rendered through LibreOffice. Figma component/variable depth is not claimed because it is not evidenced.

## Resume revision

- Reworked the English resume and added a Russian PDF and editable Word source in `public/resume/`. SuperGood leads as commercial design experience; personal and collaborative projects remain explicitly labelled.
- Added the Instagram Saves concept to both versions. The Russian entry uses the descriptive heading “Поиск сохранённых публикаций” and links to the original case study; this is an editorial choice, not a legal compliance claim.
- Shortened skills and engineering detail, added direct case-study links, and increased body text to 10.5 pt. Rebuild the Word sources with `scripts/build-resumes.py`, then render and visually verify PDFs before replacing the published assets.
- Verified both complete one-page renders, text extraction, eight links per PDF, and clean Word accessibility audits. Local PDF routes return the exact files with `application/pdf`; production and root-path builds pass, including media checks. Deployment has not been performed.

## Instagram case-study feedback correction

- Replaced the speculative testing-only ending with Igor’s reported positive feedback, preserving all three supplied quotes without invented attribution or measured outcomes. Closed on the design’s purpose.

## Completed milestone: minimal case-study presentation and heading navigation

- Unified Observatory, SuperGood, and Two Sticks with Instrument Sans, a 780px reading column, responsive 18–24px body type, and the homepage field background.
- Removed numbered chapter labels, dividers, tinted panels, decorative phone treatments, and obsolete page styling. Kept Observatory’s wordmark and texture animation.
- Replaced Observatory sticky screen sequences with inline screen/explanation pairs, preserving the product evidence and static reading order.
- Added shared tick navigation to all four case studies. Each tick maps to an actual h2/h3, links to it, and tracks the active heading. Hover/focus labels identify destinations; mobile uses a horizontally scrollable strip with the active tick kept visible.
- Verified desktop/mobile layouts, heading mapping, pointer/keyboard navigation, and matching backgrounds. Astro diagnostics, media checks, and root/deployment-path builds pass.

## Completed milestone: case-study editorial revision

- Revised Observatory, SuperGood, and Two Sticks using Instagram Saves as the reference for pacing and concrete language. Instagram remains unchanged.
- Observatory now moves from the initial problem through a compact research summary into grouping, recording, and the actual interface iterations. Preserved both persona portraits and all screen/sketch evidence.
- SuperGood follows meal choice, the changing order, checkout, and repeat ordering. Consolidated repeated scope and outcome explanations.
- Two Sticks follows the learner’s actions in plain language, with the diploma team’s research attribution and the recognition score’s limits retained. The legacy Chinese Bee route continues to serve the same case study.
- Reduced main-content text by approximately 27–32%. Replaced decision/why matrices with prose and corrected the product-story paragraphs’ label styling to readable body text.
- Verified revised sections at 1280 × 900 and 390 × 844 with no horizontal overflow or observed browser errors. Static HTML checks confirm one h1, valid local anchors, unique IDs, and image alt/loading/dimension attributes.
- Astro diagnostics and the media contract pass. Root and /personal-website/ builds pass, including verification with the project’s supported Node 24 runtime.

## Previous completed milestone: four-card homepage work showcase

- Rebuilt “my work” as the requested asymmetric four-card grid: Observatory spans two tracks at top left, Instagram Saves sits at top right, Two Sticks sits at bottom left, and SuperGood spans two tracks at bottom right.
- Added the enhanced-only Instagram Saves prototype to its card, including the feed, saved collections, search and filters, collection creation, annotations, and sharing interactions from the authored prototype.
- The experience now starts on its real feed state. The save sheet opens only after a bookmark action, and a matching server-rendered feed prevents a flash of the sheet before hydration.
- Added layered translucent glass borders around the embedded phone. The interactive implementation is isolated in a shadow root and loads near the viewport instead of blocking the homepage.
- Converted 59 imported prototype images to compact WebP derivatives and kept paths compatible with root and deployed base paths.
- Verified the full grid and initial feed at 1280 × 900 and 390 × 844. Verified that the first bookmark opens the enhanced save sheet. Astro diagnostics and the media contract pass.

## Previous completed milestone: visual opening and shared case-study navigation

- Added two optimized prototype screens beside the Instagram introduction on desktop and directly below it on mobile. Preserved the quiet article typography and inline evidence.
- Unified all case-study headers through PortfolioHeader: Home links to the homepage and swaps to Igor's existing home doodle on hover/focus, using the same treatment as Get in touch.
- Removed duplicate project/category header labels and redundant chapter-index labels. Kept source links in project footers; unified footer Home destinations.
- Verified all four case studies at desktop/mobile sizes, keyboard doodle focus, contact opening/dismissal, Home navigation, and unchanged homepage navigation. Media checks and normal/root/base-path production builds pass.

## Completed milestone: minimal sans-serif Instagram case study

- Rebuilt the page around one sans-serif font and a consistent reading alignment. Body text scales from 18px to 24px; headings share one treatment. Removed the bookmark ornament, serif/italic shifts, and redundant project kicker.
- Replaced every case-study disclosure with visible inline media. No dividers or boxed presentation sections.
- Added visibility-based muted looping video playback without native sliders. Plain Play/Pause buttons preserve user control, and playback pauses offscreen or in hidden documents. Reduced-motion/data-saver visits wait for explicit play.
- Documented the user-authorized autoplay exception in the media contract. Original recordings and optimized derivatives are preserved.
- Verified desktop/mobile layout, no horizontal overflow, automatic playback, manual pause, and offscreen pausing. Astro diagnostics, media checks, and root/base-path builds pass.

## Completed milestone: Instagram editorial flow and web media

- Removed case-study dividers, boxed media panels, the separate video gallery, and repeated section labels. Embedded each walkthrough with its design decision and simplified the interview summary into continuous reading.
- Kept a distinct but calmer heading hierarchy and consistent body text for inline notes.
- Fixed the enlarged 161-pixel wireframe by explicitly setting source dimensions and capping display width. Responsive image sets include source resolution; wireframe PNGs remain lossless.
- Added three user-controlled walkthroughs with WebP posters, native controls, `preload="none"`, and 540/720-pixel H.264 fast-start derivatives. Silent audio removed after verification. Original recordings preserved; `scripts/prepare-instagram-media.mjs` reproduces derivatives.
- Video payload totals 2.82 MB or 4.21 MB per selected resolution versus 17.67 MB of originals, a 76–84% reduction. No autoplay or eager video preload.
- Desktop (1280 × 900) and mobile (390 × 844) layouts inspected without overflow. The small feed wireframe renders at 161 pixels on both. Astro/media checks and root/base-path builds pass.

## Completed milestone: Instagram Saves editorial case study

- Added `/case-studies/instagram-saves-redesign/` and a matching homepage feature.
- Created an editorial narrative using eight conversations plus Igor's own experience, with 17 authored screenshots, notebook spreads, and wireframes.
- Kept the AI search results and collection feed framed as prototype proposals. Identified the private annotation editor's unresolved relationship to the proposed shared notes.
- Added responsive optimized media, full-size image links, and native wireframe disclosures. The narrative and controls are server-rendered; no new client script or animation is required.
- Verified desktop at 1280 × 900 and mobile at 390 × 844 and 320 × 740 without horizontal overflow. Verified homepage navigation, image links, and keyboard disclosure operation; no relevant browser errors were reported.
- Normal, local-root, and `/personal-website/` production builds pass. Astro diagnostics report zero errors, warnings, and hints; the media contract passes. Production HTML has one h1, image dimensions, generated assets, and base-aware links.

## Previous completed milestone: complete doodle collection

- The “Editorial and illustrative sketcher” disclosure now presents all 15 matching doodle artworks, including the six newly added files.
- The complete collection retains lossless source delivery, intrinsic sizing, lazy loading, and the existing responsive grid.

## Previous completed milestone: external blog simplification

- Retargeted “I have a blog” directly to Igor's Medium profile.
- Removed the local writing index, article route, preview component, unpublished placeholder entry, and writing content collection.

## Previous completed milestone: personal portrait holo treatment

- Added a pointer-responsive holographic treatment to the existing couple portrait, with tilt, lagging foil, localized glare, and hidden hearts directly on the image.
- Kept the effect dependency-free and compatible with GitHub Pages. It adds no media request and preserves the optimized lazy portrait.
- Limited movement to fine hover pointers. Coarse pointers, no-JavaScript visits, and reduced-motion visits keep a stable photograph.
- The spring stops once settled or when the page is hidden, and the resting photograph returns to its original appearance.

## Previous completed milestone: homepage about consolidation

- Moved “A few more things about me” to the end of the homepage after both work showcases.
- Matched its heading to the work sections and simplified the personal facts to a static list.
- Made the boyfriend and sketcher facts keyboard-accessible disclosures for the existing portrait and doodles, with restrained and reduced-motion-safe reveal transitions.
- Removed About from the shared navigation.
- Removed the `/about/` and `/who-i-am/` routes, including the standalone About placeholder story presentation.
- Removed the software-engineer note from the personal constellation.
- Removed the redundant game-designer note now that the homepage shows the game work directly.

## Previous completed milestone: homepage work consolidation

- Removed the standalone Work route and its presentation component.
- Removed Work from the shared top navigation.
- The primary showcase now reads “my work” with no special interaction on the heading.
- Case-study and personal-note links return to the relevant homepage work sections.

## Previous completed milestone: homepage side-project showcase

- Added a second homepage showcase using the existing selected-work card language.
- Included Secret Santa Foundation, Discourses by Campfire, The Last of Buns, Snake, Tic-Tac-Toe, the farm interaction, and the weighted switch experiment.
- Secret Santa Foundation idles in flight, responds to hold and release input, and keeps a stable reduced-motion state.
- The farm card reconstructs the authored 320 by 180 Godot tile layers, keeps a static poster fallback, and lets pointer or keyboard input prepare only the original arable cells.
- Video previews stay deferred, keep static posters before loading, and loop silently while visible on desktop and mobile. The Last of Buns source GIF is delivered as a 585 KB progressive H.264 MP4 instead of a rendered GIF.
- Desktop and mobile layouts have no horizontal overflow. Astro diagnostics, the media contract, and production builds for `/` and `/personal-website/` pass.

## Previous completed milestone: immediate media presentation

- The 9 KB opening poster and first visible animation states are embedded in the HTML, removing separate GitHub Pages requests before the opening can be presented.
- The poster and both responsive opening videos now begin on the first visible sky frame instead of a black zero-frame.
- Remaining greeting frames wait until the opening video can play, preventing the sequence from competing with critical media.
- Deferred images begin decoding ahead of the viewport.
- Below-fold videos retain their posters and begin preparing before they enter the viewport. Data-saver and slow connections use more conservative behavior.
- The responsive mobile and desktop opening-video sources remain directly discoverable in the initial HTML.

## Verification

- The production homepage contains all 15 doodle images, each with intrinsic dimensions and `loading="lazy"`.
- The homepage blog link resolves directly to `https://medium.com/@iggysleepy`, and production output contains no `/blog/` route.
- The holo portrait responds smoothly on desktop and returns to rest without browser warnings.
- At 390 by 844, the opened portrait is fully visible, uses the generated responsive image, and causes no horizontal overflow.
- The media contract and Astro diagnostics pass, as do production builds for both `/` and `/personal-website/`.
- Measured deployed GitHub Pages responses at roughly 250 to 440 milliseconds before the first byte for the tested cold HTML and media requests.
- Astro diagnostics and the media contract pass with no errors, warnings, or hints.
- The production build passes for the deployed `/personal-website/` base path.
- Mobile verification at 390 by 844 selected the 640 by 360 mobile video, displayed the inline poster, and had no horizontal overflow.
- Desktop verification at 1280 by 900 selected the desktop video, displayed the inline poster, and had no horizontal overflow.

## Next work

Deploy and evaluate a genuinely cold mobile visit. If the remaining pause is the HTML response itself, compare GitHub Pages with a host that permits stronger control of immutable caching and edge delivery while retaining Astro.
