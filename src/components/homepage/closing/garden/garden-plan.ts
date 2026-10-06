// Where everything in the footer garden goes. The plan is pure: the same
// seed, width and footer give the same garden.
//
// The garden is a tasteful jungle: clusters of leaning stems from one root,
// each with a flower that leads (sunflower, cosmos, anemone, lilac daisy,
// coral, forget-me-nots) and the odd guest, close together and overlapping.
// Far clusters stand behind, smaller and paler; broad leafy foliage covers
// the page's bottom edge in front. Stems meander, weave in front of and
// behind each other, and end in flowers, buds, leaf fans or tendrils.
//
// Coordinates are CSS pixels. y = 0 is the top of the drawing, `height` is
// the page's bottom edge, and the ground lies at `groundY`, below it, where
// only a pull past the end of the page reaches.
//
// What a pull grows is planned as a queue of growth events, mostly new
// flowers: a bud opens, a flower pops out along a stem, a branch flowers, a
// sprout comes up and blooms, now and then a vine climbs and wraps a stem. The live garden gives an event a
// birth time while the page is pulled, and withers it again on release.

export type Pt = [number, number];
export type Layer = 0 | 1 | 2;
export type Species = 'sun' | 'cosmos' | 'anemone' | 'lilac' | 'coral' | 'forget';

export interface Seg {
  u0: number;
  u1: number;
  layer: Layer;
}

interface Element {
  id: number;
  // Delay after the group's birth, in ms.
  d0: number;
  top: number;
  bottom: number;
}

export interface StemEl extends Element {
  t: 'stem';
  pts: Pt[];
  segs: Seg[];
  w: number;
  dur: number;
}

export interface LeafEl extends Element {
  t: 'leaf';
  x: number;
  y: number;
  a: number;
  L: number;
  bend: number;
  layer: Layer;
  // Half-width as a share of length: slim leaves 0.18, broad ones more.
  wide: number;
  tone: 0 | 1;
}

export interface FlowerEl extends Element {
  t: 'flower';
  species: Species;
  x: number;
  y: number;
  R: number;
  rot: number;
  ph: number;
  turns: number;
  layer: Layer;
  // The group whose birth opens this bud; -1 opens it as soon as it grows.
  opener: number;
}

export type GardenEl = StemEl | LeafEl | FlowerEl;

export type GroupKind = 'rest' | 'open' | 'branch' | 'climb' | 'sprout';

export interface Group {
  kind: GroupKind;
  els: GardenEl[];
  // Where this growth starts, for the sway a newborn plant settles from.
  root: Pt;
  plant: number;
  // 0 far, 1 near, 2 the foliage in front.
  depth: 0 | 1 | 2;
  sway: 1 | -1;
}

export interface Plant {
  x: number;
  y: number;
  depth: 0 | 1 | 2;
}

export interface Ground {
  soil: Pt[];
  grass: LeafEl[];
  pebbles: { x: number; y: number; rx: number; ry: number }[];
  roots: Pt[][];
  snail: { x: number; y: number; s: number; travel: number };
}

export interface GardenScene {
  width: number;
  height: number;
  band: number;
  groundY: number;
  underDepth: number;
  scale: number;
  unit: number;
  plants: Plant[];
  groups: Group[];
  resting: number;
  ground: Ground;
}

export interface Exclusion {
  left: number;
  right: number;
  bottom: number;
}

export interface GardenInput {
  seed: number;
  width: number;
  band: number;
  rise: number;
  groundDepth: number;
  underDepth: number;
  exclusions?: Exclusion[];
}

type Random = () => number;

export const createRandom = (seed: number): Random => {
  let state = seed | 0;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value));

// A stem: a heading that drifts with a soft wave, integrated step by step.
const vine = (base: Pt, dir: number, len: number, amp: number, waves: number, ph: number, bend: number, n = 40) => {
  const P: Pt[] = [[base[0], base[1]]];
  const step = len / n;
  let [x, y] = base;
  for (let i = 1; i <= n; i += 1) {
    const u = i / n;
    const a = dir + bend * u + amp * Math.sin(u * Math.PI * waves + ph) * Math.min(1, u * 3);
    x += Math.cos(a) * step;
    y += Math.sin(a) * step;
    P.push([x, y]);
  }
  return P;
};

// A tendril's end winds in on itself.
const curl = (P: Pt[], sign: number, rad: number) => {
  const n = P.length;
  const e = P[n - 1];
  const a = Math.atan2(e[1] - P[n - 2][1], e[0] - P[n - 2][0]);
  const c: Pt = [e[0] - Math.sin(a) * sign * rad, e[1] + Math.cos(a) * sign * rad];
  const a0 = Math.atan2(e[1] - c[1], e[0] - c[0]);
  for (let i = 1; i <= 14; i += 1) {
    const u = i / 14;
    const t = a0 + sign * u * Math.PI * 1.6;
    const rr = rad * (1 - 0.5 * u);
    P.push([c[0] + Math.cos(t) * rr, c[1] + Math.sin(t) * rr]);
  }
  return P;
};

export const pointAt = (P: Pt[], u: number): [Pt, number] => {
  const n = P.length;
  const i = Math.min(n - 2, Math.max(1, Math.round(u * (n - 1))));
  return [P[i], Math.atan2(P[i + 1][1] - P[i - 1][1], P[i + 1][0] - P[i - 1][0])];
};

const lengthOf = (P: Pt[]) => {
  let total = 0;
  for (let i = 1; i < P.length; i += 1) total += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]);
  return total;
};

// A stem passes in front of and behind what is near it a few times.
const weave = (r: Random, from: Layer, to: Layer): Seg[] => {
  const cuts = Array.from({ length: 1 + Math.floor(r() * 3) }, () => 0.15 + r() * 0.7).sort((a, b) => a - b);
  const segs: Seg[] = [];
  let u0 = 0;
  let layer = r() < 0.5 ? from : to;
  for (const cut of cuts) {
    if (cut <= u0) continue;
    segs.push({ u0, u1: cut, layer });
    u0 = cut;
    layer = layer === from ? to : from;
  }
  segs.push({ u0, u1: 1, layer });
  return segs;
};

const layerAt = (segs: Seg[], u: number) => (segs.find((s) => u >= s.u0 && u <= s.u1) ?? segs[segs.length - 1]).layer;

// How often each flower leads a cluster.
const LEADERS: [Species, number][] = [
  ['sun', 0.24],
  ['cosmos', 0.22],
  ['anemone', 0.18],
  ['lilac', 0.18],
  ['coral', 0.18],
];

type Tip = 'flower' | 'bud' | 'forget' | 'fan' | 'leaf' | 'curl';

export const planGarden = (input: GardenInput): GardenScene => {
  const r = createRandom(input.seed);
  const { width, band, rise } = input;
  const height = band + rise;
  const groundY = height + input.groundDepth;
  const scale = width < 560 ? 0.8 : width < 1000 ? 0.9 : 1;
  const unit = 70 * scale;
  const exclusions = input.exclusions ?? [];
  let nextId = 1;
  const nid = () => nextId++;

  const pickSpecies = (): Species => {
    let roll = r();
    for (const [species, weight] of LEADERS) {
      roll -= weight;
      if (roll <= 0) return species;
    }
    return 'sun';
  };

  // The highest a flower of radius R may reach at x: below any footer text
  // it would touch, and inside the drawing.
  const ceiling = (x: number, R: number) =>
    exclusions.reduce(
      (top, area) => (x + R + 12 > area.left && x - R - 12 < area.right ? Math.max(top, area.bottom + 10) : top),
      4,
    );

  const leaf = (x: number, y: number, a: number, L: number, bend: number, layer: Layer, d0: number, wide = 0.18, tone: 0 | 1 = 0): LeafEl => ({
    t: 'leaf',
    id: nid(),
    x,
    y,
    a,
    L,
    bend,
    layer,
    d0,
    wide,
    tone,
    top: y - L,
    bottom: y + L,
  });

  const flower = (species: Species, x: number, y: number, R: number, layer: Layer, d0: number): FlowerEl => ({
    t: 'flower',
    id: nid(),
    species,
    x,
    y,
    R,
    rot: r() * Math.PI * 2,
    ph: r() * 6.28,
    turns: 1.6 + r() * 0.9,
    layer,
    opener: -1,
    d0,
    top: y - R * 1.2,
    bottom: y + R * 1.2,
  });

  interface Grow {
    pts: Pt[];
    d0: number;
    tip: Tip;
    w: number;
    leafy: number;
    layers: [Layer, Layer];
    species?: Species;
    R?: number;
    small?: boolean;
  }

  // One stem with its leaves and what ends it, as if drawn in one go: the
  // stem draws in, leaves spring off it as it passes, the tip comes last.
  const grow = (els: GardenEl[], o: Grow) => {
    let P = o.pts;
    if (o.tip === 'curl') P = curl(P, r() < 0.5 ? -1 : 1, (4 + r() * 4) * scale);
    const segs = weave(r, o.layers[0], o.layers[1]);
    const dur = clamp(lengthOf(P) * 4.4, 360, 2000);
    const ys = P.map((p) => p[1]);
    els.push({ t: 'stem', id: nid(), pts: P, segs, w: o.w, dur, d0: o.d0, top: Math.min(...ys), bottom: Math.max(...ys) });

    // Most leaves sit where the page shows them; a few are found by a pull.
    const shown = P.findIndex((p) => p[1] < height);
    const visibleFrom = shown < 0 ? 0.5 : Math.max(0.12, shown / (P.length - 1) - 0.06);
    const count = Math.round(r() * 2.4 * o.leafy + (o.small ? 0.5 : 2));
    let side = r() < 0.5 ? -1 : 1;
    const tone: 0 | 1 = r() < 0.3 ? 1 : 0;
    for (let i = 0; i < count; i += 1) {
      const u = clamp(visibleFrom + (0.9 - visibleFrom) * ((i + 0.2 + r() * 0.6) / Math.max(count, 1)), 0.1, 0.92);
      const [q, a] = pointAt(P, u);
      side = -side;
      const L = (o.small ? 15 + r() * 12 : 24 + r() * 22) * scale * (1.15 - u * 0.35);
      els.push(leaf(q[0], q[1], a + side * (0.55 + r() * 0.5), L, (r() - 0.5) * 1.2, layerAt(segs, u), o.d0 + dur * u, r() < 0.3 ? 0.26 : 0.18, tone));
    }
    if (!o.small && shown > 0) {
      const edge = shown / (P.length - 1);
      const below = 1 + Math.floor(r() * 2);
      for (let i = 0; i < below; i += 1) {
        const u = clamp(edge * (0.25 + 0.65 * ((i + r()) / below)), 0.06, 0.6);
        const [q, a] = pointAt(P, u);
        side = -side;
        els.push(leaf(q[0], q[1], a + side * (0.6 + r() * 0.4), (22 + r() * 18) * scale, r() - 0.5, layerAt(segs, u), o.d0 + dur * u, r() < 0.5 ? 0.24 : 0.18, tone));
      }
    }

    const [tp, ta] = pointAt(P, 1);
    const tipLayer = layerAt(segs, 1);
    const td = o.d0 + dur * 0.82;
    let head: FlowerEl | undefined;
    if (o.tip === 'flower' || o.tip === 'bud') {
      head = flower(o.species ?? 'sun', tp[0], tp[1], o.R ?? 18 * scale, r() < 0.65 ? 2 : tipLayer, td);
      els.push(head);
    } else if (o.tip === 'forget') {
      // A little posy of forget-me-nots.
      const count = 3 + Math.floor(r() * 2);
      for (let i = 0; i < count; i += 1) {
        const a = ta + (i - (count - 1) / 2) * 1.1;
        const d = i ? (7 + r() * 5) * scale : 0;
        els.push(flower('forget', tp[0] + Math.cos(a) * d, tp[1] + Math.sin(a) * d, (5 + r() * 3) * scale, 2, td + i * 90));
      }
    } else if (o.tip === 'fan') {
      const spread = 0.6 + r() * 0.3;
      for (let j = 0; j < 2; j += 1) {
        els.push(leaf(tp[0], tp[1], ta + (j - 0.5) * spread, (14 + r() * 12) * scale, (j - 0.5) * 0.8, tipLayer, td + j * 60));
      }
    } else if (o.tip === 'leaf') {
      els.push(leaf(tp[0], tp[1], ta + (r() - 0.5) * 0.3, (12 + r() * 10) * scale, r() - 0.5, tipLayer, td));
    }
    return { P, segs, head };
  };

  // A stem from the ground that reaches a chosen height, however it bends.
  // The whole shape scales with its length, so one correction lands it.
  const aimed = (base: Pt, dir: number, tipY: number, amp: number, waves: number, ph: number, bend: number) => {
    const rise = base[1] - tipY;
    let len = rise / 0.92;
    let P = vine(base, dir, len, amp, waves, ph, bend);
    const actual = base[1] - P[P.length - 1][1];
    if (actual > 1) {
      len *= rise / actual;
      P = vine(base, dir, len, amp, waves, ph, bend);
    }
    return P;
  };

  const plants: Plant[] = [];
  const restGroups: Group[] = [];
  interface MainStem {
    P: Pt[];
    plant: number;
    depth: 0 | 1;
    species: Species;
  }
  const mainStems: MainStem[] = [];
  const buds: { head: FlowerEl; plant: number; depth: 0 | 1 }[] = [];

  const plantCluster = (cx: number, depth: 0 | 1, weight: number) => {
    const plant = plants.length;
    const size = depth ? 1 : 0.74;
    const lowest = height - band * (depth ? 0.32 : 0.45);
    const group: Group = { kind: 'rest', els: [], root: [cx, groundY], plant, depth, sway: r() < 0.5 ? 1 : -1 };
    const lean = (r() - 0.5) * 0.5;
    const leader = pickSpecies();
    const stems = depth ? 3 + (r() < 0.5 ? 1 : 0) + (weight > 1.1 ? 1 : 0) : 2 + (r() < 0.6 ? 1 : 0);
    let tallest = height;
    for (let i = 0; i < stems; i += 1) {
      const hero = i === 0;
      const baseX = cx + (r() - 0.5) * 26 * scale;
      const dir = -Math.PI / 2 + lean * 0.6 + (i - (stems - 1) / 2) * (0.13 + r() * 0.12) + (r() - 0.5) * 0.12;
      const species: Species = hero || r() < 0.7 ? leader : pickSpecies();
      const roll = r();
      // Every cluster leads with an open flower; buds are the minority.
      const tip: Tip = hero
        ? 'flower'
        : roll < 0.48 ? 'flower' : roll < 0.6 ? 'bud' : roll < 0.74 ? 'forget' : roll < 0.88 ? 'fan' : 'curl';
      const R = (hero ? (24 + r() * 10) * Math.sqrt(weight) : 13 + r() * 9) * scale * size * (species === 'sun' ? 1.08 : 1);
      const reach = hero ? 0.62 + r() * 0.38 : tip === 'fan' || tip === 'curl' ? 0.08 + r() * 0.35 : 0.22 + r() * 0.5;
      const amp = 0.12 + r() * 0.16;
      const waves = 1 + r() * 1.2;
      const ph = r() * 6.28;
      const bend = (r() - 0.5) * 0.35;
      const guessX = baseX + Math.cos(dir) * (groundY - height) * 1.2;
      let tipY = lowest - reach * Math.max(0, lowest - (ceiling(guessX, R) + R));
      let P = aimed([baseX, groundY + 4], dir, tipY, amp, waves, ph, bend);
      for (let attempt = 0; attempt < 3; attempt += 1) {
        const [tx, ty] = P[P.length - 1];
        const need = ceiling(tx, R) + R;
        if (ty >= need - 1) break;
        tipY = need;
        P = aimed([baseX, groundY + 4], dir, tipY, amp, waves, ph, bend);
      }
      const grown = grow(group.els, {
        pts: P,
        d0: 0,
        tip,
        w: (hero ? 3.6 : 2.9) * scale * size,
        leafy: depth ? 1.3 : 0.9,
        layers: depth ? [1, 2] : [0, 1],
        species,
        R,
      });
      tallest = Math.min(tallest, P[P.length - 1][1]);
      mainStems.push({ P: grown.P, plant, depth, species });
      if (grown.head && tip === 'bud') buds.push({ head: grown.head, plant, depth });

      // Most stems fork once, ending in leaves, a tendril or a posy.
      if (r() < 0.6) {
        const u = 0.45 + r() * 0.25;
        const [q, a] = pointAt(P, u);
        if (q[1] < height) {
          const side = r() < 0.5 ? -1 : 1;
          const forkTip: Tip = r() < 0.45 ? 'curl' : r() < 0.65 ? 'fan' : r() < 0.85 ? 'forget' : 'leaf';
          const pts = vine(q, a + side * (0.6 + r() * 0.4), (40 + r() * 50) * scale, 0.35 + r() * 0.45, 1 + r() * 1.4, r() * 6.28, side * 0.5);
          grow(group.els, { pts, d0: 0, tip: forkTip, w: 2.2 * scale * size, leafy: 0.8, layers: depth ? [1, 2] : [0, 1], small: true });
        }
      }
    }
    plants.push({ x: cx, y: tallest, depth });
    restGroups.push(group);
    return plant;
  };

  // Near clusters spread with a loose, uneven rhythm; far clusters stand
  // behind, in most gaps.
  const left = Math.max(14, width * 0.015);
  const right = left;
  const usable = Math.max(1, width - left - right);
  const nearCount = clamp(Math.round(usable / (165 * scale)), 2, 10);
  const cell = usable / nearCount;
  const nearX = Array.from({ length: nearCount }, (_, i) => left + (i + 0.5 + (r() - 0.5) * 0.55) * cell);
  const gaps: number[] = [];
  for (let i = 0; i <= nearCount; i += 1) {
    const from = i === 0 ? left : nearX[i - 1];
    const to = i === nearCount ? width - right : nearX[i];
    if (to - from > 70 * scale) gaps.push((from + to) / 2 + (r() - 0.5) * 24 * scale);
  }
  gaps.forEach((x) => {
    if (r() < 0.9) plantCluster(x, 0, 0.8 + r() * 0.3);
  });
  nearX.forEach((x) => plantCluster(x, 1, 0.75 + r() * 0.55));

  // Broad foliage along the page's bottom edge, rooted in the soil.
  for (let x = left + r() * 20; x < width - 6; x += (30 + r() * 26) * scale) {
    const plant = plants.length;
    const group: Group = { kind: 'rest', els: [], root: [x, groundY], plant, depth: 2, sway: r() < 0.5 ? 1 : -1 };
    const top = height - (6 + r() * 26) * scale;
    const P = aimed([x, groundY + 4], -Math.PI / 2 + (r() - 0.5) * 0.3, top, 0.1, 1, r() * 6, 0);
    const ys = P.map((p) => p[1]);
    group.els.push({ t: 'stem', id: nid(), pts: P, segs: [{ u0: 0, u1: 1, layer: 1 }], w: 2.6 * scale, dur: 900, d0: 0, top: Math.min(...ys), bottom: Math.max(...ys) });
    const leaves = 3 + Math.floor(r() * 3);
    const tone: 0 | 1 = r() < 0.45 ? 1 : 0;
    for (let i = 0; i < leaves; i += 1) {
      const spread = (i / (leaves - 1) - 0.5) * 2;
      group.els.push(
        leaf(x, top + Math.abs(spread) * 6 * scale, -Math.PI / 2 + spread * 0.95 + (r() - 0.5) * 0.2, (24 + r() * 26) * scale * (1 - Math.abs(spread) * 0.25), spread * 0.9, 1, i * 40, 0.26 + r() * 0.06, tone),
      );
    }
    plants.push({ x, y: top, depth: 2 });
    restGroups.push(group);
  }

  // The queue a pull works through.
  interface Item {
    group: Group;
    opens?: FlowerEl;
  }
  const items: Item[] = [];

  buds.forEach(({ head, plant, depth }) =>
    items.push({ group: { kind: 'open', els: [], root: [head.x, head.y], plant, depth, sway: 1 }, opens: head }),
  );

  // Branches shoot off grown stems and flower as they arrive.
  mainStems.forEach((stem) => {
    if (r() > (stem.depth ? 0.8 : 0.4)) return;
    const u = 0.4 + r() * 0.4;
    const [q, a] = pointAt(stem.P, u);
    if (q[1] > height + 10) return;
    const side = r() < 0.5 ? -1 : 1;
    const group: Group = { kind: 'branch', els: [], root: q, plant: stem.plant, depth: stem.depth, sway: side };
    const tip: Tip = r() < 0.75 ? 'flower' : 'forget';
    const pts = vine(q, a + side * (0.55 + r() * 0.45), (46 + r() * 50) * scale, 0.3 + r() * 0.4, 1 + r() * 1.4, r() * 6.28, side * 0.3);
    grow(group.els, {
      pts,
      d0: 0,
      tip,
      w: 2.2 * scale * (stem.depth ? 1 : 0.74),
      leafy: 0.9,
      layers: stem.depth ? [1, 2] : [0, 1],
      species: r() < 0.6 ? stem.species : pickSpecies(),
      R: (11 + r() * 7) * scale * (stem.depth ? 1 : 0.74),
      small: true,
    });
    items.push({ group });
  });

  // New flowers pop out along the stems on short stalks.
  mainStems.forEach((stem) => {
    const pops = stem.depth ? 2 : r() < 0.5 ? 1 : 0;
    for (let i = 0; i < pops; i += 1) {
      const shown = Math.max(1, stem.P.findIndex((p) => p[1] < height - 6));
      const u = clamp(shown / (stem.P.length - 1) + 0.05 + r() * 0.4, 0.3, 0.92);
      const [q, a] = pointAt(stem.P, u);
      const side = r() < 0.5 ? -1 : 1;
      const group: Group = { kind: 'branch', els: [], root: q, plant: stem.plant, depth: stem.depth, sway: side };
      const pts = vine(q, a + side * (0.7 + r() * 0.5), (12 + r() * 16) * scale, 0.2, 1, r() * 6.28, side * 0.3, 12);
      grow(group.els, {
        pts,
        d0: 0,
        tip: 'flower',
        w: 1.8 * scale * (stem.depth ? 1 : 0.74),
        leafy: 0.2,
        layers: stem.depth ? [1, 2] : [0, 1],
        species: r() < 0.6 ? stem.species : pickSpecies(),
        R: (11 + r() * 7) * scale * (stem.depth ? 1 : 0.74),
        small: true,
      });
      items.push({ group });
    }
  });

  // Vines climb a stem from the ground, wrapping around it, and flower.
  mainStems
    .filter((stem) => stem.depth === 1)
    .forEach((stem) => {
      if (r() > 0.25) return;
      const group: Group = { kind: 'climb', els: [], root: stem.P[0], plant: stem.plant, depth: 1, sway: 1 };
      const host = stem.P;
      const cumulative = [0];
      for (let i = 1; i < host.length; i += 1) {
        cumulative.push(cumulative[i - 1] + Math.hypot(host[i][0] - host[i - 1][0], host[i][1] - host[i - 1][1]));
      }
      const hostAt = (l: number): [Pt, number] => {
        let i = 1;
        while (i < host.length - 1 && cumulative[i] < l) i += 1;
        const f = (l - cumulative[i - 1]) / Math.max(cumulative[i] - cumulative[i - 1], 0.001);
        const a = Math.atan2(host[i][1] - host[i - 1][1], host[i][0] - host[i - 1][0]);
        return [[host[i - 1][0] + (host[i][0] - host[i - 1][0]) * f, host[i - 1][1] + (host[i][1] - host[i - 1][1]) * f], a];
      };
      const top = cumulative[cumulative.length - 1] * (0.55 + r() * 0.3);
      const amp = 3.8 * scale;
      const pitch = (18 + r() * 8) * scale;
      const phase = r() * 6.28;
      const pts: Pt[] = [];
      const front: boolean[] = [];
      const sides: number[] = [];
      for (let l = 0; l <= top; l += 2.2) {
        const [p, a] = hostAt(l);
        const phi = (l / pitch) * Math.PI * 2 + phase;
        const off = amp * Math.sin(phi);
        pts.push([p[0] - Math.sin(a) * off, p[1] + Math.cos(a) * off]);
        front.push(Math.cos(phi) > 0);
        sides.push(Math.sin(phi) >= 0 ? 1 : -1);
      }
      const climbed = pts.length;
      curl(pts, r() < 0.5 ? -1 : 1, 5 * scale);
      for (let i = climbed; i < pts.length; i += 1) front.push(true);
      const segs: Seg[] = [];
      let start = 0;
      for (let i = 1; i <= front.length; i += 1) {
        if (i === front.length || front[i] !== front[start]) {
          segs.push({ u0: start / (pts.length - 1), u1: Math.min(1, i / (pts.length - 1)), layer: front[start] ? 2 : 0 });
          start = i;
        }
      }
      const dur = clamp(lengthOf(pts) * 2.8, 700, 2200);
      const ys = pts.map((p) => p[1]);
      group.els.push({ t: 'stem', id: nid(), pts, segs, w: 1.7 * scale, dur, d0: 0, top: Math.min(...ys), bottom: Math.max(...ys) });
      for (let i = 8; i < climbed; i += Math.round(6 + r() * 5)) {
        let k = i;
        while (k < climbed - 1 && !front[k]) k += 1;
        const [q, a] = pointAt(pts, k / (pts.length - 1));
        group.els.push(leaf(q[0], q[1], a + sides[k] * (0.9 + r() * 0.4), (9 + r() * 6) * scale, r() - 0.5, 2, dur * (k / pts.length)));
      }
      const blossoms = 3 + Math.floor(r() * 3);
      for (let b = 0; b < blossoms; b += 1) {
        let k = Math.floor(climbed * (0.3 + (0.65 * (b + r())) / blossoms));
        while (k < climbed - 1 && !front[k]) k += 1;
        const q = pts[Math.min(k, pts.length - 1)];
        group.els.push(flower('forget', q[0], q[1], (5.5 + r() * 3) * scale, 2, dur * (k / pts.length) + 120));
      }
      items.push({ group });
    });

  // Sprouts come up from the soil, in the gaps and beside the clusters, and
  // bloom as they arrive.
  [...gaps, ...nearX.map((x) => x + (r() < 0.5 ? -1 : 1) * cell * (0.25 + r() * 0.15))].forEach((x) => {
    if (r() > 0.85) return;
    const plant = plants.reduce((best, p, i) => (Math.abs(p.x - x) < Math.abs(plants[best].x - x) ? i : best), 0);
    const group: Group = { kind: 'sprout', els: [], root: [x, groundY], plant, depth: 1, sway: r() < 0.5 ? 1 : -1 };
    const tipY = height - band * (0.12 + r() * 0.3);
    const pts = aimed([x, groundY + 4], -Math.PI / 2 + (r() - 0.5) * 0.4, tipY, 0.15 + r() * 0.15, 1 + r(), r() * 6.28, (r() - 0.5) * 0.4);
    const tip: Tip = r() < 0.8 ? 'flower' : 'forget';
    grow(group.els, { pts, d0: 0, tip, w: 2.2 * scale, leafy: 1, layers: [1, 2], species: pickSpecies(), R: (12 + r() * 7) * scale, small: true });
    items.push({ group });
  });

  const resting = restGroups.length;
  // Far clusters draw first, foliage last.
  restGroups.sort((a, b) => a.depth - b.depth);
  const groups = [...restGroups, ...items.map((item) => item.group)];
  items.forEach((item, index) => {
    if (item.opens) item.opens.opener = resting + index;
  });

  // The ground beneath the page.
  const soilY = (x: number) => groundY + 2.4 * Math.sin(x / 53 + input.seed) + 1.7 * Math.sin(x / 23 + input.seed * 0.7);
  const soil: Pt[] = [];
  for (let x = -16; x <= width + 16; x += 14) soil.push([x, soilY(x)]);
  // Grass in fanned clumps, with bare soil between them.
  const grass: LeafEl[] = [];
  for (let x = r() * 30; x < width + 10; x += 34 + r() * 46) {
    const blades = 3 + Math.floor(r() * 3);
    const lean = (r() - 0.5) * 0.3;
    for (let i = 0; i < blades; i += 1) {
      const spread = (i / (blades - 1) - 0.5) * 1.3;
      const bx = x + spread * 4;
      grass.push(leaf(bx, soilY(bx) + 2, -Math.PI / 2 + lean + spread * 0.9, (12 + r() * 16) * scale * (1 - Math.abs(spread) * 0.4), spread * 0.9, 1, 0));
    }
  }
  const pebbles = Array.from({ length: Math.round(width / 110) }, () => {
    const x = r() * width;
    const rx = (2.5 + r() * 3) * scale;
    return { x, y: soilY(x) + 4 + r() * 10, rx, ry: rx * (0.55 + r() * 0.2) };
  });
  const roots = mainStems.flatMap((stem) => {
    const [x] = stem.P[0];
    const y = soilY(x) + 2;
    return [-1, 0, 1].map((k) => vine([x, y], Math.PI / 2 + k * (0.5 + r() * 0.3), (10 + r() * 14) * scale, 0.4, 1.5, r() * 6, k * 0.4, 8));
  });
  const snailX = width * (0.12 + r() * 0.5);

  return {
    width,
    height,
    band,
    groundY,
    underDepth: input.underDepth,
    scale,
    unit,
    plants,
    groups,
    resting,
    ground: { soil, grass, pebbles, roots, snail: { x: snailX, y: soilY(snailX) + 1, s: 1.1 * scale, travel: 80 * scale } },
  };
};

// How full the near row looks at rest: open flowers up front (forget-me-nots
// count for little), by area, per pixel of width.
export const frontBloom = (scene: GardenScene) => {
  let area = 0;
  for (const group of scene.groups.slice(0, scene.resting)) {
    if (group.depth !== 1) continue;
    for (const e of group.els) {
      if (e.t !== 'flower' || e.opener >= 0 || e.y > scene.height) continue;
      area += e.R * e.R * (e.species === 'forget' ? 0.3 : 1);
    }
  }
  return area / Math.max(1, scene.width) / (scene.scale * scene.scale);
};
