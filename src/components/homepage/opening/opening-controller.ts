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
    let openingAnimationDistance = 1;
    let openingTransitionDistance = 1;
    let visualProgress = 0;
    let lastFrameTime: number | undefined;
    let needsMeasurement = true;
    let forwardBoundaryActive = false;
    let forwardBoundaryPassed = false;
    let lastEssenceProgress = -1;
    let lastEssencePaintTime = 0;

    const measure = () => {
      openingStart = window.scrollY + this.getBoundingClientRect().top;
      openingDistance = Math.max(1, this.offsetHeight - window.innerHeight);
      const authoredScrollViewports =
        openingMotion.boundedScrollViewports +
        openingMotion.transitionScrollViewports +
        openingMotion.restingScrollViewports;
      const viewportUnit = openingDistance / authoredScrollViewports;
      openingAnimationDistance = Math.max(1, viewportUnit * openingMotion.boundedScrollViewports);
      openingTransitionDistance = Math.max(1, viewportUnit * openingMotion.transitionScrollViewports);
      needsMeasurement = false;
    };

    const scrollProgress = () => {
      const travelled = window.scrollY - openingStart;

      if (travelled <= openingAnimationDistance) {
        return openingMotion.forwardBoundaryReleaseAt * clamp(travelled / openingAnimationDistance);
      }

      const transitionProgress = clamp((travelled - openingAnimationDistance) / openingTransitionDistance);
      return (
        openingMotion.forwardBoundaryReleaseAt +
        (1 - openingMotion.forwardBoundaryReleaseAt) * transitionProgress
      );
    };

    const bypassOpening = () => reducedMotion.matches || window.location.hash.length > 0;

    const releaseForwardBoundary = (markPassed = false) => {
      forwardBoundaryActive = false;
      if (markPassed) forwardBoundaryPassed = true;
      this.removeAttribute('data-forward-boundary');
    };

    const activateForwardBoundary = () => {
      forwardBoundaryActive = true;
      this.setAttribute('data-forward-boundary', '');
    };

    const wheelDistance = (event: WheelEvent) => {
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16;
      if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight;
      return event.deltaY;
    };

    const paint = (progress: number, timestamp: number) => {
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
      const essenceProgressChanged = Math.abs(progress - lastEssenceProgress) >= openingMotion.essenceProgressStep;
      const essenceFrameDue = timestamp - lastEssencePaintTime >= openingMotion.essenceFrameIntervalMs;
      const essenceTerminalState = progress === 0 || progress === 1;

      if (essenceTerminalState || (essenceProgressChanged && essenceFrameDue)) {
        drawPigmentField(essence, essenceContext, this, progress);
        lastEssenceProgress = progress;
        lastEssencePaintTime = timestamp;
      }
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
      releaseForwardBoundary();
      paint(visualProgress, performance.now());
    };

    const requestRender = () => {
      if (this.frame) return;
      this.frame = window.requestAnimationFrame(render);
    };

    const render = (timestamp: number) => {
      this.frame = 0;

      if (bypassOpening()) {
        showCompletedOpening();
        return;
      }

      if (needsMeasurement) measure();

      const targetProgress = scrollProgress();

      if (forwardBoundaryPassed && targetProgress < openingMotion.forwardBoundaryResetAt) {
        forwardBoundaryPassed = false;
      }

      if (forwardBoundaryPassed) {
        visualProgress = targetProgress;
      } else if (lastFrameTime === undefined) {
        visualProgress = targetProgress;
      } else {
        const elapsedSeconds = Math.min(
          openingMotion.maxFrameDeltaSeconds,
          Math.max(0, (timestamp - lastFrameTime) / 1000),
        );
        visualProgress = approach(visualProgress, targetProgress, elapsedSeconds);
      }

      lastFrameTime = timestamp;
      paint(visualProgress, timestamp);

      if (
        forwardBoundaryActive &&
        visualProgress >= openingMotion.forwardBoundaryReleaseAt - openingMotion.settleDistance
      ) {
        releaseForwardBoundary(true);
      }

      if (
        forwardBoundaryActive ||
        (!forwardBoundaryPassed && Math.abs(targetProgress - visualProgress) > openingMotion.settleDistance)
      ) {
        requestRender();
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.deltaY <= 0 || bypassOpening()) return;
      if (forwardBoundaryPassed) return;
      if (needsMeasurement) measure();

      const openingAnimationEnd = Math.max(openingStart, openingStart + openingAnimationDistance - 1);
      const controlledDistance = wheelDistance(event);
      if (controlledDistance <= 0) return;

      // Cancel from the first forward event in the gesture. Trackpad momentum
      // events may become non-cancelable after an earlier event is allowed to
      // scroll natively, so waiting for the event that crosses the boundary is
      // too late. Reapply the same distance synchronously and clamp only at the
      // end of the bounded box-opening phase.
      event.preventDefault();
      const nextScrollY = Math.min(openingAnimationEnd, window.scrollY + controlledDistance);
      window.scrollTo({ top: nextScrollY, left: window.scrollX, behavior: 'instant' });

      if (nextScrollY >= openingAnimationEnd - 1) activateForwardBoundary();

      requestRender();
    };

    const handleScroll = () => {
      if (needsMeasurement) measure();

      if (!bypassOpening()) {
        const openingAnimationEnd = Math.max(openingStart, openingStart + openingAnimationDistance - 1);

        if (forwardBoundaryActive) {
          if (window.scrollY > openingAnimationEnd + 1) {
            window.scrollTo({ top: openingAnimationEnd, left: window.scrollX, behavior: 'instant' });
          } else if (window.scrollY < openingAnimationEnd - 1) {
            // Reverse input is allowed to move the document first. This avoids
            // releasing the boundary because of a momentary opposite-signed
            // trackpad delta that did not actually move back into the opening.
            releaseForwardBoundary();
          }
        } else if (
          !forwardBoundaryPassed &&
          visualProgress < openingMotion.forwardBoundaryReleaseAt &&
          window.scrollY > openingAnimationEnd
        ) {
          // Keyboard, scrollbar, and programmatic movement do not pass through
          // the wheel guard, so keep a small positional fallback for them.
          activateForwardBoundary();
          window.scrollTo({ top: openingAnimationEnd, left: window.scrollX, behavior: 'instant' });
        }
      }

      requestRender();
    };

    const handleResize = () => {
      needsMeasurement = true;
      requestRender();
    };

    const handleMotionPreference = () => {
      lastFrameTime = undefined;
      if (reducedMotion.matches) releaseForwardBoundary();
      requestRender();
    };

    const handleHashChange = () => {
      lastFrameTime = undefined;
      releaseForwardBoundary();
      requestRender();
    };

    window.addEventListener('scroll', handleScroll, { passive: true, signal: this.abort.signal });
    window.addEventListener('wheel', handleWheel, { passive: false, signal: this.abort.signal });
    window.addEventListener('resize', handleResize, { passive: true, signal: this.abort.signal });
    window.addEventListener('hashchange', handleHashChange, { signal: this.abort.signal });
    reducedMotion.addEventListener('change', handleMotionPreference, { signal: this.abort.signal });
    render(performance.now());
  }

  disconnectedCallback() {
    this.abort?.abort();
    if (this.frame) window.cancelAnimationFrame(this.frame);
    this.removeAttribute('data-forward-boundary');
    delete this.dataset.enhanced;
  }
}

if (!customElements.get('opening-sequence')) {
  customElements.define('opening-sequence', OpeningSequence);
}
