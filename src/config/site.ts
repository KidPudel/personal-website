export const publicEmail = 'i.kupchinenko@gmail.com';

export const publicLinks = {
  email: `mailto:${publicEmail}`,
  github: 'https://github.com/KidPudel',
  itch: 'https://kidpudel.itch.io/',
  linkedin: 'https://www.linkedin.com/in/iggydev/',
  x: 'https://x.com/kidpudel',
} as const;

export const sitePath = (path: string) => {
  const base = import.meta.env.BASE_URL;
  const relativePath = path.replace(/^\/+/, '');

  return relativePath ? `${base}${relativePath}` : base;
};
