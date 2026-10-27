# 24plus.ro, new site + built-in CMS

Astro 7 (server mode, Node) + Tailwind 4. Romanian only. No external CMS or database: content lives in JSON files and uploaded images in one folder (`DATA_DIR`).

## Run locally
```
npm install
npm run user:add -- you@24plus.ro "Numele tău" "o-parola-de-minim-10-caractere"
npm run dev                             # site: http://localhost:4321   admin: /admin
```

## What the admin (`/admin`) can do
| Section | Editor can… |
|---|---|
| Servicii | edit title, short text, paragraphs; publish/unpublish; add or delete services |
| Portofoliu | upload several photos at once (auto-resized to WebP), assign to a service, alt text, "show on home page", delete |
| Clienți | add/edit/delete clients, upload logo |
| Testimoniale | add/edit/delete (home page section shows when at least one exists) |
| Cereri ofertă | see quote requests from the website form, mark as done, delete |
| Setări | phone, e-mail, address, Facebook, home page title/subtitle/"Despre noi", change password |

Changes appear on the site immediately (no rebuild). *Setări → Descarcă backup* exports the data as JSON.

## Deploy
**Netlify (chosen): see [DEPLOY-NETLIFY.md](DEPLOY-NETLIFY.md).** Data and photos go to Netlify Blobs (built in, nothing to set up).

Any Node 22.22+ host also works (VPS, Docker): without `STORAGE=netlify` everything is stored in `DATA_DIR`.
```
docker build -t 24plus .
docker run -d --name 24plus --restart unless-stopped -p 4321:4321 -v 24plus-data:/data \
  -e SITE_URL=https://24plus.ro -e SESSION_SECRET=$(openssl rand -hex 32) 24plus
docker exec -it 24plus node scripts/user-add.mjs you@24plus.ro "Nume" "parola-lunga"
```
Shared cPanel hosting without Node cannot run this app.

## Layout
- `src/lib/store.ts` async store: Netlify Blobs on Netlify, JSON files otherwise. First run seeds from `src/data/*.json`.
- `src/middleware.ts` loads one content snapshot per request (`snapshot-context.ts`) so templates read content synchronously; also the cross-site POST check.
- `src/lib/auth.ts` scrypt passwords, HMAC-signed httpOnly/SameSite=Strict cookie, login/quote rate limits. `security.checkOrigin` rejects cross-site form POSTs.
- `src/lib/images.ts` decodes + re-encodes every upload with sharp (strips metadata, rejects non-images, 15 MB cap) and stores to Netlify Blobs or `DATA_DIR/uploads` (served by `/uploads/*`).
- `public/admin.js` shrinks photos in the browser and uploads them one by one (serverless body limit).
- `src/lib/content.ts` read side for the public pages.
- `src/pages/admin/*` the CMS screens. `src/pages/api/quote.ts` the public form endpoint.
- `src/data/*.json` the seed content (services, clients, photo list) loaded on first run; it came from the old site's database backup. `scripts/user-add.mjs` creates an admin user from the command line.
- The old PHP site, its database backup and original photos were removed from the repo after the migration; they stay in git history (last commit containing them: `ff22af2`, e.g. `git show ff22af2:old/database/backup/entity.sql`).

## Known limits / next steps
- Read-modify-write is serialised per process only. Fine for a few editors; move to a real database if that changes (only `store.ts` needs to change).
- Photos from the old DB (118 portfolio files, 13 client logos) were never delivered; add them via Portofoliu / Clienți.
- Privacy page text is a placeholder; no analytics or cookie banner yet.
- The `/uploads` route reads files into memory; fine at this size, add a CDN if traffic grows.
