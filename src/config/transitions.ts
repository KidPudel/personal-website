import type { TransitionDirectionalAnimations } from 'astro';

const paperChange = {
  old: {
    name: 'paper-leave',
    duration: '180ms',
    easing: 'ease-in',
    fillMode: 'both',
  },
  new: {
    name: 'paper-enter',
    delay: '160ms',
    duration: '240ms',
    easing: 'cubic-bezier(.2,.75,.25,1)',
    fillMode: 'both',
  },
} as const;

export const paperTransition: TransitionDirectionalAnimations = {
  forwards: paperChange,
  backwards: paperChange,
};
