import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    onConsoleLog: (log) => {
      if (log.startsWith('The above error occurred')) {
        return false;
      }
    },
  },
});
