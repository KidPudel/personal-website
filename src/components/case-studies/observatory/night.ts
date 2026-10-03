// Observatory's paper: the night of system numbers from the launch film's artwork, columns of thin
// digits on black. Drawn as a small SVG tile, so it stays sharp at any size and costs a few
// kilobytes; frames cut from it start at different places (Plate's paperAt).

const columns = 14;
const rows = 9;
const cellWidth = 26;
const cellHeight = 36;

// A fixed seed, so the digits are the same on every build.
let seed = 20260;
const next = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

const digits: string[] = [];
for (let row = 0; row < rows; row += 1) {
  for (let column = 0; column < columns; column += 1) {
    const digit = Math.floor(next() * 10);
    // Most digits sit back in the dark; a few catch the light, like the film's.
    const light = next();
    const opacity = light > 0.94 ? 0.34 : light > 0.72 ? 0.17 : 0.08;
    digits.push(`<text x="${column * cellWidth + cellWidth / 2}" y="${row * cellHeight + cellHeight * 0.78}" fill-opacity="${opacity}">${digit}</text>`);
  }
}

const width = columns * cellWidth;
const height = rows * cellHeight;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#0b0c0a"/><g fill="#9fb4c4" font-family="Helvetica Neue,Helvetica,Arial,sans-serif" font-weight="300" font-size="24" text-anchor="middle">${digits.join('')}</g></svg>`;

/** The tile as a CSS background, with its size. */
export const nightPaper = `url("data:image/svg+xml,${encodeURIComponent(svg)}") 0 0 / ${width}px ${height}px #0b0c0a`;
