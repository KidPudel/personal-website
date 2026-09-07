# Implementation plan

Last updated: 2026-09-07

## Completed milestone: minimal case-study presentation and heading navigation

- Unified Observatory, SuperGood, and Two Sticks with Instrument Sans, a 780px reading column, responsive 18–24px body type, and the homepage field background.
- Removed numbered chapter labels, dividers, tinted panels, decorative phone treatments, and obsolete page styling. Kept Observatory’s wordmark and texture animation.
- Replaced Observatory sticky screen sequences with inline screen/explanation pairs, preserving the product evidence and static reading order.
- Added shared tick navigation to all four case studies. Each tick maps to an actual h2/h3, links to it, and tracks the active heading. Hover/focus labels identify destinations; mobile uses a horizontally scrollable strip with the active tick kept visible.
- Verified desktop/mobile layouts, heading mapping, pointer/keyboard navigation, and matching backgrounds. Astro diagnostics, media checks, and root/deployment-path builds pass.

## Previous milestone: case-study editorial revision

Status: complete

- Use Instagram Saves as the writing reference for Observatory, SuperGood, and Two Sticks: concrete situations, clear decisions, and evidence beside the explanation.
- Condense repeated research summaries, principles, feature inventories, and ownership statements while preserving verified facts, research attribution, project status, and limitations.
- Keep the existing project media and ensure rewritten decision paragraphs use readable body typography.
- Verify the revised routes at desktop/mobile sizes, static reading order, media contract, and root/deployment production builds.

## Previous milestone: four-card homepage work showcase

Status: complete

- Recompose “my work” as the authored alternating-span grid: Observatory and Instagram Saves above Two Sticks and SuperGood.
- Place the enhanced Instagram Saves prototype directly inside its card, starting on the feed and opening save tools only through interaction.
- Keep the prototype isolated, deferred, base-path aware, responsive, and backed by an accurate static feed preview.
- Optimize imported prototype media and verify the card layout and interaction at desktop and mobile sizes.

## Previous milestone: visual opening and shared case-study navigation

Status: complete

- Introduce the Instagram prototype visually within the opening viewport, using responsive source-bounded screenshots.
- Share Home and contact navigation across every case study, reusing Igor's doodles and the existing accessible interaction.
- Remove redundant header labels and verify desktop/mobile layouts, navigation, media checks, and production paths.

## Previous milestone: minimal sans-serif Instagram case study

Status: complete

- Use Instrument Sans throughout, with a consistent 780px reading column and larger responsive body copy.
- Remove decorative typography and all case-study expand/collapse controls; show evidence inline.
- Play muted walkthroughs while visible, with a simple accessible pause control, offscreen suspension, and reduced-motion/data-saver poster defaults.
- Verify responsive presentation, playback, media contract, and both production base paths.

## Previous milestone: Instagram editorial flow and web media

Status: complete

- Integrate the three authored walkthroughs into the narrative with deferred, optimized delivery and static posters.
- Cap media display sizes by source dimensions and retain readable, responsive evidence.
- Reduce interruptions in the typography and composition: remove dividers, repeated labels, and separate presentation panels.
- Verify media checks, production builds, desktop/mobile layout, and native media controls.

## Previous milestone: Instagram Saves editorial case study

Status: complete

- Build `/case-studies/instagram-saves-redesign/` as an independent, image-led editorial document using Igor's project account and supplied media.
- Connect the interview patterns to saving suggestions, retrieval, annotations, pins, shared context, and a collection feed. Distinguish proposed behavior from tested outcomes.
- Include a homepage feature linking to the case study, native expandable wireframes, and full-size optimized image links.
- Verify mobile and desktop presentation, image delivery, keyboard disclosures, Astro diagnostics, and both deployment base paths.

## Previous milestone: complete doodle collection

Status: complete

- Include every `Doodles_*.png` artwork in the “Editorial and illustrative sketcher” disclosure.
- Preserve the authored lossless PNGs, intrinsic dimensions, lazy loading, and responsive grid.
- Verify all 15 artworks render at desktop and mobile sizes without overflow.

## Previous milestone: external blog simplification

Status: complete

- Send the homepage blog link directly to Igor's Medium profile.
- Remove the local blog index, article route, preview component, unpublished placeholder entry, and unused writing collection.
- Verify the removed routes are absent from the production output for both deployment base paths.

## Previous milestone: personal portrait holo treatment

Status: complete

- Give the existing couple portrait a pointer-responsive holographic foil, glare, hidden hearts, and tilt treatment inspired by the authored reference.
- Keep the enhancement dependency-free, static-host compatible, and free of additional media requests.
- Preserve the native disclosure, responsive lazy image, no-JavaScript presentation, and stable reduced-motion and coarse-pointer states.
- Verify diagnostics, the media contract, both deployment base paths, and representative desktop and mobile layouts.

## Previous milestone: homepage about consolidation

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
