import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://parchetmaster.vercel.app', // Замените на ваш реальный домен
  adapter: vercel(),
  integrations: [
    tailwind(),
    react(),
    keystatic(),
    sitemap()
  ],
  output: 'static',
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'ro'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
