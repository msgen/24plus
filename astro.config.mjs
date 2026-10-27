import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import netlify from '@astrojs/netlify';
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
  // Netlify builds (ADAPTER=netlify in netlify.toml, or NETLIFY=true) use the Netlify adapter;
  // everywhere else (local, Docker, VPS) the plain Node server.
  adapter: process.env.ADAPTER === 'netlify' || process.env.NETLIFY ? netlify() : node({ mode: 'standalone' }),
  // Origin check is done in src/middleware.ts (host-only compare); proxies often hide the original protocol.
  security: { checkOrigin: false },
  redirects,
  vite: { plugins: [tailwindcss()] },
});
