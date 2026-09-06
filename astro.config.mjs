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
  integrations: [mdx(), react(), sitemap()],
});
