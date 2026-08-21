import { clamp, smooth } from '../../../lib/motion';

type BoxPose = {
  anchor: number;
  scale: number;
  y: number;
};

const mix = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

export function setupJourneyBoxMotion(root: HTMLElement, signal: AbortSignal) {
  const motion = root.querySelector<HTMLElement>('.opening-sequence__motion');
  const selectedWork = root.querySelector<HTMLElement>('#selected-work');
  const sideWork = root.querySelector<HTMLElement>('#side-work');
  const values = root.querySelector<HTMLElement>('#values');
  const personal = root.querySelector<HTMLElement>('#personal');
  const closingNavigation = root.querySelector<HTMLElement>('.portfolio-navigation--footer');
  if (!motion || !selectedWork || !sideWork || !personal || !values || !closingNavigation) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = window.matchMedia('(max-width: 50rem)');
  let frame = 0;
  let poses: BoxPose[] = [];

  const documentTop = (element: HTMLElement) =>
    window.scrollY + element.getBoundingClientRect().top;

  const measure = () => {
    const viewport = window.innerHeight;
    const selectedTop = documentTop(selectedWork);
    const sideTop = documentTop(sideWork);
    const valuesTop = documentTop(values);
    const personalTop = documentTop(personal);
    const closingTop = documentTop(closingNavigation);

    if (narrow.matches) {
      poses = [
        { anchor: selectedTop - viewport * 0.85, y: 0, scale: 1 },
        { anchor: selectedTop - viewport * 0.2, y: -28, scale: 0.48 },
        { anchor: sideTop, y: -28, scale: 0.48 },
        { anchor: valuesTop - viewport * 0.35, y: -28, scale: 0.5 },
        { anchor: personalTop - viewport * 0.35, y: 0, scale: 1 },
        { anchor: closingTop - viewport * 0.5, y: 0, scale: 1 },
      ];
      return;
    }

    poses = [
      { anchor: selectedTop - viewport * 0.85, y: 0, scale: 1 },
      { anchor: selectedTop - viewport * 0.12, y: -4, scale: 0.82 },
      { anchor: sideTop - viewport * 0.28, y: -18, scale: 0.66 },
      { anchor: valuesTop - viewport * 0.35, y: -3, scale: 0.72 },
      { anchor: personalTop - viewport * 0.35, y: 0, scale: 1 },
      { anchor: closingTop - viewport * 0.5, y: 0, scale: 1 },
    ];
  };

  const clear = () => {
    motion.style.removeProperty('--box-journey-y');
    motion.style.removeProperty('--box-journey-scale');
  };

  const render = () => {
    frame = 0;
    if (reducedMotion.matches || document.documentElement.classList.contains('opening-bypassed')) {
      clear();
      root.dispatchEvent(new CustomEvent('journey-box-painted'));
      return;
    }
    if (poses.length < 2) measure();

    const position = window.scrollY;
    let from = poses[0];
    let to = poses[1];
    for (let index = 1; index < poses.length; index += 1) {
      to = poses[index];
      if (position <= to.anchor) break;
      from = to;
    }

    const distance = Math.max(1, to.anchor - from.anchor);
    const progress = from === to ? 1 : smooth(clamp((position - from.anchor) / distance));
    motion.style.setProperty('--box-journey-y', `${mix(from.y, to.y, progress).toFixed(3)}vh`);
    motion.style.setProperty('--box-journey-scale', mix(from.scale, to.scale, progress).toFixed(4));
    root.dispatchEvent(new CustomEvent('journey-box-painted'));
  };

  const requestRender = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(render);
  };

  const remeasure = () => {
    measure();
    requestRender();
  };

  window.addEventListener('scroll', requestRender, { passive: true, signal });
  window.addEventListener('resize', remeasure, { passive: true, signal });
  root.addEventListener('opening-bypass-changed', requestRender, { signal });
  narrow.addEventListener('change', remeasure, { signal });
  reducedMotion.addEventListener('change', requestRender, { signal });
  signal.addEventListener('abort', () => {
    if (frame) window.cancelAnimationFrame(frame);
    clear();
  }, { once: true });
  void document.fonts.ready.then(() => {
    if (!signal.aborted) remeasure();
  });

  measure();
  render();
}
