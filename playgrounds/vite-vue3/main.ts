import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createI18nHtml, createSafeHtml } from 'mt-v-safe-html'
import App from './App.vue'

const i18n = createI18n({
  // something vue-i18n options here ...
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      message: `worked message{'@'}`
    }
  }
})

createApp(App)
  .use(i18n)
  .use(createSafeHtml, { defaultString: 'globalDefaultString' })
  .use(createI18nHtml)
  .mount('#app')
