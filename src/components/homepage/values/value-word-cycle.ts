class ValueWordCycle extends HTMLElement {
  private abort?: AbortController;
  private cleanupTimer = 0;

  connectedCallback() {
    if (this.hasAttribute('data-ready')) return;

    const button = this.querySelector<HTMLButtonElement>('[data-word-cycle]');
    const options = Array.from(this.querySelectorAll<HTMLElement>('[data-word-option]'));
    if (!button || options.length < 2) return;

    this.abort = new AbortController();
    let activeIndex = 0;

    options.forEach((option, index) => {
      option.hidden = false;
      option.setAttribute('aria-hidden', 'true');
      option.toggleAttribute('data-word-visible', index === activeIndex);
      option.toggleAttribute('data-word-active', index === activeIndex);
    });

    this.setAttribute('data-ready', '');
    button.disabled = false;

    button.addEventListener('click', () => {
      if (this.hasAttribute('data-cycling')) return;

      const outgoing = options[activeIndex];
      const nextIndex = (activeIndex + 1) % options.length;
      const incoming = options[nextIndex];
      if (!outgoing || !incoming) return;

      this.setAttribute('data-cycling', '');
      incoming.setAttribute('data-word-visible', '');

      window.requestAnimationFrame(() => {
        outgoing.removeAttribute('data-word-active');
        incoming.setAttribute('data-word-active', '');
      });

      activeIndex = nextIndex;
      const word = incoming.textContent?.trim() ?? '';
      button.setAttribute('aria-label', `${word}. Change this word.`);

      const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 120 : 220;
      this.cleanupTimer = window.setTimeout(() => {
        outgoing.removeAttribute('data-word-visible');
        this.removeAttribute('data-cycling');
        this.cleanupTimer = 0;
      }, duration + 34);
    }, { signal: this.abort.signal });
  }

  disconnectedCallback() {
    this.abort?.abort();
    window.clearTimeout(this.cleanupTimer);
    this.cleanupTimer = 0;
    this.removeAttribute('data-ready');
    this.removeAttribute('data-cycling');
  }
}

if (!customElements.get('value-word-cycle')) {
  customElements.define('value-word-cycle', ValueWordCycle);
}
