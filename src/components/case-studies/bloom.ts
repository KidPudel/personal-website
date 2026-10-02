// A pigment bloom: soft washes of a few colours, laid down where a screen sits and spreading
// past it, the way ink spreads on wet paper. Each plate gets its own from the colours of the food
// or map on its own screen, and its own seed, so no two are alike and nothing is a reused picture.
// Deterministic: the same seed always draws the same bloom, so the page is stable between builds.

export interface BloomOptions {
  /** Colours as hex, strongest first. */
  pigments: string[];
  seed: number;
  /** Where the screen sits across the box, in percent; the washes gather there. */
  centre?: number;
  /** Which way the washes reach further: toward the open side of a plate. */
  reach?: 'right' | 'left' | 'both';
  /** How many washes. */
  count?: number;
}

const random = (seed: number) => {
  let state = (seed * 2654435761) >>> 0 || 1;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return ((state >>> 0) % 10000) / 10000;
  };
};

// sRGB hex to OKLCH, so a colour can be lifted without changing its hue.
const oklch = (hex: string) => {
  const value = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((at) => {
    const channel = parseInt(value.slice(at, at + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const lightness = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  const hue = (Math.atan2(bb, a) * 180) / Math.PI;
  return { lightness, chroma: Math.hypot(a, bb), hue: hue < 0 ? hue + 360 : hue };
};

// Pigment, not stain: greens and khakis are lifted to a fresh light green, and every colour keeps
// enough chroma to read as colour on a light page.
const pigment = (hex: string) => {
  const { lightness, chroma, hue } = oklch(hex);
  const green = hue > 85 && hue < 175;
  const l = Math.max(lightness, green ? 0.82 : 0.74);
  const c = Math.max(chroma, green ? 0.13 : 0.12);
  return `${round3(l)} ${round3(c)} ${round(hue)}`;
};

const round3 = (value: number) => Math.round(value * 1000) / 1000;

const round = (value: number) => Math.round(value * 10) / 10;

export const bloom = ({ pigments, seed, centre = 50, reach = 'both', count = 6 }: BloomOptions) => {
  const next = random(seed);
  const washes = Array.from({ length: count }, (_, index) => {
    const colour = pigment(pigments[index % pigments.length]);
    // Toward the open side the washes travel further and grow wider.
    const lean = reach === 'right' ? 1 : reach === 'left' ? -1 : next() < 0.5 ? -1 : 1;
    const distance = next() * (reach === 'both' ? 30 : 42);
    const x = Math.min(96, Math.max(4, centre + lean * distance - lean * 6));
    const y = 12 + next() * 76;
    const width = 18 + next() * 22 + distance * 0.3;
    const height = 20 + next() * 26;
    const strength = 0.72 + next() * 0.28;
    const a = (share: number) => Math.round(strength * share * 100) / 100;
    return `radial-gradient(ellipse ${round(width)}% ${round(height)}% at ${round(x)}% ${round(y)}%, oklch(${colour} / ${a(1)}) 0%, oklch(${colour} / ${a(0.7)}) 28%, oklch(${colour} / ${a(0.22)}) 52%, transparent 70%)`;
  });
  return washes.join(', ');
};
