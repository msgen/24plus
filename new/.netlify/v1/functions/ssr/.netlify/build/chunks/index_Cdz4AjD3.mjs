import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { A as renderTemplate, N as addAttribute, V as createComponent, j as maybeRenderHead, w as renderComponent } from "./sequence_Bg-Qu6Is.mjs";
import { s as read } from "./store_BJlZ3LJb.mjs";
import "./compiler_BmSJTmnf.mjs";
import { t as $$Admin } from "./Admin_BXG5K8xe.mjs";
// src/pages/admin/index.astro
var admin_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const fresh = (await read("leads")).filter((l) => l.status === "nou");
	const stats = [
		[
			"Cereri noi",
			fresh.length,
			"/admin/cereri"
		],
		[
			"Servicii publicate",
			(await read("services")).filter((s) => !s.hidden).length,
			"/admin/servicii"
		],
		[
			"Fotografii",
			(await read("projects")).length,
			"/admin/portofoliu"
		],
		[
			"Clienți",
			(await read("clients")).length,
			"/admin/clienti"
		]
	];
	const draft = (await read("services")).filter((s) => s.hidden);
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, { "title": "Panou" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">${stats.map(([label, n, href]) => renderTemplate`<a${addAttribute(href, "href")} class="card hover:shadow-md"><p class="text-3xl font-extrabold">${n}</p><p class="text-sm text-mute">${label}</p></a>`)}</div><section class="mt-8"><h2 class="text-lg">Cereri noi</h2>${fresh.length === 0 ? renderTemplate`<p class="mt-2 text-sm text-mute">Nicio cerere nouă.</p>` : renderTemplate`<ul class="mt-3 space-y-3">${fresh.slice(0, 5).map((l) => renderTemplate`<li class="card"><p class="font-bold">${l.nume} · <a class="text-brand-dark"${addAttribute(`tel:${l.telefon}`, "href")}>${l.telefon}</a></p><p class="text-sm text-mute">${l.serviciu || "General"} · ${new Date(l.createdAt).toLocaleString("ro-RO")}</p><p class="mt-2 whitespace-pre-line text-sm">${l.mesaj}</p></li>`)}</ul>`}</section>${draft.length > 0 && renderTemplate`<section class="mt-8"><h2 class="text-lg">Servicii nepublicate (${draft.length})</h2><p class="mt-1 text-sm text-mute">Nu au text și nu apar pe site: ${draft.map((s) => s.title).join(", ")}.</p></section>`}` })}`;
}, "/home/user/24plus/new/src/pages/admin/index.astro", void 0);
var $$file = "/home/user/24plus/new/src/pages/admin/index.astro";
var $$url = "/admin";
// \0virtual:astro:page:src/pages/admin/index@_@astro
var page = () => admin_exports;
export { page };
