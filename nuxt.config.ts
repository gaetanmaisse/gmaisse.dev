// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
      '@bloggrify/core',
      '@bloggrify/mistral',
  ],

  app: {
      baseURL: '/gmaisse.dev/'
  },

  compatibilityDate: '2024-07-03'
})