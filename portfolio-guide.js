/* VSR Portfolio: shared accessible quick route through all five destinations.
   Works without WebGL and never hides the original 3D experiences. */
(()=>{
 const stops=[
  {name:"ABOUT",url:"district.html?room=about",detail:"My journey, career story, and VSR Express"},
  {name:"WORK",url:"work.html",detail:"Engineering experience and project highlights"},
  {name:"SERVICES",url:"district.html?room=services",detail:"Automation, quality, cloud/data, and AI engineering"},
  {name:"AI LAB",url:"district.html?room=ai",detail:"Credentials, experiments, and practical AI work"},
  {name:"CONTACT",url:"district.html?room=contact",detail:"Coffee & Connections; email and LinkedIn"}
 ];
 const css=document.createElement("link");css.rel="stylesheet";css.href="portfolio-guide.css";document.head.append(css);
 const skip=document.createElement("a");skip.href="#vsrQuickPanel";skip.className="vsr-skip";skip.textContent="Skip 3D scene — explore portfolio";document.body.prepend(skip);
 const toggle=document.createElement("button");toggle.type="button";toggle.className="vsr-quick-toggle";toggle.id="vsrQuickToggle";toggle.textContent="☷ QUICK VIEW";toggle.setAttribute("aria-controls","vsrQuickPanel");toggle.setAttribute("aria-expanded","false");document.body.append(toggle);
 const panel=document.createElement("section");panel.id="vsrQuickPanel";panel.className="vsr-quick-panel";panel.hidden=true;panel.tabIndex=-1;panel.setAttribute("aria-label","Quick portfolio overview");panel.setAttribute("role","dialog");panel.setAttribute("aria-modal","true");
 panel.innerHTML='<div class="vsr-quick-head"><span>VSR / THE CITY OF IDEAS</span><button type="button" id="vsrQuickClose" aria-label="Close quick view">✕</button></div><p class="vsr-quick-eyebrow">ENGINEERING MEETS IMAGINATION</p><h2>Vijay Sekhar Reddy</h2><p class="vsr-quick-lead">Quality engineering leader building reliable automation, cloud/data validation and practical AI engineering solutions.</p><div class="vsr-quick-highlights"><article><strong>ENTERPRISE QUALITY</strong><span>Cross-functional release strategy, migration testing, and engineering leadership</span></article><article><strong>AUTOMATION ARCHITECTURE</strong><span>Playwright, Selenium, API testing and scalable quality workflows</span></article><article><strong>AI + DATA INNOVATION</strong><span>API migration comparisons, AI-assisted test utilities and AWS data pipelines</span></article></div><h3>Explore the five districts</h3><nav id="vsrQuickStops" aria-label="Direct portfolio navigation"></nav><div class="vsr-quick-contact"><a href="mailto:vijay.sekhar18@gmail.com">✉ EMAIL</a><a href="https://www.linkedin.com/in/vijaygopireddy/" target="_blank" rel="noopener noreferrer">↗ LINKEDIN</a></div><p class="vsr-quick-foot">Prefer the immersive experience? Close this panel to continue exploring the 3D city and rooms.</p>';
 document.body.append(panel);
 const nav=panel.querySelector("#vsrQuickStops");
 stops.forEach((stop,i)=>{const a=document.createElement("a");a.href=stop.url;a.innerHTML='<b>'+String(i+1).padStart(2,"0")+' · '+stop.name+'</b><small>'+stop.detail+'</small>';nav.append(a)});
 const close=panel.querySelector("#vsrQuickClose");
 let lastFocus=null;
 const set=open=>{panel.hidden=!open;toggle.setAttribute("aria-expanded",String(open));if(open){lastFocus=document.activeElement;panel.focus()}else if(lastFocus?.focus)lastFocus.focus()};
 toggle.addEventListener("click",()=>set(panel.hidden));close.addEventListener("click",()=>set(false));
 skip.addEventListener("click",e=>{e.preventDefault();set(true)});
 document.addEventListener("keydown",e=>{
  if(panel.hidden)return;
  if(e.key==="Escape"){e.preventDefault();set(false);return}
  if(e.key==="Tab"){
   const focusable=[...panel.querySelectorAll('a[href],button:not([disabled])')];
   if(!focusable.length)return;
   const first=focusable[0],last=focusable[focusable.length-1];
   if(e.shiftKey&&(document.activeElement===first||document.activeElement===panel)){e.preventDefault();last.focus()}
   else if(!e.shiftKey&&(document.activeElement===last||document.activeElement===panel)){e.preventDefault();first.focus()}
  }
 });
 // A missing WebGL implementation must not strand the visitor.
 const supportsWebGL=()=>{try{const c=document.createElement("canvas");return !!(c.getContext("webgl2")||c.getContext("webgl"))}catch{return false}};
 if(!supportsWebGL()){
  const note=document.createElement("p");note.className="vsr-webgl-note";note.setAttribute("role","status");note.textContent="3D graphics are unavailable on this device. Use Quick View to explore the complete portfolio.";
  document.body.append(note);toggle.classList.add("vsr-quick-emphasis");
 }
 window.addEventListener("error",e=>{if(/webgl|three|module|failed to fetch/i.test(String(e.message||""))){toggle.classList.add("vsr-quick-emphasis")}});
})();
