import { getCollection, defineCollection, z } from 'astro:content';
import type { CollectionEntry, AnyEntryMap } from 'astro:content';

export const getSortedAndFilteredContent = async <C extends keyof AnyEntryMap>(
  collection: C,
): Promise<CollectionEntry<C>[]> => {
  const content = await getCollection(collection);
  const sorted = content
    .filter(item => !item.data.hidden)
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return sorted;
};

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
    productLink: z.string(),
    features: z.array(z.string()),
    date: z.date(),
    hidden: z.boolean().default(false),
  }),
});

export const collections = {
  projects,
  products,
};