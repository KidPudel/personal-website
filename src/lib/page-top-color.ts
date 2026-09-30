/**
 * Safari on iOS fills the strip above the top of the page, beneath the status
 * bar, from the theme-color tag rather than the page background. Copy the
 * root background there (see composition.css), at most once per frame.
 */
const appliesHere = typeof CSS !== 'undefined' && CSS.supports('-webkit-touch-callout', 'none');
let frame = 0;

export const syncPageTopColor = () => {
  if (!appliesHere || frame) return;

  frame = window.requestAnimationFrame(() => {
    frame = 0;
    const theme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!theme) return;

    // color-mix() resolves to color(srgb r g b) with 0–1 channels.
    const color = getComputedStyle(document.documentElement).backgroundColor;
    const scale = color.startsWith('color(') ? 255 : 1;
    const channels = color.match(/[\d.]+/g)?.slice(0, 3).map((channel) => Math.round(Number(channel) * scale));
    if (!channels || channels.length < 3) return;

    const content = `rgb(${channels.join(', ')})`;
    if (theme.content !== content) theme.content = content;
  });
};
