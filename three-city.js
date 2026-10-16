import * as THREE from "https://esm.sh/three@0.170.0";
import { addNYCLandmarks } from "./nyc-landmarks.js";
import { createCityLife } from "./city-life.js";
const mount=document.getElementById("scene"),labels=[...document.querySelectorAll(".labels button")],dialog=document.getElementById("panel");
const data={about:{name:"ABOUT",title:"The Engineer Behind the City",text:"I'm Vijay Sekhar Reddy, a software quality engineering leader based in Jersey City. My work spans financial services, banking, and healthcare, with a focus on automation, cloud data platforms, release quality and practical AI. This city is a playful way to explore the systems I've helped make more dependable.",tags:["QUALITY ENGINEERING","LEADERSHIP","CLOUD"],links:[["LINKEDIN","https://www.linkedin.com/in/vijaygopireddy/"]]},cloud:{name:"CLOUD DISTRICT",title:"Cloud Landing Zone Migration",text:"Led test strategy across functional, data, automation and performance engineering for a complex AWS landing zone migration. Coordinated teams from analysis through production readiness, validating event-driven pipelines and critical data flows.",tags:["AWS","KAFKA","GLUE","DATA QUALITY","TEST STRATEGY"]},automation:{name:"AUTOMATION TOWER",title:"API Migration Comparison",text:"Designed an API migration validation approach that runs many input combinations against old and new environments, compares behavior and highlights differences. Built to accelerate regression feedback and confidence during modernization.",tags:["API TESTING","AUTOMATION","JAVA","QE"]},ai:{name:"AI LAB",title:"AI-Assisted Engineering",text:"Exploring AI-powered helpers for element discovery, test design, engineering productivity and responsible automation. Also writing AI Field Notes about tools and ideas shaping how we build software.",tags:["AI","PLAYWRIGHT","PRODUCTIVITY","EXPERIMENTS"],links:[["AI FIELD NOTES","https://aiinsights80.wordpress.com/"]]},contact:{name:"CONTACT",title:"Let's Build What's Next",text:"Interested in quality engineering leadership, cloud reliability, test automation or AI-enabled developer tools? I'd love to connect and exchange ideas.",tags:["OPEN TO CONVERSATIONS"],links:[["EMAIL ME","mailto:vijay.sekhar18@gmail.com"],["LINKEDIN","https://www.linkedin.com/in/vijaygopireddy/"],["GITHUB","https://github.com/Vijaysekhar18"]]}};const keys=Object.keys(data);let active="about";
const scene=new THREE.Scene();scene.background=new THREE.Color("#c9c0aa");scene.fog=null;
const camera=new THREE.OrthographicCamera(-27,27,17,-17,.1,300);const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:"high-performance"});renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.9;mount.appendChild(renderer.domElement);
const ambient=new THREE.HemisphereLight("#fff7e2","#837e6c",2.7);scene.add(ambient);const sun=new THREE.DirectionalLight("#fff5d5",3.1);sun.position.set(-22,42,20);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-55;sun.shadow.camera.right=55;sun.shadow.camera.top=55;sun.shadow.camera.bottom=-55;sun.shadow.bias=-.0003;scene.add(sun);
const mat=(color,extra={})=>new THREE.MeshStandardMaterial({color,roughness:.92,metalness:0,...extra});const M={ground:mat("#c7bda5"),road:mat("#817e70"),lane:mat("#e3dbc3"),sidewalk:mat("#b1a996"),roof:mat("#888677"),white:mat("#e2d9c3"),stone:mat("#b6b1a0"),dark:mat("#313d3c"),glass:mat("#263438"),gold:mat("#e8b21b"),goldSide:mat("#c59112"),green:mat("#6a9a4c"),tree:mat("#669b4d"),trunk:mat("#725b41"),water:mat("#6c9f9b"),glow:mat("#fff078",{emissive:"#f8ce27",emissiveIntensity:.7})};
const city=new THREE.Group();scene.add(city);const interact=[];const points={about:new THREE.Vector3(1,13,-13),work:new THREE.Vector3(-1,13,2),services:new THREE.Vector3(11,15,-3),ai:new THREE.Vector3(-13,12,3),contact:new THREE.Vector3(16,8,11)};
function box(w,h,d,material,x,y,z,parent=city,cast=true){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);mesh.position.set(x,y,z);mesh.castShadow=cast;mesh.receiveShadow=true;parent.add(mesh);return mesh}function cylinder(r1,r2,h,material,x,y,z,n=12){const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,n),material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;city.add(mesh);return mesh}
// Quiet continuous waterfront surrounding the 90x90 island, with a narrow border for mobile framing.
const harborMat=new THREE.MeshBasicMaterial({color:"#3487a5",side:THREE.DoubleSide});
box(122,.12,122,harborMat,0,-.86,0,city,false);
// Thin foam accents on the visible harbor ring; avoid dense or animated geometry.
const rippleMat=new THREE.MeshBasicMaterial({color:"#a6d7d9",transparent:true,opacity:.48,depthWrite:false});
for(const side of [-1,1])for(let i=-2;i<=2;i++){
 box(4.2,.012,.10,rippleMat,i*17,-.786,side*50.5,city,false);
 box(.10,.012,4.2,rippleMat,side*50.5,-.786,i*17,city,false);
}
// A few existing lamp and window surfaces receive warm light in evening mode.
const nightPalette={sky:new THREE.Color("#101d34"),harbor:new THREE.Color("#173e62"),window:new THREE.Color("#e5c47a"),lamp:new THREE.Color("#ffcb6e")};
const dayPalette={sky:new THREE.Color("#c9c0aa"),harbor:new THREE.Color("#3487a5"),window:new THREE.Color("#263438"),lamp:new THREE.Color("#fff078")};
let nightTarget=0,nightBlend=0;
function setNightMode(on){nightTarget=on?1:0;document.body.classList.toggle("night-mode",on);const toggle=document.getElementById("dayNight");toggle.textContent=on?"☀":"☾";toggle.setAttribute("aria-pressed",String(on));toggle.setAttribute("aria-label",on?"Switch to day mode":"Switch to night mode");toggle.title=on?"Switch to day mode":"Switch to night mode"}
document.getElementById("dayNight").addEventListener("click",()=>setNightMode(!nightTarget));
function updateLighting(dt){nightBlend+=(nightTarget-nightBlend)*(1-Math.exp(-2.3*dt));const t=nightBlend;scene.background.copy(dayPalette.sky).lerp(nightPalette.sky,t);harborMat.color.copy(dayPalette.harbor).lerp(nightPalette.harbor,t);M.glass.color.copy(dayPalette.window).lerp(nightPalette.window,t);M.glow.color.copy(dayPalette.lamp).lerp(nightPalette.lamp,t);M.glow.emissiveIntensity=.7+1.3*t;ambient.intensity=2.7-1.5*t;sun.intensity=3.1-2.5*t;renderer.toneMappingExposure=1.9-.38*t}
const shoreMat=mat("#b8d5cd",{roughness:.82});
for(const side of [-1,1]){box(90,.045,.42,shoreMat,0,-.76,side*45.3,city,false);box(.42,.045,90,shoreMat,side*45.3,-.76,0,city,false)}
box(90,.8,90,M.ground,0,-.6,0);const roadCenters=[-19,-5,9,23];for(const x of roadCenters){box(3.4,.05,85,M.road,x,-.14,0,city,false);for(let z=-39;z<40;z+=4)box(.09,.055,1.5,M.lane,x,-.105,z,city,false)}for(const z of [-23,-8,7,22]){box(85,.05,3.4,M.road,0,-.13,z,city,false);for(let x=-39;x<40;x+=4)box(1.5,.055,.09,M.lane,x,-.1,z,city,false)}// Two understated zebra crossings, kept low to the road so the miniature stays uncluttered.
const crossingPaint=mat("#eee8d5",{roughness:1});
function crosswalk(x,z,acrossX){
 for(let i=-2;i<=2;i++){
  if(acrossX)box(.36,.012,2.65,crossingPaint,x+i*.53,-.092,z,city,false);
  else box(2.65,.012,.36,crossingPaint,x,-.092,z+i*.53,city,false);
 }
}
crosswalk(-19,22,true);
crosswalk(23,-23,false);
function random(n){let v=Math.sin(n*128.71+n*n*.05)*43258.54;return v-Math.floor(v)}function building(x,z,w,d,h,tone,seed,landmark){box(w+.55,.23,d+.55,M.sidewalk,x,.1,z);const body=box(w,h,d,tone,x,h/2+.22,z);if(landmark){body.userData.project=landmark;interact.push(body)}box(w+.15,.3,d+.15,M.roof,x,h+.3,z);for(let level=1;level<h/1.6;level++){const y=.8+level*1.55;if(y>h-.5)break;for(let c=-w/2+.8;c<w/2-.4;c+=1.4){box(.65,.86,.065,M.glass,x+c,y,z+d/2+.04,city,false);box(.65,.86,.065,M.glass,x+c,y,z-d/2-.04,city,false)}for(let c=-d/2+.8;c<d/2-.4;c+=1.4){box(.065,.86,.65,M.glass,x+w/2+.04,y,z+c,city,false);box(.065,.86,.65,M.glass,x-w/2-.04,y,z+c,city,false)}}if(h>11){box(w*.38,.4,d*.36,M.roof,x,h+.6,z);box(.08,1.5,.08,M.dark,x,h+1.55,z)}return body}
function tree(x,z,s=1){cylinder(.17*s,.22*s,2*s,M.trunk,x,1.1*s,z,8);const crown=new THREE.Mesh(new THREE.IcosahedronGeometry(1.12*s,1),M.tree);crown.position.set(x,2.65*s,z);crown.castShadow=true;city.add(crown)}
function streetlamp(x,z){cylinder(.065,.08,3.1,M.dark,x,1.55,z,7);box(.65,.15,.27,M.glow,x,3.15,z,city,false)}

// A miniature street-level VSR Express entrance: railings, descending steps and globe lamps.
const subwayEntrance=new THREE.Group();subwayEntrance.position.set(-1,.35,14.5);city.add(subwayEntrance);
const subwayMetal=new THREE.MeshStandardMaterial({color:"#263b40",roughness:.58});
const subwayGreen=new THREE.MeshStandardMaterial({color:"#69ba86",emissive:"#286344",emissiveIntensity:.28});
function subwayBox(w,h,d,m,x,y,z){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);subwayEntrance.add(o);return o}
subwayBox(7,.16,5.5,M.sidewalk,0,.05,0);
subwayBox(4.3,.12,2.6,subwayMetal,0,.15,0);
for(let i=0;i<5;i++)subwayBox(3.7,.17,.44,M.sidewalk,0,.21+i*.14,-1+i*.46);
for(const x of [-2.5,2.5]){subwayBox(.12,1.4,3.4,subwayMetal,x,.88,0);for(const z of [-1.5,1.5]){subwayBox(.17,1.9,.17,subwayMetal,x,1,z);const lamp=new THREE.Mesh(new THREE.SphereGeometry(.37,12,9),subwayGreen);lamp.position.set(x,2.1,z);subwayEntrance.add(lamp)}}
const entranceSign=subwayBox(4.5,.8,.2,subwayMetal,0,2.3,-1.6);
const signCanvas=document.createElement("canvas");signCanvas.width=512;signCanvas.height=128;const signCtx=signCanvas.getContext("2d");signCtx.fillStyle="#263b40";signCtx.fillRect(0,0,512,128);signCtx.fillStyle="#fff4d6";signCtx.textAlign="center";signCtx.font="bold 43px sans-serif";signCtx.fillText("Ⓜ VSR EXPRESS",256,80);const signTexture=new THREE.CanvasTexture(signCanvas);signTexture.colorSpace=THREE.SRGBColorSpace;const entranceBoard=new THREE.Mesh(new THREE.PlaneGeometry(4.4,.78),new THREE.MeshBasicMaterial({map:signTexture,side:THREE.DoubleSide}));entranceBoard.position.set(0,2.3,-1.46);subwayEntrance.add(entranceBoard);
const entranceHit=subwayBox(6,3.8,5,new THREE.MeshBasicMaterial({visible:false}),0,1.9,0);entranceHit.userData.project="subway";interact.push(entranceHit);
const entranceGlow=new THREE.Mesh(new THREE.BoxGeometry(7.1,.11,5.6),new THREE.MeshBasicMaterial({color:"#f8ce43",transparent:true,opacity:.0,depthWrite:false}));entranceGlow.position.set(0,.22,0);subwayEntrance.add(entranceGlow);
const subwayHoverCard=document.getElementById("subwayHoverCard");
let subwayHovered=false;
function setSubwayHover(on){if(subwayHovered===on)return;subwayHovered=on;entranceGlow.material.opacity=on?.55:0;subwayHoverCard.hidden=!on;mount.style.cursor=on?"pointer":""}

const arrivalGlow=new THREE.Mesh(new THREE.TorusGeometry(3.3,.17,8,48),new THREE.MeshBasicMaterial({color:"#ffe15c",transparent:true,opacity:.85,depthTest:false}));arrivalGlow.rotation.x=Math.PI/2;arrivalGlow.visible=false;city.add(arrivalGlow);
for(let i=0;i<135;i++){const gx=Math.floor(i/9),gz=i%9,x=-36+gx*5.2,z=-36+gz*8.7;if(roadCenters.some(r=>Math.abs(x-r)<3.2)||[-23,-8,7,22].some(r=>Math.abs(z-r)<3.2))continue;if(Math.abs(x)<18&&Math.abs(z)<19)continue;const h=2.5+random(i+14)*7.5;building(x,z,2.5+random(i+55)*1.5,3.2+random(i+23)*1.2,h,random(i+17)>.5?M.white:M.stone,i);if(i%4===0)tree(x+2.1,z+1.8,.75)}
// Signature Manhattan landmarks: distinct yellow districts.
building(-13,3,5,5,8.7,M.gold,201,"ai");for(let k=0;k<4;k++){const ring=cylinder(2.9-k*.24,2.9-k*.24,.23,M.goldSide,-13,2+k*1.9,3,28);ring.userData.project="ai";interact.push(ring)}cylinder(3.15,3.15,.35,M.gold,-13,9.2,3,24);
// A small stationary rooftop helicopter; only the rotors turn, preserving the calm city composition.
const helicopter=new THREE.Group();helicopter.position.set(-13,9.65,3);helicopter.scale.setScalar(1.27);city.add(helicopter);
const heliNavy=mat("#1d3651",{metalness:.22,roughness:.43}),heliGlass=mat("#79a8b8",{metalness:.2,roughness:.32}),heliGold=mat("#edc451");
function heliPart(w,h,d,material,x,y,z,parent=helicopter){return box(w,h,d,material,x,y,z,parent,false)}
heliPart(2.0,.85,1.12,heliNavy,0,.8,0);
heliPart(.85,.58,1.14,heliGlass,.76,.93,0);heliPart(.55,.13,1.18,heliGold,.42,.63,0);
heliPart(2.25,.17,.22,heliNavy,-2.02,1.02,0);
heliPart(.14,.66,.68,heliGold,-3.05,1.25,0);heliPart(.35,.22,.22,heliGold,-2.8,1.03,0);
for(const z of [-.46,.46]){heliPart(.11,.10,2.7,heliNavy,0,.20,z);heliPart(.10,.34,.10,heliNavy,-.6,.38,z);heliPart(.10,.34,.10,heliNavy,.72,.38,z)}
heliPart(.16,.46,.16,heliNavy,0,1.5,0);
const mainRotor=new THREE.Group();mainRotor.position.set(0,1.78,0);helicopter.add(mainRotor);
heliPart(4.4,.055,.20,heliNavy,0,0,0,mainRotor);
heliPart(.20,.055,4.4,heliNavy,0,0,0,mainRotor);
const tailRotor=new THREE.Group();tailRotor.position.set(-3.1,1.25,.43);helicopter.add(tailRotor);
heliPart(.09,.84,.08,heliGold,0,0,0,tailRotor);heliPart(.09,.08,.84,heliGold,0,0,0,tailRotor);

building(-1,2,5.4,5.3,14.2,M.gold,202,"work");box(4.1,1.5,4,M.goldSide,-1,15.1,2); // Extra roof accent below corrected separately
building(11,-3,5.3,5.4,12.6,M.gold,203,"services");box(4.5,.4,4.5,M.goldSide,11,13.3,-3);
building(1,-13,6,5.3,10.6,M.gold,204,"about");box(4,.4,3,M.goldSide,1,11.1,-13);
building(16,11,4.5,5.1,8.3,M.gold,205,"contact");
for(const [key,p]of Object.entries(points)){const sphere=new THREE.Mesh(new THREE.SphereGeometry(.34,12,10),M.glow);sphere.position.set(p.x,p.y+.8,p.z);sphere.userData.project=key;city.add(sphere);interact.push(sphere)}
// Urban park with pond, trees and little bridge.
box(12,.07,8,mat("#a7aa84"),-27,.02,12,city,false);const pond=new THREE.Mesh(new THREE.CylinderGeometry(2.5,2.5,.07,36),M.water);pond.position.set(-27,.09,12);pond.scale.z=.6;city.add(pond);for(let i=0;i<12;i++){let a=i*Math.PI*2/12;tree(-27+4.3*Math.cos(a),12+3.2*Math.sin(a),.65+random(i+7)*.35)}
for(let i=0;i<65;i++){const x=-37+random(i+330)*74,z=-37+random(i+500)*74;if(roadCenters.some(r=>Math.abs(x-r)<2.5)||[-23,-8,7,22].some(r=>Math.abs(z-r)<2.5))continue;if(i%2===0)tree(x,z,.65+random(i+8)*.35);else streetlamp(x,z)}
// A simplified suspension bridge along the eastern waterfront.
box(3,.3,20,M.road,32,2.2,-5);for(const z of [-12,2]){box(.45,7,.45,M.stone,30.5,4.8,z);box(.45,7,.45,M.stone,33.5,4.8,z);box(4,.35,.45,M.stone,32,8.1,z)}for(let z=-15;z<5;z+=1.5){box(.06,2,.06,M.stone,30.5,3.3,z);box(.06,2,.06,M.stone,33.5,3.3,z)}
const landmarks=addNYCLandmarks(city,interact);
const cityLife=createCityLife(city);let walkingProgress=0;
const entryPrompt=document.getElementById("enterPrompt");if(entryPrompt)entryPrompt.hidden=true;
const landmarkLabels=document.createElement("div");landmarkLabels.className="landmark-labels";document.getElementById("home").appendChild(landmarkLabels);
const centralDestinations=[{key:"about",name:"ABOUT",position:points.about},{key:"work",name:"WORK",position:new THREE.Vector3(-1,17,2)},{key:"services",name:"SERVICES",position:new THREE.Vector3(11,15,-3)},{key:"ai",name:"AI",position:points.ai},{key:"contact",name:"CONTACT",position:new THREE.Vector3(16,11,11)}];
const landmarkButtons=centralDestinations.map(f=>{const el=document.createElement("button");el.className="landmark-tag central-tag";el.textContent=f.name;el.title="Explore "+f.name;el.addEventListener("click",()=>openProject(f.key));landmarkLabels.appendChild(el);return {el,f}});

let theta=Math.PI/4,phi=.97,radius=77,desiredTheta=Math.PI/4,desiredPhi=.97,desiredRadius=77,desiredZoom=1,target=new THREE.Vector3(0,3,0),dragging=false,dragged=false,startX=0,startY=0,prevX=0,prevY=0,autotour=false,frame=0;function cameraUpdate(dt=1/60){const blend=1-Math.exp(-10*dt);theta+=(desiredTheta-theta)*blend;phi+=(desiredPhi-phi)*blend;radius+=(desiredRadius-radius)*blend;camera.zoom+=(desiredZoom-camera.zoom)*blend;const sin=Math.sin(phi);camera.position.set(target.x+radius*sin*Math.sin(theta),target.y+radius*Math.cos(phi),target.z+radius*sin*Math.cos(theta));camera.lookAt(target);camera.updateProjectionMatrix()}function resize(){const w=mount.clientWidth,h=mount.clientHeight,aspect=w/h,extent=31;cityLife.perspective.aspect=aspect;cityLife.perspective.updateProjectionMatrix();camera.left=-extent*aspect;camera.right=extent*aspect;camera.top=extent;camera.bottom=-extent;camera.updateProjectionMatrix();renderer.setSize(w,h,false);cameraUpdate()}window.addEventListener("resize",resize);resize();
function openProject(key){if(key==="subway"){window.dispatchEvent(new Event("vsr:open-map"));return;}if(key==="work"){window.location.href="work.html";return;}if(["about","services","ai","contact"].includes(key)){window.location.href="district.html?room="+encodeURIComponent(key);return;}if(!data[key])return;active=key;const d=data[key];document.getElementById("panelIndex").textContent=String(keys.indexOf(key)+1).padStart(2,"0")+" / 05";document.getElementById("panelKicker").textContent=d.name;document.getElementById("panelTitle").textContent=d.title;document.getElementById("panelDescription").textContent=d.text;document.getElementById("panelTags").replaceChildren(...d.tags.map(t=>{let e=document.createElement("span");e.textContent=t;return e}));document.getElementById("panelLinks").replaceChildren(...(d.links||[]).map(([name,url])=>{const a=document.createElement("a");a.textContent=name+" ↗";a.href=url;if(url.startsWith("http")){a.target="_blank";a.rel="noopener"}return a}));document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.project===key));if(!dialog.open)dialog.showModal()}document.querySelectorAll("[data-project]").forEach(el=>el.addEventListener("click",()=>openProject(el.dataset.project)));document.getElementById("closePanel").addEventListener("click",()=>dialog.close());document.getElementById("prevProject").addEventListener("click",()=>openProject(keys[(keys.indexOf(active)+4)%5]));document.getElementById("nextProject").addEventListener("click",()=>openProject(keys[(keys.indexOf(active)+1)%5]));dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
const arrivalPrompt=document.getElementById("arrivalPrompt"),arrivalName=document.getElementById("arrivalName");
let arrivalKey=null;
window.addEventListener("vsr:ride-start",()=>{stopTour();arrivalGlow.visible=false;arrivalPrompt.hidden=true;arrivalKey=null});
window.addEventListener("vsr:arrive",e=>{
 const key=e.detail?.key;if(!points[key])return;
 stopTour();arrivalKey=key;const p=points[key];target.set(p.x,3.8,p.z);desiredTheta=Math.PI/4;desiredPhi=.97;desiredRadius=48;desiredZoom=1.65;
 arrivalGlow.position.set(p.x,p.y+.7,p.z);arrivalGlow.visible=true;
 arrivalName.textContent="ARRIVED · "+key.toUpperCase();arrivalPrompt.hidden=false;
 for(const {el,f} of landmarkButtons)el.classList.toggle("station-arrived",f.key===key);
});
document.getElementById("arrivalEnter").addEventListener("click",()=>{if(arrivalKey)openProject(arrivalKey)});
document.getElementById("arrivalClose").addEventListener("click",()=>{arrivalPrompt.hidden=true;arrivalGlow.visible=false;arrivalKey=null;for(const {el} of landmarkButtons)el.classList.remove("station-arrived")});
const pointers=new Map();let gestureMoved=false,lastPinch=0;
mount.style.touchAction="none";
function stopTour(){if(!autotour)return;autotour=false;document.getElementById("tour").textContent="START CITY TOUR ↗"}
function zoom(amount){desiredRadius=THREE.MathUtils.clamp(desiredRadius+amount,35,95)}
function pinchDistance(){const a=[...pointers.values()];return a.length<2?0:Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y)}
mount.addEventListener("pointerdown",e=>{if(e.pointerType==="mouse"&&e.button!==0)return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY});if(pointers.size>1)gestureMoved=true;lastPinch=pinchDistance();try{mount.setPointerCapture(e.pointerId)}catch{}});
mount.addEventListener("pointermove",e=>{const p=pointers.get(e.pointerId);if(!p)return;const dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;if(Math.hypot(p.x-p.sx,p.y-p.sy)>7)gestureMoved=true;if(pointers.size>1){const d=pinchDistance();if(lastPinch&&d){zoom((lastPinch-d)*.12);if(Math.abs(lastPinch-d)>1)stopTour()}lastPinch=d;gestureMoved=true;return}if(!gestureMoved)return;desiredTheta-=dx*.005;desiredPhi=THREE.MathUtils.clamp(desiredPhi+dy*.004,.38,1.45);stopTour()});
function release(e,cancel){const p=pointers.get(e.pointerId);if(!p)return;const tap=!cancel&&!gestureMoved&&pointers.size===1&&Math.hypot(e.clientX-p.sx,e.clientY-p.sy)<7;pointers.delete(e.pointerId);lastPinch=pinchDistance();if(!pointers.size)gestureMoved=false;if(!tap)return;const rect=mount.getBoundingClientRect();const pointer=new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);const ray=new THREE.Raycaster();ray.setFromCamera(pointer,autotour?cityLife.perspective:camera);const hit=ray.intersectObjects(interact,false)[0];if(hit?.object.userData.project)openProject(hit.object.userData.project)}
mount.addEventListener("pointermove",e=>{if(e.pointerType==="touch"||pointers.size)return;const rect=mount.getBoundingClientRect();const pointer=new THREE.Vector2((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);const ray=new THREE.Raycaster();ray.setFromCamera(pointer,autotour?cityLife.perspective:camera);const hits=ray.intersectObject(entranceHit,false);setSubwayHover(hits.length>0)});
mount.addEventListener("pointerleave",()=>setSubwayHover(false));
subwayHoverCard.addEventListener("click",()=>openProject("subway"));
mount.addEventListener("pointerup",e=>release(e,false));mount.addEventListener("pointercancel",e=>release(e,true));mount.addEventListener("lostpointercapture",e=>release(e,true));
mount.addEventListener("wheel",e=>{e.preventDefault();zoom(Math.sign(e.deltaY)*3);stopTour()},{passive:false});
const rot=n=>{desiredTheta+=n;stopTour()};
document.getElementById("rotateLeft").onclick=()=>rot(-.25);document.getElementById("rotateRight").onclick=()=>rot(.25);
document.getElementById("zoomIn").onclick=()=>{zoom(-6);stopTour()};document.getElementById("zoomOut").onclick=()=>{zoom(6);stopTour()};
document.getElementById("reset").onclick=()=>{target.set(0,3,0);desiredTheta=Math.PI/4;desiredPhi=.97;desiredRadius=77;desiredZoom=1;arrivalGlow.visible=false;arrivalPrompt.hidden=true;stopTour()};
document.getElementById("tour").onclick=()=>{autotour=!autotour;walkingProgress=0;cityLife.resetTour();document.getElementById("tour").textContent=autotour?"EXIT WALKING TOUR ↩":"START CITY TOUR ↗"};
document.getElementById("help").onclick=()=>{const toast=document.getElementById("toast");toast.textContent="Drag to orbit · Pinch or scroll to zoom · Tap gold buildings to explore";setTimeout(()=>toast.textContent="",5500)};
document.getElementById("sound").onclick=()=>{const toast=document.getElementById("toast");toast.textContent="Sound is off by design";setTimeout(()=>toast.textContent="",2500)};
const worldPos=new THREE.Vector3(),clock=new THREE.Clock();function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.05);frame++;if(autotour&&!dialog.open){walkingProgress+=dt/cityLife.tourStepDuration(walkingProgress);if(walkingProgress>=cityLife.routeLength){walkingProgress=0;cityLife.resetTour()}}mainRotor.rotation.y+=dt*11;tailRotor.rotation.x+=dt*17;if(arrivalGlow.visible){arrivalGlow.material.opacity=.55+.35*Math.sin(clock.elapsedTime*4);arrivalGlow.rotation.z+=dt*.25}cameraUpdate(dt);updateLighting(dt);const tourCamera=cityLife.update(clock.elapsedTime,autotour,walkingProgress,dt);const activeCamera=tourCamera||camera;
if(subwayHovered){const p=new THREE.Vector3(-1,4.5,14.5).project(activeCamera);subwayHoverCard.style.left=(p.x*.5+.5)*mount.clientWidth+"px";subwayHoverCard.style.top=(-p.y*.5+.5)*mount.clientHeight+"px"}
for(const label of labels){const p=points[label.dataset.project];worldPos.copy(p).project(activeCamera);label.style.left=(worldPos.x*.5+.5)*mount.clientWidth+"px";label.style.top=(-worldPos.y*.5+.5)*mount.clientHeight+"px";label.style.display=worldPos.z>1?"none":"block"}for(const {el,f} of landmarkButtons){worldPos.copy(f.position).project(activeCamera);el.style.left=(worldPos.x*.5+.5)*mount.clientWidth+"px";el.style.top=(-worldPos.y*.5+.5)*mount.clientHeight+"px";el.style.display=(autotour||worldPos.z>1||worldPos.x < -1||worldPos.x>1||worldPos.y < -1||worldPos.y>1)?"none":"block"}renderer.render(scene,activeCamera)}animate();document.getElementById("loading").remove();