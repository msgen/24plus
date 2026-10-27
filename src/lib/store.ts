// Storage for the CMS: one JSON document per collection.
//  - On Netlify: Netlify Blobs (serverless functions have no persistent disk).
//  - Otherwise (local dev, Docker, VPS): JSON files in DATA_DIR.
// All access is async; callers do not know which backend is active.
import fs from 'node:fs';
import path from 'node:path';
import categoriesSeed from '../data/categories.json';
import servicesSeed from '../data/services.json';
import clientsSeed from '../data/clients.json';
import projectsSeed from '../data/projects.json';
import { getStore } from '@netlify/blobs';

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

// ---- backend selection ----------------------------------------------------------------------
// STORAGE=netlify|file forces a backend; otherwise Netlify is detected from its runtime variables.
export const usingNetlify = process.env.STORAGE
  ? process.env.STORAGE === 'netlify'
  : !!(process.env.NETLIFY || process.env.NETLIFY_BLOBS_CONTEXT);

export const DATA_DIR = path.resolve(process.env.DATA_DIR ?? 'data');
export const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');
if (!usingNetlify) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Strong consistency: an edit in the admin is visible on the site immediately.
const blobs = (name: string) => getStore({ name, consistency: 'strong' });
const data = () => blobs('cms-data');
const PUBLIC = ['categories', 'services', 'clients', 'projects', 'testimonials', 'settings'] as const;

const file = (n: string) => path.join(DATA_DIR, `${n}.json`);
const fileCache = new Map<string, { mtime: number; value: unknown }>();

async function get<K extends Name>(name: K): Promise<Collections[K]> {
  if (usingNetlify) {
    const v = (await data().get(name, { type: 'json' })) as Collections[K] | null;
    if (v !== null && v !== undefined) return v;
    await data().setJSON(name, defaults[name]); // first run: seed from the import
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
  if (usingNetlify) {
    await data().setJSON(name, value);
    // The public pages read one combined document (1 request per page view); keep it in step with the collections.
    if ((PUBLIC as readonly string[]).includes(name)) await data().setJSON('snapshot', await buildSnapshot(name, value));
    return;
  }
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

/** Everything the public pages need. */
export type Snapshot = Pick<Collections, (typeof PUBLIC)[number]>;

async function buildSnapshot(override?: Name, value?: unknown): Promise<Snapshot> {
  const out: Record<string, unknown> = {};
  await Promise.all(PUBLIC.map(async (n) => { out[n] = n === override ? value : await get(n); }));
  return out as Snapshot;
}

export async function snapshot(): Promise<Snapshot> {
  if (usingNetlify) {
    const s = (await data().get('snapshot', { type: 'json' })) as Snapshot | null;
    if (s) return s;
    const built = await buildSnapshot();
    await data().setJSON('snapshot', built);
    return built;
  }
  return buildSnapshot();
}

/** Counts events for rate limiting; returns hits within the window, including this one. */
const memHits = new Map<string, number[]>();
export async function hit(bucket: string, seconds: number): Promise<number> {
  const now = Date.now();
  const keep = (l: number[]) => l.filter((t) => now - t < seconds * 1000);
  if (usingNetlify) {
    const s = blobs('cms-ratelimit');
    const k = bucket.replace(/[^\w.:-]/g, '_').slice(0, 120);
    const list = keep(((await s.get(k, { type: 'json' })) as number[] | null) ?? []);
    list.push(now);
    await s.setJSON(k, list);
    return list.length;
  }
  const list = keep(memHits.get(bucket) ?? []);
  list.push(now);
  memHits.set(bucket, list);
  return list.length;
}

// ---- uploaded images ------------------------------------------------------------------------
// Netlify: stored in a blob store and served by /uploads/*. Local/VPS: files in DATA_DIR/uploads.
export async function putImage(name: string, buf: Buffer) {
  if (usingNetlify) { await blobs('cms-images').set(name, buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer); return; }
  fs.writeFileSync(path.join(UPLOAD_DIR, name), buf);
}
export async function getImage(name: string): Promise<ArrayBuffer | Buffer | null> {
  if (usingNetlify) return (await blobs('cms-images').get(name, { type: 'arrayBuffer' })) ?? null;
  const f = path.join(UPLOAD_DIR, name);
  return fs.existsSync(f) ? fs.readFileSync(f) : null;
}
export async function deleteImage(name: string) {
  if (usingNetlify) { await blobs('cms-images').delete(name).catch(() => {}); return; }
  fs.rmSync(path.join(UPLOAD_DIR, name), { force: true });
}

export const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
