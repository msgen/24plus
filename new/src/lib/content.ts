// Read side used by the public pages. Data comes from the per-request snapshot (see snapshot-context.ts).
import { current } from './snapshot-context';
import type { Category, Service, Project, Client } from './store';
export type { Category, Service, Project, Client };

export function getSite() {
  const s = current().settings;
  const digits = s.phone.replace(/[^\d+]/g, '').replace(/^0/, '+40');
  return {
    ...s,
    name: '24 Plus Media',
    url: process.env.SITE_URL ?? 'https://24plus.ro',
    phoneHref: `tel:${digits}`,
    phoneE164: digits,
    description: 'Producție publicitară în Râmnicu Vâlcea: litere volumetrice, firme luminoase, personalizări auto, print mare și digital, obiecte promoționale.',
  };
}

export const getCategories = () => current().categories;
export const getClients = () => current().clients;
export const getProjects = () => current().projects;
export const getTestimonials = () => current().testimonials;
export const getServices = () => current().services.filter((s) => !s.hidden).sort((a, b) => a.order - b.order);

export const servicesIn = (category: string) => getServices().filter((s) => s.category === category);
export const serviceBySlug = (slug: string) => getServices().find((s) => s.slug === slug);
export const projectsFor = (slug: string) => getProjects().filter((p) => p.service === slug);
export const categoryBySlug = (slug: string) => getCategories().find((c) => c.slug === slug)!;
export const serviceUrl = (s: Service) => `/servicii/${s.category}/${s.slug}`;
export const cover = (slug: string) => projectsFor(slug)[0]?.thumb;
