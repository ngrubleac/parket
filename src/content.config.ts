import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    schema: z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        author: z.string(),
        publishedAt: z.coerce.date(),
        lang: z.enum(['ru', 'ro']),
        translationKey: z.string().optional(),
        category: z.enum(['tips', 'process', 'faq']),
        tags: z.array(z.string()).optional(),
    }),
});

export const collections = { blog };
