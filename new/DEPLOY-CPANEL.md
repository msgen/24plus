# Deploying to cPanel

The site is a Node app, so the cPanel account must have **Setup Node.js App** (CloudLinux Node.js Selector / Passenger). Check this first: cPanel → *Software* → *Setup Node.js App*. If the icon is missing, ask the host to enable it, or use a VPS (see README, Docker).

> **Check the Node version offered there.** The build needs **Node 22.22 or newer**. If the list tops out at 20 or at an older 22.x, ask the host to add it. Do not go live on an older version without testing.

Do the first deployment on a test subdomain (e.g. `test.24plus.ro`) and switch the real domain only when everything works. The old site stays untouched until then.

## 1. Build the package (on your computer)
```
cd new
npm ci
npm run package        # -> deploy/24plus-app.tar.gz (about 16 MB)
```

## 2. Upload
1. cPanel → *Subdomains*: create `test.24plus.ro` (its document root can stay empty).
2. cPanel → *File Manager*: in your **home folder** (not `public_html`) create `24plus-app` and `24plus-data`.
3. Upload `24plus-app.tar.gz` into `24plus-app`, right-click → *Extract*.

## 3. Create the application
*Setup Node.js App* → *Create Application*:

| Field | Value |
|---|---|
| Node.js version | newest available (22.22+) |
| Application mode | Production |
| Application root | `24plus-app` |
| Application URL | `test.24plus.ro` |
| Application startup file | `app.cjs` |

Add these **environment variables**:

| Name | Value |
|---|---|
| `DATA_DIR` | `/home/<cpanel-user>/24plus-data` |
| `SITE_URL` | `https://test.24plus.ro` (later `https://24plus.ro`) |
| `FORCE_HTTPS` | `1` |
| `ADMIN_EMAIL` | your login e-mail |
| `ADMIN_PASSWORD` | a strong password, 10+ characters (first start only) |
| `ADMIN_NAME` | your name |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_TO`, `MAIL_FROM` | optional: mailbox created in cPanel → *Email Accounts*, to also get each quote request by e-mail |

Then press **Run NPM Install** (installs the production packages, including the image library `sharp`), then **Restart**.

## 4. First check
1. Open `https://test.24plus.ro` (enable *SSL/TLS Status → Run AutoSSL* if there is no certificate yet).
2. Open `/admin`, log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
3. **Remove `ADMIN_PASSWORD` from the environment variables** and restart. The account is stored in `24plus-data/users.json`; the variable is only needed for the first start.
4. Walk through the checks in the README (edit a service, upload a photo, send a quote request).

## 5. Go live
1. Download a full backup of the old site (cPanel → *Backup*) and keep it.
2. Move the old site out of the way (rename `public_html` contents or its `.htaccess`), because the Node app takes over the domain.
3. In *Setup Node.js App* change *Application URL* to `24plus.ro` (add `www.24plus.ro` as a redirect to it), set `SITE_URL=https://24plus.ro`, restart.
4. Run AutoSSL for the domain, then check `/sitemap.xml`, `/robots.txt`, and a few old URLs (`/litere-volumetrice` should redirect).
5. Submit `https://24plus.ro/sitemap.xml` in Google Search Console.

## Updating later
Run `npm run package` again, upload and extract over `24plus-app` (this never touches `24plus-data`), *Run NPM Install* if `package.json` changed, *Restart*.

## Backups
`24plus-data` is the whole site: all text, photos, users and quote requests. It sits in your home folder, so cPanel's full backup includes it. Also download it now and then (File Manager → compress → download).

## Troubleshooting
- **503 / app does not start:** look at `24plus-app/stderr.log` (or the log shown in *Setup Node.js App*). Usual causes: Node older than 22.22, *Run NPM Install* not run, wrong startup file.
- **`sharp` install error:** the server is too old for the prebuilt image library. Ask the host for a newer OS image, or use a VPS.
- **Login works, then bounces back to the login page:** set `FORCE_HTTPS=1`, and open the site over `https://`.
- **Photo upload fails or the app restarts:** shared hosting can cap memory. Upload photos under about 8 MB (phone photos are fine) and a few at a time.
- **Changes do not show:** content edits are instant. For code updates press *Restart* after uploading.
