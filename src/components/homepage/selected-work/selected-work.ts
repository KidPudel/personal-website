import { clamp, smooth } from '../../../lib/motion';

const settleWithOvershoot = (value: number) => {
  const shifted = value - 1;
  const back = 1.70158;
  return 1 + (back + 1) * shifted ** 3 + back * shifted ** 2;
};

const mix = (from: number, to: number, progress: number) =>
  from + (to - from) * progress;

class SelectedWork extends HTMLElement {
  private abort?: AbortController;
  private frame = 0;

  connectedCallback() {
    if (this.dataset.enhanced) return;

    const section = this.querySelector<HTMLElement>('.selected-work');
    const content = this.querySelector<HTMLElement>('.selected-work__content');
    const heading = this.querySelector<HTMLElement>('[data-selected-work-heading]');
    const gallery = this.querySelector<HTMLElement>('[data-selected-work-gallery]');
    const cards = Array.from(this.querySelectorAll<HTMLElement>('[data-selected-project]'));
    const opening = this.closest<HTMLElement>('opening-sequence');
    const boxFrame = () =>
      opening?.querySelector<HTMLElement>(
        '[data-opening-frame][data-active]',
      );
    if (!section || !content || !heading || !gallery || cards.length !== 3 || !opening || !boxFrame()) return;

    this.dataset.enhanced = '';
    this.abort = new AbortController();
    const { signal } = this.abort;
    const narrow = window.matchMedia('(max-width: 50rem)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const clear = () => {
      heading.style.removeProperty('opacity');
      heading.style.removeProperty('transform');
      heading.style.removeProperty('clip-path');
      heading.style.removeProperty('pointer-events');
      heading.style.removeProperty('will-change');
      cards.forEach((card) => {
        card.style.removeProperty('opacity');
        card.style.removeProperty('transform');
        card.style.removeProperty('clip-path');
        card.style.removeProperty('pointer-events');
        card.style.removeProperty('will-change');
        card.style.removeProperty('--project-copy-opacity');
        card.style.removeProperty('--project-copy-y');
      });
    };

    const render = () => {
      this.frame = 0;
      if (reduced.matches || document.documentElement.classList.contains('opening-bypassed')) {
        clear();
        return;
      }

      const frame = boxFrame();
      if (!frame) return;
      const sectionTop = section.getBoundingClientRect().top;
      const start = window.innerHeight * (narrow.matches ? 0.86 : 0.68);
      const end = -window.innerHeight * (narrow.matches ? 0.35 : 0.56);
      const overall = clamp((start - sectionTop) / Math.max(1, start - end));
      const frameBounds = frame.getBoundingClientRect();
      const contentBounds = content.getBoundingClientRect();
      const galleryBounds = gallery.getBoundingClientRect();
      const sourceX = frameBounds.left + frameBounds.width * 0.5;
      const boxMouthY = frameBounds.top + frameBounds.height * 0.4;
      const sourceScale = narrow.matches ? 0.62 : 0.96;
      const stackScale = narrow.matches ? 0.7 : 0.985;

      const headingRiseProgress = clamp((overall - 0.02) / 0.16);
      const headingFanProgress = clamp((overall - 0.18) / 0.22);
      const headingRise = settleWithOvershoot(headingRiseProgress);
      const headingFan = settleWithOvershoot(headingFanProgress);
      const headingTargetX = contentBounds.left + heading.offsetLeft + heading.offsetWidth / 2;
      const headingTargetY = contentBounds.top + heading.offsetTop + heading.offsetHeight / 2;
      const headingSourceScale = narrow.matches ? 0.62 : 0.84;
      const headingSourceY = boxMouthY + heading.offsetHeight * 0.5 * headingSourceScale + 4;
      const headingStackY = window.innerHeight * (narrow.matches ? 0.48 : 0.38);
      const headingRisenY = mix(headingSourceY, headingStackY, headingRise);
      const headingX = mix(sourceX, headingTargetX, headingFan);
      const headingY = mix(headingRisenY, headingTargetY, headingFan);
      const headingScale = mix(
        mix(headingSourceScale, 0.94, headingRise),
        1,
        headingFan,
      );
      const headingProjectedTop = headingY - heading.offsetHeight * 0.5 * headingScale;
      const headingVisibleAboveBox = clamp(
        (boxMouthY - headingProjectedTop) / Math.max(1, heading.offsetHeight * headingScale),
      );
      const headingClip =
        (1 - headingVisibleAboveBox) * (1 - smooth(headingRiseProgress));
      const headingOpacity = smooth(clamp((headingFanProgress - 0.06) / 0.3));
      heading.style.opacity = headingOpacity.toFixed(4);
      heading.style.transform = `translate3d(${(headingX - headingTargetX).toFixed(2)}px, ${(headingY - headingTargetY).toFixed(2)}px, 0) scale(${headingScale.toFixed(4)})`;
      heading.style.clipPath = `inset(0 0 ${(headingClip * 100).toFixed(3)}% 0)`;
      heading.style.pointerEvents = headingFanProgress > 0.95 ? 'auto' : 'none';
      heading.style.willChange = overall > 0 && overall < 0.42
        ? 'transform, opacity, clip-path'
        : 'auto';

      cards.forEach((card, index) => {
        const fanLayer = Math.ceil(index / 2);
        const riseProgress = clamp((overall - 0.25 - index * 0.012) / 0.2);
        const fanProgress = clamp((overall - 0.48 - fanLayer * 0.035) / 0.3);
        const rise = settleWithOvershoot(riseProgress);
        const fan = settleWithOvershoot(fanProgress);
        const opacity = smooth(clamp((overall - 0.25 - index * 0.012) / 0.06));
        const copyProgress = smooth(clamp((fanProgress - 0.42) / 0.42));
        const targetX = galleryBounds.left + card.offsetLeft + card.offsetWidth / 2;
        const targetY = galleryBounds.top + card.offsetTop + card.offsetHeight * 0.24;
        const stackX = sourceX + (index - 1) * 5;
        const stackY = window.innerHeight * (narrow.matches ? 0.52 : 0.46) + index * 3;
        const cardSourceY =
          boxMouthY + card.offsetHeight * 0.24 * sourceScale + 4;
        const risenX = mix(sourceX, stackX, rise);
        const risenY = mix(cardSourceY, stackY, rise);
        const currentX = mix(risenX, targetX, fan);
        const currentY = mix(risenY, targetY, fan);
        const scale =
          sourceScale + (stackScale - sourceScale) * rise + (1 - stackScale) * fan;
        const stackedRotation = (index - 1) * 0.45;
        const rotation = mix(stackedRotation, 0, fan);
        const projectedTop = currentY - card.offsetHeight * 0.24 * scale;
        const projectedHeight = Math.max(1, card.offsetHeight * scale);
        const visibleAboveBox = clamp((boxMouthY - projectedTop) / projectedHeight);
        const clippedFraction = (1 - visibleAboveBox) * (1 - smooth(riseProgress));

        card.style.opacity = opacity.toFixed(4);
        card.style.transform = `translate3d(${(currentX - targetX).toFixed(2)}px, ${(currentY - targetY).toFixed(2)}px, 0) scale(${scale.toFixed(4)}) rotate(${rotation.toFixed(3)}deg)`;
        card.style.clipPath = `inset(0 0 ${(clippedFraction * 100).toFixed(3)}% 0 round 0.85rem)`;
        card.style.pointerEvents = fanProgress > 0.96 ? 'auto' : 'none';
        card.style.setProperty('--project-copy-opacity', copyProgress.toFixed(4));
        card.style.setProperty('--project-copy-y', `${((1 - copyProgress) * 8).toFixed(2)}px`);
        card.style.willChange = overall > 0.16 && overall < 0.82
          ? 'transform, opacity, clip-path'
          : 'auto';
      });
    };

    const requestRender = () => {
      if (this.frame) return;
      this.frame = window.requestAnimationFrame(render);
    };

    const handleModeChange = () => {
      clear();
      requestRender();
    };

    opening.addEventListener('journey-box-painted', render, { signal });
    window.addEventListener('resize', requestRender, { passive: true, signal });
    narrow.addEventListener('change', handleModeChange, { signal });
    reduced.addEventListener('change', handleModeChange, { signal });
    void document.fonts.ready.then(requestRender);
    render();
  }

  disconnectedCallback() {
    this.abort?.abort();
    if (this.frame) window.cancelAnimationFrame(this.frame);
    delete this.dataset.enhanced;
  }
}

if (!customElements.get('selected-work')) {
  customElements.define('selected-work', SelectedWork);
}
