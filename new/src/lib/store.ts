// Tiny file-based store: one JSON file per collection in DATA_DIR.
// Writes are atomic (tmp + rename) and serialised, reads are cached by mtime.
// Good for a few thousand records; swap for a DB later without touching callers.
import fs from 'node:fs';
import path from 'node:path';
import categoriesSeed from '../data/categories.json';
import servicesSeed from '../data/services.json';
import clientsSeed from '../data/clients.json';
import projectsSeed from '../data/projects.json';

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

export const DATA_DIR = path.resolve(process.env.DATA_DIR ?? 'data');
export const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

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

const cache = new Map<string, { mtime: number; value: unknown }>();
const file = (name: string) => path.join(DATA_DIR, `${name}.json`);

export function read<K extends keyof Collections>(name: K): Collections[K] {
  const f = file(name);
  if (!fs.existsSync(f)) {
    fs.writeFileSync(f, JSON.stringify(defaults[name], null, 2)); // first run: seed from the import
  }
  const mtime = fs.statSync(f).mtimeMs;
  const hit = cache.get(name);
  if (hit && hit.mtime === mtime) return structuredClone(hit.value) as Collections[K];
  const value = JSON.parse(fs.readFileSync(f, 'utf8'));
  cache.set(name, { mtime, value });
  return structuredClone(value) as Collections[K];
}

export function write<K extends keyof Collections>(name: K, value: Collections[K]) {
  const f = file(name);
  const tmp = `${f}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2));
  fs.renameSync(tmp, f);
  cache.set(name, { mtime: fs.statSync(f).mtimeMs, value: structuredClone(value) });
}

/** read-modify-write helper; Node is single-threaded and this is synchronous, so it cannot interleave. */
export function update<K extends keyof Collections>(name: K, fn: (v: Collections[K]) => Collections[K] | void) {
  const v = read(name);
  write(name, (fn(v) ?? v) as Collections[K]);
}

export const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
