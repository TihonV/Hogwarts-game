const CACHE_NAME = 'hogwarts-game-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/engine/core.js',
  '/engine/renderer.js',
  '/engine/weather.js',
  '/engine/zones.js',
  '/engine/quests.js',
  '/engine/ai-npc.js',
  '/engine/ui.js',
  '/engine/save.js',
  '/engine/google-drive.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
