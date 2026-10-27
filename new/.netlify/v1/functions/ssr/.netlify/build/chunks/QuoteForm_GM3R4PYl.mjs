import { A as renderTemplate, B as createAstro, N as addAttribute, V as createComponent, j as maybeRenderHead } from "./sequence_Bg-Qu6Is.mjs";
import { t as renderScript } from "./script_B0-kqB3j.mjs";
import "./compiler_BmSJTmnf.mjs";
import { o as getServices } from "./content_Bnz0wxgQ.mjs";
// src/components/QuoteForm.astro
createAstro("https://24plus.ro");
var $$QuoteForm = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$QuoteForm;
	const services = getServices();
	const { service = "" } = Astro.props;
	return renderTemplate`${maybeRenderHead($$result)}<form id="quote" class="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line" novalidate><div class="grid gap-4 sm:grid-cols-2"><label class="block text-sm font-semibold">Nume<input name="nume" required autocomplete="name" class="mt-1 w-full rounded-lg border border-line px-3 py-2.5 font-normal"></label><label class="block text-sm font-semibold">Telefon<input name="telefon" required type="tel" autocomplete="tel" class="mt-1 w-full rounded-lg border border-line px-3 py-2.5 font-normal"></label></div><label class="block text-sm font-semibold">E-mail<input name="email" type="email" autocomplete="email" class="mt-1 w-full rounded-lg border border-line px-3 py-2.5 font-normal"></label><label class="block text-sm font-semibold">Ce te interesează?<select name="serviciu" class="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2.5 font-normal"><option value="">Alege un serviciu (opțional)</option>${services.map((s) => renderTemplate`<option${addAttribute(s.title, "value")}${addAttribute(s.slug === service, "selected")}>${s.title}</option>`)}</select></label><label class="block text-sm font-semibold">Detalii<textarea name="mesaj" rows="4" required class="mt-1 w-full rounded-lg border border-line px-3 py-2.5 font-normal" placeholder="Dimensiuni, cantitate, termen..."></textarea></label><input name="website" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true"><p class="text-xs text-mute">Prin trimitere ești de acord cu <a class="underline" href="/politica-confidentialitate">politica de confidențialitate</a>.</p><button class="btn btn-primary w-full" type="submit">Trimite cererea</button><p id="quote-status" role="status" class="text-sm font-semibold"></p></form>${renderScript($$result, "/home/user/24plus/new/src/components/QuoteForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/user/24plus/new/src/components/QuoteForm.astro", void 0);
export { $$QuoteForm as t };
