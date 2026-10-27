# Deploying to Netlify

The app runs as a Netlify serverless function (Astro's Netlify adapter). Serverless has no persistent disk, so the CMS keeps everything in **Netlify Blobs**, which is built in: nothing to create or configure, no extra service or token.

| What | Stored in |
|---|---|
| Texts, services, clients, quote requests, users | blob store `cms-data` |
| Uploaded photos (served through `/uploads/...`) | blob store `cms-images` |
| Login / form rate-limit counters | blob store `cms-ratelimit` |

Locally, in Docker or on a VPS the same code stores everything in `DATA_DIR` instead.

## 1. Create the site
1. app.netlify.com → *Add new project → Import an existing project* → GitHub → `msgen/24plus`.
2. Leave *Base directory* empty (the site is at the repo root). Build command `npm run build`, publish directory `dist` (the included `netlify.toml` sets these).
3. *Branch to deploy*: the branch that holds the code (merge `claude/awesome-bell-srewm5` into `main` first, or pick that branch).
4. Add the environment variables below **before** the first deploy (or redeploy after adding them).

## 2. Environment variables (Site configuration → Environment variables)
| Name | Value |
|---|---|
| `SESSION_SECRET` | 32+ random characters (`openssl rand -hex 32`) |
| `SITE_URL` | `https://24plus.ro` |
| `STORAGE` | `netlify` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | your first admin (password 10+ characters) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO`, `MAIL_FROM` | optional: e-mail each quote request. A mailbox from your cPanel works (host `mail.24plus.ro`, port 465 or 587) |

## 3. First login
1. Open `https://<name>.netlify.app/admin`, log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
2. **Delete `ADMIN_PASSWORD`** from the variables and redeploy. The account now lives in the blob store.
3. Walk through the checks in the README (edit a service, upload photos, send a quote request).

## 4. Point 24plus.ro to Netlify
Keep the DNS zone where it is now (cPanel or your registrar), so your **e-mail records stay untouched**:
1. Netlify → *Domain management → Add a domain* → `24plus.ro` (and `www`). Netlify shows the records it needs.
2. In the DNS zone change only the web records: the `A` record of `24plus.ro` and the `www` `CNAME`, to the values Netlify shows.
3. **Do not change `MX`, `SPF`, `DKIM` or other mail records.** (If you let Netlify DNS take over the whole zone, you must re-create all of them or e-mail stops.)
4. Wait for DNS (minutes to hours); *HTTPS → Let's Encrypt certificate* is issued from the Netlify domain settings.
5. Check `/sitemap.xml`, `/robots.txt` and an old URL (`/litere-volumetrice` should redirect). Submit the sitemap in Google Search Console.
6. Keep the old cPanel backup for a while.

## Day to day
- Content edits in `/admin` are live immediately, no redeploy.
- Code changes: push to the deployed branch; other branches get preview URLs.
- **Backups:** *Admin → Setări → Descarcă backup* saves all text data as JSON. Photos stay in Netlify Blobs. Download a backup now and then.

## Limits and good to know
- Check Netlify's current free-plan limits and terms on their pricing page. The free plan has monthly usage allowances (function runs, bandwidth); a small business site normally fits, but watch the usage page the first months, and know that exceeding the allowance can pause the site.
- A function request is capped at about 6 MB and a few seconds (10 s default). The admin shrinks photos in the browser (max 2000 px) and uploads them one at a time, so phone photos work. This needs JavaScript enabled.
- Two editors saving the *same* list at the same second could overwrite each other. Unlikely for a small team.
- Public pages read a single combined document (kept in step on every save), so each page view costs one blob read.
