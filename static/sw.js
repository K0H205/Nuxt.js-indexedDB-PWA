importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/670be64674a745b54e85.js",
    "revision": "1146156a69ff11ad8eb2ff1442e5cb79"
  },
  {
    "url": "/_nuxt/9ca3f70092f6a9e073ad.js",
    "revision": "0d833dfba98d05c0523323fe8c73acd1"
  },
  {
    "url": "/_nuxt/b8d6b76c207a207a0040.js",
    "revision": "0a94467e1c28d37de11d2b3906dabb62"
  },
  {
    "url": "/_nuxt/db492d8949d6a1a6d504.js",
    "revision": "b4016dfc8f80c8a1d6dd2a8a1f817a82"
  },
  {
    "url": "/_nuxt/f217a7d718309b1f46c1.js",
    "revision": "caa5a8a3be88c6e65a3c20820aa26d12"
  }
], {
  "cacheId": "tan5tyo",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
