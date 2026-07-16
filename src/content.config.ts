import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const sharedProjectFields = {
  title: z.string(),
  summary: z.string(),
  featured: z.boolean().default(false),
  status: z.enum(['published', 'in-progress', 'planned']).default('published'),
  externalUrl: z.url().optional(),
};

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    ...sharedProjectFields,
    capabilities: z.array(z.string()).default([]),
    result: z.string().optional(),
  }),
});

const games = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/games' }),
  schema: z.object({
    ...sharedProjectFields,
    engine: z.string().optional(),
    jam: z.string().optional(),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date().optional(),
    draft: z.boolean().default(true),
    canonicalUrl: z.url().optional(),
  }),
});

export const collections = { work, games, writing };
