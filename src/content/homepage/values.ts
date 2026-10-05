import type { ImageMetadata } from 'astro';

import observatory3 from '../../assets/case_study_images/outcome_screenshots/main.png';
import observatory2 from '../../assets/case_study_images/outcome_screenshots/results-comparison.png';
import observatory1 from '../../assets/case_study_images/outcome_screenshots/testing.png';
import pizzaSushiWok2 from '../../assets/case_study_images/supergood/checkout.png';
import pizzaSushiWok3 from '../../assets/case_study_images/supergood/menu-light.png';
import pizzaSushiWok1 from '../../assets/case_study_images/supergood/order-tracking.png';
import chineseBee3 from '../../assets/case_study_images/two-sticks/list-to-fill.png';
import chineseBee1 from '../../assets/case_study_images/two-sticks/search2.png';
import chineseBee2 from '../../assets/case_study_images/two-sticks/write.png';
import campfire1 from '../../assets/games/discourses/cover.png';
import santaFoundation1 from '../../assets/games/santa/secret_santa_foundation1.png';
import type { Locale } from '../../i18n/locales';
import type { AnnotatedPart } from './annotated';

export type ValueProject =
  | 'Observatory'
  | 'PizzaSushiWok'
  | 'Two Sticks'
  | 'Discourses by Campfire'
  | 'Santa Foundation';

export interface ValueAspect {
  project: ValueProject;
  caption: string;
  shot: string;
  image: ImageMetadata;
  caseStudy?: boolean;
}

export interface ValuePassage {
  id: string;
  before: string;
  words: readonly string[];
  after: string;
  aspects: readonly ValueAspect[];
}

// “joyful” opens this video.
const purposeHref = 'https://www.youtube.com/watch?v=A_u2WFTfbcg';

export const valuesPremise = 'Three things important to me.';

export type PersonalReveal = 'portrait' | 'doodles' | 'blog';

// The note closes with one sentence. Text parts are plain; `reveal` parts are
// the interactive words that open their content beside or below the sentence.
type ClosingPart = string | { reveal: PersonalReveal; text: string };

export const personalNote = {
  en: {
    heading: 'A few more things about me',
    // The path that led here. What I believe has its own section (beliefs).
    columns: [
      [
        'I started in software engineering, then designed games. Engineering lets me build and ship ideas myself. Game design taught me how interaction and motivation shape what people do. I care about the whole feel of it: visuals, motion, sound and small details working as one.',
      ],
    ],
    closing: [
      'I’m also a ',
      { reveal: 'portrait', text: 'proud boyfriend' },
      ' to the best girlfriend in the world, an ',
      { reveal: 'doodles', text: 'editorial and illustrative sketcher' },
      ', and I ',
      { reveal: 'blog', text: 'keep a blog' },
      '.',
    ] satisfies ClosingPart[],
    portraitAlt: 'Igor and his girlfriend outdoors',
    doodlesLabel: 'All of Igor’s doodles',
  },
  ru: {
    heading: 'Ещё немного обо мне',
    columns: [
      [
        'Я начинал в разработке, потом делал игры. Разработка позволяет мне самому собирать и выпускать идеи. Геймдизайн научил понимать, как взаимодействие и мотивация влияют на поступки людей. Мне важно ощущение целиком: визуал, движение, звук и мелочи, которые работают как одно целое.',
      ],
    ],
    closing: [
      'А ещё у меня ',
      { reveal: 'portrait', text: 'лучшая девушка на свете' },
      ', я ',
      { reveal: 'doodles', text: 'рисую скетчи и иллюстрации' },
      ' и ',
      { reveal: 'blog', text: 'веду блог' },
      '.',
    ] satisfies ClosingPart[],
    portraitAlt: 'Игорь и его девушка на улице',
    doodlesLabel: 'Все рисунки Игоря',
  },
};

// What I believe, after the work. Its phrases open notes in my own words.
export const beliefs: Record<Locale, { heading: string; parts: AnnotatedPart[] }> = {
  en: {
    heading: 'what i believe',
    parts: [
      'The most useful moments in my work are when someone does something I didn’t expect. I can’t design what people do, only the ',
      {
        text: 'conditions',
        note: 'So I’d rather understand people first and leave them in control than force a path on them.',
        tone: 'orange',
      },
      ' they act in. A product is only how the value reaches people, and I want that value to ',
      {
        text: 'stay with them',
        note: 'The games, films and music I grew up with stayed with me long after I finished them. That’s what I want from the things I design.',
        tone: 'pink',
      },
      ', and getting there to feel a little more ',
      { joyful: 'joyful', href: purposeHref },
      '.',
    ],
  },
  ru: {
    heading: 'во что я верю',
    parts: [
      'Самые полезные моменты в работе случаются, когда человек делает то, чего я не ожидал. Я не могу спроектировать то, что делают люди, только ',
      {
        text: 'условия',
        note: 'Поэтому мне важнее понять людей и оставить им контроль, чем навязать им путь.',
        tone: 'orange',
      },
      ', в которых они действуют. Продукт нужен лишь для того, чтобы ценность дошла до людей, и я хочу, чтобы она ',
      {
        text: 'оставалась с ними',
        note: 'Игры, фильмы и музыка, на которых я вырос, оставались со мной ещё долго после финала. Того же я хочу от вещей, которые проектирую.',
        tone: 'pink',
      },
      ', а путь к ней был чуть ',
      { joyful: 'радостнее', href: purposeHref },
      '.',
    ],
  },
};

export const values: readonly ValuePassage[] = [
  {
    id: 'experience',
    before: 'Fulfil a real wish for ',
    words: ['experience', 'behaviour', 'capability'],
    after: '.',
    aspects: [
      {
        project: 'Observatory',
        caption: 'Controlled application tests',
        shot: 'Observatory testing view screenshot',
        image: observatory1,
        caseStudy: true,
      },
      {
        project: 'PizzaSushiWok',
        caption: 'Ordering to delivery',
        shot: 'Ordering journey screenshot',
        image: pizzaSushiWok1,
        caseStudy: true,
      },
      {
        project: 'Two Sticks',
        caption: 'Search into practice',
        shot: 'Search-to-practice flow screenshot',
        image: chineseBee1,
        caseStudy: true,
      },
      {
        project: 'Discourses by Campfire',
        caption: 'Connected survival systems',
        shot: 'Discourses by Campfire gameplay screenshot',
        image: campfire1,
      },
      {
        project: 'Santa Foundation',
        caption: 'You are a little elf working on Santa',
        shot: 'Santa Foundation gameplay screenshot',
        image: santaFoundation1,
      },
    ],
  },
  {
    id: 'interaction',
    before: 'Create an ',
    words: ['impactful', 'empowering'],
    after: ' interaction experience.',
    aspects: [
      {
        project: 'Observatory',
        caption: 'Saved comparable tests',
        shot: 'Saved test comparison screenshot',
        image: observatory2,
      },
      {
        project: 'PizzaSushiWok',
        caption: 'Complex order states',
        shot: 'Checkout and delivery-state screenshot',
        image: pizzaSushiWok2,
      },
      {
        project: 'Two Sticks',
        caption: 'Handwriting accuracy feedback',
        shot: 'Handwriting feedback screenshot',
        image: chineseBee2,
      },
    ],
  },
  {
    id: 'clarity',
    before: 'Be ',
    words: ['clear', 'honest'],
    after: ' with users.',
    aspects: [
      {
        project: 'Observatory',
        caption: 'Application totals view',
        shot: 'Application totals screenshot',
        image: observatory3,
      },
      {
        project: 'PizzaSushiWok',
        caption: 'Navigable large menu',
        shot: 'Menu navigation screenshot',
        image: pizzaSushiWok3,
      },
      {
        project: 'Two Sticks',
        caption: 'One connected workflow',
        shot: 'Connected chat and practice screenshot',
        image: chineseBee3,
      },
    ],
  },
];
