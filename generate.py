from pathlib import Path
from html import escape
import json

BASE = Path(__file__).resolve().parent
ROOT = BASE / 'site'
SITE = 'https://susanmute.co.ke'
PHONE_DISPLAY = '+254 796 416 617'
PHONE_LINK = '+254796416617'
WA = 'https://wa.me/254796416617'
EMAIL = 'susanmutelaw@gmail.com'
ADDRESS_LINE = 'Kikinga House, 6th Floor, Suite 600B, Biashara Street, next to KCB Bank'
CITY = 'Kiambu Town'
REGION = 'Kiambu County'
COUNTRY = 'Kenya'
LINKEDIN = 'https://ke.linkedin.com/in/susan-mute-70681516a'
BUSINESS_DAILY = 'https://www.businessdailyafrica.com/bd/opinion-analysis/columnists/cyber-phishing-threatens-privacy-5094858'
BUSINESS_DAILY_AUTHOR = 'https://www.businessdailyafrica.com/bd/authors/susan-mute-5094860'
MCK_TWG = 'https://mediacouncil.or.ke/media-center/mck-newsroom/news/mck-ai-technical-working-group-begins-work'
MCK_GUIDE = 'https://mediacouncil.or.ke/sites/default/files/downloads/GUIDE%20ON%20THE%20USE%20OF%20SOCIAL%20MEDIA%20AND%20THE%20INTERNET%20FOR%20MEDIA%20PRACTICE%20IN%20KENYA_0.pdf'
CITIZEN_DATA = 'https://citizen.digital/opinion-blogs/opinion-data-compliance-for-kenyan-businesses-in-the-digital-age-n364895'
CITIZEN_AI = 'https://citizen.digital/article/opinion-kenyas-ai-regulation-must-catch-up-with-innovation-n388156'
LASTMOD = '2026-10-07'
PRACTICES = 'Commercial Law · Family Law · Property Law · Data Privacy & Protection · Artificial Intelligence · Civil Law'

PRACTICE_DATA = [
    {
        'slug':'commercial-law','short':'Commercial Law','title':'Commercial Law Services | Susan Mute & Company Advocates',
        'desc':'Commercial law services in Kenya for contracts, corporate governance, company matters and practical business legal advisory from Susan Mute & Company Advocates.',
        'lead':'Commercial legal support for businesses, founders and organisations making contractual, governance and operational decisions.',
        'summary':'The firm advises on commercial agreements, company matters, corporate governance and business decisions where legal risk needs to be understood before commitments are made.',
        'points':['Commercial agreements and contract review','Company and corporate advisory','Corporate governance and compliance support','Business transactions and legal risk review'],
        'extra':'Commercial legal work often overlaps with data protection, employment, property and regulatory obligations. The firm approaches these issues with attention to both the legal position and the practical business objective.'
    },
    {
        'slug':'family-law','short':'Family Law','title':'Family Law Services | Susan Mute & Company Advocates',
        'desc':'Family law services covering divorce, matrimonial property, child custody and maintenance, with practical legal guidance from Susan Mute & Company Advocates.',
        'lead':'Clear, discreet guidance for family matters that require careful legal advice and a practical path forward.',
        'summary':'Family matters can involve personal, financial and procedural questions at the same time. The firm provides legal guidance on family disputes and related court processes based on the circumstances of each matter.',
        'points':['Dissolution of marriage and divorce matters','Matrimonial property issues','Child custody and maintenance matters','Family dispute guidance and court process support'],
        'extra':'The appropriate approach depends on the facts, existing agreements, documents and the interests of the people involved. Early advice can help clarify available options before positions become more difficult to resolve.'
    },
    {
        'slug':'property-law','short':'Property Law','title':'Property Law & Conveyancing | Susan Mute & Company Advocates',
        'desc':'Property law and conveyancing support in Kenya for transfers, sale and purchase transactions, leases, sectional property and legal due diligence.',
        'lead':'Legal support for property transactions, documentation and due diligence before rights, money and obligations change hands.',
        'summary':'Property transactions require careful review of ownership, documents, contractual obligations and transfer steps. The firm assists clients with property-related legal processes and transaction documentation.',
        'points':['Property transfers and conveyancing','Sale and purchase agreements','Leases and subleases','Sectional property and security documentation'],
        'extra':'A property transaction can create long-term legal and financial consequences. The firm focuses on identifying relevant documentation, obligations and risks before completion.'
    },
    {
        'slug':'data-privacy-protection','short':'Data Privacy & Protection','title':'Data Protection & Privacy Law | Susan Mute & Company Advocates',
        'desc':'Data protection and privacy legal advisory in Kenya for compliance, policy formulation, governance and responsible handling of personal data.',
        'lead':'Practical data protection and privacy advice for organisations handling personal information in Kenya.',
        'summary':'Data protection is an operational governance issue as well as a legal one. The firm advises organisations on privacy compliance, policy formulation and legal questions arising from the collection, use, storage and sharing of personal data.',
        'points':['Data protection compliance advisory','Privacy and data-governance policies','Data handling and accountability reviews','Regulatory and risk guidance'],
        'extra':'Effective privacy compliance should reflect how an organisation actually handles information. Policies, contracts, internal processes and accountability measures should work together rather than exist only on paper.'
    },
    {
        'slug':'artificial-intelligence-law','short':'Artificial Intelligence','title':'Artificial Intelligence & Technology Law | Susan Mute & Company Advocates',
        'desc':'Artificial intelligence and technology law advisory in Kenya covering AI governance, privacy, contracts, regulatory risk and responsible technology use.',
        'lead':'Legal and regulatory guidance for organisations adopting artificial intelligence and emerging technology.',
        'summary':'AI adoption can raise questions about privacy, accountability, contracting, governance and regulatory exposure. The firm helps organisations examine legal considerations alongside the operational benefits of technology.',
        'points':['AI governance and responsible-use frameworks','Privacy and data-protection considerations','Technology contracts and risk allocation','Regulatory and compliance advisory'],
        'extra':'Technology governance is evolving quickly. Legal review can help organisations document accountability, identify risk and align AI use with existing obligations while monitoring new regulatory developments.'
    },
    {
        'slug':'civil-law','short':'Civil Law','title':'Civil Litigation & Dispute Resolution | Susan Mute & Company Advocates',
        'desc':'Civil law and dispute resolution services in Kenya, including civil claims, dispute strategy, court process guidance and legal representation.',
        'lead':'Advice and representation for civil disputes where rights, obligations or remedies need to be clarified and enforced.',
        'summary':'Civil disputes can arise from contracts, property, negligence and other private-law relationships. The firm provides legal advice and representation shaped around the facts, documents and applicable procedure.',
        'points':['Civil claims and dispute assessment','Demand notices and pre-litigation strategy','Court process and representation','Negotiation and dispute resolution support'],
        'extra':'The right strategy depends on the evidence, legal issues, urgency and practical outcome sought. The firm assesses these factors before recommending the next procedural or settlement step.'
    },
]


def url_for(path):
    return SITE.rstrip('/') + ('/' if path == '/' else path)


def breadcrumb_schema(items):
    return {
        '@type':'BreadcrumbList',
        'itemListElement':[{'@type':'ListItem','position':i+1,'name':name,'item':url_for(path)} for i,(name,path) in enumerate(items)]
    }


def home_schema():
    services=[{
        '@type':'Offer',
        'itemOffered':{
            '@type':'Service',
            'name':p['short'],
            'url':f"{SITE}/practice-areas/{p['slug']}/",
            'areaServed':{'@type':'Country','name':'Kenya'}
        }
    } for p in PRACTICE_DATA]
    return {
        '@context':'https://schema.org',
        '@graph':[
            {
                '@type':'WebSite','@id':SITE+'/#website','url':SITE+'/',
                'name':'Susan Mute & Company Advocates','inLanguage':'en-KE',
                'publisher':{'@id':SITE+'/#lawfirm'}
            },
            {
                '@type':['LegalService','Organization'],'@id':SITE+'/#lawfirm',
                'name':'Susan Mute & Company Advocates','legalName':'Susan Mute & Company Advocates',
                'url':SITE+'/',
                'logo':{'@type':'ImageObject','url':SITE+'/images/icon-512.png','width':512,'height':512},
                'image':SITE+'/images/susan-mute-social-card.jpg',
                'telephone':PHONE_LINK,'email':EMAIL,
                'address':{'@type':'PostalAddress','streetAddress':ADDRESS_LINE,'addressLocality':CITY,'addressRegion':REGION,'addressCountry':'KE'},
                'geo':{'@type':'GeoCoordinates','latitude':-1.1723,'longitude':36.82974},
                'areaServed':{'@type':'Country','name':'Kenya'},
                'founder':{'@id':SITE+'/#susan-mute'},
                'contactPoint':{'@type':'ContactPoint','telephone':PHONE_LINK,'email':EMAIL,'contactType':'legal enquiries','availableLanguage':['English']},
                'hasOfferCatalog':{'@type':'OfferCatalog','name':'Legal Services','itemListElement':services}
            },
            {
                '@type':'Person','@id':SITE+'/#susan-mute','name':'Susan Mute',
                'jobTitle':'Founding & Managing Partner','worksFor':{'@id':SITE+'/#lawfirm'},
                'url':SITE+'/managing-partner','image':SITE+'/assets/media/susan-mute.webp',
                'sameAs':[LINKEDIN],
                'knowsAbout':['Commercial Law','Family Law','Property Law','Data Protection','Artificial Intelligence Law','Civil Litigation','Regulatory Compliance'],
                'subjectOf':[{'@type':'Article','url':CITIZEN_AI},{'@type':'Article','url':CITIZEN_DATA},{'@type':'Article','url':BUSINESS_DAILY}]
            }
        ]
    }


def internal_schema(name, path, schema_type='WebPage'):
    items=[('Home','/')]
    if path.startswith('/practice-areas/'):
        items.append(('Practice Areas','/practice-areas'))
    if path != '/':
        items.append((name,path))
    return {'@context':'https://schema.org','@graph':[
        {'@type':schema_type,'@id':url_for(path)+'#webpage','url':url_for(path),'name':name,'isPartOf':{'@id':SITE+'/#website'},'about':{'@id':SITE+'/#lawfirm'},'inLanguage':'en-KE'},
        breadcrumb_schema(items)
    ]}


def person_schema():
    data=internal_schema('Susan Mute','/managing-partner','ProfilePage')
    data['@graph'][0]['mainEntity']={'@id':SITE+'/#susan-mute'}
    data['@graph'].append({
        '@type':'Person','@id':SITE+'/#susan-mute','name':'Susan Mute','jobTitle':'Founding & Managing Partner',
        'worksFor':{'@type':'LegalService','@id':SITE+'/#lawfirm','name':'Susan Mute & Company Advocates','url':SITE+'/'},
        'image':SITE+'/assets/media/susan-mute.webp','sameAs':[LINKEDIN,BUSINESS_DAILY_AUTHOR],
        'knowsAbout':['Commercial Law','Family Law','Property Law','Data Protection','Artificial Intelligence Law','Civil Litigation','Regulatory Compliance'],
        'subjectOf':[{'@type':'Article','url':CITIZEN_AI,'headline':'Kenya’s AI regulation must catch up with innovation'},
                     {'@type':'Article','url':CITIZEN_DATA,'headline':'Data Compliance for Kenyan Businesses in the Digital Age'},
                     {'@type':'Article','url':BUSINESS_DAILY,'headline':'Cyber phishing threatens privacy'},
                     {'@type':'CreativeWork','url':MCK_GUIDE,'name':'Guide on the Use of Social Media and the Internet for Media Practice in Kenya'}]
    })
    return data


def service_schema(p):
    data=internal_schema(p['short'],f"/practice-areas/{p['slug']}/")
    data['@graph'].append({
        '@type':'Service','@id':f"{SITE}/practice-areas/{p['slug']}/#service",
        'name':p['short'],'serviceType':p['short'],'description':p['desc'],
        'url':f"{SITE}/practice-areas/{p['slug']}/",
        'provider':{'@type':'LegalService','@id':SITE+'/#lawfirm','name':'Susan Mute & Company Advocates','url':SITE+'/'},
        'areaServed':{'@type':'Country','name':'Kenya'}
    })
    return data


def jsonld(data):
    return '<script type="application/ld+json">'+json.dumps(data,separators=(',',':'),ensure_ascii=False)+'</script>'


def head(title, desc, path='/', schema=None, robots='index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'):
    url=url_for(path)
    schema_markup=jsonld(schema) if schema else ''
    return f'''<!doctype html><html lang="en-KE"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>{escape(title)}</title><meta name="description" content="{escape(desc)}"><meta name="robots" content="{robots}"><meta name="author" content="Susan Mute &amp; Company Advocates"><link rel="canonical" href="{url}"><link rel="alternate" hreflang="en-KE" href="{url}"><link rel="alternate" hreflang="x-default" href="{url}"><meta name="theme-color" content="#081b39"><meta name="color-scheme" content="light"><meta property="og:type" content="website"><meta property="og:locale" content="en_KE"><meta property="og:site_name" content="Susan Mute &amp; Company Advocates"><meta property="og:title" content="{escape(title)}"><meta property="og:description" content="{escape(desc)}"><meta property="og:url" content="{url}"><meta property="og:image" content="{SITE}/images/susan-mute-social-card.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Susan Mute &amp; Company Advocates"><meta property="og:image:type" content="image/jpeg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{escape(title)}"><meta name="twitter:description" content="{escape(desc)}"><meta name="twitter:image" content="{SITE}/images/susan-mute-social-card.jpg"><meta name="twitter:image:alt" content="Susan Mute &amp; Company Advocates"><link rel="manifest" href="/site.webmanifest"><link rel="icon" type="image/png" sizes="192x192" href="/images/icon-192.png"><link rel="apple-touch-icon" href="/images/icon-192.png"><link rel="stylesheet" href="/assets/css/site.css?v=5">{schema_markup}</head><body><a class="skip-link" href="#main">Skip to content</a><div class="topline"></div>'''


def header(active=''):
    items=[('/', 'Home','home'),('/about','About','about'),('/practice-areas','Practice Areas','practice'),('/managing-partner','Susan Mute','partner'),('/insights','Insights','insights'),('/contact','Contact','contact')]
    links=''.join(f'<a class="{"active" if active==key else ""}" href="{href}">{label}</a>' for href,label,key in items)
    mlinks=''.join(f'<a href="{href}">{label}</a>' for href,label,key in items)
    return f'''<header class="site-header"><div class="container nav"><a class="brand" href="/" aria-label="Susan Mute & Company Advocates home"><img class="brand-mark" src="/images/monogram-white.png" width="58" height="58" decoding="async" alt=""><span class="brand-name"><b>Susan Mute</b><small>& Company Advocates</small></span></a><nav class="nav-links" aria-label="Primary navigation">{links}</nav><a class="nav-cta" href="{WA}" target="_blank" rel="noopener noreferrer">Start a consultation</a><button class="menu-btn" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-navigation"><span></span></button></div><nav class="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">{mlinks}<a href="{WA}" target="_blank" rel="noopener noreferrer">Start a consultation</a></nav></header>'''


def rail():
    return f'''<aside class="contact-rail" aria-label="Quick contact"><button class="rail-toggle" aria-label="Expand or collapse quick contact" aria-expanded="true"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg></button><div class="rail-actions"><a href="{WA}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Susan Mute & Company Advocates"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.3-4.2a8.5 8.5 0 1 1 15.7-4.5Z"/><path d="M8.5 8.2c.4 2.4 2.2 4.5 4.8 5.6.9.4 1.7-.3 2.1-1.2"/></svg></a><a href="tel:{PHONE_LINK}" aria-label="Call Susan Mute & Company Advocates"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h3l1.4 4-2 1.4a16 16 0 0 0 7.2 7.2l1.4-2L20 16v3c0 1.1-.9 2-2 2C9.7 21 3 14.3 3 6c0-1.1.9-2 2-2Z"/></svg></a></div></aside>'''


def cta():
    return f'''<section class="cta-strip"><div class="container"><div><h2>Need legal advice?</h2><p>Call, WhatsApp or email the firm to discuss your matter.</p></div><a class="btn btn-light" href="{WA}" target="_blank" rel="noopener noreferrer">Start a consultation →</a></div></section>'''


def footer():
    return f'''<footer class="footer"><div class="container"><div class="footer-grid"><div><div class="footer-brand"><img src="/images/logo-white.png" width="1236" height="1095" loading="lazy" decoding="async" alt="Susan Mute & Company Advocates"></div><p>{PRACTICES}</p></div><div><h4>Contact</h4><p><a href="tel:{PHONE_LINK}">{PHONE_DISPLAY}</a><br><a href="mailto:{EMAIL}">{EMAIL}</a><br>Kikinga House, 6th Floor, Suite 600B<br>Biashara Street, Kiambu Town</p></div><div><h4>Quick links</h4><p><a href="/practice-areas">Practice Areas</a><br><a href="/managing-partner">Susan Mute</a><br><a href="{WA}" target="_blank" rel="noopener noreferrer">Start a consultation</a></p></div></div><div class="footer-bottom"><span>© 2026 Susan Mute & Company Advocates.</span><span><a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="/legal-notice">Legal Notice</a></span></div></div></footer><script src="/assets/js/site.js?v=5" defer></script></body></html>'''


def wrap(body,title,desc,path='/',active='',schema=None,robots='index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'):
    return head(title,desc,path,schema,robots)+header(active)+f'<main id="main">{body}</main>'+rail()+cta()+footer()


def breadcrumbs(items):
    parts=[]
    for i,(name,path) in enumerate(items):
        if i < len(items)-1:
            parts.append(f'<a href="{path}">{escape(name)}</a><span aria-hidden="true">/</span>')
        else:
            parts.append(f'<span aria-current="page">{escape(name)}</span>')
    return '<nav class="breadcrumbs container" aria-label="Breadcrumb">'+''.join(parts)+'</nav>'

# Home
cards=''.join(f'''<a class="practice-card practice-{p['slug']}" href="/practice-areas/{p['slug']}/"><div class="practice-content"><span class="practice-number">{i:02d}</span><h3>{p['short']}</h3><p>{summary}</p><span class="practice-link">View practice →</span></div></a>''' for i,(p,summary) in enumerate(zip(
    PRACTICE_DATA,
    [
      'Commercial agreements, corporate governance and practical business legal support.',
      'Clear guidance on family matters, matrimonial property, custody and maintenance.',
      'Property transactions, transfers, leases, documentation and due diligence.',
      'Privacy compliance, data governance, policy formulation and regulatory advice.',
      'AI governance, technology contracts, privacy, accountability and regulatory risk.',
      'Advice and representation for civil claims, disputes and court processes.'
    ]
),1))

home=f'''<section class="hero"><div class="container"><div class="hero-content"><div class="eyebrow">Home</div><h1 class="display">A law firm focused on<br><span>quality legal service.</span></h1><p class="lead">We provide timely, practical legal services in commercial law, data protection, property law, artificial intelligence, family law and civil matters.</p><div class="hero-actions"><a class="btn btn-cyan" href="{WA}" target="_blank" rel="noopener noreferrer">Start a consultation</a><a class="btn btn-ghost" href="/practice-areas">Explore practice areas</a></div><div class="hero-meta"><span><i></i>{PHONE_DISPLAY}</span></div></div></div></section>
<section class="section"><div class="container intro-grid"><div><div class="eyebrow">The firm</div><h2 class="section-title">Quality service. Timely advice. Practical solutions.</h2><p class="section-copy">Susan Mute & Company Advocates provides litigation, consultation and advisory services with a focus on professionalism, integrity and responsive client service.</p><div class="values"><div class="value"><b>Transparency</b><span>Clear communication on the legal position and available options.</span></div><div class="value"><b>Professionalism</b><span>Careful legal service tailored to each matter.</span></div><div class="value"><b>Integrity</b><span>Ethical practice grounded in the rule of law.</span></div></div></div><div class="logo-animation"><video autoplay muted loop playsinline preload="metadata" poster="/images/icon-512.png" aria-label="Animated Susan Mute & Company Advocates logo"><source src="/assets/media/susan-mute-logo-intro.mp4" type="video/mp4"></video><img class="motion-poster" src="/images/icon-512.png" width="512" height="512" loading="lazy" decoding="async" alt="Susan Mute & Company Advocates logo"><small>SUSAN MUTE & COMPANY ADVOCATES</small></div></div></section>
<section class="section practice-section"><div class="container"><div class="eyebrow">Practice areas</div><h2 class="section-title">Focused legal services for business and personal matters.</h2><div class="practice-grid">{cards}</div></div></section>
<section class="section partner-section"><div class="container partner-grid"><div class="partner-visual" role="img" aria-label="Susan Mute, Founding and Managing Partner"><div class="partner-badge"><strong>Susan Mute</strong><span>Advocate · Founding & Managing Partner</span></div></div><div><div class="eyebrow">Susan Mute</div><h2 class="section-title">Legal experience with regulatory and business insight.</h2><p class="section-copy">Susan Mute is an Advocate of the High Court of Kenya and the Founding & Managing Partner of the firm. Her work spans commercial and corporate law, data protection, property, compliance and technology-related legal matters.</p><div class="partner-points"><div class="partner-point"><b>Regulatory insight</b><span>Experience across compliance, data protection and technology governance.</span></div><div class="partner-point"><b>Public contribution</b><span>Contributor to legal and policy discussions on privacy, AI and digital regulation.</span></div></div><div class="action-row"><a class="btn btn-cyan" href="/managing-partner">Meet Susan Mute</a></div></div></div></section>
<section class="image-band"><div class="photo" aria-label="Business and legal environment in Kenya"></div><div class="copy"><div class="eyebrow">Practical counsel</div><h2 class="section-title">Clear advice for important decisions.</h2><p>We help clients understand the legal position, manage risk and choose an appropriate next step.</p><a class="btn btn-cyan image-band-btn" href="/contact">Talk to the firm</a></div></section>
<section class="consult-band"><div class="container"><div><h2>Discuss your legal matter.</h2><p>Contact Susan Mute & Company Advocates by WhatsApp, phone or email.</p></div><a class="btn btn-navy" href="{WA}" target="_blank" rel="noopener noreferrer">Start on WhatsApp →</a></div></section>
<section class="section"><div class="container"><div class="eyebrow">Insights</div><h2 class="section-title">Selected commentary by Susan Mute.</h2><div class="insight-grid"><article class="insight-card"><span class="tag">Citizen Digital · 2026</span><h3>Kenya’s AI regulation must catch up with innovation</h3><p>Commentary on the legal and governance questions created by wider adoption of artificial intelligence.</p><a href="{CITIZEN_AI}" target="_blank" rel="noopener noreferrer">Read article →</a></article><article class="insight-card"><span class="tag">Citizen Digital · 2025</span><h3>Data compliance for Kenyan businesses in the digital age</h3><p>A practical look at organisational accountability and data-protection compliance.</p><a href="{CITIZEN_DATA}" target="_blank" rel="noopener noreferrer">Read article →</a></article><article class="insight-card"><span class="tag">Business Daily · 2025</span><h3>Cyber phishing threatens privacy</h3><p>Commentary on cyber risk, privacy and safeguards for personal information.</p><a href="{BUSINESS_DAILY}" target="_blank" rel="noopener noreferrer">Read article →</a></article></div><div class="insights-more"><a class="btn btn-navy" href="/insights">View all insights</a></div></div></section>'''
(ROOT/'index.html').write_text(wrap(home,'Law Firm in Kiambu, Kenya | Susan Mute & Company Advocates','Susan Mute & Company Advocates is a law firm in Kiambu, Kenya providing commercial, family, property, data protection, artificial intelligence and civil legal services.','/','home',home_schema()),encoding='utf-8')

# About
about=f'''<section class="page-hero"><div class="container"><div class="eyebrow">About the firm</div><h1 class="page-title">Committed to quality and timely legal service.</h1><p>Susan Mute & Company Advocates was established to provide high-quality legal services, practical advice and responsive support to clients.</p></div></section><section class="page-main">{breadcrumbs([('Home','/'),('About','/about')])}<div class="container two-col"><div><h2 class="section-title">Professional service. Personal attention.</h2><p class="section-copy">The firm provides litigation, consultation and advisory services to individuals, businesses and institutions across commercial, property, family, data protection, technology and civil matters.</p><p class="section-copy">Our approach is grounded in professionalism, integrity, clear communication and a commitment to serving clients in a timely manner.</p></div><div class="logo-animation"><video autoplay muted loop playsinline preload="metadata" poster="/images/icon-512.png" aria-label="Animated Susan Mute & Company Advocates logo"><source src="/assets/media/susan-mute-logo-intro.mp4" type="video/mp4"></video><img class="motion-poster" src="/images/icon-512.png" width="512" height="512" loading="lazy" decoding="async" alt="Susan Mute & Company Advocates logo"><small>EXCELLENCE · INTEGRITY</small></div></div><div class="container about-values"><div class="two-col"><div class="info-card"><h3>Mission</h3><p>To provide exceptional legal services, expert advice and innovative solutions with excellence and integrity.</p></div><div class="info-card"><h3>Vision</h3><p>To be a leading legal practice recognised for professional, practical and forward-looking legal service.</p></div></div><div class="core-values" aria-label="Core values"><div class="core-value">Transparency</div><div class="core-value">Accountability</div><div class="core-value">Professionalism</div><div class="core-value">Integrity</div><div class="core-value">Respect for the rule of law</div></div></div></section>'''
(ROOT/'about.html').write_text(wrap(about,'About Our Law Firm | Susan Mute & Company Advocates','Learn about Susan Mute & Company Advocates, a law firm in Kiambu, Kenya focused on professional, timely and client-centred legal services.','/about','about',internal_schema('About Susan Mute & Company Advocates','/about','AboutPage')),encoding='utf-8')

# Practice overview
practice_cards=''.join(f'''<article class="info-card" id="{p['slug']}"><h2>{p['short']}</h2><p>{p['summary']}</p><a class="text-link" href="/practice-areas/{p['slug']}/">Explore {p['short']} →</a></article>''' for p in PRACTICE_DATA)
practice=f'''<section class="page-hero"><div class="container"><div class="eyebrow">Practice areas</div><h1 class="page-title">Our areas of practice.</h1><p>Focused legal advice and representation for individuals, businesses and institutions.</p></div></section><section class="page-main">{breadcrumbs([('Home','/'),('Practice Areas','/practice-areas')])}<div class="container"><div class="two-col">{practice_cards}</div></div></section>'''
(ROOT/'practice-areas.html').write_text(wrap(practice,'Legal Services in Kenya | Susan Mute & Company Advocates','Explore commercial, family, property, data protection, artificial intelligence and civil legal services offered by Susan Mute & Company Advocates in Kenya.','/practice-areas','practice',internal_schema('Practice Areas','/practice-areas','CollectionPage')),encoding='utf-8')

# Dedicated service pages
for p in PRACTICE_DATA:
    d=ROOT/'practice-areas'/p['slug']; d.mkdir(parents=True,exist_ok=True)
    related=''.join(f'<a class="related-service" href="/practice-areas/{x["slug"]}/">{x["short"]} →</a>' for x in PRACTICE_DATA if x['slug']!=p['slug'])
    bullets=''.join(f'<li>{escape(x)}</li>' for x in p['points'])
    body=f'''<section class="page-hero service-hero"><div class="container"><div class="eyebrow">{p['short']}</div><h1 class="page-title">{p['short']}.</h1><p>{p['lead']}</p></div></section><section class="page-main">{breadcrumbs([('Home','/'),('Practice Areas','/practice-areas'),(p['short'],f"/practice-areas/{p['slug']}/")])}<div class="container service-layout"><article><h2 class="section-title">How we can assist.</h2><p class="section-copy">{p['summary']}</p><div class="service-list"><h3>Services include</h3><ul>{bullets}</ul></div><p class="small-note">General information only. Advice depends on the facts, documents and applicable law in each matter.</p></article><aside class="service-aside"><div class="info-card"><h3>Speak with the firm</h3><p>Contact Susan Mute & Company Advocates to discuss your matter.</p><a class="btn btn-cyan" href="{WA}" target="_blank" rel="noopener noreferrer">Start on WhatsApp</a></div><div class="related-box"><h3>Related legal services</h3>{related}</div></aside></div></section>'''
    (d/'index.html').write_text(wrap(body,p['title'],p['desc'],f"/practice-areas/{p['slug']}/",'practice',service_schema(p)),encoding='utf-8')

# Managing partner
publications=f'''<section class="section publication-section"><div class="container"><div class="eyebrow">Selected work & commentary</div><h2 class="section-title">Contributions beyond the firm.</h2><div class="publication-grid"><article class="insight-card"><span class="tag">Media Council of Kenya</span><h3>Media, AI, data and social-media guidelines</h3><p>Susan participated in the Media Council of Kenya technical working group, including the Social Media and Internet subgroup.</p><a href="{MCK_TWG}" target="_blank" rel="noopener noreferrer">View MCK record →</a></article><article class="insight-card"><span class="tag">Citizen Digital · 2026</span><h3>Kenya’s AI regulation must catch up with innovation</h3><p>Commentary on AI adoption, governance and the need for responsive legal frameworks.</p><a href="{CITIZEN_AI}" target="_blank" rel="noopener noreferrer">Read article →</a></article><article class="insight-card"><span class="tag">Citizen Digital · 2025</span><h3>Data compliance for Kenyan businesses in the digital age</h3><p>Commentary on data protection, institutional accountability and compliance.</p><a href="{CITIZEN_DATA}" target="_blank" rel="noopener noreferrer">Read article →</a></article><article class="insight-card"><span class="tag">Business Daily · 2025</span><h3>Cyber phishing threatens privacy</h3><p>Commentary on privacy, cyber risk and safeguards for personal information.</p><a href="{BUSINESS_DAILY}" target="_blank" rel="noopener noreferrer">Read article →</a></article></div></div></section>'''
partner=f'''<section class="page-hero"><div class="container"><div class="eyebrow">Founding & Managing Partner</div><h1 class="page-title">Susan Mute.</h1><p>Advocate of the High Court of Kenya and Founding & Managing Partner of Susan Mute & Company Advocates.</p></div></section><section class="page-main">{breadcrumbs([('Home','/'),('Susan Mute','/managing-partner')])}<div class="container partner-grid"><div class="partner-visual" role="img" aria-label="Portrait of Susan Mute"><div class="partner-badge"><strong>Susan Mute</strong><span>Advocate · Founding & Managing Partner</span></div></div><div><div class="eyebrow">Profile</div><h2 class="section-title">Legal experience across business, regulation and technology.</h2><p class="section-copy">Susan Mute is an Advocate of the High Court of Kenya, a member of the Law Society of Kenya, and the Founding & Managing Partner of Susan Mute & Company Advocates.</p><p class="section-copy">Her experience spans corporate and commercial law, employment, data protection, property, regulatory compliance and technology-related legal matters, including work with businesses, governments and NGOs.</p><p class="section-copy">She has contributed to Media Council of Kenya work on media, AI, data and social-media guidelines, and regularly writes on privacy, data compliance and artificial intelligence regulation.</p><div class="profile-links"><a class="text-link" href="{LINKEDIN}" target="_blank" rel="noopener noreferrer">LinkedIn →</a><a class="text-link" href="{BUSINESS_DAILY_AUTHOR}" target="_blank" rel="noopener noreferrer">Business Daily author page →</a></div><a class="btn btn-cyan" href="{WA}" target="_blank" rel="noopener noreferrer">Start a consultation</a></div></div></section>{publications}'''
(ROOT/'managing-partner.html').write_text(wrap(partner,'Susan Mute | Advocate of the High Court of Kenya','Meet Susan Mute, Advocate of the High Court of Kenya and Founding & Managing Partner of Susan Mute & Company Advocates, with experience in commercial, regulatory, data protection and technology law.','/managing-partner','partner',person_schema()),encoding='utf-8')

# Insights
insights=f'''<section class="page-hero"><div class="container"><div class="eyebrow">Insights</div><h1 class="page-title">Insights & commentary.</h1><p>Selected writing and public contributions by Susan Mute on law, technology, privacy and regulation.</p></div></section><section class="page-main">{breadcrumbs([('Home','/'),('Insights','/insights')])}<div class="container"><div class="publication-grid"><article class="insight-card"><span class="tag">Citizen Digital · August 2026</span><h2>Kenya’s AI regulation must catch up with innovation</h2><p>Susan examines how AI is changing business and why regulation must keep pace with innovation.</p><a href="{CITIZEN_AI}" target="_blank" rel="noopener noreferrer">Read on Citizen Digital →</a></article><article class="insight-card"><span class="tag">Citizen Digital · June 2025</span><h2>Data compliance for Kenyan businesses in the digital age</h2><p>A practical discussion of data protection, accountability and compliance for organisations.</p><a href="{CITIZEN_DATA}" target="_blank" rel="noopener noreferrer">Read on Citizen Digital →</a></article><article class="insight-card"><span class="tag">Business Daily · June 2025</span><h2>Cyber phishing threatens privacy</h2><p>Susan discusses phishing, privacy risks and institutional responsibilities for protecting personal data.</p><a href="{BUSINESS_DAILY}" target="_blank" rel="noopener noreferrer">Read on Business Daily →</a></article><article class="insight-card"><span class="tag">Media Council of Kenya</span><h2>Guidance for media practice in the digital age</h2><p>Susan is acknowledged among contributors to the Media Council of Kenya guide on social media and internet use for media practice.</p><a href="{MCK_GUIDE}" target="_blank" rel="noopener noreferrer">View the MCK guide →</a></article></div></div></section>'''
(ROOT/'insights.html').write_text(wrap(insights,'Insights & Commentary | Susan Mute & Company Advocates','Read selected legal commentary and public contributions by Susan Mute on artificial intelligence, data protection, privacy and digital regulation.','/insights','insights',internal_schema('Insights & Commentary','/insights','CollectionPage')),encoding='utf-8')

# Contact
contact=f'''<section class="page-hero"><div class="container"><div class="eyebrow">Contact</div><h1 class="page-title">Get in touch.</h1><p>Call, WhatsApp or email Susan Mute & Company Advocates. Current office details are provided below.</p></div></section><section class="page-main">{breadcrumbs([('Home','/'),('Contact','/contact')])}<div class="container contact-grid"><div><div class="contact-list"><div class="contact-item"><small>Phone / WhatsApp</small><a href="tel:{PHONE_LINK}">{PHONE_DISPLAY}</a></div><div class="contact-item"><small>Email</small><a href="mailto:{EMAIL}">{EMAIL}</a></div><div class="contact-item"><small>Office</small><span>Kikinga House<br>6th Floor, Suite 600B<br>Biashara Street, Kiambu Town<br>Next to KCB Bank</span></div><div class="contact-item"><small>Consultation</small><a href="{WA}" target="_blank" rel="noopener noreferrer">Start on WhatsApp →</a></div></div></div><div><form class="contact-form" data-contact-form aria-describedby="contact-privacy-note"><label class="field"><span>Your name</span><input name="name" autocomplete="name" maxlength="120" required></label><label class="field"><span>Phone number</span><input name="phone" autocomplete="tel" inputmode="tel" maxlength="30"></label><label class="field full"><span>Email address</span><input type="email" name="email" autocomplete="email" maxlength="180"></label><label class="field full"><span>Matter type</span><select name="matter"><option value="General legal enquiry">General legal enquiry</option><option>Commercial Law</option><option>Family Law</option><option>Property Law</option><option>Data Privacy & Protection</option><option>Artificial Intelligence</option><option>Civil Law</option></select></label><label class="field full"><span>Briefly describe the matter</span><textarea name="message" maxlength="1800"></textarea></label><button class="btn btn-navy full" type="submit">Prepare email enquiry</button></form><p class="small-note" id="contact-privacy-note">Submitting this form opens your device’s email application. The website does not store the information you enter, and contacting the firm does not by itself create an advocate-client relationship.</p></div></div></section><section class="map-wrap"><div class="container map-head"><div class="eyebrow">Find the office</div><h2 class="section-title">Kikinga House, Biashara Street.</h2></div><div class="map-shell"><iframe title="Map to Susan Mute & Company Advocates" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Kikinga%20House%20Biashara%20Street%20Kiambu%20Town%20KCB%20Bank%20Kenya&output=embed"></iframe><div class="map-footer"><div><strong>Kikinga House, 6th Floor, Suite 600B</strong><span>Biashara Street, next to KCB Bank, Kiambu Town, Kenya</span></div><a class="btn btn-navy" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query=Kikinga+House+Biashara+Street+Kiambu+Town+KCB+Bank+Kenya">Open in Google Maps →</a></div></div></section>'''
contact_schema=internal_schema('Contact Susan Mute & Company Advocates','/contact','ContactPage')
contact_schema['@graph'].append({'@type':'LegalService','@id':SITE+'/#lawfirm','name':'Susan Mute & Company Advocates','telephone':PHONE_LINK,'email':EMAIL,'url':SITE+'/', 'address':{'@type':'PostalAddress','streetAddress':ADDRESS_LINE,'addressLocality':CITY,'addressRegion':REGION,'addressCountry':'KE'}})
(ROOT/'contact.html').write_text(wrap(contact,'Contact Susan Mute & Company Advocates | Kiambu Town','Contact Susan Mute & Company Advocates by phone, WhatsApp or email. Current office: Kikinga House, 6th Floor, Suite 600B, Biashara Street, Kiambu Town.','/contact','contact',contact_schema),encoding='utf-8')

# Privacy/Terms/Legal
privacy=f'''<section class="page-hero"><div class="container"><div class="eyebrow">Privacy</div><h1 class="page-title">Privacy notice.</h1></div></section><section class="page-main">{breadcrumbs([('Home','/'),('Privacy','/privacy')])}<div class="container"><div class="info-card"><h2>Website privacy</h2><p>This website is designed to minimise collection of personal information. The enquiry form prepares an email in the visitor’s own email application rather than submitting information to a website database. Calls and WhatsApp actions open the relevant application on the visitor’s device.</p><p>If you contact Susan Mute & Company Advocates directly, information you provide may be used to respond to the enquiry, assess whether the firm can assist and communicate about the matter. Do not send highly sensitive or confidential information through the website before the firm has confirmed the appropriate channel for it.</p><p>Third-party services such as Google Maps and WhatsApp may process information under their own privacy terms when you use those services.</p></div></div></section>'''
(ROOT/'privacy.html').write_text(wrap(privacy,'Privacy Policy | Susan Mute & Company Advocates','Privacy information for the Susan Mute & Company Advocates website, including website enquiries and third-party contact services.','/privacy','',internal_schema('Privacy Policy','/privacy')),encoding='utf-8')
terms=f'''<section class="page-hero"><div class="container"><div class="eyebrow">Terms</div><h1 class="page-title">Website information.</h1></div></section><section class="page-main">{breadcrumbs([('Home','/'),('Terms','/terms')])}<div class="container"><div class="info-card"><h2>General information only</h2><p>Content on this website is provided for general information and does not replace legal advice based on the facts and documents of a specific matter. Viewing the website, using its contact links or sending an enquiry does not by itself create an advocate-client relationship.</p><p>Legal outcomes depend on the applicable law, evidence and circumstances of each matter. Do not rely on general website content as a substitute for specific professional advice.</p><p>External links are provided for convenience. Susan Mute & Company Advocates is not responsible for the content or availability of third-party websites or services.</p></div></div></section>'''
(ROOT/'terms.html').write_text(wrap(terms,'Website Terms | Susan Mute & Company Advocates','Website terms and legal information for Susan Mute & Company Advocates.','/terms','',internal_schema('Website Terms','/terms')),encoding='utf-8')
legal=f'''<section class="page-hero"><div class="container"><div class="eyebrow">Legal notice</div><h1 class="page-title">Professional website notice.</h1></div></section><section class="page-main">{breadcrumbs([('Home','/'),('Legal Notice','/legal-notice')])}<div class="container two-col"><div class="info-card"><h2>Firm</h2><p>Susan Mute & Company Advocates<br>Kikinga House, 6th Floor, Suite 600B<br>Biashara Street, Kiambu Town<br>Next to KCB Bank, Kenya</p><p><a href="tel:{PHONE_LINK}">{PHONE_DISPLAY}</a><br><a href="mailto:{EMAIL}">{EMAIL}</a></p></div><div class="info-card"><h2>Professional information</h2><p>Susan Mute is presented by the firm as an Advocate of the High Court of Kenya and a member of the Law Society of Kenya. Website content is general information and is not a guarantee of any legal outcome.</p></div></div></section>'''
(ROOT/'legal-notice.html').write_text(wrap(legal,'Legal Notice | Susan Mute & Company Advocates','Professional and contact information for Susan Mute & Company Advocates in Kiambu, Kenya.','/legal-notice','',internal_schema('Legal Notice','/legal-notice')),encoding='utf-8')

# Error pages: noindex
for code,title,msg in [
('404','Page not found.','The page you requested could not be found. Use the navigation or return to the home page.'),
('500','Something went wrong.','The website encountered an unexpected error. Please try again or contact the firm directly.'),
('503','Service temporarily unavailable.','The website is temporarily unavailable. Please try again shortly or contact the firm directly.'),
('504','Request timed out.','The request took too long to complete. Please try again or contact the firm directly.')]:
    body=f'''<section class="error-main"><div class="container"><p class="error-code">{code}</p><h1 class="section-title">{title}</h1><p>{msg}</p><a class="btn btn-navy" href="/">Return home</a></div></section>'''
    (ROOT/f'{code}.html').write_text(wrap(body,f'{code} | Susan Mute & Company Advocates',msg,f'/{code}','',None,'noindex,follow'),encoding='utf-8')

# SEO support files
(ROOT/'robots.txt').write_text(f'''User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n''',encoding='utf-8')
paths=['/','/about','/practice-areas']+[f"/practice-areas/{p['slug']}/" for p in PRACTICE_DATA]+['/managing-partner','/insights','/contact','/privacy','/terms','/legal-notice']
urls=''.join(f'<url><loc>{url_for(p)}</loc><lastmod>{LASTMOD}</lastmod><changefreq>{"weekly" if p in ["/","/insights"] else "monthly"}</changefreq><priority>{"1.0" if p=="/" else ("0.9" if p.startswith("/practice-areas/") else "0.8")}</priority></url>' for p in paths)
(ROOT/'sitemap.xml').write_text(f'''<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">{urls}</urlset>''',encoding='utf-8')
(ROOT/'site.webmanifest').write_text(json.dumps({'id':'/','name':'Susan Mute & Company Advocates','short_name':'Susan Mute Advocates','description':'Professional legal services from Susan Mute & Company Advocates in Kiambu, Kenya.','lang':'en-KE','start_url':'/','scope':'/','display':'standalone','background_color':'#ffffff','theme_color':'#081b39','icons':[{'src':'/images/icon-192.png','sizes':'192x192','type':'image/png'},{'src':'/images/icon-512.png','sizes':'512x512','type':'image/png'}]},separators=(',',':')),encoding='utf-8')

security_dir=ROOT/'.well-known'
security_dir.mkdir(parents=True,exist_ok=True)
(security_dir/'security.txt').write_text(
    f'''Contact: mailto:{EMAIL}
Expires: 2027-10-07T23:59:59Z
Preferred-Languages: en
Canonical: {SITE}/.well-known/security.txt
''',
    encoding='utf-8'
)

print(f'Generated SEO-enhanced site with {len(paths)} indexable URLs.')
