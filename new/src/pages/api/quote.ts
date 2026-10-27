import type { APIRoute } from 'astro';
import { update, newId } from '../../lib/store';
import { tooMany } from '../../lib/auth';
import { notify } from '../../lib/mail';

export const prerender = false;
const clip = (v: FormDataEntryValue | null, n: number) => String(v ?? '').trim().slice(0, n);

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (tooMany(`quote:${clientAddress}`, 5, 10 * 60_000)) return new Response('Prea multe cereri.', { status: 429 });
  const f = await request.formData();
  if (clip(f.get('website'), 50)) return new Response(null, { status: 204 }); // honeypot: pretend success
  const lead = {
    id: newId(), createdAt: new Date().toISOString(), status: 'nou' as const,
    nume: clip(f.get('nume'), 120), telefon: clip(f.get('telefon'), 40), email: clip(f.get('email'), 160),
    serviciu: clip(f.get('serviciu'), 120), mesaj: clip(f.get('mesaj'), 4000),
  };
  if (!lead.nume || !lead.telefon || !lead.mesaj) return new Response('Completează numele, telefonul și mesajul.', { status: 400 });
  update('leads', (l) => { l.unshift(lead); l.splice(1000); });
  notify(
    `Cerere ofertă: ${lead.serviciu || 'general'} (${lead.nume})`,
    `Nume: ${lead.nume}\nTelefon: ${lead.telefon}\nE-mail: ${lead.email}\nServiciu: ${lead.serviciu}\n\n${lead.mesaj}`,
    /^\S+@\S+$/.test(lead.email) ? lead.email : undefined,
  ).catch((e) => console.error('mail failed', e));
  return new Response(null, { status: 204 });
};
