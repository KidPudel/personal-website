# Progress

Last updated: 2026-08-16

## Current state

- The homepage uses the current box-opening hypothesis: seven lossless frames, native scroll, a complete identity reveal, an introduction exit, and a sticky values voice.
- The introduction reveal and exit now derive from scroll position only. The exit uses transform and opacity and keeps its layout footprint, so “Three things important to me.” does not jump when the preceding copy leaves.
- Timer-gated identity beats, animated `max-height` collapse, and manual session-based scroll restoration have been removed.
- Value evidence uses a shorter, gentler entrance. Narrow layouts alternate readable evidence cards in one column instead of compressing them into miniature side columns.
- Inactive value-voice layers are hidden from the current accessibility state.
- The work, writing, Observatory case study, personal-note constellation, contact disclosure, and verified content remain intact.
- Project guidance now treats exact visual choreography as replaceable and keeps architecture limited to durable technical boundaries.

## Verification

- Inspected the opening, complete introduction, scroll-linked exit, sticky values voice, box fade, and evidence field at 1440 by 900, 663 by 999, and 390 by 844.
- Confirmed a stable values-line position during the introduction exit, readable mobile evidence, corrected hash bypass positioning, visible skip-link focus, and no horizontal overflow.
- `astro check` reports zero diagnostics.
- Production builds complete for `/` and `/personal-website/`.
- Browser diagnostics are empty of relevant warnings and errors.

## Known workflow issue

Two Astro development servers may be running for this workspace. The browser tab at port 4321 and `website.sh --status` must refer to the same server before visual review, otherwise the user and agent may inspect different instances.
