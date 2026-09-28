import type { Locale } from '../../i18n/locales';

interface Identity {
  hello: string;
  role: string;
  research: string;
  experience: { before: string; word: string; after: string; continuation: string };
  purpose: { before: string; continuation: string; word: string; after: string; href: string };
  practice: { first: string; second: string };
}

const purposeHref = 'https://www.youtube.com/watch?v=A_u2WFTfbcg';

export const identity: Record<Locale, Identity> = {
  en: {
    hello: 'Hello, I’m Igor.',
    role: 'Product designer.',
    research: 'I research to find a real need the world has overlooked.',
    experience: {
      before: 'I shape ',
      word: 'products',
      after: ' that give people something to keep,',
      continuation: ' even beyond the moment they use them.',
    },
    purpose: {
      before: 'This is my professional attempt to make the world a',
      continuation: ' little more ',
      word: 'joyful',
      after: '.',
      href: purposeHref,
    },
    practice: {
      first: 'I use my software-engineering background and AI to explore ideas directly in code.',
      second: ' Game design deepens how I think about interaction, motivation, and psychology.',
    },
  },
  ru: {
    hello: 'Привет, я Игорь.',
    role: 'Продуктовый дизайнер.',
    research: 'Я исследую, чтобы найти настоящую потребность, которую мир упустил.',
    experience: {
      before: 'Я создаю ',
      word: 'продукты',
      after: ', которые оставляют людям что-то своё,',
      continuation: ' даже когда ими уже не пользуются.',
    },
    purpose: {
      before: 'Так я профессионально пытаюсь сделать мир',
      continuation: ' чуть более ',
      word: 'радостным',
      after: '.',
      href: purposeHref,
    },
    practice: {
      first: 'Опыт разработчика и AI позволяют мне исследовать идеи прямо в коде.',
      second: ' Геймдизайн углубляет моё понимание взаимодействия, мотивации и психологии.',
    },
  },
};
