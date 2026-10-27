import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { put, del } from '@vercel/blob';
import { UPLOAD_DIR, newId } from './store';

export const MAX_BYTES = 15 * 1024 * 1024;
// With a Blob token (Vercel) photos go to Vercel Blob (public store); otherwise to DATA_DIR/uploads, served by /uploads/*.
const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

async function store(name: string, data: Buffer): Promise<string> {
  if (useBlob) {
    const r = await put(`uploads/${name}`, data, { access: 'public', contentType: 'image/webp', addRandomSuffix: false, allowOverwrite: true, cacheControlMaxAge: 31536000 });
    return r.url;
  }
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  fs.writeFileSync(path.join(UPLOAD_DIR, name), data);
  return `/uploads/${name}`;
}

/** Validates by actually decoding the file, then re-encodes to WebP (drops EXIF/GPS and any appended payload). */
export async function saveImage(file: File, opts: { thumb?: boolean; width?: number } = {}) {
  if (file.size === 0) throw new Error('Fișier gol.');
  if (file.size > MAX_BYTES) throw new Error(`${file.name}: fișierul depășește 15 MB.`);
  const input = Buffer.from(await file.arrayBuffer());
  let img: ReturnType<typeof sharp>;
  try { img = sharp(input, { failOn: 'error', limitInputPixels: 120_000_000 }).rotate(); await img.metadata(); }
  catch { throw new Error(`${file.name}: nu este o imagine validă.`); }
  const id = newId();
  const fullBuf = await img.clone().resize({ width: opts.width ?? 1600, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
  const full = await store(`${id}.webp`, fullBuf);
  let thumb = full;
  if (opts.thumb !== false) {
    const thumbBuf = await img.clone().resize({ width: 640, height: 480, fit: 'cover' }).webp({ quality: 72 }).toBuffer();
    thumb = await store(`${id}-s.webp`, thumbBuf);
  }
  return { full, thumb };
}

/** Delete an uploaded file by its public URL (files under /img are the bundled seed photos, left alone). */
export async function removeUpload(url?: string | null) {
  if (!url) return;
  if (url.startsWith('/uploads/')) { fs.rmSync(path.join(UPLOAD_DIR, path.basename(url)), { force: true }); return; }
  if (useBlob && url.startsWith('https://') && url.includes('/uploads/')) await del(url).catch(() => {});
}
