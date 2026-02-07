let scene, camera, renderer, car;
let speed=0, health=100, score=0;
let keys={}, running=false;
let coins=[], traffic=[];
let heading=0;

function rotateScreen(){
  if(screen.orientation && screen.orientation.lock)
    screen.orientation.lock("landscape").catch(()=>{});
}

function startGame(){
  document.getElementById("menu").style.display="none";
  document.getElementById("loading").style.display="block";
  init(); running=true; animate();
}

function init(){
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);

  camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 2000);
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(innerWidth, innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // Lights
  let ambient = new THREE.AmbientLight(0xffffff,0.4); scene.add(ambient);
  let dir = new THREE.DirectionalLight(0xffffff,0.8);
  dir.position.set(50,100,50); dir.castShadow=true; scene.add(dir);

  // Ground
  let groundMat = new THREE.MeshStandardMaterial({color:0x444444, roughness:0.8});
  let ground = new THREE.Mesh(new THREE.PlaneGeometry(600,600), groundMat);
  ground.rotation.x=-Math.PI/2; ground.receiveShadow=true;
  scene.add(ground);

  // Roads
  for(let i=-250;i<=250;i+=40){
    let roadV = new THREE.Mesh(new THREE.PlaneGeometry(20,600), new THREE.MeshStandardMaterial({color:0x555555}));
    roadV.rotation.x=-Math.PI/2; roadV.position.x=i; scene.add(roadV);

    let roadH = roadV.clone(); roadH.rotation.z=Math.PI/2; roadH.position.set(0,0.01,i);
    scene.add(roadH);
  }

  // Buildings
  let colors=[0xFF5555,0x55FF55,0x5555FF,0xFFFF55,0xFFAA33];
  for(let i=0;i<120;i++){
    let b = new THREE.Mesh(
      new THREE.BoxGeometry(10,Math.random()*40+10,10),
      new THREE.MeshStandardMaterial({color:colors[Math.floor(Math.random()*colors.length)]})
    );
    b.position.set(Math.random()*500-250, b.geometry.parameters.height/2, Math.random()*500-250);
    b.castShadow=true; b.receiveShadow=true; scene.add(b);
  }

  // Coins
  for(let i=0;i<40;i++){
    let c = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,1),
      new THREE.MeshStandardMaterial({color:0xffff00})
    );
    c.position.set(Math.random()*400-200,1,Math.random()*400-200);
    scene.add(c); coins.push(c);
  }

  // Traffic
  for(let i=0;i<20;i++){
    let t = new THREE.Mesh(
      new THREE.BoxGeometry(2,1,4),
      new THREE.MeshStandardMaterial({color:0x00ff00})
    );
    t.position.set(Math.random()*400-200,1,Math.random()*400-200);
    scene.add(t); traffic.push(t);
  }

  // Load car model
  let loader = new THREE.GLTFLoader();
  loader.load('car.glb', function(gltf){
    car = gltf.scene;
    car.scale.set(0.5,0.5,0.5);
    car.position.set(0,0,0);
    car.traverse(c=>{if(c.isMesh)c.castShadow=true;});
    scene.add(car);
    document.getElementById("loading").style.display="none"; // hide loading
  },
  undefined,
  function(error){
    console.error(error);
    alert("Car model load failed. Check car.glb");
  });

  camera.position.set(0,8,12);
}

// Update loop
function update(){
  if(!car) return; // wait until car loaded

  if(keys.up) speed+=0.01;
  if(keys.down) speed-=0.02;
  speed*=0.98;
  speed=Math.max(-0.5, Math.min(speed,1.5));

  if(keys.left) heading+=0.04;
  if(keys.right) heading-=0.04;

  car.rotation.y = heading;
  car.position.x += Math.sin(heading)*speed*3;
  car.position.z += Math.cos(heading)*speed*3;

  // Coins
  coins.forEach(c=>{
    if(c.visible && car.position.distanceTo(c.position)<2){
      c.visible=false; score+=10;
    }
  });

  // Traffic collision
  traffic.forEach(t=>{
    if(car.position.distanceTo(t.position)<3) health-=0.2;
  });

  if(health<=0){alert("Game Over"); location.reload();}

  document.getElementById("spd").innerText = (speed*100).toFixed(0);
  document.getElementById("hp").innerText = health.toFixed(0);
  document.getElementById("score").innerText = score;

  // Camera follow
  let camOffset = new THREE.Vector3(Math.sin(heading)*-12,8,Math.cos(heading)*-12);
  camera.position.copy(car.position.clone().add(camOffset));
  camera.lookAt(car.position);
}

function animate(){
  if(!running) return;
  requestAnimationFrame(animate);
  update();
  renderer.render(scene,camera);
}

window.addEventListener("keydown", e=>{
  if(e.key==="ArrowUp") keys.up=1;
  if(e.key==="ArrowDown") keys.down=1;
  if(e.key==="ArrowLeft") keys.left=1;
  if(e.key==="ArrowRight") keys.right=1;
  if(e.key==="Shift") keys.nitro=1;
});
window.addEventListener("keyup", ()=>keys={});
