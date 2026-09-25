import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = new URL('../dist/', import.meta.url);
const forbidden = [
  /Arende/i,
  /Kevin Arende/i,
  /CLIENT TO CONFIRM/i,
  /lorem ipsum/i,
  /prospect presentation/i,
  /supabase/i,
  /nairobi-skyline/i,
  /#24152e/i,
  /#5e315f/i,
  /#b56a73/i,
];

async function walk(dir) {
  const items = [];
  for (const name of await readdir(dir)) {
    const path = join(dir, name);
    if ((await stat(path)).isDirectory()) items.push(...await walk(path));
    else items.push(path);
  }
  return items;
}

const files = await walk(root.pathname);
const html = files.filter((file) => file.endsWith('.html'));
const failures = [];

for (const file of html) {
  const source = await readFile(file, 'utf8');
  for (const pattern of forbidden) {
    if (pattern.test(source)) failures.push(`${relative(root.pathname, file)} contains ${pattern}`);
  }
  for (const required of ['<title>', 'name="description"', 'rel="canonical"', '<main', '</main>', '<h1']) {
    if (!source.includes(required)) failures.push(`${relative(root.pathname, file)} missing ${required}`);
  }
  const localLinks = [...source.matchAll(/href="(\/[^"]*)"/g)].map((match) => match[1].split('#')[0]).filter(Boolean);
  for (const link of localLinks) {
    if (link === '/' || link.includes('.') || link.startsWith('/assets/')) continue;
    const candidate = join(root.pathname, `${link.replace(/^\//, '')}.html`);
    const nested = join(root.pathname, link.replace(/^\//, ''), 'index.html');
    try { await stat(candidate); } catch {
      try { await stat(nested); } catch { failures.push(`${relative(root.pathname, file)} has unresolved link ${link}`); }
    }
  }
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Checked ${html.length} HTML pages: metadata, core landmarks, forbidden residue and internal links pass.`);
