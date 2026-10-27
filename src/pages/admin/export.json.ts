import type { APIRoute } from 'astro';
import { read } from '../../lib/store';

export const prerender = false;

// Backup download (the middleware already requires a logged-in admin for /admin/*). Password hashes are excluded.
export const GET: APIRoute = async () => {
  const names = ['categories', 'services', 'clients', 'projects', 'testimonials', 'settings', 'leads'] as const;
  const data: Record<string, unknown> = { exportedAt: new Date().toISOString() };
  for (const n of names) data[n] = await read(n);
  return new Response(JSON.stringify(data, null, 2), {
    headers: { 'Content-Type': 'application/json', 'Content-Disposition': `attachment; filename="24plus-backup-${new Date().toISOString().slice(0, 10)}.json"` },
  });
};
