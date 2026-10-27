import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { UPLOAD_DIR } from '../../lib/store';

export const prerender = false;

export const GET: APIRoute = ({ params }) => {
  const name = path.basename(params.path ?? ''); // basename blocks ../ traversal
  const f = path.join(UPLOAD_DIR, name);
  if (!name.endsWith('.webp') || !fs.existsSync(f)) return new Response('Not found', { status: 404 });
  return new Response(fs.readFileSync(f), { headers: { 'Content-Type': 'image/webp', 'Cache-Control': 'public, max-age=31536000, immutable' } });
};
