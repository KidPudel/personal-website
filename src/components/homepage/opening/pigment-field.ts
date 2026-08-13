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

const energyDirections = [
  { angle: -3.02, reach: 0.34, width: 0.1 },
  { angle: -2.72, reach: 0.66, width: 0.14 },
  { angle: -2.29, reach: 0.42, width: 0.12 },
  { angle: -1.91, reach: 0.76, width: 0.11 },
  { angle: -1.49, reach: 1, width: 0.1 },
  { angle: -1.08, reach: 0.48, width: 0.13 },
  { angle: -0.72, reach: 0.82, width: 0.11 },
  { angle: -0.3, reach: 0.5, width: 0.14 },
  { angle: 0.05, reach: 0.9, width: 0.1 },
  { angle: 0.45, reach: 0.42, width: 0.12 },
  { angle: 0.83, reach: 0.72, width: 0.11 },
  { angle: 1.29, reach: 0.56, width: 0.13 },
  { angle: 1.58, reach: 0.92, width: 0.1 },
  { angle: 2.02, reach: 0.5, width: 0.12 },
  { angle: 2.43, reach: 0.8, width: 0.11 },
  { angle: 2.88, reach: 0.58, width: 0.13 },
] as const;

export const pigmentMotion = {
  growthStart: 0.335,
  growthDistance: 0.405,
  revealStart: 0.7,
  revealDistance: 0.19,
  echoStart: 0.77,
  echoDistance: 0.2,
  worldReactionStart: 0.31,
  worldReactionDistance: 0.38,
  worldReactionFadeStart: 0.62,
  worldReactionFadeDistance: 0.13,
  frontAt: 0.61,
} as const;

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

const angularDistance = (first: number, second: number) =>
  Math.abs(Math.atan2(Math.sin(first - second), Math.cos(first - second)));

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

const fieldSample = (x: number, y: number, growth: number) => {
  const dx = x - 0.5;
  const dy = y - (0.53 - growth * 0.015);
  const skewedX = dx + dy * 0.16;
  const viewportAspect = window.innerWidth / window.innerHeight;
  const seedVerticalRadius = Math.min(0.48, Math.max(0.12, (0.6 * viewportAspect) / 2.2));
  const verticalRadius =
    seedVerticalRadius + (0.48 - seedVerticalRadius) * smooth(clamp((growth - 0.18) / 0.82));
  const normalizedX = skewedX / 0.6;
  const normalizedY = dy / verticalRadius;
  const baseRadial = Math.hypot(normalizedX, normalizedY);
  const angle = Math.atan2(normalizedY, normalizedX);
  const energy = smooth(clamp((growth - 0.12) / 0.74));
  const turbulence = fluidNoise(normalizedX * 2.35 + growth * 0.62, normalizedY * 2.35 - growth * 0.46) - 0.5;
  const crossCurrent = fluidNoise(normalizedY * 3.1 + 8.3, normalizedX * 3.1 - 4.2) - 0.5;
  const vortex = energy * smooth(clamp((baseRadial - 0.015) / 0.82));
  const warpedAngle =
    angle +
    vortex *
      (Math.sin(baseRadial * 5.2 - 1.05) * 0.27 +
        Math.sin(angle * 2.4 + baseRadial * 7.6 + 0.3) * 0.12 +
        turbulence * 0.52 +
        crossCurrent * 0.2);
  const radial = Math.max(
    0,
    baseRadial * (1 + energy * (turbulence * 0.14 + crossCurrent * 0.07)) +
      energy * Math.sin(warpedAngle * 4.1 + baseRadial * 8.8) * 0.032,
  );
  const flowAngle =
    warpedAngle +
    energy *
      (Math.sin(radial * 3.8 + 0.8) * 0.12 +
        Math.sin(radial * 7.2 - 0.55) * 0.055 +
        Math.sin(warpedAngle * 3.2 - radial * 10.4) * 0.032);
  const flare = smooth(clamp((radial - 0.018) / 0.52));
  const contour =
    1 +
    Math.sin(flowAngle * 3 + 0.7) * (0.022 + growth * 0.032) +
    Math.cos(flowAngle * 5 - 0.45) * (0.014 + growth * 0.022) +
    Math.sin(flowAngle * 11 + radial * 3.1) * energy * 0.022 +
    Math.sin(flowAngle * 4.6 - radial * 11.5 + turbulence * 5.2) * energy * 0.035 +
    crossCurrent * energy * 0.032;
  let directionalReach = 0;

  for (const direction of energyDirections) {
    const distance = angularDistance(flowAngle, direction.angle);
    const profile = 1 - smooth(clamp(distance / direction.width));
    directionalReach += direction.reach * profile;
  }

  const reach =
    1 + energy * flare * directionalReach + energy * flare * Math.sin(flowAngle * 8.5 + radial * 4.4) * 0.07;

  return {
    distance: radial / Math.max(0.58, contour * reach),
    flowAngle,
    radial,
  };
};

const pigmentPosition = (band: number, flowAngle: number, radial: number, growth: number) => {
  const fluidDrift =
    smooth(clamp((growth - 0.2) / 0.7)) *
    (Math.sin(flowAngle * 2.1 - radial * 4.8) * 0.026 + Math.sin(flowAngle * 4.2 + radial * 7.1) * 0.012);

  return Math.min(0.975, clamp(Math.pow(band, 0.82) * (1.02 + growth * 0.025) + fluidDrift));
};

export const drawPigmentField = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  host: HTMLElement,
  progress: number,
) => {
  const targetWidth = Math.max(64, Math.min(144, Math.round(window.innerWidth / 12)));
  const targetHeight = Math.max(64, Math.min(144, Math.round(window.innerHeight / 12)));

  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth;
    canvas.height = targetHeight;
  }

  const growth = clamp((progress - pigmentMotion.growthStart) / pigmentMotion.growthDistance);
  const reveal = smooth(clamp((progress - pigmentMotion.revealStart) / pigmentMotion.revealDistance));
  const echoLife = clamp((progress - pigmentMotion.echoStart) / pigmentMotion.echoDistance);
  const echoEnvelope = Math.sin(echoLife * Math.PI) * 0.2;
  const worldReaction =
    Math.sin(Math.PI * clamp((progress - pigmentMotion.worldReactionStart) / pigmentMotion.worldReactionDistance)) *
    (1 - smooth(clamp((progress - pigmentMotion.worldReactionFadeStart) / pigmentMotion.worldReactionFadeDistance)));

  host.style.setProperty('--world-reaction', String(Math.max(0, worldReaction)));
  canvas.toggleAttribute('data-visible', growth > 0 && (reveal < 1 || echoEnvelope > 0.001));
  canvas.toggleAttribute('data-front', progress >= pigmentMotion.frontAt);

  if (growth <= 0 || (reveal >= 1 && echoEnvelope <= 0.001)) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  const image = context.createImageData(canvas.width, canvas.height);
  const overshoot = Math.sin(Math.PI * clamp((growth - 0.58) / 0.42)) * 0.065;
  const radius = 0.035 + (smooth(growth) + overshoot) * 1.48;
  const baseOpacity = 1 - reveal;

  for (let y = 0; y < canvas.height; y += 1) {
    for (let x = 0; x < canvas.width; x += 1) {
      const normalizedX = x / Math.max(1, canvas.width - 1);
      const normalizedY = y / Math.max(1, canvas.height - 1);
      const sample = fieldSample(normalizedX, normalizedY, growth);
      const band = sample.distance / radius;
      const edge = 1 - smooth(clamp((band - 0.965) / 0.1));
      const baseAlpha = edge * baseOpacity;
      const echoWarp = echoLife * 0.065;
      const echoSample = fieldSample(
        normalizedX + Math.sin(normalizedY * 11 + echoLife * 4.2) * echoWarp,
        normalizedY + Math.sin(normalizedX * 9 - echoLife * 3.4) * echoWarp * 0.72,
        1,
      );
      const echoBand = echoSample.distance / (radius * (0.9 + echoLife * 0.16));
      const echoPhase =
        echoSample.flowAngle * 5.25 + echoSample.radial * 1.45 + Math.sin(echoSample.flowAngle * 9 - 0.4) * 0.24;
      const echoSpokes = 1 - smooth(clamp(Math.abs(Math.sin(echoPhase)) / 0.22));
      const echoSpan = smooth(clamp((echoBand - 0.16) / 0.16)) * (1 - smooth(clamp((echoBand - 0.82) / 0.14)));
      const echoBreakup = smooth(
        clamp(
          (Math.sin(echoBand * 29 + Math.sin(echoSample.flowAngle * 4.5) * 1.35 - echoLife * 8) - 0.04) / 0.76,
        ),
      );
      const echoAlpha = echoSpokes * echoSpan * (0.3 + echoBreakup * 0.7) * echoEnvelope;
      const alpha = clamp(baseAlpha + echoAlpha * (1 - baseAlpha));

      if (alpha <= 0.002) continue;

      const baseColor = paletteColor(pigmentPosition(band, sample.flowAngle, sample.radial, growth));
      const echoColor = paletteColor(
        pigmentPosition(echoBand, echoSample.flowAngle + echoLife * 0.38, echoSample.radial, 1),
      );
      const echoMix = alpha > 0 ? echoAlpha / (baseAlpha + echoAlpha) : 0;
      const pixelIndex = (y * canvas.width + x) * 4;

      image.data[pixelIndex] = Math.round(baseColor[0] + (echoColor[0] - baseColor[0]) * echoMix);
      image.data[pixelIndex + 1] = Math.round(baseColor[1] + (echoColor[1] - baseColor[1]) * echoMix);
      image.data[pixelIndex + 2] = Math.round(baseColor[2] + (echoColor[2] - baseColor[2]) * echoMix);
      image.data[pixelIndex + 3] = Math.round(alpha * 255);
    }
  }

  context.putImageData(image, 0, 0);
};
