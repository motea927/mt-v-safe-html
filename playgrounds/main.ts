import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createDirective } from '../dist/mt-v-safe-html'
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
  .directive(
    'safe-html',
    createDirective({ defaultString: 'globalDefaultString' })
  )
  .use(i18n)
  .mount('#app')
