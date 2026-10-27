import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { A as renderTemplate, B as createAstro, N as addAttribute, T as Fragment, V as createComponent, j as maybeRenderHead, w as renderComponent } from "./sequence_Bg-Qu6Is.mjs";
import { l as update, s as read } from "./store_BJlZ3LJb.mjs";
import "./compiler_BmSJTmnf.mjs";
import { t as $$Admin } from "./Admin_BXG5K8xe.mjs";
import { r as msg } from "./admin_CApa73h6.mjs";
// src/pages/admin/cereri.astro
var cereri_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Cereri,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://24plus.ro");
var $$Cereri = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Cereri;
	if (Astro.request.method === "POST") {
		const f = await Astro.request.formData();
		const id = String(f.get("id"));
		const action = String(f.get("action"));
		await update("leads", (l) => {
			const i = l.findIndex((x) => x.id === id);
			if (i < 0) return;
			if (action === "delete") l.splice(i, 1);
			else l[i].status = l[i].status === "nou" ? "rezolvat" : "nou";
		});
		return Astro.redirect(msg("/admin/cereri", "Actualizat."));
	}
	const leads = await read("leads");
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, { "title": "Cereri de ofertă" }, { "default": ($$result) => renderTemplate`${leads.length === 0 && renderTemplate`${maybeRenderHead($$result)}<p class="text-mute">Nu ai primit cereri încă.</p>`}<ul class="space-y-3">${leads.map((l) => renderTemplate`<li${addAttribute(["card", l.status === "nou" && "ring-2 ring-brand"], "class:list")}><div class="flex flex-wrap items-start justify-between gap-3"><div><p class="font-bold">${l.nume} · <a class="text-brand-dark"${addAttribute(`tel:${l.telefon}`, "href")}>${l.telefon}</a>${l.email && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` · <a class="text-brand-dark"${addAttribute(`mailto:${l.email}`, "href")}>${l.email}</a>` })}`}</p><p class="text-sm text-mute">${l.serviciu || "General"} · ${new Date(l.createdAt).toLocaleString("ro-RO")} · ${l.status}</p></div><form method="post" class="flex gap-2"><input type="hidden" name="id"${addAttribute(l.id, "value")}><button name="action" value="toggle" class="btn btn-dark btn-sm">${l.status === "nou" ? "Marchează rezolvat" : "Redeschide"}</button><button name="action" value="delete" class="btn btn-danger btn-sm" onclick="return confirm('Ștergi cererea?')">Șterge</button></form></div><p class="mt-3 whitespace-pre-line text-sm">${l.mesaj}</p></li>`)}</ul>` })}`;
}, "/home/user/24plus/new/src/pages/admin/cereri.astro", void 0);
var $$file = "/home/user/24plus/new/src/pages/admin/cereri.astro";
var $$url = "/admin/cereri";
// \0virtual:astro:page:src/pages/admin/cereri@_@astro
var page = () => cereri_exports;
export { page };
