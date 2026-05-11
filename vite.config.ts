import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  // Use GITHUB_PAGES env var to set the base path.
  // If it's a project page (not ending in .github.io), we need the repo name prefix.
  const repoName = process.env.GITHUB_PAGES;
  const base = (repoName && !repoName.endsWith('.github.io')) ? `/${repoName}/` : '/';

  return {
    plugins: [react(), tailwindcss()],
    base: base,
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'motion', 'lucide-react'],
                },
            },
        },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
