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
 landmark("vessel","THE VESSEL",-26,-8,p=>{
  // Detailed architectural miniature: Vessel's characteristic flared, stacked
  // copper stair flights and open hexagonal honeycomb; no billboard background.
  const bronze=m("#b66b38",{metalness:.62,roughness:.32}),edge=m("#e1a36a",{metalness:.55,roughness:.36});
  cyl(p,3.8,3.8,.55,stone,0,.13,0,24);
  const sides=12,levels=12;
  for(let j=0;j<levels;j++){
   const low=1.0+j*.95,high=low+.95;
   const r0=1.25+j*.29,r1=r0+.29;
   for(let i=0;i<sides;i++){
    const a=2*Math.PI*i/sides,an=2*Math.PI*(i+1)/sides;
    const q0=[Math.cos(a)*r0,low,Math.sin(a)*r0],q1=[Math.cos(an)*r0,low,Math.sin(an)*r0];
    const q2=[Math.cos(a)*r1,high,Math.sin(a)*r1],q3=[Math.cos(an)*r1,high,Math.sin(an)*r1];
    line(p,q0,q3,bronze,.21);line(p,q1,q2,edge,.19);
    line(p,q2,q3,bronze,.16);
    // Thin stair treads on alternating flights, with open air between flights.
    if((i+j)%2===0)for(let k=1;k<=4;k++){
     const t=k/5,ang=a+(an-a)*t,r=r0+.24*t;
     const tread=b(p,.72,.095,.24,edge,Math.cos(ang)*r,low+.95*t,Math.sin(ang)*r);
     tread.rotation.y=-ang;
    }
   }
  }
 }, "about");
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
  // A recognizable, sculpted copper-patina Liberty: tiered pedestal, draped robe,
  // seven-ray diadem, raised torch and tablet, kept lightweight for mobile.
  const patina=m("#70a78c",{roughness:.86,metalness:.08}),fold=m("#538f78",{roughness:.92}),highlight=m("#94bea1",{roughness:.85});
  const pedestal=m("#c9bda8"),plinth=m("#8e9b93");
  cyl(p,6.2,6.2,.6,water,0,-.1,0,32);
  b(p,6.0,.55,6.0,plinth,0,.48);
  b(p,5.35,1.1,5.35,pedestal,0,1.32);
  b(p,4.45,2.5,4.45,pedestal,0,3.15);
  b(p,4.9,.45,4.9,plinth,0,4.58);
  b(p,3.7,.6,3.7,pedestal,0,5.10);
  // Tapered robe with asymmetrical folds; torch is deliberately higher than crown.
  cyl(p,1.32,2.15,8.0,patina,0,9.55,0,20);
  cyl(p,1.14,1.36,2.1,patina,0,14.40,0,16);
  for(let i=0;i<12;i++){const a=i*Math.PI/6;line(p,[Math.sin(a)*.95,13.35,Math.cos(a)*.95],[Math.sin(a)*1.98,5.75,Math.cos(a)*1.98],i%3===0?highlight:fold,.075)}
  // Diagonal folds across the front suggest the famous flowing garment.
  for(let i=0;i<4;i++)line(p,[-.95+i*.19,13.8-i*.32,1.13], [.55+i*.20,10.5-i*.7,1.43],fold,.075);
  cyl(p,.37,.42,.63,patina,0,15.78,0,12);
  mesh(p,new THREE.SphereGeometry(.88,20,16),patina,0,16.62,0);
  b(p,.26,.18,.22,patina,0,16.45,.87);
  // Hair and diadem; seven outward rays in the frontal plane for a legible silhouette.
  cyl(p,1.00,1.03,.28,fold,0,17.33,0,20);
  for(let i=0;i<7;i++){const a=-Math.PI*.78+i*Math.PI*1.56/6;const dx=Math.cos(a),dy=Math.sin(a);line(p,[dx*.79,17.46+dy*.35,.05],[dx*1.62,17.55+dy*1.62,.05],patina,.14)}
  // Right arm raised, elbow and wrist defined.
  line(p,[1.04,14.25,.02],[2.05,17.3,.02],patina,.42);
  line(p,[2.05,17.3,.02],[2.33,20.52,.02],patina,.31);
  mesh(p,new THREE.SphereGeometry(.36,12,10),patina,2.33,20.66,0);
  cyl(p,.38,.32,.72,fold,2.33,21.18,0,12);
  cyl(p,.61,.48,.53,gold,2.33,21.75,0,12);
  cone(p,.59,1.52,gold,2.33,22.76,0,12);
  const flame=m("#ffe39a",{emissive:"#f2a629",emissiveIntensity:.65,roughness:.6});
  cone(p,.32,.92,flame,2.33,23.63,0,10);
  // Left arm holds a broad rectangular tablet with engraved line details.
  line(p,[-1.05,14.12,.13],[-1.75,12.13,.78],patina,.35);
  const tablet=b(p,1.54,2.65,.36,patina,-1.73,12.08,1.01);tablet.rotation.z=-.14;
  for(let k=0;k<3;k++)b(p,.85,.065,.03,fold,-1.72,12.66-k*.38,1.23);
 }, "contact");
 // Real photographic cutout on a camera-facing plane. If the image fails to load,
 // the hand-built 3D statue above remains visible and fully functional.
 // Image: Elcobbola / Edward-Woodrow, CC BY-SA 3.0, Wikimedia Commons:
 // https://commons.wikimedia.org/wiki/File:Statue_of_liberty_(transparent).png
 const liberty=features.find(f=>f.key==="liberty");
 if(liberty){
  const photoUrl="https://upload.wikimedia.org/wikipedia/commons/8/81/Statue_of_liberty_%28transparent%29.png";
  new THREE.TextureLoader().load(photoUrl,texture=>{
   texture.colorSpace=THREE.SRGBColorSpace;
   // Trim transparent padding from the actual PNG; otherwise the visible feet
   // float even when the rectangular sprite's bottom is mathematically grounded.
   const image=texture.image,canvas=document.createElement("canvas");
   const probe=document.createElement("canvas");probe.width=image.width;probe.height=image.height;
   const ctx=probe.getContext("2d",{willReadFrequently:true});ctx.drawImage(image,0,0);
   let crop={x:0,y:0,w:image.width,h:image.height};
   try{
    const pixels=ctx.getImageData(0,0,image.width,image.height).data;
    let left=image.width,top=image.height,right=-1,bottom=-1;
    for(let y=0;y<image.height;y+=2)for(let x=0;x<image.width;x+=2){
     if(pixels[(y*image.width+x)*4+3]>35){left=Math.min(left,x);top=Math.min(top,y);right=Math.max(right,x);bottom=Math.max(bottom,y)}
    }
    if(right>left&&bottom>top)crop={x:Math.max(0,left-2),y:Math.max(0,top-2),w:Math.min(image.width-left+2,right-left+5),h:Math.min(image.height-top+2,bottom-top+5)};
   }catch(e){/* Keep full image if canvas pixels are unavailable. */}
   canvas.width=crop.w;canvas.height=crop.h;
   canvas.getContext("2d").drawImage(image,crop.x,crop.y,crop.w,crop.h,0,0,crop.w,crop.h);
   const cropped=new THREE.CanvasTexture(canvas);cropped.colorSpace=THREE.SRGBColorSpace;
   texture.dispose();
   const material=new THREE.SpriteMaterial({map:cropped,transparent:true,depthWrite:false,alphaTest:.04});
   const height=19.2,width=height*crop.w/crop.h;
   const photo=new THREE.Sprite(material);photo.position.set(0,5.4+height/2,0);photo.scale.set(width,height,1);
   // Hide only the procedural statue once the real image is ready.
   liberty.group.children.forEach((child,index)=>{child.visible=index<6});
   liberty.group.add(photo);photo.userData.project="contact";interact.push(photo);
  },undefined,()=>{ /* Preserve the procedural statue when offline. */ });
 }
 return features;
}