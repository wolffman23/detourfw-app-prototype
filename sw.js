/* Detour FW prototype service worker: offline app shell only. Same-origin GETs only; never touches POSTs or other sites.
   PRECACHE is filled in by scripts/postbuild.mjs with the hashed build files. */
const VERSION = "mvae71i0";
const PRECACHE = ["./", "./index.html", "./manifest.webmanifest" , "./assets/MapScreen-DBE96hFo.css", "./assets/MapScreen-Dp3WBCL7.js", "./assets/index-7X8LxeCv.css", "./assets/index-BZuFJUIm.js", "./assets/maplibre-gl-worker-DxGNRm0a.mjs", "./icons/apple-touch-icon.png", "./icons/favicon-32.png", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/logo-256.png", "./icons/maskable-192.png", "./icons/maskable-512.png"];
const CACHE = `dfw-shell-${VERSION}`;

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith("dfw-shell-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // map tiles, live feed etc. go straight to the network
  if (/\/api\//.test(url.pathname)) return; // same-origin feed (lab proxy): always network, never cached here (the app keeps its own last-good copy)
  if (req.mode === "navigate") {
    // network first so updates show up, cached shell when offline
    e.respondWith(fetch(req).then((r) => { const copy = r.clone(); caches.open(CACHE).then((c) => c.put("./index.html", copy)); return r; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => {
    if (r.ok) { const copy = r.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
    return r;
  })));
});
