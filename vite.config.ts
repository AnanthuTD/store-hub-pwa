/// <reference types="vitest" />
import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import manifest from './manifest.json';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base:'/',
    plugins: [
      react(),
      VitePWA({
        manifest,
        includeAssets: ['shopping.png', 'robots.txt'],
        devOptions: {
          enabled: true,
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
        },
        registerType: 'autoUpdate',
      }),
    ],
    server: {
      proxy: mode === 'development' ? {
        "/api": {
          target: 'http://localhost:4000',
          changeOrigin: true,
          // rewrite: path,
        },
      } : {},
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      include: [
        '@mui/material',
        '@mui/icons-material',
        '@mui/lab',
        '@mui/system',
        '@mui/utils',
        '@mui/x-date-pickers',
        'antd',
        '@ant-design/icons',
        'react',
        'react-dom',
        'react-redux',
        'react-router-dom',
        'react-hook-form',
        'react-error-boundary',
        'react-helmet-async',
        'axios',
        'dayjs',
        'framer-motion',
        'recharts',
        'socket.io-client',
      ],
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        treeshake: true,
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
        cache: false,
      },
    },
  };
});
