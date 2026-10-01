import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
const root=resolve(process.cwd(),'site');
const files=[];
async function walk(dir){for(const n of await readdir(dir)){const p=resolve(dir,n);const s=await stat(p);if(s.isDirectory()) await walk(p); else files.push(p)}}
await walk(root);
const html=files.filter(f=>f.endsWith('.html'));
const required=['index.html','about.html','practice-areas.html','managing-partner.html','insights.html','contact.html','privacy.html','terms.html','legal-notice.html','404.html','500.html','503.html','504.html'];
for(const name of required){if(!files.some(f=>f.endsWith('/'+name))) throw new Error(`Missing required file: ${name}`)}
for(const f of html){
  const t=await readFile(f,'utf8');
  if(/Cecilia Mwaura|0763 338 943|Ruiru Main Stage|cnmlawadvocates/i.test(t)) throw new Error(`Old template content remains in ${f}`);
  if(!t.includes('viewport-fit=cover')) throw new Error(`Responsive viewport missing in ${f}`);
  if(!t.includes('Susan Mute')) throw new Error(`Brand name missing in ${f}`);
  const refs=[...t.matchAll(/(?:src|href)="(\/(?:assets|images)[^"]+)"/g)].map(m=>m[1].split('?')[0]);
  for(const ref of refs){const p=resolve(root,'.'+ref);try{await stat(p)}catch{throw new Error(`Broken local asset ${ref} in ${f}`)}}
}
console.log(`Checks passed: ${html.length} HTML pages, no Cecilia template remnants, local assets resolved.`);
