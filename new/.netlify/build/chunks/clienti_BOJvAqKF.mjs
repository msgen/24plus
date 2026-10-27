import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { A as renderTemplate, N as addAttribute, V as createComponent, j as maybeRenderHead, w as renderComponent } from "./sequence_Bg-Qu6Is.mjs";
import "./compiler_BmSJTmnf.mjs";
import { i as getClients } from "./content_Bnz0wxgQ.mjs";
import { t as $$Base } from "./Base_iLr3pUyY.mjs";
// src/pages/clienti.astro
var clienti_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Clienti,
	file: () => $$file,
	url: () => $$url
});
var $$Clienti = createComponent(($$result, $$props, $$slots) => {
	const clients = getClients();
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "Clienți",
		"description": "Companiile care au ales 24 Plus Media pentru producție publicitară și print."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="container-x pt-12"><p class="eyebrow">Clienți</p><h1 class="mt-2 text-4xl sm:text-5xl">Au lucrat cu noi</h1><ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">${clients.map((c) => renderTemplate`<li class="rounded-2xl bg-white p-6 ring-1 ring-line">${c.logo && renderTemplate`<img${addAttribute(c.logo, "src")} alt="" class="mb-3 h-12 w-auto" loading="lazy">`}<h2 class="text-lg">${c.name}</h2>${c.url && renderTemplate`<a${addAttribute(c.url, "href")} rel="noopener nofollow" target="_blank" class="mt-1 block text-sm font-semibold text-brand-dark hover:underline">${c.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</a>`}</li>`)}</ul></div>` })}`;
}, "/home/user/24plus/new/src/pages/clienti.astro", void 0);
var $$file = "/home/user/24plus/new/src/pages/clienti.astro";
var $$url = "/clienti";
// \0virtual:astro:page:src/pages/clienti@_@astro
var page = () => clienti_exports;
export { page };
