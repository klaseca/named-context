import { defineConfig } from 'vitest/config';

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'solid-js/h',
  },
  test: {
    environment: 'happy-dom',
  },
  resolve: {
    conditions: ['browser'],
  },
});
