# Deploying to Vercel

The app runs as a Vercel serverless function. Serverless has no persistent disk, so the CMS stores its data in two Vercel-managed services (both have free tiers):

| What | Where | Env vars (added automatically by the integration) |
|---|---|---|
| Texts, services, clients, quote requests, users | **Upstash Redis** | `KV_REST_API_URL`, `KV_REST_API_TOKEN` |
| Uploaded photos | **Vercel Blob** (a *public* store) | `BLOB_READ_WRITE_TOKEN` |

Without those variables the same code stores everything in `DATA_DIR` (local development, Docker, a VPS).

> **Plan note.** Vercel's free *Hobby* plan is for personal, non-commercial use. A company website should be on the *Pro* plan.

## 1. Create the project
1. vercel.com → *Add New… → Project* → import the GitHub repo `msgen/24plus`.
2. **Root Directory: `new`**. Framework preset: Astro (detected).
3. *Settings → General → Node.js Version: 22.x* (Astro 7 needs 22.22+).
4. Do not deploy yet, add storage and variables first (steps 2-3).

## 2. Storage
- *Storage → Create → Upstash Redis* (Marketplace), pick a region near Romania (e.g. Frankfurt), connect it to the project.
- *Storage → Create → Blob*, choose **Public**, connect it to the project.

## 3. Environment variables (Settings → Environment Variables, Production)
| Name | Value |
|---|---|
| `SESSION_SECRET` | 32+ random characters (`openssl rand -hex 32`) |
| `SITE_URL` | `https://24plus.ro` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | your first admin (the password needs 10+ characters) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO`, `MAIL_FROM` | optional: e-mail each quote request. A mailbox from your cPanel works (host `mail.24plus.ro`, port 465 or 587) |

## 4. Deploy and first login
1. *Deploy*. Open `https://<project>.vercel.app/admin` and log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
2. **Delete `ADMIN_PASSWORD`** from the variables and redeploy. The account now lives in Redis.
3. Walk through the checks in the README (edit a service, upload photos, send a quote request).

## 5. Point 24plus.ro to Vercel
1. Vercel → *Settings → Domains* → add `24plus.ro` and `www.24plus.ro`. Vercel shows the exact DNS records.
2. In the DNS zone (cPanel → *Zone Editor*, or your registrar) change only the web records: the `A` record of `24plus.ro` and the `www` `CNAME`, to the values Vercel shows.
3. **Leave the `MX`, `SPF`, `DKIM` and mail-related records alone**, so your e-mail on cPanel keeps working.
4. Wait for DNS (minutes to a few hours); Vercel issues the HTTPS certificate by itself.
5. Check `/sitemap.xml`, `/robots.txt` and an old URL (`/litere-volumetrice` should redirect). Submit the sitemap in Google Search Console.
6. Keep the old cPanel site backup for a while.

## Day to day
- Content edits in `/admin` are live immediately. No redeploy.
- Code changes: push to the branch Vercel watches; every branch also gets a preview URL.
- **Backups:** *Admin → Setări → Descarcă backup* saves all text data as JSON. Photos stay in Vercel Blob. Download a backup now and then.

## Limits and good to know
- A serverless request is capped at about 4.5 MB. The admin shrinks photos in the browser (max 2000 px) and uploads them one at a time, so phone photos work. This needs JavaScript enabled.
- Two editors saving the *same* list at the same second could overwrite each other. Unlikely for a small team.
- The login rate limit and the quote form limit use Redis, so they work across serverless instances.
- Upstash free tier: each public page view costs one Redis command; plenty for a business site.
