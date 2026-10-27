// Builds a tar.gz to upload to cPanel:  npm run package  ->  deploy/24plus-app.tar.gz
import { execSync } from 'node:child_process';
import fs from 'node:fs';
execSync('npm run build', { stdio: 'inherit' });
fs.mkdirSync('deploy', { recursive: true });
const out = 'deploy/24plus-app.tar.gz';
execSync(`tar -czf ${out} dist app.cjs package.json package-lock.json scripts/user-add.mjs`, { stdio: 'inherit' });
console.log(`\nCreated ${out} (${(fs.statSync(out).size / 1e6).toFixed(1)} MB). Upload it to the app folder and extract.`);
