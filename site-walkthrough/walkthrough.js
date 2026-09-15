(() => {
"use strict";

const canvas = document.getElementById("scene");
const gl = canvas.getContext("webgl", {antialias:true, alpha:false});
const statusEl = document.getElementById("status");
const loadingEl = document.getElementById("loading");
const minimap = document.getElementById("minimap");
const mapCtx = minimap.getContext("2d");

if (!gl) {
  loadingEl.innerHTML = "<strong>3D walkthrough requires WebGL.</strong><span>Please use a modern browser with hardware acceleration enabled.</span>";
  return;
}

const VS = `
attribute vec3 aPosition;
attribute vec3 aNormal;
uniform mat4 uModel;
uniform mat4 uViewProj;
varying vec3 vNormal;
void main(){
  vNormal = mat3(uModel) * aNormal;
  gl_Position = uViewProj * uModel * vec4(aPosition,1.0);
}`;
const FS = `
precision mediump float;
uniform vec3 uColor;
uniform vec3 uLightDir;
uniform float uAmbient;
varying vec3 vNormal;
void main(){
  vec3 n = normalize(vNormal);
  float d = max(dot(n, normalize(uLightDir)), 0.0);
  float light = uAmbient + d * (1.0-uAmbient);
  gl_FragColor = vec4(uColor * light,1.0);
}`;

function compile(type, source){
  const s=gl.createShader(type); gl.shaderSource(s,source); gl.compileShader(s);
  if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
  return s;
}
const program=gl.createProgram();
gl.attachShader(program,compile(gl.VERTEX_SHADER,VS));
gl.attachShader(program,compile(gl.FRAGMENT_SHADER,FS));
gl.linkProgram(program);
if(!gl.getProgramParameter(program,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
gl.useProgram(program);

const loc={
  pos:gl.getAttribLocation(program,"aPosition"),
  normal:gl.getAttribLocation(program,"aNormal"),
  model:gl.getUniformLocation(program,"uModel"),
  viewProj:gl.getUniformLocation(program,"uViewProj"),
  color:gl.getUniformLocation(program,"uColor"),
  light:gl.getUniformLocation(program,"uLightDir"),
  ambient:gl.getUniformLocation(program,"uAmbient")
};

const cubeVerts = new Float32Array([
 // front
 -.5,-.5,.5, 0,0,1,  .5,-.5,.5,0,0,1,  .5,.5,.5,0,0,1,
 -.5,-.5,.5, 0,0,1,  .5,.5,.5,0,0,1, -.5,.5,.5,0,0,1,
 // back
 .5,-.5,-.5,0,0,-1, -.5,-.5,-.5,0,0,-1, -.5,.5,-.5,0,0,-1,
 .5,-.5,-.5,0,0,-1, -.5,.5,-.5,0,0,-1, .5,.5,-.5,0,0,-1,
 // left
 -.5,-.5,-.5,-1,0,0, -.5,-.5,.5,-1,0,0, -.5,.5,.5,-1,0,0,
 -.5,-.5,-.5,-1,0,0, -.5,.5,.5,-1,0,0, -.5,.5,-.5,-1,0,0,
 // right
 .5,-.5,.5,1,0,0, .5,-.5,-.5,1,0,0, .5,.5,-.5,1,0,0,
 .5,-.5,.5,1,0,0, .5,.5,-.5,1,0,0, .5,.5,.5,1,0,0,
 // top
 -.5,.5,.5,0,1,0, .5,.5,.5,0,1,0, .5,.5,-.5,0,1,0,
 -.5,.5,.5,0,1,0, .5,.5,-.5,0,1,0, -.5,.5,-.5,0,1,0,
 // bottom
 -.5,-.5,-.5,0,-1,0, .5,-.5,-.5,0,-1,0, .5,-.5,.5,0,-1,0,
 -.5,-.5,-.5,0,-1,0, .5,-.5,.5,0,-1,0, -.5,-.5,.5,0,-1,0
]);
const buffer=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
gl.bufferData(gl.ARRAY_BUFFER,cubeVerts,gl.STATIC_DRAW);
gl.enableVertexAttribArray(loc.pos);
gl.vertexAttribPointer(loc.pos,3,gl.FLOAT,false,24,0);
gl.enableVertexAttribArray(loc.normal);
gl.vertexAttribPointer(loc.normal,3,gl.FLOAT,false,24,12);

const objects=[];
function addBox(x,y,z,sx,sy,sz,color=[.65,.65,.65]){
  objects.push({x,y,z,sx,sy,sz,color});
}

function identity(){return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}
function multiply(a,b){
  const o=new Float32Array(16);
  for(let r=0;r<4;r++) for(let c=0;c<4;c++){
    o[c*4+r]=a[0*4+r]*b[c*4+0]+a[1*4+r]*b[c*4+1]+a[2*4+r]*b[c*4+2]+a[3*4+r]*b[c*4+3];
  }
  return o;
}
function modelMatrix(o){
  const m=identity();
  m[0]=o.sx;m[5]=o.sy;m[10]=o.sz;m[12]=o.x;m[13]=o.y;m[14]=o.z;
  return m;
}
function perspective(fov,aspect,near,far){
  const f=1/Math.tan(fov/2), nf=1/(near-far), m=new Float32Array(16);
  m[0]=f/aspect;m[5]=f;m[10]=(far+near)*nf;m[11]=-1;m[14]=2*far*near*nf;
  return m;
}
function normalize(v){const l=Math.hypot(v[0],v[1],v[2])||1;return [v[0]/l,v[1]/l,v[2]/l]}
function cross(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]}
function sub(a,b){return [a[0]-b[0],a[1]-b[1],a[2]-b[2]]}
function lookAt(eye,target,up=[0,1,0]){
  const z=normalize(sub(eye,target)), x=normalize(cross(up,z)), y=cross(z,x);
  const m=identity();
  m[0]=x[0];m[4]=x[1];m[8]=x[2];
  m[1]=y[0];m[5]=y[1];m[9]=y[2];
  m[2]=z[0];m[6]=z[1];m[10]=z[2];
  m[12]=-(x[0]*eye[0]+x[1]*eye[1]+x[2]*eye[2]);
  m[13]=-(y[0]*eye[0]+y[1]*eye[1]+y[2]*eye[2]);
  m[14]=-(z[0]*eye[0]+z[1]*eye[1]+z[2]*eye[2]);
  return m;
}
function transformPoint(m,p){
  const x=p[0],y=p[1],z=p[2],w=1;
  return [
    m[0]*x+m[4]*y+m[8]*z+m[12]*w,
    m[1]*x+m[5]*y+m[9]*z+m[13]*w,
    m[2]*x+m[6]*y+m[10]*z+m[14]*w,
    m[3]*x+m[7]*y+m[11]*z+m[15]*w
  ];
}

const C={
  ground:[.54,.50,.40], road:[.17,.18,.18], curb:[.72,.72,.68],
  slab:[.63,.65,.64], wall:[.77,.72,.62], column:[.56,.57,.56],
  glass:[.32,.47,.53], yellow:[1,.83,0], red:[.72,.08,.06],
  green:[.15,.42,.20], blue:[.10,.28,.50], white:[.85,.85,.82],
  office:[.70,.70,.68], dark:[.23,.23,.22]
};

function addRoad(x,z,sx,sz){addBox(x,.02,z,sx,.08,sz,C.road)}
function addBarrier(x,z,rotAxis="x"){
  const long=rotAxis==="x"; addBox(x,.45,z,long?1.8:.16,.85,long?.16:1.8,C.red);
  addBox(x,.52,z,long?1.75:.18,.10,long?.18:1.75,C.white);
}
function addTree(x,z){
  addBox(x,1.5,z,.45,3,.45,[.38,.25,.13]);
  addBox(x,3.7,z,2.2,2.4,2.2,[.14,.38,.16]);
}
function addBuilding(cx,cz,floors,w,d,completeFloors=0,accent=C.wall){
  const floorH=3.3;
  // podium / ground
  addBox(cx,.25,cz,w,.5,d,C.slab);
  for(let f=0; f<floors; f++){
    const y=.55+f*floorH;
    addBox(cx,y,cz,w,.28,d,C.slab);
    const cy=y+floorH/2;
    const colH=floorH-.28;
    const xs=[-w/2+.45,0,w/2-.45];
    const zs=[-d/2+.45,d/2-.45];
    xs.forEach(dx=>zs.forEach(dz=>addBox(cx+dx,cy,cz+dz,.38,colH,.38,C.column)));
    if(f<completeFloors){
      // perimeter walls with window strips
      addBox(cx,cy,cz-d/2+.22,w,.1,.35,accent);
      addBox(cx,cy,cz+d/2-.22,w,.1,.35,accent);
      addBox(cx-w/2+.22,cy,cz,.35,.1,d,accent);
      addBox(cx+w/2-.22,cy,cz,.35,.1,d,accent);
      addBox(cx,cy+.25,cz-d/2+.42,w*.68,1.45,.12,C.glass);
    }
  }
  addBox(cx,.55+floors*floorH,cz,w,.32,d,C.slab);
  // internal stair/core only
  addBox(cx-w*.17,(floors*floorH)/2,cz,2.2,floors*floorH,3.0,C.dark);
}

function buildSite(){
  // site slab
  addBox(0,-.35,0,92,.65,76,C.ground);

  // roads
  addRoad(0,0,12,74);
  addRoad(-35,0,10,74);
  addRoad(35,0,10,74);
  addRoad(0,-31,70,8);
  addRoad(0,31,70,8);

  // pedestrian paths
  addBox(-6,.07,0,2.4,.08,70,C.yellow);
  addBox(7,.07,0,2.4,.08,70,C.yellow);

  // buildings: B1 complete walls, B2 complete to 5th floor
  addBuilding(-22,-18,8,18,14,8,[.75,.69,.58]);
  addBuilding(3,-20,8,18,14,5,[.72,.68,.58]);
  addBuilding(28,-16,7,17,13,4,[.72,.68,.58]);
  addBuilding(-18,21,7,17,13,3,[.70,.67,.58]);
  addBuilding(22,23,6,17,13,2,[.70,.67,.58]);

  // site offices / welfare
  for(let i=0;i<4;i++) addBox(-39+i*5,1.4,31,4.4,2.7,6.5,C.office);
  addBox(34,1.5,32,8,3,5,C.blue);

  // storage areas and pallets
  for(let i=0;i<5;i++){
    addBox(30+i*1.8,.45,9,1.4,.8,1.2,[.50,.34,.18]);
    addBox(30+i*1.8,1.15,9,1.25,.55,1.0,C.wall);
  }

  // perimeter wall
  addBox(0,1.0,-38,92,2,.35,C.white); addBox(0,1.0,38,92,2,.35,C.white);
  addBox(-46,1.0,0,.35,2,76,C.white); addBox(46,1.0,0,.35,2,76,C.white);

  // entrance gate
  addBox(-5,2.0,-37.7,.4,4,.4,C.yellow); addBox(5,2.0,-37.7,.4,4,.4,C.yellow);
  addBox(0,4.0,-37.7,10,.4,.4,C.yellow);

  // barriers
  for(let z=-25;z<=25;z+=6){ addBarrier(-29,z,"z"); addBarrier(29,z,"z"); }

  // crane masts, simplified
  [-11,14].forEach((x,idx)=>{
    const z=idx?7:-5;
    for(let y=1;y<27;y+=2) addBox(x,y,z,.7,1.8,.7,C.yellow);
    addBox(x,27,z,25,.45,.45,C.yellow);
    addBox(x+9,26.6,z,.35,2,.35,C.dark);
  });

  // trees around outer edge
  for(let x=-42;x<=42;x+=8){ addTree(x,-35); addTree(x,35); }

  // safety boards / signage
  addBox(-9,1.3,-33,.15,2.6,4,C.blue);
  addBox(9,1.3,-33,.15,2.6,4,C.green);

  // parked equipment
  addBox(15,.8,9,4,1.3,2.2,C.yellow);
  addBox(15,1.9,9,1.6,1.0,1.7,C.dark);
  addBox(-15,.7,8,4.5,1.2,2.0,C.blue);
}
buildSite();

let camera={x:0,y:1.75,z:-33,yaw:0,pitch:0};
let keys={};
let locked=false;
let last=performance.now();

const jumps={
  overview:{x:0,y:28,z:50,yaw:Math.PI,pitch:-.42},
  b1:{x:-22,y:1.75,z:-32,yaw:0,pitch:0},
  b2:{x:3,y:1.75,z:-34,yaw:0,pitch:0},
  b3:{x:28,y:1.75,z:-29,yaw:0,pitch:0},
  b4:{x:-18,y:1.75,z:8,yaw:Math.PI,pitch:0},
  b5:{x:22,y:1.75,z:9,yaw:Math.PI,pitch:0}
};

function resize(){
  const dpr=Math.min(devicePixelRatio||1,2);
  const w=Math.floor(innerWidth*dpr),h=Math.floor(innerHeight*dpr);
  if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);}
}
addEventListener("resize",resize); resize();

function requestLock(){
  canvas.requestPointerLock?.();
}
document.getElementById("enterBtn").addEventListener("click",()=>{
  requestLock(); document.querySelector(".viewer-panel").classList.add("compact");
});
canvas.addEventListener("click",()=>{ if(!locked) requestLock(); });
document.addEventListener("pointerlockchange",()=>{
  locked=document.pointerLockElement===canvas;
  statusEl.textContent=locked?"Walking • ESC to release mouse":"Click scene to look around";
});
document.addEventListener("mousemove",e=>{
  if(!locked)return;
  camera.yaw-=e.movementX*.0022;
  camera.pitch-=e.movementY*.0018;
  camera.pitch=Math.max(-1.35,Math.min(1.35,camera.pitch));
});
document.addEventListener("keydown",e=>{keys[e.code]=true});
document.addEventListener("keyup",e=>{keys[e.code]=false});

document.querySelectorAll("[data-jump]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    Object.assign(camera,jumps[btn.dataset.jump]);
    statusEl.textContent=btn.textContent;
  });
});

document.getElementById("fullscreenBtn").addEventListener("click",async()=>{
  try{
    if(!document.fullscreenElement) await document.documentElement.requestFullscreen();
    else await document.exitFullscreen();
  }catch(_){}
});

const touchState={};
document.querySelectorAll("[data-touch]").forEach(btn=>{
  const name=btn.dataset.touch;
  const on=e=>{e.preventDefault();touchState[name]=true};
  const off=e=>{e.preventDefault();touchState[name]=false};
  btn.addEventListener("pointerdown",on); btn.addEventListener("pointerup",off);
  btn.addEventListener("pointercancel",off); btn.addEventListener("pointerleave",off);
});

function update(dt){
  const fast=keys.ShiftLeft||keys.ShiftRight?8.5:4.2;
  const forward=(keys.KeyW||keys.ArrowUp||touchState.forward?1:0)-(keys.KeyS||keys.ArrowDown||touchState.back?1:0);
  const strafe=(keys.KeyD||touchState.right?1:0)-(keys.KeyA||touchState.left?1:0);
  if(touchState.turnLeft)camera.yaw+=dt*1.25;
  if(touchState.turnRight)camera.yaw-=dt*1.25;
  const sy=Math.sin(camera.yaw), cy=Math.cos(camera.yaw);
  camera.x += (sy*forward + cy*strafe)*fast*dt;
  camera.z += (-cy*forward + sy*strafe)*fast*dt;
  camera.x=Math.max(-43,Math.min(43,camera.x));
  camera.z=Math.max(-35,Math.min(35,camera.z));
  if(camera.y<2.2 && camera.y!==1.75) camera.y=1.75;
}

function viewProjection(){
  const dir=[
    Math.sin(camera.yaw)*Math.cos(camera.pitch),
    Math.sin(camera.pitch),
    -Math.cos(camera.yaw)*Math.cos(camera.pitch)
  ];
  const eye=[camera.x,camera.y,camera.z];
  const target=[eye[0]+dir[0],eye[1]+dir[1],eye[2]+dir[2]];
  const view=lookAt(eye,target);
  const proj=perspective(Math.PI/3,canvas.width/canvas.height,.1,180);
  return multiply(proj,view);
}

function render(){
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.clearColor(.47,.64,.74,1);
  gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
  gl.useProgram(program);
  gl.uniform3f(loc.light,-.45,.92,.35);
  gl.uniform1f(loc.ambient,.48);
  const vp=viewProjection();
  gl.uniformMatrix4fv(loc.viewProj,false,vp);
  for(const o of objects){
    gl.uniformMatrix4fv(loc.model,false,modelMatrix(o));
    gl.uniform3fv(loc.color,o.color);
    gl.drawArrays(gl.TRIANGLES,0,36);
  }
  updateLabels(vp);
  drawMap();
}

function updateLabels(vp){
  document.querySelectorAll(".world-label").forEach(el=>{
    const p=el.dataset.pos.split(",").map(Number);
    const q=transformPoint(vp,p);
    if(q[3]<=0){el.style.display="none";return}
    const nx=q[0]/q[3], ny=q[1]/q[3], nz=q[2]/q[3];
    if(nz<-1||nz>1||Math.abs(nx)>1.15||Math.abs(ny)>1.15){el.style.display="none";return}
    el.style.display="block";
    el.style.left=`${(nx*.5+.5)*innerWidth}px`;
    el.style.top=`${(-ny*.5+.5)*innerHeight}px`;
  });
}

function drawMap(){
  const ctx=mapCtx,w=minimap.width,h=minimap.height;
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle="rgba(5,5,5,.88)";ctx.fillRect(0,0,w,h);
  const sx=w/100,sz=h/84;
  const X=x=>w/2+x*sx, Z=z=>h/2+z*sz;
  ctx.strokeStyle="#444";ctx.lineWidth=1;
  ctx.strokeRect(X(-46),Z(-38),92*sx,76*sz);
  const bs=[
    [-22,-18,18,14,"1"],[3,-20,18,14,"2"],[28,-16,17,13,"3"],
    [-18,21,17,13,"4"],[22,23,17,13,"5"]
  ];
  bs.forEach(([x,z,bw,bd,n])=>{
    ctx.fillStyle="#343434";ctx.fillRect(X(x-bw/2),Z(z-bd/2),bw*sx,bd*sz);
    ctx.strokeStyle="#ffd400";ctx.strokeRect(X(x-bw/2),Z(z-bd/2),bw*sx,bd*sz);
    ctx.fillStyle="#ffd400";ctx.font="bold 13px Arial";ctx.textAlign="center";ctx.fillText(n,X(x),Z(z)+4);
  });
  ctx.save();ctx.translate(X(camera.x),Z(camera.z));ctx.rotate(-camera.yaw);
  ctx.fillStyle="#fff";ctx.beginPath();ctx.moveTo(0,-8);ctx.lineTo(5,6);ctx.lineTo(-5,6);ctx.closePath();ctx.fill();ctx.restore();
}

function frame(now){
  const dt=Math.min(.04,(now-last)/1000);last=now;
  update(dt);render();requestAnimationFrame(frame);
}

setTimeout(()=>loadingEl.classList.add("hidden"),650);
requestAnimationFrame(frame);
})();