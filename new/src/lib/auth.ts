import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import type { AstroCookies } from 'astro';
import { DATA_DIR, read, update, newId, hit, usingNetlify, type User } from './store';

const secret = (() => {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;
  if (usingNetlify) throw new Error('SESSION_SECRET must be set (Netlify has no persistent disk).');
  const f = path.join(DATA_DIR, '.secret'); // local/VPS convenience: generated once
  if (!fs.existsSync(f)) fs.writeFileSync(f, crypto.randomBytes(32).toString('hex'), { mode: 0o600 });
  return fs.readFileSync(f, 'utf8');
})();

// First start (no terminal needed): create the admin from env vars if no user exists yet.
let bootstrapped = false;
export async function ensureAdmin() {
  if (bootstrapped) return;
  bootstrapped = true;
  const { ADMIN_EMAIL: email, ADMIN_PASSWORD: pw, ADMIN_NAME: name } = process.env;
  if (!email || !pw || pw.length < 10) return;
  await update('users', (u) => { if (u.length === 0) u.push({ id: newId(), email: email.toLowerCase(), name: name ?? 'Admin', hash: hashPassword(pw) }); });
}

const COOKIE = '24plus_session';
const MAX_AGE = 60 * 60 * 12; // 12 h

export function hashPassword(pw: string) {
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(pw, salt, 64);
  return `scrypt$${salt.toString('hex')}$${key.toString('hex')}`;
}
export function verifyPassword(pw: string, stored: string) {
  const [, salt, key] = stored.split('$');
  if (!salt || !key) return false;
  const test = crypto.scryptSync(pw, Buffer.from(salt, 'hex'), 64);
  const real = Buffer.from(key, 'hex');
  return test.length === real.length && crypto.timingSafeEqual(test, real);
}

const sign = (v: string) => crypto.createHmac('sha256', secret).update(v).digest('hex');

export async function createUser(email: string, name: string, password: string) {
  await update('users', (users) => {
    if (users.some((u) => u.email === email.toLowerCase())) throw new Error('Utilizatorul există deja.');
    users.push({ id: newId(), email: email.toLowerCase(), name, hash: hashPassword(password) });
  });
}

export async function setPassword(userId: string, password: string) {
  await update('users', (users) => { const u = users.find((x) => x.id === userId); if (u) u.hash = hashPassword(password); });
}

export async function login(email: string, password: string): Promise<User | null> {
  await ensureAdmin();
  const u = (await read('users')).find((x) => x.email === email.trim().toLowerCase());
  // run a hash either way so response time does not reveal whether the account exists
  const ok = verifyPassword(password, u?.hash ?? 'scrypt$00$00');
  return u && ok ? u : null;
}

export function startSession(cookies: AstroCookies, user: User, secure: boolean) {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const payload = `${user.id}.${exp}`;
  cookies.set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true, sameSite: 'strict', secure, path: '/', maxAge: MAX_AGE,
  });
}
export const endSession = (cookies: AstroCookies) => cookies.delete(COOKIE, { path: '/' });

export async function currentUser(cookies: AstroCookies): Promise<User | null> {
  const raw = cookies.get(COOKIE)?.value;
  if (!raw) return null;
  const [id, exp, mac] = raw.split('.');
  if (!id || !exp || !mac) return null;
  const good = sign(`${id}.${exp}`);
  if (mac.length !== good.length || !crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(good))) return null;
  if (Number(exp) < Date.now() / 1000) return null;
  return (await read('users')).find((u) => u.id === id) ?? null;
}

// Rate limit (Redis-backed on Vercel, in-memory locally). True = limit exceeded.
export async function tooMany(key: string, max: number, windowMs: number) {
  return (await hit(key, Math.ceil(windowMs / 1000))) > max;
}
