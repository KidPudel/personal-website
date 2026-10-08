import type { FlowerEl, GardenScene, Group, Pt, Species, StemEl } from './garden-plan';

// Drawing the garden. Everything is a filled shape or a round-capped line,
// traced as a smooth curve through a few points: stems that draw themselves
// in, leaves with the vein cut out in the page's colour, petals that spring
// open one after another, and linework drawn into the flowers once they are
// open. While live, the drawing re-jitters a little a few times a second,
// like hand-inked frames. Growth that withers runs the same motion back.
//
// Drawing goes through a two-call backend, so the same pieces could be drawn
// somewhere other than the canvas.

export interface Backend {
  fill(points: Pt[], colour: string): void;
  stroke(points: Pt[], colour: string, width: number): void;
}

export interface Ink {
  green: string;
  green2: string;
  vein: string;
  bud: string;
  petal: string;
  petalBack: string;
  petalLine: string;
  disc: string;
  discLine: string;
  cosmos: string;
  cosmosLine: string;
  eye: string;
  eyeDark: string;
  anemone: string;
  anemoneLine: string;
  stamen: string;
  lilac: string;
  lilacLine: string;
  lilacCenter: string;
  coral: string;
  coralLine: string;
  forget: string;
  forgetLine: string;
  bee: string;
  wing: string;
  soil: string;
  pebble: string;
  root: string;
  shell: string;
  shellLine: string;
  snail: string;
}

export type InkKey = keyof Ink;

export interface Frame {
  now: number;
  births: number[];
  // When a pulled group began to wither (it may be a moment ahead).
  deaths: (number | undefined)[];
  // Stop-motion jitter in px; 0 draws the garden still.
  boil: number;
  lean?: (plant: number) => Pt | undefined;
  face?: (id: number, x: number, y: number) => Pt | undefined;
  // Filled with the open flowers up front a bee could land on.
  perches?: { id: number; x: number; y: number; R: number }[];
  from: number;
  to: number;
  snail?: number;
  // Which jittered frame to draw; by default it changes every 120 ms.
  step?: number;
}

export const WITHER_MS = 650;
const TAU = Math.PI * 2;
const NEWBORN_SECONDS = 2.5;

// ---- motion --------------------------------------------------------------

// A damped spring from 0 to 1: overshoots, then settles.
export const spring = (t: number, k = 7, w = 16) => (t <= 0 ? 0 : t === Infinity ? 1 : 1 - Math.exp(-t * k) * Math.cos(t * w));
export const easeOut = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - (1 - t) ** 3);
const hash = (n: number) => {
  const x = Math.sin(n) * 43758.5453;
  return x - Math.floor(x);
};
const jitter = (id: number, step: number, amp: number): [number, number, number] =>
  amp
    ? [(hash(id * 1.37 + step * 7.13) * 2 - 1) * amp, (hash(id * 2.71 + step * 3.11) * 2 - 1) * amp, (hash(id * 5.3 + step * 1.7) * 2 - 1) * 0.035]
    : [0, 0, 0];

// ---- curves -----------------------------------------------------------------

interface PathSink {
  moveTo(x: number, y: number): void;
  lineTo(x: number, y: number): void;
  quadraticCurveTo(cx: number, cy: number, x: number, y: number): void;
  closePath(): void;
}

const tracePath = (sink: PathSink, p: Pt[], closed: boolean) => {
  const n = p.length;
  if (n < 2) return;
  const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  if (closed) {
    const start = mid(p[n - 1], p[0]);
    sink.moveTo(start[0], start[1]);
    for (let i = 0; i < n; i += 1) {
      const q = mid(p[i], p[(i + 1) % n]);
      sink.quadraticCurveTo(p[i][0], p[i][1], q[0], q[1]);
    }
    sink.closePath();
  } else {
    sink.moveTo(p[0][0], p[0][1]);
    for (let i = 1; i < n - 1; i += 1) {
      const q = mid(p[i], p[i + 1]);
      sink.quadraticCurveTo(p[i][0], p[i][1], q[0], q[1]);
    }
    sink.lineTo(p[n - 1][0], p[n - 1][1]);
  }
};

export const canvasBackend = (g: CanvasRenderingContext2D): Backend => ({
  fill(points, colour) {
    g.beginPath();
    tracePath(g, points, true);
    g.fillStyle = colour;
    g.fill();
  },
  stroke(points, colour, width) {
    g.beginPath();
    tracePath(g, points, false);
    g.strokeStyle = colour;
    g.lineWidth = width;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.stroke();
  },
});

export const strokeRange = (B: Backend, P: Pt[], a: number, b: number, colour: string, width: number) => {
  const n = P.length - 1;
  const ia = a * n;
  const ib = b * n;
  const lerp = (t: number): Pt => {
    const i = Math.min(n - 1, Math.floor(t));
    const f = t - i;
    return [P[i][0] + (P[i + 1][0] - P[i][0]) * f, P[i][1] + (P[i + 1][1] - P[i][1]) * f];
  };
  const pts = [lerp(ia)];
  for (let i = Math.floor(ia) + 1; i < ib; i += 1) pts.push(P[i]);
  pts.push(lerp(ib));
  if (pts.length >= 2) B.stroke(pts, colour, width);
};

// ---- leaves ---------------------------------------------------------------------

export const drawLeaf = (
  B: Backend,
  colour: string,
  vein: string | undefined,
  bx: number,
  by: number,
  a: number,
  L: number,
  bend: number,
  wide = 0.18,
) => {
  if (L < 0.5) return;
  const ca = Math.cos(a);
  const sa = Math.sin(a);
  const px = -sa;
  const py = ca;
  const axis = (u: number): Pt => {
    const b = Math.sin(Math.PI * u) * bend * 0.15 * L;
    return [bx + ca * u * L + px * b, by + sa * u * L + py * b];
  };
  const half = (u: number) => L * wide * Math.sin(Math.PI * u ** 0.8);
  const N = 12;
  const s1: Pt[] = [];
  const s2: Pt[] = [];
  for (let i = 0; i <= N; i += 1) {
    const u = i / N;
    const c = axis(u);
    const w = half(u);
    s1.push([c[0] + px * w, c[1] + py * w]);
    s2.push([c[0] - px * w, c[1] - py * w]);
  }
  const tip = axis(1);
  const base = axis(0);
  B.fill([base, ...s1.slice(1, N), tip, tip, ...s2.slice(1, N).reverse(), base], colour);
  if (vein && L > 7) {
    const v: Pt[] = [];
    for (let i = 0; i <= 8; i += 1) v.push(axis(0.08 + (0.72 * i) / 8));
    B.stroke(v, vein, Math.max(0.8, L * 0.035));
  }
};

// ---- flowers --------------------------------------------------------------------

type Turn = (x: number, y: number, z?: number) => Pt;

// The flower's own frame: rotated, and when it looks toward the cursor,
// pressed flat along that direction with its raised parts shifted toward it.
const turned = (cx: number, cy: number, rot: number, R: number, look?: Pt): Turn => {
  const cr = Math.cos(rot);
  const sr = Math.sin(rot);
  const tm = look ? Math.hypot(look[0], look[1]) : 0;
  const ux = tm ? look![0] / tm : 0;
  const uy = tm ? look![1] / tm : 0;
  const squash = -0.28 * tm;
  return (x, y, z = 0) => {
    let dx = x * cr - y * sr;
    let dy = x * sr + y * cr;
    if (tm) {
      const k = (dx * ux + dy * uy) * squash;
      dx += k * ux + look![0] * R * z;
      dy += k * uy + look![1] * R * z;
    }
    return [cx + dx, cy + dy];
  };
};

// A shape given in a petal's own frame (x outward from the centre), turned
// to its angle around the flower.
const along = (T: Turn, angle: number, local: Pt[], z: number) => {
  const ca = Math.cos(angle);
  const sa = Math.sin(angle);
  return local.map(([x, y]) => T(ca * x - sa * y, sa * x + ca * y, z));
};

const lensPetal = (from: number, to: number, width: number, ph: number): Pt[] => {
  const a: Pt[] = [];
  const b: Pt[] = [];
  const N = 8;
  for (let i = 0; i <= N; i += 1) {
    const u = i / N;
    const x = from + (to - from) * u;
    const w = width * Math.sin(Math.PI * u ** 0.75) * (1 + 0.1 * Math.sin(u * 7 + ph));
    a.push([x, w]);
    b.push([x, -w]);
  }
  return [...a, ...b.slice(1, N).reverse()];
};

const roundPetal = (from: number, to: number, width: number, ph: number): Pt[] => {
  const mid = (from + to) / 2;
  const rx = (to - from) / 2;
  const pts: Pt[] = [];
  for (let k = 0; k < 16; k += 1) {
    const th = (k / 16) * TAU;
    const rr = 1 + 0.07 * Math.sin(3 * th + ph) + 0.04 * Math.sin(5 * th + ph * 1.3);
    pts.push([mid + Math.cos(th) * rx * rr, Math.sin(th) * width * rr]);
  }
  return pts;
};

// A cosmos petal: a fan that widens to a softly notched end.
const notchPetal = (from: number, to: number, width: number): Pt[] => {
  const L = to - from;
  return [
    [from, -width * 0.14],
    [from + L * 0.45, -width * 0.6],
    [from + L * 0.86, -width],
    [to, -width * 0.62],
    [to - L * 0.07, -width * 0.2],
    [to, width * 0.12],
    [to - L * 0.06, width * 0.5],
    [from + L * 0.88, width * 0.96],
    [from + L * 0.45, width * 0.6],
    [from, width * 0.14],
  ];
};

const blob = (T: Turn, x: number, y: number, rx: number, ry: number, z: number, ph: number, n = 20) => {
  const pts: Pt[] = [];
  for (let k = 0; k < n; k += 1) {
    const th = (k / n) * TAU;
    const rr = 1 + 0.07 * Math.sin(3 * th + ph) + 0.04 * Math.sin(5 * th + ph * 1.7);
    pts.push(T(x + Math.cos(th) * rx * rr, y + Math.sin(th) * ry * rr, z));
  }
  return pts;
};

interface Kind {
  petals: number;
  rings: 1 | 2;
  shape: 'lens' | 'round' | 'notch';
  inner: number;
  width: number;
  petal: InkKey;
  back?: InkKey;
  line: InkKey;
  center: 'spiral' | 'dome' | 'stamens' | 'ring' | 'dots' | 'eye';
  centre: number;
  step: number;
  creases: number;
}

const KINDS: Record<Species, Kind> = {
  sun: { petals: 13, rings: 2, shape: 'lens', inner: 0.34, width: 0.14, petal: 'petal', back: 'petalBack', line: 'petalLine', center: 'spiral', centre: 0.42, step: 34, creases: 3 },
  cosmos: { petals: 8, rings: 1, shape: 'notch', inner: 0.14, width: 0.25, petal: 'cosmos', line: 'cosmosLine', center: 'dome', centre: 0.2, step: 55, creases: 1 },
  anemone: { petals: 6, rings: 1, shape: 'round', inner: 0.1, width: 0.36, petal: 'anemone', line: 'anemoneLine', center: 'stamens', centre: 0.19, step: 65, creases: 1 },
  lilac: { petals: 16, rings: 1, shape: 'lens', inner: 0.2, width: 0.085, petal: 'lilac', line: 'lilacLine', center: 'ring', centre: 0.22, step: 26, creases: 2 },
  coral: { petals: 5, rings: 1, shape: 'round', inner: 0.06, width: 0.44, petal: 'coral', line: 'coralLine', center: 'dots', centre: 0.12, step: 70, creases: 1 },
  forget: { petals: 5, rings: 1, shape: 'round', inner: 0.04, width: 0.5, petal: 'forget', line: 'forgetLine', center: 'eye', centre: 0.24, step: 50, creases: 0 },
};

const drawBud = (B: Backend, ink: Ink, tips: string, T: Turn, R: number, size: number, ph: number) => {
  const r = R * 0.4 * size;
  if (r < 0.5) return;
  for (let i = 0; i < 7; i += 1) B.fill(along(T, ((i + 0.5) * TAU) / 7 + ph, lensPetal(r * 0.3, r * 1.15, r * 0.17, ph + i), 0), tips);
  for (let i = 0; i < 7; i += 1) B.fill(along(T, (i * TAU) / 7 + ph, lensPetal(0, r * 1.05, r * 0.26, ph + i * 2), 0.05), ink.bud);
  B.fill(blob(T, 0, 0, r * 0.42, r * 0.42, 0.08, ph), ink.bud);
};

// A flower opens: petals spring out around the centre one after another
// (the back ring first), the centre swells, then linework is drawn in.
// `open` is ms since it opened (-1 while it is a bud); `close` runs from 1
// to 0 as it closes back into a bud.
export const drawFlower = (
  B: Backend,
  ink: Ink,
  e: FlowerEl,
  cx: number,
  cy: number,
  R: number,
  rot: number,
  open: number,
  grown: number,
  close: number,
  look?: Pt,
) => {
  const kind = KINDS[e.species];
  const T = turned(cx, cy, rot, R, look);
  const petalInk = ink[kind.petal];
  if (open < 0) {
    drawBud(B, ink, petalInk, T, R, spring(grown / 1000, 7, 15), e.ph);
    return;
  }
  const bud = Math.max(open < 240 ? 1 - easeOut(open / 220) : 0, 1 - close);
  if (bud > 0.01) drawBud(B, ink, petalInk, T, R, bud, e.ph);
  if (close <= 0.001) return;

  const n = kind.petals;
  const first = Math.floor(e.ph * 2) % n;
  for (let ring = 0; ring < kind.rings; ring += 1) {
    const back = kind.rings === 2 && ring === 0;
    const start = back || kind.rings === 1 ? 60 : 150;
    const outer = kind.rings === 2 && !back ? 0.88 : 1;
    for (let k = 0; k < n; k += 1) {
      const i = (first + k) % n;
      const s = spring((open - start - k * kind.step) / 1000, 8, 14) * close;
      if (s <= 0.001) continue;
      const angle = ((i + (back ? 0.5 : 0)) * TAU) / n + (1 - Math.min(1, s)) * 0.4;
      const from = R * kind.inner;
      const to = from + R * (outer - kind.inner) * s;
      const width = R * kind.width * (back ? 1.08 : 1) * (0.6 + 0.4 * Math.min(1, s));
      const shape =
        kind.shape === 'lens' ? lensPetal(from, to, width, e.ph + i) : kind.shape === 'round' ? roundPetal(from, to, width, e.ph + i) : notchPetal(from, to, width);
      B.fill(along(T, angle, shape, back ? 0 : 0.06), back && kind.back ? ink[kind.back] : petalInk);
    }
  }

  const centre = spring(open / 1000, 9, 13) * close;
  const lines = easeOut((open - 60 - n * kind.step - 80) / 560) * close ** 3;
  const width = Math.max(0.7, R * 0.045);
  if (kind.creases && lines > 0 && R > 9) {
    for (let k = 0; k < n; k += kind.creases) {
      const angle = (((first + k) % n) * TAU) / n;
      const crease = along(T, angle, [[R * (kind.inner + 0.18), 0], [R * 0.52, R * 0.01], [R * 0.7, 0]], 0.06);
      strokeRange(B, crease, 0, lines, ink[kind.line], width * 0.85);
    }
  }
  if (centre <= 0.001) return;
  const c = R * kind.centre * centre;
  switch (kind.center) {
    case 'spiral': {
      B.fill(blob(T, 0, 0, c, c, 0.16, e.ph), ink.disc);
      if (lines > 0 && R > 5) {
        const spiral: Pt[] = [];
        for (let i = 0; i <= 60; i += 1) {
          const u = i / 60;
          const th = e.ph + u * e.turns * TAU;
          const rr = R * (0.04 + 0.3 * u);
          spiral.push(T(Math.cos(th) * rr, Math.sin(th) * rr * 0.86, 0.3 - 0.16 * u));
        }
        strokeRange(B, spiral, 0, lines, ink.discLine, Math.max(0.8, R * 0.05));
      }
      break;
    }
    case 'dome': {
      B.fill(blob(T, 0, 0, c, c, 0.2, e.ph, 14), ink.eye);
      if (lines > 0.4) {
        for (let k = 0; k < 5; k += 1) {
          const a = (k * TAU) / 5 + e.ph;
          B.fill(blob(T, Math.cos(a) * c * 0.45, Math.sin(a) * c * 0.45, c * 0.16, c * 0.16, 0.24, k, 8), ink.eyeDark);
        }
      }
      break;
    }
    case 'stamens': {
      B.fill(blob(T, 0, 0, c, c, 0.18, e.ph, 14), ink.stamen);
      if (lines > 0) {
        for (let k = 0; k < 11; k += 1) {
          const a = (k * TAU) / 11 + e.ph;
          const tip = R * (0.34 + 0.06 * Math.sin(k * 2.3 + e.ph));
          strokeRange(B, [T(Math.cos(a) * c, Math.sin(a) * c, 0.2), T(Math.cos(a) * tip, Math.sin(a) * tip, 0.24)], 0, lines, ink.stamen, Math.max(0.6, R * 0.03));
          if (lines > 0.9) B.fill(blob(T, Math.cos(a) * tip, Math.sin(a) * tip, R * 0.035, R * 0.035, 0.24, k, 8), ink.stamen);
        }
      }
      break;
    }
    case 'ring': {
      B.fill(blob(T, 0, 0, c, c, 0.18, e.ph, 16), ink.lilacCenter);
      if (lines > 0.3) {
        for (let k = 0; k < 10; k += 1) {
          const a = (k * TAU) / 10 + e.ph;
          B.fill(blob(T, Math.cos(a) * c * 0.72, Math.sin(a) * c * 0.72, c * 0.13, c * 0.13, 0.22, k, 8), ink.eye);
        }
      }
      break;
    }
    case 'dots': {
      for (let k = 0; k < 7; k += 1) {
        const a = (k * TAU) / 7 + e.ph;
        const d = R * 0.19 * centre;
        B.fill(blob(T, Math.cos(a) * d, Math.sin(a) * d, R * 0.075 * centre, R * 0.075 * centre, 0.2, k, 10), ink.eye);
      }
      B.fill(blob(T, 0, 0, c, c, 0.22, e.ph, 12), ink.coralLine);
      break;
    }
    case 'eye':
      B.fill(blob(T, 0, 0, c, c, 0.2, e.ph, 10), ink.eye);
      break;
  }
};

// A bee, seen from the side and facing left: wings above a striped body.
// `wings` opens them from folded (0) to spread (1); `facing` turns it round.
export const drawBee = (B: Backend, ink: Ink, x: number, y: number, s: number, facing: number, wings: number) => {
  const T: Turn = (px, py) => [x + px * s * facing, y + py * s];
  const wing = (wx: number, wy: number, rx: number, ry: number, ph: number) => {
    const open = 0.3 + 0.7 * wings;
    const shape = blob((px, py) => T(px, wy + (py - wy) * open), wx, wy, rx, ry, 0, ph, 14);
    B.fill(shape, ink.wing);
    B.stroke([...shape, shape[0]], ink.stamen, 0.7 * s);
  };
  wing(3.6, -5.2, 2.8, 4.2, 1.3);
  B.fill(blob(T, 1.4, 0.4, 7.2, 5.1, 0, 2.1, 18), ink.bee);
  B.stroke([T(-0.4, -4.2), T(0.2, 0.4), T(-0.4, 5)], ink.stamen, 1.9 * s);
  B.stroke([T(3.9, -3.6), T(4.4, 0.4), T(3.9, 4.4)], ink.stamen, 1.7 * s);
  B.stroke([T(8.4, 0.7), T(10.8, 1.1)], ink.stamen, 1 * s);
  B.fill(blob(T, -6.4, 0.3, 3.4, 3.3, 0, 2, 12), ink.stamen);
  B.fill(blob(T, -7.4, -0.6, 0.85, 0.85, 0, 0, 8), ink.wing);
  B.stroke([T(-7.2, -2.4), T(-8.8, -5.2), T(-10.8, -6.2)], ink.stamen, 0.75 * s);
  B.stroke([T(-5.8, -2.8), T(-6.6, -5.6), T(-8.2, -7.4)], ink.stamen, 0.75 * s);
  wing(0.4, -6.2, 3.4, 5.2, 0.4);
};

const drawSnail = (B: Backend, ink: Ink, x: number, y: number, s: number) => {
  const T: Turn = (px, py) => [x + px * s, y + py * s];
  B.fill([T(-10, 0), T(-9, -3), T(0, -3.6), T(8, -4.6), T(10, -7), T(13, -7.4), T(14, -4), T(11, -0.6), T(4, 0.2)], ink.snail);
  B.stroke([T(11, -6.4), T(12.4, -10), T(13.4, -12.4)], ink.snail, 1.2 * s);
  B.stroke([T(12.6, -6), T(14.8, -9), T(16.6, -10.4)], ink.snail, 1.2 * s);
  B.fill(blob(T, 13.5, -12.7, 1, 1, 0, 0, 8), ink.stamen);
  B.fill(blob(T, 16.8, -10.7, 1, 1, 0, 1, 8), ink.stamen);
  B.fill(blob(T, -1, -8, 7.6, 7.4, 0, 2.2, 22), ink.shell);
  const spiral: Pt[] = [];
  for (let i = 0; i <= 40; i += 1) {
    const u = i / 40;
    const th = 0.4 + u * 2.2 * TAU;
    const rr = 6.2 * (1 - u) + 0.6;
    spiral.push(T(-1 + Math.cos(th) * rr, -8 + Math.sin(th) * rr));
  }
  B.stroke(spiral, ink.shellLine, 1.1 * s);
};

// ---- the scene ------------------------------------------------------------------

const withering = (frame: Frame, index: number) => {
  const death = frame.deaths[index];
  return death === undefined ? 1 : 1 - easeOut((frame.now - death) / WITHER_MS);
};

export const drawScene = (B: Backend, ink: Ink, inkFar: Ink, scene: GardenScene, frame: Frame) => {
  const { unit: S, groundY } = scene;
  const step = frame.step ?? Math.floor(frame.now / 120);

  // Height-weighted displacement: a newborn plant settles from a sway; every
  // plant leans toward the cursor, more at the top than at the root.
  const warp = (g: Group, birth: number, x: number, y: number): Pt => {
    let X = x;
    let Y = y;
    const t = (frame.now - birth) / 1000;
    if (g.kind !== 'rest' && t > 0 && t < NEWBORN_SECONDS) {
      const hh = Math.min(2.5, Math.max(0, (g.root[1] - y) / S));
      const damp = Math.exp(-t * 3.2);
      X += S * 0.07 * hh * damp * Math.sin(t * 11) * g.sway;
      Y += S * 0.035 * hh * damp * Math.sin(t * 11 + 1.2);
    }
    const lean = frame.lean?.(g.plant);
    if (lean) {
      const hh = Math.min(1, Math.max(0, (groundY - y) / groundY)) * 2.5;
      const f = hh * hh * 0.5 + hh * 0.5;
      X += lean[0] * S * 0.09 * f;
      Y += lean[1] * S * 0.04 * f;
    }
    return [X, Y];
  };

  const underground = frame.to > scene.height;
  if (underground) drawSoil(B, ink, scene);

  for (const depth of [0, 1, 2] as const) {
    const colours = depth ? ink : inkFar;
    for (const layer of [0, 1, 2] as const) {
      scene.groups.forEach((g, gi) => {
        if (g.depth !== depth) return;
        const birth = frame.births[gi];
        if (birth === Infinity) return;
        const wither = withering(frame, gi);
        if (wither <= 0) return;
        const age = frame.now - birth;
        for (const e of g.els) {
          if (e.bottom < frame.from - 40 || e.top > frame.to + 40) continue;
          if (e.t === 'stem') {
            drawStem(B, colours, e, g, birth, age, layer, step, frame, warp, wither);
            continue;
          }
          if (e.layer !== layer) continue;
          const local = age - e.d0;
          if (local < 0) continue;
          const [jx, jy, jr] = jitter(e.id, step, frame.boil);
          const [x, y] = warp(g, birth, e.x + jx, e.y + jy);
          if (e.t === 'leaf') {
            const grow = spring(local / 1000, 7, 15) * wither;
            if (grow > 0) drawLeaf(B, e.tone ? colours.green2 : colours.green, colours.vein, x, y, e.a + jr, e.L * grow, e.bend, e.wide);
            continue;
          }
          const opener = e.opener;
          const openAt = opener < 0 ? birth + e.d0 : frame.births[opener];
          const open = openAt === Infinity ? -1 : frame.now - openAt;
          const close = opener < 0 ? 1 : withering(frame, opener);
          const look = frame.face?.(e.id, x, y);
          if (frame.perches && depth === 1 && e.species !== 'forget' && open > 700 && close >= 1 && wither >= 1) {
            frame.perches.push({ id: e.id, x, y, R: e.R });
          }
          drawFlower(B, colours, e, x, y, e.R * wither, e.rot + jr + (look ? look[0] * 0.22 : 0), open, local, close, look);
        }
      });
    }
  }
  if (underground) drawGroundFront(B, ink, scene, frame);
};

const drawStem = (
  B: Backend,
  ink: Ink,
  e: StemEl,
  g: Group,
  birth: number,
  age: number,
  layer: number,
  step: number,
  frame: Frame,
  warp: (g: Group, birth: number, x: number, y: number) => Pt,
  wither: number,
) => {
  const drawn = easeOut((age - e.d0) / e.dur) * wither;
  if (drawn <= 0) return;
  const [jx, jy] = jitter(e.id, step, frame.boil);
  let P: Pt[] | undefined;
  for (const seg of e.segs) {
    if (seg.layer !== layer) continue;
    const end = Math.min(seg.u1, drawn);
    if (end <= seg.u0) continue;
    P ??= e.pts.map(([x, y]) => warp(g, birth, x + jx, y + jy));
    strokeRange(B, P, seg.u0, end, ink.green, e.w);
  }
};

const drawSoil = (B: Backend, ink: Ink, scene: GardenScene) => {
  const { ground, underDepth, height } = scene;
  const bottom = height + underDepth + 40;
  B.fill([...ground.soil, [scene.width + 16, bottom], [-16, bottom]], ink.soil);
  for (const root of ground.roots) B.stroke(root, ink.root, 1.2 * scene.scale);
  for (const p of ground.pebbles) B.fill(blob((x, y) => [x, y], p.x, p.y, p.rx, p.ry, 0, p.x, 12), ink.pebble);
};

// Grass stands in front of where the stems enter the soil.
const drawGroundFront = (B: Backend, ink: Ink, scene: GardenScene, frame: Frame) => {
  const step = frame.step ?? Math.floor(frame.now / 120);
  for (const blade of scene.ground.grass) {
    const [jx, jy, jr] = jitter(blade.id, step, frame.boil * 0.6);
    drawLeaf(B, ink.green, undefined, blade.x + jx, blade.y + jy, blade.a + jr, blade.L, blade.bend);
  }
  const snail = scene.ground.snail;
  drawSnail(B, ink, snail.x + snail.travel * (frame.snail ?? 0), snail.y, snail.s);
};
