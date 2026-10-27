// src/lib/admin.ts
var slugify = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "element";
var str = (f, k, max = 500) => String(f.get(k) ?? "").trim().slice(0, max);
var bool = (f, k) => f.get(k) === "on";
var files = (f, k) => f.getAll(k).filter((x) => x instanceof File && x.size > 0);
var msg = (path, text, kind = "ok") => `${path}${path.includes("?") ? "&" : "?"}${kind}=${encodeURIComponent(text)}`;
export { str as a, slugify as i, files as n, msg as r, bool as t };
