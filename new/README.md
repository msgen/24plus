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

Changes appear on the site immediately (no rebuild).

## Deploy
Needs a host that runs Node 22.22+. **cPanel: see [DEPLOY-CPANEL.md](DEPLOY-CPANEL.md)** (`npm run package` builds the upload). A small VPS works too:

**Docker (simplest on a VPS)**
```
docker build -t 24plus .
docker run -d --name 24plus --restart unless-stopped -p 4321:4321 -v 24plus-data:/data \
  -e SITE_URL=https://24plus.ro --env-file .env 24plus
docker exec -it 24plus node scripts/user-add.mjs you@24plus.ro "Nume" "parola-lunga"
```
**Without Docker:** `npm ci && npm run build`, then run `node dist/server/entry.mjs` under pm2/systemd with the env vars from `.env.example`, behind nginx/Caddy for HTTPS (the proxy must send `X-Forwarded-Proto: https` so the login cookie is marked Secure).

**Backups:** copy the whole `DATA_DIR` (JSON + `uploads/`). That is the entire state of the site. Restore = put it back.

## Layout
- `src/lib/store.ts` file store (atomic writes, mtime cache). First run seeds from `src/data/*.json`.
- `src/lib/auth.ts` scrypt passwords, HMAC-signed httpOnly/SameSite=Strict cookie, login/quote rate limits. `security.checkOrigin` rejects cross-site form POSTs.
- `src/lib/images.ts` decodes + re-encodes every upload with sharp (strips metadata, rejects non-images, 15 MB cap).
- `src/lib/content.ts` read side for the public pages.
- `src/pages/admin/*` the CMS screens. `src/pages/api/quote.ts` the public form endpoint.
- `scripts/import.mjs` one-off import from `../old` (backup SQL + photos); `scripts/copy.ro.json` rewritten service text.

## Known limits / next steps
- Single in-process store: run one instance. Moving to SQLite/Postgres only touches `store.ts`.
- Photos from the old DB (118 portfolio files, 13 client logos) were never delivered; add them via Portofoliu / Clienți.
- Privacy page text is a placeholder; no analytics or cookie banner yet.
- The `/uploads` route reads files into memory; fine at this size, add a CDN if traffic grows.
