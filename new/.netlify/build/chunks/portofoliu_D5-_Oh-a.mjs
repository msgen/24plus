import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { A as renderTemplate, N as addAttribute, V as createComponent, j as maybeRenderHead, w as renderComponent } from "./sequence_Bg-Qu6Is.mjs";
import { t as renderScript } from "./script_B0-kqB3j.mjs";
import "./compiler_BmSJTmnf.mjs";
import { a as getProjects, o as getServices } from "./content_Bnz0wxgQ.mjs";
import { t as $$Base } from "./Base_iLr3pUyY.mjs";
// src/pages/portofoliu.astro
var portofoliu_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Portofoliu,
	file: () => $$file,
	url: () => $$url
});
var $$Portofoliu = createComponent(($$result, $$props, $$slots) => {
	const projects = getProjects();
	const filters = getServices().filter((s) => projects.some((p) => p.service === s.slug));
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "Portofoliu",
		"description": "Lucrări realizate de 24 Plus Media: litere volumetrice, firme luminoase, personalizări auto, vitrine și multe altele."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="container-x pt-12"><p class="eyebrow">Portofoliu</p><h1 class="mt-2 text-4xl sm:text-5xl">Lucrările noastre</h1><div class="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filtrează lucrările"><button class="filter btn btn-dark" data-filter="all" aria-pressed="true">Toate</button>${filters.map((s) => renderTemplate`<button class="filter btn border border-line bg-white hover:bg-brand-tint"${addAttribute(s.slug, "data-filter")} aria-pressed="false">${s.title}</button>`)}</div><div class="mt-8" id="grid"><ul class="columns-2 gap-3 sm:columns-3 [&amp;&gt;li]:mb-3">${projects.map((p) => renderTemplate`<li class="break-inside-avoid"${addAttribute(p.service, "data-service")}><button type="button"${addAttribute(p.full, "data-full")}${addAttribute(p.service, "data-alt")} class="block w-full overflow-hidden rounded-xl bg-line"><img${addAttribute(p.thumb, "src")}${addAttribute(p.alt || `Lucrare ${p.service.replace(/-/g, " ")}`, "alt")} loading="lazy" width="640" height="480" class="w-full transition duration-500 hover:scale-105"></button></li>`)}</ul></div><dialog id="lightbox" class="m-auto max-h-[92vh] max-w-[94vw] rounded-xl bg-transparent p-0 backdrop:bg-black/85"><form method="dialog"><button class="btn btn-primary absolute right-3 top-3">Închide</button></form><img id="lightbox-img" alt="" class="max-h-[92vh] max-w-[94vw] rounded-xl object-contain"></dialog></div>` })}${renderScript($$result, "/home/user/24plus/new/src/pages/portofoliu.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/user/24plus/new/src/pages/portofoliu.astro", void 0);
var $$file = "/home/user/24plus/new/src/pages/portofoliu.astro";
var $$url = "/portofoliu";
// \0virtual:astro:page:src/pages/portofoliu@_@astro
var page = () => portofoliu_exports;
export { page };
