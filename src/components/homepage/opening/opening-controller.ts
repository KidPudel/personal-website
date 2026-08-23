import { openingMotion } from './opening-motion';

class OpeningSequence extends HTMLElement {
  private abort?: AbortController;
  private animations = new Set<Animation>();
  private greetingTimer = 0;
  private scrollFrame = 0;
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
    const skyFadeTarget = documentSurface?.querySelector<HTMLElement>(
      '[data-opening-sky-fade-target]',
    );
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
      !skyFadeTarget ||
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
    let persistSky = false;

    const syncPersistentSky = () => {
      this.scrollFrame = 0;
      if (!persistSky) return;

      const fadeDistance = Math.max(skyFadeTarget.offsetTop, 1);
      const progress = Math.min(Math.max(window.scrollY / fadeDistance, 0), 1);
      const opacity = openingMotion.skyOpacityAtIntro * (1 - progress);
      sky.style.opacity = `${opacity}`;
      setSkyPlayback(opacity > 0 && document.visibilityState === 'visible');
    };

    const requestPersistentSkySync = () => {
      if (!persistSky || this.scrollFrame) return;
      this.scrollFrame = window.requestAnimationFrame(syncPersistentSky);
    };

    const hidePersistentSky = () => {
      persistSky = false;
      this.removeAttribute('data-persist-sky');
      sky.style.removeProperty('opacity');
      setSkyPlayback(false);
    };

    const showCompletedOpening = (keepSky = false) => {
      if (completed) return;
      completed = true;
      persistSky = keepSky;
      document.documentElement.classList.add('opening-bypassed');
      this.removeAttribute('data-opening-live');
      this.setAttribute('data-complete', '');
      if (persistSky) this.setAttribute('data-persist-sky', '');
      finalGreeting.style.removeProperty('opacity');
      documentSurface.inert = false;
      documentSurface.removeAttribute('aria-hidden');
      header.inert = false;
      header.removeAttribute('aria-hidden');
      this.animations.forEach((animation) => animation.cancel());
      this.animations.clear();
      if (persistSky) {
        syncPersistentSky();
      } else {
        setSkyPlayback(false);
      }
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
      showCompletedOpening(false);
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
          { opacity: openingMotion.skyOpacityAtIntro },
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
      void greetingMove.finished.then(() => showCompletedOpening(true)).catch(() => undefined);
    };

    openingHello.addEventListener('hello-animation-complete', handoffGreeting, {
      once: true,
      signal: this.abort.signal,
    });
    let greetingStarted = false;
    const startGreeting = () => {
      if (greetingStarted || !this.isConnected) return;
      greetingStarted = true;
      window.clearTimeout(this.greetingTimer);
      this.greetingTimer = 0;
      openingHello.dispatchEvent(new CustomEvent('hello-animation-prepare'));
      openingHello.dispatchEvent(new CustomEvent('hello-animation-play'));
    };

    if (skyVideo.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      startGreeting();
    } else {
      skyVideo.addEventListener('canplay', startGreeting, { once: true, signal: this.abort.signal });
      this.greetingTimer = window.setTimeout(startGreeting, 1_200);
    }

    const handleVisibilityChange = () => {
      if (persistSky) {
        syncPersistentSky();
        return;
      }
      setSkyPlayback(document.visibilityState === 'visible' && !completed);
    };
    const handleHashChange = () => {
      showCompletedOpening(false);
      alignHash();
    };
    const handleReducedMotionChange = () => {
      if (!reducedMotion.matches) return;
      if (completed) {
        hidePersistentSky();
      } else {
        showCompletedOpening(false);
      }
    };
    const retryBlockedSkyPlayback = () => {
      if ((completed && !persistSky) || !skyVideo.hasAttribute('data-autoplay-blocked')) return;
      skyPlaybackRequested = false;
      setSkyPlayback(true);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange, {
      signal: this.abort.signal,
    });
    window.addEventListener('hashchange', handleHashChange, { signal: this.abort.signal });
    window.addEventListener('scroll', requestPersistentSkySync, {
      passive: true,
      signal: this.abort.signal,
    });
    window.addEventListener('resize', requestPersistentSkySync, { signal: this.abort.signal });
    reducedMotion.addEventListener('change', handleReducedMotionChange, {
      signal: this.abort.signal,
    });
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
    window.cancelAnimationFrame(this.scrollFrame);
    this.scrollFrame = 0;
    window.clearTimeout(this.greetingTimer);
    this.greetingTimer = 0;
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
