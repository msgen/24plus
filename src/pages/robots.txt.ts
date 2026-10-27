import type { APIRoute } from 'astro';
import { getSite } from '../lib/content';
export const prerender = false;
export const GET: APIRoute = () =>
  new Response(`User-agent: *\nDisallow: /admin\nDisallow: /api\nSitemap: ${getSite().url}/sitemap.xml\n`, { headers: { 'Content-Type': 'text/plain' } });
