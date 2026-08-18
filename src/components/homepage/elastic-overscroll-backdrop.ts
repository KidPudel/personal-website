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
const EDGE_SLOP = 16;

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
    let touchOriginY: number | undefined;
    let touchStartScroll = 0;
    let touchPullOffset = 0;

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
      if (activePlacement && !atEdge(activePlacement) && touchOriginY === undefined) release();
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) return;

      touchOriginY = event.touches[0]?.clientY;
      touchStartScroll = window.scrollY;
      touchPullOffset = pull;
      window.clearTimeout(this.releaseTimer);
      this.releaseTimer = 0;

      if (pull > 0) {
        target = pull;
        velocity = 0;
        lastTime = undefined;
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (touchOriginY === undefined || event.touches.length !== 1 || reducedMotion.matches) return;

      const currentY = event.touches[0]?.clientY ?? touchOriginY;
      const delta = currentY - touchOriginY;
      const topOverscroll =
        delta - touchStartScroll + (activePlacement === 'top' ? touchPullOffset : 0);
      const bottomOverscroll =
        -delta - (maximumScroll() - touchStartScroll) + (activePlacement === 'bottom' ? touchPullOffset : 0);
      const placement =
        topOverscroll > 0 && (atEdge('top') || activePlacement === 'top')
          ? 'top'
          : bottomOverscroll > 0 && (atEdge('bottom') || activePlacement === 'bottom')
            ? 'bottom'
            : undefined;

      if (!placement) {
        if (activePlacement) release();
        return;
      }

      // iOS stops delivering touchmove (or cancels the gesture) once the page
      // cannot scroll. Keep the bounce glued to the finger only while pulling
      // past the document edge; native scrolling in the middle is untouched.
      if (event.cancelable) event.preventDefault();
      setPull(placement, placement === 'top' ? topOverscroll : bottomOverscroll, 'touch');
    };

    const endTouch = () => {
      touchOriginY = undefined;
      touchStartScroll = 0;
      touchPullOffset = 0;
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
    window.addEventListener('touchstart', handleTouchStart, {
      capture: true,
      passive: true,
      signal: this.abort.signal,
    });
    window.addEventListener('touchmove', handleTouchMove, {
      capture: true,
      passive: false,
      signal: this.abort.signal,
    });
    window.addEventListener('touchend', endTouch, { passive: true, signal: this.abort.signal });
    window.addEventListener('touchcancel', endTouch, { passive: true, signal: this.abort.signal });
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
