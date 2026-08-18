import { clamp, smooth } from '../../../lib/motion';
import { personalNoteMotion } from './personal-note-motion';

class PersonalNote extends HTMLElement {
  private abort?: AbortController;
  private constellationFrame = 0;
  private portraitLayoutAnimations = new Map<HTMLElement, Animation>();
  private doodleAnimations = new Map<HTMLElement, Animation>();
  private drag: {
    doodle: HTMLElement;
    pointerId: number;
    offsetX: number;
    offsetY: number;
    boundaryX: number;
    boundaryY: number;
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
    this.portraitLayoutAnimations.forEach((animation) => animation.cancel());
    this.portraitLayoutAnimations.clear();
    this.doodleAnimations.forEach((animation) => animation.cancel());
    this.doodleAnimations.clear();
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
      this.cancelDoodleAnimation(doodle);
      delete doodle.dataset.placed;
      doodle.style.removeProperty('--hold-x');
      doodle.style.removeProperty('--hold-y');
      doodle.style.removeProperty('left');
      doodle.style.removeProperty('top');
      doodle.style.removeProperty('translate');
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
    const movingSlots = Array.from(
      this.querySelectorAll<HTMLElement>(
        '.personal-note__slot--games, .personal-note__slot--blog, .personal-note__slot--sketcher',
      ),
    );
    const bridgeMobileReflow = window.matchMedia('(max-width: 50rem)').matches;
    const previousDocumentTops = new Map<HTMLElement, number>();

    if (bridgeMobileReflow) {
      movingSlots.forEach((slot) => {
        previousDocumentTops.set(slot, slot.getBoundingClientRect().top + window.scrollY);
        this.portraitLayoutAnimations.get(slot)?.cancel();
        this.portraitLayoutAnimations.delete(slot);
      });
    }

    this.toggleAttribute('data-portrait-visible', visible);
    portrait.setAttribute('aria-hidden', String(!visible));
    trigger.setAttribute('aria-expanded', String(visible));
    trigger.setAttribute(
      'aria-label',
      visible ? 'Hide the photo of Igor and his girlfriend' : 'Show a photo of Igor and his girlfriend',
    );

    if (bridgeMobileReflow) this.animatePortraitReflow(movingSlots, previousDocumentTops);
  }

  private animatePortraitReflow(
    slots: HTMLElement[],
    previousDocumentTops: Map<HTMLElement, number>,
  ) {
    const reducedMotion = this.reducedMotion();
    const duration = reducedMotion
      ? personalNoteMotion.reducedInteractionDurationMs
      : personalNoteMotion.portraitReflowDurationMs;

    slots.forEach((slot) => {
      const previousDocumentTop = previousDocumentTops.get(slot);
      if (previousDocumentTop === undefined) return;
      const nextDocumentTop = slot.getBoundingClientRect().top + window.scrollY;
      const deltaY = previousDocumentTop - nextDocumentTop;
      if (!reducedMotion && Math.abs(deltaY) < 0.5) return;

      const animation = reducedMotion
        ? slot.animate(
            [{ opacity: 0 }, { opacity: 1 }],
            {
              duration,
              easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
            },
          )
        : slot.animate(
            [
              { transform: `translate3d(0, ${deltaY.toFixed(2)}px, 0)` },
              { transform: 'translate3d(0, 0, 0)' },
            ],
            {
              duration,
              easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
            },
          );

      this.portraitLayoutAnimations.set(slot, animation);
      void animation.finished
        .catch(() => undefined)
        .then(() => {
          if (this.portraitLayoutAnimations.get(slot) !== animation) return;
          animation.cancel();
          this.portraitLayoutAnimations.delete(slot);
        });
    });
  }

  private onPointerDown = (event: PointerEvent) => {
    if (
      !event.isPrimary ||
      event.button !== 0 ||
      this.drag ||
      !this.hasAttribute('data-doodles-visible')
    ) return;
    const doodle = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-personal-doodle]');
    if (!doodle) return;

    event.preventDefault();
    this.cancelDoodleAnimation(doodle, true);
    const rect = doodle.getBoundingClientRect();
    doodle.setPointerCapture(event.pointerId);
    doodle.dataset.dragging = 'true';
    this.drag = {
      doodle,
      pointerId: event.pointerId,
      offsetX: event.clientX - (rect.left + rect.width / 2),
      offsetY: event.clientY - (rect.top + rect.height / 2),
      boundaryX: 0,
      boundaryY: 0,
    };
  };

  private onPointerMove = (event: PointerEvent) => {
    if (!this.drag || event.pointerId !== this.drag.pointerId) return;

    const field = this.querySelector<HTMLElement>('[data-doodle-field]');
    if (!field) return;

    const fieldRect = field.getBoundingClientRect();
    const rawX = event.clientX - fieldRect.left - this.drag.offsetX;
    const rawY = event.clientY - fieldRect.top - this.drag.offsetY;
    const inset = personalNoteMotion.doodleBoundaryInsetPx;
    const x = Math.min(fieldRect.width - inset, Math.max(inset, rawX));
    const y = Math.min(fieldRect.height - inset, Math.max(inset, rawY));
    const resistance = this.reducedMotion() ? 0 : personalNoteMotion.doodleBoundaryResistance;
    const boundaryX = (rawX - x) * resistance;
    const boundaryY = (rawY - y) * resistance;
    this.drag.boundaryX = boundaryX;
    this.drag.boundaryY = boundaryY;
    this.drag.doodle.style.left = `${x}px`;
    this.drag.doodle.style.top = `${y}px`;
    this.drag.doodle.style.translate = `${boundaryX.toFixed(2)}px ${boundaryY.toFixed(2)}px`;
  };

  private onPointerUp = (event: PointerEvent) => {
    if (!this.drag || event.pointerId !== this.drag.pointerId) return;

    const { doodle, boundaryX, boundaryY, pointerId } = this.drag;
    if (doodle.hasPointerCapture(pointerId)) doodle.releasePointerCapture(pointerId);
    doodle.dataset.placed = 'true';
    doodle.style.setProperty('--hold-x', doodle.style.left);
    doodle.style.setProperty('--hold-y', doodle.style.top);
    doodle.style.removeProperty('left');
    doodle.style.removeProperty('top');
    delete doodle.dataset.dragging;
    this.drag = null;
    this.settleDoodle(doodle, boundaryX, boundaryY);
  };

  private cancelDoodleAnimation(doodle: HTMLElement, preservePosition = false) {
    const animation = this.doodleAnimations.get(doodle);
    if (!animation) return;

    const currentTranslate = preservePosition ? getComputedStyle(doodle).translate : '';
    animation.cancel();
    this.doodleAnimations.delete(doodle);
    if (preservePosition && currentTranslate && currentTranslate !== 'none') {
      doodle.style.translate = currentTranslate;
    }
  }

  private settleDoodle(doodle: HTMLElement, boundaryX: number, boundaryY: number) {
    this.cancelDoodleAnimation(doodle);

    if (this.reducedMotion()) {
      doodle.style.removeProperty('translate');
      const animation = doodle.animate(
        [{ opacity: 0.86 }, { opacity: 1 }, { opacity: 0.86 }],
        {
          duration: personalNoteMotion.reducedInteractionDurationMs,
          easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
        },
      );
      this.trackDoodleAnimation(doodle, animation);
      return;
    }

    if (Math.abs(boundaryX) < 0.5 && Math.abs(boundaryY) < 0.5) {
      doodle.style.removeProperty('translate');
      return;
    }

    doodle.style.translate = '0 0';
    const animation = doodle.animate(
      [
        { translate: `${boundaryX.toFixed(2)}px ${boundaryY.toFixed(2)}px` },
        { translate: '0 0' },
      ],
      {
        duration: personalNoteMotion.doodleReleaseDurationMs,
        easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    );
    this.trackDoodleAnimation(doodle, animation);
  }

  private trackDoodleAnimation(doodle: HTMLElement, animation: Animation) {
    this.doodleAnimations.set(doodle, animation);
    void animation.finished
      .catch(() => undefined)
      .then(() => {
        if (this.doodleAnimations.get(doodle) !== animation) return;
        animation.cancel();
        this.doodleAnimations.delete(doodle);
        doodle.style.removeProperty('translate');
      });
  }
}

if (!customElements.get('personal-note')) {
  customElements.define('personal-note', PersonalNote);
}
