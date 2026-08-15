import { clamp, smooth } from '../../../lib/motion';

const essencePalette = [
  { stop: 0, color: [14, 40, 137] },
  { stop: 0.27, color: [63, 153, 237] },
  { stop: 0.47, color: [227, 244, 255] },
  { stop: 0.55, color: [248, 217, 65] },
  { stop: 0.75, color: [252, 86, 41] },
  { stop: 0.8, color: [250, 66, 60] },
  { stop: 1, color: [253, 54, 237] },
] as const;

export const essenceChannel = (index: number) => {
  const color = essencePalette[index]?.color ?? essencePalette[0].color;
  return `${color[0]} ${color[1]} ${color[2]}`;
};

const paletteColor = (value: number) => {
  const position = clamp(value);
  const upperIndex = essencePalette.findIndex(({ stop }) => stop >= position);

  if (upperIndex <= 0) return essencePalette[0].color;
  if (upperIndex < 0) return essencePalette[essencePalette.length - 1].color;

  const lower = essencePalette[upperIndex - 1];
  const upper = essencePalette[upperIndex];
  const mix = (position - lower.stop) / (upper.stop - lower.stop);

  return lower.color.map((channel, index) =>
    Math.round(channel + (upper.color[index] - channel) * mix),
  );
};

const fract = (value: number) => value - Math.floor(value);
const noiseHash = (x: number, y: number) => fract(Math.sin(x * 127.1 + y * 311.7) * 43758.5453);

const valueNoise = (x: number, y: number) => {
  const cellX = Math.floor(x);
  const cellY = Math.floor(y);
  const localX = smooth(fract(x));
  const localY = smooth(fract(y));
  const top = noiseHash(cellX, cellY) + (noiseHash(cellX + 1, cellY) - noiseHash(cellX, cellY)) * localX;
  const bottom =
    noiseHash(cellX, cellY + 1) + (noiseHash(cellX + 1, cellY + 1) - noiseHash(cellX, cellY + 1)) * localX;

  return top + (bottom - top) * localY;
};

const fluidNoise = (x: number, y: number) =>
  valueNoise(x, y) * 0.56 +
  valueNoise(x * 2.03 + 17.2, y * 2.03 - 11.8) * 0.29 +
  valueNoise(x * 4.11 - 7.4, y * 4.11 + 5.6) * 0.15;

export const sampleEssenceColor = paletteColor;
export const sampleEssenceNoise = fluidNoise;
