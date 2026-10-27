import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { A as renderTemplate, B as createAstro, N as addAttribute, V as createComponent, j as maybeRenderHead, w as renderComponent } from "./sequence_Bg-Qu6Is.mjs";
import { l as update, s as read } from "./store_BJlZ3LJb.mjs";
import "./compiler_BmSJTmnf.mjs";
import { t as $$Admin } from "./Admin_BXG5K8xe.mjs";
import { a as str, i as slugify, r as msg } from "./admin_CApa73h6.mjs";
// src/pages/admin/servicii/index.astro
var servicii_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://24plus.ro");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	if (Astro.request.method === "POST") {
		const f = await Astro.request.formData();
		const title = str(f, "title", 100);
		const category = str(f, "category");
		if (!title || !(await read("categories")).some((c) => c.slug === category)) return Astro.redirect(msg("/admin/servicii", "Completează titlul și categoria.", "err"));
		let slug = slugify(title);
		const taken = new Set((await read("services")).map((s) => s.slug));
		for (let i = 2; taken.has(slug); i++) slug = `${slugify(title)}-${i}`;
		await update("services", (s) => {
			s.push({
				slug,
				category,
				title,
				order: Math.max(0, ...s.map((x) => x.order)) + 1,
				excerpt: "",
				paragraphs: [],
				hidden: true
			});
		});
		return Astro.redirect(`/admin/servicii/${slug}?ok=${encodeURIComponent("Serviciu creat. Adaugă textul și publică-l.")}`);
	}
	const categories = await read("categories");
	const services = (await read("services")).sort((a, b) => a.order - b.order);
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, { "title": "Servicii" }, { "default": ($$result) => renderTemplate`${categories.map((c) => renderTemplate`${maybeRenderHead($$result)}<section class="mb-8"><h2 class="text-lg">${c.title}</h2><ul class="mt-3 divide-y divide-line rounded-2xl bg-white ring-1 ring-line">${services.filter((s) => s.category === c.slug).map((s) => renderTemplate`<li><a${addAttribute(`/admin/servicii/${s.slug}`, "href")} class="flex items-center justify-between gap-3 px-4 py-3 hover:bg-brand-tint"><span class="font-semibold">${s.title}</span><span${addAttribute(["rounded-full px-3 py-1 text-xs font-bold", s.hidden ? "bg-line text-mute" : "bg-brand-tint text-brand-dark"], "class:list")}>${s.hidden ? "Nepublicat" : s.needsReview ? "Publicat · de verificat" : "Publicat"}</span></a></li>`)}</ul></section>`)}<form method="post" class="card max-w-xl space-y-3"><h2 class="text-lg">Adaugă serviciu</h2><label class="label">Titlu<input class="field" name="title" required maxlength="100"></label><label class="label">Categorie<select class="field" name="category">${categories.map((c) => renderTemplate`<option${addAttribute(c.slug, "value")}>${c.title}</option>`)}</select></label><button class="btn btn-primary btn-sm">Creează</button></form>` })}`;
}, "/home/user/24plus/new/src/pages/admin/servicii/index.astro", void 0);
var $$file = "/home/user/24plus/new/src/pages/admin/servicii/index.astro";
var $$url = "/admin/servicii";
// \0virtual:astro:page:src/pages/admin/servicii/index@_@astro
var page = () => servicii_exports;
export { page };
