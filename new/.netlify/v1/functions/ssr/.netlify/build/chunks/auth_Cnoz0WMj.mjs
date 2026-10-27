import { a as newId, i as hit, l as update, s as read, t as DATA_DIR, u as usingNetlify } from "./store_BJlZ3LJb.mjs";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
// src/lib/auth.ts
var secret = (() => {
	if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;
	if (usingNetlify) throw new Error("SESSION_SECRET must be set (Netlify has no persistent disk).");
	const f = path.join(DATA_DIR, ".secret");
	if (!fs.existsSync(f)) fs.writeFileSync(f, crypto.randomBytes(32).toString("hex"), { mode: 384 });
	return fs.readFileSync(f, "utf8");
})();
var bootstrapped = false;
async function ensureAdmin() {
	if (bootstrapped) return;
	bootstrapped = true;
	const { ADMIN_EMAIL: email, ADMIN_PASSWORD: pw, ADMIN_NAME: name } = process.env;
	if (!email || !pw || pw.length < 10) return;
	await update("users", (u) => {
		if (u.length === 0) u.push({
			id: newId(),
			email: email.toLowerCase(),
			name: name ?? "Admin",
			hash: hashPassword(pw)
		});
	});
}
var COOKIE = "24plus_session";
var MAX_AGE = 43200;
function hashPassword(pw) {
	const salt = crypto.randomBytes(16);
	const key = crypto.scryptSync(pw, salt, 64);
	return `scrypt$${salt.toString("hex")}$${key.toString("hex")}`;
}
function verifyPassword(pw, stored) {
	const [, salt, key] = stored.split("$");
	if (!salt || !key) return false;
	const test = crypto.scryptSync(pw, Buffer.from(salt, "hex"), 64);
	const real = Buffer.from(key, "hex");
	return test.length === real.length && crypto.timingSafeEqual(test, real);
}
var sign = (v) => crypto.createHmac("sha256", secret).update(v).digest("hex");
async function setPassword(userId, password) {
	await update("users", (users) => {
		const u = users.find((x) => x.id === userId);
		if (u) u.hash = hashPassword(password);
	});
}
async function login(email, password) {
	await ensureAdmin();
	const u = (await read("users")).find((x) => x.email === email.trim().toLowerCase());
	const ok = verifyPassword(password, u?.hash ?? "scrypt$00$00");
	return u && ok ? u : null;
}
function startSession(cookies, user, secure) {
	const exp = Math.floor(Date.now() / 1e3) + MAX_AGE;
	const payload = `${user.id}.${exp}`;
	cookies.set(COOKIE, `${payload}.${sign(payload)}`, {
		httpOnly: true,
		sameSite: "strict",
		secure,
		path: "/",
		maxAge: MAX_AGE
	});
}
var endSession = (cookies) => cookies.delete(COOKIE, { path: "/" });
async function currentUser(cookies) {
	const raw = cookies.get(COOKIE)?.value;
	if (!raw) return null;
	const [id, exp, mac] = raw.split(".");
	if (!id || !exp || !mac) return null;
	const good = sign(`${id}.${exp}`);
	if (mac.length !== good.length || !crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(good))) return null;
	if (Number(exp) < Date.now() / 1e3) return null;
	return (await read("users")).find((u) => u.id === id) ?? null;
}
async function tooMany(key, max, windowMs) {
	return await hit(key, Math.ceil(windowMs / 1e3)) > max;
}
export { setPassword as a, verifyPassword as c, login as i, endSession as n, startSession as o, ensureAdmin as r, tooMany as s, currentUser as t };
