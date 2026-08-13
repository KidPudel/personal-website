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
  | 'Chinese Bee'
  | 'Discourses by Campfire'
  | 'Santa Foundation';

export interface ValueAspect {
  project: ValueProject;
  title: string;
  copy: string;
  shot: string;
  image: ImageMetadata;
  caseStudy?: boolean;
}

export interface ValuePassage {
  id: string;
  before: string;
  words: readonly string[];
  after: string;
  copy: string;
  aspects: readonly ValueAspect[];
}

export const valuesPremise = 'Three things important to me.';

export const workPath = {
  lead: 'That’s the short version.',
  label: 'See more work',
} as const;

export const personalNote = {
  eyebrow: 'A few things about me',
  title: 'More than one discipline, still one person.',
  items: [
    'Product designer',
    'Experienced software engineer',
    'Hobby game designer',
    'Editorial and illustrative sketcher',
    'Proud boyfriend to a beautiful girlfriend',
  ],
} as const;

export const values: readonly ValuePassage[] = [
  {
    id: 'experience',
    before: 'Fulfil a real wish for ',
    words: ['experience', 'behaviour', 'capability'],
    after: '.',
    copy: 'Start with what someone is actually trying to accomplish, then carry that need through the product.',
    aspects: [
      {
        project: 'Observatory',
        title: 'Run controlled tests, not only watch live activity.',
        copy: 'A person can test one to four applications, add a warm-up, repeat rounds, and keep the results for later inspection and comparison.',
        shot: 'Observatory testing view screenshot',
        image: observatory1,
        caseStudy: true,
      },
      {
        project: 'PizzaSushiWok',
        title: 'Carry one order from browsing to delivery.',
        copy: 'Menu navigation, basket, checkout, payment, addresses, courier status, promotions, loyalty, and bonuses belong to one complete ordering journey.',
        shot: 'Ordering journey screenshot',
        image: pizzaSushiWok1,
      },
      {
        project: 'Chinese Bee',
        title: 'Turn a learning need into a repeatable practice loop.',
        copy: 'Multilingual search leads into saved vocabulary, quizzes, guidance, handwriting practice, and recognition feedback instead of ending at a definition.',
        shot: 'Search-to-practice flow screenshot',
        image: chineseBee1,
      },
      {
        project: 'Discourses by Campfire',
        title: 'Build one survival experience from connected systems.',
        copy: 'The winter forest, shifting day and night, survival pressure, dialogue, sound, music, effects, and interacting systems work together as one suspenseful experience.',
        shot: 'Discourses by Campfire gameplay screenshot',
        image: campfire1,
      },
      {
        project: 'Santa Foundation',
        title: 'Keep a small game focused on its playable idea.',
        copy: 'A compact browser game turns delivering presents, avoiding the Grinch’s attacks, original pixel art, and player-led balancing changes into one complete game-jam experience.',
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
    copy: 'Give people useful control, confidence, ease, or delight through the way the product behaves.',
    aspects: [
      {
        project: 'Observatory',
        title: 'Keep evidence local, reopenable, and comparable.',
        copy: 'Recorded tests stay on the Mac and remain available for later comparison, giving people useful evidence rather than a disappearing live snapshot.',
        shot: 'Saved test comparison screenshot',
        image: observatory2,
      },
      {
        project: 'PizzaSushiWok',
        title: 'Make complex order states manageable.',
        copy: 'Payments and 3DS, maps and addresses, courier progress, promotions, loyalty, bonuses, and themes work as understandable parts of one product.',
        shot: 'Checkout and delivery-state screenshot',
        image: pizzaSushiWok2,
      },
      {
        project: 'Chinese Bee',
        title: 'Respond to the learner’s own handwriting.',
        copy: 'Freehand character input receives an accuracy result, turning practice from passive review into feedback on something the learner actually made.',
        shot: 'Handwriting feedback screenshot',
        image: chineseBee2,
      },
    ],
  },
  {
    id: 'clarity',
    before: 'Be ',
    words: ['clear', 'honest'],
    after: ' with users or players.',
    copy: 'Expose the right structure and state so the product can be understood without fighting it.',
    aspects: [
      {
        project: 'Observatory',
        title: 'Group processes into the applications people recognize.',
        copy: 'Related processes become whole-application totals, replacing Activity Monitor’s process-first view with a structure that reads clearly at a glance.',
        shot: 'Application totals screenshot',
        image: observatory3,
      },
      {
        project: 'PizzaSushiWok',
        title: 'Keep a large menu navigable across devices.',
        copy: 'Custom category and menu-scrolling behavior, adaptive layouts, and repeated usability fixes help people keep their place while ordering.',
        shot: 'Menu navigation screenshot',
        image: pizzaSushiWok3,
      },
      {
        project: 'Chinese Bee',
        title: 'Make several surfaces feel like one capability.',
        copy: 'Chat, saved learning state, practice eligibility, freehand input, and scoring are connected as one understandable workflow rather than separate tools.',
        shot: 'Connected chat and practice screenshot',
        image: chineseBee3,
      },
    ],
  },
];
