# Progress

Last updated: 2026-08-23

## Completed milestone: immediate media presentation

- The 9 KB opening poster and first visible animation states are embedded in the HTML, removing separate GitHub Pages requests before the opening can be presented.
- The poster and both responsive opening videos now begin on the first visible sky frame instead of a black zero-frame.
- Remaining greeting frames wait until the opening video can play, preventing the sequence from competing with critical media.
- Deferred images begin decoding ahead of the viewport.
- Below-fold videos retain their posters and begin preparing before they enter the viewport. Data-saver and slow connections use more conservative behavior.
- The responsive mobile and desktop opening-video sources remain directly discoverable in the initial HTML.

## Verification

- Measured deployed GitHub Pages responses at roughly 250 to 440 milliseconds before the first byte for the tested cold HTML and media requests.
- Astro diagnostics and the media contract pass with no errors, warnings, or hints.
- The production build passes for the deployed `/personal-website/` base path.
- Mobile verification at 390 by 844 selected the 640 by 360 mobile video, displayed the inline poster, and had no horizontal overflow.
- Desktop verification at 1280 by 900 selected the desktop video, displayed the inline poster, and had no horizontal overflow.
- The Work route prepared its first deferred video roughly one viewport before it became visible and reported no broken images.

## Next work

Deploy and evaluate a genuinely cold mobile visit. If the remaining pause is the HTML response itself, compare GitHub Pages with a host that permits stronger control of immutable caching and edge delivery while retaining Astro.
