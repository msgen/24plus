import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { A as renderTemplate, B as createAstro, N as addAttribute, T as Fragment, V as createComponent, j as maybeRenderHead, w as renderComponent } from "./sequence_Bg-Qu6Is.mjs";
import { l as update, s as read } from "./store_BJlZ3LJb.mjs";
import "./compiler_BmSJTmnf.mjs";
import { t as $$Admin } from "./Admin_BXG5K8xe.mjs";
import { a as str, r as msg, t as bool } from "./admin_CApa73h6.mjs";
// src/pages/admin/servicii/[slug].astro
var _slug__exports = /* @__PURE__ */ __exportAll({
	default: () => $$Slug,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://24plus.ro");
var $$Slug = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Slug;
	const slug = Astro.params.slug;
	const categories = await read("categories");
	const found = (await read("services")).find((s) => s.slug === slug);
	if (!found) return Astro.redirect(msg("/admin/servicii", "Serviciul nu există.", "err"));
	if (Astro.request.method === "POST") {
		const f = await Astro.request.formData();
		if (str(f, "action") === "delete") {
			await update("services", (s) => s.filter((x) => x.slug !== slug));
			return Astro.redirect(msg("/admin/servicii", "Serviciu șters."));
		}
		const category = str(f, "category");
		const paragraphs = str(f, "paragraphs", 8e3).split(/\n\s*\n/).map((p) => p.replace(/\s+/g, " ").trim()).filter(Boolean);
		const publish = bool(f, "published");
		if (publish && paragraphs.length === 0) return Astro.redirect(msg(Astro.url.pathname, "Adaugă text înainte de publicare.", "err"));
		await update("services", (all) => {
			const s = all.find((x) => x.slug === slug);
			s.title = str(f, "title", 100) || s.title;
			if (categories.some((c) => c.slug === category)) s.category = category;
			s.excerpt = str(f, "excerpt", 200);
			s.paragraphs = paragraphs;
			s.order = Number(f.get("order")) || s.order;
			s.hidden = !publish;
			s.needsReview = false;
		});
		return Astro.redirect(msg(Astro.url.pathname, "Salvat."));
	}
	const s = found;
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, { "title": s.title }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<p class="mb-4 text-sm"><a href="/admin/servicii" class="text-brand-dark hover:underline">← Toate serviciile</a>${!s.hidden && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result) => renderTemplate` · <a class="text-brand-dark hover:underline"${addAttribute(`/servicii/${s.category}/${s.slug}`, "href")} target="_blank">Vezi pe site ↗</a>` })}`}</p>${s.needsReview && renderTemplate`<p class="mb-4 rounded-lg bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-800">Textul a fost rescris automat și nu a fost verificat. Citește-l, corectează-l și apasă Salvează.</p>`}<form method="post" class="card max-w-3xl space-y-4"><label class="label">Titlu<input class="field" name="title"${addAttribute(s.title, "value")} required maxlength="100"></label><div class="grid gap-4 sm:grid-cols-2"><label class="label">Categorie<select class="field" name="category">${categories.map((c) => renderTemplate`<option${addAttribute(c.slug, "value")}${addAttribute(c.slug === s.category, "selected")}>${c.title}</option>`)}</select></label><label class="label">Ordine în listă<input class="field" name="order" type="number"${addAttribute(s.order, "value")}></label></div><label class="label">Descriere scurtă (apare pe carduri și în Google, max. 200 caractere)<input class="field" name="excerpt"${addAttribute(s.excerpt, "value")} maxlength="200"></label><label class="label">Text (separă paragrafele cu un rând gol)<textarea class="field" name="paragraphs" rows="10">${s.paragraphs.join("\n\n")}</textarea></label><label class="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name="published"${addAttribute(!s.hidden, "checked")} class="h-4 w-4"> Publicat pe site</label><div class="flex flex-wrap gap-3"><button class="btn btn-primary btn-sm">Salvează</button><button name="action" value="delete" class="btn btn-danger btn-sm" formnovalidate onclick="return confirm('Ștergi definitiv serviciul?')">Șterge serviciul</button></div></form><p class="mt-4 text-sm text-mute">Fotografiile serviciului se adaugă din <a class="text-brand-dark hover:underline"${addAttribute(`/admin/portofoliu?service=${s.slug}`, "href")}>Portofoliu</a>.</p>` })}`;
}, "/home/user/24plus/new/src/pages/admin/servicii/[slug].astro", void 0);
var $$file = "/home/user/24plus/new/src/pages/admin/servicii/[slug].astro";
var $$url = "/admin/servicii/[slug]";
// \0virtual:astro:page:src/pages/admin/servicii/[slug]@_@astro
var page = () => _slug__exports;
export { page };
