export const slugify = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'element';
export const str = (f: FormData, k: string, max = 500) => String(f.get(k) ?? '').trim().slice(0, max);
export const bool = (f: FormData, k: string) => f.get(k) === 'on';
export const files = (f: FormData, k: string) => f.getAll(k).filter((x): x is File => x instanceof File && x.size > 0);
export const msg = (path: string, text: string, kind: 'ok' | 'err' = 'ok') => `${path}${path.includes('?') ? '&' : '?'}${kind}=${encodeURIComponent(text)}`;
