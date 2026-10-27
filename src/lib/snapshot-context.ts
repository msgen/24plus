// Per-request snapshot of the content collections, so templates can read content synchronously.
// The middleware loads it once (one blob read on Netlify) and runs the request inside this context.
import { AsyncLocalStorage } from 'node:async_hooks';
import type { Snapshot } from './store';

export const ctx = new AsyncLocalStorage<Snapshot>();
export function current(): Snapshot {
  const s = ctx.getStore();
  if (!s) throw new Error('Content requested outside a request context (middleware did not run).');
  return s;
}
