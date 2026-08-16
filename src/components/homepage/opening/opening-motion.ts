import { clamp } from '../../../lib/motion';

export const openingMotion = {
  scrollHeightVh: 300,
  firstFramePixels: 24,
  scrollHintSlopPx: 10,
  scrollHintOffsetXPx: 56,
  scrollHintOffsetYPx: -40,
  scrollHintPhrases: [
    'try scrolling',
    'no, really',
    'dude',
    'just do it',
    'don’t want to scroll?',
    'okay',
    'then just hire me :)',
  ] as const,
  flipbookDecodeWindow: 1,
  flipbookUntil: 0.28,
  contentRevealFrame: 7,
  boxFallDistanceVh: 32,
  boxFallPower: 1.2,
  boxSupportDistanceVh: 0,
  boxSupportScaleLoss: 0.22,
  identityRevealDistance: 0.7,
  identityBeats: [0, 0.2, 0.4, 0.6, 0.8] as const,
  identityBeatReveal: 0.14,
  introExitDistanceVh: 62,
  completeAt: 0.995,
} as const;

const firstFrameUntil = (animationDistance: number) =>
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

export const contentRevealStart = (frameCount: number, animationDistance: number) => {
  const frame = openingMotion.contentRevealFrame;
  if (frameCount <= 1 || frame <= 1) return 0;

  const lidLiftAt = firstFrameUntil(animationDistance);
  if (frame >= frameCount) return openingMotion.flipbookUntil;

  const remaining = (frame - 2) / Math.max(1, frameCount - 1);
  return lidLiftAt + remaining * (openingMotion.flipbookUntil - lidLiftAt);
};

export const identityBeatProgress = (identityReveal: number, index: number) => {
  const start = openingMotion.identityBeats[index] ?? 1;
  return clamp((identityReveal - start) / openingMotion.identityBeatReveal);
};

export const boxFallAmount = (progress: number) =>
  progress <= 0 ? 0 : progress >= 1 ? 1 : progress ** openingMotion.boxFallPower;

export const isScrollHintHire = (index: number) =>
  index === openingMotion.scrollHintPhrases.length - 1;
