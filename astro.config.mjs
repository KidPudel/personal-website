import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL ?? 'https://kidpudel.github.io';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    mdx(),
    react(),
    sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', ru: 'ru' } } }),
  ],
  vite: {
    optimizeDeps: {
      include: ['@foleyjs/core', 'lucide-react'],
    },
  },
});
