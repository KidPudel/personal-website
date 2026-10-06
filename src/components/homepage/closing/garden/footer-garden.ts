import { frontBloom, planGarden, type Exclusion, type GardenScene, type Pt } from './garden-plan';
import { WITHER_MS, canvasBackend, drawBee, drawScene, type Frame, type Ink } from './garden-draw';
import { EDGE_PULL_EVENT, bottomPullExtent, type EdgePullDetail } from '../../edge-pull';

// The footer garden: a canvas planned for the real width and footer (a new
// arrangement each visit), kept alive by a slight stop-motion jitter, plants
// leaning and flowers turning toward the cursor, and a pull past the end of
// the page. A pull shows how much more is living there: like typing in a
// type garden, pull energy plants growth events one after another (a bud
// opens, a branch flowers, a vine climbs and wraps a stem, a vine arcs to
// the next cluster, a sprout comes up), each growing in its own time. When
// the page settles back, everything the pull grew withers back, newest
// first, and the garden is as it was.

// Growth events per second at a full pull.
const EVENTS_PER_SECOND = 9;
// Withering runs newest first, this far apart.
const WITHER_STAGGER_MS = 22;
const BOIL_PX = 0.75;
// The least open flower area up front, per pixel of width, for a garden to
// count as full (see frontBloom).
const FRONT_BLOOM_MIN = 8.4;
// A group stays animated this long after its birth.
const SETTLE_MS = 3800;

const INK_KEYS: Record<keyof Ink, string> = {
  green: 'green',
  green2: 'green-2',
  vein: 'vein',
  bud: 'bud',
  petal: 'petal',
  petalBack: 'petal-back',
  petalLine: 'petal-line',
  disc: 'disc',
  discLine: 'disc-line',
  cosmos: 'cosmos',
  cosmosLine: 'cosmos-line',
  eye: 'eye',
  eyeDark: 'eye-dark',
  anemone: 'anemone',
  anemoneLine: 'anemone-line',
  stamen: 'stamen',
  lilac: 'lilac',
  lilacLine: 'lilac-line',
  lilacCenter: 'lilac-center',
  coral: 'coral',
  coralLine: 'coral-line',
  forget: 'forget',
  forgetLine: 'forget-line',
  bee: 'bee',
  wing: 'wing',
  soil: 'soil',
  pebble: 'pebble',
  root: 'root',
  shell: 'shell',
  shellLine: 'shell-line',
  snail: 'snail',
};

const readInk = (style: CSSStyleDeclaration, prefix: string, fallback?: Ink) =>
  Object.fromEntries(
    (Object.keys(INK_KEYS) as (keyof Ink)[]).map((key) => [
      key,
      style.getPropertyValue(`--fg-${prefix}${INK_KEYS[key]}`).trim() || fallback?.[key] || '#000',
    ]),
  ) as unknown as Ink;

// Bees come when the garden is clicked; three at most.
const MAX_BEES = 3;

interface Flight {
  fromX: number;
  fromY: number;
  cx: number;
  cy: number;
  toX: number;
  toY: number;
  start: number;
  duration: number;
  // How much it weaves on the way, and how often.
  weave: number;
  waves: number;
}

interface Bee {
  x: number;
  y: number;
  facing: 1 | -1;
  state: 'flying' | 'perched' | 'huffing' | 'leaving';
  perch?: number;
  flight?: Flight;
  // When a perched bee next moves to a neighbouring flower.
  restUntil: number;
  // A perched bee flutters its wings now and then.
  flutterUntil: number;
  nextFlutter: number;
  huffUntil: number;
  phase: number;
}

const easeInOut = (u: number) => (u < 0.5 ? 4 * u ** 3 : 1 - (-2 * u + 2) ** 3 / 2);

const smoothstep = (v: number) => {
  const t = Math.min(1, Math.max(0, v));
  return t * t * (3 - 2 * t);
};

class FooterGarden extends HTMLElement {
  private abort?: AbortController;
  private raf = 0;
  private lastTime?: number;
  private lastStep = -1;
  private resizeTimer = 0;
  private layoutKey = '';

  private scene?: GardenScene;
  private births: number[] = [];
  private deaths: (number | undefined)[] = [];
  private order: number[] = [];
  private seed = Math.floor(Math.random() * 2 ** 31);
  private seedChosen = false;
  private energy = 0;

  private canvas?: HTMLCanvasElement;
  private context?: CanvasRenderingContext2D;
  private ground?: HTMLDivElement;
  private groundCanvas?: HTMLCanvasElement;
  private groundContext?: CanvasRenderingContext2D;
  private dpr = 1;
  private ink?: Ink;
  private inkFar?: Ink;

  private leans: { x: number; y: number }[] = [];
  private looks = new Map<number, Pt>();
  private pointer?: { x: number; y: number };
  private local?: Pt;
  private snail = 0;
  private bees: Bee[] = [];
  private perches: { id: number; x: number; y: number; R: number }[] = [];

  private pull = 0;
  private pullMaximum = 1;
  // The page is springing back: nothing new grows on the way down.
  private receding = false;
  private inView = false;
  private reducedMotion?: MediaQueryList;
  private dirty = true;

  connectedCallback() {
    if (this.dataset.enhanced) return;
    this.dataset.enhanced = '';
    this.abort = new AbortController();
    const { signal } = this.abort;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const canvas = document.createElement('canvas');
    canvas.className = 'footer-garden__canvas';
    const context = canvas.getContext('2d');
    if (!context) return;
    this.canvas = canvas;
    this.context = context;

    // The page lifts with a transform during a pull, so the ground lives
    // outside it, fixed beneath.
    const ground = document.createElement('div');
    ground.className = 'footer-garden-ground';
    ground.setAttribute('aria-hidden', 'true');
    const groundCanvas = document.createElement('canvas');
    ground.append(groundCanvas);
    document.body.append(ground);
    this.ground = ground;
    this.groundCanvas = groundCanvas;
    this.groundContext = groundCanvas.getContext('2d') ?? undefined;

    const rect = this.getBoundingClientRect();
    const visibleNow = rect.top < window.innerHeight && rect.bottom > 0;
    this.append(canvas);
    this.build();
    if (visibleNow && !this.reducedMotion.matches) {
      canvas.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420, easing: 'ease-out' });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        this.inView = entry.isIntersecting;
        if (!this.inView) this.pointer = undefined;
        this.wake();
      },
      { rootMargin: '80px 0px' },
    );
    observer.observe(this);
    signal.addEventListener('abort', () => observer.disconnect());

    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(this.resizeTimer);
      this.resizeTimer = window.setTimeout(() => this.rebuildIfLayoutChanged(), 160);
    });
    resizeObserver.observe(this);
    signal.addEventListener('abort', () => resizeObserver.disconnect());
    document.fonts?.ready.then(() => this.rebuildIfLayoutChanged());

    window.addEventListener(EDGE_PULL_EVENT, this.handlePull as EventListener, { signal });
    window.addEventListener('pointermove', this.handlePointer, { passive: true, signal });
    window.addEventListener('pointerdown', this.handlePointer, { passive: true, signal });
    window.addEventListener('pointerup', this.handlePointerEnd, { passive: true, signal });
    window.addEventListener('pointercancel', this.handlePointerEnd, { passive: true, signal });
    window.addEventListener('click', this.handleClick, { signal });
    document.documentElement.addEventListener('pointerleave', () => (this.pointer = undefined), { signal });
    this.reducedMotion.addEventListener('change', () => this.build(), { signal });
  }

  disconnectedCallback() {
    this.abort?.abort();
    window.clearTimeout(this.resizeTimer);
    window.cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.ground?.remove();
    delete this.dataset.enhanced;
  }

  // Layout ---------------------------------------------------------------------

  private measure() {
    const width = Math.round(this.clientWidth);
    const band = Math.round(this.clientHeight);
    const footer = this.previousElementSibling instanceof HTMLElement ? this.previousElementSibling : undefined;
    const top = this.getBoundingClientRect().top;
    const footerTop = footer?.getBoundingClientRect().top ?? top;
    // Flowers may rise beside the contact links, as high as the footer begins.
    const rise = Math.max(0, Math.round(top - footerTop));
    const drawingTop = top - rise;
    const exclusions: Exclusion[] = footer
      ? Array.from(footer.querySelectorAll<HTMLElement>('a, ul'))
          .filter((element) => element.tagName === 'UL' || !element.closest('ul'))
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return { left: Math.round(rect.left), right: Math.round(rect.right), bottom: Math.round(rect.bottom - drawingTop) };
          })
      : [];
    return { width, band, rise, exclusions, underDepth: bottomPullExtent() };
  }

  private rebuildIfLayoutChanged() {
    if (JSON.stringify(this.measure()) !== this.layoutKey) this.build();
  }

  private build() {
    const canvas = this.canvas;
    const groundCanvas = this.groundCanvas;
    if (!canvas || !groundCanvas || !this.ground) return;
    const layout = this.measure();
    this.layoutKey = JSON.stringify(layout);
    if (layout.width < 1 || layout.band < 1) return;

    // Each visit plans a new garden, but never a thin one: an arrangement
    // with too few open flowers up front gives way to the next.
    const plan = (seed: number) =>
      planGarden({
        seed,
        width: layout.width,
        band: layout.band,
        rise: layout.rise,
        groundDepth: Math.round(layout.underDepth * 0.58),
        underDepth: layout.underDepth,
        exclusions: layout.exclusions,
      });
    let scene = plan(this.seed);
    if (!this.seedChosen) {
      let best = { seed: this.seed, scene, score: frontBloom(scene) };
      for (let attempt = 1; attempt < 8 && best.score < FRONT_BLOOM_MIN; attempt += 1) {
        const seed = this.seed + attempt * 7919;
        const candidate = plan(seed);
        const score = frontBloom(candidate);
        if (score > best.score) best = { seed, scene: candidate, score };
      }
      this.seed = best.seed;
      scene = best.scene;
      this.seedChosen = true;
    }
    this.scene = scene;
    // Only the resting garden shows until a pull.
    this.births = scene.groups.map((_, index) => (index < scene.resting ? -Infinity : Infinity));
    this.deaths = scene.groups.map(() => undefined);
    this.order = [];
    this.leans = scene.plants.map(() => ({ x: 0, y: 0 }));
    this.looks.clear();

    const style = getComputedStyle(this);
    this.ink = readInk(style, '');
    this.inkFar = readInk(style, 'far-', this.ink);

    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.style.width = `${scene.width}px`;
    canvas.style.height = `${scene.height}px`;
    canvas.width = Math.round(scene.width * this.dpr);
    canvas.height = Math.round(scene.height * this.dpr);
    this.ground.style.height = `${scene.underDepth}px`;
    groundCanvas.style.width = `${scene.width}px`;
    groundCanvas.style.height = `${scene.underDepth}px`;
    groundCanvas.width = Math.round(scene.width * this.dpr);
    groundCanvas.height = Math.round(scene.underDepth * this.dpr);

    this.render(performance.now());
    this.wake();
  }

  // Drawing ---------------------------------------------------------------------

  private frame(now: number, from: number, to: number): Frame {
    const still = this.reducedMotion?.matches ?? false;
    return {
      now,
      births: this.births,
      deaths: this.deaths,
      boil: still ? 0 : BOIL_PX,
      from,
      to,
      snail: this.snail,
      lean: still
        ? undefined
        : (plant) => {
            const lean = this.leans[plant];
            return lean && (lean.x || lean.y) ? [lean.x, lean.y] : undefined;
          },
      face: still ? undefined : (id, x, y) => this.look(id, x, y),
    };
  }

  // A flower turns toward the cursor when it is near, and back slowly.
  private look(id: number, x: number, y: number): Pt | undefined {
    let tx = 0;
    let ty = 0;
    if (this.local) {
      const dx = this.local[0] - x;
      const dy = this.local[1] - y;
      const d = Math.hypot(dx, dy);
      if (d < 260 && d > 0.001) {
        const s = smoothstep(1 - d / 260) * Math.min(1, d / 40);
        tx = (dx / d) * s;
        ty = (dy / d) * s;
      }
    }
    const current = this.looks.get(id) ?? [0, 0];
    if (!tx && !ty && !current[0] && !current[1]) return undefined;
    current[0] += (tx - current[0]) * 0.09;
    current[1] += (ty - current[1]) * 0.09;
    if (Math.abs(current[0] - tx) > 0.002 || Math.abs(current[1] - ty) > 0.002) this.dirty = true;
    else if (!tx && !ty) {
      current[0] = 0;
      current[1] = 0;
    }
    this.looks.set(id, current);
    return current[0] || current[1] ? current : undefined;
  }

  private render(now: number) {
    const scene = this.scene;
    const g = this.context;
    if (!scene || !g || !this.ink || !this.inkFar) return;
    this.dirty = false;
    g.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    g.clearRect(0, 0, scene.width, scene.height);
    const frame = this.frame(now, 0, scene.height);
    frame.perches = [];
    drawScene(canvasBackend(g), this.ink, this.inkFar, scene, frame);
    this.perches = frame.perches;
    this.drawBees(g, now);
    if (this.pull > 0) this.renderGround(now);
  }

  private renderGround(now: number) {
    const scene = this.scene;
    const g = this.groundContext;
    if (!scene || !g || !this.ink || !this.inkFar) return;
    g.setTransform(this.dpr, 0, 0, this.dpr, 0, -scene.height * this.dpr);
    g.clearRect(0, scene.height, scene.width, scene.underDepth);
    drawScene(canvasBackend(g), this.ink, this.inkFar, scene, this.frame(now, scene.height, scene.height + scene.underDepth));
    this.positionGround();
  }

  // The ground sits exactly beneath the page's bottom edge, wherever the
  // lifted page has put it.
  private positionGround() {
    if (!this.canvas || !this.ground || !this.groundCanvas) return;
    const edge = this.canvas.getBoundingClientRect().bottom;
    const top = this.ground.getBoundingClientRect().top;
    this.groundCanvas.style.transform = `translate3d(0, ${(edge - top).toFixed(2)}px, 0)`;
  }

  // Loop ----------------------------------------------------------------------

  private wake() {
    if (this.raf || this.reducedMotion?.matches) return;
    if (!this.inView && this.pull <= 0) return;
    this.lastTime = undefined;
    this.raf = window.requestAnimationFrame(this.tick);
  }

  private tick = (now: number) => {
    this.raf = 0;
    const scene = this.scene;
    if (!scene) return;
    const dt = this.lastTime === undefined ? 1 / 60 : Math.min(0.05, (now - this.lastTime) / 1000);
    this.lastTime = now;

    // Pulling plants the next growth events.
    if (this.pull > 0 && !this.receding) {
      const strength = Math.pow(Math.min(1, this.pull / this.pullMaximum), 1.1);
      this.energy += dt * EVENTS_PER_SECOND * strength;
      while (this.energy >= 1) {
        const next = this.order.find((index) => this.births[index] === Infinity);
        if (next === undefined) {
          this.energy = 0;
          break;
        }
        this.births[next] = now;
        this.energy -= 1;
        this.dirty = true;
      }
      // The snail below moves on while the page is held open.
      this.snail = Math.min(1, this.snail + dt * 0.06 * strength);
    }

    // What has withered is gone again, ready for the next pull.
    let withering = false;
    this.deaths.forEach((death, index) => {
      if (death === undefined) return;
      if (now - death >= WITHER_MS) {
        this.deaths[index] = undefined;
        this.births[index] = Infinity;
      } else withering = true;
    });

    if (this.canvas) {
      const rect = this.canvas.getBoundingClientRect();
      this.local = this.pointer ? [this.pointer.x - rect.left, this.pointer.y - rect.top] : undefined;
    }
    this.easeLeans(dt);
    const buzzing = this.stepBees(now);

    const growing = this.births.some((birth) => birth !== Infinity && birth !== -Infinity && now - birth < SETTLE_MS);
    const step = Math.floor(now / 120);
    if (growing || withering || buzzing) this.dirty = true;
    if (this.inView && step !== this.lastStep) this.dirty = true;
    this.lastStep = step;
    if (this.dirty || this.pull > 0) this.render(now);

    if (this.inView || this.pull > 0 || growing || withering || buzzing) this.raf = window.requestAnimationFrame(this.tick);
  };

  // Each cluster leans toward the cursor, more at its top.
  private easeLeans(dt: number) {
    const scene = this.scene!;
    const k = 1 - Math.exp(-dt / 0.22);
    scene.plants.forEach((plant, index) => {
      let tx = 0;
      let ty = 0;
      if (this.local) {
        const dx = this.local[0] - plant.x;
        const dy = this.local[1] - (plant.y + 30);
        const d = Math.hypot(dx, dy);
        const reach = 260;
        if (d < reach && d > 1) {
          const s = smoothstep(1 - d / reach) * (plant.depth === 0 ? 0.6 : plant.depth === 2 ? 0.5 : 1);
          tx = (dx / d) * s;
          ty = (dy / d) * s;
        }
      }
      const lean = this.leans[index];
      if (Math.abs(lean.x - tx) + Math.abs(lean.y - ty) < 0.0005) return;
      lean.x += (tx - lean.x) * k;
      lean.y += (ty - lean.y) * k;
      this.dirty = true;
    });
  }

  // Bees ----------------------------------------------------------------------

  // Where a bee sits on a flower: on top of its face, a little off-centre.
  private perchPoint(id?: number) {
    const perch = this.perches.find((p) => p.id === id);
    return perch ? { x: perch.x + perch.R * 0.12, y: perch.y - perch.R * 0.42 } : undefined;
  }

  private freePerches(except?: Bee) {
    const taken = new Set(this.bees.filter((b) => b !== except && b.state !== 'leaving').map((b) => b.perch));
    return this.perches.filter((p) => !taken.has(p.id));
  }

  private fly(bee: Bee, toX: number, toY: number, now: number, duration: number) {
    const d = Math.hypot(toX - bee.x, toY - bee.y);
    bee.flight = {
      fromX: bee.x,
      fromY: bee.y,
      cx: (bee.x + toX) / 2 + (Math.random() - 0.5) * Math.min(160, d * 0.5),
      cy: Math.max(10, Math.min(bee.y, toY) - Math.min(90, 20 + d * 0.25)),
      toX,
      toY,
      start: now,
      duration,
      weave: 3 + Math.random() * 4,
      waves: 3 + Math.random() * 4,
    };
  }

  // A click in the garden calls a bee to the open flower nearest the click.
  private summon(x: number, y: number, now: number) {
    const scene = this.scene;
    if (!scene) return;
    const staying = this.bees.filter((b) => b.state !== 'leaving' && b.state !== 'huffing');
    // A fourth bee sends the first one off, fed up.
    if (staying.length >= MAX_BEES) this.dismiss(staying[0], now);

    const target = this.freePerches()
      .map((p) => ({ p, d: Math.hypot(p.x - x, p.y - y) }))
      .sort((a, b) => a.d - b.d)[0]?.p;
    const fromLeft = x < scene.width / 2;
    const bee: Bee = {
      x: fromLeft ? -30 : scene.width + 30,
      y: scene.height * (0.15 + Math.random() * 0.3),
      facing: fromLeft ? -1 : 1,
      state: 'flying',
      perch: target?.id,
      restUntil: 0,
      flutterUntil: 0,
      nextFlutter: 0,
      huffUntil: 0,
      phase: Math.random() * 10,
    };
    this.bees.push(bee);
    const point = this.perchPoint(target?.id) ?? { x, y };
    if (this.reducedMotion?.matches) {
      bee.x = point.x;
      bee.y = point.y;
      this.settle(bee, now);
      return;
    }
    this.fly(bee, point.x, point.y, now, Math.min(2200, Math.max(1100, Math.hypot(point.x - bee.x, point.y - bee.y) * 2.4)));
  }

  private settle(bee: Bee, now: number) {
    bee.state = bee.perch === undefined ? 'leaving' : 'perched';
    bee.flight = undefined;
    bee.restUntil = now + 3500 + Math.random() * 5000;
    bee.nextFlutter = now + 900 + Math.random() * 2500;
    if (bee.state === 'leaving') this.dismiss(bee, now);
  }

  // It gives a little shake, then flies off the nearer side.
  private dismiss(bee: Bee, now: number) {
    if (this.reducedMotion?.matches) {
      this.bees = this.bees.filter((b) => b !== bee);
      return;
    }
    bee.perch = undefined;
    bee.state = 'huffing';
    bee.huffUntil = now + 380;
    bee.flight = undefined;
  }

  private leave(bee: Bee, now: number) {
    const scene = this.scene!;
    bee.state = 'leaving';
    const toLeft = bee.x < scene.width / 2;
    this.fly(bee, toLeft ? -50 : scene.width + 50, Math.max(12, bee.y - 60 - Math.random() * 60), now, 1300 + Math.random() * 400);
  }

  // Moves every bee on; true while any of them is moving.
  private stepBees(now: number) {
    let moving = false;
    for (const bee of [...this.bees]) {
      if (bee.state === 'huffing') {
        moving = true;
        if (now >= bee.huffUntil) this.leave(bee, now);
        continue;
      }
      if (bee.state === 'perched') {
        const point = this.perchPoint(bee.perch);
        if (!point) {
          // Its flower withered or closed: off to another, or away.
          const next = this.freePerches(bee).sort((a, b) => Math.hypot(a.x - bee.x, a.y - bee.y) - Math.hypot(b.x - bee.x, b.y - bee.y))[0];
          if (next) {
            bee.perch = next.id;
            bee.state = 'flying';
            const to = this.perchPoint(next.id)!;
            this.fly(bee, to.x, to.y, now, 800 + Math.random() * 400);
          } else this.dismiss(bee, now);
          moving = true;
          continue;
        }
        bee.x = point.x;
        bee.y = point.y;
        if (now >= bee.nextFlutter) {
          bee.flutterUntil = now + 260 + Math.random() * 240;
          bee.nextFlutter = now + 1800 + Math.random() * 3500;
        }
        if (now < bee.flutterUntil) moving = true;
        if (now >= bee.restUntil && !this.reducedMotion?.matches) {
          // Off to a neighbouring flower.
          const near = this.freePerches(bee)
            .filter((p) => p.id !== bee.perch)
            .map((p) => ({ p, d: Math.hypot(p.x - bee.x, p.y - bee.y) }))
            .filter(({ d }) => d < 260)
            .sort((a, b) => a.d - b.d);
          const pick = near[Math.floor(Math.random() * Math.min(3, near.length))]?.p;
          if (pick) {
            bee.perch = pick.id;
            bee.state = 'flying';
            const to = this.perchPoint(pick.id)!;
            this.fly(bee, to.x, to.y, now, Math.min(1400, Math.max(700, Math.hypot(to.x - bee.x, to.y - bee.y) * 3)));
          } else bee.restUntil = now + 3000 + Math.random() * 4000;
        }
        continue;
      }
      const flight = bee.flight;
      if (!flight) continue;
      moving = true;
      // A flower it is heading for may sway; follow it.
      const target = bee.state === 'flying' ? this.perchPoint(bee.perch) : undefined;
      const toX = target?.x ?? flight.toX;
      const toY = target?.y ?? flight.toY;
      const u = Math.min(1, (now - flight.start) / flight.duration);
      const t = easeInOut(u);
      const v = 1 - t;
      const x = v * v * flight.fromX + 2 * v * t * flight.cx + t * t * toX;
      const y = v * v * flight.fromY + 2 * v * t * flight.cy + t * t * toY;
      const fade = Math.sin(u * Math.PI);
      if (Math.abs(x - bee.x) > 0.2) bee.facing = x > bee.x ? -1 : 1;
      bee.x = x + Math.sin(u * Math.PI * flight.waves + bee.phase) * flight.weave * 0.4 * fade;
      bee.y = y + Math.sin(u * Math.PI * flight.waves * 1.7 + bee.phase) * flight.weave * fade;
      if (u >= 1) {
        if (bee.state === 'leaving') this.bees = this.bees.filter((b) => b !== bee);
        else if (target) this.settle(bee, now);
        else this.dismiss(bee, now);
      }
    }
    return moving;
  }

  private drawBees(g: CanvasRenderingContext2D, now: number) {
    const scene = this.scene;
    if (!scene || !this.ink || !this.bees.length) return;
    const B = canvasBackend(g);
    for (const bee of this.bees) {
      const flying = bee.state === 'flying' || bee.state === 'leaving';
      const fluttering = flying || bee.state === 'huffing' || now < bee.flutterUntil;
      const wings = fluttering ? Math.abs(Math.cos(now / 1000 * 38 + bee.phase)) : 0.15;
      // Fed up: a quick shake before it goes.
      const shake = bee.state === 'huffing' ? Math.sin(now / 1000 * 70) * 1.6 : 0;
      drawBee(B, this.ink, bee.x + shake, bee.y, 1.35 * scene.scale, bee.facing, wings);
    }
  }

  // Input ---------------------------------------------------------------------

  // A click or tap in the garden (not on a link) calls a bee.
  private handleClick = (event: MouseEvent) => {
    if (!this.inView || !this.canvas || !this.scene) return;
    const target = event.target instanceof Element ? event.target : undefined;
    if (target?.closest('a, button, input, textarea, select, [role="button"]')) return;
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;
    this.summon(x, y, performance.now());
    this.dirty = true;
    if (this.reducedMotion?.matches) this.render(performance.now());
    else this.wake();
  };


  private handlePull = (event: CustomEvent<EdgePullDetail>) => {
    const scene = this.scene;
    if (!scene || this.reducedMotion?.matches) return;
    const { placement, pull, maximum } = event.detail;
    const was = this.pull;
    this.pull = placement === 'bottom' ? pull : 0;
    this.pullMaximum = Math.max(1, maximum);
    if (this.pull > was + 0.3) this.receding = false;
    else if (this.pull < was - 0.3) this.receding = true;

    if (was <= 0 && this.pull > 0) {
      // A new pull grows in a fresh order and answers at once. New flowers
      // come first (buds open, flowers pop out along the stems), then what
      // takes longer to show: sprouts from the soil, climbing vines.
      const lead: Record<string, number> = { open: 0, branch: 0.25, sprout: 0.6, climb: 0.9 };
      this.order = Array.from({ length: scene.groups.length - scene.resting }, (_, i) => scene.resting + i)
        .map((index) => ({ index, rank: (lead[scene.groups[index].kind] ?? 0.5) + Math.random() * 0.8 }))
        .sort((a, b) => a.rank - b.rank)
        .map(({ index }) => index);
      this.energy = Math.max(this.energy, 1.4);
    }

    if (was > 0 && this.pull <= 0) {
      // The page settles back: what the pull grew withers, newest first.
      const now = performance.now();
      const alive = this.births
        .map((birth, index) => ({ birth, index }))
        .filter(({ birth, index }) => index >= scene.resting && birth !== Infinity && this.deaths[index] === undefined)
        .sort((a, b) => b.birth - a.birth);
      alive.forEach(({ index }, rank) => {
        this.deaths[index] = now + rank * WITHER_STAGGER_MS;
      });
      this.energy = 0;
    }

    this.ground?.toggleAttribute('data-active', this.pull > 0);
    if (this.pull > 0) this.renderGround(performance.now());
    this.wake();
  };

  private handlePointer = (event: PointerEvent) => {
    if (!this.inView || this.reducedMotion?.matches) return;
    // A finger counts only while it is down; a mouse whenever it moves.
    if (event.pointerType === 'touch' && event.type === 'pointermove' && !this.pointer) return;
    this.pointer = { x: event.clientX, y: event.clientY };
    this.wake();
  };

  private handlePointerEnd = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') this.pointer = undefined;
  };
}

if (!customElements.get('footer-garden')) customElements.define('footer-garden', FooterGarden);
