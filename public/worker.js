
// This is some youtube guy
const CACHE_NAME = "What we have cached!";
const urlsToCache = [ 'index.html', 'offline.html' ];

const self = this;
//=========================================
//this refere to this file (wotker.js)


// Service Worker
// this will work like a local installed web server or web proxy for PWA
// including resources and API calls.
// 
// Installed by web page
// Own thread and lifecycle
// 
//====================================
// My Refe:                        //
// =================================== 
// - https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker)
// - https://www.youtube.com/watch?v=dlvevNPxHd8

//Install
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
                console.log('The cache Opened');

                return cache.addAll(urlsToCache);
            })
    )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(() => {
                return fetch(event.request).catch(() => caches.match('offline.html'))
            })
    )
});

// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     fetch(event.request).catch(function() {
//       return caches.match(event.request);
//     })
//   );
// });

// Activate the Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
            
    )
});