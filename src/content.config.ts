import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const sharedProjectFields = {
  title: z.string(),
  summary: z.string(),
  prominence: z.enum(['featured', 'supporting', 'trajectory']),
  status: z.enum(['complete', 'ongoing', 'unfinished', 'early-work']),
  externalUrl: z.url().optional(),
};

const software = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/software' }),
  schema: z.object({
    ...sharedProjectFields,
    capabilities: z.array(z.string()).default([]),
    downloadUrl: z.url().optional(),
    result: z.string().optional(),
    socialLinks: z
      .array(
        z.object({
          label: z.string(),
          url: z.url(),
        }),
      )
      .default([]),
    videoUrl: z.url().optional(),
  }),
});

const games = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/games' }),
  schema: z.object({
    ...sharedProjectFields,
    engine: z.string().optional(),
    jam: z.string().optional(),
    learnings: z.array(z.string()).default([]),
  }),
});

export const collections = { software, games };
