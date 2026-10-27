// Builds src/data/*.json and optimised images from the old site's backup.
// Run from new/:  npm run import
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const old = path.resolve(root, '../old');
const backup = path.join(old, 'database/backup');
const outData = path.join(root, 'src/data');
const outImg = path.join(root, 'public/img');

// --- taxonomy (from old app/helpers/EntityTypes.php) -----------------------
const categories = [
  { slug: 'productie-publicitara', title: 'Producție publicitară', blurb: 'Litere volumetrice, firme luminoase, totemuri și personalizări auto.' },
  { slug: 'printuri-mari', title: 'Printuri mari', blurb: 'Autocolante, bannere, afișe, canvas și fototapet.' },
  { slug: 'print-digital', title: 'Print digital', blurb: 'Flyere, cărți de vizită, cataloage, calendare și etichete.' },
  { slug: 'obiecte-promotionale', title: 'Obiecte promoționale', blurb: 'Tricouri, pixuri, brelocuri, brichete, magneți și roll-up-uri.' },
];

// type id -> [slug, category, clean title]
const types = {
  1: ['litere-volumetrice', 'productie-publicitara', 'Litere volumetrice'],
  2: ['casete-luminoase', 'productie-publicitara', 'Casete și firme luminoase'],
  3: ['totem', 'productie-publicitara', 'Totem'],
  4: ['personalizari-auto', 'productie-publicitara', 'Personalizări auto'],
  5: ['decorari-geamuri-si-vitrine', 'productie-publicitara', 'Decorări geamuri și vitrine'],
  6: ['gravura-computerizata', 'productie-publicitara', 'Gravură computerizată'],
  7: ['panouri-publicitare', 'productie-publicitara', 'Panouri publicitare'],
  8: ['mese-candybar', 'productie-publicitara', 'Mese candy bar'],
  9: ['decupaj-polistiren', 'productie-publicitara', 'Decupaj polistiren'],
  10: ['autocolante', 'printuri-mari', 'Autocolante'],
  11: ['bannere', 'printuri-mari', 'Bannere'],
  12: ['print-afise', 'printuri-mari', 'Print afișe mari'],
  13: ['tablouri-canvas', 'printuri-mari', 'Tablouri canvas'],
  14: ['fototapet', 'printuri-mari', 'Fototapet'],
  15: ['flyere-pliante', 'print-digital', 'Flyere și pliante'],
  18: ['afise', 'print-digital', 'Afișe publicitare'],
  19: ['carti-de-vizita', 'print-digital', 'Cărți de vizită'],
  20: ['cataloage-si-brosuri', 'print-digital', 'Cataloage și broșuri'],
  21: ['mape-de-prezentare', 'print-digital', 'Mape de prezentare'],
  22: ['calendare', 'print-digital', 'Calendare'],
  23: ['foi-cu-antet', 'print-digital', 'Foi cu antet'],
  24: ['etichete', 'print-digital', 'Etichete autocolante'],
  25: ['felicitari', 'print-digital', 'Felicitări'],
  26: ['ecusoane-si-legitimatii', 'print-digital', 'Ecusoane și legitimații'],
  28: ['tricouri-personalizate', 'obiecte-promotionale', 'Tricouri personalizate'],
  29: ['pixuri', 'obiecte-promotionale', 'Pixuri'],
  30: ['brelocuri', 'obiecte-promotionale', 'Brelocuri'],
  31: ['brichete', 'obiecte-promotionale', 'Brichete'],
  32: ['magneti-frigider', 'obiecte-promotionale', 'Magneți de frigider'],
  33: ['roll-up', 'obiecte-promotionale', 'Roll-up-uri'],
  34: ['alte-obiecte-promotionale', 'obiecte-promotionale', 'Alte obiecte promoționale'],
};

// --- minimal parser for phpMyAdmin "INSERT ... VALUES (...),(...);" ----------
function parseInserts(file, table) {
  const sql = fs.readFileSync(path.join(backup, file), 'utf8');
  const start = sql.indexOf(`INSERT INTO \`${table}\``);
  if (start < 0) return [];
  let i = sql.indexOf('VALUES', start) + 6;
  const rows = [];
  let row = null, field = '', inStr = false, quoted = false;
  for (; i < sql.length; i++) {
    const c = sql[i];
    if (inStr) {
      if (c === '\\') { const n = sql[++i]; field += n === 'n' ? '\n' : n === 'r' ? '\r' : n === 't' ? '\t' : n; }
      else if (c === "'") { if (sql[i + 1] === "'") { field += "'"; i++; } else inStr = false; }
      else field += c;
      continue;
    }
    if (c === "'") { inStr = true; quoted = true; field = ''; }
    else if (c === '(' && !row) { row = []; field = ''; quoted = false; }
    else if (c === ',' && row) { row.push(quoted ? field : field.trim() === 'NULL' ? null : field.trim()); field = ''; quoted = false; }
    else if (c === ')' && row) { row.push(quoted ? field : field.trim() === 'NULL' ? null : field.trim()); rows.push(row); row = null; field = ''; quoted = false; }
    else if (c === ';' && !row) break;
    else if (row) field += c;
  }
  return rows;
}

// --- text cleaning ----------------------------------------------------------
const entities = { '&nbsp;': ' ', '&amp;': '&', '&quot;': '"', '&#39;': "'", '&lt;': '<', '&gt;': '>' };
function toParagraphs(html) {
  const text = html
    .replace(/<\/p>|<br\s*\/?>|<\/li>|<\/div>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&(nbsp|amp|quot|#39|lt|gt);/g, (m) => entities[m]);
  return text.split(/\n+/).map((p) => p.replace(/\s+/g, ' ').trim()).filter(Boolean);
}
// Source text lost its diacritics ("?" in place of ș/ț/ă...) in some rows.
const corrupted = (t) => /\w\?\w|\s\?\w|\w\?\s/.test(t);

fs.mkdirSync(outData, { recursive: true });
fs.mkdirSync(outImg, { recursive: true });

// --- services ---------------------------------------------------------------
const byType = new Map();
for (const [id, type, title, desc] of parseInserts('entity.sql', 'entity')) {
  const t = Number(type);
  const paragraphs = toParagraphs(desc || '');
  const len = paragraphs.join(' ').length;
  if (!byType.has(t) || len > byType.get(t).len) byType.set(t, { paragraphs, len });
}
const copy = JSON.parse(fs.readFileSync(path.join(here, 'copy.ro.json'), 'utf8'));
const services = [];
for (const [t, [slug, category, title]] of Object.entries(types)) {
  const e = byType.get(Number(t));
  const rewrite = copy[slug];
  const paragraphs = rewrite ? rewrite.paragraphs : (e?.paragraphs ?? []);
  const isStub = paragraphs.length === 0 || (paragraphs.length === 1 && paragraphs[0].toLowerCase() === 'test');
  services.push({
    slug, category, title,
    order: Number(t),
    excerpt: rewrite?.excerpt ? rewrite.excerpt : isStub ? '' : (paragraphs[0].length > 170 ? paragraphs[0].slice(0, 167).replace(/\s+\S*$/, '') + '…' : paragraphs[0]),
    paragraphs: isStub ? [] : paragraphs,
    hidden: isStub,                               // no real text in old DB
    needsReview: !isStub && (!!rewrite || paragraphs.some(corrupted)), // rewritten copy is a draft for the owner to approve
  });
}

// --- clients ----------------------------------------------------------------
const clients = parseInserts('client.sql', 'client')
  .map(([id, name, url]) => ({ id: Number(id), name, url: /^https?:/.test(url) ? url : /^www\./.test(url) ? 'https://' + url : null }))
  .filter((c) => c.name !== 'Diversi');

// --- projects (photos) ------------------------------------------------------
// The DB's 118 portfolio files are not in the repo, so use the curated photos in old/utile.
// Canvas and roll-up folders hold stock/web images; excluded until usage rights are confirmed.
const folders = {
  'LITERE VOLUMETRICE': 'litere-volumetrice',
  'CASETE LUMINOASE': 'casete-luminoase',
  'TOTEM': 'totem',
  'COLANTARI AUTO': 'personalizari-auto',
  'DECORARI GEAMURI SI VITRINE': 'decorari-geamuri-si-vitrine',
  'MESE CANDY BAR': 'mese-candybar',
};
const projects = [];
const jobs = [];
for (const [folder, slug] of Object.entries(folders)) {
  const dir = path.join(old, 'utile', folder);
  const files = fs.readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
  files.forEach((f, i) => {
    const id = `${slug}-${String(i + 1).padStart(2, '0')}`;
    projects.push({ id, service: slug, thumb: `/img/${id}-s.webp`, full: `/img/${id}.webp` });
    jobs.push({ src: path.join(dir, f), id });
  });
}
const hero = path.join(old, 'utile/Pag principala/_Z1A7354 16-9.jpg');
jobs.push({ src: hero, id: 'hero', hero: true });

let done = 0;
await Promise.all(jobs.map(async ({ src, id, hero }) => {
  const img = sharp(src).rotate();
  await img.clone().resize({ width: hero ? 2000 : 1600, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(outImg, `${id}.webp`));
  if (!hero) await img.clone().resize({ width: 640, height: 480, fit: 'cover' }).webp({ quality: 72 }).toFile(path.join(outImg, `${id}-s.webp`));
  done++;
}));

fs.writeFileSync(path.join(outData, 'categories.json'), JSON.stringify(categories, null, 2));
fs.writeFileSync(path.join(outData, 'services.json'), JSON.stringify(services, null, 2));
fs.writeFileSync(path.join(outData, 'clients.json'), JSON.stringify(clients, null, 2));
fs.writeFileSync(path.join(outData, 'projects.json'), JSON.stringify(projects, null, 2));
console.log(`services ${services.length} (hidden ${services.filter((s) => s.hidden).length}, needs review ${services.filter((s) => s.needsReview).length}), clients ${clients.length}, photos ${done}`);
