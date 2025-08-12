import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Теперь сервер будет доступен по внешнему IP
    port: 5173      // Опционально: явно указываем порт (можно не указывать)
  }
})
