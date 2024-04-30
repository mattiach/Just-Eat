/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// plugins and settings
import { imageSettings } from './src/settings/imageSettings';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer(imageSettings),
  ],
  server: {
    watch: {
      usePolling: true,
    },
    port: 3000,
  },
  build: {
    sourcemap: true,
    minify: 'esbuild',
    cssCodeSplit: true,
    cssMinify: "lightningcss" // experimental support for Lightning CSS. Requires 'npm add -D lightningcss'
  },
  html: {
    cspNonce: true, // add a nonce attribute to the <script> tag for CSP (Content Security Policy)
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components/'),
      '@context': path.resolve(__dirname, 'src/context/'),
      '@data': path.resolve(__dirname, 'src/data/'),
      '@functions': path.resolve(__dirname, 'src/functions/'),
      '@hooks': path.resolve(__dirname, 'src/hooks/'),
      '@pages': path.resolve(__dirname, 'src/pages/'),
      '@redux': path.resolve(__dirname, 'src/redux/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@languages': path.resolve(__dirname, 'src/languages/'),
      '@settings': path.resolve(__dirname, 'src/settings/'),
    }
  },
});
