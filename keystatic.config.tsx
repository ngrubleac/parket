import { config, fields, collection } from '@keystatic/core';

export default config({
    storage: {
        kind: 'local',
    },
    collections: {
        blog: collection({
            label: 'Blog',
            slugField: 'slug',
            path: 'src/content/blog/*',
            format: { contentField: 'content' },
            schema: {
                slug: fields.slug({ name: { label: 'Post Slug (URL)' } }),
                title: fields.text({ label: 'Title' }),
                description: fields.text({ label: 'Description (SEO Meta)' }),
                image: fields.image({
                    label: 'Cover Image',
                    directory: 'public/images/blog',
                    publicPath: '/images/blog/',
                }),
                author: fields.text({ label: 'Author' }),
                publishedAt: fields.date({ label: 'Published Date' }),
                lang: fields.select({
                    label: 'Language',
                    options: [
                        { label: 'Русский', value: 'ru' },
                        { label: 'Română', value: 'ro' },
                    ],
                    defaultValue: 'ru',
                }),
                translationKey: fields.text({ label: 'Translation Key (для связи статей)' }),
                category: fields.select({
                    label: 'Category',
                    options: [
                        { label: 'Советы', value: 'tips' },
                        { label: 'Процесс', value: 'process' },
                        { label: 'Вопросы', value: 'faq' },
                    ],
                    defaultValue: 'tips',
                }),
                tags: fields.array(fields.text({ label: 'Tag' }), {
                    label: 'Tags',
                    itemLabel: (props) => props.value,
                }),
                content: fields.document({
                    label: 'Content',
                    formatting: true,
                    dividers: true,
                    links: true,
                    images: true,
                }),
            },
        }),
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
