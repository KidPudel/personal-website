import { openingMotion } from './opening-motion';

class OpeningSequence extends HTMLElement {
  private abort?: AbortController;
  private animations = new Set<Animation>();
  private timers = new Set<number>();
  private skyVideo?: HTMLVideoElement;

  connectedCallback() {
    if (this.dataset.enhanced) return;
    this.dataset.enhanced = 'true';
    this.abort = new AbortController();

    const boxStage = this.querySelector<HTMLElement>('[data-opening-art]');
    const sky = this.querySelector<HTMLElement>('.opening-sequence__sky');
    const skyVideo = this.querySelector<HTMLVideoElement>('[data-opening-sky]');
    const frames = Array.from(this.querySelectorAll<HTMLImageElement>('[data-opening-frame]'));
    const documentSurface = this.closest<HTMLElement>('[data-homepage]')
      ?.querySelector<HTMLElement>('[data-homepage-document]');
    const header = document.querySelector<HTMLElement>('[data-site-header]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!boxStage || !sky || !skyVideo || !frames.length || !documentSurface || !header) {
      return;
    }

    this.skyVideo = skyVideo;
    skyVideo.muted = true;
    skyVideo.loop = true;
    skyVideo.playsInline = true;

    const frameSource = (frame: HTMLImageElement) =>
      frame.dataset.src || frame.getAttribute('src') || '';
    const primedFrames = new Set<number>([0]);

    const primeFrame = (index: number) => {
      const frame = frames[index];
      if (!frame || primedFrames.has(index)) return;

      const source = frameSource(frame);
      if (!source) return;
      frame.loading = 'eager';
      frame.src = source;
      primedFrames.add(index);
      void frame.decode().catch(() => undefined);
    };

    const syncFrame = (index: number) => {
      primeFrame(index);
      for (let offset = 1; offset <= openingMotion.flipbookDecodeWindow; offset += 1) {
        primeFrame(index + offset);
        primeFrame(index - offset);
      }

      frames.forEach((frame, frameIndex) => {
        const active = frameIndex === index;
        frame.toggleAttribute('data-active', active);
        frame.hidden = !active;
      });
    };

    frames.forEach((_, index) => primeFrame(index));

    let skyPlaybackRequested = false;
    const setSkyPlayback = (active: boolean) => {
      if (active === skyPlaybackRequested) return;
      skyPlaybackRequested = active;

      if (!active) {
        skyVideo.pause();
        return;
      }

      const source = window.matchMedia('(max-width: 44.999rem)').matches
        ? skyVideo.dataset.mobileSrc
        : skyVideo.dataset.src;
      if (!skyVideo.getAttribute('src') && source) {
        skyVideo.src = source;
        skyVideo.load();
      }

      skyVideo.removeAttribute('data-autoplay-blocked');
      void skyVideo.play().then(
        () => skyVideo.removeAttribute('data-autoplay-blocked'),
        () => skyVideo.setAttribute('data-autoplay-blocked', ''),
      );
    };

    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => {
        this.timers.delete(timer);
        callback();
      }, delay);
      this.timers.add(timer);
    };

    let completed = false;
    const showCompletedOpening = () => {
      if (completed) return;
      completed = true;
      this.animations.forEach((animation) => animation.cancel());
      this.animations.clear();
      this.timers.forEach((timer) => window.clearTimeout(timer));
      this.timers.clear();
      setSkyPlayback(false);
      syncFrame(frames.length - 1);

      this.removeAttribute('data-opening-live');
      this.setAttribute('data-complete', '');
      documentSurface.inert = false;
      documentSurface.removeAttribute('aria-hidden');
      header.inert = false;
      header.removeAttribute('aria-hidden');
      document.documentElement.classList.add('opening-bypassed');
    };

    const alignHash = () => {
      if (!window.location.hash) return;
      const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      if (!target) return;
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => target.scrollIntoView());
      });
    };

    const bypassOpening = () =>
      reducedMotion.matches ||
      window.location.hash.length > 0 ||
      document.documentElement.classList.contains('opening-bypassed');

    if (bypassOpening()) {
      showCompletedOpening();
      alignHash();
      return;
    }

    this.setAttribute('data-opening-live', '');
    documentSurface.inert = true;
    documentSurface.setAttribute('aria-hidden', 'true');
    header.inert = true;
    header.setAttribute('aria-hidden', 'true');
    setSkyPlayback(document.visibilityState === 'visible');

    const documentRevealDuration = openingMotion.durationMs - openingMotion.contentRevealStartMs;
    const animations = [
      sky.animate(
        [
          { opacity: openingMotion.skyOpacityAtStart },
          { opacity: 0 },
        ],
        {
          duration: openingMotion.durationMs,
          easing: 'linear',
          fill: 'forwards',
        },
      ),
      boxStage.animate(
        [
          { opacity: 1, transform: 'scale(1)', offset: 0 },
          {
            opacity: 1,
            transform: 'scale(1)',
            offset: openingMotion.boxFadeStart,
            easing: openingMotion.easeOut,
          },
          { opacity: 0, transform: 'scale(0.96)', offset: 1 },
        ],
        {
          duration: openingMotion.durationMs,
          easing: 'linear',
          fill: 'forwards',
        },
      ),
      documentSurface.animate(
        [
          { opacity: 0, transform: 'translate3d(0, 0.75rem, 0)' },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        ],
        {
          delay: openingMotion.contentRevealStartMs,
          duration: documentRevealDuration,
          easing: openingMotion.easeOut,
          fill: 'both',
        },
      ),
      header.animate(
        [
          { opacity: 0, transform: 'translate3d(0, 0.75rem, 0)' },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        ],
        {
          delay: openingMotion.contentRevealStartMs,
          duration: documentRevealDuration,
          easing: openingMotion.easeOut,
          fill: 'both',
        },
      ),
    ];
    animations.forEach((animation) => this.animations.add(animation));

    const frameStep = openingMotion.boxOpenDurationMs / Math.max(1, frames.length - 1);
    frames.forEach((_, index) => schedule(() => syncFrame(index), frameStep * index));

    schedule(() => {
      documentSurface.querySelector('hello-animation')?.dispatchEvent(
        new CustomEvent('hello-animation-prepare'),
      );
      documentSurface.querySelector('hello-animation')?.dispatchEvent(
        new CustomEvent('hello-animation-play'),
      );
    }, openingMotion.contentRevealStartMs);
    schedule(() => {
      documentSurface.querySelector('playful-word')?.dispatchEvent(new CustomEvent('thermal-hint'));
    }, openingMotion.contentRevealStartMs + documentRevealDuration * 0.55);

    const completionAnimation = animations[1];
    void completionAnimation.finished.then(showCompletedOpening).catch(() => undefined);

    const handleVisibilityChange = () => {
      setSkyPlayback(document.visibilityState === 'visible' && !completed);
    };
    const handleHashChange = () => {
      showCompletedOpening();
      alignHash();
    };
    const retryBlockedSkyPlayback = () => {
      if (completed || !skyVideo.hasAttribute('data-autoplay-blocked')) return;
      skyPlaybackRequested = false;
      setSkyPlayback(true);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange, {
      signal: this.abort.signal,
    });
    window.addEventListener('hashchange', handleHashChange, { signal: this.abort.signal });
    reducedMotion.addEventListener('change', showCompletedOpening, { signal: this.abort.signal });
    window.addEventListener('pointerdown', retryBlockedSkyPlayback, {
      capture: true,
      passive: true,
      signal: this.abort.signal,
    });
    window.addEventListener('pagehide', () => setSkyPlayback(false), {
      signal: this.abort.signal,
    });
  }

  disconnectedCallback() {
    this.abort?.abort();
    this.animations.forEach((animation) => animation.cancel());
    this.animations.clear();
    this.timers.forEach((timer) => window.clearTimeout(timer));
    this.timers.clear();
    this.skyVideo?.pause();
    this.skyVideo?.removeAttribute('src');
    this.skyVideo?.load();
    this.skyVideo = undefined;
    delete this.dataset.enhanced;
  }
}

if (!customElements.get('opening-sequence')) {
  customElements.define('opening-sequence', OpeningSequence);
}
