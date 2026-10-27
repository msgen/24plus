import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { r as getImage } from "./store_BJlZ3LJb.mjs";
import path from "node:path";
// src/pages/uploads/[...path].ts
var ____path__exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	prerender: () => false
});
var GET = async ({ params }) => {
	const name = path.basename(params.path ?? "");
	if (!name.endsWith(".webp")) return new Response("Not found", { status: 404 });
	const buf = await getImage(name);
	if (!buf) return new Response("Not found", { status: 404 });
	return new Response(buf, { headers: {
		"Content-Type": "image/webp",
		"Cache-Control": "public, max-age=31536000, immutable"
	} });
};
// \0virtual:astro:page:src/pages/uploads/[...path]@_@ts
var page = () => ____path__exports;
export { page };
