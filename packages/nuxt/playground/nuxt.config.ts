export default defineNuxtConfig({
  modules: ['../src/module'],
  mtVSafeHtml: {
    defaultString: '123'
  },
  devtools: { enabled: true }
})
