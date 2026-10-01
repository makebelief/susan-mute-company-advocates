(()=>{
  'use strict';
  const btn=document.querySelector('.menu-btn');
  const nav=document.querySelector('.mobile-nav');
  const closeMenu=()=>{if(!nav||!btn)return;nav.classList.remove('open');btn.setAttribute('aria-expanded','false');document.body.classList.remove('nav-open')};
  if(btn&&nav){
    btn.addEventListener('click',()=>{const open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',open?'true':'false');document.body.classList.toggle('nav-open',open)});
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
  }
  const rail=document.querySelector('.contact-rail');
  const toggle=document.querySelector('.rail-toggle');
  if(rail&&toggle){toggle.addEventListener('click',()=>{const collapsed=rail.classList.toggle('collapsed');toggle.setAttribute('aria-expanded',collapsed?'false':'true')})}
  const form=document.querySelector('[data-contact-form]');
  if(form){form.addEventListener('submit',e=>{
    e.preventDefault();
    const d=new FormData(form);
    const clean=v=>String(v||'').replace(/[\r\n]+/g,' ').trim().slice(0,1800);
    const subject=encodeURIComponent('Website enquiry - '+clean(d.get('matter')||'Legal matter'));
    const body=encodeURIComponent(`Name: ${clean(d.get('name'))}\nPhone: ${clean(d.get('phone'))}\nEmail: ${clean(d.get('email'))}\n\n${clean(d.get('message'))}`);
    window.location.href=`mailto:susanmutelaw@gmail.com?subject=${subject}&body=${body}`;
  })}
})();
