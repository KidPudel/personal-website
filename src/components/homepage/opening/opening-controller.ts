import { clamp, smooth } from '../../../lib/motion';
import { openingMotion } from './opening-motion';
import { drawPigmentField } from './pigment-field';

const approach = (current: number, target: number, elapsedSeconds: number) => {
  const delta = target - current;
  const distance = Math.abs(delta);

  if (distance <= openingMotion.settleDistance) return target;

  const preferredSpeed = distance / openingMotion.scrollResponseSeconds;
  const boundedSpeed = Math.min(
    openingMotion.maxProgressPerSecond,
    Math.max(openingMotion.minProgressPerSecond, preferredSpeed),
  );
  const step = Math.min(distance, boundedSpeed * elapsedSeconds);

  return current + Math.sign(delta) * step;
};

class OpeningSequence extends HTMLElement {
  private frame = 0;
  private abort?: AbortController;
  private helloAnimationPlayed = false;
  private thermalHintPlayed = false;

  connectedCallback() {
    if (this.dataset.enhanced) return;
    this.dataset.enhanced = 'true';
    this.abort = new AbortController();

    const sticky = this.querySelector<HTMLElement>('.opening-sequence__sticky');
    const reveal = this.querySelector<HTMLElement>('[data-opening-reveal]');
    const art = this.querySelector<HTMLElement>('[data-opening-art]');
    const instruction = this.querySelector<HTMLElement>('[data-opening-instruction]');
    const essence = this.querySelector<HTMLCanvasElement>('[data-opening-essence]');
    const frames = Array.from(this.querySelectorAll<HTMLElement>('[data-opening-frame]'));
    const page = this.closest<HTMLElement>('[data-homepage]');
    const header = page?.querySelector<HTMLElement>('[data-site-header]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!sticky || !reveal || !art || !instruction || !essence || !frames.length || !page || !header) return;

    const essenceContext = essence.getContext('2d');
    if (!essenceContext) return;

    let openingStart = 0;
    let openingDistance = 1;
    let visualProgress = 0;
    let lastFrameTime: number | undefined;
    let needsMeasurement = true;

    const measure = () => {
      openingStart = window.scrollY + this.getBoundingClientRect().top;
      openingDistance = Math.max(1, this.offsetHeight - window.innerHeight);
      needsMeasurement = false;
    };

    const paint = (progress: number) => {
      const frameProgress = clamp(progress / openingMotion.flipbookUntil);
      const frameIndex = Math.min(frames.length - 1, Math.floor(frameProgress * frames.length));
      const revealProgress = smooth(
        clamp((progress - openingMotion.identityRevealStart) / openingMotion.identityRevealDistance),
      );
      const artOpacity = 1 - smooth(clamp((progress - openingMotion.artFadeStart) / openingMotion.artFadeDistance));
      const instructionOpacity = 1 - smooth(clamp(progress / openingMotion.instructionFadeDistance));
      const headerVisibility = smooth(
        clamp((progress - openingMotion.headerRevealStart) / openingMotion.headerRevealDistance),
      );

      frames.forEach((frame, index) => frame.toggleAttribute('data-active', index === frameIndex));
      this.style.setProperty('--opening-color', openingMotion.frameColors[frameIndex] ?? openingMotion.frameColors[0]);
      this.style.setProperty('--reveal-opacity', String(revealProgress));
      this.style.setProperty('--art-opacity', String(artOpacity));
      this.style.setProperty('--instruction-opacity', String(instructionOpacity));
      this.style.setProperty('--identity-opacity', '1');
      drawPigmentField(essence, essenceContext, this, progress);
      page.style.setProperty('--header-visibility', String(headerVisibility));
      header.inert = headerVisibility < openingMotion.headerInteractiveAt;
      header.toggleAttribute('aria-hidden', headerVisibility < openingMotion.headerInteractiveAt);
      reveal.inert = revealProgress < openingMotion.identityInteractiveAt;
      this.toggleAttribute('data-complete', progress >= openingMotion.completeAt);

      if (!this.helloAnimationPlayed && revealProgress >= 0.72) {
        this.helloAnimationPlayed = true;
        reveal.querySelector('hello-animation')?.dispatchEvent(new CustomEvent('hello-animation-play'));
      }

      if (!this.thermalHintPlayed && revealProgress >= 0.94) {
        this.thermalHintPlayed = true;
        reveal.querySelector('playful-word')?.dispatchEvent(new CustomEvent('thermal-hint'));
      }
    };

    const showCompletedOpening = () => {
      visualProgress = 1;
      this.frame = 0;
      lastFrameTime = undefined;
      paint(visualProgress);
    };

    const requestRender = () => {
      if (this.frame) return;
      this.frame = window.requestAnimationFrame(render);
    };

    const render = (timestamp: number) => {
      this.frame = 0;

      if (reducedMotion.matches || window.location.hash === '#contact') {
        showCompletedOpening();
        return;
      }

      if (needsMeasurement) measure();

      const targetProgress = clamp((window.scrollY - openingStart) / openingDistance);

      if (lastFrameTime === undefined) {
        visualProgress = targetProgress;
      } else {
        const elapsedSeconds = Math.min(
          openingMotion.maxFrameDeltaSeconds,
          Math.max(0, (timestamp - lastFrameTime) / 1000),
        );
        visualProgress = approach(visualProgress, targetProgress, elapsedSeconds);
      }

      lastFrameTime = timestamp;
      paint(visualProgress);

      if (Math.abs(targetProgress - visualProgress) > openingMotion.settleDistance) requestRender();
    };

    const handleResize = () => {
      needsMeasurement = true;
      requestRender();
    };

    const handleMotionPreference = () => {
      lastFrameTime = undefined;
      requestRender();
    };

    window.addEventListener('scroll', requestRender, { passive: true, signal: this.abort.signal });
    window.addEventListener('resize', handleResize, { passive: true, signal: this.abort.signal });
    window.addEventListener('hashchange', requestRender, { signal: this.abort.signal });
    reducedMotion.addEventListener('change', handleMotionPreference, { signal: this.abort.signal });
    render(performance.now());
  }

  disconnectedCallback() {
    this.abort?.abort();
    if (this.frame) window.cancelAnimationFrame(this.frame);
    delete this.dataset.enhanced;
  }
}

if (!customElements.get('opening-sequence')) {
  customElements.define('opening-sequence', OpeningSequence);
}
