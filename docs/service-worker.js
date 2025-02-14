const CACHE_NAME = 'adithya-portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/styles.css',
  '/assets/css/swiper-bundle.min.css',
  '/assets/js/main.js',
  '/assets/js/scrollreveal.min.js',
  '/assets/js/swiper-bundle.min.js',
  '/assets/img/profile.png',
  'https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.1.0/remixicon.css'
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

// Cache and return requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          response => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Update service worker
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

// Handle offline fallback
self.addEventListener('fetch', event => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response;
        }
        return caches.match('/offline.html');
      })
    );
  }
});