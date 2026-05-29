import { useState, useEffect, useRef, useMemo } from "react";

/* ─────────────── LOADERS DATA ─────────────── */
const LOADERS = [
  /* 1 */ {
    id:1, name:"Orbital Halo", tags:["ring","orbit","elegant","layered"],
    controls:{ speed:1.0, size:64, color:"#818cf8", secondColor:"#f472b6", thickness:3.0 },
    render:(c)=>({
      css:`@keyframes oh1{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes oh2{0%{transform:rotate(0) rotateX(65deg)}100%{transform:rotate(-360deg) rotateX(65deg)}}
@keyframes oh3{0%{transform:rotate(0) rotateY(65deg)}100%{transform:rotate(360deg) rotateY(65deg)}}
@keyframes oh-pulse{0%,100%{opacity:.6;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}
.oh{position:relative;width:${c.size}px;height:${c.size}px;display:flex;align-items:center;justify-content:center}
.oh-r{position:absolute;inset:0;border-radius:50%;border:${c.thickness}px solid transparent}
.oh-r1{border-top-color:${c.color};border-right-color:${c.color};animation:oh1 ${(1.8/c.speed).toFixed(2)}s linear infinite}
.oh-r2{inset:${c.size*.12}px;border-bottom-color:${c.secondColor};border-left-color:${c.secondColor};animation:oh2 ${(1.4/c.speed).toFixed(2)}s linear infinite}
.oh-r3{inset:${c.size*.26}px;border-top-color:${c.color}88;border-left-color:${c.color}88;animation:oh3 ${(1/c.speed).toFixed(2)}s linear infinite}
.oh-core{width:${Math.max(4,c.size*.12)}px;height:${Math.max(4,c.size*.12)}px;background:${c.color};border-radius:50%;animation:oh-pulse ${(1/c.speed).toFixed(2)}s ease-in-out infinite}`,
      html:`<div class="oh"><div class="oh-r oh-r1"></div><div class="oh-r oh-r2"></div><div class="oh-r oh-r3"></div><div class="oh-core"></div></div>`
    })
  },
  /* 40 */ {
  id: 40, name: "Neural Pulse", tags: ["AI", "network", "nodes", "synaptic"],
  controls: { speed: 1.0, size: 72, color: "#818cf8", secondColor: "#34d399", thirdColor: "#f472b6", thickness: 1.5 },
  render: (c) => ({
    css: `@keyframes np-pulse{0%,100%{transform:scale(.7);opacity:.4}50%{transform:scale(1.4);opacity:1}}
@keyframes np-blink{0%,100%{opacity:.1}50%{opacity:.9}}
${[[36,12],[12,40],[60,40],[24,65],[48,65]].map((p,i)=>`.np-n${i}{animation:np-pulse ${(1.2/c.speed+i*.18).toFixed(2)}s ease-in-out infinite;transform-origin:${p[0]}px ${p[1]}px}`).join('')}
${[[0,1],[0,2],[1,3],[2,4],[1,2],[0,3],[0,4]].map((_,i)=>`.np-l${i}{animation:np-blink ${(1.5/c.speed+i*.12).toFixed(2)}s ease-in-out ${(i*.08).toFixed(2)}s infinite}`).join('')}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72">
<line class="np-l0" x1="36" y1="12" x2="12" y2="40" stroke="${c.color}" stroke-width="${c.thickness}" opacity=".3"/>
<line class="np-l1" x1="36" y1="12" x2="60" y2="40" stroke="${c.color}" stroke-width="${c.thickness}" opacity=".3"/>
<line class="np-l2" x1="12" y1="40" x2="24" y2="65" stroke="${c.color}" stroke-width="${c.thickness}" opacity=".3"/>
<line class="np-l3" x1="60" y1="40" x2="48" y2="65" stroke="${c.color}" stroke-width="${c.thickness}" opacity=".3"/>
<line class="np-l4" x1="12" y1="40" x2="60" y2="40" stroke="${c.color}" stroke-width="${c.thickness}" opacity=".3"/>
<line class="np-l5" x1="36" y1="12" x2="24" y2="65" stroke="${c.color}" stroke-width="${c.thickness}" opacity=".3"/>
<line class="np-l6" x1="36" y1="12" x2="48" y2="65" stroke="${c.color}" stroke-width="${c.thickness}" opacity=".3"/>
<circle class="np-n0" cx="36" cy="12" r="5" fill="${c.color}" opacity=".9"/>
<circle class="np-n1" cx="12" cy="40" r="5" fill="${c.color}" opacity=".9"/>
<circle class="np-n2" cx="60" cy="40" r="5" fill="${c.color}" opacity=".9"/>
<circle class="np-n3" cx="24" cy="65" r="5" fill="${c.secondColor}" opacity=".9"/>
<circle class="np-n4" cx="48" cy="65" r="5" fill="${c.secondColor}" opacity=".9"/>
</svg>`
  })
},

/* 41 */ {
  id: 41, name: "Quantum Collapse", tags: ["physics", "quantum", "wave", "probability"],
  controls: { speed: 1.0, size: 72, color: "#a78bfa", secondColor: "#38bdf8", thickness: 1.5 },
  render: (c) => ({
    css: `@keyframes qc-wobble{0%,100%{transform:scaleY(1) translateY(0);opacity:.7}50%{transform:scaleY(.3) translateY(10px);opacity:.2}}
@keyframes qc-collapse{0%,100%{transform:scaleX(1);opacity:1}50%{transform:scaleX(.05);opacity:.4}}
@keyframes qc-blink{0%,100%{opacity:.15}50%{opacity:1}}
.qc-wave{animation:qc-wobble ${(2/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:36px 32px}
.qc-line{animation:qc-collapse ${(2/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:36px 36px}
.qc-dot{animation:qc-blink ${(.8/c.speed).toFixed(2)}s ease-in-out infinite}
.qc-r1{animation:qc-blink ${(.8/c.speed).toFixed(2)}s ease-in-out .4s infinite}
.qc-r2{animation:qc-blink ${(.8/c.speed).toFixed(2)}s ease-in-out .2s infinite}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72">
<polyline class="qc-wave" points="1,32 5.3,27 9.7,37 14,22 18.3,42 22.7,18 27,40 31.3,28 35.7,36 40,24 44.3,44 48.7,30 53,38 57.3,20 61.7,44 66,32 70,32" fill="none" stroke="${c.color}" stroke-width="${c.thickness}" opacity=".8"/>
<line class="qc-line" x1="36" y1="8" x2="36" y2="64" stroke="${c.secondColor}" stroke-width="${c.thickness+1}" opacity=".9"/>
<circle class="qc-dot" cx="36" cy="36" r="4" fill="${c.secondColor}" opacity=".9"/>
<circle class="qc-r2" cx="36" cy="36" r="12" fill="none" stroke="${c.secondColor}" stroke-width=".6" opacity=".25"/>
<circle class="qc-r1" cx="36" cy="36" r="22" fill="none" stroke="${c.color}" stroke-width=".6" opacity=".2"/>
</svg>`
  })
},

/* 42 */ {
  id: 42, name: "Fluid Vortex", tags: ["fluid", "vortex", "swirl", "organic"],
  controls: { speed: 1.0, size: 72, color: "#06b6d4", secondColor: "#0ea5e9", thirdColor: "#818cf8", thickness: 1.5 },
  render: (c) => ({
    css: `@keyframes fv-spin{to{transform:rotate(360deg)}}
${[0,1,2,3,4,5].map(i=>{
  const ang=(i/6)*Math.PI*2;
  const pts=Array.from({length:20},(_,j)=>{const r=j*1.3;const th=ang+j*.35;return `${(36+r*Math.cos(th)).toFixed(1)},${(36+r*Math.sin(th)).toFixed(1)}`;}).join(' ');
  return `.fv-arm${i}{animation:fv-spin ${(3/c.speed+i*.3).toFixed(2)}s linear ${(i*.1).toFixed(2)}s infinite;transform-origin:36px 36px}`;
}).join('')}
.fv-core{animation:fv-pulse ${(1/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:36px 36px}
@keyframes fv-pulse{0%,100%{transform:scale(.8);opacity:.5}50%{transform:scale(1.2);opacity:1}}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72">
${[0,1,2,3,4,5].map(i=>{
  const ang=(i/6)*Math.PI*2;
  const pts=Array.from({length:20},(_,j)=>{const r=j*1.3;const th=ang+j*.35;return `${(36+r*Math.cos(th)).toFixed(1)},${(36+r*Math.sin(th)).toFixed(1)}`;}).join(' ');
  const clr=[c.color,c.secondColor,c.thirdColor,c.color,c.secondColor,c.thirdColor][i];
  return `<polyline class="fv-arm${i}" points="${pts}" fill="none" stroke="${clr}" stroke-width="${c.thickness}" opacity="${(.8-i*.08).toFixed(2)}"/>`;
}).join('')}
<circle class="fv-core" cx="36" cy="36" r="3" fill="${c.color}"/>
</svg>`
  })
},

/* 43 */ {
  id: 43, name: "DNA Helix", tags: ["biology", "DNA", "helix", "molecular"],
  controls: { speed: 1.0, size: 72, color: "#f472b6", secondColor: "#34d399", thickness: 2 },
  render: (c) => ({
    css: `@keyframes dna-spin{to{transform:rotateY(360deg)}}
.dna-g{animation:dna-spin ${(4/c.speed).toFixed(2)}s linear infinite;transform-origin:36px 36px}`,
    html: (()=>{
      const pts=16;
      let s1='',s2='',rungs='';
      for(let i=0;i<pts;i++){
        const t=i/(pts-1);const y=t*64+4;
        const x1=36+Math.sin(t*Math.PI*3)*16;const x2=36-Math.sin(t*Math.PI*3)*16;
        if(i>0){
          const pt=i-1;const py=((pt)/(pts-1))*64+4;
          const px1=36+Math.sin((pt/(pts-1))*Math.PI*3)*16;const px2=36-Math.sin((pt/(pts-1))*Math.PI*3)*16;
          s1+=`<line x1="${px1.toFixed(1)}" y1="${py.toFixed(1)}" x2="${x1.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${c.color}" stroke-width="${c.thickness}" stroke-linecap="round"/>`;
          s2+=`<line x1="${px2.toFixed(1)}" y1="${py.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${c.secondColor}" stroke-width="${c.thickness}" stroke-linecap="round"/>`;
        }
        if(i%2===0)rungs+=`<line x1="${x1.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#94a3b8" stroke-width="1.2" opacity=".5"/>`;
      }
      return `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72"><g class="dna-g">${s1}${s2}${rungs}</g></svg>`;
    })()
  })
},

/* 44 */ {
  id: 44, name: "Atom Shell", tags: ["physics", "atom", "electron", "nuclear"],
  controls: { speed: 1.0, size: 72, color: "#f97316", secondColor: "#fbbf24", thickness: 1 },
  render: (c) => ({
    css: `@keyframes ae-orb0{0%{cx:${36+30};cy:36}25%{cx:36;cy:${36+10}}50%{cx:${36-30};cy:36}75%{cx:36;cy:${36-10}}100%{cx:${36+30};cy:36}}
@keyframes ae-orb1{0%{cx:${36+30};cy:36}25%{cx:36;cy:${36+10}}50%{cx:${36-30};cy:36}75%{cx:36;cy:${36-10}}100%{cx:${36+30};cy:36}}
@keyframes ae-orb2{0%{cx:${36+30};cy:36}25%{cx:36;cy:${36+10}}50%{cx:${36-30};cy:36}75%{cx:36;cy:${36-10}}100%{cx:${36+30};cy:36}}
.ae-e0{animation:ae-orb0 ${(1.6/c.speed).toFixed(2)}s linear infinite}
.ae-e1{animation:ae-orb1 ${(2.1/c.speed).toFixed(2)}s linear infinite}
.ae-e2{animation:ae-orb2 ${(1.3/c.speed).toFixed(2)}s linear infinite}
.ae-core{animation:ae-pulse ${(1/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:36px 36px}
@keyframes ae-pulse{0%,100%{transform:scale(.85);opacity:.6}50%{transform:scale(1.15);opacity:1}}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72">
<g style="transform:rotate(0deg);transform-origin:36px 36px"><ellipse cx="36" cy="36" rx="30" ry="10" fill="none" stroke="${c.color}" stroke-width="${c.thickness}" opacity=".3"/><circle class="ae-e0" r="3.5" fill="${c.color}"/></g>
<g style="transform:rotate(60deg);transform-origin:36px 36px"><ellipse cx="36" cy="36" rx="30" ry="10" fill="none" stroke="${c.secondColor}" stroke-width="${c.thickness}" opacity=".3"/><circle class="ae-e1" r="3.5" fill="${c.secondColor}"/></g>
<g style="transform:rotate(120deg);transform-origin:36px 36px"><ellipse cx="36" cy="36" rx="30" ry="10" fill="none" stroke="${c.color}" stroke-width="${c.thickness}" opacity=".25"/><circle class="ae-e2" r="3.5" fill="${c.color}"/></g>
<circle class="ae-core" cx="36" cy="36" r="5" fill="${c.color}"/>
</svg>`
  })
},

/* 45 */ {
  id: 45, name: "Cartoon Bounce", tags: ["cartoon", "bounce", "playful", "squash"],
  controls: { speed: 1.0, size: 72, color: "#fbbf24", secondColor: "#f87171", thickness: 2 },
  render: (c) => ({
    css: `@keyframes cb-bounce{0%,100%{transform:translateY(-16px) scaleY(1.15) scaleX(.88)}40%{transform:translateY(8px) scaleY(.82) scaleX(1.18)}65%{transform:translateY(0) scaleY(1.05) scaleX(.97)}}
@keyframes cb-shadow{0%,100%{transform:scaleX(.5);opacity:.2}40%{transform:scaleX(1.2);opacity:.45}}
@keyframes cb-eye{0%,100%{transform:scaleY(1)}40%{transform:scaleY(.1)}}
.cb-body{animation:cb-bounce ${(1/c.speed).toFixed(2)}s cubic-bezier(.36,.07,.19,.97) infinite;transform-origin:36px 50px}
.cb-shad{animation:cb-shadow ${(1/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:36px 66px}
.cb-eye1{animation:cb-eye ${(1/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:28px 37px}
.cb-eye2{animation:cb-eye ${(1/c.speed).toFixed(2)}s ease-in-out .05s infinite;transform-origin:44px 37px}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72">
<ellipse class="cb-shad" cx="36" cy="66" rx="14" ry="4" fill="#64748b" opacity=".3"/>
<g class="cb-body">
<circle cx="36" cy="40" r="18" fill="${c.color}"/>
<circle class="cb-eye1" cx="28" cy="37" r="3" fill="#1e293b"/>
<circle class="cb-eye2" cx="44" cy="37" r="3" fill="#1e293b"/>
<circle cx="29" cy="36" r="1.2" fill="white"/>
<circle cx="45" cy="36" r="1.2" fill="white"/>
<path d="M28 46 Q36 52 44 46" fill="none" stroke="#1e293b" stroke-width="${c.thickness}" stroke-linecap="round"/>
<ellipse cx="24" cy="44" rx="5" ry="3" fill="${c.secondColor}" opacity=".6"/>
<ellipse cx="48" cy="44" rx="5" ry="3" fill="${c.secondColor}" opacity=".6"/>
</g>
</svg>`
  })
},

/* 46 */ {
  id: 46, name: "Gradient Mesh", tags: ["vector", "mesh", "warp", "geometric"],
  controls: { speed: 1.0, size: 72, color: "#818cf8", secondColor: "#f472b6", thirdColor: "#34d399", thickness: 1 },
  render: (c) => ({
    css: `@keyframes gm-pulse{0%,100%{transform:scale(1) rotate(0deg);opacity:.15}50%{transform:scale(1.3) rotate(45deg);opacity:.7}}
${Array.from({length:16},(_,i)=>{const r=Math.floor(i/4),col=i%4;return `.gm-c${i}{animation:gm-pulse ${(2/c.speed).toFixed(2)}s ease-in-out ${((r+col)*.4).toFixed(2)}s infinite;transform-origin:${(col*14+10).toFixed(0)}px ${(r*14+10).toFixed(0)}px}`}).join('')}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72">
${Array.from({length:16},(_,i)=>{const r=Math.floor(i/4),col=i%4;const x=col*14+3,y=r*14+3;const clr=[c.color,c.secondColor,c.thirdColor][(r+col)%3];return `<rect class="gm-c${i}" x="${x}" y="${y}" width="11" height="11" rx="2" fill="${clr}" opacity="${.15+.12*((r+col)%3)}"/>`;}).join('')}
</svg>`
  })
},

/* 47 */ {
  id: 47, name: "Black Hole", tags: ["physics", "gravity", "spacetime", "cosmic"],
  controls: { speed: 1.0, size: 72, color: "#818cf8", secondColor: "#f472b6", thickness: 1.5 },
  render: (c) => ({
    css: `@keyframes bh-cw{to{transform:rotate(360deg)}}
@keyframes bh-ccw{to{transform:rotate(-360deg)}}
${[28,22,16,10,5].map((r,i)=>`.bh-r${i}{animation:${i%2?'bh-ccw':'bh-cw'} ${((1.2+i*.4)/c.speed).toFixed(2)}s linear infinite;transform-origin:36px 36px}`).join('')}
.bh-accent1{animation:bh-cw ${(4/c.speed).toFixed(2)}s linear infinite;transform-origin:36px 36px}
.bh-accent2{animation:bh-ccw ${(3/c.speed).toFixed(2)}s linear infinite;transform-origin:36px 36px}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72">
${[28,22,16,10,5].map((r,i)=>`<ellipse class="bh-r${i}" cx="36" cy="36" rx="${r}" ry="${(r*.28).toFixed(1)}" fill="none" stroke="${i%2?c.color:c.secondColor}" stroke-width="${(c.thickness-i*.1).toFixed(1)}" opacity="${(.08+i*.06).toFixed(2)}"/>`).join('')}
<ellipse class="bh-accent1" cx="36" cy="36" rx="30" ry="8" fill="none" stroke="${c.color}" stroke-width="${c.thickness}" opacity=".2"/>
<ellipse class="bh-accent2" cx="36" cy="36" rx="30" ry="8" fill="none" stroke="${c.secondColor}" stroke-width="${c.thickness-.5}" opacity=".15"/>
<circle cx="36" cy="36" r="5" fill="#0f0f1a"/>
<circle cx="36" cy="36" r="5" fill="${c.color}" opacity=".08"/>
</svg>`
  })
},

/* 48 */ {
  id: 48, name: "Neon Circuit", tags: ["AI", "circuit", "tech", "cyber"],
  controls: { speed: 1.0, size: 72, color: "#22d3ee", secondColor: "#a78bfa", thickness: 1.5 },
  render: (c) => {
    const segs=[{x1:10,y1:36,x2:24,y2:36},{x1:24,y1:36,x2:24,y2:20},{x1:24,y1:20,x2:48,y2:20},{x1:48,y1:20,x2:48,y2:36},{x1:48,y1:36,x2:62,y2:36},{x1:24,y1:36,x2:24,y2:52},{x1:24,y1:52,x2:48,y2:52},{x1:48,y1:52,x2:48,y2:36},{x1:36,y1:36,x2:36,y2:20},{x1:36,y1:36,x2:36,y2:52}];
    const nodes=[{x:10,y:36},{x:62,y:36},{x:24,y:20},{x:48,y:20},{x:24,y:52},{x:48,y:52},{x:36,y:36}];
    return {
      css: `@keyframes nc-trace{to{stroke-dashoffset:0}}
${segs.map((_,i)=>{const l=segs[i];const dl=Math.hypot(l.x2-l.x1,l.y2-l.y1).toFixed(1);return `.nc-s${i}{stroke-dasharray:${dl} ${dl};stroke-dashoffset:${dl};animation:nc-trace ${(1.5/c.speed).toFixed(2)}s ease-in-out ${(i*.12).toFixed(2)}s infinite alternate}`}).join('')}
@keyframes nc-blink{0%,100%{opacity:.2}50%{opacity:1}}
${nodes.map((_,i)=>`.nc-n${i}{animation:nc-blink ${(1/c.speed).toFixed(2)}s ease-in-out ${(i*.1).toFixed(2)}s infinite}`).join('')}`,
      html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72">
${segs.map((l,i)=>`<line x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" stroke="${i%2?c.color:c.secondColor}" stroke-width="${c.thickness}" opacity=".25"/><line class="nc-s${i}" x1="${l.x1}" y1="${l.y1}" x2="${l.x2}" y2="${l.y2}" stroke="${i%2?c.color:c.secondColor}" stroke-width="${c.thickness}" stroke-linecap="round"/>`).join('')}
${nodes.map((n,i)=>`<circle class="nc-n${i}" cx="${n.x}" cy="${n.y}" r="${n.x===36&&n.y===36?4:2.5}" fill="${i%2?c.color:c.secondColor}"/>`).join('')}
</svg>`
    };
  }
},

/* 49 */ {
  id: 49, name: "Fluid Blob", tags: ["fluid", "blob", "organic", "morph"],
  controls: { speed: 1.0, size: 72, color: "#38bdf8", secondColor: "#818cf8", thirdColor: "#34d399", thickness: 1 },
  render: (c) => ({
    css: `@keyframes fb-m1{0%,100%{d:path("M36 10 C50 10 62 22 62 36 C62 50 50 62 36 62 C22 62 10 50 10 36 C10 22 22 10 36 10")}33%{d:path("M36 8 C55 12 66 28 60 42 C54 56 38 66 24 58 C10 50 6 32 14 20 C22 8 36 8 36 8")}66%{d:path("M36 12 C48 6 62 16 64 32 C66 48 54 64 38 62 C22 60 8 46 10 30 C12 14 24 18 36 12")}}
@keyframes fb-m2{0%,100%{d:path("M36 18 C44 18 54 26 54 36 C54 46 44 54 36 54 C28 54 18 46 18 36 C18 26 28 18 36 18")}50%{d:path("M36 16 C46 14 56 24 54 38 C52 50 42 58 30 54 C18 50 14 36 18 24 C22 12 28 18 36 16")}}
@keyframes fb-m3{0%,100%{d:path("M36 24 C40 24 48 30 48 36 C48 42 40 48 36 48 C32 48 24 42 24 36 C24 30 32 24 36 24")}50%{d:path("M36 22 C42 20 50 28 48 38 C46 46 40 52 34 48 C26 44 22 36 24 28 C26 22 32 24 36 22")}}
@keyframes fb-core{0%,100%{transform:scale(.85);opacity:.5}50%{transform:scale(1.15);opacity:1}}
.fb-b1{animation:fb-m1 ${(3/c.speed).toFixed(2)}s ease-in-out infinite}
.fb-b2{animation:fb-m2 ${(2.5/c.speed).toFixed(2)}s ease-in-out infinite}
.fb-b3{animation:fb-m3 ${(2/c.speed).toFixed(2)}s ease-in-out infinite}
.fb-core{animation:fb-core ${(1/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:36px 36px}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72">
<path class="fb-b1" fill="${c.color}" opacity=".25"/>
<path class="fb-b2" fill="${c.secondColor}" opacity=".3"/>
<path class="fb-b3" fill="${c.thirdColor}" opacity=".4"/>
<circle class="fb-core" cx="36" cy="36" r="4" fill="${c.secondColor}"/>
</svg>`
  })
},

/* 50 */ {
  id: 50, name: "Tensor Flow", tags: ["AI", "tensor", "matrix", "data"],
  controls: { speed: 1.0, size: 72, color: "#818cf8", secondColor: "#34d399", thickness: 1 },
  render: (c) => ({
    css: `@keyframes tf-pulse{0%,100%{transform:scale(.7);opacity:.15}50%{transform:scale(1.1);opacity:.9}}
${Array.from({length:16},(_,i)=>{const r=Math.floor(i/4),col=i%4;return `.tf-c${i}{animation:tf-pulse ${(1.5/c.speed).toFixed(2)}s ease-in-out ${((r+col)*.2).toFixed(2)}s infinite;transform-origin:${(col*14+13).toFixed(0)}px ${(r*14+13).toFixed(0)}px}`}).join('')}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72">
${Array.from({length:16},(_,i)=>{const r=Math.floor(i/4),col=i%4;const x=col*14+8,y=r*14+8;const bright=(col+r)/6;const clr=bright>.5?c.color:c.secondColor;return `<rect class="tf-c${i}" x="${x}" y="${y}" width="11" height="11" rx="2" fill="${clr}" opacity="${(.15+bright*.6).toFixed(2)}"/>`;}).join('')}
</svg>`
  })
},

/* 51 */ {
  id: 51, name: "Pendulum Wave", tags: ["physics", "pendulum", "wave", "harmonic"],
  controls: { speed: 1.0, size: 72, color: "#f59e0b", secondColor: "#ef4444", thickness: 1 },
  render: (c) => ({
    css: `@keyframes pw-swing{0%{transform:rotate(-25deg)}100%{transform:rotate(25deg)}}
${Array.from({length:9},(_,i)=>`.pw-p${i}{animation:pw-swing ${((1.5+i*.15)/c.speed).toFixed(2)}s ease-in-out infinite alternate ${i%2?'':'reverse'};transform-origin:${10+i*6.5}px 6px}`).join('')}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72">
<line x1="8" y1="6" x2="64" y2="6" stroke="#64748b" stroke-width="2" stroke-linecap="round" opacity=".4"/>
${Array.from({length:9},(_,i)=>{const x=10+i*6.5;const len=30+i*2;const clr=i%2?c.color:c.secondColor;return `<g class="pw-p${i}"><line x1="${x}" y1="6" x2="${x}" y2="${6+len}" stroke="${clr}" stroke-width="${c.thickness}" opacity=".5"/><circle cx="${x}" cy="${6+len}" r="${Math.max(2,3-i*.15).toFixed(1)}" fill="${clr}" opacity=".9"/></g>`;}).join('')}
</svg>`
  })
},

/* 52 */ {
  id: 52, name: "Smoke Ring", tags: ["fluid", "smoke", "turbulence", "wisp"],
  controls: { speed: 1.0, size: 72, color: "#94a3b8", secondColor: "#cbd5e1", thickness: 0.8 },
  render: (c) => ({
    css: `@keyframes sr-cw{to{transform:rotate(360deg)}}
@keyframes sr-ccw{to{transform:rotate(-360deg)}}
@keyframes sr-pulse{0%,100%{transform:scale(.8);opacity:.15}50%{transform:scale(1.1);opacity:.3}}
${[28,23,18,14,10,7,4].map((r,i)=>`.sr-r${i}{animation:${i%2?'sr-ccw':'sr-cw'} ${((3+i*.3)/c.speed).toFixed(2)}s linear infinite;transform-origin:36px 36px}`).join('')}
.sr-core{animation:sr-pulse ${(2/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:36px 36px}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72">
${[28,23,18,14,10,7,4].map((r,i)=>`<ellipse class="sr-r${i}" cx="36" cy="36" rx="${r}" ry="${(r*.35).toFixed(1)}" fill="none" stroke="${i%2?c.color:c.secondColor}" stroke-width="${c.thickness+i*.1}" opacity="${(.04+i*.04).toFixed(2)}" stroke-dasharray="${i*4+8} ${i*3+6}"/>`).join('')}
<circle class="sr-core" cx="36" cy="36" r="4" fill="${c.color}" opacity=".3"/>
</svg>`
  })
},

/* 53 */ {
  id: 53, name: "Fractal Tree", tags: ["fractal", "tree", "recursive", "vector"],
  controls: { speed: 1.0, size: 72, color: "#22c55e", secondColor: "#86efac", thickness: 1 },
  render: (c) => {
    function branch(x1,y1,len,ang,depth){
      if(depth===0||len<2)return '';
      const x2=x1+len*Math.sin(ang*Math.PI/180);
      const y2=y1-len*Math.cos(ang*Math.PI/180);
      const clr=depth>3?c.color:c.secondColor;
      const phase=(depth*.3+ang*.01).toFixed(2);
      return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${clr}" stroke-width="${(depth*c.thickness*.4).toFixed(1)}" opacity="${(.3+depth*.1).toFixed(2)}" style="animation:ft-sway ${(2/c.speed).toFixed(2)}s ease-in-out ${phase}s infinite alternate;transform-origin:${x1.toFixed(1)}px ${y1.toFixed(1)}px"/>
${branch(x2,y2,len*.68,ang-28,depth-1)}${branch(x2,y2,len*.68,ang+28,depth-1)}`;
    }
    return {
      css: `@keyframes ft-sway{0%{transform:rotate(-4deg)}100%{transform:rotate(4deg)}}`,
      html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72">${branch(36,70,22,0,6)}</svg>`
    };
  }
},

/* 54 */ {
  id: 54, name: "EEG Brainwave", tags: ["AI", "brain", "signal", "frequency"],
  controls: { speed: 1.0, size: 72, color: "#a78bfa", secondColor: "#38bdf8", thirdColor: "#f472b6", thickness: 1.5 },
  render: (c) => ({
    css: `@keyframes eeg-scan{0%{stroke-dashoffset:200}100%{stroke-dashoffset:0}}
.eeg-w0{animation:eeg-scan ${(2/c.speed).toFixed(2)}s linear infinite;stroke-dasharray:20 50}
.eeg-w1{animation:eeg-scan ${(2.4/c.speed).toFixed(2)}s linear infinite;stroke-dasharray:20 50}
.eeg-w2{animation:eeg-scan ${(1.6/c.speed).toFixed(2)}s linear infinite;stroke-dasharray:20 50}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72">
<polyline class="eeg-w0" points="${Array.from({length:70},(_,i)=>`${i+3},${15+Math.sin(i*.18*3)*12*.8+Math.sin(i*.07*3)*8*.8+Math.sin(i*.4*3)*4*.8}`).join(' ')}" fill="none" stroke="${c.color}" stroke-width="${c.thickness}" opacity=".8"/>
<polyline class="eeg-w1" points="${Array.from({length:70},(_,i)=>`${i+3},${35+Math.sin(i*.18*1.5)*12*.5+Math.sin(i*.07*1.5)*8*.5+Math.sin(i*.4*1.5)*4*.5}`).join(' ')}" fill="none" stroke="${c.secondColor}" stroke-width="${c.thickness}" opacity=".8"/>
<polyline class="eeg-w2" points="${Array.from({length:70},(_,i)=>`${i+3},${55+Math.sin(i*.18*.8)*12*.3+Math.sin(i*.07*.8)*8*.3+Math.sin(i*.4*.8)*4*.3}`).join(' ')}" fill="none" stroke="${c.thirdColor}" stroke-width="${c.thickness}" opacity=".8"/>
</svg>`
  })
},

/* 55 */ {
  id: 55, name: "Cat - Easter Egg", tags: ["cartoon", "cat", "character", "cute"],
  controls: { speed: 1.0, size: 72, color: "#f59e0b", secondColor: "#f472b6", thickness: 1.2 },
  render: (c) => ({
    css: `@keyframes cc-wag{0%{transform:rotate(-30deg)}100%{transform:rotate(30deg)}}
@keyframes cc-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
@keyframes cc-ear{0%{transform:rotate(-8deg)}100%{transform:rotate(8deg)}}
.cc-tail{animation:cc-wag ${(.8/c.speed).toFixed(2)}s ease-in-out infinite alternate;transform-origin:40px 55px}
.cc-body{animation:cc-bob ${(1/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:36px 48px}
.cc-ear{animation:cc-ear ${(1.5/c.speed).toFixed(2)}s ease-in-out infinite alternate;transform-origin:22px 22px}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72">
<path class="cc-tail" d="M40 55 Q58 50 60 42 Q62 36 58 34" fill="none" stroke="${c.color}" stroke-width="4" stroke-linecap="round"/>
<g class="cc-body">
<ellipse cx="36" cy="52" rx="18" ry="12" fill="${c.color}"/>
<circle cx="36" cy="34" r="14" fill="${c.color}"/>
<polygon class="cc-ear" points="18,24 22,10 26,24" fill="${c.color}"/>
<polygon points="20,23 22,13 25,23" fill="${c.secondColor}"/>
<polygon points="46,24 50,10 54,24" fill="${c.color}"/>
<polygon points="47,23 50,13 53,23" fill="${c.secondColor}"/>
<ellipse cx="29" cy="34" rx="3.5" ry="4" fill="#1e293b"/>
<ellipse cx="43" cy="34" rx="3.5" ry="4" fill="#1e293b"/>
<circle cx="30" cy="33" r="1.2" fill="white"/>
<circle cx="44" cy="33" r="1.2" fill="white"/>
<ellipse cx="36" cy="39" rx="2.5" ry="1.8" fill="${c.secondColor}"/>
<line x1="24" y1="37" x2="16" y2="36" stroke="#1e293b" stroke-width="${c.thickness}" opacity=".5"/>
<line x1="24" y1="39" x2="15" y2="40" stroke="#1e293b" stroke-width="${c.thickness}" opacity=".5"/>
<line x1="48" y1="37" x2="56" y2="36" stroke="#1e293b" stroke-width="${c.thickness}" opacity=".5"/>
<line x1="48" y1="39" x2="57" y2="40" stroke="#1e293b" stroke-width="${c.thickness}" opacity=".5"/>
</g>
</svg>`
  })
},

/* 56 */ {
  id: 56, name: "Plasma Arc", tags: ["physics", "plasma", "electric", "energy"],
  controls: { speed: 1.0, size: 72, color: "#a78bfa", secondColor: "#38bdf8", thirdColor: "#f472b6", thickness: 2.5 },
  render: (c) => {
    const seed=42;let s=seed;
    function rng(){s=(s*16807+0)%2147483647;return(s-1)/2147483646;}
    const arcs=Array.from({length:5},(_,i)=>Array.from({length:12},(_,j)=>{const t=j/11;const x=10+t*52;const zig=(rng()-.5)*14*(1-t*.5);return `${x.toFixed(1)},${(36+zig).toFixed(1)}`;}).join(' '));
    return {
      css: `@keyframes pa-flash{0%{opacity:1;transform:none}49%{opacity:1}50%{opacity:0}100%{opacity:1;transform:skewX(2deg)}}
@keyframes pa-glow{0%,100%{transform:scale(.85);opacity:.5}50%{transform:scale(1.15);opacity:1}}
${arcs.map((_,i)=>`.pa-a${i}{animation:pa-flash ${(.12/c.speed).toFixed(3)}s steps(1) ${(i*.025/c.speed).toFixed(3)}s infinite}`).join('')}
.pa-n1{animation:pa-glow ${(.5/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:10px 36px}
.pa-n2{animation:pa-glow ${(.5/c.speed).toFixed(2)}s ease-in-out .1s infinite;transform-origin:62px 36px}`,
      html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72">
${arcs.map((pts,i)=>`<polyline class="pa-a${i}" points="${pts}" fill="none" stroke="${[c.color,c.secondColor,c.thirdColor,c.color,c.secondColor][i]}" stroke-width="${(c.thickness-i*.3).toFixed(1)}" opacity="${(.9-i*.15).toFixed(2)}" stroke-linecap="round"/>`).join('')}
<circle class="pa-n1" cx="10" cy="36" r="5" fill="${c.color}"/>
<circle class="pa-n2" cx="62" cy="36" r="5" fill="${c.secondColor}"/>
</svg>`
    };
  }
},

/* 57 */ {
  id: 57, name: "Voronoi Pulse", tags: ["vector", "voronoi", "geometric", "tessellation"],
  controls: { speed: 1.0, size: 72, color: "#818cf8", secondColor: "#f472b6", thirdColor: "#34d399", thickness: 1 },
  render: (c) => {
    const seeds=[[20,18],[52,15],[10,44],[62,40],[36,58],[36,26],[18,62],[56,60]];
    return {
      css: `@keyframes vp-pop{0%{transform:scale(1) rotate(0deg);opacity:.12}100%{transform:scale(1.4) rotate(15deg);opacity:.6}}
${seeds.map(([x,y],i)=>`.vp-c${i}{animation:vp-pop ${(2/c.speed).toFixed(2)}s ease-in-out ${(i*.25).toFixed(2)}s infinite alternate;transform-origin:${x}px ${y}px}`).join('')}`,
      html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72">
${seeds.map(([x,y],i)=>{const sz=8+i*1.5;const clr=[c.color,c.secondColor,c.thirdColor,c.color,c.secondColor,c.thirdColor,c.color,c.secondColor][i];return `<polygon class="vp-c${i}" points="${x-sz*.5},${y} ${x},${y-sz*.6} ${x+sz*.5},${y} ${x+sz*.3},${y+sz*.5} ${x-sz*.3},${y+sz*.5}" fill="${clr}" opacity="${(.1+i*.05).toFixed(2)}"/>`;}).join('')}
</svg>`
    };
  }
},

/* 58 */ {
  id: 58, name: "Wormhole", tags: ["physics", "spacetime", "portal", "cosmic"],
  controls: { speed: 1.0, size: 72, color: "#818cf8", secondColor: "#38bdf8", thickness: 0.8 },
  render: (c) => ({
    css: `@keyframes wh-cw{to{transform:rotateX(360deg) rotateZ(360deg)}}
@keyframes wh-ccw{to{transform:rotateX(-360deg) rotateZ(-360deg)}}
@keyframes wh-glow{0%,100%{transform:scale(.85);opacity:.5}50%{transform:scale(1.15);opacity:1}}
${Array.from({length:13},(_,i)=>`.wh-r${i}{animation:${i%2?'wh-ccw':'wh-cw'} ${((2+i*.1)/c.speed).toFixed(2)}s linear infinite;transform-origin:36px 36px}`).join('')}
.wh-core{animation:wh-glow ${(.8/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:36px 36px}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72">
${Array.from({length:13},(_,i)=>{const t=i/12;const rx=28*t+2;const ry=(rx*(0.1+t*.7)).toFixed(1);return `<ellipse class="wh-r${i}" cx="36" cy="36" rx="${rx.toFixed(1)}" ry="${ry}" fill="${i%2?'#0f0a1e':'transparent'}" stroke="${i%2?c.color:c.secondColor}" stroke-width="${(c.thickness+t*.8).toFixed(1)}" opacity="${(t*.6).toFixed(2)}"/>`;}).join('')}
<circle class="wh-core" cx="36" cy="36" r="3" fill="${c.secondColor}" opacity=".9"/>
</svg>`
  })
},

/* 59 */ {
  id: 59, name: "Typing AI", tags: ["AI", "typing", "chat", "interface"],
  controls: { speed: 1.0, size: 72, color: "#818cf8", secondColor: "#38bdf8", thickness: 1 },
  render: (c) => ({
    css: `@keyframes ta-dot{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-6px);opacity:1}}
@keyframes ta-chip{0%,100%{opacity:.6}50%{opacity:1}}
@keyframes ta-beam{0%,100%{transform:translateX(0);opacity:0}50%{transform:translateX(28px);opacity:.8}}
.ta-d1{animation:ta-dot ${(1/c.speed).toFixed(2)}s ease-in-out 0s infinite;transform-origin:20px 52px}
.ta-d2{animation:ta-dot ${(1/c.speed).toFixed(2)}s ease-in-out .2s infinite;transform-origin:36px 52px}
.ta-d3{animation:ta-dot ${(1/c.speed).toFixed(2)}s ease-in-out .4s infinite;transform-origin:52px 52px}
.ta-chip{animation:ta-chip ${(2/c.speed).toFixed(2)}s ease-in-out infinite}
.ta-beam{animation:ta-beam ${(1.5/c.speed).toFixed(2)}s ease-in-out infinite}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 72 72">
<rect x="8" y="16" width="56" height="44" rx="10" fill="#1e1b4b" opacity=".9"/>
<rect x="8" y="16" width="56" height="44" rx="10" fill="none" stroke="${c.color}" stroke-width="${c.thickness}" opacity=".5"/>
<rect class="ta-chip" x="14" y="24" width="20" height="10" rx="3" fill="${c.color}" opacity=".25"/>
<rect x="14" y="26" width="6" height="6" rx="1.5" fill="${c.color}" opacity=".7"/>
<rect x="22" y="27" width="8" height="1.5" rx="1" fill="${c.color}" opacity=".5"/>
<rect x="22" y="30" width="5" height="1.5" rx="1" fill="${c.color}" opacity=".3"/>
<rect class="ta-beam" x="14" y="40" width="4" height="4" rx="1" fill="${c.secondColor}" opacity=".9"/>
<circle class="ta-d1" cx="20" cy="52" r="3.5" fill="${c.color}"/>
<circle class="ta-d2" cx="36" cy="52" r="3.5" fill="#a78bfa"/>
<circle class="ta-d3" cx="52" cy="52" r="3.5" fill="#c4b5fd"/>
</svg>`
  })
},
  /* 2 */ {
    id:2, name:"Silk Wave", tags:["wave","fluid","elegant","ribbon"],
    controls:{ speed:1.0, width:80, height:16, color:"#a78bfa", secondColor:"#34d399", amplitude:10.0 },
    render:(c)=>({
      css:`@keyframes sw{0%{d:path("M0,${c.height/2} C${c.width*.25},${c.height/2-c.amplitude} ${c.width*.5},${c.height/2+c.amplitude} ${c.width},${c.height/2}")}50%{d:path("M0,${c.height/2} C${c.width*.25},${c.height/2+c.amplitude} ${c.width*.5},${c.height/2-c.amplitude} ${c.width},${c.height/2}")}100%{d:path("M0,${c.height/2} C${c.width*.25},${c.height/2-c.amplitude} ${c.width*.5},${c.height/2+c.amplitude} ${c.width},${c.height/2}")}}
@keyframes sw2{0%{d:path("M0,${c.height/2} C${c.width*.3},${c.height/2+c.amplitude*.7} ${c.width*.6},${c.height/2-c.amplitude*.7} ${c.width},${c.height/2}")}50%{d:path("M0,${c.height/2} C${c.width*.3},${c.height/2-c.amplitude*.7} ${c.width*.6},${c.height/2+c.amplitude*.7} ${c.width},${c.height/2}")}100%{d:path("M0,${c.height/2} C${c.width*.3},${c.height/2+c.amplitude*.7} ${c.width*.6},${c.height/2-c.amplitude*.7} ${c.width},${c.height/2}")}}
.sw-svg{overflow:visible}
.sw-p1{fill:none;stroke:${c.color};stroke-width:2;stroke-linecap:round;animation:sw ${(1.5/c.speed).toFixed(2)}s ease-in-out infinite}
.sw-p2{fill:none;stroke:${c.secondColor};stroke-width:1.5;opacity:.6;stroke-linecap:round;animation:sw2 ${(1.2/c.speed).toFixed(2)}s ease-in-out infinite}`,
      html:`<svg class="sw-svg" width="${c.width}" height="${c.height}" viewBox="0 0 ${c.width} ${c.height}"><path class="sw-p1" d="M0,${c.height/2} C${c.width*.25},${c.height/2-c.amplitude} ${c.width*.5},${c.height/2+c.amplitude} ${c.width},${c.height/2}"/><path class="sw-p2" d="M0,${c.height/2} C${c.width*.3},${c.height/2+c.amplitude*.7} ${c.width*.6},${c.height/2-c.amplitude*.7} ${c.width},${c.height/2}"/></svg>`
    })
  },
  /* 3 */ {
    id:3, name:"Morphic Bloom", tags:["morph","blob","organic","hypnotic"],
    controls:{ speed:1.0, size:72, color:"#c084fc", secondColor:"#fb923c" },
    render:(c)=>({
      css:`@keyframes bloom-morph{0%,100%{border-radius:62% 38% 46% 54%/60% 44% 56% 40%;transform:rotate(0deg)}25%{border-radius:38% 62% 54% 46%/44% 64% 36% 56%;transform:rotate(90deg)}50%{border-radius:54% 46% 38% 62%/56% 36% 64% 44%;transform:rotate(180deg)}75%{border-radius:46% 54% 62% 38%/36% 56% 44% 64%;transform:rotate(270deg)}}
@keyframes bloom-glow{0%,100%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(360deg)}}
.bloom{width:${c.size}px;height:${c.size}px;background:linear-gradient(135deg,${c.color},${c.secondColor});animation:bloom-morph ${(3/c.speed).toFixed(2)}s ease-in-out infinite,bloom-glow ${(6/c.speed).toFixed(2)}s linear infinite}`,
      html:`<div class="bloom"></div>`
    })
  },
  /* 4 */ {
    id:4, name:"Plasma Arc", tags:["neon","plasma","futuristic","arc"],
    controls:{ speed:1.0, size:68, color:"#22d3ee", thickness:3.0 },
    render:(c)=>({
      css:`@keyframes pa-spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes pa-dash{0%{stroke-dasharray:1,250;stroke-dashoffset:0}50%{stroke-dasharray:170,250;stroke-dashoffset:-60}100%{stroke-dasharray:170,250;stroke-dashoffset:-230}}
@keyframes pa-color{0%,100%{stroke:${c.color}}33%{stroke:#f0abfc}66%{stroke:#86efac}}
.pa-svg{animation:pa-spin ${(2/c.speed).toFixed(2)}s linear infinite}
.pa-track{fill:none;stroke:${c.color}18;stroke-width:${c.thickness}}
.pa-arc{fill:none;stroke-width:${c.thickness};stroke-linecap:round;animation:pa-dash ${(1.6/c.speed).toFixed(2)}s ease-in-out infinite,pa-color ${(3/c.speed).toFixed(2)}s linear infinite}
.pa-arc2{fill:none;stroke:${c.color}40;stroke-width:${c.thickness*.5};stroke-linecap:round;stroke-dasharray:1,250;animation:pa-dash ${(1.6/c.speed).toFixed(2)}s ease-in-out infinite -.4s}`,
      html:`<svg class="pa-svg" viewBox="0 0 60 60" width="${c.size}" height="${c.size}"><circle class="pa-track" cx="30" cy="30" r="26"/><circle class="pa-arc" cx="30" cy="30" r="26" transform="rotate(-90 30 30)"/><circle class="pa-arc2" cx="30" cy="30" r="26" transform="rotate(-90 30 30)"/></svg>`
    })
  },
  /* 5 */ {
    id:5, name:"Spectrum Bars", tags:["bars","wave","equalizer","music"],
    controls:{ speed:1.0, barCount:7, color:"#f43f5e", secondColor:"#fbbf24", barWidth:7.0, maxHeight:48.0 },
    render:(c)=>{
      const n=Math.round(c.barCount); const delays=[0,-.35,-.7,-.52,-.14,-.42,-.28,-.6,-.1,-.45].slice(0,n);
      return {
        css:`@keyframes sb{0%,100%{transform:scaleY(.12)}50%{transform:scaleY(1)}}
.sb-wrap{display:flex;align-items:center;gap:${Math.max(2,c.barWidth*.35).toFixed(1)}px}
.sb-b{width:${c.barWidth}px;height:${c.maxHeight}px;border-radius:${(c.barWidth/2).toFixed(1)}px;transform-origin:center;animation:sb ${(1/c.speed).toFixed(2)}s ease-in-out infinite}
${delays.map((d,i)=>`.sb-b:nth-child(${i+1}){animation-delay:${d.toFixed(2)}s;background:color-mix(in oklab,${c.color} ${Math.round(100-i*(100/n))}%,${c.secondColor})}`).join('\n')}`,
        html:`<div class="sb-wrap">${Array.from({length:n},()=>`<div class="sb-b"></div>`).join('')}</div>`
      }
    }
  },
  /* 6 */ {
    id:6, name:"Ripple Pond", tags:["ripple","water","expand","calm"],
    controls:{ speed:1.0, size:14, color:"#38bdf8", ringCount:4 },
    render:(c)=>{
      const n=Math.round(c.ringCount);
      return {
        css:`@keyframes rp{0%{transform:scale(1);opacity:.9}100%{transform:scale(${n+1}.5);opacity:0}}
.rp-wrap{position:relative;width:${c.size}px;height:${c.size}px}
.rp-core{position:absolute;inset:0;background:${c.color};border-radius:50%}
.rp-ring{position:absolute;inset:0;border:1.5px solid ${c.color};border-radius:50%;animation:rp ${(2/c.speed).toFixed(2)}s ease-out infinite}
${Array.from({length:n},(_,i)=>`.rp-ring:nth-child(${i+2}){animation-delay:${-(i*(2/(n*c.speed))).toFixed(2)}s}`).join('\n')}`,
        html:`<div class="rp-wrap"><div class="rp-core"></div>${Array.from({length:n},()=>`<div class="rp-ring"></div>`).join('')}</div>`
      }
    }
  },
  /* 7 */ {
    id:7, name:"Tensor Cube", tags:["3d","cube","geometric","premium"],
    controls:{ speed:1.0, size:44, color:"#a78bfa", secondColor:"#ec4899", borderRadius:6.0 },
    render:(c)=>({
      css:`@keyframes tc-outer{0%{transform:rotate(0) scale(1)}50%{transform:rotate(180deg) scale(.85)}100%{transform:rotate(360deg) scale(1)}}
@keyframes tc-mid{0%{transform:rotate(0)}50%{transform:rotate(-180deg)}100%{transform:rotate(-360deg)}}
@keyframes tc-inner{0%,100%{transform:rotate(0) scale(.4)}50%{transform:rotate(180deg) scale(.7)}}
.tc-outer{width:${c.size}px;height:${c.size}px;background:${c.color}22;border:2px solid ${c.color};border-radius:${c.borderRadius}px;display:flex;align-items:center;justify-content:center;animation:tc-outer ${(2/c.speed).toFixed(2)}s ease-in-out infinite}
.tc-mid{width:65%;height:65%;background:${c.secondColor}22;border:2px solid ${c.secondColor};border-radius:${c.borderRadius*.7}px;display:flex;align-items:center;justify-content:center;animation:tc-mid ${(1.5/c.speed).toFixed(2)}s ease-in-out infinite}
.tc-inner{width:60%;height:60%;background:${c.color};border-radius:${c.borderRadius*.4}px;animation:tc-inner ${(1/c.speed).toFixed(2)}s ease-in-out infinite}`,
      html:`<div class="tc-outer"><div class="tc-mid"><div class="tc-inner"></div></div></div>`
    })
  },
  /* 8 */ {
    id:8, name:"Galaxy Swirl", tags:["galaxy","particles","cosmic","swirl"],
    controls:{ speed:1.0, size:76, color:"#c4b5fd", particleCount:10, trailLength:3.0 },
    render:(c)=>{
      const n=Math.round(c.particleCount);
      const parts = Array.from({length:n},(_,i)=>{
        const a=(i/n)*360; const r=(c.size/2-8)*(0.25+.75*(i/n));
        const x=Math.cos(a*Math.PI/180)*r+c.size/2; const y=Math.sin(a*Math.PI/180)*r+c.size/2;
        const sz=2+4*(i/n); const op=0.2+0.8*(i/n);
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${sz.toFixed(1)}" fill="${c.color}" opacity="${op.toFixed(2)}"/>`;
      });
      return {
        css:`@keyframes gs-spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes gs-counter{0%{transform:rotate(0)}100%{transform:rotate(-360deg)}}
.gs-svg{animation:gs-spin ${(3/c.speed).toFixed(2)}s linear infinite}
.gs-inner{animation:gs-counter ${(2/c.speed).toFixed(2)}s linear infinite;transform-origin:${c.size/2}px ${c.size/2}px}
.gs-core{animation:gs-counter ${(3/c.speed).toFixed(2)}s linear infinite;transform-origin:${c.size/2}px ${c.size/2}px}`,
        html:`<svg class="gs-svg" width="${c.size}" height="${c.size}" viewBox="0 0 ${c.size} ${c.size}">${parts.map((p,i)=>i<n/2?p:`<g class="gs-inner">${p}</g>`).join('')}<circle class="gs-core" cx="${c.size/2}" cy="${c.size/2}" r="4" fill="${c.color}"/></svg>`
      }
    }
  },
  /* 9 */ {
    id:9, name:"Elastic Bounce", tags:["bounce","elastic","physics","fun"],
    controls:{ speed:1.0, size:22.0, color:"#fb7185", bounceHeight:55.0, squish:0.65 },
    render:(c)=>({
      css:`@keyframes eb-ball{0%{transform:translateY(0) scaleX(1) scaleY(1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}45%{transform:translateY(-${c.bounceHeight}px) scaleX(1) scaleY(1.1);animation-timing-function:cubic-bezier(.755,.05,.855,.06)}90%{transform:translateY(2px) scaleX(${(2-c.squish).toFixed(2)}) scaleY(${c.squish.toFixed(2)});animation-timing-function:cubic-bezier(.215,.61,.355,1)}100%{transform:translateY(0) scaleX(1) scaleY(1)}}
@keyframes eb-shad{0%{transform:scaleX(1);opacity:.4}45%{transform:scaleX(.35);opacity:.08}90%{transform:scaleX(1.2);opacity:.5}100%{transform:scaleX(1);opacity:.4}}
.eb-wrap{display:flex;flex-direction:column;align-items:center;gap:4px}
.eb-ball{width:${c.size}px;height:${c.size}px;background:${c.color};border-radius:50%;animation:eb-ball ${(.85/c.speed).toFixed(2)}s ease-in-out infinite}
.eb-shad{width:${c.size}px;height:${(c.size*.3).toFixed(1)}px;background:${c.color};border-radius:50%;opacity:.3;animation:eb-shad ${(.85/c.speed).toFixed(2)}s ease-in-out infinite}`,
      html:`<div class="eb-wrap"><div class="eb-ball"></div><div class="eb-shad"></div></div>`
    })
  },
  /* 10 */ {
    id:10, name:"DNA Strand", tags:["dna","helix","science","complex"],
    controls:{ speed:1.0, color:"#2dd4bf", secondColor:"#f472b6", dotCount:8, gap:9.0 },
    render:(c)=>{
      const n=Math.round(c.dotCount);
      return {
        css:`@keyframes dna-a{0%{transform:scaleX(1) translateX(0);opacity:1}50%{transform:scaleX(-1) translateX(0);opacity:.3}100%{transform:scaleX(1) translateX(0);opacity:1}}
@keyframes dna-b{0%{transform:scaleX(-1) translateX(0);opacity:.3}50%{transform:scaleX(1) translateX(0);opacity:1}100%{transform:scaleX(-1) translateX(0);opacity:.3}}
.dna-wrap{display:flex;flex-direction:column;gap:${c.gap}px;align-items:center}
.dna-row{display:flex;align-items:center;gap:6px}
.dna-a,.dna-b{width:13px;height:13px;border-radius:50%}
.dna-a{background:${c.color};animation:dna-a ${(1.2/c.speed).toFixed(2)}s ease-in-out infinite}
.dna-b{background:${c.secondColor};animation:dna-b ${(1.2/c.speed).toFixed(2)}s ease-in-out infinite}
.dna-line{height:1.5px;flex:1;background:linear-gradient(90deg,${c.color}44,${c.secondColor}44)}
${Array.from({length:n},(_,i)=>`.dna-row:nth-child(${i+1}) .dna-a,.dna-row:nth-child(${i+1}) .dna-b{animation-delay:${-(i*(1.2/(n*c.speed))).toFixed(3)}s}`).join('\n')}`,
        html:`<div class="dna-wrap">${Array.from({length:n},()=>`<div class="dna-row"><div class="dna-a"></div><div class="dna-line"></div><div class="dna-b"></div></div>`).join('')}</div>`
      }
    }
  },
  /* 11 */ {
    id:11, name:"Heartbeat ECG", tags:["heart","ecg","medical","pulse"],
    controls:{ speed:1.0, color:"#f43f5e", strokeWidth:2.5, size:70 },
    render:(c)=>({
      css:`@keyframes ecg{0%{stroke-dashoffset:300}100%{stroke-dashoffset:0}}
@keyframes ecg-fade{0%,80%{opacity:1}100%{opacity:.3}}
.ecg-svg{}
.ecg-path{fill:none;stroke:${c.color};stroke-width:${c.strokeWidth};stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:300;animation:ecg ${(1.5/c.speed).toFixed(2)}s linear infinite,ecg-fade ${(1.5/c.speed).toFixed(2)}s linear infinite}`,
      html:`<svg class="ecg-svg" viewBox="0 0 120 50" width="${c.size*1.7}" height="${c.size*.7}"><path class="ecg-path" d="M0,25 L18,25 L24,25 L30,8 L36,42 L42,25 L54,25 L60,25 L66,25 L72,10 L78,40 L84,25 L120,25"/></svg>`
    })
  },
  /* 12 */ {
    id:12, name:"Shimmer Bar", tags:["shimmer","loading","skeleton","ui"],
    controls:{ speed:1.0, width:120, height:14.0, color:"#6366f1", borderRadius:7.0 },
    render:(c)=>({
      css:`@keyframes shimmer{0%{background-position:-${c.width*2}px 0}100%{background-position:${c.width*2}px 0}}
.shim-bar{width:${c.width}px;height:${c.height}px;border-radius:${c.borderRadius}px;background:linear-gradient(90deg,${c.color}22 25%,${c.color}66 50%,${c.color}22 75%);background-size:${c.width*4}px 100%;animation:shimmer ${(1.5/c.speed).toFixed(2)}s linear infinite}`,
      html:`<div class="shim-bar"></div>`
    })
  },
  /* 13 */ {
    id:13, name:"Lotus Petals", tags:["lotus","petals","mandala","organic"],
    controls:{ speed:1.0, size:70, color:"#e879f9", petalCount:6, secondColor:"#fbbf24" },
    render:(c)=>{
      const n=Math.round(c.petalCount);
      const r=c.size/2; const pr=r*.45; const pw=r*.22;
      const petals=Array.from({length:n},(_,i)=>{
        const a=(i/n)*360;
        return `<ellipse class="lp-petal" cx="0" cy="-${pr}" rx="${pw}" ry="${pr*.8}" fill="${i%2===0?c.color:c.secondColor}" transform="rotate(${a},0,0)" style="animation-delay:${-(i*(2/(n*c.speed))).toFixed(3)}s" transform-origin="0 0"/>`;
      });
      return {
        css:`@keyframes lp-spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes lp-petal{0%,100%{opacity:.5;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}
.lp-svg{animation:lp-spin ${(4/c.speed).toFixed(2)}s linear infinite}
.lp-petal{animation:lp-petal ${(2/c.speed).toFixed(2)}s ease-in-out infinite;transform-box:fill-box;transform-origin:center center}`,
        html:`<svg class="lp-svg" viewBox="-${r} -${r} ${r*2} ${r*2}" width="${c.size}" height="${c.size}">${petals.join('')}<circle cx="0" cy="0" r="${r*.1}" fill="${c.color}"/></svg>`
      }
    }
  },
  /* 14 */ {
    id:14, name:"Fluid Ring", tags:["fluid","ring","progress","dynamic"],
    controls:{ speed:1.0, size:70, color:"#10b981", thickness:5.0 },
    render:(c)=>({
      css:`@keyframes fr-spin{0%{transform:rotate(-90deg)}100%{transform:rotate(270deg)}}
@keyframes fr-dash{0%{stroke-dasharray:1,220;stroke-dashoffset:0}50%{stroke-dasharray:165,220;stroke-dashoffset:-45}100%{stroke-dasharray:165,220;stroke-dashoffset:-215}}
@keyframes fr-hue{0%{filter:hue-rotate(0)}100%{filter:hue-rotate(360deg)}}
.fr-svg{animation:fr-spin ${(1.8/c.speed).toFixed(2)}s linear infinite,fr-hue ${(4/c.speed).toFixed(2)}s linear infinite}
.fr-track{fill:none;stroke:${c.color}1a;stroke-width:${c.thickness}}
.fr-arc{fill:none;stroke:${c.color};stroke-width:${c.thickness};stroke-linecap:round;animation:fr-dash ${(1.4/c.speed).toFixed(2)}s ease-in-out infinite}`,
      html:`<svg class="fr-svg" viewBox="0 0 60 60" width="${c.size}" height="${c.size}"><circle class="fr-track" cx="30" cy="30" r="26"/><circle class="fr-arc" cx="30" cy="30" r="26" stroke-dasharray="1,220"/></svg>`
    })
  },
  /* 15 */ {
    id:15, name:"Matrix Rain", tags:["matrix","digital","tech","rain"],
    controls:{ speed:1.0, color:"#4ade80", cols:5, fontSize:13.0 },
    render:(c)=>{
      const n=Math.round(c.cols); const chars=['0','1','ア','ウ','エ','カ','サ','タ','ナ','ハ'];
      return {
        css:`@keyframes mr-fall{0%{transform:translateY(-100%);opacity:0}10%{opacity:1}90%{opacity:.7}100%{transform:translateY(200%);opacity:0}}
.mr-wrap{display:flex;gap:4px}
.mr-col{display:flex;flex-direction:column;gap:2px;font-family:monospace;font-size:${c.fontSize}px;color:${c.color}}
.mr-char{animation:mr-fall ${(2/c.speed).toFixed(2)}s linear infinite;opacity:0}
${Array.from({length:n},(_,i)=>Array.from({length:5},(_,j)=>`.mr-col:nth-child(${i+1}) .mr-char:nth-child(${j+1}){animation-delay:${-(i*.3+j*.25)/c.speed}s}`).join('\n')).join('\n')}`,
        html:`<div class="mr-wrap">${Array.from({length:n},(_,i)=>`<div class="mr-col">${Array.from({length:5},(_,j)=>`<span class="mr-char">${chars[(i*3+j)%chars.length]}</span>`).join('')}</div>`).join('')}</div>`
      }
    }
  },
  /* 16 */ {
    id:16, name:"Neon Pulse Ring", tags:["neon","glow","ring","premium"],
    controls:{ speed:1.0, size:64, color:"#818cf8", thickness:2.5, glowSize:12.0 },
    render:(c)=>({
      css:`@keyframes npr-spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes npr-pulse{0%,100%{opacity:.2;transform:scale(.9)}50%{opacity:.7;transform:scale(1.05)}}
.npr-wrap{position:relative;width:${c.size}px;height:${c.size}px}
.npr-ring{position:absolute;inset:0;border-radius:50%;border:${c.thickness}px solid ${c.color};opacity:.15}
.npr-arc{position:absolute;inset:0;border-radius:50%;border:${c.thickness}px solid transparent;border-top-color:${c.color};border-right-color:${c.color}88;filter:drop-shadow(0 0 ${c.glowSize}px ${c.color});animation:npr-spin ${(1.5/c.speed).toFixed(2)}s cubic-bezier(.4,0,.2,1) infinite}
.npr-glow{position:absolute;inset:${c.size*.15}px;border-radius:50%;background:${c.color};opacity:0;animation:npr-pulse ${(1.5/c.speed).toFixed(2)}s ease-in-out infinite;filter:blur(${(c.glowSize*.5).toFixed(1)}px)}`,
      html:`<div class="npr-wrap"><div class="npr-ring"></div><div class="npr-arc"></div><div class="npr-glow"></div></div>`
    })
  },
  /* 17 */ {
    id:17, name:"Clockwork", tags:["clock","gears","mechanical","complex"],
    controls:{ speed:1.0, size:60, color:"#f59e0b", secondColor:"#78716c" },
    render:(c)=>({
      css:`@keyframes cw-h{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes cw-m{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes cw-s{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
.cw-wrap{position:relative;width:${c.size}px;height:${c.size}px;border-radius:50%;border:3px solid ${c.color};background:${c.secondColor}22}
.cw-h,.cw-m,.cw-s{position:absolute;bottom:50%;left:50%;border-radius:2px;transform-origin:bottom center}
.cw-h{width:3px;height:${(c.size*.26).toFixed(1)}px;background:${c.color};margin-left:-1.5px;animation:cw-h ${(10/c.speed).toFixed(2)}s linear infinite}
.cw-m{width:2px;height:${(c.size*.34).toFixed(1)}px;background:${c.color}cc;margin-left:-1px;animation:cw-m ${(1/c.speed).toFixed(2)}s linear infinite}
.cw-s{width:1.5px;height:${(c.size*.38).toFixed(1)}px;background:#ef4444;margin-left:-.75px;animation:cw-s ${(.0167/c.speed).toFixed(4)}s linear infinite}
.cw-center{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:7px;height:7px;background:${c.color};border-radius:50%;z-index:5}
${Array.from({length:12},(_,i)=>{const a=i*30;return `.cw-tick-${i}{position:absolute;left:50%;top:6%;transform:translateX(-50%) rotate(${a}deg);transform-origin:50% ${c.size*.44}px;width:${i%3===0?2:1}px;height:${i%3===0?6:3}px;background:${c.color}${i%3===0?'':'66'}}`}).join('\n')}`,
      html:`<div class="cw-wrap">${Array.from({length:12},(_,i)=>`<div class="cw-tick-${i}"></div>`).join('')}<div class="cw-h"></div><div class="cw-m"></div><div class="cw-s"></div><div class="cw-center"></div></div>`
    })
  },
  /* 18 */ {
    id:18, name:"Infinity Weave", tags:["infinity","weave","elegant","loop"],
    controls:{ speed:1.0, size:70, color:"#6366f1", secondColor:"#ec4899", thickness:3.5 },
    render:(c)=>({
      css:`@keyframes iw-ball1{0%{offset-distance:0%}100%{offset-distance:100%}}
@keyframes iw-ball2{0%{offset-distance:50%}100%{offset-distance:150%}}
.iw-svg{overflow:visible}
.iw-track{fill:none;stroke:${c.color}22;stroke-width:${c.thickness}}
.iw-ball1,.iw-ball2{position:absolute}
.iw-path1,.iw-path2{fill:none;stroke-width:${c.thickness};stroke-linecap:round;stroke-dasharray:80,${Math.round(2*3.14159*35)-80}}
.iw-path1{stroke:${c.color};animation:iw-anim1 ${(2/c.speed).toFixed(2)}s ease-in-out infinite}
.iw-path2{stroke:${c.secondColor};animation:iw-anim2 ${(2/c.speed).toFixed(2)}s ease-in-out infinite}
@keyframes iw-anim1{0%{stroke-dashoffset:0}100%{stroke-dashoffset:${-Math.round(2*3.14159*35)}}}
@keyframes iw-anim2{0%{stroke-dashoffset:${-Math.round(3.14159*35)}}100%{stroke-dashoffset:${-Math.round(3*3.14159*35)}}}`,
      html:`<svg class="iw-svg" viewBox="0 0 100 50" width="${c.size*1.6}" height="${c.size*.8}"><path class="iw-track" d="M25,25 C25,10 10,10 10,25 C10,40 25,40 50,25 C75,10 90,10 90,25 C90,40 75,40 50,25 Z"/><path class="iw-path1" d="M25,25 C25,10 10,10 10,25 C10,40 25,40 50,25 C75,10 90,10 90,25 C90,40 75,40 50,25 Z"/><path class="iw-path2" d="M25,25 C25,10 10,10 10,25 C10,40 25,40 50,25 C75,10 90,10 90,25 C90,40 75,40 50,25 Z"/></svg>`
    })
  },
  /* 19 */ {
    id:19, name:"Atomic Orbit", tags:["atom","orbit","science","particles"],
    controls:{ speed:1.0, size:72, color:"#fb923c", electronColor:"#fde68a", electronSize:7.0 },
    render:(c)=>({
      css:`@keyframes ao-s1{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes ao-s2{0%{transform:rotate(-30deg)}100%{transform:rotate(330deg)}}
@keyframes ao-s3{0%{transform:rotate(60deg)}100%{transform:rotate(420deg)}}
.ao-wrap{position:relative;width:${c.size}px;height:${c.size}px}
.ao-nuc{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:${(c.size*.14).toFixed(1)}px;height:${(c.size*.14).toFixed(1)}px;background:${c.color};border-radius:50%}
.ao-orbit{position:absolute;inset:0;border-radius:50%;border:1.5px solid ${c.color}35;display:flex;align-items:flex-start;justify-content:center}
.ao-e{width:${c.electronSize}px;height:${c.electronSize}px;background:${c.electronColor};border-radius:50%;margin-top:1px}
.ao-orbit:nth-child(2){animation:ao-s1 ${(1.2/c.speed).toFixed(2)}s linear infinite}
.ao-orbit:nth-child(3){transform:rotateX(60deg);animation:ao-s2 ${(1.6/c.speed).toFixed(2)}s linear infinite}
.ao-orbit:nth-child(4){transform:rotateX(60deg) rotateY(60deg);animation:ao-s3 ${(2/c.speed).toFixed(2)}s linear infinite}`,
      html:`<div class="ao-wrap"><div class="ao-nuc"></div><div class="ao-orbit"><div class="ao-e"></div></div><div class="ao-orbit"><div class="ao-e"></div></div><div class="ao-orbit"><div class="ao-e"></div></div></div>`
    })
  },
  /* 20 */ {
    id:20, name:"Comet Trail", tags:["comet","trail","space","motion"],
    controls:{ speed:1.0, size:70, color:"#a78bfa", tailCount:6, dotSize:10.0 },
    render:(c)=>{
      const n=Math.round(c.tailCount);
      return {
        css:`@keyframes ct-orbit{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes ct-trail{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
.ct-wrap{position:relative;width:${c.size}px;height:${c.size}px;animation:ct-orbit ${(2/c.speed).toFixed(2)}s linear infinite}
${Array.from({length:n},(_,i)=>{const a=(i/n)*300; const r=(c.size/2-c.dotSize)*(0.4+0.6*(i/n)); const x=Math.cos(a*Math.PI/180)*r+c.size/2; const y=Math.sin(a*Math.PI/180)*r+c.size/2; const sz=c.dotSize*(1-(i/n)*.6); return `.ct-d:nth-child(${i+1}){position:absolute;left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;width:${sz.toFixed(1)}px;height:${sz.toFixed(1)}px;margin:-${(sz/2).toFixed(1)}px;border-radius:50%;background:${c.color};opacity:${(1-i/n*.8).toFixed(2)}}`}).join('\n')}`,
        html:`<div class="ct-wrap">${Array.from({length:n},()=>'<div class="ct-d"></div>').join('')}</div>`
      }
    }
  },
  /* 21 */ {
    id:21, name:"Hourglass", tags:["hourglass","time","minimal","elegant"],
    controls:{ speed:1.0, size:52, color:"#f472b6", particleSize:3.0 },
    render:(c)=>({
      css:`@keyframes hg-flip{0%,45%{transform:rotate(0)}50%,95%{transform:rotate(180deg)}100%{transform:rotate(180deg)}}
@keyframes hg-particle{0%{transform:translateY(0);opacity:1}80%{opacity:1}100%{transform:translateY(${(c.size*.35).toFixed(1)}px);opacity:0}}
.hg-wrap{width:${c.size}px;height:${c.size}px;position:relative;animation:hg-flip ${(3/c.speed).toFixed(2)}s ease-in-out infinite}
.hg-svg{width:100%;height:100%}
.hg-body{fill:none;stroke:${c.color};stroke-width:2.5;stroke-linecap:round}
.hg-top,.hg-bot{fill:${c.color}33}
.hg-p{fill:${c.color};animation:hg-particle ${(1.5/c.speed).toFixed(2)}s ease-in infinite}
.hg-p:nth-child(2){animation-delay:-.5s;cx:${c.size*.52}px}
.hg-p:nth-child(3){animation-delay:-1s;cx:${c.size*.44}px}`,
      html:`<div class="hg-wrap"><svg class="hg-svg" viewBox="0 0 60 60"><polygon class="hg-body" points="10,4 50,4 30,30 50,56 10,56 30,30"/><polygon class="hg-top" points="10,4 50,4 30,30"/><circle class="hg-p" cx="30" cy="28" r="${c.particleSize}"/><circle class="hg-p" cx="28" cy="24" r="${(c.particleSize*.7).toFixed(1)}"/><circle class="hg-p" cx="32" cy="22" r="${(c.particleSize*.5).toFixed(1)}"/></svg></div>`
    })
  },
  /* 22 */ {
    id:22, name:"Particle Supernova", tags:["particles","burst","explosion","dramatic"],
    controls:{ speed:1.0, size:9.0, color:"#f97316", particleCount:10, radius:34.0 },
    render:(c)=>{
      const n=Math.round(c.particleCount);
      return {
        css:`@keyframes sn{0%{transform:rotate(var(--a,0deg)) translateX(0) scale(1);opacity:1}70%{opacity:.8}100%{transform:rotate(var(--a,0deg)) translateX(${c.radius}px) scale(.3);opacity:0}}
.sn-wrap{position:relative;width:${c.radius*2+c.size}px;height:${c.radius*2+c.size}px;display:flex;align-items:center;justify-content:center}
.sn-core{width:${c.size*1.4}px;height:${c.size*1.4}px;background:${c.color};border-radius:50%;position:absolute}
.sn-p{position:absolute;width:${c.size}px;height:${c.size}px;background:${c.color};border-radius:50%;animation:sn ${(1.2/c.speed).toFixed(2)}s ease-out infinite}
${Array.from({length:n},(_,i)=>`.sn-p:nth-child(${i+2}){--a:${(i/n*360).toFixed(1)}deg;animation-delay:${-(i/n*(1.2/c.speed)).toFixed(3)}s;background:color-mix(in oklab,${c.color},#fbbf24 ${Math.round(i/n*60)}%)}`).join('\n')}`,
        html:`<div class="sn-wrap"><div class="sn-core"></div>${Array.from({length:n},()=>'<div class="sn-p"></div>').join('')}</div>`
      }
    }
  },
  /* 23 */ {
    id:23, name:"Neural Pulse", tags:["neural","network","tech","ai"],
    controls:{ speed:1.0, color:"#818cf8", nodeSize:7.0, lineOpacity:0.35 },
    render:(c)=>{
      const nodes=[{x:30,y:25},{x:90,y:15},{x:90,y:45},{x:150,y:5},{x:150,y:25},{x:150,y:55},{x:210,y:20},{x:210,y:45}];
      const edges=[[0,1],[0,2],[1,3],[1,4],[2,4],[2,5],[3,6],[4,6],[4,7],[5,7]];
      return {
        css:`@keyframes np-node{0%,100%{r:${c.nodeSize}px;opacity:.4}50%{r:${(c.nodeSize*1.4).toFixed(1)}px;opacity:1}}
@keyframes np-pulse{0%{stroke-dashoffset:100}100%{stroke-dashoffset:0}}
.np-node{fill:${c.color};animation:np-node ${(1.5/c.speed).toFixed(2)}s ease-in-out infinite}
.np-edge{stroke:${c.color};stroke-opacity:${c.lineOpacity};fill:none;stroke-width:1.5;stroke-dasharray:100;animation:np-pulse ${(1.5/c.speed).toFixed(2)}s linear infinite}
${nodes.map((_,i)=>`.np-node:nth-child(${i+1}){animation-delay:${-(i*.15/c.speed).toFixed(3)}s}`).join('\n')}
${edges.map((_,i)=>`.np-edge:nth-child(${nodes.length+i+1}){animation-delay:${-(i*.1/c.speed).toFixed(3)}s}`).join('\n')}`,
        html:`<svg viewBox="0 0 240 65" width="200" height="65">${nodes.map(n=>`<circle class="np-node" cx="${n.x}" cy="${n.y}" r="${c.nodeSize}"/>`).join('')}${edges.map(([a,b])=>`<line class="np-edge" x1="${nodes[a].x}" y1="${nodes[a].y}" x2="${nodes[b].x}" y2="${nodes[b].y}"/>`).join('')}</svg>`
      }
    }
  },
  /* 24 */ {
    id:24, name:"Liquid Fill", tags:["liquid","fill","wave","progress"],
    controls:{ speed:1.0, size:62.0, color:"#0891b2", fillLevel:60.0 },
    render:(c)=>({
      css:`@keyframes lf-wave{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.lf-wrap{position:relative;width:${c.size}px;height:${c.size}px;border-radius:50%;border:3px solid ${c.color};overflow:hidden}
.lf-fill{position:absolute;bottom:0;left:0;right:0;height:${c.fillLevel.toFixed(0)}%;background:${c.color}22}
.lf-wave-el{position:absolute;top:-10px;left:0;width:200%;height:20px;background:${c.color}55;border-radius:50%;animation:lf-wave ${(1.2/c.speed).toFixed(2)}s linear infinite}
.lf-wave-el2{position:absolute;top:-6px;left:0;width:200%;height:16px;background:${c.color}33;border-radius:50%;animation:lf-wave ${(1.8/c.speed).toFixed(2)}s linear infinite reverse}
.lf-label{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:${c.color};font-family:monospace}`,
      html:`<div class="lf-wrap"><div class="lf-fill"><div class="lf-wave-el"></div><div class="lf-wave-el2"></div></div><div class="lf-label">${c.fillLevel.toFixed(0)}%</div></div>`
    })
  },
  /* 25 */ {
    id:25, name:"Warp Gate", tags:["warp","portal","sci-fi","vortex"],
    controls:{ speed:1.0, size:72, color:"#6366f1", rings:5, contrast:0.7 },
    render:(c)=>{
      const n=Math.round(c.rings);
      return {
        css:`@keyframes wg-spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes wg-pulse{0%,100%{opacity:.2}50%{opacity:${c.contrast.toFixed(2)}}}
.wg-wrap{position:relative;width:${c.size}px;height:${c.size}px}
${Array.from({length:n},(_,i)=>{const s=c.size*(1-(i/(n+1))*.7); const off=(c.size-s)/2; return `.wg-r${i}{position:absolute;left:${off.toFixed(1)}px;top:${off.toFixed(1)}px;width:${s.toFixed(1)}px;height:${s.toFixed(1)}px;border-radius:50%;border:${(1.5+i*.3).toFixed(1)}px solid ${c.color};animation:wg-spin ${(i%2===0?1:-1)*(1.5-i*.1)/c.speed}s linear infinite,wg-pulse ${(1+i*.2)/c.speed}s ease-in-out infinite;animation-delay:${-(i*.2/c.speed).toFixed(2)}s;opacity:${(1-i*.1).toFixed(1)}}`}).join('\n')}`,
        html:`<div class="wg-wrap">${Array.from({length:n},(_,i)=>`<div class="wg-r${i}"></div>`).join('')}</div>`
      }
    }
  },
  /* 26 */ {
    id:26, name:"Typewriter", tags:["text","typing","cursor","classic"],
    controls:{ speed:1.0, color:"#e2e8f0", fontSize:18.0, text:"Loading..." },
    render:(c)=>({
      css:`@keyframes tw-cursor{0%,100%{opacity:1}50%{opacity:0}}
@keyframes tw-width{0%{width:0}100%{width:${Math.round(c.text.length*.55*c.fontSize)}px}}
.tw-wrap{display:flex;align-items:center;font-size:${c.fontSize}px;font-family:"Courier New",monospace;font-weight:700;color:${c.color};gap:2px;overflow:hidden;white-space:nowrap}
.tw-text{overflow:hidden;white-space:nowrap;animation:tw-width ${(c.text.length*.1/c.speed).toFixed(2)}s steps(${c.text.length},end) infinite}
.tw-cursor{display:inline-block;width:2px;height:${c.fontSize}px;background:${c.color};animation:tw-cursor ${(.8/c.speed).toFixed(2)}s step-end infinite}`,
      html:`<div class="tw-wrap"><span class="tw-text">${c.text}</span><span class="tw-cursor"></span></div>`
    })
  },
  /* 27 */ {
    id:27, name:"Gyroscope", tags:["gyroscope","3d","spin","complex"],
    controls:{ speed:1.0, size:72, color:"#38bdf8", secondColor:"#f472b6", thickness:2.5 },
    render:(c)=>({
      css:`@keyframes gyro1{0%{transform:rotateY(0)}100%{transform:rotateY(360deg)}}
@keyframes gyro2{0%{transform:rotateX(0)}100%{transform:rotateX(360deg)}}
@keyframes gyro3{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
.gyro-wrap{position:relative;width:${c.size}px;height:${c.size}px;display:flex;align-items:center;justify-content:center;perspective:200px}
.gyro-ring{position:absolute;border-radius:50%;border-style:solid;border-color:transparent}
.gyro-r1{width:${c.size}px;height:${c.size}px;border-width:${c.thickness}px;border-top-color:${c.color};border-bottom-color:${c.color};animation:gyro1 ${(2/c.speed).toFixed(2)}s linear infinite}
.gyro-r2{width:${c.size*.8}px;height:${c.size*.8}px;border-width:${c.thickness}px;border-left-color:${c.secondColor};border-right-color:${c.secondColor};animation:gyro2 ${(1.5/c.speed).toFixed(2)}s linear infinite}
.gyro-r3{width:${c.size*.6}px;height:${c.size*.6}px;border-width:${c.thickness}px;border-top-color:${c.color}88;border-right-color:${c.color}88;animation:gyro3 ${(1/c.speed).toFixed(2)}s linear infinite}
.gyro-core{width:${(c.size*.08).toFixed(1)}px;height:${(c.size*.08).toFixed(1)}px;background:${c.color};border-radius:50%}`,
      html:`<div class="gyro-wrap"><div class="gyro-ring gyro-r1"></div><div class="gyro-ring gyro-r2"></div><div class="gyro-ring gyro-r3"></div><div class="gyro-core"></div></div>`
    })
  },
  /* 28 */ {
    id:28, name:"Radar Sweep", tags:["radar","sweep","tech","circular"],
    controls:{ speed:1.0, size:70, color:"#4ade80", blipCount:3, opacity:0.8 },
    render:(c)=>{
      const n=Math.round(c.blipCount); const blips=Array.from({length:n},(_,i)=>{const a=Math.random()*360;const r=Math.random()*.35+.25;return {a,r}});
      return {
        css:`@keyframes rd-sweep{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes rd-blip{0%,100%{opacity:0;r:3px}15%{opacity:1;r:5px}50%{opacity:.3}}
.rd-wrap{position:relative;width:${c.size}px;height:${c.size}px}
.rd-svg{position:absolute;inset:0;width:100%;height:100%}
.rd-sweep-el{animation:rd-sweep ${(2/c.speed).toFixed(2)}s linear infinite;transform-origin:${c.size/2}px ${c.size/2}px}
.rd-blip{animation:rd-blip ${(2/c.speed).toFixed(2)}s ease-out infinite}
${blips.map((_,i)=>`.rd-blip:nth-child(${i+1}){animation-delay:${-(i*.6/c.speed).toFixed(2)}s}`).join('\n')}`,
        html:`<div class="rd-wrap"><svg class="rd-svg" viewBox="0 0 ${c.size} ${c.size}">
  <circle cx="${c.size/2}" cy="${c.size/2}" r="${c.size/2-2}" fill="none" stroke="${c.color}" stroke-width="1" opacity="0.2"/>
  <circle cx="${c.size/2}" cy="${c.size/2}" r="${c.size*.32}" fill="none" stroke="${c.color}" stroke-width="0.8" opacity="0.15"/>
  <circle cx="${c.size/2}" cy="${c.size/2}" r="${c.size*.18}" fill="none" stroke="${c.color}" stroke-width="0.8" opacity="0.15"/>
  <line x1="${c.size/2}" y1="2" x2="${c.size/2}" y2="${c.size-2}" stroke="${c.color}" stroke-width="0.5" opacity="0.1"/>
  <line x1="2" y1="${c.size/2}" x2="${c.size-2}" y2="${c.size/2}" stroke="${c.color}" stroke-width="0.5" opacity="0.1"/>
  <g class="rd-sweep-el"><path d="M${c.size/2},${c.size/2} L${c.size/2},${2}" fill="none" stroke="none"/><path d="M${c.size/2},${c.size/2} L${c.size-2},${c.size/2}" fill="${c.color}" fill-opacity="0.08" stroke="${c.color}" stroke-width="1" opacity="${c.opacity}"/><path d="M${c.size/2},${c.size/2} L${c.size-2},${c.size/2}" fill="none" stroke="${c.color}" stroke-width="1.5" opacity="${c.opacity}"/></g>
  ${blips.map((b,i)=>{const bx=c.size/2+Math.cos(b.a*Math.PI/180)*b.r*c.size/2;const by=c.size/2+Math.sin(b.a*Math.PI/180)*b.r*c.size/2;return `<circle class="rd-blip" cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="4" fill="${c.color}"/>`}).join('')}
</svg></div>`
      }
    }
  },
  /* 29 */ {
    id:29, name:"Mandala Spin", tags:["mandala","geometric","ornate","sacred"],
    controls:{ speed:1.0, size:76, color:"#f472b6", secondColor:"#818cf8", layers:3 },
    render:(c)=>{
      const n=Math.round(c.layers); const r=c.size/2-4;
      const rings=Array.from({length:n},(_,i)=>{const rr=r*(1-i/(n+1));const petals=6+i*3;return Array.from({length:petals},(_,j)=>{const a=(j/petals)*360;const col=i%2===0?c.color:c.secondColor;return `<ellipse cx="0" cy="-${rr*.55}" rx="${rr*.12}" ry="${rr*.28}" fill="${col}" opacity="${.3+i*.1}" transform="rotate(${a},0,0)"/>`}).join('')}).join('');
      return {
        css:`@keyframes md-cw{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes md-ccw{0%{transform:rotate(0)}100%{transform:rotate(-360deg)}}
.md-svg{}
.md-g1{animation:md-cw ${(4/c.speed).toFixed(2)}s linear infinite;transform-origin:${c.size/2}px ${c.size/2}px}
.md-g2{animation:md-ccw ${(3/c.speed).toFixed(2)}s linear infinite;transform-origin:${c.size/2}px ${c.size/2}px}
.md-g3{animation:md-cw ${(2/c.speed).toFixed(2)}s linear infinite;transform-origin:${c.size/2}px ${c.size/2}px}`,
        html:`<svg class="md-svg" viewBox="-${c.size/2} -${c.size/2} ${c.size} ${c.size}" width="${c.size}" height="${c.size}">
  <g class="md-g1">${Array.from({length:8},(_,j)=>`<ellipse cx="0" cy="-${r*.82}" rx="${r*.1}" ry="${r*.3}" fill="${c.color}" opacity=".35" transform="rotate(${j*45},0,0)"/>`).join('')}</g>
  <g class="md-g2">${Array.from({length:12},(_,j)=>`<ellipse cx="0" cy="-${r*.55}" rx="${r*.07}" ry="${r*.2}" fill="${c.secondColor}" opacity=".4" transform="rotate(${j*30},0,0)"/>`).join('')}</g>
  <g class="md-g3">${Array.from({length:6},(_,j)=>`<ellipse cx="0" cy="-${r*.28}" rx="${r*.05}" ry="${r*.12}" fill="${c.color}" opacity=".6" transform="rotate(${j*60},0,0)"/>`).join('')}</g>
  <circle cx="0" cy="0" r="${r*.06}" fill="${c.color}"/>
</svg>`
      }
    }
  },
  /* 30 */ {
    id:30, name:"Quantum Dots", tags:["quantum","dots","grid","matrix"],
    controls:{ speed:1.0, color:"#a78bfa", cols:4, cellSize:14.0, gap:6.0 },
    render:(c)=>{
      const n=Math.round(c.cols);
      return {
        css:`@keyframes qd{0%,80%,100%{transform:scale(.2);opacity:.15}40%{transform:scale(1);opacity:1}}
.qd-wrap{display:grid;grid-template-columns:repeat(${n},${c.cellSize}px);gap:${c.gap}px}
.qd-c{width:${c.cellSize}px;height:${c.cellSize}px;background:${c.color};border-radius:${(c.cellSize/2).toFixed(1)}px;animation:qd ${(1.4/c.speed).toFixed(2)}s ease-in-out infinite}
${Array.from({length:n*n},(_,i)=>`.qd-c:nth-child(${i+1}){animation-delay:${-((i%n+Math.floor(i/n))*.15/c.speed).toFixed(3)}s}`).join('\n')}`,
        html:`<div class="qd-wrap">${Array.from({length:n*n},()=>'<div class="qd-c"></div>').join('')}</div>`
      }
    }
  },
  {
  id: 31,
  name: "Neon Orbit Core",
  tags: ["orbit", "neon", "3d", "complex"],
  controls: { speed: 1, size: 80, color: "#38bdf8", secondColor: "#a78bfa", thickness: 2 },
  render: (c) => ({
    css: `
@keyframes n28a {0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
@keyframes n28b {0%{transform:rotate(360deg)}100%{transform:rotate(0)}}
.n28-wrap{width:${c.size}px;height:${c.size}px;position:relative;display:flex;align-items:center;justify-content:center}
.n28-ring{position:absolute;border-radius:50%;border:${c.thickness}px solid transparent}
.n28-r1{width:${c.size}px;height:${c.size}px;border-top-color:${c.color};animation:n28a ${2/c.speed}s linear infinite}
.n28-r2{width:${c.size*0.7}px;height:${c.size*0.7}px;border-right-color:${c.secondColor};animation:n28b ${1.5/c.speed}s linear infinite}
.n28-core{width:${c.size*0.15}px;height:${c.size*0.15}px;background:${c.color};border-radius:50%;box-shadow:0 0 20px ${c.color}}
`,
    html: `<div class="n28-wrap"><div class="n28-ring n28-r1"></div><div class="n28-ring n28-r2"></div><div class="n28-core"></div></div>`
  })
},
{
  id: 32,
  name: "Morphing Blob Pulse",
  tags: ["blob", "liquid", "morph", "smooth"],
  controls: { speed: 1, size: 70, color: "#22c55e", secondColor: "#16a34a", thickness: 2 },
  render: (c) => ({
    css: `
@keyframes n29m {0%,100%{border-radius:42% 58% 70% 30% / 30% 30% 70% 70%}
50%{border-radius:58% 42% 30% 70% / 60% 70% 30% 40%}}
.n29-wrap{width:${c.size}px;height:${c.size}px;display:flex;align-items:center;justify-content:center}
.n29-blob{
  width:${c.size}px;height:${c.size}px;
  background:radial-gradient(circle at 30% 30%, ${c.color}, ${c.secondColor});
  animation:n29m ${3/c.speed}s ease-in-out infinite;
  filter:blur(0.2px);
}
`,
    html: `<div class="n29-wrap"><div class="n29-blob"></div></div>`
  })
},
{
  id: 33,
  name: "Plasma Gyro Reactor",
  tags: ["3d", "reactor", "gyro", "particles", "complex"],
  controls: { speed: 1, size: 90, color: "#38bdf8", secondColor: "#a78bfa", thickness: 2 },

  render: (c) => ({
    css: `
@keyframes r39x {0%{transform:rotateX(0) rotateZ(0)}100%{transform:rotateX(360deg) rotateZ(360deg)}}
@keyframes r39y {0%{transform:rotateY(0)}100%{transform:rotateY(-360deg)}}
@keyframes r39p {0%{transform:translate(0,0) scale(.5);opacity:.2}
50%{opacity:1}
100%{transform:translate(18px,-18px) scale(1.2);opacity:0}}

.r39-wrap{width:${c.size}px;height:${c.size}px;position:relative;perspective:600px;display:flex;align-items:center;justify-content:center}

.r39-core{
  width:${c.size*0.25}px;height:${c.size*0.25}px;
  border-radius:50%;
  background:radial-gradient(circle, ${c.color}, ${c.secondColor});
  box-shadow:0 0 25px ${c.color};
  animation:r39y ${2/c.speed}s linear infinite;
}

.r39-ring{
  position:absolute;border-radius:50%;
  border:${c.thickness}px solid transparent;
}

.r39-r1{
  width:${c.size}px;height:${c.size}px;
  border-top-color:${c.color};
  border-bottom-color:${c.secondColor};
  animation:r39x ${3/c.speed}s linear infinite;
}

.r39-r2{
  width:${c.size*0.75}px;height:${c.size*0.75}px;
  border-left-color:${c.secondColor};
  border-right-color:${c.color};
  animation:r39y ${2.2/c.speed}s linear infinite reverse;
}

.r39-p{
  position:absolute;
  width:4px;height:4px;border-radius:50%;
  background:${c.color};
  top:50%;left:50%;
}
.r39-p:nth-child(1){animation:r39p 1.4s ease-in-out infinite}
.r39-p:nth-child(2){animation:r39p 1.8s ease-in-out infinite .2s}
.r39-p:nth-child(3){animation:r39p 2.1s ease-in-out infinite .4s}
`,
    html: `
<div class="r39-wrap">
  <div class="r39-ring r39-r1"></div>
  <div class="r39-ring r39-r2"></div>

  <div class="r39-core"></div>

  <div class="r39-p"></div>
  <div class="r39-p"></div>
  <div class="r39-p"></div>
</div>
`
  })
},
{
  id: 34,
  name: "Quantum Field Collapse",
  tags: ["quantum", "wave", "field", "mask", "advanced"],
  controls: { speed: 1, size: 90, color: "#22c55e", secondColor: "#0ea5e9", thickness: 2 },

  render: (c) => ({
    css: `
@keyframes r40w {
  0%{transform:scaleX(.2) scaleY(.2);opacity:.2}
  50%{opacity:1}
  100%{transform:scaleX(1.6) scaleY(1.6);opacity:0}
}

@keyframes r40r {
  0%{transform:rotate(0deg)}
  100%{transform:rotate(360deg)}
}

.r40-wrap{
  width:${c.size}px;height:${c.size}px;
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
}

.r40-ring{
  position:absolute;
  width:100%;height:100%;
  border-radius:50%;
  border:${c.thickness}px solid transparent;
  border-top-color:${c.color};
  border-bottom-color:${c.secondColor};
  animation:r40r ${2/c.speed}s linear infinite;
}

.r40-wave{
  position:absolute;
  width:30%;height:30%;
  border-radius:50%;
  background:radial-gradient(circle, ${c.color}, transparent 70%);
  animation:r40w ${1.5/c.speed}s ease-out infinite;
}

.r40-wave:nth-child(3){animation-delay:.3s}
.r40-wave:nth-child(4){animation-delay:.6s}
`,
    html: `
<div class="r40-wrap">
  <div class="r40-ring"></div>
  <div class="r40-wave"></div>
  <div class="r40-wave"></div>
  <div class="r40-wave"></div>
</div>
`
  })
},
{
  id: 35,
  name: "Hypercube Lattice",
  tags: ["cube", "3d", "lattice", "rotation", "tech"],
  controls: { speed: 1, size: 80, color: "#f472b6", secondColor: "#38bdf8", thickness: 2 },

  render: (c) => ({
    css: `
@keyframes r41a {0%{transform:rotateX(0) rotateY(0)}100%{transform:rotateX(360deg) rotateY(360deg)}}
@keyframes r41b {0%{transform:scale(0.7)}50%{transform:scale(1.1)}100%{transform:scale(0.7)}}

.r41-wrap{
  width:${c.size}px;height:${c.size}px;
  perspective:800px;
  display:flex;align-items:center;justify-content:center;
}

.r41-cube{
  width:${c.size*0.6}px;height:${c.size*0.6}px;
  position:relative;
  transform-style:preserve-3d;
  animation:r41a ${3/c.speed}s linear infinite;
}

.r41-face{
  position:absolute;
  width:100%;height:100%;
  border:${c.thickness}px solid ${c.color};
  opacity:.6;
}

.r41-f1{transform:rotateY(0deg) translateZ(${c.size*0.3}px)}
.r41-f2{transform:rotateY(90deg) translateZ(${c.size*0.3}px);border-color:${c.secondColor}}
.r41-f3{transform:rotateY(180deg) translateZ(${c.size*0.3}px)}
.r41-f4{transform:rotateY(270deg) translateZ(${c.size*0.3}px);border-color:${c.secondColor}}

.r41-core{
  position:absolute;
  width:20%;height:20%;
  background:${c.color};
  border-radius:50%;
  animation:r41b 1.2s ease-in-out infinite;
}
`,
    html: `
<div class="r41-wrap">
  <div class="r41-cube">
    <div class="r41-face r41-f1"></div>
    <div class="r41-face r41-f2"></div>
    <div class="r41-face r41-f3"></div>
    <div class="r41-face r41-f4"></div>
  </div>
  <div class="r41-core"></div>
</div>
`
  })
},
{
  id: 36,
  name: "Black Hole Disk",
  tags: ["space", "blackhole", "swirl", "gravity", "advanced"],
  controls: { speed: 1, size: 90, color: "#a78bfa", secondColor: "#38bdf8", thickness: 2 },

  render: (c) => ({
    css: `
@keyframes r42s {0%{transform:rotate(0deg) scale(1)}100%{transform:rotate(360deg) scale(1.1)}}
@keyframes r42p {0%{transform:translateY(0) scale(.5);opacity:.2}
50%{opacity:1}
100%{transform:translateY(-20px) scale(1.2);opacity:0}}

.r42-wrap{
  width:${c.size}px;height:${c.size}px;
  position:relative;
  display:flex;align-items:center;justify-content:center;
}

.r42-disk{
  position:absolute;
  width:100%;height:100%;
  border-radius:50%;
  background:conic-gradient(from 0deg, ${c.color}, transparent, ${c.secondColor}, transparent);
  filter:blur(1px);
  animation:r42s ${2/c.speed}s linear infinite;
}

.r42-core{
  width:${c.size*0.2}px;height:${c.size*0.2}px;
  background:#000;
  border-radius:50%;
  box-shadow:0 0 20px ${c.color};
  z-index:2;
}

.r42-particle{
  position:absolute;
  width:3px;height:3px;
  background:${c.secondColor};
  border-radius:50%;
  top:50%;left:50%;
  animation:r42p 1.6s ease-in-out infinite;
}
.r42-particle:nth-child(3){animation-delay:.3s}
.r42-particle:nth-child(4){animation-delay:.6s}
`,
    html: `
<div class="r42-wrap">
  <div class="r42-disk"></div>
  <div class="r42-core"></div>
  <div class="r42-particle"></div>
  <div class="r42-particle"></div>
  <div class="r42-particle"></div>
</div>
`
  })
},
{
  id: 37,
  name: "Orbital Singularity Collapse",
  tags: ["gravity", "orbit", "singularity", "advanced", "physics"],
  controls: { speed: 1, size: 100, color: "#38bdf8", secondColor: "#a78bfa", thickness: 2 },

  render: (c) => ({
    css: `
@keyframes r43o {
  0% { transform: rotate(0deg) translateX(${c.size*0.35}px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(${c.size*0.35}px) rotate(-360deg); }
}

@keyframes r43c {
  0%,100% { transform: scale(0.8); filter: blur(0px); }
  50% { transform: scale(1.2); filter: blur(1px); }
}

@keyframes r43w {
  0% { transform: scale(0.2); opacity: 0.8; }
  100% { transform: scale(2.2); opacity: 0; }
}

.r43-wrap{
  width:${c.size}px;height:${c.size}px;
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  perspective:800px;
}

.r43-core{
  width:${c.size*0.22}px;
  height:${c.size*0.22}px;
  border-radius:50%;
  background:radial-gradient(circle, ${c.color}, #000);
  box-shadow:0 0 25px ${c.color};
  animation:r43c ${1.6/c.speed}s ease-in-out infinite;
  z-index:3;
}

.r43-orbit{
  position:absolute;
  width:100%;
  height:100%;
}

.r43-dot{
  position:absolute;
  width:6px;height:6px;
  border-radius:50%;
  background:${c.secondColor};
  top:50%;left:50%;
  transform-origin:0 0;
  box-shadow:0 0 10px ${c.secondColor};
}

.r43-o1{animation:r43o ${2/c.speed}s linear infinite}
.r43-o2{animation:r43o ${3/c.speed}s linear infinite reverse}

.r43-wave{
  position:absolute;
  width:${c.size}px;height:${c.size}px;
  border-radius:50%;
  border:1px solid ${c.color};
  animation:r43w ${2.2/c.speed}s ease-out infinite;
  opacity:.4;
}
.r43-wave:nth-child(5){animation-delay:.4s}
.r43-wave:nth-child(6){animation-delay:.8s}
`,
    html: `
<div class="r43-wrap">
  <div class="r43-wave"></div>
  <div class="r43-wave"></div>

  <div class="r43-orbit r43-o1">
    <div class="r43-dot"></div>
  </div>

  <div class="r43-orbit r43-o2">
    <div class="r43-dot"></div>
  </div>

  <div class="r43-core"></div>
</div>
`
  })
},
{
  id: 38,
  name: "Quantum Fractal Bloom",
  tags: ["fractal", "growth", "organic", "recursive", "complex"],
  controls: { speed: 1, size: 100, color: "#38bdf8", secondColor: "#f472b6", thickness: 2 },

  render: (c) => ({
    css: `
@keyframes r47b {
  0% { transform: scale(0.2) rotate(0deg); opacity: 0.2; }
  50% { opacity: 1; }
  100% { transform: scale(1.6) rotate(360deg); opacity: 0; }
}

.r47-wrap{
  width:${c.size}px;height:${c.size}px;
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
}

.r47-petal{
  position:absolute;
  width:${c.size*0.3}px;
  height:${c.size*0.3}px;
  border-radius:50%;
  border:1px solid ${c.color};
  animation:r47b ${2/c.speed}s ease-out infinite;
}

.r47-petal:nth-child(2){animation-delay:.3s;border-color:${c.secondColor}}
.r47-petal:nth-child(3){animation-delay:.6s}
.r47-petal:nth-child(4){animation-delay:.9s;border-color:${c.secondColor}}

.r47-core{
  width:${c.size*0.18}px;height:${c.size*0.18}px;
  border-radius:50%;
  background:radial-gradient(circle, ${c.secondColor}, ${c.color});
  box-shadow:0 0 25px ${c.color};
}
`,
    html: `
<div class="r47-wrap">
  <div class="r47-petal"></div>
  <div class="r47-petal"></div>
  <div class="r47-petal"></div>
  <div class="r47-petal"></div>
  <div class="r47-core"></div>
</div>
`
  })
},
{
  id: 39,
  name: "Lagrange Orbit Field",
  tags: ["orbit", "field", "physics", "complex", "stable"],
  controls: { speed: 1, size: 110, color: "#38bdf8", secondColor: "#a78bfa", thickness: 2 },

  render: (c) => ({
    css: `
@keyframes l54r1 {0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes l54r2 {0%{transform:rotate(360deg)}100%{transform:rotate(0deg)}}
@keyframes l54p {
  0%{transform:scale(0.6) translateY(0)}
  50%{transform:scale(1.2) translateY(-6px)}
  100%{transform:scale(0.6) translateY(0)}
}

.l54-wrap{
  width:${c.size}px;
  height:${c.size}px;
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
  perspective:800px;
}

.l54-ring{
  position:absolute;
  width:100%;
  height:100%;
  border-radius:50%;
  border:${c.thickness}px solid transparent;
  border-top-color:${c.color};
  border-left-color:${c.secondColor};
}

.l54-r1{animation:l54r1 ${2/c.speed}s linear infinite}
.l54-r2{
  width:70%;
  height:70%;
  animation:l54r2 ${1.6/c.speed}s linear infinite;
  border-top-color:${c.secondColor};
  border-right-color:${c.color};
}

.l54-core{
  width:${c.size*0.18}px;
  height:${c.size*0.18}px;
  border-radius:50%;
  background:radial-gradient(circle, ${c.color}, #000);
  box-shadow:0 0 20px ${c.color};
  animation:l54p ${1.2/c.speed}s ease-in-out infinite;
}
`,
    html: `
<div class="l54-wrap">
  <div class="l54-ring l54-r1"></div>
  <div class="l54-ring l54-r2"></div>
  <div class="l54-core"></div>
</div>
`
  })
},
{
  id: 55,
  name: "Interference Lattice",
  tags: ["wave", "interference", "grid", "physics", "advanced"],
  controls: { speed: 1, size: 110, color: "#22c55e", secondColor: "#0ea5e9", thickness: 2 },

  render: (c) => ({
    css: `
@keyframes i55w {
  0%{transform:scaleX(0.4) scaleY(1)}
  50%{transform:scaleX(1.4) scaleY(0.6)}
  100%{transform:scaleX(0.4) scaleY(1)}
}

.i55-wrap{
  width:${c.size}px;
  height:${c.size}px;
  position:relative;
  display:grid;
  grid-template-columns:repeat(5,1fr);
  grid-gap:3px;
}

.i55-cell{
  width:100%;
  height:100%;
  background:${c.color};
  opacity:0.4;
  animation:i55w ${1.3/c.speed}s ease-in-out infinite;
}

.i55-cell:nth-child(odd){
  background:${c.secondColor};
  animation-duration:${1.6/c.speed}s;
}
`,
    html: `
<div class="i55-wrap">
  ${Array.from({length:25}).map(() => `<div class="i55-cell"></div>`).join("")}
</div>
`
  })
},
/* 60 */ {
  id: 60, name: "Jellyfish Drift", tags: ["animal", "ocean", "fluid", "organic"],
  controls: { speed: 1.0, size: 80, color: "#c084fc", secondColor: "#818cf8", thirdColor: "#f0abfc", thickness: 1.2 },
  render: (c) => ({
    css: `@keyframes jf-bell{0%,100%{d:path("M20 38 Q20 18 40 16 Q60 18 60 38 Q58 50 40 52 Q22 50 20 38")}50%{d:path("M22 38 Q22 22 40 20 Q58 22 58 38 Q60 44 40 48 Q20 44 22 38")}}
@keyframes jf-bob{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-8px) rotate(2deg)}}
@keyframes jf-tent{0%,100%{transform:scaleY(1) translateY(0)}50%{transform:scaleY(1.18) translateY(4px)}}
@keyframes jf-glow{0%,100%{opacity:.25}50%{opacity:.55}}
.jf-wrap{animation:jf-bob ${(3/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:40px 40px}
.jf-bell{animation:jf-bell ${(2/c.speed).toFixed(2)}s ease-in-out infinite}
.jf-inner{animation:jf-glow ${(2/c.speed).toFixed(2)}s ease-in-out infinite}
${Array.from({length:7},(_,i)=>`.jf-t${i}{animation:jf-tent ${((1.4+i*.2)/c.speed).toFixed(2)}s ease-in-out ${(i*.15).toFixed(2)}s infinite;transform-origin:${24+i*7}px 52px}`).join('')}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80">
<g class="jf-wrap">
<path class="jf-bell" fill="${c.color}" opacity=".7"/>
<ellipse class="jf-inner" cx="40" cy="36" rx="12" ry="8" fill="${c.thirdColor}" opacity=".35"/>
<ellipse cx="40" cy="34" rx="7" ry="4" fill="${c.thirdColor}" opacity=".2" class="jf-glow"/>
${Array.from({length:7},(_,i)=>{const x=24+i*7;const wave=Math.sin(i*1.1)*4;return `<path class="jf-t${i}" d="M${x} 52 Q${x+wave} ${58+i*2} ${x-wave} ${64+i*3} Q${x+wave*1.5} ${70+i*2} ${x} ${74+i}" fill="none" stroke="${i%2?c.color:c.secondColor}" stroke-width="${c.thickness}" stroke-linecap="round" opacity="${.4+i*.06}"/>`}).join('')}
</g>
</svg>`
  })
},

/* 61 */ {
  id: 61, name: "Hummingbird Wing", tags: ["animal", "bird", "motion-blur", "flight"],
  controls: { speed: 1.0, size: 80, color: "#34d399", secondColor: "#06b6d4", thirdColor: "#a78bfa", thickness: 1.5 },
  render: (c) => ({
    css: `@keyframes hb-flap{0%,100%{transform:rotateX(0deg) scaleY(1)}25%{transform:rotateX(70deg) scaleY(.3)}50%{transform:rotateX(0deg) scaleY(1)}75%{transform:rotateX(-60deg) scaleY(.4)}}
@keyframes hb-body{0%,100%{transform:translateY(0) rotate(-5deg)}50%{transform:translateY(-3px) rotate(5deg)}}
@keyframes hb-tail{0%,100%{transform:rotate(-10deg)}50%{transform:rotate(10deg)}}
@keyframes hb-beak{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}
.hb-wingL{animation:hb-flap ${(.12/c.speed).toFixed(3)}s ease-in-out infinite;transform-origin:38px 38px}
.hb-wingR{animation:hb-flap ${(.12/c.speed).toFixed(3)}s ease-in-out .06s infinite;transform-origin:42px 38px}
.hb-body{animation:hb-body ${(1.5/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:40px 42px}
.hb-tail{animation:hb-tail ${(1.5/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:40px 54px}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80">
<ellipse class="hb-wingL" cx="22" cy="34" rx="18" ry="8" fill="${c.color}" opacity=".5"/>
<ellipse class="hb-wingL" cx="18" cy="34" rx="10" ry="5" fill="${c.color}" opacity=".3" style="animation-delay:.02s"/>
<ellipse class="hb-wingR" cx="58" cy="34" rx="18" ry="8" fill="${c.secondColor}" opacity=".5"/>
<ellipse class="hb-wingR" cx="62" cy="34" rx="10" ry="5" fill="${c.secondColor}" opacity=".3" style="animation-delay:.04s"/>
<g class="hb-body">
<ellipse cx="40" cy="40" rx="7" ry="12" fill="${c.thirdColor}"/>
<ellipse cx="40" cy="36" rx="5" ry="7" fill="${c.color}" opacity=".6"/>
<circle cx="40" cy="29" r="5" fill="${c.thirdColor}"/>
<circle cx="40" cy="28" r="3" fill="${c.color}" opacity=".5"/>
<line x1="40" y1="25" x2="40" y2="14" stroke="${c.secondColor}" stroke-width="2" stroke-linecap="round"/>
<circle cx="40" cy="27" r="1.5" fill="#1e293b"/>
</g>
<g class="hb-tail" style="transform-origin:40px 52px">
<polygon points="36,52 40,62 44,52" fill="${c.thirdColor}" opacity=".7"/>
<polygon points="33,52 40,65 47,52" fill="${c.color}" opacity=".35"/>
</g>
</svg>`
  })
},

/* 62 */ {
  id: 62, name: "Sound Wave Spectrum", tags: ["sound", "audio", "equalizer", "frequency"],
  controls: { speed: 1.0, size: 80, color: "#f43f5e", secondColor: "#fb923c", thirdColor: "#fbbf24", thickness: 3 },
  render: (c) => {
    const bars = 18;
    const heights = [20,35,55,45,70,60,80,65,50,75,60,45,65,50,40,60,35,22];
    return {
      css: `@keyframes sw-bar{0%,100%{transform:scaleY(.15)}50%{transform:scaleY(1)}}
${Array.from({length:bars},(_,i)=>`.sw-b${i}{animation:sw-bar ${((0.6+Math.sin(i)*0.4)/c.speed).toFixed(2)}s ease-in-out ${(i*.06).toFixed(2)}s infinite;transform-origin:${8+i*3.8}px 60px}`).join('')}`,
      html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80">
${Array.from({length:bars},(_,i)=>{
  const x=6+i*3.9;const h=heights[i];const y=60-h;
  const progress=i/bars;
  const r=parseInt(c.color.slice(1,3),16)*(1-progress)+parseInt(c.thirdColor.slice(1,3),16)*progress;
  const g=parseInt(c.color.slice(3,5),16)*(1-progress)+parseInt(c.thirdColor.slice(3,5),16)*progress;
  const b=parseInt(c.color.slice(5,7),16)*(1-progress)+parseInt(c.thirdColor.slice(5,7),16)*progress;
  const clr=`rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
  return `<rect class="sw-b${i}" x="${x.toFixed(1)}" y="${y}" width="${c.thickness-0.5}" height="${h}" rx="1.5" fill="${clr}" opacity=".9"/>`;
}).join('')}
<line x1="4" y1="62" x2="76" y2="62" stroke="#64748b" stroke-width=".5" opacity=".3"/>
</svg>`
    };
  }
},

/* 63 */ {
  id: 63, name: "Ocean Swell", tags: ["water", "ocean", "wave", "fluid"],
  controls: { speed: 1.0, size: 80, color: "#0ea5e9", secondColor: "#38bdf8", thirdColor: "#7dd3fc", thickness: 1.5 },
  render: (c) => ({
    css: `@keyframes ow-wave1{0%{transform:translateX(0)}100%{transform:translateX(-80px)}}
@keyframes ow-wave2{0%{transform:translateX(-40px)}100%{transform:translateX(-120px)}}
@keyframes ow-wave3{0%{transform:translateX(-20px)}100%{transform:translateX(-100px)}}
@keyframes ow-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}
.ow-w1{animation:ow-wave1 ${(2/c.speed).toFixed(2)}s linear infinite}
.ow-w2{animation:ow-wave2 ${(3/c.speed).toFixed(2)}s linear infinite}
.ow-w3{animation:ow-wave3 ${(2.5/c.speed).toFixed(2)}s linear infinite}
.ow-foam{animation:ow-bob ${(1.5/c.speed).toFixed(2)}s ease-in-out infinite}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80" style="overflow:hidden">
<rect x="0" y="40" width="80" height="40" fill="${c.color}" opacity=".15"/>
<g class="ow-w1">
  <path d="M0 48 Q10 40 20 48 Q30 56 40 48 Q50 40 60 48 Q70 56 80 48 Q90 40 100 48 Q110 56 120 48 Q130 40 140 48 Q150 56 160 48 V80 H0 Z" fill="${c.color}" opacity=".35"/>
</g>
<g class="ow-w2">
  <path d="M0 52 Q12 44 24 52 Q36 60 48 52 Q60 44 72 52 Q84 60 96 52 Q108 44 120 52 Q132 60 144 52 V80 H0 Z" fill="${c.secondColor}" opacity=".4"/>
</g>
<g class="ow-w3">
  <path d="M0 56 Q14 50 28 56 Q42 62 56 56 Q70 50 84 56 Q98 62 112 56 Q126 50 140 56 V80 H0 Z" fill="${c.thirdColor}" opacity=".5"/>
</g>
<g class="ow-foam">
${Array.from({length:6},(_,i)=>`<ellipse cx="${8+i*13}" cy="${44+Math.sin(i)*3}" rx="${2+Math.cos(i)*1}" ry="1.2" fill="white" opacity="${.3+i*.04}"/>`).join('')}
</g>
</svg>`
  })
},

/* 64 */ {
  id: 64, name: "Neural Network Forward Pass", tags: ["AI", "deep-learning", "neural", "layers"],
  controls: { speed: 1.0, size: 80, color: "#818cf8", secondColor: "#34d399", thirdColor: "#f472b6", thickness: 1 },
  render: (c) => {
    const layers=[[40],[22,40,58],[18,32,46,60],[22,40,58],[40]];
    const nodeR=3.5;
    const xPos=[8,24,40,56,72];
    let nodes='', edges='', edgeCss='', nodeCss='';
    let edgeIdx=0;
    layers.forEach((layer,li)=>{
      if(li<layers.length-1){
        layer.forEach(y1=>{
          layers[li+1].forEach(y2=>{
            const id=`nn-e${edgeIdx}`;
            const delay=(edgeIdx*.04).toFixed(2);
            const dur=((1.5)/c.speed).toFixed(2);
            edgeCss+=`.${id}{animation:nn-pulse ${dur}s ease-in-out ${delay}s infinite}`;
            edges+=`<line class="${id}" x1="${xPos[li]}" y1="${y1}" x2="${xPos[li+1]}" y2="${y2}" stroke="${c.color}" stroke-width="${c.thickness}" opacity=".2"/>`;
            edgeIdx++;
          });
        });
      }
      layer.forEach((y,ni)=>{
        const id=`nn-n${li}-${ni}`;
        const delay=(li*.3+ni*.1).toFixed(2);
        const clr=li===0?c.thirdColor:li===layers.length-1?c.secondColor:c.color;
        nodeCss+=`.${id}{animation:nn-node ${(1.2/c.speed).toFixed(2)}s ease-in-out ${delay}s infinite;transform-origin:${xPos[li]}px ${y}px}`;
        nodes+=`<circle class="${id}" cx="${xPos[li]}" cy="${y}" r="${nodeR}" fill="${clr}" opacity=".9"/>`;
      });
    });
    return {
      css: `@keyframes nn-pulse{0%,100%{opacity:.15}50%{opacity:.8}}
@keyframes nn-node{0%,100%{transform:scale(.7);opacity:.4}50%{transform:scale(1.3);opacity:1}}
${edgeCss}${nodeCss}
@keyframes nn-travel{0%{stroke-dashoffset:60}100%{stroke-dashoffset:0}}`,
      html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80">${edges}${nodes}</svg>`
    };
  }
},

/* 65 */ {
  id: 65, name: "Ripple Tank", tags: ["water", "ripple", "physics", "interference"],
  controls: { speed: 1.0, size: 80, color: "#38bdf8", secondColor: "#818cf8", thickness: 1 },
  render: (c) => {
    const sources=[{x:26,y:40},{x:54,y:40}];
    const rings=7;
    let css='', svg='';
    sources.forEach((src,si)=>{
      for(let r=1;r<=rings;r++){
        const id=`rt-r${si}-${r}`;
        const delay=(r*.15).toFixed(2);
        const dur=(2/c.speed).toFixed(2);
        const clr=si===0?c.color:c.secondColor;
        css+=`.${id}{animation:rt-expand ${dur}s ease-out ${delay}s infinite;transform-origin:${src.x}px ${src.y}px}`;
        svg+=`<circle class="${id}" cx="${src.x}" cy="${src.y}" r="${r*5}" fill="none" stroke="${clr}" stroke-width="${c.thickness}" opacity="${(.7-r*.09).toFixed(2)}"/>`;
      }
      svg+=`<circle cx="${src.x}" cy="${src.y}" r="3" fill="${si===0?c.color:c.secondColor}" style="animation:rt-src ${(1/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:${src.x}px ${src.y}px"/>`;
    });
    return {
      css: `@keyframes rt-expand{0%{transform:scale(0);opacity:.8}100%{transform:scale(1.4);opacity:0}}
@keyframes rt-src{0%,100%{transform:scale(.8);opacity:.6}50%{transform:scale(1.2);opacity:1}}
${css}`,
      html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80" style="overflow:hidden">${svg}</svg>`
    };
  }
},

/* 66 */ {
  id: 66, name: "Octopus Ink", tags: ["animal", "ocean", "tentacle", "organic"],
  controls: { speed: 1.0, size: 80, color: "#7c3aed", secondColor: "#a78bfa", thirdColor: "#c4b5fd", thickness: 2 },
  render: (c) => {
    const arms=8;
    const armCss=Array.from({length:arms},(_,i)=>{
      const delay=(i*.1).toFixed(2);
      return `.oct-a${i}{animation:oct-wave${i%2} ${((1.8+i*.15)/c.speed).toFixed(2)}s ease-in-out ${delay}s infinite;transform-origin:40px 42px}`;
    }).join('');
    const armSvg=Array.from({length:arms},(_,i)=>{
      const baseAng=(i/arms)*Math.PI*2;
      const x1=40+Math.cos(baseAng)*10;
      const y1=42+Math.sin(baseAng)*8;
      const mx=40+Math.cos(baseAng)*24+Math.cos(baseAng+1)*8;
      const my=42+Math.sin(baseAng)*20+Math.sin(baseAng+1)*8;
      const ex=40+Math.cos(baseAng)*32+Math.cos(baseAng+1.8)*10;
      const ey=42+Math.sin(baseAng)*28+Math.sin(baseAng+1.8)*10;
      const clr=[c.color,c.secondColor,c.thirdColor][i%3];
      return `<path class="oct-a${i}" d="M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke="${clr}" stroke-width="${c.thickness}" stroke-linecap="round" opacity=".8"/>`;
    }).join('');
    return {
      css: `@keyframes oct-wave0{0%,100%{transform:rotate(-8deg) scale(1)}50%{transform:rotate(8deg) scale(1.05)}}
@keyframes oct-wave1{0%,100%{transform:rotate(8deg) scale(1.05)}50%{transform:rotate(-8deg) scale(1)}}
@keyframes oct-body{0%,100%{transform:scale(1) translateY(0)}50%{transform:scale(1.06) translateY(-2px)}}
@keyframes oct-eye{0%,95%,100%{transform:scaleY(1)}97%{transform:scaleY(.1)}}
${armCss}
.oct-body{animation:oct-body ${(2/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:40px 36px}
.oct-el{animation:oct-eye ${(4/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:34px 34px}
.oct-er{animation:oct-eye ${(4/c.speed).toFixed(2)}s ease-in-out .2s infinite;transform-origin:46px 34px}`,
      html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80">
${armSvg}
<g class="oct-body">
<ellipse cx="40" cy="34" rx="16" ry="20" fill="${c.color}" opacity=".85"/>
<ellipse cx="40" cy="30" rx="12" ry="14" fill="${c.secondColor}" opacity=".4"/>
<ellipse class="oct-el" cx="34" cy="32" rx="4" ry="5" fill="white" opacity=".9"/>
<ellipse class="oct-er" cx="46" cy="32" rx="4" ry="5" fill="white" opacity=".9"/>
<circle cx="34" cy="33" r="2.5" fill="#1e293b"/>
<circle cx="46" cy="33" r="2.5" fill="#1e293b"/>
<circle cx="33" cy="32" r="1" fill="white"/>
<circle cx="45" cy="32" r="1" fill="white"/>
</g>
</svg>`
    };
  }
},

/* 67 */ {
  id: 67, name: "LLM Token Stream", tags: ["AI", "LLM", "tokens", "generation"],
  controls: { speed: 1.0, size: 80, color: "#818cf8", secondColor: "#34d399", thirdColor: "#f59e0b", thickness: 1 },
  render: (c) => {
    const tokens=["the","cat","sat","on","a","mat","and","it","was","nice"];
    const colors=[c.color,c.secondColor,c.thirdColor,c.color,c.secondColor];
    return {
      css: `@keyframes tk-appear{0%{opacity:0;transform:translateY(6px) scale(.8)}20%{opacity:1;transform:translateY(0) scale(1)}80%{opacity:1}100%{opacity:0;transform:translateY(-4px)}}
@keyframes tk-cursor{0%,100%{opacity:1}50%{opacity:0}}
@keyframes tk-glow{0%,100%{opacity:.3}50%{opacity:.8}}
${tokens.map((_,i)=>`.tk-t${i}{animation:tk-appear ${(2.5/c.speed).toFixed(2)}s ease-in-out ${(i*.25/c.speed).toFixed(2)}s infinite}`).join('')}
.tk-cur{animation:tk-cursor ${(.6/c.speed).toFixed(2)}s step-end infinite}
.tk-arc{animation:tk-glow ${(2/c.speed).toFixed(2)}s ease-in-out infinite}`,
      html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80">
<rect x="4" y="8" width="72" height="64" rx="8" fill="#0f172a" opacity=".85"/>
<rect x="4" y="8" width="72" height="64" rx="8" fill="none" stroke="${c.color}" stroke-width="${c.thickness}" opacity=".4"/>
<text x="10" y="26" font-family="monospace" font-size="7" fill="${c.color}" opacity=".5">&lt;transformer&gt;</text>
<rect class="tk-arc" x="8" y="30" width="64" height="14" rx="4" fill="${c.color}" opacity=".08"/>
${tokens.map((tok,i)=>{const row=Math.floor(i/5);const col=i%5;return `<text class="tk-t${i}" x="${10+col*14}" y="${43+row*12}" font-family="monospace" font-size="8" font-weight="500" fill="${colors[i%colors.length]}">${tok}</text>`;}).join('')}
<rect class="tk-cur" x="10" y="56" width="1.5" height="8" rx=".5" fill="${c.secondColor}"/>
</svg>`
    };
  }
},

/* 68 */ {
  id: 68, name: "Sonar Ping", tags: ["sound", "sonar", "radar", "pulse"],
  controls: { speed: 1.0, size: 80, color: "#22d3ee", secondColor: "#06b6d4", thickness: 1.2 },
  render: (c) => {
    const rings=5;
    return {
      css: `@keyframes sp-ping{0%{transform:scale(0);opacity:.9}100%{transform:scale(1);opacity:0}}
@keyframes sp-sweep{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
@keyframes sp-blip{0%,90%,100%{opacity:0;transform:scale(0)}5%{opacity:1;transform:scale(1.5)}15%{opacity:.6;transform:scale(1)}}
@keyframes sp-dot{0%,100%{opacity:.3}50%{opacity:1}}
${Array.from({length:rings},(_,i)=>`.sp-r${i}{animation:sp-ping ${(2.5/c.speed).toFixed(2)}s ease-out ${(i*.5).toFixed(2)}s infinite;transform-origin:40px 40px}`).join('')}
.sp-sweep{animation:sp-sweep ${(3/c.speed).toFixed(2)}s linear infinite;transform-origin:40px 40px}
.sp-blip{animation:sp-blip ${(3/c.speed).toFixed(2)}s ease-out 1.2s infinite}`,
      html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80">
<circle cx="40" cy="40" r="36" fill="none" stroke="${c.color}" stroke-width=".5" opacity=".15"/>
<circle cx="40" cy="40" r="27" fill="none" stroke="${c.color}" stroke-width=".5" opacity=".12"/>
<circle cx="40" cy="40" r="18" fill="none" stroke="${c.color}" stroke-width=".5" opacity=".1"/>
<circle cx="40" cy="40" r="9" fill="none" stroke="${c.color}" stroke-width=".5" opacity=".1"/>
${Array.from({length:rings},(_,i)=>`<circle class="sp-r${i}" cx="40" cy="40" r="34" fill="none" stroke="${c.color}" stroke-width="${c.thickness}" opacity=".7"/>`).join('')}
<g class="sp-sweep">
<path d="M40 40 L40 6" stroke="${c.secondColor}" stroke-width="1.5" opacity=".8" stroke-linecap="round"/>
<path d="M40 40 L40 6" stroke="${c.secondColor}" stroke-width="12" opacity=".08" stroke-linecap="round"/>
</g>
<circle class="sp-blip" cx="58" cy="24" r="3" fill="${c.secondColor}" opacity=".9"/>
<circle cx="40" cy="40" r="3" fill="${c.color}" opacity=".9" style="animation:sp-dot ${(1/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:40px 40px"/>
<line x1="4" y1="40" x2="76" y2="40" stroke="${c.color}" stroke-width=".4" opacity=".1"/>
<line x1="40" y1="4" x2="40" y2="76" stroke="${c.color}" stroke-width=".4" opacity=".1"/>
</svg>`
    };
  }
},

/* 69 */ {
  id: 69, name: "Water Drop Splash", tags: ["water", "drop", "splash", "fluid"],
  controls: { speed: 1.0, size: 80, color: "#38bdf8", secondColor: "#7dd3fc", thirdColor: "#0ea5e9", thickness: 1.5 },
  render: (c) => ({
    css: `@keyframes wd-drop{0%{transform:translateY(-30px);opacity:0}60%{transform:translateY(0);opacity:1}80%{transform:translateY(0);opacity:1}100%{transform:translateY(-30px);opacity:0}}
@keyframes wd-splash{0%,55%{transform:scale(0);opacity:0}65%{transform:scale(1);opacity:.8}100%{transform:scale(1.6);opacity:0}}
@keyframes wd-ring{0%,60%{transform:scale(0);opacity:.7}100%{transform:scale(1.8);opacity:0}}
@keyframes wd-pillar{0%,60%{transform:scaleY(0);opacity:0}70%{transform:scaleY(1);opacity:.8}90%,100%{transform:scaleY(0);opacity:0}}
@keyframes wd-crown{0%,62%{transform:scale(0) translateY(0);opacity:0}72%{transform:scale(1) translateY(-8px);opacity:.9}90%,100%{transform:scale(1.2) translateY(-14px);opacity:0}}
.wd-drop{animation:wd-drop ${(2/c.speed).toFixed(2)}s ease-in infinite;transform-origin:40px 45px}
.wd-splash{animation:wd-splash ${(2/c.speed).toFixed(2)}s ease-out infinite;transform-origin:40px 50px}
.wd-ring{animation:wd-ring ${(2/c.speed).toFixed(2)}s ease-out infinite;transform-origin:40px 52px}
.wd-ring2{animation:wd-ring ${(2/c.speed).toFixed(2)}s ease-out .1s infinite;transform-origin:40px 52px}
.wd-pillar{animation:wd-pillar ${(2/c.speed).toFixed(2)}s ease-out infinite;transform-origin:40px 52px}
.wd-crown{animation:wd-crown ${(2/c.speed).toFixed(2)}s ease-out infinite;transform-origin:40px 52px}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80" style="overflow:visible">
<g class="wd-drop">
<path d="M40 20 Q44 30 44 36 Q44 44 40 46 Q36 44 36 36 Q36 30 40 20" fill="${c.color}" opacity=".9"/>
</g>
<ellipse class="wd-splash" cx="40" cy="52" rx="22" ry="5" fill="none" stroke="${c.thirdColor}" stroke-width="${c.thickness}" opacity=".8"/>
<ellipse class="wd-ring" cx="40" cy="52" rx="28" ry="7" fill="none" stroke="${c.color}" stroke-width="${c.thickness-.3}" opacity=".6"/>
<ellipse class="wd-ring2" cx="40" cy="52" rx="22" ry="5" fill="none" stroke="${c.secondColor}" stroke-width="${c.thickness-.5}" opacity=".5"/>
<ellipse cx="40" cy="52" rx="32" ry="4" fill="${c.color}" opacity=".08"/>
<g class="wd-pillar">
<rect x="38.5" y="38" width="3" height="14" rx="1.5" fill="${c.secondColor}" opacity=".7"/>
</g>
<g class="wd-crown">
${Array.from({length:8},(_,i)=>{const ang=(i/8)*Math.PI*2;const x=40+Math.cos(ang)*12;const y=52+Math.sin(ang)*3;return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.8" fill="${c.secondColor}" opacity=".8"/>`;}).join('')}
</g>
</svg>`
  })
},

/* 70 */ {
  id: 70, name: "Transformer Attention", tags: ["AI", "attention", "transformer", "ML"],
  controls: { speed: 1.0, size: 80, color: "#a78bfa", secondColor: "#f472b6", thirdColor: "#34d399", thickness: 1 },
  render: (c) => {
    const heads=4;
    const tokens=6;
    const headColors=[c.color,c.secondColor,c.thirdColor,"#fb923c"];
    let css='', svgContent='';
    for(let h=0;h<heads;h++){
      const cx=14+h*18;const cy=20;
      css+=`.att-h${h}{animation:att-head ${(1.5/c.speed).toFixed(2)}s ease-in-out ${(h*.2).toFixed(2)}s infinite;transform-origin:${cx}px ${cy}px}`;
      svgContent+=`<rect class="att-h${h}" x="${cx-7}" y="${cy-7}" width="14" height="14" rx="3" fill="${headColors[h]}" opacity=".7"/>`;
      svgContent+=`<text x="${cx}" y="${cy+3}" text-anchor="middle" font-size="6" font-family="monospace" fill="white" opacity=".9">H${h+1}</text>`;
      for(let t=0;t<tokens;t++){
        const tx=7+t*11;const ty=52;
        const weight=Math.abs(Math.sin(h*1.3+t*0.8));
        const id=`att-a${h}-${t}`;
        css+=`.${id}{animation:att-weight ${(2/c.speed).toFixed(2)}s ease-in-out ${(h*.15+t*.08).toFixed(2)}s infinite}`;
        svgContent+=`<line class="${id}" x1="${cx}" y1="${cy+7}" x2="${tx}" y2="${ty-6}" stroke="${headColors[h]}" stroke-width="${(weight*2).toFixed(1)}" opacity="${(weight*.6).toFixed(2)}"/>`;
      }
    }
    const toks=["I","am","a","model","so","cool"];
    for(let t=0;t<tokens;t++){
      const tx=7+t*11;const ty=52;
      css+=`.att-t${t}{animation:att-tok ${(1.2/c.speed).toFixed(2)}s ease-in-out ${(t*.1).toFixed(2)}s infinite;transform-origin:${tx}px ${ty}px}`;
      svgContent+=`<rect class="att-t${t}" x="${tx-5}" y="${ty-5}" width="10" height="10" rx="2" fill="${c.color}" opacity=".4"/>`;
      svgContent+=`<text x="${tx}" y="${ty+3}" text-anchor="middle" font-size="5" font-family="monospace" fill="${c.color}" opacity=".9">${toks[t]}</text>`;
    }
    return {
      css: `@keyframes att-head{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.15);opacity:1}}
@keyframes att-weight{0%,100%{opacity:.1}50%{opacity:.8}}
@keyframes att-tok{0%,100%{transform:scale(.9);opacity:.5}50%{transform:scale(1.1);opacity:1}}
${css}`,
      html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80">${svgContent}</svg>`
    };
  }
},

/* 71 */ {
  id: 71, name: "Firefly Swarm", tags: ["animal", "insect", "particles", "bioluminescent"],
  controls: { speed: 1.0, size: 80, color: "#a3e635", secondColor: "#facc15", thirdColor: "#86efac", thickness: 1 },
  render: (c) => {
    const flies=18;
    const seed=42;let s=seed;
    function rng(){s=(s*16807)%2147483647;return(s-1)/2147483646;}
    const data=Array.from({length:flies},()=>({
      x:8+rng()*64, y:8+rng()*64,
      dx:(rng()-.5)*20, dy:(rng()-.5)*20,
      delay:(rng()*2).toFixed(2),
      dur:((1+rng()*.8)/c.speed).toFixed(2),
      clr:[c.color,c.secondColor,c.thirdColor][Math.floor(rng()*3)]
    }));
    const css=data.map((d,i)=>`.ff-f${i}{animation:ff-float${i%3} ${d.dur}s ease-in-out ${d.delay}s infinite,ff-glow${i%4} ${((1+i*.1)/c.speed).toFixed(2)}s ease-in-out ${d.delay}s infinite;transform-origin:${d.x.toFixed(1)}px ${d.y.toFixed(1)}px}`).join('');
    const svg=data.map((d,i)=>`<circle class="ff-f${i}" cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="1.8" fill="${d.clr}"/>`).join('');
    return {
      css: `@keyframes ff-float0{0%,100%{transform:translate(0,0)}25%{transform:translate(5px,-7px)}50%{transform:translate(8px,2px)}75%{transform:translate(-3px,6px)}}
@keyframes ff-float1{0%,100%{transform:translate(0,0)}33%{transform:translate(-7px,5px)}66%{transform:translate(4px,-8px)}}
@keyframes ff-float2{0%,100%{transform:translate(0,0)}40%{transform:translate(6px,7px)}70%{transform:translate(-5px,-4px)}}
@keyframes ff-glow0{0%,100%{opacity:.1;r:1}50%{opacity:1;r:2.5}}
@keyframes ff-glow1{0%,100%{opacity:.2;r:1.2}50%{opacity:.9;r:2.2}}
@keyframes ff-glow2{0%,100%{opacity:.05;r:.8}50%{opacity:1;r:3}}
@keyframes ff-glow3{0%,100%{opacity:.15;r:1.5}50%{opacity:.8;r:2}}
${css}`,
      html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80">${svg}</svg>`
    };
  }
},

/* 72 */ {
  id: 72, name: "Bass Woofer", tags: ["sound", "bass", "speaker", "vibration"],
  controls: { speed: 1.0, size: 80, color: "#f97316", secondColor: "#fb923c", thirdColor: "#fbbf24", thickness: 1.5 },
  render: (c) => ({
    css: `@keyframes bw-cone{0%,100%{transform:scaleX(1) scaleY(1)}50%{transform:scaleX(1.06) scaleY(.94)}}
@keyframes bw-ring{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.2);opacity:0}}
@keyframes bw-coil{0%,100%{transform:translateX(0)}50%{transform:translateX(2px)}}
@keyframes bw-ripple{0%,100%{transform:scaleX(1)}50%{transform:scaleX(1.04)}}
.bw-cone{animation:bw-cone ${(.25/c.speed).toFixed(3)}s ease-in-out infinite;transform-origin:40px 40px}
.bw-coil{animation:bw-coil ${(.25/c.speed).toFixed(3)}s ease-in-out infinite}
${Array.from({length:4},(_,i)=>`.bw-ring${i}{animation:bw-ring ${(1.2/c.speed).toFixed(2)}s ease-out ${(i*.3).toFixed(2)}s infinite;transform-origin:40px 40px}`).join('')}
${Array.from({length:5},(_,i)=>`.bw-rip${i}{animation:bw-ripple ${(.25/c.speed).toFixed(3)}s ease-in-out ${(i*.05).toFixed(3)}s infinite;transform-origin:40px 40px}`).join('')}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80">
${Array.from({length:4},(_,i)=>`<circle class="bw-ring${i}" cx="40" cy="40" r="34" fill="none" stroke="${c.secondColor}" stroke-width="${c.thickness-.3}" opacity=".5"/>`).join('')}
<circle cx="40" cy="40" r="34" fill="none" stroke="${c.color}" stroke-width="${c.thickness}" opacity=".3"/>
<g class="bw-cone">
<circle cx="40" cy="40" r="30" fill="${c.color}" opacity=".12"/>
${Array.from({length:5},(_,i)=>`<circle class="bw-rip${i}" cx="40" cy="40" r="${28-i*5}" fill="none" stroke="${c.color}" stroke-width="${c.thickness-.2}" opacity="${(.25+i*.06).toFixed(2)}"/>`).join('')}
<circle cx="40" cy="40" r="10" fill="${c.secondColor}" opacity=".4"/>
<circle cx="40" cy="40" r="6" fill="${c.thirdColor}" opacity=".5"/>
</g>
<g class="bw-coil">
${Array.from({length:4},(_,i)=>`<circle cx="40" cy="40" r="${3+i*.8}" fill="none" stroke="${c.thirdColor}" stroke-width=".6" opacity="${.4-i*.05}"/>`).join('')}
</g>
<circle cx="40" cy="40" r="2.5" fill="${c.thirdColor}" opacity=".9"/>
</svg>`
  })
},

/* 73 */ {
  id: 73, name: "Underwater Caustics", tags: ["water", "caustics", "light", "refraction"],
  controls: { speed: 1.0, size: 80, color: "#0ea5e9", secondColor: "#38bdf8", thirdColor: "#7dd3fc", thickness: 1 },
  render: (c) => {
    const seed=7;let s=seed;function rng(){s=(s*16807)%2147483647;return(s-1)/2147483646;}
    const patches=12;
    const data=Array.from({length:patches},(_,i)=>({
      cx:10+rng()*60, cy:10+rng()*60,
      rx:5+rng()*10, ry:3+rng()*6,
      rot:rng()*360,
      dur:((1.5+rng())/c.speed).toFixed(2),
      delay:(rng()*1.5).toFixed(2),
      clr:[c.color,c.secondColor,c.thirdColor][i%3]
    }));
    const css=data.map((d,i)=>`.uc-p${i}{animation:uc-shimmer${i%3} ${d.dur}s ease-in-out ${d.delay}s infinite;transform-origin:${d.cx.toFixed(1)}px ${d.cy.toFixed(1)}px}`).join('');
    const svg=data.map((d,i)=>`<ellipse class="uc-p${i}" cx="${d.cx.toFixed(1)}" cy="${d.cy.toFixed(1)}" rx="${d.rx.toFixed(1)}" ry="${d.ry.toFixed(1)}" fill="${d.clr}" opacity=".12" transform="rotate(${d.rot.toFixed(0)},${d.cx.toFixed(1)},${d.cy.toFixed(1)})"/>`).join('');
    return {
      css: `@keyframes uc-shimmer0{0%,100%{transform:scale(1) rotate(0deg);opacity:.08}50%{transform:scale(1.3) rotate(15deg);opacity:.35}}
@keyframes uc-shimmer1{0%,100%{transform:scale(1.2) rotate(10deg);opacity:.2}50%{transform:scale(.8) rotate(-10deg);opacity:.08}}
@keyframes uc-shimmer2{0%,100%{transform:scale(.9) rotate(-5deg);opacity:.15}50%{transform:scale(1.4) rotate(20deg);opacity:.4}}
${css}`,
      html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80">
<rect x="0" y="0" width="80" height="80" fill="${c.color}" opacity=".05" rx="8"/>
${svg}
</svg>`
    };
  }
},

/* 74 */ {
  id: 74, name: "Wolf Howl", tags: ["animal", "wolf", "moon", "silhouette"],
  controls: { speed: 1.0, size: 80, color: "#e2e8f0", secondColor: "#94a3b8", thirdColor: "#818cf8", thickness: 1.2 },
  render: (c) => ({
    css: `@keyframes wh-moon{0%,100%{transform:scale(1);opacity:.8}50%{transform:scale(1.05);opacity:1}}
@keyframes wh-howl{0%,100%{transform:translateY(0) scaleX(1);opacity:.6}50%{transform:translateY(-4px) scaleX(1.15);opacity:.2}}
@keyframes wh-star{0%,100%{opacity:.2}50%{opacity:.9}}
@keyframes wh-ring{0%{transform:scale(.8);opacity:.6}100%{transform:scale(2.5);opacity:0}}
.wh-moon{animation:wh-moon ${(3/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:40px 28px}
${Array.from({length:4},(_,i)=>`.wh-s${i}{animation:wh-star ${((1+i*.3)/c.speed).toFixed(2)}s ease-in-out ${(i*.4).toFixed(2)}s infinite}`).join('')}
${Array.from({length:3},(_,i)=>`.wh-h${i}{animation:wh-howl ${((2+i*.3)/c.speed).toFixed(2)}s ease-in-out ${(i*.2).toFixed(2)}s infinite;transform-origin:40px 44px}`).join('')}
.wh-ring{animation:wh-ring ${(3/c.speed).toFixed(2)}s ease-out infinite;transform-origin:40px 28px}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80">
<rect x="0" y="0" width="80" height="80" fill="#0f172a" opacity=".6" rx="6"/>
<circle class="wh-ring" cx="40" cy="28" r="18" fill="none" stroke="${c.thirdColor}" stroke-width="1" opacity=".4"/>
<circle class="wh-moon" cx="40" cy="28" r="16" fill="${c.color}" opacity=".85"/>
<circle cx="46" cy="24" r="12" fill="#0f172a" opacity=".5"/>
<circle cx="12" cy="14" r="1.5" fill="white" class="wh-s0" opacity=".7"/>
<circle cx="68" cy="10" r="1" fill="white" class="wh-s1" opacity=".7"/>
<circle cx="22" cy="8" r="1.2" fill="white" class="wh-s2" opacity=".7"/>
<circle cx="58" cy="18" r="0.8" fill="white" class="wh-s3" opacity=".7"/>
${Array.from({length:3},(_,i)=>{const w=18-i*4;return `<path class="wh-h${i}" d="M${40-w} ${54-i*2} Q40 ${36-i*4} ${40+w} ${54-i*2}" fill="none" stroke="${c.secondColor}" stroke-width="${c.thickness-i*.2}" opacity="${.5-i*.1}" stroke-linecap="round"/>`}).join('')}
<path d="M28 62 Q32 44 36 38 Q38 34 40 32 Q42 34 44 38 Q48 44 52 62" fill="${c.secondColor}" opacity=".7"/>
<path d="M28 62 Q32 50 36 46 Q38 44 40 44 Q42 44 44 46 Q48 50 52 62 Z" fill="#0f172a" opacity=".4"/>
<polygon points="36,38 38,28 40,38" fill="${c.secondColor}" opacity=".8"/>
<polygon points="44,38 42,28 40,38" fill="${c.secondColor}" opacity=".8"/>
<rect x="0" y="62" width="80" height="18" fill="#1e293b" opacity=".6"/>
</svg>`
  })
},

/* 75 */ {
  id: 75, name: "Diffusion Denoising", tags: ["AI", "diffusion", "noise", "generative"],
  controls: { speed: 1.0, size: 80, color: "#a78bfa", secondColor: "#f472b6", thirdColor: "#34d399", thickness: 1 },
  render: (c) => {
    const seed=99;let s=seed;function rng(){s=(s*16807)%2147483647;return(s-1)/2147483646;}
    const dots=40;
    const data=Array.from({length:dots},()=>({
      x:8+rng()*64, y:8+rng()*64,
      tx:24+rng()*32, ty:24+rng()*32,
      clr:[c.color,c.secondColor,c.thirdColor][Math.floor(rng()*3)],
      delay:(rng()*1.5).toFixed(2),
      size:.8+rng()*2.5
    }));
    const css=data.map((d,i)=>`.dd-p${i}{animation:dd-denoise ${(3/c.speed).toFixed(2)}s ease-in-out ${d.delay}s infinite;transform-origin:${d.x.toFixed(1)}px ${d.y.toFixed(1)}px}`).join('');
    const svg=data.map((d,i)=>`<circle class="dd-p${i}" cx="${d.x.toFixed(1)}" cy="${d.y.toFixed(1)}" r="${d.size.toFixed(1)}" fill="${d.clr}" opacity=".8"/>`).join('');
    return {
      css: `@keyframes dd-denoise{0%{transform:translate(0,0) scale(1);opacity:.8}40%{transform:translate(calc(var(--tx,0px) - var(--x,0px)),calc(var(--ty,0px) - var(--y,0px))) scale(.5);opacity:.2}60%{transform:translate(calc(var(--tx,0px) - var(--x,0px)),calc(var(--ty,0px) - var(--y,0px))) scale(1);opacity:.9}100%{transform:translate(0,0) scale(1);opacity:.8}}
@keyframes dd-frame{0%,100%{opacity:.4}50%{opacity:.8}}
.dd-frame{animation:dd-frame ${(3/c.speed).toFixed(2)}s ease-in-out infinite}
${css}`,
      html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80">
<rect class="dd-frame" x="20" y="20" width="40" height="40" rx="4" fill="none" stroke="${c.color}" stroke-width="${c.thickness}" opacity=".4"/>
${svg}
</svg>`
    };
  }
},

/* 76 */ {
  id: 76, name: "Vinyl Record", tags: ["sound", "music", "record", "groove"],
  controls: { speed: 1.0, size: 80, color: "#1e293b", secondColor: "#f43f5e", thirdColor: "#fbbf24", thickness: 1 },
  render: (c) => ({
    css: `@keyframes vr-spin{to{transform:rotate(360deg)}}
@keyframes vr-needle{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(-2deg)}}
@keyframes vr-groove{0%,100%{opacity:.3}50%{opacity:.6}}
.vr-disc{animation:vr-spin ${(3/c.speed).toFixed(2)}s linear infinite;transform-origin:40px 42px}
.vr-needle{animation:vr-needle ${(0.5/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:62px 20px}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80">
<g class="vr-disc">
<circle cx="40" cy="42" r="32" fill="${c.color}"/>
${Array.from({length:10},(_,i)=>`<circle cx="40" cy="42" r="${8+i*2.4}" fill="none" stroke="#334155" stroke-width=".8" opacity="${.3+i*.04}"/>`).join('')}
<circle cx="40" cy="42" r="10" fill="#334155"/>
<circle cx="40" cy="42" r="7" fill="${c.secondColor}"/>
<circle cx="40" cy="42" r="4" fill="${c.color}"/>
<circle cx="40" cy="42" r="2" fill="${c.thirdColor}"/>
<circle cx="40" cy="42" r="1" fill="${c.color}"/>
${Array.from({length:4},(_,i)=>{const ang=i*90*Math.PI/180;return `<rect x="${(38.5+Math.cos(ang)*8).toFixed(1)}" y="${(40.5+Math.sin(ang)*8).toFixed(1)}" width="3" height="1.5" rx=".5" fill="${c.thirdColor}" opacity=".7" transform="rotate(${i*90},${(40+Math.cos(ang)*8).toFixed(1)},${(42+Math.sin(ang)*8).toFixed(1)})"/>`}).join('')}
</g>
<g class="vr-needle">
<line x1="62" y1="20" x2="46" y2="46" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="62" cy="20" r="4" fill="#64748b"/>
<circle cx="46" cy="46" r="2" fill="${c.thirdColor}" opacity=".9"/>
</g>
</svg>`
  })
},

/* 77 */ {
  id: 77, name: "Gradient Descent", tags: ["AI", "optimization", "loss", "ML"],
  controls: { speed: 1.0, size: 80, color: "#818cf8", secondColor: "#f43f5e", thirdColor: "#34d399", thickness: 1.5 },
  render: (c) => {
    const pts=Array.from({length:40},(_,i)=>{const x=i*2+2;const y=20+Math.pow((i-20)*.08,2)*18+Math.sin(i*.6)*3;return `${x},${Math.min(70,y.toFixed(1))}`;}).join(' ');
    const steps=8;
    const stepData=Array.from({length:steps},(_,i)=>{
      const t=i/steps;const xi=Math.floor(t*38);
      const x=xi*2+2;const y=20+Math.pow((xi-20)*.08,2)*18+Math.sin(xi*.6)*3;
      return {x,y:Math.min(70,y)};
    });
    const css=stepData.map((_,i)=>`.gd-p${i}{animation:gd-step ${(3/c.speed).toFixed(2)}s ease-in-out ${(i*.3/c.speed).toFixed(2)}s infinite;transform-origin:${stepData[i].x.toFixed(1)}px ${stepData[i].y.toFixed(1)}px}`).join('');
    return {
      css: `@keyframes gd-step{0%,100%{transform:scale(1);opacity:.3}50%{transform:scale(1.8);opacity:1}}
@keyframes gd-ball{0%{transform:translate(0,0)}100%{transform:translate(${(stepData[steps-1].x-stepData[0].x).toFixed(1)}px,${(stepData[steps-1].y-stepData[0].y).toFixed(1)}px)}}
@keyframes gd-trail{0%,100%{stroke-dashoffset:200}50%{stroke-dashoffset:0}}
.gd-trail{animation:gd-trail ${(3/c.speed).toFixed(2)}s ease-in-out infinite;stroke-dasharray:8 4}
.gd-ball{animation:gd-ball ${(3/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:${stepData[0].x.toFixed(1)}px ${stepData[0].y.toFixed(1)}px}
${css}`,
      html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80">
<polyline points="${pts}" fill="none" stroke="${c.color}" stroke-width="${c.thickness}" opacity=".6"/>
<polyline points="${stepData.map(p=>`${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')}" fill="none" stroke="${c.secondColor}" stroke-width="${c.thickness-.3}" class="gd-trail" opacity=".7"/>
${stepData.map((p,i)=>`<circle class="gd-p${i}" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="2" fill="${c.thirdColor}" opacity=".5"/>`).join('')}
<g class="gd-ball"><circle cx="${stepData[0].x.toFixed(1)}" cy="${stepData[0].y.toFixed(1)}" r="4" fill="${c.secondColor}" opacity=".95"/></g>
<circle cx="${stepData[steps-1].x.toFixed(1)}" cy="${stepData[steps-1].y.toFixed(1)}" r="4" fill="${c.thirdColor}" opacity=".6"/>
</svg>`
    };
  }
},

/* 78 */ {
  id: 78, name: "Shark Fin", tags: ["animal", "shark", "ocean", "predator"],
  controls: { speed: 1.0, size: 80, color: "#64748b", secondColor: "#0ea5e9", thirdColor: "#94a3b8", thickness: 1.5 },
  render: (c) => ({
    css: `@keyframes sf-fin{0%,100%{transform:translateX(-30px)}50%{transform:translateX(30px)}}
@keyframes sf-wake{0%{transform:scaleX(0);opacity:.8}100%{transform:scaleX(1);opacity:0}}
@keyframes sf-wave{0%{transform:translateX(0)}100%{transform:translateX(-80px)}}
@keyframes sf-depth{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.1)}}
.sf-fin{animation:sf-fin ${(3/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:40px 46px}
.sf-wave1{animation:sf-wave ${(2/c.speed).toFixed(2)}s linear infinite}
.sf-wave2{animation:sf-wave ${(2.5/c.speed).toFixed(2)}s linear infinite .4s}
.sf-depth{animation:sf-depth ${(3/c.speed).toFixed(2)}s ease-in-out infinite;transform-origin:40px 60px}`,
    html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80" style="overflow:hidden">
<rect x="0" y="48" width="80" height="32" fill="${c.secondColor}" opacity=".15"/>
<g class="sf-wave1">
  <path d="M0 50 Q10 44 20 50 Q30 56 40 50 Q50 44 60 50 Q70 56 80 50 Q90 44 100 50 Q110 56 120 50 Q130 44 140 50 Q150 56 160 50 V80 H0 Z" fill="${c.secondColor}" opacity=".2"/>
</g>
<g class="sf-wave2">
  <path d="M0 54 Q12 48 24 54 Q36 60 48 54 Q60 48 72 54 Q84 60 96 54 Q108 48 120 54 Q132 60 144 54 V80 H0 Z" fill="${c.secondColor}" opacity=".25"/>
</g>
<g class="sf-fin">
<path d="M36 46 Q38 28 40 20 Q42 28 50 46 Z" fill="${c.color}" opacity=".9"/>
<path d="M36 46 Q38 36 40 32 Q41 36 44 46 Z" fill="${c.thirdColor}" opacity=".4"/>
<g class="sf-depth">
<ellipse cx="40" cy="62" rx="22" ry="8" fill="${c.color}" opacity=".2"/>
<ellipse cx="40" cy="62" rx="14" ry="5" fill="${c.color}" opacity=".15"/>
</g>
${Array.from({length:3},(_,i)=>`<path d="M${34+i*2} 46 Q${34+i*3} ${50+i*2} ${42+i*2} 46" fill="none" stroke="${c.secondColor}" stroke-width=".8" opacity="${.4+i*.1}" style="animation:sf-wake ${(.8/c.speed).toFixed(2)}s ease-out ${(i*.15).toFixed(2)}s infinite;transform-origin:${36+i*2}px 46px"/>`).join('')}
</g>
</svg>`
  })
},

/* 79 */ {
  id: 79, name: "Voice Waveform", tags: ["sound", "voice", "waveform", "speech"],
  controls: { speed: 1.0, size: 80, color: "#06b6d4", secondColor: "#818cf8", thirdColor: "#34d399", thickness: 2.5 },
  render: (c) => {
    const bars=28;
    const envelope=[.2,.3,.5,.7,.9,.8,1,.9,.7,.85,.6,.95,.8,.7,.9,.8,.6,.85,.7,.5,.8,.6,.4,.7,.5,.3,.4,.2];
    return {
      css: `@keyframes vw-bar{0%,100%{transform:scaleY(.08)}50%{transform:scaleY(1)}}
${Array.from({length:bars},(_,i)=>{
  const env=envelope[i]||.5;
  const dur=((0.3+Math.abs(Math.sin(i*.7))*.5)/c.speed).toFixed(2);
  const delay=(i*.04).toFixed(2);
  return `.vw-b${i}{animation:vw-bar ${dur}s ease-in-out ${delay}s infinite;transform-origin:${9+i*2.3}px 40px;max-height:${(env*30).toFixed(0)}px}`;
}).join('')}`,
      html: `<svg width="${c.size}" height="${c.size}" viewBox="0 0 80 80">
${Array.from({length:bars},(_,i)=>{
  const env=envelope[i]||.5;
  const h=env*30;
  const x=9+i*2.3;
  const progress=i/bars;
  const clr=progress<.33?c.color:progress<.66?c.secondColor:c.thirdColor;
  return `<rect class="vw-b${i}" x="${(x-c.thickness/2+.3).toFixed(1)}" y="${(40-h/2).toFixed(1)}" width="${(c.thickness-.8).toFixed(1)}" height="${h.toFixed(1)}" rx="${(c.thickness/2-.2).toFixed(1)}" fill="${clr}" opacity=".85"/>`;
}).join('')}
<line x1="6" y1="40" x2="74" y2="40" stroke="#64748b" stroke-width=".4" opacity=".2"/>
</svg>`
    };
  }
},

];

const DOWNLOAD_LANGS = [
  {id:"html",label:"HTML"},
  {id:"css",label:"CSS Only"},
  {id:"react",label:"React JSX"},
  {id:"vue",label:"Vue SFC"},
  {id:"svelte",label:"Svelte"},
];

const BG_MODES = [
  {id:"dark",label:"Dark"},
  {id:"light",label:"Light"},
  {id:"blur",label:"Blur"},
];

function generateCode(loader, controls, lang) {
  const {css, html} = loader.render(controls);
  if (lang==="html") return `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${loader.name} Loader</title>\n<style>\n  * { box-sizing: border-box; margin: 0; padding: 0; }\n  body { display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #0a0f1e; }\n${css.split('\n').map(l=>'  '+l).join('\n')}\n</style>\n</head>\n<body>\n  ${html}\n</body>\n</html>`;
  if (lang==="css") return `/* ${loader.name} — LoaderVault */\n\n/* CSS Animations */\n${css}\n\n/* HTML Structure:\n${html}\n*/`;
  if (lang==="react") return `/* ${loader.name} — React Component */\nimport React from 'react';\n\nconst css = \`\n${css}\n\`;\n\nexport default function ${loader.name.replace(/\s+/g,'')}() {\n  return (\n    <>\n      <style>{css}</style>\n      <div dangerouslySetInnerHTML={{__html:\`${html.replace(/`/g,"\\`")}\`}} />\n    </>\n  );\n}`;
  if (lang==="vue") return `<!-- ${loader.name} — Vue Component -->\n<template>\n  <div v-html="html" />\n</template>\n\n<script setup>\nconst html = \`${html.replace(/`/g,"\\`")}\`;\n</script>\n\n<style scoped>\n${css}\n</style>`;
  if (lang==="svelte") return `<!-- ${loader.name} — Svelte Component -->\n<style>\n${css}\n</style>\n\n{@html \`${html.replace(/`/g,"\\`")}\`}`;
  return "";
}

function downloadCode(loader, controls, lang) {
  const code = generateCode(loader, controls, lang);
  const ext = lang==="react"?"jsx":lang==="vue"?"vue":lang==="svelte"?"svelte":lang==="css"?"css":"html";
  const blob = new Blob([code],{type:"text/plain"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${loader.name.toLowerCase().replace(/\s+/g,"-")}.${ext}`;
  a.click();
}

/* ── Smooth Slider Component ── */
function Slider({label, value, min, max, step, onChange}) {
  const pct = ((value-min)/(max-min)*100).toFixed(1);
  const fmt = step<0.1 ? value.toFixed(2) : step<1 ? value.toFixed(1) : Math.round(value);
  return (
    <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"}}>
      <span style={{fontSize:"11px",fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:"var(--muted)",minWidth:88,flexShrink:0}}>{label}</span>
      <div style={{flex:1,position:"relative",height:20,display:"flex",alignItems:"center"}}>
        <div style={{position:"absolute",inset:"6px 0",background:"var(--slider-track)",borderRadius:99,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${pct}%`,background:"var(--accent)",borderRadius:99,transition:"width .05s"}}/>
        </div>
        <input type="range" min={min} max={max} step={step} value={value}
          onChange={e=>onChange(parseFloat(e.target.value))}
          style={{position:"absolute",inset:0,width:"100%",opacity:0,cursor:"pointer",height:"100%"}}/>
      </div>
      <span style={{fontSize:"12px",fontFamily:"monospace",color:"var(--text-secondary)",minWidth:36,textAlign:"right"}}>{fmt}</span>
    </div>
  );
}

/* ── Color Picker ── */
function ColorPick({label, value, onChange}) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"}}>
      <span style={{fontSize:"11px",fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:"var(--muted)",minWidth:88,flexShrink:0}}>{label}</span>
      <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
        <div style={{position:"relative",width:30,height:24,borderRadius:6,overflow:"hidden",border:"1px solid rgba(255,255,255,.12)",flexShrink:0}}>
          <div style={{position:"absolute",inset:0,background:value}}/>
          <input type="color" value={value} onChange={e=>onChange(e.target.value)}
            style={{position:"absolute",inset:"-4px",width:"calc(100% + 8px)",height:"calc(100% + 8px)",opacity:0,cursor:"pointer"}}/>
        </div>
        <span style={{fontSize:"11px",fontFamily:"monospace",color:"var(--text-secondary)"}}>{value.toUpperCase()}</span>
      </div>
    </div>
  );
}

/* ── Controls Panel ── */
function Controls({loader, controls, setControls}) {
  const def = loader.controls;
  const reset = () => setControls({...def});
  return (
    <div>
      {Object.entries(def).map(([k,dv])=>{
        const v = controls[k];
        const label = k.replace(/([A-Z])/g,' $1').trim();
        if (typeof dv === "string" && (k.includes("olor") || k.includes("colour"))) {
          return <ColorPick key={k} label={label} value={v} onChange={nv=>setControls(p=>({...p,[k]:nv}))}/>;
        }
        if (typeof dv === "number") {
          const cfg = {
            speed:{min:0.1,max:4,step:0.05},
            size:{min:24,max:120,step:0.5},
            width:{min:40,max:200,step:1},
            height:{min:8,max:60,step:0.5},
            thickness:{min:0.5,max:12,step:0.1},
            amplitude:{min:2,max:30,step:0.5},
            bounceHeight:{min:10,max:100,step:0.5},
            squish:{min:0.3,max:0.9,step:0.01},
            barWidth:{min:2,max:20,step:0.5},
            maxHeight:{min:16,max:80,step:0.5},
            dotSize:{min:4,max:24,step:0.5},
            fillLevel:{min:5,max:95,step:0.5},
            gap:{min:2,max:24,step:0.5},
            fontSize:{min:10,max:36,step:0.5},
            radius:{min:10,max:70,step:0.5},
            nodeSize:{min:2,max:14,step:0.25},
            lineOpacity:{min:0.05,max:1,step:0.01},
            glowSize:{min:0,max:30,step:0.5},
            particleSize:{min:1,max:8,step:0.25},
            contrast:{min:0.1,max:1,step:0.01},
            opacity:{min:0.1,max:1,step:0.01},
            rings:{min:2,max:8,step:1},
            electronSize:{min:3,max:16,step:0.5},
            blipCount:{min:1,max:8,step:1},
            particleCount:{min:4,max:20,step:1},
            petalCount:{min:3,max:12,step:1},
            dotCount:{min:4,max:14,step:1},
            tailCount:{min:3,max:12,step:1},
            barCount:{min:3,max:12,step:1},
            ringCount:{min:2,max:8,step:1},
            cols:{min:2,max:6,step:1},
            layers:{min:1,max:5,step:1},
            cellSize:{min:6,max:28,step:0.5},
          }[k] || {min:1,max:100,step:0.5};
          return <Slider key={k} label={label} value={v} min={cfg.min} max={cfg.max} step={cfg.step} onChange={nv=>setControls(p=>({...p,[k]:nv}))}/>;
        }
        if (typeof dv === "string" && k==="text") {
          return (
            <div key={k} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <span style={{fontSize:"11px",fontWeight:600,letterSpacing:"0.07em",textTransform:"uppercase",color:"var(--muted)",minWidth:88,flexShrink:0}}>Text</span>
              <input type="text" value={v} maxLength={24} onChange={e=>setControls(p=>({...p,[k]:e.target.value}))}
                style={{flex:1,background:"var(--input-bg)",border:"1px solid var(--border)",borderRadius:8,padding:"5px 10px",fontSize:13,color:"var(--text)",fontFamily:"inherit",outline:"none"}}/>
            </div>
          );
        }
        return null;
      })}
      <button onClick={reset} style={{width:"100%",marginTop:4,padding:"7px",borderRadius:8,border:"1px dashed var(--border)",background:"transparent",color:"var(--muted)",fontSize:12,cursor:"pointer",fontFamily:"inherit",transition:"all .2s"}}>↺ Reset to Default</button>
    </div>
  );
}

/* ── Loader Card Preview ── */
function CardLoader({loader}) {
  const {css,html} = loader.render(loader.controls);
  const uid = `cl${loader.id}`;
  const scoped = css.replace(/\.([\w-]+)\s*\{/g,(m,cls)=>`.${uid} .${cls}{`);
  return <>
    <style dangerouslySetInnerHTML={{__html:scoped}}/>
    <div className={uid} dangerouslySetInnerHTML={{__html:html}}/>
  </>;
}

/* ── Modal Loader Preview (live controls) ── */
function ModalLoader({loader, controls}) {
  const {css,html} = loader.render(controls);
  const uid = `ml${loader.id}`;
  const scoped = css.replace(/\.([\w-]+)\s*\{/g,(m,cls)=>`.${uid} .${cls}{`);
  return <>
    <style dangerouslySetInnerHTML={{__html:scoped}}/>
    <div className={uid} dangerouslySetInnerHTML={{__html:html}}/>
  </>;
}

/* ═══════════════════════════ APP ═══════════════════════════ */
export default function App() {
  const [theme, setTheme] = useState("dark");
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState(null);
  const [selected, setSelected] = useState(null);
  const [controls, setControls] = useState({});
  const [lang, setLang] = useState("html");
  const [bgMode, setBgMode] = useState("dark");
  const [blurAmount, setBlurAmount] = useState(12);
  const [bgImage] = useState("https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=60");
  const [copied, setCopied] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const overlayRef = useRef();
  const [searchedTags, setSearchedTags] = useState([]);
  const [showAllTags, setShowAllTags] = useState(false);

  const dark = theme === "dark";

  useEffect(()=>{setTimeout(()=>setHeaderVisible(true),100);},[]);
  useEffect(()=>{
    const fn = e => e.key==="Escape" && setSelected(null);
    window.addEventListener("keydown",fn);
    return ()=>window.removeEventListener("keydown",fn);
  },[]);

  const allTags = useMemo(()=>[...new Set(LOADERS.flatMap(l=>l.tags))],[]);
  const filtered = useMemo(()=>LOADERS.filter(l=>{
    const q=search.toLowerCase();
    return (!q||l.name.toLowerCase().includes(q)||l.tags.some(t=>t.includes(q))) && (!activeTag||l.tags.includes(activeTag));
  }),[search,activeTag]);

  const openLoader = l => { setSelected(l); setControls({...l.controls}); setLang("html"); setBgMode("dark"); };

  const handleCopy = ()=>{
    if(!selected) return;
    const {css,html}=selected.render(controls);
    navigator.clipboard.writeText(`<style>\n${css}\n</style>\n${html}`);
    setCopied(true); setTimeout(()=>setCopied(false),2000);
  };

  const previewStyle = bgMode==="dark" ? {background:"#06091a"}
    : bgMode==="light" ? {background:"#f0f4ff"}
    : {
        backgroundImage:`url(${bgImage})`,
        backgroundSize:"cover",backgroundPosition:"center",
        position:"relative"
      };

  const CSS_VARS = `
    :root {
      --bg: ${dark?"#07091a":"#f4f6ff"};
      --surface: ${dark?"#0d1025":"#ffffff"};
      --card: ${dark?"#101328":"#ffffff"};
      --card-hover: ${dark?"#161b38":"#f0f3ff"};
      --border: ${dark?"rgba(100,110,200,.12)":"rgba(80,90,200,.1)"};
      --border-h: ${dark?"rgba(130,140,255,.35)":"rgba(100,120,255,.35)"};
      --text: ${dark?"#e8eaff":"#0e1030"};
      --text-secondary: ${dark?"#9098cc":"#4a4f7a"};
      --muted: ${dark?"#5a6090":"#7880b0"};
      --accent: #6366f1;
      --accent2: #a78bfa;
      --accent3: #f472b6;
      --glow: ${dark?"rgba(99,102,241,.25)":"rgba(99,102,241,.15)"};
      --input-bg: ${dark?"rgba(255,255,255,.04)":"rgba(0,0,0,.03)"};
      --slider-track: ${dark?"rgba(255,255,255,.08)":"rgba(0,0,0,.08)"};
      --tag-bg: ${dark?"rgba(99,102,241,.1)":"rgba(99,102,241,.08)"};
      --tag-text: ${dark?"#a5b4fc":"#5254c8"};
      --preview-bg: ${dark?"#07091a":"#f0f4ff"};
      --modal-bg: ${dark?"#0c0e25":"#ffffff"};
      --overlay: ${dark?"rgba(0,0,0,.88)":"rgba(0,0,0,.65)"};
    }
  `;

  return (
    <>
      <style>{CSS_VARS}{`
      @import url('https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&family=Ballet:opsz@16..72&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Unicase:wght@500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{font-family:'UnifrakturCook',cursive;background:var(--bg);color:var(--text);min-height:100vh;transition:background .4s,color .4s;overflow-x:hidden}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}

        /* Range input override */
        input[type=range]{-webkit-appearance:none;appearance:none;background:transparent;width:100%;cursor:pointer}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:14px;height:14px;border-radius:50%;background:var(--accent);border:2px solid #fff;box-shadow:0 0 0 2px var(--accent);transition:transform .15s}
        input[type=range]::-webkit-slider-thumb:hover{transform:scale(1.25)}

        /* Layout */
        .app{max-width:1380px;margin:0 auto;padding:0 24px 80px}

        /* Header */
        .hdr{padding:32px 0 0;display:flex;align-items:flex-start;justify-content:space-between;gap:20px;flex-wrap:wrap}
        .hdr-left{opacity:0;transform:translateY(-24px);transition:opacity .9s cubic-bezier(.22,1,.36,1),transform .9s cubic-bezier(.22,1,.36,1)}
        .hdr-left.visible{opacity:1;transform:none}
.hdr{
  padding:42px 0 10px;
  display:flex;
  justify-content:center;
  align-items:center;
  text-align:center;
}

.hdr-left{
  opacity:0;
  transform:translateY(20px) scale(.96);
  transition:
    opacity 1.2s ease,
    transform 1.2s cubic-bezier(.22,1,.36,1);
}

.hdr-left.visible{
  opacity:1;
  transform:none;
}

.site-name{
  font-family:'UnifrakturCook',cursive;
  font-size:clamp(42px,7vw,82px);
  font-weight:700;
  line-height:1;
  letter-spacing:.05em;

  background:
    linear-gradient(
      120deg,
      #eef2ff 0%,
      #d8b4fe 30%,
      #f9a8d4 60%,
      #a5b4fc 100%
    );

  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  background-clip:text;

  filter:
    drop-shadow(0 0 10px rgba(255,255,255,.08))
    drop-shadow(0 0 24px rgba(168,85,247,.18));

  position:relative;

  animation:
    chalkReveal 2.4s ease forwards,
    chalkFloat 6s ease-in-out infinite;
}

/* Chalk texture overlay */
.site-name::after{
  content:"LoaderVault";
  position:absolute;
  inset:0;

  font-family:'UnifrakturCook',cursive;
  color:rgba(255,255,255,.08);

  mix-blend-mode:overlay;

  filter:blur(.4px);

  animation:chalkDust 4s linear infinite;

  pointer-events:none;
}

.site-sub{
  font-family:'Ballet',cursive;
  font-size:clamp(20px,3vw,34px);
  margin-top:14px;

  color:#d8c4ff;

  opacity:.88;
  letter-spacing:.03em;

  text-shadow:
    0 0 12px rgba(216,180,254,.18);

  animation:
    fadeGlow 4s ease-in-out infinite;
}

/* Floating movement */
@keyframes chalkFloat{
  0%,100%{
    transform:translateY(0px);
  }
  50%{
    transform:translateY(-5px);
  }
}

/* Chalk reveal effect */
@keyframes chalkReveal{
  0%{
    opacity:0;
    filter:blur(8px);
    letter-spacing:.25em;
  }

  100%{
    opacity:1;
    filter:
      drop-shadow(0 0 10px rgba(255,255,255,.08))
      drop-shadow(0 0 24px rgba(168,85,247,.18));
    letter-spacing:.05em;
  }
}

/* Dust shimmer */
@keyframes chalkDust{
  0%{
    opacity:.05;
    transform:translateX(0px);
  }
  50%{
    opacity:.12;
    transform:translateX(1px);
  }
  100%{
    opacity:.05;
    transform:translateX(0px);
  }
}

@keyframes fadeGlow{
  0%,100%{
    opacity:.75;
    text-shadow:0 0 10px rgba(216,180,254,.12);
  }

  50%{
    opacity:1;
    text-shadow:
      0 0 18px rgba(216,180,254,.22),
      0 0 32px rgba(168,85,247,.12);
  }
}
        .hdr-right{display:flex;align-items:center;gap:10px;opacity:0;transform:translateY(-16px);transition:opacity .8s .2s cubic-bezier(.22,1,.36,1),transform .8s .2s cubic-bezier(.22,1,.36,1)}
        .hdr-right.visible{opacity:1;transform:none}
        .pill-btn{font-family:'UnifrakturCook',cursive;font-size:12px;font-weight:500;padding:8px 18px;border-radius:100px;border:1px solid var(--border);background:var(--card);color:var(--text-secondary);cursor:pointer;transition:all .25s;letter-spacing:.02em;white-space:nowrap}
        .pill-btn:hover{border-color:var(--border-h);color:var(--text);box-shadow:0 0 0 3px var(--glow)}

        /* Search */
        .search-area{margin:32px 0 0;position:relative}
        .search-wrap{position:relative}
        .search-icon{position:absolute;left:20px;top:50%;transform:translateY(-50%);color:var(--muted);font-size:16px;pointer-events:none}
        .search-in{width:100%;padding:15px 48px 15px 50px;font-size:15px;font-family:'UnifrakturCook',cursive;border-radius:16px;border:1px solid var(--border);background:var(--card);color:var(--text);outline:none;transition:border .25s,box-shadow .25s,background .25s}
        .search-in::placeholder{color:var(--muted)}
        .search-in:focus{border-color:var(--border-h);box-shadow:0 0 0 4px var(--glow),0 8px 40px rgba(99,102,241,.08)}
        .search-count{position:absolute;right:18px;top:50%;transform:translateY(-50%);font-size:11px;color:var(--muted);font-family:'JetBrains Mono',monospace;pointer-events:none}

        /* Tags */
        .tags-row{display:flex;gap:7px;margin:14px 0 0;flex-wrap:wrap;align-items:center}
        .tag-pill{padding:4px 12px;border-radius:100px;font-size:11px;font-weight:500;border:1px solid var(--border);background:transparent;color:var(--muted);cursor:pointer;transition:all .2s;font-family:'UnifrakturCook',cursive;letter-spacing:.03em}
        .tag-pill:hover,.tag-pill.on{background:var(--tag-bg);color:var(--tag-text);border-color:rgba(99,102,241,.4)}
        .tag-pill.on{font-weight:600}

        /* Divider */
        .divider{height:1px;background:var(--border);margin:22px 0 0}

        /* Stats */
        .stats-row{display:flex;gap:28px;margin:16px 0 20px;flex-wrap:wrap}
        .stat{font-size:12px;color:var(--muted);font-family:'JetBrains Mono',monospace}
        .stat b{color:var(--text);font-weight:600}

        /* Grid */
        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:18px}
        @media(max-width:600px){.grid{grid-template-columns:repeat(2,1fr);gap:12px}}
        @media(max-width:380px){.grid{grid-template-columns:1fr 1fr;gap:10px}}

        /* Card */
        .card{background:var(--card);border:1px solid var(--border);border-radius:22px;cursor:pointer;overflow:hidden;transition:transform .4s cubic-bezier(.34,1.56,.64,1),border-color .3s,box-shadow .4s;animation:card-in .5s ease both}
        .card:hover{transform:translateY(-7px) scale(1.025);border-color:var(--border-h);box-shadow:0 20px 60px rgba(99,102,241,.18),0 4px 20px rgba(0,0,0,.15)}
        @keyframes card-in{from{opacity:0;transform:translateY(22px) scale(.95)}to{opacity:1;transform:none}}
        .card-nth-1{animation-delay:.02s}.card-nth-2{animation-delay:.05s}.card-nth-3{animation-delay:.08s}.card-nth-4{animation-delay:.11s}.card-nth-5{animation-delay:.14s}.card-nth-6{animation-delay:.17s}.card-nth-7{animation-delay:.2s}.card-nth-n{animation-delay:.23s}
        .card-preview{height:160px;display:flex;align-items:center;justify-content:center;background:var(--preview-bg);position:relative;overflow:hidden;transition:background .3s}
        .card-preview::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at center,var(--glow) 0%,transparent 72%);opacity:0;transition:opacity .35s}
        .card:hover .card-preview::after{opacity:1}
        .card-body{padding:14px 17px 17px}
        .card-name{font-family:'UnifrakturCook',cursive;font-size:17px;font-weight:600;color:var(--text);margin-bottom:7px;letter-spacing:.01em}
        .card-tags{display:flex;gap:5px;flex-wrap:wrap}
        .card-tag{font-size:10px;padding:2px 8px;border-radius:100px;background:var(--tag-bg);color:var(--tag-text);font-weight:500;letter-spacing:.03em}

        /* Empty */
        .empty{text-align:center;padding:80px 20px;color:var(--muted);grid-column:1/-1}
        .empty-icon{font-size:40px;margin-bottom:14px;opacity:.25}

        /* Overlay */
        .overlay{position:fixed;inset:0;z-index:1000;background:var(--overlay);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);display:flex;align-items:center;justify-content:center;padding:16px;animation:ov-in .2s ease}
        @keyframes ov-in{from{opacity:0}to{opacity:1}}

        /* Modal */
        .modal{background:var(--modal-bg);border:1px solid var(--border);border-radius:28px;width:100%;max-width:920px;max-height:90vh;overflow-y:auto;animation:m-in .38s cubic-bezier(.34,1.56,.64,1);position:relative}
        @keyframes m-in{from{opacity:0;transform:scale(.88) translateY(32px)}to{opacity:1;transform:none}}
        .m-hdr{display:flex;align-items:flex-start;justify-content:space-between;padding:26px 28px 0;gap:12px;flex-wrap:wrap}
        .m-title{font-family:'UnifrakturCook',cursive;font-size:clamp(18px,3vw,26px);font-weight:600;letter-spacing:.04em;color:var(--text)}
        .m-subtitle{font-family:'UnifrakturCook',cursive;font-style:italic;font-size:14px;color:var(--muted);margin-top:3px}
        .m-close{width:34px;height:34px;border-radius:50%;border:1px solid var(--border);background:var(--input-bg);color:var(--muted);font-size:16px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .m-close:hover{border-color:#ef4444;color:#ef4444}
        .m-body{display:grid;grid-template-columns:1fr 1fr;gap:22px;padding:22px 28px 28px}
        @media(max-width:640px){.m-body{grid-template-columns:1fr}.modal{border-radius:20px}.m-hdr{padding:18px 18px 0}.m-body{padding:16px 18px 22px}}

        /* Preview panel */
        .preview-panel{border-radius:18px;min-height:200px;display:flex;align-items:center;justify-content:center;transition:all .4s;overflow:hidden;position:relative}
        .preview-inner{transform:scale(1.4)}
        .blur-overlay{position:absolute;inset:0;backdrop-filter:blur(var(--blur-amt,0px));-webkit-backdrop-filter:blur(var(--blur-amt,0px));z-index:0;pointer-events:none}
        .preview-content{position:relative;z-index:1}

        /* BG controls */
        .bg-ctrl{margin-top:10px;display:flex;flex-direction:column;gap:8px}
        .bg-tabs{display:flex;gap:6px}
        .bg-tab{flex:1;padding:6px;border-radius:9px;font-size:11px;font-weight:500;border:1px solid var(--border);background:transparent;color:var(--muted);cursor:pointer;transition:all .2s;font-family:'UnifrakturCook',cursive;letter-spacing:.03em}
        .bg-tab.on{background:var(--tag-bg);color:var(--tag-text);border-color:rgba(99,102,241,.4);font-weight:600}

        /* Controls section */
        .ctrl-section{background:var(--input-bg);border:1px solid var(--border);border-radius:16px;padding:16px 18px}
        .ctrl-section+.ctrl-section{margin-top:12px}
        .ctrl-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-bottom:13px;font-family:'UnifrakturCook',cursive}

        /* Lang tabs */
        .lang-tabs{display:flex;gap:5px;flex-wrap:wrap}
        .lang-tab{padding:5px 11px;border-radius:8px;font-size:11px;font-weight:600;border:1px solid var(--border);background:transparent;color:var(--muted);cursor:pointer;transition:all .2s;font-family:'UnifrakturCook',cursive;letter-spacing:.03em}
        .lang-tab.on{background:var(--accent);color:#fff;border-color:var(--accent)}

        /* Action row */
        .action-row{display:flex;gap:9px;margin-top:12px;flex-wrap:wrap}
        .btn-dl{flex:1;min-width:80px;padding:11px 14px;border-radius:13px;font-size:13px;font-weight:600;font-family:'UnifrakturCook',cursive;cursor:pointer;transition:all .25s;display:flex;align-items:center;justify-content:center;gap:6px;letter-spacing:.02em}
        .btn-dl-primary{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;border:none}
        .btn-dl-primary:hover{transform:scale(1.03);box-shadow:0 10px 30px var(--glow)}
        .btn-dl-sec{background:var(--input-bg);border:1px solid var(--border);color:var(--text-secondary)}
        .btn-dl-sec:hover{border-color:var(--border-h);color:var(--text)}

        .tags-wrap{
  margin-top:14px;
}

.tag-expand{
  padding:4px 12px;
  border-radius:100px;
  font-size:11px;
  font-weight:600;
  border:1px dashed var(--border-h);
  background:transparent;
  color:var(--accent2);
  cursor:pointer;
  transition:all .22s ease;
  font-family:'UnifrakturCook',cursive;
  letter-spacing:.03em;
}

.tag-expand:hover{
  background:var(--tag-bg);
  border-color:var(--accent2);
  transform:translateY(-1px);
}

.mini-footer{
  position:fixed;
  bottom:0;
  left:0;

  width:100%;

  padding:6px 12px;

  display:flex;
  align-items:center;
  justify-content:center;

  font-size:10px;
  letter-spacing:.12em;
  font-family:'JetBrains Mono',monospace;

  color:rgba(255,255,255,.45);

  background:rgba(10,12,25,.55);
  border-top:1px solid rgba(255,255,255,.06);

  backdrop-filter:blur(12px);
  -webkit-backdrop-filter:blur(12px);

  z-index:9999;

  pointer-events:none;
}

        /* Footer */
        .footer{text-align:center;padding:40px 0 20px;border-top:1px solid var(--border);margin-top:70px}
        .footer-name{font-family:'UnifrakturCook',cursive;font-size:16px;font-weight:600;background:linear-gradient(90deg,#a5b4fc,#f472b6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:.08em}
        .footer-sub{font-family:'UnifrakturCook',cursive;font-style:italic;font-size:14px;color:var(--muted);margin-top:6px}
      `}</style>

      <div className="app">
        {/* Header */}
        <header className="hdr">
  <div className={`hdr-left centered${headerVisible ? " visible" : ""}`}>
    <div className="site-name">LoaderVault</div>
    <div className="site-sub">
      A curated collection of fine CSS animations
    </div>
  </div>
</header>

        {/* Search */}
        <div className="search-area">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input className="search-in" type="text" placeholder="Search loaders by name or tag — try 'orbit', 'wave', '3d'…"
              value={search} onChange={e=>setSearch(e.target.value)}/>
            <span className="search-count">{filtered.length}/{LOADERS.length}</span>
          </div>
          <div className="tags-wrap">
  <div className="tags-row">
    <button
      className={`tag-pill${!activeTag ? " on" : ""}`}
      onClick={() => setActiveTag(null)}
    >
      All
    </button>

    {(showAllTags ? allTags : allTags.slice(0, 8)).map((t) => (
      <button
        key={t}
        className={`tag-pill${activeTag === t ? " on" : ""}`}
        onClick={() => setActiveTag(activeTag === t ? null : t)}
      >
        {t}
      </button>
    ))}

    {allTags.length > 8 && (
      <button
        className="tag-expand"
        onClick={() => setShowAllTags(v => !v)}
      >
        {showAllTags ? "Show Less ▲" : `Show All ${allTags.length} ▾`}
      </button>
    )}
  </div>
</div>
        </div>

        <div className="divider"/>
        <div className="stats-row">
          <span className="stat"><b>{LOADERS.length}</b> loaders</span>
          <span className="stat"><b>5</b> export formats</span>
          <span className="stat"><b>∞</b> customizations</span>
          <span className="stat"><b>{allTags.length}</b> categories</span>
        </div>

        {/* Grid */}
        <div className="grid">
          {filtered.length===0 ? (
            <div className="empty"><div className="empty-icon">◌</div><div>No loaders found</div></div>
          ) : filtered.map((loader,idx)=>(
            <div key={loader.id} className={`card card-nth-${Math.min(idx+1,7)||"n"}`} onClick={()=>openLoader(loader)}>
              <div className="card-preview">
                <CardLoader loader={loader}/>
              </div>
              <div className="card-body">
                <div className="card-name">{loader.name}</div>
                <div className="card-tags">{loader.tags.slice(0,3).map(t=><span key={t} className="card-tag">{t}</span>)}</div>
              </div>
            </div>
          ))}
        </div>

        <footer className="footer">
          <div className="footer-name">Akhil Antony Joseph</div>
          <div className="footer-sub">LoaderVault · Open CSS Animation Showcase</div>
        </footer>

        <div className="mini-footer">
  Built by Joseph, Akhil
</div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="overlay" ref={overlayRef} onClick={e=>e.target===overlayRef.current&&setSelected(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="m-hdr">
              <div>
                <div className="m-title">{selected.name}</div>
                <div className="m-subtitle">CSS Animation · Pure Web</div>
                <div className="card-tags" style={{marginTop:8}}>
                  {selected.tags.map(t=><span key={t} className="card-tag">{t}</span>)}
                </div>
              </div>
              <button className="m-close" onClick={()=>setSelected(null)}>✕</button>
            </div>

            <div className="m-body">
              {/* Left column */}
              <div>
                {/* Preview */}
                <div className="preview-panel"
                  style={bgMode==="blur"
                    ? {backgroundImage:`url(${bgImage})`,backgroundSize:"cover",backgroundPosition:"center"}
                    : bgMode==="dark" ? {background:"#06091a"} : {background:"#eef1ff"}
                  }>
                  {bgMode==="blur" && <div className="blur-overlay" style={{"--blur-amt":`${blurAmount}px`}}/>}
                  <div className="preview-content preview-inner">
                    <ModalLoader loader={selected} controls={controls}/>
                  </div>
                </div>

                {/* BG controls */}
                <div className="bg-ctrl">
                  <div className="bg-tabs">
                    {BG_MODES.map(b=>(
                      <button key={b.id} className={`bg-tab${bgMode===b.id?" on":""}`} onClick={()=>setBgMode(b.id)}>{b.label}</button>
                    ))}
                  </div>
                  {bgMode==="blur" && (
                    <div style={{marginTop:4}}>
                      <Slider label="Blur Amount" value={blurAmount} min={0} max={40} step={0.5} onChange={setBlurAmount}/>
                    </div>
                  )}
                </div>
              </div>

              {/* Right column */}
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {/* Customize */}
                <div className="ctrl-section">
                  <div className="ctrl-label">Customize</div>
                  <Controls loader={selected} controls={controls} setControls={setControls}/>
                </div>

                {/* Export */}
                <div className="ctrl-section">
                  <div className="ctrl-label">Export Format</div>
                  <div className="lang-tabs">
                    {DOWNLOAD_LANGS.map(l=>(
                      <button key={l.id} className={`lang-tab${lang===l.id?" on":""}`} onClick={()=>setLang(l.id)}>{l.label}</button>
                    ))}
                  </div>
                </div>

                <div className="action-row">
                  <button className="btn-dl btn-dl-primary" onClick={()=>downloadCode(selected,controls,lang)}>
                    ↓ Download {DOWNLOAD_LANGS.find(l=>l.id===lang)?.label}
                  </button>
                  <button className="btn-dl btn-dl-sec" onClick={handleCopy}>
                    {copied?"✓ Copied!":"⧉ Copy CSS"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}