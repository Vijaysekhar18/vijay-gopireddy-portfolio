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
for(let x=-9;x<10;x+=2){cube(.035,.035,14,trim,x,.015,0)}for(let z=-7;z<8;z+=2)cube(19,.035,.035,trim,0,.015,z);
function sign(x,y,z,w,h,title,subtitle,kind,rot=0){const frame=cube(w+.35,h+.35,.18,dark,x,y,z);frame.rotation.y=rot;const panel=new THREE.Mesh(new THREE.PlaneGeometry(w,h),textPlane(title,subtitle));panel.position.set(x,y,z+.105);panel.rotation.y=rot;scene.add(panel);frame.userData.kind=kind;panel.userData.kind=kind;clickable.push(frame,panel)}
sign(-5.4,5,-7.13,6.5,3.25,"CLOUD PLATFORM","AWS · KAFKA · DATA QUALITY","cloud");
sign(4.2,5,-7.13,6.5,3.25,"AUTOMATION","API MIGRATION · JAVA · QE","automation");
sign(-9.64,4.6,-1.5,4.4,2.5,"AI & INNOVATION","PLAYWRIGHT · AI TOOLS","ai",Math.PI/2);
sign(9.64,4.6,-1.5,4.4,2.5,"LEADERSHIP","TEST STRATEGY · DELIVERY","leadership",-Math.PI/2);
function desk(x,z){cube(4,.18,1.65,white,x,1.65,z);for(const dx of [-1.65,1.65])for(const dz of [-.55,.55])cube(.12,1.55,.12,steel,x+dx,.85,z+dz);cube(1.45,1.1,.08,screen,x,2.32,z-.25);cube(.14,.5,.14,steel,x,1.82,z-.25);cube(1.1,.08,.36,dark,x,1.77,z+.43);cube(.6,.12,.5,dark,x+1.25,1.75,z+.43);cyl(.43,.43,.2,dark,x,1.05,z+1.9);cube(.2,1.15,.2,steel,x,.6,z+1.9)}
desk(-5.1,1.8);desk(4.8,1.8);desk(0,-3.2);
// Monitor screens, keyboards, desk lamps and additional workstation details.
for(const x of [-5.1,4.8,0]){const z=x===0?-3.2:1.8;cube(1.1,.65,.045,material("#3a89ad",{emissive:"#155579",emissiveIntensity:.55}),x,2.35,z-.19);cube(.3,.18,.18,gold,x+1.7,1.85,z-.6);cyl(.11,.11,.45,steel,x+1.7,2.1,z-.6);const lamp=new THREE.Mesh(new THREE.ConeGeometry(.26,.33,10),gold);lamp.rotation.z=.6;lamp.position.set(x+1.5,2.35,z-.6);scene.add(lamp)}
for(let i=0;i<5;i++){cube(.28,.4,.28,material(["#e5bb38","#7babb4","#d88c65"][i%3]),-8.4+i*.4,3.6,-7.03)}
for(let i=0;i<7;i++){cube(.5,.6,.35,material(["#c9a66b","#7bb2a2","#e9b74a"][i%3]),-9.3,3+i*.6,-4.6)}
function server(x,z){cube(1.35,4.6,1.3,dark,x,2.3,z);for(let i=0;i<10;i++){cube(.9,.13,.05,steel,x,.55+i*.38,z+.68);cube(.09,.09,.08,gold,x+.45,.55+i*.38,z+.73)}}
server(7,-4.8);server(8.5,-4.8);
function pot(x,z){cyl(.55,.38,.75,material("#bd845f"),x,.4,z);for(let i=0;i<6;i++){const a=i*Math.PI/3;const leaf=new THREE.Mesh(new THREE.ConeGeometry(.42,1.5,5),plant);leaf.position.set(x+Math.sin(a)*.25,1.5,z+Math.cos(a)*.25);leaf.rotation.z=Math.sin(a)*.32;scene.add(leaf)}}
pot(-8,5.6);pot(8,5.6);

/* The Engineering Atelier — company exhibition and original NYC skyline artwork. */
const companyData={
 td:{name:"TD BANK",eyebrow:"CURRENT CHAPTER",summary:"My current chapter in banking technology and quality engineering. This exhibit introduces the work and experience I bring to TD Bank; project-specific details will be added once confirmed.",focus:"Banking technology · Quality engineering · Engineering collaboration",color:"#2d9d5c"},
 lpl:{name:"LPL FINANCIAL",eyebrow:"FINANCIAL TECHNOLOGY",summary:"Led quality strategy and cross-functional QE coordination for Account View and the old-to-new AWS landing-zone migration, from analysis and testing through production readiness.",focus:"AWS Lambda · Step Functions · Glue · Kafka · Athena · API migration validation",color:"#5088b6"},
 dbs:{name:"DBS",eyebrow:"BANKING EXPERIENCE",summary:"Part of my professional experience in banking technology, software quality and automation. More project-specific detail will be added after verification.",focus:"Banking · Software quality · Test automation",color:"#c64c4a"},
 wells:{name:"WELLS FARGO",eyebrow:"BANKING EXPERIENCE",summary:"Experience supporting quality engineering in the banking domain. Project-specific responsibilities and outcomes will be expanded once verified.",focus:"Banking · Quality engineering · Testing",color:"#c54b43"},
 cognizant:{name:"COGNIZANT",eyebrow:"ENGINEERING & DELIVERY",summary:"Engineering and quality leadership across complex client engagements, with a focus on test strategy, automation, cloud delivery and cross-functional collaboration.",focus:"Engineering delivery · Test strategy · Automation · Leadership",color:"#4075a8"}
};
const exhibitPositions=[[-7.55,3.8,"wells"],[-3.75,3.8,"dbs"],[0,4.2,"td"],[3.75,3.8,"lpl"],[7.55,3.8,"cognizant"]];
const brass=material("#c7a56d",{metalness:.55,roughness:.34}),walnut=material("#503b33"),jade=material("#258650",{emissive:"#14552d",emissiveIntensity:.25});
function museumLabel(title,subtitle,bg,fg="#fff8e6"){
 const c=document.createElement("canvas");c.width=1024;c.height=512;const ctx=c.getContext("2d");
 ctx.fillStyle=bg;ctx.fillRect(0,0,1024,512);ctx.strokeStyle="#caa46b";ctx.lineWidth=18;ctx.strokeRect(12,12,1000,488);
 ctx.textAlign="center";ctx.fillStyle=fg;ctx.font="bold 94px Arial";ctx.fillText(title,512,216,930);
 ctx.font="bold 37px Arial";ctx.fillText(subtitle,512,312,930);ctx.fillStyle="#d9b876";ctx.fillRect(170,367,684,5);
 ctx.font="27px Arial";ctx.fillText("SELECT TO EXPLORE",512,436);
 const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;
 return new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide});
}
for(const [x,z,key] of exhibitPositions){
 const d=companyData[key],featured=key==="td";
 const base=cube(featured?3.35:2.95,featured?.55:.35,2.25,featured?jade:walnut,x,featured?.275:.175,z);
 const plinth=cube(featured?2.8:2.45,featured?1.15:.83,1.65,featured?material("#1c4532",{metalness:.25,roughness:.3}):material("#394a50",{metalness:.24,roughness:.36}),x,featured?1.13:.77,z);
 const band=cube(featured?2.85:2.5,.09,1.73,brass,x,featured?1.72:1.22,z);
 const signMesh=new THREE.Mesh(new THREE.PlaneGeometry(featured?2.6:2.3,featured?1.35:1.12),museumLabel(d.name,featured?"CURRENT CHAPTER":d.eyebrow,featured?"#125c35":"#243942"));
 signMesh.position.set(x,featured?2.5:2.03,z+.91);scene.add(signMesh);
 const plaque=cube(featured?2.65:2.35,.22,.24,brass,x,featured?1.8:1.31,z+.87);
 for(const obj of [base,plinth,band,signMesh,plaque]){obj.userData.kind="company:"+key;clickable.push(obj)}
 if(featured){
  const spotlight=new THREE.SpotLight("#83ffb3",36,11,Math.PI/5,.5);spotlight.position.set(x,7,z+1);spotlight.target=plinth;scene.add(spotlight);
  const halo=new THREE.Mesh(new THREE.TorusGeometry(1.65,.055,8,48),material("#80e0a1",{emissive:"#2cbb72",emissiveIntensity:1.3}));halo.rotation.x=Math.PI/2;halo.position.set(x,.11,z);scene.add(halo);
 }
}
// Framed original NYC-inspired skyline illustration, rendered locally without external assets.
function skylineArt(){
 const c=document.createElement("canvas");c.width=1400;c.height=520;const g=c.getContext("2d");
 const sky=g.createLinearGradient(0,0,0,520);sky.addColorStop(0,"#1b3b55");sky.addColorStop(.6,"#bc7b64");sky.addColorStop(1,"#e4b57d");g.fillStyle=sky;g.fillRect(0,0,1400,520);
 g.fillStyle="#f4d3a1";g.beginPath();g.arc(1050,170,76,0,Math.PI*2);g.fill();
 for(let i=0;i<57;i++){const x=i*26,w=20+(i%3)*8,h=110+(i*47%200);g.fillStyle=i%2?"#243b4a":"#314c58";g.fillRect(x,440-h,w,h);for(let a=0;a<3;a++)for(let b=0;b<Math.floor(h/23);b++){g.fillStyle=(a+b+i)%3?"#e8bd78":"#6b8990";g.fillRect(x+4+a*8,445-h+b*23,3,7)}}
 // Empire State Building silhouette.
 g.fillStyle="#243b4a";g.fillRect(598,125,74,315);g.fillRect(614,88,42,40);g.fillRect(630,40,10,65);g.fillRect(634,17,3,32);
 // One World Trade Center silhouette.
 g.fillStyle="#294858";g.beginPath();g.moveTo(1100,440);g.lineTo(1110,122);g.lineTo(1140,70);g.lineTo(1170,122);g.lineTo(1180,440);g.closePath();g.fill();g.fillRect(1137,26,5,54);
 g.fillStyle="#102936";g.fillRect(0,441,1400,79);
 g.fillStyle="#f7e4bf";g.font="bold 35px Arial";g.fillText("NEW YORK  /  THE CITY OF IDEAS",42,493);
 const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;return new THREE.MeshBasicMaterial({map:tex,side:THREE.DoubleSide});
}
const artFrame=cube(9.6,1.75,.18,brass,0,7.9,-7.17);
const art=new THREE.Mesh(new THREE.PlaneGeometry(9.35,1.52),skylineArt());art.position.set(0,7.9,-7.04);scene.add(art);
const rail=cube(17,.06,.12,brass,0,.09,5.9);

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