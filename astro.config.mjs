import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://anz-landscaping-gardens.peppycompass.chatgpt.site',
  output: 'static',
  outDir: './dist/client',
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
