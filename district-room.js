import * as THREE from "https://esm.sh/three@0.170.0";
const room=new URLSearchParams(location.search).get("room")||"about";
const safe=["about","services","ai","contact"].includes(room)?room:"about";
const configs={
 about:{title:"THE PERSONAL GALLERY",kicker:"01 / ABOUT",subtitle:"A little about the engineer behind the city",wall:"#e5d5b6",floor:"#b78e65",accent:"#d5a82f"},
 services:{title:"SPACE RESERVED",kicker:"03 / SERVICES",subtitle:"A new district is being designed. Explore the room for now.",wall:"#e3ddd0",floor:"#aaa89d",accent:"#d8ad59"},
 ai:{title:"THE INNOVATION LAB",kicker:"04 / AI LAB",subtitle:"Ideas, experiments, learning and AI Field Notes",wall:"#b8d0d5",floor:"#607e89",accent:"#63c5e7"},
 contact:{title:"COFFEE & CONNECTIONS",kicker:"05 / CONTACT",subtitle:"Four tables. Endless conversations. Welcome to my NYC café.",wall:"#dbc6a9",floor:"#8b694e",accent:"#a4b78a"}
};
const cfg=configs[safe];document.title=cfg.title+" · Vijay Sekhar Reddy";
document.getElementById("districtKicker").textContent=cfg.kicker;
document.getElementById("districtTitle").textContent=cfg.title;
document.getElementById("districtSubtitle").textContent=cfg.subtitle;
const scene=new THREE.Scene();scene.background=new THREE.Color(cfg.wall);
const camera=new THREE.PerspectiveCamera(48,1,.1,150),renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:"high-performance"});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.shadowMap.enabled=true;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.65;
const root=document.getElementById("districtScene");root.append(renderer.domElement);
scene.add(new THREE.HemisphereLight("#fff9e7","#61717c",2.6));const sun=new THREE.DirectionalLight("#fff1c8",2.5);sun.position.set(-8,16,9);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);scene.add(sun);
const mat=(c)=>new THREE.MeshStandardMaterial({color:c,roughness:.72}),wall=mat(cfg.wall),floor=mat(cfg.floor),trim=mat("#f6e8c9"),dark=mat("#253541"),accent=mat(cfg.accent),glass=mat("#8abecb");
const clickable=[];
function box(w,h,d,m,x,y,z,parent=scene){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
function cyl(rt,rb,h,m,x,y,z){const o=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,24),m);o.position.set(x,y,z);o.castShadow=true;scene.add(o);return o}
function plaque(title,sub,x,y,z,action){
 const c=document.createElement("canvas");c.width=768;c.height=360;const ctx=c.getContext("2d");ctx.fillStyle="#fff8e6";ctx.fillRect(0,0,768,360);ctx.strokeStyle="#c9a04d";ctx.lineWidth=12;ctx.strokeRect(8,8,752,344);ctx.fillStyle="#253541";ctx.textAlign="center";ctx.font="bold 44px sans-serif";ctx.fillText(title,384,151);ctx.font="27px sans-serif";ctx.fillText(sub,384,215);
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;const mesh=new THREE.Mesh(new THREE.PlaneGeometry(3.7,1.74),new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide}));mesh.position.set(x,y,z);scene.add(mesh);mesh.userData.action=action;clickable.push(mesh);return mesh
}
box(24,.5,20,floor,0,-.25,0);box(24,8,.4,wall,0,4,-10);box(.4,8,20,wall,-12,4,0);box(.4,8,20,wall,12,4,0);/* Open-front cutaway: no opaque roof, so visitors can see into the room. */box(24,.18,.28,trim,0,.2,-9.7);
for(let x=-8;x<=8;x+=8){const l=new THREE.PointLight("#ffe7b8",18,11);l.position.set(x,7.4,0);scene.add(l);cyl(.65,.65,.12,accent,x,7.8,0)}
const content={
 story:{k:"ABOUT / STORY",t:"The Engineer Behind the City",html:"<p>I'm Vijay Sekhar Reddy, a software quality engineering leader with experience across financial services, banking and healthcare.</p><p>I enjoy building reliable systems, practical automation tools and creative experiences like this miniature NYC.</p>"},
 journey:{k:"ABOUT / CAREER",t:"Career Journey",html:"<p>My professional experience includes Cognizant, with engineering work for LPL Financial, and projects in banking and healthcare.</p><p>My focus spans quality strategy, cloud migrations, test automation, data validation and engineering leadership.</p><p>More detailed career milestones will be added after verification.</p>"},
 credentials:{k:"ABOUT / LEARNING",t:"Credentials & Recognition",html:"<p>Certifications shared for this portfolio include OpenAI Technical Practitioner, ChatGPT Solutions Practitioner, Codex Solutions Practitioner, Introduction to Artificial Intelligence, and Learning Cloud Computing: Core Concepts.</p><p>Recognition includes Super Techie, Performer of the Year, Associate of the Month (August 2025), and Star of the Month (April 2026).</p><p>Verification links and official badge artwork will be added only after their credentials are confirmed.</p>"},
 personal:{k:"ABOUT / BEYOND WORK",t:"Curiosity & New York",html:"<p>Exploring New York, trying new recipes, traveling, and experimenting with emerging technologies are all part of what inspired this city.</p>"},
 experiments:{k:"AI / EXPERIMENTS",t:"Engineering Experiments",html:"<p>Exploring AI-assisted quality engineering, Playwright automation, element discovery and practical engineering tools.</p>"},
 writing:{k:"AI / WRITING",t:"AI Field Notes",html:'<p>Notes on AI tools, engineering and learning.</p><p><a href="https://aiinsights80.wordpress.com/" target="_blank" rel="noopener">Explore AI Field Notes ↗</a></p>'},
 learning:{k:"AI / LEARNING",t:"Continuous Learning",html:"<p>Experimenting with modern AI tools and workflows, from automation assistants to model context protocols.</p>"},
 email:{k:"CONTACT / EMAIL",t:"Leave Me a Note",html:'<p>Ideas, collaborations or just saying hello — my inbox is open.</p><p><a href="mailto:vijay.sekhar18@gmail.com?subject=Hello%20from%20your%20NYC%20Portfolio">✉ vijay.sekhar18@gmail.com ↗</a></p>'},
 phone:{k:"CONTACT / PHONE",t:"Give Me a Ring",html:'<p>Prefer a direct conversation?</p><p><a href="tel:+17744860732">☎ 774-486-0732</a></p>'},
 location:{k:"CONTACT / LOCATION",t:"Working in New York",html:'<p>📍 New York, NY · Work location</p><p>Inspired by the energy, architecture and creative spirit of the city.</p><p>Exact office address is intentionally private.</p>'},
 menu:{k:"THE CONNECTION MENU",t:"What Can I Brew for You?",html:'<div class="coffee-menu"><a href="mailto:vijay.sekhar18@gmail.com?subject=Quick%20Hello%20from%20your%20NYC%20Portfolio"><strong>☕ ESPRESSO</strong><span>Quick hello ↗</span></a><a href="mailto:vijay.sekhar18@gmail.com?subject=Let%27s%20Collaborate"><strong>☕ CAPPUCCINO</strong><span>Discuss a project ↗</span></a><a href="https://www.linkedin.com/in/vijaygopireddy/" target="_blank" rel="noopener noreferrer"><strong>☕ COLD BREW</strong><span>Connect on LinkedIn ↗</span></a></div>'},
 linkedin:{k:"CONTACT / CONNECT",t:"Find Me on LinkedIn",html:'<p><a href="https://www.linkedin.com/in/vijaygopireddy/" target="_blank" rel="noopener">Visit LinkedIn ↗</a></p>'},
 coffee:{k:"CONTACT / NYC",t:"Coffee & Conversation",html:"<p>This is a virtual coffee lounge for conversations, ideas and collaborations. Thanks for visiting the city!</p>"}
};
// Reusable low-poly furniture, built from shared materials and simple geometry.
function chair(x,z,rotation=0,upholstery=accent){
 const g=new THREE.Group();scene.add(g);g.position.set(x,0,z);g.rotation.y=rotation;
 box(1.1,.18,1.1,upholstery,0,1.04,0,g);box(1.1,1.05,.16,upholstery,0,1.62,-.49,g);
 for(const px of [-.43,.43])for(const pz of [-.43,.43])box(.12,.99,.12,dark,px,.51,pz,g);
 return g
}
function cafeTable(x,z){cyl(1.12,1.12,.13,trim,x,1.36,z);cyl(.13,.13,1.3,dark,x,.7,z);cyl(.65,.65,.08,dark,x,.06,z)}
function lamp(x,z){cyl(.5,.8,.55,accent,x,5.75,z);cyl(.06,.06,1.1,dark,x,6.65,z)}
function planter(x,z){cyl(.53,.39,.9,trim,x,.45,z);cyl(.12,.18,1.35,dark,x,1.25,z);for(let i=0;i<6;i++){const leaf=new THREE.Mesh(new THREE.SphereGeometry(.45,8,6),mat("#4d8764"));leaf.position.set(x+Math.sin(i*2.4)*.48,1.95+Math.cos(i*1.8)*.2,z+Math.cos(i*2.4)*.48);scene.add(leaf)}}
function pictureFrame(x,y,z,w=2.5,h=1.6){box(w+.18,h+.18,.18,dark,x,y,z);box(w,h,.19,trim,x,y,z+.11)}
function monitor(x,y,z){box(2.3,1.5,.2,dark,x,y,z);box(2,.98,.22,glass,x,y,z+.13);box(.15,.75,.15,dark,x,y-1.1,z)}

/* Contact café — lightweight custom-built 3D props; no heavy external models. */
const brass=mat("#c7a16c"),wood=mat("#785039"),cream=mat("#f1dfbd"),coffee=mat("#51301f"),blue=mat("#1766a4"),green=mat("#527a59"),gold=mat("#e4b65d");
function textSign(title,subtitle,x,y,z,w=3.7,h=1.2,colors={bg:"#1d343b",fg:"#fff2ce",edge:"#d9ad65"},action=null){
 const c=document.createElement("canvas");c.width=1024;c.height=400;const g=c.getContext("2d");
 g.fillStyle=colors.bg;g.fillRect(0,0,1024,400);g.strokeStyle=colors.edge;g.lineWidth=20;g.strokeRect(15,15,994,370);
 g.textAlign="center";g.fillStyle=colors.fg;g.font="bold 76px sans-serif";g.fillText(title,512,181,940);g.font="36px sans-serif";g.fillText(subtitle,512,275,930);
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;
 const o=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide}));o.position.set(x,y,z);scene.add(o);
 if(action){o.userData.action=action;clickable.push(o)}return o
}
function clickableProp(obj,action){obj.userData.action=action;clickable.push(obj);return obj}
function mug(x,y,z){const m=new THREE.Mesh(new THREE.CylinderGeometry(.24,.21,.36,20),cream);m.position.set(x,y,z);scene.add(m);cyl(.19,.19,.015,coffee,x,y+.185,z);const handle=new THREE.Mesh(new THREE.TorusGeometry(.16,.045,7,18,Math.PI*1.65),cream);handle.position.set(x+.24,y,z);scene.add(handle);return m}
function tableScene(x,z,kind,label){
 cafeTable(x,z);chair(x-1.75,z,Math.PI/2,wood);chair(x+1.75,z,-Math.PI/2,wood);
 cyl(.92,.92,.025,wood,x,1.45,z);
 mug(x-.55,1.75,z+.38);
 let item;
 if(kind==="linkedin"){
  item=box(.95,.68,.07,dark,x,1.95,z-.35);box(.88,.55,.075,blue,x,1.96,z-.29);
  const keyboard=box(1.08,.055,.66,trim,x,1.52,z+.08);keyboard.rotation.x=.12;
  textSign("in","LET'S CONNECT",x,2.01,z-.239,.65,.42,{bg:"#12649c",fg:"#ffffff",edge:"#12649c"},kind);
 }else if(kind==="email"){
  item=box(1.25,.07,.76,cream,x,1.53,z-.25);
  const seal=box(.3,.015,.25,gold,x,1.58,z-.24);seal.rotation.y=Math.PI/4;
  textSign("✉","SEND A NOTE",x,1.65,z+.18,1.12,.46,{bg:"#efe1c8",fg:"#513c2c",edge:"#c8a77e"},kind);
 }else if(kind==="phone"){
  item=box(1.18,.23,.69,dark,x,1.58,z-.28);
  const handset=cyl(.15,.15,1.02,brass,x,1.86,z-.28);handset.rotation.z=Math.PI/2;
  for(let i=0;i<3;i++)for(let j=0;j<3;j++)cyl(.055,.055,.02,cream,x-.24+i*.24,1.71,z-.52+j*.21);
 }else{
  item=cyl(.55,.68,.08,green,x,1.54,z-.22);
  const skyline=box(.76,.3,.15,blue,x,1.77,z-.22);
  for(let i=0;i<5;i++)box(.1,.18+i%3*.13,.12,brass,x-.3+i*.15,2.02+(i%3*.13)/2,z-.22);
 }
 clickableProp(item,kind);
 textSign(label,"CLICK TO EXPLORE",x,2.95,z-.68,2.4,.7,{bg:"#2c4143",fg:"#fbe8c2",edge:"#c69d5e"},kind);
}
function libertySculpture(x,z){
 const pedestal=box(1.1,.75,1.1,brass,x,1.85,z);
 const robe=cyl(.19,.5,1.45,green,x,2.95,z);
 const head=new THREE.Mesh(new THREE.SphereGeometry(.22,12,10),green);head.position.set(x,3.82,z);scene.add(head);
 for(let i=0;i<7;i++){const a=i*Math.PI*2/7;const ray=box(.065,.33,.07,green,x+Math.cos(a)*.29,4.08,z+Math.sin(a)*.29);ray.rotation.z=-Math.cos(a)*.35}
 const arm=box(.14,.86,.14,green,x+.33,3.75,z);arm.rotation.z=-.22;
 const torch=cyl(.10,.13,.24,brass,x+.42,4.33,z);const flame=new THREE.Mesh(new THREE.ConeGeometry(.16,.4,8),gold);flame.position.set(x+.42,4.59,z);scene.add(flame);
 textSign("LIBERTY","NYC, ALWAYS",x,1.42,z+.59,1.45,.5,{bg:"#f1e2c6",fg:"#405d53",edge:"#bd9e6b"});
}

if(safe==="about"){
 box(11,.5,3.2,trim,0,.45,-7.7);for(let x of [-8,0,8]){box(3.8,3,.2,dark,x,3,-9.45)}
 plaque("MY STORY","Engineering & imagination",-8,3,-9.27,"story");plaque("MY JOURNEY","Career and experience",0,3,-9.27,"journey");plaque("CREDENTIALS","Learning & recognition",8,3,-9.27,"credentials");plaque("BEYOND WORK","Curiosity and NYC",0,2,2.5,"personal");box(6,.35,3,trim,0,.55,3.5);cyl(.65,.65,1.6,accent,-7,.8,5);cyl(.65,.65,1.6,accent,7,.8,5);for(const x of [-8,0,8]){pictureFrame(x,5.9,-9.45,3.4,1.2)}chair(-4,4,.45);chair(4,4,-.45);planter(-10,5);planter(10,5)
}else if(safe==="services"){
 plaque("COMING SOON","A space for future ideas",0,3,-9.27,null);planter(-9,4);planter(9,4);for(let x of [-7,7]){cyl(1,1,1.2,trim,x,.6,-5);box(2,1.2,2,accent,x,1.8,-5)}
}else if(safe==="ai"){
 for(let x of [-7,0,7]){box(4.4,2.8,.35,dark,x,3,-9.3);box(4.6,.2,1.5,trim,x,.8,-8.5)}
 plaque("AI EXPERIMENTS","Tools and prototypes",-7,3,-9.05,"experiments");plaque("AI FIELD NOTES","Writing and ideas",0,3,-9.05,"writing");plaque("LEARNING LAB","What's next?",7,3,-9.05,"learning");
 for(let x of [-6,6]){box(4,.25,2,trim,x,.8,1);box(.3,1.2,.3,dark,x-1.5,.1,1);box(.3,1.2,.3,dark,x+1.5,.1,1);monitor(x,2,0.5);chair(x,3,Math.PI);box(1.2,3.8,1.3,dark,x,2,-6);for(let y of [1,2,3])box(.8,.13,.1,accent,x,y,-5.28)}planter(10,5)
}else{
 // Four generously spaced contact stations: all props are real raycast targets.
 tableScene(-6.8,1,"linkedin","LINKEDIN");
 tableScene(6.8,1,"email","EMAIL");
 tableScene(-6.8,5.9,"phone","PHONE");
 tableScene(6.8,5.9,"location","NEW YORK");
 for(const x of [-10.5,10.5])planter(x,7.6);
 // Espresso counter, metallic trims, menu and a small hand-built Liberty sculpture.
 box(10.4,1.25,2.15,wood,0,.64,-7.65);box(10.8,.18,2.45,cream,0,1.36,-7.65);
 for(let x=-4.6;x<=4.6;x+=.75)box(.035,.95,.07,brass,x,.68,-6.54);
 box(2.3,1.65,1.3,dark,3.2,2.26,-8.18);box(1.55,.68,.08,glass,3.2,2.46,-7.47);
 for(let x of [-2.6,-1.8,-1])mug(x,1.72,-7.1);
 libertySculpture(-4.1,-8.1);
 const order=box(1.8,.14,1.15,brass,0,1.55,-7.1);clickableProp(order,"menu");
 textSign("ORDER HERE","PICK YOUR COFFEE",0,2.5,-7.25,3.15,.8,{bg:"#f3e1bf",fg:"#543c2a",edge:"#bb8d56"},"menu");
 // Warm illuminated wall composition and framed prints.
 textSign("HELLO, WORLD!","GOOD CONVERSATIONS START HERE",-5.8,5.25,-9.73,10,1.9,{bg:"#283e41",fg:"#ffd48d",edge:"#c9a16b"});
 textSign("in  LINKEDIN","LET'S CONNECT",4.8,5.25,-9.73,7,1.9,{bg:"#155b92",fg:"#ffffff",edge:"#9dc9e4"},"linkedin");
 textSign("IDEAS BREW HERE","COFFEE  ·  CODE  ·  CURIOSITY",0,3.7,-9.73,6.4,.95,{bg:"#e9d4b1",fg:"#513e2f",edge:"#b99661"});
 for(const x of [-8,0,8]){lamp(x,2);const bulb=new THREE.PointLight("#ffce86",7,6);bulb.position.set(x,5.65,2);scene.add(bulb)}
 // Window-like architectural panels and Manhattan-inspired wall silhouettes.
 for(const x of [-11.75,11.75]){for(let z=-7;z<=6;z+=4){box(.08,3.5,2.4,dark,x,4,z);box(.10,3.1,2.05,glass,x+Math.sign(x)*.04,4,z)}}

}
const dialog=document.getElementById("districtDialog");
function openDetail(key){const d=content[key];if(!d)return;document.getElementById("districtDetailKicker").textContent=d.k;document.getElementById("districtDetailTitle").textContent=d.t;document.getElementById("districtDetailBody").innerHTML=d.html;dialog.showModal()}
document.getElementById("districtClose").onclick=()=>dialog.close();
const map=document.getElementById("districtNav"),mapButton=document.getElementById("districtMap");mapButton.onclick=()=>{map.hidden=!map.hidden;mapButton.setAttribute("aria-expanded",String(!map.hidden))};
let theta=.12,phi=1.38,radius=20,desiredTheta=theta,desiredPhi=phi,desiredRadius=radius;
const target=new THREE.Vector3(0,2.6,-3.4);
function update(){theta+=(desiredTheta-theta)*.12;phi+=(desiredPhi-phi)*.12;radius+=(desiredRadius-radius)*.12;camera.position.set(target.x+radius*Math.sin(phi)*Math.sin(theta),target.y+radius*Math.cos(phi),target.z+radius*Math.sin(phi)*Math.cos(theta));camera.lookAt(target)}
function resize(){const mobile=root.clientWidth<600;camera.aspect=root.clientWidth/root.clientHeight;camera.fov=mobile?62:48;if(mobile&&desiredRadius<28){desiredRadius=30;radius=30}else if(!mobile&&desiredRadius>35){desiredRadius=22;radius=22}camera.updateProjectionMatrix();renderer.setSize(root.clientWidth,root.clientHeight,false)}window.addEventListener("resize",resize);resize();
let drag=null,moved=false;renderer.domElement.addEventListener("pointerdown",e=>{drag={x:e.clientX,y:e.clientY};moved=false;renderer.domElement.setPointerCapture(e.pointerId)});
renderer.domElement.addEventListener("pointermove",e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(dx)+Math.abs(dy)>3)moved=true;desiredTheta-=dx*.006;desiredPhi=THREE.MathUtils.clamp(desiredPhi+dy*.005,.4,1.65);drag={x:e.clientX,y:e.clientY}});
renderer.domElement.addEventListener("pointerup",e=>{if(!moved){const p=new THREE.Vector2(e.clientX/root.clientWidth*2-1,-e.clientY/root.clientHeight*2+1);const ray=new THREE.Raycaster();ray.setFromCamera(p,camera);const hit=ray.intersectObjects(clickable)[0];if(hit?.object.userData.action)openDetail(hit.object.userData.action)}drag=null});
renderer.domElement.addEventListener("pointercancel",()=>drag=null);
renderer.domElement.addEventListener("pointermove",e=>{if(drag)return;const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2(e.clientX/root.clientWidth*2-1,-e.clientY/root.clientHeight*2+1),camera);renderer.domElement.style.cursor=ray.intersectObjects(clickable).length?"pointer":"grab"});
renderer.domElement.addEventListener("wheel",e=>{e.preventDefault();desiredRadius=THREE.MathUtils.clamp(desiredRadius+Math.sign(e.deltaY)*1.3,10,60)},{passive:false});
document.getElementById("districtReset").onclick=()=>{desiredTheta=.12;desiredPhi=1.38;desiredRadius=root.clientWidth<600?30:20};
function animate(){requestAnimationFrame(animate);update();renderer.render(scene,camera)}animate();