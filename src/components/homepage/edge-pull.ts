// The elastic edge (elastic-overscroll-backdrop.ts) owns the pull physics for
// both page edges. The top edge paints its own pigment; the bottom edge only
// lifts the page and reports how far, so the footer garden can show what
// grows beneath it and bloom while the pull is held.
export const EDGE_PULL_EVENT = 'elastic-edge-pull';

export interface EdgePullDetail {
  placement?: 'top' | 'bottom';
  pull: number;
  maximum: number;
}

// How far the page can lift at the bottom: enough to look down past the
// stems to the ground.
export const bottomPullExtent = (viewportHeight = window.innerHeight) =>
  Math.round(Math.min(280, Math.max(160, viewportHeight * 0.32)));
