import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    host: true,          // important pour accepter toutes les IP (0.0.0.0)
    port: 5173,          // ou un autre port si 5173 est pris
    strictPort: true,    // si le port est pris, Vite échouera au lieu d'en choisir un autre (mieux pour Docker)
    watch: {
      usePolling: true,  // nécessaire dans Docker parfois car "file watching" peut être cassé
    }
  }
})
