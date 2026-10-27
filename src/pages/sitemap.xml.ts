import type { APIRoute } from 'astro';
import { getCategories, getServices, getSite, serviceUrl } from '../lib/content';

export const prerender = false;

export const GET: APIRoute = () => {
  const { url } = getSite();
  const paths = ['/', '/servicii', '/portofoliu', '/clienti', '/contact',
    ...getCategories().map((c) => `/servicii/${c.slug}`), ...getServices().map(serviceUrl)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `<url><loc>${url}${p}</loc></url>`).join('\n')}\n</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
