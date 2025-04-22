const CACHE_NAME = 'streak-breaker-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  './jsFiles/jspsych.js',
  './css/jspsych.css',
  './jsFiles/plugin-html-button-response.js',
  'manifest.json',
  'icon-192.png',
  'icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
