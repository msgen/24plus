import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { UPLOAD_DIR, newId } from './store';

export const MAX_BYTES = 15 * 1024 * 1024;

/** Validates by actually decoding the file, then re-encodes to WebP (drops EXIF/GPS and any appended payload). */
export async function saveImage(file: File, opts: { thumb?: boolean; width?: number } = {}) {
  if (file.size === 0) throw new Error('Fișier gol.');
  if (file.size > MAX_BYTES) throw new Error(`${file.name}: fișierul depășește 15 MB.`);
  const input = Buffer.from(await file.arrayBuffer());
  let img: ReturnType<typeof sharp>;
  try { img = sharp(input, { failOn: 'error', limitInputPixels: 120_000_000 }).rotate(); await img.metadata(); }
  catch { throw new Error(`${file.name}: nu este o imagine validă.`); }
  const id = newId();
  const full = `${id}.webp`;
  await img.clone().resize({ width: opts.width ?? 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(UPLOAD_DIR, full));
  let thumb = full;
  if (opts.thumb !== false) {
    thumb = `${id}-s.webp`;
    await img.clone().resize({ width: 640, height: 480, fit: 'cover' }).webp({ quality: 72 }).toFile(path.join(UPLOAD_DIR, thumb));
  }
  return { full: `/uploads/${full}`, thumb: `/uploads/${thumb}` };
}

/** Delete an uploaded file by its public URL (files under /img are the bundled seed photos, left alone). */
export function removeUpload(url?: string | null) {
  if (!url || !url.startsWith('/uploads/')) return;
  const f = path.join(UPLOAD_DIR, path.basename(url));
  fs.rmSync(f, { force: true });
}
