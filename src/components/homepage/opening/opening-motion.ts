export const openingMotion = {
  greetingFrameDurationMs: 82,
  greetingHoldMs: 300,
  handoffDurationMs: 800,
  contentRevealDelayMs: 90,
  contentRevealDurationMs: 720,
  greetingCrossfadeStart: 0.82,
  thermalHintDelayMs: 500,
  skipFadeMs: 240,
  skyOpacityAtStart: 0.5,
  skyOpacityAtIntro: 0.25,
  easeOut: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeHandoff: 'cubic-bezier(0.45, 0, 0.2, 1)',
} as const;
