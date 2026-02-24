import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://parchetmaster.vercel.app',
  compressHTML: true,
  adapter: vercel(),
  integrations: [
    tailwind(),
    react(),
    keystatic(),
    sitemap({
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date(),
      i18n: {
        defaultLocale: 'ru',
        locales: { ru: 'ru', ro: 'ro' }
      }
    })
  ],
  output: 'static',
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'ro'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  }
});
