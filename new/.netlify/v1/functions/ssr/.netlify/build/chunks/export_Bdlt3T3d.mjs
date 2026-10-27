import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { s as read } from "./store_BJlZ3LJb.mjs";
// src/pages/admin/export.json.ts
var export_json_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async () => {
	const names = [
		"categories",
		"services",
		"clients",
		"projects",
		"testimonials",
		"settings",
		"leads"
	];
	const data = { exportedAt: (/* @__PURE__ */ new Date()).toISOString() };
	for (const n of names) data[n] = await read(n);
	return new Response(JSON.stringify(data, null, 2), { headers: {
		"Content-Type": "application/json",
		"Content-Disposition": `attachment; filename="24plus-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json"`
	} });
};
// \0virtual:astro:page:src/pages/admin/export.json@_@ts
var page = () => export_json_exports;
export { page };
