# 24 Plus Media: New Website Plan

Based on a review of `old/` in `msgen/24plus` (read 2026-10-26).

## 1. What the old site is

**Business:** 24 Plus Media (24plus.ro), an advertising production company in Rm. Valcea, Romania. Contact: Str. Gib Mihaescu nr. 14, contact@24plus.ro, 0745 537 715, Facebook /24plus.ro.

**Old tech:** custom PHP 7 app (Slim 3 + Twig), MySQL, Bootstrap 4 + jQuery, Owl Carousel, Isotope, Fancybox. Hosted on cPanel.
- The admin area is built into the public pages (x-editable, bootbox). It handles image upload, delete, "promote to homepage", description edit and client add/delete.
- The contact form posts to PHP `mail()`.
- The code is dated and has no tests. It has PHP errors in `error_log`, and the 2018 copyright is still in the footer.

**Content structure (35 service pages, one template):**

| Category | Pages |
|---|---|
| Productie publicitara | litere volumetrice, casete/firme luminoase, totem, personalizari auto, decorari geamuri si vitrine, mese candybar, decupaj polistiren (gravura computerizata and panouri publicitare are commented out) |
| Printuri mari | autocolante, bannere, print afise mari, tablouri canvas, fototapet |
| Print digital | flyere si pliante, afise, carti de vizita, cataloage si brosuri, mape de prezentare, calendare, etichete autocolante (foi cu antet, felicitari and ecusoane are commented out) |
| Obiecte promotionale | tricouri, pixuri, brelocuri, brichete, magneti frigider, rollup-uri, alte obiecte promotionale |
| Other | Home (hero slider, intro text, promoted gallery, clients, testimonials, contact), Portofoliu (by client), Clienti, Revista 24 plus (menu link only, no page code), Contact |

**Home copy to keep (Romanian):** the three-paragraph "24 Plus Media este o firma de productie publicitara..." intro. It covers production of advertising materials, vehicle and shopfront branding, signage, large-format print, digital print and promotional items. It also describes the service as full-cycle: design, advice, production, assembly, installation and logistics.

## 2. What is actually reusable

The DB dumps are placeholder data: 1 entity ("O descriere superficiala"), 4 fake clients ("nume1"), 4 test testimonials and 1 portfolio row. **The real content lives in the production database, which is not in this repo.**

What is in the repo:
- `old/utile/`: about 100 curated project photos in 10 folders, 245 MB (litere volumetrice 29, colantari auto 17, canvas 17, casete luminoase 12, roll-up 8, vitrine 5, candy bar 5, totem 3, homepage 3, logo and latest 3).
- `old/assets/img/gallery/`: 92 gallery files, some of them thumbnails.
- The template (Bootstrap theme) images in `assets/img/*`, such as courses, blog and events, are stock demo assets and will be dropped.
- `utile/Canvas/` contains stock or web-sourced images (for example "res_..._full.jpg", the Golden Gate canvas). Check the usage rights before reusing any of them.
- The old logo (`assets/img/logo.jpg`, `logo.gif`) is low-resolution and needs a vector redraw.

**Needed from the owner:**
1. A production DB export, or a crawl of live 24plus.ro, for the real service descriptions, client logos and names, and testimonials.
2. The original or high-res logo, and the brand colours if they exist.
3. The photo originals and the usage rights.
4. The Google Analytics, Search Console and domain-registrar access details.
5. What "Revista 24 plus" is: a magazine, a blog, or a PDF catalogue.

## 3. Goals

- Win local and regional leads (Rm. Valcea, Oltenia, Romania-wide print) through search and a fast quote request.
- Show the work: the portfolio is the main sales tool.
- A site the owner can edit without a developer or a hand-rolled admin.
- Mobile-first (most traffic will be phone), fast, accessible, with no loss of the old search rankings.

## 4. Proposed stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro 5 + TypeScript** (islands for the few interactive parts) | A mostly content-driven site. It ships very little JavaScript, which gives excellent Core Web Vitals and SEO. Next.js is the alternative if you want one framework for everything. |
| Styling | Tailwind CSS 4 + a small component library | Fast, consistent design system. |
| Content / CMS | **Sanity** or **Decap/Tina** (git-based) for services, projects, clients and testimonials | Replaces the hand-made admin. Editors upload images and edit text safely. The git-based option needs no extra service, and Sanity gives the nicer editing UI. |
| Images | Astro Image / Cloudinary or Cloudflare Images | Auto WebP/AVIF, responsive sizes. This replaces 438 MB of raw JPEG. |
| Forms | Quote-request form to a serverless function (Resend/Postmark email) with Turnstile spam protection | Replaces PHP `mail()`, which is unreliable and lands in spam. |
| Hosting | Cloudflare Pages or Netlify/Vercel (static + edge functions) | Free or cheap tier, CDN, HTTPS and preview deploys per branch. |
| Analytics | Plausible or GA4 + Search Console, with a GDPR consent banner | Romania is in the EU. |
| Quality | Playwright smoke tests, Lighthouse CI, ESLint/Prettier, GitHub Actions | |

## 5. Information architecture (new sitemap)

Keep the Romanian URLs where they make sense so redirects stay simple.

```
/                         Home
/servicii                 Services overview (4 categories)
  /servicii/productie-publicitara/litere-volumetrice ...
  /servicii/printuri-mari/...
  /servicii/print-digital/...
  /servicii/obiecte-promotionale/...
/portofoliu               Filterable project gallery (by service, by client)
/portofoliu/[proiect]     Project detail
/clienti                  Clients and testimonials
/revista                  Decide: blog or a catalogue (see open questions)
/contact                  Contact + quote request + map
/politica-confidentialitate, /cookie, /termeni
```

Improvements over the old site:
- 35 thin service pages are grouped into 4 category hubs. Services with little content to show are merged with a sibling, with the old URL redirected.
- Each service page gets structured copy (what it is, materials, use cases, process), a project gallery, FAQ and a quote CTA.
- Adds "Cere oferta" (request a quote) in the header and on every page, plus click-to-call, WhatsApp and a floating mobile contact bar.

## 6. UX and visual direction

- Keep the brand's colourful identity (the old site uses a multi-colour bar: yellow, red, green, blue, purple and pink, one per category) but modernise it: a clean white or neutral base, one strong accent, and the category colours reserved for the four service areas.
- Large photography-led hero, bento-style service grid, masonry portfolio with lightbox and category filters.
- Clear type scale (a modern sans such as Inter or Manrope, a display face for headings), generous whitespace, subtle motion (respecting `prefers-reduced-motion`), dark mode optional.
- Accessibility: WCAG 2.2 AA, keyboard navigation, alt text on every image (the old alt text is just the filename).
- Romanian first; an English version later if wanted.

## 7. Migration and SEO

1. **Content inventory:** crawl the live site (or run the production DB export) into a spreadsheet: URL, title, description, images, traffic from Search Console.
2. **Scripted import:** a Node script that reads the DB export and `old/utile/` and writes structured content (services, projects, clients, testimonials) into the CMS. Photos are renamed, deduplicated, compressed and given alt text.
3. **Redirect map:** every old URL (`/litere-volumetrice`, `/portofoliu/{client}/{id}` and so on) gets a 301 to its new URL. Test it against the crawl.
4. **SEO:** unique titles and meta descriptions, LocalBusiness JSON-LD schema, Google Business Profile link, sitemap.xml, robots.txt, OG images, and image sitemaps.
5. **Clean up:** copyright year, the old phone and email checked with the owner, and dead or commented-out sections dropped.

## 8. Security and housekeeping on the old code

Do not carry any of these over:
- `phpinfo.php`, `error_log` and the `database/` dumps are in the web root and should not be public.
- The login code references undefined helpers (`validateCsrfToken`, `isIpBlocked`, and a `/signin` route that does not exist). It is incomplete and unsafe to reuse.
- The contact form uses `mail()` with an unsanitised `From:` header (header injection risk).
- The `old/` folder in the repo includes `vendor/` and 438 MB of media. Once the new site is live, move `old/` out of the repo history or to an archive so the repo stays light.

## 9. Phases and rough effort

| Phase | Work | Output | Est. |
|---|---|---|---|
| 0. Discovery | Collect production DB, logo, access, owner interview (goals, services to keep, USP, competitors) | Content inventory + brief | 2-3 days |
| 1. Design | Moodboard, design tokens, wireframes (home, service, portfolio, contact) then high-fidelity mobile + desktop in Figma | Approved design | 1-1.5 weeks |
| 2. Foundation | Repo scaffold, CI, design system components, CMS schema, deploy pipeline | Empty but deployable site | 3-4 days |
| 3. Build | Templates, home, service hubs, portfolio, contact and quote form, SEO | Feature-complete staging site | 1.5-2 weeks |
| 4. Content | Run the import script, edit copy, optimise images, write the missing service text | Real content in place | 1 week (overlaps 3) |
| 5. QA | Lighthouse (95+ target), accessibility, cross-browser and device tests, redirect tests, form tests | Launch checklist green | 3-4 days |
| 6. Launch | DNS cutover, 301 redirects live, Search Console re-submit, monitor 404s | Live site | 1 day + 2 weeks of monitoring |

Total: about 5-6 weeks of part-time work for one developer. Content availability from the owner is the main risk.

## 10. Open questions for you

1. Can you get me the **production DB export** and/or the live URL? Without them the real service text, clients and testimonials are missing.
2. **Revista 24 plus**: what is it, and should it become a blog, a PDF catalogue, or be dropped?
3. Do you want an **online shop or price calculator**, or only quote requests?
4. **Languages:** Romanian only, or Romanian and English?
5. Do you want the **CMS** to be non-technical (Sanity) or git-based (free, simpler)?
6. **Branding:** keep the current logo and colours or refresh them?
7. Who edits the site after launch, and how often?
8. Who owns the hosting, domain and Google accounts?
9. Rights to the photos in `utile/` (some look like stock or web images).
10. Timeline and budget constraints?

## 11. Suggested next steps

1. You answer the questions in section 10, mainly 1, 2, 4 and 5.
2. I scaffold `new/` in this repo (Astro + Tailwind, CMS schema, sample pages from the real photos) so you can review a working preview.
3. Together we pick the design direction, then I build out the remaining pages.
