import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, relative } from 'node:path';

const root=resolve(process.cwd(),'site');
const files=[];
async function walk(dir){for(const n of await readdir(dir)){const p=resolve(dir,n);const s=await stat(p);if(s.isDirectory()) await walk(p); else files.push(p)}}
await walk(root);
const html=files.filter(f=>f.endsWith('.html'));
const required=['index.html','about.html','practice-areas.html','managing-partner.html','insights.html','contact.html','privacy.html','terms.html','legal-notice.html','404.html','500.html','503.html','504.html'];
for(const name of required){if(!files.some(f=>f.endsWith('/'+name))) throw new Error(`Missing required file: ${name}`)}
const errorPages=new Set(['404.html','500.html','503.html','504.html']);
let indexable=0;
for(const f of html){
  const t=await readFile(f,'utf8');
  const rel=relative(root,f);
  if(/Cecilia Mwaura|0763 338 943|Ruiru Main Stage|cnmlawadvocates/i.test(t)) throw new Error(`Old template content remains in ${rel}`);
  if(!t.includes('viewport-fit=cover')) throw new Error(`Responsive viewport missing in ${rel}`);
  if(!t.includes('Susan Mute')) throw new Error(`Brand name missing in ${rel}`);
  const title=t.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim()||'';
  const desc=t.match(/<meta name="description" content="([^"]+)"/i)?.[1]?.trim()||'';
  const canon=t.match(/<link rel="canonical" href="([^"]+)"/i)?.[1]?.trim()||'';
  const robots=t.match(/<meta name="robots" content="([^"]+)"/i)?.[1]?.trim()||'';
  const h1=(t.match(/<h1\b/gi)||[]).length;
  if(!title) throw new Error(`Missing title in ${rel}`);
  if(!desc) throw new Error(`Missing meta description in ${rel}`);
  if(!canon.startsWith('https://susan-mute-company-advocates.pages.dev/')) throw new Error(`Bad canonical in ${rel}`);
  if(h1!==1) throw new Error(`Expected one H1 in ${rel}; found ${h1}`);
  if(errorPages.has(rel)){
    if(!robots.includes('noindex')) throw new Error(`Error page must be noindex: ${rel}`);
  }else{
    indexable++;
    if(!robots.includes('index,follow')) throw new Error(`Indexable page missing index/follow: ${rel}`);
    if(!t.includes('application/ld+json')) throw new Error(`Indexable page missing JSON-LD structured data: ${rel}`);
  }
  const refs=[...t.matchAll(/(?:src|href)="(\/(?:assets|images)[^"]+)"/g)].map(m=>m[1].split('?')[0]);
  for(const ref of refs){const p=resolve(root,'.'+ref);try{await stat(p)}catch{throw new Error(`Broken local asset ${ref} in ${rel}`)}}
}
const sitemap=await readFile(resolve(root,'sitemap.xml'),'utf8');
const sitemapCount=(sitemap.match(/<url>/g)||[]).length;
if(sitemapCount!==indexable) throw new Error(`Sitemap has ${sitemapCount} URLs but found ${indexable} indexable HTML pages`);
if(!sitemap.includes('<lastmod>2026-10-01</lastmod>')) throw new Error('Sitemap lastmod missing');
const robots=await readFile(resolve(root,'robots.txt'),'utf8');
if(!robots.includes('Sitemap: https://susan-mute-company-advocates.pages.dev/sitemap.xml')) throw new Error('robots.txt sitemap missing');
console.log(`Checks passed: ${html.length} HTML pages, ${indexable} indexable URLs, SEO metadata/JSON-LD present, sitemap aligned, local assets resolved.`);
