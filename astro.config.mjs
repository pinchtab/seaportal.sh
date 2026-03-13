// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  site: 'https://seaportal.sh',
  base: '/',
  output: 'static',

  compressHTML: true,
  prefetch: {
    defaultStrategy: 'viewport',
  },
  security: {
    checkOrigin: true,
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
    },
  },
});
