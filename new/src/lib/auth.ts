import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import type { AstroCookies } from 'astro';
import { DATA_DIR, read, update, newId, type User } from './store';

const secret = (() => {
  if (process.env.SESSION_SECRET) return process.env.SESSION_SECRET;
  const f = path.join(DATA_DIR, '.secret');
  if (!fs.existsSync(f)) fs.writeFileSync(f, crypto.randomBytes(32).toString('hex'), { mode: 0o600 });
  return fs.readFileSync(f, 'utf8');
})();

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

export function createUser(email: string, name: string, password: string) {
  update('users', (users) => {
    if (users.some((u) => u.email === email.toLowerCase())) throw new Error('Utilizatorul există deja.');
    users.push({ id: newId(), email: email.toLowerCase(), name, hash: hashPassword(password) });
  });
}

export function setPassword(userId: string, password: string) {
  update('users', (users) => { const u = users.find((x) => x.id === userId); if (u) u.hash = hashPassword(password); });
}

export function login(email: string, password: string): User | null {
  const u = read('users').find((x) => x.email === email.trim().toLowerCase());
  // run a hash either way so response time does not reveal whether the account exists
  const ok = verifyPassword(password, u?.hash ?? 'scrypt$00$00');
  return u && ok ? u : null;
}

export function startSession(cookies: AstroCookies, user: User) {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  const payload = `${user.id}.${exp}`;
  cookies.set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true, sameSite: 'strict', secure: import.meta.env.PROD && process.env.INSECURE_COOKIES !== '1', path: '/', maxAge: MAX_AGE,
  });
}
export const endSession = (cookies: AstroCookies) => cookies.delete(COOKIE, { path: '/' });

export function currentUser(cookies: AstroCookies): User | null {
  const raw = cookies.get(COOKIE)?.value;
  if (!raw) return null;
  const [id, exp, mac] = raw.split('.');
  if (!id || !exp || !mac) return null;
  const good = sign(`${id}.${exp}`);
  if (mac.length !== good.length || !crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(good))) return null;
  if (Number(exp) < Date.now() / 1000) return null;
  return read('users').find((u) => u.id === id) ?? null;
}

// Naive in-memory limiter (per process): enough to slow password guessing and form spam.
const hits = new Map<string, number[]>();
export function tooMany(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  list.push(now);
  hits.set(key, list);
  return list.length > max;
}
