import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { A as renderTemplate, B as createAstro, N as addAttribute, V as createComponent, j as maybeRenderHead, w as renderComponent } from "./sequence_Bg-Qu6Is.mjs";
import { a as newId, l as update, s as read } from "./store_BJlZ3LJb.mjs";
import "./compiler_BmSJTmnf.mjs";
import { t as $$Admin } from "./Admin_BXG5K8xe.mjs";
import { a as str, n as files, r as msg, t as bool } from "./admin_CApa73h6.mjs";
import { n as saveImage, t as removeUpload } from "./images_BJ5a35pZ.mjs";
// src/pages/admin/portofoliu.astro
var portofoliu_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Portofoliu,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://24plus.ro");
var $$Portofoliu = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Portofoliu;
	const filter = Astro.url.searchParams.get("service") ?? "";
	const back = filter ? `/admin/portofoliu?service=${encodeURIComponent(filter)}` : "/admin/portofoliu";
	const services = (await read("services")).sort((a, b) => a.order - b.order);
	if (Astro.request.method === "POST") {
		const f = await Astro.request.formData();
		const action = str(f, "action");
		if (action === "upload") {
			const service = str(f, "service");
			if (!services.some((s) => s.slug === service)) return Astro.redirect(msg(back, "Alege serviciul.", "err"));
			const added = [];
			const errors = [];
			for (const file of files(f, "images")) try {
				added.push({
					id: newId(),
					service,
					...await saveImage(file),
					alt: str(f, "alt", 150) || void 0,
					featured: bool(f, "featured") || void 0,
					createdAt: (/* @__PURE__ */ new Date()).toISOString()
				});
			} catch (e) {
				errors.push(e.message);
			}
			if (added.length) await update("projects", (p) => {
				p.unshift(...added);
			});
			return Astro.redirect(errors.length ? msg(back, errors.join(" "), "err") : msg(back, `${added.length} fotografii adăugate.`));
		}
		const id = str(f, "id");
		if (action === "delete") {
			const p = (await read("projects")).find((x) => x.id === id);
			if (p) {
				await update("projects", (all) => all.filter((x) => x.id !== id));
				await removeUpload(p.thumb);
				if (p.full !== p.thumb) await removeUpload(p.full);
			}
			return Astro.redirect(msg(back, "Fotografie ștearsă."));
		}
		if (action === "save") {
			await update("projects", (all) => {
				const p = all.find((x) => x.id === id);
				if (!p) return;
				const svc = str(f, "service");
				if (services.some((s) => s.slug === svc)) p.service = svc;
				p.alt = str(f, "alt", 150) || void 0;
				p.featured = bool(f, "featured") || void 0;
			});
			return Astro.redirect(msg(back, "Salvat."));
		}
	}
	const all = await read("projects");
	const projects = filter ? all.filter((p) => p.service === filter) : all;
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, { "title": "Portofoliu" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<form method="post" enctype="multipart/form-data" class="card max-w-3xl space-y-4" data-resize="images"${addAttribute(back, "data-back")}><h2 class="text-lg">Adaugă fotografii</h2><input type="hidden" name="action" value="upload"><div class="grid gap-4 sm:grid-cols-2"><label class="label">Serviciu<select class="field" name="service" required><option value="">Alege…</option>${services.map((s) => renderTemplate`<option${addAttribute(s.slug, "value")}${addAttribute(s.slug === filter, "selected")}>${s.title}</option>`)}</select></label><label class="label">Fotografii (JPG/PNG/WebP, max. 15 MB fiecare)<input class="field" type="file" name="images" accept="image/*" multiple required></label></div><label class="label">Descriere imagine (opțional, pentru accesibilitate și Google)<input class="field" name="alt" maxlength="150"></label><label class="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name="featured" class="h-4 w-4"> Afișează pe prima pagină</label><button class="btn btn-primary btn-sm">Încarcă</button><p data-progress role="status" class="text-sm font-semibold"></p></form><div class="mt-8 flex flex-wrap items-center gap-2 text-sm"><a href="/admin/portofoliu"${addAttribute(["rounded-full px-3 py-1 font-semibold", !filter ? "bg-charcoal text-white" : "bg-white ring-1 ring-line"], "class:list")}>Toate (${all.length})</a>${services.filter((s) => all.some((p) => p.service === s.slug)).map((s) => renderTemplate`<a${addAttribute(`/admin/portofoliu?service=${s.slug}`, "href")}${addAttribute(["rounded-full px-3 py-1 font-semibold", filter === s.slug ? "bg-charcoal text-white" : "bg-white ring-1 ring-line"], "class:list")}>${s.title}</a>`)}</div><ul class="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">${projects.map((p) => renderTemplate`<li class="card space-y-3"><img${addAttribute(p.thumb, "src")}${addAttribute(p.alt ?? "", "alt")} loading="lazy" class="aspect-[4/3] w-full rounded-lg object-cover"><form method="post" class="space-y-2"><input type="hidden" name="id"${addAttribute(p.id, "value")}><select class="field" name="service">${services.map((s) => renderTemplate`<option${addAttribute(s.slug, "value")}${addAttribute(s.slug === p.service, "selected")}>${s.title}</option>`)}</select><input class="field" name="alt"${addAttribute(p.alt ?? "", "value")} placeholder="Descriere imagine" maxlength="150"><label class="flex items-center gap-2 text-xs font-semibold"><input type="checkbox" name="featured"${addAttribute(!!p.featured, "checked")} class="h-4 w-4"> Pe prima pagină</label><div class="flex gap-2"><button name="action" value="save" class="btn btn-dark btn-sm">Salvează</button><button name="action" value="delete" class="btn btn-danger btn-sm" onclick="return confirm('Ștergi fotografia?')">Șterge</button></div></form></li>`)}</ul>` })}`;
}, "/home/user/24plus/new/src/pages/admin/portofoliu.astro", void 0);
var $$file = "/home/user/24plus/new/src/pages/admin/portofoliu.astro";
var $$url = "/admin/portofoliu";
// \0virtual:astro:page:src/pages/admin/portofoliu@_@astro
var page = () => portofoliu_exports;
export { page };
