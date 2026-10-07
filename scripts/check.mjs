import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, relative } from 'node:path';

const root=resolve(process.cwd(),'site');
const origin='https://susanmute.co.ke';
const oldOrigin='https://susan-mute-company-advocates.pages.dev';

const files=[];

async function walk(dir){
  for(const n of await readdir(dir)){
    const p=resolve(dir,n);
    const s=await stat(p);

    if(s.isDirectory()) await walk(p);
    else files.push(p);
  }
}

await walk(root);

const html=files.filter(f=>f.endsWith('.html'));

const errorPages=new Set([
  '404.html',
  '500.html',
  '503.html',
  '504.html'
]);

let indexable=0;
const titles=new Set();

for(const f of html){
  const t=await readFile(f,'utf8');
  const rel=relative(root,f);

  if(t.includes(oldOrigin)){
    throw new Error(`Old production hostname remains in ${rel}`);
  }

  if(/\sstyle="/i.test(t)){
    throw new Error(`Inline style remains in ${rel}`);
  }

  if(!t.includes('<html lang="en-KE">')){
    throw new Error(`Missing en-KE language declaration: ${rel}`);
  }

  if(!t.includes('viewport-fit=cover')){
    throw new Error(`Responsive viewport missing: ${rel}`);
  }

  const title=
    t.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim()||'';

  const desc=
    t.match(/<meta name="description" content="([^"]+)"/i)?.[1]?.trim()||'';

  const canon=
    t.match(/<link rel="canonical" href="([^"]+)"/i)?.[1]?.trim()||'';

  const robots=
    t.match(/<meta name="robots" content="([^"]+)"/i)?.[1]?.trim()||'';

  const h1=(t.match(/<h1\b/gi)||[]).length;

  if(!title) throw new Error(`Missing title: ${rel}`);
  if(!desc) throw new Error(`Missing description: ${rel}`);

  if(!canon.startsWith(origin+'/')){
    throw new Error(`Bad canonical in ${rel}: ${canon}`);
  }

  if(h1!==1){
    throw new Error(`Expected one H1 in ${rel}; found ${h1}`);
  }

  if(!errorPages.has(rel)){
    if(titles.has(title)){
      throw new Error(`Duplicate title: ${title}`);
    }

    titles.add(title);
  }

  const externalBlankLinks=[
    ...t.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)
  ];

  for(const m of externalBlankLinks){
    const tag=m[0];
    const value=tag.match(/\brel="([^"]+)"/i)?.[1]||'';

    if(!value.includes('noopener') || !value.includes('noreferrer')){
      throw new Error(`Unsafe target=_blank link in ${rel}`);
    }
  }

  const refs=[
    ...t.matchAll(/(?:src|href)="(\/(?:assets|images)[^"]+)"/g)
  ].map(m=>m[1].split('?')[0]);

  for(const ref of refs){
    try{
      await stat(resolve(root,'.'+ref));
    }catch{
      throw new Error(`Broken local asset ${ref} in ${rel}`);
    }
  }

  if(errorPages.has(rel)){
    if(!robots.includes('noindex')){
      throw new Error(`Error page must be noindex: ${rel}`);
    }
  }else{
    indexable++;

    if(!robots.includes('index,follow')){
      throw new Error(`Indexable page missing index/follow: ${rel}`);
    }

    if(!t.includes('hreflang="en-KE"')){
      throw new Error(`Missing en-KE hreflang: ${rel}`);
    }

    if(!t.includes('hreflang="x-default"')){
      throw new Error(`Missing x-default hreflang: ${rel}`);
    }

    const schemas=[
      ...t.matchAll(
        /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi
      )
    ];

    if(!schemas.length){
      throw new Error(`Missing JSON-LD: ${rel}`);
    }

    for(const [,json] of schemas){
      JSON.parse(json);
    }
  }
}

const sitemap=
  await readFile(resolve(root,'sitemap.xml'),'utf8');

const sitemapCount=
  (sitemap.match(/<url>/g)||[]).length;

if(sitemapCount!==indexable){
  throw new Error(
    `Sitemap has ${sitemapCount} URLs; expected ${indexable}`
  );
}

if(sitemap.includes(oldOrigin)){
  throw new Error('Old hostname remains in sitemap');
}

if(!sitemap.includes(origin+'/')){
  throw new Error('Production hostname missing from sitemap');
}

if(!sitemap.includes('<lastmod>2026-10-07</lastmod>')){
  throw new Error('Sitemap lastmod incorrect');
}

const robots=
  await readFile(resolve(root,'robots.txt'),'utf8');

if(!robots.includes(
  `Sitemap: ${origin}/sitemap.xml`
)){
  throw new Error('robots.txt sitemap URL incorrect');
}

const css=
  await readFile(resolve(root,'assets/css/site.css'),'utf8');

if(css.includes('images.unsplash.com')){
  throw new Error('External Unsplash dependency remains');
}

const headers=
  await readFile(resolve(root,'_headers'),'utf8');

for(const h of [
  'Content-Security-Policy:',
  "frame-ancestors 'none'",
  "script-src-attr 'none'",
  "style-src-attr 'none'",
  'Strict-Transport-Security:',
  'X-Content-Type-Options: nosniff',
  'X-Frame-Options: DENY',
  'Permissions-Policy:'
]){
  if(!headers.includes(h)){
    throw new Error(`Missing security rule: ${h}`);
  }
}

if(headers.includes("'unsafe-inline'")){
  throw new Error('CSP still contains unsafe-inline');
}

const media=[
  'hero-home.webp',
  'practice-commercial-law.webp',
  'practice-family-law.webp',
  'practice-property-law.webp',
  'practice-data-privacy-protection.webp',
  'practice-artificial-intelligence-law.webp',
  'practice-civil-law.webp',
  'business-counsel.webp'
];

for(const name of media){
  const s=await stat(
    resolve(root,'assets/media',name)
  );

  if(s.size<5000){
    throw new Error(`Invalid media asset: ${name}`);
  }
}

const securityTxt=
  await readFile(
    resolve(root,'.well-known/security.txt'),
    'utf8'
  );

if(!securityTxt.includes(
  'Canonical: https://susanmute.co.ke/.well-known/security.txt'
)){
  throw new Error('security.txt canonical missing');
}

console.log(
  `Checks passed: ${html.length} HTML pages, `+
  `${indexable} indexable URLs, valid production canonicals, `+
  `JSON-LD, local media and hardened security configuration.`
);
