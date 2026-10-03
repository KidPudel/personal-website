// Observatory's print: an ordered (Bayer 8 × 8) dither in two inks, the way the launch film's
// artwork is printed. One function for the build script, which dithers the still, and for the page,
// which dithers the footage frame by frame, so the still and the film always match.

/** Night and starlight: the two inks. */
export const inks = {
  dark: [11, 12, 10],
  light: [222, 232, 200],
};

const bayer = [
  0, 32, 8, 40, 2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44, 4, 36, 14, 46, 6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47, 7, 39, 13, 45, 5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
].map((value) => (value + 0.5) / 64);

// The archive film is dark and soft, so its tones are stretched before the threshold: below the
// floor is night, above the ceiling is starlight, and the mid-tones are lifted a little.
const floor = 0.06;
const ceiling = 0.62;
const lift = 0.8;

/** Dithers RGBA pixels in place. */
export function dither(pixels, width, height) {
  const [dr, dg, db] = inks.dark;
  const [lr, lg, lb] = inks.light;
  for (let y = 0; y < height; y += 1) {
    const row = (y & 7) * 8;
    for (let x = 0; x < width; x += 1) {
      const at = (y * width + x) * 4;
      const luma = (0.2126 * pixels[at] + 0.7152 * pixels[at + 1] + 0.0722 * pixels[at + 2]) / 255;
      const tone = Math.min(1, Math.max(0, (luma - floor) / (ceiling - floor))) ** lift;
      const on = tone > bayer[row + (x & 7)];
      pixels[at] = on ? lr : dr;
      pixels[at + 1] = on ? lg : dg;
      pixels[at + 2] = on ? lb : db;
      pixels[at + 3] = 255;
    }
  }
  return pixels;
}
