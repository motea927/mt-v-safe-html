export default defineNuxtConfig({
  modules: ['../../packages/nuxt/module'],
  mtVSafeHtml: {
    defaultString: '123'
  },
  devtools: { enabled: true }
})
