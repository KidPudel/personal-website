import type { Ink } from './garden-draw';

// The garden's inks live in CSS (FooterGarden.astro) as --fg-* custom
// properties; the canvas needs them as values. `far-` reads the paler inks of
// the far clusters, falling back to the near ones.

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

export const readInk = (style: CSSStyleDeclaration, prefix: string, fallback?: Ink) =>
  Object.fromEntries(
    (Object.keys(INK_KEYS) as (keyof Ink)[]).map((key) => [
      key,
      style.getPropertyValue(`--fg-${prefix}${INK_KEYS[key]}`).trim() || fallback?.[key] || '#000',
    ]),
  ) as unknown as Ink;
