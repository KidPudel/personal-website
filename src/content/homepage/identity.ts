import type { Locale } from '../../i18n/locales';
import type { AnnotatedPart } from './annotated';

interface Identity {
  hello: string;
  role: string;
  /** The claim. Its doors open notes on what sets my work apart. */
  claim: AnnotatedPart[];
}

export const identity: Record<Locale, Identity> = {
  en: {
    hello: 'Hello, I’m Igor.',
    role: 'Product designer.',
    claim: [
      'I look for ',
      {
        text: 'oddities',
        note: 'Oddities are places where what people actually do doesn’t fit how things are set up for them. I find them through research, and they can lead to fixing a product or to something that doesn’t exist yet.',
        tone: 'green',
      },
      ' in how things work for people, and design ',
      {
        text: 'interactions',
        note: 'Before products I designed games: core loops, limits, a playtest on every build. That’s where I learned what makes people want to act. In products I use it to help people do what they already want, not to hook them.',
        tone: 'blue',
      },
      ' that give them clarity and keep them in control. I also ',
      {
        text: 'build what I design',
        note: 'I was writing code before AI, so to me it’s a tool I control, not a black box: one part of a process I’ve already carried from idea to release more than once.',
        tone: 'lavender',
      },
      '.',
    ],
  },
  ru: {
    hello: 'Привет, я Игорь.',
    role: 'Продуктовый дизайнер.',
    claim: [
      'Я ищу ',
      {
        text: 'странности',
        note: 'Странностями я называю места, где то, что люди делают на самом деле, не совпадает с тем, как для них всё устроено. Я нахожу их в исследованиях, и они ведут либо к исправлению продукта, либо к тому, чего ещё нет.',
        tone: 'green',
      },
      ' в том, как всё устроено для людей, и проектирую ',
      {
        text: 'взаимодействия',
        note: 'До продуктов я проектировал игры: игровые циклы, ограничения, плейтест каждой сборки. Там я понял, что заставляет людей действовать. В продуктах я использую это, чтобы помогать людям делать то, чего они сами хотят, а не подсаживать их.',
        tone: 'blue',
      },
      ', которые дают им ясность и оставляют им контроль. А ещё я ',
      {
        text: 'сам собираю то, что проектирую',
        note: 'Я писал код ещё до AI, поэтому для меня это инструмент под моим контролем, а не чёрный ящик: одна часть процесса, который я уже не раз проходил от идеи до релиза.',
        tone: 'lavender',
      },
      '.',
    ],
  },
};
