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
| Other | Home (hero slider, intro text, promoted gallery, clients, testimonials, contact), Portofoliu (by client), Clienti, Contact. "Revista 24 plus" was a menu link with no page behind it, and is dropped. |

**Home copy to keep (Romanian):** the three-paragraph "24 Plus Media este o firma de productie publicitara..." intro. It covers production of advertising materials, vehicle and shopfront branding, signage, large-format print, digital print and promotional items. It also describes the service as full-cycle: design, advice, production, assembly, installation and logistics.

## 2. What is actually reusable

**Update 2026-10-27:** the production export is in `old/database/backup/` (client, entity, portofolio, testimonial, user, plus a CSV). The earlier `old/database/*.sql` dumps are placeholder data and are ignored.

**Real content found in the backup:**
- **Services (`entity`): 34 rows.** 21 have real Romanian copy. 10 are just the text "test" (gravura computerizata, panouri publicitare, pliante, foi cu antet, felicitari, ecusoane, obiecte promotionale, alte obiecte promotionale, plus duplicates). Some texts have broken diacritics (`?`) and stray HTML. These texts need cleanup and new copy.
- **Portfolio: 118 images** tagged by service and client, 17 of them "promoted" to the homepage. Best covered: litere volumetrice (16), personalizari auto (12), tablouri canvas (12), casete luminoase (8), carti de vizita (8), tricouri (6).
- **Clients: 13** with name, website and logo (Roman's, Grand Imperial Deluxe, Zoomserie, Emigab, Luxury, Vilextur, Badcom, Filos, Amal Tour, Pensiunea NOEL, Profesional New Consult, O'livio, plus "Diversi" as a catch-all).
- **Testimonials: only test text** ("test testimonial"), so there are no real ones to migrate. New ones must come from the owner.

**Still missing:** the image files those 118 portfolio rows and 13 client logos point to (`gallery/Mese Candy Bar Rm Valcea.jpg` and so on). None of them is in the repo. The repo has 92 other gallery files and about 100 originals in `old/utile/`. The owner needs to download the production `assets/img/gallery/` folder from the server (cPanel File Manager, or FTP) and add it to the repo. Until then, the new site is prototyped with the `utile/` photos.

**Other facts:**
- The logo is a 960x960 JPEG: a green 3D "24", white 3D "PLUS" and grey "MEDIA" on charcoal. Vector tracing is needed for a clean header logo.
- `utile/Canvas/` contains stock or web-sourced images, so check the rights before reuse.
- The old theme's demo images (courses, blog, events) are dropped.
- The `user` table (admin login) is not migrated. The new CMS has its own accounts.

**Decisions made:**
1. "Revista 24 plus" is dropped.
2. Romanian only.
3. A non-technical CMS.
4. The logo is kept; the colours are refreshed (section 6).

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
| Content / CMS | **Sanity Studio** (hosted, free tier) for services, projects, clients and testimonials | Chosen for non-technical editing: a visual editor, drag-and-drop image upload, no code or git. It replaces the hand-made admin. A publish triggers an automatic site rebuild (about a minute). Fallback if the free tier is ever a problem: Storyblok or Payload CMS. |
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
/contact                  Contact + quote request + map
/politica-confidentialitate, /cookie, /termeni
```

Improvements over the old site:
- 35 thin service pages are grouped into 4 category hubs. Services with little content to show are merged with a sibling, with the old URL redirected.
- Each service page gets structured copy (what it is, materials, use cases, process), a project gallery, FAQ and a quote CTA.
- Adds "Cere oferta" (request a quote) in the header and on every page, plus click-to-call, WhatsApp and a floating mobile contact bar.

## 6. UX and visual direction

**Logo:** keep it as is, vectorised. Its character is a bold green 3D "24" with white and grey letters on charcoal, which is a strong, modern sign-industry look.

**Colour proposal.** The old site used six rainbow colours (yellow, red, green, blue, purple, pink), which has no relation to the logo and looks like a template. The new palette takes its colours from the logo:

| Role | Colour | Hex |
|---|---|---|
| Brand green (buttons, links, accents) | Logo green | `#3FAE2A` |
| Green, dark (hover, text on light) | | `#2C7F1D` |
| Green, tint (backgrounds) | | `#EAF6E6` |
| Charcoal (headers, footer, dark sections) | Logo background | `#262626` |
| Ink (body text) | | `#1B1B1B` |
| Grey (secondary text, borders) | Logo "MEDIA" | `#8A8A8A` / `#E5E5E5` |
| Off-white (page background) | | `#FAFAF8` |
| Highlight (one small accent: badges, "new", price hints) | Warm signal orange, as in sign lighting | `#FF7A1A` |

The green reads well on charcoal (it is the logo pairing). On white it is borderline for small text, so body links use the dark green (`#2C7F1D`, contrast above 4.5:1). Four service categories are told apart by icon and label, not by four more colours.

**Layout and style:**
- A large photo-led hero (litere volumetrice at night is the strongest image), a bento-style grid for the four service areas, and a masonry portfolio with a lightbox and service filters.
- A clean type scale: Manrope or Inter for text, with a heavier display weight for headings.
- Subtle motion that respects `prefers-reduced-motion`. A dark footer and a dark "quote" band echo the logo.
- Accessibility: WCAG 2.2 AA, keyboard navigation, real alt text (the old alt text was just filenames).
- Romanian only. No language switcher.

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

## 10. Open questions

Answered: DB export (found in `old/database/backup`), Revista (dropped), languages (RO only), CMS (non-technical, Sanity), logo (keep).

Still open:
1. **The production images.** Please download `assets/img/gallery/` (and the client logos) from the live server and add them to the repo. None of the 118 portfolio files is in the repo yet.
2. **Colour palette:** are you happy with the green + charcoal + orange accent in section 6?
3. **Testimonials:** the DB only has test text. Do you have real client quotes, or should we skip the section until you do?
4. **Quote form:** just a request form (name, phone, email, service, message, optional file), or also a price calculator?
5. **Copy:** 10 services have only the text "test". Should I write the missing text (you review it), or hide those pages for now?
6. **Photo rights** for the stock-looking images in `utile/Canvas/`.
7. **Ownership:** domain, hosting and Google accounts.
8. **Contact details** to confirm: Str. Gib Mihaescu nr. 14, 0745 537 715, contact@24plus.ro, opening hours, WhatsApp number.

## 11. Suggested next steps

1. You answer the open questions in section 10, mainly 1 (images) and 2 (colours).
2. I scaffold `new/` in this repo: Astro + Tailwind, the Sanity schema, an import script for the backup tables, and sample pages built from the real photos.
3. You review a working preview, and then I build out the remaining pages.
