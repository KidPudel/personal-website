# Media performance contract

Last updated: 2026-08-22

This document is the implementation contract for every image, video, flipbook, poster, and decorative media asset on the site. Future agents must read it before changing public media.

## Experience target

The document must become readable before optional media finishes loading. First-viewport media must be discoverable from the server-rendered HTML. Below-fold and interaction-only media must not compete with the initial document, font, poster, or opening video.

Fast presentation means that the browser can paint a correctly sized, meaningful result immediately and progressively improve it. It does not mean eagerly downloading the entire site.

On GitHub Pages, even a very small cold asset request can add a separate network wait. A tiny critical poster or static animation state may be inlined when that avoids a visible empty interval. Keep inline media exceptional and size-bounded because it increases every HTML response.

## Images

- Use Astro `Image`, `Picture`, or `getImage` for photographic, project, portrait, and screenshot media.
- Give responsive images a realistic `widths` set and an accurate `sizes` expression. Do not generate widths larger than the source or plausible rendered size.
- Use WebP for photographic and interface media unless transparency, authored lossless line art, or another demonstrated requirement makes PNG or another format more appropriate.
- Every image must have intrinsic dimensions so layout is stable before decoding.
- Use `loading="eager"`, `decoding="async"`, and `fetchpriority="high"` only for the single most important first-viewport image on a route.
- Other first-viewport images may be eager but must not receive high priority.
- Use `loading="lazy"` and `decoding="async"` for media below the first viewport, hidden until interaction, or used only as decoration.
- Prepare lazy images conservatively before they enter the viewport. Use an observer rather than making the whole document eager, and reduce the look-ahead distance when data saver or a slow connection is active.
- Do not ship a full-resolution source through CSS `background-image` when a generated, size-bounded asset can provide the same result.
- Preserve useful alternative text for meaningful media and empty alternatives for decorative media.
- Do not render GIF animation. Use a muted MP4 or WebM with a static poster.

## Video

- Put the actual `src` or responsive `<source src media>` in server-rendered HTML. Do not hide a critical source in `data-src` and wait for JavaScript to assign it.
- Responsive sources must choose the smallest sufficient file for the rendered viewport.
- Every video needs intrinsic width and height, a lightweight poster, `playsinline`, and an explicit preload policy.
- Use `preload="none"` for interaction-only and below-fold video. Use `metadata` only when duration or dimensions are needed before interaction.
- `preload="auto"` and autoplay are reserved for an explicitly reviewed, silent, first-viewport experience marked `data-critical-media`.
- A critical video must have an immediately presentable poster. If the poster is tiny and first-paint latency is visible on the current host, inline it instead of paying another cold request.
- Deferred videos may move from `none` to `metadata` or `auto` as they approach the viewport. Respect data saver and slow connections, and do not autoplay them.
- Autoplay video must be muted, loop only when the loop is intentional, pause when hidden, and retain a useful poster if playback is blocked.
- The homepage side-project MP4 previews are a reviewed GIF-replacement exception. They may begin silent looping playback only while intersecting the viewport, must keep `preload="none"` and a parser-discoverable source, and must pause offscreen or while the document is hidden. Reduced-motion, data-saver, and slow-connection visits keep the static poster.
- Encode MP4 for progressive delivery with the `moov` atom before media data. Use broadly supported H.264 with `yuv420p`; omit audio from intentionally silent files.
- A short video is not automatically a light video. Check encoded bytes, bitrate, dimensions, frame rate, and startup metadata.

## Flipbooks and animated image sequences

- Do not eagerly fetch or decode every frame when a component connects.
- Load the active frame and only the neighbouring window required for reliable playback.
- Interaction-only sequences may prepare all required frames after the user expresses intent, but never on the initial page critical path.
- If a frame sequence shares the first viewport with critical video, show a static first frame immediately and wait until the video can play before fetching the remaining sequence.
- Keep a static first or completed frame available without JavaScript and under reduced motion.
- Stop frame work when the component is hidden, settled, disconnected, or reduced motion is active.

## Loading order

The preferred initial order is:

1. HTML and critical CSS.
2. The first necessary font and the route's single LCP candidate.
3. Parser-discoverable first-viewport media.
4. Visible supporting media.
5. Below-fold media as it approaches the viewport.
6. Interaction-only media after intent.

Do not use preload to compensate for a source that the HTML parser cannot discover. A preload hint is not a substitute for correct markup and may be deprioritized by the browser.

## Caching and delivery

- Content-hashed production assets should be served with long-lived immutable caching where the host permits it.
- The current GitHub Pages host controls cache headers. Keep content hashing enabled and avoid depending on repeat-visit cache state for acceptable first-load behavior.
- If media volume or traffic grows materially, prefer an edge CDN that supports immutable caching and byte-range video delivery.

## Required verification

Run:

```sh
pnpm run media:check
pnpm run build
SITE_URL=http://localhost:4321 BASE_PATH=/ pnpm run build
```

Then inspect representative desktop and mobile viewports. Confirm:

- the correct responsive video source is selected;
- the poster is visible before video playback;
- below-fold images remain lazy before scrolling;
- visible images have nonzero intrinsic dimensions and no broken sources;
- reduced motion presents stable static media;
- video playback failure leaves a presentable poster;
- there is no horizontal overflow, layout shift, or relevant console error.
