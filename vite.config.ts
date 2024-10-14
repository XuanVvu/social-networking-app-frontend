import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tsconfigPathsPlugin from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from 'node:url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { dirname, resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPathsPlugin(),
    vue(),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locales/**'),
      strictMessage: false
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
