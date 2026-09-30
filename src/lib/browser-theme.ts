/** Match iPhone Safari's native solid tint without changing the page's visuals. */
let themeFrame = 0;

export const syncBrowserThemeColor = () => {
  if (!document.documentElement.classList.contains('iphone-browser')) return;
  if (themeFrame) return;
  // Let variable removals and motion-preference changes settle before reading
  // the resulting color, and combine sky and edge updates into one write.
  themeFrame = window.requestAnimationFrame(() => {
    themeFrame = 0;
    const theme = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!theme) return;
    const color = getComputedStyle(document.documentElement).backgroundColor;
    if (theme.content !== color) theme.content = color;
  });
};
