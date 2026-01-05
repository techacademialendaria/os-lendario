import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: '.',
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Manual chunk splitting strategy for better caching:
        // - vendor: Heavy dependencies (react, react-dom, react-router, utilities)
        // - ui: UI libraries (iconoir-react, recharts, styling)
        // - react-ecosystem: React-specific utilities (@tiptap, @dnd-kit, @uiw)
        // - main: App-specific code and entry point
        // This reduces cache invalidation when application code changes.
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
            '@google/genai',
            '@supabase/supabase-js',
            'dotenv',
            'yaml',
            'marked',
            'turndown',
            'jszip',
            'file-saver',
          ],
          'ui': [
            'iconoir-react',
            'recharts',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
          ],
          'react-ecosystem': [
            '@tiptap/react',
            '@tiptap/starter-kit',
            '@tiptap/extension-placeholder',
            '@uiw/react-md-editor',
            '@dnd-kit/core',
            '@dnd-kit/sortable',
            '@dnd-kit/utilities',
            'react-hook-form',
          ],
        },
      },
    },
  },
  server: {
    proxy: {
      // Book Summary Pipeline Server (localhost:8001)
      '/api/pipeline': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/pipeline/, ''),
      },
      // MMOS Debate API (localhost:8000)
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})