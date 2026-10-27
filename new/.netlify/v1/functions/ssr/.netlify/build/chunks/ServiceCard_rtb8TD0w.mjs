import { A as renderTemplate, B as createAstro, N as addAttribute, V as createComponent, j as maybeRenderHead } from "./sequence_Bg-Qu6Is.mjs";
import "./compiler_BmSJTmnf.mjs";
import { d as serviceUrl, n as cover } from "./content_Bnz0wxgQ.mjs";
// src/components/ServiceCard.astro
createAstro("https://24plus.ro");
var $$ServiceCard = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$ServiceCard;
	const { service } = Astro.props;
	const img = cover(service.slug);
	return renderTemplate`${maybeRenderHead($$result)}<a${addAttribute(serviceUrl(service), "href")} class="group block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-line transition hover:-translate-y-1 hover:shadow-lg"><div class="aspect-[4/3] overflow-hidden bg-brand-tint">${img ? renderTemplate`<img${addAttribute(img, "src")}${addAttribute(service.title, "alt")} loading="lazy" width="640" height="480" class="h-full w-full object-cover transition duration-500 group-hover:scale-105">` : renderTemplate`<div class="grid h-full place-items-center text-6xl font-extrabold text-brand/40">24+</div>`}</div><div class="p-5"><h3 class="text-lg">${service.title}</h3><p class="mt-1 text-sm text-mute">${service.excerpt}</p></div></a>`;
}, "/home/user/24plus/new/src/components/ServiceCard.astro", void 0);
export { $$ServiceCard as t };
