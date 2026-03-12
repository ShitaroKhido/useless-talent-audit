import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

// VITE_USE_MOCK=true  → uses src/services/mock.js  (no Firebase needed)
// VITE_USE_MOCK=false → uses src/services/firebase.js (real Firestore/Auth)
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const useMock = env.VITE_USE_MOCK === 'true'

  return {
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: {
        // More specific alias MUST be listed before the shorter '@' alias
        '@/services/data': fileURLToPath(
          new URL(
            useMock ? './src/services/mock.js' : './src/services/firebase.js',
            import.meta.url
          )
        ),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      target: 'esnext',
      minify: 'esbuild',
    },
  }
})
