class CacheService {
  constructor(cacheName, data) {
    this.cacheName = cacheName;
    this.data = data;
  }

  async compareCacheToApi() {
    const cachedData = await this.getFromCache();

    if (JSON.stringify(this.data) !== JSON.stringify(cachedData)) {
      await this.addToCache(this.data);
    }
  }

  async addToCache(data) {
    const cache = await caches.open(this.cacheName);
    await cache.put(this.cacheName, new Response(JSON.stringify(data)));
  }

  async getFromCache() {
    const cache = await caches.open(this.cacheName);
    const response = await cache.match(this.cacheName);
    if (response) {
      const data = await response.json();
      return data;
    }
    return null;
  }
}

export default CacheService;