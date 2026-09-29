# Progress

Last updated: 2026-09-29

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
