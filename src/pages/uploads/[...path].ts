import type { APIRoute } from 'astro';
import path from 'node:path';
import { getImage } from '../../lib/store';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const name = path.basename(params.path ?? ''); // basename blocks ../ traversal
  if (!name.endsWith('.webp')) return new Response('Not found', { status: 404 });
  const buf = await getImage(name);
  if (!buf) return new Response('Not found', { status: 404 });
  return new Response(buf as BodyInit, { headers: { 'Content-Type': 'image/webp', 'Cache-Control': 'public, max-age=31536000, immutable' } });
};
