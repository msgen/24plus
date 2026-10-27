import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { A as renderTemplate, B as createAstro, N as addAttribute, V as createComponent, j as maybeRenderHead, w as renderComponent } from "./sequence_Bg-Qu6Is.mjs";
import { l as update, s as read } from "./store_BJlZ3LJb.mjs";
import { a as setPassword, c as verifyPassword } from "./auth_Cnoz0WMj.mjs";
import "./compiler_BmSJTmnf.mjs";
import { t as $$Admin } from "./Admin_BXG5K8xe.mjs";
import { a as str, r as msg } from "./admin_CApa73h6.mjs";
// src/pages/admin/setari.astro
var setari_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Setari,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://24plus.ro");
var $$Setari = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Setari;
	const user = Astro.locals.user;
	if (Astro.request.method === "POST") {
		const f = await Astro.request.formData();
		if (str(f, "action") === "password") {
			const next = String(f.get("new") ?? "");
			if (!verifyPassword(String(f.get("current") ?? ""), user.hash)) return Astro.redirect(msg("/admin/setari", "Parola curentă este greșită.", "err"));
			if (next.length < 10) return Astro.redirect(msg("/admin/setari", "Parola nouă trebuie să aibă minim 10 caractere.", "err"));
			await setPassword(user.id, next);
			return Astro.redirect(msg("/admin/setari", "Parola a fost schimbată."));
		}
		await update("settings", (s) => {
			s.phone = str(f, "phone", 30) || s.phone;
			s.email = str(f, "email", 100) || s.email;
			s.address = str(f, "address", 200) || s.address;
			s.facebook = str(f, "facebook", 200);
			s.heroTitle = str(f, "heroTitle", 120) || s.heroTitle;
			s.heroSubtitle = str(f, "heroSubtitle", 300);
			s.intro = str(f, "intro", 3e3).split(/\n\s*\n/).map((p) => p.replace(/\s+/g, " ").trim()).filter(Boolean);
		});
		return Astro.redirect(msg("/admin/setari", "Setări salvate."));
	}
	const s = await read("settings");
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, { "title": "Setări" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<form method="post" class="card max-w-3xl space-y-4"><h2 class="text-lg">Date firmă și prima pagină</h2><div class="grid gap-4 sm:grid-cols-2"><label class="label">Telefon<input class="field" name="phone"${addAttribute(s.phone, "value")} required></label><label class="label">E-mail<input class="field" name="email" type="email"${addAttribute(s.email, "value")} required></label></div><label class="label">Adresă<input class="field" name="address"${addAttribute(s.address, "value")} required></label><label class="label">Pagina de Facebook<input class="field" name="facebook"${addAttribute(s.facebook, "value")}></label><label class="label">Titlu prima pagină<input class="field" name="heroTitle"${addAttribute(s.heroTitle, "value")} maxlength="120"></label><label class="label">Subtitlu prima pagină<input class="field" name="heroSubtitle"${addAttribute(s.heroSubtitle, "value")} maxlength="300"></label><label class="label">Text „Despre noi” (paragrafe separate prin rând gol)<textarea class="field" name="intro" rows="8">${s.intro.join("\n\n")}</textarea></label><button class="btn btn-primary btn-sm">Salvează</button></form><section class="card mt-8 max-w-md space-y-2"><h2 class="text-lg">Copie de siguranță</h2><p class="text-sm text-mute">Descarcă textele, serviciile, clienții, lista de fotografii și cererile primite. Fotografiile în sine rămân stocate separat.</p><a href="/admin/export.json" class="btn btn-dark btn-sm">Descarcă backup</a></section><form method="post" class="card mt-8 max-w-md space-y-3"><h2 class="text-lg">Schimbă parola</h2><input type="hidden" name="action" value="password"><label class="label">Parola curentă<input class="field" name="current" type="password" autocomplete="current-password" required></label><label class="label">Parola nouă (minim 10 caractere)<input class="field" name="new" type="password" autocomplete="new-password" minlength="10" required></label><button class="btn btn-dark btn-sm">Schimbă parola</button></form>` })}`;
}, "/home/user/24plus/new/src/pages/admin/setari.astro", void 0);
var $$file = "/home/user/24plus/new/src/pages/admin/setari.astro";
var $$url = "/admin/setari";
// \0virtual:astro:page:src/pages/admin/setari@_@astro
var page = () => setari_exports;
export { page };
