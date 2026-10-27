import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';
import services from './src/data/services.json' with { type: 'json' };

// Old site URLs (flat, e.g. /litere-volumetrice) -> new category URLs.
const redirects = Object.fromEntries(
  services.filter((s) => !s.hidden).map((s) => [`/${s.slug}`, `/servicii/${s.category}/${s.slug}`]),
);
redirects['/revista'] = '/';

export default defineConfig({
  site: 'https://24plus.ro',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  security: { checkOrigin: true },   // rejects cross-site form POSTs
  redirects,
  vite: { plugins: [tailwindcss()] },
});
