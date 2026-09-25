import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const ROOT = process.cwd();
const OUT = join(ROOT, 'dist');
const BASE = 'https://susan-mute-company-advocates.vercel.app';
const EMAIL = 'susanmutelaw@gmail.com';

const navigation = [
  ['/', 'Home'],
  ['/about', 'About'],
  ['/practice-areas', 'Practice Areas'],
  ['/susan-mute', 'Managing Partner'],
  ['/insights', 'Insights'],
];

const practices = [
  {
    slug: 'employment-labour', title: 'Employment & Labour', group: 'People & workplaces',
    summary: 'Practical guidance for employers and employees on workplace obligations, agreements, compliance and disputes.',
    intro: 'Workplace decisions affect livelihoods, organisational culture and commercial continuity. The practice assists employers and employees to understand their position early, document decisions carefully and pursue proportionate solutions.',
    services: ['Employment contracts and workplace policies', 'Employment compliance reviews', 'Disciplinary and grievance processes', 'Termination and redundancy guidance', 'Non-compete and restraint questions', 'Employment disputes and resolution'],
    approach: 'The focus is on clear documentation, fair process and advice that accounts for both legal duties and the realities of the workplace.'
  },
  {
    slug: 'corporate-commercial', title: 'Corporate & Commercial', group: 'Business',
    summary: 'Commercially useful advice for founders, businesses and organisations as they structure, contract and grow.',
    intro: 'Sound legal structure and clear agreements help businesses make decisions with confidence. The practice advises on corporate and commercial questions with attention to governance, risk allocation and practical implementation.',
    services: ['Business formation and structuring', 'Commercial agreements and contract review', 'Corporate governance support', 'Regulatory and operational compliance', 'Business risk and legal advisory', 'Negotiation and transaction support'],
    approach: 'Advice is framed around the transaction or decision at hand, with legal complexity translated into clear choices and next steps.'
  },
  {
    slug: 'family-succession', title: 'Family & Succession', group: 'People',
    summary: 'Discreet, clear guidance through family transitions, child-related matters and succession planning or administration.',
    intro: 'Family matters require legal clarity and careful handling. The practice supports clients through sensitive decisions while keeping the process, available options and likely next steps understandable.',
    services: ['Divorce and separation guidance', 'Child custody and maintenance matters', 'Family agreements and negotiations', 'Wills and estate planning', 'Probate and succession processes', 'Family dispute resolution'],
    approach: 'Each matter is approached with discretion, respect and a focus on reducing unnecessary conflict wherever the circumstances allow.'
  },
  {
    slug: 'data-protection-privacy-ict', title: 'Data Protection, Privacy & ICT', group: 'Digital & compliance',
    summary: 'Rights-aware, operational guidance on data protection, privacy, technology arrangements and emerging digital regulation.',
    intro: 'Organisations increasingly make decisions through data, cloud services and automated tools. Legal compliance has to work in policies, products, contracts and day-to-day operations—not only on paper.',
    services: ['Data-protection compliance roadmaps', 'Privacy notices and internal policies', 'Data mapping and governance support', 'Technology and ICT agreements', 'Data-breach preparedness and response guidance', 'AI and emerging-technology regulatory advisory'],
    approach: 'The practice connects legal requirements to the way teams actually collect, use, share and secure information, helping clients identify practical compliance priorities.'
  },
  {
    slug: 'intellectual-property', title: 'Intellectual Property', group: 'Business & digital',
    summary: 'Support for identifying, protecting and commercialising brands, creative work and other intellectual assets.',
    intro: 'Names, content, software, designs and confidential know-how can carry substantial value. The practice helps clients recognise those assets and take proportionate steps to protect and use them.',
    services: ['Trade mark and brand-protection guidance', 'Copyright advisory', 'IP clauses in commercial agreements', 'Licensing and permitted-use arrangements', 'Confidentiality and information protection', 'IP dispute guidance'],
    approach: 'Advice starts with the asset, its commercial role and the risk that matters most, avoiding protection measures that are disconnected from how the client operates.'
  },
  {
    slug: 'conveyancing-real-estate', title: 'Conveyancing & Real Estate', group: 'Property',
    summary: 'Guidance through property transactions, documentation, due diligence and real-estate disputes.',
    intro: 'Property decisions call for careful verification, clear documentation and an accurate view of obligations at every stage. The practice supports clients through the legal aspects of real-estate matters.',
    services: ['Sale and purchase agreements', 'Property due diligence', 'Transfers and conveyancing support', 'Lease review and preparation', 'Land and property documentation', 'Real-estate dispute guidance'],
    approach: 'The work prioritises due diligence and understandable transaction milestones so that clients know what is being checked, signed and completed.'
  },
  {
    slug: 'litigation-dispute-resolution', title: 'Litigation & Dispute Resolution', group: 'Disputes',
    summary: 'Structured advice and representation for disputes, with attention to proportionate strategy and resolution options.',
    intro: 'A dispute requires early clarity about the facts, documents, available forums and commercial or personal consequences. The practice helps clients assess their position and choose a deliberate path forward.',
    services: ['Early dispute assessment', 'Pre-action correspondence and negotiation', 'Civil and commercial litigation', 'Employment and property disputes', 'Mediation and alternative dispute resolution', 'Enforcement and post-judgment guidance'],
    approach: 'Strategy is shaped by the client’s objective, the evidence and the realistic costs of each route—not by escalation for its own sake.'
  },
];

const insights = [
  {
    title: 'Data compliance for Kenyan businesses in the digital age', source: 'Citizen Digital', date: '19 June 2025',
    url: 'https://citizen.digital/opinion-blogs/opinion-data-compliance-for-kenyan-businesses-in-the-digital-age-n364895',
    summary: 'Susan outlines practical compliance priorities for organisations that collect and use personal data, from data mapping and policies to staff awareness and impact assessments.'
  },
  {
    title: 'Cyber phishing threatens privacy', source: 'Business Daily', date: '25 June 2025',
    url: 'https://www.businessdailyafrica.com/bd/opinion-analysis/columnists/cyber-phishing-threatens-privacy-5094858',
    summary: 'A practical look at phishing as both a cybersecurity and privacy risk, and why organisational safeguards must account for people, process and technology.'
  },
  {
    title: 'Kenya’s AI regulation must catch up with innovation', source: 'Citizen Digital', date: '12 August 2026',
    url: 'https://citizen.digital/article/opinion-kenyas-ai-regulation-must-catch-up-with-innovation-n388156',
    summary: 'Susan considers the rapid adoption of AI across sectors and the case for a regulatory approach that supports innovation while addressing rights, accountability and risk.'
  },
];

function currentFor(path, href) {
  if (href === '/') return path === '/';
  return path === href || path.startsWith(`${href}/`);
}

function header(path) {
  return `<header class="site-header">
    <div class="shell nav-wrap">
      <a class="wordmark" href="/" aria-label="Susan Mute and Company Advocates — Home">
        <span class="wordmark__mark" aria-hidden="true">SM</span>
        <span class="wordmark__text">Susan Mute &amp; Company<small>Advocates</small></span>
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-menu" aria-label="Open navigation" data-menu-toggle><span></span><span></span><span></span></button>
      <nav aria-label="Primary navigation">
        <ul class="nav-list" id="site-menu" data-menu>
          ${navigation.map(([href, label]) => `<li><a href="${href}"${currentFor(path, href) ? ' aria-current="page"' : ''}>${label}</a></li>`).join('')}
          <li><a class="nav-cta" href="/contact"${currentFor(path, '/contact') ? ' aria-current="page"' : ''}>Discuss your matter</a></li>
        </ul>
      </nav>
    </div>
  </header>`;
}

function footer() {
  return `<footer class="site-footer">
    <div class="shell footer-grid">
      <div class="footer-brand">
        <a class="wordmark" href="/" aria-label="Susan Mute and Company Advocates — Home">
          <span class="wordmark__mark" aria-hidden="true">SM</span>
          <span class="wordmark__text">Susan Mute &amp; Company<small>Advocates</small></span>
        </a>
        <p>Clear, practical legal guidance for people, businesses and organisations navigating a changing world.</p>
      </div>
      <div class="footer-col"><strong>Explore</strong><a href="/about">About</a><a href="/practice-areas">Practice areas</a><a href="/susan-mute">Managing Partner</a><a href="/insights">Insights</a><a href="/contact">Contact</a></div>
      <div class="footer-col"><strong>Connect</strong><a href="mailto:${EMAIL}">${EMAIL}</a><a href="https://www.linkedin.com/in/susan-mute-70681516a" target="_blank" rel="noopener noreferrer">LinkedIn</a><a href="https://www.tiktok.com/@wakilisusan" target="_blank" rel="noopener noreferrer">TikTok · @wakilisusan</a><a href="/privacy">Privacy</a><a href="/legal-notice">Legal notice</a></div>
    </div>
    <div class="shell footer-bottom"><span>© <span data-year>2026</span> Susan Mute &amp; Company Advocates.</span><span>Website information is general and is not legal advice.</span></div>
  </footer>`;
}

function schema() {
  return JSON.stringify({
    '@context': 'https://schema.org', '@type': 'LegalService',
    name: 'Susan Mute & Company Advocates', url: BASE, email: EMAIL,
    description: 'Legal services for people, businesses and organisations, including employment, corporate and commercial, family, data protection, privacy, ICT, intellectual property, real estate and dispute resolution matters.',
    areaServed: { '@type': 'Country', name: 'Kenya' },
    employee: { '@type': 'Person', name: 'Susan Mute', jobTitle: 'Managing Partner' },
    sameAs: ['https://www.linkedin.com/in/susan-mute-70681516a', 'https://www.tiktok.com/@wakilisusan']
  }).replace(/</g, '\\u003c');
}

function page({ path, title, description, body, image = '/assets/icons/social-card.png', robots = 'index, follow' }) {
  const canonical = `${BASE}${path === '/' ? '' : path}`;
  return `<!doctype html>
<html lang="en"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title><meta name="description" content="${description}"><meta name="robots" content="${robots}">
  <link rel="canonical" href="${canonical}"><link rel="icon" href="/assets/icons/favicon.svg" type="image/svg+xml"><link rel="manifest" href="/site.webmanifest">
  <meta name="theme-color" content="#24152e"><meta property="og:type" content="website"><meta property="og:site_name" content="Susan Mute & Company Advocates"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${BASE}${image}">
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="${BASE}${image}">
  <link rel="stylesheet" href="/assets/css/site.css"><script type="application/ld+json">${schema()}</script><script src="/assets/js/site.js" defer></script>
</head><body><a class="skip-link" href="#main">Skip to main content</a>${header(path)}<main id="main">${body}</main>${footer()}</body></html>`;
}

function pageHero(title, intro, parent = null) {
  return `<section class="page-hero"><div class="shell page-hero__grid"><div>
    <div class="breadcrumb"><a href="/">Home</a>${parent ? ` / <a href="${parent.href}">${parent.label}</a>` : ''} / ${title}</div>
    <p class="eyebrow">Susan Mute &amp; Company Advocates</p><h1>${title}</h1>
  </div><div class="page-hero__aside"><p>${intro}</p><a class="text-link" href="/contact">Discuss your matter</a></div></div></section>`;
}

function contactBand() {
  return `<section class="contact-panel section--ink" aria-labelledby="contact-band-title"><div class="contact-panel__copy"><p class="eyebrow">Start a conversation</p><h2 id="contact-band-title">Clear advice begins with context.</h2><p>Share a concise outline of your matter by email. Please do not send confidential documents until the firm confirms it can act.</p></div><div class="contact-panel__details"><div class="contact-detail"><span>Email</span><a href="mailto:${EMAIL}?subject=Legal%20enquiry">${EMAIL}</a></div><div class="contact-detail"><span>Managing Partner</span><strong>Susan Mute</strong></div><div class="contact-detail"><span>Public legal education</span><a href="https://www.tiktok.com/@wakilisusan" target="_blank" rel="noopener noreferrer">@wakilisusan</a></div></div></section>`;
}

function insightCards() {
  return insights.map((item) => `<a class="insight-card reveal" href="${item.url}" target="_blank" rel="noopener noreferrer"><span class="insight-card__meta">${item.source} · ${item.date}</span><h3>${item.title}</h3><p>${item.summary}</p><span class="insight-card__link">Read at source ↗</span></a>`).join('');
}

const home = page({
  path: '/',
  title: 'Susan Mute & Company Advocates | Clear Legal Guidance',
  description: 'Practical legal guidance for people, businesses and the digital economy across employment, corporate, family, privacy, ICT, property and disputes.',
  body: `<section class="hero"><div class="hero__grid"><div class="hero__copy">
      <p class="eyebrow">People · Business · Digital &amp; compliance</p>
      <h1>Clear legal guidance for a <em>changing world.</em></h1>
      <p class="lede">Practical counsel for personal, commercial and regulatory questions—grounded in careful analysis, clear communication and an informed view of technology.</p>
      <div class="button-row"><a class="button" href="/contact">Discuss your matter</a><a class="text-link" href="/practice-areas">Explore the practice</a></div>
    </div><div class="hero__media"><img src="/assets/media/nairobi-skyline.webp" width="1600" height="900" alt="Nairobi skyline with modern buildings and green foreground" fetchpriority="high"><span class="corner-mark" aria-hidden="true"></span><div class="hero__note"><span>A modern Kenyan practice</span><strong>Counsel that connects law, people and progress.</strong></div></div></div></section>
    <div class="proof-strip"><div class="proof-strip__grid"><div class="proof-item"><span>Leadership</span><strong>Woman-led legal practice</strong></div><div class="proof-item"><span>Perspective</span><strong>Rights-aware and commercially useful</strong></div><div class="proof-item"><span>Public voice</span><strong>Data, privacy and AI commentary</strong></div></div></div>
    <section class="section section--paper"><div class="shell intro-grid"><div class="section-heading"><p class="eyebrow">How we can help</p><h2>Legal support shaped around the issue in front of you.</h2></div><div class="pathways">
      <a class="pathway reveal" href="/practice-areas#people"><span class="pathway__num">01</span><span><h3>People</h3><p>Guidance through workplace matters, family transitions, child-related questions and succession.</p></span><span class="pathway__arrow">↗</span></a>
      <a class="pathway reveal" href="/practice-areas#business"><span class="pathway__num">02</span><span><h3>Business</h3><p>Contracts, corporate structure, employment compliance, intellectual property and commercial risk.</p></span><span class="pathway__arrow">↗</span></a>
      <a class="pathway reveal" href="/practice-areas#digital"><span class="pathway__num">03</span><span><h3>Digital &amp; compliance</h3><p>Data protection, privacy, ICT arrangements and emerging questions around responsible AI use.</p></span><span class="pathway__arrow">↗</span></a>
    </div></div></section>
    <section class="section section--ink"><div class="shell"><div class="intro-grid"><div><p class="eyebrow">Practice index</p><h2>Broad legal capability. A distinctive digital lens.</h2></div><p class="lede muted">The practice brings mainstream legal services together with an unusually informed focus on data, technology and compliance.</p></div><div class="practice-index" style="margin-top:4rem">${practices.map((practice) => `<a class="practice-card reveal" href="/practice-areas/${practice.slug}"><h3>${practice.title}</h3><p>${practice.summary}</p></a>`).join('')}</div></div></section>
    <section class="section"><div class="shell profile-grid"><div class="profile-portrait reveal"><img src="/assets/media/susan-mute.webp" width="151" height="151" alt="Susan Mute, Managing Partner" loading="lazy"></div><div class="profile-copy"><p class="eyebrow">Managing Partner</p><h2>Susan Mute</h2><p class="lede">An Advocate of the High Court of Kenya whose public work connects practical legal service with clear education on privacy, data governance and emerging technology.</p><div class="profile-facts"><div><span>Role</span>Managing Partner</div><div><span>Public profile</span>Wakili Susan</div><div><span>Published in</span>Citizen Digital</div><div><span>Published in</span>Business Daily</div></div><a class="text-link" href="/susan-mute">Meet Susan</a></div></div></section>
    <section class="section section--plum"><div class="shell feature-grid"><div class="feature-image reveal"><img src="/assets/media/data-infrastructure.webp" width="1500" height="894" alt="Rows of server cabinets in a data centre" loading="lazy"></div><div class="feature-copy"><p class="eyebrow">Digital law, made operational</p><h2>Compliance that lives beyond the policy document.</h2><p class="lede muted">Data and technology obligations need to work in contracts, products, systems and daily decisions. The practice helps organisations translate legal duties into practical priorities.</p><div class="topic-list"><span>Data protection</span><span>Privacy</span><span>ICT law</span><span>AI governance</span></div><div class="button-row"><a class="button button--light" href="/practice-areas/data-protection-privacy-ict">Explore the practice</a></div></div></div></section>
    <section class="section section--paper"><div class="shell"><div class="intro-grid"><div><p class="eyebrow">Published thinking</p><h2>Law, technology and the choices organisations make.</h2></div><p class="lede muted">Selected public commentary by Susan Mute. These summaries link to the original publications and do not reproduce the articles.</p></div><div class="insights-grid">${insightCards()}</div><div class="button-row"><a class="text-link" href="/insights">View all insights</a></div></div></section>
    <section class="section"><div class="shell"><p class="eyebrow">Working principles</p><h2>Measured advice. Clear next steps.</h2><div class="principles"><div class="principle reveal"><span class="principle__num">01</span><h3>Understand the context</h3><p>The legal question is considered alongside the personal, operational or commercial reality around it.</p></div><div class="principle reveal"><span class="principle__num">02</span><h3>Make complexity usable</h3><p>Advice is organised around choices, responsibilities and practical next steps—not unnecessary legal language.</p></div><div class="principle reveal"><span class="principle__num">03</span><h3>Choose a proportionate path</h3><p>The response should fit the matter, whether that means prevention, negotiation, compliance work or formal proceedings.</p></div></div></div></section>
    ${contactBand()}`
});

const about = page({
  path: '/about', title: 'About the Firm | Susan Mute & Company Advocates',
  description: 'A contemporary Kenyan legal practice offering clear counsel for personal, business and digital-regulatory matters.',
  body: `${pageHero('A practice built for changing realities.', 'Legal questions rarely arrive in isolation. They sit inside families, workplaces, organisations, transactions and fast-changing technology.')}
  <section class="section section--paper"><div class="shell content-grid"><aside class="content-rail"><strong>On this page</strong><a href="#practice">The practice</a><a href="#perspective">Our perspective</a><a href="#standards">Working standards</a></aside><div class="prose">
    <h2 id="practice">Clear counsel across connected areas of life and business.</h2><p>Susan Mute &amp; Company Advocates is led by Susan Mute, an Advocate of the High Court of Kenya. The practice advises on personal, commercial, workplace, property and dispute matters, with a strong additional focus on data protection, privacy and ICT law.</p><p>That combination matters. A workplace issue may involve personal data. A new product may raise contract, intellectual-property and privacy questions at once. A family or property decision can require both sensitivity and careful documentation. The practice is organised to see those connections without losing sight of the immediate task.</p>
    <div class="image-band"><img src="/assets/media/professional-meeting.webp" width="1200" height="1554" alt="Professionals in discussion around a meeting table" loading="lazy"></div>
    <h2 id="perspective">Contemporary in outlook. Practical in delivery.</h2><p>The aim is to make legal advice usable: to identify the real issue, explain the available routes and help clients understand what should happen next. Public legal education is a natural extension of that work, particularly where technology is changing how people and organisations exercise rights and manage risk.</p><div class="callout"><h3>Modern counsel for people, businesses and the digital economy.</h3><p>The practice brings these areas together without treating technology law as separate from everyday life or commerce.</p></div>
    <h2 id="standards">How the practice approaches a matter.</h2><ul><li>Begin with the facts, documents and the outcome the client is trying to achieve.</li><li>Explain the legal position in direct, understandable language.</li><li>Consider preventive, negotiated and formal options where each is available.</li><li>Keep confidentiality, data care and professional responsibility central to the engagement.</li></ul>
  </div></div></section>${contactBand()}`
});

const practiceOverview = page({
  path: '/practice-areas', title: 'Practice Areas | Susan Mute & Company Advocates',
  description: 'Explore legal services across employment, corporate, family, privacy and ICT, intellectual property, real estate, litigation and dispute resolution.',
  body: `${pageHero('Practice areas', 'Legal support for people, organisations and businesses—from everyday transitions to digital-regulatory questions.')}
  <section class="section section--ink"><div class="shell">
    <div id="people" class="intro-grid"><div><p class="eyebrow">People</p><h2>Life, family and work.</h2></div><p class="lede muted">Sensitive matters handled with clarity, discretion and attention to the practical consequences of each step.</p></div>
    <div class="practice-index" style="margin:3rem 0 7rem">${practices.filter((p) => ['employment-labour','family-succession'].includes(p.slug)).map((p) => `<a class="practice-card" href="/practice-areas/${p.slug}"><h3>${p.title}</h3><p>${p.summary}</p></a>`).join('')}</div>
    <div id="business" class="intro-grid"><div><p class="eyebrow">Business</p><h2>Structure, agreements and assets.</h2></div><p class="lede muted">Commercial advice that connects legal requirements to real decisions, relationships and operating risk.</p></div>
    <div class="practice-index" style="margin:3rem 0 7rem">${practices.filter((p) => ['corporate-commercial','intellectual-property'].includes(p.slug)).map((p) => `<a class="practice-card" href="/practice-areas/${p.slug}"><h3>${p.title}</h3><p>${p.summary}</p></a>`).join('')}</div>
    <div id="digital" class="intro-grid"><div><p class="eyebrow">Digital, property &amp; disputes</p><h2>Risk, rights and resolution.</h2></div><p class="lede muted">Guidance where information, assets, obligations or contested positions need careful protection.</p></div>
    <div class="practice-index" style="margin-top:3rem">${practices.filter((p) => ['data-protection-privacy-ict','conveyancing-real-estate','litigation-dispute-resolution'].includes(p.slug)).map((p) => `<a class="practice-card" href="/practice-areas/${p.slug}"><h3>${p.title}</h3><p>${p.summary}</p></a>`).join('')}</div>
  </div></section>${contactBand()}`
});

function practicePage(practice) {
  const image = practice.slug === 'data-protection-privacy-ict'
    ? `<div class="image-band"><img src="/assets/media/data-infrastructure.webp" width="1500" height="894" alt="Rows of server cabinets in a data centre" loading="lazy"></div>`
    : practice.slug === 'conveyancing-real-estate'
      ? `<div class="image-band"><img src="/assets/media/nairobi-architecture.webp" width="1200" height="2132" alt="Nairobi building and clock tower seen from the street" loading="lazy"></div>`
      : '';
  return page({
    path: `/practice-areas/${practice.slug}`,
    title: `${practice.title} | Susan Mute & Company Advocates`,
    description: practice.summary,
    body: `${pageHero(practice.title, practice.summary, { href: '/practice-areas', label: 'Practice areas' })}
    <section class="section section--paper"><div class="shell content-grid"><aside class="content-rail"><strong>${practice.group}</strong><a href="#overview">Overview</a><a href="#support">How we can help</a><a href="#approach">Approach</a><a href="/contact">Contact</a></aside><div class="prose">
      <h2 id="overview">Advice that starts with the real issue.</h2><p>${practice.intro}</p>${image}
      <h2 id="support">How the practice can help.</h2><ul class="service-list">${practice.services.map((service) => `<li>${service}</li>`).join('')}</ul>
      <h2 id="approach">A clear, proportionate approach.</h2><p>${practice.approach}</p>
      <div class="callout"><h3>Every matter turns on its own facts.</h3><p>Website information is general. A direct conversation allows the firm to understand the documents, deadlines and objectives relevant to your circumstances.</p><a class="button button--light" href="/contact">Discuss your matter</a></div>
    </div></div></section>${contactBand()}`
  });
}

const susan = page({
  path: '/susan-mute', title: 'Susan Mute, Managing Partner | Susan Mute & Company Advocates',
  description: 'Meet Susan Mute, Advocate of the High Court of Kenya, Managing Partner and public legal educator writing on data, privacy and AI regulation.',
  body: `${pageHero('Susan Mute', 'Managing Partner · Advocate of the High Court of Kenya')}
  <section class="section section--paper"><div class="shell profile-grid"><div><div class="profile-portrait"><img src="/assets/media/susan-mute.webp" width="151" height="151" alt="Susan Mute, Managing Partner"></div></div><div class="prose"><p class="eyebrow">Managing Partner</p><h2>Legal practice with a public-education instinct.</h2><p class="lede">Susan Mute is an Advocate of the High Court of Kenya and Managing Partner at Susan Mute &amp; Company Advocates.</p><p>Her public professional work spans mainstream legal services and sustained commentary on data protection, privacy, cybersecurity and artificial-intelligence regulation. That perspective supports an approach which is conscious of both individual rights and the operational realities facing organisations.</p><p>Susan has published commentary in Citizen Digital and Business Daily. The Media Council of Kenya also listed her among the members of the Social Media and Internet subgroup of its technical working group on AI, Data and Social Media guidelines.</p><div class="button-row"><a class="button" href="/contact">Contact the firm</a><a class="text-link" href="/insights">Read published insights</a></div></div></div></section>
  <section class="section section--ink"><div class="shell"><div class="intro-grid"><div><p class="eyebrow">Areas of focus</p><h2>Broad practice, informed by the digital age.</h2></div><div class="pathways"><a class="pathway" href="/practice-areas/data-protection-privacy-ict"><span class="pathway__num">01</span><span><h3>Data, privacy &amp; ICT</h3><p>Compliance, technology arrangements and emerging regulation.</p></span><span class="pathway__arrow">↗</span></a><a class="pathway" href="/practice-areas/corporate-commercial"><span class="pathway__num">02</span><span><h3>Business advisory</h3><p>Structure, agreements, governance and commercial risk.</p></span><span class="pathway__arrow">↗</span></a><a class="pathway" href="/practice-areas/employment-labour"><span class="pathway__num">03</span><span><h3>Employment</h3><p>Workplace obligations, compliance and disputes.</p></span><span class="pathway__arrow">↗</span></a></div></div></div></section>${contactBand()}`
});

const insightsPage = page({
  path: '/insights', title: 'Insights | Susan Mute & Company Advocates',
  description: 'Selected published commentary by Susan Mute on data protection, cyber phishing, privacy and artificial-intelligence regulation in Kenya.',
  body: `${pageHero('Insights', 'Selected published commentary on the legal questions shaping organisations, technology and individual rights.')}
  <section class="section section--paper"><div class="shell"><div class="intro-grid"><div><p class="eyebrow">Published externally</p><h2>Practical thinking for a digital society.</h2></div><p class="lede muted">These original summaries direct readers to the full articles at their publishers. Publication dates and outlets are shown as published.</p></div><div class="insights-grid">${insightCards()}</div></div></section>
  <section class="section"><div class="shell intro-grid"><div><p class="eyebrow">Public contribution</p><h2>From commentary to practical guidance.</h2></div><div class="prose"><p>Susan’s public work considers what compliance looks like in real organisations: how personal data is understood and protected, how phishing creates privacy risk, and how AI regulation can account for both innovation and responsibility.</p><p>In 2023, the Media Council of Kenya listed Susan among the Social Media and Internet subgroup members of its technical working group on AI, Data and Social Media guidelines.</p><a class="text-link" href="https://mediacouncil.or.ke/media-center/mck-newsroom/news/mck-ai-technical-working-group-begins-work" target="_blank" rel="noopener noreferrer">View the Media Council source</a></div></div></section>${contactBand()}`
});

const contact = page({
  path: '/contact', title: 'Contact | Susan Mute & Company Advocates',
  description: 'Contact Susan Mute & Company Advocates by verified email to share a concise outline of your legal matter.',
  body: `${pageHero('Let’s begin with the matter at hand.', 'Share a concise outline by email. The firm can then confirm the appropriate next step.')}
  <section class="section section--paper"><div class="shell feature-grid"><div class="feature-image"><img src="/assets/media/nairobi-architecture.webp" width="1200" height="2132" alt="Nairobi building and clock tower seen from the street"></div><div class="feature-copy"><p class="eyebrow">Contact</p><h2>Email the firm.</h2><p class="lede">Include your name, the general nature of the matter and any important deadline. Please do not attach confidential documents until the firm confirms it can act.</p><div class="contact-detail" style="border-color:var(--line)"><span style="color:var(--plum)">Email</span><a style="color:var(--ink)" href="mailto:${EMAIL}?subject=Legal%20enquiry">${EMAIL}</a></div><div class="button-row"><a class="button" href="mailto:${EMAIL}?subject=Legal%20enquiry">Compose an email</a></div><p class="source-note">An email does not create an advocate-client relationship. The firm must first review the matter and confirm engagement.</p></div></div></section>
  <section class="section section--ink"><div class="shell"><div class="intro-grid"><div><p class="eyebrow">Before you write</p><h2>Useful context for an initial enquiry.</h2></div><ul class="service-list"><li>Your full name and preferred email address</li><li>A short, factual summary of the issue</li><li>Any hearing, response or transaction deadline</li><li>The other parties involved, for conflict checking</li><li>The kind of assistance you are seeking</li><li>No confidential attachments until requested</li></ul></div></div></section>`
});

const privacy = page({
  path: '/privacy', title: 'Privacy | Susan Mute & Company Advocates',
  description: 'Privacy information for visitors contacting Susan Mute & Company Advocates through this website.',
  body: `${pageHero('Privacy', 'How information is handled when you visit this static website or choose to contact the firm.')}
  <section class="section section--paper"><div class="shell content-grid"><aside class="content-rail"><strong>Privacy notice</strong><a href="#site">Website</a><a href="#email">Email enquiries</a><a href="#rights">Your choices</a></aside><div class="prose">
    <h2 id="site">A minimal, static website.</h2><p>This website does not use an enquiry form, advertising cookies or on-site analytics. It is hosted by Vercel, whose infrastructure may process standard technical request information such as an IP address, browser details, requested page and timestamp for delivery, reliability and security.</p>
    <h2 id="email">Information you send by email.</h2><p>If you choose to email the firm, the information you provide is used to review and respond to the enquiry, carry out conflict checks where appropriate and manage any professional relationship that is subsequently agreed. Please do not send confidential documents before the firm confirms it can act.</p><p>Email is handled through the service associated with the published Gmail address. Its processing is also governed by the relevant provider terms and privacy practices.</p>
    <h2 id="rights">Your choices and questions.</h2><p>You decide what to include in an initial enquiry. Keep it concise and avoid unnecessary personal or sensitive information. For a privacy question concerning an email you sent to the firm, contact <a href="mailto:${EMAIL}?subject=Privacy%20question">${EMAIL}</a>.</p><p class="source-note">Last reviewed: 25 September 2026.</p>
  </div></div></section>`
});

const legal = page({
  path: '/legal-notice', title: 'Legal Notice | Susan Mute & Company Advocates',
  description: 'Terms governing the general legal information published on the Susan Mute & Company Advocates website.',
  body: `${pageHero('Legal notice', 'Important limits on the general information published through this website.')}
  <section class="section section--paper"><div class="shell content-grid"><aside class="content-rail"><strong>Notice</strong><a href="#information">General information</a><a href="#relationship">Engagement</a><a href="#external">External links</a></aside><div class="prose">
    <h2 id="information">General information, not legal advice.</h2><p>Website content is provided for general information. It does not address the full facts of any person’s circumstances and should not be relied on as legal advice. Laws, procedures and regulatory guidance may change.</p>
    <h2 id="relationship">No relationship until confirmed.</h2><p>Visiting this site or sending an email does not by itself create an advocate-client relationship. The firm must complete appropriate checks, agree the scope of work and confirm an engagement before acting.</p>
    <h2 id="external">External publications and links.</h2><p>Insight links lead to independent publishers or platforms. They are provided to identify Susan Mute’s published commentary and relevant public sources. The firm does not control the continued availability or privacy practices of third-party sites.</p>
    <h2>Accuracy and responsible use.</h2><p>Reasonable care is taken with the information on this site, but no guarantee is made that general content is complete or suitable for a particular matter. Seek advice based on your own facts and deadlines.</p><p class="source-note">Last reviewed: 25 September 2026.</p>
  </div></div></section>`
});

const notFound = page({
  path: '/404', title: 'Page Not Found | Susan Mute & Company Advocates',
  description: 'The requested page could not be found.', robots: 'noindex, follow',
  body: `<section class="error-page section"><div class="shell"><div class="error-code">404</div><h1>That page is not here.</h1><p>The link may be outdated, or the address may have been entered incorrectly.</p><div class="button-row" style="justify-content:center"><a class="button" href="/">Return home</a><a class="text-link" href="/contact">Contact the firm</a></div></div></section>`
});

const pages = new Map([
  ['index.html', home], ['about/index.html', about], ['practice-areas/index.html', practiceOverview],
  ['susan-mute/index.html', susan], ['insights/index.html', insightsPage], ['contact/index.html', contact],
  ['privacy/index.html', privacy], ['legal-notice/index.html', legal], ['404.html', notFound],
  ...practices.map((practice) => [`practice-areas/${practice.slug}/index.html`, practicePage(practice)]),
]);

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await cp(join(ROOT, 'assets'), join(OUT, 'assets'), { recursive: true });

for (const [filename, contents] of pages) {
  const target = join(OUT, filename);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, contents);
}

const routes = [...pages.keys()].filter((name) => name !== '404.html').map((name) => name === 'index.html' ? '' : `/${name.replace(/\/index\.html$/, '')}`);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `  <url><loc>${BASE}${route}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile(join(OUT, 'sitemap.xml'), sitemap);
await writeFile(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`);
await writeFile(join(OUT, 'site.webmanifest'), JSON.stringify({
  name: 'Susan Mute & Company Advocates', short_name: 'SM Advocates', start_url: '/', display: 'standalone',
  background_color: '#faf7f2', theme_color: '#24152e', icons: [{ src: '/assets/icons/favicon.svg', sizes: 'any', type: 'image/svg+xml' }]
}, null, 2));

console.log(`Built ${pages.size} pages in ${OUT}`);
