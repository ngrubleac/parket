import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  integrations: [
    tailwind(),
    react(),
    keystatic()
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
