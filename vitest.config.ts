import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      reporter: ['text', 'clover'],
      include: ['src/**/*.ts', '!src/test/**/*'],
      exclude: ['**/*.spec.ts'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
})
