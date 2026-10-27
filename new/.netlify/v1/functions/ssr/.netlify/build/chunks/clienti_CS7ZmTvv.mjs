import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { A as renderTemplate, B as createAstro, N as addAttribute, V as createComponent, j as maybeRenderHead, w as renderComponent } from "./sequence_Bg-Qu6Is.mjs";
import { l as update, s as read } from "./store_BJlZ3LJb.mjs";
import "./compiler_BmSJTmnf.mjs";
import { t as $$Admin } from "./Admin_BXG5K8xe.mjs";
import { a as str, n as files, r as msg } from "./admin_CApa73h6.mjs";
import { n as saveImage, t as removeUpload } from "./images_BJ5a35pZ.mjs";
// src/pages/admin/clienti.astro
var clienti_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Clienti,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://24plus.ro");
var $$Clienti = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Clienti;
	const cleanUrl = (u) => (u && !/^https?:\/\//.test(u) ? `https://${u}` : u) || null;
	if (Astro.request.method === "POST") {
		const f = await Astro.request.formData();
		const action = str(f, "action");
		const id = Number(f.get("id"));
		try {
			if (action === "add") {
				const name = str(f, "name", 100);
				if (!name) throw new Error("Numele este obligatoriu.");
				const logo = files(f, "logo")[0];
				const saved = logo ? await saveImage(logo, {
					thumb: false,
					width: 400
				}) : null;
				await update("clients", (c) => {
					c.push({
						id: Math.max(0, ...c.map((x) => x.id)) + 1,
						name,
						url: cleanUrl(str(f, "url", 200)),
						logo: saved?.full ?? null
					});
				});
			} else if (action === "save") {
				const logo = files(f, "logo")[0];
				const saved = logo ? await saveImage(logo, {
					thumb: false,
					width: 400
				}) : null;
				let old;
				await update("clients", (c) => {
					const x = c.find((k) => k.id === id);
					if (!x) return;
					x.name = str(f, "name", 100) || x.name;
					x.url = cleanUrl(str(f, "url", 200));
					if (saved) {
						old = x.logo;
						x.logo = saved.full;
					}
				});
				await removeUpload(old);
			} else if (action === "delete") {
				let old;
				await update("clients", (c) => {
					old = c.find((k) => k.id === id)?.logo;
					return c.filter((k) => k.id !== id);
				});
				await removeUpload(old);
			}
		} catch (e) {
			return Astro.redirect(msg("/admin/clienti", e.message, "err"));
		}
		return Astro.redirect(msg("/admin/clienti", "Salvat."));
	}
	const clients = await read("clients");
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, { "title": "Clienți" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<form method="post" enctype="multipart/form-data" class="card max-w-3xl space-y-3"><h2 class="text-lg">Adaugă client</h2><input type="hidden" name="action" value="add"><div class="grid gap-3 sm:grid-cols-3"><label class="label">Nume<input class="field" name="name" required maxlength="100"></label><label class="label">Site (opțional)<input class="field" name="url" maxlength="200" placeholder="https://"></label><label class="label">Logo (opțional)<input class="field" type="file" name="logo" accept="image/*"></label></div><button class="btn btn-primary btn-sm">Adaugă</button></form><ul class="mt-6 space-y-3">${clients.map((c) => renderTemplate`<li class="card"><form method="post" enctype="multipart/form-data" class="grid items-end gap-3 sm:grid-cols-[1fr_1fr_1fr_auto]"><input type="hidden" name="id"${addAttribute(c.id, "value")}><label class="label">Nume<input class="field" name="name"${addAttribute(c.name, "value")} required></label><label class="label">Site<input class="field" name="url"${addAttribute(c.url ?? "", "value")}></label><label class="label">Logo ${c.logo && renderTemplate`<img${addAttribute(c.logo, "src")} alt="" class="mb-1 h-8 w-auto">`}<input class="field" type="file" name="logo" accept="image/*"></label><div class="flex gap-2"><button name="action" value="save" class="btn btn-dark btn-sm">Salvează</button><button name="action" value="delete" class="btn btn-danger btn-sm" onclick="return confirm('Ștergi clientul?')">Șterge</button></div></form></li>`)}</ul>` })}`;
}, "/home/user/24plus/new/src/pages/admin/clienti.astro", void 0);
var $$file = "/home/user/24plus/new/src/pages/admin/clienti.astro";
var $$url = "/admin/clienti";
// \0virtual:astro:page:src/pages/admin/clienti@_@astro
var page = () => clienti_exports;
export { page };
