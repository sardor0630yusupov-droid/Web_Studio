const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;

const loader=document.getElementById('loader');
window.addEventListener('load',()=>setTimeout(()=>{loader.style.opacity='0';loader.style.visibility='hidden'},900));

const canvas=document.getElementById('bgCanvas'),ctx=canvas.getContext('2d');
let particles=[],w=0,h=0,dpr=Math.min(devicePixelRatio||1,2);
function resize(){w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);particles=Array.from({length:Math.min(95,Math.floor(w/12))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.5+.25,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.18,a:Math.random()*.6+.1}))}
resize();addEventListener('resize',resize);
function drawFrame(){
  ctx.clearRect(0,0,w,h);
  for(let i=0;i<particles.length;i++){
    const p=particles[i];
    if(!reduceMotion){
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<-5)p.x=w+5;if(p.x>w+5)p.x=-5;if(p.y<-5)p.y=h+5;if(p.y>h+5)p.y=-5;
    }
    ctx.beginPath();ctx.fillStyle=`rgba(70,175,255,${p.a})`;ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
    for(let j=i+1;j<particles.length;j++){
      const q=particles[j],dx=p.x-q.x,dy=p.y-q.y,dist=Math.hypot(dx,dy);
      if(dist<125){ctx.strokeStyle=`rgba(35,130,255,${(1-dist/125)*.09})`;ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}
    }
  }
}
function animate(){drawFrame();if(!reduceMotion)requestAnimationFrame(animate)}
animate();

// Custom cursor: only for devices that actually have a precise pointer, and only
// when the user hasn't asked for reduced motion (it's a constantly-moving element).
if(canHover && !reduceMotion){
  const cursor=document.querySelector('.cursor'),dot=document.querySelector('.cursor-dot');
  let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px'});
  function cursorLoop(){cx+=(mx-cx)*.12;cy+=(my-cy)*.12;cursor.style.left=cx+'px';cursor.style.top=cy+'px';requestAnimationFrame(cursorLoop)}
  cursorLoop();
  document.querySelectorAll('a,button,summary,.service,.price,.project-media').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cursor.style.width='62px';cursor.style.height='62px';cursor.style.borderColor='rgba(100,205,255,.95)'});
    el.addEventListener('mouseleave',()=>{cursor.style.width='38px';cursor.style.height='38px';cursor.style.borderColor='rgba(90,184,255,.7)'});
  });
}

const observer=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));

// Stat counters: count up from 0 to their target once they scroll into view.
const statEls = document.querySelectorAll('[data-count-to]');
if(statEls.length){
  const countUp = (el) => {
    const target = parseInt(el.dataset.countTo, 10);
    const suffix = el.dataset.suffix || '';
    const pad = parseInt(el.dataset.pad || '0', 10);
    if(reduceMotion){ el.textContent = String(target).padStart(pad,'0') + suffix; return; }
    const duration = 1100;
    const start = performance.now();
    function tick(now){
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = String(val).padStart(pad,'0') + suffix;
      if(p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };
  const statObserver = new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){ countUp(e.target); statObserver.unobserve(e.target); }
  }),{threshold:.6});
  statEls.forEach(el=>statObserver.observe(el));
}

// Order form: builds a pre-filled Telegram message and opens a chat with it —
// works without any backend, since the site is static.
const orderForm = document.getElementById('orderForm');
if(orderForm){
  orderForm.addEventListener('submit', e=>{
    e.preventDefault();
    const name = orderForm.name.value.trim();
    const phone = orderForm.phone.value.trim();
    const service = orderForm.service.value;
    const note = orderForm.note.value.trim();
    if(!name || !phone){
      orderForm.reportValidity();
      return;
    }
    const lines = [
      `Yangi buyurtma — WebStudio saytidan`,
      `Ism: ${name}`,
      `Telefon: ${phone}`,
      `Xizmat: ${service}`,
    ];
    if(note) lines.push(`Izoh: ${note}`);
    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://t.me/developer_yusupov?text=${text}`, '_blank', 'noopener');
    const status = document.getElementById('orderStatus');
    if(status){
      status.textContent = 'Telegram ochilmoqda — xabaringiz tayyor, yuborish tugmasini bosing.';
      status.classList.add('visible-status');
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
  const t=document.querySelector(a.getAttribute('href'));
  if(t){e.preventDefault();t.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth'})}
}));

// Music toggle: the button now starts in its true "off" state (autoplay is blocked
// by browsers anyway, so the icon used to lie about the actual playback state),
// and announces play/pause to screen readers via aria-pressed + aria-label.
const music=document.getElementById('music'),sound=document.getElementById('soundBtn');
function setSoundState(isPlaying){
  sound.textContent = isPlaying ? '◉' : '◌';
  sound.setAttribute('aria-pressed', String(isPlaying));
  sound.setAttribute('aria-label', isPlaying ? 'Pause music' : 'Play music');
}
setSoundState(false);
sound.addEventListener('click',async()=>{
  if(music.paused){
    try{await music.play();setSoundState(true)}catch(e){setSoundState(false)}
  }else{
    music.pause();setSoundState(false)
  }
});

if(canHover){
  document.querySelectorAll('.service,.price,.project-media').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      if(innerWidth<900)return;
      const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateX(${y*-2.4}deg) rotateY(${x*2.4}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave',()=>card.style.transform='');
  });
}
