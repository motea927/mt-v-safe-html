import { createSafeHtml } from 'mt-v-safe-html'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const options = nuxtApp.$config.public.mtVSafeHtml ?? {}
  nuxtApp.vueApp.use(createSafeHtml, options)
})
