self.addEventListener('install', (e) => {
  console.log("Service worker installed");
  /*e.waitUntil(
    caches.open('todogether').then((cache) => cache.addAll([
      './',
      './index.html',
      './index.js',
    ])),
  );*/
});

self.addEventListener("activate", event => {
  console.log("Service worker activated");
});

self.addEventListener('fetch', (e) => {
  console.log("Service worker detected a fetch call");
  /*console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );*/
});