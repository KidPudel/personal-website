import type { Locale } from '../../i18n/locales';
import type { AnnotatedPart } from './annotated';

interface Identity {
  hello: string;
  role: string;
  /** The claim. Its phrases open notes on how I work. */
  claim: AnnotatedPart[];
}

export const identity: Record<Locale, Identity> = {
  en: {
    hello: 'Hello, I’m Igor.',
    role: 'Product designer.',
    claim: [
      'I design products that give people clarity and keep them in control, from ',
      {
        text: 'the first interview',
        note: 'I start with research, looking for the mismatch between what people actually do and what the product expects, and shape the flows around it.',
        tone: 'green',
      },
      ' to ',
      {
        text: 'a working release',
        note: 'With my engineering background and AI, I build and ship it myself.',
        tone: 'blue',
      },
      '.',
    ],
  },
  ru: {
    hello: 'Привет, я Игорь.',
    role: 'Продуктовый дизайнер.',
    claim: [
      'Я проектирую продукты, которые дают людям ясность и оставляют им контроль, от ',
      {
        text: 'первого интервью',
        note: 'Я начинаю с исследования: ищу, где то, что люди делают на самом деле, расходится с тем, чего от них ждёт продукт, и выстраиваю вокруг этого сценарии.',
        tone: 'green',
      },
      ' до ',
      {
        text: 'работающего релиза',
        note: 'Опыт разработчика и AI позволяют мне самому собрать и выпустить продукт.',
        tone: 'blue',
      },
      '.',
    ],
  },
};
