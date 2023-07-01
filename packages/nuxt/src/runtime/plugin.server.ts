import { JSDOM } from 'jsdom'
import DOMPurify from 'dompurify'
import type { App } from 'vue'
import { setGlobalOptions, getBindingValue, generateHtml } from 'mt-v-safe-html'

import { defineNuxtPlugin } from '#app'

const window = new JSDOM('').window
const purify = DOMPurify(window)
const $safeHtml = generateHtml(getBindingValue, purify.sanitize)

export default defineNuxtPlugin((nuxtApp) => {
  const options = nuxtApp.$config.public.mtVSafeHtml ?? {}
  nuxtApp.vueApp.use(
    {
      install: (app: App) => {
        if (options) {
          setGlobalOptions(options)
        }
        app.config.globalProperties.$safeHtml = $safeHtml
      }
    },
    options
  )
})
