let activeQuests = [];

export function addQuest(name, description, reward) {
  activeQuests.push({ name, description, reward, completed: false });
  updateQuestUI();
}

export function completeQuest(name) {
  const quest = activeQuests.find(q => q.name === name);
  if (quest) {
    quest.completed = true;
    updateQuestUI();
  }
}

function updateQuestUI() {
  const questDisplay = document.getElementById("currentQuest");
  if (activeQuests.length === 0) {
    questDisplay.textContent = "Нет активных квестов";
  } else {
    const active = activeQuests.find(q => !q.completed);
    if (active) {
      questDisplay.textContent = active.name + ": " + active.description;
    } else {
      questDisplay.textContent = "Все квесты выполнены!";
    }
  }
}
