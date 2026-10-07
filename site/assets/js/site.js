(()=>{
  'use strict';

  const btn=document.querySelector('.menu-btn');
  const nav=document.querySelector('.mobile-nav');

  const setMenu=open=>{
    if(!nav||!btn)return;
    nav.classList.toggle('open',open);
    btn.setAttribute('aria-expanded',open?'true':'false');
    btn.setAttribute('aria-label',open?'Close menu':'Open menu');
    document.body.classList.toggle('nav-open',open);
  };

  if(btn&&nav){
    btn.addEventListener('click',()=>{
      setMenu(!nav.classList.contains('open'));
    });

    nav.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click',()=>setMenu(false));
    });

    document.addEventListener('keydown',e=>{
      if(e.key==='Escape'&&nav.classList.contains('open')){
        setMenu(false);
        btn.focus();
      }
    });

    document.addEventListener('pointerdown',e=>{
      if(
        nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !btn.contains(e.target)
      ){
        setMenu(false);
      }
    });

    window.addEventListener('resize',()=>{
      if(window.innerWidth>1020)setMenu(false);
    },{passive:true});
  }

  const rail=document.querySelector('.contact-rail');
  const toggle=document.querySelector('.rail-toggle');

  if(rail&&toggle){
    toggle.addEventListener('click',()=>{
      const collapsed=rail.classList.toggle('collapsed');
      toggle.setAttribute('aria-expanded',collapsed?'false':'true');
      toggle.setAttribute(
        'aria-label',
        collapsed?'Expand quick contact':'Collapse quick contact'
      );
    });
  }

  const form=document.querySelector('[data-contact-form]');

  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();

      if(!form.reportValidity())return;

      const d=new FormData(form);

      const clean=v=>
        String(v||'')
          .replace(/[\r\n]+/g,' ')
          .replace(/\s+/g,' ')
          .trim()
          .slice(0,1800);

      const matter=clean(d.get('matter')||'General legal enquiry');

      const subject=encodeURIComponent(
        `Website enquiry - ${matter}`
      );

      const body=encodeURIComponent(
        `Name: ${clean(d.get('name'))}\n`+
        `Phone: ${clean(d.get('phone'))}\n`+
        `Email: ${clean(d.get('email'))}\n`+
        `Matter: ${matter}\n\n`+
        `${clean(d.get('message'))}`
      );

      window.location.assign(
        `mailto:susanmutelaw@gmail.com?subject=${subject}&body=${body}`
      );
    });
  }
})();
