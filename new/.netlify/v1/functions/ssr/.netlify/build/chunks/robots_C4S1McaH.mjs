import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { s as getSite } from "./content_Bnz0wxgQ.mjs";
// src/pages/robots.txt.ts
var robots_txt_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = () => new Response(`User-agent: *\nDisallow: /admin\nDisallow: /api\nSitemap: ${getSite().url}/sitemap.xml\n`, { headers: { "Content-Type": "text/plain" } });
// \0virtual:astro:page:src/pages/robots.txt@_@ts
var page = () => robots_txt_exports;
export { page };
