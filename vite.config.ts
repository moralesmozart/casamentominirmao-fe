import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Project Pages URL: https://moralesmozart.github.io/casamentominirmao-fe/
export default defineConfig({
  plugins: [react()],
  base: '/casamentominirmao-fe/',
})
