import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const resolvePath = (p) => fileURLToPath(new URL(p, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 5173,
  },
  build: {
    rollupOptions: {
      // Vite only builds what's listed here once this is set, so the default
      // index.html has to be named explicitly alongside the static pages.
      input: {
        main: resolvePath('./index.html'),
        privacy: resolvePath('./privacy.html'),
        terms: resolvePath('./terms.html'),
        notFound: resolvePath('./404.html'),
      },
    },
  },
})
