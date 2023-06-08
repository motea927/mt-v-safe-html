import { createApp } from 'vue'
import App from './App.vue'
import { vSafeHtml } from '@/core/main'

createApp(App).directive('safe-html', vSafeHtml).mount('#app')
