import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { A as renderTemplate, B as createAstro, V as createComponent, j as maybeRenderHead, w as renderComponent } from "./sequence_Bg-Qu6Is.mjs";
import "./compiler_BmSJTmnf.mjs";
import { f as servicesIn, r as getCategories } from "./content_Bnz0wxgQ.mjs";
import { t as $$Base } from "./Base_iLr3pUyY.mjs";
import { t as $$ServiceCard } from "./ServiceCard_rtb8TD0w.mjs";
// src/pages/servicii/[category]/index.astro
var _category__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://24plus.ro");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const c = getCategories().find((x) => x.slug === Astro.params.category);
	if (!c) return Astro.rewrite("/404");
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": c.title,
		"description": c.blurb
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="container-x pt-12"><nav class="text-sm text-mute" aria-label="Breadcrumb"><a href="/servicii" class="hover:underline">Servicii</a> / ${c.title}</nav><h1 class="mt-3 text-4xl sm:text-5xl">${c.title}</h1><p class="mt-3 max-w-2xl text-lg text-mute">${c.blurb}</p><div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">${servicesIn(c.slug).map((s) => renderTemplate`${renderComponent($$result, "ServiceCard", $$ServiceCard, { "service": s })}`)}</div></div>` })}`;
}, "/home/user/24plus/new/src/pages/servicii/[category]/index.astro", void 0);
var $$file = "/home/user/24plus/new/src/pages/servicii/[category]/index.astro";
var $$url = "/servicii/[category]";
// \0virtual:astro:page:src/pages/servicii/[category]/index@_@astro
var page = () => _category__exports;
export { page };
