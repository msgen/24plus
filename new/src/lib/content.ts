// Read side used by the public pages. Data comes from the CMS store (see store.ts).
import { read, type Category, type Service, type Project, type Client } from './store';
export type { Category, Service, Project, Client };

export function getSite() {
  const s = read('settings');
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

export const getCategories = () => read('categories');
export const getClients = () => read('clients');
export const getProjects = () => read('projects');
export const getTestimonials = () => read('testimonials');
export const getServices = () => read('services').filter((s) => !s.hidden).sort((a, b) => a.order - b.order);

export const servicesIn = (category: string) => getServices().filter((s) => s.category === category);
export const serviceBySlug = (slug: string) => getServices().find((s) => s.slug === slug);
export const projectsFor = (slug: string) => getProjects().filter((p) => p.service === slug);
export const categoryBySlug = (slug: string) => getCategories().find((c) => c.slug === slug)!;
export const serviceUrl = (s: Service) => `/servicii/${s.category}/${s.slug}`;
export const cover = (slug: string) => projectsFor(slug)[0]?.thumb;
