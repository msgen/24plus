// Single data layer. Today it reads JSON produced by scripts/import.mjs;
// swap these functions for Sanity queries when the CMS is connected.
import categoriesJson from '../data/categories.json';
import servicesJson from '../data/services.json';
import clientsJson from '../data/clients.json';
import projectsJson from '../data/projects.json';

export type Category = (typeof categoriesJson)[number];
export type Service = (typeof servicesJson)[number];
export type Project = (typeof projectsJson)[number];
export type Client = (typeof clientsJson)[number];

export const site = {
  name: '24 Plus Media',
  url: 'https://24plus.ro',
  phone: '0745 537 715',
  phoneHref: 'tel:+40745537715',
  email: 'contact@24plus.ro',
  address: 'Str. Gib Mihăescu nr. 14, Râmnicu Vâlcea',
  facebook: 'https://www.facebook.com/24plus.ro/',
  description:
    'Producție publicitară în Râmnicu Vâlcea: litere volumetrice, firme luminoase, personalizări auto, print mare și digital, obiecte promoționale.',
};

export const categories: Category[] = categoriesJson;
export const clients: Client[] = clientsJson;
export const projects: Project[] = projectsJson;
export const services: Service[] = servicesJson.filter((s) => !s.hidden).sort((a, b) => a.order - b.order);

export const servicesIn = (category: string) => services.filter((s) => s.category === category);
export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const projectsFor = (slug: string) => projects.filter((p) => p.service === slug);
export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug)!;
export const serviceUrl = (s: Service) => `/servicii/${s.category}/${s.slug}`;
export const cover = (slug: string) => projectsFor(slug)[0]?.thumb;
