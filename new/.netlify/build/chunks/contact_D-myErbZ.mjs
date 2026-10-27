import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { A as renderTemplate, N as addAttribute, V as createComponent, j as maybeRenderHead, w as renderComponent } from "./sequence_Bg-Qu6Is.mjs";
import "./compiler_BmSJTmnf.mjs";
import { s as getSite } from "./content_Bnz0wxgQ.mjs";
import { t as $$Base } from "./Base_iLr3pUyY.mjs";
import { t as $$QuoteForm } from "./QuoteForm_GM3R4PYl.mjs";
// src/pages/contact.astro
var contact_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Contact,
	file: () => $$file,
	url: () => $$url
});
var $$Contact = createComponent(($$result, $$props, $$slots) => {
	const site = getSite();
	return renderTemplate`${renderComponent($$result, "Base", $$Base, {
		"title": "Contact",
		"description": `Contactează 24 Plus Media: ${site.address}, ${site.phone}, ${site.email}.`
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="container-x pt-12"><p class="eyebrow">Contact</p><h1 class="mt-2 text-4xl sm:text-5xl">Hai să discutăm proiectul tău</h1><div class="mt-10 grid gap-10 lg:grid-cols-2"><div class="space-y-6"><dl class="space-y-5"><div><dt class="text-xs font-bold uppercase tracking-widest text-mute">Telefon</dt><dd class="mt-1 text-2xl font-extrabold"><a${addAttribute(site.phoneHref, "href")}>${site.phone}</a></dd></div><div><dt class="text-xs font-bold uppercase tracking-widest text-mute">E-mail</dt><dd class="mt-1 text-lg font-bold"><a${addAttribute(`mailto:${site.email}`, "href")}>${site.email}</a></dd></div><div><dt class="text-xs font-bold uppercase tracking-widest text-mute">Adresă</dt><dd class="mt-1 text-lg font-bold">${site.address}</dd></div></dl><iframe title="Harta 24 Plus Media" loading="lazy" class="h-72 w-full rounded-2xl border-0" referrerpolicy="no-referrer-when-downgrade" src="https://www.openstreetmap.org/export/embed.html?bbox=24.34%2C45.09%2C24.40%2C45.12&layer=mapnik"></iframe></div><div id="oferta" class="scroll-mt-24">${renderComponent($$result, "QuoteForm", $$QuoteForm, {})}</div></div></div>` })}`;
}, "/home/user/24plus/new/src/pages/contact.astro", void 0);
var $$file = "/home/user/24plus/new/src/pages/contact.astro";
var $$url = "/contact";
// \0virtual:astro:page:src/pages/contact@_@astro
var page = () => contact_exports;
export { page };
