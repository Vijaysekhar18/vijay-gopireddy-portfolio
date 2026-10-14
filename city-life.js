import * as THREE from "https://esm.sh/three@0.170.0";
export function createCityLife(city){
 const material=(color,extras={})=>new THREE.MeshStandardMaterial({color,roughness:.78,...extras});
 const yellow=material("#ffd12c"),black=material("#242b2d"),glass=material("#477e9a",{metalness:.2}),cream=material("#eee8d8"),skin=material("#bb8967"),blue=material("#467d9b"),orange=material("#dd8353");
 const box=(parent,w,h,d,mat,x,y,z)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat);o.position.set(x,y,z);o.castShadow=true;parent.add(o);return o};
 const sphere=(parent,r,mat,x,y,z)=>{const o=new THREE.Mesh(new THREE.SphereGeometry(r,12,9),mat);o.position.set(x,y,z);o.castShadow=true;parent.add(o);return o};
 const taxis=[];
 for(let i=0;i<8;i++){const car=new THREE.Group();city.add(car);box(car,2.25,.55,1.08,yellow,0,.45,0);box(car,1.17,.49,.96,yellow,-.05,.96,0);box(car,.86,.31,.025,glass,-.04,1.01,.5);box(car,.86,.31,.025,glass,-.04,1.01,-.5);box(car,.45,.19,.3,cream,-.1,1.31,0);box(car,.12,.22,.7,black,1.14,.46,0);for(const x of [-.75,.75])for(const z of [-.56,.56]){const wheel=new THREE.Mesh(new THREE.CylinderGeometry(.25,.25,.14,12),black);wheel.rotation.x=Math.PI/2;wheel.position.set(x,.26,z);car.add(wheel)}taxis.push({car,vertical:i%2===0,lane:i%2===0?[-19,-5,9,23][i%4]:[-23,-8,7,22][i%4],offset:i*10,speed:2.4+i*.28})}
 const people=[];
 function person(color){const group=new THREE.Group();box(group,.55,.85,.3,color,0,1.06,0);sphere(group,.29,skin,0,1.75,0);const left=box(group,.19,.7,.23,black,-.16,.38,0),right=box(group,.19,.7,.23,black,.16,.38,0);const arm1=box(group,.15,.64,.2,color,-.39,1.04,0),arm2=box(group,.15,.64,.2,color,.39,1.04,0);return {group,left,right,arm1,arm2}}
 for(let i=0;i<12;i++){const p=person(i%2?blue:orange);city.add(p.group);people.push({...p,vertical:i%2===0,lane:i%2===0?[-16,-2,12,26][i%4]:[-20,-5,10,25][i%4],offset:i*7,speed:.48+(i%4)*.13})}
 const plane=new THREE.Group();city.add(plane);const brown=material("#8c5a39"),tan=material("#c08a54");box(plane,4.2,.6,.7,brown,0,0,0);box(plane,1.15,.14,5.2,tan,-.3,0,0);box(plane,.65,1.3,.17,brown,-1.75,.5,0);box(plane,1.05,.13,2,tan,-1.6,0,0);sphere(plane,.38,glass,1.85,.05,0);
 const canvas=document.createElement("canvas");canvas.width=1024;canvas.height=240;const ctx=canvas.getContext("2d");ctx.fillStyle="#f8d747";ctx.fillRect(0,0,1024,240);ctx.fillStyle="#2e302c";ctx.font="bold 82px Arial";ctx.textAlign="center";ctx.fillText("VIJAY'S NYC STUDIO",512,148);const bannerTexture=new THREE.CanvasTexture(canvas);const bannerMaterial=new THREE.MeshBasicMaterial({map:bannerTexture,side:THREE.FrontSide});const banner=new THREE.Mesh(new THREE.PlaneGeometry(13,3.05),bannerMaterial);banner.position.set(-10.1,0,.015);plane.add(banner);const bannerBack=new THREE.Mesh(new THREE.PlaneGeometry(13,3.05),bannerMaterial);bannerBack.rotation.y=Math.PI;bannerBack.position.set(-10.1,0,-.015);plane.add(bannerBack);box(plane,6,.035,.035,black,-5.1,0,0);
 // Stylized Hudson River outside the western city boundary; no building footprints covered.
 const river=new THREE.Group();city.add(river);
 const waterMat=new THREE.MeshStandardMaterial({color:"#5798ae",roughness:.38,metalness:.12,transparent:true,opacity:.92});
 box(river,18,.08,85,waterMat,-54,-.17,0);
 const foam=material("#d9f2e8");
 for(let k=0;k<18;k++){box(river,1.1,.018,.08,foam,-61+(k%5)*3.3,-.11,-38+Math.floor(k/5)*19)}
 const cruise=new THREE.Group();city.add(cruise);
 box(cruise,3.6,.7,8,cream,0,.5,0);box(cruise,2.9,1.1,4.4,cream,0,1.35,-.3);
 box(cruise,2.7,.24,4.8,brown,0,2.03,-.3);
 for(const side of [-1,1])for(let k=0;k<3;k++)box(cruise,.07,.3,.5,glass,side*1.48,1.45,-1.6+k*1.2);
 const boatCanvas=document.createElement("canvas");boatCanvas.width=768;boatCanvas.height=128;
 const boatCtx=boatCanvas.getContext("2d");boatCtx.fillStyle="#fff1c9";boatCtx.fillRect(0,0,768,128);
 boatCtx.fillStyle="#493a25";boatCtx.font="bold 70px Arial";boatCtx.textAlign="center";boatCtx.fillText("WELCOME TO NYC",384,88);
 const boatSignMat=new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(boatCanvas),side:THREE.DoubleSide});
 for(const side of [-1,1]){const sign=new THREE.Mesh(new THREE.PlaneGeometry(3.25,.54),boatSignMat);sign.rotation.y=side*Math.PI/2;sign.position.set(side*1.86,.77,0);cruise.add(sign)}
 const guide=person(yellow);city.add(guide.group);guide.group.visible=false;
 const orb=sphere(city,.9,material("#ffe644",{emissive:"#ffda27",emissiveIntensity:1}),-19,1.1,22);
 // Oculus -> X junction (Liberty lookout) -> turn right along the road toward Vessel and One World Trade -> Edge.
 const route=[[-19,22],[-19,22],[-19,22],[-19,7],[-19,-8],[-19,-23],[-5,-23],[9,-23],[23,-23],[23,-23]];
 const durations=[4,5,5,12,12,12,12,12,12];
 const views={0:[0,35,5],1:[-34,28,13],2:[-34,28,13],4:[-26,-8,8],5:[-34,-30,26],8:[29,-27,18]};
 const perspective=new THREE.PerspectiveCamera(69,1,.1,210);
 let guideLocation=null,canAdvance=true;
 const look=new THREE.Vector3();let heading=0;
 function walkCamera(progress,time,dt){
  const seg=Math.min(Math.floor(progress),route.length-2),t=progress-seg,a=route[seg],b=route[seg+1];
  const x=a[0]+(b[0]-a[0])*t,z=a[1]+(b[1]-a[1])*t;
  let dx=b[0]-a[0],dz=b[1]-a[1];
  if(Math.hypot(dx,dz)<.01){const v=views[seg]||[x,z+5,4];dx=v[0]-x;dz=v[1]-z}
  const len=Math.hypot(dx,dz)||1,ux=dx/len,uz=dz/len;
  guide.group.visible=true;guide.group.position.set(x,0,z);guideLocation={x,z};
  const targetHeading=Math.atan2(ux,uz);heading+=Math.atan2(Math.sin(targetHeading-heading),Math.cos(targetHeading-heading))*(1-Math.exp(-7*dt));guide.group.rotation.y=heading;
  const stride=(Math.hypot(b[0]-a[0],b[1]-a[1])>.01&&canAdvance)?Math.sin(time*7)*.42:0;
  guide.left.rotation.x=stride;guide.right.rotation.x=-stride;
  guide.arm1.rotation.x=-stride;guide.arm2.rotation.x=stride;
  perspective.position.set(x-ux*2.2,2.9,z-uz*2.2);
  const v=views[seg];
  const target=v?new THREE.Vector3(v[0],v[2],v[1]):new THREE.Vector3(x+ux*8,2,z+uz*8);
  if(look.lengthSq()===0)look.copy(target);
  look.lerp(target,1-Math.exp(-3*dt));perspective.lookAt(look);
  return perspective
 }
 function tourStepDuration(progress){return durations[Math.min(Math.floor(progress),durations.length-1)]}
 function mayAdvance(){return canAdvance}
 function resetTour(){look.set(0,0,0);heading=0}
 function update(time,walking,progress,dt=1/60){const tourView=walking?walkCamera(progress,time,dt):null;if(!walking)guideLocation=null;for(const t of taxis){const d=((time*t.speed+t.offset)%80)-40;if(t.vertical){t.car.position.set(t.lane,0,d);t.car.rotation.y=Math.PI/2}else{t.car.position.set(d,0,t.lane);t.car.rotation.y=0}}for(const p of people){const d=((time*p.speed+p.offset)%72)-36;if(p.vertical){p.group.position.set(p.lane,0,d);p.group.rotation.y=0}else{p.group.position.set(d,0,p.lane);p.group.rotation.y=Math.PI/2}if(guideLocation&&Math.hypot(p.group.position.x-guideLocation.x,p.group.position.z-guideLocation.z)<4){p.group.position.x+=p.vertical?2.4:0;p.group.position.z+=p.vertical?0:2.4}p.left.rotation.x=Math.sin(time*5+p.offset)*.48;p.right.rotation.x=-p.left.rotation.x;p.arm1.rotation.x=-p.left.rotation.x;p.arm2.rotation.x=p.left.rotation.x}canAdvance=true;cruise.position.set(-54,0,-43+((time*1.55)%86));cruise.rotation.y=Math.sin(time*.45)*.025;plane.position.set(55-((time*4.8)%110),30,-16);plane.rotation.y=Math.PI;guide.group.visible=walking;orb.visible=!walking;return tourView}
 return {update,perspective,routeLength:route.length-1,tourStepDuration,mayAdvance,resetTour};
}
