(function(){
const toggle=document.getElementById('navToggle');
const mobile=document.getElementById('navMobile');
if(toggle&&mobile){
toggle.addEventListener('click',()=>mobile.classList.toggle('open'));
}
})();
(function(){
const bar=document.createElement('div');
bar.id='scroll-progress';
document.body.prepend(bar);
window.addEventListener('scroll',()=>{
const pct=window.scrollY/(document.body.scrollHeight-window.innerHeight)*100;
bar.style.width=Math.min(pct,100)+'%';
},{passive:true});
})();
(function(){
const nav=document.querySelector('nav');
if(!nav)return;
window.addEventListener('scroll',()=>{
nav.classList.toggle('scrolled',window.scrollY>80);
},{passive:true});
})();
(function(){
if(!('IntersectionObserver' in window))return;
const SELECTORS=[
'section h2','section h3','.gold-line',
'.card','.step',
'.brand-badge','.about-value','.product-card',
'.state-chip','.quote-detail',
'.contact-block','.stat-item','.calc-wrap'
].join(',');
const observer=new IntersectionObserver((entries)=>{
entries.forEach((entry)=>{
if(entry.isIntersecting){
entry.target.classList.add('in-view');
observer.unobserve(entry.target);
}
});
},{threshold:0.05,rootMargin:'0px 0px 0px 0px'});
document.querySelectorAll(SELECTORS).forEach((el)=>{
el.classList.add('reveal');
const parent=el.parentElement;
if(parent){
const siblings=parent.querySelectorAll('.card,.step,.stat-item,.brand-badge');
siblings.forEach((sib,si)=>{sib.style.transitionDelay=(si*0.08)+'s';});
}
observer.observe(el);
});

window.addEventListener('load',function(){
setTimeout(function(){
document.querySelectorAll('.reveal:not(.in-view)').forEach(function(el){
el.classList.add('in-view');
});
},600);
});
})();
(function(){
if(!('IntersectionObserver' in window))return;
function animateCount(el){
const target=parseInt(el.getAttribute('data-count'),10);
const suffix=el.getAttribute('data-suffix')||'';
const isRating=el.id==='stat-rating';
const duration=1800;
const start=performance.now();
function tick(now){
const t=Math.min((now-start)/duration,1);
const val=Math.round((1-Math.pow(1-t,3))*target);
el.textContent=isRating ?(val/10).toFixed(1):val+suffix;
if(t<1)requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
}
const observer=new IntersectionObserver((entries)=>{
entries.forEach((entry)=>{
if(entry.isIntersecting){animateCount(entry.target);observer.unobserve(entry.target);}
});
},{threshold:0.5});
document.querySelectorAll('[data-count]').forEach((el)=>observer.observe(el));
})();
(function(){
document.querySelectorAll('.faq-item').forEach((item)=>{
const h3=item.querySelector('h3');
const p=item.querySelector('p');
if(!h3||!p)return;

const wrap=document.createElement('div');
wrap.className='faq-answer';
p.parentNode.insertBefore(wrap,p);
wrap.appendChild(p);

const icon=document.createElement('span');
icon.className='faq-icon';
icon.textContent='+';
h3.appendChild(icon);
h3.style.cursor='pointer';

wrap.style.maxHeight='0';
wrap.style.overflow='hidden';
wrap.style.transition='max-height .35s cubic-bezier(.4,0,.2,1)';
item.classList.add('faq-closed');
h3.addEventListener('click',()=>{
const isOpen=!item.classList.contains('faq-closed');

document.querySelectorAll('.faq-item').forEach((other)=>{
other.classList.add('faq-closed');
const ow=other.querySelector('.faq-answer');
const oi=other.querySelector('.faq-icon');
if(ow)ow.style.maxHeight='0';
if(oi)oi.textContent='+';
});

if(!isOpen){
item.classList.remove('faq-closed');
wrap.style.maxHeight=wrap.scrollHeight+40+'px';
icon.textContent='−';
}
});
});
})();
(function(){
const call=document.createElement('a');
call.href='tel:+19294661426';
call.id='float-call';
call.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.72a16 16 0 0 0 6 6l1.27-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span>Call</span>';
document.body.appendChild(call);
const wa=document.createElement('a');
wa.href='https://wa.me/19294661426?text=Hi%2C%20I%27d%20like%20to%20get%20a%20quote%20for%20insulation%20materials.';
wa.id='float-whatsapp';
wa.target='_blank';
wa.rel='noopener noreferrer';
wa.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg><span>WhatsApp</span>';
document.body.appendChild(wa);
})();
(function(){
const btn=document.createElement('button');
btn.id='back-to-top';
btn.setAttribute('aria-label','Back to top');
btn.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>';
document.body.appendChild(btn);
window.addEventListener('scroll',()=>{
btn.classList.toggle('visible',window.scrollY>500);
},{passive:true});
btn.addEventListener('click',()=>{
window.scrollTo({top:0,behavior:'smooth'});
});
})();
(function(){
function showBanner(form,html,isError){
const el=document.createElement('div');
el.className=isError ? 'form-error':'form-success';
el.innerHTML=html;

const prev=form.parentNode.querySelector('.form-success,.form-error');
if(prev)prev.remove();
form.parentNode.insertBefore(el,form.nextSibling);
if(!isError){
form.style.opacity='.35';
form.style.pointerEvents='none';
}
}
document.querySelectorAll('form.form-card').forEach((form)=>{
form.addEventListener('submit',async function(e){
e.preventDefault();
const action=form.getAttribute('action')||'';
const btn=form.querySelector('[type="submit"]');
const origText=btn ? btn.textContent:'';

if(!action||action==='#'||action.includes('YOUR_FORM_ID')){
const data=new FormData(form);
const lines=[];
data.forEach((val,key)=>{
if(val&&!key.startsWith('_'))lines.push(key+':'+val);
});
const body=encodeURIComponent(lines.join('\n'));
const subj=encodeURIComponent('Prestige Insulation — New Inquiry');
window.location.href='mailto:Info@PrestigeInsulationco.com?subject='+subj+'&body='+body;
showBanner(form,'<strong>Opening your email client…</strong><br>Your details are pre-filled. Hit send and we\'ll respond within one business day.',false);
return;
}

if(btn){btn.disabled=true;btn.textContent='Sending…';}
try{
const res=await fetch(action,{
method:'POST',
body:(()=>{var fd=new FormData(form);fd.append('_next','https://prestigeinsulationco.com/thank-you.html');return fd;})(),
headers:{'Accept':'application/json'}
});
if(res.ok){
showBanner(form,'<strong>Message sent.</strong><br>We\'ll respond within one business day with availability and pricing.',false);
}else{
const json=await res.json().catch(()=>({}));
const msg=(json.errors||[]).map(function(err){return err.message;}).join(',')||'Submission error';
throw new Error(msg);
}
}catch(err){
if(btn){btn.disabled=false;btn.textContent=origText;}
showBanner(form,'Something went wrong. Call us at<a href="tel:+19294661426">(929)466-1426</a>or email<a href="mailto:Info@PrestigeInsulationco.com">Info@PrestigeInsulationco.com</a>.',true);
}
});
});
})();
(function(){
const form=document.getElementById('calc-form');
if(!form)return;
const DATA={
'R11':{sqft:170.67,app:'Walls — 2×4 framing',brands:'Premium Fiberglass'},
'R13-15':{sqft:125.94,app:'Walls — 2×4 framing(15" wide)',brands:'Premium Fiberglass'},
'R15-15':{sqft:67.81,app:'Walls — 2×4 framing(15" wide)',brands:'Premium Fiberglass'},
'R19-15':{sqft:77.50,app:'Floors&Crawl Spaces(15" wide)',brands:'Premium Fiberglass'},
'R21-15':{sqft:67.81,app:'Walls — 2×6 framing(15" wide)',brands:'Premium Fiberglass'},
'R30-16':{sqft:58.67,app:'Cathedral Ceilings&Attics(16" OC)',brands:'Premium Fiberglass'},
'R38-16':{sqft:42.67,app:'Attic Floors(16" OC)',brands:'Premium Fiberglass'},
'R38-24':{sqft:64.00,app:'Attic Floors(24" OC)',brands:'Premium Fiberglass'},
'R49-16':{sqft:32.00,app:'Attic Floors — cold climates(16" OC)',brands:'Premium Fiberglass'},
'R49-24':{sqft:48.00,app:'Attic Floors — cold climates(24" OC)',brands:'Premium Fiberglass'},
'RW-AFB':{sqft:85.33,app:'Walls&Floors — mineral wool',brands:'Mineral Wool AFB'},
'RW-R15':{sqft:59.70,app:'Walls — mineral wool(15" wide)',brands:'Mineral Wool R-15'},
'RW-R23':{sqft:39.80,app:'Walls&Floors — mineral wool',brands:'Mineral Wool R-23'},
'RW-R30':{sqft:29.90,app:'Cathedral Ceilings — mineral wool',brands:'Mineral Wool R-30'},
};
const sqftInput=document.getElementById('calc-sqft');
const rvalSelect=document.getElementById('calc-rval');
const resultEl=document.getElementById('calc-result');
function calculate(){
const sqft=parseFloat(sqftInput.value);
const rval=rvalSelect.value;
if(!sqft||sqft<=0||!rval||!DATA[rval]){resultEl.style.display='none';return;}
const d=DATA[rval];
const bags=Math.ceil(sqft/d.sqft);
const extra=Math.ceil(bags*1.10);
document.getElementById('calc-bags').textContent=bags;
document.getElementById('calc-bags-extra').textContent=extra;
document.getElementById('calc-app').textContent=d.app;
document.getElementById('calc-coverage').textContent=d.sqft.toFixed(0);
document.getElementById('calc-brands-out').textContent=d.brands;
resultEl.style.display='block';
}
sqftInput.addEventListener('input',calculate);
rvalSelect.addEventListener('change',calculate);
})();
(function(){
const bar=document.createElement('div');
bar.id='sticky-cta';
bar.innerHTML=
'<a href="tel:+19294661426" class="scta-call">&#9742;Call Now</a>'+
'<a href="/request-quote.html" class="scta-quote">Get a Quote&rarr;</a>';
document.body.appendChild(bar);
var footer=document.querySelector('footer');
function onScroll(){
var scrolled=window.scrollY>300;
var atBottom=footer
? window.scrollY+window.innerHeight>=footer.offsetTop-20
:false;
bar.classList.toggle('visible',scrolled&&!atBottom);
}
window.addEventListener('scroll',onScroll,{passive:true});
onScroll();
})();
(function(){
var path=window.location.pathname.replace(/\/$/,'')||'/index.html';

document.querySelectorAll('nav a:not(.nav-cta)').forEach(function(a){
var href=a.getAttribute('href')||'';
var normHref=href.replace(/\/$/,'')||'/index.html';
if(normHref===path||(path==='/index.html'&&normHref==='/index.html')){
a.classList.add('nav-active');
}
});
})();
(function(){
document.querySelectorAll('a[href^="tel:"]').forEach(function(a){

var wrap=document.createElement('span');
wrap.className='copy-phone-wrap';
a.parentNode.insertBefore(wrap,a);
wrap.appendChild(a);
var tip=document.createElement('span');
tip.className='copy-tooltip';
tip.textContent='Copied!';
wrap.appendChild(tip);
a.addEventListener('click',function(e){
var num=a.href.replace('tel:','');
if(navigator.clipboard){
navigator.clipboard.writeText(num).then(function(){
tip.classList.add('show');
setTimeout(function(){tip.classList.remove('show');},1800);
}).catch(function(){});
}

});
});
})();
(function(){
var mobile=document.getElementById('navMobile');
if(!mobile)return;
var phoneBar=document.createElement('a');
phoneBar.href='tel:+19294661426';
phoneBar.className='nav-mobile-phone';
phoneBar.innerHTML='<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>(929)466-1426';
mobile.insertBefore(phoneBar,mobile.firstChild);
})();
(function(){
var messages=[
'⚡ Order before 3pm EST — delivered tomorrow on stocked product',
'📦 5,000+orders fulfilled nationwide — same-day quotes',
'✓ Pay at delivery — no deposit,no upfront payment required',
'⚡<a href="/order-now.html" style="color:var(--black);font-weight:700;text-decoration:underline;">Order in 60 seconds →</a>',
];
var bar=document.createElement('div');
bar.id='top-bar';
var msgIdx=0;
function buildBar(msg){
bar.innerHTML=
'<div class="top-bar-inner">'+
'<span class="top-bar-msg">'+msg+'</span>'+
'<span class="top-bar-sep top-bar-hours-sep">·</span>'+
'<a href="tel:+19294661426" class="top-bar-phone">(929)466-1426</a>'+
'<a href="/order-now.html" class="top-bar-cta">Order Now ⚡</a>'+
'</div>';
}
buildBar(messages[0]);
var nav=document.querySelector('nav');
if(nav)nav.parentNode.insertBefore(bar,nav);
setInterval(function(){
msgIdx=(msgIdx+1)% messages.length;
var msgEl=bar.querySelector('.top-bar-msg');
if(msgEl){msgEl.style.opacity='0';setTimeout(function(){msgEl.textContent=messages[msgIdx];msgEl.style.opacity='1';},300);}
},5000);
})();
(function(){
var bar=document.createElement('div');
bar.id='mobile-cta-bar';
bar.innerHTML=
'<a href="tel:+19294661426" class="mobile-cta-call">'+
'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'+
'Call Now'+
'</a>'+
'<a href="/request-quote.html" class="mobile-cta-quote">'+
'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'+
'Get a Quote'+
'</a>';
document.body.appendChild(bar);
})();
(function(){
var hero=document.querySelector('.hero');
if(!hero)return;
var content=hero.querySelector('.hero-content');
if(!content)return;
var tX=0,tY=0,cX=0,cY=0;
document.addEventListener('mousemove',function(e){
var rect=hero.getBoundingClientRect();
tX=((e.clientX-rect.left)/rect.width-.5)*12;
tY=((e.clientY-rect.top)/rect.height-.5)*6;
});
(function loop(){
cX+=(tX-cX)*.06;
cY+=(tY-cY)*.06;
content.style.transform='translate('+cX.toFixed(2)+'px,'+cY.toFixed(2)+'px)';
requestAnimationFrame(loop);
})();
})();
(function(){
var hero=document.querySelector('.hero');
if(!hero)return;
['hero-orb','hero-orb-2'].forEach(function(cls){
var orb=document.createElement('div');
orb.className=cls;
hero.appendChild(orb);
});
})();
(function(){
var toasts=[
{city:'Dallas,TX',action:'just got a quote'},
{city:'Phoenix,AZ',action:'ordered R-21 batts'},
{city:'Chicago,IL',action:'just requested delivery'},
{city:'Atlanta,GA',action:'placed an order'},
{city:'Houston,TX',action:'just got a quote'},
{city:'Los Angeles,CA',action:'requested mineral wool'},
{city:'Charlotte,NC',action:'ordered R-38 attic batts'},
{city:'Denver,CO',action:'just got a quote'},
{city:'Nashville,TN',action:'placed an order'},
{city:'Seattle,WA',action:'requested R-49 supply'},
];

if(window.location.pathname.indexOf('request-quote')!==-1)return;
var style=document.createElement('style');
style.textContent=[
'#sp-toast{',
'position:fixed;bottom:80px;left:1.5rem;z-index:1000;',
'background:var(--white);border:1px solid var(--border);',
'box-shadow:0 8px 32px rgba(0,0,0,.12);',
'padding:.875rem 1.25rem;',
'display:flex;align-items:center;gap:.875rem;',
'max-width:280px;',
'transform:translateX(-120%);',
'transition:transform .4s cubic-bezier(.34,1.56,.64,1);',
'border-left:3px solid var(--gold);',
'}',
'#sp-toast.show{transform:translateX(0);}',
'.sp-dot{width:8px;height:8px;background:var(--gold);border-radius:50%;flex-shrink:0;}',
'.sp-text{font-size:.78rem;line-height:1.4;color:var(--muted);}',
'.sp-city{font-weight:600;color:var(--text);font-size:.8rem;}',
'@media(max-width:1100px){#sp-toast{bottom:68px;}}',
].join('');
document.head.appendChild(style);
var el=document.createElement('div');
el.id='sp-toast';
document.body.appendChild(el);
var idx=Math.floor(Math.random()*toasts.length);
var shown=0;
function showNext(){
if(shown>=3)return;
var t=toasts[idx % toasts.length];
idx++;
el.innerHTML=
'<div class="sp-dot"></div>'+
'<div class="sp-text">'+
'<div class="sp-city">'+t.city+'</div>'+
'A contractor '+t.action+
'</div>';
el.classList.add('show');
setTimeout(function(){
el.classList.remove('show');
shown++;
if(shown<3)setTimeout(showNext,12000);
},5000);
}
setTimeout(showNext,6000);
})();
(function(){

if(sessionStorage.getItem('exitShown'))return;
if(window.location.pathname.indexOf('request-quote')!==-1)return;
var style=document.createElement('style');
style.textContent=[
'#exit-overlay{',
'position:fixed;inset:0;z-index:2000;',
'background:rgba(8,8,7,.75);',
'backdrop-filter:blur(6px);',
'display:flex;align-items:center;justify-content:center;',
'opacity:0;pointer-events:none;',
'transition:opacity .3s;',
'}',
'#exit-overlay.open{opacity:1;pointer-events:all;}',
'#exit-modal{',
'background:var(--black);',
'border:1px solid rgba(201,160,76,.25);',
'max-width:480px;width:90%;',
'padding:3.5rem 3rem;position:relative;',
'text-align:center;',
'}',
'#exit-modal .em-label{',
'font-size:.6rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;',
'color:var(--gold);margin-bottom:1.25rem;display:block;',
'}',
'#exit-modal h3{',
'font-family:"Playfair Display",serif;font-size:1.75rem;font-weight:500;',
'color:var(--text-inv);line-height:1.15;margin-bottom:1rem;',
'}',
'#exit-modal p{font-size:.9rem;color:var(--muted-inv);margin-bottom:2rem;line-height:1.7;font-weight:300;}',
'#exit-modal .em-actions{display:flex;flex-direction:column;gap:.75rem;}',
'#exit-modal .em-primary{',
'display:block;background:var(--gold);color:#fff;',
'padding:1rem;font-size:.72rem;font-weight:700;',
'letter-spacing:.18em;text-transform:uppercase;',
'text-decoration:none;transition:background .2s;',
'}',
'#exit-modal .em-primary:hover{background:var(--gold-dk);color:#fff;}',
'#exit-modal .em-secondary{',
'font-size:.75rem;color:rgba(240,237,230,.35);cursor:pointer;',
'background:none;border:none;padding:.5rem;',
'}',
'#exit-modal .em-secondary:hover{color:rgba(240,237,230,.6);}',
'#exit-modal .em-close{',
'position:absolute;top:1rem;right:1.25rem;',
'background:none;border:none;color:rgba(240,237,230,.3);',
'font-size:1.5rem;cursor:pointer;line-height:1;',
'}',
'#exit-modal .em-close:hover{color:var(--gold);}',
].join('');
document.head.appendChild(style);
var overlay=document.createElement('div');
overlay.id='exit-overlay';
overlay.innerHTML=
'<div id="exit-modal">'+
'<button class="em-close" id="exitClose">&times;</button>'+
'<span class="em-label">Before you go</span>'+
'<h3>Get a same-day quote<br>before you leave.</h3>'+
'<p>Most contractors get a response within the hour. No commitment,no upfront payment — just a firm price on your order.</p>'+
'<div class="em-actions">'+
'<a href="/request-quote.html" class="em-primary">Get a Quote Now</a>'+
'<a href="tel:+19294661426" class="em-primary" style="background:transparent;border:1px solid rgba(201,160,76,.4);color:var(--gold);">Call(929)466-1426</a>'+
'<button class="em-secondary" id="exitDismiss">No thanks,I\'ll figure it out myself</button>'+
'</div>'+
'</div>';
document.body.appendChild(overlay);
function close(){
overlay.classList.remove('open');
sessionStorage.setItem('exitShown','1');
}
document.getElementById('exitClose').addEventListener('click',close);
document.getElementById('exitDismiss').addEventListener('click',close);
overlay.addEventListener('click',function(e){
if(e.target===overlay)close();
});

var fired=false;
document.addEventListener('mouseleave',function(e){
if(fired||e.clientY>20)return;
fired=true;
setTimeout(function(){overlay.classList.add('open');},200);
});
})();
(function(){
if(window.location.pathname.indexOf('request-quote')!==-1)return;
var shown=false;
var style=document.createElement('style');
style.textContent=[
'#urgency-bar{',
'position:fixed;top:0;left:0;right:0;z-index:300;',
'background:var(--gold);',
'display:flex;align-items:center;justify-content:center;gap:1.5rem;',
'padding:.7rem 1.5rem;',
'transform:translateY(-100%);',
'transition:transform .4s cubic-bezier(.4,0,.2,1);',
'}',
'#urgency-bar.show{transform:translateY(0);}',
'#urgency-bar span{',
'font-size:.72rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;',
'color:#fff;',
'}',
'#urgency-bar a{',
'font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;',
'color:var(--black);background:#fff;',
'padding:.4rem 1.25rem;text-decoration:none;',
'transition:opacity .2s;',
'}',
'#urgency-bar a:hover{opacity:.85;}',
'#urgency-bar .ub-close{',
'position:absolute;right:1rem;',
'background:none;border:none;color:rgba(255,255,255,.65);',
'font-size:1.2rem;cursor:pointer;line-height:1;padding:.25rem;',
'}',
'@media(max-width:600px){#urgency-bar span:not(:first-child){display:none;}}',
].join('');
document.head.appendChild(style);
var bar=document.createElement('div');
bar.id='urgency-bar';
bar.innerHTML=
'<span>Same-day quotes&mdash;call or text your order</span>'+
'<a href="/request-quote.html">Get a Quote&rarr;</a>'+
'<button class="ub-close" id="ubClose">&times;</button>';
document.body.prepend(bar);
var dismissed=false;
document.getElementById('ubClose').addEventListener('click',function(){
dismissed=true;
bar.classList.remove('show');
});
window.addEventListener('scroll',function(){
if(dismissed)return;
var pct=window.scrollY/(document.body.scrollHeight-window.innerHeight);
bar.classList.toggle('show',pct>.55&&pct<.92);
},{passive:true});
})();
(function(){
if(window.location.pathname.indexOf('request-quote')!==-1)return;
var style=document.createElement('style');
style.textContent=[

'#cb-trigger{',
'position:fixed;left:1.5rem;bottom:80px;z-index:490;',
'background:var(--black);',
'border:1px solid rgba(201,160,76,.35);',
'color:var(--gold);',
'font-family:"Inter",sans-serif;',
'font-size:.65rem;font-weight:700;',
'letter-spacing:.14em;text-transform:uppercase;',
'padding:.65rem 1.1rem;',
'cursor:pointer;',
'display:flex;align-items:center;gap:.5rem;',
'transition:all .2s;',
'box-shadow:0 4px 20px rgba(0,0,0,.3);',
'}',
'#cb-trigger:hover{background:var(--gold);color:#fff;border-color:var(--gold);}',
'#cb-trigger svg{flex-shrink:0;}',
'@media(max-width:1100px){#cb-trigger{bottom:68px;}}',

'#cb-panel{',
'position:fixed;left:1.5rem;bottom:140px;z-index:491;',
'background:var(--black);',
'border:1px solid rgba(201,160,76,.25);',
'padding:1.75rem;width:280px;',
'box-shadow:0 16px 48px rgba(0,0,0,.5);',
'transform:translateY(8px);opacity:0;pointer-events:none;',
'transition:all .25s cubic-bezier(.4,0,.2,1);',
'}',
'#cb-panel.open{transform:translateY(0);opacity:1;pointer-events:all;}',
'#cb-panel .cb-label{',
'font-size:.58rem;font-weight:700;letter-spacing:.25em;',
'text-transform:uppercase;color:var(--gold);',
'margin-bottom:.625rem;display:block;',
'}',
'#cb-panel h4{',
'font-family:"Playfair Display",serif;',
'font-size:1.1rem;font-weight:500;',
'color:var(--text-inv);margin-bottom:.375rem;',
'}',
'#cb-panel p{font-size:.8rem;color:var(--muted-inv);margin-bottom:1.25rem;line-height:1.55;font-weight:300;}',
'#cb-phone{',
'width:100%;background:rgba(255,255,255,.06);',
'border:1px solid rgba(201,160,76,.25);',
'color:var(--text-inv);',
'padding:.75rem 1rem;',
'font-family:"Inter",sans-serif;font-size:.9375rem;',
'outline:none;border-radius:0;',
'-webkit-appearance:none;',
'transition:border-color .2s;',
'margin-bottom:.75rem;',
'}',
'#cb-phone:focus{border-color:var(--gold);}',
'#cb-phone::placeholder{color:rgba(240,237,230,.25);}',
'#cb-submit{',
'width:100%;background:var(--gold);color:#fff;',
'border:none;padding:.8rem;',
'font-family:"Inter",sans-serif;',
'font-size:.7rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;',
'cursor:pointer;transition:background .2s;',
'}',
'#cb-submit:hover{background:var(--gold-dk);}',
'#cb-success{',
'text-align:center;padding:.5rem 0;',
'color:var(--gold);font-size:.875rem;',
'font-family:"Playfair Display",serif;font-style:italic;',
'display:none;',
'}',
'#cb-close{',
'position:absolute;top:.75rem;right:1rem;',
'background:none;border:none;',
'color:rgba(240,237,230,.3);font-size:1.25rem;',
'cursor:pointer;line-height:1;',
'}',
'#cb-close:hover{color:var(--gold);}',
'@media(max-width:1100px){#cb-trigger,#cb-panel{left:1rem;}}',
].join('');
document.head.appendChild(style);

var panel=document.createElement('div');
panel.id='cb-panel';
panel.innerHTML=
'<button id="cb-close">&times;</button>'+
'<span class="cb-label">Free callback</span>'+
'<h4>We\'ll call you back<br>in minutes.</h4>'+
'<p>Drop your number below and a team member will call you right back to discuss your order.</p>'+
'<input id="cb-phone" type="tel" placeholder="(555)000-0000" autocomplete="tel">'+
'<button id="cb-submit">Call Me Back</button>'+
'<div id="cb-success">&#10003;&nbsp;We\'ll call you right back!</div>';
document.body.appendChild(panel);

var trigger=document.createElement('button');
trigger.id='cb-trigger';
trigger.innerHTML=
'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>'+
'Get a Callback';
document.body.appendChild(trigger);

var open=false;
function toggle(){open=!open;panel.classList.toggle('open',open);}
trigger.addEventListener('click',toggle);
document.getElementById('cb-close').addEventListener('click',function(){open=false;panel.classList.remove('open');});
document.getElementById('cb-submit').addEventListener('click',function(){
var phone=document.getElementById('cb-phone').value.trim();
if(!phone){document.getElementById('cb-phone').focus();return;}

var btn=document.getElementById('cb-submit');
btn.textContent='Sending…';
btn.disabled=true;
fetch('https://formspree.io/f/xeebzpyz',{
method:'POST',
headers:{'Accept':'application/json'},
body:JSON.stringify({
_subject:'Callback Request — Prestige Insulation Website',
phone:phone,
source:'Callback widget',
time:new Date().toLocaleString()
})
}).then(function(r){
document.getElementById('cb-submit').style.display='none';
document.getElementById('cb-success').style.display='block';
setTimeout(function(){open=false;panel.classList.remove('open');},3500);
}).catch(function(){

var subj=encodeURIComponent('Callback Request — Prestige Insulation');
var body=encodeURIComponent('Phone:'+phone+'\nTime:'+new Date().toLocaleString());
window.location.href='mailto:Info@PrestigeInsulationco.com?subject='+subj+'&body='+body;
document.getElementById('cb-submit').style.display='none';
document.getElementById('cb-success').style.display='block';
setTimeout(function(){open=false;panel.classList.remove('open');},3500);
});
});

setTimeout(function(){trigger.style.display='flex';},15000);
trigger.style.display='none';
window.addEventListener('scroll',function(){
if(window.scrollY/(document.body.scrollHeight-window.innerHeight)>.4)trigger.style.display='flex';
},{passive:true});
})();
(function(){
var resultEl=document.getElementById('calc-result');
if(!resultEl)return;
var leadBox=document.createElement('div');
leadBox.id='calc-lead';
leadBox.style.cssText=[
'margin-top:2rem;padding:1.75rem 2rem;',
'border:1px solid rgba(201,160,76,.3);',
'background:rgba(201,160,76,.05);',
'display:none;',
].join('');
leadBox.innerHTML=
'<div style="font-size:.6rem;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:var(--gold);margin-bottom:.5rem;">Ready to order?</div>'+
'<p style="font-size:.875rem;color:var(--muted-inv);margin-bottom:1.25rem;font-weight:300;line-height:1.6;">Want us to price this exact order and confirm availability? Leave your number and we\'ll call or text you back.</p>'+
'<div style="display:flex;gap:.75rem;flex-wrap:wrap;">'+
'<input id="cl-name" type="text" placeholder="Your name" style="flex:1;min-width:120px;padding:.75rem 1rem;background:rgba(255,255,255,.05);border:1px solid rgba(201,160,76,.2);color:var(--text-inv);font-family:Inter,sans-serif;font-size:.9rem;outline:none;border-radius:0;-webkit-appearance:none;" onfocus="this.style.borderColor=\'var(--gold)\'" onblur="this.style.borderColor=\'rgba(201,160,76,.2)\'">'+
'<input id="cl-phone" type="tel" placeholder="Phone number" style="flex:1;min-width:120px;padding:.75rem 1rem;background:rgba(255,255,255,.05);border:1px solid rgba(201,160,76,.2);color:var(--text-inv);font-family:Inter,sans-serif;font-size:.9rem;outline:none;border-radius:0;-webkit-appearance:none;" onfocus="this.style.borderColor=\'var(--gold)\'" onblur="this.style.borderColor=\'rgba(201,160,76,.2)\'">'+
'<button id="cl-submit" style="background:var(--gold);color:#fff;border:none;padding:.75rem 1.5rem;font-family:Inter,sans-serif;font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap;">Price My Order</button>'+
'</div>'+
'<div id="cl-success" style="display:none;margin-top:1rem;color:var(--gold);font-size:.875rem;font-family:\'Playfair Display\',serif;font-style:italic;">&#10003;Got it — we\'ll be in touch shortly!</div>';
resultEl.appendChild(leadBox);

var observer=new MutationObserver(function(){
leadBox.style.display=resultEl.style.display!=='none' ? 'block':'none';
});
observer.observe(resultEl,{attributes:true,attributeFilter:['style']});
document.getElementById('cl-submit').addEventListener('click',function(){
var name=document.getElementById('cl-name').value.trim();
var phone=document.getElementById('cl-phone').value.trim();
var bags=document.getElementById('calc-bags')? document.getElementById('calc-bags').textContent:'?';
var app=document.getElementById('calc-app')? document.getElementById('calc-app').textContent:'?';
if(!phone){document.getElementById('cl-phone').focus();return;}

var btn=document.getElementById('cl-submit');
btn.textContent='Sending…';
btn.disabled=true;
fetch('https://formspree.io/f/xeebzpyz',{
method:'POST',
headers:{'Accept':'application/json'},
body:JSON.stringify({
_subject:'Calculator Lead — Prestige Insulation',
name:name||'Not provided',
phone:phone,
estimated_bags:bags,
application:app,
source:'Calculator lead capture',
time:new Date().toLocaleString()
})
}).then(function(){
document.getElementById('cl-submit').style.display='none';
document.getElementById('cl-success').style.display='block';
}).catch(function(){

var subj=encodeURIComponent('Calculator Lead — Prestige Insulation');
var body=encodeURIComponent('Name:'+(name||'n/a')+'\nPhone:'+phone+'\nOrder:'+bags+' bags — '+app);
window.location.href='mailto:Info@PrestigeInsulationco.com?subject='+subj+'&body='+body;
document.getElementById('cl-submit').style.display='none';
document.getElementById('cl-success').style.display='block';
});
});
})();
(function(){
var bar=document.createElement('div');
bar.id='announce-bar';
bar.innerHTML=
'<span class="announce-text">We answer in 5 minutes&mdash;</span>'+
'<a href="tel:+19294661426" class="announce-call">&#9742;&nbsp;Call(929)466-1426</a>'+
'<a href="sms:+19294661426" class="announce-sms">&#9997;&nbsp;Text Us</a>';
document.body.insertBefore(bar,document.body.firstChild);
var style=document.createElement('style');
style.textContent=
'#announce-bar{position:relative;width:100%;background:#c9a04c;color:#080807;display:flex;align-items:center;justify-content:center;gap:1.5rem;padding:.55rem 1rem;font-size:.8rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;z-index:9999;flex-wrap:wrap;}'+
'.announce-text{color:#080807;opacity:.85;}'+
'.announce-call{color:#080807;text-decoration:none;background:rgba(0,0,0,.12);padding:.3rem .9rem;border-radius:2px;transition:background .15s;}'+
'.announce-call:hover{background:rgba(0,0,0,.22);}'+
'.announce-sms{color:#080807;text-decoration:none;opacity:.75;transition:opacity .15s;}'+
'.announce-sms:hover{opacity:1;}'+
'@media(max-width:480px){.announce-text{display:none;}.announce-sms{display:none;}}';
document.head.appendChild(style);
})();
(function(){
var shown=false;
function showPopup(){
if(shown)return;
shown=true;
var overlay=document.createElement('div');
overlay.id='exit-popup-overlay';
var style=document.createElement('style');
style.textContent=
'#exit-popup-overlay{position:fixed;inset:0;background:rgba(8,8,7,.82);z-index:99999;display:flex;align-items:center;justify-content:center;padding:1rem;}'+
'#exit-popup{background:var(--surface,#131312);border:1px solid var(--gold,#c9a04c);max-width:460px;width:100%;padding:2.5rem;text-align:center;}'+
'#exit-popup h2{font-family:Playfair Display,serif;font-size:1.6rem;color:var(--text,#f7f6f3);margin-bottom:.75rem;}'+
'#exit-popup p{color:var(--muted,#8a8880);font-size:.9rem;line-height:1.7;margin-bottom:1.75rem;}'+
'#exit-popup .ep-call{display:block;background:#c9a04c;color:#080807;font-weight:700;font-size:1.1rem;letter-spacing:.05em;text-transform:uppercase;padding:1rem 2rem;text-decoration:none;margin-bottom:.75rem;transition:background .15s;}'+
'#exit-popup .ep-call:hover{background:#ddb86a;}'+
'#exit-popup .ep-close{background:none;border:none;color:var(--muted,#8a8880);font-size:.8rem;cursor:pointer;letter-spacing:.08em;text-transform:uppercase;margin-top:.5rem;text-decoration:underline;}';
document.head.appendChild(style);
overlay.innerHTML=
'<div id="exit-popup">'+
'<h2>Wait — get a quote before you go.</h2>'+
'<p>Call or text your product and quantity. We quote within the hour and deliver next business day. No deposit,no minimum order.</p>'+
'<a href="tel:+19294661426" class="ep-call">&#9742;Call(929)466-1426</a>'+
'<button class="ep-close" id="exit-popup-close">No thanks,I\'ll pass</button>'+
'</div>';
document.body.appendChild(overlay);
document.getElementById('exit-popup-close').addEventListener('click',function(){
document.body.removeChild(overlay);
});
overlay.addEventListener('click',function(e){
if(e.target===overlay)document.body.removeChild(overlay);
});
}

if(window.innerWidth>=768){
document.addEventListener('mouseleave',function(e){
if(e.clientY<60)showPopup();
});
}
})();
(function(){
function validateForms(){
var forms=document.querySelectorAll('form[action*="formspree"]');
forms.forEach(function(form){

var phoneInput=form.querySelector('[name="phone"]');
var emailInput=form.querySelector('[name="email"]');
if(phoneInput&&!phoneInput.placeholder.includes('or email')){
phoneInput.placeholder='Phone number(required if no email)';
}
if(emailInput&&!emailInput.placeholder.includes('or phone')){
emailInput.placeholder='Email address(required if no phone)';
}
form.addEventListener('submit',function(e){
var phone=form.querySelector('[name="phone"]');
var email=form.querySelector('[name="email"]');
var phoneVal=phone ? phone.value.trim():'';
var emailVal=email ? email.value.trim():'';
if(!phoneVal&&!emailVal){
e.preventDefault();

var err=form.querySelector('.contact-req-err');
if(!err){
err=document.createElement('p');
err.className='contact-req-err';
err.style.cssText='color:#e05a2b;font-size:.8125rem;margin:.5rem 0 0;font-weight:500;';
var btn=form.querySelector('button[type="submit"]');
if(btn)form.insertBefore(err,btn);
else form.appendChild(err);
}
err.textContent='Please enter your phone number or email address so we can reach you.';
if(phone)phone.style.borderColor='#e05a2b';
if(email)email.style.borderColor='#e05a2b';

err.scrollIntoView({behavior:'smooth',block:'center'});
return;
}

var err=form.querySelector('.contact-req-err');
if(err)err.remove();
if(phone)phone.style.borderColor='';
if(email)email.style.borderColor='';
});

[form.querySelector('[name="phone"]'),form.querySelector('[name="email"]')].forEach(function(inp){
if(!inp)return;
inp.addEventListener('input',function(){
inp.style.borderColor='';
var err=form.querySelector('.contact-req-err');
if(err)err.textContent='';
});
});
});
}
if(document.readyState==='loading'){
document.addEventListener('DOMContentLoaded',validateForms);
}else{
validateForms();
}
})();
(function(){

var path=window.location.pathname;
if(path!=='/'&&path!=='/index.html'&&path.indexOf('order-now')===-1)return;
var style=document.createElement('style');
style.textContent=[
'#delivery-countdown{',
'display:inline-flex;align-items:center;gap:.75rem;',
'background:rgba(201,160,76,.08);',
'border:1px solid rgba(201,160,76,.3);',
'padding:.55rem 1.5rem;',
'margin-top:1.25rem;',
'font-size:.82rem;font-weight:500;',
'}',
'.cd-label{color:rgba(240,237,230,.5);font-size:.72rem;font-weight:400;letter-spacing:.04em;}',
'.cd-time{',
'font-family:"Playfair Display",serif;',
'font-size:1.15rem;font-weight:500;color:var(--gold);letter-spacing:.06em;',
'}',
'.cd-msg{font-size:.75rem;color:rgba(240,237,230,.6);letter-spacing:.02em;}',
'@media(max-width:500px){',
'#delivery-countdown{flex-wrap:wrap;justify-content:center;gap:.35rem;text-align:center;}',
'}',
].join('');
document.head.appendChild(style);
var el=document.createElement('div');
el.id='delivery-countdown';
function getCountdown(){
var now=new Date();
var estString=now.toLocaleString('en-US',{timeZone:'America/New_York'});
var estNow=new Date(estString);
var cutoff=new Date(estNow);
cutoff.setHours(15,0,0,0);
var diff=cutoff-estNow;
if(diff<=0)return null;
return{
h:Math.floor(diff/3600000),
m:Math.floor((diff % 3600000)/60000),
s:Math.floor((diff % 60000)/1000)
};
}
function pad(n){return String(n).padStart(2,'0');}
function render(){
var cd=getCountdown();
if(!cd){
el.innerHTML=
'<span class="cd-msg">⚡ Order now — next business day delivery available</span>';
}else{
el.innerHTML=
'<span class="cd-label">Order in</span>'+
'<span class="cd-time">'+pad(cd.h)+':'+pad(cd.m)+':'+pad(cd.s)+'</span>'+
'<span class="cd-msg">for next-day delivery</span>';
}
}
render();
setInterval(render,1000);

function inject(){
var target=document.querySelector('.hero-ctas,.hero-actions,.hero-buttons,.hero-btns');
if(target){
target.parentNode.insertBefore(el,target.nextSibling);
}else{
var hero=document.querySelector('.hero-content,.hero');
if(hero)hero.appendChild(el);
}
}
if(document.readyState==='loading'){
document.addEventListener('DOMContentLoaded',inject);
}else{
inject();
}
})();
(function(){

if(window.innerWidth>768)return;
if(window.location.pathname.indexOf('request-quote')!==-1||
window.location.pathname.indexOf('thank-you')!==-1)return;
var style=document.createElement('style');
style.textContent=[
'#sms-float{',
'position:fixed;bottom:70px;right:1rem;z-index:488;',
'background:var(--gold);color:var(--black);',
'font-family:"Inter",sans-serif;',
'font-size:.62rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;',
'padding:.55rem 1rem;',
'display:flex;align-items:center;gap:.4rem;',
'text-decoration:none;',
'box-shadow:0 4px 20px rgba(201,160,76,.35);',
'opacity:0;transition:opacity .4s;',
'}',
'#sms-float.show{opacity:1;}',
'#sms-float svg{flex-shrink:0;}',
].join('');
document.head.appendChild(style);
var btn=document.createElement('a');
btn.id='sms-float';
btn.href='sms:+19294661426?body=Hi%2C%20I%27d%20like%20to%20order%20insulation%3A%20';
btn.innerHTML=
'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>'+
'Text Your Order';
document.body.appendChild(btn);

setTimeout(function(){btn.classList.add('show');},8000);

window.addEventListener('scroll',function(){
if(window.scrollY/(document.body.scrollHeight-window.innerHeight)>.3){
btn.classList.add('show');
}
},{passive:true});
})();
(function(){

var skipPages=['request-quote','contact','thank-you','order-now','calculator'];
var path=window.location.pathname;
if(skipPages.some(function(p){return path.indexOf(p)!==-1;}))return;
var style=document.createElement('style');
style.textContent=[
'@media(min-width:1280px){',
'#desk-sidebar{',
'position:fixed;top:50%;right:0;transform:translateY(-50%)translateX(100%);',
'z-index:480;background:var(--black);',
'border:1px solid rgba(201,160,76,.25);border-right:none;',
'padding:1.5rem;width:240px;',
'transition:transform .35s cubic-bezier(.4,0,.2,1);',
'box-shadow:-8px 0 32px rgba(0,0,0,.4);',
'}',
'#desk-sidebar.open{transform:translateY(-50%)translateX(0);}',
'#desk-sidebar .ds-label{',
'font-size:.58rem;font-weight:700;letter-spacing:.22em;',
'text-transform:uppercase;color:var(--gold);margin-bottom:.5rem;display:block;',
'}',
'#desk-sidebar h4{',
'font-family:"Playfair Display",serif;font-size:.95rem;',
'color:var(--white);margin-bottom:.75rem;font-weight:500;line-height:1.4;',
'}',
'#desk-sidebar input,#desk-sidebar select{',
'width:100%;background:rgba(255,255,255,.05);',
'border:1px solid rgba(201,160,76,.2);color:var(--white);',
'padding:.6rem .75rem;font-size:.8rem;',
'font-family:"Inter",sans-serif;margin-bottom:.6rem;',
'border-radius:0;-webkit-appearance:none;box-sizing:border-box;',
'outline:none;',
'}',
'#desk-sidebar input:focus,#desk-sidebar select:focus{border-color:var(--gold);}',
'#desk-sidebar input::placeholder{color:rgba(255,255,255,.25);}',
'#desk-sidebar .ds-btn{',
'width:100%;background:var(--gold);color:var(--black);border:none;',
'padding:.75rem;font-size:.65rem;font-weight:700;',
'letter-spacing:.15em;text-transform:uppercase;cursor:pointer;',
'transition:background .2s;margin-top:.25rem;',
'}',
'#desk-sidebar .ds-btn:hover{background:var(--gold-dk);}',
'#desk-sidebar .ds-alt{',
'font-size:.7rem;color:rgba(255,255,255,.4);',
'text-align:center;margin-top:.75rem;',
'}',
'#desk-sidebar .ds-alt a{color:var(--gold);text-decoration:none;}',
'#desk-sidebar-success{display:none;text-align:center;padding:.5rem 0;}',
'#desk-sidebar-success p{color:var(--gold);font-size:.85rem;line-height:1.5;}',
'}',
'@media(max-width:1279px){#desk-sidebar{display:none;}}',
].join('');
document.head.appendChild(style);
var sidebar=document.createElement('div');
sidebar.id='desk-sidebar';
sidebar.innerHTML=[
'<span class="ds-label">Quick Quote</span>',
'<h4>Get a same-day quote — we call you back.</h4>',
'<div id="desk-sidebar-success"><p>✓ Got it!<br>We'll call you within the hour.</p></div>',
'<form id="ds-form">',
'<input type="hidden" name="_subject" value="Sidebar Quote — Prestige Insulation">',
'<select name="product" required>',
'<option value="" disabled selected>R-value/product</option>',
'<option>R-13 Fiberglass(2×4 walls)</option>',
'<option>R-15 Fiberglass(2×4 HD)</option>',
'<option>R-19 Fiberglass(2×6 walls)</option>',
'<option>R-21 Fiberglass(2×6 HD)</option>',
'<option>R-30 Fiberglass(attic)</option>',
'<option>R-38 Fiberglass(attic)</option>',
'<option>R-49 Fiberglass(attic)</option>',
'<option>Mineral Wool AFB</option>',
'<option>Multiple/Not Sure</option>',
'</select>',
'<input type="text" name="quantity" placeholder="Qty(bags or sq ft)" required>',
'<input type="tel" name="phone" placeholder="Your phone(required)" required>',
'<button type="submit" class="ds-btn">Get My Quote&rarr;</button>',
'</form>',
'<p class="ds-alt">Or call:<a href="tel:+19294661426">(929)466-1426</a></p>',
].join('');
document.body.appendChild(sidebar);

var shown=false;
window.addEventListener('scroll',function(){
if(!shown&&window.scrollY>500){
shown=true;
sidebar.classList.add('open');
}
},{passive:true});

document.getElementById('ds-form').addEventListener('submit',function(e){
e.preventDefault();
var btn=sidebar.querySelector('.ds-btn');
btn.textContent='Sending...';btn.disabled=true;
var fd=new FormData(this);
fd.append('_next','https://prestigeinsulationco.com/thank-you.html');
fd.append('source','desktop sidebar');
fetch('https://formspree.io/f/xeebzpyz',{
method:'POST',body:fd,headers:{'Accept':'application/json'}
}).then(function(r){
if(r.ok){
document.getElementById('ds-form').style.display='none';
document.getElementById('desk-sidebar-success').style.display='block';
}else{btn.textContent='Get My Quote →';btn.disabled=false;}
}).catch(function(){btn.textContent='Get My Quote →';btn.disabled=false;});
});
})();
(function(){
if(document.querySelector('script[data-prestige-org-schema]'))return;
var schema={
"@context":"https://schema.org",
"@graph":[
{
"@type":["Organization","LocalBusiness"],
"@id":"https://prestigeinsulationco.com/#organization",
"name":"Prestige Insulation",
"alternateName":"Prestige Insulation LLC",
"url":"https://prestigeinsulationco.com",
"logo":{
"@type":"ImageObject",
"url":"https://prestigeinsulationco.com/assets/logo-horizontal.svg",
"width":400,
"height":100
},
"image":"https://prestigeinsulationco.com/assets/social-preview.png",
"description":"Wholesale fiberglass and mineral wool insulation supplier delivering to contractors,builders,and developers across all 50 US states. Same-day quotes,next-day delivery,pay at delivery.",
"telephone":"+19294661426",
"email":"Info@PrestigeInsulationco.com",
"address":{
"@type":"PostalAddress",
"addressCountry":"US"
},
"areaServed":{
"@type":"Country",
"name":"United States"
},
"serviceType":[
"Wholesale Insulation Supply",
"Fiberglass Insulation Delivery",
"Mineral Wool Insulation Delivery",
"Same-Day Insulation Quotes",
"Next-Day Insulation Delivery"
],
"knowsAbout":[
"Fiberglass insulation batts",
"Mineral wool insulation",
"IECC climate zones",
"R-value requirements",
"IBC fire-rated assemblies",
"STC sound attenuation",
"Wholesale insulation supply"
],
"hasOfferCatalog":{
"@type":"OfferCatalog",
"name":"Insulation Products",
"itemListElement":[
{"@type":"Offer","itemOffered":{"@type":"Product","name":"R-13 Fiberglass Insulation","url":"https://prestigeinsulationco.com/r13-insulation.html"}},
{"@type":"Offer","itemOffered":{"@type":"Product","name":"R-21 HD Fiberglass Insulation","url":"https://prestigeinsulationco.com/r21-insulation.html"}},
{"@type":"Offer","itemOffered":{"@type":"Product","name":"R-49 Fiberglass Insulation","url":"https://prestigeinsulationco.com/r49-insulation.html"}},
{"@type":"Offer","itemOffered":{"@type":"Product","name":"Mineral Wool AFB Insulation","url":"https://prestigeinsulationco.com/mineral-wool-insulation.html"}},
{"@type":"Offer","itemOffered":{"@type":"Product","name":"Mineral Wool SAFB Insulation","url":"https://prestigeinsulationco.com/mineral-wool-insulation.html"}}
]
},
"contactPoint":[
{
"@type":"ContactPoint",
"telephone":"+19294661426",
"contactType":"sales",
"availableLanguage":"English",
"contactOption":"TollFree",
"areaServed":"US"
},
{
"@type":"ContactPoint",
"telephone":"+19294661426",
"contactType":"customer service",
"availableLanguage":"English",
"areaServed":"US"
}
],
"sameAs":[
"https://prestigeinsulationco.com"
]
},
{
"@type":"WebSite",
"@id":"https://prestigeinsulationco.com/#website",
"url":"https://prestigeinsulationco.com",
"name":"Prestige Insulation",
"publisher":{"@id":"https://prestigeinsulationco.com/#organization"},
"potentialAction":{
"@type":"SearchAction",
"target":{
"@type":"EntryPoint",
"urlTemplate":"https://prestigeinsulationco.com/faq.html"
},
"query-input":"required name=search_term_string"
}
}
]
};
var s=document.createElement('script');
s.type='application/ld+json';
s.setAttribute('data-prestige-org-schema','1');
s.textContent=JSON.stringify(schema);
document.head.appendChild(s);
})();
// Scroll-reveal: subtle fade/slide-in for section-level content
(function(){
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
if (!('IntersectionObserver' in window)) return;
var targets = document.querySelectorAll('section, .prod-card, .card, .blog-card, .review, .step, article');
if (!targets.length) return;
targets.forEach(function(el){ el.classList.add('reveal'); });
var io = new IntersectionObserver(function(entries){
  entries.forEach(function(entry){
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
targets.forEach(function(el){ io.observe(el); });
})();

// Recently viewed products (localStorage, per-visitor, no backend needed)
(function(){
try {
  var PRODUCT_PAGES = {
    'r11-insulation.html': 'R-11 Insulation',
    'r13-insulation.html': 'R-13 Insulation',
    'r15-insulation.html': 'R-15 Insulation',
    'r19-insulation.html': 'R-19 Insulation',
    'r21-insulation.html': 'R-21 Insulation',
    'r30-insulation.html': 'R-30 Insulation',
    'r38-insulation.html': 'R-38 Insulation',
    'r49-insulation.html': 'R-49 Insulation',
    'mineral-wool-insulation.html': 'Mineral Wool Insulation',
    'attic-insulation.html': 'Attic Insulation'
  };
  var path = window.location.pathname.split('/').pop();
  var STORAGE_KEY = 'prestige_recently_viewed';
  var recent = [];
  try { recent = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch(e) { recent = []; }

  if (PRODUCT_PAGES[path]) {
    recent = recent.filter(function(p){ return p !== path; });
    recent.unshift(path);
    recent = recent.slice(0, 5);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(recent)); } catch(e) {}
  }

  var toShow = recent.filter(function(p){ return p !== path; }).slice(0, 3);
  if (toShow.length === 0) return;

  var nav = document.querySelector('nav');
  if (!nav) return;

  var strip = document.createElement('div');
  strip.setAttribute('aria-label', 'Recently viewed products');
  strip.style.cssText = 'background:var(--off-white,#f7f6f3);border-bottom:1px solid var(--border,#e8e8e4);padding:.6rem 0;font-size:.8rem;';
  var inner = document.createElement('div');
  inner.className = 'container';
  inner.style.cssText = 'display:flex;align-items:center;gap:.75rem;flex-wrap:wrap;';
  var label = document.createElement('span');
  label.textContent = 'Recently viewed:';
  label.style.cssText = 'color:var(--muted,#5a5a56);font-weight:600;';
  inner.appendChild(label);
  toShow.forEach(function(p){
    var a = document.createElement('a');
    a.href = '/' + p;
    a.textContent = PRODUCT_PAGES[p];
    a.style.cssText = 'color:var(--gold,#8a6a28);text-decoration:none;font-weight:600;';
    inner.appendChild(a);
  });
  strip.appendChild(inner);
  nav.parentNode.insertBefore(strip, nav.nextSibling);
} catch(e) {}
})();
