import { clamp } from '../../lib/motion';

class ElasticOverscrollBackdrop extends HTMLElement {
  private abort?: AbortController;
  private frame = 0;
  private releaseTimer = 0;

  connectedCallback() {
    if (this.dataset.enhanced) return;
    this.dataset.enhanced = 'true';
    this.abort = new AbortController();

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const placement = this.dataset.placement === 'top' ? 'top' : 'bottom';
    let pull = 0;
    let target = 0;
    let velocity = 0;
    let lastTime: number | undefined;
    let touchOriginY: number | undefined;
    let wasActive = false;
    const maximumPull = () => Math.min(180, Math.max(96, window.innerHeight * 0.18));
    const maximumScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const pullProperty = placement === 'top' ? '--elastic-top-pull' : '--elastic-bottom-pull';
    const atEdge = () =>
      placement === 'top' ? window.scrollY <= 1 : window.scrollY >= maximumScroll() - 1;

    const paint = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      const visualPull = Math.round(pull * pixelRatio) / pixelRatio;
      const extent = clamp(visualPull / maximumPull());
      const active = visualPull > 0;
      this.style.setProperty('--edge-scale', String(extent));
      document.documentElement.style.setProperty(pullProperty, `${visualPull}px`);

      if (active !== wasActive) {
        wasActive = active;
        this.toggleAttribute('data-edge-active', active);
        if (placement === 'top') {
          document.documentElement.toggleAttribute('data-elastic-top-edge', active);
        }
        document.documentElement.toggleAttribute(
          'data-elastic-edge',
          Boolean(document.querySelector('elastic-overscroll-backdrop[data-edge-active]')),
        );
      }
    };

    const requestRender = () => {
      if (this.frame) return;
      this.frame = window.requestAnimationFrame(render);
    };

    const release = () => {
      window.clearTimeout(this.releaseTimer);
      this.releaseTimer = 0;
      target = 0;
      requestRender();
    };

    const render = (timestamp: number) => {
      this.frame = 0;

      if (reducedMotion.matches) {
        pull = 0;
        target = 0;
        velocity = 0;
        lastTime = undefined;
        paint();
        return;
      }

      const elapsedSeconds = Math.min(
        0.032,
        Math.max(0.001, lastTime === undefined ? 0.016 : (timestamp - lastTime) / 1000),
      );
      const acceleration = (target - pull) * 210 - velocity * 25;
      velocity += acceleration * elapsedSeconds;
      pull = Math.min(maximumPull(), Math.max(0, pull + velocity * elapsedSeconds));
      lastTime = timestamp;
      paint();

      if (Math.abs(target - pull) > 0.08 || Math.abs(velocity) > 0.08) {
        requestRender();
        return;
      }

      pull = target;
      velocity = 0;
      lastTime = undefined;
      paint();
    };

    const setPull = (distance: number, releaseAfterInput = false) => {
      if (reducedMotion.matches || !atEdge()) return;
      target = Math.min(maximumPull(), Math.max(0, distance));
      requestRender();

      if (!releaseAfterInput) return;
      window.clearTimeout(this.releaseTimer);
      this.releaseTimer = window.setTimeout(release, 280);
    };

    const wheelDistance = (event: WheelEvent) => {
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16;
      if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight;
      return event.deltaY;
    };

    const handleWheel = (event: WheelEvent) => {
      const outwardDistance = placement === 'top' ? -wheelDistance(event) : wheelDistance(event);

      if (outwardDistance <= 0) {
        if (pull > 0.5 || target > 0) {
          release();
        }
        return;
      }

      if (!atEdge()) return;
      setPull(Math.max(pull, target) + outwardDistance * 0.42, true);
    };

    const handleScroll = () => {
      if (!atEdge() && touchOriginY === undefined) {
        release();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (!atEdge() || event.touches.length !== 1) return;
      touchOriginY = event.touches[0]?.clientY;
      window.clearTimeout(this.releaseTimer);
      this.releaseTimer = 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchOriginY === undefined || event.touches.length !== 1) return;
      const currentY = event.touches[0]?.clientY ?? touchOriginY;
      const outwardDistance = placement === 'top' ? currentY - touchOriginY : touchOriginY - currentY;

      if (outwardDistance > 0) {
        setPull(outwardDistance * 0.64);
        return;
      }

      if (pull > 0.5 || target > 0) {
        release();
      }
    };

    const handleTouchEnd = () => {
      touchOriginY = undefined;
      release();
    };

    const handleMotionPreference = () => release();
    const updateGeometry = () => this.style.setProperty('--edge-span', `${maximumPull()}px`);
    const handleResize = () => {
      updateGeometry();
      paint();
    };

    window.addEventListener('wheel', handleWheel, { passive: true, signal: this.abort.signal });
    window.addEventListener('scroll', handleScroll, { passive: true, signal: this.abort.signal });
    window.addEventListener('touchstart', handleTouchStart, { passive: true, signal: this.abort.signal });
    window.addEventListener('touchmove', handleTouchMove, { passive: true, signal: this.abort.signal });
    window.addEventListener('touchend', handleTouchEnd, { passive: true, signal: this.abort.signal });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true, signal: this.abort.signal });
    window.addEventListener('resize', handleResize, { passive: true, signal: this.abort.signal });
    reducedMotion.addEventListener('change', handleMotionPreference, { signal: this.abort.signal });
    updateGeometry();
    paint();
  }

  disconnectedCallback() {
    window.clearTimeout(this.releaseTimer);
    this.abort?.abort();
    if (this.frame) window.cancelAnimationFrame(this.frame);
    this.frame = 0;
    document.documentElement.style.removeProperty(
      this.dataset.placement === 'top' ? '--elastic-top-pull' : '--elastic-bottom-pull',
    );
    if (this.dataset.placement === 'top') {
      document.documentElement.removeAttribute('data-elastic-top-edge');
    }
    delete this.dataset.enhanced;
    this.removeAttribute('data-edge-active');
    document.documentElement.toggleAttribute(
      'data-elastic-edge',
      Boolean(document.querySelector('elastic-overscroll-backdrop[data-edge-active]')),
    );
  }
}

if (!customElements.get('elastic-overscroll-backdrop')) {
  customElements.define('elastic-overscroll-backdrop', ElasticOverscrollBackdrop);
}
