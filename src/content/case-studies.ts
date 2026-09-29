import type { ImageMetadata } from 'astro';

import observatoryCover from '../assets/case_study_images/outcome_screenshots/main.png';
import instagramCover from '../assets/case_study_images/instagram-saves-redesign/screenshots/all_saved_new.png';
import supergoodCover from '../assets/case_study_images/supergood/dish-sheet-light.png';
import twoSticksCover from '../assets/case_study_images/two-sticks/search2.png';
import observatoryCard from '../assets/showcase-cards/card1.png';
import supergoodCard from '../assets/showcase-cards/card2.png';
import instagramCard from '../assets/showcase-cards/card3.png';
import twoSticksCard from '../assets/showcase-cards/card4.png';
import type { Locale } from '../i18n/locales';

type Localized = Record<Locale, string>;

export interface CaseStudy {
  slug: string;
  name: Localized;
  pitch: Localized;
  responsibility: Localized;
  year: string;
  /** Soft texture shared with the homepage showcase card. */
  background: ImageMetadata;
  /** A product screen shown on the case-studies index. */
  cover: ImageMetadata;
  coverFormat: 'desktop' | 'phone';
}

// One source for the homepage showcase and the case-studies index. The order
// ranks the studies, strongest first, and is the order the index shows. The
// homepage places the cards by its own layout (see ShowcaseCards.astro).
export const caseStudies: readonly CaseStudy[] = [
  {
    slug: 'supergood',
    name: { en: 'SuperGood', ru: 'SuperGood' },
    pitch: { en: 'Homemade food, without the guesswork.', ru: 'Домашняя еда, и никаких сюрпризов.' },
    responsibility: {
      en: 'Research, product design, and Flutter build.',
      ru: 'Исследование, продуктовый дизайн и разработка на Flutter.',
    },
    year: '2024',
    background: supergoodCard,
    cover: supergoodCover,
    coverFormat: 'phone',
  },
  {
    slug: 'observatory',
    name: { en: 'Observatory', ru: 'Observatory' },
    pitch: { en: 'Activity Monitor, but more.', ru: 'Как Мониторинг системы, только больше.' },
    responsibility: {
      en: 'Concept to launch: product design, identity, and storytelling.',
      ru: 'От концепции до запуска: продуктовый дизайн, айдентика и сторителлинг.',
    },
    year: '2026',
    background: observatoryCard,
    cover: observatoryCover,
    coverFormat: 'desktop',
  },
  {
    slug: 'instagram-saves-redesign',
    name: { en: 'Instagram Saves redesign', ru: 'Редизайн «Сохранённого» в Instagram' },
    pitch: { en: 'The more you save, the less you can find.', ru: 'Чем больше сохраняешь, тем сложнее найти.' },
    responsibility: { en: 'Research, UX/UI, and prototyping.', ru: 'Исследование, UX/UI и прототипирование.' },
    year: '2026',
    background: instagramCard,
    cover: instagramCover,
    coverFormat: 'phone',
  },
  {
    slug: 'two-sticks',
    name: { en: 'Two Sticks', ru: 'Две палочки' },
    pitch: { en: 'Learn Chinese, all inside one bot.', ru: 'Учить китайский, не выходя из бота.' },
    responsibility: { en: 'Product direction, UX/UI, and engineering.', ru: 'Продукт, UX/UI и разработка.' },
    year: '2024',
    background: twoSticksCard,
    cover: twoSticksCover,
    coverFormat: 'phone',
  },
];

export const caseStudyPath = (slug: string) => `/case-studies/${slug}/`;
