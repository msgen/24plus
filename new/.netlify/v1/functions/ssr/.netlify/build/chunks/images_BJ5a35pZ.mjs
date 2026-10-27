import { a as newId, n as deleteImage, o as putImage } from "./store_BJlZ3LJb.mjs";
import sharp from "sharp";
/** Validates by actually decoding the file, then re-encodes to WebP (drops EXIF/GPS and any appended payload). */
async function saveImage(file, opts = {}) {
	if (file.size === 0) throw new Error("Fișier gol.");
	if (file.size > 15728640) throw new Error(`${file.name}: fișierul depășește 15 MB.`);
	const input = Buffer.from(await file.arrayBuffer());
	let img;
	try {
		img = sharp(input, {
			failOn: "error",
			limitInputPixels: 12e7
		}).rotate();
		await img.metadata();
	} catch {
		throw new Error(`${file.name}: nu este o imagine validă.`);
	}
	const id = newId();
	const fullBuf = await img.clone().resize({
		width: opts.width ?? 1600,
		withoutEnlargement: true
	}).webp({ quality: 80 }).toBuffer();
	await putImage(`${id}.webp`, fullBuf);
	const full = `/uploads/${id}.webp`;
	let thumb = full;
	if (opts.thumb !== false) {
		const thumbBuf = await img.clone().resize({
			width: 640,
			height: 480,
			fit: "cover"
		}).webp({ quality: 72 }).toBuffer();
		await putImage(`${id}-s.webp`, thumbBuf);
		thumb = `/uploads/${id}-s.webp`;
	}
	return {
		full,
		thumb
	};
}
/** Delete an uploaded file by its public URL (files under /img are the bundled seed photos, left alone). */
async function removeUpload(url) {
	if (url?.startsWith("/uploads/")) await deleteImage(url.slice(9).replace(/[^\w.-]/g, ""));
}
export { saveImage as n, removeUpload as t };
