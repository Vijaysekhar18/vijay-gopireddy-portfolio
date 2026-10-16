import * as THREE from "https://esm.sh/three@0.170.0";
const room=new URLSearchParams(location.search).get("room")||"about";
const safe=["about","services","ai","contact"].includes(room)?room:"about";
const configs={
 about:{title:"THE STORY STATION",kicker:"01 / ABOUT",subtitle:"VSR Express · Four stops through a life of curiosity and engineering",wall:"#e5d5b6",floor:"#b78e65",accent:"#d5a82f"},
 services:{title:"VSR INNOVATION CENTER",kicker:"03 / SERVICES",subtitle:"The Engineering Studio · Four interactive worlds of engineering",wall:"#d8e2e8",floor:"#788a9b",accent:"#dfb86b"},
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
 email:{k:"CONTACT / EMAIL",t:"Leave Me a Note",html:'<p>Ideas, collaborations or just saying hello — my inbox is open.</p><p><a href="mailto:vijay.sekhar18@gmail.com?subject=Hello%20from%20your%20NYC%20Portfolio">✉ vijay.sekhar18@gmail.com ↗</a></p>'},
 phone:{k:"CONTACT / PHONE",t:"Give Me a Ring",html:'<p>Phone: <strong>774-486-****</strong></p><p>For privacy, the final four digits are hidden. Please connect by email or LinkedIn instead.</p>'},
 location:{k:"CONTACT / LOCATION",t:"Working in New York",html:'<p>📍 New York, NY · Work location</p><p>Inspired by the energy, architecture and creative spirit of the city.</p><p>Exact office address is intentionally private.</p>'},
 menu:{k:"THE CONNECTION MENU",t:"What Can I Brew for You?",html:'<div class="coffee-menu"><a href="mailto:vijay.sekhar18@gmail.com?subject=Quick%20Hello%20from%20your%20NYC%20Portfolio"><strong>☕ ESPRESSO</strong><span>Quick hello ↗</span></a><a href="mailto:vijay.sekhar18@gmail.com?subject=Let%27s%20Collaborate"><strong>☕ CAPPUCCINO</strong><span>Discuss a project ↗</span></a><a href="https://www.linkedin.com/in/vijaygopireddy/" target="_blank" rel="noopener noreferrer"><strong>☕ COLD BREW</strong><span>Connect on LinkedIn ↗</span></a></div>'},
 linkedin:{k:"CONTACT / CONNECT",t:"Find Me on LinkedIn",html:'<p><a href="https://www.linkedin.com/in/vijaygopireddy/" target="_blank" rel="noopener">Visit LinkedIn ↗</a></p>'},
 coffee:{k:"CONTACT / NYC",t:"Coffee & Conversation",html:"<p>This is a virtual coffee lounge for conversations, ideas and collaborations. Thanks for visiting the city!</p>"}
,
 automation:{k:"SERVICES / 01 · AUTOMATION ARCHITECTURE",t:"Build Reliable Automation at Scale",html:'<p>Design maintainable test automation ecosystems for complex enterprise applications, not just individual scripts.</p><p><strong>Engineering capabilities:</strong> Playwright with TypeScript, Selenium with Java, TestNG, Cucumber, REST Assured, reusable components, API and UI coverage, CI/CD integration and flakiness reduction.</p><p><strong>Approach:</strong> risk-based coverage, test-data strategy, parallel execution, reporting, and reliable release gates.</p><p><a href="work.html">Explore engineering experience ↗</a></p>'},
 quality:{k:"SERVICES / 02 · QUALITY ENGINEERING",t:"Quality Strategy & Engineering Leadership",html:'<p>Lead quality across planning, delivery and production readiness, aligning engineering teams around measurable release confidence.</p><p><strong>Capabilities:</strong> enterprise test strategy, QA governance, cross-team coordination, performance testing with JMeter and LoadRunner, regression planning, defect triage and risk communication.</p><p><strong>Experience:</strong> end-to-end migration quality strategy across functional, API, data, performance and automation workstreams.</p><p><a href="work.html">See the WORK Studio ↗</a></p>'},
 cloud:{k:"SERVICES / 03 · CLOUD & DATA",t:"Cloud, API & Data Reliability",html:'<p>Validate modern event-driven, cloud-native and data-intensive systems across integration boundaries.</p><p><strong>Technology:</strong> AWS Lambda, Step Functions, Glue, EventBridge, S3, CloudWatch, Athena, Kafka/MSK, SQL, API validation and ETL reconciliation.</p><p><strong>Focus:</strong> data consistency, integration contracts, migration comparisons, pipeline observability and resilience testing.</p><p><a href="work.html">View cloud engineering experience ↗</a></p>'},
 aiEngineering:{k:"SERVICES / 04 · AI-POWERED ENGINEERING",t:"Practical AI Engineering & Innovation",html:'<p>Build targeted tools that remove repetitive engineering effort while retaining human review and quality ownership.</p><p><strong>Examples:</strong> API Migration Testing Tool for comparing old and new API responses across many combinations; AI-assisted XPath Extractor for element discovery; experimentation with Claude, MCP and Playwright-assisted workflows.</p><p>Project examples use synthetic data and do not expose client systems.</p><p><a href="district.html?room=ai">Explore the AI Lab ↗</a></p>'}
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
 // VSR Innovation Center: four differentiated engineering environments in one NYC gallery.
 const navy=mat("#142a42"),steel=mat("#a9bac5"),cream=mat("#f5e9d0"),brass=mat("#d8af69"),stone=mat("#34485b");
 const stations=[
  {key:"automation",x:-8.1,name:"AUTOMATION",sub:"TEST FACTORY",color:"#65d2ec",story:"Design → Execute → Validate"},
  {key:"quality",x:-2.7,name:"QUALITY",sub:"MISSION CONTROL",color:"#f4b66f",story:"Strategy → Readiness → Release"},
  {key:"cloud",x:2.7,name:"CLOUD + DATA",sub:"PIPELINE CITY",color:"#85d9b2",story:"Ingest → Transform → Reconcile"},
  {key:"aiEngineering",x:8.1,name:"AI ENGINEERING",sub:"INNOVATION WORKBENCH",color:"#bb9cf6",story:"Compare → Discover → Improve"}
 ];
 const motion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 const animated=[];
 const glow=(color)=>new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:.42,metalness:.26,roughness:.4});
 // Architectural shell: illuminated floor inlays, exhibition portals and Manhattan-window backdrop.
 box(23.4,.13,18,stone,0,.02,-.25);
 for(let z=-8;z<=7;z+=1.2)box(22.2,.018,.024,mat("#5e7888"),0,.1,z);
 for(let x=-11;x<=11;x+=1.1)box(.024,.018,16,mat("#5e7888"),x,.11,-.2);
 box(22.5,1.45,.18,navy,0,6.92,-9.52);
 textSign("VSR INNOVATION CENTER","THE ENGINEERING STUDIO",0,6.91,-9.31,17.7,1.08,{bg:"#10263d",fg:"#fff5df",edge:"#e7be75"});
 for(const x of [-10.95,10.95]){
  box(.38,7.65,.42,steel,x,3.83,-5.8);
  box(.32,7.65,.38,navy,x,3.83,3.7);
 }
 for(let x=-10.6;x<=10.6;x+=2.1){
  box(1.72,3.6,.11,navy,x,3.42,-9.4);
  box(1.53,3.28,.12,mat("#4b718b"),x,3.42,-9.3);
  for(let j=0;j<3;j++)box(.15,.35,.14,cream,x+Math.sin(x*3+j)*.45,2.5+j*.72,-9.18);
 }
 // Central VSR core: elevated so it remains visible without obstructing the aisle.
 const core=new THREE.Mesh(new THREE.IcosahedronGeometry(.66,1),glow("#f4ce82"));
 core.position.set(0,5.75,-7.85);scene.add(core);
 const coreRing=new THREE.Mesh(new THREE.TorusGeometry(.96,.075,12,48),brass);
 coreRing.position.copy(core.position);scene.add(coreRing);
 const coreLight=new THREE.PointLight("#ffd6a2",2.4,6);coreLight.position.copy(core.position);scene.add(coreLight);
 // Each gallery bay has its own equipment, not the same screen recolored four times.
 for(const [i,st] of stations.entries()){
  const light=glow(st.color);
  box(4.65,.13,8.5,navy,st.x,.23,-2.15);
  box(4.52,.08,8.38,light,st.x,.32,-2.15);
  box(4.34,.12,8.2,stone,st.x,.4,-2.15);
  for(const dx of [-2.17,2.17])box(.13,5.5,.14,steel,st.x+dx,3.2,-5.9);
  box(4.4,.18,.28,brass,st.x,5.95,-5.9);
  textSign("0"+(i+1)+"  "+st.name,st.sub,st.x,5.13,-5.63,4.05,.9,{bg:"#112c44",fg:"#fff7e7",edge:st.color},st.key);
  const platform=box(3.85,.3,1.15,navy,st.x,.69,1.15);clickableProp(platform,st.key);
  textSign("EXPLORE",st.sub,st.x,1.35,1.78,3.4,.73,{bg:"#142c43",fg:"#fff8e9",edge:st.color},st.key);
  const lamp=new THREE.PointLight(st.color,3.1,5.8);lamp.position.set(st.x,5.6,-3.8);scene.add(lamp);
  if(i===0){
   // Test factory: conveyor, three build modules, articulated robotic arm and moving test package.
   box(3.95,.28,1.3,steel,st.x,1.43,-3.9);
   box(3.85,.08,1.12,navy,st.x,1.61,-3.9);
   for(let j=0;j<3;j++){
    const bx=st.x-1.28+j*1.28;
    box(.94,.74,.62,light,bx,2.14,-4.22);
    textSign(["BUILD","TEST","PASS"][j],"",bx,2.14,-3.89,.87,.4,{bg:"#153047",fg:"#fff8e8",edge:st.color},st.key);
   }
   const arm=new THREE.Group();arm.position.set(st.x+1.55,2.13,-3.55);scene.add(arm);
   box(.22,1.05,.24,brass,0,.45,0,arm);
   const forearm=box(.18,.85,.22,light,-.34,.97,0,arm);forearm.rotation.z=-.8;
   const packet=box(.45,.34,.45,cream,st.x-1.55,1.89,-3.53);clickableProp(packet,st.key);
   animated.push({type:"factory",packet,arm,x:st.x});
  }else if(i===1){
   // Mission control: command console, release-status monitors and confidence bars.
   box(4.05,1.65,.25,navy,st.x,2.6,-5.13);
   for(let j=0;j<3;j++){
    const x=st.x-1.26+j*1.26;
    box(1.14,1.12,.12,light,x,2.8,-4.97);
    textSign(["PLAN","VERIFY","RELEASE"][j],["STRATEGY","COVERAGE","READINESS"][j],x,2.8,-4.87,1.08,.95,{bg:"#152d43",fg:"#fff7df",edge:st.color},st.key);
   }
   box(3.85,.22,1.25,steel,st.x,1.43,-3.2);
   for(let j=0;j<5;j++){
    const bar=box(.42,.3+j*.16,.34,j===4?light:cream,st.x-1.45+j*.72,1.82+j*.08,-3.2);
    clickableProp(bar,st.key);
   }
   const beacon=new THREE.Mesh(new THREE.SphereGeometry(.3,12,8),light);beacon.position.set(st.x,4.4,-4.92);scene.add(beacon);
   animated.push({type:"beacon",beacon});
  }else if(i===2){
   // Pipeline city: three data towers, connectors and flowing event particles.
   const towers=[];
   for(let j=0;j<3;j++){
    const x=st.x-1.35+j*1.35;
    box(.96,1.1+j*.38,.86,steel,x,1.98+j*.19,-4.25);
    for(let k=0;k<3;k++)box(.72,.07,.9,light,x,1.63+k*.31+j*.2,-4.25);
    textSign(["INGEST","GLUE","VALIDATE"][j],"",x,3.25,-3.74,1.19,.48,{bg:"#183b43",fg:"#fff",edge:st.color},st.key);
    towers.push(x);
   }
   for(let j=0;j<2;j++)box(.6,.09,.14,light,st.x-.65+j*1.35,2.4,-3.95);
   const packets=[];
   for(let j=0;j<4;j++){const dot=new THREE.Mesh(new THREE.SphereGeometry(.105,8,6),light);dot.position.set(st.x-1.4+j*.6,2.52,-3.7);scene.add(dot);packets.push(dot)}
   animated.push({type:"pipeline",packets,x:st.x});
  }else{
   // AI workbench: floating geometry, dual tool terminals and a rotating knowledge ring.
   box(4.05,.22,1.65,steel,st.x,1.48,-3.7);
   for(const dx of [-1.15,1.15]){
    box(1.52,1.15,.12,navy,st.x+dx,2.63,-4.62);
    textSign(dx<0?"API DIFF":"XPATH","TOOL DEMO",st.x+dx,2.65,-4.52,1.42,.91,{bg:"#2d2850",fg:"#fff",edge:st.color},st.key);
   }
   const orb=new THREE.Mesh(new THREE.IcosahedronGeometry(.62,1),light);orb.position.set(st.x,3.75,-3.76);scene.add(orb);clickableProp(orb,st.key);
   const ring=new THREE.Mesh(new THREE.TorusGeometry(.87,.065,12,48),cream);ring.position.copy(orb.position);scene.add(ring);
   animated.push({type:"ai",orb,ring});
  }
 }
 // Illuminated entrance threshold makes the visitor's starting point legible.
 box(21.5,.09,1.45,mat("#9faeae"),0,.16,6.8);
 for(let x=-9.5;x<=9.5;x+=1.9)box(1.3,.04,.09,brass,x,.23,6.25);
 window.__servicesStations=stations;
 window.__servicesAnimate=()=>{
  if(motion)return;
  const t=performance.now()*.001;
  core.rotation.y=t*.28;core.rotation.x=t*.12;coreRing.rotation.z=t*.13;
  for(const item of animated){
   if(item.type==="factory"){item.packet.position.x=item.x-1.55+(t*.5%3.1);item.arm.rotation.z=Math.sin(t*.8)*.17}
   if(item.type==="beacon")item.beacon.material.emissiveIntensity=.3+Math.sin(t*2)*.22;
   if(item.type==="pipeline")item.packets.forEach((dot,j)=>{dot.position.x=item.x-1.4+((t*.65+j*.75)%2.8);dot.position.y=2.52+Math.sin(t*2+j)*.09});
   if(item.type==="ai"){item.orb.rotation.y=t*.4;item.ring.rotation.z=t*.19}
  }
 };
}else if(safe==="ai"){
 // AI QUEST: original, neon subway-inspired interactive miniature world.
 const navy=mat("#0b1834"),cyan=mat("#39d6e9"),violet=mat("#8c65ff"),gold=mat("#f4bb55");
 const neon=(color)=>new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:.72,metalness:.38,roughness:.25});
 scene.background=new THREE.Color("#0b122c");
 box(23,7.7,.28,navy,0,4,-9.62);
 box(23,.15,18,mat("#152343"),0,-.05,0);
 // Four aligned collectible lanes, with contrasting neon guide rails.
 const aiLaneXs=[-8.2,-2.7,2.7,8.2];
 const aiLaneColors=["#ffd063","#ff957a","#61cfff","#84edb1"];
 for(const [lane,x] of aiLaneXs.entries()){
  box(3.9,.14,18,mat("#1e3159"),x,.09,-.2);
  for(const dx of [-1.8,1.8])box(.12,.15,18,neon(aiLaneColors[lane]),x+dx,.22,-.2);
  for(let z=-8;z<8;z+=1.35)box(3.7,.13,.17,mat("#526384"),x,.24,z);
 }
 for(const x of [-11.2,11.2]){
  box(.2,7.3,18,navy,x,3.7,0);
  for(let z=-8;z<9;z+=3.1){box(.16,4,.18,neon("#7d69ff"),x-Math.sign(x)*.17,3.5,z);box(.15,.15,2.6,neon("#37bfcf"),x-Math.sign(x)*.2,5.9,z)}
 }
 for(const z of [-7,-2,3,8]){
  box(22.8,.2,.25,neon("#5663a8"),0,7.55,z);
  for(const x of [-8,0,8]){const l=new THREE.PointLight("#7dbaff",3,8);l.position.set(x,6.9,z);scene.add(l)}
 }
 textSign("AI QUEST","COLLECT · DISCOVER · BUILD",0,6.85,-9.22,15,1.38,{bg:"#07152e",fg:"#ffffff",edge:"#ffe08c"});
 const tokens=[
  {x:-8.2,z:2.5,key:"openai",name:"OPENAI",sub:"CREDENTIALS",color:"#f4c45e"},
  {x:-2.7,z:-.2,key:"claude",name:"CLAUDE",sub:"EXPLORATION",color:"#ed9b7d"},
  {x:2.7,z:-2.9,key:"hackathon",name:"HACKATHON",sub:"EVENTS",color:"#66c9ff"},
  {x:8.2,z:-5.6,key:"innovation",name:"INNOVATION",sub:"PROJECTS",color:"#7ce1ac"}
 ];
 const floating=[];
 for(const token of tokens){
  const material=neon(token.color);
  const group=new THREE.Group();group.position.set(token.x,3.45,token.z);scene.add(group);
  // Synchronous canvas artwork: always visible, no network image load or SVG parsing.
  // Keep the physical collectible disk behind the artwork in every case.
  const coin=new THREE.Mesh(new THREE.CylinderGeometry(1.22,1.22,.24,64),material);
  coin.rotation.x=Math.PI/2;group.add(coin);clickableProp(coin,token.key);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(1.13,.085,12,64),mat("#fff4d7"));ring.position.z=.19;group.add(ring);
  const canvas=document.createElement("canvas");canvas.width=512;canvas.height=512;
  const ctx=canvas.getContext("2d");ctx.clearRect(0,0,512,512);
  ctx.save();ctx.translate(256,256);
  ctx.shadowColor=token.color;ctx.shadowBlur=24;
  ctx.beginPath();for(let i=0;i<6;i++){const ang=-Math.PI/2+i*Math.PI/3;const px=Math.cos(ang)*220,py=Math.sin(ang)*220;i?ctx.lineTo(px,py):ctx.moveTo(px,py)}ctx.closePath();
  const gradient=ctx.createLinearGradient(-180,-190,180,190);
  gradient.addColorStop(0,"#fff9d8");gradient.addColorStop(.5,token.color);gradient.addColorStop(1,"#18345c");
  ctx.fillStyle=gradient;ctx.fill();ctx.lineWidth=15;ctx.strokeStyle="#fff4d2";ctx.stroke();
  ctx.shadowBlur=0;ctx.fillStyle="#101d38";ctx.textAlign="center";ctx.textBaseline="middle";
  if(token.key==="openai"){
   ctx.font="bold 80px Arial";ctx.fillText("AI",0,-55);
   ctx.font="bold 39px Arial";ctx.fillText("CHATGPT",0,35);
   ctx.font="bold 36px Arial";ctx.fillText("EXPERT",0,80);
   ctx.font="bold 23px Arial";ctx.fillText("CORE",0,128);
  }else if(token.key==="claude"){
   ctx.font="bold 114px Arial";ctx.fillText("✳",0,-55);
   ctx.font="bold 57px Arial";ctx.fillText("CLAUDE",0,72);
  }else if(token.key==="hackathon"){
   ctx.beginPath();ctx.moveTo(-85,-95);ctx.lineTo(80,-95);ctx.lineTo(155,0);ctx.lineTo(80,95);ctx.lineTo(-85,95);ctx.lineTo(-155,0);ctx.closePath();ctx.fillStyle="#1e70b2";ctx.fill();
   ctx.beginPath();ctx.moveTo(-85,-95);ctx.lineTo(55,-10);ctx.lineTo(-10,95);ctx.lineTo(-155,0);ctx.closePath();ctx.fillStyle="#72c8e4";ctx.fill();
   ctx.font="bold 36px Arial";ctx.fillStyle="#fff";ctx.fillText("COGNIZANT",0,144);
  }else{
   ctx.font="bold 125px Arial";ctx.fillText("⚙",0,-45);
   ctx.font="bold 40px Arial";ctx.fillText("BUILD",0,95);
  }
  ctx.restore();
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;
  const face=new THREE.Mesh(new THREE.PlaneGeometry(2.38,2.38),new THREE.MeshBasicMaterial({map:texture,transparent:true,side:THREE.DoubleSide,depthTest:false,depthWrite:false}));
  face.position.z=.36;face.renderOrder=20;group.add(face);clickableProp(face,token.key);
  const symbol=textSign(token.name,token.sub,token.x,1.85,token.z+.72,2.55,.75,{bg:"#11243f",fg:"#ffffff",edge:token.color},token.key);
  clickableProp(coin,token.key);
  box(3.55,.18,2.1,neon(token.color),token.x,.42,token.z-.35);
  box(3.35,.3,1.9,navy,token.x,.65,token.z-.35);
  textSign("DISCOVER",token.sub,token.x,.95,token.z+.87,3.15,.72,{bg:"#14284a",fg:"#f5fcff",edge:token.color},token.key);
  floating.push({group,symbol,base:3.45,phase:token.x});
 }
 // The central hologram has a purpose: a glowing AI core and unlock status.
 const portal=new THREE.Mesh(new THREE.TorusGeometry(1.27,.16,16,64),neon("#54e6db"));portal.position.set(0,3.8,-8.53);scene.add(portal);
 const core=new THREE.Mesh(new THREE.IcosahedronGeometry(.77,1),neon("#f5c665"));core.position.set(0,3.8,-8.5);scene.add(core);
 const coreInner=new THREE.Mesh(new THREE.IcosahedronGeometry(.5,0),new THREE.MeshBasicMaterial({color:"#fff4ba"}));coreInner.position.set(0,3.8,-8.34);scene.add(coreInner);
 const coreHalo=new THREE.PointLight("#7aeaff",4,6);coreHalo.position.set(0,3.8,-8.2);scene.add(coreHalo);
 textSign("AI CORE","FOUR DISCOVERIES",0,1.9,-7.62,2.15,.9,{bg:"#122752",fg:"#fff5c8",edge:"#54e6db"});
 // Keep the unlock instruction high above floating tokens, never hidden behind them.
 textSign("INNOVATION VAULT","DISCOVER ALL 4 TO UNLOCK",0,5.45,-9.13,12.4,1.14,{bg:"#07152e",fg:"#fffdf4",edge:"#f5c665"});

 // Original human game character: proportioned head, hair, face, jacket, arms, legs and sneakers.
 const rider=new THREE.Group();scene.add(rider);
 const skin=mat("#d9966b"),hair=mat("#272034"),jacket=mat("#ffad42"),pants=mat("#314b9b"),shoe=mat("#f6f8ff");
 box(1.45,.13,.85,neon("#43d6fa"),0,.05,0,rider); // hoverboard
 box(.67,.92,.38,jacket,0,1.28,0,rider); // torso
 box(.72,.13,.41,mat("#f8d264"),0,1.68,0,rider); // jacket collar
 const head=new THREE.Mesh(new THREE.SphereGeometry(.38,24,16),skin);head.position.set(0,2.02,0);rider.add(head);
 const hairCap=new THREE.Mesh(new THREE.SphereGeometry(.39,24,12,0,Math.PI*2,0,Math.PI*.49),hair);hairCap.position.set(0,2.13,0);rider.add(hairCap);
 for(const x of [-.14,.14]){box(.055,.055,.025,hair,x,2.04,.364,rider)}
 box(.18,.045,.02,mat("#82452e"),0,1.86,.365,rider);
 for(const x of [-.43,.43]){
  const arm=box(.22,.75,.25,jacket,x,1.32,0,rider);arm.rotation.z=x>0?-.22:.22;arm.name=x>0?"rightArm":"leftArm";
  box(.21,.18,.22,skin,x*1.13,.9,.03,rider);
 }
 for(const x of [-.2,.2]){
  const leg=box(.25,.69,.28,pants,x,.56,0,rider);leg.name=x>0?"rightLeg":"leftLeg";
  box(.33,.18,.47,shoe,x,.18,.13,rider);
 }
 rider.position.set(-8.2,.65,7.5);
 window.__aiQuestWorld={tokens,floating,portal,core,coreInner,rider,aiLaneXs,coreHalo};
 window.__aiVaultAnimate=()=>{
  const t=performance.now()*.001;
  for(const item of floating){item.group.position.y=item.base+Math.sin(t*1.5+item.phase)*.17;item.group.rotation.y=Math.sin(t*.7+item.phase)*.23;item.symbol.position.y=2.05+Math.sin(t*1.5+item.phase)*.08}
  portal.rotation.z=t*.15;core.rotation.y=t*.45;core.rotation.x=t*.2;coreInner.rotation.y=-t*.33;coreInner.rotation.z=t*.18;coreHalo.intensity=3+Math.sin(t*2)*.9;
  const running=window.__aiQuestPlaying===true;const stride=running?Math.sin(t*9)*.27:0;
  for(const part of rider.children){if(part.name==="leftArm"||part.name==="rightLeg")part.rotation.x=stride;else if(part.name==="rightArm"||part.name==="leftLeg")part.rotation.x=-stride}
  rider.position.y=.65+Math.sin(t*(running?9:3))*(running?.07:.025);
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
 // Low-cost animated steam above the counter mugs; reduced-motion users see a static scene.
 const steamWisps=[];
 for(const x of [-2.6,-1.8,-1]){
  for(let i=0;i<3;i++){
   const puff=new THREE.Mesh(new THREE.SphereGeometry(.055+i*.02,8,6),new THREE.MeshBasicMaterial({color:"#fff4db",transparent:true,opacity:.26,depthWrite:false}));
   puff.position.set(x,2.05+i*.25,-7.1);scene.add(puff);steamWisps.push({puff,x,offset:i*.31});
  }
 }
 const cozyWindowGlow=new THREE.PointLight("#ffd49b",1.2,8);cozyWindowGlow.position.set(8,4,-6.7);scene.add(cozyWindowGlow);
 const reduceCafeMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 window.__cafeAnimate=()=>{if(reduceCafeMotion)return;const t=performance.now()*.00035;for(const {puff,x,offset} of steamWisps){const phase=(t+offset)%1;puff.position.y=2.05+phase*.85;puff.position.x=x+Math.sin(phase*6+offset)*.09;puff.material.opacity=.2*(1-phase)}};

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
 hud.innerHTML='<div class="ai-quest-top"><strong>⚡ AI QUEST</strong><span id="aiQuestProgress" role="status">0 / 4 DISCOVERED</span></div><div class="ai-quest-controls"><button type="button" id="aiQuestTour">▶ GUIDED JOURNEY</button><button type="button" id="aiQuestPlay">🎮 PLAY CHALLENGE</button><button type="button" id="aiQuestExit" hidden>■ EXIT MODE</button><button type="button" id="aiQuestSound" aria-pressed="false">🔇 SOUND OFF</button></div><p id="aiQuestHint">Choose a mode or tap a glowing collectible.</p><div class="ai-passport-title">ACHIEVEMENT PASSPORT · 4 CHECKPOINTS</div><div id="aiQuestPassport" class="ai-quest-passport"></div><button type="button" id="aiQuestVaultButton" hidden>✦ OPEN AI VAULT</button><div class="ai-quest-move" hidden><button type="button" data-move="-1" aria-label="Move left">◀ LEFT</button><button type="button" data-move="1" aria-label="Move right">RIGHT ▶</button></div>';
 document.body.append(hud);
 const quick=document.createElement("nav");quick.id="aiQuickActions";quick.className="ai-quest-shortcuts";quick.setAttribute("aria-label","AI collectibles");
 for(const [key,label] of [["openai","OpenAI"],["claude","Claude"],["hackathon","Hackathon"],["innovation","Innovations"]]){
  const button=document.createElement("button");button.type="button";button.dataset.collectible=key;button.textContent=label;button.addEventListener("click",()=>openDetail(key));quick.append(button);
 }
 document.body.append(quick);
 const vault=document.createElement("section");vault.id="aiQuestVault";vault.className="ai-quest-vault";vault.hidden=true;
 vault.innerHTML='<div class="ai-vault-header"><strong id="aiVaultStatus">AI VAULT UNLOCKED</strong><button type="button" id="aiVaultClose" aria-label="Close AI Vault">✕</button></div><p>Explore practical engineering experiments with synthetic sample data.</p><div class="ai-vault-actions"><button type="button" data-demo="api">COMPARE API RESPONSES</button><button type="button" data-demo="xpath">EXTRACT SELECTORS</button><a href="https://aiinsights80.wordpress.com/" target="_blank" rel="noopener noreferrer">AI FIELD NOTES ↗</a></div><pre id="aiDemoOutput" aria-live="polite">Select a demo to inspect how it works.</pre><button type="button" id="aiVaultReplay">↻ REPLAY QUEST</button>';
 document.body.append(vault);
}
if(safe==="contact"){
 const quick=document.createElement("nav");quick.id="contactQuickActions";quick.className="cafe-quick-actions";quick.setAttribute("aria-label","Quick contact actions");
 const actions=[
  {key:"email",label:"✉ EMAIL ME",href:"mailto:vijay.sekhar18@gmail.com?subject=Hello%20from%20your%20NYC%20Portfolio"},
  {key:"linkedin",label:"in LINKEDIN",href:"https://www.linkedin.com/in/vijaygopireddy/"},
  {key:"copy",label:"⧉ COPY EMAIL"},
  {key:"menu",label:"☕ COFFEE MENU"},
  {key:"phone",label:"☎ 774-486-****"},
  {key:"location",label:"⌖ NEW YORK"}
 ];
 const status=document.createElement("span");status.id="cafeCopyStatus";status.className="cafe-copy-status";status.setAttribute("role","status");status.setAttribute("aria-live","polite");
 async function copyEmail(){
  try{
   if(!navigator.clipboard?.writeText)throw Error("Clipboard unavailable");
   await navigator.clipboard.writeText("vijay.sekhar18@gmail.com");
   status.textContent="✓ Email copied";
  }catch(_err){
   status.textContent="Copy unavailable — select the address in Email details.";
   openDetail("email");
  }
 }
 for(const action of actions){
  const el=action.href?document.createElement("a"):document.createElement("button");
  el.dataset.contact=action.key;el.textContent=action.label;
  if(action.href){el.href=action.href;if(action.key==="linkedin"){el.target="_blank";el.rel="noopener noreferrer"}}
  else{el.type="button";el.addEventListener("click",()=>action.key==="copy"?copyEmail():openDetail(action.key))}
  quick.append(el);
 }
 quick.append(status);document.body.append(quick);
}

// SERVICES-only optional guided walkthrough, with direct-access exhibit controls.
let servicesTour=false,servicesTourStart=0,servicesTourPaused=false;
const servicesReducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let servicesTourButton=null;
function setServicesTour(active){
 if(safe!=="services")return;
 servicesTour=active;servicesTourStart=performance.now();servicesTourPaused=false;
 servicesTourButton.textContent=active?"■ EXIT TOUR":"▶ GUIDED TOUR";
 servicesTourButton.setAttribute("aria-pressed",String(active));
 document.getElementById("servicesTourStatus").textContent=active?"Guided tour running · Select any exhibit to pause":"Select a station or start the guided tour.";
 if(!active){desiredTheta=.12;desiredPhi=1.38;desiredRadius=root.clientWidth<600?30:20}
}
function updateServicesTour(now){
 if(!servicesTour)return false;
 if(dialog.open){servicesTourStart+=Math.min(50,now-(window.__servicesLastTourTime||now));window.__servicesLastTourTime=now;return true}
 window.__servicesLastTourTime=now;
 const stops=window.__servicesStations||[];
 if(!stops.length)return false;
 const duration=servicesReducedMotion?16000:32000;
 const p=Math.min((now-servicesTourStart)/duration,1);
 const segment=Math.min(3,Math.floor(p*4)),local=Math.min(1,p*4-segment);
 const from=stops[segment],to=stops[Math.min(segment+1,3)];
 // Dwell at each exhibit before transitioning to the next bay.
 const travel=THREE.MathUtils.clamp((local-.4)/.6,0,1);
 const smooth=travel*travel*(3-2*travel);
 const x=THREE.MathUtils.lerp(from.x,to.x,smooth);
 const dest=new THREE.Vector3(x,servicesReducedMotion?4.4:4.6,servicesReducedMotion?6.7:6.0);
 camera.position.lerp(dest,servicesReducedMotion?1:.055);
 camera.lookAt(x,2.7,-4.4);
 const status=document.getElementById("servicesTourStatus");
 if(status)status.textContent="EXHIBIT 0"+(segment+1)+" / 04 · "+stops[segment].story+" · Select to explore";
 if(p>=1)setServicesTour(false);
 return true;
}
if(safe==="services"){
 const hud=document.createElement("section");hud.id="servicesHud";hud.className="services-hud";hud.setAttribute("aria-label","Engineering Studio navigation");
 hud.innerHTML='<div class="services-hud-title"><strong>✦ VSR INNOVATION CENTER</strong><span>04 EXHIBITS</span></div><p id="servicesTourStatus" role="status">Select a station or start the guided tour.</p><div class="services-hud-controls"><button id="servicesTour" type="button" aria-pressed="false">▶ GUIDED TOUR</button><button id="servicesTourExit" type="button">⌖ RESET VIEW</button></div><div class="services-hud-grid"></div>';
 document.body.append(hud);
 servicesTourButton=hud.querySelector("#servicesTour");
 servicesTourButton.onclick=()=>setServicesTour(!servicesTour);
 hud.querySelector("#servicesTourExit").onclick=()=>setServicesTour(false);
 const labels=[["automation","01 · Automation"],["quality","02 · Quality"],["cloud","03 · Cloud & Data"],["aiEngineering","04 · AI Engineering"]];
 for(const [key,label] of labels){
  const b=document.createElement("button");b.type="button";b.dataset.service=key;b.textContent=label;
  b.onclick=()=>{if(servicesTour)setServicesTour(false);openDetail(key)};
  hud.querySelector(".services-hud-grid").append(b);
 }
 dialog.addEventListener("close",()=>{if(servicesTour)window.__servicesLastTourTime=performance.now()});
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
let aiMode="idle",aiStart=0,aiLane=0,aiProgress=0,aiCollected=new Set(),aiLast=0,aiStage=0,aiStageHold=0,aiVaultOpen=false,aiManualLane=false;
let aiAudioEnabled=false,aiAudioContext=null;
const aiHud=document.getElementById("aiQuestHud");
const aiPassport=aiHud?.querySelector("#aiQuestPassport");
const aiPassportLabels={openai:"OpenAI",claude:"Claude",hackathon:"Cognizant",innovation:"Innovation"};
function aiRenderPassport(){
 if(!aiPassport)return;
 aiPassport.replaceChildren();
 for(const key of aiKeys){
  const button=document.createElement("button");button.type="button";button.className="ai-passport-stamp"+(aiCollected.has(key)?" earned":"");
  button.textContent=(aiCollected.has(key)?"✓ ":"◇ ")+aiPassportLabels[key];
  button.setAttribute("aria-label",aiPassportLabels[key]+(aiCollected.has(key)?" discovered":" not yet discovered"));
  button.onclick=()=>openDetail(key);aiPassport.append(button);
 }
}
function aiUnlockVault(){
 if(aiVaultOpen)return;
 aiVaultOpen=true;aiSound("unlock");aiHud?.classList.add("ai-vault-unlocked");
 if(window.__aiQuestWorld){window.__aiQuestWorld.core.material.emissive.set("#ffe77d");window.__aiQuestWorld.core.scale.setScalar(1.3);window.__aiQuestWorld.coreHalo.color.set("#ffd27a")}
 const vault=document.getElementById("aiQuestVault");
 if(vault){vault.hidden=false;vault.querySelector("#aiVaultStatus").textContent="✨ AI QUEST COMPLETE · VAULT UNLOCKED"}
 aiHud.querySelector("#aiQuestVaultButton").hidden=false;
 aiHud.querySelector("#aiQuestHint").textContent="🏆 All four milestones unlocked! Explore the interactive demos in your Innovation Vault.";
}
function aiDemo(type){
 const output=document.getElementById("aiDemoOutput");if(!output)return;
 if(type==="api"){
  const old={account:"DEMO-101",status:"ACTIVE",balance:1200},next={account:"DEMO-101",status:"ACTIVE",balance:1250};
  const differences=Object.keys(old).filter(k=>old[k]!==next[k]).map(k=>k+": OLZ="+old[k]+" → NLZ="+next[k]);
  output.textContent="SYNTHETIC API MIGRATION COMPARISON\\n"+JSON.stringify({oldLandingZone:old,newLandingZone:next},null,2)+"\\nDIFFERENCES: "+differences.join("; ");
 }else{
  const html='<main><button id="submit" data-testid="submit-order">Place Order</button></main>';
  output.textContent="SYNTHETIC HTML\\n"+html+"\\nSUGGESTED SELECTORS\\n1. [data-testid=\\\"submit-order\\\"]\\n2. #submit\\n3. button:has-text(\\\"Place Order\\\")\\nDemo illustrates locator generation; no live AI service or client data.";
 }
}

let aiCelebrationTimer=null;
const aiReduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function aiCelebrate(key){
 if(!aiHud)return;
 let banner=document.getElementById("aiQuestCelebration");
 if(!banner){banner=document.createElement("div");banner.id="aiQuestCelebration";banner.className="ai-quest-celebration";banner.setAttribute("role","status");document.body.append(banner)}
 const names={openai:"OPENAI",claude:"CLAUDE",hackathon:"COGNIZANT",innovation:"INNOVATION"};
 banner.replaceChildren();const headline=document.createElement("strong");headline.textContent="✦ MILESTONE UNLOCKED ✦";const label=document.createElement("span");label.textContent=names[key]+" COLLECTED!";banner.append(headline,label);
 for(let i=0;i<18;i++){const spark=document.createElement("i");spark.className="ai-quest-spark";spark.style.setProperty("--angle",(i*20)+"deg");spark.style.setProperty("--hue",String(i*21));banner.append(spark)}
 banner.classList.remove("celebrate");void banner.offsetWidth;banner.classList.add("celebrate");
 clearTimeout(aiCelebrationTimer);aiCelebrationTimer=setTimeout(()=>banner.classList.remove("celebrate"),2200);
}
function aiQuestDiscover(key){
 if(!aiHud||!aiKeys.includes(key))return;
 const isNew=!aiCollected.has(key);aiCollected.add(key);
 if(isNew)aiCelebrate(key);
 aiHud.querySelector("#aiQuestProgress").textContent=aiCollected.size+" / 4 DISCOVERED";aiRenderPassport();
 if(isNew)aiSound("collect");
 if(aiCollected.size===4&&aiMode!=="play")aiUnlockVault();
}
// Sound is opt-in; no autoplay or downloaded audio assets.
function aiSound(kind){
 if(!aiAudioEnabled)return;
 try{
  const AudioCtx=window.AudioContext||window.webkitAudioContext;
  if(!AudioCtx)return;
  aiAudioContext??=new AudioCtx();
  if(aiAudioContext.state==="suspended")aiAudioContext.resume();
  const now=aiAudioContext.currentTime;
  const notes=kind==="unlock"?[523,659,784,1047]:kind==="collect"?[659,988]:kind==="move"?[330]:[440,554];
  notes.forEach((hz,i)=>{
   const osc=aiAudioContext.createOscillator(),gain=aiAudioContext.createGain();
   osc.type="sine";osc.frequency.setValueAtTime(hz,now+i*.095);
   gain.gain.setValueAtTime(.0001,now+i*.095);
   gain.gain.exponentialRampToValueAtTime(.055,now+i*.095+.015);
   gain.gain.exponentialRampToValueAtTime(.0001,now+i*.095+.16);
   osc.connect(gain).connect(aiAudioContext.destination);
   osc.start(now+i*.095);osc.stop(now+i*.095+.17);
  });
 }catch(_error){/* Audio is optional; game stays playable. */}
}
function aiSetMode(mode){
 if(!aiHud)return;
 aiMode=mode;window.__aiQuestPlaying=mode==="play";aiStageHold=0;aiStage=0;aiManualLane=false;if(mode!=="idle")aiSound("start");aiStart=performance.now();aiLast=0;aiLane=0;aiProgress=0;
 aiHud.querySelector("#aiQuestTour").hidden=mode!=="idle";
 aiHud.querySelector("#aiQuestPlay").hidden=mode!=="idle";
 aiHud.querySelector("#aiQuestExit").hidden=mode==="idle";
 aiHud.querySelector(".ai-quest-move").hidden=mode!=="play";
 aiHud.querySelector("#aiQuestHint").textContent=mode==="tour"?"Cinematic tour · Select a collectible to pause and read":mode==="play"?"Four tracks · Use ← → or touch to switch lanes and collect coins.":"Choose a mode or tap a glowing collectible.";
 if(mode==="idle"){desiredTheta=.12;desiredPhi=1.38;desiredRadius=root.clientWidth<600?30:20;window.__aiQuestWorld?.rider.position.set(-8.2,.65,7.5)}
}
if(aiHud){
 aiRenderPassport();
 aiHud.querySelector("#aiQuestTour").onclick=()=>aiSetMode("tour");
 document.querySelectorAll("[data-demo]").forEach(b=>b.onclick=()=>aiDemo(b.dataset.demo));
 document.getElementById("aiVaultClose").onclick=()=>document.getElementById("aiQuestVault").hidden=true;
 document.getElementById("aiVaultReplay").onclick=()=>{document.getElementById("aiQuestVault").hidden=true;aiSetMode("play")};
 aiHud.querySelector("#aiQuestVaultButton").onclick=()=>{document.getElementById("aiQuestVault").hidden=false};
 aiHud.querySelector("#aiQuestPlay").onclick=()=>aiSetMode("play");
 aiHud.querySelector("#aiQuestExit").onclick=()=>aiSetMode("idle");
 aiHud.querySelector("#aiQuestSound").onclick=()=>{aiAudioEnabled=!aiAudioEnabled;const b=aiHud.querySelector("#aiQuestSound");b.textContent=aiAudioEnabled?"🔊 SOUND ON":"🔇 SOUND OFF";b.setAttribute("aria-pressed",String(aiAudioEnabled));if(aiAudioEnabled)aiSound("start")};
 aiHud.querySelectorAll("[data-move]").forEach(b=>b.onclick=()=>{aiLane=THREE.MathUtils.clamp(aiLane+Number(b.dataset.move),0,3);aiManualLane=true;aiSound("move")});
 window.addEventListener("keydown",e=>{if(aiMode!=="play"||dialog.open)return;if(["ArrowLeft","a","A"].includes(e.key)){e.preventDefault();aiLane=Math.max(0,aiLane-1);aiManualLane=true;aiSound("move")}if(["ArrowRight","d","D"].includes(e.key)){e.preventDefault();aiLane=Math.min(3,aiLane+1);aiManualLane=true;aiSound("move")}if(e.key==="Escape")aiSetMode("idle")});
 dialog.addEventListener("close",()=>{if(aiMode==="tour")aiStart=performance.now()-aiProgress*26000;if(aiMode==="play"&&aiStageHold===1)aiStageHold=2});
}
function updateAiQuest(now){
 if(aiMode==="idle"||!window.__aiQuestWorld)return false;
 if(dialog.open){aiStart+=Math.min(now-(aiLast||now),60);aiLast=now;return true;}
 const world=window.__aiQuestWorld,elapsed=(now-aiStart)/1000;
 if(aiMode==="tour"){
  // Smoothly follow all four exhibit windows, keeping each label visible.
  aiProgress=Math.min(elapsed/26,1);
  const p=aiReduced?aiProgress:aiProgress*aiProgress*(3-2*aiProgress);
  const route=window.__aiQuestWorld.tokens;
  const segment=Math.min(2,Math.floor(p*3));const blend=Math.min(1,p*3-segment);
  const from=route[segment],to=route[segment+1];
  const x=THREE.MathUtils.lerp(from.x,to.x,blend),z=THREE.MathUtils.lerp(from.z,to.z,blend);
  const dest=new THREE.Vector3(x,4.6,z+7.1);
  camera.position.lerp(dest,aiReduced?1:.055);
  camera.lookAt(x,3.1,z);
  if(aiProgress>=1)aiSetMode("idle");
 }else{
  const dt=Math.min((now-(aiLast||now))/1000,.06);aiLast=now;
  const tokens=world.tokens,checkpoint=tokens[aiStage];
  if(!checkpoint){aiSetMode("idle");return true}
  const targetX=world.aiLaneXs[aiLane],stopZ=checkpoint.z+1.5;
  world.rider.position.x+=(targetX-world.rider.position.x)*Math.min(1,dt*9);
  if(!aiStageHold)world.rider.position.z=Math.max(stopZ,world.rider.position.z-dt*2.7);
  // Camera stays behind and above the player, framing the approaching checkpoint.
  camera.position.lerp(new THREE.Vector3(world.rider.position.x,5.15,world.rider.position.z+7.1),aiReduced?1:.095);
  camera.lookAt(world.rider.position.x*.65,2.5,world.rider.position.z-4.2);
  if(world.rider.position.z<=stopZ+.025){
   world.rider.position.z=stopZ;
   if(aiLane!==aiStage){
    aiHud.querySelector("#aiQuestHint").textContent="CHECKPOINT "+(aiStage+1)+" / 4 · Switch to the "+checkpoint.name+" track to collect.";
   }else if(!aiStageHold){
    aiStageHold=1;window.__aiQuestPlaying=false;
    openDetail(checkpoint.key);
    aiHud.querySelector("#aiQuestHint").textContent="✨ "+checkpoint.name+" COLLECTED · "+(aiStage+1)+" / 4";
   }else if(aiStageHold===2&&!dialog.open){
    aiStage++;
    aiStageHold=0;window.__aiQuestPlaying=true;
    if(aiStage===4){aiSetMode("idle");aiUnlockVault()}
    else{aiLane=aiStage;aiManualLane=false;aiHud.querySelector("#aiQuestHint").textContent="AUTO-SWITCHING → "+tokens[aiStage].name+" · Use arrows to steer manually.";}
   }
  }

 }
 return true;
}
const map=document.getElementById("districtNav"),mapButton=document.getElementById("districtMap");mapButton.onclick=()=>{map.hidden=!map.hidden;mapButton.setAttribute("aria-expanded",String(!map.hidden))};
let theta=.12,phi=1.38,radius=20,desiredTheta=theta,desiredPhi=phi,desiredRadius=radius;
const target=new THREE.Vector3(0,2.6,-3.4);
function update(){if(updateAiQuest(performance.now()))return;if(updateServicesTour(performance.now()))return;if(updateJourney(performance.now()))return;theta+=(desiredTheta-theta)*.12;phi+=(desiredPhi-phi)*.12;radius+=(desiredRadius-radius)*.12;camera.position.set(target.x+radius*Math.sin(phi)*Math.sin(theta),target.y+radius*Math.cos(phi),target.z+radius*Math.sin(phi)*Math.cos(theta));camera.lookAt(target)}
function resize(){const mobile=root.clientWidth<600;camera.aspect=root.clientWidth/root.clientHeight;camera.fov=mobile?62:48;if(mobile&&desiredRadius<28){desiredRadius=30;radius=30}else if(!mobile&&desiredRadius>35){desiredRadius=22;radius=22}camera.updateProjectionMatrix();renderer.setSize(root.clientWidth,root.clientHeight,false)}window.addEventListener("resize",resize);resize();
let drag=null,moved=false;renderer.domElement.addEventListener("pointerdown",e=>{if(aiMode!=="idle")aiSetMode("idle");if(journeyActive)setJourney(false);if(servicesTour)setServicesTour(false);drag={x:e.clientX,y:e.clientY};moved=false;renderer.domElement.setPointerCapture(e.pointerId)});
renderer.domElement.addEventListener("pointermove",e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.abs(dx)+Math.abs(dy)>3)moved=true;desiredTheta-=dx*.006;desiredPhi=THREE.MathUtils.clamp(desiredPhi+dy*.005,.4,1.65);drag={x:e.clientX,y:e.clientY}});
renderer.domElement.addEventListener("pointerup",e=>{if(!moved){const p=new THREE.Vector2(e.clientX/root.clientWidth*2-1,-e.clientY/root.clientHeight*2+1);const ray=new THREE.Raycaster();ray.setFromCamera(p,camera);const hit=ray.intersectObjects(clickable)[0];if(hit?.object.userData.action)openDetail(hit.object.userData.action)}drag=null});
renderer.domElement.addEventListener("pointercancel",()=>drag=null);
renderer.domElement.addEventListener("pointermove",e=>{if(drag)return;const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2(e.clientX/root.clientWidth*2-1,-e.clientY/root.clientHeight*2+1),camera);renderer.domElement.style.cursor=ray.intersectObjects(clickable).length?"pointer":"grab"});
renderer.domElement.addEventListener("wheel",e=>{e.preventDefault();if(aiMode!=="idle")aiSetMode("idle");if(journeyActive)setJourney(false);if(servicesTour)setServicesTour(false);desiredRadius=THREE.MathUtils.clamp(desiredRadius+Math.sign(e.deltaY)*1.3,10,60)},{passive:false});
document.getElementById("districtReset").onclick=()=>{if(aiMode!=="idle")aiSetMode("idle");if(journeyActive)setJourney(false);if(servicesTour)setServicesTour(false);desiredTheta=.12;desiredPhi=1.38;desiredRadius=root.clientWidth<600?30:20};
function animate(){requestAnimationFrame(animate);update();window.__aiVaultAnimate?.();window.__cafeAnimate?.();window.__servicesAnimate?.();renderer.render(scene,camera)}animate();