import { createApp } from 'vue'
import { createDirective } from '../dist/main'
import App from './App.vue'

createApp(App)
  .directive(
    'safe-html',
    createDirective({ defaultString: 'globalDefaultString' })
  )

  .mount('#app')
