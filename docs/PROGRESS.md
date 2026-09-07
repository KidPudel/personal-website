# Progress

Last updated: 2026-09-07

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
