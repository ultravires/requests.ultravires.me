// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-10-17',

  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },

  // https://nuxt.com/modules
  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
  ],

  // Deploy directly to Cloudflare Pages (replaces the sunset NuxtHub Admin flow).
  // - `cloudflare-pages` preset emits a `dist/_worker.js` bundle deployable via `wrangler pages deploy`.
  // - `storage.cache` mounts Cloudflare KV (binding `CACHE`, defined in `wrangler.toml`) as the
  //   backing store for `defineCachedEventHandler` / `defineCachedFunction`.
  // - `devStorage.cache` falls back to a local filesystem driver during `nuxi dev` so the cache works
  //   without a real KV binding being available.
  nitro: {
    preset: 'cloudflare-pages',
    storage: {
      cache: {
        driver: 'cloudflare-kv-binding',
        binding: 'CACHE',
      },
    },
    devStorage: {
      cache: {
        driver: 'memory',
      },
    },
  },

  // https://devtools.nuxt.com
  devtools: { enabled: true },
})
