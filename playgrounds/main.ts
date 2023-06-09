import { createApp } from 'vue'
import { createDirective } from '../dist/mt-v-safe-html'
import App from './App.vue'

createApp(App)
  .directive(
    'safe-html',
    createDirective({ defaultString: 'globalDefaultString' })
  )

  .mount('#app')
