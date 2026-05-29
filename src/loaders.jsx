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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Cinzel:wght@400;600;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;transition:background .4s,color .4s;overflow-x:hidden}
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
        .site-name{font-family:'Cinzel',serif;font-weight:700;font-size:clamp(28px,5vw,52px);letter-spacing:.03em;line-height:1;background:linear-gradient(120deg,#a5b4fc 0%,#e879f9 45%,#f472b6 70%,#818cf8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .site-sub{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;font-size:clamp(13px,2vw,17px);color:var(--muted);margin-top:5px;letter-spacing:.06em}
        .hdr-right{display:flex;align-items:center;gap:10px;opacity:0;transform:translateY(-16px);transition:opacity .8s .2s cubic-bezier(.22,1,.36,1),transform .8s .2s cubic-bezier(.22,1,.36,1)}
        .hdr-right.visible{opacity:1;transform:none}
        .pill-btn{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;padding:8px 18px;border-radius:100px;border:1px solid var(--border);background:var(--card);color:var(--text-secondary);cursor:pointer;transition:all .25s;letter-spacing:.02em;white-space:nowrap}
        .pill-btn:hover{border-color:var(--border-h);color:var(--text);box-shadow:0 0 0 3px var(--glow)}

        /* Search */
        .search-area{margin:32px 0 0;position:relative}
        .search-wrap{position:relative}
        .search-icon{position:absolute;left:20px;top:50%;transform:translateY(-50%);color:var(--muted);font-size:16px;pointer-events:none}
        .search-in{width:100%;padding:15px 48px 15px 50px;font-size:15px;font-family:'DM Sans',sans-serif;border-radius:16px;border:1px solid var(--border);background:var(--card);color:var(--text);outline:none;transition:border .25s,box-shadow .25s,background .25s}
        .search-in::placeholder{color:var(--muted)}
        .search-in:focus{border-color:var(--border-h);box-shadow:0 0 0 4px var(--glow),0 8px 40px rgba(99,102,241,.08)}
        .search-count{position:absolute;right:18px;top:50%;transform:translateY(-50%);font-size:11px;color:var(--muted);font-family:'JetBrains Mono',monospace;pointer-events:none}

        /* Tags */
        .tags-row{display:flex;gap:7px;margin:14px 0 0;flex-wrap:wrap;align-items:center}
        .tag-pill{padding:4px 12px;border-radius:100px;font-size:11px;font-weight:500;border:1px solid var(--border);background:transparent;color:var(--muted);cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;letter-spacing:.03em}
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
        .card-name{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:600;color:var(--text);margin-bottom:7px;letter-spacing:.01em}
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
        .m-title{font-family:'Cinzel',serif;font-size:clamp(18px,3vw,26px);font-weight:600;letter-spacing:.04em;color:var(--text)}
        .m-subtitle{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:14px;color:var(--muted);margin-top:3px}
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
        .bg-tab{flex:1;padding:6px;border-radius:9px;font-size:11px;font-weight:500;border:1px solid var(--border);background:transparent;color:var(--muted);cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;letter-spacing:.03em}
        .bg-tab.on{background:var(--tag-bg);color:var(--tag-text);border-color:rgba(99,102,241,.4);font-weight:600}

        /* Controls section */
        .ctrl-section{background:var(--input-bg);border:1px solid var(--border);border-radius:16px;padding:16px 18px}
        .ctrl-section+.ctrl-section{margin-top:12px}
        .ctrl-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-bottom:13px;font-family:'DM Sans',sans-serif}

        /* Lang tabs */
        .lang-tabs{display:flex;gap:5px;flex-wrap:wrap}
        .lang-tab{padding:5px 11px;border-radius:8px;font-size:11px;font-weight:600;border:1px solid var(--border);background:transparent;color:var(--muted);cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;letter-spacing:.03em}
        .lang-tab.on{background:var(--accent);color:#fff;border-color:var(--accent)}

        /* Action row */
        .action-row{display:flex;gap:9px;margin-top:12px;flex-wrap:wrap}
        .btn-dl{flex:1;min-width:80px;padding:11px 14px;border-radius:13px;font-size:13px;font-weight:600;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all .25s;display:flex;align-items:center;justify-content:center;gap:6px;letter-spacing:.02em}
        .btn-dl-primary{background:linear-gradient(135deg,var(--accent),var(--accent2));color:#fff;border:none}
        .btn-dl-primary:hover{transform:scale(1.03);box-shadow:0 10px 30px var(--glow)}
        .btn-dl-sec{background:var(--input-bg);border:1px solid var(--border);color:var(--text-secondary)}
        .btn-dl-sec:hover{border-color:var(--border-h);color:var(--text)}

        /* Footer */
        .footer{text-align:center;padding:40px 0 20px;border-top:1px solid var(--border);margin-top:70px}
        .footer-name{font-family:'Cinzel',serif;font-size:16px;font-weight:600;background:linear-gradient(90deg,#a5b4fc,#f472b6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:.08em}
        .footer-sub{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:14px;color:var(--muted);margin-top:6px}
      `}</style>

      <div className="app">
        {/* Header */}
        <header className="hdr">
          <div className={`hdr-left${headerVisible?" visible":""}`}>
            <div className="site-name">LoaderVault</div>
            <div className="site-sub">A curated collection of fine CSS animations</div>
          </div>
          <div className={`hdr-right${headerVisible?" visible":""}`}>
            <button className="pill-btn" onClick={()=>setTheme(t=>t==="dark"?"light":"dark")}>
              {dark?"☀ Light":"◑ Dark"}
            </button>
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
          <div className="tags-row">
            <button className={`tag-pill${!activeTag?" on":""}`} onClick={()=>setActiveTag(null)}>All</button>
            {allTags.map(t=>(
              <button key={t} className={`tag-pill${activeTag===t?" on":""}`} onClick={()=>setActiveTag(activeTag===t?null:t)}>{t}</button>
            ))}
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