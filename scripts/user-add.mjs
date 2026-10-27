// Create or reset an admin user:  npm run user:add -- email@example.com "Nume" "parola-lunga"
// Writes straight to DATA_DIR/users.json, so it works without the server running.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const [email, name, password] = process.argv.slice(2);
if (!email || !name || !password || password.length < 10) {
  console.error('Usage: npm run user:add -- <email> "<name>" "<password, min 10 chars>"');
  process.exit(1);
}
const dir = path.resolve(process.env.DATA_DIR ?? 'data');
fs.mkdirSync(dir, { recursive: true });
const f = path.join(dir, 'users.json');
const users = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : [];
const salt = crypto.randomBytes(16);
const hash = `scrypt$${salt.toString('hex')}$${crypto.scryptSync(password, salt, 64).toString('hex')}`;
const existing = users.find((u) => u.email === email.toLowerCase());
if (existing) Object.assign(existing, { name, hash });
else users.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6), email: email.toLowerCase(), name, hash });
fs.writeFileSync(f, JSON.stringify(users, null, 2));
console.log(`${existing ? 'Updated' : 'Created'} user ${email}`);
