import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default {
  base: '/',
  build: {
    outDir: 'dist'
  },
  plugins:[react()]
}
