import { sitePath } from '../config/site';

export const locales = ['en', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// Remembers an explicit choice from the language switcher.
export const localeStorageKey = 'site-locale';

export const localeDetails = {
  en: { name: 'English', short: 'EN', ogLocale: 'en_US' },
  ru: { name: 'Русский', short: 'RU', ogLocale: 'ru_RU' },
} as const satisfies Record<Locale, { name: string; short: string; ogLocale: string }>;

export const toLocale = (value: string | undefined): Locale =>
  locales.includes(value as Locale) ? (value as Locale) : defaultLocale;

/** Picks the string for the current locale: `t('Home', 'Главная')`. */
export const translator =
  (locale: Locale) =>
  (en: string, ru: string): string =>
    locale === 'ru' ? ru : en;

/** Site path for a locale. English keeps unprefixed addresses. */
export const localePath = (path: string, locale: Locale) => {
  const relativePath = path.replace(/^\/+/, '');
  return sitePath(locale === defaultLocale ? relativePath : `${locale}/${relativePath}`);
};

/** The locale-neutral path of a built page, without the base or a locale prefix. */
export const neutralPath = (pathname: string) => {
  const base = import.meta.env.BASE_URL;
  const withoutBase = pathname.startsWith(base) ? pathname.slice(base.length) : pathname.replace(/^\/+/, '');
  const localePrefix = new RegExp(`^(${locales.filter((locale) => locale !== defaultLocale).join('|')})(/|$)`);
  return `/${withoutBase.replace(localePrefix, '')}`;
};
