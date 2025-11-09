function updateTimeOfDay(time) {
  const hour = Math.floor(time * 24);
  const isDay = hour >= 6 && hour < 18;

  // Обновляем цвет неба
  const skyColor = isDay ? 0x87CEEB : 0x000033;
  scene.background = new THREE.Color(skyColor);

  // Обновляем солнце
  const sun = scene.getObjectByName('sun');
  if (sun) {
    sun.intensity = isDay ? 0.8 : 0.1;
    sun.position.y = isDay ? 20 : 5;
  }

  // Обновляем тени
  const sunLight = scene.children.find(c => c instanceof THREE.DirectionalLight);
  if (sunLight) {
    sunLight.castShadow = isDay;
  }

  // Обновляем UI
  document.getElementById("currentTime").textContent = isDay ? "День" : "Ночь";

  // Добавляем луну ночью
  if (!isDay) {
    const moon = scene.getObjectByName('moon');
    if (!moon) {
      const moonLight = new THREE.PointLight(0xffffff, 0.2, 100);
      moonLight.position.set(0, 10, 0);
      moonLight.name = 'moon';
      scene.add(moonLight);
    }
  } else {
    const moon = scene.getObjectByName('moon');
    if (moon) scene.remove(moon);
  }
}
