import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { A as renderTemplate, B as createAstro, N as addAttribute, V as createComponent, j as maybeRenderHead, w as renderComponent } from "./sequence_Bg-Qu6Is.mjs";
import { a as newId, l as update, s as read } from "./store_BJlZ3LJb.mjs";
import "./compiler_BmSJTmnf.mjs";
import { t as $$Admin } from "./Admin_BXG5K8xe.mjs";
import { a as str, r as msg } from "./admin_CApa73h6.mjs";
// src/pages/admin/testimoniale.astro
var testimoniale_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Testimoniale,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://24plus.ro");
var $$Testimoniale = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Testimoniale;
	if (Astro.request.method === "POST") {
		const f = await Astro.request.formData();
		const action = str(f, "action");
		const id = str(f, "id");
		if (action === "add") {
			const author = str(f, "author", 100);
			const text = str(f, "text", 800);
			if (!author || !text) return Astro.redirect(msg("/admin/testimoniale", "Completează numele și textul.", "err"));
			await update("testimonials", (t) => {
				t.push({
					id: newId(),
					author,
					company: str(f, "company", 100) || void 0,
					text
				});
			});
		} else if (action === "save") await update("testimonials", (t) => {
			const x = t.find((k) => k.id === id);
			if (x) {
				x.author = str(f, "author", 100) || x.author;
				x.company = str(f, "company", 100) || void 0;
				x.text = str(f, "text", 800) || x.text;
			}
		});
		else if (action === "delete") await update("testimonials", (t) => t.filter((k) => k.id !== id));
		return Astro.redirect(msg("/admin/testimoniale", "Salvat."));
	}
	const items = await read("testimonials");
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, { "title": "Testimoniale" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<p class="mb-4 max-w-2xl text-sm text-mute">Secțiunea apare pe prima pagină doar dacă există cel puțin un testimonial.</p><form method="post" class="card max-w-3xl space-y-3"><h2 class="text-lg">Adaugă testimonial</h2><input type="hidden" name="action" value="add"><div class="grid gap-3 sm:grid-cols-2"><label class="label">Nume<input class="field" name="author" required maxlength="100"></label><label class="label">Firmă (opțional)<input class="field" name="company" maxlength="100"></label></div><label class="label">Text<textarea class="field" name="text" rows="3" required maxlength="800"></textarea></label><button class="btn btn-primary btn-sm">Adaugă</button></form><ul class="mt-6 space-y-3">${items.map((t) => renderTemplate`<li class="card"><form method="post" class="space-y-3"><input type="hidden" name="id"${addAttribute(t.id, "value")}><div class="grid gap-3 sm:grid-cols-2"><label class="label">Nume<input class="field" name="author"${addAttribute(t.author, "value")}></label><label class="label">Firmă<input class="field" name="company"${addAttribute(t.company ?? "", "value")}></label></div><label class="label">Text<textarea class="field" name="text" rows="3">${t.text}</textarea></label><div class="flex gap-2"><button name="action" value="save" class="btn btn-dark btn-sm">Salvează</button><button name="action" value="delete" class="btn btn-danger btn-sm" onclick="return confirm('Ștergi testimonialul?')">Șterge</button></div></form></li>`)}</ul>` })}`;
}, "/home/user/24plus/new/src/pages/admin/testimoniale.astro", void 0);
var $$file = "/home/user/24plus/new/src/pages/admin/testimoniale.astro";
var $$url = "/admin/testimoniale";
// \0virtual:astro:page:src/pages/admin/testimoniale@_@astro
var page = () => testimoniale_exports;
export { page };
