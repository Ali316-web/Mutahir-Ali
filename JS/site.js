(()=>{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover)').matches;
const hasG=typeof gsap!=='undefined';let lenis;
if(hasG)gsap.registerPlugin(ScrollTrigger);

/* split text into animatable characters */
$$('.split').forEach(el=>{const t=el.textContent;el.setAttribute('aria-label',t);el.innerHTML=[...t].map(c=>c===' '?' ':`<span class="ch" aria-hidden="true"><span>${c}</span></span>`).join('')});

/* project cards (shared by index + projects page) */
const mount=$('[data-projects]');
if(mount&&typeof PROJECTS!=='undefined'){
  mount.innerHTML=PROJECTS.map((p,i)=>`<article class="card" data-cursor="View">
    <div class="im"><img src="${p.image}" alt="${p.title} screenshot" loading="lazy"><span class="no mono">${String(i+1).padStart(2,'0')}/${String(PROJECTS.length).padStart(2,'0')}</span><span class="st mono">${p.status}</span></div>
    <h3>${p.title}</h3><div class="mono">${p.sub} · ${p.category} · ${p.year}</div>
    <p style="margin-top:.8rem">${p.description}</p>
    <div class="tags">${p.tech.map(t=>`<span>${t}</span>`).join('')}</div>
    <div class="links"><a href="${p.github}" target="_blank" rel="noopener">GitHub ↗</a>${p.live?`<a href="${p.live}" target="_blank" rel="noopener">Live preview ↗</a>`:''}</div></article>`).join('');
}

/* projects carousel: arrows / swipe / keys, no scroll hijacking */
(function(){const tr=$('#projects .track');if(!tr)return;
  const prev=$('#prev'),next=$('#next'),bar=$('.prog i'),cnt=$('#cnt'),cards=()=>$$('.card',tr);
  const step=()=>{const c=cards()[0];return c.offsetWidth+parseFloat(getComputedStyle(tr).gap)};
  const upd=()=>{const max=tr.scrollWidth-tr.clientWidth,i=Math.round(tr.scrollLeft/step()),n=cards().length;
    bar.style.width=(max>0?tr.scrollLeft/max*100:100)+'%';cnt.textContent=String(Math.min(i+1,n)).padStart(2,'0')+' / '+String(n).padStart(2,'0');
    prev.disabled=tr.scrollLeft<4;next.disabled=tr.scrollLeft>max-4};
  const go=d=>tr.scrollBy({left:d*step(),behavior:'smooth'});
  prev.addEventListener('click',()=>go(-1));next.addEventListener('click',()=>go(1));
  tr.addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);
  tr.tabIndex=0;tr.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(1)}if(e.key==='ArrowLeft'){e.preventDefault();go(-1)}});
  /* mouse drag */
  let down=false,sx=0,sl=0,moved=false;
  tr.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=tr.scrollLeft});
  addEventListener('pointermove',e=>{if(!down)return;const dx=e.clientX-sx;if(Math.abs(dx)>5){moved=true;tr.style.scrollSnapType='none'}tr.scrollLeft=sl-dx});
  addEventListener('pointerup',()=>{if(!down)return;down=false;tr.style.scrollSnapType='';if(moved){const i=Math.round(tr.scrollLeft/step());tr.scrollTo({left:i*step(),behavior:'smooth'})}});
  tr.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
  tr.addEventListener('dragstart',e=>e.preventDefault());
  requestAnimationFrame(upd);
})();

if(!hasG||reduce){document.body.classList.remove('loading');$('#loader')?.remove();$$('.ch>span').forEach(s=>s.style.transform='none');$$('[data-r]').forEach(e=>{e.style.opacity=1;e.style.transform='none'});initUI();return}

/* smooth scroll (Lenis) synced with ScrollTrigger */
if(typeof Lenis!=='undefined'){lenis=new Lenis({lerp:.09});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0)}

/* intro loader */
function intro(){
  const L=$('#loader');
  if(!L){start();return}
  let done=false;const num=$('#count'),bar=$('.bar',L);
  const o={v:0};
  const tl=gsap.timeline({onComplete:finish});
  tl.from('#loader h2',{y:40,opacity:0,duration:.8}).to(o,{v:100,duration:1.8,ease:'power2.inOut',onUpdate(){num.textContent=Math.round(o.v);bar.style.width=o.v+'%'}},0);
  function finish(){if(done)return;done=true;tl.kill();gsap.to(L,{yPercent:-100,duration:.9,ease:'power4.inOut',onComplete(){L.remove();document.body.classList.remove('loading');start()}})}
  $('#skip').addEventListener('click',finish);
}
function start(){
  gsap.to('#hero .ch>span,.phead .ch>span',{y:0,duration:1.1,ease:'power4.out',stagger:.04});
  gsap.from('.hero-top,.hero-bot,.hero-img',{opacity:0,y:30,duration:1,delay:.5,stagger:.15});
  initScroll();ScrollTrigger.refresh();
}

function initScroll(){
  /* titles */
  $$('.sh .split').forEach(el=>gsap.to($$('.ch>span',el),{y:0,duration:1,ease:'power4.out',stagger:.025,scrollTrigger:{trigger:el,start:'top 85%'}}));
  /* generic reveals */
  ScrollTrigger.batch('[data-r]',{start:'top 90%',onEnter:b=>gsap.to(b,{opacity:1,y:0,duration:.9,ease:'power3.out',stagger:.1})});
  /* hero parallax */
  gsap.to('.o1',{y:180,scrollTrigger:{trigger:'#hero',scrub:true,start:'top top',end:'bottom top'}});
  gsap.to('#hero h1',{yPercent:-12,scrollTrigger:{trigger:'#hero',scrub:true,start:'top top',end:'bottom top'}});
  /* stat counters */
  $$('[data-n]').forEach(el=>{const o={v:0},n=+el.dataset.n;gsap.to(o,{v:n,duration:1.6,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 90%'},onUpdate:()=>el.firstChild.nodeValue=Math.round(o.v)})});
  /* timeline line draws with scroll */
  const tl=$('.tl .fill');if(tl)gsap.to(tl,{height:'100%',ease:'none',scrollTrigger:{trigger:'.tl',start:'top 70%',end:'bottom 70%',scrub:true}});
  /* big CTA */
  gsap.from('.cta a',{scale:.85,opacity:0,duration:1.2,ease:'power3.out',scrollTrigger:{trigger:'.cta',start:'top 80%'}});
}

/* tilt + magnetic + cursor + tabs + menu + typing */
function initUI(){
  if(fine&&hasG){
    const c=$('.cur'),d=$('.cur-dot');gsap.set([c,d],{opacity:1});
    const cx=gsap.quickTo(c,'x',{duration:.35,ease:'power3'}),cy=gsap.quickTo(c,'y',{duration:.35,ease:'power3'}),dx=gsap.quickTo(d,'x',{duration:.08}),dy=gsap.quickTo(d,'y',{duration:.08});
    addEventListener('mousemove',e=>{cx(e.clientX);cy(e.clientY);dx(e.clientX);dy(e.clientY)});
    document.addEventListener('mouseover',e=>{const t=e.target.closest('[data-cursor]');c.classList.toggle('big',!!t);c.dataset.t=t?t.dataset.cursor:''});
    $$('.btn,.logo,.menu-btn').forEach(el=>{el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();gsap.to(el,{x:(e.clientX-r.left-r.width/2)*.25,y:(e.clientY-r.top-r.height/2)*.25,duration:.4})});el.addEventListener('mouseleave',()=>gsap.to(el,{x:0,y:0,duration:.6,ease:'elastic.out(1,.4)'}))});
    const hi=$('.hero-img');if(hi){hi.parentElement.addEventListener('mousemove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;gsap.to(hi,{rotationY:x*16,rotationX:-y*16,transformPerspective:800,duration:.8})})}
  }
  /* tabs */
  $$('.tab').forEach(t=>t.addEventListener('click',()=>{$$('.tab,.pane').forEach(e=>e.classList.remove('on'));t.classList.add('on');const p=$('#'+t.dataset.p);p.classList.add('on');if(hasG&&!reduce)gsap.from($$('.chips span',p),{y:20,opacity:0,duration:.5,stagger:.02,ease:'power2.out'})}));
  /* menu */
  const m=$('#menu'),b=$('.menu-btn');
  if(b){const tog=f=>{m.classList.toggle('open',f);b.querySelector('b').textContent=m.classList.contains('open')?'Close':'Menu';lenis&&(m.classList.contains('open')?lenis.stop():lenis.start())};
    b.addEventListener('click',()=>tog());$$('a',m).forEach(a=>a.addEventListener('click',()=>tog(false)))}
  /* anchor links through Lenis */
  $$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=$(a.getAttribute('href'));if(t){e.preventDefault();lenis?lenis.scrollTo(t,{offset:0}):t.scrollIntoView({behavior:'smooth'})}}));
  /* typing */
  const te=$('#typing');if(te){const ph=['Software Engineering Student','Web Developer','Digital Marketing Specialist','Laravel Developer'];let i=0,c=0,del=false;
    (function tick(){const s=ph[i];te.textContent=s.slice(0,c);if(!del&&c===s.length){del=true;return setTimeout(tick,1800)}if(del&&c===0){del=false;i=(i+1)%ph.length}c+=del?-1:1;setTimeout(tick,del?40:75)})()}
}
initUI();
intro();
})();
