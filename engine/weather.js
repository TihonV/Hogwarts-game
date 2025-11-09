let rainSystem, snowSystem;

function createRain(scene) {
  const geometry = new THREE.BufferGeometry();
  const count = 5000;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = Math.random() * 100 + 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.5,
    transparent: true,
    opacity: 0.8
  });
  rainSystem = new THREE.Points(geometry, material);
  scene.add(rainSystem);

  return (delta) => {
    const pos = rainSystem.geometry.attributes.position.array;
    for (let i = 1; i < pos.length; i += 3) {
      pos[i] -= delta * 50;
      if (pos[i] < -10) pos[i] = 60;
    }
    rainSystem.geometry.attributes.position.needsUpdate = true;
  };
}

function createSnow(scene) {
  const geometry = new THREE.BufferGeometry();
  const count = 3000;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = Math.random() * 100 + 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.3,
    transparent: true,
    opacity: 0.6
  });
  snowSystem = new THREE.Points(geometry, material);
  scene.add(snowSystem);

  return (delta) => {
    const pos = snowSystem.geometry.attributes.position.array;
    for (let i = 1; i < pos.length; i += 3) {
      pos[i] -= delta * 10;
      if (pos[i] < -10) pos[i] = 60;
    }
    snowSystem.geometry.attributes.position.needsUpdate = true;
  };
}

let updateRain, updateSnow;

export function updateWeather(type) {
  weather = type;
  document.getElementById("currentWeather").textContent = type;

  if (type === 'rain' && !rainSystem) {
    updateRain = createRain(scene);
  } else if (type === 'snow' && !snowSystem) {
    updateSnow = createSnow(scene);
  }

  if (type === 'clear') {
    if (rainSystem) scene.remove(rainSystem);
    if (snowSystem) scene.remove(snowSystem);
  }
}
