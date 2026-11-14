const CACHE_NAME = 'mahjong-ai-lab-v2-7-2';
const APP_FILES = ['./', './index.html', './manifest.webmanifest'];
self.addEventListener('install', event => {
 event.waitUntil((async()=>{const c=await caches.open(CACHE_NAME);await c.addAll(APP_FILES);await self.skipWaiting()})());
});
self.addEventListener('activate', event => {
 event.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.filter(k=>k.startsWith('mahjong-ai-lab-')&&k!==CACHE_NAME).map(k=>caches.delete(k)));await self.clients.claim()})());
});
self.addEventListener('fetch', event => {
 if(event.request.method!=='GET')return;
 const u=new URL(event.request.url);if(u.origin!==self.location.origin)return;
 if(event.request.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/')){
  event.respondWith(fetch(event.request).then(r=>{if(r.ok)caches.open(CACHE_NAME).then(c=>c.put('./index.html',r.clone()));return r}).catch(()=>caches.match('./index.html')));
 }else event.respondWith(caches.match(event.request).then(r=>r||fetch(event.request)));
});
