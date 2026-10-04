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

export const valuesPremise = 'Three things important to me.';

export type PersonalReveal = 'portrait' | 'doodles' | 'blog';

// The note closes with one sentence. Text parts are plain; `reveal` parts are
// the interactive words that open their content beside or below the sentence.
type ClosingPart = string | { reveal: PersonalReveal; text: string };

export const personalNote = {
  en: {
    heading: 'A few more things about me',
    // What stays with people, how I work with them, and the path that led here.
    columns: [
      [
        'The games, films and music I grew up with stayed with me long after I finished them. That’s what I want from the things I design: something people keep, even after they stop using it.',
        'I can’t design what people do, only the conditions they act in. So I’d rather understand people first and leave them in control than force a path on them. The most useful moments in my work are when someone does something I didn’t expect, because that’s usually where the real problem is.',
      ],
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
        'Игры, фильмы и музыка, на которых я вырос, оставались со мной ещё долго после финала. Того же я хочу от вещей, которые проектирую: чтобы у людей что-то оставалось, даже когда они перестали ими пользоваться.',
        'Я не могу спроектировать то, что делают люди, только условия, в которых они действуют. Поэтому мне важнее понять людей и оставить им контроль, чем навязать им путь. Самые полезные моменты в работе случаются, когда человек делает то, чего я не ожидал: обычно именно там и прячется настоящая проблема.',
      ],
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
