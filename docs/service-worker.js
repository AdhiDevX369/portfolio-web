const CACHE_NAME = 'adithya-portfolio-v2';
const urlsToCache = [
  './',
  './index.html',
  './assets/css/styles.css',
  './assets/css/swiper-bundle.min.css',
  './assets/js/main.js',
  './assets/js/scrollreveal.min.js',
  './assets/js/swiper-bundle.min.js',
  './assets/img/profile.png',
  './offline.html'
];

// Install service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Network-first for HTML, cache-first for others
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin
  if (url.origin !== location.origin) return;

  if (req.mode === 'navigate') {
    // Network-first for navigation requests
    event.respondWith(
      fetch(req)
        .then(res => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match(req).then(r => r || caches.match('./offline.html')))
    );
  } else {
    // Cache-first for static assets
    event.respondWith(
      caches.match(req).then(cached => {
        return (
          cached ||
          fetch(req).then(res => {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
            return res;
          })
        );
      })
    );
  }
});
