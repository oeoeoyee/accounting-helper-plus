import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/accounting-helper-plus/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '/imgs': 'src/assets/images',
    },
  },
  // server: {
  //   proxy: {
  //     '/macros': {
  //       target: 'http://localhost:5173/',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace('https://script.google.com/', ''),
  //     },
  //   },
  // },
})
