import * as THREE from "https://esm.sh/three@0.170.0";
export function addNYCLandmarks(city, interact){
 const m=(color,extra={})=>new THREE.MeshStandardMaterial({color,roughness:.76,metalness:.08,...extra});
 const ivory=m("#e7e0cf"),white=m("#f5f1e6"),silver=m("#bfc6c4",{metalness:.55,roughness:.35}),glass=m("#5d8590",{metalness:.35,roughness:.27}),dark=m("#263c46"),copper=m("#b8793b",{metalness:.58,roughness:.37}),green=m("#79a98b"),stone=m("#a9a293"),gold=m("#d6ac2a"),water=m("#739ea2");
 const features=[];
 function mesh(parent,geometry,material,x=0,y=0,z=0){const o=new THREE.Mesh(geometry,material);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
 function b(p,w,h,d,ma,x=0,y=h/2,z=0){return mesh(p,new THREE.BoxGeometry(w,h,d),ma,x,y,z)}
 function cyl(p,top,bottom,h,ma,x=0,y=h/2,z=0,n=16){return mesh(p,new THREE.CylinderGeometry(top,bottom,h,n),ma,x,y,z)}
 function cone(p,r,h,ma,x=0,y=h/2,z=0,n=8){return mesh(p,new THREE.ConeGeometry(r,h,n),ma,x,y,z)}
 function line(p,a,c,ma,r=.07){const start=new THREE.Vector3(...a),end=new THREE.Vector3(...c),delta=end.clone().sub(start);const obj=mesh(p,new THREE.CylinderGeometry(r,r,delta.length(),7),ma,...start.clone().add(end).multiplyScalar(.5).toArray());obj.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return obj}
 function windows(p,w,d,floors,ma,win=dark){for(let y=1;y<floors*1.6;y+=1.55){for(let x=-w/2+.65;x<w/2-.3;x+=1.15){b(p,.52,.82,.045,win,x,y,d/2+.04);b(p,.52,.82,.045,win,x,y,-d/2-.04)}}}
 function landmark(key,name,x,z,make,project){const group=new THREE.Group();group.position.set(x,.1,z);city.add(group);make(group);group.traverse(o=>{if(o.isMesh){o.userData.project=project;interact.push(o)}});features.push({key,name,group,project});return group}
 // Downtown: One World Trade Center — stacked reflective tower with stepped crown and spire.
 landmark("wtc","ONE WORLD TRADE",-34,-30,p=>{b(p,7,.4,7,stone,0,.2);b(p,5.1,18,5.1,glass,0,9.4);for(let i=0;i<9;i++){let y=2+i*1.8;for(let x=-2.2;x<=2.2;x+=.85){b(p,.07,1.3,.07,silver,x,y,2.59);b(p,.07,1.3,.07,silver,x,y,-2.59)}}b(p,4.2,2,4.2,silver,0,19.4);b(p,3,1.3,3,glass,0,21);cone(p,1.6,3,silver,0,23);cyl(p,.14,.2,7,silver,0,27.8);cyl(p,.33,.33,.3,gold,0,30.8)}, "cloud");
 // Oculus — low white ribbed wings sweeping out from central concourse.
 landmark("oculus","THE OCULUS",0,35,p=>{b(p,17,.65,8,white,0,.42);b(p,7,2.6,5,glass,0,1.6);for(let i=-12;i<=12;i++){const x=i*.63;const rise=3.2+2.4*(1-Math.abs(i)/12);line(p,[x,1.3,0],[x*1.13,rise,-5.2],white,.19);line(p,[x,1.3,0],[x*1.13,rise,5.2],white,.19)}for(let i=-10;i<=10;i++){const x=i*.7;b(p,.13,.16,4,white,x,2.7,0)}}, "cloud");
 // Midtown: Empire State — Art Deco setbacks, crown and mast.
 landmark("empire","EMPIRE STATE",-8,-31,p=>{b(p,8,.4,7,stone,0,.2);b(p,6.4,9,5.7,stone,0,4.9);windows(p,6.4,5.7,5,stone);b(p,4.9,7.4,4.5,ivory,0,13.1);b(p,3.3,5,3.2,stone,0,19.2);b(p,2.2,2.6,2.2,ivory,0,23);cyl(p,.6,.9,2.4,silver,0,25.5);cyl(p,.13,.2,5,silver,0,29.2)}, "work");
 // Chrysler — stainless tiered Art Deco crown and needle.
 landmark("chrysler","CHRYSLER BUILDING",9,-32,p=>{b(p,5.2,17,5.2,stone,0,8.5);windows(p,5.2,5.2,10,stone);for(let i=0;i<5;i++){const s=4.8-i*.72;const h=1.6;b(p,s,h,s,silver,0,17+i*1.5+h/2)}cone(p,1.1,2.6,silver,0,25.3);cyl(p,.12,.18,5,silver,0,28.9)}, "automation");
 // Hudson Yards: Edge — projecting sky deck; Vessel — tiered copper hexagon.
 landmark("edge","EDGE AT HUDSON YARDS",29,-27,p=>{
  // 30 Hudson Yards: tall faceted glass shaft, sloped roof and dramatic cantilevered deck.
  b(p,6.5,.35,6.5,stone,0,.18);b(p,5.5,23,5.5,glass,0,11.7);
  for(let i=1;i<23;i+=1.2){b(p,5.58,.065,5.58,silver,0,i+.3)}
  for(let x=-2.3;x<2.6;x+=1.15){b(p,.065,22,.08,silver,x,11.7,2.82);b(p,.065,22,.08,silver,x,11.7,-2.82)}
  // Top crown is angled, instead of a simple square cap.
  const roof=mesh(p,new THREE.ConeGeometry(3.9,3.4,4),glass,0,24.9,0);roof.rotation.y=Math.PI/4;
  // Edge projects visibly toward the street, supported by diagonal struts.
  b(p,10.5,.48,5.1,silver,-4.2,22.2,1.1);
  b(p,10,.18,4.65,glass,-4.2,22.55,1.1);
  for(let x=-9;x<.5;x+=1.05){b(p,.08,1.55,.08,silver,x,23.2,3.55);b(p,.08,1.55,.08,silver,x,23.2,-1.3)}
  for(let z=-1.2;z<3.7;z+=1){b(p,.08,1.55,.08,silver,-9.2,23.2,z)}
  line(p,[-8.9,21.95,-1.1],[-2.5,17.5,-1.1],silver,.23);
  line(p,[-8.9,21.95,3.3],[-2.5,17.5,3.3],silver,.23);
}, "contact");
 landmark("vessel","THE VESSEL",29,-12,p=>{cyl(p,3.5,3.5,.5,stone);for(let j=0;j<6;j++){const r=2.3+j*.13,y=1+j*1.3;for(let i=0;i<10;i++){const a=i*Math.PI/5,an=(i+.5)*Math.PI/5;line(p,[Math.cos(a)*r,y,Math.sin(a)*r],[Math.cos(an)*(r+.2),y+1.15,Math.sin(an)*(r+.2)],copper,.17)}cyl(p,r,r,.15,copper,0,y+.7,0,10)}}, "about");
 // Flatiron wedge and classic sidewalk street clock.
 landmark("flatiron","FLATIRON STREET CLOCK",5,-.5,p=>{
 // Keep the iconic freestanding cast-iron sidewalk clock without the Flatiron tower.
 const cx=0,cz=0;cyl(p,.32,.4,4.5,dark,cx,2.25,cz);cyl(p,.6,.6,.25,copper,cx,4.6,cz);
 const dialFrame=mesh(p,new THREE.CylinderGeometry(1.2,1.2,.38,32),gold,cx,5.65,cz);dialFrame.rotation.x=Math.PI/2;
 const dial=mesh(p,new THREE.CylinderGeometry(1.03,1.03,.4,32),white,cx,5.65,cz+.03);dial.rotation.x=Math.PI/2;
 for(let i=0;i<12;i++){const angle=i*Math.PI/6;const tick=b(p,.12,.24,.09,dark,cx+Math.sin(angle)*.8,5.65+Math.cos(angle)*.8,cz+.25);tick.rotation.z=-angle}
 line(p,[cx,5.65,cz+.29],[cx+.46,5.96,cz+.29],dark,.07);line(p,[cx,5.65,cz+.3],[cx-.18,6.22,cz+.3],dark,.07);
 cone(p,.36,.68,copper,cx,7.15,cz);
}, "about");
 landmark("liberty","STATUE OF LIBERTY",-34,28,p=>{
  // Larger, deliberately recognizable neoclassical silhouette: draped robe, face, crown, tablet and torch.
  cyl(p,6.2,6.2,.35,water,0,.12,0,32);
  b(p,6.1,1.5,6.1,stone,0,.95);
  b(p,4.4,2.9,4.4,ivory,0,3.2);
  b(p,3.7,.65,3.7,stone,0,4.85);
  // Feet and broad flared robe.
  cyl(p,1.45,2.55,8.1,green,0,9.2,0,12);
  for(let i=0;i<10;i++){const a=i*Math.PI/5;line(p,[Math.sin(a)*1.1,12.7,Math.cos(a)*1.1],[Math.sin(a)*2.32,5.5,Math.cos(a)*2.32],green,.14)}
  // Shoulders, neck, head, nose and distinctive seven-ray crown.
  cyl(p,1.38,1.7,2.1,green,0,14.0,0,12);
  cyl(p,.38,.43,.6,green,0,15.3,0);
  const head=mesh(p,new THREE.SphereGeometry(.96,16,12),green,0,16.45,0);
  b(p,.35,.25,.25,green,0,16.25,.95);
  cyl(p,1.08,1.08,.27,green,0,17.22,0,16);
  for(let i=0;i<7;i++){const a=i*2*Math.PI/7;line(p,[Math.sin(a)*.76,17.32,Math.cos(a)*.76],[Math.sin(a)*1.68,18.9,Math.cos(a)*1.68],green,.15)}
  // Raised right arm and bright torch.
  line(p,[1.1,14.15,0],[2.4,17.4,0],green,.49);
  line(p,[2.4,17.4,0],[2.65,21.0,0],green,.38);
  cyl(p,.58,.42,.72,gold,2.65,21.4,0,12);
  cone(p,.64,1.7,gold,2.65,22.55,0,9);
  // Tablet in the left hand, separate from the body.
  line(p,[-1.2,14.1,.15],[-2.25,11.9,.65],green,.39);
  const tablet=b(p,1.65,2.8,.35,stone,-2.15,11.5,.95);tablet.rotation.z=-.16;
}, "contact");
 return features;
}