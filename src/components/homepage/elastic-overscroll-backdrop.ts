import { clamp, smooth } from '../../lib/motion';
import { sampleEssenceColor, sampleEssenceNoise } from './opening/pigment-field';

type Placement = 'top' | 'bottom';

interface EdgeLayer {
  backing: HTMLElement;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  glow: HTMLElement;
  host: HTMLElement;
  placement: Placement;
  seam: HTMLElement;
}

// The page boundary crosses the field before its transparent tips. This lets
// the last soft colour continue over the moving page instead of exposing a
// bright horizontal strip between the pigment and the opening sky.
const FIELD_SEAM = 0.58;
const PALETTE_SPAN = FIELD_SEAM * 0.9;
const RUBBERBAND_CONSTANT = 0.55;
const EDGE_SLOP = 4;
const GESTURE_SLOP = 8;

const rayBleed = () => Math.round(Math.min(72, Math.max(44, window.innerHeight * 0.065)));
const seamFeather = () => Math.round(Math.min(96, Math.max(64, window.innerHeight * 0.09)));

const ridgeHeight = (normalizedX: number, seed: number) => {
  const swell = sampleEssenceNoise(normalizedX * 2.8 + seed, seed * 0.45);
  const ridge = sampleEssenceNoise(normalizedX * 7.1 - seed, seed * 0.9);
  const fold = sampleEssenceNoise(normalizedX * 14.2 + seed * 0.6, seed);

  return clamp(0.52 + swell * 0.16 + (ridge - 0.32) * 0.26 + Math.max(0, fold - 0.55) * 0.16);
};

const drawElasticField = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  placement: Placement,
) => {
  // The bitmap is deliberately small and softly enlarged. It preserves the
  // drawn, uneven ridge while the continuous palette removes horizontal bands.
  const targetWidth = Math.max(36, Math.min(52, Math.round(window.innerWidth / 32)));
  const targetHeight = 56;

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
    const originFade = smooth(clamp(depth / 0.1));

    for (let pixelX = 0; pixelX < targetWidth; pixelX += 1) {
      const index = (pixelY * targetWidth + pixelX) * 4;
      const height = heights[pixelX];

      if (depth > height) {
        pixels[index + 3] = 0;
        continue;
      }

      const along = clamp(depth / Math.max(height, 0.001));
      // Stretch the whole essence range into the overscroll above the page, so
      // flame, cinnabar, and magenta read in the bounce instead of only in the
      // faded tip that continues over the sky.
      const color = sampleEssenceColor(clamp(depth / PALETTE_SPAN));
      const tipFade = 1 - smooth(clamp((along - 0.82) / 0.18));

      pixels[index] = color[0];
      pixels[index + 1] = color[1];
      pixels[index + 2] = color[2];
      pixels[index + 3] = Math.round(originFade * tipFade * 255);
    }
  }

  context.putImageData(image, 0, 0);
};

const rubberband = (distance: number, dimension: number) =>
  (distance * dimension * RUBBERBAND_CONSTANT) /
  (dimension + RUBBERBAND_CONSTANT * Math.abs(distance));

class ElasticOverscrollBackdrop extends HTMLElement {
  private abort?: AbortController;
  private frame = 0;
  private releaseTimer = 0;

  connectedCallback() {
    if (this.dataset.enhanced) return;
    this.dataset.enhanced = 'true';
    this.abort = new AbortController();

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const homepage = document.querySelector<HTMLElement>('[data-homepage]');
    const layers = new Map<Placement, EdgeLayer>();

    this.querySelectorAll<HTMLElement>('[data-elastic-layer]').forEach((host) => {
      const placement: Placement = host.dataset.placement === 'top' ? 'top' : 'bottom';
      const backing = host.querySelector<HTMLElement>('.elastic-overscroll-backdrop__backing');
      const glow = host.querySelector<HTMLElement>('.elastic-overscroll-backdrop__glow');
      const seam = host.querySelector<HTMLElement>('.elastic-overscroll-backdrop__seam');
      const canvas = host.querySelector<HTMLCanvasElement>('.elastic-overscroll-backdrop__field');
      const context = canvas?.getContext('2d');

      if (backing && glow && seam && canvas && context) {
        layers.set(placement, { backing, canvas, context, glow, host, placement, seam });
      }
    });

    if (!homepage || layers.size !== 2) return;

    let activePlacement: Placement | undefined;
    let pull = 0;
    let target = 0;
    let velocity = 0;
    let lastTime: number | undefined;
    let wheelDistance = 0;
    let pointerId: number | undefined;
    let gestureLock: 'overscroll' | 'scroll' | undefined;
    let originX = 0;
    let originY = 0;
    let startScroll = 0;
    let pullOffset = 0;

    const maximumPull = () => Math.min(180, Math.max(96, window.innerHeight * 0.18));
    const rubberbandDimension = () => Math.max(window.innerHeight, 1);
    const maximumScroll = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const atEdge = (placement: Placement) =>
      placement === 'top'
        ? window.scrollY <= EDGE_SLOP
        : window.scrollY >= maximumScroll() - EDGE_SLOP;

    const resetLayer = (layer: EdgeLayer) => {
      layer.backing.style.transform = 'scaleY(0)';
      layer.glow.style.transform = 'scaleY(0)';
      layer.seam.style.transform = '';
      layer.host.removeAttribute('data-edge-active');
    };

    const paint = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      const visualPull = Math.round(pull * pixelRatio) / pixelRatio;
      const activeLayer = activePlacement ? layers.get(activePlacement) : undefined;
      const scale = clamp(visualPull / maximumPull());

      layers.forEach((layer) => {
        if (layer === activeLayer && visualPull > 0) {
          layer.backing.style.transform = `scaleY(${scale})`;
          layer.glow.style.transform = `scaleY(${scale})`;
          const feather = seamFeather();
          const seamOffset =
            layer.placement === 'top'
              ? visualPull - feather / 2
              : -visualPull + feather / 2;
          layer.seam.style.transform = `translate3d(0, ${seamOffset}px, 0)`;
          layer.host.setAttribute('data-edge-active', '');
          return;
        }

        resetLayer(layer);
      });

      homepage.style.transform = activePlacement
        ? `translate3d(0, ${activePlacement === 'top' ? visualPull : -visualPull}px, 0)`
        : '';

      document.documentElement.toggleAttribute('data-elastic-edge', visualPull > 0);
    };

    const requestRender = () => {
      if (this.frame) return;
      this.frame = window.requestAnimationFrame(render);
    };

    const release = () => {
      window.clearTimeout(this.releaseTimer);
      this.releaseTimer = 0;
      wheelDistance = 0;
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
        activePlacement = undefined;
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

      if (pull === 0) activePlacement = undefined;
      paint();
    };

    const setPull = (
      placement: Placement,
      rawDistance: number,
      source: 'touch' | 'wheel',
      releaseAfterInput = false,
    ) => {
      if (reducedMotion.matches) return;
      if (source === 'wheel' && !atEdge(placement)) return;
      if (source === 'touch' && !atEdge(placement) && activePlacement !== placement) return;

      if (activePlacement && activePlacement !== placement) {
        pull = 0;
        velocity = 0;
      }

      activePlacement = placement;
      target = Math.min(
        maximumPull(),
        rubberband(Math.max(0, rawDistance), rubberbandDimension()),
      );

      if (source === 'touch') {
        pull = target;
        velocity = 0;
        lastTime = undefined;
        paint();
      } else {
        requestRender();
      }

      if (!releaseAfterInput) return;
      window.clearTimeout(this.releaseTimer);
      this.releaseTimer = window.setTimeout(release, 280);
    };

    const normalizedWheelDistance = (event: WheelEvent) => {
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16;
      if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight;
      return event.deltaY;
    };

    const handleWheel = (event: WheelEvent) => {
      const distance = normalizedWheelDistance(event);
      const placement =
        distance < 0 && atEdge('top')
          ? 'top'
          : distance > 0 && atEdge('bottom')
            ? 'bottom'
            : undefined;

      if (!placement) {
        if (activePlacement) release();
        return;
      }

      wheelDistance += Math.abs(distance);
      setPull(placement, wheelDistance, 'wheel', true);
    };

    const handleScroll = () => {
      if (activePlacement && !atEdge(activePlacement) && pointerId === undefined) release();
    };

    const overscrollFor = (deltaY: number) => {
      const topDistance = deltaY - startScroll + (activePlacement === 'top' ? pullOffset : 0);
      const bottomDistance =
        -deltaY - (maximumScroll() - startScroll) + (activePlacement === 'bottom' ? pullOffset : 0);

      if (topDistance > 0 && (atEdge('top') || activePlacement === 'top')) {
        return { placement: 'top' as const, distance: topDistance };
      }

      if (bottomDistance > 0 && (atEdge('bottom') || activePlacement === 'bottom')) {
        return { placement: 'bottom' as const, distance: bottomDistance };
      }

      return undefined;
    };

    const commitPointerDelta = (deltaX: number, deltaY: number) => {
      if (!gestureLock) {
        const enoughMove = deltaX * deltaX + deltaY * deltaY >= GESTURE_SLOP * GESTURE_SLOP;
        const downwardAtTop = atEdge('top') && deltaY > 1 && Math.abs(deltaY) >= Math.abs(deltaX);
        const upwardAtBottom = atEdge('bottom') && deltaY < -1 && Math.abs(deltaY) >= Math.abs(deltaX);
        if (!enoughMove && !downwardAtTop && !upwardAtBottom) return false;
        gestureLock = overscrollFor(deltaY) ? 'overscroll' : 'scroll';
      }

      if (gestureLock !== 'overscroll') return false;

      const overscroll = overscrollFor(deltaY);
      if (!overscroll) {
        gestureLock = 'scroll';
        if (activePlacement) release();
        return false;
      }

      setPull(overscroll.placement, overscroll.distance, 'touch');
      return true;
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!event.isPrimary) return;
      if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;

      pointerId = event.pointerId;
      originX = event.clientX;
      originY = event.clientY;
      startScroll = window.scrollY;
      pullOffset = pull;
      gestureLock = undefined;
      window.clearTimeout(this.releaseTimer);
      this.releaseTimer = 0;

      if (pull > 0) {
        target = pull;
        velocity = 0;
        lastTime = undefined;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId || reducedMotion.matches) return;
      commitPointerDelta(event.clientX - originX, event.clientY - originY);
    };

    // iOS only keeps sending movement if this gesture cannot scroll. After we
    // lock to an edge pull, prevent the failed native scroll so movement
    // continues and the bounce can update with the finger.
    const handleTouchMove = (event: TouchEvent) => {
      if (pointerId === undefined || reducedMotion.matches) return;

      const touch = event.touches[0];
      if (!touch) return;

      if (commitPointerDelta(touch.clientX - originX, touch.clientY - originY) && event.cancelable) {
        event.preventDefault();
      }
    };

    const endPointer = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return;

      pointerId = undefined;
      gestureLock = undefined;
      originX = 0;
      originY = 0;
      startScroll = 0;
      pullOffset = 0;
      if (pull > 0 || target > 0 || activePlacement) release();
    };

    const handleMotionPreference = () => release();

    const updateGeometry = () => {
      const maximum = maximumPull();
      const bleed = rayBleed();
      const feather = seamFeather();
      const fieldExtent = maximum / FIELD_SEAM;

      layers.forEach((layer) => {
        layer.host.style.height = `${fieldExtent + bleed}px`;
        layer.backing.style.height = `${maximum}px`;
        layer.glow.style.height = `${fieldExtent}px`;
        layer.seam.style.height = `${feather}px`;
        drawElasticField(layer.canvas, layer.context, layer.placement);
      });
    };

    const handleResize = () => {
      updateGeometry();
      paint();
    };

    window.addEventListener('wheel', handleWheel, { passive: true, signal: this.abort.signal });
    window.addEventListener('scroll', handleScroll, { passive: true, signal: this.abort.signal });
    document.addEventListener('pointerdown', handlePointerDown, {
      capture: true,
      passive: true,
      signal: this.abort.signal,
    });
    document.addEventListener('pointermove', handlePointerMove, {
      capture: true,
      passive: true,
      signal: this.abort.signal,
    });
    document.addEventListener('touchmove', handleTouchMove, {
      capture: true,
      passive: false,
      signal: this.abort.signal,
    });
    document.addEventListener('pointerup', endPointer, {
      capture: true,
      passive: true,
      signal: this.abort.signal,
    });
    document.addEventListener('pointercancel', endPointer, {
      capture: true,
      passive: true,
      signal: this.abort.signal,
    });
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

    const homepage = document.querySelector<HTMLElement>('[data-homepage]');
    if (homepage) homepage.style.transform = '';

    delete this.dataset.enhanced;
    document.documentElement.removeAttribute('data-elastic-edge');
  }
}

if (!customElements.get('elastic-overscroll-backdrop')) {
  customElements.define('elastic-overscroll-backdrop', ElasticOverscrollBackdrop);
}
