import { fileURLToPath, URL } from 'node:url'
import { readFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const resolvePath = (p) => fileURLToPath(new URL(p, import.meta.url))
const hosting = JSON.parse(readFileSync(resolvePath('./vercel.json'), 'utf8'))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 5173,
  },
  preview: {
    headers: Object.fromEntries(hosting.headers[0].headers.map(({ key, value }) => [key, value])),
  },
  build: {
    license: { fileName: 'third-party-licenses.md' },
    rolldownOptions: {
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
