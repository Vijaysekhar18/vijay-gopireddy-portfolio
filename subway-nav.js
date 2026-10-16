(()=>{
 const panel=document.getElementById("subwayPanel"),toggle=document.getElementById("subwayToggle"),close=document.getElementById("subwayClose");
 const track=document.getElementById("subwayTrack"),train=document.getElementById("subwayTrain"),skip=document.getElementById("subwaySkip"),status=document.getElementById("subwayRideStatus");
 if(!panel||!toggle||!close||!track||!train||!skip||!status)return;
 const coords={about:[42,35],work:[178,85],services:[178,147],ai:[278,236],contact:[278,293]};
 let riding=false,frame=0,selected=null,idleFrame=0,idleStart=null;
 const total=track.getTotalLength();
 const reducedMotion=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 const stationLengths=Object.values(coords).map(([x,y])=>nearestLength(x,y));
 const idleDuration=16500,stationPause=450;
 function stopIdle(){if(idleFrame)cancelAnimationFrame(idleFrame);idleFrame=0;idleStart=null}
 function drawTrain(distance){const p=track.getPointAtLength(Math.max(0,Math.min(total,distance)));train.setAttribute("transform",`translate(${p.x} ${p.y})`)}
 function idleTick(now){
  if(panel.hidden||riding||reducedMotion()){stopIdle();return}
  if(idleStart===null)idleStart=now;
  const cycle=idleDuration+stationPause*5,elapsed=(now-idleStart)%cycle;
  // Each station gets a short pause while the train travels along the route.
  const segments=stationLengths.length-1,segmentDuration=idleDuration/segments;
  let elapsedActive=elapsed,distance=0;
  for(let i=0;i<segments;i++){
   if(elapsedActive<stationPause){distance=stationLengths[i];break}
   elapsedActive-=stationPause;
   if(elapsedActive<segmentDuration){const t=elapsedActive/segmentDuration;distance=stationLengths[i]+(stationLengths[i+1]-stationLengths[i])*t;break}
   elapsedActive-=segmentDuration;distance=stationLengths[i+1]
  }
  drawTrain(distance);
  idleFrame=requestAnimationFrame(idleTick)
 }
 function startIdle(){stopIdle();if(!panel.hidden&&!riding&&!reducedMotion())idleFrame=requestAnimationFrame(idleTick);else drawTrain(0)}
 const set=open=>{panel.hidden=!open;toggle.setAttribute("aria-expanded",String(open));if(open)startIdle();else stopIdle()};
 const cancel=()=>{stopIdle();if(frame)cancelAnimationFrame(frame);frame=0;riding=false;panel.dataset.riding="false";skip.hidden=true;status.textContent=""};
 const arrive=()=>{if(!selected)return;const key=selected;cancel();set(false);window.dispatchEvent(new CustomEvent("vsr:arrive",{detail:{key}}))};
 function nearestLength(x,y){let best=0,distance=Infinity;for(let i=0;i<=250;i++){const len=total*i/250,p=track.getPointAtLength(len),d=(p.x-x)**2+(p.y-y)**2;if(d<distance){best=len;distance=d}}return best}
 function ride(key){
  if(riding||!coords[key])return;selected=key;riding=true;panel.dataset.riding="true";skip.hidden=false;
  status.textContent="NEXT STOP · "+key.toUpperCase();window.dispatchEvent(new Event("vsr:ride-start"));
  stopIdle();drawTrain(0);const end=nearestLength(...coords[key]);const reduced=reducedMotion();
  if(reduced){arrive();return}
  const duration=2600;let started=null;
  function tick(t){if(!riding)return;if(started===null)started=t;const p=Math.min(1,(t-started)/duration),e=p<.5?2*p*p:1-(-2*p+2)**2/2;drawTrain(end*e);if(p<1)frame=requestAnimationFrame(tick);else arrive()}
  frame=requestAnimationFrame(tick)
 }
 for(const btn of panel.querySelectorAll("[data-station]"))btn.addEventListener("click",()=>ride(btn.dataset.station));
 toggle.addEventListener("click",()=>{if(!riding)set(panel.hidden)});
 close.addEventListener("click",()=>{cancel();set(false)});
 skip.addEventListener("click",arrive);
 window.addEventListener("vsr:open-map",()=>{cancel();set(true)});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"){cancel();set(false)}});
 document.addEventListener("visibilitychange",()=>{if(document.hidden)stopIdle();else if(!panel.hidden&&!riding)startIdle()});
 document.addEventListener("pointerdown",e=>{if(!panel.hidden&&!riding&&!panel.contains(e.target)&&!toggle.contains(e.target))set(false)});
})();