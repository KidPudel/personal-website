import { clamp, smooth } from '../../../lib/motion';
import { valueVoiceMotion } from './value-voice-motion';

class ValueStory extends HTMLElement {
  private abort?: AbortController;
  private frame = 0;
  private observer?: IntersectionObserver;

  connectedCallback() {
    if (this.dataset.enhanced) return;
    this.dataset.enhanced = 'true';
    this.abort = new AbortController();

    const voice = this.querySelector<HTMLElement>('[data-value-voice]');
    const layers = Array.from(this.querySelectorAll<HTMLElement>('[data-voice-layer]'));
    const passages = Array.from(this.querySelectorAll<HTMLElement>('[data-value-passage]'));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!voice || layers.length !== passages.length + 1 || !passages.length) return;
    voice.dataset.enhanced = 'true';

    this.querySelectorAll<HTMLButtonElement>('[data-word-cycle]').forEach((button) => {
      const options = Array.from(button.querySelectorAll<HTMLElement>('[data-word-option]'));
      let activeIndex = 0;

      const update = () => {
        options.forEach((option, index) => {
          const active = index === activeIndex;
          option.hidden = !active;
          option.setAttribute('aria-hidden', String(!active));
        });

        const word = options[activeIndex]?.textContent?.trim() ?? '';
        button.setAttribute('aria-label', `${word}. Change this word.`);
      };

      button.disabled = false;
      button.addEventListener('click', () => {
        activeIndex = (activeIndex + 1) % options.length;
        update();
      });
      update();
    });

    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).dataset.revealed = 'true';
              this.observer?.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: valueVoiceMotion.aspectRevealMargin,
          threshold: valueVoiceMotion.aspectRevealThreshold,
        },
      );

      this.querySelectorAll<HTMLElement>('[data-aspect]').forEach((aspect) => this.observer?.observe(aspect));
    }

    let lastShownLayer = -1;

    const setLayer = (layer: HTMLElement, opacity: number, blur: number) => {
      layer.style.setProperty('--voice-opacity', opacity.toFixed(4));
      layer.style.setProperty('--voice-blur', `${blur.toFixed(3)}px`);
    };

    const showOnly = (activeIndex: number) => {
      if (activeIndex === lastShownLayer) return;
      lastShownLayer = activeIndex;

      layers.forEach((layer, index) => {
        const active = index === activeIndex;
        setLayer(layer, active ? 1 : 0, 0);
        layer.style.pointerEvents = active ? 'auto' : 'none';
        if (active) layer.removeAttribute('aria-hidden');
        else layer.setAttribute('aria-hidden', 'true');
        layer.querySelectorAll<HTMLButtonElement>('[data-word-cycle]').forEach((button) => {
          button.tabIndex = active ? 0 : -1;
        });
      });
    };

    const transitionProgress = (passage: HTMLElement, index: number) => {
      const top = passage.getBoundingClientRect().top;
      const start =
        window.innerHeight *
        (index === 0 ? valueVoiceMotion.firstHandoffViewportStart : valueVoiceMotion.laterHandoffViewportStart);
      const distance =
        window.innerHeight * (index === 0 ? valueVoiceMotion.firstHandoffDistance : valueVoiceMotion.laterHandoffDistance);
      return clamp((start - top) / Math.max(1, distance));
    };

    const render = () => {
      this.frame = 0;

      if (reducedMotion.matches) {
        let active = 0;
        passages.forEach((passage, index) => {
          if (passage.getBoundingClientRect().top < window.innerHeight * valueVoiceMotion.reducedMotionThreshold) {
            active = index + 1;
          }
        });
        showOnly(active);
        return;
      }

      const transitions = passages.map(transitionProgress);
      const activeTransition = transitions.findIndex((progress) => progress > 0 && progress < 1);

      if (activeTransition === -1) {
        let active = 0;
        transitions.forEach((progress, index) => {
          if (progress >= 1) active = index + 1;
        });
        showOnly(active);
        return;
      }

      const progress = smooth(transitions[activeTransition]);
      const outgoingIndex = activeTransition;
      const incomingIndex = activeTransition + 1;
      lastShownLayer = -1;
      const outgoingOpacity = Math.cos(progress * Math.PI * 0.5) ** 2;
      const incomingOpacity = Math.sin(progress * Math.PI * 0.5) ** 2;
      const outgoingBlur =
        valueVoiceMotion.morphBlur * smooth(clamp(progress / valueVoiceMotion.morphBlurRamp));
      const incomingBlur =
        valueVoiceMotion.morphBlur *
        smooth(clamp((1 - progress) / valueVoiceMotion.morphBlurRamp));

      layers.forEach((layer, index) => {
        if (index === outgoingIndex) {
          setLayer(layer, outgoingOpacity, outgoingBlur);
        } else if (index === incomingIndex) {
          setLayer(layer, incomingOpacity, incomingBlur);
        } else {
          setLayer(layer, 0, 0);
        }

        const interactive = index === (progress < 0.5 ? outgoingIndex : incomingIndex);
        layer.style.pointerEvents = interactive ? 'auto' : 'none';
        if (interactive) layer.removeAttribute('aria-hidden');
        else layer.setAttribute('aria-hidden', 'true');
        layer.querySelectorAll<HTMLButtonElement>('[data-word-cycle]').forEach((button) => {
          button.tabIndex = interactive ? 0 : -1;
        });
      });
    };

    const requestRender = () => {
      if (this.frame) return;
      this.frame = window.requestAnimationFrame(render);
    };

    window.addEventListener('scroll', requestRender, { passive: true, signal: this.abort.signal });
    window.addEventListener('resize', requestRender, { passive: true, signal: this.abort.signal });
    reducedMotion.addEventListener('change', requestRender, { signal: this.abort.signal });
    render();
  }

  disconnectedCallback() {
    this.abort?.abort();
    this.observer?.disconnect();
    if (this.frame) window.cancelAnimationFrame(this.frame);
    const voice = this.querySelector<HTMLElement>('[data-value-voice]');
    if (voice) delete voice.dataset.enhanced;
    delete this.dataset.enhanced;
  }
}

if (!customElements.get('value-story')) {
  customElements.define('value-story', ValueStory);
}
