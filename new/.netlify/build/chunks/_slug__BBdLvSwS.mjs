import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { A as renderTemplate, B as createAstro, N as addAttribute, V as createComponent, j as maybeRenderHead, w as renderComponent } from "./sequence_Bg-Qu6Is.mjs";
import { t as renderScript } from "./script_B0-kqB3j.mjs";
import "./compiler_BmSJTmnf.mjs";
import { f as servicesIn, l as projectsFor, s as getSite, t as categoryBySlug, u as serviceBySlug } from "./content_Bnz0wxgQ.mjs";
import { t as $$Base } from "./Base_iLr3pUyY.mjs";
import { t as $$QuoteForm } from "./QuoteForm_GM3R4PYl.mjs";
import { t as $$ServiceCard } from "./ServiceCard_rtb8TD0w.mjs";
// src/components/Gallery.astro
createAstro("https://24plus.ro");
var $$Gallery = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Gallery;
	const { items, alt } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<ul class="columns-2 gap-3 sm:columns-3 [&amp;&gt;li]:mb-3">${items.map((p, i) => renderTemplate`<li class="break-inside-avoid"><button type="button"${addAttribute(p.full, "data-full")}${addAttribute(`${alt} ${i + 1}`, "data-alt")} class="block w-full overflow-hidden rounded-xl bg-line"><img${addAttribute(p.thumb, "src")}${addAttribute(`${alt} ${i + 1}`, "alt")} loading="lazy" width="640" height="480" class="w-full transition duration-500 hover:scale-105"></button></li>`)}</ul><dialog id="lightbox" class="m-auto max-h-[92vh] max-w-[94vw] rounded-xl bg-transparent p-0 backdrop:bg-black/85"><form method="dialog"><button class="btn btn-primary absolute right-3 top-3" aria-label="Închide">Închide</button></form><img id="lightbox-img" alt="" class="max-h-[92vh] max-w-[94vw] rounded-xl object-contain"></dialog>${renderScript($$result, "/home/user/24plus/new/src/components/Gallery.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/user/24plus/new/src/components/Gallery.astro", void 0);
// src/pages/servicii/[category]/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://24plus.ro");
var $$Slug = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const site = getSite();
	const s = serviceBySlug(Astro.params.slug);
	if (!s || s.category !== Astro.params.category) return Astro.rewrite("/404");
	const cat = categoryBySlug(s.category);
	const gallery = projectsFor(s.slug);
	const related = servicesIn(s.category).filter((x) => x.slug !== s.slug).slice(0, 3);
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": s.title,
		"description": s.excerpt,
		"image": gallery[0]?.full
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="container-x pt-12"><nav class="text-sm text-mute" aria-label="Breadcrumb"><a href="/servicii" class="hover:underline">Servicii</a> / <a${addAttribute(`/servicii/${cat.slug}`, "href")} class="hover:underline">${cat.title}</a> / ${s.title}</nav><div class="mt-4 grid gap-10 lg:grid-cols-[1.4fr_1fr]"><div><h1 class="text-4xl sm:text-5xl">${s.title}</h1><div class="mt-6 space-y-4 text-lg text-mute">${s.paragraphs.map((p) => renderTemplate`<p>${p}</p>`)}</div><div class="mt-8 flex flex-wrap gap-3"><a href="#oferta" class="btn btn-primary">Cere ofertă</a><a${addAttribute(site.phoneHref, "href")} class="btn btn-dark">${site.phone}</a></div></div>${gallery[0] && renderTemplate`<img${addAttribute(gallery[0].full, "src")}${addAttribute(s.title, "alt")} width="1600" class="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg" fetchpriority="high">`}</div>${gallery.length > 0 && renderTemplate`<section class="mt-14"><h2 class="text-2xl">Lucrări realizate</h2><div class="mt-5">${renderComponent($$result, "Gallery", $$Gallery, {
		"items": gallery,
		"alt": s.title
	})}</div></section>`}<section id="oferta" class="mt-16 grid scroll-mt-24 gap-8 lg:grid-cols-2"><div><p class="eyebrow">Ofertă</p><h2 class="mt-2 text-3xl">Spune-ne ce ai nevoie</h2><p class="mt-3 text-mute">Completează formularul și revenim cu o ofertă. Preferi telefonul? Sună la <a class="font-bold text-brand-dark"${addAttribute(site.phoneHref, "href")}>${site.phone}</a>.</p></div>${renderComponent($$result, "QuoteForm", $$QuoteForm, { "service": s.slug })}</section>${related.length > 0 && renderTemplate`<section class="mt-16"><h2 class="text-2xl">Vezi și</h2><div class="mt-5 grid gap-5 sm:grid-cols-3">${related.map((r) => renderTemplate`${renderComponent($$result, "ServiceCard", $$ServiceCard, { "service": r })}`)}</div></section>`}</div>` })}`;
}, "/home/user/24plus/new/src/pages/servicii/[category]/[slug].astro", void 0);
var $$file = "/home/user/24plus/new/src/pages/servicii/[category]/[slug].astro";
var $$url = "/servicii/[category]/[slug]";
// \0virtual:astro:page:src/pages/servicii/[category]/[slug]@_@astro
var page = () => _slug__exports;
export { page };
