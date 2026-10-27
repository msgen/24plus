import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { A as renderTemplate, N as addAttribute, V as createComponent, j as maybeRenderHead, w as renderComponent } from "./sequence_Bg-Qu6Is.mjs";
import "./compiler_BmSJTmnf.mjs";
import { s as getSite } from "./content_Bnz0wxgQ.mjs";
import { t as $$Base } from "./Base_iLr3pUyY.mjs";
// src/pages/politica-confidentialitate.astro
var politica_confidentialitate_exports = /* @__PURE__ */ __exportAll({
	default: () => $$PoliticaConfidentialitate,
	file: () => $$file,
	url: () => $$url
});
var $$PoliticaConfidentialitate = createComponent(($$result, $$props, $$slots) => {
	const site = getSite();
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "Politica de confidențialitate",
		"noindex": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="container-x max-w-3xl pt-12"><h1 class="text-4xl">Politica de confidențialitate</h1><div class="mt-6 space-y-4 text-mute"><p>Acest text este un model provizoriu și trebuie revizuit și completat de operator (date de identificare, CUI, temei legal) înainte de lansare.</p><p>Folosim datele trimise prin formularul de ofertă (nume, telefon, e-mail, mesaj) doar pentru a răspunde solicitării tale. Nu le vindem și nu le oferim terților.</p><p>Poți cere accesul, corectarea sau ștergerea datelor scriindu-ne la <a class="font-bold text-brand-dark"${addAttribute(`mailto:${site.email}`, "href")}>${site.email}</a>.</p></div></div>` })}`;
}, "/home/user/24plus/new/src/pages/politica-confidentialitate.astro", void 0);
var $$file = "/home/user/24plus/new/src/pages/politica-confidentialitate.astro";
var $$url = "/politica-confidentialitate";
// \0virtual:astro:page:src/pages/politica-confidentialitate@_@astro
var page = () => politica_confidentialitate_exports;
export { page };
