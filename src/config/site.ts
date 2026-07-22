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

export const connectLinks = [
  { label: 'Email', href: publicLinks.email },
  { label: 'LinkedIn', href: publicLinks.linkedin },
  { label: 'GitHub', href: publicLinks.github },
  { label: 'itch.io', href: publicLinks.itch },
  { label: 'X', href: publicLinks.x },
  { label: 'Résumé PDF', href: sitePath('/resume/igor-kupchinenko-resume.pdf') },
] as const;
