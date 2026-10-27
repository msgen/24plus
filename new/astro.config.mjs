import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import services from './src/data/services.json' with { type: 'json' };

// Old site URLs (flat, e.g. /litere-volumetrice) -> new category URLs.
const redirects = Object.fromEntries(
  services.filter((s) => !s.hidden).map((s) => [`/${s.slug}`, `/servicii/${s.category}/${s.slug}`]),
);
redirects['/revista'] = '/';
redirects['/admin'] = '/';

export default defineConfig({
  site: 'https://24plus.ro',
  integrations: [sitemap()],
  redirects,
  vite: { plugins: [tailwindcss()] },
});
