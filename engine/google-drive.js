export async function saveToDrive(data) {
  const token = localStorage.getItem('drive_token');
  if (!token) return;

  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const formData = new FormData();
  formData.append('file', blob, 'savegame.json');

  try {
    await fetch('https://your-proxy-backend.com/api/drive/save', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });
    console.log("Сохранено в Google Drive");
  } catch (err) {
    console.error("Ошибка сохранения:", err);
  }
}

export async function loadFromDrive() {
  const token = localStorage.getItem('drive_token');
  if (!token) return;

  try {
    const res = await fetch('https://your-proxy-backend.com/api/drive/load', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Ошибка загрузки:", err);
  }
}
