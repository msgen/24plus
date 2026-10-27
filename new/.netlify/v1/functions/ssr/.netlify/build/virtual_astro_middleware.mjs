import { pt as defineMiddleware, t as sequence } from "./chunks/sequence_Bg-Qu6Is.mjs";
import { c as snapshot } from "./chunks/store_BJlZ3LJb.mjs";
import { t as currentUser } from "./chunks/auth_Cnoz0WMj.mjs";
import { t as ctx } from "./chunks/snapshot-context_DZYKdPiy.mjs";
// src/middleware.ts
function crossSite(req) {
	if ([
		"GET",
		"HEAD",
		"OPTIONS"
	].includes(req.method)) return false;
	const origin = req.headers.get("origin");
	if (!origin) return req.headers.get("sec-fetch-site") === "cross-site";
	const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
	try {
		return new URL(origin).host !== host;
	} catch {
		return true;
	}
}
var onRequest$1 = defineMiddleware(async (ctx$1, next) => {
	const path = ctx$1.url.pathname;
	if (crossSite(ctx$1.request)) return new Response("Cross-site request blocked", { status: 403 });
	if (path.startsWith("/admin")) {
		const user = await currentUser(ctx$1.cookies);
		ctx$1.locals.user = user;
		if (!user && path !== "/admin/login") return ctx$1.redirect("/admin/login");
	}
	let res;
	if (path.startsWith("/api") || path.startsWith("/uploads")) res = await next();
	else {
		const snap = await snapshot();
		res = await ctx.run(snap, async () => {
			const r = await next();
			if (!(r.headers.get("content-type") ?? "").includes("text/html")) return r;
			return new Response(await r.text(), {
				status: r.status,
				statusText: r.statusText,
				headers: r.headers
			});
		});
	}
	if (path.startsWith("/admin")) {
		res.headers.set("Cache-Control", "no-store");
		res.headers.set("X-Robots-Tag", "noindex");
	}
	res.headers.set("X-Content-Type-Options", "nosniff");
	res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
	res.headers.set("X-Frame-Options", "SAMEORIGIN");
	return res;
});
// \0virtual:astro:middleware
var onRequest = sequence(onRequest$1);
export { onRequest };
