const CACHE_NAME = 'static-cache-v1';
const DATA_CACHE_NAME = 'data-cache-v1';

const FILES_TO_CACHE = [
    'index.html',
	'audio/typing1.wav',
	'audio/vibrate.wav',
	'audio/finish.wav',
	'js/main.js',
	'js/voice.js',
	'images/favicon.png',
	'images/favicon.ixo',
	'images/mic.png',
	'font/magdacleanmono-bold.ttf',
	'font/magdacleanmono-regular.ttf',
	'font/monoMMM_5.ttf',
	'css/main.css'
  ]

self.addEventListener('install', (evt) => {
    console.log('[ServiceWorker] Install');
    // CODELAB: Precache static resources here.
    evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching Static Resources');
        return cache.addAll(FILES_TO_CACHE);
      }).then(caches.open(DATA_CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching Data Resources');
        return cache.addAll(DATA_FILES_TO_CACHE);
      })).then(self.skipWaiting())
    );
  });
  
  self.addEventListener('activate', (evt) => {
    console.log('[ServiceWorker] Activate');
    // CODELAB: Remove previous cached data from disk.
    evt.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
  );
    self.clients.claim();
  });


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
  return;
  }
});