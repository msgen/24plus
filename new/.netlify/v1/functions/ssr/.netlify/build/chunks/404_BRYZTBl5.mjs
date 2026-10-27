import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { A as renderTemplate, V as createComponent, j as maybeRenderHead, w as renderComponent } from "./sequence_Bg-Qu6Is.mjs";
import "./compiler_BmSJTmnf.mjs";
import { t as $$Base } from "./Base_iLr3pUyY.mjs";
// src/pages/404.astro
var _404_exports = /* @__PURE__ */ __exportAll({
	default: () => $$404,
	file: () => $$file,
	url: () => $$url
});
var $$404 = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "Pagina nu a fost găsită",
		"noindex": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="container-x py-24 text-center"><p class="eyebrow">Eroare 404</p><h1 class="mt-2 text-5xl">Pagina nu există</h1><p class="mt-3 text-mute">Poate a fost mutată. Încearcă de la prima pagină sau din lista de servicii.</p><div class="mt-6 flex justify-center gap-3"><a href="/" class="btn btn-primary">Prima pagină</a><a href="/servicii" class="btn btn-dark">Servicii</a></div></div>` })}`;
}, "/home/user/24plus/new/src/pages/404.astro", void 0);
var $$file = "/home/user/24plus/new/src/pages/404.astro";
var $$url = "/404";
// \0virtual:astro:page:src/pages/404@_@astro
var page = () => _404_exports;
export { page };
