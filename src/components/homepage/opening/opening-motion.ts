import { clamp } from '../../../lib/motion';

export const openingMotion = {
  scrollHeightVh: 400,
  boundedScrollViewports: 2,
  transitionScrollViewports: 1,
  restingScrollViewports: 0,
  scrollResponseSeconds: 0.18,
  minProgressPerSecond: 0.14,
  maxProgressPerSecond: 0.72,
  maxFrameDeltaSeconds: 0.04,
  settleDistance: 0.0005,
  forwardBoundaryReleaseAt: 0.7,
  forwardBoundaryResetAt: 0.56,
  touchMomentumMs: 1800,
  essenceFrameIntervalMs: 34,
  essenceProgressStep: 0.0025,
  firstFramePixels: 20,
  scrollHintSlopPx: 10,
  flipbookUntil: 0.54,
  artFadeStart: 0.51,
  artFadeDistance: 0.16,
  identityRevealStart: 0.68,
  identityRevealDistance: 0.17,
  headerRevealStart: 0.78,
  headerRevealDistance: 0.13,
  completeAt: 0.995,
  headerInteractiveAt: 0.86,
  identityInteractiveAt: 0.9,
  frameColors: [
    '#6f8aff',
    '#6f8aff',
    '#6f8aff',
    '#ff85d6',
    '#ff85d6',
    '#ff85d6',
    '#ffe16b',
    '#ffe16b',
    '#5695d0',
    '#5695d0',
    '#5695d0',
  ],
} as const;

const firstFrameUntil = (animationDistance: number) =>
  openingMotion.forwardBoundaryReleaseAt *
  clamp(openingMotion.firstFramePixels / Math.max(1, animationDistance));

export const flipbookFrameIndex = (
  progress: number,
  frameCount: number,
  animationDistance: number,
) => {
  if (frameCount <= 1) return 0;

  const lastFrame = frameCount - 1;
  const lidLiftAt = firstFrameUntil(animationDistance);
  if (progress >= openingMotion.flipbookUntil) return lastFrame;
  if (progress < lidLiftAt) return 0;

  const remaining = clamp(
    (progress - lidLiftAt) / (openingMotion.flipbookUntil - lidLiftAt),
  );

  return 1 + Math.min(lastFrame - 1, Math.floor(remaining * lastFrame));
};
