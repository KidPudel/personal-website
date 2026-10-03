// Two Sticks' paper: a copybook writing grid (田字格), the squares with a dashed cross in each, as on
// the project's own notebook sheets. A small SVG tile, sharp at any size.

/** One square of the grid, its side in pixels, for the paper and the cover's practice rows. */
export const cell = 64;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${cell}" height="${cell}" viewBox="0 0 ${cell} ${cell}"><rect width="100%" height="100%" fill="#fbfaf6"/><path d="M0 .5H${cell}M.5 0V${cell}" stroke="#8ea68d" stroke-opacity=".5"/><path d="M0 ${cell / 2}H${cell}M${cell / 2} 0V${cell}" stroke="#8ea68d" stroke-opacity=".38" stroke-dasharray="3 3"/></svg>`;

const tile = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

/** The grid as a CSS background. */
export const copybookPaper = `${tile} 0 0 / ${cell}px ${cell}px #fbfaf6`;

/** Just the tile, for squares drawn at another size. */
export const copybookCell = tile;
