let scene, camera, renderer, composer, controls;
let castle, npc;
let clock = new THREE.Clock();
let timeOfDay = 0; // 0 = день, 0.5 = ночь
let weather = 'clear';

function initGame(faculty) {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87CEEB); // небо

  // Камера
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 10);

  // Рендерер с пост-обработкой
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.getElementById("gameContainer").appendChild(renderer.domElement);

  // Композитор для пост-эффектов
  composer = new THREE.EffectComposer(renderer);
  const renderPass = new THREE.RenderPass(scene, camera);
  composer.addPass(renderPass);

  // Bloom для свечения
  const bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  );
  composer.addPass(bloomPass);

  // Освещение
  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xffffff, 0.8);
  sun.position.set(10, 20, 15);
  sun.castShadow = true;
  sun.shadow.mapSize.width = 1024;
  sun.shadow.mapSize.height = 1024;
  sun.shadow.camera.near = 0.5;
  sun.shadow.camera.far = 50;
  sun.shadow.camera.left = -50;
  sun.shadow.camera.right = 50;
  sun.shadow.camera.top = 50;
  sun.shadow.camera.bottom = -50;
  scene.add(sun);

  // Загрузка замка
  const loader = new THREE.GLTFLoader();
  loader.load('assets/models/castle.glb', (gltf) => {
    castle = gltf.scene;
    castle.scale.set(0.5, 0.5, 0.5);
    castle.position.set(0, -2, 0);
    scene.add(castle);
  });

  // Управление
  controls = new THREE.PointerLockControls(camera, document.body);
  document.addEventListener('click', () => {
    controls.lock();
  });

  // Анимация
  animate();
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  // Обновляем время суток
  timeOfDay += delta * 0.001;
  if (timeOfDay > 1) timeOfDay = 0;

  updateTimeOfDay(timeOfDay);
  updateWeather(weather);

  if (controls.isLocked) {
    const speed = 10 * delta;
    if (moveForward) camera.translateZ(-speed);
    if (moveBackward) camera.translateZ(speed);
    if (moveLeft) camera.translateX(-speed);
    if (moveRight) camera.translateX(speed);
  }

  composer.render();
}

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

document.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'KeyW': moveForward = true; break;
    case 'KeyS': moveBackward = true; break;
    case 'KeyA': moveLeft = true; break;
    case 'KeyD': moveRight = true; break;
  }
});

document.addEventListener('keyup', (e) => {
  switch (e.code) {
    case 'KeyW': moveForward = false; break;
    case 'KeyS': moveBackward = false; break;
    case 'KeyA': moveLeft = false; break;
    case 'KeyD': moveRight = false; break;
  }
});
