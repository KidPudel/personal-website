import type { Locale } from '../../i18n/locales';

interface Identity {
  hello: string;
  role: string;
  /** The claim: what the products do for people. */
  promise: string;
  research: string;
  practice: string;
  /** Why the work matters. `word` is the hopping "joyful" link. */
  purpose: { before: string; word: string; after: string; href: string };
}

const purposeHref = 'https://www.youtube.com/watch?v=A_u2WFTfbcg';

export const identity: Record<Locale, Identity> = {
  en: {
    hello: 'Hello, I’m Igor.',
    role: 'Product designer.',
    promise: 'I design products that give people clarity and keep them in control.',
    research:
      'I start with research, looking for the mismatch between what people actually do and what the product expects, and shape the flows around it.',
    practice:
      'With my engineering background and AI, I take ideas from the first interview to a working release.',
    purpose: {
      before:
        'A product is only how the value reaches people, and I want getting there to feel a little more ',
      word: 'joyful',
      after: '.',
      href: purposeHref,
    },
  },
  ru: {
    hello: 'Привет, я Игорь.',
    role: 'Продуктовый дизайнер.',
    promise: 'Я проектирую продукты, которые дают людям ясность и оставляют им контроль.',
    research:
      'Я начинаю с исследования: ищу, где то, что люди делают на самом деле, расходится с тем, чего от них ждёт продукт, и выстраиваю вокруг этого сценарии.',
    practice:
      'Опыт разработчика и AI позволяют мне провести идею от первого интервью до работающего релиза.',
    purpose: {
      before:
        'Продукт нужен лишь для того, чтобы ценность дошла до людей, и я хочу, чтобы путь к ней был чуть ',
      word: 'радостнее',
      after: '.',
      href: purposeHref,
    },
  },
};
