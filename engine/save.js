export function saveGame() {
  const gameData = {
    faculty: document.getElementById("facultyName").textContent,
    timeOfDay: timeOfDay,
    weather: weather,
    quests: activeQuests,
    position: camera.position.toArray()
  };

  localStorage.setItem('hogwartsSave', JSON.stringify(gameData));
  console.log("Игра сохранена");
}

export function loadGame() {
  const saved = localStorage.getItem('hogwartsSave');
  if (saved) {
    const data = JSON.parse(saved);
    document.getElementById("facultyName").textContent = data.faculty;
    timeOfDay = data.timeOfDay;
    weather = data.weather;
    activeQuests = data.quests;
    camera.position.fromArray(data.position);
    updateWeather(weather);
    updateTimeOfDay(timeOfDay);
    console.log("Игра загружена");
  }
}

// Автосохранение каждые 30 сек
setInterval(saveGame, 30000);
