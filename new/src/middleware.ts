import { defineMiddleware } from 'astro:middleware';
import { currentUser } from './lib/auth';
import { snapshot } from './lib/store';
import { ctx as snapshotCtx } from './lib/snapshot-context';

// CSRF defence for every state-changing request: the Origin header's host must be this site's host.
function crossSite(req: Request) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return false;
  const origin = req.headers.get('origin');
  if (!origin) return req.headers.get('sec-fetch-site') === 'cross-site';
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host');
  try { return new URL(origin).host !== host; } catch { return true; }
}

export const onRequest = defineMiddleware(async (ctx, next) => {
  const path = ctx.url.pathname;
  if (crossSite(ctx.request)) return new Response('Cross-site request blocked', { status: 403 });
  if (path.startsWith('/admin')) {
    const user = await currentUser(ctx.cookies);
    ctx.locals.user = user;
    if (!user && path !== '/admin/login') return ctx.redirect('/admin/login');
  }
  let res: Response;
  if (path.startsWith('/api') || path.startsWith('/uploads')) {
    res = await next();
  } else {
    // Templates read content synchronously from a per-request snapshot (one Redis round trip).
    // Render and buffer the whole page inside the snapshot context so nothing runs outside it.
    const snap = await snapshot();
    res = await snapshotCtx.run(snap, async () => {
      const r = await next();
      if (!(r.headers.get('content-type') ?? '').includes('text/html')) return r;
      return new Response(await r.text(), { status: r.status, statusText: r.statusText, headers: r.headers });
    });
  }
  if (path.startsWith('/admin')) {
    res.headers.set('Cache-Control', 'no-store');
    res.headers.set('X-Robots-Tag', 'noindex');
  }
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('X-Frame-Options', 'SAMEORIGIN');
  return res;
});
