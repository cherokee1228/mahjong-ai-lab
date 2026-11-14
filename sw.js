const CACHE_NAME='mahjong-ai-lab-v2-7-4';
const APP_FILES=['./','./index.html','./manifest.webmanifest'];
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE_NAME);await c.addAll(APP_FILES);await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{const ks=await caches.keys();await Promise.all(ks.filter(k=>k.startsWith('mahjong-ai-lab-')&&k!==CACHE_NAME).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==self.location.origin)return;if(e.request.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/')){e.respondWith(fetch(e.request).then(r=>{if(r.ok)caches.open(CACHE_NAME).then(c=>c.put('./index.html',r.clone()));return r}).catch(()=>caches.match('./index.html')))}else e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
