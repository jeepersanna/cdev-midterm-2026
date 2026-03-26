const IMGS = {
  protest: 'images/protest.jpg',
  cassette: 'images/cassette.jpg',
  bible:   'images/bible.jpg',
  child1:  'images/child1.jpg',
  child2:  'images/child2.jpg',
  meanddad: 'images/meanddad - 1.jpeg',
  meanddada: 'images/meanddada - 1.jpeg',
  firstfamilyportrait: 'images/firstfamilyportrait - 1.jpeg',
  child3:  'images/child3.jpg',
  corner1: 'images/corner1.jpg',
  child4:  'images/child4.jpg',
  corner2: 'images/corner2.jpg',
  corner3: 'images/corner3.jpg',
  mewithbrother: 'images/mewithbrother.jpg',
  teen: 'images/teen.jpg',
  locker: 'images/locker.jpg',
  graduationFamily: 'images/graduation-family.jpeg',
  rose: 'images/rose.jpg',
  lumberjackfakelesbian: 'images/lumberjackfakelesbian.jpg',
  lumberjack: 'images/lumberjack.jpg',
  lumberjackwarmsat: 'images/lumberjackwarmsat - 1.jpeg',
  daapfreshman: 'images/daapfreshman.jpg',
  meandkate: 'images/meandkate.jpg',
  introspecct: 'images/introspecct.jpeg',
  blackberry: 'images/blackberry.jpeg',
  daap2: 'images/daap2.jpg',
  meandbeth: 'images/meandbeth.jpg',
  katherinebecky: 'images/katherinebecky.jpg',
  halloween2: 'images/halloween2.jpeg',
  family: 'images/family.jpg',
  mamafriends: 'images/mamafriends - 1.jpeg',
  mamaprotest: 'images/mamaprotest.jpg',
  strike: 'images/strike.jpeg',
  melittle: 'images/melittle.jpg',
  minniemouse: 'images/minniemouse.jpg',
  meandkevin: 'images/meandkevin.jpg',
  twinpeaks: 'images/twinpeaks.jpg',
  meaandrae: 'images/meaandrae.jpg',
};

window.addEventListener('DOMContentLoaded', () => {
  // Assign src via IntersectionObserver for lazy loading
  const imgMap = {
    'hero-cassette-img': 'cassette',
    'img-s1a': 'meanddad',
    'img-s1b': 'firstfamilyportrait',
    'img-s1c': 'child1',
    'img-s1d': 'family',
    'img-s2a': 'child3',
    'img-s2b': 'child2',
    'img-s2c': 'melittle',
    'img-s3a': 'child4',
    'img-s3b': 'meanddada',
    'img-s3c': 'minniemouse',
    'img-s3d': 'mewithbrother',
    'img-s3e': 'meandkate',
    'img-s4a': 'blackberry',
    'img-s4e': 'teen',
    'img-s4b': 'introspecct',
    'img-s4c': 'daap2',
    'img-s4d': 'meandbeth',
    'img-s5a': 'rose',
    'img-s5b': 'katherinebecky',
    'img-s5c': 'halloween2',
    'img-s7a': 'mamafriends',
    'img-s7b': 'mamaprotest',
    'img-s7c': 'strike',
    'img-s6':  'graduationFamily',
    'img-s6b': 'meandkevin',
    'img-s6c': 'twinpeaks',
    'img-s6d': 'meaandrae',
    'bg-s1': 'child1',
    'bg-s2': 'child3',
    'bg-s3': 'child4',
    'bg-s4': 'lumberjack',
    'bg-s5': 'rose',
    'bg-s6': 'graduationFamily',
    'bg-s7': 'protest'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const key = el.dataset.imgsrc;
        if (key && IMGS[key]) {
          el.src = IMGS[key];
          observer.unobserve(el);
        }
      }
    });
  }, { rootMargin: '200px' });

  Object.entries(imgMap).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) {
      el.dataset.imgsrc = key;
      // Load first two eagerly (above fold)
      if (id === 'hero-cassette-img' || id === 'img-s1a') {
        el.src = IMGS[key];
      } else {
        observer.observe(el);
      }
    }
  });
});

// ── AUDIO ──
let audioCtx=null, analyser=null, nodes=[], playing=false, currentSection=0;
let audioEl=null, sourceNode=null;

// One entry per section (hero, s1–s7).
// url: real MP3 link — fill in when you have it. null = synth fallback.
// synthIdx: which synth pattern to use as fallback (0–4)
const SECTION_TRACKS = [
  // hero
  { title:"i can't get over it", artist:'the 77s', year:'1987',
    url:'https://cdn.prod.website-files.com/6547f58b4c75805e8c5e88ee/69b39632fb12baa7df1eab45_I%20Can%27t%20Get%20Over%20It.mp3', synthIdx:0 },
  // s1 — the upbringing
  { title:"i can't get over it", artist:'the 77s', year:'1987',
    url:'https://cdn.prod.website-files.com/6547f58b4c75805e8c5e88ee/69b39632fb12baa7df1eab45_I%20Can%27t%20Get%20Over%20It.mp3', synthIdx:0 },
  // s2 — alone
  { title:'keep on rockin\' in the free world', artist:'neil young', year:'1989',
    url:'https://jeepersanna.github.io/cdev-midterm-2026/music/rockinginthefree.mp3', synthIdx:0 },
  // s3 — a world with no windows
  { title:'jesus freak', artist:'dc talk', year:'1995',
    url:'https://jeepersanna.github.io/cdev-midterm-2026/music/jesusfreak.mp3', synthIdx:1 },
  // s4 — what i longed for
  { title:'zombie', artist:'the cranberries', year:'1994',
    url:'https://cdn.prod.website-files.com/6547f58b4c75805e8c5e88ee/69bcc1a272c49003a3792a26_03%20Zombie%201.mp3', synthIdx:2 },
  // s5 — theories that name the gap
  { title:'seventy times seven', artist:'brand new', year:'2001',
    url:'https://jeepersanna.github.io/cdev-midterm-2026/music/seventytimes.mp3', synthIdx:3 },
  // s6 — beginning with strengths
  { title:'anthems for a seventeen year old girl', artist:'broken social scene', year:'2003',
    url:'https://cdn.prod.website-files.com/6547f58b4c75805e8c5e88ee/69bcc19df8eec22adffa3158_07%20Anthems%20For%20A%20Seventeen%20Year-Old%20Girl.mp3', synthIdx:4 },
  // s7 — closing
  { title:'came out swinging', artist:'the wonder years', year:'2011',
    url:'https://cdn.prod.website-files.com/6547f58b4c75805e8c5e88ee/69bcc19cf1289e136a861ca2_01%20Came%20Out%20Swinging.mp3', synthIdx:1 },
];

function initAudio(){
  if(audioCtx)return;
  audioCtx=new(window.AudioContext||window.webkitAudioContext)();
  analyser=audioCtx.createAnalyser();analyser.fftSize=512;
  analyser.connect(audioCtx.destination);
  audioEl=new Audio();audioEl.crossOrigin='anonymous';audioEl.loop=true;audioEl.volume=0.75;
  sourceNode=audioCtx.createMediaElementSource(audioEl);
  sourceNode.connect(analyser);
}
function stopAll(){
  if(audioEl&&!audioEl.paused){audioEl.pause();}
  nodes.forEach(n=>{try{n.stop&&n.stop();}catch(e){}try{n.disconnect&&n.disconnect();}catch(e){}});
  nodes=[];
}
function osc(type,freq,gain,dest){
  const o=audioCtx.createOscillator(),g=audioCtx.createGain();
  o.type=type;o.frequency.value=freq;g.gain.value=gain;
  o.connect(g);g.connect(dest);o.start();nodes.push(o,g);return{osc:o,gain:g};
}
function mkRev(wet=0.65){
  const conv=audioCtx.createConvolver(),rate=audioCtx.sampleRate,len=rate*3.5,
    buf=audioCtx.createBuffer(2,len,rate);
  for(let c=0;c<2;c++){const d=buf.getChannelData(c);for(let i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2.2);}
  conv.buffer=buf;
  const dry=audioCtx.createGain(),wetG=audioCtx.createGain();
  dry.gain.value=1-wet;wetG.gain.value=wet;
  dry.connect(analyser);conv.connect(wetG);wetG.connect(analyser);
  nodes.push(conv,dry,wetG);return{input:dry,conv};
}
function fade(g,from,to,dur){
  const t=audioCtx.currentTime;
  g.gain.setValueAtTime(from,t);g.gain.linearRampToValueAtTime(to,t+dur);
}

function playSynth(synthIdx, master){
  const t=synthIdx%5;
  if(t===0){
    [55,82.4,110,164.8].forEach((f,i)=>{const o=osc('sine',f,0.28,master);const lfo=audioCtx.createOscillator(),lG=audioCtx.createGain();lfo.frequency.value=0.06+i*0.02;lG.gain.value=f*0.007;lfo.connect(lG);lG.connect(o.osc.frequency);lfo.start();nodes.push(lfo,lG);});
    const buf=audioCtx.createBuffer(1,audioCtx.sampleRate*4,audioCtx.sampleRate),d=buf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
    const noise=audioCtx.createBufferSource();noise.buffer=buf;noise.loop=true;const filt=audioCtx.createBiquadFilter();filt.type='lowpass';filt.frequency.value=80;const nG=audioCtx.createGain();nG.gain.value=0.03;noise.connect(filt);filt.connect(nG);nG.connect(master);noise.start();nodes.push(noise,filt,nG);
  }else if(t===1){
    [55,73.4,82.4].forEach(f=>osc('sawtooth',f,0.17,master));
    function pulse(freq,delay){const o=audioCtx.createOscillator(),env=audioCtx.createGain();o.type='sine';o.frequency.value=freq;env.gain.value=0.13;const lfo=audioCtx.createOscillator(),lG=audioCtx.createGain();lfo.type='square';lfo.frequency.value=1.8;lG.gain.value=0.1;lfo.connect(lG);lG.connect(env.gain);o.connect(env);env.connect(master);lfo.start(audioCtx.currentTime+delay);o.start(audioCtx.currentTime+delay);nodes.push(o,env,lfo,lG);}
    pulse(110,0);pulse(82.4,.3);pulse(55,.6);
    const sub=osc('sine',30,0.36,master);const lS=audioCtx.createOscillator(),lSG=audioCtx.createGain();lS.frequency.value=2.5;lSG.gain.value=4;lS.connect(lSG);lSG.connect(sub.osc.frequency);lS.start();nodes.push(lS,lSG);
  }else if(t===2){
    const scale=[261.6,293.7,329.6,392,440,523.3,587.3];let step=0;
    function playNote(){const f=scale[step%scale.length],o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='triangle';o.frequency.value=f*(Math.random()>.5?2:1);g.gain.setValueAtTime(0,audioCtx.currentTime);g.gain.linearRampToValueAtTime(0.1,audioCtx.currentTime+.02);g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+1.3);o.connect(g);g.connect(master);o.start();o.stop(audioCtx.currentTime+1.4);nodes.push(o,g);step++;}
    playNote();const arp=setInterval(playNote,300);nodes.push({stop:()=>clearInterval(arp)});
    [130.8,164.8,196,246.9].forEach(f=>osc('sine',f,0.045,master));
  }else if(t===3){
    const notes=[220,261.6,311.1,369.9,440];let ni=0;
    function pianoNote(){const f=notes[ni%notes.length],o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0.15,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+3.8);o.connect(g);g.connect(master);o.start();o.stop(audioCtx.currentTime+4.2);const h=audioCtx.createOscillator(),hg=audioCtx.createGain();h.type='sine';h.frequency.value=f*2;hg.gain.setValueAtTime(0.03,audioCtx.currentTime);hg.gain.exponentialRampToValueAtTime(0.001,audioCtx.currentTime+2);h.connect(hg);hg.connect(master);h.start();h.stop(audioCtx.currentTime+2.3);nodes.push(o,g,h,hg);ni++;}
    pianoNote();const pI=setInterval(pianoNote,2000);nodes.push({stop:()=>clearInterval(pI)});
    const buf=audioCtx.createBuffer(1,audioCtx.sampleRate*4,audioCtx.sampleRate),d=buf.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;
    const wn=audioCtx.createBufferSource();wn.buffer=buf;wn.loop=true;const wf=audioCtx.createBiquadFilter();wf.type='bandpass';wf.frequency.value=2800;wf.Q.value=0.4;const wg=audioCtx.createGain();wg.gain.value=0.02;wn.connect(wf);wf.connect(wg);wg.connect(master);wn.start();nodes.push(wn,wf,wg);
  }else{
    [55,110,165,220,275,330,440,550].forEach((f,i)=>{const o=osc('sine',f,0.04/(i*0.3+1),master);const lfo=audioCtx.createOscillator(),lG=audioCtx.createGain();lfo.frequency.value=0.025+i*0.012;lG.gain.value=f*0.003;lfo.connect(lG);lG.connect(o.osc.frequency);lfo.start();nodes.push(lfo,lG);});
    [1320,1760,2200].forEach((f,i)=>{const o=osc('sine',f,0.007,master);const lfo=audioCtx.createOscillator(),lG=audioCtx.createGain();lfo.frequency.value=0.04+i*0.025;lG.gain.value=8;lfo.connect(lG);lG.connect(o.osc.frequency);lfo.start();nodes.push(lfo,lG);});
  }
}

// Prefetch cache: url -> Audio element pre-buffered
const _prefetchCache = {};
function _prefetchTrack(idx){
  const t = SECTION_TRACKS[Math.min(idx, SECTION_TRACKS.length-1)];
  if(!t || !t.url || _prefetchCache[t.url]) return;
  const a = new Audio();
  a.crossOrigin = 'anonymous';
  a.preload = 'auto';
  a.src = t.url;
  _prefetchCache[t.url] = a;
}

function playTrack(idx){
  if(!audioCtx||!playing)return;
  stopAll();
  const track=SECTION_TRACKS[Math.min(idx, SECTION_TRACKS.length-1)];
  document.getElementById('tape-title-text').textContent=`${track.title} — ${track.artist}`;
  if(track.url){
    // Use prefetched buffer if available
    const cached = _prefetchCache[track.url];
    if(cached && cached !== audioEl){
      // Swap in the pre-buffered element's src
      if(audioEl.src !== track.url){ audioEl.src = track.url; }
    } else {
      if(audioEl.src !== track.url){ audioEl.src = track.url; }
    }
    audioEl.play().catch(()=>{document.getElementById('tape-title-text').textContent='blocked — add mp3 url';});
    // Prefetch the next track in the background
    const nextIdx = (idx + 1) % SECTION_TRACKS.length;
    setTimeout(() => _prefetchTrack(nextIdx), 3000);
  } else {
    const rev=mkRev(0.68),master=audioCtx.createGain();
    master.gain.value=0;master.connect(rev.input);master.connect(rev.conv);
    fade(master,0,0.5,2.8);nodes.push(master);
    playSynth(track.synthIdx, master);
    // Still prefetch the next real-audio track
    const nextIdx = (idx + 1) % SECTION_TRACKS.length;
    setTimeout(() => _prefetchTrack(nextIdx), 3000);
  }
}

function skipTrack(){
  currentSection=(currentSection+1)%SECTION_TRACKS.length;
  if(playing)playTrack(currentSection);
  else document.getElementById('tape-title-text').textContent=`${SECTION_TRACKS[currentSection].title} — ${SECTION_TRACKS[currentSection].artist}`;
}
function prevTrack(){
  currentSection=(currentSection-1+SECTION_TRACKS.length)%SECTION_TRACKS.length;
  if(playing)playTrack(currentSection);
  else document.getElementById('tape-title-text').textContent=`${SECTION_TRACKS[currentSection].title} — ${SECTION_TRACKS[currentSection].artist}`;
}
function toggleMusic(){
  if(!playing){
    initAudio();if(audioCtx.state==='suspended')audioCtx.resume();playing=true;
    playTrack(currentSection);
    // Eagerly prefetch the next two tracks on first play
    setTimeout(()=>{ _prefetchTrack(1); _prefetchTrack(2); }, 2000);
    document.getElementById('play-icon').style.display='none';
    document.getElementById('pause-icon').style.display='block';
    document.getElementById('tape-play-btn').classList.add('playing');
    document.getElementById('tape-led').classList.add('on');
    toggleReelSpin(true);startViz();
  }else{
    playing=false;stopAll();
    document.getElementById('play-icon').style.display='block';
    document.getElementById('pause-icon').style.display='none';
    document.getElementById('tape-play-btn').classList.remove('playing');
    document.getElementById('tape-led').classList.remove('on');
    toggleReelSpin(false);cancelAnimationFrame(vf);
  }
}

const secIds=['hero','s1','s2','s3','s4','s5','s6','s7','s-refs'];
const secColors=['#e8008a','#a070e0','#e8008a','#6080f0','#d040c0','#ff80d8','#ff4080','#8040c0','#c090ff'];
let lastIdx=-1,vcol=secColors[0];

let _secEls=null;
function getIdx(){
  if(!_secEls) _secEls=secIds.map(id=>document.getElementById(id));
  const half=window.innerHeight*0.5;
  let a=0;
  _secEls.forEach((el,i)=>{if(el&&el.getBoundingClientRect().top<=half)a=i;});
  return a;
}
let _scrollTicking=false;
window.addEventListener('scroll',()=>{
  if(!_scrollTicking){
    _scrollTicking=true;
    requestAnimationFrame(()=>{
      const pct=window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100;
      document.getElementById('progress').style.width=pct+'%';
      const idx=getIdx();
      document.querySelectorAll('.cdot').forEach((d,i)=>d.classList.toggle('active',i===idx));
      if(idx!==lastIdx){
        lastIdx=idx;vcol=secColors[idx]||'#e8008a';
        currentSection=idx;
        if(playing)playTrack(idx);
      }
      reveal();
      _scrollTicking=false;
    });
  }
});
function reveal(){} // animations disabled
// setTimeout(reveal,80) — disabled

let vf,vphase=0,vizPaused=false;
document.addEventListener('visibilitychange',()=>{vizPaused=document.hidden;});
function toggleReelSpin(on){document.getElementById('reel-left')?.classList.toggle('spin',on);document.getElementById('reel-right')?.classList.toggle('spin',on);}
function startViz(){
  const canvas=document.getElementById('tape-canvas');const ctx=canvas.getContext('2d');
  function resize(){const p=canvas.parentElement;canvas.width=p.clientWidth||200;canvas.height=p.clientHeight||50;}
  resize();window.addEventListener('resize',resize);
  const bufLen=analyser?analyser.frequencyBinCount:256;
  const dataArr=analyser?new Uint8Array(bufLen):null;
  const history=[];
  function draw(){
    vf=requestAnimationFrame(draw);
    if(vizPaused)return;
    const w=canvas.width,h=canvas.height;
    ctx.clearRect(0,0,w,h);ctx.fillStyle='#050008';ctx.fillRect(0,0,w,h);
    let s;
    if(analyser&&dataArr){
      analyser.getByteTimeDomainData(dataArr);
      let sum=0;const slice=Math.floor(bufLen/4);
      for(let i=slice;i<bufLen-slice;i++)sum+=((dataArr[i]/128)-1);
      s=(sum/(bufLen/2))*2.5;
    } else {
      const t=Date.now()/1000;
      s=Math.sin(t*3.1+vphase*8)*Math.sin(t*1.7+vphase*3)*0.45+Math.sin(t*5.3)*0.28;
    }
    history.push(s);if(history.length>w)history.shift();const mid=h/2;
    // Build path once, stroke three times (glow wide → glow narrow → sharp line)
    ctx.beginPath();
    for(let x=0;x<history.length;x++){const a=history[x]*mid*0.82;x===0?ctx.moveTo(x,mid-a):ctx.lineTo(x,mid-a);}
    ctx.lineWidth=9;ctx.strokeStyle='#e8008a28';ctx.shadowColor='#e8008a';ctx.shadowBlur=14;ctx.stroke();
    ctx.strokeStyle='#4060e822';ctx.shadowColor='#4060e8';ctx.shadowBlur=10;ctx.stroke();
    ctx.lineWidth=1.5;ctx.strokeStyle=vcol+'e0';ctx.shadowColor=vcol;ctx.shadowBlur=6;ctx.stroke();
    ctx.shadowBlur=0;vphase+=0.012;
  }
  draw();
}


// ── Collapsible lyrics ──
document.querySelectorAll('.sb-block--lyrics').forEach(block => {
  block.classList.add('is-collapsed');
  block.querySelector('.sb-block-label').addEventListener('click', () => {
    block.classList.toggle('is-collapsed');
  });
});
