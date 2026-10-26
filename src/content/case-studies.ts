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
  /** The domain and kind of product, shown beside the pitch on the homepage. */
  tag: Localized;
  year: string;
  /** Soft texture shared with the homepage showcase card. */
  background: ImageMetadata;
  /** A product screen shown on the case-studies index. */
  cover: ImageMetadata;
  coverFormat: 'desktop' | 'phone';
  /** What a reader needs before anything else, said once on the study's cover in Igor's voice:
   *  whose project it was, his part in it, who else worked on it, and whether it shipped. */
  about: Localized;
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
    tag: { en: 'Food delivery app', ru: 'Доставка еды' },
    year: '2024',
    background: supergoodCard,
    cover: supergoodCover,
    coverFormat: 'phone',
    about: {
      en: 'I was the product designer and the only mobile engineer at PizzaSushiWok, a small company, and worked on the app alone for 11 months in 2024. It shipped on iOS and Android and was later closed for financial reasons.',
      ru: 'Я был продуктовым дизайнером и единственным мобильным разработчиком в PizzaSushiWok, небольшой компании, и 11 месяцев в 2024 году делал приложение один. Оно вышло на iOS и Android, позже проект закрыли по финансовым причинам.',
    },
  },
  {
    slug: 'observatory',
    name: { en: 'Observatory', ru: 'Observatory' },
    pitch: { en: 'Activity Monitor, but more.', ru: 'Как «Мониторинг системы», только больше.' },
    responsibility: {
      en: 'Concept to launch: product design, identity, and storytelling.',
      ru: 'От концепции до запуска: продуктовый дизайн, айдентика и сторителлинг.',
    },
    tag: { en: 'Developer tool', ru: 'Инструмент для разработчиков' },
    year: '2026',
    background: observatoryCard,
    cover: observatoryCover,
    coverFormat: 'desktop',
    about: {
      en: 'A personal project. I did the product design, research, identity, and launch film, wrote the specs, and directed AI development. Release 0.1.1 came out in 2026 for macOS 14 and later, and 3 colleagues have used it for about two months.',
      ru: 'Личный проект. Я сделал продуктовый дизайн, исследование, айдентику и ролик к запуску, писал спецификации и руководил разработкой с AI. Релиз 0.1.1 вышел в 2026 году для macOS 14 и новее, им около двух месяцев пользуются 3 коллеги.',
    },
  },
  {
    slug: 'instagram-saves-redesign',
    name: { en: 'Instagram Saves redesign', ru: 'Редизайн «Сохранённого» в Instagram' },
    pitch: { en: 'The more you save, the less you can find.', ru: 'Чем больше сохраняешь, тем сложнее найти.' },
    responsibility: { en: 'Research, UX/UI, and prototyping.', ru: 'Исследование, UX/UI и прототипирование.' },
    tag: { en: 'Social app concept', ru: 'Концепт соцсети' },
    year: '2026',
    background: instagramCard,
    cover: instagramCover,
    coverFormat: 'phone',
    about: {
      en: 'A self-initiated concept from 2026, not a shipped product. I did the research, UX/UI, and prototyping: 9 user interviews, then an interactive mobile prototype.',
      ru: 'Собственный концепт 2026 года, а не выпущенный продукт. Я провёл исследование, сделал UX/UI и прототип: 9 интервью с пользователями, а на выходе интерактивный мобильный прототип.',
    },
  },
  {
    slug: 'two-sticks',
    name: { en: 'Two Sticks', ru: 'Две палочки' },
    pitch: { en: 'Learn Chinese, all inside one bot.', ru: 'Учить китайский, не выходя из бота.' },
    responsibility: { en: 'Product direction, UX/UI, and engineering.', ru: 'Продукт, UX/UI и разработка.' },
    tag: { en: 'Language learning', ru: 'Изучение языков' },
    year: '2024',
    background: twoSticksCard,
    cover: twoSticksCover,
    coverFormat: 'phone',
    about: {
      en: 'Built in 2024 on the research of a МПГУ diploma. I did the product direction and UX/UI, and built the bot, the API, and the handwriting app myself. A few students used the prototype, and it’s no longer hosted.',
      ru: 'Сделано в 2024 году на исследовании из диплома МПГУ. Я отвечал за продукт и UX/UI и сам написал бота, API и приложение для прописей. Прототипом пользовались несколько студентов, сейчас он не размещён.',
    },
  },
];

export const caseStudyPath = (slug: string) => `/case-studies/${slug}/`;

export const caseStudy = (slug: string): CaseStudy => {
  const study = caseStudies.find((entry) => entry.slug === slug);
  if (!study) throw new Error(`No case study called ${slug}`);
  return study;
};
