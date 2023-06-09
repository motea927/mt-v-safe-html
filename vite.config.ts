import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['packages/**/*.ts'],
      insertTypesEntry: true,
      copyDtsFiles: false,
      tsConfigFilePath: './tsconfig.app.json'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('packages', import.meta.url))
    }
  },

  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: fileURLToPath(new URL('packages/core/main.ts', import.meta.url)),
      name: 'mt-v-safe-html',
      // the proper extensions will be added
      fileName: 'mt-v-safe-html'
    }
  }
})
