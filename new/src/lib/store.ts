// Storage for the CMS: one JSON document per collection.
//  - On Vercel (KV_REST_API_URL / UPSTASH_REDIS_REST_URL set): Upstash Redis, because serverless functions have no persistent disk.
//  - Otherwise (local dev, Docker, VPS): JSON files in DATA_DIR.
// All access is async; callers do not know which backend is active.
import fs from 'node:fs';
import path from 'node:path';
import categoriesSeed from '../data/categories.json';
import servicesSeed from '../data/services.json';
import clientsSeed from '../data/clients.json';
import projectsSeed from '../data/projects.json';
import { Redis } from '@upstash/redis';

export type Category = { slug: string; title: string; blurb: string };
export type Service = { slug: string; category: string; title: string; order: number; excerpt: string; paragraphs: string[]; hidden: boolean; needsReview?: boolean };
export type Project = { id: string; service: string; thumb: string; full: string; alt?: string; featured?: boolean; createdAt?: string };
export type Client = { id: number; name: string; url: string | null; logo?: string | null };
export type Testimonial = { id: string; author: string; company?: string; text: string };
export type Lead = { id: string; createdAt: string; nume: string; telefon: string; email: string; serviciu: string; mesaj: string; status: 'nou' | 'rezolvat' };
export type User = { id: string; email: string; name: string; hash: string };
export type Settings = {
  phone: string; email: string; address: string; facebook: string;
  heroTitle: string; heroSubtitle: string; intro: string[];
};

const defaults = {
  categories: categoriesSeed as Category[],
  services: servicesSeed as Service[],
  clients: clientsSeed as Client[],
  projects: projectsSeed as Project[],
  testimonials: [] as Testimonial[],
  leads: [] as Lead[],
  users: [] as User[],
  settings: {
    phone: '0745 537 715',
    email: 'contact@24plus.ro',
    address: 'Str. Gib Mihăescu nr. 14, Râmnicu Vâlcea',
    facebook: 'https://www.facebook.com/24plus.ro/',
    heroTitle: 'Brandul tău, văzut de departe.',
    heroSubtitle: 'De la design la montaj: litere volumetrice, firme luminoase, personalizări auto, print mare și digital, obiecte promoționale.',
    intro: [
      '24 Plus Media este o firmă de producție publicitară, specializată în materiale publicitare, decorări și personalizări auto, vitrine, spații comerciale, semnalistică de interior și exterior, print de mari dimensiuni, tipar digital și obiecte promoționale.',
      'Echipa noastră îți oferă soluții complete: design, consiliere în alegerea materialelor, producție, asamblare, montaj și logistică.',
      'Ne adaptăm cerințelor tale, reducem la minimum timpii de livrare și lucrăm cu soluții de calitate la prețuri corecte.',
    ],
  } as Settings,
};
export type Collections = typeof defaults;
export type Name = keyof Collections;

// ---- backends -------------------------------------------------------------------------------
const redisUrl = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
export const usingRedis = !!(redisUrl && redisToken);
export const onVercel = !!process.env.VERCEL;

export const DATA_DIR = path.resolve(process.env.DATA_DIR ?? 'data');
export const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');
if (!usingRedis) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const redis = usingRedis ? new Redis({ url: redisUrl!, token: redisToken! }) : null;
const key = (n: string) => `24plus:${n}`;
const file = (n: string) => path.join(DATA_DIR, `${n}.json`);
const fileCache = new Map<string, { mtime: number; value: unknown }>();

async function get<K extends Name>(name: K): Promise<Collections[K]> {
  if (redis) {
    const v = await redis.get<Collections[K]>(key(name));
    if (v !== null && v !== undefined) return v;
    await redis.set(key(name), defaults[name], { nx: true }); // first run: seed from the import
    return structuredClone(defaults[name]);
  }
  const f = file(name);
  if (!fs.existsSync(f)) fs.writeFileSync(f, JSON.stringify(defaults[name], null, 2));
  const mtime = fs.statSync(f).mtimeMs;
  const hit = fileCache.get(name);
  if (hit && hit.mtime === mtime) return structuredClone(hit.value) as Collections[K];
  const value = JSON.parse(fs.readFileSync(f, 'utf8'));
  fileCache.set(name, { mtime, value });
  return structuredClone(value) as Collections[K];
}

async function put<K extends Name>(name: K, value: Collections[K]) {
  if (redis) { await redis.set(key(name), value); return; }
  const f = file(name);
  const tmp = `${f}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2));
  fs.renameSync(tmp, f);
  fileCache.set(name, { mtime: fs.statSync(f).mtimeMs, value: structuredClone(value) });
}

// ---- public API -----------------------------------------------------------------------------
export const read = get;
export const write = put;

// Serialise read-modify-write within one process. Across serverless instances two simultaneous edits
// could overwrite each other; with a handful of editors that is an acceptable trade-off.
let queue: Promise<unknown> = Promise.resolve();
export function update<K extends Name>(name: K, fn: (v: Collections[K]) => Collections[K] | void | Promise<Collections[K] | void>): Promise<void> {
  const run = async () => { const v = await get(name); const out = await fn(v); await put(name, (out ?? v) as Collections[K]); };
  const p = queue.then(run, run);
  queue = p.catch(() => {});
  return p;
}

/** Everything the public pages need, in one round trip (Redis MGET). */
export type Snapshot = Pick<Collections, 'categories' | 'services' | 'clients' | 'projects' | 'testimonials' | 'settings'>;
export async function snapshot(): Promise<Snapshot> {
  if (redis) {
    const names = ['categories', 'services', 'clients', 'projects', 'testimonials', 'settings'] as const;
    const vals = await redis.mget<unknown[]>(...names.map(key));
    const out: Record<string, unknown> = {};
    for (let i = 0; i < names.length; i++) out[names[i]] = vals[i] ?? (await get(names[i]));
    return out as Snapshot;
  }
  const [categories, services, clients, projects, testimonials, settings] = await Promise.all(
    (['categories', 'services', 'clients', 'projects', 'testimonials', 'settings'] as const).map((n) => get(n)));
  return { categories, services, clients, projects, testimonials, settings } as Snapshot;
}

/** Sliding-window counter for rate limits. Returns hits within the window, including this one. */
const memHits = new Map<string, number[]>();
export async function hit(bucket: string, seconds: number): Promise<number> {
  if (redis) {
    const k = `24plus:rl:${bucket}`;
    const n = await redis.incr(k);
    if (n === 1) await redis.expire(k, seconds);
    return n;
  }
  const now = Date.now();
  const list = (memHits.get(bucket) ?? []).filter((t) => now - t < seconds * 1000);
  list.push(now);
  memHits.set(bucket, list);
  return list.length;
}

export const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
