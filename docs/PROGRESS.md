# Progress

Last updated: 2026-08-25

## Completed milestone: complete doodle collection

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
