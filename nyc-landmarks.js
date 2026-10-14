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
 landmark("oculus","THE OCULUS",-24,-31,p=>{b(p,12,.7,4.3,white,0,.5);b(p,5,2,3.2,glass,0,1.5);for(let i=-8;i<=8;i++){let x=i*.72;line(p,[x,1.4,0],[x*1.17,2.2+3*(Math.abs(i)/8),-3.2],white,.13);line(p,[x,1.4,0],[x*1.17,2.2+3*(Math.abs(i)/8),3.2],white,.13)}}, "cloud");
 // Midtown: Empire State — Art Deco setbacks, crown and mast.
 landmark("empire","EMPIRE STATE",-7,-32,p=>{b(p,8,.4,7,stone,0,.2);b(p,6.4,9,5.7,stone,0,4.9);windows(p,6.4,5.7,5,stone);b(p,4.9,7.4,4.5,ivory,0,13.1);b(p,3.3,5,3.2,stone,0,19.2);b(p,2.2,2.6,2.2,ivory,0,23);cyl(p,.6,.9,2.4,silver,0,25.5);cyl(p,.13,.2,5,silver,0,29.2)}, "automation");
 // Chrysler — stainless tiered Art Deco crown and needle.
 landmark("chrysler","CHRYSLER BUILDING",9,-32,p=>{b(p,5.2,17,5.2,stone,0,8.5);windows(p,5.2,5.2,10,stone);for(let i=0;i<5;i++){const s=4.8-i*.72;const h=1.6;b(p,s,h,s,silver,0,17+i*1.5+h/2)}cone(p,1.1,2.6,silver,0,25.3);cyl(p,.12,.18,5,silver,0,28.9)}, "automation");
 // Hudson Yards: Edge — projecting sky deck; Vessel — tiered copper hexagon.
 landmark("edge","EDGE AT HUDSON YARDS",29,-27,p=>{b(p,5.4,18,5.4,glass,0,9);for(let i=1;i<18;i+=2){b(p,5.55,.1,5.55,silver,0,i)}b(p,8,.38,4.1,silver,-1.8,18.2);b(p,7.4,.13,3.8,glass,-1.8,18.45);for(let i=0;i<7;i++)b(p,.08,1.15,.08,glass,-5.4+i*1.1,18.9,2)}, "ai");
 landmark("vessel","THE VESSEL",29,-12,p=>{cyl(p,3.5,3.5,.5,stone);for(let j=0;j<6;j++){const r=2.3+j*.13,y=1+j*1.3;for(let i=0;i<10;i++){const a=i*Math.PI/5,an=(i+.5)*Math.PI/5;line(p,[Math.cos(a)*r,y,Math.sin(a)*r],[Math.cos(an)*(r+.2),y+1.15,Math.sin(an)*(r+.2)],copper,.17)}cyl(p,r,r,.15,copper,0,y+.7,0,10)}}, "ai");
 // Flatiron wedge and classic sidewalk street clock.
 landmark("flatiron","FLATIRON & CLOCK",26,28,p=>{const shape=new THREE.Shape();shape.moveTo(-4,-2);shape.lineTo(3,-2);shape.lineTo(3,1.8);shape.quadraticCurveTo(2.9,2.8,1.7,2.5);shape.lineTo(-4,-2);const geo=new THREE.ExtrudeGeometry(shape,{depth:13,bevelEnabled:false});geo.rotateX(-Math.PI/2);const body=mesh(p,geo,ivory,0,13,0);body.rotation.y=.08;for(let y=2;y<12;y+=1.3){b(p,5.3,.13,.15,stone,-.5,y,-2.25)}b(p,5.8,.45,4,stone,-.3,13.4);cyl(p,.12,.16,3,dark,4.7,1.5,2.6);cyl(p,.85,.85,.3,gold,4.7,3.1,2.6);const face=cyl(p,.69,.69,.06,white,4.7,3.3,2.6,20);face.rotation.x=Math.PI/2;line(p,[4.7,3.3,2.65],[4.7,3.7,2.65],dark,.045);line(p,[4.7,3.3,2.65],[5.05,3.18,2.65],dark,.045)}, "about");
 // Harbor: Statue of Liberty with green silhouette and raised torch.
 landmark("liberty","STATUE OF LIBERTY",-34,28,p=>{cyl(p,5,5,.3,water,0,.05);b(p,5,1.8,5,stone,0,1.1);b(p,3.4,2.2,3.4,ivory,0,3);cyl(p,.85,1.15,4.6,green,0,6.1);cone(p,1.55,3.7,green,0,9.8,0,7);cyl(p,.65,.65,1.3,green,0,12);for(let i=0;i<7;i++){let a=i*2*Math.PI/7;line(p,[Math.cos(a)*.55,12.8,Math.sin(a)*.55],[Math.cos(a)*1.15,13.7,Math.sin(a)*1.15],green,.1)}line(p,[.6,10.2,0],[1.6,15.2,0],green,.32);cyl(p,.5,.3,.5,gold,1.6,15.5,0);cone(p,.45,1.2,gold,1.6,16.5,0);line(p,[-.6,9.9,0],[-1.5,7.8,0],green,.25);b(p,1.4,1.7,.22,green,-1.65,7.3,0)}, "contact");
 return features;
}