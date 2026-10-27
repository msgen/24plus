import { n as current } from "./snapshot-context_DZYKdPiy.mjs";
// src/lib/content.ts
function getSite() {
	const s = current().settings;
	const digits = s.phone.replace(/[^\d+]/g, "").replace(/^0/, "+40");
	return {
		...s,
		name: "24 Plus Media",
		url: process.env.SITE_URL ?? "https://24plus.ro",
		phoneHref: `tel:${digits}`,
		phoneE164: digits,
		description: "Producție publicitară în Râmnicu Vâlcea: litere volumetrice, firme luminoase, personalizări auto, print mare și digital, obiecte promoționale."
	};
}
var getCategories = () => current().categories;
var getClients = () => current().clients;
var getProjects = () => current().projects;
var getTestimonials = () => current().testimonials;
var getServices = () => current().services.filter((s) => !s.hidden).sort((a, b) => a.order - b.order);
var servicesIn = (category) => getServices().filter((s) => s.category === category);
var serviceBySlug = (slug) => getServices().find((s) => s.slug === slug);
var projectsFor = (slug) => getProjects().filter((p) => p.service === slug);
var categoryBySlug = (slug) => getCategories().find((c) => c.slug === slug);
var serviceUrl = (s) => `/servicii/${s.category}/${s.slug}`;
var cover = (slug) => projectsFor(slug)[0]?.thumb;
export { getProjects as a, getTestimonials as c, serviceUrl as d, servicesIn as f, getClients as i, projectsFor as l, cover as n, getServices as o, getCategories as r, getSite as s, categoryBySlug as t, serviceBySlug as u };
