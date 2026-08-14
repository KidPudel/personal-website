import { clamp, smooth } from '../../lib/motion';
import { sampleEssenceColor, sampleEssenceNoise } from './opening/pigment-field';

const rayColor = (along: number) => {
  const t = clamp(along);

  if (t < 0.36) return sampleEssenceColor((t / 0.36) * 0.3);

  return sampleEssenceColor(0.54 + ((t - 0.36) / 0.64) * 0.46);
};

const rayBleed = () => Math.round(Math.min(72, Math.max(44, window.innerHeight * 0.065)));

const ridgeHeight = (normalizedX: number, seed: number) => {
  const swell = sampleEssenceNoise(normalizedX * 2.8 + seed, seed * 0.45);
  const ridge = sampleEssenceNoise(normalizedX * 7.1 - seed, seed * 0.9);
  const fold = sampleEssenceNoise(normalizedX * 14.2 + seed * 0.6, seed);

  return clamp(0.52 + swell * 0.16 + (ridge - 0.32) * 0.26 + Math.max(0, fold - 0.55) * 0.16);
};

const drawElasticField = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  placement: 'top' | 'bottom',
) => {
  // A connected ridged curtain, not separate columns. Essence color travels from
  // the viewport origin toward the page. The spring never repaints this bitmap.
  const targetWidth = Math.max(36, Math.min(52, Math.round(window.innerWidth / 32)));
  const targetHeight = 48;

  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth;
    canvas.height = targetHeight;
  }

  const image = context.createImageData(targetWidth, targetHeight);
  const pixels = image.data;
  const seed = placement === 'top' ? 2.7 : 9.4;
  const heights = new Float32Array(targetWidth);

  for (let pixelX = 0; pixelX < targetWidth; pixelX += 1) {
    heights[pixelX] = ridgeHeight(pixelX / Math.max(1, targetWidth - 1), seed);
  }

  for (let pixelY = 0; pixelY < targetHeight; pixelY += 1) {
    const normalizedY = pixelY / Math.max(1, targetHeight - 1);
    const depth = placement === 'top' ? normalizedY : 1 - normalizedY;
    const seam = 1 - smooth(clamp(depth / (placement === 'top' ? 0.12 : 0.06)));

    for (let pixelX = 0; pixelX < targetWidth; pixelX += 1) {
      const index = (pixelY * targetWidth + pixelX) * 4;
      const height = heights[pixelX];

      if (depth > height) {
        pixels[index + 3] = 0;
        continue;
      }

      const along = clamp(depth / Math.max(height, 0.001));
      const color = rayColor(along);
      const tipFade = 1 - smooth(clamp((along - 0.82) / 0.18));

      pixels[index] = color[0];
      pixels[index + 1] = color[1];
      pixels[index + 2] = color[2];
      pixels[index + 3] = Math.round(tipFade * (1 - seam) * 255);
    }
  }

  context.putImageData(image, 0, 0);
};

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
    const canvas = this.querySelector<HTMLCanvasElement>('.elastic-overscroll-backdrop__field');
    const context = canvas?.getContext('2d');
    let pull = 0;
    let target = 0;
    let velocity = 0;
    let lastTime: number | undefined;
    let touchOriginY: number | undefined;
    let wasActive = false;
    let refreshArmed = false;
    let refreshGestureAt = 0;
    let reloading = false;
    const maximumPull = () => Math.min(180, Math.max(96, window.innerHeight * 0.18));
    const refreshThreshold = () => maximumPull() * 0.78;
    const maximumScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const pullProperty = placement === 'top' ? '--elastic-top-pull' : '--elastic-bottom-pull';
    const atEdge = () =>
      placement === 'top' ? window.scrollY <= 1 : window.scrollY >= maximumScroll() - 1;

    const paint = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      const visualPull = Math.round(pull * pixelRatio) / pixelRatio;
      const bleed = rayBleed();
      const active = visualPull > 0;
      this.style.setProperty('--edge-span', `${visualPull}px`);
      this.style.setProperty('--ray-bleed', `${bleed}px`);
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

    const disarmRefresh = () => {
      refreshArmed = false;
      refreshGestureAt = 0;
    };

    const armRefreshIfReady = (distance: number, fromTouch: boolean) => {
      // Native swipe-to-refresh cannot run while overscroll is suppressed.
      // A committed top pull reloads instead. Reduced motion restores native
      // overscroll, so it must not also trigger this custom reload.
      if (reducedMotion.matches || placement !== 'top' || !atEdge()) {
        disarmRefresh();
        return;
      }

      if (!refreshGestureAt) refreshGestureAt = performance.now();

      const heldLongEnough = fromTouch || performance.now() - refreshGestureAt >= 240;
      refreshArmed = distance >= refreshThreshold() && heldLongEnough;
    };

    const reloadDocument = () => {
      if (reloading) return;
      reloading = true;
      window.location.reload();
    };

    const release = () => {
      window.clearTimeout(this.releaseTimer);
      this.releaseTimer = 0;

      if (refreshArmed) {
        reloadDocument();
        return;
      }

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

    const setPull = (
      distance: number,
      source: 'touch' | 'wheel' | 'inertia',
      releaseAfterInput = false,
    ) => {
      if (!atEdge()) return;

      const next = Math.min(maximumPull(), Math.max(0, distance));

      if (source === 'touch') armRefreshIfReady(next, true);
      if (source === 'wheel') armRefreshIfReady(next, false);

      if (!reducedMotion.matches) {
        target = next;
        requestRender();
      }

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
        disarmRefresh();
        if (pull > 0.5 || target > 0) {
          release();
        }
        return;
      }

      if (!atEdge()) return;

      const fromUser = event.cancelable;
      if (!fromUser && refreshArmed) {
        release();
        return;
      }

      setPull(
        Math.max(pull, target) + outwardDistance * 0.42,
        fromUser ? 'wheel' : 'inertia',
        true,
      );
    };

    const handleScroll = () => {
      if (!atEdge() && touchOriginY === undefined) {
        disarmRefresh();
        release();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (!atEdge() || event.touches.length !== 1) return;
      touchOriginY = event.touches[0]?.clientY;
      disarmRefresh();
      window.clearTimeout(this.releaseTimer);
      this.releaseTimer = 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchOriginY === undefined || event.touches.length !== 1) return;
      const currentY = event.touches[0]?.clientY ?? touchOriginY;
      const outwardDistance = placement === 'top' ? currentY - touchOriginY : touchOriginY - currentY;

      if (outwardDistance > 0) {
        setPull(outwardDistance * 0.64, 'touch');
        return;
      }

      disarmRefresh();
      if (pull > 0.5 || target > 0) {
        release();
      }
    };

    const handleTouchEnd = () => {
      touchOriginY = undefined;
      release();
    };

    const handleTouchCancel = () => {
      touchOriginY = undefined;
      disarmRefresh();
      release();
    };

    const handleMotionPreference = () => {
      disarmRefresh();
      release();
    };
    const updateGeometry = () => {
      this.style.setProperty('--ray-bleed', `${rayBleed()}px`);
      if (canvas && context) drawElasticField(canvas, context, placement);
    };
    const handleResize = () => {
      updateGeometry();
      paint();
    };

    window.addEventListener('wheel', handleWheel, { passive: true, signal: this.abort.signal });
    window.addEventListener('scroll', handleScroll, { passive: true, signal: this.abort.signal });
    window.addEventListener('touchstart', handleTouchStart, { passive: true, signal: this.abort.signal });
    window.addEventListener('touchmove', handleTouchMove, { passive: true, signal: this.abort.signal });
    window.addEventListener('touchend', handleTouchEnd, { passive: true, signal: this.abort.signal });
    window.addEventListener('touchcancel', handleTouchCancel, { passive: true, signal: this.abort.signal });
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
