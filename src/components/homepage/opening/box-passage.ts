import { clamp, smooth } from '../../../lib/motion';

const settleWithOvershoot = (value: number) => {
  const shifted = value - 1;
  const back = 1.70158;
  return 1 + (back + 1) * shifted ** 3 + back * shifted ** 2;
};

const mix = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

type Target = {
  documentX: number;
  documentY: number;
  height: number;
};

class BoxPassage extends HTMLElement {
  private abort?: AbortController;
  private frame = 0;
  private resizeObserver?: ResizeObserver;
  private targets = new Map<HTMLElement, Target>();

  connectedCallback() {
    if (this.dataset.enhanced) return;

    const section = this.querySelector<HTMLElement>('[data-box-passage-section]');
    const items = Array.from(this.querySelectorAll<HTMLElement>('[data-box-item]'));
    const opening = this.closest<HTMLElement>('opening-sequence');
    const boxFrame = () =>
      opening?.querySelector<HTMLElement>('[data-opening-frame][data-active]');
    if (!section || !items.length || !opening || !boxFrame()) return;

    this.dataset.enhanced = '';
    this.abort = new AbortController();
    const { signal } = this.abort;
    const narrow = window.matchMedia('(max-width: 50rem)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const clear = () => {
      items.forEach((item) => {
        item.style.removeProperty('opacity');
        item.style.removeProperty('transform');
        item.style.removeProperty('clip-path');
        item.style.removeProperty('pointer-events');
        item.style.removeProperty('will-change');
        item.querySelectorAll<HTMLElement>('[data-box-copy]').forEach((copy) => {
          copy.style.removeProperty('opacity');
          copy.style.removeProperty('transform');
        });
      });
    };

    const measure = () => {
      clear();
      void section.offsetWidth;
      this.targets.clear();
      items.forEach((item) => {
        const bounds = item.getBoundingClientRect();
        this.targets.set(item, {
          documentX: bounds.left + bounds.width / 2 + window.scrollX,
          documentY: bounds.top + bounds.height * 0.2 + window.scrollY,
          height: bounds.height,
        });
      });
    };

    const render = () => {
      this.frame = 0;
      if (
        reduced.matches ||
        document.documentElement.classList.contains('opening-bypassed')
      ) {
        clear();
        return;
      }
      if (this.targets.size !== items.length) measure();

      const frame = boxFrame();
      if (!frame) return;
      const sectionTop = section.getBoundingClientRect().top;
      const start = window.innerHeight * 0.82;
      const end = -window.innerHeight * 0.18;
      const overall = clamp((start - sectionTop) / Math.max(1, start - end));
      const frameBounds = frame.getBoundingClientRect();
      const sourceX = frameBounds.left + frameBounds.width * 0.5;
      const boxMouthY = frameBounds.top + frameBounds.height * 0.4;
      const defaultSourceScale = narrow.matches ? 0.58 : 0.94;
      const defaultStackScale = narrow.matches ? 0.68 : 0.98;

      items.forEach((item, index) => {
        const target = this.targets.get(item);
        if (!target) return;
        const sourceScale = Number.parseFloat(item.dataset.boxSourceScale ?? '') || defaultSourceScale;
        const stackScale = Number.parseFloat(item.dataset.boxStackScale ?? '') || defaultStackScale;
        const fanLayer = Math.ceil(index / 2);
        const riseProgress = clamp((overall - 0.1 - index * 0.012) / 0.2);
        const fanProgress = clamp((overall - 0.33 - fanLayer * 0.025) / 0.34);
        const rise = settleWithOvershoot(riseProgress);
        const fan = settleWithOvershoot(fanProgress);
        const targetX = target.documentX - window.scrollX;
        const targetY = target.documentY - window.scrollY;
        const stackX = sourceX + (index - (items.length - 1) / 2) * 3;
        const stackY = window.innerHeight * (narrow.matches ? 0.54 : 0.46) + index * 2;
        const cardSourceY = boxMouthY + target.height * 0.2 * sourceScale + 4;
        const risenX = mix(sourceX, stackX, rise);
        const risenY = mix(cardSourceY, stackY, rise);
        const currentX = mix(risenX, targetX, fan);
        const currentY = mix(risenY, targetY, fan);
        const scale =
          sourceScale + (stackScale - sourceScale) * rise + (1 - stackScale) * fan;
        const projectedTop = currentY - target.height * 0.2 * scale;
        const projectedHeight = Math.max(1, target.height * scale);
        const visibleAboveBox = clamp((boxMouthY - projectedTop) / projectedHeight);
        const clippedFraction = (1 - visibleAboveBox) * (1 - smooth(riseProgress));
        const riseOpacity = smooth(clamp((riseProgress - 0.02) / 0.24));
        const fanOpacity = smooth(clamp((fanProgress - 0.08) / 0.3));
        const opacity = item.hasAttribute('data-box-text') ? fanOpacity : riseOpacity;

        item.style.opacity = opacity.toFixed(4);
        item.style.transform = `translate3d(${(currentX - targetX).toFixed(2)}px, ${(currentY - targetY).toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
        item.style.clipPath = `inset(0 0 ${(clippedFraction * 100).toFixed(3)}% 0)`;
        item.style.pointerEvents = fanProgress > 0.96 ? 'auto' : 'none';
        item.style.willChange = overall > 0.08 && overall < 0.75
          ? 'transform, opacity, clip-path'
          : 'auto';

        item.querySelectorAll<HTMLElement>('[data-box-copy]').forEach((copy) => {
          copy.style.opacity = fanOpacity.toFixed(4);
          copy.style.transform = `translate3d(0, ${((1 - fanOpacity) * 8).toFixed(2)}px, 0)`;
        });
      });
    };

    const requestRender = () => {
      if (this.frame) return;
      this.frame = window.requestAnimationFrame(render);
    };

    const remeasure = () => {
      measure();
      requestRender();
    };

    opening.addEventListener('journey-box-painted', render, { signal });
    window.addEventListener('resize', remeasure, { passive: true, signal });
    narrow.addEventListener('change', remeasure, { signal });
    reduced.addEventListener('change', remeasure, { signal });
    this.resizeObserver = new ResizeObserver(remeasure);
    this.resizeObserver.observe(section);
    void document.fonts.ready.then(() => {
      if (!signal.aborted) remeasure();
    });
    measure();
    render();
  }

  disconnectedCallback() {
    this.abort?.abort();
    this.resizeObserver?.disconnect();
    if (this.frame) window.cancelAnimationFrame(this.frame);
    delete this.dataset.enhanced;
  }
}

if (!customElements.get('box-passage')) {
  customElements.define('box-passage', BoxPassage);
}
