import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { d as serviceUrl, o as getServices, r as getCategories, s as getSite } from "./content_Bnz0wxgQ.mjs";
// src/pages/sitemap.xml.ts
var sitemap_xml_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = () => {
	const { url } = getSite();
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
		"/",
		"/servicii",
		"/portofoliu",
		"/clienti",
		"/contact",
		...getCategories().map((c) => `/servicii/${c.slug}`),
		...getServices().map(serviceUrl)
	].map((p) => `<url><loc>${url}${p}</loc></url>`).join("\n")}\n</urlset>`;
	return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
// \0virtual:astro:page:src/pages/sitemap.xml@_@ts
var page = () => sitemap_xml_exports;
export { page };
