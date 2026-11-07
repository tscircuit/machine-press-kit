import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {STLLoader} from 'three/addons/loaders/STLLoader.js';
const $=id=>document.getElementById(id);
const parts=[
{id:'punch_05',name:'Short punch',group:'PUNCHES',sub:'Ø 4.4 · 5 mm reach',dim:'20 × 20 × 17 mm',color:0x64748b,spec:[['Tip diameter','4.4 mm'],['Straight reach','5 mm'],['Print orientation','Flange down']],note:"Keep the shoulder clear of the hub."},
{id:'punch_10',name:'Medium punch',group:'PUNCHES',sub:'Ø 4.4 · 10 mm reach',dim:'20 × 20 × 22 mm',color:0x64748b,spec:[['Tip diameter','4.4 mm'],['Straight reach','10 mm'],['Print orientation','Flange down']],note:"Keep the tip centered; stop if it bends."},
{id:'punch_15',name:'Long punch',group:'PUNCHES',sub:'Ø 4.4 · 15 mm reach',dim:'20 × 20 × 27 mm',color:0x64748b,spec:[['Tip diameter','4.4 mm'],['Straight reach','15 mm'],['Print orientation','Flange down']],note:"Use the shortest punch that reaches."},
{id:'platform_5p8',name:'5 mm shaft platform',group:'PLATFORMS',sub:'5.8 mm open slot',dim:'88 × 70 × 10 mm',color:0xb6bec9,spec:[['Slot width','5.8 mm'],['Suggested hub OD','≥ 12 mm'],['Riser seat depth','2 mm']],note:"Requires 10 mm beneath the hub. Hub OD is a fit guide, not a load rating."},
{id:'platform_8p4',name:'Wide-clearance platform',group:'PLATFORMS',sub:'8.4 mm open slot',dim:'88 × 70 × 10 mm',color:0xb6bec9,spec:[['Slot width','8.4 mm'],['Suggested hub OD','≥ 15 mm'],['Riser seat depth','2 mm']],note:"Requires 10 mm beneath the hub. Use the narrowest slot that fits."},
{id:'platform_12p4',name:'Large-collar platform',group:'PLATFORMS',sub:'12.4 mm open slot',dim:'88 × 70 × 10 mm',color:0xb6bec9,spec:[['Slot width','12.4 mm'],['Suggested hub OD','≥ 19 mm'],['Riser seat depth','2 mm']],note:"Requires 10 mm beneath the hub. Too wide for the 14 mm example hub."},
{id:'riser',name:'Platform riser',group:'SUPPORTS',sub:'65 mm tall · print two',dim:'18 × 70 × 65 mm',color:0x94a3b8,spec:[['Quantity to print','2'],['Height','65 mm'],['Platform top height','73 mm']],note:"Print two. Leave room beneath the motor for the full removal stroke."},
{id:'steel_guide',name:'Steel-punch guide',group:'SUPPORTS',sub:'4.3 mm through-hole',dim:'28 × 28 × 28 mm',color:0x64748b,spec:[['Guide bore','4.3 mm'],['Steel rod (not included)','4 mm'],['Print orientation','Flange down']],note:"Press on the steel rod, not the plastic flange. Rod not included."}
];
let current='assembly',wire=false,renderer,scene,camera,controls,group,shaftGroup,punch,geometries={};
let groupName='';parts.forEach((p,i)=>{if(groupName!==p.group){groupName=p.group;const h=document.createElement('div');h.className='group-name';h.textContent=p.group;$('parts').append(h)}const b=document.createElement('button');b.className='part-btn';b.id='btn-'+p.id;b.innerHTML=`<span class="number">${String(i+1).padStart(2,'0')}</span><span>${p.name}<small>${p.sub}</small></span>`;b.onclick=()=>select(p.id);$('parts').append(b)});
$('assembly').onclick=()=>select('assembly');
function specs(items){$('specs').innerHTML=items.map(([a,b])=>`<div><dt>${a}</dt><dd>${b}</dd></div>`).join('')}
function updateInfo(id){
 const assembly=id==='assembly';
 $('assembly').classList.toggle('active',assembly);
 parts.forEach(p=>$('btn-'+p.id).classList.toggle('active',p.id===id));
 $('assembly-controls').hidden=!assembly;
 if(assembly){
  $('view-title').textContent='Assembly';
  specs([['Shaft','5 mm'],['Slot','5.8 mm'],['Riser clearance','52 mm']]);
  $('fit-note').textContent='Open-ended hub; 10 mm clearance beneath it. Support the hub, let the motor hang freely, and catch it on release.';
  $('download-part').href='/models/nema17-press-kit.zip';
  $('download-part').textContent='Download kit';
 }else{
  const p=parts.find(p=>p.id===id);
  $('view-title').textContent=p.name;
  specs([['Size',p.dim],...p.spec]);
  $('fit-note').textContent=p.note;
  $('download-part').href='/models/'+p.id+'.stl';
  $('download-part').textContent='Download STL';
 }
}
function mat(color){return new THREE.MeshStandardMaterial({color,roughness:.75,metalness:.05,wireframe:wire})}
function partMesh(id){const p=parts.find(x=>x.id===id);const m=new THREE.Mesh(geometries[id],mat(p.color));m.castShadow=true;m.receiveShadow=true;return m}
function mesh(geo,color){const m=new THREE.Mesh(geo,mat(color));m.castShadow=true;m.receiveShadow=true;return m}
function rebuild(){if(!scene)return;scene.remove(group);group?.traverse(o=>{if(o.isMesh){o.material.dispose();if(!Object.values(geometries).includes(o.geometry))o.geometry.dispose()}});group=new THREE.Group();scene.add(group);shaftGroup=null;punch=null;
 if(current==='assembly'){
 for(const x of [-35,35]){let m=partMesh('riser');m.position.x=x;group.add(m)}
 let plate=partMesh('platform_5p8');plate.position.y=63;group.add(plate);
 shaftGroup=new THREE.Group();group.add(shaftGroup);let body=mesh(new THREE.BoxGeometry(42.3,34,42.3),0x454e4d);body.position.y=39;shaftGroup.add(body);
 for(const y of [20.5,57.5]){let cap=mesh(new THREE.BoxGeometry(42.3,3,42.3),0xb6bfbc);cap.position.y=y;shaftGroup.add(cap)}
 let boss=mesh(new THREE.CylinderGeometry(11,11,2,64),0xb7c1be);boss.position.y=60;shaftGroup.add(boss);
 let shaft=mesh(new THREE.CylinderGeometry(2.5,2.5,24,64),0xd0dad5);shaft.position.y=71;shaftGroup.add(shaft);
 for(let x of [-15.5,15.5])for(let z of [-15.5,15.5]){let screw=mesh(new THREE.CylinderGeometry(1.5,1.5,.3,16),0x3f4947);screw.position.set(x,59.15,z);shaftGroup.add(screw)}
 const shape=new THREE.Shape();shape.absarc(0,0,7,0,Math.PI*2,false);const hole=new THREE.Path();hole.absarc(0,0,2.5,0,Math.PI*2,true);shape.holes.push(hole);let hubGeo=new THREE.ExtrudeGeometry(shape,{depth:10,bevelEnabled:false,curveSegments:64});hubGeo.rotateX(-Math.PI/2);let hub=mesh(hubGeo,0xd7a76b);hub.position.y=73;group.add(hub);
 punch=partMesh('punch_15');punch.rotation.x=Math.PI;punch.position.y=110;group.add(punch);updateTravel();
 }else{group.add(partMesh(current))}resetCamera('iso')}
function updateTravel(){const v=Number($('travel').value);$('travel-value').textContent=Number(v.toFixed(1))+' mm';if(shaftGroup)shaftGroup.position.y=-v;if(punch)punch.position.y=110-v}
$('travel').oninput=updateTravel;
function resetCamera(view='iso'){if(!group)return;const box=new THREE.Box3().setFromObject(group);const center=box.getCenter(new THREE.Vector3());const size=box.getSize(new THREE.Vector3());const span=Math.max(size.x,size.y,size.z);const distance=span*1.65/Math.min(1,camera.aspect);controls.target.copy(center);camera.up.set(0,1,0);if(view==='top'){camera.position.copy(center).add(new THREE.Vector3(0,distance,0.01));camera.up.set(0,0,-1)}else if(view==='front')camera.position.copy(center).add(new THREE.Vector3(0,0,distance));else camera.position.copy(center).add(new THREE.Vector3(distance*.8,distance*.58,distance));camera.near=.1;camera.far=5000;camera.updateProjectionMatrix();controls.update();['iso','front','top'].forEach(id=>$(id).classList.toggle('selected',id===view))}
for(const v of ['iso','front','top'])$(v).onclick=()=>resetCamera(v);$('reset').onclick=()=>{if(current==='assembly'){$('travel').value=0;updateTravel()}resetCamera()};$('wire').onclick=()=>{wire=!wire;$('wire').setAttribute('aria-pressed',String(wire));group?.traverse(o=>{if(o.isMesh)o.material.wireframe=wire})};
function select(id){current=id;updateInfo(id);rebuild()}
async function init(){updateInfo('assembly');try{const wrap=$('canvas-wrap');renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.setClearColor(0xffffff,1);wrap.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-label','Rotatable 3D preview of the selected press-tool model');scene=new THREE.Scene();camera=new THREE.PerspectiveCamera(36,1,.1,5000);controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.maxDistance=1300;controls.minDistance=15;
 scene.add(new THREE.HemisphereLight(0xffffff,0xcbd5e1,2.5));const light=new THREE.DirectionalLight(0xffffff,3.2);light.position.set(-100,200,120);light.castShadow=true;light.shadow.mapSize.set(2048,2048);Object.assign(light.shadow.camera,{left:-150,right:150,top:180,bottom:-130,near:1,far:600});light.shadow.normalBias=.3;scene.add(light);const fill=new THREE.DirectionalLight(0xf1f5f9,1.2);fill.position.set(100,70,-100);scene.add(fill);
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(2000,2000),new THREE.ShadowMaterial({opacity:.12}));floor.rotation.x=-Math.PI/2;floor.position.y=-.12;floor.receiveShadow=true;scene.add(floor);const grid=new THREE.GridHelper(500,50,0xd1d5db,0xe5e7eb);grid.position.y=-.08;grid.material.transparent=true;grid.material.opacity=.5;scene.add(grid);
 const loader=new STLLoader();await Promise.all(parts.map(async p=>{const g=await loader.loadAsync('/models/'+p.id+'.stl');g.rotateX(-Math.PI/2);g.computeVertexNormals();geometries[p.id]=g}));
 const resize=()=>{const w=wrap.clientWidth,h=wrap.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();if(group)resetCamera()};new ResizeObserver(resize).observe(wrap);resize();rebuild();$('loading').remove();renderer.setAnimationLoop(()=>{controls.update();renderer.render(scene,camera)});window.toolkitReady=true;
 }catch(e){console.error(e);$('loading').textContent='3D preview unavailable. Enable WebGL or download the STL.';scene=null;window.toolkitError=String(e)}}
init();
