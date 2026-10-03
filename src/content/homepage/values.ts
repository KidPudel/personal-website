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
    // Where the view comes from, the path, and how I work now.
    columns: [
      [
        'From a young age, I’ve seen much of life through a lens shaped by the games, films, and music that stayed with me. They showed me how something made by another person can come alive, grow beyond itself, and become part of your own life.',
        'I started in software engineering, then designed games, and found in product design the place where both meet. Engineering taught me to treat code as a creative material. Game design taught me how interaction, motivation, and psychology shape what people do.',
      ],
      [
        'I have a strong instinct for atmosphere, and product design gives it direction. It begins with the people I’m designing for and what they need. I think about visuals, interaction, movement, sound, and small details as parts of one whole experience, one that, at its best, leaves something behind in how a person sees the world.',
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
        'С детства я смотрю на жизнь сквозь игры, фильмы и музыку, которые меня зацепили. Они показали, как то, что сделал другой человек, может ожить, перерасти себя и стать частью твоей жизни.',
        'Я начинал в разработке, потом делал игры и нашёл в продуктовом дизайне место, где одно встречается с другим. Разработка научила меня относиться к коду как к творческому материалу. Геймдизайн научил понимать, как взаимодействие, мотивация и психология влияют на поступки людей.',
      ],
      [
        'У меня сильное чутьё на атмосферу, и продуктовый дизайн даёт ему направление. Он начинается с людей, для которых я проектирую, и с того, что им нужно. Визуал, взаимодействие, движение, звук и мелочи для меня части одного целого, и в лучшем случае оно меняет то, как человек смотрит на мир.',
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
