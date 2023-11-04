import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'node:path'
import * as packageJson from './package.json'
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    dts({
      include: ['src/assets/Components/'],
    })],
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  build: {
    lib: {
      entry: resolve('src', 'assets/Components/index.ts'),
      name: 'MultiEvent',
      formats: ['es', 'umd'],
      fileName: (format) => `multi-event.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
      output: {
        globals: {
          react: 'React'
        }
      }
    }
  }
})
