this.addEventListener('install', event => {
  event.waitUntil(
    caches.open('assets-v1').then(cache => {
      return cache.addAll([
        '/',
        './assets/jquery-3.2.1.js',
        './js/scripts.js',
        './assets/closed-padlock.svg',
        './assets/open-padlock.svg',
        './css/reset.css',
        './css/styles.css'
      ])
    })
  );
});

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

this.addEventListener('activate', (event) => {
  let cacheWhiteList = ['assets-v1'];

  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (cacheWhiteList.indexOf(key) === -1) {
          return caches.delete(key)
        }
      }));
    })
  )
});