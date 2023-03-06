import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `
        @import "${ path.resolve(__dirname, 'src/assets/style/mixins.less') }";
        @import "${ path.resolve(__dirname, 'src/assets/style/variables.less') }";
        `
      }
    }
  },
  build: {
    assetsInlineLimit: 1024 * 10
  }
})
