import { createApp } from 'vue'
import App from './App.vue'
import { createDirective } from '@/core/directive'

createApp(App)
  .directive(
    'safe-html',
    createDirective({ defaultString: 'globalDefaultString' })
  )

  .mount('#app')
