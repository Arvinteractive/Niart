import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

const read = (path) => readFileSync(path, 'utf8');
const policy = JSON.parse(read('vercel.json')).headers[0].headers
  .find(({ key }) => key === 'Content-Security-Policy')?.value;
assert(policy, 'Production must have a Content Security Policy.');
for (const page of ['index', 'privacy', 'terms', '404']) {
  const html = read(`dist/${page}.html`);
  assert(!html.includes('hello@niart.in'), `${page}: unverified email must not ship.`);
  assert(!html.includes('https://niart.in'), `${page}: metadata must use the canonical www host.`);
  for (const script of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\bsrc=/.test(script[1])) continue;
    const hash = createHash('sha256').update(script[2]).digest('base64');
    assert(policy.includes(`'sha256-${hash}'`), `${page}: inline script must match the CSP hash.`);
  }
  for (const asset of html.matchAll(/(?:src|href)="(\/assets\/[^"#?]+)"/g)) {
    assert(existsSync(`dist${asset[1]}`), `${page}: missing built asset ${asset[1]}`);
  }
}
const home = read('dist/index.html');
const graph = JSON.parse(home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
const studio = graph['@graph'].find((item) => item.name === 'NIART Designer Studio' && item.address);
assert(!studio.geo && !studio.email, 'Unverified studio coordinates and email must not ship.');
assert(studio.sameAs.includes('https://www.instagram.com/niart_designerstudio/'));
assert(/<noscript>[\s\S]*Contact the studio on Instagram[\s\S]*<\/noscript>/.test(home), 'The contact fallback must only display when JavaScript is disabled.');
assert(/rel="preload"[^>]*as="image"/.test(home), 'The hero image must be discoverable in the HTML.');
assert(read('dist/robots.txt').includes('https://www.niart.in/sitemap.xml'));
assert(read('dist/sitemap.xml').includes('<loc>https://www.niart.in/</loc>'));
assert(read('dist/third-party-licenses.md').includes('Permission is hereby granted'), 'Bundled MIT notices must ship.');
console.log('Production assets, contact fallback, SEO metadata, licence notices and CSP checks passed.');
