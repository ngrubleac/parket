import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        services: collection({
            label: 'Services',
            slugField: 'title',
            path: 'src/content/services/*',
            format: { contentField: 'content' },
            schema: {
                title: fields.slug({ name: { label: 'Title' } }),
                price: fields.text({ label: 'Price Start From' }),
                content: fields.document({
                    label: 'Content',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: true,
                }),
            },
        }),
        gallery: collection({
            label: 'Gallery',
            slugField: 'title',
            path: 'src/content/gallery/*',
            schema: {
                title: fields.slug({ name: { label: 'Project Title' } }),
                description: fields.text({ label: 'Description (optional)' }),
                beforeImage: fields.text({ label: 'Before Image Path' }),
                afterImage: fields.text({ label: 'After Image Path' }),
            },
        }),
    },
});
