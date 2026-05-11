import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  
  // Get repository name from GITHUB_REPOSITORY (format: owner/repo)
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
  // If we're in GitHub Actions, and it's not a user site, use /repo/ as base.
  // Otherwise default to / for local dev and user sites.
  const base = (repo && !repo.endsWith('.github.io')) ? `/${repo}/` : '/';

  return {
    plugins: [react(), tailwindcss()],
    base: base,
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: false,
      minify: 'esbuild',
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
