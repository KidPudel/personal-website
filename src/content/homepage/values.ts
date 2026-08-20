import type { ImageMetadata } from 'astro';

import chineseBee1 from '../../assets/evidence/cb1.png';
import chineseBee2 from '../../assets/evidence/cb2.png';
import chineseBee3 from '../../assets/evidence/cb3.png';
import campfire1 from '../../assets/evidence/campfire1.png';
import observatory1 from '../../assets/evidence/observatory1.png';
import observatory2 from '../../assets/evidence/observatory2.png';
import observatory3 from '../../assets/evidence/observatory3.png';
import pizzaSushiWok1 from '../../assets/evidence/pzw1.png';
import pizzaSushiWok2 from '../../assets/evidence/pzw2.png';
import pizzaSushiWok3 from '../../assets/evidence/pzw3.png';
import santaFoundation1 from '../../assets/evidence/secret_santa_foundation1.png';

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
  items: [
    {
      id: 'engineer',
      label: 'experienced software engineer',
      href: '/work/#product-design',
    },
    {
      id: 'boyfriend',
      label: 'Proud boyfriend to the best girlfriend in the world',
      action: 'portrait',
    },
    {
      id: 'games',
      label: 'Hobby game designer',
      href: '/work/#games',
    },
    {
      id: 'sketcher',
      label: 'Editorial and illustrative sketcher',
      action: 'doodles',
    },
    {
      id: 'blog',
      label: 'I have a blog',
      href: '/blog/',
    },
  ],
} as const;

export type PersonalNoteItem = (typeof personalNote.items)[number];

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
