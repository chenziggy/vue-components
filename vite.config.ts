import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: "@/", replacement: "/src/" }],
  },
  build: {
    lib: {
      entry: resolve(__dirname, '/src/index.ts'),
      name: 'VueComponens',
      fileName: 'vue-components'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'vue'
        }
      }
    }
  },
  plugins: [vue()]
})
