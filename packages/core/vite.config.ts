import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['**/*.ts'],
      exclude: ['dist/**'],
      tsConfigFilePath: fileURLToPath(
        new URL('../../tsconfig.app.json', import.meta.url)
      )
    })
  ],
  resolve: {
    alias: {
      '@/core': fileURLToPath(new URL('.', import.meta.url))
    }
  },

  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: fileURLToPath(new URL('index.ts', import.meta.url)),
      name: 'mt-v-safe-html',
      // the proper extensions will be added
      fileName: 'index'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'vue-i18n'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          'vue-i18n': 'vue-i18n'
        }
      }
    }
  }
})
