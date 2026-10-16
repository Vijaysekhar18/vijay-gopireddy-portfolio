import * as THREE from "https://esm.sh/three@0.170.0";
const room=new URLSearchParams(location.search).get("room")||"about";
const safe=["about","services","ai","contact"].includes(room)?room:"about";
const configs={
 about:{title:"THE STORY STATION",kicker:"01 / ABOUT",subtitle:"VSR Express · Four stops through a life of curiosity and engineering",wall:"#e5d5b6",floor:"#b78e65",accent:"#d5a82f"},
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
 story:{k:"ABOUT / THE PERSON",t:"Engineer. Explorer. Builder.",html:"<p>I'm Vijay Sekhar Reddy, a software engineer and quality engineering leader with a master's degree in computer science and experience across banking, financial services and healthcare.</p><p>I love turning complicated engineering challenges into practical tools, reliable systems and memorable experiences. This miniature NYC is one of those experiments.</p><p>My curiosity doesn't stop at work: I enjoy travel, experimenting with vegetarian recipes and exploring new technologies.</p>"},
 journey:{k:"ABOUT / THE JOURNEY",t:"From Hyderabad to New York",html:"<p><strong>HYDERABAD → NEW YORK</strong></p><p>My story connects Hyderabad, where my roots are, with the New York area, where I've built a new chapter in my engineering career.</p><p>My professional experience includes TD Bank (current chapter), LPL Financial, DBS, Wells Fargo and Cognizant, across quality strategy, cloud technology, test automation and engineering delivery.</p><p>Explore the WORK Studio for company-specific details.</p><p><a href='work.html'>Visit the WORK Studio ↗</a></p>"},
 credentials:{k:"ABOUT / MILESTONES",t:"Recognition & Continuous Learning",html:"<p><strong>RECOGNITION</strong></p><p>Super Techie · Performer of the Year · Associate of the Month (August 2025) · Star of the Month (April 2026).</p><p><strong>LEARNING</strong></p><p>OpenAI Technical Practitioner · ChatGPT Solutions Practitioner · Codex Solutions Practitioner · Introduction to Artificial Intelligence · Learning Cloud Computing: Core Concepts.</p><p>These are credentials shared for this portfolio; verification links and official badge art can be added once confirmed.</p>"},
 personal:{k:"ABOUT / OUTSIDE THE SCREEN",t:"Curiosity Has No Off Switch",html:"<p>When I'm not building software, I enjoy exploring cities, long drives, badminton, swimming and trying new vegetarian dishes—from pasta and Korean-inspired cooking to whatever recipe is trending.</p><p>I've tried scuba diving, love discovering new places, and have a personal goal of trying solo skydiving someday.</p><p>Travel, food, learning and a willingness to try something unfamiliar all influence how I approach engineering.</p>"},
 openai:{k:"AI / OPENAI",t:"OpenAI Learning Collection",html:"<p><strong>Completed credentials</strong></p><p>OpenAI Technical Practitioner · ChatGPT Solutions Practitioner · Codex Solutions Practitioner.</p><p>Verification links can be added when supplied. This is an original collectible, not an official OpenAI badge.</p>"},
 claude:{k:"AI / ANTHROPIC",t:"Claude Learning Journey",html:"<p>Exploration and learning involving Claude, Claude Code, Model Context Protocol (MCP), and AI-assisted engineering.</p><p>Individual course completions and official credentials will be listed after confirmation. Claude Certified Architect — Foundations has been a learning goal, not a claimed completed certification.</p>"},
 hackathon:{k:"AI / EVENTS",t:"Cognizant Vibe Coding Hackathon",html:"<p>A place to document the Cognizant Vibe Coding Hackathon experience.</p><p>Project, participation status and any recognition will be added after details are confirmed. No award or placement is claimed here.</p>"},
 innovation:{k:"AI / BUILDING",t:"Engineering Innovations",html:"<p>Explore my API Migration Testing Tool for comparing old and new API responses across hundreds of combinations, and my AI-assisted XPath Extractor for element discovery.</p><p>Public demonstrations will use synthetic data and won't expose client systems.</p>"},
 experiments:{k:"AI / EXPERIMENTS",t:"Engineering Experiments",html:"<p>Exploring AI-assisted quality engineering, Playwright automation, element discovery and practical engineering tools.</p>"},
 writing:{k:"AI / WRITING",t:"AI Field Notes",html:'<p>Notes on AI tools, engineering and learning.</p><p><a href="https://aiinsights80.wordpress.com/" target="_blank" rel="noopener">Explore AI Field Notes ↗</a></p>'},
 learning:{k:"AI / LEARNING",t:"Continuous Learning",html:"<p>Experimenting with modern AI tools and workflows, from automation assistants to model context protocols.</p>"},
 email:{k:"CONTACT / EMAIL",t:"Leave Me a Note",html:'<p>Ideas, collaborations or just saying hello — my inbox is open.</p><p><a href="mailto:vijay.shekar18@gmail.com?subject=Hello%20from%20your%20NYC%20Portfolio">✉ vijay.shekar18@gmail.com ↗</a></p>'},
 phone:{k:"CONTACT / PHONE",t:"Give Me a Ring",html:'<p>Prefer a direct conversation?</p><p><a href="tel:+17744860732">☎ 774-486-0732</a></p>'},
 location:{k:"CONTACT / LOCATION",t:"Working in New York",html:'<p>📍 New York, NY · Work location</p><p>Inspired by the energy, architecture and creative spirit of the city.</p><p>Exact office address is intentionally private.</p>'},
 menu:{k:"THE CONNECTION MENU",t:"What Can I Brew for You?",html:'<div class="coffee-menu"><a href="mailto:vijay.shekar18@gmail.com?subject=Quick%20Hello%20from%20your%20NYC%20Portfolio"><strong>☕ ESPRESSO</strong><span>Quick hello ↗</span></a><a href="mailto:vijay.shekar18@gmail.com?subject=Let%27s%20Collaborate"><strong>☕ CAPPUCCINO</strong><span>Discuss a project ↗</span></a><a href="https://www.linkedin.com/in/vijaygopireddy/" target="_blank" rel="noopener noreferrer"><strong>☕ COLD BREW</strong><span>Connect on LinkedIn ↗</span></a></div>'},
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
 // Red-and-silver express train, inspired by the reference's sleek profile.
 // This is an original interactive Three.js model, not a pasted background image.
 const ivory=mat("#e9dfca"),blue=mat("#123c68"),gold=mat("#d4a35e"),steel=mat("#b9c4c9");
 const charcoal=mat("#20303b"),red=new THREE.MeshStandardMaterial({color:"#dd2735",metalness:.3,roughness:.32});
 const chrome=new THREE.MeshStandardMaterial({color:"#d8e1e5",metalness:.73,roughness:.21});
 const windowGlass=new THREE.MeshStandardMaterial({color:"#31576d",metalness:.34,roughness:.25,transparent:true,opacity:.9});
 // Platform tilework and blue mosaic band.
 for(let y=.42;y<7.85;y+=.68)for(let x=-11.45;x<11.5;x+=1.2){
  box(1.15,.63,.045,ivory,x+((Math.round(y*10)%2)*.35),y,-9.72);
 }
 for(let x=-11.2;x<=11.2;x+=.38){box(.33,.29,.06,Math.round(x*7)%3?blue:gold,x,6.02,-9.65)}
 // One prominent, uncluttered VSR EXPRESS sign above the train.
 // Separate high-contrast backing and oversized lettering improve legibility.
 box(16.6,1.68,.18,gold,0,7.03,-9.56);
 box(16.25,1.39,.2,charcoal,0,7.03,-9.41);
 textSign("VSR EXPRESS","",0,7.03,-9.24,15.7,1.24,{bg:"#102c42",fg:"#fffdf3",edge:"#d4a35e"});
 // Black steel girders, station lighting and a readable suspended wayfinding board.
 for(const x of [-10.9,10.9]){box(.37,7.85,.38,charcoal,x,4.05,1.8);for(let y=1;y<7.6;y+=.62)box(.4,.055,.42,gold,x,y,1.8)}
 for(const z of [-7.4,-3.3,1.2,5.2]){
  box(23,.19,.33,charcoal,0,7.97,z);
  for(const x of [-8,0,8]){const light=new THREE.PointLight("#ffe0a5",4.5,10);light.position.set(x,7.6,z);scene.add(light)}
 }
 // Four-window passenger train: brushed silver top, red beltline, dark panoramic glazing.
 const carZ=-4.5,faceZ=carZ+1.05;
 box(21.7,3.72,1.84,chrome,-.25,2.57,carZ);
 box(21.8,.29,1.93,charcoal,-.25,4.56,carZ);
 box(21.8,.18,1.94,steel,-.25,4.38,carZ);
 box(21.8,1.17,1.95,red,-.25,1.29,carZ);
 box(21.8,.27,1.95,charcoal,-.25,.54,carZ);
 box(21.7,.08,1.95,gold,-.25,2.04,carZ);
 // Continuous panoramic dark window band.
 box(21.65,1.8,.07,charcoal,-.25,3.25,faceZ+.02);
 // Four windows, each with its own tappable, high-contrast story display.
 const stops=[
  {x:-8.1,code:"H",name:"MY STORY",sub:"ROOTS & WHAT DRIVES ME",key:"story",color:"#e4af55"},
  {x:-2.8,code:"N",name:"MY JOURNEY",sub:"HYDERABAD → NEW YORK",key:"journey",color:"#7ebcd1"},
  {x:2.5,code:"A",name:"MILESTONES",sub:"AWARDS & GROWTH",key:"credentials",color:"#acd2a0"},
  {x:7.8,code:"X",name:"BEYOND WORK",sub:"TRAVEL · FOOD · CURIOSITY",key:"personal",color:"#e2a08d"}
 ];
 for(const stop of stops){
  box(4.72,1.82,.13,chrome,stop.x,3.27,faceZ+.12);
  box(4.53,1.65,.13,windowGlass,stop.x,3.27,faceZ+.2);
  textSign(stop.name,stop.sub,stop.x,3.25,faceZ+.3,4.32,1.44,{bg:"#17374b",fg:"#fff8e9",edge:stop.color},stop.key);
  // Small route marker above the window.
  textSign(stop.code,"",stop.x,4.31,faceZ+.31,.54,.54,{bg:stop.color,fg:"#203443",edge:"#fff0cf"},stop.key);
 }
 // A streamlined cab nose projects beyond the final window, like the red/white reference.
 const nose=new THREE.Mesh(new THREE.SphereGeometry(1,24,16),chrome);
 nose.scale.set(1.05,1.88,1.03);nose.position.set(11.05,2.57,carZ);scene.add(nose);
 const windshield=new THREE.Mesh(new THREE.SphereGeometry(1,20,12,0,Math.PI),windowGlass);
 windshield.scale.set(.84,1.04,1.05);windshield.rotation.z=-.22;windshield.position.set(11.28,3.38,carZ+.09);scene.add(windshield);
 const redNose=new THREE.Mesh(new THREE.SphereGeometry(1,24,12),red);redNose.scale.set(1.06,.7,1.05);redNose.position.set(11.12,1.33,carZ);scene.add(redNose);
 for(const x of [-9,-6,-3,0,3,6,9]){
  const wheel=new THREE.Mesh(new THREE.CylinderGeometry(.35,.35,.22,24),charcoal);wheel.rotation.x=Math.PI/2;wheel.position.set(x,.33,faceZ);scene.add(wheel)
 }
 // Yellow platform safety strip, tracks and a compact bench.
 box(22.4,.08,.22,gold,0,.1,4.75);
 for(let x=-10.5;x<11;x+=.95)box(.58,.08,1.5,charcoal,x,.04,6.7);
 for(const z of [6.1,7.3])box(22,.08,.11,steel,0,.15,z);
 box(4.1,.23,1.1,mat("#735741"),0,.76,3.35);
 for(const x of [-1.65,1.65])box(.14,.7,.7,charcoal,x,.36,3.35);
 // True NYC-style mosaic station-name signs on opposite side walls.
 function stationMosaic(x,rot,name,detail){
  const group=new THREE.Group();group.position.set(x,4.4,-.65);group.rotation.y=rot;scene.add(group);
  box(6.6,3.05,.14,gold,0,0,0,group);
  box(6.25,2.68,.15,ivory,0,0,.1,group);
  box(5.82,1.72,.16,blue,0,0,.2,group);
  const label=textSign(name,detail,0,0,.35,5.55,1.48,{bg:"#123c68",fg:"#fff5df",edge:"#e3c489"});
  scene.remove(label);group.add(label);label.position.set(0,0,.33);
  for(let i=-8;i<=8;i++)for(const y of [-1.2,1.2])box(.27,.17,.03,i%2?blue:gold,i*.34,y,.21,group);
  const light=new THREE.PointLight("#ffdfb0",3.5,5);light.position.set(x-Math.sign(x)*1,6,-.65);scene.add(light);
 }
 stationMosaic(-11.72,Math.PI/2,"TIMES SQUARE","42ND STREET");
 stationMosaic(11.72,-Math.PI/2,"6TH AVENUE","NEW YORK CITY");
}else if(safe==="services"){
 plaque("COMING SOON","A space for future ideas",0,3,-9.27,null);planter(-9,4);planter(9,4);for(let x of [-7,7]){cyl(1,1,1.2,trim,x,.6,-5);box(2,1.2,2,accent,x,1.8,-5)}
}else if(safe==="ai"){
 // AI QUEST: original, neon subway-inspired interactive miniature world.
 const navy=mat("#0b1834"),cyan=mat("#39d6e9"),violet=mat("#8c65ff"),gold=mat("#f4bb55");
 const neon=(color)=>new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:.72,metalness:.38,roughness:.25});
 scene.background=new THREE.Color("#0b122c");
 box(23,7.7,.28,navy,0,4,-9.62);
 box(23,.15,18,mat("#152343"),0,-.05,0);
 // Three tracks, illuminated lane markers and recurring sleepers.
 for(const x of [-5.7,0,5.7]){
  box(3.65,.14,18,mat("#1e3159"),x,.09,-.2);
  for(const dx of [-1.45,1.45])box(.12,.15,18,neon("#44d8e8"),x+dx,.22,-.2);
  for(let z=-8;z<8;z+=1.35)box(3.5,.13,.17,mat("#526384"),x,.24,z);
 }
 for(const x of [-11.2,11.2]){
  box(.2,7.3,18,navy,x,3.7,0);
  for(let z=-8;z<9;z+=3.1){box(.16,4,.18,neon("#7d69ff"),x-Math.sign(x)*.17,3.5,z);box(.15,.15,2.6,neon("#37bfcf"),x-Math.sign(x)*.2,5.9,z)}
 }
 for(const z of [-7,-2,3,8]){
  box(22.8,.2,.25,neon("#5663a8"),0,7.55,z);
  for(const x of [-8,0,8]){const l=new THREE.PointLight("#7dbaff",3,8);l.position.set(x,6.9,z);scene.add(l)}
 }
 textSign("AI QUEST","COLLECT · DISCOVER · BUILD",0,6.48,-9.35,13,1.2,{bg:"#122452",fg:"#effaff",edge:"#47dfe9"});
 const tokens=[
  {x:-8.2,key:"openai",name:"OPENAI",sub:"CREDENTIALS",color:"#f4c45e"},
  {x:-2.7,key:"claude",name:"CLAUDE",sub:"EXPLORATION",color:"#ed9b7d"},
  {x:2.7,key:"hackathon",name:"HACKATHON",sub:"EVENTS",color:"#66c9ff"},
  {x:8.2,key:"innovation",name:"INNOVATION",sub:"PROJECTS",color:"#7ce1ac"}
 ];
 const floating=[];
 for(const token of tokens){
  const material=neon(token.color);
  const group=new THREE.Group();group.position.set(token.x,3.45,-5.9);scene.add(group);
  const coin=new THREE.Mesh(new THREE.CylinderGeometry(1.05,1.05,.28,48),material);coin.rotation.x=Math.PI/2;group.add(coin);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(.88,.085,12,48),mat("#fff3d2"));ring.position.z=.18;group.add(ring);
  const symbol=textSign(token.name,token.sub,token.x,3.45,-5.5,2.3,.97,{bg:"#11243f",fg:"#ffffff",edge:token.color},token.key);
  clickableProp(coin,token.key);
  box(3.55,.18,2.1,neon(token.color),token.x,.42,-6.1);
  box(3.35,.3,1.9,navy,token.x,.65,-6.1);
  textSign("DISCOVER",token.sub,token.x,1.26,-5.08,3.15,.87,{bg:"#14284a",fg:"#f5fcff",edge:token.color},token.key);
  floating.push({group,symbol,base:3.45,phase:token.x});
 }
 // Holographic final destination, with honest, unlocked-only project descriptions.
 const portal=new THREE.Mesh(new THREE.TorusGeometry(1.7,.17,16,64),neon("#54e6db"));portal.position.set(0,3.45,-8.5);scene.add(portal);
 textSign("INNOVATION VAULT","EXPLORE ALL FOUR TO UNLOCK",0,1.05,-8.14,5.8,.85,{bg:"#152449",fg:"#f5f8ff",edge:"#60dccc"},"innovation");
 // Hoverboard rider is deliberately simple and original (no third-party game character).
 const rider=new THREE.Group();scene.add(rider);
 const board=box(1.6,.16,.85,neon("#ffad51"),0,0,0,rider);
 box(.65,.63,.5,mat("#e8f0fa"),0,.62,0,rider);
 const head=new THREE.Mesh(new THREE.SphereGeometry(.32,16,12),mat("#f7bd89"));head.position.y=1.2;rider.add(head);
 const visor=box(.5,.17,.2,neon("#59d9ff"),0,1.25,.26,rider);
 rider.position.set(0,.65,5.6);
 window.__aiQuestWorld={tokens,floating,portal,rider};
 window.__aiVaultAnimate=()=>{
  const t=performance.now()*.001;
  for(const item of floating){item.group.position.y=item.base+Math.sin(t*1.5+item.phase)*.17;item.group.rotation.y=Math.sin(t*.7+item.phase)*.23;item.symbol.position.y=item.group.position.y}
  portal.rotation.z=t*.15;rider.position.y=.65+Math.sin(t*3)*.035;
 };
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
function openDetail(key){const d=content[key];if(!d)return;if(safe==="ai")aiQuestDiscover(key);document.getElementById("districtDetailKicker").textContent=d.k;document.getElementById("districtDetailTitle").textContent=d.t;document.getElementById("districtDetailBody").innerHTML=d.html;dialog.showModal()}
document.getElementById("districtClose").onclick=()=>dialog.close();
if(safe==="about"){
 const quick=document.createElement("nav");quick.id="aboutQuickActions";quick.className="about-quick-actions";quick.setAttribute("aria-label","About gallery exhibits");
 for(const [key,label] of [["story","My Story"],["journey","Journey"],["credentials","Milestones"],["personal","Beyond Work"]]){
  const button=document.createElement("button");button.type="button";button.dataset.about=key;button.textContent=label;button.addEventListener("click",()=>openDetail(key));quick.append(button);
 }
 document.body.append(quick);
}
if(safe==="ai"){
 const hud=document.createElement("section");hud.id="aiQuestHud";hud.className="ai-quest-hud";hud.setAttribute("aria-label","AI Quest controls");
 hud.innerHTML='<div class="ai-quest-top"><strong>⚡ AI QUEST</strong><span id="aiQuestProgress" role="status">0 / 4 DISCOVERED</span></div><div class="ai-quest-controls"><button type="button" id="aiQuestTour">▶ GUIDED JOURNEY</button><button type="button" id="aiQuestPlay">🎮 PLAY CHALLENGE</button><button type="button" id="aiQuestExit" hidden>■ EXIT MODE</button></div><p id="aiQuestHint">Choose a mode or tap a glowing collectible.</p><div class="ai-quest-move" hidden><button type="button" data-move="-1" aria-label="Move left">◀ LEFT</button><button type="button" data-move="1" aria-label="Move right">RIGHT ▶</button></div>';
 document.body.append(hud);
 const quick=document.createElement("nav");quick.id="aiQuickActions";quick.className="ai-quest-shortcuts";quick.setAttribute("aria-label","AI collectibles");
 for(const [key,label] of [["openai","OpenAI"],["claude","Claude"],["hackathon","Hackathon"],["innovation","Innovations"]]){
  const button=document.createElement("button");button.type="button";button.dataset.collectible=key;button.textContent=label;button.addEventListener("click",()=>openDetail(key));quick.append(button);
 }
 document.body.append(quick);
}
if(safe==="contact"){
 const quick=document.createElement("nav");quick.id="contactQuickActions";quick.className="cafe-quick-actions";quick.setAttribute("aria-label","Accessible contact café shortcuts");
 for(const [key,label] of [["linkedin","in LinkedIn"],["email","✉ Email"],["phone","☎ Phone"],["location","⌖ New York"],["menu","☕ Coffee Menu"]]){
  const b=document.createElement("button");b.type="button";b.dataset.contact=key;b.textContent=label;b.addEventListener("click",()=>openDetail(key));quick.append(b);
 }
 document.body.append(quick);
}
// ABOUT-only cinematic camera tour. The train stays parked; camera glides past its windows.
let journeyActive=false,journeyStart=0,journeyPausedAt=0,journeyButton=null;
const journeyDuration=30000;
const journeyReducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if(safe==="about"){
 journeyButton=document.createElement("button");
 journeyButton.id="districtJourney";journeyButton.type="button";journeyButton.className="district-pill journey-button";
 journeyButton.textContent="▶ JOURNEY VIEW";journeyButton.setAttribute("aria-pressed","false");
 journeyButton.setAttribute("aria-label","Start guided camera journey along the story train");
 document.querySelector(".district-header nav").prepend(journeyButton);
 journeyButton.addEventListener("click",()=>setJourney(!journeyActive));
}
function setJourney(active){
 if(safe!=="about")return;
 journeyActive=active;
 if(active){journeyStart=performance.now();journeyPausedAt=0;document.getElementById("districtSubtitle").textContent="A cinematic ride through four chapters · Click a train window to explore";}
 else{desiredTheta=.12;desiredPhi=1.38;desiredRadius=root.clientWidth<600?30:20;document.getElementById("districtSubtitle").textContent=cfg.subtitle}
 journeyButton.textContent=active?"■ EXIT JOURNEY":"▶ JOURNEY VIEW";
 journeyButton.setAttribute("aria-pressed",String(active));
}
function updateJourney(now){
 if(!journeyActive)return false;
 if(!journeyStart)journeyStart=now;
 const elapsed=now-journeyStart;
 // Ease into the first window, glide left-to-right, then hold the complete train in view.
 const t=Math.min(elapsed/journeyDuration,1);
 const ease=t*t*(3-2*t);
 const x=-8.8+ease*17.2;
 const bob=journeyReducedMotion?0:Math.sin(elapsed*.0028)*.045;
 const desiredPosition=new THREE.Vector3(x,3.05+bob,journeyReducedMotion?5.5:4.3);
 const lookAt=new THREE.Vector3(x*.85,3.05,-3.4);
 camera.position.lerp(desiredPosition,journeyReducedMotion?1:.055);
 const aim=new THREE.Vector3();camera.getWorldDirection(aim);const currentTarget=camera.position.clone().add(aim.multiplyScalar(8));
 currentTarget.lerp(lookAt,journeyReducedMotion?1:.065);camera.lookAt(currentTarget);
 if(t>=1){setJourney(false)}
 return true;
}
// Guided cinematic tour and optional keyboard/touch challenge.
const aiKeys=["openai","claude","hackathon","innovation"];
let aiMode="idle",aiStart=0,aiLane=1,aiProgress=0,aiCollected=new Set(),aiLast=0;
const aiHud=document.getElementById("aiQuestHud");
const aiReduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function aiQuestDiscover(key){
 if(!aiHud||!aiKeys.includes(key))return;
 aiCollected.add(key);
 aiHud.querySelector("#aiQuestProgress").textContent=aiCollected.size+" / 4 DISCOVERED";
 if(aiCollected.size===4){aiHud.querySelector("#aiQuestHint").textContent="✨ VAULT UNLOCKED · Explore the Innovation Vault!";aiHud.classList.add("ai-vault-unlocked")}
}
function aiSetMode(mode){
 if(!aiHud)return;
 aiMode=mode;aiStart=performance.now();aiLast=0;aiLane=1;aiProgress=0;if(mode==="play"&&window.__aiQuestWorld){for(let i=0;i<4;i++)delete window.__aiQuestWorld["checkpoint"+i]}
 aiHud.querySelector("#aiQuestTour").hidden=mode!=="idle";
 aiHud.querySelector("#aiQuestPlay").hidden=mode!=="idle";
 aiHud.querySelector("#aiQuestExit").hidden=mode==="idle";
 aiHud.querySelector(".ai-quest-move").hidden=mode!=="play";
 aiHud.querySelector("#aiQuestHint").textContent=mode==="tour"?"Cinematic tour · Select a collectible to pause and read":mode==="play"?"Use ← → or touch controls to collect four AI coins.":"Choose a mode or tap a glowing collectible.";
 if(mode==="idle"){desiredTheta=.12;desiredPhi=1.38;desiredRadius=root.clientWidth<600?30:20;window.__aiQuestWorld?.rider.position.set(0,.65,5.6)}
}
if(aiHud){
 aiHud.querySelector("#aiQuestTour").onclick=()=>aiSetMode("tour");
 aiHud.querySelector("#aiQuestPlay").onclick=()=>aiSetMode("play");
 aiHud.querySelector("#aiQuestExit").onclick=()=>aiSetMode("idle");
 aiHud.querySelectorAll("[data-move]").forEach(b=>b.onclick=()=>{aiLane=THREE.MathUtils.clamp(aiLane+Number(b.dataset.move),0,2)});
 window.addEventListener("keydown",e=>{if(aiMode!=="play"||dialog.open)return;if(["ArrowLeft","a","A"].includes(e.key)){e.preventDefault();aiLane=Math.max(0,aiLane-1)}if(["ArrowRight","d","D"].includes(e.key)){e.preventDefault();aiLane=Math.min(2,aiLane+1)}if(e.key==="Escape")aiSetMode("idle")});
 dialog.addEventListener("close",()=>{if(aiMode==="tour")aiStart=performance.now()-aiProgress*26000});
}
function updateAiQuest(now){
 if(aiMode==="idle"||!window.__aiQuestWorld)return false;
 if(dialog.open){aiStart+=Math.min(now-(aiLast||now),60);aiLast=now;return true;}
 const world=window.__aiQuestWorld,elapsed=(now-aiStart)/1000;
 if(aiMode==="tour"){
  // Smoothly follow all four exhibit windows, keeping each label visible.
  aiProgress=Math.min(elapsed/26,1);
  const p=aiReduced?aiProgress:aiProgress*aiProgress*(3-2*aiProgress);
  const x=-8.7+p*17.4;
  const dest=new THREE.Vector3(x,3.3,3.6);
  camera.position.lerp(dest,aiReduced?1:.055);
  camera.lookAt(x*.94,3.1,-5.9);
  if(aiProgress>=1)aiSetMode("idle");
 }else{
  const dt=Math.min((now-(aiLast||now))/1000,.06);aiLast=now;
  aiProgress=Math.min(aiProgress+dt/26,1);
  const lanes=[-5.7,0,5.7],targetX=lanes[aiLane];
  world.rider.position.x+=(targetX-world.rider.position.x)*.14;
  world.rider.position.z=5.6-aiProgress*12.4;
  camera.position.lerp(new THREE.Vector3(world.rider.position.x,4.1,world.rider.position.z+6.2),.11);
  camera.lookAt(world.rider.position.x,2.2,world.rider.position.z-5.5);
  // Four encounter checkpoints: lane choices select a collectible.
  const milestones=[.2,.4,.6,.8],keys=aiKeys,required=[0,2,1,2];
  for(let i=0;i<4;i++){
   if(aiProgress>=milestones[i]&&!world["checkpoint"+i]){
    world["checkpoint"+i]=true;
    if(aiLane===required[i]){aiQuestDiscover(keys[i]);aiHud.querySelector("#aiQuestHint").textContent="✨ "+keys[i].toUpperCase()+" COLLECTED!";openDetail(keys[i]);}
    else aiHud.querySelector("#aiQuestHint").textContent="Missed a collectible · Try another lane or tap its shortcut.";
   }
  }
  if(aiProgress>=1){aiSetMode("idle");aiHud.querySelector("#aiQuestHint").textContent="Run complete! Replay or explore the collectibles below.";}
 }
 return true;
}
const map=document.getElementById("districtNav"),mapButton=document.getElementById("districtMap");mapButton.onclick=()=>{map.hidden=!map.hidden;mapButton.setAttribute("aria-expanded",String(!map.hidden))};
let theta=.12,phi=1.38,radius=20,desiredTheta=theta,desiredPhi=phi,desiredRadius=radius;
const target=new THREE.Vector3(0,2.6,-3.4);
function update(){if(updateAiQuest(performance.now()))return;if(updateJourney(performance.now()))return;theta+=(desiredTheta-theta)*.12;phi+=(desiredPhi-phi)*.12;radius+=(desiredRadius-radius)*.12;camera.position.set(target.x+radius*Math.sin(phi)*Math.sin(theta),target.y+radius*Math.cos(phi),target.z+radius*Math.sin(phi)*Math.cos(theta));camera.lookAt(target)}
function resize(){const mobile=root.clientWidth<600;camera.aspect=root.clientWidth/root.clientHeight;camera.fov=mobile?62:48;if(mobile&&desiredRadius<28){desiredRadius=30;radius=30}else if(!mobile&&desiredRadius>35){desiredRadius=22;radius=22}camera.updateProjectionMatrix();renderer.setSize(root.clientWidth,root.clientHeight,false)}window.addEventListener("resize",resize);resize();
let drag=null,moved=false;renderer.domElement.addEventListener("pointerdown",e=>{if(aiMode!=="idle")aiSetMode("idle");if(journeyActive)setJourney(false);drag={x:e.clientX,y:e.clientY};moved=false;renderer.domElement.setPointerCapture(e.pointerId)});
renderer.domElement.addEventListener("pointermove",e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(dx)+Math.abs(dy)>3)moved=true;desiredTheta-=dx*.006;desiredPhi=THREE.MathUtils.clamp(desiredPhi+dy*.005,.4,1.65);drag={x:e.clientX,y:e.clientY}});
renderer.domElement.addEventListener("pointerup",e=>{if(!moved){const p=new THREE.Vector2(e.clientX/root.clientWidth*2-1,-e.clientY/root.clientHeight*2+1);const ray=new THREE.Raycaster();ray.setFromCamera(p,camera);const hit=ray.intersectObjects(clickable)[0];if(hit?.object.userData.action)openDetail(hit.object.userData.action)}drag=null});
renderer.domElement.addEventListener("pointercancel",()=>drag=null);
renderer.domElement.addEventListener("pointermove",e=>{if(drag)return;const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2(e.clientX/root.clientWidth*2-1,-e.clientY/root.clientHeight*2+1),camera);renderer.domElement.style.cursor=ray.intersectObjects(clickable).length?"pointer":"grab"});
renderer.domElement.addEventListener("wheel",e=>{e.preventDefault();if(aiMode!=="idle")aiSetMode("idle");if(journeyActive)setJourney(false);desiredRadius=THREE.MathUtils.clamp(desiredRadius+Math.sign(e.deltaY)*1.3,10,60)},{passive:false});
document.getElementById("districtReset").onclick=()=>{if(aiMode!=="idle")aiSetMode("idle");if(journeyActive)setJourney(false);desiredTheta=.12;desiredPhi=1.38;desiredRadius=root.clientWidth<600?30:20};
function animate(){requestAnimationFrame(animate);update();window.__aiVaultAnimate?.();renderer.render(scene,camera)}animate();