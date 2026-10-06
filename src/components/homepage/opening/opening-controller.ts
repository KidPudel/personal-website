import { openingMotion } from './opening-motion';
import { syncPageTopColor } from '../../../lib/page-top-color';

class OpeningSequence extends HTMLElement {
  private abort?: AbortController;
  private greetingTimer = 0;
  private scrollFrame = 0;
  private skyVideo?: HTMLVideoElement;

  connectedCallback() {
    if (this.dataset.enhanced) return;
    this.dataset.enhanced = 'true';
    this.abort = new AbortController();

    const sky = this.querySelector<HTMLElement>('.opening-sequence__sky');
    const skyVideo = this.querySelector<HTMLVideoElement>('[data-opening-sky]');
    const skyFadeTarget = document.querySelector<HTMLElement>('[data-opening-sky-fade-target]');
    const hello = document.querySelector<HTMLElement>('hello-animation[data-opening]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    this.writeGreeting(hello, skyVideo, reducedMotion);
    if (!sky || !skyVideo || !skyFadeTarget) return;

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

    // The sky fades out as the work comes up, and hands its opacity to the
    // strip Safari shows above the top of the page (see composition.css).
    // The strip is only in view within a status bar's height of the top, so
    // further down it rests on the field.
    const root = document.documentElement;
    const syncSky = () => {
      this.scrollFrame = 0;
      const shown = !reducedMotion.matches;
      const fadeDistance = Math.max(skyFadeTarget.offsetTop, 1);
      const progress = Math.min(Math.max(window.scrollY / fadeDistance, 0), 1);
      const opacity = shown ? openingMotion.skyOpacity * (1 - progress) : 0;
      sky.style.opacity = `${opacity}`;
      setSkyPlayback(opacity > 0 && document.visibilityState === 'visible');

      const pageTop = (window.scrollY < 120 ? opacity : 0).toFixed(2);
      if (root.style.getPropertyValue('--page-top-sky') !== pageTop) {
        root.style.setProperty('--page-top-sky', pageTop);
        syncPageTopColor();
      }
    };

    const requestSkySync = () => {
      if (this.scrollFrame) return;
      this.scrollFrame = window.requestAnimationFrame(syncSky);
    };

    const retryBlockedSkyPlayback = () => {
      if (!skyVideo.hasAttribute('data-autoplay-blocked')) return;
      skyPlaybackRequested = false;
      syncSky();
    };

    const { signal } = this.abort;
    document.addEventListener('visibilitychange', syncSky, { signal });
    window.addEventListener('scroll', requestSkySync, { passive: true, signal });
    window.addEventListener('resize', requestSkySync, { signal });
    reducedMotion.addEventListener('change', syncSky, { signal });
    window.addEventListener('pointerdown', retryBlockedSkyPlayback, {
      capture: true,
      passive: true,
      signal,
    });
    window.addEventListener('pagehide', () => setSkyPlayback(false), { signal });

    syncSky();
  }

  // The hello writes itself in place on a fresh arrival. Its remaining frames
  // wait until the sky can play, so they do not compete with it.
  private writeGreeting(
    hello: HTMLElement | null,
    skyVideo: HTMLVideoElement | null,
    reducedMotion: MediaQueryList,
  ) {
    const settled = document.documentElement.classList.contains('greeting-settled');
    if (!hello || settled || reducedMotion.matches) return;

    let greetingStarted = false;
    const startGreeting = () => {
      if (greetingStarted || !this.isConnected) return;
      greetingStarted = true;
      window.clearTimeout(this.greetingTimer);
      this.greetingTimer = 0;
      void customElements.whenDefined('hello-animation').then(() => {
        hello.dispatchEvent(new CustomEvent('hello-animation-prepare'));
        hello.dispatchEvent(new CustomEvent('hello-animation-play'));
      });
    };

    if (!skyVideo || skyVideo.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      startGreeting();
    } else {
      skyVideo.addEventListener('canplay', startGreeting, {
        once: true,
        signal: this.abort?.signal,
      });
      this.greetingTimer = window.setTimeout(startGreeting, openingMotion.greetingWaitMs);
    }
  }

  disconnectedCallback() {
    this.abort?.abort();
    window.cancelAnimationFrame(this.scrollFrame);
    this.scrollFrame = 0;
    document.documentElement.style.removeProperty('--page-top-sky');
    syncPageTopColor();
    window.clearTimeout(this.greetingTimer);
    this.greetingTimer = 0;
    this.skyVideo?.pause();
    this.skyVideo = undefined;
    delete this.dataset.enhanced;
  }
}

if (!customElements.get('opening-sequence')) {
  customElements.define('opening-sequence', OpeningSequence);
}
