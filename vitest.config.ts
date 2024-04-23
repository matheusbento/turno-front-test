/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    conditions: mode === 'test' ? ['browser'] : [],
    alias: {
      components: path.resolve(__dirname, './resources/js/components'),
      '@constants': path.resolve(__dirname, './resources/js/constants'),
      helpers: path.resolve(__dirname, './resources/js/helpers'),
      hooks: path.resolve(__dirname, './resources/js/hooks'),
      processes: path.resolve(__dirname, './resources/js/processes'),
      resources: path.resolve(__dirname, './resources'),
      reducers: path.resolve(__dirname, './resources/js/reducers'),
      routers: path.resolve(__dirname, './resources/js/routers'),
      selectors: path.resolve(__dirname, './resources/js/selectors'),
      services: path.resolve(__dirname, './resources/js/services'),
      types: path.resolve(__dirname, './resources/js/types'),
      utils: path.resolve(__dirname, './resources/js/utils'),
      views: path.resolve(__dirname, './resources/js/views'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    globalSetup: './vitest-global-setup.ts',
  },
}));
