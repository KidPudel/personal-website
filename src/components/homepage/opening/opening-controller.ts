import { clamp, smooth } from '../../../lib/motion';
import { flipbookFrameIndex, openingMotion } from './opening-motion';
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
  private wheelAbort?: AbortController;
  private touchScrollTimeout = 0;
  private helloAnimationPlayed = false;
  private helloAnimationPrepared = false;
  private thermalHintPlayed = false;

  connectedCallback() {
    if (this.dataset.enhanced) return;
    this.dataset.enhanced = 'true';
    this.abort = new AbortController();

    const sticky = this.querySelector<HTMLElement>('.opening-sequence__sticky');
    const reveal = this.querySelector<HTMLElement>('[data-opening-reveal]');
    const art = this.querySelector<HTMLElement>('[data-opening-art]');
    const essence = this.querySelector<HTMLCanvasElement>('[data-opening-essence]');
    const scrollHint = this.querySelector<HTMLElement>('[data-opening-scroll-hint]');
    const frames = Array.from(this.querySelectorAll<HTMLElement>('[data-opening-frame]'));
    const page = this.closest<HTMLElement>('[data-homepage]');
    const header = page?.querySelector<HTMLElement>('[data-site-header]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');

    if (!sticky || !reveal || !art || !essence || !scrollHint || !frames.length || !page || !header) {
      return;
    }

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
    let lastPaintedProgress = Number.NaN;
    let lastFrameIndex = -1;
    let touchScrolling = false;
    const primedFrames = new Set<number>([0]);

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

    const usesNativeOpeningScroll = () => coarsePointer.matches || touchScrolling;

    const essenceIntervalMs = () =>
      coarsePointer.matches
        ? openingMotion.essenceFrameIntervalMsCoarse
        : openingMotion.essenceFrameIntervalMs;

    const essenceProgressStep = () =>
      coarsePointer.matches
        ? openingMotion.essenceProgressStepCoarse
        : openingMotion.essenceProgressStep;

    const frameSource = (frame: HTMLElement) =>
      frame.getAttribute('data-src') || frame.getAttribute('src') || '';

    const primeFrame = (index: number) => {
      const frame = frames[index];
      if (!frame || primedFrames.has(index)) return;

      const source = frameSource(frame);
      if (!source) return;

      if (frame.getAttribute('src') !== source) frame.setAttribute('src', source);
      primedFrames.add(index);
      if (frame instanceof HTMLImageElement) void frame.decode().catch(() => undefined);
    };

    const syncFlipbook = (index: number) => {
      primeFrame(index);
      for (let offset = 1; offset <= openingMotion.flipbookDecodeWindow; offset += 1) {
        primeFrame(index + offset);
        primeFrame(index - offset);
      }

      if (index === lastFrameIndex) return;
      lastFrameIndex = index;

      frames.forEach((frame, frameIndex) => {
        const active = frameIndex === index;
        frame.toggleAttribute('data-active', active);
        frame.hidden = !active;
      });
    };

    const releaseForwardBoundary = (markPassed = false) => {
      forwardBoundaryActive = false;
      if (markPassed) forwardBoundaryPassed = true;
      this.removeAttribute('data-forward-boundary');
      syncWheelGuard();
    };

    const activateForwardBoundary = () => {
      forwardBoundaryActive = true;
      this.setAttribute('data-forward-boundary', '');
    };

    const setWheelGuard = (enabled: boolean) => {
      if (enabled) {
        if (this.wheelAbort) return;
        this.wheelAbort = new AbortController();
        window.addEventListener('wheel', handleWheel, {
          passive: false,
          signal: this.wheelAbort.signal,
        });
        return;
      }

      this.wheelAbort?.abort();
      this.wheelAbort = undefined;
    };

    const syncWheelGuard = () => {
      setWheelGuard(!bypassOpening() && !forwardBoundaryPassed && !usesNativeOpeningScroll());
    };

    const beginTouchScroll = () => {
      touchScrolling = true;
      window.clearTimeout(this.touchScrollTimeout);
      this.touchScrollTimeout = 0;
      if (forwardBoundaryActive) releaseForwardBoundary();
      syncWheelGuard();
    };

    const endTouchScroll = () => {
      window.clearTimeout(this.touchScrollTimeout);
      this.touchScrollTimeout = window.setTimeout(() => {
        this.touchScrollTimeout = 0;
        touchScrolling = false;
        syncWheelGuard();
      }, openingMotion.touchMomentumMs);
    };

    const wheelDistance = (event: WheelEvent) => {
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16;
      if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight;
      return event.deltaY;
    };

    const hideScrollHint = () => {
      this.removeAttribute('data-scroll-hint');
    };

    let hintGesture:
      | { pointerId: number; x: number; y: number; scrollY: number }
      | undefined;

    const clearHintGesture = () => {
      hintGesture = undefined;
    };

    const hintGestureMoved = (x: number, y: number) => {
      if (!hintGesture) return false;
      const slop = openingMotion.scrollHintSlopPx;
      const dx = x - hintGesture.x;
      const dy = y - hintGesture.y;
      return dx * dx + dy * dy > slop * slop;
    };

    const handleHintPointerDown = (event: PointerEvent) => {
      if (!event.isPrimary) return;
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      hintGesture = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        scrollY: window.scrollY,
      };
    };

    const handleHintPointerMove = (event: PointerEvent) => {
      if (!hintGesture || event.pointerId !== hintGesture.pointerId) return;
      if (hintGestureMoved(event.clientX, event.clientY)) clearHintGesture();
    };

    const handleHintPointerCancel = (event: PointerEvent) => {
      if (!hintGesture || event.pointerId !== hintGesture.pointerId) return;
      clearHintGesture();
    };

    const handleHintTouchMove = (event: TouchEvent) => {
      const touch = event.touches.item(0);
      if (!hintGesture || !touch) return;
      if (hintGestureMoved(touch.clientX, touch.clientY)) clearHintGesture();
    };

    const placeScrollHint = (event: MouseEvent) => {
      const bounds = sticky.getBoundingClientRect();
      const pad = 16;
      const halfWidth = scrollHint.offsetWidth / 2;
      const halfHeight = scrollHint.offsetHeight / 2;
      const minX = halfWidth + pad;
      const maxX = Math.max(minX, bounds.width - halfWidth - pad);
      const minY = halfHeight + pad;
      const maxY = Math.max(minY, bounds.height - halfHeight - pad);
      const x = Math.min(maxX, Math.max(minX, event.clientX - bounds.left));
      const y = Math.min(maxY, Math.max(minY, event.clientY - bounds.top));
      scrollHint.style.setProperty('--hint-x', `${x}px`);
      scrollHint.style.setProperty('--hint-y', `${y}px`);
    };

    const showScrollHint = (event: MouseEvent) => {
      if (bypassOpening()) return;
      if (needsMeasurement) measure();
      if (window.scrollY - openingStart > 0) return;
      if (flipbookFrameIndex(visualProgress, frames.length, openingAnimationDistance) > 0) return;

      placeScrollHint(event);
      hideScrollHint();
      void this.offsetWidth;
      this.setAttribute('data-scroll-hint', '');
    };

    const handleOpeningClick = (event: MouseEvent) => {
      const gesture = hintGesture;
      clearHintGesture();
      if (!gesture) return;
      if (window.scrollY !== gesture.scrollY) return;
      if (!(event.target instanceof Element)) return;
      if (event.target.closest('a, button')) return;
      showScrollHint(event);
    };

    const paint = (progress: number, timestamp: number) => {
      const frameIndex = flipbookFrameIndex(progress, frames.length, openingAnimationDistance);
      const revealProgress = smooth(
        clamp((progress - openingMotion.identityRevealStart) / openingMotion.identityRevealDistance),
      );
      const artOpacity = 1 - smooth(clamp((progress - openingMotion.artFadeStart) / openingMotion.artFadeDistance));
      const headerVisibility = smooth(
        clamp((progress - openingMotion.headerRevealStart) / openingMotion.headerRevealDistance),
      );
      const essenceTerminalState = progress === 0 || progress === 1;
      const essenceProgressChanged = Math.abs(progress - lastEssenceProgress) >= essenceProgressStep();
      const essenceFrameDue = timestamp - lastEssencePaintTime >= essenceIntervalMs();
      const shouldPaintEssence =
        (essenceTerminalState && lastEssenceProgress !== progress) ||
        (!essenceTerminalState && essenceProgressChanged && essenceFrameDue);
      const progressUnchanged = progress === lastPaintedProgress;

      if (!this.helloAnimationPrepared && revealProgress >= 0.45) {
        this.helloAnimationPrepared = true;
        reveal.querySelector('hello-animation')?.dispatchEvent(new CustomEvent('hello-animation-prepare'));
      }

      if (!this.helloAnimationPlayed && revealProgress >= 0.72) {
        this.helloAnimationPlayed = true;
        reveal.querySelector('hello-animation')?.dispatchEvent(new CustomEvent('hello-animation-play'));
      }

      if (!this.thermalHintPlayed && revealProgress >= 0.94) {
        this.thermalHintPlayed = true;
        reveal.querySelector('playful-word')?.dispatchEvent(new CustomEvent('thermal-hint'));
      }

      if (progressUnchanged && !shouldPaintEssence) return;

      lastPaintedProgress = progress;
      syncFlipbook(frameIndex);
      if (frameIndex > 0 || progress > 0) hideScrollHint();
      this.style.setProperty('--opening-color', openingMotion.frameColors[frameIndex] ?? openingMotion.frameColors[0]);
      this.style.setProperty('--reveal-opacity', String(revealProgress));
      this.style.setProperty('--art-opacity', String(artOpacity));
      this.style.setProperty('--identity-opacity', '1');
      this.toggleAttribute('data-opening-live', progress > 0 && progress < openingMotion.completeAt);
      reveal.toggleAttribute('data-visible', revealProgress > 0.02);

      if (shouldPaintEssence) {
        drawPigmentField(essence, essenceContext, this, progress);
        lastEssenceProgress = progress;
        lastEssencePaintTime = timestamp;
      }

      page.style.setProperty('--header-visibility', String(headerVisibility));
      header.inert = headerVisibility < openingMotion.headerInteractiveAt;
      header.toggleAttribute('aria-hidden', headerVisibility < openingMotion.headerInteractiveAt);
      reveal.inert = revealProgress < openingMotion.identityInteractiveAt;
      this.toggleAttribute('data-complete', progress >= openingMotion.completeAt);
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
        syncWheelGuard();
      }

      if (forwardBoundaryPassed || usesNativeOpeningScroll()) {
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
      if (event.deltaY <= 0 || bypassOpening() || usesNativeOpeningScroll()) return;
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
      if (hintGesture && window.scrollY !== hintGesture.scrollY) clearHintGesture();
      if (needsMeasurement) measure();

      // Touch and other coarse pointers must keep native compositor scrolling.
      // scrollTo clamping against iOS momentum locks the page into a stuttering
      // fight until the visual follower happens to release the boundary.
      if (!bypassOpening() && !usesNativeOpeningScroll()) {
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

      if (
        this.hasAttribute('data-complete') &&
        !forwardBoundaryActive &&
        window.scrollY >= openingStart + openingDistance - 1
      ) {
        return;
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
      syncWheelGuard();
      requestRender();
    };

    const handleHashChange = () => {
      lastFrameTime = undefined;
      releaseForwardBoundary();
      requestRender();
    };

    sticky.addEventListener('pointerdown', handleHintPointerDown, {
      signal: this.abort.signal,
    });
    window.addEventListener('pointermove', handleHintPointerMove, {
      passive: true,
      signal: this.abort.signal,
    });
    window.addEventListener('pointercancel', handleHintPointerCancel, {
      signal: this.abort.signal,
    });
    window.addEventListener('touchmove', handleHintTouchMove, {
      passive: true,
      signal: this.abort.signal,
    });
    sticky.addEventListener('click', handleOpeningClick, { signal: this.abort.signal });
    window.addEventListener('scroll', handleScroll, { passive: true, signal: this.abort.signal });
    window.addEventListener('resize', handleResize, { passive: true, signal: this.abort.signal });
    window.addEventListener('touchstart', beginTouchScroll, { passive: true, signal: this.abort.signal });
    window.addEventListener('touchend', endTouchScroll, { passive: true, signal: this.abort.signal });
    window.addEventListener('touchcancel', endTouchScroll, { passive: true, signal: this.abort.signal });
    window.addEventListener('hashchange', handleHashChange, { signal: this.abort.signal });
    reducedMotion.addEventListener('change', handleMotionPreference, { signal: this.abort.signal });
    coarsePointer.addEventListener('change', syncWheelGuard, { signal: this.abort.signal });
    syncWheelGuard();
    render(performance.now());
  }

  disconnectedCallback() {
    window.clearTimeout(this.touchScrollTimeout);
    this.touchScrollTimeout = 0;
    this.wheelAbort?.abort();
    this.wheelAbort = undefined;
    this.abort?.abort();
    this.removeAttribute('data-scroll-hint');
    if (this.frame) window.cancelAnimationFrame(this.frame);
    this.removeAttribute('data-forward-boundary');
    delete this.dataset.enhanced;
  }
}

if (!customElements.get('opening-sequence')) {
  customElements.define('opening-sequence', OpeningSequence);
}
