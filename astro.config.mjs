import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { localEnquiries } from './scripts/dev-api.mjs';

export default defineConfig({
  site: 'https://anz-landscaping-gardens.peppycompass.chatgpt.site',
  output: 'static',
  outDir: './dist/client',
  devToolbar: { enabled: false },
  integrations: [react()],
  vite: { plugins: [tailwindcss(), localEnquiries()] },
});
