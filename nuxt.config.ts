// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-10-17',

  // https://nuxt.com/docs/getting-started/upgrade#testing-nuxt-4
  future: { compatibilityVersion: 4 },

  // https://nuxt.com/modules
  modules: [
    '@nuxthub/core',
    '@nuxt/ui',
    '@vueuse/nuxt',
  ],

  // https://hub.nuxt.com/docs/getting-started/installation#options
  hub: {
    cache: true,
  },

  // https://devtools.nuxt.com
  devtools: { enabled: true },
})
