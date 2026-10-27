import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { n as endSession } from "./auth_Cnoz0WMj.mjs";
// src/pages/admin/logout.ts
var logout_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = ({ cookies, redirect }) => {
	endSession(cookies);
	return redirect("/admin/login");
};
// \0virtual:astro:page:src/pages/admin/logout@_@ts
var page = () => logout_exports;
export { page };
