import { A as renderTemplate, B as createAstro, D as renderSlot, M as renderHead, N as addAttribute, V as createComponent } from "./sequence_Bg-Qu6Is.mjs";
import "./compiler_BmSJTmnf.mjs";
/* empty css                 */
// src/layouts/Admin.astro
createAstro("https://24plus.ro");
var $$Admin = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Admin;
	const { title } = Astro.props;
	const user = Astro.locals.user;
	const ok = Astro.url.searchParams.get("ok");
	const err = Astro.url.searchParams.get("err");
	const nav = [
		["/admin", "Panou"],
		["/admin/cereri", "Cereri ofertă"],
		["/admin/servicii", "Servicii"],
		["/admin/portofoliu", "Portofoliu"],
		["/admin/clienti", "Clienți"],
		["/admin/testimoniale", "Testimoniale"],
		["/admin/setari", "Setări"]
	];
	const path = Astro.url.pathname;
	return renderTemplate`<html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${title} · Administrare 24plus</title><script src="/admin.js" defer><\/script><link rel="icon" href="/favicon.png">${renderHead($$result)}</head><body class="bg-paper"><div class="min-h-screen md:grid md:grid-cols-[14rem_1fr]"><aside class="bg-charcoal p-4 text-white md:sticky md:top-0 md:h-screen"><a href="/admin" class="flex items-center gap-2"><img src="/logo.webp" alt="24 Plus" class="h-10 w-auto"><span class="text-xs font-bold uppercase tracking-widest text-white/60">Admin</span></a>${user && renderTemplate`<nav class="mt-5 flex flex-wrap gap-1 md:flex-col" aria-label="Administrare">${nav.map(([href, label]) => renderTemplate`<a${addAttribute(href, "href")}${addAttribute(["rounded-lg px-3 py-2 text-sm font-semibold hover:bg-white/10", (href === "/admin" ? path === "/admin" : path.startsWith(href)) && "bg-white/10 text-brand"], "class:list")}>${label}</a>`)}<a href="/" target="_blank" class="rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/10">Vezi site-ul ↗</a><form method="post" action="/admin/logout" class="md:mt-6"><button class="w-full rounded-lg px-3 py-2 text-left text-sm text-white/70 hover:bg-white/10">Ieșire (${user.name})</button></form></nav>`}</aside><main class="min-w-0 p-5 sm:p-8"><h1 class="text-2xl">${title}</h1>${ok && renderTemplate`<p role="status" class="mt-4 rounded-lg bg-brand-tint px-4 py-3 text-sm font-semibold text-brand-dark">${ok}</p>`}${err && renderTemplate`<p role="alert" class="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">${err}</p>`}<div class="mt-6">${renderSlot($$result, $$slots["default"])}</div></main></div></body></html>`;
}, "/home/user/24plus/new/src/layouts/Admin.astro", void 0);
export { $$Admin as t };
