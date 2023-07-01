import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(() => ({
  plugins: [vue()],
  server: {
    watch: {
      ignored: ['!**/node_modules/mt-v-safe-html/**']
    }
  },
  optimizeDeps: {
    exclude: ['mt-v-safe-html']
  }
}))
