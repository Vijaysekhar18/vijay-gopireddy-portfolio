import * as THREE from "https://esm.sh/three@0.170.0";
const root=document.getElementById("roomScene"),scene=new THREE.Scene();scene.background=new THREE.Color("#dce7e9");
const camera=new THREE.PerspectiveCamera(48,1,.1,150),renderer=new THREE.WebGLRenderer({antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.shadowMap.enabled=true;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.55;root.append(renderer.domElement);
scene.add(new THREE.HemisphereLight("#fff8e7","#8c8b82",3));const light=new THREE.DirectionalLight("#fff6db",3);light.position.set(-7,18,10);light.castShadow=true;light.shadow.mapSize.set(1024,1024);scene.add(light);
const material=(color,extra={})=>new THREE.MeshStandardMaterial({color,roughness:.78,...extra}),wall=material("#d8c5a6"),floor=material("#c99967"),trim=material("#b9a88d"),dark=material("#30383a"),screen=material("#153a59",{emissive:"#0c263b",emissiveIntensity:.3}),white=material("#f8f5ea"),gold=material("#e7b825"),glass=material("#a4d4dc",{transparent:true,opacity:.68}),plant=material("#5e9860"),steel=material("#606c70");
const clickable=[];
function cube(w,h,d,mat,x,y,z,parent=scene){const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
function cyl(r1,r2,h,mat,x,y,z){const o=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,h,12),mat);o.position.set(x,y,z);o.castShadow=true;scene.add(o);return o}
function textPlane(title,subtitle,bg="#fff8e6",fg="#272c2b"){const canvas=document.createElement("canvas");canvas.width=1024;canvas.height=512;const ctx=canvas.getContext("2d");ctx.fillStyle=bg;ctx.fillRect(0,0,1024,512);ctx.fillStyle="#e6b933";ctx.fillRect(0,0,1024,22);ctx.fillStyle="#273e43";ctx.fillRect(45,62,934,95);ctx.fillStyle="#f7f3e7";ctx.font="bold 56px Arial";ctx.fillText(title,78,128);ctx.fillStyle=fg;ctx.font="bold 32px Arial";ctx.fillText(subtitle,75,230);ctx.fillStyle="#e2bc4b";ctx.fillRect(75,280,870,5);for(let i=0;i<6;i++){ctx.fillStyle=["#2e6e7d","#d8a736","#73a397"][i%3];ctx.fillRect(85+i*142,320-(i%3)*22,95,90+(i%3)*22)}ctx.fillStyle="#454a44";ctx.font="bold 25px Arial";ctx.fillText("CLICK TO EXPLORE  →",75,472);const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshBasicMaterial({map:tex,side:THREE.DoubleSide})}
cube(20,.35,15,floor,0,-.2,0);cube(18,.035,1.2,trim,0,.025,-6.6);cube(20,9,.3,wall,0,4.3,-7.4);cube(.3,9,15,wall,-9.9,4.3,0);cube(.3,9,15,wall,9.9,4.3,0);
// A single floating walnut workstation replaces the crowded furniture.
const walnut=material("#674d3b"),bronze=material("#bb9b72",{metalness:.4,roughness:.4});
cube(17,.2,2.15,walnut,0,1.3,-4.65);
for(const x of [-7.7,7.7])cube(.18,1.3,1.8,bronze,x,.65,-4.65);
function pot(x,z){cyl(.43,.35,.7,material("#b89c7b"),x,.35,z);for(let i=0;i<5;i++){const leaf=new THREE.Mesh(new THREE.ConeGeometry(.33,1.15,5),plant);leaf.position.set(x+Math.sin(i*1.26)*.2,1.25,z+Math.cos(i*1.26)*.2);scene.add(leaf)}}
pot(-8.5,5);pot(8.5,5);
const companyData={
 td:{name:"TD BANK",eyebrow:"CURRENT CHAPTER",summary:"My current chapter in banking technology and quality engineering. This exhibit introduces the work and experience I bring to TD Bank; project-specific details will be added once confirmed.",focus:"Banking technology · Quality engineering · Engineering collaboration",color:"#2d9d5c"},
 lpl:{name:"LPL FINANCIAL",eyebrow:"FINANCIAL TECHNOLOGY",summary:"Led quality strategy and cross-functional QE coordination for Account View and the old-to-new AWS landing-zone migration, from analysis and testing through production readiness.",focus:"AWS Lambda · Step Functions · Glue · Kafka · Athena · API migration validation",color:"#5088b6"},
 dbs:{name:"DBS",eyebrow:"BANKING EXPERIENCE",summary:"Part of my professional experience in banking technology, software quality and automation. More project-specific detail will be added after verification.",focus:"Banking · Software quality · Test automation",color:"#c64c4a"},
 wells:{name:"WELLS FARGO",eyebrow:"BANKING EXPERIENCE",summary:"Experience supporting quality engineering in the banking domain. Project-specific responsibilities and outcomes will be expanded once verified.",focus:"Banking · Quality engineering · Testing",color:"#c54b43"},
 cognizant:{name:"COGNIZANT",eyebrow:"ENGINEERING & DELIVERY",summary:"Engineering and quality leadership across complex client engagements, with a focus on test strategy, automation, cloud delivery and cross-functional collaboration.",focus:"Engineering delivery · Test strategy · Automation · Leadership",color:"#4075a8"}
};

const exhibitPositions=[[-6.5,-4.65,"wells"],[-3.25,-4.65,"dbs"],[0,-4.65,"td"],[3.25,-4.65,"lpl"],[6.5,-4.65,"cognizant"]];
function displayMaterial(name,featured){
 const c=document.createElement("canvas");c.width=1024;c.height=640;const g=c.getContext("2d");
 g.fillStyle=featured?"#124b32":"#1c303a";g.fillRect(0,0,1024,640);
 g.fillStyle=featured?"#83e2a7":"#d4b989";g.fillRect(70,72,95,8);
 g.textAlign="center";g.fillStyle="#fff8e9";g.font="bold 88px Arial";g.fillText(name,512,283,940);
 g.font="bold 34px Arial";g.fillStyle=featured?"#91efb8":"#b5cbd0";g.fillText(featured?"CURRENT CHAPTER":"EXPLORE MY WORK",512,375,920);
 g.font="27px Arial";g.fillText("CLICK TO EXPLORE  ↗",512,525);
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide});
}
for(const [x,z,key] of exhibitPositions){
 const featured=key==="td",w=featured?2.95:2.7,h=featured?1.85:1.7;
 const frame=cube(w+.13,h+.12,.13,material(featured?"#286e49":"#28383d",{metalness:.32,roughness:.38}),x,2.65,z);
 const panel=new THREE.Mesh(new THREE.PlaneGeometry(w,h),displayMaterial(companyData[key].name,featured));
 panel.position.set(x,2.65,z+.075);scene.add(panel);
 const stand=cube(.12,.47,.12,bronze,x,1.52,z),base=cube(.85,.05,.44,bronze,x,1.3,z+.12);
 for(const obj of [frame,panel,stand,base]){obj.userData.kind="company:"+key;clickable.push(obj)}
 if(featured){const glow=new THREE.PointLight("#7bdba1",3,4);glow.position.set(x,2.6,z+1.2);scene.add(glow)}
}
function wallArtwork(city){
 const c=document.createElement("canvas");c.width=800;c.height=960;const g=c.getContext("2d");
 const sky=g.createLinearGradient(0,0,0,960);sky.addColorStop(0,city==="nyc"?"#24445e":"#63889c");sky.addColorStop(1,"#f2c797");g.fillStyle=sky;g.fillRect(0,0,800,960);
 g.fillStyle="#f9dcaa";g.beginPath();g.arc(615,190,75,0,Math.PI*2);g.fill();
 if(city==="nyc"){
  for(let i=0;i<27;i++){const x=i*31,h=220+i*53%260;g.fillStyle=i%2?"#253f52":"#3b5968";g.fillRect(x,770-h,29,h);
  g.fillStyle="#f4cb89";for(let y=785-h;y<750;y+=29)g.fillRect(x+9,y,5,10)}
  g.fillStyle="#203a50";g.fillRect(360,205,72,565);g.fillRect(378,155,36,55);g.fillRect(392,90,6,75);
  g.fillRect(580,280,58,490);g.fillRect(607,145,5,135);
 }else{
  g.fillStyle="#d5a276";g.fillRect(185,420,430,355);
  for(const x of [174,626]){
   g.fillStyle="#edc390";g.fillRect(x-32,245,64,530);
   for(const y of [320,480,635]){g.fillStyle="#ad7753";g.fillRect(x-42,y,84,20)}
   g.fillStyle="#e8c08e";g.beginPath();g.arc(x,240,43,Math.PI,0);g.fill();
   g.fillStyle="#8e6148";g.fillRect(x-4,173,8,28);
  }
  g.fillStyle="#9b6c4e";for(const x of [305,495]){g.beginPath();g.arc(x,570,67,Math.PI,0);g.fill();g.fillRect(x-67,570,134,205)}
  g.fillStyle="#f0cc9f";g.beginPath();g.arc(400,404,45,Math.PI,0);g.fill();
 }
 g.fillStyle="#f9edd8";g.fillRect(0,790,800,170);g.fillStyle="#344953";g.textAlign="center";g.font="bold 51px Georgia";g.fillText(city==="nyc"?"NEW YORK":"HYDERABAD",400,866);
 g.font="24px Arial";g.fillText(city==="nyc"?"THE CITY OF IDEAS":"CHARMINAR · HOME & HERITAGE",400,918);
 const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshBasicMaterial({map:t,side:THREE.DoubleSide});
}
function framedArt(x,rot,city){
 const group=new THREE.Group();group.position.set(x,4.4,-.6);group.rotation.y=rot;scene.add(group);
 cube(3.8,4.65,.15,bronze,0,0,0,group);
 const art=new THREE.Mesh(new THREE.PlaneGeometry(3.52,4.37),wallArtwork(city));art.position.z=.09;group.add(art);
}
framedArt(-9.64,Math.PI/2,"nyc");framedArt(9.64,-Math.PI/2,"hyd");
const projects={cloud:["Cloud Landing Zone Migration","Led end-to-end QE strategy for AWS landing-zone modernization, from analysis to production, across functional, data, performance and automation testing.","AWS · Lambda · Glue · Kafka · Athena · CloudWatch"],automation:["API Migration Comparison","Built a tool to compare legacy and new API behavior across hundreds of input combinations, accelerating regression analysis.","Java · API Testing · Automation · Regression"],ai:["AI-Assisted QE","Experimented with AI-driven element discovery and practical engineering productivity tools, alongside AI Field Notes.","AI · Playwright · Engineering Tools"],leadership:["Quality Engineering Leadership","Led test strategy, release readiness, stakeholder coordination and cross-functional QE teams in financial services.","Test Strategy · Quality Metrics · Release Readiness"]};
const overlay=document.getElementById("projectOverlay"),content=document.getElementById("projectContent");
function showProject(k){if(k.startsWith("company:")){const d=companyData[k.slice(8)];if(!d)return;content.replaceChildren();for(const [tag,value] of [["small",d.eyebrow],["h2",d.name],["p",d.summary],["small",d.focus]]){const e=document.createElement(tag);e.textContent=value;content.append(e)}overlay.hidden=false;if(fp)exitFP();return}if(!projects[k])return;const [title,description,tags]=projects[k];content.replaceChildren();for(const [tag,value] of [["h2",title],["p",description],["small",tags]]){const e=document.createElement(tag);e.textContent=value;content.append(e)}overlay.hidden=false;if(fp)exitFP()}
document.getElementById("closeProject").onclick=()=>overlay.hidden=true;document.getElementById("roomNext").onclick=()=>showProject("company:td");
const companyNav=document.getElementById("companyExhibits");
if(companyNav)for(const button of companyNav.querySelectorAll("[data-company]"))button.addEventListener("click",()=>showProject("company:"+button.dataset.company));
let yaw=.75,pitch=.45,distance=22,fp=false,fpYaw=0,fpPitch=0,fpPos=new THREE.Vector3(0,2.1,5),drag=false,lastX=0,lastY=0,moved=false;const keys=new Set();
function enterFP(){fp=true;fpPos.set(0,2.1,5);fpYaw=0;fpPitch=0;document.getElementById("firstPerson").textContent="Exit First-Person";document.getElementById("roomHint").hidden=false;root.requestPointerLock?.()}
function exitFP(){fp=false;if(document.pointerLockElement)document.exitPointerLock?.();document.getElementById("firstPerson").textContent="Enter First-Person";document.getElementById("roomHint").hidden=true}
document.getElementById("firstPerson").onclick=()=>fp?exitFP():enterFP();
document.addEventListener("keydown",e=>{if(e.code==="Escape"){if(fp)exitFP();else overlay.hidden=true}keys.add(e.code)});document.addEventListener("keyup",e=>keys.delete(e.code));
root.addEventListener("pointerdown",e=>{drag=true;moved=false;lastX=e.clientX;lastY=e.clientY});window.addEventListener("pointerup",()=>drag=false);
window.addEventListener("pointermove",e=>{if(fp){if(document.pointerLockElement===root){fpYaw-=e.movementX*.0028;fpPitch=THREE.MathUtils.clamp(fpPitch-e.movementY*.0028,-1.2,1.2)}else if(drag){fpYaw-=(e.clientX-lastX)*.004;fpPitch=THREE.MathUtils.clamp(fpPitch-(e.clientY-lastY)*.004,-1.2,1.2)}}else if(drag){yaw-=(e.clientX-lastX)*.006;pitch=THREE.MathUtils.clamp(pitch+(e.clientY-lastY)*.004,.2,1.25)}if(Math.abs(e.clientX-lastX)+Math.abs(e.clientY-lastY)>5)moved=true;lastX=e.clientX;lastY=e.clientY});
root.addEventListener("wheel",e=>{e.preventDefault();if(!fp)distance=THREE.MathUtils.clamp(distance+Math.sign(e.deltaY)*1.8,14,37)},{passive:false});
const ray=new THREE.Raycaster();root.addEventListener("click",e=>{if(moved||fp)return;const r=root.getBoundingClientRect();ray.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),camera);const hit=ray.intersectObjects(clickable)[0];if(hit)showProject(hit.object.userData.kind)});
document.getElementById("roomReset").onclick=()=>{exitFP();yaw=.75;pitch=.45;distance=22};
document.getElementById("settingsToggle").onclick=()=>document.getElementById("settingsMenu").hidden=!document.getElementById("settingsMenu").hidden;
let night=false;document.getElementById("themeToggle").onclick=()=>{night=!night;scene.background.set(night?"#151d29":"#dce7e9");light.intensity=night?.7:3;document.body.classList.toggle("night",night);document.getElementById("themeToggle").textContent=night?"☀ Day mode":"☾ Night mode"};
const clock=new THREE.Clock();function resize(){camera.aspect=root.clientWidth/root.clientHeight;camera.updateProjectionMatrix();renderer.setSize(root.clientWidth,root.clientHeight,false)}window.addEventListener("resize",resize);resize();
function animate(){requestAnimationFrame(animate);const dt=Math.min(clock.getDelta(),.05);if(fp){const forward=new THREE.Vector3(Math.sin(fpYaw),0,-Math.cos(fpYaw)),right=new THREE.Vector3(Math.cos(fpYaw),0,Math.sin(fpYaw));const speed=dt*4;if(keys.has("KeyW")||keys.has("ArrowUp"))fpPos.addScaledVector(forward,speed);if(keys.has("KeyS")||keys.has("ArrowDown"))fpPos.addScaledVector(forward,-speed);if(keys.has("KeyA")||keys.has("ArrowLeft"))fpPos.addScaledVector(right,-speed);if(keys.has("KeyD")||keys.has("ArrowRight"))fpPos.addScaledVector(right,speed);fpPos.x=THREE.MathUtils.clamp(fpPos.x,-8.8,8.8);fpPos.z=THREE.MathUtils.clamp(fpPos.z,-6.3,6.5);camera.position.copy(fpPos);camera.rotation.order="YXZ";camera.rotation.set(fpPitch,fpYaw,0)}else{camera.position.set(Math.sin(yaw)*Math.cos(pitch)*distance,Math.sin(pitch)*distance,Math.cos(yaw)*Math.cos(pitch)*distance);camera.lookAt(0,2.2,0)}renderer.render(scene,camera)}animate();