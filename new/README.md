# 24plus.ro, new site

Astro 7 + Tailwind 4, static output, Romanian only.

```
npm install
npm run import   # rebuild src/data/*.json + public/img from ../old (backup SQL + photos)
npm run dev      # http://localhost:4321
npm run build    # -> dist/
```

## How content works today
- `scripts/import.mjs` reads `../old/database/backup/*.sql` (services, clients) and the curated photos in `../old/utile/`, writes `src/data/*.json` and optimised WebP images in `public/img/`.
- `scripts/copy.ro.json` holds the rewritten Romanian service copy (with diacritics). **Draft: owner must review.**
- `src/lib/content.ts` is the only place pages read data from. Replace its body with Sanity queries when the CMS is connected; pages need no change.
- Services with no real text in the old DB (`hidden: true`) are not published.
- Old URLs redirect to the new ones: see `astro.config.mjs` and `public/_redirects`.

## Still to do
- Missing production images (portfolio rows and client logos in the DB): add `assets/img/gallery/` from the live server, then extend the import.
- Connect Sanity (schema + Studio) and a deploy hook.
- Form: set `PUBLIC_FORM_ENDPOINT` (e.g. a Formspree/Resend function). Without it the form opens the visitor's mail app.
- Real testimonials, privacy policy text, map pin, analytics + consent banner.
- Photos from `utile/Canvas` and `utile/roll up` are excluded until their usage rights are confirmed.
