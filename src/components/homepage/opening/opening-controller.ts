import { clamp, smooth } from '../../../lib/motion';
import {
  boxFallAmount,
  contentRevealStart,
  flipbookFrameIndex,
  identityBeatProgress,
  isScrollHintHire,
  openingMotion,
} from './opening-motion';

class OpeningSequence extends HTMLElement {
  private frame = 0;
  private abort?: AbortController;
  private helloAnimationPlayed = false;
  private helloAnimationPrepared = false;
  private thermalHintPlayed = false;

  connectedCallback() {
    if (this.dataset.enhanced) return;
    this.dataset.enhanced = 'true';
    this.abort = new AbortController();

    const boxStage = this.querySelector<HTMLElement>('[data-opening-art]');
    const runway = this.querySelector<HTMLElement>('[data-opening-runway]');
    const reveal = this.querySelector<HTMLElement>('[data-opening-reveal]');
    const identityIntro = reveal?.querySelector<HTMLElement>('.identity__intro') ?? null;
    const identityPortrait = reveal?.querySelector<HTMLElement>('.identity__portrait') ?? null;
    const scrollHint = this.querySelector<HTMLElement>('[data-opening-scroll-hint]');
    const hintCard = this.querySelector<HTMLElement>('[data-opening-scroll-hint-card]');
    const hintPhrase = this.querySelector<HTMLElement>('[data-opening-scroll-hint-phrase]');
    const hintContact = this.querySelector<HTMLElement>('[data-opening-scroll-hint-contact]');
    const frames = Array.from(this.querySelectorAll<HTMLElement>('[data-opening-frame]'));
    const page = this.closest<HTMLElement>('[data-homepage]');
    const header = page?.querySelector<HTMLElement>('[data-site-header]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let alignedHash = '';

    if (
      !boxStage ||
      !runway ||
      !reveal ||
      !identityIntro ||
      !scrollHint ||
      !hintCard ||
      !hintPhrase ||
      !hintContact ||
      !frames.length ||
      !page ||
      !header
    ) {
      return;
    }

    let openingStart = 0;
    let openingDistance = 1;
    let needsMeasurement = true;
    const paintIntroExit = (bypassed: boolean) => {
      const edge = openingStart + openingDistance;
      const distance = Math.max(1, window.innerHeight * openingMotion.introExitDistanceVh / 100);
      const progress = bypassed ? 0 : clamp((window.scrollY - edge) / distance);
      const opacity = 1 - progress;
      const translate = `${(-progress * 108).toFixed(3)}%`;
      const introHasLeft = progress >= 0.999;

      identityIntro.style.setProperty('--intro-exit-y', translate);
      identityIntro.style.opacity = opacity.toFixed(4);
      identityPortrait?.style.setProperty('--intro-exit-y', translate);
      identityPortrait?.style.setProperty('--intro-exit-opacity', opacity.toFixed(4));
      this.toggleAttribute('data-intro-exiting', progress > 0 && progress < 1);
      this.toggleAttribute('data-intro-left', introHasLeft);
      identityIntro.inert = introHasLeft;
      identityIntro.toggleAttribute('aria-hidden', introHasLeft);
      return progress;
    };
    let lastFrameIndex = -1;
    const primedFrames = new Set<number>([0]);

    const measure = () => {
      openingStart = window.scrollY + this.getBoundingClientRect().top;
      openingDistance = Math.max(1, runway.offsetHeight - window.innerHeight);
      needsMeasurement = false;
    };

    const scrollProgress = () => {
      if (needsMeasurement) measure();
      return Math.min(1, Math.max(0, (window.scrollY - openingStart) / openingDistance));
    };

    const bypassOpening = () => reducedMotion.matches || window.location.hash.length > 0;

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

    let hintIndex = 0;

    const hideScrollHint = (resetSequence = false) => {
      const focused = document.activeElement;
      if (focused instanceof HTMLElement && hintContact.contains(focused)) focused.blur();

      this.removeAttribute('data-scroll-hint');
      scrollHint.setAttribute('aria-hidden', 'true');
      hintContact.hidden = true;
      if (resetSequence) hintIndex = 0;
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
      const bounds = boxStage.getBoundingClientRect();
      const pad = 16;
      const halfWidth = hintCard.offsetWidth / 2;
      const halfHeight = hintCard.offsetHeight / 2;
      const minX = halfWidth + pad;
      const maxX = Math.max(minX, bounds.width - halfWidth - pad);
      const minY = halfHeight + pad;
      const maxY = Math.max(minY, bounds.height - halfHeight - pad);
      const clickX = event.clientX - bounds.left;
      const clickY = event.clientY - bounds.top;
      const offsetX = openingMotion.scrollHintOffsetXPx;
      const offsetY = openingMotion.scrollHintOffsetYPx;
      const x = Math.min(
        maxX,
        Math.max(minX, clickX + (clickX + offsetX > maxX ? -offsetX : offsetX)),
      );
      const y = Math.min(
        maxY,
        Math.max(minY, clickY + (clickY + offsetY < minY ? -offsetY : offsetY)),
      );
      scrollHint.style.setProperty('--hint-x', `${x}px`);
      scrollHint.style.setProperty('--hint-y', `${y}px`);
    };

    const showScrollHint = (event: MouseEvent) => {
      if (bypassOpening()) return;
      if (needsMeasurement) measure();
      if (window.scrollY - openingStart > 0) return;
      if (flipbookFrameIndex(scrollProgress(), frames.length, openingDistance) > 0) return;

      const phrases = openingMotion.scrollHintPhrases;
      const isHire = isScrollHintHire(hintIndex);
      hintPhrase.textContent = phrases[hintIndex] ?? phrases[0];
      hintIndex = (hintIndex + 1) % phrases.length;

      hideScrollHint();
      hintContact.hidden = !isHire;
      scrollHint.toggleAttribute('aria-hidden', !isHire);
      if (!isHire) placeScrollHint(event);
      void this.offsetWidth;
      this.setAttribute('data-scroll-hint', isHire ? 'hire' : 'note');
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

    const paint = (progress: number) => {
      const frameIndex = flipbookFrameIndex(progress, frames.length, openingDistance);
      const identityReveal = clamp(
        (progress - contentRevealStart(frames.length, openingDistance)) /
          Math.max(openingMotion.identityRevealDistance, 0.0001),
      );
      const bypassed = bypassOpening();
      const introExit = paintIntroExit(bypassed);
      const helloOpacity = bypassed ? 1 : identityBeatProgress(identityReveal, 0);
      const titleOpacity = bypassed ? 1 : identityBeatProgress(identityReveal, 1);
      const summaryOpacity = bypassed ? 1 : identityBeatProgress(identityReveal, 2);
      const headerVisibility = bypassed ? 1 : identityBeatProgress(identityReveal, 3);
      const premiseOpacity = bypassed ? 1 : identityBeatProgress(identityReveal, 4);
      const identityHold = bypassed ? 1 : clamp(identityReveal / 0.08);
      const boxFall = boxFallAmount(progress);
      const journeyStart = openingStart + runway.offsetHeight;
      const boxFadeStart = journeyStart - window.innerHeight * 0.18;
      const boxFadeDistance = Math.max(1, window.innerHeight * 0.38);
      const boxFade = bypassed
        ? 1
        : smooth(clamp((window.scrollY - boxFadeStart) / boxFadeDistance));
      const artOpacity = 1 - boxFade;
      const headerInteractive = headerVisibility >= 0.98 && introExit < 0.9;

      if (!this.helloAnimationPrepared && identityReveal > 0) {
        this.helloAnimationPrepared = true;
        reveal.querySelector('hello-animation')?.dispatchEvent(new CustomEvent('hello-animation-prepare'));
      }

      if (!this.helloAnimationPlayed && helloOpacity > 0.05) {
        this.helloAnimationPlayed = true;
        if (!bypassed) {
          reveal.querySelector('hello-animation')?.dispatchEvent(new CustomEvent('hello-animation-play'));
        }
      }

      if (!this.thermalHintPlayed && titleOpacity >= 0.85) {
        this.thermalHintPlayed = true;
        reveal.querySelector('playful-word')?.dispatchEvent(new CustomEvent('thermal-hint'));
      }

      syncFlipbook(frameIndex);
      if (frameIndex > 0 || progress > 0) hideScrollHint(true);

      this.style.setProperty('--identity-reveal', identityReveal.toFixed(4));
      this.style.setProperty('--identity-opacity', helloOpacity.toFixed(4));
      this.style.setProperty('--hello-opacity', helloOpacity.toFixed(4));
      this.style.setProperty('--title-opacity', titleOpacity.toFixed(4));
      this.style.setProperty('--summary-opacity', summaryOpacity.toFixed(4));
      this.style.setProperty('--premise-opacity', premiseOpacity.toFixed(4));
      this.style.setProperty('--art-opacity', artOpacity.toFixed(4));
      this.style.setProperty('--box-fall', boxFall.toFixed(4));
      this.style.setProperty('--identity-hold', identityHold.toFixed(4));
      this.toggleAttribute('data-opening-live', progress > 0 && progress < openingMotion.completeAt);
      this.toggleAttribute('data-box-fading', boxFade > 0 && boxFade < 1);
      reveal.toggleAttribute('data-visible', frameIndex >= frames.length - 1 || identityReveal > 0);

      page.style.setProperty('--header-visibility', headerVisibility.toFixed(4));
      header.inert = !headerInteractive;
      header.toggleAttribute('aria-hidden', !headerInteractive);
      reveal.inert = bypassed ? false : helloOpacity < 0.98;
      this.toggleAttribute('data-identity-held', identityHold >= 0.98);
      this.toggleAttribute('data-complete', bypassed || progress >= openingMotion.completeAt);
    };

    const paintFromScroll = () => paint(scrollProgress());

    const settleOpening = () => {
      needsMeasurement = true;
      paintFromScroll();
    };

    const showCompletedOpening = () => {
      this.frame = 0;
      paint(1);
    };

    const alignBypassedHash = () => {
      if (!window.location.hash || alignedHash === window.location.hash) return;
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = document.getElementById(id);
      if (!target) return;

      alignedHash = window.location.hash;
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const top = window.scrollY + target.getBoundingClientRect().top;
          window.scrollTo(0, top);
        });
      });
    };

    const requestRender = () => {
      if (this.frame) return;
      this.frame = window.requestAnimationFrame(render);
    };

    const render = () => {
      this.frame = 0;

      if (bypassOpening()) {
        document.documentElement.classList.add('opening-bypassed');
        reveal.inert = false;
        header.inert = false;
        header.removeAttribute('aria-hidden');
        showCompletedOpening();
        alignBypassedHash();
        return;
      }

      paintFromScroll();

      if (
        this.hasAttribute('data-complete') &&
        window.scrollY >= openingStart + openingDistance - 1
      ) {
        return;
      }
    };

    const handleScroll = () => {
      if (hintGesture && window.scrollY !== hintGesture.scrollY) clearHintGesture();
      requestRender();
    };

    const handleResize = () => {
      needsMeasurement = true;
      requestRender();
    };

    const handleMotionPreference = () => requestRender();

    const handleHashChange = () => requestRender();

    boxStage.addEventListener('pointerdown', handleHintPointerDown, {
      signal: this.abort.signal,
    });
    scrollHint.addEventListener('pointerdown', handleHintPointerDown, {
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
    boxStage.addEventListener('click', handleOpeningClick, { signal: this.abort.signal });
    scrollHint.addEventListener('click', handleOpeningClick, { signal: this.abort.signal });
    window.addEventListener('scroll', handleScroll, { passive: true, signal: this.abort.signal });
    window.addEventListener('resize', handleResize, { passive: true, signal: this.abort.signal });
    window.addEventListener('hashchange', handleHashChange, { signal: this.abort.signal });
    reducedMotion.addEventListener('change', handleMotionPreference, { signal: this.abort.signal });
    window.addEventListener('pageshow', settleOpening, { signal: this.abort.signal });
    if (document.readyState === 'complete') {
      settleOpening();
    } else {
      window.addEventListener('load', settleOpening, {
        once: true,
        signal: this.abort.signal,
      });
    }
    settleOpening();
    requestRender();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        settleOpening();
      });
    });
  }

  disconnectedCallback() {
    this.abort?.abort();
    this.removeAttribute('data-scroll-hint');
    this.querySelector<HTMLElement>('[data-opening-scroll-hint]')?.setAttribute(
      'aria-hidden',
      'true',
    );
    const contact = this.querySelector<HTMLElement>('[data-opening-scroll-hint-contact]');
    if (contact) contact.hidden = true;
    if (this.frame) window.cancelAnimationFrame(this.frame);
    delete this.dataset.enhanced;
  }
}

if (!customElements.get('opening-sequence')) {
  customElements.define('opening-sequence', OpeningSequence);
}
