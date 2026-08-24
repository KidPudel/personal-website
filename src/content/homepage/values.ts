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

export const personalNote = {
  heading: 'A few more things about me',
  columns: [
    [
      'From a young age, I’ve mostly lived through a lens shaped by the games, films, and music that left an impact on me. I came to appreciate how something made by another person can come alive, grow beyond itself, and become part of your own life.',
      'I chose to pursue software engineering, but over the years something kept feeling off. The moments that felt right were the ones when I was creating experiences, games, interactions, and things people could actually feel something through.',
    ],
    [
      'Eventually, I had enough history to see the pattern. I took time away to listen to myself and let myself pursue what I actually care about. Looking back, none of those years feel wasted. They shaped my taste, my values, and my ability to bring ideas into reality.',
      'I have a strong instinct for atmosphere and rely heavily on inner feeling. In my designs, I think about visuals, interaction, movement, sound, and small details as parts of one whole experience. I want that experience to make life a little more joyful and, at its best, leave something behind in how a person sees the world.',
    ],
  ],
  items: [
    {
      id: 'boyfriend',
      label: 'Proud boyfriend to the best girlfriend in the world',
      action: 'portrait',
    },
    {
      id: 'sketcher',
      label: 'Editorial and illustrative sketcher',
      action: 'doodles',
    },
    {
      id: 'blog',
      label: 'I have a blog',
      href: 'https://medium.com/@iggysleepy',
    },
  ],
} as const;

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
