import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    date: z.date(),
    hidden: z.boolean().default(false),
  }),
});

const products = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    features: z.array(z.string()),
    date: z.date(),
    hidden: z.boolean().default(false),
  }),
});

export const collections = {
  projects,
  products,
};