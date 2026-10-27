import type { ImageMetadata } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

import { defaultLocale, type Locale } from '../i18n/locales';

export interface LocalizedPost {
  /** Shared address segment, the same in every language. */
  slug: string;
  entry: CollectionEntry<'writing'>;
  /** Language the entry is written in. Untranslated posts fall back to English. */
  contentLocale: Locale;
  /** The card's illustration, set once on the English post and shared by its translations. */
  cover?: ImageMetadata;
}

// English posts live at the collection root; translations sit in a locale
// folder under the same file name, for example `ru/turn-off-one-sound.mdx`.
export async function getWriting(locale: Locale): Promise<LocalizedPost[]> {
  const entries = await getCollection('writing');
  const originals = entries.filter((entry) => !entry.id.includes('/'));

  return originals.map((original) => {
    const translation =
      locale === defaultLocale ? undefined : entries.find((entry) => entry.id === `${locale}/${original.id}`);

    return {
      slug: original.id,
      entry: translation ?? original,
      contentLocale: translation ? locale : defaultLocale,
      cover: original.data.cover,
    };
  });
}

// Newest first; undated posts (older, published elsewhere) go last.
export const newestFirst = (posts: LocalizedPost[]): LocalizedPost[] =>
  [...posts].sort(
    (first, second) =>
      (second.entry.data.publishedAt?.getTime() ?? 0) - (first.entry.data.publishedAt?.getTime() ?? 0),
  );

// The newest post is marked as new for its first month. Checked at build time,
// so the mark disappears on the first deploy after that.
const freshFor = 30 * 24 * 60 * 60 * 1000;

export const isFresh = (post: LocalizedPost, newest: LocalizedPost | undefined): boolean => {
  const date = post.entry.data.publishedAt;
  return !!date && post.slug === newest?.slug && Date.now() - date.getTime() < freshFor;
};

export const postHref = (post: LocalizedPost, localePath: (path: string) => string): string =>
  post.entry.data.externalUrl ?? localePath(`/writing/${post.slug}/`);
