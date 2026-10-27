import { AsyncLocalStorage } from "node:async_hooks";
// src/lib/snapshot-context.ts
var ctx = new AsyncLocalStorage();
function current() {
	const s = ctx.getStore();
	if (!s) throw new Error("Content requested outside a request context (middleware did not run).");
	return s;
}
export { current as n, ctx as t };
