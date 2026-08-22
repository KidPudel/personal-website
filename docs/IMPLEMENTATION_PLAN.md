# Implementation plan

Last updated: 2026-08-22

## Current milestone: immediate media presentation

Status: complete

- Measure the deployed GitHub Pages cold-response path.
- Embed the tiny opening poster and initial drawn states in the HTML.
- Start the remaining greeting-frame downloads only after the opening video can play.
- Prepare deferred images and videos before they enter the viewport without eagerly downloading the entire document.
- Reduce look-ahead loading when data saver or a slow connection is active.
- Verify the homepage and Work route at desktop and mobile sizes.

## Follow-up boundary

The remaining first-visit delay before any HTML arrives belongs to GitHub Pages delivery. Reassess hosting only if production measurements continue to show an unacceptable first-byte delay after these presentation changes are deployed.
