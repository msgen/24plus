// Passenger / cPanel "Setup Node.js App" startup file. Passenger needs a plain script
// that starts an http server; the Astro build is ESM, so load it with a dynamic import.
import('./dist/server/entry.mjs').catch((err) => { console.error(err); process.exit(1); });
