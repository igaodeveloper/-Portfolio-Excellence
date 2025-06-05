import path from 'path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { tempo } from 'tempo-devtools/dist/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  const vercelUrl = process.env.VERCEL_URL || 'portfolio-excellence.vercel.app';

  return {
    base: '/',
    define: {
      'process.env.VITE_API_URL': isProd
        ? JSON.stringify(`https://${vercelUrl}/api`)
        : JSON.stringify('http://localhost:5000/api'),
    },
    optimizeDeps: {
      entries: ['src/main.tsx', 'src/tempobook/**/*'],
      esbuildOptions: {
        target: 'esnext',
        // Otimização de treeshaking durante desenvolvimento
        treeShaking: true,
      },
    },
    plugins: [
      react(),
      tempo(),
      splitVendorChunkPlugin(),
      // Visualizador de tamanho de bundling apenas em produção
      isProd &&
        visualizer({
          open: false,
          gzipSize: true,
          brotliSize: true,
          filename: 'dist/stats.html',
        }),
      ViteImageOptimizer(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true,
        },
        manifest: {
          name: 'Portfolio Excellence',
          short_name: 'Portfolio',
          start_url: '/',
          display: 'standalone',
          background_color: '#ffffff',
          theme_color: '#3498db',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,png,svg,webp,avif,woff2}'],
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB
        },
      }),
    ],
    resolve: {
      preserveSymlinks: true,
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // @ts-ignore
      allowedHosts: true,
      // Habilitar compressão durante desenvolvimento
      hmr: {
        overlay: false,
      },
    },
    // Otimizações para build de produção
    build: {
      // Ativa o tree-shaking agressivo
      target: 'esnext',
      // Desativar source maps em produção para melhor performance
      sourcemap: false,
      // Configurar limites de alerta para tamanhos de chunk
      chunkSizeWarningLimit: 1000,
      // Minificação otimizada
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.debug', 'console.info'],
          passes: 2,
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
        },
      },
      // Permitir imagens maiores sem inlinear
      assetsInlineLimit: 10240,
      // Divisão de código
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            animations: ['framer-motion'],
            ui: [
              '@radix-ui/react-accordion',
              '@radix-ui/react-alert-dialog',
              '@radix-ui/react-aspect-ratio',
              '@radix-ui/react-avatar',
              '@radix-ui/react-checkbox',
              '@radix-ui/react-collapsible',
              '@radix-ui/react-context-menu',
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-hover-card',
              '@radix-ui/react-icons',
              '@radix-ui/react-label',
              '@radix-ui/react-menubar',
              '@radix-ui/react-navigation-menu',
              '@radix-ui/react-popover',
              '@radix-ui/react-progress',
              '@radix-ui/react-radio-group',
              '@radix-ui/react-scroll-area',
              '@radix-ui/react-select',
              '@radix-ui/react-separator',
              '@radix-ui/react-slider',
              '@radix-ui/react-slot',
              '@radix-ui/react-switch',
              '@radix-ui/react-tabs',
              '@radix-ui/react-toast',
              '@radix-ui/react-toggle',
              '@radix-ui/react-tooltip',
            ],
            editor: ['@monaco-editor/react'],
            forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          },
          // Melhora cacheabilidade dos assets
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
        },
      },
      // Ativa compression
      reportCompressedSize: true,
    },
    // Melhora as mensagens de erros durante o desenvolvimento
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
  };
});
