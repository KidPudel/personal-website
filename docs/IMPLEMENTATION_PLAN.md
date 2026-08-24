# Implementation plan

Last updated: 2026-08-24

## Current milestone: homepage about consolidation

Status: complete

- Place “A few more things about me” after the complete homepage work and side-project showcases.
- Match the work-section heading treatment and present the personal facts as a simple list.
- Make the boyfriend and sketcher facts native disclosures for the existing portrait and doodles.
- Remove About from the shared navigation.
- Remove the standalone `/about/` and `/who-i-am/` routes entirely.
- Verify diagnostics, the media contract, both build base paths, and representative desktop and mobile layouts.

## Previous milestone: homepage work consolidation

Status: complete

- Make the homepage the only work index and remove the standalone Work route.
- Remove Work from the shared top navigation.
- Rename the primary showcase heading to “my work” and remove the “some” preview interaction.
- Retarget internal work links to the relevant homepage sections.
- Verify the homepage at desktop and mobile sizes and confirm removed routes are absent from the build.

## Previous milestone: homepage side-project showcase

Status: complete

- Repeat the homepage showcase language directly after the selected work.
- Present the existing game artifacts and weighted switch experiment without additional project copy.
- Make Secret Santa Foundation playable through hold and release input while preserving an idle flight state.
- Reconstruct the authored farm tile layers and let the hoe prepare only arable ground.
- Deliver GIF-sourced previews as deferred MP4 video with static posters.
- Verify desktop and mobile layout, interaction, reduced-motion handling, media delivery, and both build base paths.

## Previous milestone: immediate media presentation

Status: complete

- Measure the deployed GitHub Pages cold-response path.
- Embed the tiny opening poster and initial drawn states in the HTML.
- Start the remaining greeting-frame downloads only after the opening video can play.
- Prepare deferred images and videos before they enter the viewport without eagerly downloading the entire document.
- Reduce look-ahead loading when data saver or a slow connection is active.
- Verify the homepage at desktop and mobile sizes.

## Follow-up boundary

The remaining first-visit delay before any HTML arrives belongs to GitHub Pages delivery. Reassess hosting only if production measurements continue to show an unacceptable first-byte delay after these presentation changes are deployed.
