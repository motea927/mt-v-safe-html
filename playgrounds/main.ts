import { createApp } from 'vue'
import { vSafeHtml } from '../dist/mt-v-safe-html'
import App from './App.vue'

createApp(App).directive('safe-html', vSafeHtml).mount('#app')
