import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    schema: z.object({
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

const gallery = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        beforeImage: z.string(),
        afterImage: z.string(),
    }),
});

const services = defineCollection({
    schema: z.object({
        title: z.string(),
        price: z.string().optional(),
        content: z.string().optional(),
    }),
});

export const collections = { blog, gallery, services };
