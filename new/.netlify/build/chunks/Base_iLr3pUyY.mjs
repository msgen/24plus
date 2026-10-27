import { A as renderTemplate, B as createAstro, D as renderSlot, M as renderHead, N as addAttribute, R as unescapeHTML, V as createComponent, j as maybeRenderHead, w as renderComponent } from "./sequence_Bg-Qu6Is.mjs";
import "./compiler_BmSJTmnf.mjs";
/* empty css                 */
import { d as serviceUrl, f as servicesIn, r as getCategories, s as getSite } from "./content_Bnz0wxgQ.mjs";
// src/components/Header.astro
createAstro("https://24plus.ro");
var $$Header = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Header;
	const categories = getCategories();
	const site = getSite();
	const path = Astro.url.pathname;
	const links = [
		{
			href: "/portofoliu",
			label: "Portofoliu"
		},
		{
			href: "/clienti",
			label: "Clienți"
		},
		{
			href: "/contact",
			label: "Contact"
		}
	];
	return renderTemplate`${maybeRenderHead($$result)}<header class="sticky top-0 z-40 bg-charcoal text-white"><div class="container-x flex h-16 items-center justify-between gap-4"><a href="/" class="flex items-center" aria-label="24 Plus Media, prima pagină"><img src="/logo.webp" alt="24 Plus Media" width="360" height="222" class="h-11 w-auto"></a><nav class="hidden items-center gap-1 text-sm font-semibold md:flex" aria-label="Principal"><div class="group relative"><a href="/servicii"${addAttribute(["rounded-full px-4 py-2 hover:bg-white/10", path.startsWith("/servicii") && "text-brand"], "class:list")}>Servicii</a><div class="absolute left-0 top-full hidden w-[40rem] rounded-2xl bg-white p-6 text-ink shadow-2xl group-focus-within:block group-hover:block"><div class="grid grid-cols-2 gap-6">${categories.map((c) => renderTemplate`<div><a${addAttribute(`/servicii/${c.slug}`, "href")} class="font-extrabold text-brand-dark hover:underline">${c.title}</a><ul class="mt-2 space-y-1 text-sm font-medium text-mute">${servicesIn(c.slug).map((s) => renderTemplate`<li><a${addAttribute(serviceUrl(s), "href")} class="hover:text-ink hover:underline">${s.title}</a></li>`)}</ul></div>`)}</div></div></div>${links.map((l) => renderTemplate`<a${addAttribute(l.href, "href")}${addAttribute(["rounded-full px-4 py-2 hover:bg-white/10", path.startsWith(l.href) && "text-brand"], "class:list")}>${l.label}</a>`)}<a href="/contact#oferta" class="btn btn-primary ml-2">Cere ofertă</a></nav><details class="md:hidden"><summary class="cursor-pointer list-none rounded-full border border-white/30 px-4 py-2 text-sm font-bold">Meniu</summary><div class="absolute inset-x-0 top-16 max-h-[80vh] overflow-y-auto bg-charcoal px-4 pb-6"><a href="/servicii" class="block py-3 font-bold">Toate serviciile</a>${categories.map((c) => renderTemplate`<a${addAttribute(`/servicii/${c.slug}`, "href")} class="block border-t border-white/10 py-3 text-white/80">${c.title}</a>`)}${links.map((l) => renderTemplate`<a${addAttribute(l.href, "href")} class="block border-t border-white/10 py-3 font-bold">${l.label}</a>`)}<a href="/contact#oferta" class="btn btn-primary mt-3 w-full">Cere ofertă</a><a${addAttribute(site.phoneHref, "href")} class="btn btn-ghost mt-2 w-full">${site.phone}</a></div></details></div></header>`;
}, "/home/user/24plus/new/src/components/Header.astro", void 0);
// src/components/Footer.astro
var $$Footer = createComponent(($$result, $$props, $$slots) => {
	const categories = getCategories();
	const site = getSite();
	return renderTemplate`${maybeRenderHead($$result)}<footer class="mt-24 bg-charcoal text-white/80"><div class="container-x grid gap-10 py-14 md:grid-cols-4"><div><img src="/logo.webp" alt="24 Plus Media" width="360" height="222" class="h-14 w-auto" loading="lazy"><p class="mt-4 text-sm">Producție publicitară, de la design la montaj.</p></div><div><h2 class="text-sm font-bold uppercase tracking-widest text-white">Servicii</h2><ul class="mt-3 space-y-2 text-sm">${categories.map((c) => renderTemplate`<li><a class="hover:text-brand"${addAttribute(`/servicii/${c.slug}`, "href")}>${c.title}</a></li>`)}</ul></div><div><h2 class="text-sm font-bold uppercase tracking-widest text-white">Companie</h2><ul class="mt-3 space-y-2 text-sm"><li><a class="hover:text-brand" href="/portofoliu">Portofoliu</a></li><li><a class="hover:text-brand" href="/clienti">Clienți</a></li><li><a class="hover:text-brand" href="/contact">Contact</a></li><li><a class="hover:text-brand" href="/politica-confidentialitate">Confidențialitate</a></li></ul></div><div><h2 class="text-sm font-bold uppercase tracking-widest text-white">Contact</h2><address class="mt-3 space-y-2 text-sm not-italic"><p>${site.address}</p><p><a class="hover:text-brand"${addAttribute(site.phoneHref, "href")}>${site.phone}</a></p><p><a class="hover:text-brand"${addAttribute(`mailto:${site.email}`, "href")}>${site.email}</a></p><p><a class="hover:text-brand"${addAttribute(site.facebook, "href")} rel="noopener" target="_blank">Facebook</a></p></address></div></div><div class="border-t border-white/10 py-5 text-center text-xs text-white/50">© ${(/* @__PURE__ */ new Date()).getFullYear()} ${site.name}. Toate drepturile rezervate.</div></footer>`;
}, "/home/user/24plus/new/src/components/Footer.astro", void 0);
// src/layouts/Base.astro
createAstro("https://24plus.ro");
var $$Base = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Base;
	const site = getSite();
	const { title, description = site.description, image = "/img/hero.webp", noindex = false } = Astro.props;
	const fullTitle = title === site.name ? `${site.name} | Producție publicitară Râmnicu Vâlcea` : `${title} | ${site.name}`;
	const canonical = new URL(Astro.url.pathname, site.url).href;
	const ld = {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		name: site.name,
		url: site.url,
		telephone: site.phoneE164,
		email: site.email,
		image: new URL("/logo.webp", site.url).href,
		address: {
			"@type": "PostalAddress",
			streetAddress: "Str. Gib Mihăescu nr. 14",
			addressLocality: "Râmnicu Vâlcea",
			addressCountry: "RO"
		},
		sameAs: [site.facebook]
	};
	return renderTemplate`<html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${fullTitle}</title><meta name="description"${addAttribute(description, "content")}><link rel="canonical"${addAttribute(canonical, "href")}><link rel="icon" type="image/png" href="/favicon.png"><link rel="apple-touch-icon" href="/icon-192.png"><meta name="theme-color" content="#262626">${noindex && renderTemplate`<meta name="robots" content="noindex">`}<meta property="og:type" content="website"><meta property="og:locale" content="ro_RO"><meta property="og:title"${addAttribute(fullTitle, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(new URL(image, site.url).href, "content")}><script type="application/ld+json">${unescapeHTML(JSON.stringify(ld))}<\/script>${renderHead($$result)}</head><body><a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">Sari la conținut</a>${renderComponent($$result, "Header", $$Header, {})}<main id="main">${renderSlot($$result, $$slots["default"])}</main>${renderComponent($$result, "Footer", $$Footer, {})}<a${addAttribute(site.phoneHref, "href")} class="btn btn-primary fixed bottom-4 right-4 z-30 shadow-lg md:hidden"${addAttribute(`Sună la ${site.phone}`, "aria-label")}>Sună acum</a></body></html>`;
}, "/home/user/24plus/new/src/layouts/Base.astro", void 0);
export { $$Base as t };
