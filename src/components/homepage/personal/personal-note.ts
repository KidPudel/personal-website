import { personalNoteMotion } from './personal-note-motion';

class PersonalNote extends HTMLElement {
  private abort?: AbortController;
  private constellationObserver?: IntersectionObserver;
  private constellationAnimations: Animation[] = [];
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
    this.constellationObserver?.disconnect();
    this.constellationObserver = undefined;
    this.cancelConstellationAnimations();
    this.abort?.abort();
    this.drag = null;
    delete this.dataset.enhanced;
  }

  private setupConstellation(signal: AbortSignal) {
    const heading = this.querySelector<HTMLElement>('#personal-title');
    const slots = this.querySelectorAll<HTMLElement>('.personal-note__slot');
    if (!heading || slots.length === 0) {
      this.dataset.constellation = 'revealed';
      return;
    }

    const reveal = (immediate = false) => this.revealConstellation(slots, immediate);

    if (this.reducedMotion() || location.hash === '#personal') {
      reveal(true);
      return;
    }

    this.collapseConstellation(heading, slots);
    this.dataset.constellation = 'pending';

    const tryReveal = (immediate = false) => {
      if (this.dataset.constellation === 'revealed') return;
      reveal(immediate);
    };

    this.constellationObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) tryReveal();
      },
      {
        threshold: personalNoteMotion.observerThreshold,
        rootMargin: personalNoteMotion.observerRootMargin,
      },
    );
    this.constellationObserver.observe(heading);

    this.addEventListener('focusin', () => tryReveal(true), { signal });
    window.addEventListener(
      'hashchange',
      () => {
        if (location.hash === '#personal') tryReveal(true);
      },
      { signal },
    );
    window.addEventListener(
      'resize',
      () => {
        if (this.dataset.constellation !== 'pending') return;
        this.collapseConstellation(heading, slots);
      },
      { signal, passive: true },
    );

    void document.fonts?.ready.then(() => {
      if (this.dataset.constellation === 'pending') this.collapseConstellation(heading, slots);
    });

    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener(
      'change',
      (event) => {
        if (event.matches) reveal(true);
      },
      { signal },
    );
  }

  private cancelConstellationAnimations() {
    for (const animation of this.constellationAnimations) animation.cancel();
    this.constellationAnimations = [];
  }

  private usedTranslate(value: string): [number, number] {
    if (!value || value === 'none') return [0, 0];
    const parts = value.trim().split(/\s+/);
    return [Number.parseFloat(parts[0]) || 0, Number.parseFloat(parts[1]) || 0];
  }

  private restConstellation(slots: Iterable<HTMLElement>) {
    this.cancelConstellationAnimations();
    for (const slot of slots) {
      slot.style.removeProperty('translate');
      delete slot.dataset.emergeDelay;
      delete slot.dataset.restTranslate;
      const item = slot.querySelector<HTMLElement>('.personal-note__item');
      item?.style.removeProperty('scale');
      item?.style.removeProperty('opacity');
    }
  }

  private collapseConstellation(heading: HTMLElement, slots: NodeListOf<HTMLElement>) {
    this.restConstellation(slots);
    void heading.offsetWidth;

    const headingRect = heading.getBoundingClientRect();
    const originX = headingRect.left + headingRect.width / 2;
    const originY = headingRect.top + headingRect.height / 2;

    [...slots]
      .map((slot) => {
        const rect = slot.getBoundingClientRect();
        const [restX, restY] = this.usedTranslate(getComputedStyle(slot).translate);
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        return {
          slot,
          restX,
          restY,
          dx: originX - x,
          dy: originY - y,
          distance: Math.hypot(originX - x, originY - y),
        };
      })
      .sort((first, second) => first.distance - second.distance)
      .forEach((item, index) => {
        item.slot.style.translate = `${item.restX + item.dx}px ${item.restY + item.dy}px`;
        item.slot.dataset.restTranslate = `${item.restX}px ${item.restY}px`;
        item.slot.dataset.emergeDelay = String(index * personalNoteMotion.staggerMs);
        const note = item.slot.querySelector<HTMLElement>('.personal-note__item');
        if (!note) return;
        note.style.scale = String(personalNoteMotion.emergeScale);
        note.style.opacity = '0';
      });
  }

  private revealConstellation(slots: NodeListOf<HTMLElement>, immediate = false) {
    if (this.dataset.constellation === 'revealed') return;

    this.constellationObserver?.disconnect();
    this.constellationObserver = undefined;

    if (immediate) {
      this.restConstellation(slots);
      this.dataset.constellation = 'revealed';
      return;
    }

    const starts = [...slots].map((slot) => ({
      slot,
      item: slot.querySelector<HTMLElement>('.personal-note__item'),
      from: slot.style.translate || getComputedStyle(slot).translate,
      to: slot.dataset.restTranslate || getComputedStyle(slot).translate,
      delay: Number(slot.dataset.emergeDelay || 0),
    }));

    this.dataset.constellation = 'revealed';

    for (const start of starts) {
      const travel = start.slot.animate(
        [{ translate: start.from }, { translate: start.to }],
        {
          duration: personalNoteMotion.durationMs,
          delay: start.delay,
          easing: personalNoteMotion.easing,
          fill: 'forwards',
        },
      );
      this.constellationAnimations.push(travel);

      const fade = start.item?.animate(
        [
          { scale: personalNoteMotion.emergeScale, opacity: 0 },
          { scale: 1, opacity: 1 },
        ],
        {
          duration: personalNoteMotion.durationMs,
          delay: start.delay,
          easing: personalNoteMotion.easing,
          fill: 'forwards',
        },
      );
      if (fade) this.constellationAnimations.push(fade);

      void travel.finished
        .then(() => {
          start.slot.style.removeProperty('translate');
          start.item?.style.removeProperty('scale');
          start.item?.style.removeProperty('opacity');
          travel.cancel();
          fade?.cancel();
        })
        .catch(() => undefined);
    }
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
