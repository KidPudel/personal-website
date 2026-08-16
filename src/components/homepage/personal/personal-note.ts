import { clamp, smooth } from '../../../lib/motion';
import { personalNoteMotion } from './personal-note-motion';

class PersonalNote extends HTMLElement {
  private abort?: AbortController;
  private constellationFrame = 0;
  private drag: {
    doodle: HTMLElement;
    pointerId: number;
    offsetX: number;
    offsetY: number;
  } | null = null;

  connectedCallback() {
    if (this.dataset.enhanced) return;
    this.dataset.enhanced = 'true';
    this.abort = new AbortController();
    const { signal } = this.abort;

    const doodleTrigger = this.querySelector<HTMLButtonElement>('[data-personal-action="doodles"]');
    const portraitTrigger = this.querySelector<HTMLButtonElement>('[data-personal-action="portrait"]');
    const doodles = this.querySelectorAll<HTMLElement>('[data-personal-doodle]');
    const portrait = this.querySelector<HTMLElement>('[data-personal-portrait]');
    const field = this.querySelector<HTMLElement>('[data-doodle-field]');
    this.setupConstellation(signal);

    if (doodleTrigger && field && doodles.length) {
      doodleTrigger.disabled = false;
      doodleTrigger.addEventListener('click', () => this.toggleDoodles(doodleTrigger, field), { signal });
      field.addEventListener('pointerdown', this.onPointerDown, { signal });
      window.addEventListener('pointermove', this.onPointerMove, { signal });
      window.addEventListener('pointerup', this.onPointerUp, { signal });
      window.addEventListener('pointercancel', this.onPointerUp, { signal });
    }

    if (portraitTrigger && portrait) {
      portraitTrigger.disabled = false;
      portraitTrigger.addEventListener('click', () => this.togglePortrait(portraitTrigger, portrait), {
        signal,
      });
    }

    this.addEventListener(
      'keydown',
      (event) => {
        if (event.key !== 'Escape') return;
        if (this.hasAttribute('data-doodles-visible') && doodleTrigger && field) {
          this.hideDoodles(doodleTrigger, field);
          doodleTrigger.focus();
        }
        if (this.hasAttribute('data-portrait-visible') && portraitTrigger && portrait) {
          this.setPortraitVisible(portraitTrigger, portrait, false);
          portraitTrigger.focus();
        }
      },
      { signal },
    );
  }

  disconnectedCallback() {
    if (this.constellationFrame) window.cancelAnimationFrame(this.constellationFrame);
    this.abort?.abort();
    this.drag = null;
    delete this.dataset.enhanced;
  }

  private setupConstellation(signal: AbortSignal) {
    const section = this.querySelector<HTMLElement>('.personal-note');
    const heading = this.querySelector<HTMLElement>('#personal-title');
    const slots = Array.from(this.querySelectorAll<HTMLElement>('.personal-note__slot'));
    const boxFrame = () =>
      this.closest('value-story')?.querySelector<HTMLElement>(
        '[data-opening-frame][data-active]',
      );
    if (!section || !heading || slots.length === 0 || !boxFrame()) {
      this.dataset.constellation = 'revealed';
      return;
    }

    if (this.reducedMotion() || location.hash === '#personal') {
      this.dataset.constellation = 'revealed';
      return;
    }

    type Target = { documentX: number; documentY: number };
    let headingTarget: Target = { documentX: 0, documentY: 0 };
    let headingWidth = 0;
    let headingHeight = 0;
    let headingLayoutHeight = 0;
    let slotTargets: Target[] = [];
    let forceVisible = false;

    const clearMotion = () => {
      heading.style.removeProperty('opacity');
      heading.style.removeProperty('transform');
      heading.style.removeProperty('position');
      heading.style.removeProperty('top');
      heading.style.removeProperty('left');
      heading.style.removeProperty('width');
      slots.forEach((slot) => {
        slot.style.removeProperty('transform');
        slot.style.removeProperty('pointer-events');
        const item = slot.querySelector<HTMLElement>('.personal-note__item');
        item?.style.removeProperty('opacity');
      });
    };

    const measure = () => {
      clearMotion();
      void heading.offsetWidth;
      const headingRect = heading.getBoundingClientRect();
      headingTarget = {
        documentX: headingRect.left + headingRect.width / 2 + window.scrollX,
        documentY: headingRect.top + headingRect.height / 2 + window.scrollY,
      };
      headingWidth = headingRect.width;
      headingHeight = headingRect.height;
      headingLayoutHeight = heading.offsetHeight;
      slotTargets = slots.map((slot) => {
        const rect = slot.getBoundingClientRect();
        return {
          documentX: rect.left + rect.width / 2 + window.scrollX,
          documentY: rect.top + rect.height / 2 + window.scrollY,
        };
      });
    };

    const render = () => {
      this.constellationFrame = 0;
      if (forceVisible || this.reducedMotion()) {
        clearMotion();
        return;
      }

      const frame = boxFrame();
      if (!frame) return;
      const bounds = frame.getBoundingClientRect();
      const sourceX = bounds.left + bounds.width / 2;
      const sourceY = bounds.top + bounds.height / 2;
      const sectionTop = section.getBoundingClientRect().top;
      const start = window.innerHeight * personalNoteMotion.viewportStart;
      const end = window.innerHeight * personalNoteMotion.viewportEnd;
      const progress = clamp((start - sectionTop) / Math.max(1, start - end));

      const headingRise = smooth(
        clamp(
          (progress - personalNoteMotion.headingStart) /
            personalNoteMotion.headingDistance,
        ),
      );
      const timedHeadingOpacity = smooth(
        clamp(
          (headingRise - personalNoteMotion.headingVisibilityStart) /
            personalNoteMotion.headingVisibilityDistance,
        ),
      );
      const headingX = headingTarget.documentX - window.scrollX;
      const layoutHeadingY = headingTarget.documentY - window.scrollY;
      const visualBoxTop =
        bounds.top + bounds.height * personalNoteMotion.boxVisualTop;
      const safeHeadingY =
        visualBoxTop - headingLayoutHeight / 2 - personalNoteMotion.headingRestGapPx;
      const headingY = Math.min(layoutHeadingY, safeHeadingY);
      const headingScale =
        personalNoteMotion.sourceScale +
        (1 - personalNoteMotion.sourceScale) * headingRise;
      const currentHeadingX = sourceX + (headingX - sourceX) * headingRise;
      const currentHeadingY = sourceY + (headingY - sourceY) * headingRise;
      const headingClearance = visualBoxTop - (currentHeadingY + headingLayoutHeight / 2);
      const clearanceOpacity = smooth(
        clamp(headingClearance / personalNoteMotion.headingClearanceFadePx),
      );
      heading.style.opacity = (timedHeadingOpacity * clearanceOpacity).toFixed(4);
      // A viewport layer keeps asynchronous page scrolling from fighting the
      // heading's counter-translation during the wide-screen flight.
      const useViewportLayer =
        window.innerWidth > 800 && (headingRise < 1 || layoutHeadingY > safeHeadingY);
      if (useViewportLayer) {
        heading.style.position = 'fixed';
        heading.style.top = '0';
        heading.style.left = '0';
        heading.style.width = `${headingWidth.toFixed(2)}px`;
        heading.style.transform = `translate3d(${(currentHeadingX - headingWidth / 2).toFixed(2)}px, ${(currentHeadingY - headingHeight / 2).toFixed(2)}px, 0) scale(${headingScale.toFixed(4)})`;
      } else {
        heading.style.removeProperty('position');
        heading.style.removeProperty('top');
        heading.style.removeProperty('left');
        heading.style.removeProperty('width');
        heading.style.transform = `translate3d(${(currentHeadingX - headingX).toFixed(2)}px, ${(currentHeadingY - layoutHeadingY).toFixed(2)}px, 0) scale(${headingScale.toFixed(4)})`;
      }

      const notesRise = smooth(
        clamp(
          (progress - personalNoteMotion.notesRiseStart) /
            personalNoteMotion.notesRiseDistance,
        ),
      );
      const spread = smooth(
        clamp(
          (progress - personalNoteMotion.notesSpreadStart) /
            personalNoteMotion.notesSpreadDistance,
        ),
      );
      const clusterX = headingX;
      const clusterY = headingY + headingLayoutHeight * 1.8;

      slots.forEach((slot, index) => {
        const target = slotTargets[index];
        if (!target) return;
        const item = slot.querySelector<HTMLElement>('.personal-note__item');
        const targetX = target.documentX - window.scrollX;
        const targetY = target.documentY - window.scrollY;
        const clusterOffset = (index - (slots.length - 1) / 2) * personalNoteMotion.clusterGapPx;
        const risenX = sourceX + (clusterX + clusterOffset - sourceX) * notesRise;
        const risenY = sourceY + (clusterY + index * 2 - sourceY) * notesRise;
        const currentX = risenX + (targetX - risenX) * spread;
        const currentY = risenY + (targetY - risenY) * spread;
        const scale =
          personalNoteMotion.sourceScale +
          (personalNoteMotion.clusterScale - personalNoteMotion.sourceScale) * notesRise +
          (1 - personalNoteMotion.clusterScale) * spread;
        const opacity = smooth(
          clamp(
            (spread -
              personalNoteMotion.noteOpacityStart -
              index * personalNoteMotion.noteOpacityStagger) /
              personalNoteMotion.noteOpacityDistance,
          ),
        );
        slot.style.transform = `translate3d(${(currentX - targetX).toFixed(2)}px, ${(currentY - targetY).toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
        slot.style.pointerEvents = spread > 0.94 ? 'auto' : 'none';
        if (item) item.style.opacity = opacity.toFixed(4);
      });
    };

    const requestRender = () => {
      if (this.constellationFrame) return;
      this.constellationFrame = window.requestAnimationFrame(render);
    };

    const showImmediately = () => {
      forceVisible = true;
      clearMotion();
      this.dataset.constellation = 'revealed';
    };

    this.dataset.constellation = 'revealed';
    measure();
    render();

    window.addEventListener('scroll', requestRender, { passive: true, signal });
    window.addEventListener(
      'resize',
      () => {
        measure();
        requestRender();
      },
      { passive: true, signal },
    );
    this.addEventListener('focusin', showImmediately, { signal, once: true });
    window.addEventListener(
      'hashchange',
      () => {
        if (location.hash === '#personal') showImmediately();
      },
      { signal },
    );
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener(
      'change',
      requestRender,
      { signal },
    );
    void document.fonts?.ready.then(() => {
      if (signal.aborted) return;
      measure();
      requestRender();
    });
  }

  private reducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private setSpawnOrigin(trigger: HTMLElement, field: HTMLElement) {
    const fieldRect = field.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    field.style.setProperty(
      '--spawn-x',
      `${triggerRect.left + triggerRect.width / 2 - fieldRect.left}px`,
    );
    field.style.setProperty(
      '--spawn-y',
      `${triggerRect.top + triggerRect.height / 2 - fieldRect.top}px`,
    );
  }

  private clearPlacedDoodles() {
    this.querySelectorAll<HTMLElement>('[data-personal-doodle]').forEach((doodle) => {
      delete doodle.dataset.placed;
      doodle.style.removeProperty('--hold-x');
      doodle.style.removeProperty('--hold-y');
      doodle.style.removeProperty('left');
      doodle.style.removeProperty('top');
    });
  }

  private setDoodlesExpanded(trigger: HTMLButtonElement, expanded: boolean) {
    trigger.setAttribute('aria-expanded', String(expanded));
    trigger.setAttribute(
      'aria-label',
      expanded ? 'Hide handwritten doodles' : 'Show handwritten doodles',
    );
  }

  private toggleDoodles(trigger: HTMLButtonElement, field: HTMLElement) {
    if (this.hasAttribute('data-doodles-visible')) {
      this.hideDoodles(trigger, field);
      return;
    }

    this.clearPlacedDoodles();
    this.setSpawnOrigin(trigger, field);
    if (!this.reducedMotion()) void field.offsetWidth;
    this.dataset.doodlesVisible = 'true';
    this.setDoodlesExpanded(trigger, true);
  }

  private hideDoodles(trigger: HTMLButtonElement, field: HTMLElement) {
    this.setSpawnOrigin(trigger, field);
    if (!this.reducedMotion()) void field.offsetWidth;
    delete this.dataset.doodlesVisible;
    this.setDoodlesExpanded(trigger, false);
  }

  private togglePortrait(trigger: HTMLButtonElement, portrait: HTMLElement) {
    this.setPortraitVisible(trigger, portrait, !this.hasAttribute('data-portrait-visible'));
  }

  private setPortraitVisible(trigger: HTMLButtonElement, portrait: HTMLElement, visible: boolean) {
    this.toggleAttribute('data-portrait-visible', visible);
    portrait.setAttribute('aria-hidden', String(!visible));
    trigger.setAttribute('aria-expanded', String(visible));
    trigger.setAttribute(
      'aria-label',
      visible ? 'Hide the photo of Igor and his girlfriend' : 'Show a photo of Igor and his girlfriend',
    );
  }

  private onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0 || !this.hasAttribute('data-doodles-visible')) return;
    const doodle = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-personal-doodle]');
    if (!doodle) return;

    event.preventDefault();
    const rect = doodle.getBoundingClientRect();
    doodle.setPointerCapture(event.pointerId);
    doodle.dataset.dragging = 'true';
    this.drag = {
      doodle,
      pointerId: event.pointerId,
      offsetX: event.clientX - (rect.left + rect.width / 2),
      offsetY: event.clientY - (rect.top + rect.height / 2),
    };
  };

  private onPointerMove = (event: PointerEvent) => {
    if (!this.drag || event.pointerId !== this.drag.pointerId) return;

    const field = this.querySelector<HTMLElement>('[data-doodle-field]');
    if (!field) return;

    const fieldRect = field.getBoundingClientRect();
    const x = Math.min(fieldRect.width - 24, Math.max(24, event.clientX - fieldRect.left - this.drag.offsetX));
    const y = Math.min(fieldRect.height - 24, Math.max(24, event.clientY - fieldRect.top - this.drag.offsetY));
    this.drag.doodle.style.left = `${x}px`;
    this.drag.doodle.style.top = `${y}px`;
  };

  private onPointerUp = (event: PointerEvent) => {
    if (!this.drag || event.pointerId !== this.drag.pointerId) return;

    const { doodle } = this.drag;
    doodle.dataset.placed = 'true';
    doodle.style.setProperty('--hold-x', doodle.style.left);
    doodle.style.setProperty('--hold-y', doodle.style.top);
    doodle.style.removeProperty('left');
    doodle.style.removeProperty('top');
    delete doodle.dataset.dragging;
    this.drag = null;
  };
}

if (!customElements.get('personal-note')) {
  customElements.define('personal-note', PersonalNote);
}
