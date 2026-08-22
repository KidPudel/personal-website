import { openingMotion } from './opening-motion';

class OpeningSequence extends HTMLElement {
  private abort?: AbortController;
  private animations = new Set<Animation>();
  private skyVideo?: HTMLVideoElement;

  connectedCallback() {
    if (this.dataset.enhanced) return;
    this.dataset.enhanced = 'true';
    this.abort = new AbortController();

    const greetingStage = this.querySelector<HTMLElement>('[data-opening-greeting]');
    const openingHello = greetingStage?.querySelector<HTMLElement>('hello-animation');
    const sky = this.querySelector<HTMLElement>('.opening-sequence__sky');
    const skyVideo = this.querySelector<HTMLVideoElement>('[data-opening-sky]');
    const documentSurface = this.closest<HTMLElement>('[data-homepage]')
      ?.querySelector<HTMLElement>('[data-homepage-document]');
    const finalGreeting = documentSurface?.querySelector<HTMLElement>(
      '.hello-animation-with-text',
    );
    const finalHello = finalGreeting?.querySelector<HTMLElement>('hello-animation');
    const header = document.querySelector<HTMLElement>('[data-site-header]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (
      !greetingStage ||
      !openingHello ||
      !sky ||
      !skyVideo ||
      !documentSurface ||
      !finalGreeting ||
      !finalHello ||
      !header
    ) {
      return;
    }

    this.skyVideo = skyVideo;
    skyVideo.muted = true;
    skyVideo.loop = true;
    skyVideo.playsInline = true;

    let skyPlaybackRequested = false;
    const setSkyPlayback = (active: boolean) => {
      if (active === skyPlaybackRequested) return;
      skyPlaybackRequested = active;

      if (!active) {
        skyVideo.pause();
        return;
      }

      skyVideo.removeAttribute('data-autoplay-blocked');
      void skyVideo.play().then(
        () => skyVideo.removeAttribute('data-autoplay-blocked'),
        () => skyVideo.setAttribute('data-autoplay-blocked', ''),
      );
    };

    let completed = false;
    const showCompletedOpening = () => {
      if (completed) return;
      completed = true;
      document.documentElement.classList.add('opening-bypassed');
      this.removeAttribute('data-opening-live');
      this.setAttribute('data-complete', '');
      finalGreeting.style.removeProperty('opacity');
      documentSurface.inert = false;
      documentSurface.removeAttribute('aria-hidden');
      header.inert = false;
      header.removeAttribute('aria-hidden');
      setSkyPlayback(false);
      this.animations.forEach((animation) => animation.cancel());
      this.animations.clear();
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
    finalGreeting.style.opacity = '0';
    setSkyPlayback(document.visibilityState === 'visible');

    const handoffGreeting = () => {
      if (completed) return;

      const openingRect = greetingStage.getBoundingClientRect();
      const finalRect = finalGreeting.getBoundingClientRect();
      const finalScaleX = finalRect.width / openingRect.width;
      const finalScaleY = finalRect.height / openingRect.height;

      greetingStage.style.top = '0';
      greetingStage.style.left = '0';
      greetingStage.style.width = `${openingRect.width}px`;
      greetingStage.style.transform = `translate3d(${openingRect.left}px, ${openingRect.top}px, 0)`;

      const greetingMove = greetingStage.animate(
        [
          {
            opacity: 1,
            transform: `translate3d(${openingRect.left}px, ${openingRect.top}px, 0) scale(1)`,
          },
          {
            opacity: 1,
            transform: `translate3d(${finalRect.left}px, ${finalRect.top}px, 0) scale(${finalScaleX}, ${finalScaleY})`,
            offset: openingMotion.greetingCrossfadeStart,
          },
          {
            opacity: 0,
            transform: `translate3d(${finalRect.left}px, ${finalRect.top}px, 0) scale(${finalScaleX}, ${finalScaleY})`,
          },
        ],
        {
          duration: openingMotion.handoffDurationMs,
          easing: openingMotion.easeInOut,
          fill: 'forwards',
        },
      );
      const skyFade = sky.animate(
        [
          { opacity: openingMotion.skyOpacityAtStart },
          { opacity: 0 },
        ],
        {
          duration: openingMotion.handoffDurationMs,
          easing: 'linear',
          fill: 'forwards',
        },
      );
      const documentReveal = documentSurface.animate(
        [
          { opacity: 0 },
          { opacity: 1 },
        ],
        {
          delay: openingMotion.contentRevealDelayMs,
          duration: openingMotion.contentRevealDurationMs,
          easing: openingMotion.easeOut,
          fill: 'both',
        },
      );
      const headerReveal = header.animate(
        [
          { opacity: 0, transform: 'translate3d(0, 0.75rem, 0)' },
          { opacity: 1, transform: 'translate3d(0, 0, 0)' },
        ],
        {
          delay: openingMotion.contentRevealDelayMs,
          duration: openingMotion.contentRevealDurationMs,
          easing: openingMotion.easeOut,
          fill: 'both',
        },
      );
      const finalGreetingReveal = finalGreeting.animate(
        [
          { opacity: 0 },
          { opacity: 0, offset: openingMotion.greetingCrossfadeStart },
          { opacity: 1 },
        ],
        {
          duration: openingMotion.handoffDurationMs,
          easing: openingMotion.easeOut,
          fill: 'forwards',
        },
      );

      [greetingMove, skyFade, documentReveal, headerReveal, finalGreetingReveal].forEach(
        (animation) => this.animations.add(animation),
      );
      void documentReveal.finished
        .then(() => {
          documentSurface
            .querySelector('playful-word')
            ?.dispatchEvent(new CustomEvent('thermal-hint'));
        })
        .catch(() => undefined);
      void greetingMove.finished.then(showCompletedOpening).catch(() => undefined);
    };

    openingHello.addEventListener('hello-animation-complete', handoffGreeting, {
      once: true,
      signal: this.abort.signal,
    });
    openingHello.dispatchEvent(new CustomEvent('hello-animation-prepare'));
    openingHello.dispatchEvent(new CustomEvent('hello-animation-play'));

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
    this.skyVideo?.pause();
    this.skyVideo = undefined;
    delete this.dataset.enhanced;
  }
}

if (!customElements.get('opening-sequence')) {
  customElements.define('opening-sequence', OpeningSequence);
}
