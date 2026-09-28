import { getCollection, type CollectionEntry } from 'astro:content';

import { defaultLocale, type Locale } from '../i18n/locales';

export interface LocalizedPost {
  /** Shared address segment, the same in every language. */
  slug: string;
  entry: CollectionEntry<'writing'>;
  /** Language the entry is written in. Untranslated posts fall back to English. */
  contentLocale: Locale;
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
    };
  });
}
