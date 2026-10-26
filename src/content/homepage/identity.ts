import type { Locale } from '../../i18n/locales';
import type { AnnotatedPart } from './annotated';

interface Identity {
  hello: string;
  /** The claim. Its doors open notes on what sets my work apart. */
  claim: AnnotatedPart[];
}

export const identity: Record<Locale, Identity> = {
  en: {
    hello: 'Hello, I’m Igor.',
    claim: [
      'In ',
      { anchor: 'product design' },
      ', I look for ',
      {
        text: 'oddities',
        note: 'Places where what people do doesn’t fit how things are set up for them. I find them through research and everyday use; they can lead to a fix or to something that doesn’t exist yet.',
        tone: 'green',
      },
      ' where things don’t fit how people actually behave, and design ',
      {
        text: 'interactions',
        note: 'Good interaction guides people by how they perceive and think, so they can use a product and get the value they need. How differently people perceive and make sense of the world is a big part of why I love this work.',
        tone: 'blue',
      },
      ' from how people’s minds work. I also ',
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
    claim: [
      'В ',
      { anchor: 'продуктовом дизайне' },
      ' я ищу ',
      {
        text: 'странности',
        note: 'Места, где то, что люди делают, не совпадает с тем, как для них всё устроено. Я нахожу их в исследованиях и просто пользуясь вещами; они ведут либо к исправлению, либо к тому, чего ещё нет.',
        tone: 'green',
      },
      ' там, где устройство вещей расходится с тем, как люди на самом деле себя ведут, и проектирую ',
      {
        text: 'взаимодействия',
        note: 'Хорошее взаимодействие опирается на то, как люди воспринимают и думают, чтобы они могли пользоваться продуктом и получить то, что им нужно. То, насколько по-разному люди воспринимают и понимают мир, во многом и есть то, за что я люблю эту работу.',
        tone: 'blue',
      },
      ', отталкиваясь от того, как люди думают. А ещё я ',
      {
        text: 'сам собираю то, что проектирую',
        note: 'Я писал код ещё до AI, поэтому для меня это инструмент под моим контролем, а не чёрный ящик: одна часть процесса, который я уже не раз проходил от идеи до релиза.',
        tone: 'lavender',
      },
      '.',
    ],
  },
};
