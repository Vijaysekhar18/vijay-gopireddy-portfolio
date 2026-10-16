import * as THREE from "https://esm.sh/three@0.170.0";
const room=new URLSearchParams(location.search).get("room")||"about";
const safe=["about","services","ai","contact"].includes(room)?room:"about";
const configs={
 about:{title:"THE PERSONAL GALLERY",kicker:"01 / ABOUT",subtitle:"A little about the engineer behind the city",wall:"#e5d5b6",floor:"#b78e65",accent:"#d5a82f"},
 services:{title:"SPACE RESERVED",kicker:"03 / SERVICES",subtitle:"A new district is being designed. Explore the room for now.",wall:"#e3ddd0",floor:"#aaa89d",accent:"#d8ad59"},
 ai:{title:"THE INNOVATION LAB",kicker:"04 / AI LAB",subtitle:"Ideas, experiments, learning and AI Field Notes",wall:"#b8d0d5",floor:"#607e89",accent:"#63c5e7"},
 contact:{title:"THE COFFEE LOUNGE",kicker:"05 / CONTACT",subtitle:"A place to connect, collaborate, and share ideas",wall:"#dbc6a9",floor:"#8b694e",accent:"#a4b78a"}
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
 email:{k:"CONTACT / HELLO",t:"Start a Conversation",html:'<p>Interested in engineering, AI, creative technology or a good NYC conversation?</p><p><a href="mailto:vijay.shekar18@gmail.com">Send an email ↗</a></p>'},
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
 for(const x of [-7,0,7]){cafeTable(x,1);chair(x-1.8,1,Math.PI/2);chair(x+1.8,1,-Math.PI/2);lamp(x,1)}for(const x of [-8,8]){cafeTable(x,5);chair(x,7,Math.PI)}planter(-10,7);planter(10,7)
 box(9,1.3,2.1,trim,0,.65,-7.5);box(9,.2,2.3,accent,0,1.4,-7.5);for(const x of [-3,0,3]){chair(x,-5.1,Math.PI,trim)}for(const x of [-3.2,-2.3,-1.4]){cyl(.2,.2,.3,dark,x,1.7,-7.6);cyl(.15,.15,.12,accent,x,1.92,-7.6)}box(2.1,1.7,1.4,dark,3,2.3,-8.2);box(1.3,.7,.1,glass,3,2.5,-7.45);
 plaque("SAY HELLO","Email", -7,3,-9.27,"email");plaque("LINKEDIN","Connect",0,3,-9.27,"linkedin");plaque("COFFEE CHAT","Ideas and collaboration",7,3,-9.27,"coffee")
}
const dialog=document.getElementById("districtDialog");
function openDetail(key){const d=content[key];if(!d)return;document.getElementById("districtDetailKicker").textContent=d.k;document.getElementById("districtDetailTitle").textContent=d.t;document.getElementById("districtDetailBody").innerHTML=d.html;dialog.showModal()}
document.getElementById("districtClose").onclick=()=>dialog.close();
const map=document.getElementById("districtNav"),mapButton=document.getElementById("districtMap");mapButton.onclick=()=>{map.hidden=!map.hidden;mapButton.setAttribute("aria-expanded",String(!map.hidden))};
let theta=.12,phi=1.38,radius=20,desiredTheta=theta,desiredPhi=phi,desiredRadius=radius;
const target=new THREE.Vector3(0,2.6,-3.4);
function update(){theta+=(desiredTheta-theta)*.12;phi+=(desiredPhi-phi)*.12;radius+=(desiredRadius-radius)*.12;camera.position.set(target.x+radius*Math.sin(phi)*Math.sin(theta),target.y+radius*Math.cos(phi),target.z+radius*Math.sin(phi)*Math.cos(theta));camera.lookAt(target)}
function resize(){camera.aspect=root.clientWidth/root.clientHeight;camera.updateProjectionMatrix();renderer.setSize(root.clientWidth,root.clientHeight,false)}window.addEventListener("resize",resize);resize();
let drag=null,moved=false;renderer.domElement.addEventListener("pointerdown",e=>{drag={x:e.clientX,y:e.clientY};moved=false;renderer.domElement.setPointerCapture(e.pointerId)});
renderer.domElement.addEventListener("pointermove",e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(dx)+Math.abs(dy)>3)moved=true;desiredTheta-=dx*.006;desiredPhi=THREE.MathUtils.clamp(desiredPhi+dy*.005,.4,1.65);drag={x:e.clientX,y:e.clientY}});
renderer.domElement.addEventListener("pointerup",e=>{if(!moved){const p=new THREE.Vector2(e.clientX/root.clientWidth*2-1,-e.clientY/root.clientHeight*2+1);const ray=new THREE.Raycaster();ray.setFromCamera(p,camera);const hit=ray.intersectObjects(clickable)[0];if(hit?.object.userData.action)openDetail(hit.object.userData.action)}drag=null});
renderer.domElement.addEventListener("pointercancel",()=>drag=null);
renderer.domElement.addEventListener("wheel",e=>{e.preventDefault();desiredRadius=THREE.MathUtils.clamp(desiredRadius+Math.sign(e.deltaY)*1.3,10,34)},{passive:false});
document.getElementById("districtReset").onclick=()=>{desiredTheta=.12;desiredPhi=1.38;desiredRadius=20};
function animate(){requestAnimationFrame(animate);update();renderer.render(scene,camera)}animate();