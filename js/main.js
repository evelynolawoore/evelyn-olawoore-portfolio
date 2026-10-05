(function(){
var nav=document.querySelector('.nav'),btn=document.querySelector('.menu'),ul=document.querySelector('.nav ul');
function s(){nav.classList.toggle('solid',scrollY>40||document.body.classList.contains('is-case'))}s();addEventListener('scroll',s,{passive:true});
if(btn){btn.addEventListener('click',function(){var o=ul.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
ul.addEventListener('click',function(e){if(e.target.tagName==='A'){ul.classList.remove('open');btn.setAttribute('aria-expanded',false)}})}
function rv(){var els=document.querySelectorAll('.rv');if(!('IntersectionObserver'in window)){els.forEach(function(e){e.classList.add('in')});return}
var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.08});els.forEach(function(e){io.observe(e)})}
window.initReveal=rv;
/* ---- image viewer: click any work image to read it at full size ---- */
var lb=document.createElement('div');lb.className='lb';lb.hidden=true;lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Image preview');
lb.innerHTML='<button type="button" class="lbx" aria-label="Close image">Close ×</button><img alt=""><p></p>';document.body.appendChild(lb);
var lbi=lb.querySelector('img'),lbp=lb.querySelector('p'),lbx=lb.querySelector('button'),last=null;
function open(img){last=img;lbi.src=img.currentSrc||img.src;lbi.alt=img.alt;var c=img.closest('figure');lbp.textContent=c&&c.querySelector('figcaption')?c.querySelector('figcaption').textContent:img.alt;lb.hidden=false;document.body.style.overflow='hidden';lbx.focus()}
function close(){lb.hidden=true;document.body.style.overflow='';if(last)last.focus()}
document.addEventListener('click',function(e){var i=e.target.closest('img[data-zoom]');if(i){open(i);return}if(e.target===lb||e.target===lbx)close()});
document.addEventListener('keydown',function(e){if(!lb.hidden&&e.key==='Escape'){close();return}if((e.key==='Enter'||e.key===' ')&&e.target.matches&&e.target.matches('img[data-zoom]')){e.preventDefault();open(e.target)}});
/* ---- case study pages ---- */
var C=window.CASES;
var esc=function(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')};
var src=function(n){return window.IMG?window.IMG[n]:'assets/img/'+n};
function im(n,alt,eager){var d=(window.IMGDIM||{})[n];return '<img data-zoom tabindex="0" role="button" '+(eager?'':'loading="lazy" ')+'decoding="async" src="'+src(n)+'" alt="'+esc(alt)+'"'+(d?' width="'+d[0]+'" height="'+d[1]+'"':'')+'>'}
function fig(f){return '<figure class="fig w'+f.w+'" style="--w:'+f.w+'">'+im(f.n,f.alt)+(f.cap?'<figcaption>'+esc(f.cap)+'</figcaption>':'')+'</figure>'}
function table(head,rows,cls){return '<div class="tw"><table class="'+(cls||'')+'"><thead><tr>'+head.map(function(x){return'<th scope="col">'+x+'</th>'}).join('')+'</tr></thead><tbody>'+rows.map(function(r){return'<tr><th scope="row">'+r[0]+'</th>'+r.slice(1).map(function(c){return'<td>'+c+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div>'}
window.renderCase=function(slug,root,linkFor){var i=C.findIndex(function(c){return c.slug===slug});
if(i<0)return false;linkFor=linkFor||function(s){return 'case.html?c='+s};
var c=C[i],n=C[(i+1)%C.length];
document.title=c.name+' | Case Study | Evelyn Olawoore';
var h='<header class="ch th-'+c.theme+'"><div class="wrap"><p class="eyebrow" style="color:inherit;opacity:.8">Case study '+c.num+' · '+esc(c.kicker)+'</p><h1>'+esc(c.name)+'</h1><p class="line">'+esc(c.line)+'</p><p style="max-width:52ch;margin-top:1.2rem;opacity:.85">'+esc(c.summary)+'</p><div class="meta">'+c.meta.map(function(m){return'<div><small>'+m[0]+'</small>'+esc(m[1])+'</div>'}).join('')+'</div>';
if(c.cover)h+='<div class="cover'+(c.coverPortrait?' portrait':'')+'">'+im(c.cover,c.coverAlt,true)+'</div>';
if(c.heroStats)h+='<div class="hstats">'+c.heroStats.map(function(x){return'<div><b>'+x[0]+'</b><span>'+x[1]+'</span></div>'}).join('')+'</div>';
h+='</div></header>';
c.blocks.forEach(function(b){h+='<section class="blk'+(b.wide?' wide':'')+' rv"><div class="wrap"><p class="eyebrow">'+esc(b.t)+'</p><div><h2>'+esc(b.h)+'</h2>';
(b.p||[]).forEach(function(p){h+='<p>'+esc(p)+'</p>'});
if(b.cols)h+='<div class="cols">'+b.cols.map(function(x){return'<div><b>'+x[0]+'</b>'+esc(x[1])+'</div>'}).join('')+'</div>';
if(b.quote)h+='<blockquote>'+esc(b.quote)+(b.cite?'<cite>'+esc(b.cite)+'</cite>':'')+'</blockquote>';
if(b.list)h+='<ul>'+b.list.map(function(l){return'<li>'+esc(l)+'</li>'}).join('')+'</ul>';
if(b.analytics){var a=b.analytics;h+='<div class="an"><figure class="fig">'+im(a.before[0],a.before[1])+'<figcaption>Before</figcaption></figure><span class="arrow" aria-hidden="true">→</span><figure class="fig">'+im(a.after[0],a.after[1])+'<figcaption>After</figcaption></figure></div>'+table(a.head,a.rows,'big');if(a.note)h+='<p class="note">'+esc(a.note)+'</p>'}
var tl='';
if(b.figs||b.stats){tl+='<div class="figs'+(b.strip?' strip':'')+'">'+(b.figs||[]).map(fig).join('');
if(b.stats)tl+='<div class="stats fig w4" style="--w:4">'+b.stats.map(function(s){return'<div><b>'+s[0]+'</b><span>'+s[1]+'</span></div>'}).join('')+'</div>';tl+='</div>'}
if(b.compare)tl+=table(b.compare.head,b.compare.rows);
if(b.note)tl+='<p class="note">'+esc(b.note)+'</p>';
h+=b.wide?'</div>'+tl+'</div></section>':tl+'</div></div></section>'});
h+='<a class="next" href="'+linkFor(n.slug)+'"><div class="wrap"><p class="eyebrow" style="color:var(--sand)">Next case study</p><h2>'+esc(n.name)+' →</h2></div></a>';
root.innerHTML=h;document.body.classList.add('is-case');s();rv();return true};
var r=document.getElementById('case');
if(r&&C){var sl=new URLSearchParams(location.search).get('c');if(!window.renderCase(sl,r))location.replace('index.html#case-studies')}else if(!window.PREVIEW)rv();
})();
