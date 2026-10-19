import type { Locale } from '../i18n/locales';

type Localized = Record<Locale, string>;

export interface Oddity {
  slug: string;
  /** The question or moment the oddity is about. It names the card's link and the page. */
  name: Localized;
  /** The product it was found in, in grey beside the name. */
  where: Localized;
  year: string;
}

// Little oddities: small mismatches between a product and what people actually do, each noticed,
// named, and answered with a small fix. Newest first. Each one has its own card visual (see
// LittleOddities.astro) and its own short page under src/pages/oddities/.
export const oddities: readonly Oddity[] = [
  {
    slug: 'already-sent',
    name: { en: 'Did I already send this?', ru: 'Я это уже отправлял?' },
    where: { en: 'Instagram', ru: 'Instagram' },
    year: '2026',
  },
];

export const oddityPath = (slug: string) => `/oddities/${slug}/`;
