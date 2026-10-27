import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { A as renderTemplate, N as addAttribute, V as createComponent, j as maybeRenderHead, w as renderComponent } from "./sequence_Bg-Qu6Is.mjs";
import "./compiler_BmSJTmnf.mjs";
import { f as servicesIn, r as getCategories } from "./content_Bnz0wxgQ.mjs";
import { t as $$Base } from "./Base_iLr3pUyY.mjs";
import { t as $$ServiceCard } from "./ServiceCard_rtb8TD0w.mjs";
// src/pages/servicii/index.astro
var servicii_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const categories = getCategories();
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "Servicii",
		"description": "Toate serviciile 24 Plus Media: producție publicitară, printuri mari, print digital și obiecte promoționale."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="container-x pt-12"><p class="eyebrow">Servicii</p><h1 class="mt-2 text-4xl sm:text-5xl">Tot ce ai nevoie pentru vizibilitate</h1>${categories.map((c) => renderTemplate`<section class="mt-14"><div class="flex items-end justify-between gap-4"><div><h2 class="text-2xl">${c.title}</h2><p class="mt-1 text-mute">${c.blurb}</p></div><a${addAttribute(`/servicii/${c.slug}`, "href")} class="hidden text-sm font-bold text-brand-dark hover:underline sm:block">Vezi categoria →</a></div><div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">${servicesIn(c.slug).map((s) => renderTemplate`${renderComponent($$result, "ServiceCard", $$ServiceCard, { "service": s })}`)}</div></section>`)}</div>` })}`;
}, "/home/user/24plus/new/src/pages/servicii/index.astro", void 0);
var $$file = "/home/user/24plus/new/src/pages/servicii/index.astro";
var $$url = "/servicii";
// \0virtual:astro:page:src/pages/servicii/index@_@astro
var page = () => servicii_exports;
export { page };
