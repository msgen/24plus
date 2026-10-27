import { t as __exportAll } from "./rolldown-runtime_782esTHO.mjs";
import { a as newId, l as update } from "./store_BJlZ3LJb.mjs";
import { s as tooMany } from "./auth_Cnoz0WMj.mjs";
import nodemailer from "nodemailer";
// src/lib/mail.ts
/** Sends the notification e-mail when SMTP_* env vars are set; otherwise a no-op (leads are still stored). */
async function notify(subject, text, replyTo) {
	const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM } = process.env;
	if (!SMTP_HOST || !MAIL_TO) return false;
	await nodemailer.createTransport({
		host: SMTP_HOST,
		port: Number(SMTP_PORT ?? 587),
		secure: Number(SMTP_PORT) === 465,
		auth: SMTP_USER ? {
			user: SMTP_USER,
			pass: SMTP_PASS
		} : void 0,
		connectionTimeout: 8e3,
		greetingTimeout: 8e3,
		socketTimeout: 1e4
	}).sendMail({
		from: MAIL_FROM ?? SMTP_USER ?? MAIL_TO,
		to: MAIL_TO,
		replyTo,
		subject,
		text
	});
	return true;
}
// src/pages/api/quote.ts
var quote_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var clip = (v, n) => String(v ?? "").trim().slice(0, n);
var POST = async ({ request, clientAddress }) => {
	if (await tooMany(`quote:${clientAddress}`, 5, 6e5)) return new Response("Prea multe cereri.", { status: 429 });
	const f = await request.formData();
	if (clip(f.get("website"), 50)) return new Response(null, { status: 204 });
	const lead = {
		id: newId(),
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		status: "nou",
		nume: clip(f.get("nume"), 120),
		telefon: clip(f.get("telefon"), 40),
		email: clip(f.get("email"), 160),
		serviciu: clip(f.get("serviciu"), 120),
		mesaj: clip(f.get("mesaj"), 4e3)
	};
	if (!lead.nume || !lead.telefon || !lead.mesaj) return new Response("Completează numele, telefonul și mesajul.", { status: 400 });
	await update("leads", (l) => {
		l.unshift(lead);
		l.splice(1e3);
	});
	await notify(`Cerere ofertă: ${lead.serviciu || "general"} (${lead.nume})`, `Nume: ${lead.nume}\nTelefon: ${lead.telefon}\nE-mail: ${lead.email}\nServiciu: ${lead.serviciu}\n\n${lead.mesaj}`, /^\S+@\S+$/.test(lead.email) ? lead.email : void 0).catch((e) => console.error("mail failed", e));
	return new Response(null, { status: 204 });
};
// \0virtual:astro:page:src/pages/api/quote@_@ts
var page = () => quote_exports;
export { page };
