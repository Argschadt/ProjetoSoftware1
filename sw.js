const CACHE_NAME = 'jardim-botanico-v1';

// Assets to cache immediately when the service worker installs
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/galeria.html',
  '/styles.css',
  '/script.js',
  '/imagens/logo.jpg'
];

// Assets to cache when they are requested
const DYNAMIC_CACHE_PATTERNS = [
  /\/imagens\/individuos\/.+\.(jpg|jpeg|png|webp)$/,
  /\/especie-.+\.html$/
];

// Install event - precache core assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installed');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching Files');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      // Claim clients so the service worker is in control immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - cache strategy
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Cache strategy for gallery images and species pages
  const isDynamicAsset = DYNAMIC_CACHE_PATTERNS.some(pattern => 
    pattern.test(url.pathname)
  );

  if (isDynamicAsset) {
    event.respondWith(
      // Cache-first strategy for dynamic content
      caches.match(request).then((cachedResponse) => {
        // Return cached response if found
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Otherwise, fetch from network and cache
        return fetch(request).then((networkResponse) => {
          // Cache only if response is valid
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          
          return networkResponse;
        });
      }).catch(() => {
        // If both cache and network fail, return a basic offline message
        if (request.headers.get('accept').includes('text/html')) {
          return new Response('Você está offline e o conteúdo não está disponível no cache.', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/html',
              'Cache-Control': 'no-store'
            })
          });
        }
      })
    );
  } else {
    // Network-first strategy for other content
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache a copy of the response
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // If network fails, try to get from cache
          return caches.match(request);
        })
    );
  }
});
