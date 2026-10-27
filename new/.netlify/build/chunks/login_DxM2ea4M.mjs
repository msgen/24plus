import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { A as renderTemplate, B as createAstro, V as createComponent, j as maybeRenderHead, w as renderComponent } from "./sequence_Bg-Qu6Is.mjs";
import { s as read } from "./store_BJlZ3LJb.mjs";
import { i as login, o as startSession, r as ensureAdmin, s as tooMany, t as currentUser } from "./auth_Cnoz0WMj.mjs";
import "./compiler_BmSJTmnf.mjs";
import { t as $$Admin } from "./Admin_BXG5K8xe.mjs";
import { r as msg } from "./admin_CApa73h6.mjs";
// src/pages/admin/login.astro
var login_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Login,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://24plus.ro");
var $$Login = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Login;
	await ensureAdmin();
	if (await currentUser(Astro.cookies)) return Astro.redirect("/admin");
	const noUsers = (await read("users")).length === 0;
	if (Astro.request.method === "POST") {
		if (await tooMany(`login:${Astro.clientAddress}`, 8, 9e5)) return Astro.redirect(msg("/admin/login", "Prea multe încercări. Încearcă peste 15 minute.", "err"));
		const f = await Astro.request.formData();
		const user = await login(String(f.get("email") ?? ""), String(f.get("password") ?? ""));
		if (!user) return Astro.redirect(msg("/admin/login", "E-mail sau parolă greșite.", "err"));
		const https = process.env.FORCE_HTTPS === "1" || Astro.url.protocol === "https:" || Astro.request.headers.get("x-forwarded-proto") === "https";
		startSession(Astro.cookies, user, https);
		return Astro.redirect("/admin");
	}
	return renderTemplate`${renderComponent($$result, "Admin", $$Admin, { "title": "Autentificare" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<form method="post" class="card max-w-sm space-y-4"><label class="label">E-mail<input class="field" name="email" type="email" autocomplete="username" required autofocus></label><label class="label">Parolă<input class="field" name="password" type="password" autocomplete="current-password" required></label><button class="btn btn-primary w-full">Intră</button></form>${noUsers && renderTemplate`<p class="mt-4 max-w-sm text-sm text-mute">Nu există niciun utilizator. Creează unul cu <code>npm run user:add</code> pe server.</p>`}` })}`;
}, "/home/user/24plus/new/src/pages/admin/login.astro", void 0);
var $$file = "/home/user/24plus/new/src/pages/admin/login.astro";
var $$url = "/admin/login";
// \0virtual:astro:page:src/pages/admin/login@_@astro
var page = () => login_exports;
export { page };
